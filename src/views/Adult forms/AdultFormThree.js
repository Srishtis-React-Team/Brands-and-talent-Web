import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsformthree.css";
import "../../assets/css/forms/kidsform-one.css";
import "../../assets/css/register.css";
import "../../assets/css/dashboard.css";
import "../../assets/css/kidsmain.scss";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import Axios from "axios";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import { useNavigate } from "react-router";
import RichTextEditor from "../../views/RichTextEditor";
import CreatableSelect from "react-select/creatable";
import useFieldDatas from "../../config/useFieldDatas";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Tooltip } from "react-tooltip";
import EditFeatures from "../../pages/EditFeatures";
// Regular expressions for different video platforms
const urlPatterns = {
  youtube:
    /^.*(youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/,
  vimeo: /^.*(vimeo\.com\/)(\d+|[\w-]+\/[\w-]+)(?:\?.*)?$/,
  instagram: /^.*(instagram\.com\/(p|reel|tv)\/[^/?#&]+)\/?(?:\?.*)?$/,
  twitter: /^.*((twitter|x)\.com\/.*\/status\/\d+)\/?$/,
};
const audioUrlPatterns = {
  youtube:
    /^.*(youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/,
  vimeo: /^.*(vimeo\.com\/)(\d+|[\w-]+\/[\w-]+)(?:\?.*)?$/,
  instagram: /^.*(instagram\.com\/(p|reel|tv)\/[^/?#&]+)\/?(?:\?.*)?$/,
  twitter: /^.*((twitter|x)\.com\/.*\/status\/\d+)\/?$/,
  audio: /\.(mp3|wav|ogg)$/i,
};

const isValidUrl = (url) => {
  return (
    urlPatterns.youtube.test(url) ||
    urlPatterns.vimeo.test(url) ||
    urlPatterns.instagram.test(url) ||
    urlPatterns.twitter.test(url)
  );
};

const AdultFormThree = ({ onDataFromChild, ...props }) => {
  const { featuresList } = useFieldDatas();
  const [customOptions, setCustomOptions] = useState({});
  const paramsValues = window.location.search;
  const urlParams = new URLSearchParams(paramsValues);
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const adultsBanner = require("../../assets/images/adultsBanner.png");
  const url = window.location.href;

  let queryString = url.split("?")[1];

  const userId = urlParams.get("userId");
  const [talentData, setTalentData] = useState();

  useEffect(() => {
    if (queryString) {
      getTalentById();
    }
  }, [queryString]);

  const getTalentById = async () => {
    await ApiHelper.post(`${API.getTalentById}${queryString}`)
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

  const navigate = useNavigate();
  const btLogo = require("../../assets/images/LOGO.png");
  const uploadIcon = require("../../assets/icons/uploadIcon.png");
  const imageType = require("../../assets/icons/imageType.png");
  const videoType = require("../../assets/icons/videoType.png");
  const audiotype = require("../../assets/icons/audiotype.png");
  const idCard = require("../../assets/icons/id-card.png");
  const elipsis = require("../../assets/icons/elipsis.png");
  const greenTickCircle = require("../../assets/icons/small-green-tick.png");
  const docsIcon = require("../../assets/icons/docsIcon.png");
  const [profileFile, setProfileFile] = useState(null);
  const [portofolioFile, setPortofolioFile] = useState([]);
  const [resumeFile, setResumeFile] = useState([]);
  const [videoAUdioFile, setVideoAudioFile] = useState([]);
  const [aboutYou, setAboutYou] = useState("");
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
  const [audioUrl, setAudioUrl] = useState("");
  const [checkVideoUrl, setCheckVideoUrl] = useState(false);
  const [checkAudioUrl, setCheckAudioUrl] = useState(false);
  const [urls, setUrls] = useState([]);
  const [audioUrlsList, setAudioUrlsList] = useState([]);

  const [idType, setIdType] = useState("");
  const [verificationID, setVerificationID] = useState([]);
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const kidsImage = require("../../assets/images/kidsImage.png");

  useEffect(() => {
    if (profileFile === null || portofolioFile?.length === 0) {
      setUpdateDisabled(true);
    } else if (profileFile !== null || portofolioFile?.length !== 0) {
      setUpdateDisabled(false);
    }
  }, [profileFile, portofolioFile]);

  useEffect(() => {}, [updateDisabled]);

  const handleProfileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    uploadProfile(droppedFiles[0]);
    e.target.value = null;
  };

  const handleEditorStateChange = (editorState) => {
    setAboutYou(editorState);
  };

  const handleProfileDragOver = (e) => {
    e.preventDefault();
  };

  const handlePortofolioDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    const nonImageFiles = droppedFiles.filter(
      (file) => !file.type.startsWith("image/")
    );

    if (nonImageFiles?.length > 0) {
      setMessage("You can only upload images");
      setOpenPopUp(true);
      setTimeout(() => {
        setOpenPopUp(false);
      }, 1000);
      return;
    }
    imageFiles.forEach((file) => {
      uploadFile(file);
    });
  };

  const handlePortofolioDragOver = (e) => {
    e.preventDefault();
  };
  const handleVideoDragOver = (e) => {
    e.preventDefault();
  };

  const handleEditFeatureChanges = (values) => {
    setFeature(values);
  };

  const handleResumeDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const documentFiles = droppedFiles.filter((file) =>
      isDocumentFile(file.type)
    );
    const nonDocumentFiles = droppedFiles.filter(
      (file) => !isDocumentFile(file.type)
    );

    if (nonDocumentFiles?.length > 0) {
      setMessage("You may upload only PDF and Word documents");
      setOpenPopUp(true);
      setTimeout(() => {
        setOpenPopUp(false);
      }, 1000);
      return;
    }
    documentFiles.forEach((file) => {
      uploadResume(file);
    });
    // Reset the input value to allow re-uploading the same file
    e.target.value = null;
  };

  const handleResumeDragOver = (e) => {
    e.preventDefault();
  };

  const handleAddUrl = () => {
    if (videoUrl.trim() !== "") {
      if (isValidUrl(videoUrl)) {
        // Determine allowed URL limits based on plan type
        let maxUrls;
        if (talentData?.planName === "Basic") {
          maxUrls = 2;
        } else if (talentData?.planName === "Pro") {
          maxUrls = 5;
        } else if (talentData?.planName === "Premium") {
          maxUrls = Infinity; // Unlimited
        }

        // Check if adding the new URL exceeds the limit
        if (urls?.length >= maxUrls) {
          let upgradeMessage;
          if (talentData?.planName === "Basic") {
            upgradeMessage =
              "To add more videos, please upgrade to pro or premium membership plan."; //"Upgrade to Pro to add more URLs.";
          } else if (talentData?.planName === "Pro") {
            upgradeMessage = "Upgrade to Premium to add more URLs.";
          }
          setMessage(
            talentData?.planName === "Basic"
              ? upgradeMessage
              : `You can upload a maximum of ${maxUrls} video URLs. ${upgradeMessage}`
          );
          // setMessage(
          //   `You can upload a maximum of ${maxUrls} video URLs. ${upgradeMessage}`
          // );
          setOpenPopUp(true);
          setTimeout(() => {
            setOpenPopUp(false);
          }, 1000);
          return;
        }

        // Add the valid URL
        setUrls([...urls, videoUrl]);
        setVideoUrl("");
        setCheckVideoUrl(false);
      } else {
        setCheckVideoUrl(true);
      }
    }
  };
  const isNotKnownFormatUrl = (url) => {
    const isValidAudioUrl = audioUrlPatterns?.audio?.test(url); // Check for audio URLs

    // Updated regex to accept valid URLs including those ending in .com, .in, and audio file types
    const isValidUrl =
      /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*(\.(com|in|org|net|co|io|info|biz|me|us|app|dev|edu|mp3|wav|ogg|aac|flac|m4a))?(\/[^\s]*)?$/i.test(
        url
      );

    return !(
      (
        audioUrlPatterns.youtube.test(url) ||
        audioUrlPatterns.vimeo.test(url) ||
        audioUrlPatterns.instagram.test(url) ||
        audioUrlPatterns.twitter.test(url) ||
        isValidAudioUrl || // Accept valid audio URLs
        isValidUrl
      ) // Accept any standard valid URL
    );
  };

  const handleAudioUrl = () => {
    if (audioUrl.trim() !== "") {
      if (!isNotKnownFormatUrl(audioUrl)) {
        // Determine allowed URL limits based on plan type
        let maxUrls;
        if (talentData?.planName === "Basic") {
          maxUrls = 2;
        } else if (talentData?.planName === "Pro") {
          maxUrls = 5;
        } else if (talentData?.planName === "Premium") {
          maxUrls = Infinity; // Unlimited
        }

        // Check if adding the new URL exceeds the limit
        if (audioUrlsList?.length >= maxUrls) {
          let upgradeMessage;
          if (talentData?.planName === "Basic") {
            upgradeMessage =
              "To add more audios, please upgrade to pro or premium membership plan."; //"Upgrade to Pro to add more URLs.";
          } else if (talentData?.planName === "Pro") {
            upgradeMessage = "Upgrade to Premium to add more URLs.";
          }
          setMessage(
            talentData?.planName === "Basic"
              ? upgradeMessage
              : `You can upload a maximum of ${maxUrls} video URLs. ${upgradeMessage}`
          );

          // setMessage(
          //   `You can upload a maximum of ${maxUrls} audio URLs. ${upgradeMessage}`
          // );
          setOpenPopUp(true);
          setTimeout(() => {
            setOpenPopUp(false);
          }, 1000);
          return;
        }

        // Add the valid audio URL
        setAudioUrlsList([...audioUrlsList, audioUrl]);
        setAudioUrl("");
        setCheckAudioUrl(false);
      } else {
        setCheckAudioUrl(true);
      }
    }
  };

  const [profileAnchor, setProfileAnchor] = useState(null);
  const [selectedProfileItem, setSelectedProfileItem] = useState(null); // Track the selected item

  // Single function to handle menu open
  const handleProfileClick = (event, item) => {
    setProfileAnchor(event.currentTarget);
    setSelectedProfileItem(item); // Set the selected item
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
    setSelectedProfileItem(null); // Reset the selected item when closing the menu
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  const [portfolioAnchor, setPortfolioAnchor] = useState(null);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null); // Track the selected item
  const [portfolioOpenIndex, setPortfolioOpenIndex] = useState(null);

  // Single function to handle menu open
  const handlePortfolioClick = (event, item, index) => {
    setPortfolioAnchor(event.currentTarget);
    setSelectedPortfolioItem(item); // Set the selected item
    setPortfolioOpenIndex(index); // Set the correct index for the opened menu
  };

  const handlePortfolioClose = (index) => {
    setPortfolioAnchor(null);
    setSelectedPortfolioItem(null); // Reset the selected item when closing the menu
    setPortfolioOpenIndex(index); // Set the correct index for the opened menu
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  const [videoAnchor, setVideoAnchor] = useState(null);
  const [selectedVideoItem, setSelectedVideoItem] = useState(null); // Track the selected item
  const [videoIndex, setVideoIndex] = useState(null);

  // Single function to handle menu open
  const handleVideoClick = (event, item, index) => {
    setVideoAnchor(event.currentTarget);
    setSelectedVideoItem(item); // Set the selected item
    setVideoIndex(index);
  };

  const handleVideoClose = (index) => {
    setVideoAnchor(null);
    setSelectedVideoItem(null); // Reset the selected item when closing the menu
    setVideoIndex(index);
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  const [audioAnchor, setAudioAnchor] = useState(null);
  const [selectedAudioItem, setSelectedAudioItem] = useState(null); // Track the selected item
  const [audioIndex, setAudioIndex] = useState(null);

  // Single function to handle menu open
  const handleAudioClick = (event, item, index) => {
    setAudioAnchor(event.currentTarget);
    setSelectedAudioItem(item); // Set the selected item
    setAudioIndex(index);
  };

  const handleAudioClose = (index) => {
    setAudioAnchor(null);
    setSelectedAudioItem(null); // Reset the selected item when closing the menu
    setAudioIndex(index);
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  const [resumeAnchor, setResumeAnchor] = useState(null);
  const [selectedResumeItem, setSelectedResumeItem] = useState(null); // Track the selected item
  const [cvIndex, setCVIndex] = useState(null);

  // Single function to handle menu open
  const handleResumeClick = (event, item, index) => {
    setResumeAnchor(event.currentTarget);
    setSelectedResumeItem(item); // Set the selected item
    setCVIndex(index);
  };

  const handleResumeClose = (index) => {
    setResumeAnchor(null);
    setSelectedResumeItem(null); // Reset the selected item when closing the menu
    setCVIndex(index);
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  const [idAnchor, setIdAnchor] = useState(null);
  const [selectedIdItem, setSelectedIdItem] = useState(null); // Track the selected item
  const [idIndex, setIdIndex] = useState(null);

  // Single function to handle menu open
  const handleIdClick = (event, item, index) => {
    setIdAnchor(event.currentTarget);
    setSelectedIdItem(item); // Set the selected item
    setIdIndex(index);
  };

  const handleIdClose = (index) => {
    setIdAnchor(null);
    setSelectedIdItem(null); // Reset the selected item when closing the menu
    setIdIndex(index);
  };

  // Determine if the menu is open
  const profileOpen = Boolean(profileAnchor); // Correct logic for open
  const portfolioOpen = Boolean(portfolioAnchor);
  const videoOpen = Boolean(videoAnchor);
  const audioOpen = Boolean(audioAnchor);
  const resumeOpen = Boolean(resumeAnchor);
  const idOpen = Boolean(idAnchor);

  const handleUrlChange = (e) => {
    // Avoid handling change if it was triggered by a paste event
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

    setCheckAudioUrl(isNotKnownFormatUrl(url));
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the default paste behavior to avoid double handling

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
    setCheckAudioUrl(isNotKnownFormatUrl(pastedText));
  };

  const handleDeleteUrl = (index) => {
    const newUrls = urls.filter((url, i) => i !== index);
    setUrls(newUrls);
  };

  const deleteAudioUrl = (index) => {
    const newUrls = audioUrlsList.filter((url, i) => i !== index);
    setAudioUrlsList(newUrls);
  };

  const profileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!file.type.startsWith("image/")) {
        setMessage("You can only upload images");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
        return;
      }

      uploadProfile(file);
    }
    event.target.value = null;
  };

  const portofolioUpload = (event) => {
    if (event?.target?.files && event?.target?.files?.length > 0) {
      const filesArray = Array.from(event.target.files);
      const imageFiles = filesArray.filter((file) =>
        file.type.startsWith("image/")
      );
      const nonImageFiles = filesArray.filter(
        (file) => !file.type.startsWith("image/")
      );
      // Check for non-image files
      if (nonImageFiles?.length > 0) {
        setMessage("You can only upload images");
        setOpenPopUp(true);
        setTimeout(() => {
          setOpenPopUp(false);
        }, 1000);
        return;
      }
      // Determine allowed file limits based on plan type
      let maxFiles;

      if (talentData?.planName == "Basic") {
        maxFiles = 5;
      } else if (talentData?.planName == "Pro") {
        maxFiles = 15;
      } else if (talentData?.planName == "Premium") {
        maxFiles = Infinity; // Unlimited
      }

      // Check if the current count plus new uploads exceeds the limit
      if (portofolioFile?.length + imageFiles?.length > maxFiles) {
        let upgradeMessage;
        if (talentData?.planName === "Basic") {
          upgradeMessage = "Upgrade to Pro or Premium to add more files.";
        } else if (talentData?.planName === "Pro") {
          upgradeMessage = "Upgrade to Premium to add more files.";
        }
        setMessage(
          `You can upload a maximum of ${maxFiles} images. ${upgradeMessage}`
        );
        setOpenPopUp(true);
        setTimeout(() => {
          setOpenPopUp(false);
        }, 3000);
        return;
      }

      // Upload valid image files
      imageFiles.forEach((file) => {
        uploadFile(file);
      });
    }
  };

  const resumeUpload = (event) => {
    if (talentData?.planName != "Basic") {
      if (event?.target?.files && event?.target?.files?.length > 0) {
        const filesArray = Array.from(event.target.files);
        const documentFiles = filesArray.filter((file) =>
          isDocumentFile(file.type)
        );
        const nonDocumentFiles = filesArray.filter(
          (file) => !isDocumentFile(file.type)
        );
        if (nonDocumentFiles?.length > 0) {
          setMessage("You may upload only PDF and Word documents");
          setOpenPopUp(true);
          setTimeout(() => {
            setOpenPopUp(false);
          }, 1000);
          return;
        }
        documentFiles.forEach((file) => {
          uploadResume(file);
        });
        // Reset the input value to allow re-uploading the same file
      }
    } else {
      let upgradeMessage;
      if (talentData?.planName === "Basic") {
        upgradeMessage =
          "To add CV, please upgrade to pro or premium membership plan.";
      } else if (talentData?.planName === "Pro") {
        upgradeMessage = "Upgrade to Premium to add resumes.";
      }

      setMessage(`${upgradeMessage}`);
      setOpenPopUp(true);
      setTimeout(() => {
        setOpenPopUp(false);
      }, 3000);
    }
    event.target.value = null;
  };
  const isDocumentFile = (fileType) => {
    return (
      fileType === "application/pdf" ||
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
  };

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
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
    event.target.value = null;
  };

  const getFileType = (fileType) => {
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
        // setVerificationID(fileObj);
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

  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (option) => {
    if (option === "view") {
      window.open("your-image-url", "_blank");
    } else if (option === "delete") {
    }
    setShowOptions(false);
  };

  const handleView = (item) => {
    let viewImage = `${API.userFilePath}${item.fileData}`;
    window.open(viewImage, "_blank");
  };

  const handleProfileDelete = () => {
    setProfileFile(null);
  };
  const handleVerificationDelete = (index) => {
    setVerificationID((prevIds) => {
      // Create a copy of the previous state
      const ids = [...prevIds];
      // Remove the image at the specified index
      ids.splice(index, 1);
      return ids;
    });
  };

  // const handlePortofolioDelete = (index) => {
  //   setPortofolioFile((prevImages) => {
  //     const updatedImages = [...prevImages];
  //     updatedImages.splice(index, 1);
  //     return updatedImages;
  //   });
  // };

  const handlePortofolioDelete = (index) => {
    setPortofolioFile((prevImages) => {
      // Filter out the item at the specified index
      const updatedImages = prevImages.filter((_, i) => i !== index);
      return updatedImages;
    });
  };

  const handleResumeDelete = (index) => {
    setResumeFile((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
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
    // navigate(`/talent-kids-teen-signup-files-success`);
    const formData = {
      image: profileFile,
      cv: resumeFile,
      portfolio: portofolioFile,
      idType: idType,
      verificationId: verificationID,
      features: features,
      childAboutYou: aboutYou,
      videoList: urls,
      audioList: audioUrlsList,
    };

    setIsLoading(true);

    await ApiHelper.post(`${API.updateAdults}${queryString}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Updated Successfully");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            if (talentData?.planName == "Basic") {
              const pendingJobId = localStorage.getItem("pendingJobId");
              const pendingJobTitle = localStorage.getItem("pendingJobTitle");
              if (pendingJobId) {
                localStorage.removeItem("pendingJobId");
                localStorage.removeItem("pendingJobTitle");
                navigate(`/jobs/view/${pendingJobTitle}/${pendingJobId}`);
              } else {
                navigate(`/talent/${talentData.publicUrl}`, {
                  state: { talentData: talentData },
                });
              }
            } else {
              navigate(`/talent-signup-service-details?${queryString}`);
            }
          }, 1000);
        } else {
          setIsLoading(false);

          setMessage("Error Occured Try Again");
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

  const goBack = () => {
    navigate(`/talent-signup-plan-details?userId=${queryString}`);
  };

  useEffect(() => {
    getKidsData();
  }, [userId]);

  const getKidsData = async () => {
    await ApiHelper.post(`${API.getTalentById}${queryString}`)
      .then((resData) => {
        if (resData.data.status === true) {
          setProfileFile(resData.data.data.image);
          setResumeFile(resData.data.data.cv);
          setPortofolioFile(resData.data.data.portfolio);
          setIdType(resData.data.data.idType);
          setVerificationID(resData.data.data.verificationId);
          setFeature(resData.data.data.features);
          // setAboutYou(...resData.data.data.childAboutYou);

          setUrls(resData.data.data.videoList);
          setAudioUrlsList(resData.data.data.audioList);
        }
      })
      .catch((err) => {});
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
            <div className="step-text">Step 4 of 5</div>
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
            <div className="kids-wrapper row">
              <div className="kids-img col-md-4 col-lg-3">
                <div className="fixImgs">
                  <img
                    src={adultsBanner}
                    className="kids-image-sticky"
                    alt=""
                  />
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
                      <div className="uploaded-file-wrapper ">
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
                            aria-haspopup="true"
                            aria-controls={`dropdown-menu-${profileFile.id}`} // Use unique ID
                            onClick={(event) =>
                              handleProfileClick(event, profileFile)
                            } // Pass the specific item
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id={`dropdown-menu-${profileFile.id}`} // Use unique ID
                            anchorEl={profileAnchor} // Correct prop name
                            open={profileOpen} // Control visibility
                            onClose={handleProfileClose}
                          >
                            <MenuItem
                              onClick={() => {
                                handleProfileClose();
                                handleView(selectedProfileItem);
                              }}
                            >
                              View
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleProfileClose();
                                handleProfileDelete(selectedProfileItem);
                              }}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="kids-form-title pb-1">
                    <span>Bio</span>
                  </div>

                  <div className="rich-editor">
                    <label className="form-label">About you</label>

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
                  <label className="form-label">
                    Build a stunning portfolio by adding your photos or sample
                    work photos that showcases your strengths
                  </label>
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
                      {portofolioFile.map((item, index) => (
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
                              aria-controls={`dropdown-menu-${item.id}`} // Use unique ID
                              aria-haspopup="true"
                              onClick={(event) =>
                                handlePortfolioClick(event, item, index)
                              } // Pass the specific item
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id={`dropdown-menu-${item.id}`} // Use unique ID
                              anchorEl={portfolioAnchor} // Correct prop name
                              open={portfolioOpen} // Control visibility
                              onClose={() => handlePortfolioClose(index)}
                            >
                              <MenuItem
                                onClick={() => {
                                  handlePortfolioClose(index);
                                  handleView(selectedPortfolioItem); // Use selected item
                                }}
                              >
                                View
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handlePortfolioClose(index);
                                  handlePortofolioDelete(portfolioOpenIndex); // Use selected item
                                }}
                              >
                                Delete
                              </MenuItem>
                            </Menu>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

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
                                  aria-controls={`dropdown-menu-${index}`} // Use unique ID
                                  aria-haspopup="true"
                                  onClick={(event) =>
                                    handleVideoClick(event, url, index)
                                  }
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id={`dropdown-menu-${index}`} // Use unique ID
                                  anchorEl={videoAnchor} // Correct prop name
                                  open={videoOpen} // Control visibility
                                  onClose={() => handleVideoClose(index)}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      handleVideoClose(index); // Close the menu
                                      window.open(selectedVideoItem, "_blank"); // Open the URL in a new tab
                                    }}
                                  >
                                    Play
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      handleVideoClose(index);
                                      handleDeleteUrl(videoIndex); // Use selected item
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
                                  aria-controls={`dropdown-menu-${index}`} // Use unique ID
                                  aria-haspopup="true"
                                  onClick={(event) =>
                                    handleAudioClick(event, url, index)
                                  }
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id={`dropdown-menu-${index}`} // Use unique ID
                                  anchorEl={audioAnchor} // Correct prop name
                                  open={audioAnchor} // Control visibility
                                  onClose={() => handleAudioClose(index)}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      handleAudioClose(index);
                                      window.open(url, "_blank"); // Open the YouTube video in a new tab
                                    }}
                                  >
                                    View
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      handleAudioClose(index);
                                      deleteAudioUrl(audioIndex);
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

                              <div className="update-portfolio-action">
                                <IconButton
                                  aria-label="more"
                                  aria-controls={`dropdown-menu-${index}`} // Use unique ID
                                  aria-haspopup="true"
                                  onClick={(event) =>
                                    handleResumeClick(event, item, index)
                                  }
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id={`dropdown-menu-${index}`} // Use unique ID
                                  anchorEl={resumeAnchor} // Correct prop name
                                  open={resumeAnchor} // Control visibility
                                  onClose={() => handleResumeClose(index)}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      handleResumeClose(index);
                                      handleView(selectedResumeItem);
                                    }}
                                  >
                                    View
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      handleResumeClose(index);
                                      handleResumeDelete(cvIndex);
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

                  <div className="kids-form-title">
                    <span>Features (Optional)</span>
                  </div>

                  <div className="features-section">
                    {/* {featuresList && (
                      <>
                        {featuresList.map((item, index) => (
                          <div
                            key={index}
                            className="mb-3 mr-3 features-input-wrapper"
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
                                      selectedOption ? selectedOption.value : ""
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
                    )} */}

                    <EditFeatures
                      featuresStructure={featuresList}
                      featureValues={features}
                      onValuesChange={handleEditFeatureChanges}
                    />
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
                        value={idType}
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

                  <div className="verification-section mb-2">
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
                      {verificationID.map((item, index) => {
                        return (
                          <>
                            <div
                              key={index}
                              className="uploaded-file-wrapper id-upload"
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
                                {item.type === "pdf" && (
                                  <div className="fileType">
                                    <img src={docsIcon} alt="" />
                                  </div>
                                )}
                                <div className="fileName">{item.title}</div>
                              </div>

                              <div className="update-portfolio-action">
                                <IconButton
                                  aria-label="more"
                                  aria-controls={`dropdown-menu-${index}`} // Use unique ID
                                  aria-haspopup="true"
                                  onClick={(event) =>
                                    handleIdClick(event, item, index)
                                  }
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id={`dropdown-menu-${index}`} // Use unique ID
                                  anchorEl={idAnchor} // Correct prop name
                                  open={idAnchor} // Control visibility
                                  onClose={() => handleIdClose(index)}
                                >
                                  <MenuItem
                                    onClick={() => {
                                      handleIdClose(index);
                                      handleView(selectedIdItem);
                                    }}
                                  >
                                    View
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      handleIdClose(index);
                                      handleVerificationDelete(idIndex);
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
                updateAdultSignup();
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

export default AdultFormThree;
