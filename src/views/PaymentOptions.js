import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js"; // Ensure CryptoJS is installed
import "../assets/css/paymentoption.css";
import qrlogo from "../assets/icons/payment/ic_KHQR_x2.png";
import cardlogo from "../assets/icons/payment/ic_generic_1x.png";
import payOptionslogo from "../assets/icons/payment/4Cards_2x.png";
import rightArrow from "../assets/icons/payment/right-arrow.svg";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";

const PaymentOptions = ({
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
  success_url
}) => {
  console.log("-----111----",success_url)
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [couponDiscountPercent, setCouponDiscountPercent] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false); // New state for coupon applied status
  const [tran_id,setTran_id] = useState('')
  const [payOption, setPayOption] = useState(false);
  const [reqTime, setReqTime] = useState("");
  const [hash, setHash] = useState("");
  const merchantId = "brandsandtalent"; // replace with actual
  const transactionId = "29049578399218700"; // replace with actual
  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem('userEmail');
  useEffect(() => {
    setAmount(selectedAmount);
    getTransactionId()
  }, []);

  const getTransactionId = async () =>{
    console.log('gettransactionId')
    const resData = await ApiHelper.get(`${API.fetchTransactionId}`);
    console.log('id resData',resData.data.data.transactionid);
    setTran_id(resData.data.data.transactionid);
  }


  // Generate Unix Timestamp
  const getFormattedTimestamp = () => {
    const date = new Date();
    return Math.floor(date.getTime() / 1000); // Convert to Unix timestamp in seconds
  };

  // Generate Hash for ABA payment
  const generateHash = (dataObject, publicKey) => {
    const hashString = `${dataObject.req_time}${dataObject.merchant_id}${dataObject.tran_id}${dataObject.amount}${dataObject.email}${dataObject.payment_option}${dataObject.continue_success_url}`;
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
        setErrorMessage(responseCoupon?.data?.message || "Failed to apply coupon");
        setIsCouponApplied(false);
      }
    } catch (error) {
      setErrorMessage("An error occurred while applying the coupon.");
    }
  };

  // Handle Payment Option Selection
  const handleSelection = async (type) => {
    try {
      console.log('type',type)
      let planType;
      if (selectedPaymentPlan == "Pro (Popular)") {
        planType = selectedPaymentPlan.split(" ")[0]; // This will give you "Pro"
      }
     console.log('giftSub',giftSub)
     let plan;
     if(giftSub){
      plan = 'giftsubscription'
     }
      if (plan == "giftsubscription") {
        const giftObj = {
          senderName: senderName,
          email: email,
          gift: [
            {
              receiversFirstName: recieversFirstName,
              receiverEmail: recieverEmail,
              message: enquiry,
              transId:tran_id,
              subscriptionPlan: selectedPaymentPeriod,
              planName: planType ? planType : selectedPaymentPlan,
              paymentStatus: "Pending",
            },
          ],
          isActive: true,
        };
        // transId: response.data.trans_id,
        console.log('giftObj',giftObj)

        const resGiftSub = await ApiHelper.post(API.giftSubCreation, giftObj);
        console.log('resGiftSub',resGiftSub)
      } else {
        const userData = {
          subscriptionPlan: selectedPaymentPeriod,
          planName: planType ? planType : selectedPaymentPlan,
          user_id: userId,
          transId:tran_id,
          paymentStatus: "Pending",
          coupon: appliedCouponCode ? appliedCouponCode : "",
        };

        console.log('userData',userData)
        const responseSubscription = await ApiHelper.post(
          API.subscriptionPlan,
          userData
        );
        console.log('responseSubscription',responseSubscription)
      }
        setSelectedPaymentOption(type);
        setPayOption(type);
        console.log('type',type)
        // Create a data object for hash generation
        const dataObject = {
            req_time: getFormattedTimestamp(),
            merchant_id: "brandsandtalent",
            tran_id: tran_id, // You can dynamically generate this if needed
            amount: finalAmount ? finalAmount : amount, // This could also be dynamic
            email: userEmail,
            payment_option: type,
            continue_success_url: success_url,
        };

        // Generate the hash using the dataObject and your public key
        const publicKey = "366b35eb-433b-4d8e-8ee9-036bcd3e2e2c"; // Replace with your actual public key
        const hash = generateHash(dataObject, publicKey);

        // Create a new FormData object
        const formData = new FormData();

        // Populate the FormData with dynamic values
        Object.keys(dataObject).forEach(key => {
            formData.append(key, dataObject[key]);
        });
        
        // Append the generated hash to FormData
        formData.append("hash", hash);

        // Create a new form element
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase";
        form.target = "aba_webservice";

        // Append all FormData fields to the form
        for (const [key, value] of formData.entries()) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            form.appendChild(input);
        }

        // Append the form to the body and submit it
        document.body.appendChild(form);
        form.submit();

        // Optionally remove the form after submission (cleanup)
        form.remove();
    } catch (error) {
        console.error("Payment option selection error:", error);
        // Display an error message to the user
        setErrorMessage("The selected payment option is not available. Please choose another option.");
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
        <button onClick={handleClose} className="close-btn">X</button>
        <h4>Complete your payment</h4>
        <span>
          You've chosen {selectedPaymentPlan} Membership <br />
          Total: {selectedCurrency} <span style={{ fontWeight: "bold" }}>{amount}</span> <br />
          Select your payment method to finalize your subscription and enjoy exclusive benefits.
        </span>
        {couponDiscountPercent && (
          <div>
            <span>
              You've saved <span style={{ fontWeight: "bold" }}>{couponDiscountPercent}%</span> on your total amount!
            </span>
            <br />
            <span>
              Payable amount: {selectedCurrency} <span style={{ fontWeight: "bold" }}>{finalAmount}</span>
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
              <input value={inputValue} onChange={handleInputChange} placeholder="Enter coupon code here" type="text" />
              <button onClick={applyCoupon} className={`apply-btn ${inputValue ? "highlighted" : ""}`} disabled={!!couponDiscountPercent}>
                {isCouponApplied ? "Applied" : "Apply"}
              </button>
            </div>
          </>
        )}

        {/* <form
          method="POST"
          action="https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase"
          id="aba_merchant_request"
          target="aba_webservice"
        >
          <input type="hidden" name="req_time" value="1729174451" />
          <input type="hidden" name="merchant_id" value="brandsandtalent" />
          <input type="hidden" name="tran_id" value="2904957839920"/>
          <input type="hidden" name="amount" value="10.00" />
          <input type="hidden" name="firstname" value="jai" />
          <input type="hidden" name="lastname" value="jv" />
          <input type="hidden" name="email" value="jaivinvenkolla@gmail.com" />
          <input type="hidden" name="phone" value="0965965897" />
          <input type="hidden" name="payment_option" value="cards" />
          <input type="hidden" name="continue_success_url" value="https://brandsandtalent.com/" />
          <input type="hidden" name="hash" value="ru6vg/uAy+COBQtusL8gOaYmAG3E4P/CtDeBYlE63RKA4V+rYXwek0eHsyUS8yaYQ2K3Ui/LMbhYQWjg3/5a7A==" />
        </form> */}

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="paymentOptionSection">
          <div onClick={() => handleSelection("abapay_khqr")} style={{ cursor: "pointer" }} className="paymentOption">
            <img src={qrlogo} alt="QR Code" />
            <div>
              <p>ABA KHQR</p>
              <span>Scan and pay using any Cambodian banking app</span>
            </div>
            <div>
              <img src={rightArrow} alt="Right Arrow" />
            </div>
          </div>
          <div onClick={() => handleSelection("cards")} style={{ cursor: "pointer" }} className="paymentOption2">
            <img src={cardlogo} alt="Card Logo" />
            <div>
              <p>Credit/Debit Card</p>
              <span>
                <img src={payOptionslogo} alt="Payment Options" />
              </span>
            </div>
            <div>
              <img src={rightArrow} alt="Right Arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
