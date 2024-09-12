import React, { useState } from "react";
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
  console.log('props', responseUrl);

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: '#ff5f5f',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    width: '24px',
    height: '24px',
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: '50%',
  };

  const applyButtonStyle = {
    marginLeft: "7%",
    borderRadius: "5px",
    fontSize: "13px",
    width: "80px",
    height: "30px",
    fontWeight: "bold",
    border: "none",
    color: "white",
    background: "rgb(179 179 186)"
  };

  const applyCoupon = async () => {
    const userId = localStorage.getItem("userId");
    const obj = {
      "userId": userId,
      "code": inputValue,
      "totalAmount": selectedAmount
    };

    console.log('code', obj);

    try {
      const responseCoupon = await ApiHelper.post(API.applyCoupon, obj);
      console.log('responseCoupon', responseCoupon?.data?.discountAmount);
      if(responseCoupon?.data?.discountAmount){
      setSelectedAmount(responseCoupon?.data?.discountAmount)
      }else{
        return
      }
      // Handle the response as needed
    } catch (error) {
      console.error('Error applying coupon:', error);
      // Handle errors as needed
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSelection = async (type) => {
    console.log('type', type);
    setSelectedPaymentOption(type);
    setPaymentOption(false);
  };

  return (
    <div className="popupbackground">
      <div className="popupcontainer">
        <div>
          <h4 style={{ fontWeight: 'bold' }}>Complete your payment</h4>
        </div>
        <div>
          <span style={{ fontSize: '12px' }}>
            You've chosen {selectedPaymentPlan} Membership <br />
            Total: {selectedCurrency} {selectedAmount}. Select your payment method to finalize your subscription and enjoy exclusive benefits.
          </span>
        </div>
        <div>
          <span style={{ fontSize: '12px', color: 'rgb(115 131 205)' }}>Have a coupon code?</span>
        </div>
        <div style={{ display: 'flex', marginTop: '3px' }}>
          <div>
            <input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Have a coupon code?"
              style={{ height: '30px' }}
              type="text"
            />
          </div>
          <div>
            <button onClick={applyCoupon} style={applyButtonStyle}>Apply</button>
          </div>
        </div>
        <div className="paymentOptionSection" style={{ background: '#E5E5EA', borderRadius: '5px', height: '64%', marginTop: '5%' }}>
          <div style={{ display: "flex", gap: '10px', background: 'white', marginTop: '5px', margin: "18px", borderRadius: '5px' }}>
            <div>
              <img style={{ marginTop: '40%', width: '67%', marginLeft: '10px' }} src={qrlogo} alt="QR Code" />
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>
                ABA KHQR
              </div>
              <div>
                <p>Scan and pay using any Combodian banking app</p>
              </div>
            </div>
            <div>
              <div onClick={() => handleSelection('qr')} style={{ background: '#E5E5EA', borderRadius: '5px', marginTop: '28px', marginLeft: '18px', cursor: 'pointer' }}>
                <img src={rightArrow} alt="Right Arrow" />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: '10px', background: 'white', margin: "18px", borderRadius: '5px' }}>
            <div>
              <img style={{ marginTop: '15%', width: '67%', marginLeft: '10px' }} src={cardlogo} alt="Card Logo" />
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>
                Credit/Debit Card
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <img style={{ width: "50%" }} src={payOptionslogo} alt="Payment Options" />
              </div>
            </div>
            <div>
              <div onClick={() => handleSelection('card')} style={{ background: '#E5E5EA', borderRadius: '5px', marginTop: '19px', marginLeft: '97px', cursor: 'pointer' }}>
                <img src={rightArrow} alt="Right Arrow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
