import React, { useState, useEffect } from "react";
import "../assets/css/talentHeader.scss";
import { useNavigate } from "react-router";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
const TalentHeader = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const btLogo = require("../assets/icons/Group 56.png");
  const model1 = require("../assets/images/girl1.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [talentId, setTalentId] = useState(null);
  const [talentData, setTalentData] = useState();
  const [notificationList, setNotifications] = useState([]);

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

  useEffect(() => {
    setTalentId(localStorage.getItem("userId"));
    console.log(talentId, "talentId");
    if (talentId) {
      getTalentById();
      getTalentNotification();
    }
  }, [talentId]);

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
    await ApiHelper.post(`${API.getTalentById}${talentId}`)
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

  useEffect(() => {
    console.log(talentData, "talentData");
  }, [talentData]);

  const logout = () => {
    navigate("/");
  };

  const gotomessage = (item) => {
    console.log(item, "gotomessage");
    navigate(`/message?${item?.brandId}`);
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
          <div className="talent-chat-icon">
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
          </div>
          <div
            className="talent-profile-icon dropdown"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={`${API.userFilePath}${talentData?.image?.fileData}`}
              alt=""
            />
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TalentHeader;
