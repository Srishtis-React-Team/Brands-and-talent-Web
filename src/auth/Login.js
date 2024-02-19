import React, { useState, useEffect } from "react";
import "../assets/css/forms/login.scss";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
const Login = () => {
  const btLogo = require("../assets/icons/Group 56.png");
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
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleClick = (item) => {
    setSelectedItem(item);
  };
  const kidsLogin = async (enteredOTP) => {
    const formData = {
      parentEmail: talentEmail,
      talentPassword: talentPassword,
    };
    console.log(formData, "formData kidsLogin");
    await ApiHelper.post(API.kidsLogin, formData)
      .then((resData) => {
        console.log("kidsLogin response", resData.data);
        if (resData.data.status === true) {
          setMessage("Logged In SuccessFully!");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          console.log("false called");
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
  };

  return (
    <>
      <div className="login-main">
        <div className="login-container">
          <div className="choose-who">
            <div
              className={`iam-brand ${
                selectedItem === "brand" ? "selected" : ""
              }`}
              onClick={() => handleClick("brand")}
            >
              I am a Brand
            </div>

            {/* <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                checked
              ></input>
              <label class="form-check-label" for="flexSwitchCheckChecked">
                Checked switch checkbox input
              </label>
            </div> */}

            <div
              className={`iam-talent ${
                selectedItem === "talent" ? "selected" : ""
              }`}
              onClick={() => handleClick("talent")}
            >
              I am a Talent
            </div>
          </div>
          <div className="step-selection login-form">
            <div className="select-wrapper login-inputs email-input">
              <img src={mailIcon}></img>
              <input
                type="text"
                className="select-text absolute-input"
                placeholder="Gmail"
                onChange={(e) => {
                  setTalentEmail(e.target.value);
                }}
              />
            </div>
            <div className="select-wrapper login-inputs password-wrapper">
              <div>
                <img src={lockiIcon}></img>
                <input
                  type={showPassword ? "text" : "password"}
                  className="select-text absolute-input password-input"
                  placeholder="Password"
                  onChange={(e) => {
                    setTalentPassword(e.target.value);
                  }}
                />
              </div>
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-slash-fill"
                  viewBox="0 0 16 16"
                  onClick={togglePasswordVisibility}
                >
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                  onClick={togglePasswordVisibility}
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                </svg>
              )}
            </div>
            <div className="login-forgot">Forgot Password?</div>
            <div className="login-btn" onClick={kidsLogin}>
              Login
            </div>
            <div className="stroke-wrapper">
              <div className="stroke-div"></div>
              <div className="or-signup">Or</div>
            </div>
            <div className="gmail-options">
              <img src={gmail} alt="" />
              <div className="google-text">Continue With Gmail Address</div>
            </div>
          </div>
        </div>
        <div className="login-logo">
          <img src={btLogo} alt="" />
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Login;
