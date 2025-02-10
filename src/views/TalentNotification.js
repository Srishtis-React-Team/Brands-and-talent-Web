import React, { useEffect, useState } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
import PopUp from "../components/PopUp.js";
import "../assets/css/talent-dashboard.css";
import "../assets/css/forms/kidsform-one.css";
import TalentSideMenu from "../layout/TalentSideMenu.js";
import { useLocation } from "react-router-dom";
import { formatDistanceToNow, parseISO, setWeek } from "date-fns";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CurrentUser from "../CurrentUser.js";
import Spinner from "../components/Spinner.js";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const TalentNotification = () => {
  const { avatarImage } = CurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  const [talentId, setTalentId] = useState(null);
  const [talentEmail, setTalentEmail] = useState(null);
  const [notificationList, setNotifications] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();
  const [talentData, setTalentData] = useState();
  const [subscriptionCategory, setSubscriptionCategory] = useState("");
  const [weekly, setWeekly] = useState(false);
  const [monthly, setMonthly] = useState(false);
  const [valueTabs, setValueTabs] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  const handleNavigation = (event) => {
    if (valueTabs === 0 && event === "back") {
      setValueTabs(0);
    } else if (event === "next") {
      setValueTabs(valueTabs + 1);
    } else if (event === "back") {
      setValueTabs(valueTabs - 1);
    } else if (valueTabs === 1) {
      setValueTabs(1);
    }
  };

  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    if (data?.isJobAlert) {
      setValueTabs(1);
    }
  }, [data]);

  useEffect(() => {
    setTimeout(function () {
      setTalentId(localStorage.getItem("userId"));
      setTalentEmail(localStorage.getItem("emailID"));
    }, 1000);

    if (talentId) {
      getTalentNotification();
      getKidsData();
    }
  }, [talentId]);

  const getKidsData = async () => {
    await ApiHelper.post(`${API.getTalentById}${talentId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          setTalentData(resData.data.data, "resData.data.data");
          setSubscriptionCategory(resData?.data?.data?.subscriptionType);
          if (resData?.data?.data?.subscriptionType == "weekly") {
            setWeekly(true);
          } else if (resData?.data?.data?.subscriptionType == "monthly") {
            setMonthly(true);
          }
        }
      })
      .catch((err) => {});
  };

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

  const createJobAlert = async (item) => {
    setIsLoading(true);
    const formData = {
      talentId: talentId,
      subscriptionType: subscriptionCategory,
    };
    await ApiHelper.post(`${API.createJobAlert}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);

          setMessage("Subscribed To Job Alert");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getKidsData();
            setIsLoading(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const updateJobAlert = async (item) => {
    setIsLoading(true);

    const formData = {
      talentId: talentId,
    };
    await ApiHelper.post(`${API.updateJobAlert}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);

          setMessage("Unsubscribed Successfully");
          setOpenPopUp(true);
          setTimeout(function () {
            setIsLoading(false);

            setOpenPopUp(false);
            getKidsData();
          }, 1000);
        }
      })
      .catch((err) => {});
    setIsLoading(false);
  };

  function setSubscriptionType(e) {
    if (e == "weekly") {
      setWeekly(true);
      setSubscriptionCategory("weekly");
    } else {
      setWeekly(false);
    }
    if (e == "monthly") {
      setMonthly(true);
      setSubscriptionCategory("monthly");
    } else {
      setMonthly(false);
    }
  }

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
        }`}
      >
        <TalentSideMenu />
      </div>

      <main
        style={notificationList?.length === 0 ? { height: "100vh" } : {}}
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div className="brand-content-main boxBg talentNot">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={valueTabs}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  label="Notifications"
                  {...a11yProps(0)}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Job Alert"
                  {...a11yProps(1)}
                  style={{ textTransform: "capitalize" }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={valueTabs} index={0}>
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
                            {/* changed */}
                            <div className="notification-card-flex">
                              {/* Display Brand Image or Talent Image */}
                              {item?.brandDetails?.brandImage[0]?.fileData ? (
                                <img
                                  className="notification-card-image"
                                  src={`${API.userFilePath}${item.brandDetails.brandImage[0].fileData}`}
                                  alt="Brand"
                                />
                              ) : item?.talentDetails?.image?.fileData ? (
                                <img
                                  className="notification-card-image"
                                  src={`${API.userFilePath}${item.talentDetails.image.fileData}`}
                                  alt="Talent"
                                />
                              ) : (
                                <img
                                  className="notification-card-image"
                                  src={avatarImage}
                                  alt="Default Avatar"
                                />
                              )}

                              {/* Notification Content */}
                              <div
                                className="notification-card-content"
                                onClick={() => {
                                  viewNotification(item);
                                }}
                              >
                                {item?.talentNotificationMessage}&nbsp;
                              </div>
                              {/* changed */}

                              {/*                             
                            <div className="notification-card-flex">
                              
                              <img
                                className="notification-card-image"
                                src={`${API.userFilePath}${item?.brandDetails?.brandImage[0]?.fileData}`}
                                alt=""
                              />
                              {!item?.brandDetails?.brandImage[0] && (
                                <>
                                  <img
                                    className="notification-card-image"
                                    src={avatarImage}
                                    alt=""
                                  />
                                </>
                              )}
                              <div
                                className="notification-card-content "
                                onClick={() => {
                                  viewNotification(item);
                                }}
                              >
                                {item?.talentNotificationMessage}&nbsp;
                              </div> */}
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
                {notificationList?.length == 0 && (
                  <div className="py-2">No Notifications Available</div>
                )}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={1}>
              <div className="job-alert-main">
                <div className="job-alert-title">
                  Subscribe to job alerts to receive weekly and bi-monthly job
                  notifications{" "}
                  {talentEmail && (
                    <>
                      on <span className="job-alert-mail"> {talentEmail}</span>
                    </>
                  )}
                </div>
                <div className="job-alert-wrapper">
                  <div className="modal-buttons">
                    <div
                      onClick={() => {
                        setSubscriptionCategory("weekly");
                      }}
                      className={
                        subscriptionCategory === "weekly"
                          ? "selected-register"
                          : "choose-register"
                      }
                    >
                      Weekly Job Alert
                    </div>
                    <div
                      onClick={() => {
                        setSubscriptionCategory("monthly");
                      }}
                      className={
                        subscriptionCategory === "monthly"
                          ? "selected-register"
                          : "choose-register"
                      }
                    >
                      Monthly Job Alert
                    </div>
                  </div>
                  <div className="job-alert-btn-wrapper">
                    <div>
                      <Button
                        onClick={(e) => {
                          if (
                            talentData?.subscriptionType !==
                              subscriptionCategory &&
                            talentData?.isSubscribed
                          ) {
                            // User is subscribed and changing their subscription type
                            createJobAlert(); // Re-subscribe to a different type
                          } else if (
                            talentData?.subscriptionType !==
                              subscriptionCategory &&
                            !talentData?.isSubscribed
                          ) {
                            // User is not subscribed and selecting a different subscription
                            createJobAlert();
                          } else if (
                            talentData?.subscriptionType ===
                              subscriptionCategory &&
                            talentData?.isSubscribed
                          ) {
                            // User is subscribed and wants to unsubscribe
                            updateJobAlert();
                          }
                        }}
                        className="edit-profileimg-btn"
                        variant="text"
                        style={{ textTransform: "capitalize" }}
                      >
                        {talentData?.subscriptionType !==
                          subscriptionCategory && !talentData?.isSubscribed
                          ? "Subscribe"
                          : talentData?.subscriptionType ===
                              subscriptionCategory && talentData?.isSubscribed
                          ? "Unsubscribe"
                          : "Subscribe"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <div className="edit-profile-navigations">
              {valueTabs >= 1 && (
                <div
                  className="edit-profile-navigation-btn"
                  onClick={() => {
                    handleNavigation("back");
                  }}
                >
                  <i className="bi bi-arrow-left-circle-fill arrow-left-circle"></i>
                  <span className="edit-profile-navigation-text">Back</span>
                </div>
              )}
              {valueTabs != 1 && (
                <div
                  className="edit-profile-navigation-btn"
                  onClick={() => {
                    handleNavigation("next");
                  }}
                >
                  <span className="edit-profile-navigation-text">Next</span>
                  <i className="bi bi-arrow-right-circle-fill"></i>
                </div>
              )}
            </div>
          </Box>
        </div>
      </main>
      {isLoading && <Spinner />}

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default TalentNotification;
