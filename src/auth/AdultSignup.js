import React, { useState, useEffect, useRef } from "react";
import "../assets/css/dashboard.css";
import "../assets/css/register.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import PopUp from "../components/PopUp";
import { generateToken } from "../auth/firebase";
import "../assets/css/register.css";

const AdultSignup = () => {
  useEffect(() => {
    generateToken();
  }, []);
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
          fileData: "a11fe9fc-f4c3-4b51-9f98-25a9247fcbd9.webp",
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
          fileData: "a11fe9fc-f4c3-4b51-9f98-25a9247fcbd9.webp",
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
      passwordMatch === true
    ) {
      const formData = {
        adultEmail: adultEmail,
        talentPassword: adultPassword,
        confirmPassword: adultConfirmPassword,
        publicUrl: adultName.replace(/ /g, "-"),
        image: {
          fileData: "a11fe9fc-f4c3-4b51-9f98-25a9247fcbd9.webp",
          id: "9f429f86-ca9c-4730-804b-06cd2d3db7c0",
          title: "blank-profile-picture-973460_640.webp",
          type: "image",
        },
      };
      setIsLoading(true);
      await ApiHelper.post(API.adultSignUp, formData)
        .then((resData) => {
          setIsLoading(false);
          if (resData.data.status === true) {
            setMessage("Registered Successfully");
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
              navigate(`/otp-verification?${resData?.data?.data}`);
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
    } else {
      setMessage("Please Update All Required Fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }
    if (!passwordMatch) {
      setMessage("Password did not match");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }
  };

  let line = document.querySelector(".line");
  let text = document.querySelector(".text");
  let password_strength_box = document.querySelector(".password_strength_box");
  let password = document.querySelector(".password");

  if (password && password_strength_box && line && text) {
    if (password.value.length == 0) {
      password_strength_box.style.display = "none";
    }

    password.oninput = function () {
      if (password.value.length == 0) {
        password_strength_box.style.display = "none";
      }

      if (password.value.length >= 1) {
        password_strength_box.style.display = "flex";
        line.style.width = "5%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (password.value.length >= 2) {
        password_strength_box.style.display = "flex";
        line.style.width = "10%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (password.value.length >= 3) {
        password_strength_box.style.display = "flex";
        line.style.width = "20%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (password.value.length >= 4) {
        password_strength_box.style.display = "flex";
        line.style.width = "35%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
        if (password.value.match(/[!@#$%^&*]/)) {
          password_strength_box.style.display = "flex";
          line.style.width = "45%";
          line.style.backgroundColor = "#e9ee30";
          text.style.color = "#e9ee30";
          text.innerHTML = "Medium";
        }
      }
      if (
        password.value.length >= 5 &&
        password.value.match(/[A-Z]/) &&
        password.value.match(/[a-z]/)
      ) {
        password_strength_box.style.display = "flex";
        line.style.width = "50%";
        line.style.backgroundColor = "#e9ee30";
        text.style.color = "#e9ee30";
        text.innerHTML = "Medium";
      }
      if (password.value.length >= 6 && password.value.match(/[0-9]/)) {
        password_strength_box.style.display = "flex";
        line.style.width = "70%";
        line.style.backgroundColor = "#e9ee30";
        text.style.color = "#e9ee30";
        text.innerHTML = "Medium";
      }
      if (
        password.value.length >= 7 &&
        password.value.match(/[A-Z]/) &&
        password.value.match(/[a-z]/) &&
        password.value.match(/[0-9]/)
      ) {
        password_strength_box.style.display = "flex";
        line.style.width = "80%";
        line.style.backgroundColor = "#e9ee30";
        text.style.color = "#e9ee30";
        text.innerHTML = "Medium";
      }

      if (
        password.value.length >= 8 &&
        password.value.match(/[A-Z]/) &&
        password.value.match(/[a-z]/) &&
        password.value.match(/[0-9]/) &&
        password.value.match(/[!@#$%^&*]/)
      ) {
        password_strength_box.style.display = "flex";
        line.style.width = "100%";
        line.style.backgroundColor = "#2ccc2c";
        text.style.color = "#2ccc2c";
        text.innerHTML = "Strong";
      }
    };
  }

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

                {adultPassword && (
                  <div className="password_strength_box">
                    <div className="password_strength">
                      <p className="text">Weak</p>
                      <div className="line_box">
                        <div className="line"></div>
                      </div>
                    </div>
                    <div className="tool_tip_box">
                      <span>
                        <i className="bi bi-question-circle"></i>
                      </span>
                      <div className="tool_tip">
                        <p style={{ listStyleType: "none" }}>
                          <b>Password must be:</b>
                        </p>
                        <p>At least 8 character long</p>
                        <p>At least 1 uppercase letter</p>
                        <p>At least 1 lowercase letter</p>
                        <p>At least 1 number</p>
                        <p>At least 1 special character from !@#$%^&*</p>
                      </div>
                    </div>
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
                    <p className="password-wrong">Passwords does not match.</p>
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
              By registering you confirm that you accept the 
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
