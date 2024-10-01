import React, { useEffect, useState } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import CheckoutComponent from "./CheckoutComponent.js";
import PaymentOptions from "./PaymentOptions.js";
import Loader from "./Loader.js";

const AdminPayment = () => {
  const [checkout, setCheckout] = useState(false);
  const [responseurl, setResponseUrl] = useState("");
  const [paymentOptions, setPaymentOption] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(""); // State for selected amount
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState("");

  const handlePayNow = async () => {
    setPaymentOption(true);
  };

  const handlePayment = async (amount, currency, type, paymentOption, plan) => {
    try {
      let apiUrl =
        paymentOption === "card" ? API.createPayment : API.createqrpayment;
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
    if (selectedPaymentOption) {
      setLoading(true);
      handlePayment(
        selectedAmount, // Use selectedAmount from input
        "USD",
        `https://brandsandtalent.com/pricingadmin`,
        selectedPaymentOption,
        "normal"
      );
    }
  }, [selectedPaymentOption]); // Add selectedAmount to dependencies

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

          .input-group {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }

          .input-group input {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-right: 10px;
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
        <div className="input-group">
          <input
            type="number" // Ensure it's a number input
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(e.target.value)} // Update selectedAmount
            placeholder="Enter amount here"
          />
          <button onClick={handlePayNow}>Pay now</button>
        </div>
      </section>

      {paymentOptions && (
        <PaymentOptions
          paymentFrom={"giftsubscription"}
          selectedCurrency={"USD"}
          selectedAmount={selectedAmount} // Pass selectedAmount to PaymentOptions
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
