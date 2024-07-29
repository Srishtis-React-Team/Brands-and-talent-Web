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
import CurrentUser from "../../src/CurrentUser";
import RichTextEditor from "../views/RichTextEditor";
import CreatableSelect from "react-select/creatable";
import useFieldDatas from "../config/useFieldDatas";

const KidsFormThree = ({ onDataFromChild, ...props }) => {
  const { featuresList } = useFieldDatas();
  const [customOptions, setCustomOptions] = useState({});
  const paramsValues = window.location.search;
  const urlParams = new URLSearchParams(paramsValues);
  const [updateDisabled, setUpdateDisabled] = useState(false);

  const userId = urlParams.get("userId");
  console.log(userId, "userId");

  const {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
    fcmToken,
  } = CurrentUser();

  const [talentData, setTalentData] = useState();

  useEffect(() => {
    if (userId) {
      getTalentById();
    }
  }, [userId]);

  const getTalentById = async () => {
    await ApiHelper.post(`${API.getTalentById}${userId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            console.log(resData.data.data, "getTalentById");
            setTalentData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(talentData, "talentDataKidsThree");
  }, [talentData]);

  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.png");
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
  const [features, setFeature] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [instagramFollowers, setInstagramFollowers] = useState("");
  const [facebookFollowers, setfacebookFollowers] = useState("");
  const [xtwitterFollowers, setXtwitterFollowers] = useState("");
  const [linkedinFollowers, setlinkedinFollowers] = useState("");
  const [threadsFollowers, setThreadsFollowers] = useState("");
  const [tiktoksFollowers, setTiktoksFollowers] = useState("");
  const [youtubesFollowers, setYoutubesFollowers] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [urls, setUrls] = useState([]);

  const [idType, setIdType] = useState("");
  const [verificationID, setVerificationID] = useState("");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const kidsImage = require("../assets/images/kidsImage.png");

  useEffect(() => {
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
    uploadProfile(droppedFiles[0]);
    // setFiles(droppedFiles);
  };

  const handleEditorStateChange = (editorState) => {
    console.log(editorState, "editorStateRichText");
    setAboutYou(editorState);
  };

  const handleProfileDragOver = (e) => {
    e.preventDefault();
  };

  const handlePortofolioDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    // Filter only image files
    const imageFiles = droppedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    // Check if there are non-image files
    const nonImageFiles = droppedFiles.filter(
      (file) => !file.type.startsWith("image/")
    );

    if (nonImageFiles.length > 0) {
      // Show error message and popup for non-image files
      setMessage("You can only upload images");
      setOpenPopUp(true);
      setTimeout(() => {
        setOpenPopUp(false);
      }, 1000);

      // Do not proceed with uploading non-image files
      return;
    }

    // Iterate through each image file and upload
    imageFiles.forEach((file) => {
      uploadFile(file);
    });
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

    // Filter only document files
    const documentFiles = droppedFiles.filter((file) =>
      isDocumentFile(file.type)
    );

    // Check if there are non-document files
    const nonDocumentFiles = droppedFiles.filter(
      (file) => !isDocumentFile(file.type)
    );

    if (nonDocumentFiles.length > 0) {
      // Show error message or handle non-document files here
      setMessage("You can only upload PDF, Word documents, etc.");
      setOpenPopUp(true);
      setTimeout(() => {
        setOpenPopUp(false);
      }, 1000);

      // Do not proceed with uploading non-document files
      return;
    }

    // Iterate through each document file and upload
    documentFiles.forEach((file) => {
      uploadResume(file);
    });
  };

  const handleResumeDragOver = (e) => {
    e.preventDefault();
  };

  const handleUrlChange = (e) => {
    setVideoUrl(e.target.value);
    console.log(e.target.value, "handleUrlChange");
  };

  const handleAddUrl = () => {
    if (videoUrl.trim() !== "") {
      setUrls([...urls, videoUrl]);
      console.log([...urls, videoUrl], "handleAddUrl");
      setVideoUrl("");
    }
  };

  const handlePaste = (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );
    setVideoUrl(pastedText);
    console.log(pastedText, "handlePaste");
  };

  const handleDeleteUrl = (index) => {
    const newUrls = urls.filter((url, i) => i !== index);
    setUrls(newUrls);
  };

  const profileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        // Show error message for non-image files
        setMessage("You can only upload images");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
        }, 1000);
        return; // Stop further execution
      }

      console.log(file, "fileData");
      uploadProfile(file);
    }
  };

  const portofolioUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files); // Convert FileList to Array

      // Filter only image files
      const imageFiles = filesArray.filter((file) =>
        file.type.startsWith("image/")
      );

      // Check if there are non-image files
      const nonImageFiles = filesArray.filter(
        (file) => !file.type.startsWith("image/")
      );

      if (nonImageFiles.length > 0) {
        // Show error message and popup for non-image files
        setMessage("You can only upload images");
        setOpenPopUp(true);
        setTimeout(() => {
          setOpenPopUp(false);
        }, 1000);

        // Do not proceed with uploading non-image files
        return;
      }

      // Iterate through each image file and upload
      imageFiles.forEach((file) => {
        console.log(file, "fileData"); // Logging each file object

        // Call uploadFile function for each image file
        uploadFile(file);
      });
    }
  };

  const videoAudioUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      uploadVideoudio(fileData);
    }
  };

  const resumeUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files); // Convert FileList to Array

      // Filter only document files
      const documentFiles = filesArray.filter((file) =>
        isDocumentFile(file.type)
      );

      // Check if there are non-document files
      const nonDocumentFiles = filesArray.filter(
        (file) => !isDocumentFile(file.type)
      );

      if (nonDocumentFiles.length > 0) {
        // Show error message or handle non-document files here
        setMessage("You can only upload PDF, Word documents, etc.");
        setOpenPopUp(true);
        setTimeout(() => {
          setOpenPopUp(false);
        }, 1000);

        // Do not proceed with uploading non-document files
        return;
      }

      // Iterate through each document file and upload
      documentFiles.forEach((file) => {
        uploadResume(file);
      });
    }
  };

  // Helper function to check if a file type is a document (PDF, Word, etc.)
  const isDocumentFile = (fileType) => {
    // Add more document types as needed
    return (
      fileType === "application/pdf" ||
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      // Add more document MIME types as required
    );
  };

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp", // images
    "application/pdf", // PDF
    "application/msword", // DOC
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    "application/vnd.ms-excel", // XLS
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
    "application/vnd.ms-powerpoint", // PPT
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // PPTX
  ];

  const verificationUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      if (!allowedTypes.includes(fileData.type)) {
        setMessage("Only images and documents are allowed.");
        setOpenPopUp(true);
        setTimeout(() => {
          setOpenPopUp(false);
        }, 1000);
        return;
      }
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
        setVerificationID(fileObj);
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
  const handleVerificationDelete = () => {
    setVerificationID(null);
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

  const handleFeaturesChange = (label, value) => {
    const updatedValues = [...features];
    const index = updatedValues.findIndex((item) => item.label === label);
    let finalValue = value;

    if (
      creatableInputOptions.includes(label) ||
      creatableOptions.includes(label)
    ) {
      if (/^\d+$/.test(value)) {
        finalValue = `${value} cm`;
      } else {
        return; // Exit if the value is not a number
      }
    }

    if (index !== -1) {
      updatedValues[index] = { label, value: finalValue };
    } else {
      updatedValues.push({ label, value: finalValue });
    }

    console.log(updatedValues, "updatedValues");
    setFeature(updatedValues);
  };

  const creatableOptions = ["Dress Size", "Shoe Size"];

  const creatableInputOptions = [
    "Hip Size",
    "Waist",
    "Chest",
    "Height",
    "Bra Size",
  ];

  const cmPlaceholderOptions = [
    "Height",
    "Chest",
    "Waist",
    "Hip Size",
    "Bra Size",
  ];

  const getPlaceholder = (label) => {
    if (cmPlaceholderOptions.includes(label)) {
      return "Type in cm";
    }
    if (label === "Shoe Size") {
      return "US or EU size only";
    }
    return label;
  };

  const handleCreateOption = (label, inputValue) => {
    setCustomOptions((prevState) => ({
      ...prevState,
      [label]: (prevState[label] || []).concat(inputValue),
    }));
    handleFeaturesChange(label, inputValue);
  };

  const getOptions = (label, options) => {
    return options.concat(customOptions[label] || []).map((option) => ({
      value: option,
      label: option,
    }));
  };

  const editKids = async () => {
    // navigate(`/talent-signup-files-success`);
    const formData = {
      image: profileFile,
      cv: resumeFile,
      portfolio: portofolioFile,
      videosAndAudios: urls,
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
      videoAudioUrls: urls,
    };
    setIsLoading(true);
    // Log all the properties of formData
    console.log("kidsFiles Image:", formData.image);
    console.log("kidsFiles CV:", formData.cv);
    console.log("kidsFiles Portfolio:", formData.portfolio);
    console.log("kidsFiles Videos and Audios:", formData.videosAndAudios);
    console.log("kidsFiles Instagram Followers:", formData.instaFollowers);
    console.log("kidsFiles TikTok Followers:", formData.tiktokFollowers);
    console.log("kidsFiles Twitter Followers:", formData.twitterFollowers);
    console.log("kidsFiles YouTube Followers:", formData.youtubeFollowers);
    console.log("kidsFiles Facebook Followers:", formData.facebookFollowers);
    console.log("kidsFiles LinkedIn Followers:", formData.linkedinFollowers);
    console.log("kidsFiles Threads Followers:", formData.threadsFollowers);
    console.log("kidsFiles ID Type:", formData.idType);
    console.log("kidsFiles Verification ID:", formData.verificationId);
    console.log("kidsFiles Features:", formData.features);
    console.log("kidsFiles Child About You:", formData.childAboutYou);
    console.log("kidsFiles Video and Audio URLs:", formData.videoAudioUrls);
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
            // navigate(`/talent-signup-service-details?${userId}`);
            if (talentData?.planName == "Basic") {
              // navigate(
              //   `/talent/${talentData.publicUrl}`,
              //   {
              //     state: { talentData: talentData },
              //   }
              // );
              navigate(`/login?type=talent&user_id=${userId}`);
            } else {
              navigate(`/talent-signup-service-details?${userId}`);
            }
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

  useEffect(() => {
    console.log(videoUrl, "videoUrl");
    console.log(urls, "urls");
    console.log(featuresList, "featuresList");
  }, []);

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
                  Upload your files & connect with your social media accounts
                </div>
                <div className="kids-main">
                  <div className="kids-form-title pb-0">
                    <span>
                      Profile Picture <span className="astrix">*</span>
                    </span>
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
                    <div className="upload-text">Upload your profile photo</div>
                    <div className="upload-info">
                      Drag and drop your profile photo here.
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

                  <div className="kids-form-title pb-1">
                    <span>Bio</span>
                  </div>

                  <div className="rich-editor">
                    <label className="form-label">About you</label>
                    {/* <Editor
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

                      
                    /> */}

                    <RichTextEditor
                      value={aboutYou}
                      onChange={(editorState) =>
                        handleEditorStateChange(editorState)
                      }
                    />
                  </div>

                  <div className="kids-form-title pb-0">
                    <span>
                      Portfolio <span className="astrix">*</span>
                    </span>
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
                    <div className="upload-text">Upload your photos</div>
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

                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Videos & Audios</label>
                      <div className="videos-label">
                        ( Upload your previous work samples videos/audios.)
                      </div>
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control mt-2 ml-3"
                          value={videoUrl}
                          onChange={(e) => {
                            handleUrlChange(e);
                          }}
                          onPaste={handlePaste}
                          placeholder="Paste Videos/Audios Url"
                        ></input>
                        <i
                          className="bi bi-plus-circle-fill pl-4 add-vidoe-icon"
                          onClick={handleAddUrl}
                        ></i>
                      </div>
                    </div>
                  </div>

                  {urls && (
                    <>
                      {urls.map((url, index) => {
                        return (
                          <>
                            <div key={index} className="url-file-wrapper">
                              <div className="file-section">
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="url-fileName"
                                >
                                  {url}
                                </a>
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
                                          onClick={() => handleDeleteUrl(index)}
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

                  {/* <div
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
                  )} */}

                  <div className="kids-form-title pb-0">
                    <span>CV</span>
                  </div>
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
                      multiple
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

                  <div className="kids-form-title">
                    <span>Features (Optional)</span>
                  </div>

                  <div className="features-section">
                    {featuresList && (
                      <>
                        {featuresList.map((item, index) => (
                          <div
                            key={index}
                            className="mb-3 mr-3 features-input-wrapper"
                          >
                            <label className="form-label">{item.label}</label>
                            {creatableOptions.includes(item.label) ? (
                              <CreatableSelect
                                isClearable
                                options={item.options.map((option) => ({
                                  value: option,
                                  label: option,
                                }))}
                                onChange={(selectedOption) =>
                                  handleFeaturesChange(
                                    item.label,
                                    selectedOption ? selectedOption.value : ""
                                  )
                                }
                                placeholder={getPlaceholder(item.label)}
                              />
                            ) : creatableInputOptions.includes(item.label) ? (
                              <input
                                type="text"
                                className="form-control features-select"
                                onChange={(e) => {
                                  const value = e.target.value;
                                  // Check if the value is a valid number and is non-negative
                                  if (
                                    /^\d*\.?\d*$/.test(value) &&
                                    (value >= 0 || value === "")
                                  ) {
                                    handleFeaturesChange(
                                      item.label,
                                      e.target.value
                                    );
                                  }
                                }}
                                placeholder={getPlaceholder(item.label)}
                              />
                            ) : (
                              <select
                                className="form-select features-select"
                                aria-label="Default select example"
                                onChange={(e) =>
                                  handleFeaturesChange(
                                    item.label,
                                    e.target.value
                                  )
                                }
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  {item.label}
                                </option>
                                {item.options.map((option, idx) => (
                                  <option key={idx} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                  <div className="kids-form-title">
                    <span>ID Verification</span>
                  </div>

                  <div className="id-verify-info">
                    Stand out and secure more jobs and projects by becoming
                    Verified Talent! Submit your government-issued ID to get a
                    blue verification sticker on your profile. Your ID will be
                    permanently deleted from our database immediately after
                    verification, ensuring your data privacy.
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
                        <option defaultValue value="National ID Card">
                          National ID Card
                        </option>
                        <option defaultValue value="Driving License">
                          Driving License
                        </option>
                        <option value="Passport">Passport</option>
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
                      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      onChange={verificationUpload}
                    />
                  </div>

                  {verificationID && (
                    <>
                      <div
                        className="uploaded-file-wrapper"
                        style={{ marginBottom: "80px" }}
                      >
                        <div className="file-section">
                          {verificationID.type === "image" && (
                            <div className="fileType">
                              <img src={imageType} alt="" />
                            </div>
                          )}
                          <div className="fileName">{verificationID.title}</div>
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
                                    onClick={() => handleView(verificationID)}
                                    id="view"
                                  >
                                    View
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    onClick={() =>
                                      handleVerificationDelete(verificationID)
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

                  {/* <div className="verification-status mb-5">Not Verified</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dialog-footer">
          <button
            type="button"
            onClick={(e) => {
              goBack();
            }}
            className="step-back"
          >
            Back
          </button>

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
