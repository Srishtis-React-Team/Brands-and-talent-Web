import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsform-one.scss";
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
import ReactFlagsSelect from "react-flags-select";

const KidsformOne = ({ sendDataToParent }) => {
  const kidsImage = require("../assets/images/kidsImage.png");
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
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [jobSummary, setJobSummary] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [jobBenefits, setJobBenefits] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [portofolioFile, setPortofolioFile] = useState([]);
  const [resumeFile, setResumeFile] = useState([]);
  const [videoAUdioFile, setVideoAudioFile] = useState([]);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [features, setFeature] = useState([]);
  const [selected, setSelected] = useState("");
  //getting values states
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentLastName, setParentLastName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentMobile, setParentMobile] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [kidsPreferedFirstName, setKidsPreferedFirstName] = useState("");
  const [kidsPreferedLastName, setKidsPreferedLastName] = useState("");
  const [kidsLegalFirstName, setKidsLegalFirstName] = useState("");
  const [kidsLegalLastName, setKidsLegalLastName] = useState("");
  const [kidsPhone, setKidsPhone] = useState("");
  const [kidsEmail, setKidsEmail] = useState("");
  const [kidsLocation, setKidsLocation] = useState("");
  const [kidsCity, setKidsCity] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [nationality, setNationality] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [languages, setLanguages] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [profession, setProfession] = useState([]);
  const [aboutYou, setAboutYou] = useState([]);
  const [relevantCategories, setRelevantCategories] = useState([]);
  const [featuresList, setFeaturesList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [portofolioFilesUpload, setPortofolioFilesUpload] = useState([]);
  const [videoAudiosFilesUpload, setVideoAudiosFilesUpload] = useState([]);
  const [cvFilesUpload, setCvFilesUpload] = useState([]);
  const [hairColour, setHairColour] = useState("");
  const [eyeColour, setEyeColour] = useState("");
  const [height, setHeight] = useState("");
  const [shoeSize, setShoeSize] = useState("");
  const [hips, setHips] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [weight, setWeight] = useState("");
  const [neckToToe, setNeckToToe] = useState("");
  const [insideLeg, setInsideLeg] = useState("");
  const [dressSize, setDressSize] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [subscription, setSubscription] = useState("");
  const [instagramFollowers, setInstagramFollowers] = useState("");
  const [facebookFollowers, setfacebookFollowers] = useState("");
  const [xtwitterFollowers, setXtwitterFollowers] = useState("");
  const [linkedinFollowers, setlinkedinFollowers] = useState("");
  const [threadsFollowers, setThreadsFollowers] = useState("");
  const [tiktoksFollowers, setTiktoksFollowers] = useState("");
  const [youtubesFollowers, setYoutubesFollowers] = useState("");
  const [idType, setIdType] = useState("");
  const [verificationID, setVerificationID] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [talentPassword, setTalentPassword] = useState("");
  const [talentConfirmPassword, setTalentConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [kidsSignupResponse, setKidsResponse] = useState();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // Function to handle email input change
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setParentEmail(e.target.value);
    // Validate email using regex
    setIsValidEmail(emailRegex.test(email));
  };

  const handleKidsEmailChange = (e) => {
    const email = e.target.value;
    setKidsEmail(e.target.value);
    // Validate email using regex
    setIsValidEmail(emailRegex.test(email));
  };

  // Function to handle country selection

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

  const handlePasswordChange = (e) => {
    setTalentPassword(e.target.value);
    setPasswordMatch(e.target.value === talentConfirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setTalentConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === talentPassword);
  };

  const handleProfessionChange = (selectedOptions) => {
    setSelectedProfessions(selectedOptions);
  };

  const handleDetailChange = (index, field, value) => {
    const updatedSelectedProfessions = [...selectedProfessions];
    updatedSelectedProfessions[index][field] = value;
    setSelectedProfessions(updatedSelectedProfessions);
  };

  const handleSubmit = () => {
    // Construct the final object containing selected professions and their details
  };

  useEffect(() => {
    getFeatures();
    getCountries();
    if (portofolioFile) {
    }
  }, [portofolioFile, features]);

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
        console.log(fileObj, "fileObj");
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
        console.log(fileObj, "fileObj uploadResume");

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

  const professionList = [
    { value: "Actor", label: "Photographer" },
    { value: "Model", label: "Beauticians" },
    { value: "Director", label: "Artists" },
    { value: "Singer", label: "Video Grapher" },
  ];

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

  const onEditorSummary = (editorState) => {
    setAboutYou([draftToHtml(convertToRaw(editorState.getCurrentContent()))]);
    setEditorState(editorState);
  };

  function chooseCategory(category) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  const getFeatures = async () => {
    await ApiHelper.get(API.getFeatures)
      .then((resData) => {
        if (resData) {
          setFeaturesList(resData.data.data[0].features);
        }
      })
      .catch((err) => {});
  };
  const getCountries = async () => {
    await ApiHelper.get(API.listCountries)
      .then((resData) => {
        if (resData) {
          setCountryList(resData.data.data);
          console.log(resData.data, "country");
          console.log(countryList, "countryList");
        }
      })
      .catch((err) => {});
  };

  const handleSelectedCountry = (country) => {
    console.log(country, "country");
    setCountry(country?.value);
    getStates(country?.value);
  };
  const handleSelectedState = (state) => {
    console.log(state, "state");
    setState(state?.label);
  };

  const getStates = async (data) => {
    const formData = {
      countryName: data,
    };
    await ApiHelper.post(API.listStates, formData)
      .then((resData) => {
        if (resData) {
          setStateList(resData.data.data);
          console.log(resData.data, "country");
          console.log(stateList, "stateList");
        }
      })
      .catch((err) => {});
  };

  const kidsSignUp = async () => {
    const formData = {
      parentFirstName: parentFirstName,
      parentLastName: parentLastName,
      parentEmail: parentEmail,
      parentMobileNo: parentMobile,
      parentCountry: country,
      parentState: state,
      parentAddress: address,
      talentPassword: talentPassword,
      confirmPassword: talentPassword,
      profession: selectedProfessions,
      relevantCategories: selectedCategories,
      childFirstName: kidsLegalFirstName,
      childLastName: kidsLegalLastName,
      preferredChildFirstname: kidsPreferedFirstName,
      preferredChildLastName: kidsPreferedLastName,
      childGender: gender,
      childNationality: nationality,
      childEthnicity: ethnicity,
      languages: languages,
      childDob: dateOfBirth,
      childPhone: kidsPhone,
      childEmail: kidsEmail,
      childLocation: kidsLocation,
      childCity: kidsCity,
      childAboutYou: aboutYou,
      cv: resumeFile,
      portfolios: portofolioFile,
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
    };
    setIsLoading(true);
    await ApiHelper.post(API.kidsSignUp, formData)
      .then((resData) => {
        console.log(resData);
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Registered SuccessFully!");
          setKidsResponse(resData.data);
          passData(true, resData.data.data);
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        } else {
          passData(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const passData = (status, data) => {
    console.log(kidsSignupResponse, "kidsSignupResponse");
    sendDataToParent({
      signupStatus: status,
      email: data,
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
      console.log("Image deleted!");
    }

    // Hide the options after selection
    setShowOptions(false);
  };

  const handleView = (imageUrl) => {
    console.log(imageUrl, "imageUrl");
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
      <div className="kidsform-one">
        <div className="kids-wrapper">
          <div className="kids-img">
            <img src={kidsImage} alt="" />
          </div>
          <div className="kids-form">
            <div className="kids-title">
              Welcome to Kids & Teen Talent ( 13-17 years ) Registration Form
            </div>
            <div className="kids-description">
              Unleash your kid's inner star! ✨ Brands & Talent is your gateway
              to exciting opportunities for young creators ( 13-17 )!  Imagine
              their talent shining on the big stage, collaborating with renowned
              brands on fun gigs and influencer projects.  This registration
              form is your first step to making their dreams a reality. Register
              now and unlock a world of possibilities for your kid!
            </div>
            <div className="kids-notes">
              NOTE:  1. Authorized Guardianship Required: This Kids & Teen
              Registration form is for authorized guardians only, registering on
              behalf of their child. Any unauthorized or fraudulent registration
              constitutes a violation of our Terms of Service and may result in
              immediate and permanent account suspension.
            </div>
            <div className="kids-notes-two">
              2. Violation of Policy: Any action or conduct that violates our
              policies, including unauthorized registration, may lead to account
              suspension.
            </div>

            <div className="kids-main">
              <div className="kids-form-title">Parent/Guardian Details</div>
              <div className="kids-form-row">
                <div className="kids-form-section">
                  <div className="mb-3">
                    <label className="form-label">Legal First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setParentFirstName(e.target.value);
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
                        setParentLastName(e.target.value);
                      }}
                      placeholder="Enter Legal Last name"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="kids-form-row">
                <div className="kids-form-section">
                  <div className="mb-3">
                    <label className="form-label">E-mail</label>
                    <input
                      type="email"
                      className={`form-control ${
                        isValidEmail ? "" : "is-invalid"
                      }`}
                      value={parentEmail}
                      onChange={handleEmailChange}
                      placeholder="Enter E-mail"
                    />
                    {!isValidEmail && (
                      <div className="invalid-feedback">
                        Please enter a valid email address.
                      </div>
                    )}
                  </div>
                </div>
                <div className="kids-form-section">
                  <div className="mb-3">
                    <label className="form-label">Mobile No.</label>
                    <input
                      type="number"
                      className="form-control"
                      maxlength="15"
                      pattern="[0-9]{15}"
                      onChange={(e) => {
                        setParentMobile(e.target.value);
                      }}
                      placeholder=" Mobile No."
                    ></input>
                  </div>
                </div>
              </div>
              <div className="kids-form-row">
                <div className="kids-form-section">
                  <div className="mb-3">
                    <label className="form-label">Country</label>
                    <Select
                      placeholder="Search country..."
                      options={countryList.map((country, index) => ({
                        value: country,
                        label: country,
                        key: index,
                      }))}
                      value={country?.value}
                      onChange={handleSelectedCountry}
                      isSearchable={true}
                    />
                  </div>
                </div>
                <div className="kids-form-section">
                  <div className="mb-3">
                    <label className="form-label">State</label>
                    <Select
                      placeholder="Select state..."
                      options={stateList.map((state) => ({
                        value: state.stateId, // or whatever unique identifier you want to use
                        label: state.name,
                      }))}
                      value={state?.label}
                      onChange={handleSelectedState}
                      isSearchable={true}
                    />
                  </div>
                </div>
              </div>
              <div className="kids-form-row">
                <div className="kids-form-section">
                  {/* <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => {
                        handlePasswordChange(e);
                        // You can add your existing onChange logic here
                        // Example: existingOnChangeFunction(e);
                        setTalentPassword(e.target.value);
                      }}
                      placeholder="Enter Password"
                    ></input>
                  </div> */}

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div class="form-group has-search adult-password-wrapper">
                      <span class="fa fa-lock form-control-feedback"></span>
                      <input
                        type={showPassword ? "text" : "password"}
                        class="form-control adult-signup-inputs"
                        placeholder="Password"
                        onChange={(e) => {
                          handlePasswordChange(e);
                          setTalentPassword(e.target.value);
                        }}
                      ></input>
                      {showPassword ? (
                        <span
                          class="fa fa-eye show-password-icon"
                          onClick={togglePasswordVisibility}
                        ></span>
                      ) : (
                        <span
                          class="fa fa-eye-slash show-password-icon"
                          onClick={togglePasswordVisibility}
                        ></span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="kids-form-section">
                  <div className="mb-1">
                    <label className="form-label">Confirm Password</label>
                    <div class="form-group has-search adult-confirm-password-wrapper">
                      <span class="fa fa-lock form-control-feedback"></span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className={`form-control adult-signup-inputs ${
                          passwordMatch ? "" : "is-invalid"
                        }`}
                        placeholder="Confirm Password"
                        onChange={(e) => {
                          handleConfirmPasswordChange(e);
                          setTalentConfirmPassword(e.target.value);
                        }}
                      ></input>
                      {showConfirmPassword ? (
                        <span
                          class="fa fa-eye show-confirm-password-icon"
                          onClick={toggleConfirmPasswordVisibility}
                        ></span>
                      ) : (
                        <span
                          class="fa fa-eye-slash show-confirm-password-icon"
                          onClick={toggleConfirmPasswordVisibility}
                        ></span>
                      )}
                    </div>
                    {!passwordMatch &&
                      talentConfirmPassword &&
                      talentConfirmPassword.length && (
                        <p className="password-wrong">
                          Passwords does not match.
                        </p>
                      )}
                  </div>

                  {/* <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className={`form-control ${
                        passwordMatch ? "" : "is-invalid"
                      }`}
                      onChange={(e) => {
                        handleConfirmPasswordChange(e);
                        setTalentConfirmPassword(e.target.value);
                      }}
                      placeholder=" Confirm Password"
                    ></input>
                    {!passwordMatch && talentConfirmPassword && (
                      <p className="password-wrong">Passwords do not match.</p>
                    )}
                  </div> */}
                </div>
              </div>
              <div className="kids-form-row">
                <div className="kids-form-section">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Address
                    </label>
                    <textarea
                      className="form-control address-textarea"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="kids-form-title">Your Child Details</div>
              <div className="kids-form-row">
                <div className="kids-form-section">
                  <div className="mb-3">
                    <label className="form-label pay-info">
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
                        id="offer"
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
                      <label className="form-label offer-label" htmlFor="offer">
                        Open to Offers / Happy to negotiate
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="kids-form-title">
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
              <div className="kids-form-title">Personal Details</div>
              <div className="kids-form-row">
                <div className="kids-form-section">
                  <div className="mb-3">
                    <label className="form-label">Legal First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setKidsLegalFirstName(e.target.value);
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
                        setKidsLegalLastName(e.target.value);
                      }}
                      placeholder="Enter Legal Last name"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="kids-form-row">
                <div className="kids-form-section">
                  <div className="mb-3">
                    <label className="form-label">Prefered First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setKidsPreferedFirstName(e.target.value);
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
                        setKidsPreferedLastName(e.target.value);
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
              <div className="kids-form-title">Contact Details</div>

              <div className="kids-form-row">
                <div className="kids-form-section">
                  <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                      type="number"
                      className="form-control"
                      minlength="15"
                      onChange={(e) => {
                        setKidsPhone(e.target.value);
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
                        setKidsLocation(e.target.value);
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
                        setKidsCity(e.target.value);
                      }}
                      placeholder="City"
                    ></input>
                  </div>
                </div>
              </div>

              <div className="kids-form-title">Bio</div>

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

              <div className="kids-form-title">Portofolio</div>

              <div className="cv-section">
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

              <div className="cv-section">
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
              <div className="kids-form-title">CV</div>
              <div className="cv-section">
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
                <div className="upload-info">Drag and drop CV to upload</div>
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
                                  onClick={() => setShowOptions(!showOptions)}
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
                                      onClick={() => handleResumeDelete(item)}
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
                            <label className="form-label">{item.label}</label>
                            <select
                              className="form-select features-select"
                              aria-label="Default select example"
                              onChange={(e) =>
                                handleFeaturesChange(item.label, e.target.value)
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

              <div className="kids-form-title">
                Explore Your Social Media Presence
              </div>

              <div className="explore-info">
                If you want to display your actual follower count, please
                connect with your social media. Otherwise, manually enter your
                followers count
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
                To ensure authenticity and compliance, please upload a clear and
                legible copy of your government-issued ID. After successful
                verification, your ID will be promptly removed from our database
                to prioritize your privacy and data security
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
              <div className="verification-status">Not Verified</div>
              <div className="signup-btn-section">
                <div
                  className="signup-btn"
                  onClick={(e) => {
                    kidsSignUp();
                  }}
                >
                  {isLoading ? "Loading..." : "SignUp"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default KidsformOne;

{
  /* <div className="profession-btn">
              <button
                type="button"
                className="submit-profession"
                onClick={handleSubmit}
              >
                Submit Profession
              </button>
            </div> */
}
