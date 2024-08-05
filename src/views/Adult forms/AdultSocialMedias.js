import React, { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import Select from "react-select";
import Axios from "axios";
import { useNavigate } from "react-router";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";
import PopUp from "../../components/PopUp";
import "../../assets/css/talent-dashboard.scss";
import CurrentUser from "../../CurrentUser";

const AdultSocialMedias = () => {
  const {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
    fcmToken,
  } = CurrentUser();

  const [talentData, setTalentData] = useState();

  useEffect(() => {
    if (currentUserId) {
      getTalentById();
    }
  }, [currentUserId]);

  const getTalentById = async () => {
    await ApiHelper.post(`${API.getTalentById}${currentUserId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setTalentData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {}, [talentData]);

  const [profileFile, setProfileFile] = useState(null);
  const btLogo = require("../../assets/images/LOGO.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const adultsBanner = require("../../assets/images/adultsBanner.png");
  const uploadIcon = require("../../assets/icons/uploadIcon.png");
  const imageType = require("../../assets/icons/imageType.png");
  const videoType = require("../../assets/icons/videoType.png");
  const audiotype = require("../../assets/icons/audiotype.png");
  const idCard = require("../../assets/icons/id-card.png");
  const elipsis = require("../../assets/icons/elipsis.png");
  const greenTickCircle = require("../../assets/icons/small-green-tick.png");
  const fbLogo = require("../../assets/icons/social-media-icons/fbLogo.png");
  const instagram = require("../../assets/icons/social-media-icons/instagram.png");
  const threads = require("../../assets/icons/social-media-icons/thread-fill.png");
  const tikTok = require("../../assets/icons/social-media-icons/tikTok.png");
  const xTwitter = require("../../assets/icons/social-media-icons/xTwitter.png");
  const youTube = require("../../assets/icons/social-media-icons/youTube.png");
  const linkdin = require("../../assets/icons/social-media-icons/linkdin.png");
  const docsIcon = require("../../assets/icons/docsIcon.png");
  const [featuresList, setFeaturesList] = useState([]);
  const [features, setFeature] = useState([]);
  const [portofolioFile, setPortofolioFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState([]);
  const [videoAUdioFile, setVideoAudioFile] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [instagramFollowers, setInstagramFollowers] = useState("");
  const [facebookFollowers, setfacebookFollowers] = useState("");
  const [xtwitterFollowers, setXtwitterFollowers] = useState("");
  const [linkedinFollowers, setlinkedinFollowers] = useState("");
  const [threadsFollowers, setThreadsFollowers] = useState("");
  const [tiktoksFollowers, setTiktoksFollowers] = useState("");
  const [youtubesFollowers, setYoutubesFollowers] = useState("");
  const [idType, setIdType] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [aboutYou, setAboutYou] = useState([]);
  const [verificationID, setVerificationID] = useState("");
  const url = window.location.href;
  let queryString = url.split("?")[1];

  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    getFeatures();
  }, []);

  const getFeatures = async () => {
    await ApiHelper.get(API.getFeatures)
      .then((resData) => {
        if (resData) {
          setFeaturesList(resData.data.data[0].features);
        }
      })
      .catch((err) => {});
  };

  const onEditorSummary = (editorState) => {
    setAboutYou([draftToHtml(convertToRaw(editorState.getCurrentContent()))]);
    setEditorState(editorState);
  };

  const handleFeaturesChange = (label, value) => {
    const updatedValues = [...features];
    const index = updatedValues.findIndex((item) => item.label === label);
    if (index !== -1) {
      updatedValues[index] = { label, value };
    } else {
      updatedValues.push({ label, value });
    }
    setFeature(updatedValues);
    // Call your API here with the updated selectedValues array
    // Example:
    // callYourApi(selectedValues);
  };

  const updateAdultSignup = async () => {
    let formData = {
      instaFollowers: instagramFollowers,
      tiktokFollowers: tiktoksFollowers,
      twitterFollowers: xtwitterFollowers,
      youtubeFollowers: youtubesFollowers,
      facebookFollowers: facebookFollowers,
      linkedinFollowers: linkedinFollowers,
      threadsFollowers: threadsFollowers,
    };
    await ApiHelper.post(`${API.updateAdults}${queryString}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Updated SuccessFully!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            navigate(`/adult-signup-files-details?${queryString}`);
          }, 1000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const handleProfileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    uploadFile(droppedFiles[0]);
    // setFiles(droppedFiles);
  };

  const handleProfileDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle deleting image
  const handleProfileDelete = () => {
    setProfileFile(null);
  };

  const handlePortofolioDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    uploadFile(droppedFiles[0]);
    // setFiles(droppedFiles);
  };

  const handlePortofolioDragOver = (e) => {
    e.preventDefault();
  };
  const handleVideoDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    uploadVideoudio(droppedFiles[0]);
    // setFiles(droppedFiles);
  };

  const handleVideoDragOver = (e) => {
    e.preventDefault();
  };
  const handleResumeDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    uploadResume(droppedFiles[0]);
    // setFiles(droppedFiles);
  };

  const handleResumeDragOver = (e) => {
    e.preventDefault();
  };

  const portofolioUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];

      uploadFile(fileData);
    }
  };
  const videoAudioUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      uploadVideoudio(fileData);
    }
  };
  const resumeUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];

      uploadResume(fileData);
    }
  };

  const verificationUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      uploadVerificationID(fileData);
    }
  };

  // const uploadedFiles = Array.from(event.target.files);
  // const updatedFiles = uploadedFiles.map((file, index) => ({
  //   id: index + 1,
  //   title: file.name,
  //   apiresponse: null, // Placeholder for API response
  // }));
  // setPortofolioFiles([...portofolioFiles, ...updatedFiles]);

  const getFileType = (fileType) => {
    // Extract main category from MIME type
    if (fileType.startsWith("image/")) {
      return "image";
    } else if (fileType.startsWith("video/")) {
      return "video";
    } else if (fileType.startsWith("audio/")) {
      return "audio";
    } else if (fileType === "application/pdf") {
      return "pdf";
    } else {
      return "other";
    }
  };

  const profileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];

      uploadProfile(fileData);
    }
  };

  const uploadProfile = async (fileData) => {
    setLoader(true);
    const params = new FormData();
    params.append("file", fileData);
    params.append("fileName", fileData.name);
    params.append("fileType", getFileType(fileData.type));
    /* await ApiHelper.post(API.uploadFile, params) */
    await Axios.post(API.uploadFile, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resData) => {
        setMessage(resData.data.message);
        let fileObj = {
          id: resData.data.data.fileId,
          title: fileData.name,
          fileData: resData.data.data.filename,
          type: resData?.data?.data?.filetype,
        };

        setProfileFile(fileObj);

        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const uploadFile = async (fileData) => {
    const planLimits = {
      Basic: 5,
      Pro: 15,
      Premium: Infinity, // Unlimited photos
    };

    const userPlan = talentData?.planName;
    const maxPhotos = planLimits[userPlan] || 0;

    if (portofolioFile.length >= maxPhotos) {
      setMessage(
        `You can only upload up to ${maxPhotos} photos as a ${userPlan} member.`
      );
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 3000);

      return;
    }

    setLoader(true);
    const params = new FormData();
    params.append("file", fileData);
    params.append("fileName", fileData.name);
    params.append("fileType", getFileType(fileData.type));
    /* await ApiHelper.post(API.uploadFile, params) */
    await Axios.post(API.uploadFile, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resData) => {
        setMessage(resData.data.message);
        let fileObj = {
          id: resData.data.data.fileId,
          title: fileData.name,
          fileData: resData.data.data.filename,
          type: resData?.data?.data?.filetype,
        };
        setPortofolioFile((prevFiles) => [...prevFiles, fileObj]);
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  const uploadVideoudio = async (fileData) => {
    setLoader(true);
    const params = new FormData();
    params.append("file", fileData);
    params.append("fileName", fileData.name);
    params.append("fileType", getFileType(fileData.type));
    /* await ApiHelper.post(API.uploadFile, params) */
    await Axios.post(API.uploadFile, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resData) => {
        setMessage(resData.data.message);
        let fileObj = {
          id: resData.data.data.fileId,
          title: fileData.name,
          fileData: resData.data.data.filename,
          type: resData?.data?.data?.filetype,
        };
        setVideoAudioFile((prevFiles) => [...prevFiles, fileObj]);
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  const uploadResume = async (fileData) => {
    setLoader(true);
    const params = new FormData();
    params.append("file", fileData);
    params.append("fileName", fileData.name);
    params.append("fileType", getFileType(fileData.type));
    /* await ApiHelper.post(API.uploadFile, params) */
    await Axios.post(API.uploadFile, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resData) => {
        setMessage(resData.data.message);
        let fileObj = {
          id: resData.data.data.fileId,
          title: fileData.name,
          fileData: resData.data.data.filename,
          type: resData?.data?.data?.filetype,
        };
        setResumeFile((prevFiles) => [...prevFiles, fileObj]);

        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  const uploadVerificationID = async (fileData) => {
    setLoader(true);
    const params = new FormData();
    params.append("file", fileData);
    params.append("fileName", fileData.name);
    params.append("fileType", getFileType(fileData.type));
    /* await ApiHelper.post(API.uploadFile, params) */
    await Axios.post(API.uploadFile, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resData) => {
        setMessage(resData.data.message);
        let fileObj = {
          id: resData.data.data.fileId,
          title: fileData.name,
          fileData: resData.data.data.filename,
          type: getFileType(fileData.type),
        };
        setVerificationID((prevFiles) => [...prevFiles, fileObj]);
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const handleView = (imageUrl) => {
    let viewImage = `${API.userFilePath}${imageUrl?.fileData}`;
    window.open(viewImage, "_blank");
  };

  // Function to handle deleting image
  const handlePortofolioDelete = (index) => {
    setPortofolioFile((prevImages) => {
      // Create a copy of the previous state
      const updatedImages = [...prevImages];
      // Remove the image at the specified index
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleVideoDelete = (index) => {
    setVideoAudioFile((prevImages) => {
      // Create a copy of the previous state
      const updatedImages = [...prevImages];
      // Remove the image at the specified index
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleResumeDelete = (index) => {
    setResumeFile((prevImages) => {
      // Create a copy of the previous state
      const updatedImages = [...prevImages];
      // Remove the image at the specified index
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleAddUrl = () => {
    const planLimits = {
      Basic: 2,
      Pro: 5,
      Premium: Infinity, // Unlimited URLs
    };

    const userPlan = talentData?.planName;
    const maxUrls = planLimits[userPlan] || 0;

    if (urls.length >= maxUrls) {
      setMessage(
        `You can only add up to ${maxUrls} URLs as a ${userPlan} member.`
      );
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 3000);
      return;
    }

    if (videoUrl.trim() !== "") {
      setUrls([...urls, videoUrl]);

      setVideoUrl("");
    }
  };

  const handlePaste = (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );
    setVideoUrl(pastedText);
  };

  const handleDeleteUrl = (index) => {
    const newUrls = urls.filter((url, i) => i !== index);
    setUrls(newUrls);
  };

  return (
    <>
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
              <div className="step-text">Step 2 of 4</div>
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
              <div className="adult-form-wrapper row ml-0 mr-0">
                <div className="col-md-4 col-lg-3">
                  <div className="fixImgs">
                    <img
                      src={adultsBanner}
                      className="kids-image-sticky "
                      alt="img"
                    />
                  </div>
                </div>
                <div className="adult-main remvSpc col-md-8 col-lg-9">
                  <div className="adults-titles">
                    Explore Your Social Media Presence
                  </div>

                  <div className="explore-info">
                    If you want to display your actual follower count, please
                    connect with your social media. Otherwise, manually enter
                    your followers count
                  </div>

                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={instagram} alt="" />
                          <div className="media-text">Instagram</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                    <div className="kids-form-section col-md-6 mb-3">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={fbLogo} alt="" />
                          <div className="media-text">Facebook</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={tikTok} alt="" />
                          <div className="media-text">TikTok</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                    <div className="kids-form-section col-md-6 mb-3">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={linkdin} alt="" />
                          <div className="media-text">LinkedIn</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={xTwitter} alt="" />
                          <div className="media-text">Twitter</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                    <div className="kids-form-section col-md-6 mb-3">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img className="thread-fill" src={threads} alt="" />
                          <div className="media-text">Threads</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img className="thread-fill" src={youTube} alt="" />
                          <div className="media-text">Youtube</div>
                        </div>
                        <div className="connect-btn">connect</div>
                      </div>
                    </div>
                  </div>

                  <div className="Or-seperator">Or</div>

                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
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
                    <div className="kids-form-section col-md-6 mb-3">
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
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
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
                    <div className="kids-form-section col-md-6 mb-3">
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
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
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
                    <div className="kids-form-section col-md-6 mb-3">
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
                    <div className="kids-form-section col-md-6 mb-5">
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
          <div className="dialog-footer">
            <button
              type="button"
              onClick={(e) => {
                navigate(`/adult-signup-basic-details?${talentData?._id}`);
              }}
              className="step-back"
            >
              Back
            </button>

            <button
              className="step-continue"
              onClick={(e) => {
                updateAdultSignup();
              }}
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
          </div>
        </div>
      </>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default AdultSocialMedias;
