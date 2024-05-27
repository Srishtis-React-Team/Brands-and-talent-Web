import React, { useEffect, useState } from "react";
import "../assets/css/findcreators.css";
import "../assets/css/talent-profile.css";
import "../assets/css/dashboard.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
import { useLocation } from "react-router-dom";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import PhotosCarousel from "./PhotosCarousel.js";
import CardCarousel from "./CardCarousel.js";
import ServicesCarousel from "./ServicesCarousel.js";
import TalentHeader from "../layout/TalentHeader.js";
import PdfModal from "../components/PdfModal.js";
import Select from "react-select";
import Button from "@mui/material/Button";
import BrandHeader from "../brand/pages/BrandHeader.js";

const TalentProfile = () => {
  // const location = useLocation();
  // const { talentData } = location.state;
  // console.log(talentData, "talentData");
  const girl1 = require("../assets/images/girl.png");
  const model = require("../assets/images/model-profile.png");
  const model1 = require("../assets/images/model1.png");
  const model2 = require("../assets/images/model2.png");
  const model3 = require("../assets/images/model3.png");
  const model4 = require("../assets/images/model4.png");
  const model5 = require("../assets/images/model5.png");
  const model6 = require("../assets/images/model6.png");
  const model7 = require("../assets/images/model7.png");
  const model8 = require("../assets/images/model8.png");
  const model9 = require("../assets/images/model9.png");
  const model10 = require("../assets/images/model10.png");
  const model11 = require("../assets/images/model11.png");
  const model12 = require("../assets/images/model12.png");
  const model13 = require("../assets/images/model13.png");
  const model14 = require("../assets/images/model14.png");
  const model15 = require("../assets/images/model15.png");
  const mapPin = require("../assets/icons/map-pin.png");
  const message = require("../assets/icons/message-circle.png");
  const share = require("../assets/icons/share-2.png");
  const plus = require("../assets/icons/plus-square.png");
  const calander = require("../assets/icons/calendar.png");
  const user = require("../assets/icons/user-plus.png");
  const pinkStar = require("../assets/icons/pink-star.png");
  const greyStar = require("../assets/icons/grey-star.png");
  const darkStar = require("../assets/icons/darkStar.png");
  const blackstar = require("../assets/icons/blackstar.png");
  const instaLogo = require("../assets/icons/social-media-icons/instagram.png");
  const xLogo = require("../assets/icons/twitter_x.png");
  const userFill = require("../assets/icons/userFill.png");
  const mapFill = require("../assets/icons/mapFill.png");
  const checkShield = require("../assets/icons/check-shield.png");
  const whitePlus = require("../assets/icons/whitePlus.png");
  const white_star = require("../assets/icons/white_star.png");
  const check = require("../assets/icons/check.png");
  const fbIcon = require("../assets/icons/facebook logo_icon.png");
  const linkdin = require("../assets/icons/linkdin_icon.png");
  const twitterLogo = require("../assets/icons/twitterLogo.png");
  const youtubeLogo = require("../assets/icons/youtubeLogo.png");
  const threadLogo = require("../assets/icons/threadLogo.png");
  const tiktok = require("../assets/icons/tiktok_social media_icon.png");
  const blueShield = require("../assets/icons/blue-shield.png");
  const greenTickCircle = require("../assets/icons/grey-filled-circle.png");
  const elipsis = require("../assets/icons/elipsis.png");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState();
  const [showModal, setShowModal] = useState(false);
  const pdfUrl =
    "https://hybrid.sicsglobal.com/project/brandsandtalent/backend/uploads/72e654db-4dd1-4663-89d8-52db0df93ca4.pdf";
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [portofolio, showPortofolio] = useState(true);
  const [services, showServices] = useState(false);
  const [photos, showPhotos] = useState(false);
  const [videos, showVideos] = useState(false);
  const [features, showFeatures] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [CV, showCV] = useState(false);
  const [test, setTest] = useState("");
  const [data, setData] = useState([]);
  const [talentData, setTalentData] = useState([]);
  const [photosList, setPhotosList] = useState([]);
  const [videoAudioList, setVideoAudioList] = useState([]);
  const [featuresList, setFeaturesList] = useState([]);
  const [cvList, setCvList] = useState([]);
  const [allJobsList, setAllJobsList] = useState([]);
  const [brandId, setBrandId] = useState(null);
  const [brandImage, setBrandImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [jobTitleError, setjobTitleError] = useState(false);
  const [currentUser_type, setCurrentUserType] = useState("");
  const [comments, setComments] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  useEffect(() => {
    setCurrentUserType(localStorage.getItem("currentUserType"));
  }, []);
  useEffect(() => {
    console.log(currentUser_type, "currentUser_type header");
  }, [currentUser_type]);

  const location = useLocation();
  const selectedTalent = location.state && location.state.talentData;

  console.log(selectedTalent, "selectedTalent");

  const url = window.location.href;
  const queryString = url.split("?")[1];
  console.log(" queryString:", queryString);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    if (selectedTalent?._id) {
      getTalentById();
      fetchPhotos();
      fetchVideoAudios();
      fetchFeatures();
      fetchCV();
    }
  }, [selectedTalent]);

  useEffect(() => {
    console.log(photosList, "photosList");
  }, [photosList]);
  useEffect(() => {
    console.log(videoAudioList, "videoAudioList");
  }, [videoAudioList]);
  useEffect(() => {
    console.log(featuresList, "featuresList");
  }, [featuresList]);
  useEffect(() => {
    console.log(cvList, "cvList");
  }, [cvList]);

  const fetchPhotos = async () => {
    await ApiHelper.post(
      `${API.unifiedDataFetch}${
        selectedTalent?._id ? selectedTalent?._id : queryString
      }/1`
    )
      .then((resData) => {
        console.log(resData, "resData photos");
        if (resData.data.status === true) {
          if (resData.data.data) {
            setPhotosList(resData.data.data);
          }
          console.log(photosList, "photosList");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchVideoAudios = async () => {
    await ApiHelper.post(
      `${API.unifiedDataFetch}${
        selectedTalent?._id ? selectedTalent?._id : queryString
      }/2`
    )
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
  const fetchFeatures = async () => {
    await ApiHelper.post(
      `${API.unifiedDataFetch}${
        selectedTalent?._id ? selectedTalent?._id : queryString
      }/4`
    )
      .then((resData) => {
        console.log(resData, "resData features");
        if (resData.data.status === true) {
          setFeaturesList(resData.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchCV = async () => {
    await ApiHelper.post(
      `${API.unifiedDataFetch}${
        selectedTalent?._id ? selectedTalent?._id : queryString
      }/3`
    )
      .then((resData) => {
        console.log(resData, "resData cv");
        if (resData.data.status === true) {
          setCvList(resData.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTalentById = async () => {
    await ApiHelper.post(
      `${API.getTalentById}${
        selectedTalent?._id ? selectedTalent?._id : queryString
      }`
    )
      .then((resData) => {
        if (resData) {
          console.log(resData, "resData talentDataProfile");
          setTalentData(resData.data.data);
          console.log(resData.data.data, "resData.data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(talentData, "talentDataProfile");
  }, [talentData]);

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
    setBrandImage(localStorage.getItem("currentUserImage"));
    console.log(brandId, "brandId");
    console.log(brandImage, "brandImage");
    if (brandId && brandId != null) {
      getAllJobs(brandId);
    }
  }, [brandId, brandImage]);

  const getAllJobs = async (id) => {
    await ApiHelper.get(`${API.getBrandPostedJobsByID}${id}`)
      .then((resData) => {
        console.log(resData.data.data, "getJobsList");
        if (resData.data.status === true) {
          if (resData.data.data) {
            setAllJobsList(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    console.log(e, "selectedJobID");
    setSelectedJob(e?.value);
  };

  const inviteToApply = async () => {
    const formData = {
      talentId: talentData?._id,
      brandId: brandId,
      gigId: selectedJob,
      comment: comments,
    };
    await ApiHelper.post(`${API.inviteTalentToApply}`, formData)
      .then((resData) => {
        if (resData) {
          setTalentData(resData.data.data);
          console.log(resData.data.data, "resData.data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleView = (imageUrl) => {
    let viewImage = `${API.userFilePath}${imageUrl?.fileData}`;
    window.open(viewImage, "_blank");
  };

  const reviewsList = [
    {
      date: "23 Nov 2023",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed auctor velit, ut lacinia ante. Etiam eget nunc bibendum...",
      rating: [4],
      reviewer_name: "Sanjay Manuel",
    },
    {
      date: "23 Nov 2023",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed auctor velit, ut lacinia ante. Etiam eget nunc bibendum...",
      rating: [4],
      reviewer_name: "Sanjay Manuel",
    },
  ];

  function handleForms(e) {
    setTest("features set");
    if (e == "services") {
      showServices(true);
    } else {
      showServices(false);
    }
    if (e == "portofolio") {
      showPortofolio(true);
    } else {
      showPortofolio(false);
    }
    if (e == "photos") {
      showPhotos(true);
    } else {
      showPhotos(false);
    }
    if (e == "videos") {
      showVideos(true);
    } else {
      showVideos(false);
    }
    if (e == "features") {
      showFeatures(true);
    } else {
      showFeatures(false);
    }
    if (e == "reviews") {
      setReviews(true);
    } else {
      setReviews(false);
    }
    if (e == "CV") {
      showCV(true);
    } else {
      showCV(false);
    }
  }

  const [selectedPDF, setSelectedPDF] = useState(null);

  const openPDFModal = (pdfSrc) => {
    setSelectedPDF(pdfSrc);
    const modal = document.getElementById("pdfModal");
    modal.classList.add("show");
    modal.style.display = "block";
    document.body.classList.add("modal-open");
  };

  const closePDFModal = () => {
    setSelectedPDF(null);
    const modal = document.getElementById("pdfModal");
    modal.classList.remove("show");
    modal.style.display = "none";
    document.body.classList.remove("modal-open");
  };
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      {/* <Header /> */}
      {currentUser_type == "brand" && <BrandHeader toggleMenu={toggleMenu} />}
      {currentUser_type == "talent" && <TalentHeader toggleMenu={toggleMenu} />}

      <section>
        <div className="popular-header">
          <div className="header-title">Profile</div>
          <div className="header-menu">
            <div>Home</div>
            <div>Talents</div>
            <div>Profile</div>
          </div>
        </div>
      </section>

      <div className="talent-profile-main">
        <div className="talent-wrapper">
          <div className="talent-backdrop">
            <img className="talent-img-backdrop" src={model9}></img>
            <img
              className="talent-img"
              src={`${API.userFilePath}${talentData?.image?.fileData}`}
            ></img>
            {/* <div className="talent-status">
              <span>
                <img src={blackstar}></img>
              </span>
              <span>Pro</span>
            </div> */}
          </div>
          <div className="individual-talents-details">
            <div className="individual-talent-name">
              <div className="model-name">{`${talentData?.preferredChildFirstname} ${talentData?.preferredChildLastName}`}</div>
              <div className="talent-verified">
                <span className="blue-shield-wrapper">
                  <img className="blue-shield" src={blueShield}></img>
                </span>
                Verified
              </div>
            </div>
            <div className="talent-details">
              <div className="talent-details-wrapper">
                <div className="logo-fill">
                  <img className="talent-logo" src={pinkStar}></img>
                </div>
                <span>5.0 (45 jobs completed)</span>
              </div>
              <div className="talent-details-wrapper">
                <div className="logo-fill">
                  <img className="talent-logo" src={mapFill}></img>
                </div>
                <span>Lorem ipsum dolor sit</span>
              </div>
              <div className="talent-details-wrapper">
                <div className="logo-fill">
                  <img className="talent-logo" src={userFill}></img>
                </div>
                {talentData &&
                  talentData.profession &&
                  talentData.profession.map((item, index) => (
                    <span key={index}>{item.value}</span>
                  ))}
              </div>
            </div>
            <div className="talents-social-wrapper mt-4">
              <div className="talents-social">
                <img src={instaLogo}></img>
                <div className="social-followers-count-section">
                  <div className="social-count">
                    {talentData?.instaFollowers
                      ? talentData.instaFollowers
                      : "N/A"}
                  </div>
                  <div className="followers-text">Followers</div>
                </div>
              </div>
              <div className="talents-social">
                <img src={fbIcon}></img>
                <div className="social-followers-count-section">
                  <div className="social-count">
                    {talentData?.facebookFollowers
                      ? talentData.facebookFollowers
                      : "N/A"}
                  </div>
                  <div className="followers-text">Followers</div>
                </div>
              </div>
              <div className="talents-social">
                <img src={tiktok}></img>
                <div className="social-followers-count-section">
                  <div className="social-count">
                    {talentData?.tiktokFollowers
                      ? talentData.tiktokFollowers
                      : "N/A"}
                  </div>
                  <div className="followers-text">Followers</div>
                </div>
              </div>
              <div className="talents-social">
                <img src={linkdin}></img>
                <div className="social-followers-count-section">
                  <div className="social-count">
                    {talentData?.linkedinFollowers
                      ? talentData.linkedinFollowers
                      : "N/A"}
                  </div>
                  <div className="followers-text">Followers</div>
                </div>
              </div>
              <div className="talents-social">
                <img src={twitterLogo}></img>

                <div className="social-followers-count-section">
                  <div className="social-count">
                    {talentData?.twitterFollowers
                      ? talentData.twitterFollowers
                      : "N/A"}
                  </div>
                  <div className="followers-text">Followers</div>
                </div>
              </div>
              <div className="talents-social">
                <img src={threadLogo}></img>

                <div className="social-followers-count-section">
                  <div className="social-count">
                    {talentData?.threadsFollowers
                      ? talentData.threadsFollowers
                      : "N/A"}
                  </div>
                  <div className="followers-text">Followers</div>
                </div>
              </div>
              <div className="talents-social">
                <img src={youtubeLogo}></img>

                <div className="social-followers-count-section">
                  <div className="social-count">
                    {talentData?.youtubeFollowers
                      ? talentData.youtubeFollowers
                      : "N/A"}
                  </div>
                  <div className="followers-text">Followers</div>
                </div>
              </div>
            </div>

            {currentUser_type === "brand" && (
              <>
                <div
                  className="invite-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <img src={whitePlus}></img>
                  <div>Invite to apply</div>
                </div>
                <div className="message-now">
                  <img src={message}></img>
                  <div className="message-now-text">Message Now</div>
                </div>
              </>
            )}

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-lg signupModal">
                <div className="modal-content ">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="modal-title " style={{ fontSize: "18px" }}>
                      Invite {talentData?.preferredChildFirstname}
                      {talentData?.preferredChildLastName} to Apply to your Job
                    </div>

                    <div className="select-job-invite mt-4">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                      >
                        Select Job to invite<span className="mandatory">*</span>
                      </label>
                      <Select
                        placeholder="Select Job to invite"
                        options={allJobsList.map((job) => ({
                          value: job._id, // or whatever unique identifier you want to use
                          label: job.jobTitle,
                          type: job?.type,
                        }))}
                        onChange={handleChange}
                        isSearchable={true}
                      />
                      {jobTitleError && (
                        <div className="invalid-fields">
                          Please enter job Title
                        </div>
                      )}

                      <div className="mb-3 mt-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          Comments (Optional)
                        </label>
                        <textarea
                          style={{ width: "500px" }}
                          className="form-control address-textarea"
                          id="exampleFormControlTextarea1"
                          value={comments}
                          rows="3"
                          onChange={(e) => {
                            setComments(e.target.value);
                          }}
                        ></textarea>
                      </div>
                    </div>

                    <div className="register-modal mt-3">
                      <Button
                        onClick={(e) => {
                          inviteToApply();
                        }}
                        className="edit-profileimg-btn"
                        variant="text"
                        style={{ textTransform: "capitalize" }}
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Invite Talent
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="talent-rates">
              <div className="title">
                {`${talentData?.preferredChildFirstname} ${talentData?.preferredChildLastName}`}{" "}
                Rates
              </div>
              {talentData &&
                talentData.profession &&
                talentData.profession.map((item, index) => (
                  <>
                    <div key={index}>
                      <div className="talent-profession-name">
                        {item?.value} <span>(Rates Are Negotiable)</span>
                      </div>
                      <div className="talent-profession-value">
                        $ {item?.perHourSalary} per hour{" "}
                      </div>
                      <div className="talent-profession-value">
                        $ {item?.perDaySalary} per day
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
        <div className="talent-info-section">
          <div className="talent-info-wrapper">
            <div className="bio-wrapper">
              <div className="bio-text">Bio</div>

              {talentData?.childAboutYou?.map((htmlContent, index) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              ))}

              {/* <div className="bio-info">
                dangerouslySetInnerHTML={{ __html: talentData?.childAboutYou }}
              </div> */}
            </div>

            <div className="individual-talent-tabs">
              <div
                className={
                  portofolio
                    ? "individual-talent-tab-first-active-tab  individual-talent-tab-first"
                    : "individual-talent-tab-first"
                }
                onClick={(e) => {
                  handleForms("portofolio");
                }}
              >
                Home
              </div>
              <div
                className={
                  photos
                    ? "active-tab individual-talent-tab"
                    : "individual-talent-tab"
                }
                onClick={(e) => {
                  handleForms("photos");
                }}
              >
                Portofolio
              </div>
              <div
                className={
                  services
                    ? "active-tab individual-talent-tab"
                    : "individual-talent-tab"
                }
                onClick={(e) => {
                  handleForms("services");
                }}
              >
                Services
              </div>

              <div
                className={
                  videos
                    ? "active-tab individual-talent-tab"
                    : "individual-talent-tab"
                }
                onClick={(e) => {
                  handleForms("videos");
                }}
              >
                Videos & Audios
              </div>
              <div
                className={
                  features
                    ? "active-tab individual-talent-tab"
                    : "individual-talent-tab"
                }
                onClick={(e) => {
                  handleForms("features");
                }}
              >
                Features
              </div>
              <div
                className={
                  reviews
                    ? "active-tab individual-talent-tab"
                    : "individual-talent-tab"
                }
                onClick={(e) => {
                  handleForms("reviews");
                }}
              >
                Reviews
              </div>
              <div
                className={
                  CV
                    ? "active-tab individual-talent-tab"
                    : "individual-talent-tab"
                }
                onClick={(e) => {
                  handleForms("CV");
                }}
              >
                CV
              </div>
            </div>

            <div className="talent-all-details-wrapper">
              {portofolio && (
                <>
                  <div className="portofolio-section">
                    <div className="portofolio-title">Portofolio</div>
                    <div
                      className="view-all"
                      onClick={(e) => {
                        handleForms("photos");
                      }}
                    >
                      View All
                    </div>
                  </div>
                  <div className="photos-slider">
                    {photosList && photosList.length > 0 && (
                      <PhotosCarousel photosList={photosList} />
                    )}
                  </div>
                  <div className="portofolio-section">
                    <div className="portofolio-title">Social media posts</div>
                    <div className="view-all">View All</div>
                  </div>
                  <CardCarousel />
                  <div className="portofolio-section">
                    <div className="portofolio-title">Reviews</div>
                    <div className="view-all">View All</div>
                  </div>
                  <div className="reviews-section">
                    <div className="rating-talent">
                      <div className="num">4.5</div>
                      <img src={white_star}></img>
                    </div>
                    <div className="content">
                      <div className="title">
                        Studio Shoot for Unrecognisable Ecommerce
                      </div>
                      <div className="description">
                        Kate is a delight to work with, beautiful both punctual
                        & professional. She knew exactly what was required and
                        everything was effortless.
                      </div>
                    </div>
                    <div className="booked-btn">
                      <div className="wrapper">
                        <img src={check}></img>
                      </div>
                      <div className="posted-jobs">24 Jobs Booked</div>
                    </div>
                  </div>

                  <ServicesCarousel talentData={talentData} />

                  <div className="portofolio-section">
                    <div className="portofolio-title">Videos & Audios</div>
                    <div className="view-all">View All</div>
                  </div>

                  <div className="service-list-main">
                    {videoAudioList.map((item) => (
                      <div className="item model-picture-wrapper" key={item.id}>
                        {item.type === "video" && (
                          <video className="video-style " controls>
                            <source
                              src={`${API.userFilePath}${item.fileData}`}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        )}
                        {item.type === "audio" && (
                          <audio controls>
                            <source
                              src={`${API.userFilePath}${item.fileData}`}
                              type="audio/mp3"
                            />
                            Your browser does not support the audio tag.
                          </audio>
                        )}
                        <p>{item.title}</p>
                      </div>
                    ))}
                  </div>

                  <div className="portofolio-section">
                    <div className="portofolio-title">CV</div>
                    <div className="view-all">View All</div>
                  </div>

                  <div className="cvlist-wrapper">
                    {cvList.map((pdf) => {
                      console.log(pdf, "pdf");
                      return (
                        <>
                          <>
                            <div className="cv-card" key={pdf.title}>
                              <i className="fa-solid fa-file"></i>
                              <div className="fileName">{pdf.title}</div>
                              <button
                                className="view-cv"
                                onClick={() => handleView(pdf)}
                              >
                                View
                              </button>
                              {/* {showModal && (
                                <PdfModal
                                  pdfUrl={`${API.userFilePath}${pdf?.fileData}`}
                                  onHide={() => setShowModal(false)}
                                />
                              )} */}
                            </div>
                          </>
                        </>
                      );
                    })}
                  </div>
                </>
              )}
              {photos && (
                <div className="models-photos">
                  <section className="photos-gallery">
                    {photosList &&
                      photosList.map((image, index) => {
                        console.log(image, "image");
                        return (
                          <>
                            <div className="photos-gallery-image" key={index}>
                              <img
                                className=""
                                src={`${API.userFilePath}${image}`}
                                alt=""
                              />
                            </div>
                          </>
                        );
                      })}
                  </section>
                </div>
              )}
              {videos && (
                <div className="models-photos">
                  {/* {videoAudioList.map((item, index) => {
                  return (
                    <div className="model-picture-wrapper" key={index}>
                      <img
                        className="model-picture"
                        src={`${API.userFilePath}${item}`}
                      ></img>
                    </div>
                  );
                })} */}

                  {videoAudioList.map((item) => (
                    <div className="item model-picture-wrapper" key={item.id}>
                      {item.type === "video" && (
                        <video className="video-style" controls>
                          <source
                            src={`${API.userFilePath}${item.fileData}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      )}
                      {item.type === "audio" && (
                        <audio controls>
                          <source
                            src={`${API.userFilePath}${item.fileData}`}
                            type="audio/mp3"
                          />
                          Your browser does not support the audio tag.
                        </audio>
                      )}
                      <p>{item.title}</p>
                    </div>
                  ))}
                </div>
              )}
              {services && (
                <>
                  <ServicesCarousel talentData={talentData} />
                </>
              )}
              {features && (
                <>
                  <div className="table-container">
                    <table>
                      <tbody>
                        <tr>
                          <td className="left-column">
                            <table>
                              <tbody>
                                {featuresList
                                  ?.slice(
                                    0,
                                    Math.ceil(featuresList?.length / 2)
                                  )
                                  .map((feature, index) => (
                                    <tr key={feature.label}>
                                      <td>{feature.label}</td>
                                      <td>{feature.value}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </td>
                          <td className="right-column">
                            <table>
                              <tbody>
                                {featuresList
                                  ?.slice(Math.ceil(featuresList?.length / 2))
                                  .map((feature, index) => (
                                    <tr key={feature.label}>
                                      <td>{feature.label}</td>
                                      <td>{feature.value}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              {CV && (
                <div>
                  {cvList.map((pdf) => {
                    return (
                      <>
                        <>
                          <div className="cv-card" key={pdf.title}>
                            <i className="fa-solid fa-file"></i>
                            <div className="fileName">{pdf.title}</div>
                            <button
                              className="view-cv"
                              onClick={() => handleView(pdf)}
                            >
                              View PDF
                            </button>
                            {/* {showModal && (
                              <PdfModal
                                pdfUrl={`${API.userFilePath}${pdf?.fileData}`}
                                onHide={() => setShowModal(false)}
                              />
                            )} */}
                          </div>
                        </>
                      </>
                    );
                  })}
                </div>
              )}
              {reviews && (
                <div className="model-reviews">
                  {reviewsList?.map((item, index) => {
                    return (
                      <div className="model-review-wrapper" key={index}>
                        <div className="review-date">{item.date}</div>
                        <div className="review-title">{item.title}</div>
                        <div className="review-content">{item.description}</div>
                        <div className="reviewer-section">
                          <div className="reviewers-rating">
                            {item.rating.map((item, index) => {
                              return <img key={index} src={pinkStar}></img>;
                            })}
                          </div>
                          <div className="reviewer-details">
                            <div className="initial center">S</div>
                            <div className="reviewer-name">
                              {item.reviewer_name}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="find-more">
        <div>Find More</div>
      </div>

      <Footer />
    </>
  );
};

export default TalentProfile;

{
  /* <div className="model-profile">
        <div>
          <img className="modal-profile-img" src={model}></img>
        </div>
        <div className="model-details">
          <div className="model-infos">Professional model</div>
          <div className="model-location">
            <div>
              <img src={mapPin}></img>
            </div>
            <div className="location-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
          <div className="models-options">
            <div className="share-wrapper center">
              <img className="share-icon" src={share}></img>
            </div>
            <div className="message-wrapper">
              <img src={message}></img>
              <span>Message</span>
            </div>
            <div className="reserve-background">
              <img src={plus}></img>
              <span className="text-span">Reserve</span>
            </div>
            <div className="reserve-background invite">
              <img src={calander}></img>
              <span className="text-span">Invite to Casting</span>
            </div>
            <div className="reserve-background follow">
              <img src={user}></img>
              <span className="text-span">Follow</span>
            </div>
          </div>
          <div className="models-social-counts">
            <span className="count-wrapper">
              Views <span>11863</span>
            </span>
            <span className="count-wrapper">
              Followers <span>77</span>Followers <span>77</span>
            </span>
            <span className="count-wrapper">
              Last login<span> More than 3 months</span>
            </span>
          </div>
        </div>
      </div> */
}
