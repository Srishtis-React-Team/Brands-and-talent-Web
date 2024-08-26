import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsform-one.css";
import "../assets/css/forms/kidsformthree.css";
import "../assets/css/forms/login.css";
import "../assets/css/dashboard.css";
import "../assets/css/register.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { useNavigate } from "react-router";
import "../assets/css/register.css";

const KidsSocialMedias = ({ onDataFromChild, ...props }) => {
  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.png");
  console.log(onDataFromChild, "onDataFromChild");
  const fbLogo = require("../assets/icons/social-media-icons/fbLogo.png");
  const instagram = require("../assets/icons/social-media-icons/instagram.png");
  const threads = require("../assets/icons/social-media-icons/thread-fill.png");
  const tikTok = require("../assets/icons/social-media-icons/tikTok.png");
  const xTwitter = require("../assets/icons/social-media-icons/xTwitter.png");
  const youTube = require("../assets/icons/social-media-icons/youTube.png");
  const linkdin = require("../assets/icons/social-media-icons/linkdin.png");

  const [isLoading, setIsLoading] = useState(false);
  const [instagramFollowers, setInstagramFollowers] = useState("");
  const [facebookFollowers, setfacebookFollowers] = useState("");
  const [xtwitterFollowers, setXtwitterFollowers] = useState("");
  const [linkedinFollowers, setlinkedinFollowers] = useState("");
  const [threadsFollowers, setThreadsFollowers] = useState("");
  const [tiktoksFollowers, setTiktoksFollowers] = useState("");
  const [youtubesFollowers, setYoutubesFollowers] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const kidsImage = require("../assets/images/kidsImage.png");
  const paramsValues = window.location.search;
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const url = window.location.href;
  const queryString = url.split("?")[1];

  const editKids = async () => {
    const formData = {
      instaFollowers: instagramFollowers,
      tiktokFollowers: tiktoksFollowers,
      twitterFollowers: xtwitterFollowers,
      youtubeFollowers: youtubesFollowers,
      facebookFollowers: facebookFollowers,
      linkedinFollowers: linkedinFollowers,
      threadsFollowers: threadsFollowers,
    };
    setIsLoading(true);
    await ApiHelper.post(`${API.editKids}${queryString}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Updated SuccessFully!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            navigate(
              `/talent-signup-plan-details?userId=${resData.data.data["user_id"]}&userEmail=${resData.data.data["email"]}`
            );
          }, 1000);
        } else {
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleTwitterUserNameChange = (e) => {
    const value = e.target.value;
    setTwitterUserNameError(false);
    setTwitterUserName(value);
  };

  const [twitterFollowersCount, setTwitterFollowersCount] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [twitterUserName, setTwitterUserName] = useState(null);
  const [twitterUserNameError, setTwitterUserNameError] = useState(false);

  const connectSocialMedia = (item) => {
    setModalData(item);
    const modalElement = document.getElementById("socialMediaModal");
    const bootstrapModal = new window.bootstrap.Modal(modalElement);
    bootstrapModal.show();
  };

  const handleCloseModal = async (talent) => {
    const formData = {
      username: twitterUserName,
    };
    setIsLoading(true);
    await ApiHelper.post(`${API.twitterCount}`, formData)
      .then((resData) => {
        console.log(resData, "resData");
        if (resData?.data?.status === true) {
          setTwitterFollowersCount(resData?.data?.followers_count);
          setTwitterUserName("");
          setIsLoading(false);
          setMessage("Twitter Connected SuccessFully!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            const modalElement = document.getElementById("socialMediaModal");
            const bootstrapModal = new window.bootstrap.Modal(modalElement);
            bootstrapModal.hide();
          }, 2000);
        } else if (resData?.data?.status === false) {
          setTwitterUserName("");
          setMessage(resData?.data?.data);
          setOpenPopUp(true);
          setIsLoading(false);

          setTimeout(function () {
            setOpenPopUp(false);
            const modalElement = document.getElementById("socialMediaModal");
            const bootstrapModal = new window.bootstrap.Modal(modalElement);
            bootstrapModal.hide();
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err, "err");

        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(twitterFollowersCount, "twitterFollowersCount");
  }, [twitterFollowersCount]);

  return (
    <>
      <div className="form-dialog">
        <div className="header-wrapper">
          <div className="step-wrapper">
            <img
              className="modal-logo"
              onClick={() => {
                navigate("/");
              }}
              src={btLogo}
            ></img>
            <div className="step-text">Step 3 of 6</div>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              navigate("/");
            }}
          ></button>
        </div>
        <div className="dialog-body">
          <div className="kidsform-one container">
            <div className="kids-wrapper row">
              <div className="kids-img col-md-4 col-lg-3">
                <div className="fixImgs">
                  <img src={kidsImage} alt="" className="kids-image-sticky" />
                </div>
              </div>

              <div className="kids-form col-md-8 col-lg-9">
                <div className="kids-main">
                  <div className="kids-form-title">
                    <span>Explore Your Social Media Presence</span>
                  </div>
                  <div className="explore-info">
                    If you want to display your actual follower count, please
                    connect with your social media. Otherwise, manually enter
                    your followers count
                  </div>

                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img src={instagram} alt="" />
                          </div>
                          <div className="media-text">Instagram</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img src={fbLogo} alt="" />
                          </div>
                          <div className="media-text">Facebook</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img src={tikTok} alt="" />
                          </div>
                          <div className="media-text">TikTok</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img src={linkdin} alt="" />
                          </div>
                          <div className="media-text">LinkedIn</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img src={xTwitter} alt="" />
                          </div>
                          <div className="media-text">Twitter</div>
                        </div>
                        <div
                          className="connect-btn"
                          onClick={(e) => {
                            connectSocialMedia("twitter");
                          }}
                        >
                          connect
                        </div>
                      </div>
                    </div>
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img className="thread-fill" src={threads} alt="" />
                          </div>
                          <div className="media-text">Threads</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img className="" src={youTube} alt="" />
                          </div>
                          <div className="media-text">Youtube</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div>

                  <div className="Or-seperator">Or</div>

                  <div className="kids-form-row row mb-4">
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img src={instagram} alt="" />
                          </div>
                          <div className="media-text">
                            <input
                              disabled
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setInstagramFollowers(e.target.value);
                              }}
                              placeholder="Followers Count"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img src={fbLogo} alt="" />
                          </div>
                          <div className="media-text">
                            <input
                              disabled
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setfacebookFollowers(e.target.value);
                              }}
                              placeholder="Followers Count"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img src={tikTok} alt="" />
                          </div>
                          <div className="media-text">
                            <input
                              disabled
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setTiktoksFollowers(e.target.value);
                              }}
                              placeholder="Followers Count"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img src={linkdin} alt="" />
                          </div>
                          <div className="media-text">
                            <input
                              disabled
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setlinkedinFollowers(e.target.value);
                              }}
                              placeholder="Followers Count"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img src={xTwitter} alt="" />
                          </div>
                          <div className="media-text">
                            <input
                              disabled
                              value={twitterFollowersCount}
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setXtwitterFollowers(e.target.value);
                              }}
                              placeholder="Followers Count"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img className="thread-fill" src={threads} alt="" />
                          </div>
                          <div className="media-text">
                            <input
                              disabled
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setThreadsFollowers(e.target.value);
                              }}
                              placeholder="Followers Count"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="kids-form-row row spcBtm"
                  >
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <div className="mediaIcon">
                             <img src={youTube} alt="" />
                          </div>
                          <div className="media-text">
                            <input
                              disabled
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setYoutubesFollowers(e.target.value);
                              }}
                              placeholder="Followers Count"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dialog-footer">
          {/* <button
            type="button"
            onClick={(e) => {
              goBack();
            }}
            className="step-back"
          >
            Back
          </button> */}

          <button
            type="button"
            className="step-continue"
            onClick={(e) => {
              editKids();
            }}
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="socialMediaModal"
        tabIndex="-1"
        aria-labelledby="socialMediaModalLabel"
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
              <div className="mb-3" style={{ textAlign: "left" }}>
                <label className="form-label">Twitter user name</label>
                <input
                  type="text"
                  className="form-control"
                  value={twitterUserName}
                  onChange={(e) => {
                    handleTwitterUserNameChange(e);
                    setTwitterUserNameError(false);
                  }}
                  placeholder="Twitter user name"
                ></input>
                {twitterUserNameError && (
                  <div className="invalid-fields">Please enter User Name</div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => handleCloseModal(modalData)}
                type="button"
                className="btn submit-rating"
                data-bs-dismiss="modal"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default KidsSocialMedias;
