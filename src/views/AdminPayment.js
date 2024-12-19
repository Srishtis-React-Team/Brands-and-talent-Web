import React, { useEffect, useState } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import PaymentOptions from "./PaymentOptions.js";
import Loader from "./Loader.js";
import CryptoJS from "crypto-js";

const AdminPayment = () => {
  const [checkout, setCheckout] = useState(false);
  const [responseurl, setResponseUrl] = useState("");
  const [paymentOptions, setPaymentOption] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(""); // State for selected amount
  const [selectedEmail, setSelectedEmail] = useState('')
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState("");
  const [abaFormData, setAbaFormData] = useState({});
  const [returnParams, setReturnParams] = useState({});
  const [adminReturnParams, setAdminReturnParams] = useState(`{\"subscriptionPlan\":\"adminSubscriptionPlan\",\"planName\":\"adminPlan\"}`)


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

  const PUBLIC_KEY = "ea8234fb-33fa-487d-8967-f6dd436721ab";
  const SUBSCRIPTION_PLAN = "adminSubscriptionPlan";
  const PLAN_NAME = "adminPlan";

  const generateHash = (dataObject, publicKey) => {
    console.log("---dataObject==",dataObject)
    console.log('publicKey',publicKey)
    const {
      req_time,
      merchant_id,
      tran_id,
      amount,
      email,
      payment_option,
      continue_success_url,
      return_params,
    } = dataObject;

    const hashString = `${req_time}${merchant_id}${tran_id}${amount}${email}${payment_option}${continue_success_url}${return_params}`;
    console.log('hashString',hashString)
    const hash = CryptoJS.HmacSHA512(hashString, publicKey);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  const handleFormSubmit = async (dataObject, hashData) => {
    try {
      
      console.log('selectedEmail--',selectedEmail)
      // Extend dataObject with additional fields
      const extendedData = {
        ...dataObject,
        email:selectedEmail,
        return_params: JSON.stringify({
          subscriptionPlan: SUBSCRIPTION_PLAN,
          planName: PLAN_NAME,
        }),
      };
      console.log('extendedData',extendedData)
      setReturnParams(extendedData.return_params)

      // Generate hash
      const hash = await generateHash(extendedData, PUBLIC_KEY);

      // Update form data with hash
      setAbaFormData({ ...extendedData, hash });

      // Simulate form submission
      document.getElementById("checkout_button")?.click();
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
      alert("Something went wrong. Please try again.");
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
          <input
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)} // Update selectedAmount
            placeholder="Enter email here"
          />
          <button onClick={handlePayNow}>Pay now</button>
        </div>
      </section>

      {paymentOptions && (
        <PaymentOptions
          onConfirm={handleFormSubmit}
          paymentFrom={"giftsubscription"}
          selectedCurrency={"USD"}
          selectedAmount={selectedAmount} // Pass selectedAmount to PaymentOptions
          setSelectedAmount={setSelectedAmount}
          setSelectedPaymentOption={setSelectedPaymentOption}
          setPaymentOption={setPaymentOption}
          selectedPaymentPlan={selectedPaymentPlan}
          setAppliedCouponCode={setAppliedCouponCode}
          // selectedPaymentPlan={}
          email={selectedEmail}
          success_url='https://brandsandtalent.com/pricingadmin'
        />
      )}

      <form
        id="aba_merchant_request"
        target="aba_webservice"
        method="POST"
        action="https://checkout.payway.com.kh/api/payment-gateway/v1/payments/purchase"
      >
        <input
          type="hidden"
          name="merchant_id"
          value={abaFormData.merchant_id || ""}
        />
        <input type="hidden" name="tran_id" value={abaFormData.tran_id || ""} />
        <input type="hidden" name="amount" value={abaFormData.amount || ""} />
        <input type="hidden" name="email" value={selectedEmail || ""} />
        <input
          type="hidden"
          name="payment_option"
          value={abaFormData.payment_option || ""}
        />
        <input
          type="hidden"
          name="req_time"
          value={abaFormData.req_time || ""}
        />
        <input
          type="hidden"
          name="continue_success_url"
          value={abaFormData.continue_success_url || ""}
        />
        {console.log('adminReturnParams>>>>',abaFormData)}
        <input
          type="hidden"
          name="return_params"
          value={abaFormData.return_params}
        />
        <input type="hidden" name="hash" value={abaFormData.hash || ""} />
        <button
          type="button"
          id="checkout_button"
          style={{
            opacity: "0",
            height: "1px",
            width: "1px",
            position: "absolute",
          }}
        >
          Pay Now
        </button>
      </form>
      {loading ? <Loader /> : <div></div>}
    </>
  );
};

export default AdminPayment;