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
import "../../assets/css/forms/kidsform-one.scss";

const AdultFormOne = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gigsList, setGigsList] = useState([]);
  const [topBrandsList, setTopBrandsList] = useState([]);
  const [isFilled, setIsFilled] = useState(true);
  const [featuresList, setFeaturesList] = useState([]);
  const [features, setFeature] = useState([]);
  const [profileFile, setProfileFile] = useState(null);
  const girl1 = require("../../assets/images/girl1.png");
  const btLogo = require("../../assets/icons/Group 56.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const adultsBanner = require("../../assets/images/adultsBanner.png");
  const doitnow = require("../../assets/images/doitnow.png");
  const headsetLogo = require("../../assets/icons/headset.png");
  const user = require("../../assets/icons/user-only.png");
  const genderIcon = require("../../assets/icons/gender.png");
  const map = require("../../assets/icons/map-pin.png");
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
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [portofolioFile, setPortofolioFile] = useState([]);
  const [resumeFile, setResumeFile] = useState([]);
  const [videoAUdioFile, setVideoAudioFile] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [age, setAge] = useState("");

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
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getFeatures();
    const storedUserId = localStorage.getItem("userId");
    console.log(storedUserId, "storedUserId");
    setUserId(storedUserId);
  }, [userId]);

  const getFeatures = async () => {
    await ApiHelper.get(API.getFeatures)
      .then((resData) => {
        if (resData) {
          setFeaturesList(resData.data.data[0].features);
        }
      })
      .catch((err) => {});
  };

  // Function to handle date picker change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value; // Assuming your date picker provides the selected date
    setDob(selectedDate); // Set the DOB in state
    // Calculate age
    const dobDate = new Date(selectedDate);
    const today = new Date();
    const diff = today - dobDate;
    const ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); // Calculating age in years
    setAge(String(ageInYears)); // Set the age in state
  };

  const updateAdultSignup = async () => {
    let formData = {
      childFirstName: adultsLegalFirstName,
      childLastName: adultsLegalLastName,
      preferredChildFirstname: adultsPreferedFirstName,
      preferredChildLastName: adultsPreferedLastName,
      profession: selectedProfessions,
      relevantCategories: selectedCategories,
      childGender: gender,
      maritalStatus: maritalStatus,
      childNationality: nationality,
      childEthnicity: ethnicity,
      languages: languages,
      childDob: dateOfBirth,
      childPhone: adultsPhone,
      contactEmail: kidsEmail,
      childLocation: adultsLocation,
      childCity: adultsCity,
      childAboutYou: aboutYou,
      age: age,
    };

    if (userId) {
      await ApiHelper.post(`${API.updateAdults}${userId}`, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Updated SuccessFully!");
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
              navigate(`/adult-signup-service-details?${userId}`);
            }, 1000);
          } else if (resData.data.status === false) {
            setIsLoading(false);
            setMessage(resData.data.message);
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
            }, 1000);
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
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
              <div className="step-text">Step 1 of 3</div>
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
            <div className="kidsform-one">
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
                            handleDateChange(e);
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
                </div>
              </div>
            </div>
          </div>
          <div className="dialog-footer">
            <button
              type="button"
              onClick={(e) => {
                navigate("/");
              }}
              className="step-back"
            >
              Back
            </button>

            <button
              className="step-continue"
              type="button"
              onClick={() => {
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

export default AdultFormOne;
