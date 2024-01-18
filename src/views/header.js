import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/dashboard.css";
import { useNavigate } from "react-router";
import Register from "./Register";
const Header = () => {
  const navigate = useNavigate();
  const btLogo = require("../assets/icons/Group 56.png");
  const searchLogo = require("../assets/icons/search (1).png");
  const gridLogo = require("../assets/icons/4243313_ux_basic_app_menu_icon 1.png");
  const uploadIcon = require("../assets/icons/upload.png");
  const importIcon = require("../assets/icons/instagram.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOne_visibility, showFormOne] = useState(true);
  const [formTwo_visibility, showFormTwo] = useState(false);
  const [formThree_visibility, showForThree] = useState(false);
  const [formFour_visibility, showFormFour] = useState(false);
  const [formFive_visibility, showFormFive] = useState(false);
  const [model, setModel] = useState(true);
  const [seeker, setSeeker] = useState(false);
  const [dob, setDOB] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGenders] = useState("");
  const [genderList, setGenderList] = useState([]);

  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to top on link click
  };

  return (
    <>
      <div className="mobile-navbar">
        <div className="icon">
          <img className="btLogo" src={btLogo}></img>
        </div>
        <div
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className="menu-icon"
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <div className={menuOpen ? "mobile-nav-content" : "hide-nav"}>
        <div className="mobile-menu-items">
          <div>
            <NavLink to="/" onClick={handleClick}>
              Home
            </NavLink>
          </div>
          <div>
            <NavLink to="/find-creators" onClick={handleClick}>
              Find Creators
            </NavLink>
          </div>
          <div>
            <NavLink to="/get-booked" onClick={handleClick}>
              Get Booked
            </NavLink>
          </div>
          <div>
            <NavLink to="/pricing" onClick={handleClick}>
              Pricing
            </NavLink>
          </div>
          <div>
            <NavLink to="/resources" onClick={handleClick}>
              Learn to Resources
            </NavLink>
          </div>
        </div>
        <div className="responsive-box">
          <input type="checkbox" id="search-check"></input>
          <div className="responsive-search-box">
            <input type="text" placeholder="Type here..."></input>
            <label htmlFor="search-check" className="responsive-search-icon">
              <i className="fas fa-search"></i>
            </label>
          </div>
        </div>
        <div className="login-text">Login</div>
        <div
          className="signup"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign up
        </div>
      </div>

      <div className="header">
        <div className="icon btn-logo">
          <img src={btLogo}></img>
        </div>
        <div className="menu-items">
          <div>
            <NavLink to="/" onClick={handleClick}>
              Home
            </NavLink>
          </div>
          <div>
            <NavLink to="/find-creators" onClick={handleClick}>
              Find Creators
            </NavLink>
          </div>
          <div>
            <NavLink to="/get-booked" onClick={handleClick}>
              Get Booked
            </NavLink>
          </div>
          <div>
            <NavLink to="/pricing" onClick={handleClick}>
              Pricing
            </NavLink>
          </div>
          <div>
            <NavLink to="/resources" onClick={handleClick}>
              Learn to Resources
            </NavLink>
          </div>
        </div>
        <div className="header-functions">
          <div className="box">
            <input type="checkbox" id="check"></input>
            <div className="search-box">
              <input type="text" placeholder="Type here..."></input>
              <label htmlFor="check" className="icon">
                <i className="fas fa-search"></i>
              </label>
            </div>
          </div>
          <div className="login-text">Login</div>
          <div
            className="signup"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </div>
          <div className="gridLogo">
            <img src={gridLogo}></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
