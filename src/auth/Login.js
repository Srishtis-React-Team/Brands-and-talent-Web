import React, { useState, useEffect } from "react";
import "../assets/css/forms/login.css";
import "../assets/css/register.css";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";
import Header from "../layout/header";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import CurrentUser from "../CurrentUser";
import { generateToken } from "./firebase";
import "../assets/css/register.css";
import Spinner from "../components/Spinner";

const Login = () => {
  const {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
    fcmToken,
  } = CurrentUser();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const generatedToken = await generateToken();
      setToken(generatedToken);
    };

    fetchToken();
  }, []);
  useEffect(() => {}, []);

  const btLogo = require("../assets/images/LOGO.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState("talent");
  const [talentPassword, setTalentPassword] = useState("");
  const [talentEmail, setTalentEmail] = useState("");
  const [paramsValue, setParamsValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [emailID, setEmailID] = useState(null);

  const [userType, setUserType] = useState("");
  const [currentUser_id, setCUrrentUserID] = useState("");

  useEffect(() => {
    const extractValuesFromURL = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const talentParam = urlParams.get("type");
      const userIDParam = urlParams.get("user_id");

      if (talentParam) {
        setUserType(talentParam);
      }
      if (userIDParam) {
        setCUrrentUserID(userIDParam);
      }
    };

    extractValuesFromURL();
  }, []);
  useEffect(() => {}, [userType]);

  useEffect(() => {}, [selectedItem]);

  useEffect(() => {}, [currentUser_id]);

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
  useEffect(() => {}, [isLoading]);

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
    navigate(`/forgot-password`);
  };

  const brandSignup = () => {
    navigate(`/brand-firstGig`);
  };

  const login = async (enteredOTP) => {
    if (selectedItem === "brand") {
      const formData = {
        brandEmail: talentEmail,
        brandPassword: talentPassword,
        fcmToken: fcmToken,
      };
      setIsLoading(true);
      await ApiHelper.post(API.brandsLogin, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Logged in Successfully!");
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
              setIsLoading(false);
              setBrandsLocalStorage(resData.data);
              navigate(
                `/client/${resData?.data?.data?.publicUrl.replace(/\s+/g, "")}`
              );
              // window.location.reload();
              // navigate(`/talent/${item.publicUrl}`, {
              //   state: { talentData: item },
              // });
            }, 1000);
          } else if (resData.data.status === false) {
            setIsLoading(false);

            setMessage(resData.data.message);
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
            }, 1000);
          }
        })
        .catch((err) => {});
    } else if (selectedItem === "talent") {
      const formData = {
        email: talentEmail,
        password: talentPassword,
        fcmToken: fcmToken,
      };

      setIsLoading(true);
      await ApiHelper.post(API.talentLogin, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Logged in Successfully!");
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
              setIsLoading(false);

              setTalentLocalStorage(resData.data.data);
              const pendingJobId = localStorage.getItem("pendingJobId");
              const pendingJobTitle = localStorage.getItem("pendingJobTitle")
              console.log("pendingJobTitle",pendingJobId)
              if (pendingJobId) {
                localStorage.removeItem("pendingJobId");
                localStorage.removeItem("pendingJobTitle");
                navigate(`/jobs/view/${pendingJobTitle}/${pendingJobId}`);
              } else {
                if (resData.data.type === "adult") {
                  navigate(`/talent-home?${resData?.data?.data?.user?._id}`);
                  // navigate(`/talent-dashboard?${resData?.data?.data?.user?._id}`);
                  // window.location.reload();
                } else if (resData.data.type === "kids") {
                  navigate(`/talent-home?${resData?.data?.data?.user?._id}`);

                  // navigate(`/talent-dashboard?${resData?.data?.data?.user?._id}`);
                  // window.location.reload();
                  // navigate(`/otp?${resData?.data?.data?.email}`);
                }
              }
            }, 1000);
          } else if (resData.data.status === false) {
            setIsLoading(false);

            setMessage(resData.data.message);
            setOpenPopUp(true);
            setTimeout(function () {
              setIsLoading(false);
              setOpenPopUp(false);
            }, 1000);
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  // Function to set user ID
  const setTalentLocalStorage = (data) => {
    localStorage.setItem("userId", data?.user?._id);
    localStorage.setItem("emailID", data?.email);
    localStorage.setItem("userEmail", data?.email);
    localStorage.setItem("token", data?.token);
    localStorage.setItem("currentUser", data?.user?._id);
    localStorage.setItem("currentUserType", data?.user?.userType);
    localStorage.setItem("currentUserImage", data?.user?.image?.fileData);
    // localStorage.setItem("currentUserImage", data?.user?.image?.fileData);
    localStorage.setItem(
      "talentName",
      `${data?.user?.preferredChildFirstname} ${data?.user?.preferredChildLastName}`
    );
    setUserId(userId);
  };

  const setBrandsLocalStorage = (data) => {
    localStorage.setItem("brandId", data?.data?._id);
    localStorage.setItem("currentUser", data?.data?._id);
    localStorage.setItem("brandEmail", data?.data?.brandEmail);
    localStorage.setItem("userEmail", data?.data?.brandEmail);

    localStorage.setItem("brandToken", data?.token);
    localStorage.setItem("currentUserType", data?.data?.userType);
    localStorage.setItem(
      "currentUserImage",
      data?.data?.brandImage[0]?.fileData
    );
    localStorage.setItem("brandName", data?.data?.brandName);
    // setUserId(userId);
  };

  const [data, setData] = useState("");

  const talentSignup = () => {
    setData("talent-signup");
  };

  const socialSignup = async (response, mediaType) => {};

  return (
    <>
      <Header onData={data} />
      <div className="login-main">
        <div className="login-container">
          <div className="login-logo">
            <img className="btLogo" src={btLogo} alt="" />
          </div>
          <div className="choose-who">
            <div
              className={`iam-brand ${
                selectedItem === "brand" ? "selected" : ""
              }`}
              onClick={() => handleClick("brand")}
            >
              I am a Brand/Client
            </div>
            <div
              className={`iam-talent ${
                selectedItem === "talent" ? "selected" : ""
              }`}
              onClick={() => handleClick("talent")}
            >
              I am a Talent
            </div>
          </div>
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
          {selectedItem === "brand" && (
            <div
              className="login-forgot"
              onClick={() => handleForgotPassword(selectedItem)}
            >
              Forgot Password ?
            </div>
          )}
          {selectedItem === "talent" && (
            <div
              className="login-forgot"
              onClick={() => handleForgotPassword(selectedItem)}
            >
              Forgot Password ?
            </div>
          )}

          {/* <div className="login-btn" onClick={login}>
            {isLoading
              ? "Loading..."
              : `${selectedItem.charAt(0).toUpperCase() +
                  selectedItem.slice(1)} Login`}
          </div> */}

          {selectedItem === "brand" && (
            <div onClick={() => login()} className="login-btn">
              Log In as Brand/Client
            </div>
          )}
          {selectedItem === "talent" && (
            <div onClick={() => login()} className="login-btn">
              Log In as Talent
            </div>
          )}

          {/* <div className="login-or">OR</div>

          <div className="google-login">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                socialSignup(
                  jwtDecode(credentialResponse?.credential),
                  "google"
                );
              }}
              onError={() => {
                
              }}
            />
          </div> */}

          {selectedItem === "brand" && (
            <>
              <div className="new-account-wrapper">
                <span className="need-account">No account?</span>
                <div onClick={() => brandSignup()} className="signup-login">
                  Sign up as a Brand/Client
                </div>
              </div>
            </>
          )}
          {selectedItem === "talent" && (
            <>
              <div className="new-account-wrapper">
                <span className="need-account">No account?</span>
                <div onClick={() => talentSignup()} className="signup-login">
                  Sign up as a Talent
                </div>
              </div>
            </>
          )}
          {/* <div className="stroke-wrapper login-input-containers">
            <div className="stroke-div"></div>
            <div className="or-signup">Or Login with</div>
            <div className="stroke-div"></div>
          </div>
          <div className="signup-options mt-3 login-input-containers">
            <div className="google-media">
              <img src={googleLogo} alt="" />
              <div className="media-text">Google</div>
            </div>
          </div> */}
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
      {isLoading && <Spinner />}
    </>
  );
};

export default Login;
