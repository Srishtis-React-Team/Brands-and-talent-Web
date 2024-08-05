import React, { useEffect, useState } from "react";
import "../assets/css/PhotosCarousel.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import { useNavigate } from "react-router-dom";
import "../assets/css/findcreators.css";
import PopUp from "../components/PopUp";

const Talentscarousel = ({ talentList }) => {
  const navigate = useNavigate();
  const favoruiteIcon = require("../assets/icons/favorite.png");
  const heartIcon = require("../assets/icons/heart.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {}, [talentList]);

  const addFavorite = async (item) => {
    const formData = {
      type: item?.type,
      user: item?._id,
    };
    let brandId = localStorage.getItem("brandId");
    let talentId = localStorage.getItem("userId");

    let loggidInID;
    if (brandId) {
      loggidInID = brandId;
    } else if (talentId) {
      loggidInID = talentId;
    }

    await ApiHelper.post(`${API.setUserFavorite}${loggidInID}`, formData, true)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Talent added to your favourite list");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setMessage("Please Login First");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      });
  };

  const openTalent = (item) => {
    navigate(`/talent/${item.publicUrl}`, {
      state: { talentData: item },
    });
  };

  const removeFavorite = async (item) => {
    const formData = {
      type: item?.type,
      user: item?._id,
    };
    let brandId = localStorage.getItem("brandId");
    let talentId = localStorage.getItem("userId");

    let loggidInID;
    if (brandId) {
      loggidInID = brandId;
    } else if (talentId) {
      loggidInID = talentId;
    }
    await ApiHelper.post(`${API.removeFavorite}${loggidInID}`, formData, true)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Removed Talent From Favorites");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setMessage("Unable To Remove Please Try Again");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      });
  };

  return (
    <>
      <OwlCarousel
        className="owl-theme photos-carousel-owl"
        margin={10}
        nav
        items={talentList?.length === 1 ? 1 : 5}
        responsive={{
          0: {
            items: 2,
          },
          768: {
            items: 4,
          },
        }}
      >
        {talentList &&
          talentList.length > 0 &&
          talentList.map((item, index) => {
            return (
              <>
                <div
                  style={{ cursor: "pointer" }}
                  className="item"
                  key={item?._id}
                  onClick={(e) => {
                    e.stopPropagation();
                    openTalent(item);
                  }}
                >
                  <div className="sliderImg">
                    <img
                      className="talents-profile-slider-image"
                      src={`${API.userFilePath}${item?.image?.fileData}`}
                      alt=""
                    />
                    {!item.isFavorite && (
                      <img
                        className="heart-icon"
                        style={{ left: "80%" }}
                        src={heartIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          addFavorite(item);
                        }}
                      ></img>
                    )}
                    {item.isFavorite === true && (
                      <img
                        className="heart-icon"
                        style={{ left: "80%" }}
                        src={favoruiteIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFavorite(item);
                        }}
                      ></img>
                    )}
                  </div>
                  <div className="carousel-talent-name">
                    {item?.preferredChildFirstname}
                  </div>
                </div>
              </>
            );
          })}
      </OwlCarousel>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Talentscarousel;
