import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/register.css";
import "../../assets/css/forms/kidsform-one.css";

import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";
import PopUp from "../../components/PopUp";
import CurrentUser from "../../CurrentUser";

const BrandSignup = React.memo((props) => {
  const { fcmToken } = CurrentUser();

  const navigate = useNavigate();
  const btLogo = require("../../assets/images/LOGO.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
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
  const location = useLocation();
  const [receivedData, setReceivedData] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [talentConfirmPasswordError, settalentConfirmPasswordError] =
    useState(false);

  useEffect(() => {
    if (location.state && location.state.data) {
      setReceivedData(location.state.data);
    }
  }, [location.state]);

  useEffect(() => {}, [googleUser]);
  useEffect(() => {
    console.log(receivedData, "Brand Signup");
  }, [receivedData]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const goBack = async () => {
    navigate(`/brand-firstGig`, {
      state: { data: receivedData },
    });
  };

  const socialSignup = async (response, mediaType) => {
    // facebookId
    //provider : "facebook".
    let formData;
    if (mediaType == "google") {
      formData = {
        brandEmail: response?.email,
        googleId: response?.sub,
        provider: "google",
        fcmToken: fcmToken,
      };
    } else if (mediaType == "facebook") {
      formData = {
        brandEmail: response?.data?.email,
        facebookId: response?.data?.id,
        provider: "facebook",
        fcmToken: fcmToken,
      };
    }
    setIsLoading(true);
    await ApiHelper.post(API.socailSignUpBrands, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          // alert("dfd");

          setIsLoading(false);
          setMessage("Registered Successfully Update Your Password");
          setGoogleUser(resData?.data);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            navigate("/update-talent-password", {
              state: { data: resData.data },
            });
          }, 1000);

          setIsLoading(false);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage("Error Occured Try Again!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setMessage("Error Occured Try Again!");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 2000);
      });
  };

  const brandSignUp = async () => {
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
        userName: adultName,
        brandEmail: adultEmail,
        brandPassword: adultPassword,
        confirmPassword: adultConfirmPassword,
        position: receivedData,
        fcmToken: fcmToken,
        publicUrl: adultName.replace(/ /g, "-"),
      };
      setIsLoading(true);
      await ApiHelper.post(API.brandsRegister, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Registered Successfully");
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
              navigate(`/otp-verification-brands?${resData?.data?.data}`);
            }, 2000);
          } else if (resData.data.status === false) {
            setIsLoading(false);
            setMessage(resData.data.message);
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
            }, 1000);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setMessage("Error Occured Try Again!");
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
      setMessage("Please Update All Required Fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }
  };

  const handlePasswordChange = (e) => {
    setAdultPassword(e.target.value);
    setPasswordMatch(e.target.value === adultConfirmPassword);
    setPasswordError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setAdultConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === adultPassword);
    settalentConfirmPasswordError(false);
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

  const [passwordStatus, setPasswordStatus] = useState(false);

  let line = document.querySelector(".line");
  let text = document.querySelector(".text");
  let password_strength_box = document.querySelector(".password_strength_box");
  let passwordCriteria = document.querySelector(".password");

  if (passwordCriteria && password_strength_box && line && text) {
    if (passwordCriteria.value.length == 0) {
      password_strength_box.style.display = "none";
    }

    passwordCriteria.oninput = function () {
      if (passwordCriteria.value.length == 0) {
        password_strength_box.style.display = "none";
      }

      if (passwordCriteria.value.length >= 1) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "5%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (passwordCriteria.value.length >= 2) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "10%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (passwordCriteria.value.length >= 3) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "20%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (passwordCriteria.value.length >= 4) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "35%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
        if (passwordCriteria.value.match(/[!@#$%^&*]/)) {
          setPasswordStatus(false);
          password_strength_box.style.display = "flex";
          line.style.width = "45%";
          line.style.backgroundColor = "#e9ee30";
          text.style.color = "#e9ee30";
          text.innerHTML = "Medium";
        }
      }
      if (
        passwordCriteria.value.length >= 5 &&
        passwordCriteria.value.match(/[A-Z]/) &&
        passwordCriteria.value.match(/[a-z]/)
      ) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "50%";
        line.style.backgroundColor = "#e9ee30";
        text.style.color = "#e9ee30";
        text.innerHTML = "Medium";
      }
      if (
        passwordCriteria.value.length >= 6 &&
        passwordCriteria.value.match(/[0-9]/)
      ) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "70%";
        line.style.backgroundColor = "#e9ee30";
        text.style.color = "#e9ee30";
        text.innerHTML = "Medium";
      }
      if (
        passwordCriteria.value.length >= 7 &&
        passwordCriteria.value.match(/[A-Z]/) &&
        passwordCriteria.value.match(/[a-z]/) &&
        passwordCriteria.value.match(/[0-9]/)
      ) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "80%";
        line.style.backgroundColor = "#e9ee30";
        text.style.color = "#e9ee30";
        text.innerHTML = "Medium";
      }

      if (
        passwordCriteria.value.length >= 8 &&
        passwordCriteria.value.match(/[A-Z]/) &&
        passwordCriteria.value.match(/[a-z]/) &&
        passwordCriteria.value.match(/[0-9]/) &&
        passwordCriteria.value.match(/[!@#$%^&*]/)
      ) {
        setPasswordStatus(true);
        password_strength_box.style.display = "flex";
        line.style.width = "100%";
        line.style.backgroundColor = "#2ccc2c";
        text.style.color = "#2ccc2c";
        text.innerHTML = "Strong";
      }
    };
  }

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
          className="dialog-body spaceTops"
          style={{
            height: "unset",
            marginTop: "10px",
          }}
        >
          <div className="adult-signup-main">
            <div className="step-title">Brand/Client Sign Up</div>
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
                  className="form-control password adult-signup-inputs"
                  placeholder="Password"
                  onChange={(e) => {
                    handlePasswordChange(e);
                    setAdultPassword(e.target.value);
                  }}
                ></input>

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
                      <p>1 capital letter (A, B, C...)</p>
                      <p>1 small letter (a, b, c...)</p>
                      <p>1 number (1, 2, 3...)</p>
                      <p>1 special symbol (!, @, #...)</p>
                    </div>
                  </div>
                </div>
                {adultPassword && !passwordStatus && (
                  <div className="invalid-fields password-error-box">
                    Your password must be at least 8 characters long and include
                    at least: 1 capital letter (A, B, C...) 1 small letter (a,
                    b, c...) 1 number (1, 2, 3...) 1 special symbol (!, @, #...)
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
                    setConfirmPasswordError(false);
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
                {!passwordMatch &&
                  adultConfirmPassword &&
                  adultConfirmPassword.length && (
                    <p className="password-wrong">Password does not match.</p>
                  )}
              </div>
            </div>

            {/* <div className="stroke-wrapper">
                <div className="stroke-div"></div>
                <div className="or-signup">Or Signup with</div>
                <div className="stroke-div"></div>
              </div> */}
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
            onClick={(e) => {
              goBack();
            }}
            className="step-back"
          >
            Back
          </button>
          <button
            type="button"
            className="step-continue"
            onClick={(e) => {
              brandSignUp();
            }}
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </div>
      </div>

      {openPopUp && <PopUp message={message} />}
    </>
  );
});

export default BrandSignup;
