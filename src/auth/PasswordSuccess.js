import React, { useState, useEffect } from "react";
import "../assets/css/forms/login.scss";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";

const PasswordSuccess = () => {
  const btLogo = require("../assets/icons/Group 56.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [paramsValue, setParamsValue] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // Get the current URL
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
          <img src={btLogo} alt="" />
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default PasswordSuccess;
