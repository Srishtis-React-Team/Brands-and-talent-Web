import React, { useEffect, useState, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript
import PopUp from "../components/PopUp.js";
import "../assets/css/talent-dashboard.scss";
import TalentSideMenu from "../layout/TalentSideMenu.js";
import { useLocation } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

const TalentNotification = () => {
  const [talentId, setTalentId] = useState(null);
  const [notificationList, setNotifications] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(function() {
      setTalentId(localStorage.getItem("userId"));
    }, 1000);

    console.log(talentId, "talentId");
    if (talentId) {
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
  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const viewNotification = async (item) => {
    const formData = {
      notificationId: item?._id,
    };
    await ApiHelper.post(`${API.readNotification}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          getTalentNotification();
        }
      })
      .catch((err) => {});
    navigate("/preview-job-talent", {
      state: {
        jobId: item?.gigId,
      },
    });
  };

  const deleteNotification = async (item) => {
    const formData = {
      notificationId: item?._id,
    };
    await ApiHelper.post(`${API.deleteNotification}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          getTalentNotification();
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    console.log(notificationList, "notificationListMain");
  }, [notificationList]);

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "not-sidebar"
        }`}
      >
        <TalentSideMenu />
      </div>

      <main
        style={notificationList?.length === 0 ? { height: "100vh" } : {}}
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div className="brand-content-main">
          <div className="create-job-title">Notification</div>
          <div className="talent-notification-main">
            {notificationList && notificationList?.length > 0 && (
              <>
                {notificationList?.map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className={`talent-notification-card ${
                          item.read
                            ? "notification-read"
                            : "notification-unread"
                        }`}
                      >
                        <div className="notification-card-flex">
                          <img
                            className="notification-card-image"
                            src={`${API.userFilePath}${item?.brandDetails?.brandImage[0]?.fileData}`}
                            alt=""
                          />
                          <div
                            className="notification-card-content "
                            onClick={() => {
                              viewNotification(item);
                            }}
                          >
                            {item?.talentNotificationMessage}&nbsp;
                            {item?.gigDetails?.jobTitle}
                          </div>
                        </div>

                        <div className="notification-card-actions">
                          <div className="notification-card-time">
                            {formatDistanceToNow(parseISO(item.updatedAt), {
                              addSuffix: true,
                            })}
                          </div>
                          <i
                            className="bi bi-three-dots "
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          ></i>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton1"
                          >
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={() => {
                                  deleteNotification(item);
                                }}
                              >
                                Remove Notification
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </main>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default TalentNotification;
