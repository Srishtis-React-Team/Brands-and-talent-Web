import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/dashboard.css";
import { Route } from "react-router";
import Register from "../auth/Register";
const Header = () => {
  const btLogo = require("../assets/icons/Group 56.png");
  const gridLogo = require("../assets/icons/4243313_ux_basic_app_menu_icon 1.png");
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="signup">
          <NavLink to="/signup" onClick={handleClick}>
            Sign up
          </NavLink>
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
            <NavLink to="/post-job" onClick={handleClick}>
              Post a Job
            </NavLink>
          </div>
          <div>
            <NavLink to="/find-creators" onClick={handleClick}>
              Find Talent
            </NavLink>
          </div>
          {/* <div>
            <NavLink to="/get-booked" onClick={handleClick}>
              Get Booked
            </NavLink>
          </div> */}
          <div>
            <NavLink to="/how-it-works" onClick={handleClick}>
              How It Works
            </NavLink>
          </div>
          <div>
            <NavLink to="/pricing" onClick={handleClick}>
              Pricing
            </NavLink>
          </div>
          <div>
            <NavLink to="/resources" onClick={handleClick}>
              Resources
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
          <div className="">
            <NavLink to="/login" className="login-text" onClick={handleClick}>
              Login
            </NavLink>
          </div>
          <div>
            <NavLink to="/signup" className="signup" onClick={handleClick}>
              Sign up
            </NavLink>
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
