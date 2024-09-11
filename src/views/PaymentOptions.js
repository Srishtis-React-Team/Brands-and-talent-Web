import React from "react";
import "../assets/css/paymentoption.css";
import qrlogo from '../assets/icons/payment/ic_KHQR_x2.png'
import cardlogo from '../assets/icons/payment/ic_generic_1x.png'
import payOptionslogo from '../assets/icons/payment/4Cards_2x.png'
import rightArrow from '../assets/icons/payment/right-arrow.svg';


const PaymentOptions = ({responseUrl, setCheckout, selectedCurrency, selectedAmount, setSelectedPaymentOption, setPaymentOption, selectedPaymentPlan}) => {
  console.log('props',responseUrl)
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

  const handleSelection = async (type) =>{
    console.log('type',type)
    setSelectedPaymentOption(type)
    setPaymentOption(false)
  }

  return (
    <div className="popupbackground">
    <div className="popupcontainer">
      <div>
        <h4 style={{ fontWeight: 'bold' }}>Complete your payment</h4>
      </div>
      <div>
        <span style={{ fontSize: '12px' }}>
          You've chosen {selectedPaymentPlan} Membership <br />
          Total: {selectedCurrency} {selectedAmount} Select your payment method to finalize your subscription and enjoy exclusive benefits.
        </span>
      </div>
      <div className="paymentOptionSection" style={{ background: '#E5E5EA', borderRadius: '5px', height: '64%', marginTop: '5%' }}>
        <div style={{ display: "flex", gap: '10px', background: 'white', marginTop: '5px', margin: "18px", borderRadius: '5px' }}>
          <div>
            <img style={{ marginTop: '15%', width: '67%', marginLeft: '10px' }} src={qrlogo} alt="" />
          </div>
          <div>
            <div style={{ fontWeight: 'bold' }}>
              ABA KHQR
            </div>
            <div>
              <p>Scan to pay with any banking app</p>
            </div>
          </div>
          <div>
            <div onClick={() => handleSelection('qr')} style={{ background: '#E5E5EA', borderRadius: '5px', marginTop: '17px', marginLeft: '18px', cursor: 'pointer' }}>
              <img src={rightArrow} alt="" />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: '10px', background: 'white', margin: "18px", borderRadius: '5px' }}>
          <div>
            <img style={{ marginTop: '15%', width: '67%', marginLeft: '10px' }} src={cardlogo} alt="" />
          </div>
          <div>
            <div style={{ fontWeight: 'bold' }}>
              Credit/Debit Card
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <img style={{ width: "50%" }} src={payOptionslogo} alt="" />
            </div>
          </div>
          <div>
            <div onClick={() => handleSelection('card')} style={{ background: '#E5E5EA', borderRadius: '5px', marginTop: '17px', marginLeft: '60px', cursor: 'pointer' }}>
              <img src={rightArrow} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PaymentOptions;