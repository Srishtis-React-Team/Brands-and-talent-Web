import React, { useState, useEffect } from "react";
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
const BrandHeader = ({ toggleMenu }) => {
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
      } else if (menuItem === "logout") {
        localStorage.clear();
        setcurrentUserId(null);
        setMessage("Logged Out SuccessFully");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
          navigate("/");
        }, 1000);
      }
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <>
      <div className="talent-header-main">
        <div className="talent-nav-logo">
          <img
            src={btLogo}
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
          <div className="mydashboard font-styles">My Dashboard</div>
        </div>
        <div className="talent-navbar-functions">
          <div
            className="search-header-icon"
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

          <div className="notification-bell-wrapper">
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
                )}

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
              </div>
            </div>
          </div>

          <div className="chat-icon-header">
            <i className="bi bi-chat-dots"></i>
          </div>

          <Dropdown>
            <MenuButton>
              <div className="talent-profile-icon">
                <img
                  src={`${API.userFilePath}${brandData?.logo[0]?.fileData}`}
                  alt=""
                />
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
                onClick={createHandleMenuClick("logout")}
              >
                Log out
              </MenuItem>
            </Menu>
          </Dropdown>
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
