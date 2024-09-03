import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/otp.css";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";
import "../assets/css/register.css";

const KidsOTP = () => {
  const navigate = useNavigate();

  const btLogo = require("../assets/images/LOGO.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = window.location.href;
  const queryString = url.split("?")[1];

  useEffect(() => {
    // Initialize inputRefs with the correct number of refs
    inputRefs.current = otp.map(
      (_, i) => inputRefs.current[i] ?? React.createRef()
    );
  }, [otp]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if typing
    if (
      value !== "" &&
      index < otp.length - 1 &&
      inputRefs.current[index + 1]?.current
    ) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    // Handle backspace navigation
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      if (inputRefs.current[index - 1]?.current) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  const handleVerify = () => {
    const newOTP = otp.join("");

    otpVerification(newOTP);
    setOtp(["", "", "", ""]);
    inputRefs[0].current.focus();
  };

  const otpVerification = async (newOTP) => {
    const formData = {
      otp: newOTP,
      parentEmail: queryString,
    };

    await ApiHelper.post(API.otpVerification, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Successfully Verified");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
          setTimeout(function () {
            let successData = "verified";
            navigate(
              `/talent-social-media-connections?${resData.data.data["userId"]}`
            );
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("Enter Correct OTP");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  const otpResend = () => {
    const newOTP = otp.join("");

    resendOtp(newOTP);
    setOtp(["", "", "", ""]);
    inputRefs[0].current.focus();
  };

  const resendOtp = async (newOTP) => {
    const formData = {
      parentEmail: queryString,
    };
    setIsLoading(true);
    await ApiHelper.post(API.otpResend, formData)
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
          <div className="step-text">Step 2 of 6</div>
        </div>
        <button
          type="button"
          className="btn-close"
          onClick={() => {
            navigate("/");
          }}
        ></button>
      </div>
      <div
        className="otp-main"
        style={{
          marginTop: "100px",
        }}
      >
        <div className="otp-container">
          <div className="otp-title">OTP Verification</div>
          <div className="otp-enter">Please enter the OTP we just sent to</div>
          <div className="otp-mail">{queryString}</div>
          <div className="otp-boxes">
            <form action="" className="mt-4 otp-form">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  className="otp"
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  ref={inputRefs[index]}
                />
              ))}
            </form>
          </div>
          <div className="verify-otp" onClick={handleVerify}>
            Verify Now
          </div>
          <div className="otp-info" onClick={otpResend}>
            Didn’t received the OTP?{" "}
            <span>{isLoading ? "Resend..." : "Resend"}</span>
          </div>
          {/* <div
            className="otp-back"
            onClick={() => navigate(`/talent-signup-basic-details`)}
          >
            Back
          </div> */}
          <div
            className="otp-logo"
            style={{
              top: "-30",
            }}
          >
            <img className="btLogo" src={btLogo} alt="" />
          </div>
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default KidsOTP;
