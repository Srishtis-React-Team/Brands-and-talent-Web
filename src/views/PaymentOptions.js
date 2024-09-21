import React, { useEffect, useState } from "react";
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
}) => {
  console.log(paymentFrom, "paymentFrom");
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [couponDiscountPercent, setCouponDiscountPercent] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false); // New state for coupon applied status

  useEffect(() => {
    setAmount(selectedAmount);
  }, []);

  const applyCoupon = async () => {
    const userId = localStorage.getItem("userId");
    const obj = {
      userId,
      code: inputValue,
      totalAmount: selectedAmount,
    };

    try {
      const responseCoupon = await ApiHelper.post(API.applyCoupon, obj);

      if (responseCoupon?.data?.status === false) {
        setErrorMessage(
          responseCoupon?.data?.message || "Failed to apply coupon"
        );
        setIsCouponApplied(false);
      } else if (responseCoupon?.data?.status === true) {
        if (responseCoupon?.data?.message === "Coupon applied successfully") {
          const { discountAmount, couponDiscountPercent } = responseCoupon.data;
          console.log("responseCoupon", responseCoupon);
          setSelectedAmount(discountAmount);
          setFinalAmount(discountAmount);
          setCouponDiscountPercent(couponDiscountPercent);
          setIsCouponApplied(true);
          setErrorMessage("");
        } else {
          setErrorMessage("Unexpected response message");
          setIsCouponApplied(false);
        }
      } else {
        setErrorMessage("Invalid coupon code"); // Handle other cases if needed
        setIsCouponApplied(false);
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
      setErrorMessage("An error occurred while applying the coupon.");
      setIsCouponApplied(false);
    }
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    // Hide error message and reset coupon applied status if input is cleared
    if (newValue === "") {
      setErrorMessage("");
      setIsCouponApplied(false);
    }
  };

  const handleSelection = async (type) => {
    setSelectedPaymentOption(type);
    setPaymentOption(false);
  };

  const handleClose = () => {
    setPaymentOption(false);
  };

  // useEffect(()=>{
  //   setSelectedAmount(finalAmount)
  // },[finalAmount])

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
          <span style={{ fontWeight: "bold" }}>{amount}</span> Select your
          payment method to finalize your subscription and enjoy exclusive
          benefits.
        </span>
        {couponDiscountPercent ? (
          <div>
            <span>
              You've saved{" "}
              <span style={{ fontWeight: "bold" }}>
                {couponDiscountPercent}%{" "}
              </span>{" "}
              on your total amount!
            </span>
            <br />
            <span>
              Payable amount: {selectedCurrency}{" "}
              <span style={{ fontWeight: "bold" }}>{finalAmount}</span>
            </span>
          </div>
        ) : null}

        {paymentFrom != "giftsubscription" && (
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
                className={`apply-btn ${inputValue ? "highlighted" : ""}`} // Conditionally apply class
              >
                {isCouponApplied ? "Applied" : "Apply"}{" "}
                {/* Conditional button text */}
              </button>
            </div>
          </>
        )}

        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="paymentOptionSection">
          <div
            onClick={() => handleSelection("qr")}
            style={{ cursor: "pointer" }}
            className="paymentOption"
          >
            <img src={qrlogo} alt="QR Code" />
            <div>
              <p>ABA KHQR</p>
              <span>Scan and pay using any Cambodian banking app</span>
            </div>
            <div>
              <img src={rightArrow} alt="Right Arrow" />
            </div>
          </div>
          <div
            onClick={() => handleSelection("card")}
            style={{ cursor: "pointer" }}
            className="paymentOption2"
          >
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
