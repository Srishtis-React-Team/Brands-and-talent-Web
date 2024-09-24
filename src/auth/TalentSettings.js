import React, { useState, useEffect } from "react";
import "../assets/css/forms/kidsform-one.css";
import "../assets/css/register.css";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import TalentHeader from "../layout/TalentHeader";
import TalentSideMenu from "../layout/TalentSideMenu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Modal from "react-modal";
import "../assets/css/register.css";
import GiftCard from "../auth/GiftCard";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TalentSettings = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleFileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [editProfileImage, setEditProfileImage] = useState("");
  const [oldPassword, setTalentOldPassword] = useState("");
  const [talentPassword, setTalentPassword] = useState("");
  const [talentConfirmPassword, setTalentConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [talentId, setTalentId] = useState(null);
  const [talentData, setTalentData] = useState();
  const [showSidebar, setShowSidebar] = useState(true);
  const [talentPasswordError, settalentPasswordError] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [allSamePasswordError, setAllSamePasswordError] = useState(false);
  const [talentConfirmPasswordError, settalentConfirmPasswordError] =
    useState(false);
  const [valueTabs, setValueTabs] = React.useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [paymentDetailsDataArray, setPaymentDetailsDataArray] = useState([]);
  const [activeGifts, setActiveGifts] = useState([]);

  const paymentData = localStorage.getItem("paymentData");
  const paymentDetails = JSON.parse(paymentData);
  const selectedPaymentPeriod = localStorage.getItem("selectedPaymentPeriod");
  const selectedPaymentPlan = localStorage.getItem("selectedPaymentPlan");

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const fetchPaymentDetails = async () => {
    const userId = localStorage.getItem("userId");
    const obj = {
      user_id: userId,
    };
    console.log("inside fetchPaymentDetails", obj);
    const paymentDetailsData = await ApiHelper.post(
      "https://brandsandtalent.com/api/users/fetchPaymentDetails",
      obj
    );
    console.log("paymentDetailsData", paymentDetailsData?.data?.data?.gift);
    setActiveGifts(paymentDetailsData?.data?.data?.gift);
    setPaymentDetailsDataArray(paymentDetailsData.data.data);
  };

  const customStylesAlert = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "94%",
      maxWidth: "450px",
      minHeight: "270px",
      transform: "translate(-50%, -50%)",
    },
  };

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  useEffect(() => {
    setTalentId(localStorage.getItem("userId"));
    if (talentId) {
      getKidsData();
    }
  }, [talentId]);

  const [alertpop, setAlertpop] = useState({
    status: false,
    item: "",
    label: "",
  });

  const getKidsData = async () => {
    await ApiHelper.post(`${API.getTalentById}${talentId}`)
      .then((resData) => {
        console.log(resData, "resData?.data?.data");
        if (resData.data.status === true) {
          console.log(resData?.data?.data, "resData?.data?.data");
          setTalentData(resData?.data?.data);
          setEditProfileImage(resData.data.data?.image?.fileData);
        }
      })
      .catch((err) => {});
  };
  const activateAccount = async () => {
    const formData = {
      inActive: true,
    };
    await ApiHelper.post(`${API.activateUser}${talentId}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Status Changed Successfully");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getKidsData();
          }, 2000);
        }
      })
      .catch((err) => {});
  };
  const DeactivateAccount = async () => {
    const formData = {
      inActive: false,
    };
    await ApiHelper.post(`${API.activateUser}${talentId}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Status Changed Successfully");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getKidsData();
          }, 2000);
        }
      })
      .catch((err) => {});
  };

  const handleOldPasswordChange = (e) => {
    setTalentOldPassword(e.target.value);
    setOldPasswordError(false);
  };
  const handlePasswordChange = (e) => {
    setTalentPassword(e.target.value);
    setPasswordMatch(e.target.value === talentConfirmPassword);
    settalentPasswordError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setTalentConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === talentPassword);
    settalentConfirmPasswordError(false);
    if (e.target.value === oldPassword) {
      setAllSamePasswordError(true);
    } else if (e.target.value != oldPassword) {
      setAllSamePasswordError(false);
    }
  };

  const updatePassword = async () => {
    if (!allSamePasswordError && passwordMatch) {
      const formData = {
        talentId: talentId,
        password: oldPassword,
        newPassword: talentPassword,
      };
      await ApiHelper.post(`${API.updatePassword}`, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setMessage("Password Updated Successfully");
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
              setTalentOldPassword("");
              setTalentPassword("");
              setTalentConfirmPassword("");
            }, 2000);
          } else if (resData.data.status === false) {
            setMessage(resData?.data?.message);
            setOpenPopUp(true);
            setOldPasswordError(true);
            setTimeout(function () {
              setOpenPopUp(false);
              getKidsData();
            }, 2000);
          }
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    if (
      allSamePasswordError ||
      !passwordMatch ||
      oldPassword == "" ||
      talentPassword == "" ||
      talentConfirmPassword == ""
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [allSamePasswordError, passwordMatch]);
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

  useEffect(() => {
    console.log(talentData, "talentData");
  }, [talentData]);
  useEffect(() => {
    console.log(editProfileImage, "editProfileImage");
  }, [editProfileImage]);

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
        }`}
      >
        <TalentSideMenu />
      </div>

      <main
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div className="brand-content-main talentSet boxBg">
          <div className="create-job-title">Settings</div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={valueTabs}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="Change Password"
                  {...a11yProps(0)}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Account Settings"
                  {...a11yProps(1)}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Active subscription"
                  {...a11yProps(2)}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Gift subscription"
                  {...a11yProps(3)}
                  style={{ textTransform: "capitalize" }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={valueTabs} index={0}>
              <div className="update-password-main w-100 py-3 px-0 row">
                <div className="kids-form-section col-md-6 mb-3">
                  <label className="form-label">
                    Old Password <span className="mandatory">*</span>
                  </label>
                  <div className="form-group has-search adult-password-wrapper">
                    <span className="fa fa-lock form-control-feedback"></span>
                    <input
                      type={showOldPassword ? "text" : "password"}
                      className="form-control adult-signup-inputs"
                      placeholder="Old Password"
                      value={oldPassword}
                      onChange={(e) => {
                        handleOldPasswordChange(e);
                        setTalentOldPassword(e.target.value);
                        setOldPasswordError(false);
                      }}
                    ></input>
                    {showOldPassword ? (
                      <span
                        className="fa fa-eye show-password-icon"
                        onClick={toggleOldPasswordVisibility}
                      ></span>
                    ) : (
                      <span
                        className="fa fa-eye-slash show-password-icon"
                        onClick={toggleOldPasswordVisibility}
                      ></span>
                    )}
                    {oldPasswordError && (
                      <div className="invalid-fields">
                        Enter Correct Old Password
                      </div>
                    )}
                  </div>
                </div>
                <div className="kids-form-section col-md-6 mb-3">
                  <label className="form-label">
                    New Password <span className="mandatory">*</span>
                  </label>
                  <div className="form-group has-search adult-password-wrapper">
                    <span className="fa fa-lock form-control-feedback"></span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control password adult-signup-inputs"
                      placeholder="New Password"
                      value={talentPassword}
                      onChange={(e) => {
                        handlePasswordChange(e);
                        setTalentPassword(e.target.value);
                        settalentPasswordError(false);
                      }}
                    ></input>
                    <div className="password_strength_box">
                      <div className="password_strength"></div>
                    </div>
                    {talentPassword && !passwordStatus && (
                      <div className="invalid-fields password-error-box">
                        Your password must be at least 8 characters long and
                        include at least: 1 capital letter (A, B, C...) 1 small
                        letter (a, b, c...) 1 number (1, 2, 3...) 1 special
                        symbol (!, @, #...)
                      </div>
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
                    {talentPasswordError && (
                      <div className="invalid-fields">
                        Please enter Password
                      </div>
                    )}
                  </div>
                </div>
                <div className="kids-form-section col-md-6 mb-3">
                  <label className="form-label">
                    Confirm New Password <span className="mandatory">*</span>
                  </label>
                  <div className="form-group has-search adult-confirm-password-wrapper">
                    <span className="fa fa-lock form-control-feedback"></span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control adult-signup-inputs"
                      placeholder="Confirm New Password"
                      value={talentConfirmPassword}
                      onChange={(e) => {
                        handleConfirmPasswordChange(e);
                        setTalentConfirmPassword(e.target.value);
                        settalentConfirmPasswordError(false);
                      }}
                    ></input>
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
                    {talentConfirmPasswordError && (
                      <div className="invalid-fields">
                        Please enter Password
                      </div>
                    )}
                  </div>
                  {!passwordMatch &&
                    talentConfirmPassword &&
                    talentConfirmPassword.length && (
                      <p className="password-wrong">Password does not match.</p>
                    )}
                </div>
                <div className="add-portfoli-section">
                  <div className="add-portfolia-btn">
                    <Button
                      onClick={updatePassword}
                      className="edit-profileimg-btn"
                      variant="text"
                      style={{ textTransform: "capitalize" }}
                      disabled={isButtonDisabled}
                    >
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={1}>
              <h6 className="subtitles">Manage Account</h6>
              <div className="profile-image-edit-section edit-basicdetails-section-main">
                <div>
                  <div className="imgBx text-center">
                    <img
                      className="account-active-image"
                      src={`${API.userFilePath}${editProfileImage}`}
                      alt=""
                    />
                  </div>
                  <div className="talent-name userName-n">
                    {talentData?.preferredChildFirstname}&nbsp;
                    {talentData?.preferredChildLastName}
                  </div>
                  <div className="talent-account-status">
                    <span className="talent-account-status-title">
                      Account Status
                    </span>
                    &nbsp;:&nbsp;
                    <span className="talent-account-status-inactive">
                      {talentData?.inActive === true && "Active Account"}
                      {talentData?.inActive === false && "Deactivated Account"}
                    </span>
                  </div>
                </div>
                <div
                  className="btn-img-edit-wrapper"
                  style={{ justifyContent: "left" }}
                >
                  <Button
                    onClick={(e) => {
                      setAlertpop({
                        status: true,
                        label:
                          talentData?.inActive === true
                            ? "Deactivate"
                            : "Activate",
                      });
                    }}
                    className={
                      talentData?.inActive
                        ? "edit-profileimg-btn"
                        : "edit-profileimg-activate"
                    }
                    variant="text"
                    style={{ textTransform: "capitalize" }}
                  >
                    {talentData?.inActive === true && "Deactivate"}
                    {talentData?.inActive === false && "Activate"}
                  </Button>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={2}>
              {/* Manage Account */}
              <div className="edit-basicdetails-section-main">
                <div className="payment-details-card">
                  {console.log("consoling the exact", paymentDetailsDataArray)}
                  <h6
                    style={{
                      fontSize: "14px",
                      color: "#afafaf",
                      fontWeight: "600",
                    }}
                    className="listsub"
                  >
                    Transaction Date :{" "}
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#afafaf",
                        fontWeight: "600",
                      }}
                    >
                      {paymentDetailsDataArray?.transactionDate}
                    </span>
                  </h6>
                  <h6
                    style={{
                      fontSize: "14px",
                      color: "#afafaf",
                      fontWeight: "600",
                    }}
                    className="listsub"
                  >
                    Payment Status :{" "}
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#afafaf",
                        fontWeight: "600",
                      }}
                    >
                      {paymentDetailsDataArray?.paymentStatus}
                    </span>
                  </h6>
                  <h6
                    style={{
                      fontSize: "14px",
                      color: "#afafaf",
                      fontWeight: "600",
                    }}
                    className="listsub"
                  >
                    Payment Currency :{" "}
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#afafaf",
                        fontWeight: "600",
                      }}
                    >
                      {paymentDetailsDataArray?.paymentCurreny}
                    </span>
                  </h6>
                  <h6
                    style={{
                      fontSize: "14px",
                      color: "#afafaf",
                      fontWeight: "600",
                    }}
                    className="listsub"
                  >
                    Payment Amount :{" "}
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#afafaf",
                        fontWeight: "600",
                      }}
                    >
                      {paymentDetailsDataArray?.paymentAmount}
                    </span>
                  </h6>
                  <h6
                    style={{
                      fontSize: "14px",
                      color: "#afafaf",
                      fontWeight: "600",
                    }}
                    className="listsub"
                  >
                    Payment Period :{" "}
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#afafaf",
                        fontWeight: "600",
                      }}
                    >
                      {paymentDetailsDataArray?.subscriptionPlan}
                    </span>
                  </h6>
                  <h6
                    style={{
                      fontSize: "14px",
                      color: "#afafaf",
                      fontWeight: "600",
                    }}
                    className="listsub"
                  >
                    Payment Plan :{" "}
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#afafaf",
                        fontWeight: "600",
                      }}
                    >
                      {paymentDetailsDataArray?.planName}
                    </span>
                  </h6>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={3}>
              <div className="edit-basicdetails-section-main">
                {activeGifts.length > 0 ? (
                  activeGifts.map((gift) => (
                    <GiftCard key={gift._id} gift={gift} />
                  ))
                ) : (
                  <p>No active gifts available.</p>
                )}
              </div>
            </CustomTabPanel>
          </Box>
        </div>
      </main>

      <Modal style={customStylesAlert} isOpen={alertpop?.status === true}>
        <div>
          <div className="alertBox">
            <div className="col-md-12  mx-5">
              <div className="alert-icon-section">
                <i className="alert-icon bi bi-exclamation-triangle-fill"></i>
              </div>
              {alertpop?.label == "Activate" && (
                <>
                  <h5>Are you sure you want to Activate this Account? </h5>
                </>
              )}
              {alertpop?.label == "Deactivate" && (
                <>
                  <h5>Are you sure you want to Deactivate this Account? </h5>
                </>
              )}
            </div>
          </div>
          <div className="alert-button-section">
            <button
              type="submit"
              className=" btn btn-warning"
              onClick={() => {
                setAlertpop({
                  status: false,
                  item: null,
                  label: null,
                });
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" btn btn-danger alert-ok-btn"
              onClick={(e) => {
                e.preventDefault();
                setAlertpop({
                  status: false,
                  item: null,
                  label: null,
                });
                if (alertpop?.label === "Activate") {
                  activateAccount();
                } else if (alertpop?.label === "Deactivate") {
                  DeactivateAccount();
                }
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default TalentSettings;
