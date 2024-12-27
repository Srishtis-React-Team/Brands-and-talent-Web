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
  const [error, setError] = useState(""); // Error message state
  const [showPopup, setShowPopup] = useState(false); // State for showing popup
  
  // Email validation regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // const handlePayNow = async () => {
  //   if (!selectedAmount || selectedAmount <= 0) {
  //     setError("Please enter a valid amount.");
  //     return;
  //   }
  //   const email = selectedEmail.trim();
  //   if (!email || !validateEmail(email)) 
  //     setError("Please enter a valid email address.");
  //     return;
  //   }
  //   setError("");
  //   setShowPopup(true); // Show the popup when clicking Pay Now
  //   setPaymentOption(true);
  // };
  const handlePayNow = async () => {
    if (!selectedAmount || selectedAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    const email = selectedEmail.trim();
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      setShowPopup(true); // Show popup if invalid email
      setTimeout(() => {
        setShowPopup(false); // Hide popup after 2 seconds
      }, 2000); // Set time to 2000ms (2 seconds)
      return;
    }
    setError(""); // Reset error message if the form is valid
    setShowPopup(true); // Show the popup
  
    // Hide the popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false); // Hide popup
      setSelectedAmount(""); // Reset selectedAmount
      setSelectedEmail("");  // Reset selectedEmail
    }, 2000); // You can adjust the time as needed
  
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
      setLoading(false);
      setError("Payment initiation failed. Please try again.");
    }
  };

  const PUBLIC_KEY = "ea8234fb-33fa-487d-8967-f6dd436721ab";
  const SUBSCRIPTION_PLAN = "adminSubscriptionPlan";
  const PLAN_NAME = "adminPlan";


  const handleFormSubmit = async (dataObject, hash) => {
    // try {
      setAbaFormData({ ...dataObject, hash });
    setTimeout(() => {
      document.getElementById("checkout_button").click();
    }, 100);
    //   // console.log('selectedEmail--',selectedEmail)
    //   // // Extend dataObject with additional fields
    //   // const extendedData = {
    //   //   ...dataObject,
    //   //   email:selectedEmail,
    //   //   return_params: JSON.stringify({
    //   //     subscriptionPlan: SUBSCRIPTION_PLAN,
    //   //     planName: PLAN_NAME,
    //   //   }),
    //   // };
    //   // console.log('extendedData',extendedData)
    //   // setReturnParams(extendedData.return_params)

    //   // Generate hash
    //   // const hash = await generateHash(extendedData, PUBLIC_KEY);

    //   // Update form data with hash
    //   setAbaFormData({ ...dataObject, hashData });

    //   // Simulate form submission
    //   document.getElementById("checkout_button")?.click();
    // } catch (error) {
    //   console.error("Error in handleFormSubmit:", error);
    //   alert("Something went wrong. Please try again.");
    // }
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

        
           .popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 150px;
            padding: 30px;
            background-color: #ffffff;
            color: #000000;
            border-radius: 10px;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            font-weight: bold;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.5s ease;
            opacity: 1;
          }

          .popup.hide {
            opacity: 0;
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
            value={selectedAmount}
            onChange={(e) => setSelectedAmount(e.target.value)} // Update selectedAmount
            placeholder="Enter amount here"
          />
          <input
           type="email"
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)} // Update selectedAmount
            placeholder="Enter email here"
          />
          <button onClick={handlePayNow}>Pay now</button>
          {showPopup && error && <div className="popup">{error}</div>}
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
          selectedPaymentPlan={'Pro (Popular)'}
          email={selectedEmail}
          adminPayment={true}
          selectedPaymentPeriod={'annual'}
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