import React, { useEffect, useState } from "react";
import "../assets/css/findcreators.css";
import "../assets/css/talent-profile.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
import { useLocation } from "react-router-dom";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import PhotosCarousel from "./PhotosCarousel.js";
import CardCarousel from "./CardCarousel.js";
import ServicesCarousel from "./ServicesCarousel.js";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import sample from "./sample.pdf";

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
  const instaLogo = require("../assets/icons/insta.png");
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

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [portofolio, showPortofolio] = useState(true);
  const [photos, showPhotos] = useState(false);
  const [videos, showVideos] = useState(false);
  const [features, showFeatures] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [bio, showBio] = useState(false);
  const [test, setTest] = useState("");
  const [data, setData] = useState([]);
  const [talentData, setTalentData] = useState([]);
  const [photosList, setPhotosList] = useState([]);
  const [videoAudioList, setVideoAudioList] = useState([]);
  const [featuresList, setFeaturesList] = useState([]);
  const [cvList, setCvList] = useState([]);

  const [userId, setUserId] = useState(null);

  const location = useLocation();
  const selecteTalent = location.state && location.state.talentData;

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    if (userId) {
      getTalentById();
    }

    console.log(`${API.userFilePath}${talentData?.cv[0]?.fileData}`, "pdfurl");
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchPhotos();
      fetchVideoAudios();
      fetchFeatures();
      fetchCV();
    }
  }, [userId]);

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
    await ApiHelper.post(`${API.unifiedDataFetch}${selecteTalent._id}/1`)
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
    await ApiHelper.post(`${API.unifiedDataFetch}${selecteTalent._id}/2`)
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
    await ApiHelper.post(`${API.unifiedDataFetch}${selecteTalent._id}/4`)
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
    await ApiHelper.post(`${API.unifiedDataFetch}${selecteTalent._id}/3`)
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
    await ApiHelper.post(`${API.getTalentById}${selecteTalent._id}`)
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
    if (e == "bio") {
      showBio(true);
    } else {
      showBio(false);
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

  return (
    <>
      <Header />
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
            <div className="talent-status">
              <span>
                <img src={blackstar}></img>
              </span>
              <span>Pro</span>
            </div>
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
                <span className="insta-backdrop">
                  <img src={instaLogo}></img>
                </span>
                <span className="social-count">
                  {talentData?.instaFollowers}
                </span>
                <div className="followers-text">Followers</div>
              </div>
              <div className="talents-social">
                <img src={fbIcon}></img>
                <span className="social-count">
                  {talentData?.facebookFollowers}
                </span>
                <div className="followers-text">Followers</div>
              </div>
              <div className="talents-social">
                <img src={tiktok}></img>
                <span className="social-count">
                  {talentData?.tiktokFollowers}
                </span>
                <div className="followers-text">Followers</div>
              </div>
              <div className="talents-social">
                <img src={linkdin}></img>
                <span className="social-count">
                  {talentData?.linkedinFollowers}
                </span>
                <div className="followers-text">Followers</div>
              </div>
              <div className="talents-social">
                <img src={twitterLogo}></img>
                <span className="social-count">
                  {talentData?.twitterFollowers}
                </span>
                <div className="followers-text">Followers</div>
              </div>
              <div className="talents-social">
                <img src={threadLogo}></img>
                <span className="social-count">
                  {talentData?.threadsFollowers}
                </span>
                <div className="followers-text">Followers</div>
              </div>
              <div className="talents-social">
                <img src={youtubeLogo}></img>
                <span className="social-count">
                  {talentData?.youtubeFollowers}
                </span>
                <div className="followers-text">Followers</div>
              </div>
            </div>

            <div className="invite-btn">
              <img src={whitePlus}></img>
              <div>Invite to Job</div>
            </div>

            <div className="message-now">
              <img src={message}></img>
              <div className="message-now-text">Message Now</div>
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
                      <div className="name">{item?.value}</div>
                      <div className="value">
                        $ {item?.perHourSalary} per hour (Negotiable)
                      </div>
                      <div className="value">
                        $ {item?.perDaySalary} per day (Negotiable)
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
                Profile & Overview
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
                Photos
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
                  bio
                    ? "active-tab individual-talent-tab"
                    : "individual-talent-tab"
                }
                onClick={(e) => {
                  handleForms("bio");
                }}
              >
                CV
              </div>
            </div>

            <div className="talent-all-details-wrapper">
              {portofolio && (
                <>
                  <div className="portofolio-section">
                    <div className="portofolio-title">Photos</div>
                    <div className="view-all">View All</div>
                  </div>
                  <div className="photos-slider">
                    <PhotosCarousel talentData={talentData} />
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
                        <video controls>
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
              {bio && (
                <div>
                  {cvList.map((pdf) => {
                    return (
                      <>
                        <>
                          <div className="cv-card" key={pdf.title}>
                            <p>
                              Page {pageNumber} of {numPages}
                            </p>
                            <i class="fa-solid fa-file"></i>
                            <div className="fileName">{pdf.title}</div>
                            <button
                              className="view-cv"
                              onClick={() => handleView(pdf)}
                            >
                              View
                            </button>
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

      <Document
        file={`${API.userFilePath}${talentData?.cv[0]?.fileData}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Page pageNumber={i + 1} />
          ))}
      </Document>

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
