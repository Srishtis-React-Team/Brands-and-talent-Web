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
import { useNavigate } from "react-router";

const KidsformOne = ({ sendDataToParent }) => {
  const paramsValues = window.location.search;
  const urlParams = new URLSearchParams(paramsValues);
  const userId = urlParams.get("userId");
  const userEmail = urlParams.get("userEmail");
  console.log(userId, "userId");
  console.log(userEmail, "userEmail");

  const navigate = useNavigate();
  const btLogo = require("../assets/icons/Group 56.png");
  const kidsImage = require("../assets/images/kidsImage.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [showError, setShowError] = useState(false);
  const [kidsFillData, setKidsFillData] = useState(null);
  const [parentFirstNameError, setparentFirstNameError] = useState(false);
  const [parentLastNameError, setparentLastNameError] = useState(false);
  const [parentEmailError, setparentEmailError] = useState(false);
  const [talentPasswordError, settalentPasswordError] = useState(false);
  const [talentConfirmPasswordError, settalentConfirmPasswordError] = useState(
    false
  );
  const [kidsLegalFirstNameError, setkidsLegalFirstNameError] = useState(false);
  const [kidsLegalLastNameError, setkidsLegalLastNameError] = useState(false);
  const [genderError, setgenderError] = useState(false);
  const [message, setMessage] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
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
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [talentPassword, setTalentPassword] = useState("");
  const [talentConfirmPassword, setTalentConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    getCountries();
    if (userId) {
      getKidsData();
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // Function to handle email input change
  const handleEmailChange = (e) => {
    setparentEmailError(false);
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

  const selectEthnicity = (event) => {
    setEthnicity(event.target.value);
  };
  const selectGender = (event) => {
    setGender(event.target.value);
    setgenderError(false);
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
    console.log([draftToHtml(convertToRaw(editorState.getCurrentContent()))]);
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

  const getCountries = async () => {
    await ApiHelper.get(API.listCountries)
      .then((resData) => {
        if (resData) {
          setCountryList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const getKidsData = async () => {
    await ApiHelper.post(`${API.getKidsData}${userId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          console.log(resData.data.data);
          setKidsFillData(resData.data.data);
          console.log(kidsFillData, "kidsFillData");
          setParentFirstName(resData?.data?.data?.parentFirstName);
          setParentLastName(resData?.data?.data?.parentLastName);
          setParentEmail(resData?.data?.data?.parentEmail);
          setParentMobile(resData?.data?.data?.parentMobileNo);
          setAddress(resData?.data?.data?.parentAddress);
          setKidsLegalFirstName(resData?.data?.data?.childFirstName);
          setKidsLegalLastName(resData?.data?.data?.childLastName);
          setKidsPreferedFirstName(
            resData?.data?.data?.preferredChildFirstname
          );
          setKidsPreferedLastName(resData?.data?.data?.preferredChildLastName);
          setGender(resData?.data?.data?.childGender);
          setLanguages(resData?.data?.data?.languages);
          setNationality(resData?.data?.data?.childNationality);
          setMaritalStatus(resData?.data?.data?.maritalStatus);
          setEthnicity(resData?.data?.data?.childEthnicity);
          setKidsEmail(resData?.data?.data?.childEmail);
          setKidsPhone(resData?.data?.data?.childPhone);
          setKidsLocation(resData?.data?.data?.childLocation);
          setKidsCity(resData?.data?.data?.childCity);
          console.log(resData?.data?.data?.childAboutYou, "aboutdsdsdf");
          setAboutYou(resData?.data?.data?.childAboutYou);
          setSelectedCategories([
            ...selectedCategories,
            ...resData.data.data?.relevantCategories,
          ]);
          console.log(selectedCategories, "selectedCategories");
        }
      })
      .catch((err) => {});
  };

  const handleSelectedCountry = (event) => {
    console.log(event, "event");
    setCountry(event?.value);
    getStates(event?.value);
    console.log(country, "country");
  };
  const handleSelectedState = (state) => {
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
        }
      })
      .catch((err) => {});
  };

  const kidsSignUp = async () => {
    if (parentFirstName === "") {
      setparentFirstNameError(true);
    }
    if (parentLastName === "") {
      setparentLastNameError(true);
    }
    if (parentEmail === "") {
      setparentEmailError(true);
    }
    if (talentPassword === "") {
      settalentPasswordError(true);
    }
    if (talentConfirmPassword === "") {
      settalentConfirmPasswordError(true);
    }
    if (kidsLegalFirstName === "") {
      setkidsLegalFirstNameError(true);
    }
    if (kidsLegalLastName === "") {
      setkidsLegalLastNameError(true);
    }
    if (gender === "") {
      setgenderError(true);
    }
    if (
      parentFirstName !== "" ||
      parentLastName !== "" ||
      parentEmail !== "" ||
      talentPassword !== "" ||
      talentConfirmPassword !== "" ||
      kidsLegalFirstName !== "" ||
      kidsLegalLastName !== "" ||
      gender !== ""
    ) {
      const formData = {
        parentFirstName: parentFirstName,
        parentLastName: parentLastName,
        parentEmail: parentEmail,
        parentMobileNo: parentMobile,
        parentCountry: country,
        parentState: state,
        parentAddress: address,
        talentPassword: talentPassword,
        confirmPassword: talentConfirmPassword,
        profession: selectedProfessions,
        relevantCategories: selectedCategories,
        maritalStatus: maritalStatus,
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
      };
      setIsLoading(true);
      await ApiHelper.post(API.kidsSignUp, formData)
        .then((resData) => {
          console.log(resData, "resData");
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Registered SuccessFully!");
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
              navigate(
                `/talent-login-plan-details?userId=${resData.data.data["userId"]}&userEmail=${resData.data.data["email"]}`
              );
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
              <div className="step-text">Step 1 of 4</div>
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
              <div className="kids-wrapper">
                <div className="kids-img">
                  <img src={kidsImage} alt="" />
                </div>
                <div className="kids-form">
                  <div className="kids-title">
                    Welcome to Kids & Teen Talent ( 13-17 years ) Registration
                    Form
                  </div>
                  <div className="kids-description">
                    Unleash your kid's inner star! ✨ Brands & Talent is your
                    gateway to exciting opportunities for young creators ( 13-17
                    )!  Imagine their talent shining on the big stage,
                    collaborating with renowned brands on fun gigs and
                    influencer projects.  This registration form is your first
                    step to making their dreams a reality. Register now and
                    unlock a world of possibilities for your kid!
                  </div>
                  <div className="kids-notes">
                    NOTE:  1. Authorized Guardianship Required: This Kids & Teen
                    Registration form is for authorized guardians only,
                    registering on behalf of their child. Any unauthorized or
                    fraudulent registration constitutes a violation of our Terms
                    of Service and may result in immediate and permanent account
                    suspension.
                  </div>
                  <div className="kids-notes-two">
                    2. Violation of Policy: Any action or conduct that violates
                    our policies, including unauthorized registration, may lead
                    to account suspension.
                  </div>
                  <div className="kids-main">
                    <div className="kids-form-title">
                      Parent/Guardian Details
                    </div>
                    <div className="kids-form-row">
                      <div className="kids-form-section">
                        <div className="mb-3">
                          <label className="form-label">
                            Legal First Name
                            <span className="mandatory">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              parentFirstNameError
                                ? "is-invalid"
                                : "form-control"
                            }`}
                            value={parentFirstName}
                            onChange={(e) => {
                              setParentFirstName(e.target.value);
                              setparentFirstNameError(false);
                            }}
                            placeholder="Enter Legal First Name"
                          ></input>
                          {parentFirstNameError && (
                            <div className="invalid-fields">
                              Please enter First Name
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="kids-form-section">
                        <div className="mb-3">
                          <label className="form-label">Legal Last name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={parentLastName}
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
                          <label className="form-label">
                            E-mail <span className="mandatory">*</span>
                          </label>
                          <input
                            type="email"
                            className={`form-control ${
                              isValidEmail ? "" : "is-invalid"
                            }`}
                            onChange={handleEmailChange}
                            placeholder="Enter E-mail"
                            value={parentEmail}
                          />
                          {!isValidEmail && (
                            <div className="invalid-feedback">
                              Please enter a valid email address.
                            </div>
                          )}
                          {parentEmailError && (
                            <div className="invalid-fields">
                              Please enter Email
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
                            maxLength="15"
                            pattern="[0-9]{15}"
                            value={parentMobile}
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
                        <div className="mb-3">
                          <label className="form-label">
                            Password <span className="mandatory">*</span>
                          </label>
                          <div className="form-group has-search adult-password-wrapper">
                            <span className="fa fa-lock form-control-feedback"></span>
                            <input
                              type={showPassword ? "text" : "password"}
                              className="form-control adult-signup-inputs"
                              placeholder="Password"
                              onChange={(e) => {
                                handlePasswordChange(e);
                                setTalentPassword(e.target.value);
                                settalentPasswordError(false);
                              }}
                            ></input>
                            {showPassword ? (
                              <span
                                className="fa fa-eye show-password-icon"
                                onClick={togglePasswordVisibility}
                              ></span>
                            ) : (
                              <span
                                className="fa fa-eye-slash show-password-icon"
                                onClick={togglePasswordVisibility}
                              ></span>
                            )}
                            {talentPasswordError && (
                              <div className="invalid-fields">
                                Please enter Password
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="kids-form-section">
                        <div className="mb-1">
                          <label className="form-label">
                            Confirm Password{" "}
                            <span className="mandatory">*</span>
                          </label>
                          <div className="form-group has-search adult-confirm-password-wrapper">
                            <span className="fa fa-lock form-control-feedback"></span>
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className={`form-control adult-signup-inputs ${
                                passwordMatch ? "" : "is-invalid"
                              }`}
                              placeholder="Confirm Password"
                              onChange={(e) => {
                                handleConfirmPasswordChange(e);
                                setTalentConfirmPassword(e.target.value);
                                settalentConfirmPasswordError(false);
                              }}
                            ></input>
                            {showConfirmPassword ? (
                              <span
                                className="fa fa-eye show-confirm-password-icon"
                                onClick={toggleConfirmPasswordVisibility}
                              ></span>
                            ) : (
                              <span
                                className="fa fa-eye-slash show-confirm-password-icon"
                                onClick={toggleConfirmPasswordVisibility}
                              ></span>
                            )}
                            {talentConfirmPasswordError && (
                              <div className="invalid-fields">
                                Please enter Password
                              </div>
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
                            value={address}
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
                    <div className="kids-form-title">
                      Please select the top 4 categories relevant to your
                      profile.
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
                          <label className="form-label">
                            Legal First Name{" "}
                            <span className="mandatory">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => {
                              setKidsLegalFirstName(e.target.value);
                              setkidsLegalFirstNameError(false);
                            }}
                            value={kidsLegalFirstName}
                            placeholder="Enter Legal First Name"
                          ></input>
                          {kidsLegalFirstNameError && (
                            <div className="invalid-fields">
                              Please enter First Name
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="kids-form-section">
                        <div className="mb-3">
                          <label className="form-label">Legal Last name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={kidsLegalLastName}
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
                          <label className="form-label">
                            Prefered First Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={kidsPreferedFirstName}
                            onChange={(e) => {
                              setKidsPreferedFirstName(e.target.value);
                            }}
                            placeholder="Enter Prefered First Name"
                          ></input>
                        </div>
                      </div>
                      <div className="kids-form-section">
                        <div className="mb-3">
                          <label className="form-label">
                            Prefered Last name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={kidsPreferedLastName}
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
                          <label className="form-label">
                            Gender <span className="mandatory">*</span>
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={selectGender}
                            value={gender}
                          >
                            <option value="" disabled selected>
                              Select Gender
                            </option>
                            <option defaultValue value="male">
                              Male
                            </option>
                            <option value="female">Female</option>
                          </select>
                          {genderError && (
                            <div className="invalid-fields">
                              Please Select Gender
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="kids-form-section">
                        <div className="mb-3">
                          <label className="form-label">Marital Status</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={selectMaritalStatus}
                            value={maritalStatus}
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
                            value={ethnicity}
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
                            value={nationality}
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
                            value={dateOfBirth}
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
                            value={languages}
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
                            minLength="15"
                            value={kidsPhone}
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
                            onChange={handleKidsEmailChange}
                            value={kidsEmail}
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
                            value={kidsLocation}
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
                            value={kidsCity}
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
              onClick={(e) => {
                kidsSignUp();
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

export default KidsformOne;
