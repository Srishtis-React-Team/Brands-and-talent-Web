import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.scss";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Modal from "react-modal";
import BrandHeader from "./BrandHeader";
import BrandSideMenu from "./BrandSideMenu";

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

const BrandSettings = () => {
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
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [talentPasswordError, settalentPasswordError] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [allSamePasswordError, setAllSamePasswordError] = useState(false);
  const [talentConfirmPasswordError, settalentConfirmPasswordError] =
    useState(false);
  const [valueTabs, setValueTabs] = React.useState(0);
  const [brandId, setBrandId] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
    console.log(brandId, "brandId");
    if (brandId) {
      getBrand();
    }
  }, [brandId]);

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data, "resData.data.data");
            setEditProfileImage(resData.data.data?.brandImage[0]?.fileData);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const customStylesAlert = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "450px",
      height: "270px",
      transform: "translate(-50%, -50%)",
    },
  };

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [alertpop, setAlertpop] = useState({
    status: false,
    item: "",
    label: "",
  });

  const activateAccount = async () => {
    const formData = {
      brandId: brandId,
      inActive: true,
    };

    await ApiHelper.post(`${API.activateBrandUser}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Status Changed Successfully");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getBrand();
          }, 2000);
        }
      })
      .catch((err) => {});
  };
  const deActivateAccount = async () => {
    const formData = {
      brandId: brandId,
      inActive: false,
    };
    await ApiHelper.post(`${API.activateBrandUser}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Status Changed Successfully");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getBrand();
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
        brandId: brandId,
        password: oldPassword,
        newPassword: talentPassword,
      };
      await ApiHelper.post(`${API.updatePasswordInSettings}`, formData)
        .then((resData) => {
          console.log(resData, "resData");
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
              getBrand();
            }, 2000);
          }
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    if (allSamePasswordError || !passwordMatch) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [allSamePasswordError, passwordMatch]);

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

  return (
    <>
      <BrandHeader toggleMenu={toggleMenu} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
        }`}
      >
        <BrandSideMenu />
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
                    {talentPassword && (
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
                      <p className="password-wrong">
                        Passwords does not match.
                      </p>
                    )}
                  {allSamePasswordError &&
                    talentConfirmPassword &&
                    talentConfirmPassword.length && (
                      <p className="password-wrong">
                        Old and new password can't be same
                      </p>
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
              Manage Account
              <div className="profile-image-edit-section edit-basicdetails-section-main">
                <div>
                  <div className="text-center">
                    <img
                      className="account-active-image"
                      src={`${API.userFilePath}${editProfileImage}`}
                      alt=""
                    />
                  </div>
                  <div className="talent-name">{brandData?.brandName}</div>
                  <div className="talent-account-status">
                    <span className="talent-account-status-title">
                      Account Status
                    </span>
                    &nbsp;:&nbsp;
                    <span className="talent-account-status-inactive">
                      {brandData?.inActive === true && "Active Account"}
                      {brandData?.inActive === false && "DeActivated Account"}
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
                          brandData?.inActive === true
                            ? "deActivate"
                            : "Activate",
                      });
                    }}
                    className={
                      brandData?.inActive
                        ? "edit-profileimg-btn"
                        : "edit-profileimg-activate"
                    }
                    variant="text"
                    style={{ textTransform: "capitalize" }}
                  >
                    {brandData?.inActive === true && "DeActivate"}
                    {brandData?.inActive === false && "Activate"}
                  </Button>
                </div>
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
              {alertpop?.label == "deActivate" && (
                <>
                  <h5>Are you sure you want to DeActivate this Account? </h5>
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
                } else if (alertpop?.label === "deActivate") {
                  deActivateAccount();
                }
              }}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default BrandSettings;
