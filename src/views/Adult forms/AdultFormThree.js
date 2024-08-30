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
import "../../assets/css/talent-dashboard.css";
import CurrentUser from "../../CurrentUser";
import RichTextEditor from "../RichTextEditor";
import CreatableSelect from "react-select/creatable";
import useFieldDatas from "../../config/useFieldDatas";
import "../../assets/css/forms/login.css";
import "../../assets/css/dashboard.css";
import "../../assets/css/register.css";
import "../../assets/css/kidsmain.scss";
import "../../assets/css/forms/kidsformthree.css";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Regular expressions for different video platforms
const urlPatterns = {
  youtube:
    /^.*(youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([^"&?\/\s]{11})/,
  vimeo: /^.*(vimeo\.com\/)(\d+|[\w-]+\/[\w-]+)(?:\?.*)?$/,
  instagram: /^.*(instagram\.com\/(p|reel|tv)\/[^/?#&]+)\/?(?:\?.*)?$/,
  twitter: /^.*((twitter|x)\.com\/.*\/status\/\d+)\/?$/,
};

const isValidUrl = (url) => {
  return (
    urlPatterns.youtube.test(url) ||
    urlPatterns.vimeo.test(url) ||
    urlPatterns.instagram.test(url) ||
    urlPatterns.twitter.test(url)
  );
};

const AdultFormThree = () => {
  const {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
    fcmToken,
  } = CurrentUser();
  const { featuresList } = useFieldDatas();

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

  const [videoUrl, setVideoUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [checkVideoUrl, setCheckVideoUrl] = useState(false);
  const [checkAudioUrl, setCheckAudioUrl] = useState(false);
  const [urls, setUrls] = useState([]);
  const [audioUrlsList, setAudioUrlsList] = useState([]);

  const navigate = useNavigate();
  const [updateDisabled, setUpdateDisabled] = useState(false);

  useEffect(() => {
    if (profileFile === null || portofolioFile.length === 0) {
      setUpdateDisabled(true);
    } else if (profileFile !== null || portofolioFile.length !== 0) {
      setUpdateDisabled(false);
    }
  }, [profileFile, portofolioFile]);

  useEffect(() => {}, [updateDisabled]);
  useEffect(() => {}, [featuresList]);

  const onEditorSummary = (editorState) => {
    setAboutYou([draftToHtml(convertToRaw(editorState.getCurrentContent()))]);
    setEditorState(editorState);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dropDownClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleFileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isValidNewOption = (inputValue) => {
    return !isNaN(inputValue) && inputValue.trim() !== "";
  };

  const handleInputChange = (inputValue, actionMeta) => {
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    return numericValue;
  };

  const handleKeyDown = (event) => {
    const key = event.key;
    const isNumberKey = /^[0-9]$/.test(key);
    const isAllowedKey =
      isNumberKey ||
      key === "Backspace" ||
      key === "Delete" ||
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "Tab";

    if (!isAllowedKey) {
      event.preventDefault();
    }
  };

  const handleFeaturesChange = (label, value) => {
    console.log(label, "label", value, "value", "handleFeaturesChange");
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
        return;
      }
    }

    if (index !== -1) {
      updatedValues[index] = { label, value: finalValue };
    } else {
      updatedValues.push({ label, value: finalValue });
    }

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

  const cmPlaceholderOptions = ["Height", "Chest", "Waist", "Hip Size"];

  const getPlaceholder = (label) => {
    if (cmPlaceholderOptions.includes(label)) {
      return "Type in cm";
    }
    if (
      label === "Shoe Size" ||
      label === "Bra Size" ||
      label === "Dress Size"
    ) {
      return "US or EU size only";
    }
    return label;
  };

  const updateAdultSignup = async () => {
    let formData = {
      image: profileFile,
      cv: resumeFile,
      portfolio: portofolioFile,
      idType: idType,
      verificationId: verificationID,
      childAboutYou: aboutYou,
      features: features,
      videoList: urls,
      audioList: audioUrlsList,
    };
    await ApiHelper.post(`${API.updateAdults}${queryString}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Updated Successfully!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            if (talentData?.planName == "Basic") {
              navigate(`/talent/${talentData.publicUrl}`, {
                state: { talentData: talentData },
              });
            } else {
              navigate(`/adult-signup-service-details?${queryString}`);
            }
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

    uploadProfile(droppedFiles[0]);
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
        // Logging each file object

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
      const file = event.target.files[0];

      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        // Show error message for non-image files
        setMessage("You can only upload images");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
        return; // Stop further execution
      }

      uploadProfile(file);
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
          type: resData.data.data.filetype,
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

  const handleVerificationDelete = () => {
    setVerificationID(null);
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

  const handleEditorStateChange = (editorState) => {
    setAboutYou(editorState);
  };

  useEffect(() => {}, [verificationID]);

  const handleAddUrl = () => {
    if (videoUrl.trim() !== "") {
      if (isValidUrl(videoUrl)) {
        setUrls([...urls, videoUrl]);
        setVideoUrl("");
        setCheckVideoUrl(false);
      } else {
        setCheckVideoUrl(true);
      }
    }
  };

  const isNotKnownFormatUrl = (url) => {
    return !(
      urlPatterns.youtube.test(url) ||
      urlPatterns.vimeo.test(url) ||
      urlPatterns.instagram.test(url) ||
      urlPatterns.twitter.test(url)
    );
  };

  const handleAudioUrl = () => {
    if (audioUrl.trim() !== "") {
      if (isNotKnownFormatUrl(audioUrl)) {
        setAudioUrlsList([...audioUrlsList, audioUrl]);
        setAudioUrl("");
        setCheckAudioUrl(false);
      } else {
        setCheckAudioUrl(true);
      }
    }
  };

  const handleUrlChange = (e) => {
    if (e.inputType === "insertFromPaste") return;
    const url = e.target.value;

    setVideoUrl(url);
    // Validate URL in real-time
    setCheckVideoUrl(!isValidUrl(url));
  };

  const handleAudioChange = (e) => {
    if (e.inputType === "insertFromPaste") return;
    const url = e.target.value;
    setAudioUrl(url);
    // Validate URL in real-time
    setCheckAudioUrl(!isNotKnownFormatUrl(url));
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );
    setVideoUrl(pastedText);
    // Validate pasted URL
    setCheckVideoUrl(!isValidUrl(pastedText));
  };

  const handleAudioPaste = (e) => {
    e.preventDefault();
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );
    setAudioUrl(pastedText);
    // Validate pasted URL
    setCheckAudioUrl(!isNotKnownFormatUrl(pastedText));
  };

  const handleDeleteUrl = (index) => {
    const newUrls = urls.filter((url, i) => i !== index);
    setUrls(newUrls);
  };

  const deleteAudioUrl = (index) => {
    const newUrls = audioUrlsList.filter((url, i) => i !== index);
    setAudioUrlsList(newUrls);
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
              <div className="step-text">Step 3 of 4</div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                navigate("/");
              }}
            ></button>
          </div>
          <div className="dialog-body spaceTops">
            <div className="kidsform-one container">
              <div className="adult-form-wrapper row ml-0 mr-0">
                <div className="col-md-4 col-lg-3 mb-2">
                  <div className="fixImgs">
                    <img
                      src={adultsBanner}
                      className="kids-image-sticky "
                      alt="img"
                    />
                  </div>
                </div>
                <div className="adult-main remvSpc col-md-8 col-lg-9">
                  <div className="adults-form-title">Complete your Profile</div>
                  <div className="adults-titles kids-form-title">
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

                        <div className="update-portfolio-action">
                          <IconButton
                            aria-label="more"
                            aria-controls="dropdown-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="dropdown-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem
                              onClick={() => {
                                handleClose();
                                handleView(profileFile);
                              }}
                            >
                              View
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                dropDownClose();
                                handleProfileDelete(profileFile);
                              }}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="adults-titles kids-form-title">
                    <span>Bio</span>
                  </div>
                  <div className="rich-editor mb-5">
                    <label className="form-label">About You</label>
                    {/* <Editor
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

                  <div className="adults-titles kids-form-title">
                    <span>
                      Portfolio<span className="astrix">*</span>
                    </span>
                  </div>
                  <div
                    className="cv-section mt-0"
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
                      onChange={portofolioUpload}
                      multiple
                    />
                    <div className="upload-text">Upload Your Photos</div>
                    <div className="upload-info">
                      Drag and drop your photos/work samples here.
                    </div>
                  </div>

                  <div className="uploaded-file-wrapper-main">
                    {portofolioFile && (
                      <>
                        {portofolioFile.map((item, index) => {
                          return (
                            <>
                              <div
                                key={index}
                                className="uploaded-file-wrapper"
                              >
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

                                <div className="update-portfolio-action">
                                  <IconButton
                                    aria-label="more"
                                    aria-controls="dropdown-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                  >
                                    <MoreVertIcon />
                                  </IconButton>
                                  <Menu
                                    id="dropdown-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                  >
                                    <MenuItem
                                      onClick={() => {
                                        handleClose();
                                        handleView(item);
                                      }}
                                    >
                                      View
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() => {
                                        dropDownClose();
                                        handlePortofolioDelete(item);
                                      }}
                                    >
                                      Delete
                                    </MenuItem>
                                  </Menu>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                  </div>

                  <div className="videos-label">
                    ( Upload your previous work samples Videos/Audios)
                  </div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Videos</label>

                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control mt-2 ml-3"
                          value={videoUrl}
                          onChange={(e) => {
                            handleUrlChange(e);
                          }}
                          onPaste={handlePaste}
                          placeholder="Paste Video Url"
                        ></input>
                        <i
                          className="bi bi-plus-circle-fill pl-4 add-vidoe-icon"
                          onClick={handleAddUrl}
                        ></i>
                      </div>
                      {checkVideoUrl && (
                        <>
                          <div className="invalid-fields">
                            Invalid video URL. Please enter a valid YouTube,
                            Vimeo, Instagram, or Twitter URL.
                          </div>
                        </>
                      )}
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

                              <div className="update-portfolio-action">
                                <IconButton
                                  aria-label="more"
                                  aria-controls="dropdown-menu"
                                  aria-haspopup="true"
                                  onClick={handleClick}
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="dropdown-menu"
                                  anchorEl={anchorEl}
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      dropDownClose();
                                      handleDeleteUrl(index);
                                    }}
                                  >
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}

                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Audios</label>
                      {/* <div className="videos-label">
                        ( Upload your previous work samples audios.)
                      </div> */}
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control mt-2 ml-3"
                          value={audioUrl}
                          onChange={(e) => {
                            handleAudioChange(e);
                          }}
                          onPaste={handleAudioPaste}
                          placeholder="Paste Audio Url"
                        ></input>
                        <i
                          className="bi bi-plus-circle-fill pl-4 add-vidoe-icon"
                          onClick={handleAudioUrl}
                        ></i>
                      </div>
                      {checkAudioUrl && (
                        <>
                          <div className="invalid-fields">
                            Invalid Audio URL. Please enter a valid Audio URL .
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {audioUrlsList && (
                    <>
                      {audioUrlsList.map((url, index) => {
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

                              <div className="update-portfolio-action">
                                <IconButton
                                  aria-label="more"
                                  aria-controls="dropdown-menu"
                                  aria-haspopup="true"
                                  onClick={handleClick}
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="dropdown-menu"
                                  anchorEl={anchorEl}
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      dropDownClose();
                                      deleteAudioUrl(index);
                                    }}
                                  >
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}

                  <div className="adults-titles kids-form-title">
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
                      multiple
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

                              <div className="update-portfolio-action">
                                <IconButton
                                  aria-label="more"
                                  aria-controls="dropdown-menu"
                                  aria-haspopup="true"
                                  onClick={handleClick}
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="dropdown-menu"
                                  anchorEl={anchorEl}
                                  open={Boolean(anchorEl)}
                                  onClose={handleClose}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      handleClose();
                                      handleView(item);
                                    }}
                                  >
                                    View
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      dropDownClose();
                                      handleResumeDelete(item);
                                    }}
                                  >
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}

                  <div className="adults-titles">Features (Optional)</div>

                  <div className="features-section">
                    {" "}
                    <div className="row">
                      {featuresList && (
                        <>
                          {featuresList.map((item, index) => (
                            <div
                              key={index}
                              className="mb-3 col-md-3 features-input-wrapper"
                            >
                              <label className="form-label">{item.label}</label>
                              {creatableOptions.includes(item.label) ? (
                                <CreatableSelect
                                  onKeyDown={handleKeyDown}
                                  isClearable
                                  options={item.options.map((option) => ({
                                    value: option,
                                    label: option,
                                  }))}
                                  isValidNewOption={isValidNewOption}
                                  onInputChange={handleInputChange}
                                  onChange={(selectedOption) => {
                                    const value = selectedOption.value;
                                    // Check if the value is a valid number and is non-negative
                                    if (
                                      /^\d*\.?\d*$/.test(value) &&
                                      (value >= 0 || value === "")
                                    ) {
                                      handleFeaturesChange(
                                        item.label,
                                        selectedOption
                                          ? selectedOption.value
                                          : ""
                                      );
                                    }
                                  }}
                                  placeholder={getPlaceholder(item.label)}
                                />
                              ) : creatableInputOptions.includes(item.label) ? (
                                <input
                                  min="0"
                                  type="number"
                                  onKeyDown={handleKeyDown}
                                  className="form-control features-select"
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    if (
                                      /^\d*\.?\d*$/.test(value) &&
                                      (value >= 0 || value === "")
                                    ) {
                                      handleFeaturesChange(item.label, value);
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
                    </div>{" "}
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

                  <div className="kids-form-row mb-5">
                    <div className="kids-form-section col-md-6">
                      <div className="mb-3 mt-3">
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
                        style={{ marginBottom: "100px" }}
                        className="uploaded-file-wrapper"
                      >
                        <div className="file-section">
                          {verificationID[0].type === "image" && (
                            <div className="fileType">
                              <img src={imageType} alt="" />
                            </div>
                          )}
                          {verificationID[0].type === "document" && (
                            <div className="fileType">
                              <img src={docsIcon} alt="" />
                            </div>
                          )}
                          <div className="fileName">
                            {verificationID[0].title}
                          </div>
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
          <div className="dialog-footer">
            <button
              type="button"
              onClick={(e) => {
                navigate(`/adult-social-medias-details?${talentData?._id}`);
              }}
              className="step-back"
            >
              Back
            </button>

            <button
              className={
                updateDisabled
                  ? "step-continue disabled-continue"
                  : "step-continue"
              }
              onClick={(e) => {
                if (updateDisabled === false) {
                  updateAdultSignup();
                }
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

export default AdultFormThree;
