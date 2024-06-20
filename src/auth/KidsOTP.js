import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/otp.scss";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
const KidsOTP = () => {
  const navigate = useNavigate();

  const btLogo = require("../assets/images/LOGO.jpg");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [isLoading, setIsLoading] = useState(false);
  //   const [userId, setUserId] = useState(null);
  //   const [emailID, setEmailID] = useState(null);
  const url = window.location.href;
  const queryString = url.split("?")[1];
  console.log(" queryString:", queryString);
  useEffect(() => {
    // const storedUserId = localStorage.getItem("userId");
    // const storedEmailID = localStorage.getItem("emailID");
    // if (storedUserId) {
    //   setUserId(storedUserId);
    // }
    // if (storedEmailID) {
    //   setEmailID(storedEmailID);
    // }
  }, []);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field
    if (value !== "" && index < otp.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleVerify = () => {
    const newOTP = otp.join("");
    console.log(newOTP, "newOTP");
    // Perform verification logic here, such as sending OTP to the server for validation
    otpVerification(newOTP);
    // Reset OTP input fields
    setOtp(["", "", "", ""]);
    // Reset focus to the first input field
    inputRefs[0].current.focus();
  };

  const otpVerification = async (newOTP) => {
    const formData = {
      otp: newOTP,
      parentEmail: queryString,
    };
    console.log(formData, "formData otpVerification");
    await ApiHelper.post(API.otpVerification, formData)
      .then((resData) => {
        console.log("otpVerification response", resData.data);
        if (resData.data.status === true) {
          setMessage("Verification Successful");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
          setTimeout(function() {
            let successData = "verified";
            navigate(
              `/talent-social-media-connections?${resData.data.data["userId"]}`
            );
          }, 1000);
        } else if (resData.data.status === false) {
          console.log("false called");
          setMessage("Enter Correct OTP");
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

  const otpResend = () => {
    const newOTP = otp.join("");
    console.log(newOTP, "newOTP");
    // Perform verification logic here, such as sending OTP to the server for validation
    resendOtp(newOTP);
    // Reset OTP input fields
    setOtp(["", "", "", ""]);
    // Reset focus to the first input field
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
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("Send Again");
          setOpenPopUp(true);
          setIsLoading(false);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
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
          <div className="otp-enter">Please enter the code we just send to</div>
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
            If you didn’t receive a code?{" "}
            <span>{isLoading ? "Resend..." : "Resend"}</span>
          </div>
          <div
            className="otp-back"
            onClick={() => navigate(`/talent-signup-basic-details`)}
          >
            Back
          </div>
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
