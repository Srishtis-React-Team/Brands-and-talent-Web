import React, { useState, useEffect } from "react";
import "../assets/css/dashboard.css";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate, useOutletContext } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  const fieldsBackground = require("../assets/images/fields-background.png");
  const btLogo = require("../assets/icons/Group 56.png");
  const socialIcons = require("../assets/icons/Social.png");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  const clear = () => {
    setFirstName("");
    setEmail("");
  };

  const subscribe = async () => {
    const formData = {
      firstName: firstName,
      email: email,
    };
    console.log(formData, "formData subscribe form");
    clear();
  };

  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to top on link click
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [navigate]);

  return (
    <>
      <section className="main-form">
        <div
          className="form-section"
          style={{
            backgroundImage: `url(${fieldsBackground})`,
          }}
        >
          <div className="form-title">Get Discovered</div>
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
        </div>
      </section>
      <section>
        <div className="footer-section">
          <div className="footer-wrapper">
            <div className="footer-icon">
              <img src={btLogo}></img>
            </div>
            <div className="company-info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              placerat dapibus sapien, pellentesque elementum dolor finibus sed.
            </div>
            <div className="social-medias">
              <img src={socialIcons}></img>
            </div>
          </div>
          <div className="footer-wrapper">
            <div>
              <Link className="footer-title" onClick={handleClick} to="/">
                Company
              </Link>
            </div>
            <div>
              <Link onClick={handleClick} to="/">
                Home
              </Link>
            </div>
            <div>
              <Link onClick={handleClick} to="/find-creators">
                Find Creators
              </Link>
            </div>
            <div>
              <Link to="/pricing" onClick={handleClick}>
                Pricing
              </Link>
            </div>
            <div>
              <Link to="/resources" onClick={handleClick}>
                Resources
              </Link>
            </div>
          </div>
          <div className="footer-wrapper">
            <div className="footer-title">Help</div>
            <div>Customer Support</div>
            <div>Help & FAQ</div>
            <div>Terms & Conditions</div>
            <div>Pricing</div>
          </div>
          <div className="footer-wrapper">
            <div>
              <Link className="footer-title" to="/resources">
                Learn To Resources
              </Link>
            </div>
            <div>Featured Lists</div>
            <div>New Faces</div>
            <div>How to - Blog</div>
            <div>Youtube Playlist</div>
          </div>
        </div>
      </section>
      <section>
        <div className="copyright-section">
          <div>© Copyright 2023 Brandsandtalent All Right Reserved.</div>
        </div>
      </section>
    </>
  );
};

export default Footer;
