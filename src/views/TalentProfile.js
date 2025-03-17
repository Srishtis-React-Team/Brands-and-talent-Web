import React, { useEffect, useState, useRef } from "react";
import "../assets/css/findcreators.css";
import "../assets/css/talent-profile.css";
import "../assets/css/dashboard.css";
import { useParams } from "react-router-dom";
import "../assets/css/register.css";
import "../assets/css/kidsmain.scss";
import "../assets/css/createjobs.css";
import "../assets/css/talent-profile.css";
import "../assets/css/talent-dashboard.css";
import Login from "../auth/Login";
import { useLocation } from "react-router-dom";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import PhotosCarousel from "./PhotosCarousel.js";
import CardCarousel from "./CardCarousel.js";
import ServicesCarousel from "./ServicesCarousel.js";
import TalentHeader from "../layout/TalentHeader.js";
import Select from "react-select";
import Button from "@mui/material/Button";
import BrandHeader from "../brand/pages/BrandHeader.js";
import CurrentUser from "../CurrentUser.js";
import PopUp from "../components/PopUp.js";
import Spinner from "../components/Spinner.js";
import { useNavigate } from "react-router";
import { Modal, Box, IconButton } from "@mui/material";
import {
  ArrowBack,
  ArrowBackIos,
  ArrowForwardIos,
  Close,
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SwiperSlider from "./SwiperSlider.js";
const TalentProfile = () => {
  const { currentUserType, avatarImage } = CurrentUser();
  const navigate = useNavigate();
  const log_Logo = require("../assets/images/LOGO.png");
  const pinkStar = require("../assets/icons/pink-star.png");
  const instaLogo = require("../assets/icons/social-media-icons/instagram.png");
  const userFill = require("../assets/icons/userFill.png");
  const mapFill = require("../assets/icons/mapFill.png");
  const whitePlus = require("../assets/icons/whitePlus.png");
  const white_star = require("../assets/icons/white_star.png");
  const fbIcon = require("../assets/icons/facebook logo_icon.png");
  const linkdin = require("../assets/icons/linkdin_icon.png");
  const twitterLogo = require("../assets/icons/twitterLogo.png");
  const youtubeLogo = require("../assets/icons/youtubeLogo.png");
  const threadLogo = require("../assets/icons/threadLogo.png");
  const tiktok = require("../assets/icons/tiktok_social media_icon.png");
  const blueShield = require("../assets/icons/blue-shield.png");
  const [isLoading, setIsLoading] = useState(false);
  const [portofolio, showPortofolio] = useState(true);
  const [services, showServices] = useState(false);
  const [photos, showPhotos] = useState(false);
  const [videos, showVideos] = useState(false);
  const [features, showFeatures] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [CV, showCV] = useState(false);
  const [socialMedia, showSocialMedia] = useState(false);
  const [test, setTest] = useState("");
  const [talentData, setTalentData] = useState([]);
  const [photosList, setPhotosList] = useState([]);
  const [audiosList, setAudiosList] = useState([]);
  const [urlsList, setURLList] = useState([]);
  const [videoAudioUrls, setVideoAudioUrls] = useState([]);
  const [featuresList, setFeaturesList] = useState([]);
  const [cvList, setCvList] = useState([]);
  const [reviewsList, setreviewsList] = useState([]);
  const [allJobsList, setAllJobsList] = useState([]);
  const [brandId, setBrandId] = useState(null);
  const [brandData, setBrandData] = useState(null);

  const [brandImage, setBrandImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [jobTitleError, setjobTitleError] = useState(false);
  const [currentUser_type, setCurrentUserType] = useState("");
  const [comments, setComments] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const [talentName, setTalentName] = useState("");
  const [urlTalentData, setUrlTalentData] = useState("");
  const [playingUrl, setPlayingUrl] = useState(null);
  useEffect(() => {
    setCurrentUserType(localStorage.getItem("currentUserType"));
  }, []);

  useEffect(() => {
    // Extract the last part of the URL (i.e., 'peter')
    const pathParts = location.pathname.split("/");
    const name = pathParts[pathParts.length - 1];
    setTalentName(name);
    getDataByPublicUrl(name);
  }, [location]);

  const url = window.location.href;
  const queryString = url.split("?")[1];

  // const selectedTalent = location.state && location.state.talentData;

  // const checkUser = (id, data) => {
  //   const localID = localStorage.getItem("userId");

  //   if (localID && id) {
  //     if (localID !== id) {
  //       // navigate("/login");
  //       setTalentData(data);
  //     } else if (localID == id) {

  //     }
  //   }
  // };

  // if (!talentData && !userId) {
  //   navigate("/login");
  // }

  useEffect(() => {
    const storedUserId =
      localStorage.getItem("userId") || localStorage.getItem("currentUser");

    setVideoAudioUrls([
      "https://youtu.be/zO85jBI7Jxs?si=JtdIwdSDPxjnDv9R",
      "https://vimeo.com/956864989",
      "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
    ]);
    setUserId(storedUserId);
    if (talentData?._id) {
      // getTalentById(talentData?._id);
      fetchPhotos();
      fetchVideoAudios();
      fetchFeatures();
      fetchCV();
      fetchReviews();
      fetchURLS();
    } else if (storedUserId) {
      // getTalentById(storedUserId);
    } else if (queryString) {
      // getTalentById(queryString);
    }
    // if (selectedTalent?._id) {
    //   getTalentById(selectedTalent?._id);
    //   fetchPhotos();
    //   fetchVideoAudios();
    //   fetchFeatures();
    //   fetchCV();
    //   fetchReviews();
    //   fetchURLS();
    // } else if (storedUserId) {
    //   getTalentById(storedUserId);
    // } else if (queryString) {
    //   getTalentById(queryString);
    // }
  }, [talentData]);

  const fetchPhotos = async () => {
    const formData = {
      user: userId ? userId : null,
    };
    await ApiHelper.post(
      `${API.unifiedDataFetch}${talentData?._id ? talentData?._id : userId}/1`,
      formData
    )
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setPhotosList(resData.data.data);
          }
        }
      })
      .catch((err) => {});
  };

  const fetchVideoAudios = async () => {
    const formData = {
      user: userId ? userId : null,
    };
    await ApiHelper.post(
      `${API.unifiedDataFetch}${
        talentData?._id ? talentData?._id : queryString
      }/2`,
      formData
    )
      .then((resData) => {
        if (resData.data.status === true) {
          setURLList(resData.data.videoList);
        }
      })
      .catch((err) => {});
  };
  const fetchURLS = async () => {
    const formData = {
      user: userId ? userId : null,
    };
    await ApiHelper.post(
      `${API.unifiedDataFetch}${
        talentData?._id ? talentData?._id : queryString
      }/8`,
      formData
    )
      .then((resData) => {
        if (resData.data.status === true) {
          setAudiosList(resData.data.audioList);
        }
      })
      .catch((err) => {});
  };
  const fetchFeatures = async () => {
    const formData = {
      user: userId ? userId : null,
    };
    await ApiHelper.post(
      `${API.unifiedDataFetch}${
        talentData?._id ? talentData?._id : queryString
      }/4`,
      formData
    )
      .then((resData) => {
        if (resData.data.status === true) {
          setFeaturesList(resData.data.data);
        }
      })
      .catch((err) => {});
  };
  const fetchCV = async () => {
    const formData = {
      user: userId ? userId : null,
    };
    await ApiHelper.post(
      `${API.unifiedDataFetch}${
        talentData?._id ? talentData?._id : queryString
      }/3`,
      formData
    )
      .then((resData) => {
        if (resData.data.status === true) {
          setCvList(resData.data.data);
        }
      })
      .catch((err) => {});
  };
  const fetchReviews = async () => {
    const formData = {
      user: userId ? userId : null,
    };
    await ApiHelper.post(
      `${API.unifiedDataFetch}${
        talentData?._id ? talentData?._id : queryString
      }/7`,
      formData
    )
      .then((resData) => {
        if (resData.data.status === true) {
          setreviewsList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  // const getTalentById = async (talent_id) => {
  //   await ApiHelper.post(`${API.getTalentById}${talent_id}`)
  //     .then((resData) => {
  //       if (resData) {
  //         setTalentData(resData.data.data);
  //       }
  //     })
  //     .catch((err) => {});
  // };

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
    setBrandImage(localStorage.getItem("currentUserImage"));

    if (brandId && brandId != null) {
      getAllJobs(brandId);
    }
  }, [brandId, brandImage]);

  const getAllJobs = async (id) => {
    await ApiHelper.get(`${API.getBrandPostedJobsByID}${id}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setAllJobsList(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {});
  };

  const handleChange = (e) => {
    setSelectedJob(e?.value);
  };

  const handleView = (imageUrl) => {
    let viewImage = `${API.userFilePath}${imageUrl?.fileData}`;
    window.open(viewImage, "_blank");
  };

  function handleForms(e) {
    setTest("features set");
    if (e == "services") {
      showServices(true);
    } else {
      showServices(false);
    }
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
    if (e == "CV") {
      showCV(true);
    } else {
      showCV(false);
    }
    if (e == "social-media") {
      showSocialMedia(true);
    } else {
      showSocialMedia(false);
    }
  }

  const [showSidebar, setShowSidebar] = useState(true);

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (showModal) {
        new window.bootstrap.Modal(modalElement).show();
      } else {
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      }
    }
  }, [showModal]);

  const handleOpenModal = () => {
    if (currentUserType == "brand" && talentData?.planName === "Basic") {
      setMessage("The user is ineligible to receive an invitation for the job opening.");
      setOpenPopUp(true);
      setTimeout(() => {
        setOpenPopUp(false);
      }, 2000);
    } else if (currentUserType == "brand" && brandData?.planName === "Basic") {
      setMessage("Please upgrade to Pro plan to use this feature");
      setOpenPopUp(true);
      setTimeout(() => {
        setOpenPopUp(false);
        navigate(`/pricing`);
      }, 2000);
    } else {
      if (currentUserType == "talent") {
        setMessage("Please log in as a Brand/Client and post a job first");
        setOpenPopUp(true);
        setTimeout(() => {
          setOpenPopUp(false);
          navigate("/login");
        }, 3000);
      } else if (currentUserType == "brand") {
        inviteTalentNotification(); // ✅ Call only when eligible
        setShowModal(true);
      }
    }
  };
  

  // const handleOpenModal = () => {
  //   if (currentUserType == "brand" && talentData?.planName === "Basic") {
  //     setMessage(
  //       "The user is ineligible to receive an invitation for the job opening."
  //     );
  //     inviteTalentNotification();
  //     setOpenPopUp(true);
  //     setTimeout(function () {
  //       setOpenPopUp(false);
  //       // navigate(`/pricing`);
  //     }, 2000);
  //   } else if (currentUserType == "brand" && brandData?.planName === "Basic") {
  //     setMessage("Please upgrade to pro plan to use this feature");
  //     inviteTalentNotification();
  //     setOpenPopUp(true);
  //     setTimeout(function () {
  //       setOpenPopUp(false);
  //       navigate(`/pricing`);
  //     }, 2000);
  //   } else {
  //     if (currentUserType == "talent") {
  //       setMessage("Please log in as a Brand/Client and post a job first");
  //       setOpenPopUp(true);
  //       setTimeout(function () {
  //         setOpenPopUp(false);
  //         navigate("/login");
  //       }, 3000);
  //     } else if (currentUserType == "brand") {
  //       setShowModal(true);
  //     }
  //   }
  //   // window.open(
  //   //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
  //   //   "_blank"
  //   // );
  // };

  const inviteTalentNotification = async () => {
    const formData = {
      talentId: talentData?._id,
    };
    setIsLoading(true);
    await ApiHelper.post(`${API.inviteTalentNotification}`, formData)
      .then((resData) => {
        setIsLoading(false);
        if (resData) {
          if (resData?.data?.status === true) {
            setMessage("Invitation email sent successfully");
            setIsLoading(false);
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
            }, 3000);
          } else {
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const inviteToApply = async () => {
    if (brandData?.accountBlock == false) {
      const formData = {
        talentId: talentData?._id,
        brandId: brandId,
        gigId: selectedJob,
        comments: comments,
      };
      setIsLoading(true);
      await ApiHelper.post(`${API.inviteTalentToApply}`, formData)
        .then((resData) => {
          if (resData) {
            if (resData?.data?.status === true) {
              setShowModal(false);
              setMessage("Invitation Sent Successfully");
              setIsLoading(false);
              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
              }, 2000);
            } else {
              setIsLoading(false);
              setMessage("Error Occured Try Again");
              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
                setShowModal(false);
              }, 2000);
            }
          }
        })
        .catch((err) => {});
    } else if (brandData?.accountBlock == true) {
      setMessage("Please upgrade your plan to access your profile");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
        navigate(`/pricing`);
      }, 3000);
    }
  };

  const [isSliderOpen, setSliderOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setSliderOpen(true);
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setSliderOpen(false);
  };
  const [modalData, setModalData] = useState(null);

  const reportReview = async (item) => {
    setModalData(item);
    const modalElement = document.getElementById("ratingModal");
    const bootstrapModal = new window.bootstrap.Modal(modalElement);
    bootstrapModal.show();
  };

  const handleCloseModal = async (modalData) => {
    const formData = {
      comment: comments,
      reviewerName: modalData?.reviewerName,
      talentId: talentData?._id,
      reviewerId: modalData?.reviewerId,
    };
    await ApiHelper.post(API.reportReview, formData)
      .then((resData) => {
        setMessage("Reported Successfully!");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          const modalElement = document.getElementById("ratingModal");
          const bootstrapModal = new window.bootstrap.Modal(modalElement);
          bootstrapModal.hide();
        }, 2000);
      })
      .catch((err) => {});
  };

  const [currentIndex, setCurrentIndex] = useState(currentImageIndex);

  useEffect(() => {
    setCurrentIndex(currentImageIndex);
  }, [currentImageIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photosList.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photosList.length) % photosList.length
    );
  };

  const isVideoUrl = (url) => {
    return /\.(mp4|webm|ogg|avi|mov|wmv|flv|mkv)$/i.test(url);
  };

  const isAudioUrl = (url) => {
    return /\.(mp3|wav|ogg|aac|flac|m4a)$/i.test(url);
  };

  const isYouTubeUrl = (url) => {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/i.test(url);
  };

  const isVimeoUrl = (url) => {
    return /^(https?:\/\/)?(www\.)?vimeo\.com\/.+$/i.test(url);
  };

  const getYouTubeEmbedUrl = (url) => {
    // Extract video ID and format for embedding
    const videoId = url.match(
      /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/
    )[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const getVimeoEmbedUrl = (url) => {
    const match = url.match(
      /(?:vimeo\.com\/(?:[^\/\n\s]+\/\S+\/|(?:video|e(?:mbed)?)\/|\S*?[?&]video=)|vimeo\.com\/)([0-9]+)/
    );
    return match ? `https://player.vimeo.com/video/${match[1]}` : null;
  };

  const isInstagramUrl = (url) => url.includes("instagram.com");
  const extractInstagramShortcode = (url) => {
    const match = url.match(/\/(p|reel)\/([^\/?]+)/);
    return match ? match[2] : null;
  };
  const getInstagramEmbedUrl = (url) => {
    const shortcode = extractInstagramShortcode(url);
    return shortcode
      ? `https://www.instagram.com/reel/${shortcode}/embed`
      : null;
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
  const reviewMenuClose = () => {
    setAnchorEl(null);
  };

  const [hideToglle, setHideToggle] = useState(true);

  useEffect(() => {
    if (userId == null || brandId == null) {
      // setMessage("Please login to continue");
      // setOpenPopUp(true);
      // setTimeout(function () {
      //   setOpenPopUp(false);
      //   // navigate("/login");
      // }, 2000);
    }
  }, [userId, brandId]);

  useEffect(() => {
    if (brandId) {
      getBrand();
    }
  }, [brandId]);

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {});
  };

  const [isOwnTalent, setIsOwnTalent] = useState(null);
  const [isAdminApproved, setIsAdminApproved] = useState(null);
  const [showProfile, setShowProfile] = useState(null);

  const getDataByPublicUrl = async (name) => {
    const formData = {
      publicUrl: name,
      userId:
        localStorage.getItem("userId") || localStorage.getItem("currentUser"),
    };
    await ApiHelper.post(`${API.getDataByPublicUrl}`, formData)
      .then((resData) => {
        if (resData?.data?.currentStatus == "own-talent") {
          setShowProfile(true);
          setIsOwnTalent(true);
        } else if (resData?.data?.currentStatus == "approved") {
          setShowProfile(true);
          setIsOwnTalent(false);
          setIsAdminApproved(true);
        } else if (resData?.data?.currentStatus == "not-approved") {
          setShowProfile(false);
          setIsOwnTalent(false);
        }
        if (resData?.data?.status == false) {
          setMessage(resData?.data?.msg);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 2000);
        }
        setUrlTalentData(resData?.data?.data);
        // checkUser(resData?.data?.data?._id, resData?.data?.data);
        setTalentData(resData?.data?.data);
      })
      .catch((err) => {});
  };

  const messageNow = async () => {
    const formData = {
      viewingUserId: talentData?._id,
      loggedInUserId: localStorage.getItem("currentUser"),
      viewingUserType: talentData?.userType,
      loggedInUserType: localStorage.getItem("currentUserType"),
    };

    await ApiHelper.post(`${API.findPlan}`, formData)
      .then((resData) => {
        if (resData?.data?.status == true) {
          navigate(`/message?${talentData?._id}`);
        } else if (resData?.data?.status == false) {
          setMessage(`${resData?.data?.message}`);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            navigate(`/pricing`);
          }, 3000);
        }
      })
      .catch((err) => {});

    // if (isOwnTalent == true) {
    //   if (talentData?.planName == "Basic") {
    //     setMessage("Please upgrade to pro plan to use this feature");
    //     setOpenPopUp(true);
    //     setTimeout(function () {
    //       setOpenPopUp(false);
    //       navigate(`/pricing`);
    //     }, 3000);
    //   } else if (
    //     talentData?.planName != "Basic" &&
    //     talentData?.accountBlock == false
    //   ) {
    //     navigate(`/message?${talentData?._id}`);
    //   } else if (talentData?.accountBlock == true) {
    //     setMessage("Please upgrade your plan to access your profile");
    //     setOpenPopUp(true);
    //     setTimeout(function () {
    //       setOpenPopUp(false);
    //       navigate(`/pricing`);
    //     }, 3000);
    //   }
    // } else if (isOwnTalent == false && isAdminApproved == true) {
    //   if (brandData?.planName === "Basic") {
    //     setMessage("Please upgrade to pro plan to use this feature");
    //     setOpenPopUp(true);
    //     setTimeout(function () {
    //       setOpenPopUp(false);
    //       navigate(`/pricing`);
    //     }, 3000);
    //   } else if (
    //     brandData?.planName !== "Basic" &&
    //     brandData?.accountBlock == false
    //   ) {
    //     navigate(`/message?${talentData?._id}`);
    //   } else if (brandData?.accountBlock == true) {
    //     setMessage("Please upgrade your plan to access your profile");
    //     setOpenPopUp(true);
    //     setTimeout(function () {
    //       setOpenPopUp(false);
    //       navigate(`/pricing`);
    //     }, 3000);
    //   }
    //   if (talentData?.planName != "Basic") {
    //     // alert("block01");
    //     navigate(`/message?${talentData?._id}`);
    //   } else if (talentData?.planName == "Basic") {
    //     navigate(`/pricing`);
    //   }
    // } else if (currentUserType == "brand") {
    //   if (brandData?.planName === "Basic") {
    //     setMessage("Please upgrade to premium plan to use this feature");
    //     setOpenPopUp(true);
    //     setTimeout(function () {
    //       setOpenPopUp(false);
    //       navigate(`/pricing`);
    //     }, 3000);
    //   } else if (
    //     brandData?.planName !== "Basic" &&
    //     brandData?.accountBlock == false
    //   ) {
    //     navigate(`/message?${talentData?._id}`);
    //   } else if (brandData?.accountBlock == true) {
    //     setMessage("Please upgrade your plan to access your profile");
    //     setOpenPopUp(true);
    //     setTimeout(function () {
    //       setOpenPopUp(false);
    //       navigate(`/pricing`);
    //     }, 3000);
    //   }
    // }
  };

 

  return (
    <>
      {showProfile == true && userId && (
        <>
          {currentUser_type == "brand" && (
            <BrandHeader
              hideToggleButton={hideToglle}
              toggleMenu={toggleMenu}
              from={"message"}
            />
          )}

          {currentUser_type == "talent" && (
            <TalentHeader
              hideToggleButton={hideToglle}
              toggleMenu={toggleMenu}
              from={"message"}
            />
          )}

          {/* {!currentUser_type && !userId && (
            <>
              <section>
                <div className="popular-header">
                  <div className="header-title">Profile</div>
                </div>
              </section>
            </>
          )} */}

          <section>
            <div className="container">
              <div className="talent-profile-main">
                <div className="row">
                  <div className="col-md-4 col-lg-3 pr-0 mb-0">
                    <div className="talent-wrapper">
                      <div className="talent-backdrop">
                        <div className="profImg">
                          {talentData && talentData?.image && (
                            <img
                              className="talent-img"
                              src={`${API.userFilePath}${talentData?.image?.fileData}`}
                            ></img>
                          )}
                          {!talentData ||
                            (!talentData?.image && (
                              <img
                                className="talent-img"
                                src={avatarImage}
                              ></img>
                            ))}
                        </div>
                        {talentData?.planName != "Basic" && (
                          <>
                            <div
                              className={`planName ${
                                talentData?.planName === "Premium"
                                  ? "premium"
                                  : "pro"
                              }`}
                            >
                              <span>
                                <i className="bi bi-star-fill"></i>
                              </span>
                              {talentData?.planName === "Pro (Popular)"
                                ? "Pro"
                                : talentData?.planName === "Premium"
                                ? "Premium"
                                : talentData?.planName}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="individual-talents-details">
                        <div className="individual-talent-name">
                          <div className="model-name">{`${talentData?.preferredChildFirstname} ${talentData?.preferredChildLastName}`}</div>
                          {/* {talentData?.planName != "Basic" && (
                        <>
                          <div
                            className={`planName ${
                              talentData?.planName === "Premium"
                                ? "premium"
                                : "pro"
                            }`}
                          >
                            <span>
                              <i className="bi bi-star-fill"></i>
                            </span>
                            {talentData?.planName}
                          </div>
                        </>
                      )} */}

                          {/* {talentData?.planName != "Basic" && (
                        <>
                          <div className="talent-verified">
                            <span className="blue-shield-wrapper">
                              <img
                                className="blue-shield"
                                src={blueShield}
                              ></img>
                            </span>
                            Verified
                          </div>
                        </>
                      )}
                    </div> */}
                          <></>
                        </div>

                        <div className="talent-details">
                          {talentData?.planName !== "Basic" && (
                            <>
                              <div className="talent-details-wrapper">
                                <div className="talent-verified">
                                  <span className="blue-shield-wrapper">
                                    <img
                                      className="blue-shield"
                                      src={blueShield}
                                    ></img>
                                  </span>
                                  Verified
                                </div>
                              </div>
                            </>
                          )}
                          {talentData?.averageStarRatings &&
                            talentData?.averageStarRatings > 0 && (
                              <>
                                <div className="talent-details-wrapper">
                                  <div className="logo-fill-briefcase">
                                    <i class="bi bi-star-fill model-job-icons"></i>
                                  </div>

                                  <div className="contSect">
                                    <span>
                                      {talentData?.averageStarRatings} (
                                      {talentData?.totalReviews} ratings)
                                    </span>
                                  </div>
                                </div>
                              </>
                            )}

                          {talentData?.noOfJobsCompleted && (
                            <>
                              <div className="talent-details-wrapper">
                                <div className="logo-fill-briefcase">
                                  <i className="bi bi-briefcase-fill model-job-icons"></i>
                                </div>
                                <div className="contSect">
                                  <span>
                                    {talentData?.noOfJobsCompleted} Projects
                                    Completed
                                  </span>
                                </div>
                              </div>
                            </>
                          )}

                          {talentData?.profession &&
                            talentData?.profession?.length > 0 && (
                              <>
                                <div className="talent-details-wrapper">
                                  <div className="logo-fill">
                                    <img
                                      className="talent-logo"
                                      src={userFill}
                                    ></img>
                                  </div>
                                  <div className="contSect">
                                    {talentData && talentData?.profession && (
                                      <span>
                                        {talentData?.profession
                                          .map((item) => item.value)
                                          .join(", ")}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}

                          <div className="talent-details-wrapper">
                            <div className="logo-fill">
                              <img className="talent-logo" src={mapFill}></img>
                            </div>
                            <div className="contSect">
                              <span>
                                {talentData?.childCity && (
                                  <>
                                    {talentData.childCity}
                                    {talentData.parentState && ", "}
                                  </>
                                )}
                                {talentData?.parentState && (
                                  <>
                                    {talentData.parentState}
                                    {talentData.parentCountry && ", "}
                                  </>
                                )}
                                {talentData?.parentCountry &&
                                  talentData.parentCountry}
                              </span>
                            </div>
                          </div>
                        </div>

                        {(talentData?.instaFollowers ||
                          talentData?.facebookFollowers ||
                          talentData?.tiktokFollowers ||
                          talentData?.linkedinFollowers ||
                          talentData?.twitterFollowers ||
                          talentData?.threadsFollowers ||
                          talentData?.youtubeFollowers ||
                          talentData?.instagramUrl ||
                          talentData?.tikTokUrl ||
                          talentData?.youTubeUrl ||
                          talentData?.linkedinUrl ||
                          talentData?.threadsUrl ||
                          talentData?.facebookUrl ||
                          talentData?.twitterUrl) && (
                          <>
                            <div className="talents-social-wrapper mt-4">
                              <div className="row">
                                {(talentData?.instaFollowers ||
                                  talentData?.instagramUrl) && (
                                  <div
                                    className="talents-social col-md-6"
                                    style={{
                                      cursor: talentData?.instagramUrl
                                        ? "pointer"
                                        : "default",
                                      position: "relative",
                                    }}
                                    data-tooltip={
                                      talentData?.instagramUrl
                                        ? "Click here"
                                        : "No link provided"
                                    }
                                    onClick={() => {
                                      if (talentData?.instagramUrl) {
                                        window.open(
                                          talentData.instagramUrl,
                                          "_blank"
                                        );
                                      }
                                    }}
                                  >
                                    <div className="logoSocial">
                                      <img src={instaLogo} alt="Instagram" />
                                    </div>
                                    <div className="social-followers-count-section">
                                      <div className="social-count">
                                        {talentData?.instaFollowers ? (
                                          <p>{talentData.instaFollowers}</p>
                                        ) : (
                                          <div className="click-url">
                                            Click here
                                          </div>
                                        )}
                                      </div>
                                      {talentData?.instaFollowers && (
                                        <div className="followers-text">
                                          Followers
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {(talentData?.facebookFollowers ||
                                  talentData?.facebookUrl) && (
                                  <div
                                    className="talents-social col-md-6"
                                    style={{
                                      cursor: talentData?.facebookUrl
                                        ? "pointer"
                                        : "default",
                                      position: "relative",
                                    }}
                                    data-tooltip={
                                      talentData?.facebookUrl
                                        ? "Click here"
                                        : "No link provided"
                                    }
                                    onClick={() => {
                                      if (talentData?.facebookUrl) {
                                        window.open(
                                          talentData.facebookUrl,
                                          "_blank"
                                        );
                                      }
                                    }}
                                  >
                                    <div className="logoSocial">
                                      <img src={fbIcon} alt="Facebook" />
                                    </div>
                                    <div className="social-followers-count-section">
                                      <div className="social-count">
                                        {talentData?.facebookFollowers ? (
                                          <p>{talentData.facebookFollowers}</p>
                                        ) : (
                                          <div className="click-url">
                                            Click here
                                          </div>
                                        )}
                                      </div>
                                      {talentData?.facebookFollowers && (
                                        <div className="followers-text">
                                          Followers
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {(talentData?.tiktokFollowers ||
                                  talentData?.tikTokUrl) && (
                                  <div
                                    className="talents-social col-md-6"
                                    style={{
                                      cursor: talentData?.tikTokUrl
                                        ? "pointer"
                                        : "default",
                                      position: "relative",
                                    }}
                                    data-tooltip={
                                      talentData?.tikTokUrl
                                        ? "Click here"
                                        : "No link provided"
                                    }
                                    onClick={() => {
                                      if (talentData?.tikTokUrl) {
                                        window.open(
                                          talentData.tikTokUrl,
                                          "_blank"
                                        );
                                      }
                                    }}
                                  >
                                    <div className="logoSocial">
                                      <img src={tiktok} alt="TikTok" />
                                    </div>
                                    <div className="social-followers-count-section">
                                      <div className="social-count">
                                        {talentData?.tiktokFollowers ? (
                                          <p>{talentData.tiktokFollowers}</p>
                                        ) : (
                                          <div className="click-url">
                                            Click here
                                          </div>
                                        )}
                                      </div>
                                      {talentData?.tiktokFollowers && (
                                        <div className="followers-text">
                                          Followers
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {(talentData?.linkedinFollowers ||
                                  talentData?.linkedinUrl) && (
                                  <div
                                    className="talents-social col-md-6"
                                    style={{
                                      cursor: talentData?.linkedinUrl
                                        ? "pointer"
                                        : "default",
                                      position: "relative",
                                    }}
                                    data-tooltip={
                                      talentData?.linkedinUrl
                                        ? "Click here"
                                        : "No link provided"
                                    }
                                    onClick={() => {
                                      if (talentData?.linkedinUrl) {
                                        window.open(
                                          talentData.linkedinUrl,
                                          "_blank"
                                        );
                                      }
                                    }}
                                  >
                                    <div className="logoSocial">
                                      <img src={linkdin} alt="LinkedIn" />
                                    </div>
                                    <div className="social-followers-count-section">
                                      <div className="social-count">
                                        {talentData?.linkedinFollowers ? (
                                          <p>{talentData.linkedinFollowers}</p>
                                        ) : (
                                          <div className="click-url">
                                            Click here
                                          </div>
                                        )}
                                      </div>
                                      {talentData?.linkedinFollowers && (
                                        <div className="followers-text">
                                          Followers
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {(talentData?.twitterFollowers ||
                                  talentData?.twitterUrl) && (
                                  <div
                                    className="talents-social col-md-6"
                                    style={{
                                      cursor: talentData?.twitterUrl
                                        ? "pointer"
                                        : "default",
                                      position: "relative",
                                    }}
                                    data-tooltip={
                                      talentData?.twitterUrl
                                        ? "Click here"
                                        : "No link provided"
                                    }
                                    onClick={() => {
                                      if (talentData?.twitterUrl) {
                                        window.open(
                                          talentData.twitterUrl,
                                          "_blank"
                                        );
                                      }
                                    }}
                                  >
                                    <div className="logoSocial">
                                      <img src={twitterLogo} alt="Twitter" />
                                    </div>
                                    <div className="social-followers-count-section">
                                      <div className="social-count">
                                        {talentData?.twitterFollowers ? (
                                          <p>{talentData.twitterFollowers}</p>
                                        ) : (
                                          <div className="click-url">
                                            Click here
                                          </div>
                                        )}
                                      </div>
                                      {talentData?.twitterFollowers && (
                                        <div className="followers-text">
                                          Followers
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {(talentData?.threadsFollowers ||
                                  talentData?.threadsUrl) && (
                                  <div
                                    className="talents-social col-md-6"
                                    style={{
                                      cursor: talentData?.threadsUrl
                                        ? "pointer"
                                        : "default",
                                      position: "relative",
                                    }}
                                    data-tooltip={
                                      talentData?.threadsUrl
                                        ? "Click here"
                                        : "No link provided"
                                    }
                                    onClick={() => {
                                      if (talentData?.threadsUrl) {
                                        window.open(
                                          talentData.threadsUrl,
                                          "_blank"
                                        );
                                      }
                                    }}
                                  >
                                    <div className="logoSocial">
                                      <img src={threadLogo} alt="Threads" />
                                    </div>
                                    <div className="social-followers-count-section">
                                      <div className="social-count">
                                        {talentData?.threadsFollowers ? (
                                          <p>{talentData.threadsFollowers}</p>
                                        ) : (
                                          <div className="click-url">
                                            Click here
                                          </div>
                                        )}
                                      </div>
                                      {talentData?.threadsFollowers && (
                                        <div className="followers-text">
                                          Followers
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {(talentData?.youtubeFollowers ||
                                  talentData?.youTubeUrl) && (
                                  <div
                                    className="talents-social col-md-6"
                                    style={{
                                      cursor: talentData?.youTubeUrl
                                        ? "pointer"
                                        : "default",
                                      position: "relative",
                                    }}
                                    data-tooltip={
                                      talentData?.youTubeUrl
                                        ? "Click here"
                                        : "No link provided"
                                    }
                                    onClick={() => {
                                      if (talentData?.youTubeUrl) {
                                        window.open(
                                          talentData.youTubeUrl,
                                          "_blank"
                                        );
                                      }
                                    }}
                                  >
                                    <div className="logoSocial">
                                      <img src={youtubeLogo} alt="YouTube" />
                                    </div>
                                    <div className="social-followers-count-section">
                                      <div className="social-count">
                                        {talentData?.youtubeFollowers ? (
                                          <p>{talentData.youtubeFollowers}</p>
                                        ) : (
                                          <div className="click-url">
                                            Click here
                                          </div>
                                        )}
                                      </div>
                                      {talentData?.youtubeFollowers && (
                                        <div className="followers-text">
                                          Followers
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}

                        <>
                          <div
                            className="invite-btn"
                            onClick={() => handleOpenModal()}
                          >
                            <img src={whitePlus}></img>
                            <div>Invite to apply</div>
                          </div>
                          <div
                            className="invite-btn"
                            onClick={() => messageNow()}
                          >
                            <i className="bi bi-chat chat-icon-profile"></i>
                            <div className="message-now-text">Message Now</div>
                          </div>
                        </>

                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                          ref={modalRef}
                        >
                          <div className="modal-dialog modal-dialog-centered modal-lg signupModal">
                            <div className="modal-content ">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <div
                                  className="modal-title "
                                  style={{ fontSize: "18px" }}
                                >
                                  Send Invitation
                                </div>

                                <div className="select-job-invite mt-4">
                                  <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="form-label"
                                  >
                                    Select Job to invite
                                    <span className="mandatory">*</span>
                                  </label>
                                  <Select
                                    placeholder="Select Job to invite"
                                    options={allJobsList.map((job) => ({
                                      value: job._id, // or whatever unique identifier you want to use
                                      label: job.jobTitle,
                                      type: job?.type,
                                    }))}
                                    onChange={handleChange}
                                    isSearchable={true}
                                  />
                                  {jobTitleError && (
                                    <div className="invalid-fields">
                                      Please enter job Title
                                    </div>
                                  )}

                                  <div className="mb-3 mt-3">
                                    <label
                                      htmlFor="exampleFormControlTextarea1"
                                      className="form-label"
                                    >
                                      Comments (Optional)
                                    </label>
                                    <textarea
                                      style={{ width: "500px" }}
                                      className="form-control address-textarea"
                                      id="exampleFormControlTextarea1"
                                      value={comments}
                                      rows="3"
                                      onChange={(e) => {
                                        setComments(e.target.value);
                                      }}
                                    ></textarea>
                                  </div>
                                </div>

                                <div className="register-modal mt-3">
                                  <Button
                                    onClick={(e) => {
                                      inviteToApply();
                                    }}
                                    className="edit-profileimg-btn"
                                    variant="text"
                                    style={{ textTransform: "capitalize" }}
                                  >
                                    Invite Talent
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="talent-rates">
                          <div className="title">
                            {`${talentData?.preferredChildFirstname} ${talentData?.preferredChildLastName}`}{" "}
                            Rates
                          </div>
                          {talentData &&
                            talentData.profession &&
                            talentData.profession.map((item, index) => (
                              <>
                                <div key={index}>
                                  {(item?.perHourSalary ||
                                    item?.perDaySalary ||
                                    item?.perMonthSalary ||
                                    item?.perPostSalary ||
                                    item?.perImageSalary) && (
                                    <>
                                      <div className="talent-profession-name">
                                        {item?.value}{" "}
                                        {item?.openToOffers === true && (
                                          <span>(Negotiable)</span>
                                        )}
                                      </div>
                                    </>
                                  )}

                                  {item?.perHourSalary && (
                                    <>
                                      <div className="talent-profession-value">
                                        ${item?.perHourSalary} per hour{" "}
                                      </div>
                                    </>
                                  )}
                                  {item?.perDaySalary && (
                                    <>
                                      <div className="talent-profession-value">
                                        ${item?.perDaySalary} per day
                                      </div>
                                    </>
                                  )}

                                  {item?.perMonthSalary && (
                                    <>
                                      <div className="talent-profession-value">
                                        ${item?.perMonthSalary} per month
                                      </div>
                                    </>
                                  )}
                                  {item?.perPostSalary && (
                                    <>
                                      <div className="talent-profession-value">
                                        ${item?.perPostSalary} per post
                                      </div>
                                    </>
                                  )}
                                  {item?.perImageSalary && (
                                    <>
                                      <div className="talent-profession-value">
                                        ${item?.perImageSalary} per image
                                      </div>
                                    </>
                                  )}
                                </div>
                              </>
                            ))}
                        </div> */}

                        <div className="talent-rates">
                          {talentData?.profession?.some(
                            (item) =>
                              item?.perHourSalary ||
                              item?.perDaySalary ||
                              item?.perMonthSalary ||
                              item?.perPostSalary ||
                              item?.perImageSalary
                          ) && (
                            <>
                              <div className="title">
                                {`${talentData?.preferredChildFirstname} ${talentData?.preferredChildLastName}`}{" "}
                                Rates
                              </div>
                              {talentData.profession.map((item, index) => (
                                <div key={index}>
                                  {(item?.perHourSalary ||
                                    item?.perDaySalary ||
                                    item?.perMonthSalary ||
                                    item?.perPostSalary ||
                                    item?.perImageSalary) && (
                                    <>
                                      <div className="talent-profession-name">
                                        {item?.value}{" "}
                                        {item?.openToOffers === true && (
                                          <span>(Negotiable)</span>
                                        )}
                                      </div>
                                    </>
                                  )}
                                  {item?.perHourSalary && (
                                    <div className="talent-profession-value">
                                      ${item?.perHourSalary} per hour
                                    </div>
                                  )}
                                  {item?.perDaySalary && (
                                    <div className="talent-profession-value">
                                      ${item?.perDaySalary} per day
                                    </div>
                                  )}
                                  {item?.perMonthSalary && (
                                    <div className="talent-profession-value">
                                      ${item?.perMonthSalary} per month
                                    </div>
                                  )}
                                  {item?.perPostSalary && (
                                    <div className="talent-profession-value">
                                      ${item?.perPostSalary} per post
                                    </div>
                                  )}
                                  {item?.perImageSalary && (
                                    <div className="talent-profession-value">
                                      ${item?.perImageSalary} per image
                                    </div>
                                  )}
                                </div>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8 col-lg-9">
                    <div className="talent-info-section">
                      <div className="talent-info-wrapper">
                        <div className="bio-wrapper">
                          <div className="bio-text">Bio</div>

                          {talentData?.childAboutYou && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: talentData.childAboutYou,
                              }}
                            />
                          )}
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
                            Home
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
                            Portfolio
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
                              services
                                ? "active-tab individual-talent-tab"
                                : "individual-talent-tab"
                            }
                            onClick={(e) => {
                              handleForms("services");
                            }}
                          >
                            Services
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
                              CV
                                ? "active-tab individual-talent-tab"
                                : "individual-talent-tab"
                            }
                            onClick={(e) => {
                              handleForms("CV");
                            }}
                          >
                            CV
                          </div>
                        </div>

                        <div className="talent-all-details-wrapper">
                          {portofolio && (
                            <>
                              <div className="portofolio-section">
                                <div className="portofolio-title">
                                  Portfolio
                                </div>

                                {photosList && photosList.length > 0 && (
                                  <div
                                    className="view-all"
                                    onClick={(e) => {
                                      handleForms("photos");
                                    }}
                                  >
                                    View All
                                  </div>
                                )}
                              </div>
                              <div className="photos-slider">
                                {photosList && photosList.length > 0 && (
                                  // <PhotosCarousel photosList={photosList} />
                                  <SwiperSlider photosList={photosList} />
                                )}

                                {photosList.length === 0 && (
                                  <>
                                    <div>Photos not added</div>
                                  </>
                                )}
                                {talentData?.adminApproved === false &&
                                  photosList.length > 0 &&
                                  !userId && (
                                    <>
                                      <div>
                                        Photos will be visible only after admin
                                        approval
                                      </div>
                                    </>
                                  )}

                                {/* {photosList.length === 0 &&
                              talentData?.adminApproved === false && (
                                <>
                                  <div>
                                    Data will be visible only after admin
                                    approval
                                  </div>
                                </>
                              )} */}
                              </div>

                              {/* <div className="portofolio-section">
                            <div className="portofolio-title mt-4">
                              Social Media Posts
                            </div>
                          </div>
                          <p>No Social Media Posts Available</p> */}
                              {/* <CardCarousel /> */}

                              {/* <div className="portofolio-section">
                            <div className="portofolio-title">Reviews</div>
                            <div
                              className="view-all"
                              onClick={(e) => {
                                handleForms("reviews");
                              }}
                            >
                              View All
                            </div>
                          </div> */}

                              {/* <div className="reviews-section">
                            <div className="rating-talent">
                              <div className="num">
                                {talentData?.averageStarRatings}
                              </div>
                              <img src={white_star}></img>
                            </div>
                            <div className="content">
                              <div className="title">
                                Studio Shoot for Unrecognisable Ecommerce
                              </div>
                              <div className="description">
                                Kate is a delight to work with, beautiful both
                                punctual & professional. She knew exactly what
                                was required and everything was effortless.
                              </div>
                            </div>
                          </div> */}

                              <div className="portofolio-section">
                                <div className="portofolio-title">
                                  Videos & Audios
                                </div>
                                {((urlsList && urlsList.length > 0) ||
                                  (audiosList && audiosList.length > 0)) && (
                                  <>
                                    <div
                                      className="view-all"
                                      onClick={(e) => {
                                        handleForms("videos");
                                      }}
                                    >
                                      View All
                                    </div>
                                  </>
                                )}
                              </div>

                              <p className="pb-2">Videos</p>
                              {/* 
                              {urlsList.length > 0 && (
                                <>
                                  
                                </>
                              )} */}
                              <div className="service-list-main videoSect w-100">
                                <div className="row w-100 padSpace">
                                  {urlsList?.map((url, index) => (
                                    <div
                                      key={index}
                                      className="col-md-6 mb-3 padSpace"
                                    >
                                      <div className="media-item">
                                        {isYouTubeUrl(url) ? (
                                          <iframe
                                            src={getYouTubeEmbedUrl(url)}
                                            title={`youtube-video-${index}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="video-frame w-100"
                                          ></iframe>
                                        ) : isVimeoUrl(url) ? (
                                          <iframe
                                            src={getVimeoEmbedUrl(url)}
                                            title={`vimeo-video-${index}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="video-frame w-100"
                                          ></iframe>
                                        ) : isVideoUrl(url) ? (
                                          <video
                                            controls
                                            src={url}
                                            className="video-frame w-100"
                                          >
                                            Your browser does not support the
                                            video tag.
                                          </video>
                                        ) : isAudioUrl(url) ? (
                                          <audio
                                            controls
                                            src={url}
                                            className="audio-player w-100"
                                          >
                                            Your browser does not support the
                                            audio element.
                                          </audio>
                                        ) : isInstagramUrl(url) ? (
                                          <iframe
                                            src={getInstagramEmbedUrl(url)}
                                            width="400"
                                            height="505"
                                            frameBorder="0"
                                            scrolling="no"
                                            allowTransparency="true"
                                            title={`instagram-video-${index}`}
                                            className="video-frame w-100"
                                            style={{ height: "600px" }}
                                          ></iframe>
                                        ) : (
                                          <div className="unsupported-media">
                                            Unsupported media type
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ))}

                                  {talentData?.adminApproved === false &&
                                    urlsList?.length > 0 &&
                                    !userId && (
                                      <>
                                        <div className="msgs">
                                          Videos will be visible only after
                                          admin approval
                                        </div>
                                      </>
                                    )}

                                  {urlsList?.length === 0 && (
                                    <>
                                      <div className="msgs">
                                        Videos are not added
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              {/* <p className="fw-bold">Audios</p>

<div className="service-list-main w-100">
  <div className="cvAdjust padSpace w-100">
    {audiosList?.length > 0 ? (
      <div className="cvlist-wrapper row">
        {audiosList.map((url, index) => (
          <div className="col-md-4 padSpace" key={index}>
            <div className="cv-card p-3">
              <div className="d-flex align-items-center mb-2">
                <i className="fa-solid fa-file text-primary me-2"></i>
                <div className="fileName audio-url-style text-truncate w-75">
                  {url.split("/").pop()}
                </div>
              </div>

              <audio controls className="w-100">
                <source src={url} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="msgs">Audios are not added</div>
    )}

    {talentData?.adminApproved === false && audiosList?.length > 0 && !userId && (
      <div className="msgs">Audios will be visible only after admin approval</div>
    )}
  </div>
</div> */}

                              {/* <p>Audios</p>

                              <div className="service-list-main w-100">
                                <div className="cvAdjust padSpace w-100">
                                  {audiosList && (
                                    <div className="cvlist-wrapper row">
                                      {audiosList.map((url) => {
                                        return (
                                          <>
                                            <>
                                              <div className="col-md-4 padSpace">
                                                <div
                                                  className="cv-card "
                                                  key={url}
                                                >
                                                  <div className="d-flex align-items-center">
                                                    <i className="fa-solid fa-file"></i>
                                                    <div className="fileName audio-url-style ">
                                                      {url}
                                                    </div>
                                                  </div>
                                                  <button
                                                    className="view-cv"
                                                    onClick={() =>
                                                      window.open(url)
                                                    }
                                                  >
                                                    Play
                                                  </button>
                                                </div>{" "}
                                              </div>
                                            </>
                                          </>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {talentData?.adminApproved === false &&
                                    audiosList?.length > 0 &&
                                    !userId && (
                                      <>
                                        <div className="msgs">
                                          Audios will be visible only after
                                          admin approval
                                        </div>
                                      </>
                                    )}

                                  {audiosList?.length === 0 && (
                                    <>
                                      <div className="msgs">
                                        Audios are not added
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div> */}

{/* <p>Audios</p>

<div className="service-list-main w-100">
  <div className="cvAdjust padSpace w-100">
    {audiosList && (
      <div className="cvlist-wrapper row">
        {audiosList.map((url, index) => {
          const isMp3 = url.endsWith(".mp3");
          return (
            <div className="col-md-4 padSpace" key={index}>
              <div className="cv-card">
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-file"></i>
                  <div className="fileName audio-url-style">{url}</div>
                </div>
                {isMp3 ? (
                  <audio controls className="w-100">
                    <source src={url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <button className="view-cv" onClick={() => window.open(url)}>
                    Open
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    )}

    {talentData?.adminApproved === false && audiosList?.length > 0 && !userId && (
      <div className="msgs">Audios will be visible only after admin approval</div>
    )}

    {audiosList?.length === 0 && (
      <div className="msgs">Audios are not added</div>
    )}
  </div>
</div>

 */}
 <p>Audios</p>

<div className="service-list-main w-100">
<div className="row">
  {/* <div className="cvAdjust padSpace w-100"> */}
    {audiosList && (
      <div>
       {/* <div className="cvlist-wrapper row"> */}
        {audiosList.map((url) => {
          const isMp3 = url.endsWith(".mp3");
          const fileName = url.split("/").pop(); // Extracts the file name from URL
          return (
            // <div className="col-md-4 padSpace" key={index}>
              <div className="cv-card"key={url}>
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-file"></i>
                  <div className="fileName audio-url-style">{fileName}</div>
                </div>
             {isMp3 ? (
                    <>
                      <button
                        className="view-cv"
                        onClick={() =>
                          setPlayingUrl(playingUrl === url ? null : url)
                        }
                      >
                        {playingUrl === url ? "Pause" : "Play"}
                      </button>

                      {playingUrl === url && (
                        <audio
                          controls
                          autoPlay
                          className="w-100"
                          onEnded={() => setPlayingUrl(null)}
                        >
                          <source src={url} type="audio/mpeg" />
                          Your browser does not support the audio tag.
                        </audio>
                      )}
                    </>
                  ) : (
                    <button
                      className="view-cv"
                      onClick={() => window.open(url, "_blank")}
                    >
                      Play
                      {/* <i className="fa-solid fa-external-link"></i> */}
                    </button>
                )}
              </div>
            // </div>
          );
        })}
      </div>
    )}

    {talentData?.adminApproved === false && audiosList?.length > 0 && !userId && (
      <div className="msgs">Audios will be visible only after admin approval</div>
    )}

    {audiosList?.length === 0 && (
      <div className="msgs">Audios are not added</div>
    )}
  </div>
</div>




                              {talentData &&
                                talentData?.services?.length > 0 && (
                                  <>
                                    <div className="portofolio-section">
                                      <div className="portofolio-title">
                                        Services
                                      </div>
                                      <div
                                        className="view-all"
                                        onClick={(e) => {
                                          handleForms("services");
                                        }}
                                      >
                                        View All
                                      </div>
                                    </div>
                                    <ServicesCarousel
                                      talentData={talentData}
                                      brandData={brandData}
                                    />

                                    {!talentData?.services?.length === 0 && (
                                      <>
                                        <div className="msgs">
                                          Services not added
                                        </div>
                                      </>
                                    )}
                                    {talentData?.adminApproved === false &&
                                      talentData?.services?.length > 0 &&
                                      !userId && (
                                        <>
                                          <div className="msgs">
                                            Services will be visible only after
                                            admin approval
                                          </div>
                                        </>
                                      )}
                                  </>
                                )}

                              {/* <div className="service-list-main">
                            {videoAudioList.map((item) => (
                              <div
                                className="item model-picture-wrapper"
                                key={item.id}
                              >
                                {item.type === "video" && (
                                  <video className="video-style " controls>
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
                           */}

                              <div className="portofolio-section">
                                <div className="portofolio-title">CV</div>
                                {cvList && cvList.length > 0 && (
                                  <>
                                    <div
                                      className="view-all"
                                      onClick={(e) => {
                                        handleForms("CV");
                                      }}
                                    >
                                      View All
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="cvAdjust padSpace">
                                <div className="cvlist-wrapper row p-0">
                                  {cvList.map((pdf) => {
                                    return (
                                      <>
                                        <>
                                          <div className="col-md-4 padSpace">
                                            <div
                                              className="cv-card"
                                              key={pdf.title}
                                            >
                                              <div className="d-flex align-items-center">
                                                <i className="fa-solid fa-file"></i>
                                                <div className="fileName">
                                                  {pdf.title}
                                                </div>
                                              </div>
                                              <button
                                                className="view-cv"
                                                onClick={() => handleView(pdf)}
                                              >
                                                View
                                              </button>
                                            </div>
                                          </div>
                                        </>
                                      </>
                                    );
                                  })}
                                  {cvList.length === 0 && (
                                    <>
                                      <div className="msgs">CV not added</div>
                                    </>
                                  )}
                                  {talentData?.adminApproved === false &&
                                    cvList.length > 0 &&
                                    !userId && (
                                      <>
                                        <div className="msgs">
                                          CV will be visible only after admin
                                          approval
                                        </div>
                                      </>
                                    )}
                                </div>
                              </div>
                            </>
                          )}

                          {photos && (
                            <div className="models-photos">
                              {/* row padSpc */}
                              <div className="row">
                                {photosList &&
                                  photosList.map((image, index) => {
                                    return (
                                      <>
                                        {/* col-lg-3 col-md-4 padSpc */}
                                        <div className="col-md-4">
                                          <div
                                            className="photos-gallery-image"
                                            key={index}
                                          >
                                            <img
                                              className="photo-gallery-ind-image"
                                              src={`${API.userFilePath}${image}`}
                                              alt=""
                                              onClick={() => {
                                                handleImageClick(index);
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })}
                              </div>

                              {talentData?.adminApproved === true &&
                                photosList.length === 0 && (
                                  <>
                                    <div className="msgs">
                                      Photos are not added
                                    </div>
                                  </>
                                )}
                              {talentData?.adminApproved === false &&
                                photosList.length === 0 && (
                                  <>
                                    <div className="msgs">
                                      {" "}
                                      Photos will be visible only after admin
                                      approval
                                    </div>
                                  </>
                                )}
                            </div>
                          )}

                          {videos && (
                            <>
                              <div className="models-photos videoWraper">
                                <div className="service-list-main w-100">
                                  <div className="row">
                                    <p className="pb-2">Videos</p>

                                    {urlsList?.map((url, index) => (
                                      <div
                                        key={index}
                                        className="col-md-6 mb-4"
                                      >
                                        <div className="media-item">
                                          {isYouTubeUrl(url) ? (
                                            <iframe
                                              src={getYouTubeEmbedUrl(url)}
                                              title={`youtube-video-${index}`}
                                              frameBorder="0"
                                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                              allowFullScreen
                                              className="video-frame w-100"
                                              style={{ height: "300px" }}
                                            ></iframe>
                                          ) : isVimeoUrl(url) ? (
                                            <iframe
                                              src={getVimeoEmbedUrl(url)}
                                              title={`vimeo-video-${index}`}
                                              frameBorder="0"
                                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                              allowFullScreen
                                              className="video-frame w-100"
                                              style={{ height: "300px" }}
                                            ></iframe>
                                          ) : isVideoUrl(url) ? (
                                            <video
                                              controls
                                              src={url}
                                              className="video-frame w-100"
                                              style={{ height: "300px" }}
                                            >
                                              Your browser does not support the
                                              video tag.
                                            </video>
                                          ) : isAudioUrl(url) ? (
                                            <audio
                                              controls
                                              src={url}
                                              className="audio-player w-100"
                                            >
                                              Your browser does not support the
                                              audio element.
                                            </audio>
                                          ) : (
                                            <div className="unsupported-media">
                                              Unsupported media type
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))}

                                    {talentData?.adminApproved === false &&
                                      urlsList?.length > 0 &&
                                      !userId && (
                                        <>
                                          <div className="msgs">
                                            Videos will be visible only after
                                            admin approval
                                          </div>
                                        </>
                                      )}

                                    {urlsList?.length === 0 && (
                                      <>
                                        <div className="msgs">
                                          Videos are not added
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                         {/* {videos && (
  <>
    <p className="fw-bold">Audios</p>
    <div className="service-list-main w-100">
      <div className="row">
        {audiosList?.length > 0 ? (
          audiosList.map((url, index) => (
            <div className="cv-card p-3" key={index}>
              <div className="d-flex align-items-center mb-2">
                <i className="fa-solid fa-file text-primary me-2"></i>
                <div className="fileName audio-url-style text-truncate w-75">
                  {url.split("/").pop()}
                </div>
              </div>

              <audio controls className="w-100">
                <source src={url} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))
        ) : (
          <div className="msgs">Audios are not added</div>
        )}

        {talentData?.adminApproved === false && audiosList?.length > 0 && !userId && (
          <div className="msgs">Audios will be visible only after admin approval</div>
        )}
      </div>
    </div>
  </>
)}  */}


                         {/* {videos && (
                            <>
                              <p>Audios</p>
                              <div className="service-list-main w-100">
                                <div className="row">
                                  {audiosList && (
                                    <div>
                                      {audiosList.map((url) => {
                                        return (
                                          <>
                                            <>
                                              <div
                                                className="cv-card"
                                                key={url}
                                              >
                                                <div className="d-flex align-items-center">
                                                  <i className="fa-solid fa-file"></i>
                                                  <div className="fileName audio-url-style ">
                                                    {url}
                                                  </div>
                                                </div>
                                               <button
                                                  className="view-cv"
                                                  onClick={() =>
                                                    window.open(url)
                                                  }
                                                >
                                                  Play
                                                  
                                                </button> 
                                                </div>
                                            </>
                                          </>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {audiosList?.length === 0 && (
                                    <>
                                      <div className="msgs">
                                        Audios are not added
                                      </div>
                                    </>
                                  )}
                                  {talentData?.adminApproved === false &&
                                    audiosList?.length > 0 &&
                                    !userId && (
                                      <>
                                        <div className="msgs">
                                          Audios will be visible only after
                                          admin approval
                                        </div>
                                      </>
                                    )}
                                </div>
                              </div>
                            </>
                          )}   */}

{videos && (
  <>
    <p>Audios</p>
    <div className="service-list-main w-100">
      <div className="row">
        {audiosList && (
          <div>
            {audiosList.map((url) => {
              const isMp3 = url.toLowerCase().endsWith(".mp3");
              const fileName = url.split("/").pop(); // Extracts the file name from URL

              return (
                <div className="cv-card" key={url}>
                  <div className="d-flex align-items-center">
                    <i className="fa-solid fa-file"></i>
                    <div className="fileName audio-url-style">{fileName}</div>
                  </div>

                  {isMp3 ? (
                    <>
                      <button
                        className="view-cv"
                        onClick={() =>
                          setPlayingUrl(playingUrl === url ? null : url)
                        }
                      >
                        {playingUrl === url ? "Pause" : "Play"}
                      </button>

                      {playingUrl === url && (
                        <audio
                          controls
                          autoPlay
                          className="w-100"
                          onEnded={() => setPlayingUrl(null)}
                        >
                          <source src={url} type="audio/mpeg" />
                          Your browser does not support the audio tag.
                        </audio>
                      )}
                    </>
                  ) : (
                    <button
                      className="view-cv"
                      onClick={() => window.open(url, "_blank")}
                    >
                      Play
                      {/* <i className="fa-solid fa-external-link"></i> */}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  </>
)}



                          {services && (
                            <>
                              <ServicesCarousel talentData={talentData} />
                            </>
                          )}
                          {/* {socialMedia && (
                        <>
                          <CardCarousel />
                        </>
                      )} */}
                          {features && (
                            <>
                              {featuresList.length > 0 && (
                                <div className="table-container">
                                  <table>
                                    <tbody>
                                      {featuresList
                                        .filter((feature) => feature.value) // Only keep features that have a value
                                        .map((feature) => (
                                          <tr key={feature.label}>
                                            <td>{feature.label}</td>
                                            <td>
                                              {isNaN(feature.value)
                                                ? feature.value
                                                : `${feature.value} cm`}
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}

                              {featuresList.length === 0 && (
                                <>
                                  <div className="msgs">
                                    Features are not added
                                  </div>
                                </>
                              )}
                              {talentData?.adminApproved === false &&
                                featuresList.length >= 0 &&
                                !userId && (
                                  <>
                                    <div className="msgs">
                                      Features will be visible only after admin
                                      approval
                                    </div>
                                  </>
                                )}
                            </>
                          )}

                          {CV && (
                            <div>
                              {cvList.map((pdf) => {
                                return (
                                  <>
                                    <>
                                      <div className="cv-card" key={pdf.title}>
                                        <div className="d-flex align-items-center">
                                          <i className="fa-solid fa-file"></i>
                                          <div className="fileName">
                                            {pdf.title}
                                          </div>
                                        </div>
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

                              {cvList.length === 0 && (
                                <>
                                  <div className="msgs"> CV not added</div>
                                </>
                              )}
                              {talentData?.adminApproved === false &&
                                cvList.length > 0 &&
                                !userId && (
                                  <>
                                    <div className="msgs">
                                      {" "}
                                      CV will be visible only after admin
                                      approval
                                    </div>
                                  </>
                                )}
                            </div>
                          )}

                          {brandData?.planName != "Basic" && (
                            <>
                              {reviews && (
                                <>
                                  {reviewsList?.length > 0 && (
                                    <div className="model-reviews row">
                                      {reviewsList?.map((item, index) => {
                                        return (
                                          <div className="col-md-6">
                                            <div
                                              className="model-review-wrapper col-md-6"
                                              key={index}
                                            >
                                              <div className="review-header">
                                                <div className="review-date">
                                                  {new Date(
                                                    item.reviewDate
                                                  ).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                      day: "2-digit",
                                                      month: "long",
                                                      year: "numeric",
                                                    }
                                                  )}
                                                </div>
                                                <div className="review-action">
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
                                                    onClose={reviewMenuClose}
                                                  >
                                                    <MenuItem
                                                      onClick={() => {
                                                        reviewMenuClose();
                                                        reportReview(item);
                                                      }}
                                                    >
                                                      <i className="bi bi-flag-fill flag-icon"></i>
                                                      Report
                                                    </MenuItem>
                                                  </Menu>
                                                </div>
                                              </div>
                                              <div className="review-title scroll">
                                                {item.comment}
                                              </div>
                                              <div className="reviewer-section pb-0">
                                                <div className="reviewers-rating">
                                                  {[
                                                    ...Array(
                                                      Number(item.starRatings)
                                                    ),
                                                  ].map((_, starIndex) => (
                                                    <img
                                                      key={starIndex}
                                                      src={pinkStar}
                                                      alt="Star"
                                                    />
                                                  ))}
                                                </div>
                                                <div className="reviewer-details">
                                                  <div className="initial center">
                                                    {" "}
                                                    {item.reviewerName &&
                                                      item.reviewerName.charAt(
                                                        0
                                                      )}
                                                  </div>
                                                  <div className="reviewer-name">
                                                    {item.reviewerName}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {reviewsList.length === 0 && (
                                    <>
                                      <div className="msgs">
                                        {" "}
                                        Reviews are not added
                                      </div>
                                    </>
                                  )}
                                  {talentData?.adminApproved === false &&
                                    reviewsList.length > 0 &&
                                    !userId && (
                                      <>
                                        <div className="msgs">
                                          Reviews will be visible only after
                                          admin approval
                                        </div>
                                      </>
                                    )}
                                </>
                              )}
                            </>
                          )}

                          {brandData?.planName == "Basic" && (
                            <>
                              {reviews && (
                                <>
                                  <div className="msgs">
                                    Upgrade to pro plan to view talent reviews
                                  </div>
                                  <button
                                    className="view-cv"
                                    onClick={() => {
                                      navigate("/pricing");
                                    }}
                                  >
                                    Upgrade Plan
                                  </button>
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="find-more">
                <div className="btn moreBtn">Find More</div>
              </div> */}
            </div>
          </section>
          {isLoading && <Spinner />}
          {openPopUp && <PopUp message={message} />}
          <Modal
            open={isSliderOpen}
            onClose={handleClose}
            aria-labelledby="image-slider-modal"
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "#000",
                boxShadow: 24,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "90px",
                  right: 5,
                  color: "#ffffff",
                  left: "-95%",
                }}
                onClick={handleClose}
              >
                <ArrowBack />

                {/* <Close /> */}
              </IconButton>
              <img
                src={`${API.userFilePath}${photosList[currentIndex]}`}
                alt=""
                style={{
                  width: "auto !important",
                  height: "auto !important",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                className="big-slider-image"
              />
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 8,
                  color: "#ffffff",
                }}
                onClick={handlePrevious}
              >
                <ArrowBackIos />
              </IconButton>
              <IconButton
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 5,
                  color: "#ffffff",
                }}
                onClick={handleNext}
              >
                <ArrowForwardIos />
              </IconButton>
            </Box>
          </Modal>

          <div
            className="modal fade"
            id="ratingModal"
            tabIndex="-1"
            aria-labelledby="ratingModalLabel"
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
                  <h5 className="pb-2">Report</h5>
                  <div className="mb-3" style={{ textAlign: "left" }}>
                    <label className="form-label">Comments</label>
                    <textarea
                      name=""
                      id=""
                      cols="5"
                      rows="5"
                      className="form-control smaller-placeholder rating-text-area"
                      value={comments}
                      onChange={(e) => {
                        setComments(e.target.value);
                      }}
                      placeholder="Type your comments"
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    onClick={() => handleCloseModal(modalData)}
                    type="button"
                    className="btn submit-rating"
                    data-bs-dismiss="modal"
                    disabled={!comments}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!userId && (
        <>
          <div className="spacHeight-log">
            <div className="warning-wrapper newBoxLog">
              <div className="logoImg">
                {" "}
                <img src={log_Logo} alt="img" className="logNew-img" />
              </div>
              <p className="warning-msg">Please login to continue</p>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="warning-btn "
              >
                Login
              </button>
            </div>
          </div>
          {/* <Login /> */}
        </>
      )}

      {showProfile == false && userId && (
        <>
          <div className="spacHeight-log">
            <div className="warning-wrapper newBoxLog">
              <div className="logoImg">
                {" "}
                <img src={log_Logo} alt="img" className="logNew-img" />
              </div>
              <p className="warning-msg">
                This profile is not approved by the admin.
              </p>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="warning-btn "
              >
                Home
              </button>
            </div>
          </div>
        </>
      )}

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default TalentProfile;
