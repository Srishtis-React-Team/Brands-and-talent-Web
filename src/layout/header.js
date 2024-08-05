import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/dashboard.css";
import { useNavigate } from "react-router";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu, MenuListboxSlotProps } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
import PopUp from "../components/PopUp";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import { Button, Modal, Box, Typography } from "@mui/material";
import searchPathOptions from "../components/SearchPaths";

const Header = ({ onData }) => {
  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.png");
  const mbtLogo = require("../assets/images/bt-logo.jpg");
  const gridLogo = require("../assets/icons/4243313_ux_basic_app_menu_icon 1.png");
  const cofeeIcon = require("../assets/icons/cofeeIcon.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [signupCategory, setSignupCategory] = useState("talent");
  const [above_18, setAbove_18] = useState(false);
  const [below_18, setBelow_18] = useState(false);
  const [talent, setTalent] = useState(true);
  const [brand, setBrand] = useState(false);
  const [currentUserId, setcurrentUserId] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUser_image, setCurrentUserImage] = useState("");
  const [currentUser_type, setCurrentUserType] = useState("");
  const [talentData, setTalentData] = useState();
  const [talentId, setTalentId] = useState(null);

  const [brandId, setBrandId] = useState(null);
  const [brandData, setBrandData] = useState(null);

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));

    if (brandId) {
      getBrand();
    }
  }, [brandId]);
  useEffect(() => {}, [brandData]);

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setcurrentUserId(localStorage.getItem("currentUser"));
    setCurrentUserImage(localStorage.getItem("currentUserImage"));
    setCurrentUserType(localStorage.getItem("currentUserType"));
  }, [currentUserId]);
  useEffect(() => {}, [currentUser_type]);

  const login = () => {
    navigate("/login");
  };

  const logout = () => {
    localStorage.clear();
    setcurrentUserId(null);
    setMessage("Logged out successfully");
    setOpenPopUp(true);
    setTimeout(function () {
      setOpenPopUp(false);
      navigate("/");
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

  useEffect(() => {
    setTimeout(function () {
      setTalentId(localStorage.getItem("userId"));
    }, 1000);

    if (talentId) {
      getTalentById();
    }
  }, [talentId]);

  const getTalentById = async () => {
    await ApiHelper.post(
      `${API.getTalentById}${localStorage.getItem("userId")}`
    )
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setTalentData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {});
  };

  const modalRef = useRef(null);
  const openModal = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  const handleClick = (data) => {
    window.scrollTo(0, 0); // Scroll to top on link click
    if (data == "post-job") {
      if (!currentUserId) {
        window.open(
          "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          "_blank"
        );

        // setMessage("You must be logged in");
        // setOpenPopUp(true);
        // setTimeout(function() {
        //   setOpenPopUp(false);
        //   navigate("/login");
        // }, 1000);
      } else if (currentUser_type === "brand" && currentUserId) {
        navigate("/create-jobs");
      }
    }

    if (data == "find-talent") {
      if (!currentUserId) {
        // setMessage("You must be logged in");
        // setOpenPopUp(true);
        // setTimeout(function() {
        //   setOpenPopUp(false);
        //   navigate("/login");
        // }, 1000);
        window.open(
          "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          "_blank"
        );
      } else if (currentUser_type === "brand" && currentUserId) {
        navigate("/find-creators");
      } else if (
        currentUser_type === "talent" &&
        talentData?.planName == "Basic"
      ) {
        setMessage("Purchase Pro or Premium Plan to unlock this feature");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/pricing");
        }, 3000);
      } else if (
        currentUser_type === "talent" &&
        talentData?.planName != "Basic"
      ) {
        navigate("/find-creators");
      }
    }

    // else if (currentUser_type === "talent" && currentUserId) {
    //   setMessage("You need to sign Up as Brand to find talents");
    //   setOpenPopUp(true);
    //   setTimeout(function() {
    //     setOpenPopUp(false);
    //     navigate("/brand-firstGig");
    //   }, 3000);
    // }
  };

  useEffect(() => {
    if (onData === "talent-signup") {
      setTalent(true);
      openModal();
    }
  }, [onData]);

  const createHandleMenuClick = (menuItem) => {
    return () => {
      if (menuItem === "dashboard") {
        // alert("createHandleMenuClick");
        if (currentUser_type === "talent") {
          // navigate("/talent", { state: { talentData: talentData } });
          // alert("navigatetotalentprofile");

          navigate(`/talent/${talentData.publicUrl}`, {
            state: { talentData },
          });
        } else if (currentUser_type === "brand") {
          navigate(`/brand/${brandData?.publicUrl.replace(/\s+/g, "")}`);
        }
      }
      if (menuItem === "edit") {
        if (currentUser_type === "talent") {
          // alert("navigate to edittalent");
          navigate(`${"/edit-talent-profile"}?${currentUserId}`);
        } else if (currentUser_type === "brand") {
          navigate(`/edit-brand-profile`);
          // alert("navigate to edit brand");
        }
      }
    };
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (query === "talents") {
      navigate.push("/talents");
    } else if (query === "projects") {
      navigate.push("/");
    } else {
      navigate.push(`/search?query=${query}`);
    }
  };

  const handleCoffeeLink = () => {
    window.open("https://buymeacoffee.com/brandsandtalent", "_blank");
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const searchModalStyle = {
    position: "absolute",
    top: "10%", // Adjust this value to move the modal further up or down
    left: "50%",
    transform: "translate(-50%, 0%)", // Remove the vertical centering transform
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLabelClick = (route) => {
    if (route === "/find-creators") {
      if (!currentUserId || currentUser_type != "brand") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/talent") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/pricing") {
      navigate(route);
    } else if (route === "/resources") {
      navigate(route);
    } else if (route === "/signup") {
      navigate(route);
    } else if (route === "/about-us") {
      navigate(route);
    } else if (route === "/community-guidelines") {
      navigate(route);
    } else if (route === "/blogs") {
      navigate(route);
    } else if (route === "/post-job") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/how-it-works") {
      navigate(route);
    } else if (route === "/login") {
      navigate(route);
    } else if (route === "/talent-dashboard") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/brand") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/list-jobs") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/applied-jobs") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/saved-jobs") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/create-jobs") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/find-talents") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/favorite-talents") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();

        //   setMessage("You must be logged in");
        //   setOpenPopUp(true);
        //   setTimeout(function() {
        //     setOpenPopUp(false);
        //     navigate("/login");
        //   }, 1000);
        // } else {
        //   navigate(route);
      }
    } else if (route === "/brand-help") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/applicants") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/edit-talent-profile") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/edit-brand-profile") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/talent-notification") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/talent-settings") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/brand-settings") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/talent-home") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/talent-help") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/brand-notification") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/get-booked") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    }
    if (route == "/talent-signup") {
      handleClose();
      handleRegister();
    }
    if (route == "/brand-firstGig") {
      navigate(route);
    }
  };

  const filteredOptions = Array.from(
    new Set(
      searchPathOptions
        .filter((option) =>
          option.label.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
        .map((option) => option.label)
    )
  ).map((label) => searchPathOptions.find((option) => option.label === label));

  const handleClickBlogs = (step) => {
    //
    // navigate("/blogs", { state: { step: step } });
    window.open("https://brandsandtalent.substack.com/", "_blank");
  };

  useEffect(() => {}, [talentData, brandData]);

  return (
    <>
      <div className="mobile-navbar">
        <div
          className="icon"
          // onClick={() => {
          //   navigate("/");
          // }}
        >
          <img alt="img" className="btLogo" src={mbtLogo}></img>
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
          {!currentUserId && (
            <div
              className="signup mobile-signup"
              onClick={() => handleClick("post-job")}
            >
              Sign up for free
            </div>
          )}
          {/* {!currentUserId && (
            <div
              className="signup mobile-signup"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Sign up for free
            </div>
          )} */}

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
          <div className="navTxt">
            <NavLink to="/" onClick={() => handleClick("")}>
              Home
            </NavLink>
          </div>
          {currentUser_type === "brand" && (
            <div
              className="navTxt"
              style={{ cursor: "pointer" }}
              onClick={() => handleClick("post-job")}
            >
              Post a Job
            </div>
          )}

          {currentUser_type === "talent" && (
            <div className="navTxt">
              <NavLink to="/job-list" onClick={() => handleClick("list-job")}>
                List Job
              </NavLink>
            </div>
          )}

          {currentUser_type === "brand" && (
            <div className="navTxt">
              <NavLink to="/find-creators" onClick={() => handleClick("")}>
                Find Talent
              </NavLink>
            </div>
          )}
          {currentUser_type === "talent" && (
            <div className="navTxt">
              <NavLink to="/find-creators" onClick={() => handleClick("")}>
                Find Talent
              </NavLink>
            </div>
          )}

          <div className="navTxt">
            <NavLink to="/how-it-works" onClick={() => handleClick("")}>
              How It Works
            </NavLink>
          </div>
          {currentUserId != null && (
            <div className="navTxt padRmv">
              <NavLink to="/pricing" onClick={() => handleClick("")}>
                Pricing
              </NavLink>
            </div>
          )}
          <div className="navTxt">
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
                  onClick={() => handleClickBlogs(0)}
                >
                  Newsletter
                </a>
                {/* <ul className="dropdown-menu blogs-menu">
                  <li onClick={() => handleClickBlogs(1)}>
                    <a className="dropdown-item">News & Announcements</a>
                  </li>
                  <li onClick={() => handleClickBlogs(2)}>
                    <a className="dropdown-item">Industry Insights</a>
                  </li>
                  <li onClick={() => handleClickBlogs(3)}>
                    <a className="dropdown-item">Interviews</a>
                  </li>
                  <li onClick={() => handleClickBlogs(4)}>
                    <a className="dropdown-item"> Case Studies</a>
                  </li>
                  <li onClick={() => handleClickBlogs(5)}>
                    <a className="dropdown-item"> Talent Tips & Tricks</a>
                  </li>
                  <li onClick={() => handleClickBlogs(6)}>
                    <a className="dropdown-item"> Brand Tips & Tricks</a>
                  </li>
                </ul> */}
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

          <div
            className="navTxt cofee-link"
            style={{ cursor: "pointer" }}
            onClick={handleCoffeeLink}
          >
            Support BT
            <img src={cofeeIcon} alt="img" className="cofeeIcon-img" />
          </div>
        </div>
        <div className="header-search-wrapper">
          <div className="header-search-icon">
            <i className="fas fa-search"></i>
          </div>
          <div className="header-search-input">
            <input type="text" className="header-search-input-style" />
          </div>
        </div>
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
        <div className="container header-container d-flex align-items-center justify-content-between">
          <div
            className="icon btn-logo"
            onClick={() => {
              navigate("/");
            }}
          >
            <img alt="img" className="btLogo" src={btLogo}></img>
          </div>
          <div className="header-items">
            <div className=" menu-items">
              <div className="navTxt">
                <NavLink to="/" onClick={() => handleClick("")}>
                  Home
                </NavLink>
              </div>

              {currentUser_type === "brand" ||
                (!currentUserId && (
                  <div
                    className="navTxt"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClick("post-job")}
                  >
                    Post a Job
                  </div>
                ))}

              {!currentUserId && (
                <div
                  className="navTxt"
                  onClick={() => handleClick("post-job")}
                  style={{ cursor: "pointer" }}
                >
                  Get Booked
                </div>
              )}

              {currentUserId && currentUser_type == "talent" && (
                <div className="navTxt" style={{ cursor: "pointer" }}>
                  <NavLink
                    to="/talent-dashboard"
                    onClick={() => handleClick("")}
                  >
                    Get Booked
                  </NavLink>
                </div>
              )}

              {/* {currentUser_type === "talent" && (
                <div className="navTxt">
                  <NavLink
                    to="/job-list"
                    onClick={() => handleClick("list-job")}
                  >
                    Jobs List
                  </NavLink>
                </div>
              )} */}

              <div
                className="navTxt"
                style={{ cursor: "pointer" }}
                onClick={() => handleClick("find-talent")}
              >
                Find Talent
              </div>

              {/* <div>
            <NavLink to="/get-booked" onClick={() => handleClick("")}>
              Get Booked
            </NavLink>
          </div> */}
              <div className="navTxt">
                <NavLink to="/how-it-works" onClick={() => handleClick("")}>
                  How It Works
                </NavLink>
              </div>

              {currentUserId != null && (
                <div className="navTxt">
                  <NavLink to="/pricing" onClick={() => handleClick("")}>
                    Pricing
                  </NavLink>
                </div>
              )}

              <div className="navTxt">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
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
                      {/* data-bs-toggle="dropdown" */}
                      {/* className="dropdown-item dropdown-toggle" */}

                      <a
                        className="dropdown-item"
                        dropdown-toggle
                        onClick={() => handleClickBlogs(0)}
                      >
                        Newsletter
                      </a>
                      {/* <ul className="dropdown-menu blogs-menu">
                        <li onClick={() => handleClickBlogs(1)}>
                          <a className="dropdown-item">News & Announcements</a>
                        </li>
                        <li onClick={() => handleClickBlogs(2)}>
                          <a className="dropdown-item">Industry Insights</a>
                        </li>
                        <li onClick={() => handleClickBlogs(3)}>
                          <a className="dropdown-item">Interviews</a>
                        </li>
                        <li onClick={() => handleClickBlogs(4)}>
                          <a className="dropdown-item">Case Studies</a>
                        </li>
                        <li onClick={() => handleClickBlogs(5)}>
                          <a className="dropdown-item">Talent Tips & Tricks</a>
                        </li>
                        <li onClick={() => handleClickBlogs(6)}>
                          <a className="dropdown-item">Brand Tips & Tricks</a>
                        </li>
                      </ul> */}
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
              </div>

              <div
                className="navTxt cofee-link"
                style={{ cursor: "pointer" }}
                onClick={handleCoffeeLink}
              >
                Support BT
                <img src={cofeeIcon} alt="img" className="cofeeIcon-img" />
              </div>
            </div>
            <div className="header-functions">
              <div className="searchBtn">
                <i className="fas fa-search" onClick={handleOpen}></i>
              </div>

              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={searchModalStyle}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      <form className="d-flex" role="search">
                        <input
                          className="form-control me-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        ></input>
                      </form>
                      {searchTerm && (
                        <>
                          <div className="search-path-options">
                            {searchTerm &&
                              filteredOptions.map((option) => (
                                <>
                                  <div
                                    className="search-path-wrapper"
                                    onClick={() =>
                                      handleLabelClick(option.routes)
                                    }
                                  >
                                    <i className="fas fa-search search-path-icon"></i>
                                    <div
                                      className="search-path-labels"
                                      key={option.routes}
                                    >
                                      {option.label}
                                    </div>
                                  </div>
                                </>
                              ))}
                          </div>
                        </>
                      )}
                    </Typography>
                  </Box>
                </Modal>
              </div>

              {!currentUserId && (
                <div className="loginTxt">
                  <NavLink
                    to="/login"
                    className="login-text"
                    onClick={() => handleClick("")}
                  >
                    Log In
                  </NavLink>
                </div>
              )}

              {!currentUserId && (
                <div className="signup" onClick={() => handleClick("post-job")}>
                  Sign up for free
                </div>
              )}
              {/* {!currentUserId && (
                <div
                  className="signup"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Sign up for free
                </div>
              )} */}

              {/* <div className="gridLogo">
                <img src={gridLogo} alt="" /> 
              </div> */}

              {currentUserId && (
                <Dropdown>
                  <MenuButton className="profile-image-header">
                    <div className="talent-profile-icon">
                      {talentData?.image && (
                        <>
                          <img
                            className="talent-profile-icon-img"
                            src={`${API.userFilePath}${talentData?.image?.fileData}`}
                            alt="img"
                          />
                        </>
                      )}
                      {brandData?.brandImage[0] && (
                        <>
                          <img
                            className="talent-profile-icon-img"
                            src={`${API.userFilePath}${brandData?.brandImage[0]?.fileData}`}
                            alt="img"
                          />
                        </>
                      )}
                    </div>
                  </MenuButton>
                  <Menu slots={{ listbox: AnimatedListbox }}>
                    <MenuItem
                      style={{ cursor: "pointer" }}
                      onClick={createHandleMenuClick("dashboard")}
                    >
                      View Profile
                    </MenuItem>
                    <MenuItem
                      style={{ cursor: "pointer" }}
                      onClick={createHandleMenuClick("edit")}
                    >
                      Edit Profile
                    </MenuItem>
                    <MenuItem
                      style={{ cursor: "pointer" }}
                      onClick={() => logout()}
                    >
                      Log out
                    </MenuItem>
                  </Menu>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <NavLink to="/signup"  onClick={() => handleClick("")}></NavLink>            </NavLink> */}

      {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  {currentUserId != null && (
                    <li onClick={() => logout()}>
                      <a className="dropdown-item">Logout</a>
                    </li>
                  )}
                  {currentUserId === null && (
                    <li onClick={() => login()}>
                      <a className="dropdown-item">Login</a>
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
        <div className="modal-dialog modal-dialog-centered modal-lg signupModal">
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
                  I am a Talent
                </div>
                <div
                  onClick={(e) => {
                    userType("brand");
                  }}
                  className={brand ? "selected-register" : "choose-register"}
                >
                  I am a Brand/Client
                </div>
              </div>
              <div className="question-model">
                {talent && "I am a talent/creator/influencer"}
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
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Header;

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E6",
  700: "#0059B3",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${
    theme.palette.mode === "dark" ? grey[900] : grey[200]
  };
  z-index: 1;

  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      "The `AnimatedListbox` component cannot be rendered outside a `Popup` component"
    );
  }

  const verticalPlacement = popupContext.placement.split("-")[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }
  `
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
  }

  &:active {
    background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${
      theme.palette.mode === "dark" ? blue[300] : blue[200]
    };
    outline: none;
  }
  `
);
