import React, { useEffect, useState, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import PopUp from "../components/PopUp.js";
import Axios from "axios";
const TalentDashBoard = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const offcanvasRef = useRef(null); // Reference to the offcanvas element
  const [gigsList, setGigsList] = useState([]);
  const [topBrandsList, setTopBrandsList] = useState([]);
  const [isFilled, setIsFilled] = useState(true);
  const [featuresList, setFeaturesList] = useState([]);
  const [features, setFeature] = useState([]);
  const [profileFile, setProfileFile] = useState(null);

  const girl1 = require("../assets/images/girl1.png");
  const btLogo = require("../assets/icons/Group 56.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const adultsBanner = require("../assets/images/adultsBanner.png");
  const doitnow = require("../assets/images/doitnow.png");
  const headsetLogo = require("../assets/icons/headset.png");
  const user = require("../assets/icons/user-only.png");
  const genderIcon = require("../assets/icons/gender.png");
  const map = require("../assets/icons/map-pin.png");
  const uploadIcon = require("../assets/icons/uploadIcon.png");
  const imageType = require("../assets/icons/imageType.png");
  const videoType = require("../assets/icons/videoType.png");
  const audiotype = require("../assets/icons/audiotype.png");
  const idCard = require("../assets/icons/id-card.png");
  const elipsis = require("../assets/icons/elipsis.png");
  const greenTickCircle = require("../assets/icons/small-green-tick.png");
  const fbLogo = require("../assets/icons/social-media-icons/fbLogo.png");
  const instagram = require("../assets/icons/social-media-icons/instagram.png");
  const threads = require("../assets/icons/social-media-icons/thread-fill.png");
  const tikTok = require("../assets/icons/social-media-icons/tikTok.png");
  const xTwitter = require("../assets/icons/social-media-icons/xTwitter.png");
  const youTube = require("../assets/icons/social-media-icons/youTube.png");
  const linkdin = require("../assets/icons/social-media-icons/linkdin.png");
  const docsIcon = require("../assets/icons/docsIcon.png");
  const [paramsValue, setParamsValue] = useState("");
  const location = useLocation();
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [portofolioFile, setPortofolioFile] = useState([]);
  const [resumeFile, setResumeFile] = useState([]);
  const [videoAUdioFile, setVideoAudioFile] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const [adultsPreferedFirstName, setAdultsPreferedFirstName] = useState("");
  const [adultsPreferedLastName, setAdultsPreferedLastName] = useState("");
  const [adultsLegalFirstName, setAdultsLegalFirstName] = useState("");
  const [adultsLegalLastName, setAdultsLegalLastName] = useState("");
  const [adultsPhone, setAdultsPhone] = useState("");
  const [adultsEmail, setAdultsEmail] = useState("");
  const [adultsLocation, setAdultsLocation] = useState("");
  const [adultsCity, setAdultsCity] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [nationality, setNationality] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [languages, setLanguages] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [kidsEmail, setKidsEmail] = useState("");
  const [aboutYou, setAboutYou] = useState([]);
  const [instagramFollowers, setInstagramFollowers] = useState("");
  const [facebookFollowers, setfacebookFollowers] = useState("");
  const [xtwitterFollowers, setXtwitterFollowers] = useState("");
  const [linkedinFollowers, setlinkedinFollowers] = useState("");
  const [threadsFollowers, setThreadsFollowers] = useState("");
  const [tiktoksFollowers, setTiktoksFollowers] = useState("");
  const [youtubesFollowers, setYoutubesFollowers] = useState("");
  const [idType, setIdType] = useState("");
  const [verificationID, setVerificationID] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [userId, setUserId] = useState(null);

  const url = window.location.href;
  const queryString = url.split("?")[1];
  console.log(" queryString:", queryString);

  useEffect(() => {
    const offcanvas = new window.bootstrap.Offcanvas(offcanvasRef.current);
    offcanvasRef.current.addEventListener("hidden.bs.offcanvas", () => {
      setIsMenuOpen(false);
    });
    getRecentGigs();
    getTopBrands();
    const storedUserId = localStorage.getItem("userId");
    console.log(storedUserId, "storedUserId");
    setUserId(storedUserId);

    if (userId) {
      checkProfileStatus();
    }
  }, [userId]);

  const checkProfileStatus = async () => {
    await ApiHelper.post(`${API.checkProfileStatus}${queryString}`)
      .then((resData) => {
        if (resData.data.profileStatus === false) {
          openDoItNowModal();
        }
        console.log("checkProfileStatus", resData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRecentGigs = async () => {
    await ApiHelper.get(API.getRecentGigs)
      .then((resData) => {
        if (resData) {
          setGigsList(resData.data.data);
        }
        console.log("gigsList", resData.data.data);
        console.log("gigsList", gigsList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTopBrands = async () => {
    await ApiHelper.post(API.getTopBrands)
      .then((resData) => {
        if (resData) {
          setTopBrandsList(resData.data.data);
        }
        console.log("topBrandsList", resData.data.data);
        console.log("topBrandsList", topBrandsList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMenu = () => {
    const offcanvas = new window.bootstrap.Offcanvas(offcanvasRef.current);
    if (!isMenuOpen) {
      offcanvas.show(); // Open offcanvas when menu is closed
    } else {
      offcanvas.hide(); // Close offcanvas when menu is open
    }
  };

  const closeMenu = () => {
    const offcanvas = offcanvasRef.current;
    if (offcanvas) {
      const offcanvasInstance = window.bootstrap.Offcanvas.getInstance(
        offcanvas
      );
      offcanvasInstance.hide(); // Close offcanvas
    }
  };
  const openSignup = () => {
    closeDoItNowModal();
    setTimeout(() => {
      navigate(`/adult-signup-basic-details`);
    }, 800);
  };

  // Define refs for the modals
  const doItNowRef = useRef(null);
  const adultsSignupRef = useRef(null);
  const openDoItNowModal = () => {
    const modal = new window.bootstrap.Modal(doItNowRef.current);
    modal.show();
  };

  // Function to close the "doItNow" modal
  const closeDoItNowModal = () => {
    const modal = new window.bootstrap.Modal(doItNowRef.current);
    modal.hide();
  };

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} />
      <div
        ref={doItNowRef}
        className="modal fade"
        id="verify_age"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body talent-popup-body">
              <div className="doitnow-main">
                <div className="doit-one">
                  <div className="talent-popup-title">
                    Welcome To Brands And Talent
                  </div>
                  <div className="talent-popup-enter">
                    Complete Your{" "}
                    <span className="talent-popup-span">Profile</span>
                  </div>
                  <div>
                    {/* Progress bar */}
                    <div
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: isFilled ? "20%" : "0%",
                          backgroundColor: "#c2114b",
                          height: "8px",
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="talent-popup-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    repellat corporis corrupti aliquid laboriosam neque ratione
                    fuga. <br></br>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </div>
                </div>
                <div className="doit-two">
                  <img src={doitnow} alt="" />
                </div>
              </div>
            </div>
            <div className="doitnow">
              <div
                className="doit-btn"
                onClick={() => {
                  openSignup();
                }}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Update Profile Now
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid my-4">
        <div className="row justify-content-center">
          <div className="talent-column-one col-lg-8">
            <div className="recent-gigs-title">Most Recent Gigs</div>
            {gigsList.length && (
              <div className="recent-gigs-main">
                {gigsList.map((item, index) => {
                  return (
                    <>
                      <div className="recent-gigs-wrapper">
                        <div className="recent-setone">
                          <div className="recent-img-div">
                            <img
                              className="recent-img"
                              src={API.userFilePath + item.image}
                              alt=""
                            />
                          </div>
                          <div className="recent-gig-details">
                            <div className="recent-gig-company">
                              {item.companyName}
                            </div>
                            <div className="recent-gig-name">{item.title}</div>
                            <div className="recent-gig-description">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <div className="recent-settwo">
                          <div className="recent-gigs-count-wrapper">
                            <div className="recent-gigs-logo">
                              <img src={user} alt="" />
                            </div>
                            <div className="recent-gig-count-details">
                              <div className="recent-gig-name">Followers</div>
                              <div className="recent-gigs-count">
                                {item.followers}
                              </div>
                            </div>
                          </div>
                          <div className="recent-gigs-count-wrapper">
                            <div className="recent-gigs-logo">
                              <img src={user} alt="" />
                            </div>
                            <div className="recent-gig-count-details">
                              <div className="recent-gig-name">Age</div>
                              <div className="recent-gigs-count">
                                {item.age}
                              </div>
                            </div>
                          </div>
                          <div className="recent-gigs-count-wrapper">
                            <div className="recent-gigs-logo">
                              <img src={genderIcon} alt="" />
                            </div>
                            <div className="recent-gig-count-details">
                              <div className="recent-gig-name">Gender</div>
                              <div className="recent-gigs-count">
                                {item.gender}
                              </div>
                            </div>
                          </div>
                          <div className="recent-gigs-count-wrapper">
                            <div className="recent-gigs-logo">
                              <img src={map} alt="" />
                            </div>
                            <div className="recent-gig-count-details">
                              <div className="recent-gig-name">Location</div>
                              <div className="recent-gigs-count">
                                {item.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
          </div>
          <div className="talent-column-two col-lg-3">
            <div className="contact-section-main">
              <div className="contact-wrapper">
                <div className="contact-logo">
                  <img src={headsetLogo} alt="" />
                </div>
                <p className="contact-q">Seeking Assistance?</p>
                <div className="contact-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti, voluptatum labore aspernatur at temporibus
                </div>
                <div className="contact-btn">Contact Now</div>
              </div>
              <div className="top-brands-section">
                <div className="top-brands-title">Top Brands</div>
                <div className="view-all-brands">View All</div>
              </div>
              {topBrandsList.length && (
                <div className="top-brands-main">
                  {topBrandsList.map((item, index) => {
                    return (
                      <>
                        <div className="top-brands-wrapper">
                          <div className="top-brand-img-wrapper">
                            <img
                              className="top-brand-img"
                              src={API.userFilePath + item.brandImage}
                              alt=""
                            />
                          </div>
                          <div className="top-brands-name">
                            {item.brandName}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas-body">
        <div
          className={`offcanvas offcanvas-start side-menu ${
            isMenuOpen ? "show" : ""
          }`}
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
          ref={offcanvasRef} // Assign ref to the offcanvas element
          style={{ visibility: isMenuOpen ? "visible" : "hidden" }}
        >
          <div className="sidemnu-close">
            <button
              type="button"
              className="btn-close text-reset"
              onClick={closeMenu}
            ></button>
          </div>
          <div className="sidemenu-main">
            <div className="talent-profile">
              <div className="talent-data-wrapper">
                <img className="profile-img" src={girl1} alt="" />
                <div className="talent-details">
                  <div className="talent-name">Elizabeth</div>
                  <div className="talent-category">Talent</div>
                </div>
              </div>
              <div className="talents-plan-info">
                <div className="talent-plan-name">
                  Plan : <span>Basic</span>
                </div>
                <div className="talent-plan-name">
                  campaigns : <span>0</span>
                </div>
              </div>
              <div className="upgrade-btn">Upgrade Now</div>
            </div>
          </div>
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default TalentDashBoard;
