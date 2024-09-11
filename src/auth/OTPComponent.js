import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/otp.css";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";
import "../assets/css/register.css";
import "../assets/css/forms/kidsform-one.css";
import "../assets/css/forms/login.css";
import "../assets/css/dashboard.css";

const OTPComponent = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const btLogo = require("../assets/images/LOGO.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [emailID, setEmailID] = useState(null);

  const url = window.location.href;
  const queryString = url.split("?")[1];

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedEmailID = localStorage.getItem("emailID");
    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (storedEmailID) {
      setEmailID(storedEmailID);
    }
  }, []);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    setOtp(newOtp);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text").split("");
    if (pastedData.length === 4) {
      setOtp(pastedData);
      inputRefs.current[3].focus();
    }
  };

  const handleVerify = () => {
    const newOTP = otp.join("");
    otpVerification(newOTP);
    setOtp(["", "", "", ""]);
    inputRefs.current[0].focus();
  };

  const otpVerification = async (newOTP) => {
    const formData = {
      otp: newOTP,
      adultEmail: queryString,
    };
    setIsLoading(true);

    await ApiHelper.post(API.otpVerificationAdult, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Successfully Verified");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
          setIsLoading(false);
          setTimeout(function () {
            let successData = "verified";
            navigate(`/login?type=talent&user_id=${resData?.data?.data}`);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("Enter Correct OTP");
          setOpenPopUp(true);
          setIsLoading(false);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const otpResend = () => {
    const newOTP = otp.join("");

    resendOtp(newOTP);
    setOtp(["", "", "", ""]);
    inputRefs[0].current.focus();
  };

  const resendOtp = async (newOTP) => {
    const formData = {
      adultEmail: queryString,
    };
    setIsLoading(true);

    await ApiHelper.post(API.otpResendAdult, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setIsLoading(false);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("Send Again");
          setOpenPopUp(true);
          setIsLoading(false);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="header-wrapper">
        <div className="step-wrapper">
          <img
            className="modal-logo"
            onClick={() => {
              navigate("/");
            }}
            src={btLogo}
          ></img>
          <div className="step-text">Step 2 of 2</div>
        </div>
        <button
          type="button"
          className="btn-close"
          onClick={() => {
            navigate("/");
          }}
        ></button>
      </div>
      <div className="adult-otp-main">
        <div className="otp-container">
          <div className="adult-otp-logo">
            <img className="btLogo" src={btLogo} alt="" />
          </div>
          <div className="otp-title">OTP Verification</div>
          <div className="otp-enter">Please enter the OTP we just sent to</div>
          <div className="otp-mail">{queryString}</div>
          <div className="otp-boxes">
            <div onPaste={handlePaste}>
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="otp"
                  value={value}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  style={{
                    width: "50px",
                    height: "50px",
                    fontSize: "24px",
                    textAlign: "center",
                    marginRight: "10px",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="verify-otp" onClick={handleVerify}>
            {isLoading ? "Loading..." : "Verify Now"}
          </div>
          <div className="otp-info" onClick={otpResend}>
            Didn’t received the OTP?{" "}
            <span>{isLoading ? "Resend..." : "Resend"}</span>
          </div>
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default OTPComponent;
