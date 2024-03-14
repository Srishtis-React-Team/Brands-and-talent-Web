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
  const btLogo = require("../assets/icons/Group 56.png");
  const socialIcons = require("../assets/icons/Social.png");
  const fbBlack = require("../assets/icons/social-media-icons/fb-black.png");
  const twitterBlack = require("../assets/icons/social-media-icons/twitter-black.png");
  const githubBlack = require("../assets/icons/social-media-icons/github-black.png");
  const instaBlack = require("../assets/icons/social-media-icons/insta-black.png");

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const clear = () => {
    setFirstName("");
    setEmail("");
  };

  const subscribe = async () => {
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
  };

  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to top on link click
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [navigate]);

  return (
    <>
      <div className="container-fluid">
        <div className="main-footer-wrapper">
          <section className="main-footer-form">
            <div className="get-discover">Get Discovered</div>
            <div className="form-fields">
              <input
                className="input-style form-control"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              ></input>
              <input
                className="input-style form-control"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
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
          </section>
        </div>
        <section>
          <div className="footer-section">
            <div className="footer-wrapper">
              <div className="footer-icon">
                <img src={btLogo}></img>
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
            <div className="footer-wrapper">
              <div>
                <Link className="footer-title" onClick={handleClick} to="/">
                  Company
                </Link>
              </div>
              <div>
                <Link onClick={handleClick} to="/about-us">
                  About Us
                </Link>
              </div>
              <div>
                <Link onClick={handleClick} to="/community-guidelines">
                  Community guidelines
                </Link>
              </div>
              <div>
                <Link to="/" onClick={handleClick}>
                  Career
                </Link>
              </div>
              <div>
                <Link to="/" onClick={handleClick}>
                  Become an Affiliate
                </Link>
              </div>
              <div>
                <Link to="/" onClick={handleClick}>
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="footer-wrapper">
              <div>
                <Link className="footer-title" onClick={handleClick} to="/">
                  Products & Services
                </Link>
              </div>
              <div>
                <Link onClick={handleClick} to="/">
                  Verified Talent Marketplace
                </Link>
              </div>
              <div>
                <Link onClick={handleClick} to="/find-creators">
                  Hire Talent
                </Link>
              </div>
              <div>
                <Link to="/" onClick={handleClick}>
                  Register as Talent
                </Link>
              </div>
              <div>
                <Link to="/" onClick={handleClick}>
                  Get Hired
                </Link>
              </div>
              <div>
                <Link to="/resources" onClick={handleClick}>
                  Brands & Talent Store
                </Link>
              </div>
            </div>
            <div className="footer-wrapper">
              <div>
                <Link className="footer-title" onClick={handleClick} to="/">
                  Resources
                </Link>
              </div>

              <div>
                <Link onClick={handleClick} to="/">
                  Industry news and insights
                </Link>
              </div>
              <div>
                <Link onClick={handleClick} to="/">
                  Case studies
                </Link>
              </div>
              <div>
                <Link to="/" onClick={handleClick}>
                  Talent stories
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="copyright-section">
            <div>© Copyright 2023 Brandsandtalent All Right Reserved.</div>
          </div>
        </section>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Footer;
