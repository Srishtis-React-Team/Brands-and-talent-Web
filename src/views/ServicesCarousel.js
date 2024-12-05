import React, { useEffect, useState } from "react";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import "../assets/css/service-carousel.css";
import { useNavigate, useLocation } from "react-router";
import PopUp from "../components/PopUp";
import CurrentUser from "../CurrentUser";
const ServicesCarousel = ({ talentData, brandData }) => {
  const navigate = useNavigate();
  const { currentUserId, currentUserImage, currentUserType, avatarImage } =
    CurrentUser();
  const location = useLocation();

  const [servicesList, setServicesList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [videoAudioList, setVideoAudioList] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };
  const [isOwnTalent, setIsOwnTalent] = useState(null);
  const [isAdminApproved, setIsAdminApproved] = useState(null);
  const [showProfile, setShowProfile] = useState(null);

  useEffect(() => {
    // Extract the last part of the URL (i.e., 'peter')
    const pathParts = location.pathname.split("/");
    const name = pathParts[pathParts.length - 1];
    getDataByPublicUrl(name);
  }, [location]);

  const getDataByPublicUrl = async (name) => {
    const formData = {
      publicUrl: name,
      userId:
        localStorage.getItem("userId") || localStorage.getItem("currentUser"),
    };
    await ApiHelper.post(`${API.getDataByPublicUrl}`, formData)
      .then((resData) => {
        if (resData?.data?.currentStatus == "own-talent") {
          setShowProfile(true);
          setIsOwnTalent(true);
        } else if (resData?.data?.currentStatus == "approved") {
          setShowProfile(true);
          setIsOwnTalent(false);
          setIsAdminApproved(true);
        } else if (resData?.data?.currentStatus == "not-approved") {
          setShowProfile(false);
          setIsOwnTalent(false);
        }
        if (resData?.data?.status == false) {
          setMessage(resData?.data?.msg);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 2000);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    const storedUserId =
      localStorage.getItem("userId") || localStorage.getItem("currentUser");
    setUserId(storedUserId);
    if (talentData?._id) {
      fetchServices();
      fetchVideoAudios();
    }
  }, [talentData?._id]);
  useEffect(() => {}, [servicesList]);

  const fetchServices = async () => {
    const formData = {
      user: userId ? userId : null,
    };
    await ApiHelper.post(
      `${API.unifiedDataFetch}${talentData?._id}/6`,
      formData
    )
      .then((resData) => {
        if (resData.data.status === true) {
          setServicesList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const fetchVideoAudios = async () => {
    const formData = {
      user: userId ? userId : null,
    };
    await ApiHelper.post(
      `${API.unifiedDataFetch}${talentData?._id}/2`,
      formData
    )
      .then((resData) => {
        if (resData.data.status === true) {
          setVideoAudioList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const messageNow = () => {
    if (isOwnTalent == true) {
      if (talentData?.planName == "Basic") {
        setMessage("Please upgrade to pro plan to use this feature");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate(`/pricing`);
        }, 3000);
      } else if (
        talentData?.planName != "Basic" &&
        talentData?.accountBlock == false
      ) {
        navigate(`/message?${talentData?._id}`);
      } else if (talentData?.accountBlock == true) {
        setMessage("Please upgrade your plan to access your profile");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate(`/pricing`);
        }, 3000);
      }
    } else if (isOwnTalent == false && isAdminApproved == true) {
      if (brandData?.planName === "Basic") {
        setMessage("Please upgrade to pro plan to use this feature");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate(`/pricing`);
        }, 3000);
      } else if (
        brandData?.planName !== "Basic" &&
        brandData?.accountBlock == false
      ) {
        navigate(`/message?${talentData?._id}`);
      } else if (brandData?.accountBlock == true) {
        setMessage("Please upgrade your plan to access your profile");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate(`/pricing`);
        }, 3000);
      }
    } else if (currentUserType == "brand") {
      if (brandData?.planName === "Basic") {
        setMessage("Please upgrade to premium plan to use this feature");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate(`/pricing`);
        }, 3000);
      } else if (
        brandData?.planName !== "Basic" &&
        brandData?.accountBlock == false
      ) {
        navigate(`/message?${talentData?._id}`);
      } else if (brandData?.accountBlock == true) {
        setMessage("Please upgrade your plan to access your profile");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate(`/pricing`);
        }, 3000);
      }
    }
  };

  const inviteTalentNotification = async () => {
    const formData = {
      talentId: talentData?._id,
    };
    setIsLoading(true);
    await ApiHelper.post(`${API.inviteTalentNotification}`, formData)
      .then((resData) => {
        if (resData) {
          // if (resData?.data?.status === true) {
          // } else {
          // }
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      {/* <div className="service-list-main">
        {servicesList &&
          servicesList.length > 0 &&
          servicesList?.map((item, index) => {
            return (
              <>
                <div className="service-list-wrapper">
                  <div className="row">
                    <div className="col-md-4">
                      {item?.files[0]?.fileData && (
                        <>
                          <img
                            className="service-image-style"
                            src={`${API.userFilePath}${item?.files[0]?.fileData}`}
                            alt=""
                          />
                        </>
                      )}
                      {!item?.files[0]?.fileData && (
                        <>
                          <img
                            className="service-image-style"
                            src={avatarImage}
                            alt=""
                          />
                        </>
                      )}
                    </div>
                    <div className="service-list-content col-md-8">
                      <div className="service-title">{item?.serviceName}</div>
                      <div
                        className="service-description"
                        dangerouslySetInnerHTML={{ __html: item?.editorState }}
                      />
                      <div className="starting-amount">
                        ${item?.serviceAmount} per hour
                      </div>
                      <div className="text-btm mb-3">
                        <div className="service-duration">
                          <div className="service-duration-title">
                            Delivery Time :
                          </div>
                          <div>
                            {item?.serviceDuration} {item?.serviceTime}
                          </div>
                        </div>
                      </div>
                      <div onClick={() => messageNow()} className="enquire-btn">
                        Inquire Now
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

        {!servicesList.length && (
          <>
            <div>No Services Available</div>
          </>
        )}
      </div> */}

      <div className="service-list-main">
        {servicesList &&
          servicesList.length > 0 &&
          servicesList.map((item, index) => {
            // Check if the service has a valid serviceName before rendering
            if (!item?.serviceName) return null;

            return (
              <div className="service-list-wrapper" key={index}>
                <div className="row">
                  <div className="col-md-4">
                    {item?.files[0]?.fileData ? (
                      <img
                        className="service-image-style"
                        src={`${API.userFilePath}${item?.files[0]?.fileData}`}
                        alt=""
                      />
                    ) : (
                      <img
                        className="service-image-style"
                        src={avatarImage}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="service-list-content col-md-8">
                    <div className="service-title">{item?.serviceName}</div>
                    <div
                      className={`service-description ${
                        isExpanded ? "expanded" : "collapsed"
                      }`}
                      dangerouslySetInnerHTML={{ __html: item?.editorState }}
                    />
                    {item?.editorState && (
                      <>
                        <button
                          className="toggle-button"
                          onClick={toggleContent}
                        >
                          {isExpanded ? "Show Less" : "Show More"}
                        </button>
                      </>
                    )}

                    {item?.serviceAmount && (
                      <>
                        <div className="starting-amount">
                          ${item?.serviceAmount} per hour
                        </div>
                      </>
                    )}

                    {(item?.serviceDuration || item?.serviceTime) && (
                      <>
                        <div className="text-btm mb-3">
                          <div className="service-duration">
                            <div className="service-duration-title">
                              Delivery Time :
                            </div>
                            <div>
                              {item?.serviceDuration} {item?.serviceTime}
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div onClick={() => messageNow()} className="enquire-btn">
                      Inquire Now
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        {/* Display message if no services available or all services have empty serviceName */}
        {(!servicesList.length ||
          !servicesList.some((item) => item.serviceName)) && (
          <div>No Services Available</div>
        )}
      </div>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default ServicesCarousel;
