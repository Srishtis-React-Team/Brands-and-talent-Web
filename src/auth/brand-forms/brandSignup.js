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
    getBrand();
  }, [userId]);

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${userId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setAdultName(resData?.data?.data?.userName);
            setAdultEmail(resData?.data?.data?.brandEmail);
            // setAdultPassword(resData?.data?.data?.brandPassword);
            // setAdultConfirmPassword(resData?.data?.data?.confirmPassword);
          }
        }
      })
      .catch((err) => {});
  };

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
      passwordMatch === true &&
      adultPasswordError == false
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
              navigate(
                `/otp-verification-brands?userId=${resData.data["user_id"]}&userEmail=${resData.data.data}`
              );
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
      setMessage("Kindly complete all mandatory fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }
    if (!passwordMatch) {
      setMessage("Kindly complete all mandatory fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }
  };

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
                  // value={googleUser?.email}
                  value={adultEmail}
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
                  value={adultName}
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
                  }}
                  value={adultPassword}
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

                {adultPasswordError && (
                  <div className="invalid-fields password-error-box">
                  Your password must be at least 8 characters long and include at least:
                  <ul>
                  <li>1 big letter (A, B, C…)</li>
                      <li>1 small letter (a, b, c…)</li>
                      <li>1 number (1, 2, 3…)</li>
                      <li>1 special mark (!, @, #…)</li>
                  </ul>
                  Examples : <strong>Rosy@2025</strong>, <strong>Rina#2019</strong>, <strong>Kongka!2008</strong>, <strong>etc.</strong>
                  </div>
                  // <div className="invalid-fields password-error-box">
                     
                  //   {/* Your password must be at least 8 characters long and include
                  //   at least: 1 capital letter (A, B, C...), 1 small letter (a,
                  //   b, c...), 1 number (1, 2, 3...), 1 special symbol (!, @,
                  //   #...) */}
                  // </div>
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
                  value={adultConfirmPassword}
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
              By registering you confirm that you accept the Brands & Talent
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
