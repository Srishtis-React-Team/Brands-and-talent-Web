import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js"; // Ensure CryptoJS is installed
import "../assets/css/paymentoption.css";
import qrlogo from "../assets/icons/payment/ic_generic copy (1).png";
import cardlogo from "../assets/icons/payment/cards_icons.png";
import payOptionslogo from "../assets/icons/payment/4Cards_2x.png";
import rightArrow from "../assets/icons/payment/right-arrow.svg";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import { useNavigate, useLocation } from "react-router";
const PaymentOptions = ({
  onConfirm,
  responseUrl,
  setCheckout,
  selectedCurrency,
  selectedAmount,
  setSelectedAmount,
  setSelectedPaymentOption,
  setPaymentOption,
  selectedPaymentPlan,
  paymentFrom,
  setAppliedCouponCode,
  selectedPaymentPeriod,
  giftSub,
  senderName,
  email,
  recieversFirstName,
  recieverEmail,
  enquiry,
  appliedCouponCode,
  success_url,
  setGiftError,
  userType
}) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [couponDiscountPercent, setCouponDiscountPercent] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false); // New state for coupon applied status
  const [tran_id, setTran_id] = useState("");
  const [payOption, setPayOption] = useState(false);
  const userId = localStorage.getItem("userId");
  const currentUser = localStorage.getItem("currentUser");
  const userEmail = localStorage.getItem("userEmail");
  const currentUserType = localStorage.getItem("currentUserType");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setAmount(selectedAmount);
    getTransactionId();
  }, []);

  const getTransactionId = async () => {
    const resData = await ApiHelper.get(`${API.fetchTransactionId}`);
    setTran_id(resData.data.data.transactionid);
  };

  const freeContinueBtn = async () => {
    let planType = selectedPaymentPlan.split(" ")[0]; // Extract plan name
    const userData = {
      subscriptionPlan: selectedPaymentPeriod,
      planName: planType,
      user_id: userId,
      transId: tran_id,
      paymentStatus: "Pending",
      coupon: appliedCouponCode ? appliedCouponCode : "",
    };

    const responseSubscription = await ApiHelper.post(
      API.subscriptionPlan,
      userData
    );
    let url;
    if (location.pathname == "/pricing") {
      url = `/talent-home`;
    } else if (location.pathname == "/talent-signup-plan-details") {
      if (userType == 'adults') {
        url = `/talent-signup-files-details?userId=${userId}`;
      } else {
        url = `/talent-kids-teen-signup-files-details?userId=${userId}`;
      }
    } else if('/adult-signup-plan-details'){
      url = `/talent-signup-files-details?userId=${userId}`;
    }else {
      url = success_url;
    }
    navigate(url);
  };

  // Generate Unix Timestamp
  const getFormattedTimestamp = () => {
    const date = new Date();
    return Math.floor(date.getTime() / 1000); // Convert to Unix timestamp in seconds
  };

  // Generate Hash for ABA payment
  const generateHash = (dataObject, publicKey) => {
    const hashString = `${dataObject.req_time}${dataObject.merchant_id}${dataObject.tran_id}${dataObject.amount}${dataObject.email}${dataObject.payment_option}${dataObject.continue_success_url}${dataObject.return_params}`;
    const hash = CryptoJS.HmacSHA512(hashString, publicKey);
    const base64Hash = CryptoJS.enc.Base64.stringify(hash);
    return base64Hash;
  };

  // Apply Coupon Functionality
  const applyCoupon = async () => {
    if (inputValue) setAppliedCouponCode(inputValue);

    let planType = selectedPaymentPlan.split(" ")[0]; // Extract plan name
    const obj = {
      userId,
      code: inputValue,
      totalAmount: selectedAmount,
      subscriptionPlan: selectedPaymentPeriod,
      planName: planType ? planType : selectedPaymentPlan,
    };
    try {
      const responseCoupon = await ApiHelper.post(API.applyCoupon, obj);
      if (responseCoupon?.data?.status) {
        const { discountAmount, couponDiscountPercent } = responseCoupon.data;
        setSelectedAmount(discountAmount);
        setFinalAmount(discountAmount);
        setCouponDiscountPercent(couponDiscountPercent);
        setIsCouponApplied(true);
        setErrorMessage("");
      } else {
        setErrorMessage(
          responseCoupon?.data?.message || "Failed to apply coupon"
        );
        setIsCouponApplied(false);
      }
    } catch (error) {
      console.log('err', error)
      setErrorMessage("An error occurred while applying the coupon.");
    }
  };

  // Handle Payment Option Selection
  const handleSelection = async (type) => {
    try {
      let couponNotFound = false;
      let planType;
      if (selectedPaymentPlan == "Pro (Popular)") {
        planType = selectedPaymentPlan.split(" ")[0]; // This will give you "Pro"
      }
      let plan;
      if (giftSub) {
        plan = "giftsubscription";
      }
      let publicUrl;
      if (plan == "giftsubscription") {
        const giftObj = {
          senderName: senderName,
          email: email,
          gift: [
            {
              receiversFirstName: recieversFirstName,
              receiverEmail: recieverEmail,
              message: enquiry,
              transId: tran_id,
              subscriptionPlan: selectedPaymentPeriod,
              planName: planType ? planType : selectedPaymentPlan,
              paymentStatus: "Pending",
            },
          ],
          isActive: true,
        };

        const resGiftSub = await ApiHelper.post(API.giftSubCreation, giftObj);
        if (resGiftSub.data.message == "coupon not found") {
          couponNotFound = true;
        }
      } else {
        const userData = {
          subscriptionPlan: selectedPaymentPeriod,
          planName: planType ? planType : selectedPaymentPlan,
          user_id: userId ? userId : currentUser,
          transId: tran_id,
          paymentStatus: "Pending",
          coupon: appliedCouponCode ? appliedCouponCode : "",
        };

        const responseSubscription = await ApiHelper.post(
          API.subscriptionPlan,
          userData
        );
        publicUrl = responseSubscription.data.publicUrl;
      }

      const subscriptionData = JSON.stringify({
        subscriptionPlan: selectedPaymentPeriod,
        planName: planType ? planType : selectedPaymentPlan,
      });

      // // Create a data object for hash generation
      const dataObject = {
        req_time: getFormattedTimestamp(),
        merchant_id: "brandsandtalent",
        tran_id: tran_id,
        amount: finalAmount ? finalAmount : amount,
        email: userEmail,
        payment_option: type,
        continue_success_url:
          currentUserType == "brand"
            ? `https://brandsandtalent.com/client/${publicUrl}`
            : success_url,
        return_params: subscriptionData,
      };
      // // Generate the hash using the dataObject and your public key
      const publicKey = "ea8234fb-33fa-487d-8967-f6dd436721ab";
      const hash = generateHash(dataObject, publicKey);
      if (!couponNotFound) {
        onConfirm(dataObject, hash);
        setSelectedPaymentOption(type);
        setPayOption(type);
        setPaymentOption(false);
      } else {
        setErrorMessage(
          "Coupon unavailable for this subscription. Please contact support for assistance with available coupons."
        );
      }
    } catch (error) {
      console.error("Payment option selection error:", error);
      setGiftError(
        "The selected payment option is not available. Please choose another option."
      );
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value === "") {
      setErrorMessage("");
      setIsCouponApplied(false);
    }
  };

  const handleClose = () => setPaymentOption(false);

  return (
    <div className="popupbackground">
      <div className="popupcontainer">
        <button onClick={handleClose} className="close-btn">
          X
        </button>
        <h4>Complete your payment</h4>
        <span>
          You've chosen {selectedPaymentPlan} Membership <br />
          Total: {selectedCurrency}{" "}
          <span style={{ fontWeight: "bold" }}>{amount}</span> <br />
          Select your payment method to finalize your subscription and enjoy
          exclusive benefits.
        </span>
        {couponDiscountPercent && (
          <div>
            <span>
              You've saved{" "}
              <span style={{ fontWeight: "bold" }}>
                {couponDiscountPercent}%
              </span>{" "}
              on your total amount!
            </span>
            <br />
            <span>
              Payable amount: {selectedCurrency}{" "}
              <span style={{ fontWeight: "bold" }}>{finalAmount}</span>
            </span>
          </div>
        )}

        {paymentFrom !== "giftsubscription" && (
          <>
            <div style={{ marginTop: "3%" }}>
              <span style={{ fontSize: "12px", color: "rgb(115 131 205)" }}>
                Have a coupon code?
              </span>
            </div>
            <div className="input-group">
              <input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter coupon code here"
                type="text"
              />
              <button
                onClick={applyCoupon}
                className={`apply-btn ${inputValue ? "highlighted" : ""}`}
                disabled={!!couponDiscountPercent}
              >
                {isCouponApplied ? "Applied" : "Apply"}
              </button>
            </div>
          </>
        )}

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {finalAmount !== undefined && finalAmount === 0 ? (
          <button className="cntnebtn" onClick={freeContinueBtn}>
            Continue
          </button>
        ) : (
          <div className="paymentOptionSection">
            <div
              onClick={() => handleSelection("abapay_khqr")}
              style={{ cursor: "pointer" }}
              className="paymentOption"
            >
              <img src={qrlogo} alt="QR Code" />
              <div>
                <p>ABA KHQR</p>
                <span>Scan to pay with any banking app</span>
              </div>
              <div>
                <img src={rightArrow} alt="Right Arrow" />
              </div>
            </div>
            <div
              onClick={() => handleSelection("cards")}
              style={{ cursor: "pointer" }}
              className="paymentOption2"
            >
              <img src={cardlogo} alt="Card Logo" />
              <div>
                <p>Credit/Debit Card</p>
                <span>
                  <img
                    className="paymentOptions"
                    src={payOptionslogo}
                    alt="Payment Options"
                  />
                </span>
              </div>
              <div>
                <img src={rightArrow} alt="Right Arrow" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;
