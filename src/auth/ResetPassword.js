import React, { useState, useEffect } from "react";
import "../assets/css/forms/login.scss";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const btLogo = require("../assets/images/LOGO.jpg");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [paramsValue, setParamsValue] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Get the current URL
  const windowUrl = window.location.href;
  console.log(windowUrl, "windowUrl");
  const queryString = windowUrl.split("?")[1];
  console.log("Search queryString:", queryString);
  console.log("Search queryString:", typeof queryString);

  // Split the URL path by '/'
  const pathParts = windowUrl.split("/");

  // Extract type and token from the pathParts array
  const userType = pathParts[4]; // "brand"
  const token = pathParts[5]; // "38e9e46b425e7bcbbcaf9d9ecd8adf4242bde1c8"

  console.log("Type: extracted", userType);
  console.log("Token: extracted", token);

  const navigate = useNavigate();
  useEffect(() => {
    if (queryString) {
      setParamsValue(queryString);
      console.log(paramsValue, "paramsValue");
      setSelectedItem(paramsValue);
    }
  }, [paramsValue]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const handleForgotPassword = (userType) => {
    navigate(`/forgot-password?${userType}`);
  };

  const resetPassword = async (enteredOTP) => {
    if (userType == "brand") {
      const formData = {
        password: confirmPassword,
        resetPasswordToken: token,
      };
      setIsLoading(true);
      console.log(formData, "formData kidsLogin");
      await ApiHelper.post(API.brandsResetPassword, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Password Reset Successfull!");
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
              navigate(`/success-password?${paramsValue}`);
            }, 2000);
          } else if (resData.data.status === false) {
            console.log("Error Occured Goback And Try Again!");
            setIsLoading(false);
            setMessage(resData.data.message);
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (userType == "adult") {
      const formData = {
        password: confirmPassword,
        resetPasswordToken: token,
      };
      setIsLoading(true);
      console.log(formData, "formData kidsLogin");
      await ApiHelper.post(API.adultResetPassword, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Password Reset Successfull!");
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
              navigate(`/success-password?${paramsValue}`);
            }, 2000);
          } else if (resData.data.status === false) {
            console.log("Error Occured Goback And Try Again!");
            setIsLoading(false);
            setMessage(resData.data.message);
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const formData = {
        password: confirmPassword,
        resetPasswordToken: paramsValue,
      };
      setIsLoading(true);
      console.log(formData, "formData kidsLogin");
      await ApiHelper.post(API.resetPassword, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Password Reset Successfull!");
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
              navigate(`/success-password?${paramsValue}`);
            }, 2000);
          } else if (resData.data.status === false) {
            console.log("Error Occured Goback And Try Again!");
            setIsLoading(false);
            setMessage(resData.data.message);
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="login-main">
        <div className="login-container">
          <div className="reset-logo">
              <img className="btLogo" src={btLogo} alt="" />
            </div>
          <div className="otp-title">
            <span className="bold-otp">New Password</span>
          </div>
          <div className="forgot-info">Please enter your New Password</div>
          <div className="mb-3 login-input-containers ">
            <label className="form-label">New Password</label>
            <div className="form-group has-search adult-password-wrapper">
              <span className="fa fa-lock form-control-feedback"></span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control adult-signup-inputs"
                placeholder="Password"
                onChange={(e) => {
                  handlePasswordChange(e);
                }}
              ></input>
              {showPassword ? (
                <span
                  className="fa fa-eye show-password-icon"
                  onClick={togglePasswordVisibility}
                ></span>
              ) : (
                <span
                  className="fa fa-eye-slash show-password-icon"
                  onClick={togglePasswordVisibility}
                ></span>
              )}
            </div>
          </div>
          <div className="mb-1 login-input-containers ">
            
            <label className="form-label">Confirm Password</label>
            <div className="form-group has-search adult-confirm-password-wrapper">
              <span className="fa fa-lock form-control-feedback"></span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`form-control adult-signup-inputs ${
                  passwordMatch ? "" : "is-invalid"
                }`}
                placeholder="Confirm Password"
                onChange={(e) => {
                  handleConfirmPasswordChange(e);
                }}
              ></input>
              {showConfirmPassword ? (
                <span
                  className="fa fa-eye show-confirm-password-icon"
                  onClick={toggleConfirmPasswordVisibility}
                ></span>
              ) : (
                <span
                  className="fa fa-eye-slash show-confirm-password-icon"
                  onClick={toggleConfirmPasswordVisibility}
                ></span>
              )}
            </div>
            {!passwordMatch && confirmPassword && confirmPassword.length && (
              <p className="password-wrong">Passwords does not match.</p>
            )}
          </div>
          <div className="login-btn" onClick={resetPassword}>
            {isLoading ? "Loading..." : "Submit"}
          </div>
        </div>
       
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default ResetPassword;
