import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsform-one.css";
import Select from "react-select";
import Axios from "axios";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TalentHeader from "../layout/TalentHeader";
import TalentSideMenu from "../layout/TalentSideMenu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { ApiHelper } from "../helpers/ApiHelper";
import CurrentUser from "../CurrentUser";
import BrandHeader from "../brand/pages/BrandHeader";
import BrandSideMenu from "../brand/pages/BrandSideMenu";
import Spinner from "../components/Spinner";
import { useNavigate, useLocation } from "react-router-dom";
import {
  parsePhoneNumber,
  isValidPhoneNumber,
  getNumberType,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import parseMax from "libphonenumber-js/max";

const ContactSupport = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { currentUserId, currentUserImage, currentUserType, avatarImage } =
    CurrentUser();

  const open = Boolean(anchorEl);
  const handleFileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [enquiry, setEnquiry] = useState("");
  const [enquiryError, setEnquiryError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const handleEmailChange = (e) => {
    setEmailError(false);
    const email = e.target.value;
    setEmail(e.target.value);
    // Validate email using regex
    setIsValidEmail(emailRegex.test(email));
  };

  const postSupportMail = async () => {
    if (!name) setNameError(true);
    if (!email) setEmailError(true);
    if (!enquiry) setEnquiryError(true);
    if (!subject) setSubjectError(true);
    if (name && email && enquiry && subject) {
      const formData = { name, phoneNo: mobile, enquiry, email, subject };
      setIsLoading(true);
      try {
        const resData = await ApiHelper.post(
          `${API.postSupportMail}`,
          formData
        );
        if (resData.data.status) {
          setIsLoading(false);
          setMessage("Contact Form Submitted Successfully");
          setOpenPopUp(true);
          setTimeout(() => {
            setOpenPopUp(false);
            setName("");
            setEmail("");
            setMobile("");
            setEnquiry("");
            setSubject("");
          }, 2000);
        } else {
          setIsLoading(false);
          setMessage("Kindly complete all mandatory fields");

          setOpenPopUp(true);
          setTimeout(() => setOpenPopUp(false), 2000);
        }
      } catch (err) {
        setIsLoading(false);
        // Handle error
      }
    } else {
      setMessage("Kindly complete all mandatory fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState(false);
  const [mobileValidationError, setMobileValidationError] = useState(false);
  const [mobileNumError, setMobileNumError] = useState();
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const handleMobileChange = (value) => {
    console.log(value, "handleMobileChange");
    isValidPhoneNumber(value);
    if (isValidPhoneNumber(value)) {
      setMobileError(false);
      setMobileValidationError(false);
      setMobile(value);
    } else {
      setMobileValidationError(true);
    }
  };

  const handleNavigation = () => {
    if (location.state && location.state.from) {
      navigate(`/${location.state.from}`);
    } else {
      navigate(-1); // Equivalent to history.goBack() in v5
    }
  };

  useEffect(() => {
    console.log(countryCode, "countryCode");
  }, []);

  return (
    <>
      {currentUserType == "talent" && <TalentHeader toggleMenu={toggleMenu} />}
      {currentUserType == "brand" && <BrandHeader toggleMenu={toggleMenu} />}
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
        }`}
      >
        {currentUserType == "talent" && <TalentSideMenu />}
        {currentUserType == "brand" && <BrandSideMenu />}
      </div>
      <main
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div className="brand-content-main boxBg edit_talentprofile">
          <div className="create-job-title">How Can we help?</div>
          <p>
            Have a question? Fill out the form below, and we'll get back to you
            within 1-2 business days
          </p>

          <div className="update-password-main w-100">
            <div className="kids-form-section col-md-12 mb-3">
              <label className="form-label">
                Full Name <span className="mandatory">*</span>
              </label>
              <div className="form-group adult-password-wrapper">
                <input
                  type="text"
                  className="form-control adult-signup-inputs pl-0x"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(false);
                  }}
                />
                {nameError && (
                  <div className="invalid-fields">
                    Please enter Your Full Name
                  </div>
                )}
              </div>
            </div>
            <div className="kids-form-section col-md-12 mb-3">
              <label className="form-label">
                E-mail <span className="mandatory">*</span>
              </label>
              <input
                type="email"
                className={`form-control ${
                  !isValidEmail ? "is-invalid" : "form-control"
                }`}
                onChange={handleEmailChange}
                placeholder="Enter E-mail"
                value={email}
              />
              {!isValidEmail && (
                <div className="invalid-feedback">
                  Please enter a valid email address.
                </div>
              )}
              {emailError && (
                <div className="invalid-fields">Please enter Email</div>
              )}
            </div>
            <div className="kids-form-section col-md-12 mb-3">
              <label className="form-label">Mobile Number</label>
              <MuiPhoneNumber
                countryCodeEditable={false}
                defaultCountry={"kh"}
                className="material-mobile-style"
                onChange={handleMobileChange}
                value={mobile}
              />
              {mobileNumberError && (
                <div className="error">{mobileNumberError}</div>
              )}
              {mobileError && (
                <div className="invalid-fields">Please enter Mobile Number</div>
              )}
              {mobileValidationError && (
                <div className="invalid-fields">
                  Please enter correct Mobile Number
                </div>
              )}
              {mobileNumError && (
                <div className="invalid-fields">Only Numbers Allowed</div>
              )}
            </div>
            <div className="kids-form-section col-md-12 mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Subject<span className="mandatory">*</span>
              </label>

              <input
                type="email"
                className="form-control"
                onChange={(e) => {
                  setSubject(e.target.value);
                  setSubjectError(false);
                }}
                placeholder="Enter subject"
                value={subject}
              />
              {subjectError && (
                <div className="invalid-fields">Please enter Subject</div>
              )}
            </div>
            <div className="kids-form-section col-md-12 mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Message<span className="mandatory">*</span>
              </label>
              <textarea
                className="contact-us-textarea w-100"
                id="exampleFormControlTextarea1"
                value={enquiry}
                rows="3"
                onChange={(e) => {
                  setEnquiry(e.target.value);
                  setEnquiryError(false);
                }}
              />

              {enquiryError && (
                <div className="invalid-fields">Please enter Message</div>
              )}
            </div>

            <div className="add-portfoli-section cn-btn">
              <div className="add-portfolia-btn contactus-btn-wrapper">
                <button
                  className="edit-profile-navigation-btn bk-btn"
                  onClick={handleNavigation}
                >
                  <i className="bi bi-arrow-left-circle-fill arrow-left-circle"></i>
                  <span className="edit-profile-navigation-text">Back</span>
                </button>
                <Button
                  onClick={postSupportMail}
                  className="edit-profileimg-btn"
                  variant="text"
                  style={{ textTransform: "capitalize" }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {isLoading && <Spinner />}

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default ContactSupport;
