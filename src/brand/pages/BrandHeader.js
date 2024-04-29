import React, { useState, useEffect } from "react";
import "../../assets/css/talentHeader.scss";
import { useNavigate } from "react-router";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";
const BrandHeader = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const btLogo = require("../../assets/icons/Group 56.png");
  const model1 = require("../../assets/images/girl1.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [brandId, setBrandId] = useState(null);
  const [notificationList, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState([]);
  const [brandData, setBrandData] = useState(null);

  document.addEventListener("DOMContentLoaded", function() {
    // Toggle dropdown when clicking the bell icon
    document.addEventListener("click", function(event) {
      if (event?.target?.closest(".notification_icon")) {
        var dropdown = document?.querySelector(".notification-dropdown");
        dropdown?.classList?.toggle("active");
      }
    });

    // Close dropdown when clicking the close icon
    document.addEventListener("click", function(event) {
      if (event?.target?.closest(".notification-close")) {
        var dropdown = document?.querySelector(".notification-dropdown");
        dropdown?.classList?.remove("active");
      }
    });

    // Close dropdown when clicking outside of it
    document.addEventListener("click", function(event) {
      var dropdown = document.querySelector(".notification-dropdown");
      if (
        !event?.target?.closest(".notification-bell-wrapper") &&
        dropdown?.classList?.contains("active")
      ) {
        dropdown?.classList?.remove("active");
      }
    });
  });

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

          <div className="talent-profile-icon">
            <img
              src={`${API.userFilePath}${brandData?.logo[0]?.fileData}`}
              alt=""
            />
            {/* 
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a
                  className="dropdown-item"
                  onClick={(e) => {
                    logout();
                  }}
                >
                  Log Out
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandHeader;
