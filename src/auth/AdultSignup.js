import React, { useState, useEffect, useRef } from "react";
import "../assets/css/dashboard.css";
import "../assets/css/register.scss";
import { useNavigate } from "react-router";
import PopUp from "../components/PopUp";
import { useLocation } from "react-router-dom";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import Axios from "axios";

const AdultSignup = () => {
  const navigate = useNavigate();
  const btLogo = require("../assets/icons/Group 56.png");
  const fbLogo = require("../assets/icons/fbLogo.png");
  const googleLogo = require("../assets/icons/googleLogo.png");
  const kidsImage = require("../assets/images/kidsImage.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [adultSignupDisabled, setAdultSignupDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [adultEmail, setAdultEmail] = useState("");
  const [adultPassword, setAdultPassword] = useState("");
  const [adultConfirmPassword, setAdultConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const adultSignUp = async () => {
    if (adultEmail === "") {
      setEmailError(true);
    }
    if (adultPassword === "") {
      setPasswordError(true);
    }
    if (adultConfirmPassword === "") {
      setConfirmPasswordError(true);
    }

    if (
      adultEmail !== "" &&
      adultPassword !== "" &&
      adultConfirmPassword !== ""
    ) {
      const formData = {
        adultEmail: adultEmail,
        talentPassword: adultPassword,
        confirmPassword: adultConfirmPassword,
      };
      setIsLoading(true);

      await ApiHelper.post(API.adultSignUp, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            console.log(resData.data);
            setIsLoading(false);
            setMessage("Registered SuccessFully!");
            navigate(`/otp-verification?${resData?.data?.data}`);
            //   setAdultParentData(resData?.data);
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
            }, 1000);
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
          setIsLoading(false);
          setMessage("Error Occured Try Again!");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        });
    }
  };

  return (
    <>
      <div className="form-dialog">
        <div className="header-wrapper">
          <div className="step-wrapper">
            <img
              className="modal-logo"
              onClick={() => {
                navigate("/");
              }}
              src={btLogo}
            ></img>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              navigate("/");
            }}
          ></button>
        </div>
        <div className="dialog-body">
          <div className="adult-signup-main">
            <div className="step-title">Sign up</div>
            <div className="mb-3">
              <label className="form-label">
                Email<span className="mandatory">*</span>
              </label>
              <div className="form-group has-search">
                <span className="fa fa-envelope form-control-feedback"></span>
                <input
                  type="text"
                  className="form-control adult-signup-inputs"
                  placeholder="Email "
                  onChange={(e) => {
                    setAdultEmail(e.target.value);
                  }}
                ></input>
                {emailError && (
                  <div className="invalid-fields">Please enter Email</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Password<span className="mandatory">*</span>
              </label>
              <div className="form-group has-search adult-password-wrapper">
                <span className="fa fa-lock form-control-feedback"></span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control adult-signup-inputs"
                  placeholder="Password"
                  onChange={(e) => {
                    setAdultPassword(e.target.value);
                  }}
                ></input>
                {passwordError && (
                  <div className="invalid-fields">Please enter Password</div>
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
            <div className="mb-1">
              <label className="form-label">
                Confirm Password<span className="mandatory">*</span>
              </label>
              <div className="form-group has-search adult-confirm-password-wrapper">
                <span className="fa fa-lock form-control-feedback"></span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control adult-signup-inputs"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setAdultConfirmPassword(e.target.value);
                  }}
                ></input>
                {confirmPasswordError && (
                  <div className="invalid-fields">
                    Please enter Confirm Password
                  </div>
                )}
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
            </div>

            <div className="stroke-wrapper">
              <div className="stroke-div"></div>
              <div className="or-signup">Or Signup with</div>
              <div className="stroke-div"></div>
            </div>
            <div className="signup-options">
              <div className="google-media">
                <img src={googleLogo} alt="" />
                <div className="media-text">Google</div>
              </div>
            </div>
            <div className="signup-terms">
              By registering you confirm that you accept the 
              <span>Terms & Conditions</span> and 
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
        <div className="dialog-footer">
          <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
            className="step-back"
          >
            Back
          </button>
          <button
            type="button"
            className="step-continue"
            onClick={(e) => {
              adultSignUp();
            }}
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>
      ;
    </>
  );
};

export default AdultSignup;
