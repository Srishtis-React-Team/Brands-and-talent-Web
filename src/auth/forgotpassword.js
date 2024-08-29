import React, { useState, useEffect } from "react";
import "../assets/css/forms/login.css";
import "../assets/css/register.css";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
const ForgotPassword = () => {
  const btLogo = require("../assets/images/LOGO.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [talentEmail, setTalentEmail] = useState("");
  const [talentEmailError, setTalentEmailError] = useState(false);
  const [paramsValue, setParamsValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const url = window.location.href;
  const queryString = url.split("?")[1];

  useEffect(() => {
    if (queryString) {
      setParamsValue(queryString);

      setSelectedItem(paramsValue);
    }
  }, [paramsValue]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resend = () => {};

  const forgotPassword = async (enteredOTP) => {
    if (talentEmail == "") {
      setTalentEmailError(true);
    }
    let userType;
    let typeData = {
      email: talentEmail,
    };
    setIsLoading(true);
    await ApiHelper.post(API.typeChecking, typeData)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.modelType == "adult") {
            userType = "adult";
          } else if (resData.data.modelType == "brand") {
            userType = "brand";
          } else {
            userType = "Kids";
          }
        }
        if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            setIsLoading(false);
          }, 2000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
    if (userType) {
      if (userType == "brand") {
        const formData = {
          brandEmail: talentEmail,
        };
        setIsLoading(true);
        await ApiHelper.post(API.brandsForgotPassword, formData)
          .then((resData) => {
            if (resData.data.status === true) {
              setIsLoading(false);

              setMessage("Open Your Gmail For Password Reset Link!");
              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
                setIsLoading(false);
              }, 2000);
            } else if (resData.data.status === false) {
              setIsLoading(false);
              setMessage("Error Occured Try Again!");
              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
                setIsLoading(false);
              }, 1000);
            }
          })
          .catch((err) => {
            setIsLoading(false);
          });
      } else if (userType == "Kids") {
        let formdata = {
          email: talentEmail,
          type: userType,
        };
        await ApiHelper.post(API.forgotPassword, formdata)
          .then((resData) => {
            console.log(resData, "resData");
            if (resData.data.status === true) {
              setIsLoading(false);

              setMessage("Open Your Gmail For Password Reset Link!");
              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
              }, 2000);
            }
          })
          .catch((err) => {
            setIsLoading(false);
          });
      } else if (userType == "adult") {
        adultForgotPassword();
        setIsLoading(false);
      }
    }
  };

  const adultForgotPassword = async (enteredOTP) => {
    const formData = {
      adultEmail: talentEmail,
    };
    setIsLoading(true);

    await ApiHelper.post(API.adultForgotPassword, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);

          setMessage("Open Your Gmail For Password Reset Link!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            // navigate(`/reset-password`);
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage("Error Occured Try Again!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const kidsForgotPassword = async (enteredOTP) => {
    const formData = {
      email: talentEmail,
    };
    await ApiHelper.post(API.forgotPassword, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);

          setMessage("Open Your Gmail For Password Reset Link!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage("Error Occured Try Again!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <Header />
      <div className="login-main">
        <div className="login-container">
          <div className="forgot-logo">
            <img className="btLogo" src={btLogo} alt="" />
          </div>
          <div className="otp-title">Forgot Password</div>
          <div className="forgot-info">
            Please provide the email address that you used while registering
            with Brands & Talent. <br /> We will send you an Email containing
            your password information
          </div>
          <div className="mb-3 login-input-containers">
            <label className="form-label">Email</label>
            <div className="form-group has-search">
              <span className="fa fa-envelope form-control-feedback"></span>
              <input
                type="text"
                className="form-control adult-signup-inputs"
                placeholder="Email "
                onChange={(e) => {
                  setTalentEmail(e.target.value);
                  setTalentEmailError(false);
                }}
              ></input>
              {talentEmailError && (
                <div className="invalid-fields">Please enter Email</div>
              )}
            </div>
          </div>
          <div
            className="login-btn"
            onClick={() => forgotPassword(selectedItem)}
          >
            {isLoading ? "Loading..." : "Continue"}
          </div>
          <div className="resend-forgot" onClick={() => forgotPassword()}>
            Didn’t received the Email? <span>Resend</span>
          </div>
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default ForgotPassword;
