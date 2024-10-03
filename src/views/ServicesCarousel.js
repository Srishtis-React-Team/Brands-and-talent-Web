import React, { useEffect, useState } from "react";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import "../assets/css/service-carousel.css";
import { useNavigate } from "react-router";
import PopUp from "../components/PopUp";
import CurrentUser from "../CurrentUser";
const ServicesCarousel = ({ talentData, brandData }) => {
  const navigate = useNavigate();
  const { currentUserId, currentUserImage, currentUserType, avatarImage } =
    CurrentUser();
  const [servicesList, setServicesList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [videoAudioList, setVideoAudioList] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    if (currentUserType == "talent" && talentData?.planName != "Premium") {
      setMessage("Please upgrade to premium plan to use this feature");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
        navigate(`/pricing`);
      }, 3000);
    } else if (
      currentUserType == "talent" &&
      talentData?.planName == "Premium"
    ) {
      navigate(`/message?${talentData?._id}`);
    } else if (currentUserType == "brand" && brandData?.planName === "Basic") {
      setMessage("Please upgrade to pro plan to use this feature");
      inviteTalentNotification();
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
        navigate(`/pricing`);
      }, 2000);
    } else if (currentUserType == "brand" && brandData?.planName != "Basic") {
      navigate(`/message?${talentData?._id}`);
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
      {servicesList && servicesList.length > 0 && <></>}

      <div className="service-list-main">
        {servicesList &&
          servicesList.length > 0 &&
          servicesList?.map((item, index) => {
            return (
              <>
                <div className="service-list-wrapper" key={index}>
                  <div className="row">
                    <div className="service-list-image col-md-4">
                      {item?.files[0]?.fileData && (
                        <>
                          <img
                            src={`${API.userFilePath}${item?.files[0]?.fileData}`}
                            alt=""
                          />
                        </>
                      )}
                      {!item?.files[0]?.fileData && (
                        <>
                          <img src={avatarImage} alt="" />
                        </>
                      )}
                    </div>
                    <div className="service-list-content col-md-8">
                      <div className="starting-amount">
                        USD {item?.serviceAmount}
                      </div>
                      <div className="service-title">{item?.serviceName}</div>
                      <div
                        className="service-description"
                        dangerouslySetInnerHTML={{ __html: item?.editorState }}
                      />
                      <div className="text-btm">
                        <div className="service-duration">
                          <div className="service-duration-title">
                            Delivery Time :
                          </div>
                          <div>
                            {item?.serviceDuration} {item?.serviceTime}
                          </div>
                        </div>
                        <div
                          onClick={() => messageNow()}
                          className="enquire-btn"
                        >
                          Inquire Now
                        </div>
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
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default ServicesCarousel;
