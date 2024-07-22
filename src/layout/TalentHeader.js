import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/talentHeader.scss";
import { useNavigate } from "react-router";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu, MenuListboxSlotProps } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
import PopUp from "../components/PopUp";
import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "react-select";
import CurrentUser from "../CurrentUser";
import SearchHeaderComponent from "./SearchHeaderComponent";
import { useLocation } from "react-router-dom";

const TalentHeader = ({ toggleMenu, myState, hideToggleButton }) => {
  const { currentUserImage, currentUserType, avatarImage } = CurrentUser();
  console.log(hideToggleButton, "hideToggleButton");

  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.jpg");
  const model1 = require("../assets/images/girl1.png");
  const sliderIcon = require("../assets/icons/sliders.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [talentId, setTalentId] = useState(null);
  const [talentData, setTalentData] = useState();
  const [notificationList, setNotifications] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [currentUserId, setcurrentUserId] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [jobName, setJobName] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [age, setAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const currentPathname = window.location.pathname;
  const location = useLocation();
  const currentPathname = location.pathname;
  const isTalentProfilePage = /^\/talent\/.+/.test(currentPathname);
  console.log(isTalentProfilePage, "isTalentProfilePage");

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "50px", // Reset the minHeight to avoid clipping
    }),
    menu: (provided, state) => ({
      ...provided,
      maxHeight: "500px", // Adjust the maxHeight as per your requirement
      zIndex: 9999, // Ensure menu appears above other elements
    }),
  };

  useEffect(() => {
    setTimeout(function() {
      setTalentId(localStorage.getItem("userId"));
    }, 1000);
    console.log(talentId, "talentId");
    if (talentId) {
      getTalentById();
      getTalentNotification();
    }
  }, [talentId]);

  const handleClickBlogs = (step) => {
    navigate("/blogs", { state: { step: step } });
  };

  useEffect(() => {
    // Function to toggle dropdown when clicking the bell icon
    const handleBellIconClick = (event) => {
      if (event.target.closest(".notification_icon")) {
        const dropdown = document.querySelector(".notification-dropdown");
        dropdown.classList.toggle("active");
      }
    };

    // Function to close dropdown when clicking the close icon
    const handleCloseIconClick = (event) => {
      if (event.target.closest(".notification-close")) {
        const dropdown = document.querySelector(".notification-dropdown");
        dropdown.classList.remove("active");
      }
    };

    // Function to close dropdown when clicking outside of it
    const handleCloseDropdownOutsideClick = (event) => {
      const dropdown = document.querySelector(".notification-dropdown");
      if (
        !event.target.closest(".notification-bell-wrapper") &&
        dropdown?.classList?.contains("active")
      ) {
        dropdown?.classList?.remove("active");
      }
    };

    // Attach event listeners when the component mounts
    document.addEventListener("click", handleBellIconClick);
    document.addEventListener("click", handleCloseIconClick);
    document.addEventListener("click", handleCloseDropdownOutsideClick);

    // Clean up event listeners when the component unmounts
    return () => {
      document.removeEventListener("click", handleBellIconClick);
      document.removeEventListener("click", handleCloseIconClick);
      document.removeEventListener("click", handleCloseDropdownOutsideClick);
    };
  }, []);

  console.log(myState, "myState");

  useEffect(() => {
    if (myState === true) {
      getTalentById();
    }
  }, [myState]);

  const getTalentNotification = async () => {
    await ApiHelper.get(`${API.getTalentNotification}${talentId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          setNotifications(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    console.log(notificationList, "notificationList");
  }, [notificationList]);

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
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSkills();
  }, []);
  useEffect(() => {
    console.log(talentData, "talentData");
  }, [talentData]);

  const gotomessage = (item) => {
    console.log(item, "gotomessage");
    navigate(`/message?${item?.brandId}`);
  };

  const createHandleMenuClick = (menuItem) => {
    return () => {
      if (menuItem === "profile") {
        navigate(`/talent/${talentData.publicUrl}`, {
          state: { talentData },
        });
        // navigate("/talent", { state: { talentData: talentData } });
      } else if (menuItem === "logout") {
        localStorage.clear();
        setcurrentUserId(null);
        setMessage("Logged Out SuccessFully");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
          navigate("/");
        }, 1000);
      } else if (menuItem === "dashboard") {
        // navigate(`${"/talent-dashboard"}?${talentData?._id}`);
        navigate(`${"/talent-home"}`);
      } else if (menuItem === "edit") {
        navigate(`${"/edit-talent-profile"}?${talentData?._id}`);
      }
      if (menuItem == "find-talent" && talentData?.planName == "Basic") {
        setMessage("Purchase Pro or Premium Plan to unlock this feature");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
          navigate("/pricing");
        }, 3000);
      } else if (menuItem == "find-talent" && talentData?.planName != "Basic") {
        navigate("/find-creators");
      }
      console.log(`Clicked on ${menuItem}`);
    };

    // if (menuItem == "find-talent") {
    //   setMessage("You need to sign Up as Brand to find talents");
    //   setOpenPopUp(true);
    //   setTimeout(function() {
    //     setOpenPopUp(false);
    //     navigate("/brand-firstGig");
    //   }, 3000);
    // }
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    let job_name;
    let job_location;
    let job_age;
    let job_full_name;

    if (jobNameRef.current) {
      job_name = jobNameRef.current.value;
    }
    if (jobLocationRef.current) {
      job_location = jobLocationRef.current.value;
    }
    if (jobAgeRef.current) {
      job_age = jobAgeRef.current.value;
    }
    if (jobFullNameRef.current) {
      job_full_name = jobFullNameRef.current.value;
    }

    const formData = {
      jobTitle: job_name,
      jobLocation: job_location,
      age: job_age,
    };
    console.log(formData, "formData talentFilterData");
    setIsLoading(true);
    await ApiHelper.post(API.searchJobs, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Filtered SuccessFully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("No Matching Users Found");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
  };

  // Ref to store the input element
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

  const [jobType, setjobType] = useState("");

  const selectSkills = (event) => {};

  // Function to handle getting the input value
  const selectjobType = (event) => {
    setjobType(event.target.value);
  };

  const getSkills = async () => {
    await ApiHelper.get(API.getSkills)
      .then((resData) => {
        if (resData.data.status === true) {
          setSkillsList(resData.data.data);
          console.log(resData.data.data, "getSkills");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
  };
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
              {!hideToggleButton && (
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
                    // sendMessageToParent({ menuStatus: menuOpen });
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
                    className="navTxt"
                    style={{ cursor: "pointer" }}
                    onClick={createHandleMenuClick("find-talent")}
                  >
                    Find Talent
                  </div>
                  {/* <div className="navTxt">
                    <NavLink to="/job-list">Jobs List</NavLink>
                  </div> */}
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
                            className="dropdown-item dropdown-toggle"
                            dropdown-toggle
                            data-bs-toggle="dropdown"
                          >
                            <NavLink onClick={() => handleClickBlogs(0)}>
                              Blog
                            </NavLink>
                          </a>
                          <ul className="dropdown-menu blogs-menu">
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
                          </ul>
                        </li>
                        <li>
                          <hr className="dropdown-divider"></hr>
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

                  <React.Fragment>
                    <div className="header-search-wrapper">
                      <SearchHeaderComponent />
                    </div>
                    {/* <div className="header-search-wrapper">
                      <div className="header-search-icon">
                        <i className="fas fa-search"></i>
                      </div>
                      <div className="header-search-input">
                        <input
                          type="text"
                          className="header-search-input-style"
                        />
                      </div>
                      <div
                        className="header-filter-icon"
                        onClick={handleClickOpen}
                      >
                        <img className="filter-icon" src={sliderIcon} alt="" />
                      </div>
                    </div> */}
                    {/* <BootstrapDialog
                      onClose={handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={open}
                      PaperProps={{
                        sx: {
                          marginTop: "10vh", // Adjust this value to suit your needs
                          position: "absolute",
                          top: 0,
                          maxHeight: "90vh", // Optional: Limit the height of the dialog
                        },
                      }}
                    >
                      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Filter Jobs
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogContent dividers>
                        <div className="search-filter-section">
                          <div className="search-labels">Keywords</div>
                          <div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Keyword"
                              ref={jobNameRef}
                            ></input>
                          </div>

                          <div className="kids-form-row mt-3">
                            <div className="kids-form-section">
                              <div className="mb-3 ">
                                <label className="form-label">Location</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Location"
                                  ref={jobLocationRef}
                                ></input>
                              </div>
                            </div>
                            <div className="kids-form-section">
                              <div className="mb-3">
                                <label className="form-label">Age</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Age"
                                  ref={jobAgeRef}
                                ></input>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-section">
                            <div className="mb-3">
                              <label className="form-label">Skills</label>
                              <Select
                                isMulti
                                name="colors"
                                options={skillsList}
                                valueField="value"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(value) => selectSkills(value)}
                                styles={customStyles}
                              />
                            </div>
                          </div>
                          <div className="kids-form-row mt-3">
                            <div className="kids-form-section">
                              <div className="mb-3 ">
                                <label className="form-label">Job Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Location"
                                  ref={jobFullNameRef}
                                ></input>
                              </div>
                            </div>
                            <div className="kids-form-section">
                              <div className="mb-3 ">
                                <label className="form-label">Job Type</label>
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  onChange={selectjobType}
                                  value={jobType}
                                  style={{ fontSize: "14px" }}
                                >
                                  <option value="" disabled selected>
                                    Select Job Type
                                  </option>
                                  {jobTypeOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button className="search-popup-btn" onClick={handleClose}>
                          Filter
                        </Button>
                      </DialogActions>
                    </BootstrapDialog> */}
                  </React.Fragment>
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
                        onClick={createHandleMenuClick("profile")}
                      >
                        View Profile
                      </MenuItem>
                    )}
                    {isTalentProfilePage === true && (
                      <MenuItem
                        style={{ cursor: "pointer" }}
                        onClick={createHandleMenuClick("dashboard")}
                      >
                        DashBoard
                      </MenuItem>
                    )}
                    <MenuItem
                      style={{ cursor: "pointer" }}
                      onClick={createHandleMenuClick("edit")}
                    >
                      Edit Profile
                    </MenuItem>
                    <MenuItem
                      style={{ cursor: "pointer" }}
                      onClick={createHandleMenuClick("logout")}
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
