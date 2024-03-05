import React, { useEffect, useState, useRef } from "react";
import "../assets/css/talent-dashboard.scss";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const offcanvasRef = useRef(null); // Reference to the offcanvas element
  const [gigsList, setGigsList] = useState([]);
  const [topBrandsList, setTopBrandsList] = useState([]);
  const [isFilled, setIsFilled] = useState(true);
  const [featuresList, setFeaturesList] = useState([]);
  const [features, setFeature] = useState([]);

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
  const url = window.location.href;
  let queryString = url.split("?")[1];
  console.log(" queryString:", queryString);
  console.log("Search queryString:", typeof queryString);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the offcanvas with Bootstrap's Offcanvas API
    const offcanvas = new window.bootstrap.Offcanvas(offcanvasRef.current);
    offcanvasRef.current.addEventListener("hidden.bs.offcanvas", () => {
      setIsMenuOpen(false); // Update state when offcanvas is closed
    });
    getRecentGigs();
    getTopBrands();
    checkProfileStatus();
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

  const checkProfileStatus = async () => {
    await ApiHelper.post(`${API.checkProfileStatus}${queryString}`)
      .then((resData) => {
        if (resData.data.status === false) {
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
      openAdultsSignupModal();
    }, 800);
  };

  // Define refs for the modals
  const doItNowRef = useRef(null);
  const adultsSignupRef = useRef(null);
  // Function to open the "doItNow" modal
  const openDoItNowModal = () => {
    const modal = new window.bootstrap.Modal(doItNowRef.current);
    modal.show();
  };

  // Function to close the "doItNow" modal
  const closeDoItNowModal = () => {
    const modal = new window.bootstrap.Modal(doItNowRef.current);
    modal.hide();
  };

  const openAdultsSignupModal = () => {
    const modal = new window.bootstrap.Modal(adultsSignupRef.current);
    modal.show();
  };

  // Function to close the "adultsSignup" modal
  const closeAdultsSignupModal = () => {
    const modal = new window.bootstrap.Modal(adultsSignupRef.current);
    modal.hide();
  };

  const updateAdultSignup = () => {
    closeAdultsSignupModal();
    setMessage("Updated SuccessFully!");
    setTimeout(function() {
      setOpenPopUp(true);
    }, 1000);
    setTimeout(function() {
      setOpenPopUp(false);
    }, 2000);
  };

  const professionList = [
    { value: "Actor", label: "Photographer" },
    { value: "Model", label: "Beauticians" },
    { value: "Director", label: "Artists" },
    { value: "Singer", label: "Video Grapher" },
  ];

  const handleProfessionChange = (selectedOptions) => {
    setSelectedProfessions(selectedOptions);
    console.log(selectedOptions, "selectedOptions");
  };

  const handleDetailChange = (index, field, value) => {
    const updatedSelectedProfessions = [...selectedProfessions];
    updatedSelectedProfessions[index][field] = value;
    setSelectedProfessions(updatedSelectedProfessions);
  };

  const categoryList = [
    "Actor",
    "Model",
    "Director",
    "Singer",
    "Fashion",
    "Food",
    "Beauty",
    "Luxury",
    "Business and Technology",
    "Artist",
    "Mummy & Parenting",
    "Travel",
    "Health & Fitness",
    "Home and Gardening",
    "Eco & Sustainability",
    "Music",
    "Movies/Films",
    "Lifestyle",
    "Celebrity",
    "Content Creation",
    "Virtual Assistant",
  ];

  function chooseCategory(category) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  const selectEthnicity = (event) => {
    setEthnicity(event.target.value);
  };
  const selectGender = (event) => {
    setGender(event.target.value);
  };
  const selectLanguage = (event) => {
    setLanguages(event.target.value);
  };
  const selectNationality = (event) => {
    setNationality(event.target.value);
  };
  const selectMaritalStatus = (event) => {
    setMaritalStatus(event.target.value);
  };
  const handleKidsEmailChange = (e) => {
    const email = e.target.value;
    setKidsEmail(e.target.value);
    // Validate email using regex
    setIsValidEmail(emailRegex.test(email));
  };
  const onEditorSummary = (editorState) => {
    setAboutYou([draftToHtml(convertToRaw(editorState.getCurrentContent()))]);
    setEditorState(editorState);
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
                Do it Now
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={adultsSignupRef}
        className="modal fade"
        id="adults_signup"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-fullscreen modal-dialog-centered d-flex align-items-center"
          style={{ height: "80vh", marginTop: "30px" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <img className="modal-logo" src={btLogo}></img>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body talent-popup-body">
              <div className="adult-form-wrapper">
                <div className="adult-img-img">
                  <img src={adultsBanner} alt="" />
                </div>
                <div className="adult-main">
                  <div className="adults-form-title">Complete your Profile</div>
                  <div className="kids-form-section">
                    <div className="mb-3">
                      <label className="adults-titles">
                        Profession (choose any 4)
                      </label>
                      <div>
                        <Select
                          defaultValue={[]}
                          isMulti
                          name="professions"
                          options={professionList}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleProfessionChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="profession-content-section">
                    {selectedProfessions.map((profession, index) => (
                      <div key={index} className="dynamic-profession">
                        <div className="mb-3">
                          <label className="form-label">
                            {profession.label} / day
                          </label>
                          <input
                            type="number"
                            className="form-control profession-input"
                            value={profession.perDaySalary || ""}
                            onChange={(e) =>
                              handleDetailChange(
                                index,
                                "perDaySalary",
                                e.target.value
                              )
                            }
                            placeholder="$/day"
                          ></input>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            {profession.label} / hour
                          </label>
                          <input
                            type="number"
                            className="form-control profession-input"
                            value={profession.perHourSalary || ""}
                            onChange={(e) =>
                              handleDetailChange(
                                index,
                                "perHourSalary",
                                e.target.value
                              )
                            }
                            placeholder="$/day"
                          ></input>
                        </div>

                        <div className="offer-wrapper">
                          <input
                            className="profession-checkbox"
                            id={profession.label}
                            type="checkbox"
                            checked={profession.openToOffers || false}
                            onChange={(e) =>
                              handleDetailChange(
                                index,
                                "openToOffers",
                                e.target.checked
                              )
                            }
                          />
                          <label
                            className="form-label offer-label"
                            htmlFor={profession.label}
                          >
                            Open to Offers / Happy to negotiate
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="adults-titles">
                    Please select the top 4 categories relevant to your profile.
                  </div>
                  <div className="category-list">
                    {categoryList.map((category, index) => (
                      <div
                        className={
                          selectedCategories.includes(category)
                            ? "selected-category"
                            : "category-name"
                        }
                        onClick={(e) => {
                          chooseCategory(category);
                        }}
                        key={index}
                      >
                        {category}
                      </div>
                    ))}
                  </div>

                  <div className="adults-titles">Personal Details</div>
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Legal First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setAdultsLegalFirstName(e.target.value);
                          }}
                          placeholder="Enter Legal First Name"
                        ></input>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Legal Last name</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setAdultsLegalLastName(e.target.value);
                          }}
                          placeholder="Enter Legal Last name"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">
                          Prefered First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setAdultsPreferedFirstName(e.target.value);
                          }}
                          placeholder="Enter Prefered First Name"
                        ></input>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Prefered Last name</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setAdultsPreferedLastName(e.target.value);
                          }}
                          placeholder="Prefered Legal Last name"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={selectGender}
                        >
                          <option value="" disabled selected>
                            Select Gender
                          </option>
                          <option defaultValue value="male">
                            Male
                          </option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Marital Status</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={selectMaritalStatus}
                        >
                          <option value="" disabled selected>
                            Select Marital Status
                          </option>
                          <option defaultValue value="married">
                            Married
                          </option>
                          <option value="unmarried">UnMarried</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Ethnicity</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={selectEthnicity}
                        >
                          <option value="" disabled selected>
                            Select Ethnicity
                          </option>
                          <option defaultValue value="forward">
                            Forward
                          </option>
                          <option value="backword">Backword</option>
                        </select>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Nationality</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={selectNationality}
                        >
                          <option value="" disabled selected>
                            Select Nationality
                          </option>
                          <option defaultValue value="asian">
                            Asian
                          </option>
                          <option value="african">African</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Date Of Birth</label>
                        <input
                          type="date"
                          className="form-control"
                          onChange={(e) => {
                            setDob(e.target.value);
                          }}
                          placeholder=""
                        ></input>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Language</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={selectLanguage}
                        >
                          <option value="" disabled selected>
                            Select Language
                          </option>
                          <option defaultValue value="english">
                            English
                          </option>
                          <option value="spanish">Spanish</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="adults-titles">Contact Details</div>

                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                          type="number"
                          className="form-control"
                          minLength="15"
                          onChange={(e) => {
                            setAdultsPhone(e.target.value);
                          }}
                          placeholder="Enter Phone number"
                        ></input>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className={`form-control ${
                            isValidEmail ? "" : "is-invalid"
                          }`}
                          value={kidsEmail}
                          onChange={handleKidsEmailChange}
                          placeholder="Enter E-mail"
                        />
                        {!isValidEmail && (
                          <div className="invalid-feedback">
                            Please enter a valid email address.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Location</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setAdultsLocation(e.target.value);
                          }}
                          placeholder="Enter Location"
                        ></input>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setAdultsCity(e.target.value);
                          }}
                          placeholder="City"
                        ></input>
                      </div>
                    </div>
                  </div>

                  <div className="adults-titles">Bio</div>

                  <div className="rich-editor">
                    <label className="form-label">About You</label>
                    <Editor
                      editorStyle={{ height: "170px", overflow: "hidden" }}
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

                  <div className="adults-titles">Services</div>
                  <div className="">
                    <div className="">
                      <div className="mb-3">
                        <label className="form-label">Service name</label>
                        <input
                          type="number"
                          className="form-control"
                          minLength="15"
                          onChange={(e) => {}}
                          placeholder="Enter Service Heading"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Amount</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {}}
                          placeholder="Enter Amount In $"
                        ></input>
                      </div>
                    </div>
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Duration</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {}}
                          placeholder="Duration In Months"
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="adults-titles">Features</div>

                  <div className="rich-editor">
                    <label className="form-label">Features</label>
                    <Editor
                      editorStyle={{ height: "170px", overflow: "hidden" }}
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

                  <div className="add-more-services">
                    <div className="add-more-services-btn">
                      Add More Services
                    </div>
                  </div>

                  <div className="adults-titles">Portofolio</div>
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
                  <div className="adults-titles">CV</div>
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

                  <div className="adults-titles">Features (Optional)</div>

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
                                    Select {item.label}
                                  </option>
                                  {item.options.map((item, index) => {
                                    return (
                                      <>
                                        <option defaultValue value="1">
                                          {item}
                                        </option>
                                      </>
                                    );
                                  })}
                                </select>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                  </div>

                  <div className="adults-titles">
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="media-wrapper">
                        <div className="media-info">
                          <img src={youTube} alt="" />
                          <div className="media-text">
                            <input
                              type="text"
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

                  <div className="kids-form-title">ID Verification</div>

                  <div className="id-verify-info">
                    To ensure authenticity and compliance, please upload a clear
                    and legible copy of your government-issued ID. After
                    successful verification, your ID will be promptly removed
                    from our database to prioritize your privacy and data
                    security
                  </div>

                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="mb-3 mt-3">
                        <label className="form-label">ID Type</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) => {
                            setIdType(e.target.value);
                          }}
                        >
                          <option defaultValue value="licence">
                            Licence
                          </option>
                          <option value="passport">PassPort</option>
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

                  <div className="verification-status">Not Verified</div>
                </div>
              </div>
            </div>
            <div className="doitnow">
              <div
                className="doit-btn"
                onClick={() => {
                  updateAdultSignup();
                }}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Update Now
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="talent-column-one col-lg-8 mr-2">
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
