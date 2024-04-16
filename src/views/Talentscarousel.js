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

const Talentscarousel = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const favoruiteIcon = require("../assets/icons/favorite.png");
  const locationIcon = require("../assets/icons/locationIcon.png");
  const darkStar = require("../assets/icons/darkStar.png");
  const brightStar = require("../assets/icons/brightStar.png");
  const jobIcon = require("../assets/icons/jobIcon.png");
  const heartIcon = require("../assets/icons/heart.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [talentList, setTalentList] = useState([]);

  const addFavorite = async (item) => {
    console.log(item);
    const formData = {
      type: item?.type,
      user: item?._id,
    };
    let brandId = localStorage.getItem("brandId");
    let talentId = localStorage.getItem("userId");
    console.log(brandId, "userid");
    console.log(talentId, "userid");
    let loggidInID;
    if (brandId) {
      loggidInID = brandId;
    } else if (talentId) {
      loggidInID = talentId;
    }

    await ApiHelper.post(`${API.setUserFavorite}${loggidInID}`, formData, true)
      .then((resData) => {
        console.log(resData, "addFavorite");
        if (resData.data.status === true) {
          console.log("addFavoriteBlock", "addFavorite");
          setMessage("Added The Talent To Your Favorites ");
          setOpenPopUp(true);
          getTalentList();
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Please Login First");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
        }, 1000);
      });
  };

  const openTalent = (item) => {
    console.log(item, "item");
    navigate("/talent-profile", { state: { talentData: item } });
  };

  const removeFavorite = async (item) => {
    console.log(item);
    const formData = {
      type: item?.type,
      user: item?._id,
    };
    let brandId = localStorage.getItem("brandId");
    let talentId = localStorage.getItem("userId");
    console.log(brandId, "userid");
    console.log(talentId, "userid");
    let loggidInID;
    if (brandId) {
      loggidInID = brandId;
    } else if (talentId) {
      loggidInID = talentId;
    }
    await ApiHelper.post(`${API.removeFavorite}${loggidInID}`, formData, true)
      .then((resData) => {
        console.log(resData, "removeFavorite");
        if (resData.data.status === true) {
          console.log("removeFavoriteBlock", "removeFavorite");
          setMessage("Removed Talent From Favorites");
          setOpenPopUp(true);
          getTalentList();
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Unable To Remove Please Try Again");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
        }, 1000);
      });
  };

  const getTalentList = async () => {
    await ApiHelper.get(API.getTalentList)
      .then((resData) => {
        if (resData) {
          setTalentList(resData.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTalentList();
  }, []);
  useEffect(() => {
    console.log(talentList, "talentList");
  }, [talentList]);

  return (
    <>
      <OwlCarousel
        className="owl-theme photos-carousel-owl"
        // loop
        margin={10}
        nav
        items={talentList?.length === 1 ? 1 : 5}
        responsive={{
          // Breakpoint from 0 up
          0: {
            items: 2,
          },
          // Breakpoint from 768 up
          768: {
            items: 5,
          },
        }}
      >
        {talentList &&
          talentList.length > 0 &&
          talentList.map((item, index) => {
            // console.log(talentList, "talentList map");
            console.log(item, "item");
            return (
              <>
                <div className="item" key={index}>
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
                      onClick={() => addFavorite(item)}
                    ></img>
                  )}
                  {item.isFavorite === true && (
                    <img
                      className="heart-icon"
                      style={{ left: "80%" }}
                      src={favoruiteIcon}
                      onClick={() => removeFavorite(item)}
                    ></img>
                  )}
                  <div
                    className="carousel-talent-name"
                    onClick={() => openTalent(item)}
                  >
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
