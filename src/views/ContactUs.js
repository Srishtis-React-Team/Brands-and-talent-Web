import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsform-one.scss";
import Select from "react-select";
import Axios from "axios";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import nationalityOptions from "../components/nationalities";
import languageOptions from "../components/languages";
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
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

const ContactUs = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);

  const {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
  } = CurrentUser();

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
    if (!name) {
      setNameError(true);
    }
    if (!email) {
      setEmailError(true);
    }
    if (!enquiry) {
      setEnquiryError(true);
    }
    const formData = {
      name: name,
      phoneNo: mobile,
      enquiry: enquiry,
      email: email,
    };
    setIsLoading(true);
    await ApiHelper.post(`${API.postSupportMail}`, formData)
      .then((resData) => {
        console.log(resData, "resData");
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Contact Form Submitted SuccessFully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            setName("");
            setEmail("");
            setMobile("");
            setEnquiry("");
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData?.data?.message);
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 2000);
        }
      })
      .catch((err) => {});
  };

  const [mobileNumError, setMobileNumError] = useState();

  const handleMobileChange = (value, countryData) => {
    // Update the parentMobile state with the new phone number
    console.log(value, "handleMobileChange");
    setMobile(value);
    setMobileError(false);
  };

  const handleNavigation = (event) => {
    if (location.state && location.state.from) {
      navigate(`/${location.state.from}`);
    } else {
      navigate(-1); // Equivalent to history.goBack() in v5
    }
  };

  return (
    <>
      <main
        style={{ margin: "30px auto", width: "50%" }}
        id="mainBrand"
        className=""
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
                {" "}
                <input
                  type="text"
                  className="form-control adult-signup-inputs"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
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
                defaultCountry={"kh"}
                className="form-control"
                onChange={handleMobileChange}
                value={mobile}
              />
              {mobileError && (
                <div className="invalid-fields">Please enter Mobile Number</div>
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
              ></textarea>
              {enquiryError && (
                <div className="invalid-fields">Please enter Message</div>
              )}
            </div>
            <div className="add-portfoli-section ">
              <div className="add-portfolia-btn contactus-btn-wrapper">
                <div
                  className="edit-profile-navigation-btn"
                  onClick={() => {
                    handleNavigation("back");
                  }}
                >
                  <i className="bi bi-arrow-left-circle-fill arrow-left-circle"></i>
                  <span className="edit-profile-navigation-text">Back</span>
                </div>

                <Button
                  onClick={postSupportMail}
                  className="edit-profileimg-btn"
                  variant="text"
                  style={{ textTransform: "capitalize" }}
                  disabled={!name || !enquiry || !email}
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

export default ContactUs;
