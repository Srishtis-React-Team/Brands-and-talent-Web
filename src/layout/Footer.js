import React, { useState, useEffect } from "react";
import "../assets/css/dashboard.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
const Footer = () => {
  const navigate = useNavigate();
  const fieldsBackground = require("../assets/images/fields-background.png");
  const btLogo = require("../assets/images/LOGO.jpg");
  const socialIcons = require("../assets/icons/Social.png");
  const fbBlack = require("../assets/icons/social-media-icons/fb-black.png");
  const twitterBlack = require("../assets/icons/social-media-icons/twitter-black.png");
  const githubBlack = require("../assets/icons/social-media-icons/github-black.png");
  const instaBlack = require("../assets/icons/social-media-icons/insta-black.png");

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const clear = () => {
    setFirstName("");
    setEmail("");
  };

  const [data, setData] = useState("");

  const talentSignup = () => {
    setData("talent-signup");
  };

  const subscribe = async () => {
    if (firstName === "") {
      setFirstNameError(true);
    }
    if (email === "") {
      setEmailError(true);
    }
    if (firstName !== "" && email !== "") {
      const formData = {
        email: email,
      };
      clear();
      await ApiHelper.post(API.subscriptionStatus, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setMessage("Subscribed SuccessFully! Check Your Email Inbox");
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
            }, 1000);
          } else if (resData.data.status === false) {
            setMessage(resData.data.message);
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to top on link click
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [navigate]);

  return (
    <>
      <div className="container">
        <div className="main-footer-wrapper mb-4">
          <section className="main-footer-form">
            <div className="get-discover title mt-0">
              Subscribe to Newsletter
            </div>
            <div className="form-fields row">
              <div className="col-md-4 form-group">
                <input
                  className="input-style form-control"
                  placeholder="Full name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setFirstNameError(false);
                  }}
                ></input>
                {firstNameError && (
                  <div className="invalid-fields" style={{ color: "#ffffff" }}>
                    * Please enter First Name
                  </div>
                )}
              </div>
              <div className="col-md-4 form-group">
                <input
                  className="input-style form-control"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                ></input>
                {emailError && (
                  <div className="invalid-fields" style={{ color: "#ffffff" }}>
                    * Please enter Email Address
                  </div>
                )}
              </div>
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
        </div>

        <section className="footerCommon pt-5">
          <div className="footer-section row">
            <div className="footer-wrapper col-md-4 col-lg-4">
              <div className="footer-icon">
                <img className="btLogo" src={btLogo}></img>
              </div>
              <div className="company-info">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                placerat dapibus sapien, pellentesque elementum dolor finibus
                sed.
              </div>
              <div className="social-medias">
                <img src={twitterBlack}></img>
                <img src={fbBlack}></img>
                <img src={instaBlack}></img>
                <img src={githubBlack}></img>
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
                  <Link onClick={handleClick} to="/brand-firstGig">
                    Hire Talent
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={() => talentSignup()}>
                    Register as Talent
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={handleClick}>
                    Get Hired
                  </Link>
                </li>
                <li>
                  <Link to="/resources" onClick={handleClick}>
                    Brand / Client & Talent Store
                  </Link>
                </li>
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
                  <Link onClick={handleClick} to="/blogs">
                    Industry news and insights
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClick} to="/blogs">
                    Case studies
                  </Link>
                </li>
                <li>
                  <Link to="/blogs" onClick={handleClick}>
                    Talent stories
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-wrapper col-md-4 col-lg-2">
              <h6>
                <Link className="footer-title" onClick={handleClick} to="/">
                  Policy
                </Link>
              </h6>

              <ul className="footerLinks">
                <li>
                  <Link onClick={handleClick} to="/">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClick} to="/community-guidelines">
                    Community guidelines
                  </Link>
                </li>
                <li>
                  <Link to="/" onClick={handleClick}>
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
              © Copyright 2024 Brand / Client andt alent All Right Reserved.
            </p>
          </div>
        </section>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Footer;
