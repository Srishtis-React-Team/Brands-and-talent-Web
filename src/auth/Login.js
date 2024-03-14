import React, { useState, useEffect } from "react";
import "../assets/css/forms/login.scss";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
const Login = () => {
  const btLogo = require("../assets/icons/Group 56.png");
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
  const [selectedItem, setSelectedItem] = useState("brand");
  const [talentName, setTalentName] = useState("");
  const [talentPassword, setTalentPassword] = useState("");
  const [talentEmail, setTalentEmail] = useState("");
  const [paramsValue, setParamsValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [emailID, setEmailID] = useState(null);

  // Function to get user ID
  const getUserIdLocalStorage = () => {
    return localStorage.getItem("userId");
  };

  const navigate = useNavigate();
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedEmailID = localStorage.getItem("emailID");

    if (storedUserId) {
      setUserId(storedUserId);
    }
    if (storedEmailID) {
      setEmailID(storedEmailID);
    }
  }, [paramsValue]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const selectType = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleForgotPassword = (userType) => {
    navigate(`/forgot-password?${userType}`);
  };

  const login = async (enteredOTP) => {
    const formData = {
      email: talentEmail,
      password: talentPassword,
    };
    console.log(formData, "formData talentLogin");
    setIsLoading(true);
    await ApiHelper.post(API.talentLogin, formData)
      .then((resData) => {
        console.log("talentLogin response", resData);
        if (resData.data.status === true) {
          console.log("called");
          setIsLoading(false);
          setMessage("Logged In SuccessFully!");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            setUserIdLocalStorage(resData.data.data);
          }, 1000);
          if (resData.data.type === "adult") {
            console.log("adult block");
            navigate(`/talent-dashboard`);
          } else if (resData.data.type === "kids") {
            navigate(`/otp`);
          }
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

  // Function to set user ID
  const setUserIdLocalStorage = (data) => {
    console.log(data, "data otp");
    localStorage.setItem("userId", data?.user?._id);
    localStorage.setItem("emailID", data?.email);
    setUserId(userId);
  };

  return (
    <>
      <Header />
      <div className="login-main">
        <div className="login-container">
          <div className="choose-who">
            <div
              className={`iam-brand ${
                selectedItem === "brand" ? "selected" : ""
              }`}
              onClick={() => handleClick("brand")}
            >
              I" am a Brand
            </div>
            <div
              className={`iam-talent ${
                selectedItem === "talent" ? "selected" : ""
              }`}
              onClick={() => handleClick("talent")}
            >
              I" am a Talent
            </div>
          </div>
          {/* <div className="mb-3 login-input-containers">
            <label className="form-label">User Type</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={selectType}
            >
              <option value="" disabled selected>
                Select User Type
              </option>
              <option defaultValue value="brand">
                Brand
              </option>
              <option value="brand">Talent</option>
            </select>
          </div> */}
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
                }}
              ></input>
            </div>
          </div>
          <div className="mb-3 login-input-containers">
            <label className="form-label">Password</label>
            <div className="form-group has-search adult-password-wrapper">
              <span className="fa fa-lock form-control-feedback"></span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control adult-signup-inputs"
                placeholder="Password"
                onChange={(e) => {
                  setTalentPassword(e.target.value);
                }}
              ></input>
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
          <div className="stroke-wrapper login-input-containers">
            <div className="stroke-div"></div>
            <div className="or-signup">Or Login with</div>
            <div className="stroke-div"></div>
          </div>
          <div className="signup-options login-input-containers">
            <div className="google-media">
              <img src={googleLogo} alt="" />
              <div className="media-text">Google</div>
            </div>
          </div>
          <div
            className="login-forgot"
            onClick={() => handleForgotPassword(selectedItem)}
          >
            Forgot Password?
          </div>
          <div className="login-btn" onClick={login}>
            {isLoading ? "Loading..." : "Login"}
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
