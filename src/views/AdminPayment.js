import React, { useEffect, useState } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import PaymentOptions from "./PaymentOptions.js";
import Loader from "./Loader.js";

const AdminPayment = () => {
  const [paymentOptions, setPaymentOption] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [abaFormData, setAbaFormData] = useState({});
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasReloaded = localStorage.getItem("refresh");
    if (!hasReloaded) {
      localStorage.setItem("refresh", "true");
      window.location.reload();
    } else {
      localStorage.removeItem("refresh");
    }
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handlePayNow = () => {
    const amount = parseFloat(selectedAmount.trim());
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      showErrorPopup();
      return;
    }

    const email = selectedEmail.trim();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      showErrorPopup();
      return;
    }

    setError("");
    setShowPopup(false);
    setPaymentOption(true);
  };

  const showErrorPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handlePayment = async (amount, currency, type, paymentOption, plan) => {
    try {
      let apiUrl =
        paymentOption === "card" ? API.createPayment : API.createqrpayment;
      await ApiHelper.post(apiUrl, {
        amount,
        currency,
        type,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error during payment:", error);
      setLoading(false);
      setError("Payment initiation failed. Please try again.");
    }
  };

  const handleFormSubmit = (dataObject, hash) => {
    setAbaFormData({ ...dataObject, hash });
    setTimeout(() => {
      document.getElementById("checkout_button").click();
    }, 100);
  };

  useEffect(() => {
    if (selectedPaymentOption) {
      setLoading(true);
      handlePayment(
        selectedAmount,
        "USD",
        "https://brandsandtalent.com/pricingadmin",
        selectedPaymentOption,
        "normal"
      );
    }
  }, [selectedPaymentOption]);

  const saveEmailInput = (email) => {
    email = email.toLowerCase();
    setSelectedEmail(email);
  };

  return (
    <>
      <style>
        {`
          .button-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .button-container button {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
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
      <section>
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
            onChange={(e) => setSelectedAmount(e.target.value)}
            placeholder="Enter amount here"
            autoComplete="off"
          />
          <input
            value={selectedEmail}
            onChange={(e) => saveEmailInput(e.target.value)}
            placeholder="Enter email here"
            autoComplete="off"
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
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
          setSelectedPaymentOption={setSelectedPaymentOption}
          setPaymentOption={setPaymentOption}
          selectedPaymentPlan={"Pro (Popular)"}
          email={selectedEmail}
          adminPayment={true}
          selectedPaymentPeriod={"annual"}
          success_url="https://brandsandtalent.com/pricingadmin"
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
      {loading ? <Loader /> : null}
    </>
  );
};

export default AdminPayment;
