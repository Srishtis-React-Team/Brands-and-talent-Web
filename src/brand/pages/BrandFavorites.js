import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.scss";
import "../../assets/css/createjobs.scss";
import "../../assets/css/talent-profile.css";
import Select from "react-select";
import Axios from "axios";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import { useNavigate } from "react-router";
import BrandHeader from "./BrandHeader.js";
import BrandSideMenu from "./BrandSideMenu.js";
const BrandFavorites = () => {
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(true);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const heartIcon = require("../../assets/icons/heart.png");
  const favoruiteIcon = require("../../assets/icons/favorite.png");
  const locationIcon = require("../../assets/icons/locationIcon.png");
  const darkStar = require("../../assets/icons/darkStar.png");
  const brightStar = require("../../assets/icons/brightStar.png");
  const jobIcon = require("../../assets/icons/jobIcon.png");
  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };
  const [talentList, setTalentList] = useState([]);

  const getFavorites = async () => {
    await ApiHelper.get(API.favouritesList)
      .then((resData) => {
        if (resData) {
          setTalentList(resData.data.data);
        }
        console.log("talentList", resData.data.data);
        console.log("talentList", talentList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        if (resData.data.status === true) {
          setMessage("Added The Talent To Your Favorites ");
          setOpenPopUp(true);
          getFavorites();
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("Please Login First");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
        if (resData.data.status === true) {
          setMessage("Removed Talent From Favorites");
          setOpenPopUp(true);
          getFavorites();

          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openTalent = (item) => {
    console.log(item, "item");
    // navigate("/talent", { state: { talentData: item } });

    navigate(`/talent/${item.publicUrl}`, {
      state: { talentData: item },
    });
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <>
      <>
        <BrandHeader toggleMenu={toggleMenu} />
        <div
          id="sidebarBrand"
          className={`brand-sidebar ${
            showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
          }`}
        >
          <BrandSideMenu />
        </div>
        <main
          id="mainBrand"
          className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
        >
          <div className="brand-content-main">
            <section>
              <div className="brand-filter-section create-job-title">
                Favorite Talents
              </div>
              <div className="models-images" style={{ width: "100%" }}>
                <div className="gallery-section">
                  <div
                    className="gallery-main row"
                    style={{ justifyContent: "unset" }}
                  >
                    {talentList?.length > 0 &&
                      talentList?.map((item) => {
                        return (
                          <div className="col-md-4 col-lg-3 favTalent">
                            <div className="gallery-wrapper modalSpc">
                              <img
                                className="gallery-img"
                                src={`${API.userFilePath}${item.image?.fileData}`}
                              ></img>
                              <div className="rating">
                                <img src={brightStar}></img>
                                <img src={brightStar}></img>
                                <img src={brightStar}></img>
                                <img src={darkStar}></img>
                                <img src={darkStar}></img>
                              </div>
                              {!item.isFavorite && (
                                <img
                                  className="heart-icon"
                                  src={heartIcon}
                                  onClick={() => addFavorite(item)}
                                ></img>
                              )}
                              {item.isFavorite === true && (
                                <img
                                  className="heart-icon"
                                  src={favoruiteIcon}
                                  onClick={() => removeFavorite(item)}
                                ></img>
                              )}
                            </div>
                            <div className="contSpc">
                              <div className="content">
                                <div
                                  className="find-creator-name"
                                  onClick={() => openTalent(item)}
                                >
                                  {`${item?.preferredChildFirstname} ${item?.preferredChildLastName}`}
                                </div>
                                <div className="find-creator-address ">
                                  {item.profession?.map((profession, index) => (
                                    <React.Fragment key={index}>
                                      {profession.value}
                                      {index !== item.profession.length - 1 &&
                                        ","}
                                    </React.Fragment>
                                  ))}
                                </div>
                                <div className="user-details">
                                  <div className="location-wrapper">
                                    <img src={locationIcon} alt="" />
                                    <div className="find-creator-location-name ">
                                      {item?.parentCountry}
                                    </div>
                                  </div>
                                  <div className="location-wrapper">
                                    <img src={jobIcon} alt="" />
                                    <div className="find-creator-location-name">
                                      25 Projects Booked
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default BrandFavorites;
