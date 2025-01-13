import React, { useState, useEffect, useRef } from "react";
import "../assets/css/dashboard.css";
import "../assets/css/talent-profile.css";
import "../assets/css/talent-dashboard.css";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import CurrentUser from "../CurrentUser";
import WebSlider from "./WebSlider";
import MobileSlider from "./MobileSlider";
const Dashboard = () => {
  const { currentUserId, currentUserType, talentName, brandName } =
    CurrentUser();
  useEffect(() => {
    getBrand();
  }, [currentUserId]);
  const navigate = useNavigate();
  const adidasIcon = require("../assets/icons/6539fea9ad514fe89ff5d7fc_adidas.png");
  const ubisoftIcon = require("../assets/icons/6539fd74ad514fe89ff48cdd_ubisoft.png");
  const wppIcon = require("../assets/icons/651508c575f862fac120d7b1_wpp.webp");
  const lorealIcon = require("../assets/icons/6539e8f83c874a7714db103c_Loreal 1.webp");
  const havasIcon = require("../assets/icons/6539e8f8ac5a3259e7f64ef8_Havas_logo 3.webp");
  const americanExpress = require("../assets/icons/American-Express-Color.png");
  const joseIcon = require("../assets/icons/6539e8f8fe903bed35dc07f8_jose-cuervo-logo-black-and-white 1.webp");
  const calvinIcon = require("../assets/icons/6539ea694436eb9715c9cba3_image 10.png");
  const pinkStar = require("../assets/icons/pink-star.png");
  const heartIcon = require("../assets/icons/heart.png");
  const favoruiteIcon = require("../assets/icons/favorite.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [talentList, setTalentList] = useState([]);
  const [talentsList, setTalentsList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [messageFromHeader, setMessageFromHeader] = useState("");
  const [hideAll, setHideAll] = useState(false);
  const [adultUserCount, setAdultUserCount] = useState(0);
  const [kidsUserCount, setKidsUserCount] = useState(0);
  const [brandUserCount, setBrandUserCount] = useState(0);
  const [talentCount, setTalentCount] = useState(0);
  const [allUsersCount, setAllUsersCount] = useState(0);
  const [productServicesList, setProductServicesList] = useState([]);
  const [contentsList, setContentsList] = useState([]);
  const [successStoryList, setSuccessStoryList] = useState([]);
  const [brandLogosList, setBrandLogosList] = useState([]);

  useEffect(() => {
    getTalentList();
    getUsersCount();
    fetchContentByType();
    getFeaturedArticles();
    fetchPageContents();
    getSuccessStories();
    getLogos();
  }, []);

  const getSuccessStories = async () => {
    await ApiHelper.get(API.getSuccessStories)
      .then((resData) => {
        if (resData) {
          setSuccessStoryList(resData?.data?.data);
        }
      })
      .catch((err) => {});
  };

  const getLogos = async () => {
    await ApiHelper.get(API.getLogos)
      .then((resData) => {
        if (resData) {
          setBrandLogosList(resData?.data?.data[0]?.image);
        }
      })
      .catch((err) => {});
  };

  const fetchContentByType = async () => {
    const formData = {
      contentType: "Product And Services",
    };
    await ApiHelper.post(API.fetchContentByType, formData)
      .then((resData) => {
        if (resData) {
          setProductServicesList(resData?.data?.data?.items);
        }
      })
      .catch((err) => {});
  };

  const fetchPageContents = async () => {
    const formData = {
      contentType: "Page Contents",
    };
    await ApiHelper.post(API.fetchContentByType, formData)
      .then((resData) => {
        if (resData) {
          setContentsList(resData?.data?.data?.items[0]);
        }
      })
      .catch((err) => {});
  };

  const getTalentList = async () => {
    await ApiHelper.get(API.getPopularTalent)
      .then((resData) => {
        if (resData) {
          setTalentsList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const handleReadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const getUsersCount = async () => {
    await ApiHelper.get(API.countUsers)
      .then((resData) => {
        const data = resData?.data?.data;
        if (data) {
          data.forEach((item) => {
            switch (item.type) {
              case "adultUserCount":
                setAdultUserCount(item.count);
                break;
              case "kidsUserCount":
                setKidsUserCount(item.count);
                break;
              case "brandUserCount":
                setBrandUserCount(item.count);
                break;
              case "talentCount":
                setTalentCount(item.count);
                break;
              case "allUsersCount":
                setAllUsersCount(item.count);
                break;
              default:
                break;
            }
          });
        }
      })
      .catch((err) => {});
  };
  const [brandData, setBrandData] = useState(null);

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${currentUserId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {});
  };

  const addFavorite = async (data) => {
    if (!currentUserId) {
      setMessage("You must be logged in");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
        navigate("/login");
      }, 2000);
    } else {
      const formData = {
        type: data?.type,
        user: data?._id,
      };
      await ApiHelper.post(`${API.setUserFavorite}${data._id}`, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setMessage("Talent added to your favourite list");
            setOpenPopUp(true);
            getTalentList();
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
    }
  };

  const removeFavorite = async (item) => {
    if (!currentUserId) {
      setMessage("You must be logged in");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
        navigate("/login");
      }, 2000);
    } else {
      const formData = {
        type: item?.type,
        user: item?._id,
      };
      await ApiHelper.post(
        `${API.removeFavorite}${currentUserId}`,
        formData,
        true
      )
        .then((resData) => {
          if (resData.data.status === true) {
            setMessage("Removed Talent From Favorites");
            setOpenPopUp(true);
            getTalentList();
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
    }
  };

  const handleMessageFromHeader = (message) => {
    if (message === "open-kids-form") {
      openModal();
    }
    if (message.menuStatus === false) {
      setHideAll(true);
    }
    setMessageFromHeader(message);
  };

  const modalRef = useRef(null);
  const openModal = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  const openTalent = (item) => {
    navigate(`/talent/${item.publicUrl}`, {
      state: { talentData: item },
    });
  };

  const [starCount, setStarCount] = useState(0);
  const handleStarClick = (index) => {
    setStarCount(index + 1);
  };

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
      reviewerId: currentUserId,
      talentId: talent?._id,
      isReported: false,
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
          getTalentList();
          setStarCount(null);
          setComments("");
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
          ? star.classList.add("active")
          : star.classList.remove("active");
      });
    });
  });

  const [featuredBlogsLsit, setFeaturedBlogsLsit] = useState(0);

  const getFeaturedArticles = async () => {
    await ApiHelper.get(API.getFeaturedArticles)
      .then((resData) => {
        if (resData) {
          setFeaturedBlogsLsit(resData?.data?.data.slice(0, 4));
        }
      })
      .catch((err) => {});
  };

  const handleAirtableClick = () => {
    window.open(
      "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
      "_blank"
    );
  };

  useEffect(() => {
    console.log(talentsList, "talentsList");
  }, [talentsList]);
  return (
    <>
      <div className="dashboard-main">
        <Header sendMessageToParent={handleMessageFromHeader} />
        <section className="section-1 bannerImg wraper">
          <div className="container-fluid relCont">
            <div className="row banner-content">
              <div className="col-lg-12">
                <div className="brand-section flex-column banner-title-section">
                  <p className="brand-title">
                    <span>C</span>onnecting <span>B</span>rands and{" "}
                    <span>T</span>
                    alent
                  </p>
                  <p className="brand-description">{contentsList?.title2}</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="brand-options">
                  <div className="section-title">Get Booked</div>
                  <div className="section-description brand-secription">
                    {contentsList?.title3}
                  </div>
                  {/* <button
                    className="Join-now-wrapper joinnow-text"
                    data-bs-toggle="modal"
                    data-bs-target="#verify_age"
                  >
                    Join Now
                  </button> */}
                  <button
                    className="Join-now-wrapper joinnow-text"
                    onClick={() => {
                      if (currentUserType === "talent") {
                        navigate("/talent-home");
                      }
                    }}
                    {...(currentUserType !== "talent" && {
                      "data-bs-toggle": "modal",
                      "data-bs-target": "#verify_age",
                    })}
                  >
                    Join Now
                  </button>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="brand-options">
                  <div className="section-title">Hire Talent</div>
                  <div className="section-description brand-secription">
                    {contentsList?.title4}
                  </div>

                  <button
                    onClick={(e) => {
                      if (currentUserType == "brand") {
                        navigate(
                          `/client/${brandData?.publicUrl.replace(/\s+/g, "")}`
                        );
                      } else {
                        navigate("/signup", {
                          state: { signupCategory: "brand" },
                        });
                      }
                    }}
                    className="Join-now-wrapper hireBtn joinnow-text"
                  >
                    Hire Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* {talentsList && talentsList?.length >= 10 && (
          <>
            <div className="wraper">
              <div className="container-fluid">
                <div className="tabs-section">
                  <div className="title">Popular Talent</div>
                </div>
              </div>

              <div className="container">
                <div className="gallery-section wraper">
                  <div className="gallery-main showContent">
                    {talentsList?.slice(0, visibleCount)?.map((item) => {
                      return (
                        <div className="gallery-wrapper">
                          <div className="gallery-top">
                            <img
                              className="gallery-img"
                              src={`${API.userFilePath}${item.image?.fileData}`}
                            ></img>

                            {(() => {
                              const starRatings = parseInt(
                                item?.averageStarRatings,
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
                                    currentUserType === "brand" ? "cursor" : ""
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

                          <div
                            className="gallery-content"
                            onClick={() => openTalent(item)}
                          >
                            <div className="content">
                              <div className="name">
                                {item?.preferredChildFirstname
                                  ? `${item?.preferredChildFirstname}`
                                  : "Elizabeth"}
                              </div>
                              {item?.averageStarRatings &&
                                item?.averageStarRatings > 0 && (
                                  <>
                                    <div className="talent-details-wrapper">
                                      <div className="logo-fill-briefcase">
                                        <i class="bi bi-star-fill model-job-icons"></i>
                                      </div>
                                      <div className="contSect">
                                        <span>
                                          {item?.averageStarRatings} (
                                          {item?.totalReviews} ratings)
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                )}

                              {item?.noOfJobsCompleted && (
                                <>
                                  <div className="talent-details-wrapper nweAlign pt-1 pb-0">
                                    <div className="logo-fill-briefcase">
                                      <i className="bi bi-briefcase-fill model-job-icons"></i>
                                    </div>
                                    <div className="contSect">
                                      <span>
                                        {item?.noOfJobsCompleted} Jobs Completed
                                      </span>
                                    </div>
                                  </div>
                                </>
                              )}
                              {item?.profession && (
                                <>
                                  <div className="talent-details-wrapper nweAlign pt-1 pb-0">
                                    <div className="logo-fill-briefcase">
                                      <i className="bi bi-person-workspace model-job-icons"></i>
                                    </div>
                                    <div className="contSect">
                                      <span>{item?.profession[0]?.value}</span>
                                    </div>
                                  </div>
                                </>
                              )}
                              <span className="job-company_dtls nweAlign pt-2 d-flex">
                                <i className="bi bi-geo-alt-fill location-icon model-job-icons"></i>
                                <span>
                                  {item?.childCity && <>{item.childCity}</>}
                                  {item?.parentState && item?.childCity && (
                                    <>, </>
                                  )}
                                  {item?.parentState && <>{item.parentState}</>}
                                  {item?.parentCountry &&
                                    (item?.childCity || item?.parentState) && (
                                      <>, </>
                                    )}
                                  {item?.parentCountry && (
                                    <>{item.parentCountry}</>
                                  )}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                
              </div>
            </div>
          </>
        )} */}
        {/* {visibleCount < talentList.length && (
                  <div className="find-more wraper">
                    <div onClick={() => handleReadMore()} className="moreBtn">
                      Find More
                    </div>
                  </div>
                )} */}

        <div className="productsWraper wraper secSpac">
          <div className="container">
            <div className="title">Products and Services</div>
            <div className="row">
              {productServicesList.map((service, index) => (
                <div className="col-md-4">
                  <div className="card-wrapper">
                    <div className="card-picture">
                      <img
                        className="product-service-image"
                        src={service?.icon}
                      ></img>
                    </div>
                    <div className="card-title">{service?.title}</div>
                    <div className="cards-description">
                      {service?.description[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="web-carousel">
          <WebSlider successStories={successStoryList} />
        </div>
        <div className="mobile-carousel">
          <MobileSlider successStories={successStoryList} />
        </div>

        <div className="secSpac logoWraper wraper my-4">
          <div className="container">
            <div className="title brands-row-title">{contentsList?.title5}</div>
            <div className="brands-section">
              {brandLogosList &&
                brandLogosList.map((logo, index) => (
                  <>
                    <div className="logospc">
                      <img src={logo?.url}></img>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>

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
                    <h3> Rate {modalData?.preferredChildFirstname}</h3>
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

        <Footer />
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Dashboard;
