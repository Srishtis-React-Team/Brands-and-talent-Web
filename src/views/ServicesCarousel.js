import React, { useEffect, useState } from "react";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import "../assets/css/service-carousel.scss";
import { useNavigate } from "react-router";
import PopUp from "../components/PopUp";

const ServicesCarousel = ({ talentData }) => {
  const navigate = useNavigate();

  console.log(talentData, "talentData ");
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
  useEffect(() => {
    console.log(servicesList, "servicesList");
  }, [servicesList]);

  const fetchServices = async () => {
    await ApiHelper.post(`${API.unifiedDataFetch}${talentData?._id}/6`)
      .then((resData) => {
        console.log(resData, "resData cv");
        if (resData.data.status === true) {
          setServicesList(resData.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchVideoAudios = async () => {
    await ApiHelper.post(`${API.unifiedDataFetch}${talentData?._id}/2`)
      .then((resData) => {
        console.log(resData, "resData videos");
        if (resData.data.status === true) {
          console.log(
            resData.data.data[0].videosAndAudios,
            "resData.data.data[0].videosAndAudios"
          );
          setVideoAudioList(resData.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const messageNow = () => {
    if (talentData?.planName == "Basic") {
      setMessage("Purchase Pro or Premium Plan to unlock this feature");
      setOpenPopUp(true);
      setTimeout(function() {
        setOpenPopUp(false);
        navigate(`/pricing`);
      }, 3000);
    } else {
      navigate(`/message?${talentData?._id}`);
    }
  };

  return (
    <>
      {servicesList && servicesList.length > 0 && (
        <div className="portofolio-section">
          <div className="portofolio-title">Services</div>
          <div className="view-all">View All</div>
        </div>
      )}

      <div className="service-list-main">
        {servicesList &&
          servicesList.length > 0 &&
          servicesList?.map((item, index) => {
            console.log(item, "item");
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
                      <div className="starting-amount">From US $2500</div>
                      <div className="service-title">{item?.serviceName}</div>
                      <div
                        className="service-description"
                        dangerouslySetInnerHTML={{ __html: item?.editorState }}
                      />

                      <div className="text-btm">
                        <div className="service-duration">
                          <div>With In 2 Months</div>
                          <div>3 Concepts, 2 Revisions</div>
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
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default ServicesCarousel;

{
  /* <div className="talents-carousel-post-wrapper">
<img className="talents-carousel-img" src={model2}></img>
<div className="talents-post-details">
  <img src={instaLogo}></img>
  <div className="talents-likes">234 Likes 340 comments</div>
  <div className="talents-date">23 Nov 2023</div>
</div>
<div className="talents-post-content">
  Lorem ipsum dolor sit amet, consectetur adipiscing consectet
  elit...
</div>
</div>
<div className="talents-carousel-post-wrapper">
<img className="talents-carousel-img" src={model3}></img>
<div className="talents-post-details">
  <img src={instaLogo}></img>
  <div className="talents-likes">234 Likes 340 comments</div>
  <div className="talents-date">23 Nov 2023</div>
</div>
<div className="talents-post-content">
  Lorem ipsum dolor sit amet, consectetur adipiscing consectet
  elit...
</div>
</div>
<div className="talents-carousel-post-wrapper">
<img className="talents-carousel-img" src={model4}></img>
<div className="talents-post-details">
  <img src={instaLogo}></img>
  <div className="talents-likes">234 Likes 340 comments</div>
  <div className="talents-date">23 Nov 2023</div>
</div>
<div className="talents-post-content">
  Lorem ipsum dolor sit amet, consectetur adipiscing consectet
  elit...
</div>
</div>
<div className="talents-carousel-post-wrapper">
<img className="talents-carousel-img" src={model5}></img>
<div className="talents-post-details">
  <img src={instaLogo}></img>
  <div className="talents-likes">234 Likes 340 comments</div>
  <div className="talents-date">23 Nov 2023</div>
</div>
<div className="talents-post-content">
  Lorem ipsum dolor sit amet, consectetur adipiscing consectet
  elit...
</div>
</div>
<div className="talents-carousel-post-wrapper">
<img className="talents-carousel-img" src={model6}></img>
<div className="talents-post-details">
  <img src={instaLogo}></img>
  <div className="talents-likes">234 Likes 340 comments</div>
  <div className="talents-date">23 Nov 2023</div>
</div>
<div className="talents-post-content">
  Lorem ipsum dolor sit amet, consectetur adipiscing consectet
  elit...
</div>
</div>
<div className="talents-carousel-post-wrapper">
<img className="talents-carousel-img" src={model7}></img>
<div className="talents-post-details">
  <img src={instaLogo}></img>
  <div className="talents-likes">234 Likes 340 comments</div>
  <div className="talents-date">23 Nov 2023</div>
</div>
<div className="talents-post-content">
  Lorem ipsum dolor sit amet, consectetur adipiscing consectet
  elit...
</div>
</div> */
}
