import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/otp.scss";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
const AdultsOTP = ({ sendDataToParent, ...props }) => {
  const btLogo = require("../assets/icons/Group 56.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [registeredEmail, setRegisteredEmail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isVeryfying, setIsVeryfying] = useState(false);
  const sendData = () => {
    const data = "back";
    // Call the function passed from parent with data as argument
    sendDataToParent(data);
  };

  useEffect(() => {
    console.log(props, "props Adultotp");
    setRegisteredEmail(props?.adultParentData?.data);
  }, [props]);

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
      adultEmail: registeredEmail,
    };
    console.log(formData, "formData otpVerificationAdult");
    setIsVeryfying(true);
    await ApiHelper.post(API.otpVerificationAdult, formData)
      .then((resData) => {
        console.log("otpVerificationAdult response", resData.data);
        if (resData.data.status === true) {
          setMessage("Verification SuccessFull");
          setIsVeryfying(false);
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
          setTimeout(function() {
            let successData = "verified";
            sendDataToParent(successData);
          }, 1000);
        } else if (resData.data.status === false) {
          setIsVeryfying(false);
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
      adultEmail: registeredEmail,
    };
    setIsLoading(true);
    await ApiHelper.post(API.otpResendAdult, formData)
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
      <div className="otp-main">
        <div className="otp-container">
          <div className="otp-title">
            <span className="bold-otp">OTP</span>
            <span>Verification</span>
          </div>
          <div className="otp-enter">Please enter the code we just send to</div>
          <div className="otp-mail">{registeredEmail}</div>
          <div className="otp-boxes">
            <form action="" className="mt-5 otp-form">
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
            {isVeryfying ? "Verifying..." : "Verify Now"}
          </div>
          <div className="otp-info" onClick={otpResend}>
            If you didn’t receive a code?{" "}
            <span>{isLoading ? "Resend..." : "Resend"}</span>
          </div>
          <div className="otp-back" onClick={sendData}>
            Back
          </div>
        </div>
        <div className="otp-logo">
          <img src={btLogo} alt="" />
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default AdultsOTP;
