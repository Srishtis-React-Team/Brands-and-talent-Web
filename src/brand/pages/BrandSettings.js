import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.css";
import "../../assets/css/register.css";
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
  // const [paymentDetails,setPaymentDetails] = useState()

  const paymentData = localStorage.getItem("paymentData");
  const paymentDetails = JSON.parse(paymentData);
  const selectedPaymentPeriod = localStorage.getItem("selectedPaymentPeriod");
  const selectedPaymentPlan = localStorage.getItem("selectedPaymentPlan");

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };


  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f4f4f4',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '700px',
    width: '100%',
  };

  const headerStyle = {
    fontSize: '1.8em',
    marginBottom: '20px',
    color: '#333',
  };

  const listStyle = {
    margin: '0',
    padding: '0',
    listStyle: 'none',
  };

  const detailItemStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '10px',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  };

  const lastDetailItemStyle = {
    ...detailItemStyle,
    borderBottom: 'none',
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'right',
  };

  const valueStyle = {
    color: 'red',
    textAlign: 'left',
  };


  // useEffect(() => {
  //   checkTransaction();
  // }, []);

  // const checkTransaction = async () => {
  //   const paymenttrans_id = localStorage.getItem("paymenttrans_id")
  //   const obj = { tranId: paymenttrans_id };

  //   try {
  //     console.log("here cinsiu")
  //     const resData = await ApiHelper.post('https://brandsandtalent.com/api/pricing/check-transaction', obj);
  //     console.log('data cconasoling', resData)
  //     if (resData) {
  //       if(resData.data.status.message == "Success!"){
  //       const paymentData = resData.data.data;
  //       if(paymentData.payment_status == "APPROVED"){
  //         localStorage.setItem("paymentData", JSON.stringify(paymentData));
  //         // alert('payment successfully completed')
  //         const userId = localStorage.getItem("userId")
  //         const userData = {
  //             "subscriptionPlan":selectedPaymentPeriod,
  //             "planName":selectedPaymentPlan,
  //             "user_id":userId
  //         }
  //         const responseSubscription = await ApiHelper.post(API.subscriptionPlan, userData);
  //         console.log('responseSubscription',responseSubscription)
  //       }
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error:", err);
  //   }
  // };

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));

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
      .catch((err) => {});
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
  const DeactivateAccount = async () => {
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
                <Tab
                  label="Active subscription"
                  {...a11yProps(2)}
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
                        1 capital letter (A, B, C...) 1 small letter (a, b,
                        c...) 1 number (1, 2, 3...) 1 special symbol (!, @,
                        #...)
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
                      {brandData?.inActive === false && "Deactivated Account"}
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
                            ? "Deactivate"
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
                    {brandData?.inActive === true && "Deactivate"}
                    {brandData?.inActive === false && "Activate"}
                  </Button>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={2}>
  {/* Manage Account */}
  <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headerStyle}>Transaction Details</h2>
        <div style={listStyle}>
          <div style={detailItemStyle}>
            <div style={labelStyle}>Transaction Date:</div>
            <div style={valueStyle}>{paymentDetails?.transaction_date}</div>
          </div>
          <div style={detailItemStyle}>
            <div style={labelStyle}>Payment Status:</div>
            <div style={valueStyle}>{paymentDetails?.payment_status}</div>
          </div>
          <div style={detailItemStyle}>
            <div style={labelStyle}>Payment Currency:</div>
            <div style={valueStyle}>{paymentDetails?.payment_currency}</div>
          </div>
          <div style={detailItemStyle}>
            <div style={labelStyle}>Payment Amount:</div>
            <div style={valueStyle}>{paymentDetails?.payment_amount}</div>
          </div>
          <div style={detailItemStyle}>
            <div style={labelStyle}>Payment Period:</div>
            <div style={valueStyle}>{selectedPaymentPeriod}</div>
          </div>
          <div style={lastDetailItemStyle}>
            <div style={labelStyle}>Payment Plan:</div>
            <div style={valueStyle}>{selectedPaymentPlan}</div>
          </div>
        </div>
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

export default BrandSettings;
