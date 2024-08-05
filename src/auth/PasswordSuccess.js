import React, { useState, useEffect } from "react";
import "../assets/css/forms/login.scss";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
const PasswordSuccess = () => {
  const btLogo = require("../assets/images/LOGO.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [paramsValue, setParamsValue] = useState("");
  const url = window.location.href;
  const queryString = url.split("?")[1];
  console.log("Search queryString:", typeof queryString);
  const navigate = useNavigate();
  useEffect(() => {
    if (queryString) {
      setParamsValue(queryString);
      console.log(paramsValue, "paramsValue");
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
          <div className="otp-title">
            <span className="success-text">Successfull</span>
          </div>
          <div className="success-info">
            Your Password Has Been Successfully Changed. For Any Assistance
            Reach Out to our Support Team. Thank You{" "}
          </div>
          <div className="login-btn" onClick={submit}>
            Back To Login
          </div>
        </div>
        <div className="success-pass-logo">
          <img className="btLogo" src={btLogo} alt="" />
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default PasswordSuccess;
