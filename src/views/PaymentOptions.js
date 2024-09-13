import React, { useEffect, useState } from "react";
import "../assets/css/paymentoption.css";
import qrlogo from '../assets/icons/payment/ic_KHQR_x2.png';
import cardlogo from '../assets/icons/payment/ic_generic_1x.png';
import payOptionslogo from '../assets/icons/payment/4Cards_2x.png';
import rightArrow from '../assets/icons/payment/right-arrow.svg';
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
  selectedPaymentPlan
}) => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [finalAmount, setFinalAmount] = useState('');
  const [couponDiscountPercent, setCouponDiscountPercent] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false); // New state for coupon applied status

  useEffect(() => {
    setAmount(selectedAmount);
  }, []);

  const applyCoupon = async () => {
    const userId = localStorage.getItem("userId");
    const obj = {
      "userId": userId,
      "code": inputValue,
      "totalAmount": selectedAmount
    };

      const responseCoupon = await ApiHelper.post(API.applyCoupon, obj);
      console.log('responseCoupon',responseCoupon)
      if(responseCoupon?.data?.status == false){
            setErrorMessage(responseCoupon?.data?.message);
            setIsCouponApplied(false); // Reset coupon applied status
      }else if(responseCoupon?.data?.status == true){
        setSelectedAmount(responseCoupon?.data?.discountAmount);
        setFinalAmount(responseCoupon?.data?.discountAmount);
        setCouponDiscountPercent(responseCoupon?.data?.couponDiscountPercent);
        setIsCouponApplied(true); // Update coupon applied status
        setErrorMessage(''); // Clear any previous error message
      }else{
          setErrorMessage('Invalid coupon code'); // Optionally handle other cases
          setIsCouponApplied(false); // Reset coupon applied status
      }
      // if (responseCoupon?.data?.discountAmount) {
      //   setSelectedAmount(responseCoupon?.data?.discountAmount);
      //   setFinalAmount(responseCoupon?.data?.discountAmount);
      //   setCouponDiscountPercent(responseCoupon?.data?.couponDiscountPercent);
      //   setIsCouponApplied(true); // Update coupon applied status
      //   setErrorMessage(''); // Clear any previous error message
      // } else if (responseCoupon?.data?.message === 'Coupon has already been used') {
      //   setErrorMessage('Coupon has already been used');
      //   setIsCouponApplied(false); // Reset coupon applied status
      // } else {
      //   setErrorMessage('Invalid coupon code'); // Optionally handle other cases
      //   setIsCouponApplied(false); // Reset coupon applied status
      // }
  };

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    
    // Hide error message and reset coupon applied status if input is cleared
    if (newValue === '') {
      setErrorMessage('');
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

  return (
    <div className="popupbackground">
      <div className="popupcontainer">
        <button onClick={handleClose} className="close-btn">X</button>
        <h4>Complete your payment</h4>
        <span>
          You've chosen {selectedPaymentPlan} Membership <br />
          Total: {selectedCurrency} <span style={{ fontWeight: 'bold' }}>{amount}</span> Select your payment method to finalize your subscription and enjoy exclusive benefits.
        </span>
        {couponDiscountPercent ? (
          <div>
            <span>You've saved <span style={{ fontWeight: 'bold' }}>{couponDiscountPercent}% </span> on your total amount!</span>
            <br />
            <span>Payable amount: {selectedCurrency} <span style={{ fontWeight: 'bold' }}>{finalAmount}</span></span>
          </div>
        ) : null}

        <div style={{ marginTop: '3%' }}>
          <span style={{ fontSize: '12px', color: 'rgb(115 131 205)' }}>Have a coupon code?</span>
        </div>
        <div className="input-group">
          <input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Have a coupon code?"
            type="text"
          />
          <button
            onClick={applyCoupon}
            className={`apply-btn ${inputValue ? 'highlighted' : ''}`} // Conditionally apply class
          >
            {isCouponApplied ? 'Applied' : 'Apply'} {/* Conditional button text */}
          </button>
        </div>
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        <div className="paymentOptionSection">
          <div className="paymentOption">
            <img src={qrlogo} alt="QR Code" />
            <div>
              <p>ABA KHQR</p>
              <span>Scan and pay using any Cambodian banking app</span>
            </div>
            <div onClick={() => handleSelection('qr')}>
              <img src={rightArrow} alt="Right Arrow" />
            </div>
          </div>
          <div className="paymentOption2">
            <img src={cardlogo} alt="Card Logo" />
            <div>
              <p>Credit/Debit Card</p>
              <span>
                <img src={payOptionslogo} alt="Payment Options" />
              </span>
            </div>
            <div onClick={() => handleSelection('card')}>
              <img src={rightArrow} alt="Right Arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
