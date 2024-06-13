import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsformthree.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import Select from "react-select";
import Axios from "axios";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { useNavigate } from "react-router";

const KidsFormThree = ({ onDataFromChild, ...props }) => {
  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.jpg");
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
  const [profileFile, setProfileFile] = useState(null);
  const [portofolioFile, setPortofolioFile] = useState([]);
  const [resumeFile, setResumeFile] = useState([]);
  const [videoAUdioFile, setVideoAudioFile] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [aboutYou, setAboutYou] = useState([]);

  const [featuresList, setFeaturesList] = useState([]);
  const [features, setFeature] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [instagramFollowers, setInstagramFollowers] = useState("");
  const [facebookFollowers, setfacebookFollowers] = useState("");
  const [xtwitterFollowers, setXtwitterFollowers] = useState("");
  const [linkedinFollowers, setlinkedinFollowers] = useState("");
  const [threadsFollowers, setThreadsFollowers] = useState("");
  const [tiktoksFollowers, setTiktoksFollowers] = useState("");
  const [youtubesFollowers, setYoutubesFollowers] = useState("");
  const [idType, setIdType] = useState("");
  const [verificationID, setVerificationID] = useState("");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const kidsImage = require("../assets/images/kidsImage.png");
  const paramsValues = window.location.search;
  const urlParams = new URLSearchParams(paramsValues);
  const [updateDisabled, setUpdateDisabled] = useState(false);

  const userId = urlParams.get("userId");
  console.log(userId, "userId");

  useEffect(() => {
    getFeatures();
  }, []);
  useEffect(() => {
    getFeatures();
    console.log(profileFile, "profileFile");
    console.log(portofolioFile, "portofolioFile");
    console.log(portofolioFile.length, "portofolioFile.length");
    if (profileFile === null || portofolioFile.length === 0) {
      setUpdateDisabled(true);
    } else if (profileFile !== null || portofolioFile.length !== 0) {
      setUpdateDisabled(false);
    }
  }, [profileFile, portofolioFile]);

  useEffect(() => {
    console.log(updateDisabled, "updateDisabled");
  }, [updateDisabled]);

  const handleProfileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log(droppedFiles[0], "droppedFiles");
    uploadFile(droppedFiles[0]);
    // setFiles(droppedFiles);
  };

  const onEditorSummary = (editorState) => {
    console.log(editorState, "editorState");
    // setAboutYou([draftToHtml(convertToRaw(editorState.getCurrentContent()))]);
    setAboutYou(editorState);
    setEditorState(editorState);
  };

  const handleProfileDragOver = (e) => {
    e.preventDefault();
  };
  const handlePortofolioDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log(droppedFiles[0], "droppedFiles");
    uploadFile(droppedFiles[0]);
    // setFiles(droppedFiles);
  };

  const handlePortofolioDragOver = (e) => {
    e.preventDefault();
  };
  const handleVideoDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log(droppedFiles[0], "droppedFiles");
    uploadVideoudio(droppedFiles[0]);
    // setFiles(droppedFiles);
  };

  const handleVideoDragOver = (e) => {
    e.preventDefault();
  };
  const handleResumeDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log(droppedFiles[0], "droppedFiles");
    uploadResume(droppedFiles[0]);
    // setFiles(droppedFiles);
  };

  const handleResumeDragOver = (e) => {
    e.preventDefault();
  };

  const profileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      console.log(fileData, "fileData");
      uploadProfile(fileData);
    }
  };
  const portofolioUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      console.log(fileData, "fileData");
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
      console.log(fileData, "fileData resume");
      uploadResume(fileData);
    }
  };

  const verificationUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      uploadVerificationID(fileData);
    }
  };

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
        console.log(fileObj, "fileObj profileFile");
        setProfileFile(fileObj);

        console.log(profileFile, "profileFile");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  const uploadFile = async (fileData) => {
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
        console.log(portofolioFile, "portofolioFile");
        setOpenPopUp(true);
        setTimeout(function() {
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
        setTimeout(function() {
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
        setTimeout(function() {
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
        setTimeout(function() {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (option) => {
    // Handle the option click here
    if (option === "view") {
      // Code to view the image in a new window
      window.open("your-image-url", "_blank");
    } else if (option === "delete") {
      // Code to delete the image
    }

    // Hide the options after selection
    setShowOptions(false);
  };

  const handleView = (imageUrl) => {
    let viewImage = `${API.userFilePath}${imageUrl?.fileData}`;
    window.open(viewImage, "_blank");
  };

  // Function to handle deleting image
  const handleProfileDelete = () => {
    setProfileFile(null);
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

  const getFeatures = async () => {
    await ApiHelper.get(API.getFeatures)
      .then((resData) => {
        if (resData) {
          setFeaturesList(resData.data.data[0].features);
        }
      })
      .catch((err) => {});
  };

  const handleFeaturesChange = (label, value) => {
    const updatedValues = [...features];
    const index = updatedValues.findIndex((item) => item.label === label);
    if (index !== -1) {
      updatedValues[index] = { label, value };
    } else {
      updatedValues.push({ label, value });
    }
    console.log(updatedValues, "updatedValues");
    setFeature(updatedValues);
  };

  const editKids = async () => {
    // navigate(`/talent-signup-files-success`);
    const formData = {
      image: profileFile,
      cv: resumeFile,
      portfolio: portofolioFile,
      videosAndAudios: videoAUdioFile,
      instaFollowers: instagramFollowers,
      tiktokFollowers: tiktoksFollowers,
      twitterFollowers: xtwitterFollowers,
      youtubeFollowers: youtubesFollowers,
      facebookFollowers: facebookFollowers,
      linkedinFollowers: linkedinFollowers,
      threadsFollowers: threadsFollowers,
      idType: idType,
      verificationId: verificationID,
      features: features,
      childAboutYou: aboutYou,
    };
    setIsLoading(true);
    await ApiHelper.post(`${API.editKids}${userId}`, formData)
      .then((resData) => {
        console.log(resData, "resData");
        console.log(resData.data, "resData.data");
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Updated SuccessFully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            navigate(`/talent-signup-service-details?${userId}`);
          }, 1000);
        } else {
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const goBack = () => {
    navigate(`/talent-signup-plan-details?userId=${userId}`);
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
            <div className="step-text">Step 5 of 6</div>
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
                  <img src={kidsImage} className="kids-image-sticky" alt="" />
                </div>
              </div>

              <div className="kids-form col-md-8 col-lg-9">
                <div className="kids-description">
                  Upload Your Files & Connect With your social media accounts
                </div>
                <div className="kids-main">
                  <div className="kids-form-title pb-0">
                    Profile Picture <span className="astrix">*</span>
                  </div>
                  <div
                    className="cv-section"
                    onDrop={handleProfileDrop}
                    onDragOver={handleProfileDragOver}
                  >
                    <label className="upload-backdrop" htmlFor="profile-image">
                      <img src={uploadIcon} alt="" />
                    </label>
                    <input
                      type="file"
                      className="select-cv-input"
                      id="profile-image"
                      accept="image/*"
                      onChange={profileUpload}
                    />
                    <div className="upload-text">Upload Your Profile Photo</div>
                    <div className="upload-info">
                      Drag and drop your Profile Photo here.
                    </div>
                  </div>
                  {profileFile && (
                    <>
                      <div className="uploaded-file-wrapper">
                        <div className="file-section">
                          {profileFile.type === "image" && (
                            <div className="fileType">
                              <img src={imageType} alt="" />
                            </div>
                          )}
                          <div className="fileName">{profileFile.title}</div>
                        </div>
                        <div className="file-options">
                          <div className="sucess-tick">
                            <img src={greenTickCircle} alt="" />
                          </div>
                          <div className="option-menu">
                            <div className="dropdown">
                              <img
                                onClick={() => setShowOptions(!showOptions)}
                                src={elipsis}
                                alt=""
                                className="dropdown-toggle elipsis-icon"
                                type="button"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              />
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <li>
                                  <a
                                    className="dropdown-item"
                                    onClick={() => handleView(profileFile)}
                                    id="view"
                                  >
                                    View
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    onClick={() =>
                                      handleProfileDelete(profileFile)
                                    }
                                    id="delete"
                                  >
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="kids-form-title pb-1">Bio</div>

                  <div className="rich-editor">
                    <label className="form-label">About You</label>
                    <Editor
                      editorState={editorState}
                      editorStyle={{ overflow: "hidden" }}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={onEditorSummary}
                      toolbar={{
                        options: [
                          "inline",
                          "blockType",
                          "fontSize",
                          "list",
                          "textAlign",
                          "history",
                        ],
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                      }}
                    />
                  </div>

                  <div className="kids-form-title pb-0">
                    Portfolio <span className="astrix">*</span>
                  </div>
                  <div
                    className="cv-section"
                    onDrop={handlePortofolioDrop}
                    onDragOver={handlePortofolioDragOver}
                  >
                    <label className="upload-backdrop" htmlFor="portofolio">
                      <img src={uploadIcon} alt="" />
                    </label>
                    <input
                      type="file"
                      className="select-cv-input"
                      id="portofolio"
                      accept="image/*"
                      multiple
                      onChange={portofolioUpload}
                    />
                    <div className="upload-text">Upload Your Photos</div>
                    <div className="upload-info">
                      Drag and drop your photos/work samples here.
                    </div>
                  </div>

                  {portofolioFile && (
                    <>
                      {portofolioFile.map((item, index) => {
                        return (
                          <>
                            <div key={index} className="uploaded-file-wrapper">
                              <div className="file-section">
                                {item.type === "image" && (
                                  <div className="fileType">
                                    <img src={imageType} alt="" />
                                  </div>
                                )}
                                {item.type === "audio" && (
                                  <div className="fileType">
                                    <img src={audiotype} alt="" />
                                  </div>
                                )}
                                {item.type === "video" && (
                                  <div className="fileType">
                                    <img src={videoType} alt="" />
                                  </div>
                                )}
                                {item.type === "document" && (
                                  <div className="fileType">
                                    <img src={docsIcon} alt="" />
                                  </div>
                                )}
                                <div className="fileName">{item.title}</div>
                              </div>
                              <div className="file-options">
                                <div className="sucess-tick">
                                  <img src={greenTickCircle} alt="" />
                                </div>
                                <div className="option-menu">
                                  <div className="dropdown">
                                    <img
                                      onClick={() =>
                                        setShowOptions(!showOptions)
                                      }
                                      src={elipsis}
                                      alt=""
                                      className="dropdown-toggle elipsis-icon"
                                      type="button"
                                      id="dropdownMenuButton"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    />
                                    <ul
                                      className="dropdown-menu"
                                      aria-labelledby="dropdownMenuButton"
                                    >
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleView(item)}
                                          id="view"
                                        >
                                          View
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          onClick={() =>
                                            handlePortofolioDelete(item)
                                          }
                                          id="delete"
                                        >
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}

                  <div
                    className="cv-section"
                    onDrop={handleVideoDrop}
                    onDragOver={handleVideoDragOver}
                  >
                    <label className="upload-backdrop" htmlFor="video-audio">
                      <img src={uploadIcon} alt="" />
                    </label>
                    <input
                      type="file"
                      className="select-cv-input"
                      id="video-audio"
                      accept="audio/*,video/*"
                      onChange={videoAudioUpload}
                    />
                    <div className="upload-text">Videos & Audios</div>
                    <div className="upload-info">
                      Upload your previous work samples videos/audios.
                    </div>
                  </div>
                  {videoAUdioFile && (
                    <>
                      {videoAUdioFile.map((item, index) => {
                        return (
                          <>
                            <div key={index} className="uploaded-file-wrapper">
                              <div className="file-section">
                                {item.type === "image" && (
                                  <div className="fileType">
                                    <img src={imageType} alt="" />
                                  </div>
                                )}
                                {item.type === "audio" && (
                                  <div className="fileType">
                                    <img src={audiotype} alt="" />
                                  </div>
                                )}
                                {item.type === "video" && (
                                  <div className="fileType">
                                    <img src={videoType} alt="" />
                                  </div>
                                )}
                                {item.type === "document" && (
                                  <div className="fileType">
                                    <img src={docsIcon} alt="" />
                                  </div>
                                )}

                                <div className="fileName">{item.title}</div>
                              </div>
                              <div className="file-options">
                                <div className="sucess-tick">
                                  <img src={greenTickCircle} alt="" />
                                </div>
                                <div className="option-menu">
                                  <img
                                    className="dropdown-toggle elipsis-icon"
                                    type="button"
                                    id="videoDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    src={elipsis}
                                    alt=""
                                  />
                                  <ul
                                    className="dropdown-menu"
                                    aria-labelledby="videoDropdown"
                                  >
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        onClick={() => handleView(item)}
                                        id="view"
                                      >
                                        View
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        onClick={() => handleVideoDelete(item)}
                                        id="delete"
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}
                  <div className="kids-form-title pb-0">CV</div>
                  <div
                    className="cv-section"
                    onDrop={handleResumeDrop}
                    onDragOver={handleResumeDragOver}
                  >
                    <label className="upload-backdrop" htmlFor="cv-input">
                      <img src={uploadIcon} alt="" />
                    </label>
                    <input
                      type="file"
                      className="select-cv-input"
                      id="cv-input"
                      accept="*/*"
                      onChange={resumeUpload}
                    />
                    <div className="upload-text"> Upload CV</div>
                    <div className="upload-info">
                      Drag and drop CV to upload
                    </div>
                  </div>
                  {resumeFile && (
                    <>
                      {resumeFile.map((item, index) => {
                        return (
                          <>
                            <div key={index} className="uploaded-file-wrapper">
                              <div className="file-section">
                                {item.type === "image" && (
                                  <div className="fileType">
                                    <img src={imageType} alt="" />
                                  </div>
                                )}
                                {item.type === "audio" && (
                                  <div className="fileType">
                                    <img src={audiotype} alt="" />
                                  </div>
                                )}
                                {item.type === "video" && (
                                  <div className="fileType">
                                    <img src={videoType} alt="" />
                                  </div>
                                )}
                                {item.type === "document" && (
                                  <div className="fileType">
                                    <img src={docsIcon} alt="" />
                                  </div>
                                )}
                                <div className="fileName">{item.title}</div>
                              </div>
                              <div className="file-options">
                                <div className="sucess-tick">
                                  <img src={greenTickCircle} alt="" />
                                </div>
                                <div className="option-menu">
                                  <div className="dropdown">
                                    <img
                                      onClick={() =>
                                        setShowOptions(!showOptions)
                                      }
                                      src={elipsis}
                                      alt=""
                                      className="dropdown-toggle elipsis-icon"
                                      type="button"
                                      id="resumeDropdown"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    />
                                    <ul
                                      className="dropdown-menu"
                                      aria-labelledby="resumeDropdown"
                                    >
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleView(item)}
                                          id="view"
                                        >
                                          View
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          onClick={() =>
                                            handleResumeDelete(item)
                                          }
                                          id="delete"
                                        >
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}

                  <div className="kids-form-title">Features (Optional)</div>

                  <div className="features-section">
                    {featuresList && (
                      <>
                        {featuresList.map((item, index) => {
                          return (
                            <>
                              <div className="mb-3 features-input-wrapper">
                                <label className="form-label">
                                  {item.label}
                                </label>
                                <select
                                  className="form-select features-select"
                                  aria-label="Default select example"
                                  onChange={(e) =>
                                    handleFeaturesChange(
                                      item.label,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="" disabled selected>
                                    {item.label}
                                  </option>
                                  {item.options.map((option, idx) => (
                                    <option key={idx} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                  </div>

                  <div className="kids-form-title">ID Verification</div>

                  <div className="id-verify-info">
                    To ensure authenticity and compliance, please upload a clear
                    and legible copy of your government-issued ID. After
                    successful verification, your ID will be promptly removed
                    from our database to prioritize your privacy and data
                    security
                  </div>

                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3 mt-3">
                     
                        <label className="form-label">ID Type</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) => {
                            setIdType(e.target.value);
                          }}
                        >
                          <option defaultValue value="universal_id">
                            National ID/Citizenship Card
                          </option>
                          <option defaultValue value="licence">
                            Licence
                          </option>
                          <option value="passport">Passport</option>
                        </select>
                      
                    </div>
                  </div>

                  <div className="verification-section">
                    <div className="id-image">
                      <img src={idCard} alt="" />
                    </div>
                    <div className="id-text" htmlFor="id-upload">
                      Upload Parents ID
                    </div>
                    <label className="id-choose" htmlFor="id-upload">
                      Choose ID
                    </label>
                    <input
                      type="file"
                      className="select-cv-input"
                      id="id-upload"
                      accept="*/*"
                      onChange={verificationUpload}
                    />
                  </div>

                  {verificationID && (
                    <>
                      {verificationID.map((item, index) => {
                        return (
                          <>
                            <div key={index} className="uploaded-file-wrapper">
                              <div className="file-section">
                                {item.type === "image" && (
                                  <div className="fileType">
                                    <img src={imageType} alt="" />
                                  </div>
                                )}
                                {item.type === "audio" && (
                                  <div className="fileType">
                                    <img src={audiotype} alt="" />
                                  </div>
                                )}
                                {item.type === "video" && (
                                  <div className="fileType">
                                    <img src={videoType} alt="" />
                                  </div>
                                )}
                                {item.type === "document" && (
                                  <div className="fileType">
                                    <img src={docsIcon} alt="" />
                                  </div>
                                )}
                                <div className="fileName">{item.title}</div>
                              </div>
                              <div className="file-options">
                                <div className="sucess-tick">
                                  <img src={greenTickCircle} alt="" />
                                </div>
                                <div className="option-menu">
                                  <div className="dropdown">
                                    <img
                                      onClick={() =>
                                        setShowOptions(!showOptions)
                                      }
                                      src={elipsis}
                                      alt=""
                                      className="dropdown-toggle elipsis-icon"
                                      type="button"
                                      id="dropdownMenuButton"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    />
                                    <ul
                                      className="dropdown-menu"
                                      aria-labelledby="dropdownMenuButton"
                                    >
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          onClick={() => handleView(item)}
                                          id="view"
                                        >
                                          View
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          onClick={() =>
                                            handlePortofolioDelete(item)
                                          }
                                          id="delete"
                                        >
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}

                  <div className="verification-status mb-5">Not Verified</div>
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
            className={
              updateDisabled
                ? "step-continue disabled-continue"
                : "step-continue"
            }
            onClick={(e) => {
              if (updateDisabled === false) {
                editKids();
              }
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

export default KidsFormThree;
