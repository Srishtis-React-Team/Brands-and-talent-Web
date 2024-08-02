import React, { useState, useEffect, useRef } from "react";
import "../assets/css/dashboard.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import CurrentUser from "../CurrentUser";
import Header from "./header";
const Footer = (props) => {
  console.log(props.props, "propsfopter");
  const {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
    fcmToken,
  } = CurrentUser();
  const navigate = useNavigate();
  const fieldsBackground = require("../assets/images/fields-background.png");
  const btLogo = require("../assets/images/LOGO.png");
  const socialIcons = require("../assets/icons/Social.png");
  const fbBlack = require("../assets/icons/social-media-icons/fb-black.png");
  const twitterBlack = require("../assets/icons/social-media-icons/twitter-black.png");
  const githubBlack = require("../assets/icons/social-media-icons/github-black.png");
  const instaBlack = require("../assets/icons/social-media-icons/insta-black.png");

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [signupCategory, setSignupCategory] = useState("talent");
  const [above_18, setAbove_18] = useState(false);
  const [below_18, setBelow_18] = useState(false);
  const [talent, setTalent] = useState(true);
  const [brand, setBrand] = useState(false);

  const [currentUser_image, setCurrentUserImage] = useState("");
  const [currentUser_type, setCurrentUserType] = useState("");
  const [talentData, setTalentData] = useState();
  const [talentId, setTalentId] = useState(null);
  const clear = () => {
    setFirstName("");
    setEmail("");
  };

  const [data, setData] = useState("");

  // const talentSignup = () => {
  //   // setData("talent-signup");
  //   handleRegister();
  // };

  const subscribe = async () => {
    // if (firstName === "") {
    //   setFirstNameError(true);
    // }
    // if (email === "") {
    //   setEmailError(true);
    // }
    // if (firstName !== "" && email !== "") {
    //   const formData = {
    //     email: email,
    //   };
    //   clear();
    //   await ApiHelper.post(API.subscriptionStatus, formData)
    //     .then((resData) => {
    //       console.log(resData, "resData");
    //       if (resData.data.status === true) {
    //         setMessage("Subscribed successfully! Kindly check your inbox");
    //         setOpenPopUp(true);
    //         setTimeout(function() {
    //           setOpenPopUp(false);
    //         }, 1000);
    //       } else if (resData.data.status === false) {
    //         setMessage(resData.data.msg);
    //         setOpenPopUp(true);
    //         setTimeout(function() {
    //           setOpenPopUp(false);
    //         }, 2000);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    window.open("https://brandsandtalent.substack.com", "_blank");
  };

  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to top on link click
  };

  function userType(e) {
    if (e == "talent") {
      setTalent(true);
      setSignupCategory("talent");
    } else {
      setTalent(false);
    }
    if (e == "brand") {
      setBrand(true);
      setSignupCategory("brand");
    } else {
      setBrand(false);
    }
  }

  // const handleRegister = () => {
  //   if (brand === true) {
  //     navigate("/signup", {
  //       state: { signupCategory: signupCategory },
  //     });
  //   } else if (talent === true) {
  //     setTimeout(() => {
  //       // sendMessageToParent("open-kids-form");
  //       openModal();
  //     }, 800);
  //   }
  // };

  const modalRef = useRef(null);
  const openModal = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [navigate]);

  // const handleMessageFromHeader = (message) => {
  //   console.log(message, "message from header");
  //   if (message === "open-kids-form") {
  //     openModal();
  //   }
  //   if (message.menuStatus === false) {
  //     setHideAll(true);
  //   }
  //   setMessageFromHeader(message);
  // };

  const handleClickBlogs = (step) => {
    navigate("/blogs", { state: { step: step } });
  };

  const handleEmailChange = (e) => {
    setEmailError(false);
    const email = e.target.value;
    setEmail(e.target.value);
    // Validate email using regex
    setIsValidEmail(emailRegex.test(email));
  };

  const handleIconClick = (url) => {
    window.open(url, "_blank");
  };

  const handleAirtableClick = (data) => {
    window.open(
      "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
      "_blank"
    );
  };

  return (
    <>
      {/* <Header sendMessageToParent={handleMessageFromHeader} /> */}
      <div className="container">
        <div className="main-footer-wrapper mb-4">
          {props.props != "blog" && (
            <section className="main-footer-form">
              <div className="get-discover title mt-0">
                Stay Ahead with Our Newsletter
              </div>
              <div className="get-discover-description mt-0">
                Your go-to source for creator jobs, industry news & insights,
                exclusive interviews, compelling case studies, brand tips &
                tricks, talent tips & tricks, and the latest announcements
              </div>
              <div className="form-fields row justify-content-center">
                {/* <div className="col-md-4 form-group">
                  <input
                    className="input-style form-control"
                    placeholder="Full Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setFirstNameError(false);
                    }}
                  ></input>
                  {firstNameError && (
                    <div
                      className="invalid-fields"
                      style={{ color: "#ffffff" }}
                    >
                      Please enter Full Name
                    </div>
                  )}
                </div>
                <div className="col-md-4 form-group">
                  <input
                    type="email"
                    className={`input-style  form-control ${
                      !isValidEmail ? "is-invalid" : "form-control"
                    }`}
                    onChange={handleEmailChange}
                    placeholder="Enter E-mail"
                    value={email}
                  />
                  {!isValidEmail && (
                    <div
                      className="invalid-feedback"
                      style={{ color: "#ffffff" }}
                    >
                      Please enter E-mail
                    </div>
                  )}
                  {emailError && (
                    <div
                      className="invalid-fields"
                      style={{ color: "#ffffff" }}
                    >
                      Please enter E-mail
                    </div>
                  )}
                </div> */}
                <div className="col-md-4 form-group">
                  <div
                    className="subscribe-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      subscribe();
                    }}
                  >
                    Subscribe Now
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>

        <section className="footerCommon pt-5">
          <div className="footer-section row">
            <div className="footer-wrapper col-md-4 col-lg-4">
              <div className="footer-icon">
                <img className="btLogo" src={btLogo}></img>
              </div>
              <div className="company-info">
                connecting brands and talent™ <br /> Welcome to Brands & Talent
                (BT), the ultimate platform for creators, influencers, and
                talent to shine. Connect directly with brands and clients,
                amplify your voice, and showcase your work globally.
              </div>
              <div className="social-medias">
                <div>
                  <i
                    className="bi bi-globe social-media-icons"
                    onClick={() =>
                      handleIconClick("https://brandsandtalent.com")
                    }
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      margin: "0 10px",
                    }}
                  ></i>
                  <i
                    className="bi bi-instagram social-media-icons"
                    onClick={() =>
                      handleIconClick("https://instagram.com/brandsandtalent")
                    }
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      margin: "0 10px",
                    }}
                  ></i>
                  <i
                    className="bi bi-telegram social-media-icons"
                    onClick={() =>
                      handleIconClick("https://t.me/brandsandtalent")
                    }
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      margin: "0 10px",
                    }}
                  ></i>

                  <i
                    className="bi bi-send-arrow-down-fill social-media-icons"
                    onClick={() =>
                      handleIconClick("https://t.me/brandsandtalentmgmt")
                    }
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      margin: "0 10px",
                    }}
                  ></i>
                  <i
                    className="bi bi-facebook social-media-icons"
                    onClick={() =>
                      handleIconClick(
                        "https://web.facebook.com/brandsandtalent"
                      )
                    }
                    style={{
                      cursor: "pointer social-media-icons",
                      fontSize: "24px",
                      margin: "0 10px",
                    }}
                  ></i>
                  <i
                    className="bi bi-envelope social-media-icons"
                    onClick={() =>
                      handleIconClick("mailto:brandsntalent@gmail.com")
                    }
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      margin: "0 10px",
                    }}
                  ></i>
                </div>
              </div>
            </div>

            <div className="footer-wrapper col-md-4 col-lg-2">
              <h6>
                <Link className="footer-title" onClick={handleClick} to="/">
                  Company
                </Link>
              </h6>
              <ul className="footerLinks">
                <li>
                  <Link onClick={handleClick} to="/about-us">
                    About Us
                  </Link>
                </li>
                {/* <li>
                  <Link onClick={handleClick} to="/community-guidelines">
                    Community guidelines
                  </Link>
                </li> */}
                <li>
                  <Link to="/" onClick={handleClick}>
                    Career
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={handleClick}>
                    Become an Affiliate
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={handleClick}>
                    Investors
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" onClick={handleClick}>
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-wrapper col-md-4 col-lg-2">
              <h6>
                <Link className="footer-title" onClick={handleClick} to="/">
                  Products & Services
                </Link>
              </h6>

              <ul className="footerLinks">
                <li>
                  <Link onClick={handleClick} to="/">
                    Verified Talent Marketplace
                  </Link>
                </li>
                <li>
                  <Link onClick={handleAirtableClick}>Hire Talent</Link>
                </li>
                <li>
                  <Link onClick={handleAirtableClick}>Register as Talent</Link>
                </li>
                {/* <li>
                  <Link onClick={handleClick} to="/brand-firstGig">
                    Hire Talent
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => openModal()}>
                    Register as Talent
                  </Link>
                </li> */}

                {!currentUserId && (
                  <>
                    <li>
                      <Link onClick={handleAirtableClick}>Get Hired</Link>
                    </li>
                    {/* <li>
                      <Link to="/get-booked" onClick={handleAirtableClick}>
                        Get Hired
                      </Link>
                    </li> */}
                  </>
                )}

                {currentUserId && currentUserType == "talent" && (
                  <>
                    <li>
                      <Link onClick={handleAirtableClick}>Get Hired</Link>
                    </li>
                    {/* <li>
                      <Link to="/talent-dashboard" onClick={handleClick}>
                        Get Hired
                      </Link>
                    </li> */}
                  </>
                )}

                {/* <li>
                  <Link to="/resources" onClick={handleClick}>
                    BT Store
                  </Link>
                </li> */}
              </ul>
            </div>

            <div className="footer-wrapper col-md-4 col-lg-2">
              <h6>
                <Link className="footer-title" onClick={handleClick} to="/">
                  Resources
                </Link>
              </h6>
              <ul className="footerLinks">
                <li>
                  <a href=""> Industry Insights</a>
                </li>
                <li>
                  <a href=""> Case Studies</a>
                </li>
                <li>
                  <a href="">Interviews</a>
                </li>
              </ul>
              {/* <ul className="footerLinks">
                <li onClick={() => handleClickBlogs(0)}>
                  <a href=""> Industry Insights</a>
                </li>
                <li onClick={() => handleClickBlogs(1)}>
                  <a href=""> Case Studies</a>
                </li>
                <li onClick={() => handleClickBlogs(2)}>
                  <a href="">Interviews</a>
                </li>
              </ul> */}
            </div>
            <div className="footer-wrapper col-md-4 col-lg-2">
              <h6>
                <Link className="footer-title" onClick={handleClick} to="/">
                  Policy
                </Link>
              </h6>

              <ul className="footerLinks">
                <li>
                  <Link onClick={handleClick} to="/community-guidelines">
                    Community Guidelines
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClick} to="/terms-conditions">
                    Terms & Conditions
                  </Link>
                </li>

                <li>
                  <Link to="/privacy-policy" onClick={handleClick}>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <div className="copyright-section">
            <p>
              © Copyright 2024 Brands & Talent Management All rights reserved. |
              Feedback & Reporting
            </p>
          </div>
        </section>
      </div>
      {openPopUp && <PopUp message={message} />}

      <div
        ref={modalRef}
        className="modal fade"
        id="verify_age"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="ageverify-title">Select Your Age Group</div>
              <div className="modal-buttons ageverify-buttons">
                <div
                  onClick={(e) => {
                    navigate("/signup", {
                      state: { signupCategory: "kids" },
                    });
                  }}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  className="kids-select-btn"
                >
                  4 - 17 Years
                </div>
                <div
                  onClick={(e) => {
                    navigate("/signup", {
                      state: { signupCategory: "adults" },
                    });
                  }}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  className="adults-select-btn"
                >
                  18 Years or Older
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
