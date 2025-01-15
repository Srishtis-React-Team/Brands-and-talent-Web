import React, { useState, useEffect, useRef } from "react";
import "../assets/css/dashboard.css";
import "../assets/css/register.css";

import "../assets/css/forms/kidsform-one.css";
import "../assets/css/forms/login.css";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import PopUp from "../components/PopUp";
import { generateToken } from "../auth/firebase";
import "../assets/css/register.css";

const AdultSignup = () => {
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

  useEffect(() => {
    generateToken();
  }, []);
  useEffect(() => {
    if (userId) {
      getTalentById();
    }
  }, [userId]);

  const getTalentById = async () => {
    await ApiHelper.post(`${API.getTalentById}${userId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          setAdultEmail(resData?.data?.data?.adultEmail);
          setAdultName(resData?.data?.data?.adultName);
        }
      })
      .catch((err) => {});
  };

  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.png");
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
  const [isValidEmail, setIsValidEmail] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [adultPasswordError, setAdultPasswordError] = useState(false);

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      setAdultPasswordError("Password must be at least 8 characters long.");
    } else if (
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumber ||
      !hasSpecialChar
    ) {
      setAdultPasswordError(
        "Your password must include at least 1 capital letter, 1 small letter, 1 number, and 1 special symbol."
      );
    } else {
      setAdultPasswordError(""); // Clear the error if password meets the requirements
    }
  };

  const handlePasswordChange = (e) => {
    setAdultPassword(e.target.value);
    setPasswordMatch(e.target.value === adultConfirmPassword);
    setPasswordError(false);
    validatePassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setAdultConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === adultPassword);
    setConfirmPasswordError(false);
  };
  useEffect(() => {}, [googleUser]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const socialSignup = async (response, mediaType) => {
    // facebookId
    //provider : "facebook".
    let formData;
    if (mediaType == "google") {
      formData = {
        adultEmail: response?.email,
        googleId: response?.sub,
        provider: "google",
        image: {
          fileData: "5cf3b581-deb2-4366-8949-43e7f1086165.webp",
          id: "9f429f86-ca9c-4730-804b-06cd2d3db7c0",
          title: "blank-profile-picture-973460_640.webp",
          type: "image",
        },
      };
    } else if (mediaType == "facebook") {
      formData = {
        adultEmail: response?.data?.email,
        facebookId: response?.data?.id,
        provider: "facebook",
        image: {
          fileData: "5cf3b581-deb2-4366-8949-43e7f1086165.webp",
          id: "9f429f86-ca9c-4730-804b-06cd2d3db7c0",
          title: "blank-profile-picture-973460_640.webp",
          type: "image",
        },
      };
    }
    await ApiHelper.post(API.socialSignup, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setGoogleUser(resData?.data);
          setMessage("Registered Successfully Please Update Your Password");
          setOpenPopUp(true);
          setTimeout(function () {
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
        setTimeout(function () {
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
      passwordMatch === true &&
      !adultPasswordError &&
      adultName
    ) {
      const formData = {
        adultEmail: adultEmail,
        talentPassword: adultPassword,
        confirmPassword: adultConfirmPassword,
        adultName: adultName,
        publicUrl: `${adultName.replace(/ /g, "-")}-${
          Math.floor(Math.random() * 900) + 100
        }`,
        image: {
          fileData: "5cf3b581-deb2-4366-8949-43e7f1086165.webp",
          id: "9f429f86-ca9c-4730-804b-06cd2d3db7c0",
          title: "blank-profile-picture-973460_640.webp",
          type: "image",
        },
      };
      setIsLoading(true);
      if (!userId) {
        await ApiHelper.post(API.adultSignUp, formData)
          .then((resData) => {
            setIsLoading(false);
            if (resData.data.status === true) {
              setMessage("Registered Successfully");
              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
                navigate(
                  `/otp-verification?userId=${resData.data["id"]}&userEmail=${resData.data.data}`
                );
              }, 2000);
            } else if (resData.data.status === false) {
              setMessage(resData?.data?.message);
              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
              }, 3000);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            setMessage("Error Occured Try Again");
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
            }, 1000);
          });
      } else if (userId) {
        await ApiHelper.post(`${API.updateAdults}${userId}`, formData)
          .then((resData) => {
            setIsLoading(false);
            if (resData.data.status === true) {
              setMessage("Updated Successfully");
              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
                navigate(
                  `/otp-verification?userId=${resData.data["id"]}&userEmail=${resData.data.email}`
                );
              }, 2000);
            } else if (resData.data.status === false) {
              setMessage(resData?.data?.message);
              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
              }, 3000);
            }
          })
          .catch((err) => {
            setIsLoading(false);
            setMessage("Error Occured Try Again");
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
            }, 1000);
          });
      }
    } else {
      setMessage("Kindly complete all mandatory fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }
    if (!passwordMatch) {
      setMessage("Passwords don't match!");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }
    if (adultPasswordError) {
      setMessage("Kindly complete all mandatory fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }
  };

  const handleCondition = (e) => {
    if (e == "terms") {
      navigate("/terms-conditions");
    }
    if (e == "privacy") {
      navigate("/privacy-policy");
    }
    if (e == "community") {
      navigate("/community-guidelines");
    }
  };

  const handleEmailChange = (e) => {
    setEmailError(false);
    const email = e.target.value;
    setAdultEmail(e.target.value);
    setIsValidEmail(emailRegex.test(email));
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
            <div className="step-text">Step 1 of 2</div>
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
            height: "unset",
          }}
        >
          <div className="login-main regPage">
            <div className="adult-signup-main widFull">
              <div className="step-title">Sign up</div>
              <div className="mb-3">
                <label className="form-label">
                  Email<span className="mandatory">*</span>
                </label>
                <div className="form-group has-search">
                  <span className="fa fa-envelope form-control-feedback"></span>

                  <input
                    type="email"
                    className={`form-control ${
                      !isValidEmail ? "is-invalid" : "form-control"
                    }`}
                    onChange={handleEmailChange}
                    placeholder="Enter E-mail"
                    value={adultEmail}
                  />
                  {!isValidEmail && (
                    <div className="invalid-feedback">
                      Please enter a valid E-mail address.
                    </div>
                  )}
                  {emailError && (
                    <div className="invalid-fields">Please enter E-mail</div>
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
                    value={adultName}
                  ></input>
                  {nameError && <div className="invalid-fields"> Name</div>}
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
                    className="form-control password adult-signup-inputs"
                    placeholder="Password"
                    onChange={(e) => {
                      handlePasswordChange(e);
                      setAdultPassword(e.target.value);
                    }}
                  ></input>
                  {adultPasswordError && (
                    <div className="invalid-fields password-error-box">
                      Your password must be at least 8 characters long and
                      include at least: 1 capital letter (A, B, C...), 1 small
                      letter (a, b, c...), 1 number (1, 2, 3...), 1 special
                      symbol (!, @, #...)
                    </div>
                  )}
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
                      <p className="password-wrong">Password does not match.</p>
                    )}
                </div>
              </div>

              <div className="stroke-wrapper">
                <div className="stroke-div"></div>
                {/* <div className="or-signup">Or Signup with</div> */}
                <div className="stroke-div"></div>
              </div>
              <div className="signup-options">
                {/* <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    socialSignup(
                      jwtDecode(credentialResponse?.credential),
                      "google"
                    );
                  }}
                  onError={() => {
                  }}
                /> */}
                {/* <LoginSocialFacebook>
                  <FacebookLoginButton></FacebookLoginButton>
                </LoginSocialFacebook> */}
                {/* <LoginSocialFacebook
                  appId="7401795359899121"
                  onResolve={(response) => {
                    socialSignup(response, "facebook");
                  }}
                  onReject={(error) => {
                  }}
                >
                  <MyFacebookLoginButton />
                </LoginSocialFacebook> */}

                {/* <div className="google-media">
                  <img src={googleLogo} alt="" />
                  <div className="media-text">Google</div>
                </div> */}
              </div>

              <div className="signup-terms">
                By registering you confirm that you accept the Brands & Talent
                (BT)
              </div>
              <div className="signup-terms-linetwo">
                <span onClick={() => handleCondition("terms")}>
                  Terms & Conditions
                </span>{" "}
                ,&nbsp;
                <span onClick={() => handleCondition("privacy")}>
                  Privacy Policy
                </span>
                 and 
                <span onClick={() => handleCondition("community")}>
                  Community Guidelines
                </span>
              </div>
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
