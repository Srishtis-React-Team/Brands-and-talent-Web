import React, { useEffect, useState, useRef } from "react";
import { ApiHelper } from "../../helpers/ApiHelper.js";
import { API } from "../../config/api.js";
import PopUp from "../../components/PopUp.js";
import "../../assets/css/talent-dashboard.css";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import BrandHeader from "./BrandHeader.js";
import BrandSideMenu from "./BrandSideMenu.js";

const BrandNotification = () => {
  const [notificationList, setNotifications] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();
  const [mobileSideBar, setMobileSidebar] = useState(true);
  const [brandId, setBrandId] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [myState, setMyState] = useState(false);

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));

    if (brandId) {
      getBrand();
    }
  }, [brandId]);

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data, "resData.data.data");
            getBrandNotification();
          }
        }
      })
      .catch((err) => {});
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
          getBrandNotification();
        }
      })
      .catch((err) => {});
    navigate(`/talent/${item?.talentDetails?.publicUrl}`, {
      state: { talentData: item?.talentDetails },
    });
  };

  const deleteNotification = async (item) => {
    const formData = {
      notificationId: item?._id,
    };
    await ApiHelper.post(`${API.deleteNotification}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          getBrandNotification();
        }
      })
      .catch((err) => {});
  };

  const handleChildClick = () => {
    setMobileSidebar(false);
  };

  useEffect(() => {}, [notificationList]);

  return (
    <>
      <>
        <BrandHeader toggleMenu={toggleMenu} myState={myState} />
        <div
          id="sidebarBrand"
          className={`brand-sidebar ${
            showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
          }`}
        >
          <BrandSideMenu myState={myState} />
        </div>
        <main
          id="mainBrand"
          className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
        >
          <div className="brand-content-main my-2 boxBg px-4">
            <div className="create-job-title">Notification</div>

            <div className="talent-notification-main w-100 mt-2 mb-3">
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
                              {item?.brandNotificationMessage}&nbsp;
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
              {notificationList && notificationList.length === 0 && (
                <>No Notifications Available</>
              )}
            </div>
          </div>
        </main>
      </>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default BrandNotification;
