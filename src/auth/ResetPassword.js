import React, { useState, useEffect } from "react";
import "../assets/css/forms/login.css";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
import { useParams } from "react-router-dom";
import "../assets/css/register.css";
import "../assets/css/forms/kidsform-one.css";

const ResetPassword = () => {
  const btLogo = require("../assets/images/LOGO.png");
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
  const windowUrl = window.location.href;

  const queryString = windowUrl.split("?")[1];

  const pathParts = windowUrl.split("/");
  const userType = pathParts[4];
  const token = pathParts[5];

  const navigate = useNavigate();
  useEffect(() => {
    if (queryString) {
      setParamsValue(queryString);

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
    if (confirmPassword && passwordStatus) {
      if (passwordMatch) {
        if (userType == "brand") {
          const formData = {
            password: confirmPassword,
            resetPasswordToken: token,
          };
          setIsLoading(true);
          await ApiHelper.post(API.brandsResetPassword, formData)
            .then((resData) => {
              if (resData.data.status === true) {
                setIsLoading(false);
                setMessage("Your password has been successfully reset");
                setOpenPopUp(true);
                setTimeout(function () {
                  setOpenPopUp(false);
                  navigate(`/success-password?${paramsValue}`);
                }, 2000);
              } else if (resData.data.status === false) {
                setIsLoading(false);
                setMessage(resData.data.message);
                setOpenPopUp(true);
                setTimeout(function () {
                  setOpenPopUp(false);
                }, 1000);
              }
            })
            .catch((err) => {});
        } else if (userType == "adult") {
          const formData = {
            password: confirmPassword,
            resetPasswordToken: token,
          };
          setIsLoading(true);

          await ApiHelper.post(API.adultResetPassword, formData)
            .then((resData) => {
              if (resData.data.status === true) {
                setIsLoading(false);
                setMessage("Your password has been successfully reset");
                setOpenPopUp(true);
                setTimeout(function () {
                  setOpenPopUp(false);
                  navigate(`/success-password?${paramsValue}`);
                }, 2000);
              } else if (resData.data.status === false) {
                setIsLoading(false);
                setMessage(resData.data.message);
                setOpenPopUp(true);
                setTimeout(function () {
                  setOpenPopUp(false);
                }, 1000);
              }
            })
            .catch((err) => {});
        } else {
          const formData = {
            password: confirmPassword,
            resetPasswordToken: paramsValue,
          };
          setIsLoading(true);

          await ApiHelper.post(API.resetPassword, formData)
            .then((resData) => {
              if (resData.data.status === true) {
                setIsLoading(false);
                setMessage("Your password has been successfully reset");
                setOpenPopUp(true);
                setTimeout(function () {
                  setOpenPopUp(false);
                  navigate(`/success-password?${paramsValue}`);
                }, 2000);
              } else if (resData.data.status === false) {
                setIsLoading(false);
                setMessage(resData.data.message);
                setOpenPopUp(true);
                setTimeout(function () {
                  setOpenPopUp(false);
                }, 1000);
              }
            })
            .catch((err) => {});
        }
      } else {
        setMessage("Password Does not match!");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 2000);
      }
    } else if (!passwordStatus) {
      setMessage("Please Update All Required Fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    } else {
      setMessage("Please Update All Required Fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 2000);
    }
  };

  const [passwordStatus, setPasswordStatus] = useState(false);

  let line = document.querySelector(".line");
  let text = document.querySelector(".text");
  let password_strength_box = document.querySelector(".password_strength_box");
  let passwordCriteria = document.querySelector(".password");

  if (passwordCriteria && password_strength_box && line && text) {
    if (passwordCriteria.value.length == 0) {
      password_strength_box.style.display = "none";
    }

    passwordCriteria.oninput = function () {
      if (passwordCriteria.value.length == 0) {
        password_strength_box.style.display = "none";
      }

      if (passwordCriteria.value.length >= 1) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "5%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (passwordCriteria.value.length >= 2) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "10%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (passwordCriteria.value.length >= 3) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "20%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (passwordCriteria.value.length >= 4) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "35%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
        if (passwordCriteria.value.match(/[!@#$%^&*]/)) {
          setPasswordStatus(false);
          password_strength_box.style.display = "flex";
          line.style.width = "45%";
          line.style.backgroundColor = "#e9ee30";
          text.style.color = "#e9ee30";
          text.innerHTML = "Medium";
        }
      }
      if (
        passwordCriteria.value.length >= 5 &&
        passwordCriteria.value.match(/[A-Z]/) &&
        passwordCriteria.value.match(/[a-z]/)
      ) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "50%";
        line.style.backgroundColor = "#e9ee30";
        text.style.color = "#e9ee30";
        text.innerHTML = "Medium";
      }
      if (
        passwordCriteria.value.length >= 6 &&
        passwordCriteria.value.match(/[0-9]/)
      ) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "70%";
        line.style.backgroundColor = "#e9ee30";
        text.style.color = "#e9ee30";
        text.innerHTML = "Medium";
      }
      if (
        passwordCriteria.value.length >= 7 &&
        passwordCriteria.value.match(/[A-Z]/) &&
        passwordCriteria.value.match(/[a-z]/) &&
        passwordCriteria.value.match(/[0-9]/)
      ) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "80%";
        line.style.backgroundColor = "#e9ee30";
        text.style.color = "#e9ee30";
        text.innerHTML = "Medium";
      }

      if (
        passwordCriteria.value.length >= 8 &&
        passwordCriteria.value.match(/[A-Z]/) &&
        passwordCriteria.value.match(/[a-z]/) &&
        passwordCriteria.value.match(/[0-9]/) &&
        passwordCriteria.value.match(/[!@#$%^&*]/)
      ) {
        setPasswordStatus(true);
        password_strength_box.style.display = "flex";
        line.style.width = "100%";
        line.style.backgroundColor = "#2ccc2c";
        text.style.color = "#2ccc2c";
        text.innerHTML = "Strong";
      }
    };
  }

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
                className="form-control password adult-signup-inputs"
                placeholder="Password"
                onChange={(e) => {
                  handlePasswordChange(e);
                }}
              ></input>
              <div className="password_strength_box">
                <div className="password_strength">
                  <p className="text">Weak</p>
                  <div className="line_box">
                    <div className="line"></div>
                  </div>
                </div>
                <div className="tool_tip_box">
                  <span>
                    <i className="bi bi-question-circle"></i>
                  </span>
                  <div className="tool_tip">
                    <p style={{ listStyleType: "none" }}>
                      <b>Password must be:</b>
                    </p>
                    <p>1 capital letter (A, B, C...)</p>
                    <p>1 small letter (a, b, c...)</p>
                    <p>1 number (1, 2, 3...)</p>
                    <p>1 special symbol (!, @, #...)</p>
                  </div>
                </div>
              </div>
              {password && !passwordStatus && (
                <div className="invalid-fields password-error-box">
                  Your password must be at least 8 characters long and include
                  at least: 1 capital letter (A, B, C...), 1 small letter (a, b,
                  c...), 1 number (1, 2, 3...), 1 special symbol (!, @, #...)
                </div>
              )}
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
                className="form-control adult-signup-inputs"
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
              <p className="password-wrong">Password does not match.</p>
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
