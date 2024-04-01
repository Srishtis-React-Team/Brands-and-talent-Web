import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsform-one.scss";
import "../assets/css/forms/kidsformthree.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Axios from "axios";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { useNavigate } from "react-router";

const KidsSocialMedias = ({ onDataFromChild, ...props }) => {
  const navigate = useNavigate();
  const btLogo = require("../assets/icons/Group 56.png");

  const fbLogo = require("../assets/icons/social-media-icons/fbLogo.png");
  const instagram = require("../assets/icons/social-media-icons/instagram.png");
  const threads = require("../assets/icons/social-media-icons/thread-fill.png");
  const tikTok = require("../assets/icons/social-media-icons/tikTok.png");
  const xTwitter = require("../assets/icons/social-media-icons/xTwitter.png");
  const youTube = require("../assets/icons/social-media-icons/youTube.png");
  const linkdin = require("../assets/icons/social-media-icons/linkdin.png");
  const docsIcon = require("../assets/icons/docsIcon.png");

  const [isLoading, setIsLoading] = useState(false);
  const [instagramFollowers, setInstagramFollowers] = useState("");
  const [facebookFollowers, setfacebookFollowers] = useState("");
  const [xtwitterFollowers, setXtwitterFollowers] = useState("");
  const [linkedinFollowers, setlinkedinFollowers] = useState("");
  const [threadsFollowers, setThreadsFollowers] = useState("");
  const [tiktoksFollowers, setTiktoksFollowers] = useState("");
  const [youtubesFollowers, setYoutubesFollowers] = useState("");

  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const kidsImage = require("../assets/images/kidsImage.png");
  const paramsValues = window.location.search;
  const urlParams = new URLSearchParams(paramsValues);
  const [updateDisabled, setUpdateDisabled] = useState(false);

  const url = window.location.href;
  const queryString = url.split("?")[1];
  console.log(" queryString:", queryString);

  useEffect(() => {}, []);
  useEffect(() => {}, [updateDisabled]);

  const editKids = async () => {
    // navigate(`/talent-signup-files-success`);
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
        console.log(resData, "resData");
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Updated SuccessFully!");
          setOpenPopUp(true);
          setTimeout(function() {
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

  const goBack = () => {
    navigate(`/talent-signup-plan-details?userId=${queryString}`);
  };

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
          <div className="kidsform-one" style={{ width: "100%" }}>
            <div className="kids-wrapper">
              <div className="kids-img">
                <img src={kidsImage} alt="" />
              </div>
              <div className="kids-form">
                <div className="kids-main" style={{ width: "70%" }}>
                  <div className="kids-form-title">
                    Explore Your Social Media Presence
                  </div>

                  <div className="explore-info">
                    If you want to display your actual follower count, please
                    connect with your social media. Otherwise, manually enter
                    your followers count
                  </div>

                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={instagram} alt="" />
                          <div className="media-text">Instagram</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={fbLogo} alt="" />
                          <div className="media-text">FaceBook</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={tikTok} alt="" />
                          <div className="media-text">TikTok</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={linkdin} alt="" />
                          <div className="media-text">Linkedin</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={xTwitter} alt="" />
                          <div className="media-text">Twitter</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img className="thread-fill" src={threads} alt="" />
                          <div className="media-text">Threads</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img className="thread-fill" src={threads} alt="" />
                          <div className="media-text">Threads</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div>

                  <div className="Or-seperator">Or</div>

                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={instagram} alt="" />
                          <div className="media-text">
                            <input
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setInstagramFollowers(e.target.value);
                              }}
                              placeholder="Enter Followers Count"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={fbLogo} alt="" />
                          <div className="media-text">
                            <input
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setfacebookFollowers(e.target.value);
                              }}
                              placeholder="Enter Followers Count"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={tikTok} alt="" />
                          <div className="media-text">
                            <input
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setTiktoksFollowers(e.target.value);
                              }}
                              placeholder="Enter Followers Count"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={linkdin} alt="" />
                          <div className="media-text">
                            <input
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setlinkedinFollowers(e.target.value);
                              }}
                              placeholder="Enter Followers Count"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={xTwitter} alt="" />
                          <div className="media-text">
                            <input
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setXtwitterFollowers(e.target.value);
                              }}
                              placeholder="Enter Followers Count"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img className="thread-fill" src={threads} alt="" />
                          <div className="media-text">
                            <input
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setThreadsFollowers(e.target.value);
                              }}
                              placeholder="Enter Followers Count"
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row mb-5">
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={youTube} alt="" />
                          <div className="media-text">
                            <input
                              type="number"
                              className="form-control followers-count-input"
                              onChange={(e) => {
                                setYoutubesFollowers(e.target.value);
                              }}
                              placeholder="Enter Followers Count"
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

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default KidsSocialMedias;
