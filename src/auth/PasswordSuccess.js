import React, { useState, useEffect } from "react";
import "../assets/css/forms/login.css";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
import "../assets/css/register.css";

const PasswordSuccess = () => {
  const btLogo = require("../assets/images/LOGO.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [paramsValue, setParamsValue] = useState("");
  const url = window.location.href;
  const queryString = url.split("?")[1];

  const navigate = useNavigate();
  useEffect(() => {
    if (queryString) {
      setParamsValue(queryString);

      setSelectedItem(paramsValue);
    }
  }, [paramsValue]);

  const submit = (userType) => {
    navigate(`/login`);
  };

  return (
    <>
      <Header />
      <div className="login-main">
        <div className="login-container">
          <div className="success-pass-logo">
            <img className="btLogo" src={btLogo} alt="" />
          </div>
          <div className="otp-title">
            <span className="success-text">Successful</span>
          </div>
          <div className="success-info">
            You have successfully changed your password. If you require help,
            please reach out to our support team. Thank you
          </div>
          <div className="login-btn" onClick={submit}>
            Back To Login
          </div>
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default PasswordSuccess;
