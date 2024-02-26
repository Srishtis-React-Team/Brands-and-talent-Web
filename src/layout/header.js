import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/dashboard.css";
import { useNavigate } from "react-router";
import { Route } from "react-router";
import Register from "../auth/Register";
const Header = ({ sendMessageToParent }) => {
  const navigate = useNavigate();
  const btLogo = require("../assets/icons/Group 56.png");
  const gridLogo = require("../assets/icons/4243313_ux_basic_app_menu_icon 1.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [signupCategory, setSignupCategory] = useState("talent");
  const [above_18, setAbove_18] = useState(false);
  const [below_18, setBelow_18] = useState(false);
  const [talent, setTalent] = useState(true);
  const [brand, setBrand] = useState(false);

  const messageToSignup = () => {
    // Call the function passed from the parent with a message
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

  const handleRegister = () => {
    if (brand === true) {
      navigate("/signup", {
        state: { signupCategory: signupCategory },
      });
    } else if (talent === true) {
      setTimeout(() => {
        sendMessageToParent("open-kids-form");
      }, 800);
    }
  };

  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to top on link click
  };

  return (
    <>
      <div className="mobile-navbar">
        <div
          className="icon"
          onClick={() => {
            navigate("/");
          }}
        >
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
            <a
              className="dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              Resources
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a className="dropdown-item">
                  <NavLink to="/resources" onClick={handleClick}>
                    About
                  </NavLink>
                </a>
              </li>
              <li className="">
                <a
                  className="dropdown-item dropdown-toggle"
                  dropdown-toggle
                  data-bs-toggle="dropdown"
                >
                  Blogs
                </a>
                <ul className="dropdown-menu mobile-blogs-menu">
                  <li>
                    <a href="" className="dropdown-item">
                      Industry News & Insights
                    </a>
                  </li>
                  <li>
                    <a href="" className="dropdown-item">
                       Case Studies
                    </a>
                  </li>
                  <li>
                    <a href="" className="dropdown-item">
                      Talent Diaries
                    </a>
                  </li>
                  <li>
                    <a href="" className="dropdown-item">
                       Talent Tips & Tricks
                    </a>
                  </li>
                  <li>
                    <a href="" className="dropdown-item">
                       Brand Tips & Tricks
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <hr className="dropdown-divider"></hr>
              </li>
              <li>
                <a className="dropdown-item">Community guidelines</a>
              </li>
            </ul>
          </div>
        </div>
        <form className="d-flex search-bootstrap">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
          <button
            className="btn btn-outline-success search-bootstrap-btn"
            type="submit"
          >
            Search
          </button>
        </form>
        {/* <div className="responsive-box">
          <input type="checkbox" id="search-check"></input>
          <div className="responsive-search-box">
            <input type="text" placeholder="Type here..."></input>
            <label htmlFor="search-check" className="responsive-search-icon">
              <i className="fas fa-search"></i>
            </label>
          </div>
        </div> */}
        <div className="login-text">Login</div>
        <div
          className="signup"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Sign up for free
        </div>
      </div>

      <div className="header">
        <div
          className="icon btn-logo"
          onClick={() => {
            navigate("/");
          }}
        >
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
            {/* <NavLink to="/resources" onClick={handleClick}>
              Resources
            </NavLink> */}
            <a
              className="dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              Resources
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a className="dropdown-item">
                  <NavLink to="/resources" onClick={handleClick}>
                    About
                  </NavLink>
                </a>
              </li>
              <li className="dropend ">
                <a
                  className="dropdown-item dropdown-toggle"
                  dropdown-toggle
                  data-bs-toggle="dropdown"
                >
                  Blogs
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="" className="dropdown-item">
                      Industry News & Insights
                    </a>
                  </li>
                  <li>
                    <a href="" className="dropdown-item">
                       Case Studies
                    </a>
                  </li>
                  <li>
                    <a href="" className="dropdown-item">
                      Talent Diaries
                    </a>
                  </li>
                  <li>
                    <a href="" className="dropdown-item">
                       Talent Tips & Tricks
                    </a>
                  </li>
                  <li>
                    <a href="" className="dropdown-item">
                       Brand Tips & Tricks
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <hr className="dropdown-divider"></hr>
              </li>
              <li>
                <a className="dropdown-item">Community guidelines</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="header-functions">
          <form className="d-flex search-bootstrap">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            ></input>
            <button
              className="btn btn-outline-success search-bootstrap-btn"
              type="submit"
            >
              Search
            </button>
          </form>
          {/* <div className="box">
            <input type="checkbox" id="check"></input>
            <div className="search-box">
              <input type="text" placeholder="Type here..."></input>
              <label htmlFor="check" className="icon">
                <i className="fas fa-search"></i>
              </label>
            </div>
          </div> */}
          <div className="">
            <NavLink to="/login" className="login-text" onClick={handleClick}>
              Login
            </NavLink>
          </div>
          <div
            className="signup"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Sign up for free
          </div>
          <div className="gridLogo">
            <img src={gridLogo}></img>
          </div>
        </div>
      </div>
      {/* <NavLink to="/signup"  onClick={handleClick}></NavLink>            </NavLink> */}

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered  modal-lg">
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
              <div className="modal-title">Welcome</div>
              <div className="modal-description">
                Welcome to our vibrant community! To tailor your experience,
                we'd love to know more about you.
              </div>
              <div className="modal-buttons">
                <div
                  onClick={(e) => {
                    userType("talent");
                  }}
                  className={talent ? "selected-register" : "choose-register"}
                >
                  I'm a Talent
                </div>
                <div
                  onClick={(e) => {
                    userType("brand");
                  }}
                  className={brand ? "selected-register" : "choose-register"}
                >
                  I'm a Brand
                </div>
              </div>
              <div className="question-model">
                Are you the star of the show or the one seeking brilliance?
              </div>
              <div className="register-modal">
                <div
                  className="register-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={(e) => {
                    handleRegister();
                  }}
                >
                  Register Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
