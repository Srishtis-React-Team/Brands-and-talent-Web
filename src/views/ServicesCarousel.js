import React, { useEffect, useState } from "react";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import "../assets/css/service-carousel.scss";
import { useNavigate } from "react-router";
import PopUp from "../components/PopUp";

const ServicesCarousel = ({ talentData }) => {
  const navigate = useNavigate();

  const [servicesList, setServicesList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [videoAudioList, setVideoAudioList] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    if (talentData?._id) {
      fetchServices();
      fetchVideoAudios();
    }
  }, [talentData?._id]);
  useEffect(() => {}, [servicesList]);

  const fetchServices = async () => {
    await ApiHelper.post(`${API.unifiedDataFetch}${talentData?._id}/6`)
      .then((resData) => {
        if (resData.data.status === true) {
          setServicesList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const fetchVideoAudios = async () => {
    await ApiHelper.post(`${API.unifiedDataFetch}${talentData?._id}/2`)
      .then((resData) => {
        if (resData.data.status === true) {
          setVideoAudioList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const messageNow = () => {
    navigate(`/message?${talentData?._id}`);
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
                      <img
                        src={`${API.userFilePath}${item?.files[0]?.fileData}`}
                        alt=""
                      />
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
                            Duration :
                          </div>
                          <div>{item?.serviceDuration} Weeks/Months</div>
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
