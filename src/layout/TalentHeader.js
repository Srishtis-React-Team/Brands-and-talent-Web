import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/talentHeader.css";
import { useNavigate } from "react-router";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
import PopUp from "../components/PopUp";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CurrentUser from "../CurrentUser";
import SearchHeaderComponent from "./SearchHeaderComponent";
import { Link, useLocation, useHistory } from "react-router-dom";
import searchPathOptions from "../components/SearchPaths";
const TalentHeader = ({ toggleMenu, myState, from }) => {
  console.log(toggleMenu, "toggleMenu");
  const { currentUserImage, currentUserType, avatarImage } = CurrentUser();
  const [talent, setTalent] = useState(true);
  const [signupCategory, setSignupCategory] = useState("talent");
  const [activeMenu, setActiveMenu] = useState(""); // State to track active menu

  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.png");
  const cofeeIcon = require("../assets/icons/cofeeIcon.png");
  const [brand, setBrand] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [talentId, setTalentId] = useState(null);
  const [talentData, setTalentData] = useState();
  const [notificationList, setNotifications] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [currentUserId, setcurrentUserId] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser_type, setCurrentUserType] = useState("");
  const [brandData, setBrandData] = useState(null);

  const location = useLocation();
  const currentPathname = location.pathname;
  const isTalentProfilePage = /^\/talent\/.+/.test(currentPathname);

  useEffect(() => {
    setTimeout(function () {
      setTalentId(localStorage.getItem("userId"));
    }, 1000);

    if (talentId) {
      getTalentById();
      getTalentNotification();
    }
  }, [talentId]);

  const handleClickBlogs = (step) => {
    window.open("https://brandsandtalent.substack.com/", "_blank");
  };

  useEffect(() => {
    const handleBellIconClick = (event) => {
      if (event.target.closest(".notification_icon")) {
        const dropdown = document.querySelector(".notification-dropdown");
        dropdown.classList.toggle("active");
      }
    };

    const handleCloseIconClick = (event) => {
      if (event.target.closest(".notification-close")) {
        const dropdown = document.querySelector(".notification-dropdown");
        dropdown.classList.remove("active");
      }
    };

    const handleCloseDropdownOutsideClick = (event) => {
      const dropdown = document.querySelector(".notification-dropdown");
      if (
        !event.target.closest(".notification-bell-wrapper") &&
        dropdown?.classList?.contains("active")
      ) {
        dropdown?.classList?.remove("active");
      }
    };
    document.addEventListener("click", handleBellIconClick);
    document.addEventListener("click", handleCloseIconClick);
    document.addEventListener("click", handleCloseDropdownOutsideClick);
    return () => {
      document.removeEventListener("click", handleBellIconClick);
      document.removeEventListener("click", handleCloseIconClick);
      document.removeEventListener("click", handleCloseDropdownOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (myState === true) {
      getTalentById();
    }
  }, [myState]);
  useEffect(() => {
    console.log(activeMenu, "activeMenu");
  }, [activeMenu]);

  const getTalentNotification = async () => {
    await ApiHelper.get(`${API.getTalentNotification}${talentId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          setNotifications(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {}, [notificationList]);

  const handleCoffeeLink = () => {
    window.open("https://buymeacoffee.com/brandsandtalent", "_blank");
  };

  const getTalentById = async () => {
    await ApiHelper.post(
      `${API.getTalentById}${localStorage.getItem("userId")}`
    )
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setTalentData(resData.data.data);
          }
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getSkills();
  }, []);
  useEffect(() => {}, [talentData]);

  const gotomessage = (item) => {
    navigate(`/message?${item?.brandId}`);
  };

  const createHandleMenuClick = (menuItem) => {
    console.log("here is the function");
    return () => {
      if (menuItem === "profile") {
        navigate(`/talent/${talentData.publicUrl}`, {
          state: { talentData },
        });
      } else if (menuItem === "logout") {
        localStorage.clear();
        setcurrentUserId(null);
        setMessage("Logged out Successfully");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/");
        }, 1000);
      } else if (menuItem === "dashboard") {
        navigate(`${"/talent-home"}`);
      } else if (menuItem === "edit") {
        if (talentData?.adminApproved === true) {
          navigate(`${"/edit-talent-profile"}?${talentData?._id}`);
        } else {
          setMessage(
            "After your verification is approved, you can update your profile"
          );
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 2000);
        }
      } else if (menuItem == "find-talent" && talentData?.planName == "Basic") {
        setMessage("Upgrade Pro or Premium Plan to unlock this feature");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/pricing");
        }, 3000);
      } else if (menuItem == "find-talent" && talentData?.planName != "Basic") {
        setActiveMenu(menuItem); // Update the active menu item
        navigate("/find-creators");
      }
    };
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  // const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  // const handleClose = async () => {
  //   let job_name;
  //   let job_location;
  //   let job_age;
  //   let job_full_name;

  //   if (jobNameRef.current) {
  //     job_name = jobNameRef.current.value;
  //   }
  //   if (jobLocationRef.current) {
  //     job_location = jobLocationRef.current.value;
  //   }
  //   if (jobAgeRef.current) {
  //     job_age = jobAgeRef.current.value;
  //   }
  //   if (jobFullNameRef.current) {
  //     job_full_name = jobFullNameRef.current.value;
  //   }

  //   const formData = {
  //     jobTitle: job_name,
  //     jobLocation: job_location,
  //     age: job_age,
  //   };

  //   setIsLoading(true);
  //   await ApiHelper.post(API.searchJobs, formData)
  //     .then((resData) => {
  //       if (resData.data.status === true) {
  //         setMessage("Filtered Successfully");
  //         setOpenPopUp(true);
  //         setTimeout(function () {
  //           setOpenPopUp(false);
  //         }, 1000);
  //       } else if (resData.data.status === false) {
  //         setMessage("No Matching Users Found");
  //         setOpenPopUp(true);
  //         setTimeout(function () {
  //           setOpenPopUp(false);
  //         }, 1000);
  //       }
  //     })
  //     .catch((err) => {});

  //   setOpen(false);
  // };
  const modalRef = useRef(null);
  const openModal = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  const jobNameRef = useRef(null);
  const jobLocationRef = useRef(null);
  const jobAgeRef = useRef(null);
  const jobFullNameRef = useRef(null);

  const jobTypeOptions = [
    "Full-Time",
    "Part-Time",
    "Per Diem",
    "Contractor",
    "Temporary",
    "Other",
  ];

  const getSkills = async () => {
    await ApiHelper.get(API.getSkills)
      .then((resData) => {
        if (resData.data.status === true) {
          setSkillsList(resData.data.data);
        }
      })
      .catch((err) => {});

    setOpen(false);
  };
  const isMobile = window.innerWidth <= 480;

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
        // window.open(
        //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
        //   "_blank"
        // );
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/logi n");
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/pricing") {
      // window.open(
      //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
      //   "_blank"
      // );
      navigate(route);
    } else if (route === "/resources") {
      // navigate(route);
      navigate("/about-us");
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
        // window.open(
        //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
        //   "_blank"
        // );
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
      // window.open(
      //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
      //   "_blank"
      // );
    } else if (route === "/talent-dashboard") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();

        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/find-talents") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();
        // window.open(
        //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
        //   "_blank"
        // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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
          // window.open(
          //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
          //   "_blank"
          // );
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

  const conditionalNavigate = () => {
    // window.open(
    //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
    //   "_blank"
    // );
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

  useEffect(() => {}, [talentData, brandData]);
  const isLoginPage = location.pathname.includes("/login");

  return (
    <>
      <div className="headerDashboard dashHeader">
        <div className="container-fluid">
          <div className="talent-header-main">
            <div className="leftPart">
              <div className="talent-nav-logo">
                <img
                  className="btLogo"
                  src={btLogo}
                  alt=""
                  onClick={() => {
                    navigate("/");
                  }}
                />
              </div>
              {from != "message" && (
                <>
                  <div className="talent-menu" onClick={toggleMenu}>
                    <div className="telent-menubar">
                      <i className="fa-solid fa-bars"></i>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="rightPart">
              <div className="talent-navbar-functions">
                <div
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}
                  className="menu-icon"
                >
                  <i className="fa-solid fa-bars"></i>
                </div>

                <div className={menuOpen ? "mobile-nav-content" : "hide-nav"}>
                  <div className="navTxt">
                    <NavLink to="/">Home</NavLink>
                  </div>
                  <div className="navTxt">
                    <NavLink to="/talent-dashboard"> Get Booked</NavLink>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    className={`navTxt ${
                      activeMenu === "find-talent" ? "active" : ""
                    }`} // Apply active class conditionally
                    onClick={() => createHandleMenuClick("find-talent")()}
                  >
                    Find Talent
                  </div>
                  <div className="navTxt">
                    <NavLink to="/how-it-works">How it works</NavLink>
                  </div>
                  <div className="navTxt">
                    <NavLink to="/pricing">Pricing</NavLink>
                  </div>
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
                          <NavLink to="/about-us">
                            <a className="dropdown-item">About</a>
                          </NavLink>
                        </li>
                        <li className="dropend">
                          <a
                            className="dropdown-item"
                            dropdown-toggle
                            onClick={() => handleClickBlogs(0)}
                          >
                            Newsletter
                          </a>
                          {/* <ul className="dropdown-menu blogs-menu">
                            <li onClick={() => handleClickBlogs(1)}>
                              <a className="dropdown-item">
                                News & Announcements
                              </a>
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
                              <a className="dropdown-item">
                                Talent Tips & Tricks
                              </a>
                            </li>
                            <li onClick={() => handleClickBlogs(6)}>
                              <a className="dropdown-item">
                                Brand Tips & Tricks
                              </a>
                            </li>
                          </ul> */}
                        </li>

                        <li>
                          <a className="dropdown-item">
                            <NavLink to="/community-guidelines">
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
                    <img src={cofeeIcon} alt="" className="cofeeIcon-img" />
                  </div>

                  <>
                    {isMobile ? (
                      <>
                        <div className="navTxt">
                          <NavLink to="/talent-home">Dashboard</NavLink>
                        </div>

                        <div className="navTxt">
                          <NavLink to="/talent-dashboard">Browse Jobs</NavLink>
                        </div>

                        <div className="navTxt">
                          <NavLink to="/talent-notification">
                            Notification
                          </NavLink>
                        </div>

                        <div className="navTxt">
                          <NavLink to="/message">Messages</NavLink>
                        </div>

                        <div className="navTxt">
                          <NavLink to="/edit-talent-profile">
                            Edit Profile
                          </NavLink>
                        </div>

                        <div className="navTxt">
                          <NavLink to="/saved-jobs">Saved Jobs</NavLink>
                        </div>
                        <div className="navTxt">
                          <NavLink to="/applied-jobs">Applied Jobs</NavLink>
                        </div>

                        <div className="navTxt">
                          <NavLink to="/talent-settings">Settings</NavLink>
                        </div>
                        {/* <div className="navTxt">
                          <NavLink to="/pricing">Pricing</NavLink>
                        </div> */}
                      </>
                    ) : (
                      <></>
                    )}
                  </>

                  {/* <Link
            to="/message"
            className={
              location.pathname === "/message"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-chat-dots icons"></i>
            <div className="brand-menu-text">Messages</div>
          </Link> */}

                  <React.Fragment>
                    <div className="header-search-wrapper">
                      <SearchHeaderComponent />
                    </div>
                  </React.Fragment>
                  <div className="mobile-search">
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
                  </div>
                </div>
                {/* <div
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
                      </div> */}

                {/* <div className="notification-bell-wrapper">
                        <div className="notification_wrap">
                          <div className="notification_icon ">
                            <i className="bi bi-bell"></i>
                          </div>
                          <div className="notification-dropdown">
                            <div className=" notification-header">
                              <div className="notification-message-text">Notifications</div>
                              <div>
                                <i className="fas fa-close notification-close"></i>
                              </div>
                            </div>
                            {notificationList &&
                              notificationList.length > 0 &&
                              notificationList.map((item, index) => (
                                <div
                                  className="notify_item"
                                  key={index}
                                  onClick={(e) => {
                                    gotomessage(item);
                                  }}
                                >
                                  <div className="notify_img">
                                    {item?.talentDetails?.image &&
                                      item.talentDetails.image[0]?.fileData && (
                                        <img
                                          className="notification-user-image"
                                          src={`${API.userFilePath}${item.talentDetails?.image[0]?.fileData}`}
                                          alt="profile_pic"
                                        />
                                      )}
                                  </div>
                                  <div className="notify_info">
                                    <p>You Applied for {item?.gigDetails?.jobTitle}</p>
                                    <span className="notify_time">Just now</span>
                                  </div>
                                </div>
                              ))}

                            {notificationList.length === 0 && (
                              <>
                                <div className="notify_item">
                                  No Notifications Available
                                </div>
                              </>
                            )} */}

                {/* <div className="notify_item">
                              <div className="notify_img">
                                <img
                                  className="notification-user-image"
                                  src={model1}
                                  alt="profile_pic"
                                ></img>
                              </div>
                              <div className="notify_info">
                                <p>Alex Send a message</p>
                                <span className="notify_time">55 minutes ago</span>
                              </div>
                            </div>
                            <div className="notify_item">
                              <div className="notify_img">
                                <img
                                  className="notification-user-image"
                                  src={model1}
                                  alt="profile_pic"
                                ></img>
                              </div>
                              <div className="notify_info">
                                <p>Alex Send a message</p>
                                <span className="notify_time">2 hours ago</span>
                              </div>
                            </div>
                            <div className="notify_item">
                              <div className="notify_img">
                                <img
                                  className="notification-user-image"
                                  src={model1}
                                  alt="profile_pic"
                                ></img>
                              </div>
                              <div className="notify_info">
                                <p>Alex Send a message</p>
                                <span className="notify_time">6 hours ago</span>
                              </div>
                            </div> */}
                {/* </div>
                        </div>
                      </div> */}

                {/* <div className="talent-chat-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chat"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                          </svg>
                        </div> */}

                <Dropdown>
                  <MenuButton>
                    <div className="talent-profile-icon">
                      {!talentData?.image && <img src={avatarImage} alt="" />}
                      {talentData?.image && (
                        <img
                          src={`${API.userFilePath}${talentData?.image?.fileData}`}
                          alt=""
                        />
                      )}
                    </div>
                  </MenuButton>
                  <Menu slots={{ listbox: AnimatedListbox }}>
                    {isTalentProfilePage === false && (
                      <MenuItem
                        style={{ cursor: "pointer" }}
                        onClick={() => createHandleMenuClick("profile")()}
                      >
                        View Profile
                      </MenuItem>
                    )}
                    {isTalentProfilePage === true && (
                      <MenuItem
                        style={{ cursor: "pointer" }}
                        onClick={() => createHandleMenuClick("dashboard")()}
                      >
                        Dashboard
                      </MenuItem>
                    )}
                    <MenuItem
                      style={{ cursor: "pointer" }}
                      onClick={() => createHandleMenuClick("edit")()}
                    >
                      Edit Profile
                    </MenuItem>
                    <MenuItem
                      style={{ cursor: "pointer" }}
                      onClick={() => createHandleMenuClick("logout")()}
                    >
                      Log out
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default TalentHeader;

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
  z-index: 9999999999999999999;

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
