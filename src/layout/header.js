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
  const [currentUser_image, setCurrentUserImage] = useState("");
  const [currentUser_type, setCurrentUserType] = useState("");
  const [talentData, setTalentData] = useState();
  const [talentId, setTalentId] = useState(null);

  useEffect(() => {
    setcurrentUserId(localStorage.getItem("currentUser"));
    setCurrentUserImage(localStorage.getItem("currentUserImage"));
    setCurrentUserType(localStorage.getItem("currentUserType"));
    console.log(currentUserId, "currentUserId header");
  }, [currentUserId]);
  useEffect(() => {
    console.log(currentUser_type, "currentUser_type header");
  }, [currentUser_type]);

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
    setTimeout(function() {
      setTalentId(localStorage.getItem("userId"));
    }, 1000);
    console.log(talentId, "talentId");
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
      .catch((err) => {
        console.log(err);
      });
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
        setMessage("You Must Be Logged In");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else if (currentUser_type === "brand" && currentUserId) {
        navigate("/create-jobs");
      }
    }

    if (data == "find-talent") {
      if (!currentUserId) {
        setMessage("You Must Be Logged In");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else if (currentUser_type === "brand" && currentUserId) {
        navigate("/find-creators");
      }
    }
  };

  useEffect(() => {
    console.log(onData, "onData");
    if (onData === "talent-signup") {
      setTalent(true);
      openModal();
    }
  }, [onData]);

  const createHandleMenuClick = (menuItem) => {
    return () => {
      if (menuItem === "dashboard") {
        if (currentUser_type === "talent") {
          navigate("/talent-profile", { state: { talentData: talentData } });
        } else if (currentUser_type === "brand") {
          navigate(`brand-dashboard`);
        }
      }
      if (menuItem === "edit") {
        if (currentUser_type === "talent") {
          navigate(`${"/edit-talent-profile"}?${currentUserId}`);
        } else if (currentUser_type === "brand") {
          navigate(`/`);
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

  return (
    <>
      <div className="mobile-navbar">
        <div
          className="icon"
          // onClick={() => {
          //   navigate("/");
          // }}
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
          {!currentUserId && (
            <div
              className="signup mobile-signup"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Sign up for free
            </div>
          )}

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

          <div className="navTxt">
            <NavLink to="/find-creators" onClick={() => handleClick("")}>
              Find Talent
            </NavLink>
          </div>
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
            <img className="btLogo" src={btLogo}></img>
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
                <div className="navTxt" style={{ cursor: "pointer" }}>
                  <NavLink to="/get-booked" onClick={() => handleClick("")}>
                    Get Booked
                  </NavLink>
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

              {currentUser_type === "brand" ||
                (!currentUserId && (
                  <div
                    className="navTxt"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleClick("find-talent")}
                  >
                    Find Talent
                  </div>
                ))}

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
              </div>
            </div>
            <div className="header-functions">
              <div className="searchBtn">
                <i className="fas fa-search"></i>
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
                <div
                  className="signup"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Sign up for free
                </div>
              )}

              <div className="gridLogo">
                <img src={gridLogo} alt="" />
              </div>

              {currentUserId && (
                <Dropdown>
                  <MenuButton className="profile-image-header">
                    <div className="talent-profile-icon">
                      <img
                        className="talent-profile-icon-img"
                        src={`${API.userFilePath}${currentUser_image}`}
                        alt=""
                      />
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
