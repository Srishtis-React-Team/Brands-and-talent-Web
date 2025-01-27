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
import { LocalLaundryService } from "@mui/icons-material";

const KidsOTP = () => {
  const paramsValues = window.location.search;
  const urlParams = new URLSearchParams(paramsValues);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const btLogo = require("../assets/images/LOGO.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const url = window.location.href;
  // const queryString = url.split("?")[1];

  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get the current URL
    const url = window.location.href;

    // Create a new URLSearchParams object with the query string
    const params = new URLSearchParams(window.location.search);

    // Extract userId and userEmail from the URL query string
    const userIdFromUrl = params.get("userId");
    const userEmailFromUrl = params.get("userEmail");

    // Save the values into state
    if (userIdFromUrl) setUserId(userIdFromUrl);
    if (userEmailFromUrl) setUserEmail(userEmailFromUrl);
  }, []);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }

    setOtp(newOtp);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text").split("");
    if (pastedData.length === 4) {
      setOtp(pastedData);
      inputsRef.current[3].focus();
    }
  };

  const handleVerify = () => {
    const newOTP = otp.join("");
    otpVerification(newOTP);
    setOtp(["", "", "", ""]);
    inputsRef.current[0].focus();
  };

  const otpVerification = async (newOTP) => {
    const formData = {
      otp: newOTP,
      parentEmail: userEmail,
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
            localStorage.setItem("userEmail", resData.data.data.parentEmail);
            navigate(
              `/talent-kids-teen-social-media-connections?userId=${userId}&userEmail=${userEmail}`
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
    inputsRef[0]?.current?.focus();
  };

  const resendOtp = async (newOTP) => {
    const formData = {
      parentEmail: userEmail,
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

  const goBack = async () => {
    navigate(
      `/talent-kids-teen-signup-basic-details?userId=${userId}&userEmail=${userEmail}`
    );
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
          <div className="otp-mail">{userEmail}</div>
          <div className="otp-boxes">
            <div onPaste={handlePaste}>
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={value}
                  className="otp"
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
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
            Verify Now
          </div>
          <div className="otp-info" onClick={otpResend}>
            Didn’t received the OTP?{" "}
            <span>{isLoading ? "Resend..." : "Resend"}</span>
          </div>
          <div
            className="otp-back"
            onClick={(e) => {
              goBack();
            }}
          >
            <p>Back</p>
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
