import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/register.scss";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";
import Axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Spinner from "../../components/Spinner";
import PopUp from "../../components/PopUp";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
const BrandSignup = () => {
  const navigate = useNavigate();
  const btLogo = require("../../assets/icons/Group 56.png");
  const fbLogo = require("../../assets/icons/fbLogo.png");
  const googleLogo = require("../../assets/icons/googleLogo.png");
  const kidsImage = require("../../assets/images/kidsImage.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [adultSignupDisabled, setAdultSignupDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    //code for google auth
    console.log(openPopUp, "openPopUp");
  }, [openPopUp]);

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
    setIsLoading(true);
    await ApiHelper.post(API.socialSignup, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          // alert("dfd");
          console.log(resData.data, "resdata.data socialSignup");
          setIsLoading(false);
          setMessage("Registered SuccessFully! Update Your Password");
          setGoogleUser(resData?.data);
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
          navigate("/update-talent-password", {
            state: { data: resData.data },
          });
          setIsLoading(false);
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
      adultConfirmPassword !== ""
    ) {
      const formData = {
        adultEmail: adultEmail,
        talentPassword: adultPassword,
        confirmPassword: adultConfirmPassword,
      };
      // setIsLoading(true);
      await ApiHelper.post(API.adultSignUp, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            console.log(resData.data);
            // setIsLoading(false);
            setMessage("Registered SuccessFully!");
            navigate(`/otp-verification?${resData?.data?.data}`);
            //   setAdultParentData(resData?.data);
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
            }, 1000);
          } else if (resData.data.status === false) {
            // setIsLoading(false);
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
            <div className="step-text">Step 2 of 5</div>
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
            <div className="step-title">Brands Sign up</div>
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
                <FacebookLoginButton></FacebookLoginButton>
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
            Get Started
          </button>
        </div>
      </div>
      {isLoading && <Spinner />}
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default BrandSignup;
