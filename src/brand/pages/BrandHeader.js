import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/talentHeader.css";
import { useNavigate } from "react-router";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
import PopUp from "../../components/PopUp";
import SearchHeaderComponent from "../../layout/SearchHeaderComponent";
import CurrentUser from "../../CurrentUser";
import { useLocation } from "react-router-dom";

const BrandHeader = ({ toggleMenu, myState, from }) => {
  const { currentUserType, avatarImage } = CurrentUser();
  const navigate = useNavigate();
  const btLogo = require("../../assets/images/LOGO.jpeg");
  const cofeeIcon = require("../../assets/icons/cofeeIcon.png");
  const [activeMenu, setActiveMenu] = useState(""); // State to track active menu

  const [menuOpen, setMenuOpen] = useState(false);
  const [brandId, setBrandId] = useState(null);
  const [notificationList, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState([]);
  const [brandData, setBrandData] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUserId, setcurrentUserId] = useState(null);
  const sliderIcon = require("../../assets/icons/sliders.png");

  // useEffect(() => {
  //   const handleBellIconClick = (event) => {
  //     if (event.target.closest(".notification_icon")) {
  //       const dropdown = document.querySelector(".notification-dropdown");
  //       dropdown.classList.toggle("active");
  //     }
  //   };
  //   const handleCloseIconClick = (event) => {
  //     if (event.target.closest(".notification-close")) {
  //       const dropdown = document.querySelector(".notification-dropdown");
  //       dropdown.classList.remove("active");
  //     }
  //   };
  //   const handleCloseDropdownOutsideClick = (event) => {
  //     const dropdown = document.querySelector(".notification-dropdown");
  //     if (
  //       !event.target.closest(".notification-bell-wrapper") &&
  //       dropdown?.classList?.contains("active")
  //     ) {
  //       dropdown?.classList?.remove("active");
  //     }
  //   };

  //   document.addEventListener("click", handleBellIconClick);
  //   document.addEventListener("click", handleCloseIconClick);
  //   document.addEventListener("click", handleCloseDropdownOutsideClick);
  //   return () => {
  //     document.removeEventListener("click", handleBellIconClick);
  //     document.removeEventListener("click", handleCloseIconClick);
  //     document.removeEventListener("click", handleCloseDropdownOutsideClick);
  //   };
  // }, []);

  const logout = () => {
    navigate("/");
  };

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

  const location = useLocation();

  useEffect(() => {
    // Extract the last part of the URL (i.e., 'peter')
    const pathParts = location.pathname.split("/");
    const name = pathParts[pathParts.length - 1];
    getDataByPublicUrl(name);
  }, [location]);

  const getDataByPublicUrl = async (name) => {
    const formData = {
      publicUrl: name,
      userId: localStorage.getItem("brandId"),
    };
    await ApiHelper.post(`${API.getDataByPublicUrl}`, formData)
      .then((resData) => {
        // setUrlTalentData(resData?.data?.data);
        // checkUser(resData?.data?.data?._id, resData?.data?.data);
        if (resData?.data?.data) {
          setBrandData(resData?.data?.data);
        } else {
          getBrand();
        }
      })
      .catch((err) => {});
  };

  const gotomessage = (item) => {
    navigate(`/messages?${item?.talentId}`);
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
  }, [localStorage.getItem("brandId")]);
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
    }
  }, [notificationList]);

  const createHandleMenuClick = (menuItem) => {
    return () => {
      if (menuItem === "profile") {
        navigate(`/client/${brandData?.publicUrl?.replace(/\s+/g, "")}`);
      } else if (menuItem === "logout") {
        localStorage.clear();
        setcurrentUserId(null);
        setMessage("Logged out Successfully");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/");
        }, 1000);
      } else if (menuItem == "edit") {
        navigate("/edit-brand-profile");
      }
    };
  };

  const handleClickBlogs = (step) => {
    window.open("https://brandsandtalent.substack.com/", "_blank");
  };

  useEffect(() => {
    if (myState === true) {
      getBrand();
    }
  }, [myState]);

  const handleCoffeeLink = () => {
    window.open("https://buymeacoffee.com/brandsandtalent", "_blank");
  };

  const conditionalNavigate = () => {};

  const isActive = location.pathname.includes("/find-talent");

  const handleNavigationClick = () => {
    // if (brandData?.planName === "Pro" || brandData?.planName === "Premium") {
    //   setMessage("Upgrade Pro or Premium Plan to unlock this feature");
    //   setOpenPopUp(true);
    //   setTimeout(function () {
    //     setOpenPopUp(false);
    //     navigate("/pricing");
    //   }, 3000);
    // } else {
      navigate("/find-talent");
   // }
  };

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
                {from != "message" && (
                  <>
                    <div
                      onClick={() => {
                        setMenuOpen(!menuOpen);
                      }}
                      className="menu-icon"
                    >
                      <i className="fa-solid fa-bars"></i>
                    </div>
                  </>
                )}

                <div className={menuOpen ? "mobile-nav-content" : "hide-nav"}>
                  <nav className="menu-items">
                    <div className="navTxt">
                      <NavLink to="/">Home</NavLink>
                    </div>
                    <div className="navTxt">
                      <NavLink to="/create-jobs">Post a Job</NavLink>
                    </div>
                    <div className="brand-mobile-menu">
                      <div className="navTxt">
                        <NavLink to="/find-talent">Invite To Apply</NavLink>
                      </div>
                      <div className="navTxt">
                        <NavLink to="/my-jobs">My Jobs</NavLink>
                      </div>
                      <div className="navTxt">
                        <NavLink to="/applicants">Applicants</NavLink>
                      </div>
                      <div className="navTxt">
                        <NavLink to="/favourite-talents">
                          Favourite Talents
                        </NavLink>
                      </div>
                      <div className="navTxt">
                        <NavLink to="/brand-notification">Notification</NavLink>
                      </div>
                      <div className="navTxt">
                        <NavLink to="/messages">Messages</NavLink>
                      </div>
                      <div className="navTxt">
                        <NavLink to="/edit-brand-profile">Edit Profile</NavLink>
                      </div>
                      <div className="navTxt">
                        <NavLink to="/brand-settings">Settings</NavLink>
                      </div>
                    </div>

                    <div
                      style={{ cursor: "pointer" }}
                      className={`navTxt ${isActive ? "active" : ""}`}
                      onClick={() => handleNavigationClick()}
                    >
                      Find Talent
                    </div>

                    <div className="navTxt">
                      <NavLink to="/how-it-works">How it works</NavLink>
                    </div>
                    {brandId && (
                      <>
                        <div className="navTxt">
                          <NavLink to="/pricing">Pricing</NavLink>
                        </div>
                      </>
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
                            <NavLink to="/about-us">
                              <a className="dropdown-item">About</a>
                            </NavLink>
                          </li>
                          <li className="dropend">
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
                                <a className="dropdown-item">
                                  News & Announcements
                                </a>
                              </li>
                              <li onClick={() => handleClickBlogs(2)}>
                                <a className="dropdown-item">
                                  Industry Insights
                                </a>
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
                  </nav>
                  <React.Fragment>
                    <div className="header-search-wrapper">
                      <SearchHeaderComponent />
                    </div>
                  </React.Fragment>
                </div>

                <Dropdown>
                  <MenuButton>
                    <div className="talent-profile-icon">
                      {!Array.isArray(brandData?.brandImage) ||
                      brandData?.brandImage.length === 0 ? (
                        <img src={avatarImage} alt="" />
                      ) : (
                        <img
                          src={`${API.userFilePath}${brandData?.brandImage[0]?.fileData}`}
                          alt=""
                        />
                      )}
                    </div>
                  </MenuButton>
                  <Menu slots={{ listbox: AnimatedListbox }}>
                    <MenuItem
                      style={{ cursor: "pointer" }}
                      onClick={() => createHandleMenuClick("profile")()}
                    >
                      View profile
                    </MenuItem>
                    <MenuItem
                      style={{ cursor: "pointer" }}
                      onClick={() => createHandleMenuClick("edit")()}
                    >
                      Edit profile
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
