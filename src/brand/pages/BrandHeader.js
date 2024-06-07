import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/talentHeader.scss";
import { useNavigate } from "react-router";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu, MenuListboxSlotProps } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
import PopUp from "../../components/PopUp";
import SearchHeaderComponent from "../../layout/SearchHeaderComponent";
import CurrentUser from "../../CurrentUser";
const BrandHeader = ({ toggleMenu, myState }) => {
  const { currentUserType, avatarImage } = CurrentUser();

  const navigate = useNavigate();
  const btLogo = require("../../assets/icons/Group 56.png");
  const model1 = require("../../assets/images/girl1.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandId, setBrandId] = useState(null);
  const [notificationList, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState([]);
  const [brandData, setBrandData] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUserId, setcurrentUserId] = useState(null);
  const sliderIcon = require("../../assets/icons/sliders.png");

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

  const closeNotification = () => {
    // var dropdown = document.querySelector(".notification-dropdown");
    // dropdown.classList.toggle("active");
  };

  const logout = () => {
    navigate("/");
  };

  console.log(myState, "myState");

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(brandData, "brandData");
  }, [brandData]);

  const gotomessage = (item) => {
    console.log(item, "gotomessage");
    navigate(`/message?${item?.talentId}`);
  };

  const getBrandNotification = async () => {
    await ApiHelper.get(`${API.getBrandNotification}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          setNotifications(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const getCountNotification = async () => {
    const formData = {
      userId: brandId,
    };
    await ApiHelper.post(API.getCountNotification, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setNotificationCount(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
    if (brandId) {
      getBrand();
      getBrandNotification();
      getCountNotification();
    }
  }, [brandId]);

  useEffect(() => {
    if (notificationList) {
      console.log(notificationList, "notificationList");
    }
  }, [notificationList]);

  const createHandleMenuClick = (menuItem) => {
    return () => {
      if (menuItem === "profile") {
        navigate("/brand-dashboard");
      } else if (menuItem === "logout") {
        localStorage.clear();
        setcurrentUserId(null);
        setMessage("Logged Out SuccessFully");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
          navigate("/");
        }, 1000);
      } else if (menuItem == "edit") {
        navigate("/edit-brand-profile");
      }
      console.log(`Clicked on ${menuItem}`);
    };
  };

  useEffect(() => {
    if (myState === true) {
      getBrand();
      // alert("getBrandHeader");
    }
  }, [myState]);

  return (
    <>
      <div className="headerDashboard dashHeader">
        <div className="container-fluid">
          <div className="talent-header-main">
            <div className="leftPart">
              <div className="talent-nav-logo">
                <img
                  src={btLogo}
                  className="btLogo"
                  alt=""
                  onClick={() => {
                    navigate("/");
                  }}
                />
              </div>
              <div className="talent-menu" onClick={toggleMenu}>
                <div className="telent-menubar">
                  <i className="fa-solid fa-bars"></i>
                </div>
                {/* <div className="mydashboard font-styles">My Dashboard</div> */}
              </div>
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
                  <nav className="menu-items">
                    <div className="navTxt">
                      <NavLink to="/">Home</NavLink>
                    </div>
                    <div className="navTxt">
                      <NavLink to="/create-jobs">Post a Job</NavLink>
                    </div>
                    <div className="navTxt">
                      <NavLink to="/find-talents">Find Talent</NavLink>
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
                              className="dropdown-item dropdown-toggle"
                              dropdown-toggle
                              data-bs-toggle="dropdown"
                            >
                              <NavLink to="/blogs">Blogs</NavLink>
                            </a>
                            <ul className="dropdown-menu blogs-menu">
                              <li>
                                <a href="" className="dropdown-item">
                                  <NavLink to="/blogs">
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
                              <NavLink to="/community-guidelines">
                                Community Guidelines
                              </NavLink>
                            </a>
                          </li>
                        </ul>
                      </li>
                    </div>
                  </nav>
                  <React.Fragment>
                    <div className="header-search-wrapper">
                      <SearchHeaderComponent />

                      {/* <div className="header-search-icon">
                        <i className="fas fa-search"></i>
                      </div>
                      <div className="header-search-input">
                        <input
                          type="text"
                          className="header-search-input-style"
                        />
                      </div>
                      <div className="header-filter-icon">
                        <img className="filter-icon" src={sliderIcon} alt="" />
                      </div> */}
                    </div>
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
                                    src={`${API.userFilePath}${item.talentDetails.image[0].fileData}`}
                                    alt="profile_pic"
                                  />
                                )}
                            </div>
                            <div className="notify_info">
                              <p>
                                {item?.talentDetails?.preferredChildFirstname} Applied
                                for {item?.gigDetails?.jobTitle}
                              </p>
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
                </div>

                <div className="chat-icon-header">
                  <i className="bi bi-chat-dots"></i>
                </div> */}

                <Dropdown>
                  <MenuButton>
                    <div className="talent-profile-icon">
                      {!brandData?.brandImage[0] && (
                        <img src={avatarImage} alt="" />
                      )}
                      {brandData?.brandImage[0] && (
                        <img
                          src={`${API.userFilePath}${brandData?.brandImage[0]?.fileData}`}
                          alt=""
                        />
                      )}
                    </div>
                  </MenuButton>
                  <Menu slots={{ listbox: AnimatedListbox }}>
                    {/* <MenuItem
                      style={{ cursor: "pointer" }}
                      onClick={createHandleMenuClick("profile")}
                    >
                      Profile
                    </MenuItem> */}
                    <MenuItem
                      style={{ cursor: "pointer" }}
                      onClick={createHandleMenuClick("profile")}
                    >
                      View profile
                    </MenuItem>
                    <MenuItem
                      style={{ cursor: "pointer" }}
                      onClick={createHandleMenuClick("edit")}
                    >
                      Edit profile
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

export default BrandHeader;

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
