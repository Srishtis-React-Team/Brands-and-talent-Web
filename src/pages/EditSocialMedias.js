import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import "../assets/css/forms/kidsform-one.css";
import "../assets/css/forms/kidsformthree.css";
import "../assets/css/register.css";
import "../assets/css/kidsmain.scss";
import "../assets/css/createjobs.css";
import "../assets/css/talent-profile.css";
import { useNavigate } from "react-router";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import PopUp from "../components/PopUp";
import { Button } from "@mui/material";

const EditSocialMedias = ({ talentData, onValuesChange }) => {
  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.jpeg");
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
  const [instagramUrl, setInstagramUrl] = useState("");
  const [tikTokUrl, setTikTokUrl] = useState("");
  const [youTubeUrl, setYouTubeUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [threadsUrl, setThreadsUrl] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const kidsImage = require("../assets/images/kidsImage.png");
  const paramsValues = window.location.search;
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const url = window.location.href;
  const queryString = url.split("?")[1];

  const [instagramError, setInstagramError] = useState("");
  const [tikTokError, setTikTokError] = useState("");
  const [youTubeError, setYouTubeError] = useState("");
  const [linkedinError, setLinkedinError] = useState("");
  const [twitterError, setTwitterError] = useState("");
  const [facebookError, setFacebookError] = useState("");
  const [threadsError, setThreadsError] = useState("");

  const editKids = async () => {
    const formData = {
      instaFollowers: instagramFollowers,
      tiktokFollowers: tiktoksFollowers,
      twitterFollowers: xtwitterFollowers,
      youtubeFollowers: youtubesFollowers,
      facebookFollowers: facebookFollowers,
      linkedinFollowers: linkedinFollowers,
      threadsFollowers: threadsFollowers,
      instagramUrl: instagramUrl,
      tikTokUrl: tikTokUrl,
      youTubeUrl: youTubeUrl,
      linkedinUrl: linkedinUrl,
      facebookUrl: facebookUrl,
      threadsUrl: threadsUrl,
      twitterUrl: twitterUrl,
    };
    setIsLoading(true);
    let apiName;
    if (talentData?.type == "kids") {
      apiName = API.editKids;
    } else if (talentData?.type == "adults") {
      apiName = API.updateAdults;
    }

    await ApiHelper.post(`${apiName}${queryString}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Updated Successfully!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        } else {
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const [twitterFollowersCount, setTwitterFollowersCount] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [twitterUserName, setTwitterUserName] = useState(null);
  const [twitterUserNameError, setTwitterUserNameError] = useState(false);
  const [youtubeChannelID, setYoutubeChannelID] = useState(null);
  const [youtubeIdError, setYoutubeIdError] = useState(false);

  const [isTwitter, setIsTwitter] = useState(false);
  const [isYoutube, setIsYoutube] = useState(false);

  const connectSocialMedia = (item) => {
    if (item == "twitter") {
      setIsTwitter(true);
      setIsYoutube(false);
    } else if (item == "youtube") {
      setIsYoutube(true);
      setIsTwitter(false);
    }
    const modalElement = document.getElementById("socialMediaModal");
    const bootstrapModal = new window.bootstrap.Modal(modalElement);
    bootstrapModal.show();
  };

  const handleTwitterUserNameChange = (e) => {
    const value = e.target.value;
    if (isTwitter) {
      setTwitterUserNameError(false);
      setTwitterUserName(value);
    } else if (isYoutube) {
      setYoutubeIdError(false);
      setYoutubeChannelID(value);
    }
  };

  const handleCloseModal = async (talent) => {
    let formData;
    let apiName;
    if (isTwitter) {
      formData = {
        username: twitterUserName,
      };
      apiName = `${API.twitterCount}`;
    } else if (isYoutube) {
      formData = {
        channelId: youtubeChannelID,
      };
      apiName = `${API.youtubeCount}`;
    }
    setIsLoading(true);
    await ApiHelper.post(apiName, formData)
      .then((resData) => {
        if (resData?.data?.status === true) {
          setIsLoading(false);
          if (isTwitter) {
            setTwitterFollowersCount(resData?.data?.followers_count);
            setXtwitterFollowers(resData?.data?.followers_count);
            setTwitterUserName("");
            setMessage("Twitter Connected Successfully!");
          } else if (isYoutube) {
            setYoutubesFollowers(resData?.data?.data?.subscriberCount);
            setYoutubeChannelID("");
            setMessage("YouTube Connected Successfully!");
          }
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
        setIsLoading(false);
      });
  };

  const validateInstagramUrl = (url) => {
    const instagramUrlPattern =
      /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._%-]+\/?(\?[^#]+)?$/;
    return instagramUrlPattern.test(url);
  };

  const handleInstagramUrlChange = (e) => {
    const url = e.target.value;
    setInstagramUrl(url);
    if (url === "" || validateInstagramUrl(url)) {
      setInstagramError(""); // Clear the error if the URL is valid or input is empty
    } else {
      setInstagramError("Please enter a valid Instagram URL."); // Set an error message if the URL is invalid
    }
  };

  const handleInstagramPaste = (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );
    setInstagramUrl(pastedText);
    if (validateInstagramUrl(pastedText)) {
      setInstagramError("");
    } else {
      setInstagramError("Please paste a valid Instagram URL.");
    }
    e.preventDefault();
  };

  const validateFacebookUrl = (url) => {
    const facebookUrlPattern =
      /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9.\/_-]+(\?[A-Za-z0-9&=_-]+)?$/;
    return facebookUrlPattern.test(url);
  };

  // Function to handle changes in the input field
  const handleFacebookUrlChange = (e) => {
    const url = e.target.value;

    // Allow the input to be updated regardless of validation state
    setFacebookUrl(url);

    // Validate the URL and set an error message if it's invalid
    if (url === "" || validateFacebookUrl(url)) {
      setFacebookError(""); // Clear the error if the URL is valid or input is empty
    } else {
      setFacebookError("Please enter a valid Facebook URL."); // Set an error message if the URL is invalid
    }
  };

  // Function to handle pasted URLs
  const handleFacebookPaste = (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );

    // Set the pasted text directly and validate it
    setFacebookUrl(pastedText);

    if (validateFacebookUrl(pastedText)) {
      setFacebookError(""); // Clear the error if the URL is valid
    } else {
      setFacebookError("Please paste a valid Facebook URL."); // Set an error message if the URL is invalid
    }

    e.preventDefault(); // Prevent the default paste action to avoid triggering the onChange event
  };

  // Function to validate TikTok URLs
  const validateTikTokUrl = (url) => {
    const tikTokUrlPattern =
      /^(https?:\/\/)?(www\.)?tiktok\.com\/@[A-Za-z0-9._%-]+(\/video\/[0-9]+)?$/;
    return tikTokUrlPattern.test(url);
  };

  // Function to handle changes in the input field
  const handleTikTokUrlChange = (e) => {
    const url = e.target.value;

    // Allow the input to be updated regardless of validation state
    setTikTokUrl(url);

    // Validate the URL and set an error message if it's invalid
    if (url === "" || validateTikTokUrl(url)) {
      setTikTokError(""); // Clear the error if the URL is valid or input is empty
    } else {
      setTikTokError("Please enter a valid TikTok URL."); // Set an error message if the URL is invalid
    }
  };

  // Function to handle pasted URLs
  const handleTikTokPaste = (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );

    // Set the pasted text directly and validate it
    setTikTokUrl(pastedText);

    if (validateTikTokUrl(pastedText)) {
      setTikTokError(""); // Clear the error if the URL is valid
    } else {
      setTikTokError("Please paste a valid TikTok URL."); // Set an error message if the URL is invalid
    }

    e.preventDefault(); // Prevent the default paste action to avoid triggering the onChange event
  };

  // Function to validate LinkedIn URLs
  const validateLinkedInUrl = (url) => {
    const linkedinUrlPattern =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+(\/)?(\?[A-Za-z0-9=&_%-]+)?$/;
    return linkedinUrlPattern.test(url);
  };

  // Function to handle changes in the input field
  const handleLinkedInUrlChange = (e) => {
    const url = e.target.value;

    // Allow the input to be updated regardless of validation state
    setLinkedinUrl(url);

    // Validate the URL and set an error message if it's invalid
    if (url === "" || validateLinkedInUrl(url)) {
      setLinkedinError(""); // Clear the error if the URL is valid or input is empty
    } else {
      setLinkedinError("Please enter a valid LinkedIn URL."); // Set an error message if the URL is invalid
    }
  };

  // Function to handle pasted URLs
  const handleLinkedInPaste = (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );

    // Set the pasted text directly and validate it
    setLinkedinUrl(pastedText);

    if (validateLinkedInUrl(pastedText)) {
      setLinkedinError(""); // Clear the error if the URL is valid
    } else {
      setLinkedinError("Please paste a valid LinkedIn URL."); // Set an error message if the URL is invalid
    }

    e.preventDefault(); // Prevent the default paste action to avoid triggering the onChange event
  };

  // Function to validate X (formerly Twitter) URLs
  const validateTwitterUrl = (url) => {
    const twitterUrlPattern =
      /^(https?:\/\/)?(www\.)?(x\.com|twitter\.com)\/[A-Za-z0-9_]+(\/status\/[0-9]+)?$/;
    return twitterUrlPattern.test(url);
  };

  // Function to handle changes in the input field
  const handleTwitterUrlChange = (e) => {
    const url = e.target.value;

    // Allow the input to be updated regardless of validation state
    setTwitterUrl(url);

    // Validate the URL and set an error message if it's invalid
    if (url === "" || validateTwitterUrl(url)) {
      setTwitterError(""); // Clear the error if the URL is valid or input is empty
    } else {
      setTwitterError("Please enter a valid X (formerly Twitter) URL."); // Set an error message if the URL is invalid
    }
  };

  // Function to handle pasted URLs
  const handleTwitterPaste = (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );

    // Set the pasted text directly and validate it
    setTwitterUrl(pastedText);

    if (validateTwitterUrl(pastedText)) {
      setTwitterError(""); // Clear the error if the URL is valid
    } else {
      setTwitterError("Please paste a valid X (formerly Twitter) URL."); // Set an error message if the URL is invalid
    }

    e.preventDefault(); // Prevent the default paste action to avoid triggering the onChange event
  };

  // Function to validate Threads URLs
  const validateThreadsUrl = (url) => {
    // This pattern matches:
    // - Optional `http` or `https` protocol
    // - Optional `www.`
    // - `threads.net` domain
    // - `/@` followed by the username (alphanumeric or underscore)
    // - Optional query parameters after `?`, which can include various special characters
    const threadsUrlPattern =
      /^https:\/\/(www\.)?threads\.net\/@[A-Za-z0-9_]+(?:\?[A-Za-z0-9=&_%-]+)?$/;
    return threadsUrlPattern.test(url);
  };

  // Function to handle changes in the input field
  const handleThreadsUrlChange = (e) => {
    const url = e.target.value;

    // Allow the input to be updated regardless of validation state
    setThreadsUrl(url);

    // Validate the URL and set an error message if it's invalid
    if (url === "" || validateThreadsUrl(url)) {
      setThreadsError(""); // Clear the error if the URL is valid or input is empty
    } else {
      setThreadsError("Please enter a valid Threads URL."); // Set an error message if the URL is invalid
    }
  };

  // Function to handle pasted URLs
  const handleThreadsPaste = (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );

    // Set the pasted text directly and validate it
    setThreadsUrl(pastedText);

    if (validateThreadsUrl(pastedText)) {
      setThreadsError(""); // Clear the error if the URL is valid
    } else {
      setThreadsError("Please paste a valid Threads URL."); // Set an error message if the URL is invalid
    }

    e.preventDefault(); // Prevent the default paste action to avoid triggering the onChange event
  };

  const validateYouTubeUrl = (url) => {
    const youTubeUrlPattern =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/|v\/|c\/|channel\/|@)[A-Za-z0-9_-]+|youtu\.be\/[A-Za-z0-9_-]+)(\?.*)?$/;
    return youTubeUrlPattern.test(url);
  };

  const handleYouTubeUrlChange = (e) => {
    const url = e.target.value;

    setYouTubeUrl(url);

    if (url === "" || validateYouTubeUrl(url)) {
      setYouTubeError(""); // Clear the error if the URL is valid or input is empty
    } else {
      setYouTubeError("Please enter a valid YouTube URL."); // Set an error message if the URL is invalid
    }
  };

  const handleYouTubePaste = (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );

    setYouTubeUrl(pastedText);

    if (validateYouTubeUrl(pastedText)) {
      setYouTubeError(""); // Clear the error if the URL is valid
    } else {
      setYouTubeError("Please paste a valid YouTube URL."); // Set an error message if the URL is invalid
    }

    e.preventDefault(); // Prevent the default paste action to avoid triggering the onChange event
  };

  useEffect(() => {
    if (talentData) {
      setInstagramFollowers(talentData.instaFollowers || "");
      setfacebookFollowers(talentData.facebookFollowers || "");
      setXtwitterFollowers(talentData.twitterFollowers || "");
      setTwitterFollowersCount(talentData.twitterFollowers || "");
      setlinkedinFollowers(talentData.linkedinFollowers || "");
      setThreadsFollowers(talentData.threadsFollowers || "");
      setTiktoksFollowers(talentData.tiktokFollowers || "");
      setYoutubesFollowers(talentData.youtubeFollowers || "");
      setInstagramUrl(talentData.instagramUrl || "");
      setTikTokUrl(talentData.tikTokUrl || "");
      setYouTubeUrl(talentData.youTubeUrl || "");
      setLinkedinUrl(talentData.linkedinUrl || "");
      setTwitterUrl(talentData.twitterUrl || "");
      setFacebookUrl(talentData.facebookUrl || "");
      setThreadsUrl(talentData.threadsUrl || "");
    }
  }, [talentData]);

  return (
    <>
      <div className="form-dialog">
        <div className="kidsform-one container">
          <div className="row">
            <div className="kids-form col-lg-12  col-md-12">
              <div className="kids-main">
                <div className="kids-form-row row mb-4">
                  <div className="kids-form-section col-md-6">
                    <div className="media-wrapper">
                      <div className="media-info mb-2">
                        <div className="mediaIcon">
                          <img src={instagram} alt="" />
                        </div>
                        <div className="media-text">
                          <input
                            type="number"
                            min="0"
                            className="form-control followers-count-input"
                            onChange={(e) => {
                              setInstagramFollowers(e.target.value);
                            }}
                            value={instagramFollowers}
                            placeholder="Followers Count"
                          ></input>
                        </div>
                      </div>
                      <div className="media-info">
                        <div className="mediaIcon">
                          <i className="bi bi-link-45deg social-chain-icon"></i>
                        </div>
                        <div className="media-text">
                          <input
                            type="text"
                            value={instagramUrl}
                            className="form-control followers-count-input"
                            onChange={handleInstagramUrlChange}
                            onPaste={handleInstagramPaste}
                            placeholder="Instagram URL"
                          />
                          {instagramError && (
                            <div className="invalid-fields">
                              {instagramError}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-section col-md-6">
                    <div className="media-wrapper">
                      <div className="media-info mb-2">
                        <div className="mediaIcon">
                          <img src={fbLogo} alt="" />
                        </div>
                        <div className="media-text">
                          <input
                            type="number"
                            min="0"
                            className="form-control followers-count-input"
                            onChange={(e) => {
                              setfacebookFollowers(e.target.value);
                            }}
                            value={facebookFollowers}
                            placeholder="Followers Count"
                          ></input>
                        </div>
                      </div>
                      <div className="media-info">
                        <div className="mediaIcon">
                          <i className="bi bi-link-45deg social-chain-icon"></i>
                        </div>
                        <div className="media-text">
                          <input
                            value={facebookUrl}
                            type="text"
                            className="form-control followers-count-input"
                            onChange={handleFacebookUrlChange}
                            onPaste={handleFacebookPaste}
                            placeholder="Facebook Url"
                          ></input>
                          {facebookError && (
                            <div className="invalid-fields">
                              {facebookError}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="kids-form-row row">
                  <div className="kids-form-section col-md-6">
                    <div className="media-wrapper">
                      <div className="media-info mb-2">
                        <div className="mediaIcon">
                          <img src={tikTok} alt="" />
                        </div>
                        <div className="media-text">
                          <input
                            type="number"
                            min="0"
                            className="form-control followers-count-input"
                            onChange={(e) => {
                              setTiktoksFollowers(e.target.value);
                            }}
                            value={tiktoksFollowers}
                            placeholder="Followers Count"
                          ></input>
                        </div>
                      </div>
                      <div className="media-info">
                        <div className="mediaIcon">
                          <i className="bi bi-link-45deg social-chain-icon"></i>
                        </div>
                        <div className="media-text">
                          <input
                            type="text"
                            value={tikTokUrl}
                            className="form-control followers-count-input"
                            onChange={handleTikTokUrlChange}
                            onPaste={handleTikTokPaste}
                            placeholder="TikTok Url"
                          ></input>
                          {tikTokError && (
                            <div className="invalid-fields">{tikTokError}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-section col-md-6">
                    <div className="media-wrapper">
                      <div className="media-info mb-2">
                        <div className="mediaIcon">
                          <img src={linkdin} alt="" />
                        </div>
                        <div className="media-text">
                          <input
                            type="number"
                            min="0"
                            className="form-control followers-count-input"
                            onChange={(e) => {
                              setlinkedinFollowers(e.target.value);
                            }}
                            value={linkedinFollowers}
                            placeholder="Followers Count"
                          ></input>
                        </div>
                      </div>
                      <div className="media-info">
                        <div className="mediaIcon">
                          <i className="bi bi-link-45deg social-chain-icon"></i>
                        </div>
                        <div className="media-text">
                          <input
                            type="text"
                            value={linkedinUrl}
                            className="form-control followers-count-input"
                            onChange={handleLinkedInUrlChange}
                            onPaste={handleLinkedInPaste}
                            placeholder="Linkedin Url"
                          ></input>
                          {linkedinError && (
                            <div className="invalid-fields">
                              {linkedinError}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="kids-form-row row">
                  <div className="kids-form-section col-md-6">
                    <div className="media-wrapper">
                      <div className="media-info mb-2">
                        <div className="mediaIcon">
                          <img src={xTwitter} alt="" />
                        </div>
                        <div className="media-text">
                          <input
                            value={twitterFollowersCount}
                            type="number"
                            min="0"
                            className="form-control followers-count-input"
                            onChange={(e) => {
                              setXtwitterFollowers(e.target.value);
                              setTwitterFollowersCount(e.target.value);
                            }}
                            placeholder="Followers Count"
                          ></input>
                        </div>
                      </div>
                      <div className="media-info">
                        <div className="mediaIcon">
                          <i className="bi bi-link-45deg social-chain-icon"></i>
                        </div>
                        <div className="media-text">
                          <input
                            type="text"
                            value={twitterUrl}
                            className="form-control followers-count-input"
                            onChange={handleTwitterUrlChange}
                            onPaste={handleTwitterPaste}
                            placeholder="X (formerly Twitter) URL"
                          ></input>
                          {twitterError && (
                            <div className="invalid-fields">{twitterError}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-section col-md-6">
                    <div className="media-wrapper">
                      <div className="media-info mb-2">
                        <div className="mediaIcon">
                          <img className="thread-fill" src={threads} alt="" />
                        </div>
                        <div className="media-text">
                          <input
                            type="number"
                            min="0"
                            className="form-control followers-count-input"
                            onChange={(e) => {
                              setThreadsFollowers(e.target.value);
                            }}
                            value={threadsFollowers}
                            placeholder="Followers Count"
                          ></input>
                        </div>
                      </div>
                      <div className="media-info">
                        <div className="mediaIcon">
                          <i className="bi bi-link-45deg social-chain-icon"></i>
                        </div>
                        <div className="media-text">
                          <input
                            type="text"
                            value={threadsUrl}
                            className="form-control followers-count-input"
                            onChange={handleThreadsUrlChange}
                            onPaste={handleThreadsPaste}
                            placeholder="Threads Url"
                          ></input>
                          {threadsError && (
                            <div className="invalid-fields">{threadsError}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="kids-form-row row ">
                  <div className="kids-form-section col-md-6">
                    <div className="media-wrapper">
                      <div className="media-info mb-2">
                        <div className="mediaIcon">
                          <img src={youTube} alt="" />
                        </div>
                        <div className="media-text">
                          <input
                            type="number"
                            min="0"
                            value={youtubesFollowers}
                            className="form-control followers-count-input"
                            onChange={(e) => {
                              setYoutubesFollowers(e.target.value);
                            }}
                            placeholder="Followers Count"
                          ></input>
                        </div>
                      </div>
                      <div className="media-info">
                        <div className="mediaIcon">
                          <i className="bi bi-link-45deg social-chain-icon"></i>
                        </div>
                        <div className="media-text">
                          <input
                            value={youTubeUrl}
                            type="text"
                            className="form-control followers-count-input"
                            onChange={handleYouTubeUrlChange}
                            onPaste={handleYouTubePaste}
                            placeholder="YouTube Url"
                          ></input>
                          {youTubeError && (
                            <div className="invalid-fields">{youTubeError}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="Or-seperator">Or</div>

                {/* <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper d-flex">
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
                      <div className="media-wrapper d-flex">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img src={fbLogo} alt="" />
                          </div>
                          <div className="media-text">Facebook</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div> */}
                {/* <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6">
                      <div className="media-wrapper d-flex">
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
                      <div className="media-wrapper d-flex">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img src={linkdin} alt="" />
                          </div>
                          <div className="media-text">LinkedIn</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div> */}
                <div className="kids-form-row row">
                  <div className="kids-form-section col-md-6">
                    <div className="media-wrapper  d-flex">
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
                    <div className="media-wrapper d-flex">
                      <div className="media-info">
                        <div className="mediaIcon">
                          <img className="" src={youTube} alt="" />
                        </div>
                        <div className="media-text">Youtube</div>
                      </div>
                      <div
                        className="connect-btn"
                        onClick={(e) => {
                          connectSocialMedia("youtube");
                        }}
                      >
                        connect
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="kids-form-row row spcBtm">

                  <div className="kids-form-section col-md-6 ">
                      <div className="media-wrapper  d-flex">
                        <div className="media-info">
                          <div className="mediaIcon">
                            <img className="thread-fill" src={threads} alt="" />
                          </div>
                          <div className="media-text">Threads</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>

                  </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="add-service-btn-flex my-3">
          <Button
            onClick={(e) => {
              editKids();
            }}
            className="edit-profileimg-btn"
            variant="text"
            style={{ textTransform: "capitalize" }}
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
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
                <label className="form-label">
                  {isTwitter && <>Twitter user name</>}
                  {isYoutube && <>YouTube Channel ID</>}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={
                    isTwitter
                      ? twitterUserName
                      : isYoutube
                      ? youtubeChannelID
                      : ""
                  }
                  onChange={(e) => {
                    handleTwitterUserNameChange(e);
                    setTwitterUserNameError(false);
                  }}
                  placeholder={
                    isTwitter
                      ? "Twitter user name"
                      : isYoutube
                      ? "YouTube Channel ID"
                      : ""
                  }
                ></input>
                {twitterUserNameError && (
                  <div className="invalid-fields">Please enter User Name</div>
                )}
                {youtubeIdError && (
                  <div className="invalid-fields">Please enter Channel ID</div>
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

export default EditSocialMedias;
