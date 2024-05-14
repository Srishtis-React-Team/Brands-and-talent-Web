import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/dashboard.css";
import { useNavigate } from "react-router";
import { Route } from "react-router";
import Register from "../auth/Register";
import { Dropdown } from "react-bootstrap";
import PopUp from "../components/PopUp";
const Header = ({ onData }) => {
  const navigate = useNavigate();
  const btLogo = require("../assets/icons/Group 56.png");
  const gridLogo = require("../assets/icons/4243313_ux_basic_app_menu_icon 1.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [signupCategory, setSignupCategory] = useState("talent");
  const [above_18, setAbove_18] = useState(false);
  const [below_18, setBelow_18] = useState(false);
  const [talent, setTalent] = useState(true);
  const [brand, setBrand] = useState(false);
  const [currentUserId, setcurrentUserId] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setcurrentUserId(localStorage.getItem("currentUser"));
    console.log(currentUserId, "currentUserId header");
  }, [currentUserId]);

  const login = () => {
    navigate("/login");
  };

  const logout = () => {
    localStorage.clear();
    setcurrentUserId(null);
    setMessage("Logged Out SuccessFully");
    setOpenPopUp(true);
    setTimeout(function() {
      setOpenPopUp(false);
    }, 1000);
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
        // sendMessageToParent("open-kids-form");
        openModal();
      }, 800);
    }
  };

  const modalRef = useRef(null);
  const openModal = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  const handleClick = (data) => {
    window.scrollTo(0, 0); // Scroll to top on link click
    if (data == "post-job") {
      setMessage("You Need To Login First");
      setOpenPopUp(true);
      setTimeout(function() {
        setOpenPopUp(false);
        navigate("/login");
      }, 1000);
    }
  };

  useEffect(() => {
    console.log(onData, "onData");
    if (onData === "talent-signup") {
      setTalent(true);
      openModal();
    }
  }, [onData]);

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

        <div className="mobile-nav-functions">
          <div className="">
            <NavLink
              to="/login"
              className="login-text "
              onClick={() => handleClick("")}
            >
              Login
            </NavLink>
          </div>
          <div
            className="signup mobile-signup"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Sign up for free
          </div>
          <div
            onClick={() => {
              setMenuOpen(!menuOpen);
              // sendMessageToParent({ menuStatus: menuOpen });
            }}
            className="menu-icon"
          >
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
      <div className={menuOpen ? "mobile-nav-content" : "hide-nav"}>
        <div className="mobile-menu-items">
          <div>
            <NavLink to="/" onClick={() => handleClick("")}>
              Home
            </NavLink>
          </div>
          <div onClick={() => handleClick("post-job")}>Post a Job</div>
          <div>
            <NavLink to="/listJob" onClick={() => handleClick("list-job")}>
              List Job
            </NavLink>
          </div>
          <div>
            <NavLink to="/find-creators" onClick={() => handleClick("")}>
              Find Talent
            </NavLink>
          </div>
          <div>
            <NavLink to="/how-it-works" onClick={() => handleClick("")}>
              How It Works
            </NavLink>
          </div>
          {currentUserId != null && (
            <div>
              <NavLink to="/pricing" onClick={() => handleClick("")}>
                Pricing
              </NavLink>
            </div>
          )}
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
                  <NavLink to="/about-us" onClick={() => handleClick("")}>
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
                  <NavLink to="/blogs" onClick={() => handleClick("")}>
                    Blogs
                  </NavLink>
                </a>
                <ul className="dropdown-menu mobile-blogs-menu">
                  <li>
                    <a href="" className="dropdown-item">
                      <NavLink to="/blogs" onClick={() => handleClick("")}>
                        Industry News & Insights
                      </NavLink>
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
                <a className="dropdown-item">
                  <NavLink to="/about-us" onClick={() => handleClick("")}>
                    About
                  </NavLink>
                </a>
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
      </div>

      <div className="header">
        <div className="container-fluid header-container d-flex align-items-center justify-content-between">
          <div
            className="icon btn-logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={btLogo}></img>
          </div>
          <div className="header-items">
            <div className=" menu-items">
              <div>
                <NavLink to="/" onClick={() => handleClick("")}>
                  Home
                </NavLink>
              </div>
              <div onClick={() => handleClick("post-job")}>Post a job</div>
              <div>
                <NavLink to="/listJob" onClick={() => handleClick("list-job")}>
                  Jobs List
                </NavLink>
              </div>
              <div>
                <NavLink to="/find-creators" onClick={() => handleClick("")}>
                  Find Talent
                </NavLink>
              </div>
              {/* <div>
            <NavLink to="/get-booked" onClick={() => handleClick("")}>
              Get Booked
            </NavLink>
          </div> */}
              <div>
                <NavLink to="/how-it-works" onClick={() => handleClick("")}>
                  How It Works
                </NavLink>
              </div>

              {currentUserId != null && (
                <div>
                  <NavLink to="/pricing" onClick={() => handleClick("")}>
                    Pricing
                  </NavLink>
                </div>
              )}

              <div>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Resources
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink to="/about-us" onClick={() => handleClick("")}>
                        <a className="dropdown-item">About</a>
                      </NavLink>
                    </li>
                    <li className="dropend">
                      <a
                        className="dropdown-item dropdown-toggle"
                        dropdown-toggle
                        data-bs-toggle="dropdown"
                      >
                        <NavLink to="/blogs" onClick={() => handleClick("")}>
                          Blogs
                        </NavLink>
                      </a>
                      <ul className="dropdown-menu blogs-menu">
                        <li>
                          <a href="" className="dropdown-item">
                            <NavLink
                              to="/blogs"
                              onClick={() => handleClick("")}
                            >
                              Industry News & Insights
                            </NavLink>
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
                      <a className="dropdown-item">
                        <NavLink
                          to="/community-guidelines"
                          onClick={() => handleClick("")}
                        >
                          Community Guidelines
                        </NavLink>
                      </a>
                    </li>
                  </ul>
                </li>

                {/* <NavLink to="/resources" onClick={() => handleClick("")}>
              Resources
            </NavLink> */}
                {/* <a
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
                    <NavLink to="/resources" onClick={() => handleClick("")}>
                      <a className="dropdown-item">About</a>
                    </NavLink>
                  </li>
                  <li className="dropend ">
                    <a
                      className="dropdown-item dropdown-toggle"
                      dropdown-toggle
                      data-bs-toggle="dropdown"
                    >
                      <NavLink to="/blogs" onClick={() => handleClick("")}>
                        Blogs
                      </NavLink>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a href="" className="dropdown-item">
                          <NavLink to="/blogs" onClick={() => handleClick("")}>
                            Industry News & Insights
                          </NavLink>
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
                    <a className="dropdown-item">
                      <NavLink
                        to="/community-guidelines"
                        onClick={() => handleClick("")}
                      >
                        Community Guidelines
                      </NavLink>
                    </a>
                  </li>
                </ul> */}
              </div>
            </div>
            <div className="header-functions">
              {/* <div className="box">
            <input type="checkbox" id="check"></input>
            <div className="search-box">
              <input type="text" placeholder="Type here..."></input>
              <label htmlFor="check" className="icon">
                <i className="fas fa-search"></i>
              </label>
            </div>
          </div> */}
              <div
                className=""
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasTop"
                aria-controls="offcanvasTop"
              >
                <i className="fas fa-search"></i>
              </div>

              <div
                className="offcanvas offcanvas-top search-canvas-top"
                tabIndex="-1"
                id="offcanvasTop"
                aria-labelledby="offcanvasTopLabel"
              >
                <div className="offcanvas-header">
                  <h5 id="offcanvasTopLabel">Search Anything</h5>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
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
                </div>
              </div>

              <div className="">
                <NavLink
                  to="/login"
                  className="login-text"
                  onClick={() => handleClick("")}
                >
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
                <img src={gridLogo} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <NavLink to="/signup"  onClick={() => handleClick("")}></NavLink>            </NavLink> */}

      {/* <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  {currentUserId != null && (
                    <li onClick={() => logout()}>
                      <a class="dropdown-item">Logout</a>
                    </li>
                  )}
                  {currentUserId === null && (
                    <li onClick={() => login()}>
                      <a class="dropdown-item">Login</a>
                    </li>
                  )}
                </ul> */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
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
                  I'm a Brand/Agency/Client
                </div>
              </div>
              <div className="question-model">
                {talent &&
                  "Are you the star of the show or the one seeking brilliance?"}
                {brand && "I am Looking for talent"}
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
                  13-17 Years
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
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Header;
