import React, { useEffect, useState } from "react";
import "../assets/css/forms/kidsform-one.css";
import Button from "@mui/material/Button";
import MuiPhoneNumber from "material-ui-phone-number";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import Spinner from "../components/Spinner";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import { useNavigate, useLocation } from "react-router-dom";
import { CountryMobileDigits } from "./CountryMobileDigits";
import { numericToAlpha2CountryCode } from "./numericToAlpha2CountryCode";

const ContactUs = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
  const [mobileNumError, setMobileNumError] = useState();
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const handleEmailChange = (e) => {
    setEmailError(false);
    const email = e.target.value;
    setEmail(email);
    setIsValidEmail(emailRegex.test(email));
  };

  const postSupportMail = async () => {
    if (!name) setNameError(true);
    if (!email) setEmailError(true);
    if (!enquiry) setEnquiryError(true);

    const formData = { name, phoneNo: mobile, enquiry, email };
    setIsLoading(true);
    try {
      const resData = await ApiHelper.post(`${API.postSupportMail}`, formData);
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
        }, 2000);
      } else {
        setIsLoading(false);
        setMessage(resData.data.message);
        setOpenPopUp(true);
        setTimeout(() => setOpenPopUp(false), 2000);
      }
    } catch (err) {
      setIsLoading(false);
      // Handle error
    }
  };

  const handleMobileChange = (value) => {
    console.log(value, "handleMobileChange");

    setMobile(value);
    setMobileError(false);

    // Extract the country code
    const countryCode = value ? value.split(" ")[0] : "";
    // console.log(countryCode, "countryCode handleMobileChange");

    // // Extract the numeric country code
    // const match = value.match(/^\+(\d+)/);
    // const numericCountryCode = match ? match[1] : "";

    // // Convert numeric country code to alpha-2 code
    // const countryCode = numericToAlpha2CountryCode[numericCountryCode] || "";
    // const phoneNumber = value.replace(/^\+\d+\s*/, ""); // Remove country code from value

    // // Get the digit limit for the country code
    // const digitLimit = countryDigitLimits[countryCode] || 0;

    // console.log("Country Code:", countryCode);
    // console.log("Digit Limit:", digitLimit);

    // // Validate phone number length
    // if (digitLimit && phoneNumber.replace(/\D/g, "").length > digitLimit) {
    //   setMobileNumberError(`Phone number should be ${digitLimit} digits long.`);
    // } else {
    //   setMobileNumberError("");
    // }
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
      <Header />
      <main
        className="brand-home-main"
        style={{ margin: "30px auto", width: "50%" }}
      >
        <div
          className="brand-content-main boxBg edit_talentprofile"
          style={{ marginTop: "12%" }}
        >
          <div className="create-job-title">How can we help?</div>
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
                  className="form-control adult-signup-inputs"
                  placeholder="Enter Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                defaultCountry={"kh"}
                className="form-control"
                onChange={handleMobileChange}
                value={mobile}
                ref={(ref) => {
                  if (ref) {
                    const currentCountryCode = ref.getCountryCode();
                    setCountryCode(currentCountryCode);
                  }
                }}
              />
              {mobileNumberError && (
                <div className="error">{mobileNumberError}</div>
              )}
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
      <Footer />
    </>
  );
};

export default ContactUs;
