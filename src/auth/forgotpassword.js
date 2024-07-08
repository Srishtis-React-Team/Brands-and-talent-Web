import React, { useState, useEffect } from "react";
import "../assets/css/forms/login.scss";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
const ForgotPassword = () => {
  const btLogo = require("../assets/images/LOGO.jpg");
  const googleLogo = require("../assets/icons/googleLogo.png");
  const importIcon = require("../assets/icons/instagram.png");
  const userIcon = require("../assets/icons/user.png");
  const mailIcon = require("../assets/icons/mail.png");
  const lockiIcon = require("../assets/icons/lock.png");
  const eyeOff = require("../assets/icons/eye-off.png");
  const eyeOpen = require("../assets/icons/eyeOpen.png");
  const gmail = require("../assets/icons/social-media-icons/gmail.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [talentName, setTalentName] = useState("");
  const [talentPassword, setTalentPassword] = useState("");
  const [talentEmail, setTalentEmail] = useState("");
  const [talentEmailError, setTalentEmailError] = useState(false);
  const [paramsValue, setParamsValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Get the current URL
  const url = window.location.href;
  const queryString = url.split("?")[1];
  console.log("Search queryString:", typeof queryString);
  console.log("Search queryString:", queryString);
  const navigate = useNavigate();
  useEffect(() => {
    if (queryString) {
      setParamsValue(queryString);
      console.log(paramsValue, "paramsValue");
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
    await ApiHelper.post(API.typeChecking, typeData)
      .then((resData) => {
        if (resData.data.status === true) {
          console.log(resData.data.modelType, "resData.data");
          if (resData.data.modelType == "adult") {
            userType = "adult";
          } else if (resData.data.modelType == "brand") {
            userType = "brand";
          } else {
            userType = "Kids";
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    if (userType) {
      if (userType == "brand") {
        const formData = {
          brandEmail: talentEmail,
        };
        setIsLoading(true);
        console.log(formData, "formData kidsLogin");
        await ApiHelper.post(API.brandsForgotPassword, formData)
          .then((resData) => {
            if (resData.data.status === true) {
              setIsLoading(false);
              console.log("true resData");
              setMessage("Open Your Gmail For Password Reset Link!");
              setOpenPopUp(true);
              setTimeout(function() {
                setOpenPopUp(false);
                // navigate(`/reset-password`);
              }, 2000);
            } else if (resData.data.status === false) {
              setIsLoading(false);
              setMessage("Error Occured Try Again!");
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
        let formdata = {
          email: talentEmail,
          type: userType,
        };
        await ApiHelper.post(API.forgotPassword, formdata)
          .then((resData) => {
            if (resData.data.status === true) {
              setMessage("Open Your Gmail For Password Reset Link!");
              setOpenPopUp(true);
              setTimeout(function() {
                setOpenPopUp(false);
                // navigate(`/reset-password`);
              }, 2000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    // if (queryString === "brand") {
    //   const formData = {
    //     brandEmail: talentEmail,
    //   };
    //   setIsLoading(true);
    //   console.log(formData, "formData kidsLogin");
    //   await ApiHelper.post(API.brandsForgotPassword, formData)
    //     .then((resData) => {
    //       if (resData.data.status === true) {
    //         setIsLoading(false);
    //         console.log("true resData");
    //         setMessage("Open Your Gmail For Password Reset Link!");
    //         setOpenPopUp(true);
    //         setTimeout(function() {
    //           setOpenPopUp(false);
    //           // navigate(`/reset-password`);
    //         }, 2000);
    //       } else if (resData.data.status === false) {
    //         setIsLoading(false);
    //         setMessage("Error Occured Try Again!");
    //         setOpenPopUp(true);
    //         setTimeout(function() {
    //           setOpenPopUp(false);
    //         }, 1000);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else if (queryString === "talent") {
    //   let typeData = {
    //     email: talentEmail,
    //   };
    //   await ApiHelper.post(API.typeChecking, typeData)
    //     .then((resData) => {
    //       if (resData.data.status === true) {
    //         console.log(resData.data.modelType, "resData.data");
    //         if (resData.data.modelType == "adult") {
    //           adultForgotPassword();
    //         } else {
    //           kidsForgotPassword();
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  };

  const adultForgotPassword = async (enteredOTP) => {
    const formData = {
      adultEmail: talentEmail,
    };
    await ApiHelper.post(API.adultForgotPassword, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          console.log("true resData");
          setMessage("Open Your Gmail For Password Reset Link!");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            // navigate(`/reset-password`);
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage("Error Occured Try Again!");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
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
          console.log("true resData");
          setMessage("Open Your Gmail For Password Reset Link!");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            // navigate(`/reset-password`);
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage("Error Occured Try Again!");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />

      <div className="login-main">
        <div className="login-container">
          <div className="otp-title">Forgot Password</div>
          <div className="forgot-info">
            Please enter your email , we will send verification code to your
            email.
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
                <div className="invalid-fields">Please Enter Email</div>
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
            If you didn’t receive a code? <span>Resend</span>
          </div>
        </div>
        <div className="forgot-logo">
          <img className="btLogo" src={btLogo} alt="" />
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default ForgotPassword;
