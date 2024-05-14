import React, { useState, useEffect, useRef } from "react";
import "../assets/css/dashboard.css";
import "../assets/css/register.scss";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import Axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import MyFacebookLoginButton from "./facebookButton";
import PopUp from "../components/PopUp";
const AdultSignup = () => {
  const navigate = useNavigate();
  const btLogo = require("../assets/icons/Group 56.png");
  const fbLogo = require("../assets/icons/fbLogo.png");
  const googleLogo = require("../assets/icons/googleLogo.png");
  const kidsImage = require("../assets/images/kidsImage.png");
  const [adultSignupDisabled, setAdultSignupDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [adultName, setAdultName] = useState("");
  const [adultEmail, setAdultEmail] = useState("");
  const [adultPassword, setAdultPassword] = useState("");
  const [adultConfirmPassword, setAdultConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [googleUser, setGoogleUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [talentPasswordError, settalentPasswordError] = useState(false);
  const [talentConfirmPasswordError, settalentConfirmPasswordError] = useState(
    false
  );
  const [talentConfirmPassword, setTalentConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setAdultPassword(e.target.value);
    setPasswordMatch(e.target.value === adultConfirmPassword);
    setPasswordError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setAdultConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === adultPassword);
    setConfirmPasswordError(false);
  };

  useEffect(() => {
    //code for google auth
    console.log(googleUser, "googleUser");
  }, [googleUser]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const socialSignup = async (response, mediaType) => {
    console.log(response, "socialSignupresponse");
    console.log(mediaType, "mediaType");
    // facebookId
    //provider : "facebook".
    let formData;
    if (mediaType == "google") {
      formData = {
        adultEmail: response?.email,
        googleId: response?.sub,
        provider: "google",
      };
    } else if (mediaType == "facebook") {
      formData = {
        adultEmail: response?.data?.email,
        facebookId: response?.data?.id,
        provider: "facebook",
      };
    }
    await ApiHelper.post(API.socialSignup, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          // alert("dfd");
          console.log(resData.data, "resdata.data socialSignup");
          setGoogleUser(resData?.data);
          setMessage("Registered Successfully Please Update Your Password");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            navigate("/update-talent-password", {
              state: { data: resData.data },
            });
          }, 2000);
        } else if (resData.data.status === false) {
        }
      })
      .catch((err) => {
        setMessage("Error Occured Try Again");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
        }, 1000);
      });
  };

  const adultSignUp = async () => {
    if (adultEmail === "") {
      setEmailError(true);
    }
    if (adultName === "") {
      setNameError(true);
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
      adultConfirmPassword !== "" &&
      passwordMatch === true
    ) {
      const formData = {
        adultEmail: adultEmail,
        talentPassword: adultPassword,
        confirmPassword: adultConfirmPassword,
      };
      setIsLoading(true);

      await ApiHelper.post(API.adultSignUp, formData)
        .then((resData) => {
          setIsLoading(false);
          if (resData.data.status === true) {
            console.log(resData.data, "adultSignUp");

            setMessage("Registered Successfully");
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
              navigate(`/otp-verification?${resData?.data?.data}`);
            }, 2000);
          } else if (resData.data.status === false) {
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setMessage("Error Occured Try Again");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        });
    } else {
      setMessage("Please Update All Required Fields");
      setOpenPopUp(true);
      setTimeout(function() {
        setOpenPopUp(false);
      }, 1000);
    }
    if (!passwordMatch) {
      setMessage("Please Update All Required Fields");
      setOpenPopUp(true);
      setTimeout(function() {
        setOpenPopUp(false);
      }, 1000);
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
            <div className="step-text">Step 1 of 3</div>
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
          className="dialog-body"
          style={{
            paddingBottom: "100px",
            paddingTop: "45px",
            height: "unset",
          }}
        >
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
                    setEmailError(false);
                  }}
                  value={googleUser?.email}
                ></input>
                {emailError && (
                  <div className="invalid-fields">Please enter Email</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Name<span className="mandatory">*</span>
              </label>
              <div className="form-group has-search">
                <span className="fa fa-user form-control-feedback"></span>
                <input
                  type="text"
                  className="form-control adult-signup-inputs"
                  placeholder="Your Name "
                  onChange={(e) => {
                    setAdultName(e.target.value);
                    setNameError(false);
                  }}
                ></input>
                {nameError && (
                  <div className="invalid-fields">Please enter Name</div>
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
                    handlePasswordChange(e);
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
                    handleConfirmPasswordChange(e);
                    setAdultConfirmPassword(e.target.value);
                    setConfirmPasswordError(false);
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
                {!passwordMatch &&
                  adultConfirmPassword &&
                  adultConfirmPassword.length && (
                    <p className="password-wrong">Passwords does not match.</p>
                  )}
              </div>
            </div>

            <div className="stroke-wrapper">
              <div className="stroke-div"></div>
              <div className="or-signup">Or Signup with</div>
              <div className="stroke-div"></div>
            </div>
            <div className="signup-options">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  socialSignup(
                    jwtDecode(credentialResponse?.credential),
                    "google"
                  );
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              {/* <LoginSocialFacebook>
                <FacebookLoginButton></FacebookLoginButton>
              </LoginSocialFacebook> */}
              <LoginSocialFacebook
                appId="7401795359899121"
                onResolve={(response) => {
                  socialSignup(response, "facebook");
                  console.log(response, "responsefacebook");
                }}
                onReject={(error) => {
                  console.log(error, "error");
                }}
              >
                <MyFacebookLoginButton />
              </LoginSocialFacebook>

              {/* <div className="google-media">
                <img src={googleLogo} alt="" />
                <div className="media-text">Google</div>
              </div> */}
            </div>
            <div className="signup-terms">
              By registering you confirm that you accept the 
            </div>
            <div className="signup-terms-linetwo">
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
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default AdultSignup;
