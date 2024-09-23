import React, { useEffect, useState, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import CheckoutComponent from "./CheckoutComponent.js";
import PaymentOptions from "./PaymentOptions.js";
import Loader from "./Loader.js";

const AdminPayment = () => {
  const [checkout, setCheckout] = useState(false);
  const [responseurl, setResponseUrl] = useState("");
  const [paymentOptions, setPaymentOption] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState('')

  const handlePayNow = async () => {
    setPaymentOption(true);
  }


  const handlePayment = async (amount, currency, type, paymentOption, plan) => {
    try {
      let apiUrl =
        paymentOption == "card" ? API.createPayment : API.createqrpayment;
      const response = await ApiHelper.post(apiUrl, {
        amount,
        currency,
        type,
      });
      setResponseUrl(response.data.url);
      setCheckout(true);
      setLoading(false);
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  useEffect(() => {
    console.log("Selected payment option:", selectedPaymentOption);
    if (selectedPaymentOption) {
      setLoading(true);
      handlePayment(1, 'USD', `https://dev.brandsandtalent.com/adminpayment`, selectedPaymentOption, "normal");
    }
  }, [selectedPaymentOption]);

  return (
    <>

<style>
      {`
        .button-container {
          display: flex;
          justify-content: center; /* Center horizontally */
          align-items: center;     /* Center vertically */
          height: 100vh;           /* Make the section full height */
        }

        .button-container button {
          padding: 10px 20px; /* Add some padding for better appearance */
          font-size: 16px;    /* Adjust font size */
          cursor: pointer;     /* Change cursor to pointer */
          border-radius: 5px;
          background: #c2114b;
          border: none;
          color: white;
        }
      `}
    </style>
      <section className="">
        <div className="popular-header">
          <div className="container">
            <div className="header-title">Admin Pricing</div>
          </div>
        </div>
      </section>
      
      <section className="button-container">
        <button onClick={handlePayNow}>Pay now</button>
      </section>
  
      {paymentOptions && (
        <PaymentOptions
          selectedCurrency={'USD'}
          selectedAmount={1}
          setSelectedAmount={setSelectedAmount}
          setSelectedPaymentOption={setSelectedPaymentOption}
          setPaymentOption={setPaymentOption}
          selectedPaymentPlan={selectedPaymentPlan}
          setAppliedCouponCode={setAppliedCouponCode}
        />
      )}
  
      {checkout && (
        <CheckoutComponent
          responseUrl={responseurl}
          setCheckout={setCheckout}
        />
      )}
      {loading ? <Loader /> : <div></div>}
    </>
  );
  
};

export default AdminPayment;
