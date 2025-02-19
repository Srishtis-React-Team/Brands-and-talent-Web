import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.css";
import "../../assets/css/createjobs.css";
import "../../assets/css/talent-profile.css";
import "../../assets/css/talent-dashboard.css";

import "../../assets/css/findcreators.css";

import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import { useNavigate } from "react-router";
import BrandHeader from "./BrandHeader.js";
import BrandSideMenu from "./BrandSideMenu.js";
import CurrentUser from "../../CurrentUser.js";
const BrandFavorites = () => {
  const navigate = useNavigate();
  const {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
    talentName,
    brandName,
  } = CurrentUser();
  const [brandId, setBrandId] = useState(null);

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
  }, []);

  const [starCount, setStarCount] = useState(0);
  const handleStarClick = (index) => {
    setStarCount(index + 1);
  };

  useEffect(() => {}, [starCount]);

  const [showSidebar, setShowSidebar] = useState(true);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const heartIcon = require("../../assets/icons/heart.png");
  const favoruiteIcon = require("../../assets/icons/favorite.png");
  const pinkStar = require("../../assets/icons/pink-star.png");

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };
  const [talentList, setTalentList] = useState([]);

  const getFavorites = async () => {
    const formData = {
      userId: localStorage.getItem("brandId"),
    };
    await ApiHelper.post(API.favouritesList, formData)
      .then((resData) => {
        if (resData) {
          setTalentList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

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
          getFavorites();
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("Please Login First");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {});
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
          getFavorites();

          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  const openTalent = (item) => {
    navigate(`/talent/${item.publicUrl}`, {
      state: { talentData: item },
    });
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const [modalData, setModalData] = useState(null);
  const [comments, setComments] = useState(null);
  const rateTalent = (item) => {
    if (currentUserType === "brand") {
      setModalData(item);
      const modalElement = document.getElementById("ratingModal");
      const bootstrapModal = new window.bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  };

  const handleCloseModal = async (talent) => {
    const formData = {
      comment: comments,
      starRatings: starCount,
      reviewerName: talentName ? talentName : brandName,
      reviewerId: localStorage.getItem("brandId"), //currentUserId,
      talentId: modalData?.favouriteUserId,
    };
    await ApiHelper.post(API.reviewsPosting, formData)
      .then((resData) => {
        setMessage("Rating Submitted Successfully!");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          const modalElement = document.getElementById("ratingModal");
          const bootstrapModal = new window.bootstrap.Modal(modalElement);
          bootstrapModal.hide();
          getFavorites();
        }, 2000);
      })
      .catch((err) => {});
  };
  const stars = document.querySelectorAll(".stars i");
  const starsNone = document.querySelector(".rating-box");
  stars.forEach((star, index1) => {
    star.addEventListener("click", () => {
      stars.forEach((star, index2) => {
        index1 >= index2
          ? star?.classList.add("active")
          : star?.classList.remove("active");
      });
    });
  });

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
                Favourite Talents
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
                                src={`${API.userFilePath}${item?.favouriteUserDetails?.image[0]?.fileData}`}
                              ></img>
                              {(() => {
                                const starRatings = parseInt(
                                  item?.favouriteUserDetails
                                    ?.averageStarRatings,
                                  10
                                );
                                const totalStars = 5;
                                const filledStars =
                                  !isNaN(starRatings) && starRatings > 0
                                    ? starRatings
                                    : 0;

                                return (
                                  <div
                                    className={`rating ${
                                      currentUserType === "brand"
                                        ? "cursor"
                                        : ""
                                    }`}
                                    onClick={() => rateTalent(item)}
                                  >
                                    {[...Array(totalStars)].map(
                                      (_, starIndex) => (
                                        <i
                                          key={starIndex}
                                          className={
                                            starIndex < filledStars
                                              ? "bi bi-star-fill rating-filled-star"
                                              : "bi bi-star rating-unfilled-star"
                                          }
                                          alt="Star"
                                        ></i>
                                      )
                                    )}
                                  </div>
                                );
                              })()}

                              {!item?.isFavorite && (
                                <img
                                  className="heart-icon"
                                  src={heartIcon}
                                  onClick={() => addFavorite(item)}
                                ></img>
                              )}
                              {item?.isFavorite === true && (
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
                                  {`${item?.favouriteUserDetails?.preferredChildFirstname} ${item?.favouriteUserDetails?.preferredChildLastName}`}
                                </div>
                                {item?.favouriteUserDetails
                                  ?.averageStarRatings &&
                                  item?.favouriteUserDetails
                                    ?.averageStarRatings > 0 && (
                                    <>
                                      <div className="talent-details-wrapper">
                                        <div className="logo-fill-briefcase">
                                          <i class="bi bi-star-fill model-job-icons"></i>
                                        </div>

                                        <div className="contSect">
                                          <span>
                                            {
                                              item?.favouriteUserDetails
                                                ?.averageStarRatings
                                            }{" "}
                                            (
                                            {
                                              item?.favouriteUserDetails
                                                ?.totalReviews
                                            }{" "}
                                            ratings)
                                          </span>
                                        </div>
                                      </div>
                                    </>
                                  )}

                                {item?.favouriteUserDetails
                                  ?.noOfJobsCompleted && (
                                  <>
                                    <div className="talent-details-wrapper nweAlign pt-1 pb-0">
                                      <div className="logo-fill-briefcase">
                                        <i className="bi bi-briefcase-fill model-job-icons"></i>
                                      </div>
                                      <div className="contSect">
                                        <span>
                                          {
                                            item?.favouriteUserDetails
                                              ?.noOfJobsCompleted
                                          }{" "}
                                          Jobs Completed
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                )}
                                {item?.favouriteUserDetails?.profession && (
                                  <>
                                    <div className="talent-details-wrapper nweAlign pt-1 pb-0">
                                      <div className="logo-fill-briefcase">
                                        <i className="bi bi-person-workspace model-job-icons"></i>
                                      </div>
                                      <div className="contSect">
                                        <span>
                                          {
                                            item?.favouriteUserDetails
                                              ?.profession[0]?.value
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                )}
                                <div className="talent-details-wrapper nweAlign pt-1 pb-0">
                                  <div className="logo-fill-briefcase">
                                    <i className="bi bi-geo-alt-fill model-job-icons"></i>
                                  </div>
                                  <div className="contSect">
                                    <span>
                                      {item?.favouriteUserDetails?.childCity &&
                                        `${item?.favouriteUserDetails?.childCity}`}
                                      {item?.favouriteUserDetails?.childCity &&
                                        item?.favouriteUserDetails
                                          ?.parentState &&
                                        `, `}
                                      {item?.favouriteUserDetails
                                        ?.parentState &&
                                        `${item?.favouriteUserDetails?.parentState}`}
                                      {(item?.favouriteUserDetails?.childCity ||
                                        item?.favouriteUserDetails
                                          ?.parentState) &&
                                        item?.favouriteUserDetails
                                          ?.parentCountry &&
                                        `, `}
                                      {item?.favouriteUserDetails
                                        ?.parentCountry &&
                                        `${item?.favouriteUserDetails?.parentCountry}`}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    {talentList?.length === 0 && (
                      <>
                        <p>No Favorite Talents Added</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </>
      <div
        className="modal fade"
        id="ratingModal"
        tabIndex="-1"
        aria-labelledby="ratingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <div className="rating-box">
                  <h3>
                    {" "}
                    Rate{" "}
                    {modalData?.favouriteUserDetails?.preferredChildFirstname}
                  </h3>
                  <div className="stars">
                    {[...Array(5)].map((star, index) => {
                      return (
                        <i
                          key={index}
                          className={`fa-solid fa-star ${
                            index < starCount ? "active" : ""
                          }`}
                          onClick={() => handleStarClick(index)}
                        ></i>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="mb-3" style={{ textAlign: "left" }}>
                <label className="form-label">Comments</label>
                <textarea
                  name=""
                  id=""
                  cols="5"
                  rows="5"
                  className="form-control smaller-placeholder rating-text-area"
                  value={comments}
                  onChange={(e) => {
                    setComments(e.target.value);
                  }}
                  placeholder="Type your comments"
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => handleCloseModal(modalData)}
                type="button"
                className="btn submit-rating"
                data-bs-dismiss="modal"
                disabled={starCount === 0}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default BrandFavorites;
