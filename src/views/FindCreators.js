import React, { useState, useEffect } from "react";
import "../assets/css/findcreators.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
import Select from "react-select";
import RangeSlider from "../components/RangeSlider.js";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import { useNavigate } from "react-router-dom";

const FindCreators = () => {
  const navigate = useNavigate();
  const searchIcon = require("../assets/icons/search.png");
  const heartIcon = require("../assets/icons/heart.png");
  const gents = require("../assets/images/gents.png");
  const girl1 = require("../assets/images/girl1.png");
  const girl2 = require("../assets/images/girl2.png");
  const girl3 = require("../assets/images/girl3.png");
  const girl4 = require("../assets/images/girl4.jpg");
  const girl5 = require("../assets/images/girl5.png");
  const girl6 = require("../assets/images/girl6.png");
  const girl7 = require("../assets/images/girl7.png");
  const girl8 = require("../assets/images/girl8.png");
  const girl9 = require("../assets/images/girl9.png");
  const girl10 = require("../assets/images/girl10.png");
  const girl11 = require("../assets/images/girl11.png");
  const girl12 = require("../assets/images/girl12.png");
  const girl13 = require("../assets/images/girl13.png");
  const girl14 = require("../assets/images/girl14.png");
  const girl15 = require("../assets/images/girl15.png");
  const girl16 = require("../assets/images/girl16.png");
  const starIcon = require("../assets/icons/star.png");
  const favoruiteIcon = require("../assets/icons/favorite.png");
  const locationIcon = require("../assets/icons/locationIcon.png");
  const darkStar = require("../assets/icons/darkStar.png");
  const brightStar = require("../assets/icons/brightStar.png");
  const jobIcon = require("../assets/icons/jobIcon.png");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedKeyword, setSelectedKeywords] = useState("");
  const [profession, setProfession] = useState("");
  const [gender, setGender] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [talentList, setTalentList] = useState([]);
  const [min, setMinAge] = useState("0");
  const [max, setMaxAge] = useState("100");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [languages, setLanguages] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [industry, setIndustry] = useState("");
  const [nationality, setNationality] = useState("");
  const [fullName, setFullName] = useState("");
  const [featuresListSelect, selectFeaturesList] = useState([]);
  const [featuresList, setFeaturesList] = useState([]);
  const [features, setFeature] = useState([]);

  const clear = () => {
    setSearchKeyword("");
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
    setFeature(updatedValues);
    // Call your API here with the updated selectedValues array
    // Example:
    // callYourApi(selectedValues);
  };

  const getTalentList = async () => {
    await ApiHelper.get(API.getTalentList)
      .then((resData) => {
        if (resData) {
          setTalentList(resData.data.data);
        }
        console.log("talentList", resData.data.data);
        console.log("talentList", talentList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reset = async () => {
    clear();
  };

  const professionList = [
    { value: "Actor", label: "Actor" },
    { value: "Model", label: "Model" },
    { value: "Director", label: "Director" },
    { value: "Singer", label: "Singer" },
    { value: "Dancer", label: "Dancer" },
    { value: "Reader", label: "Reader" },
    { value: "Writer", label: "Writer" },
  ];

  const genderList = [
    {
      value: "option 1",
      label: "option 1",
      color: "#00B8D9",
      isFixed: true,
    },
    { value: "option 2", label: "option 2", color: "#5243AA" },
  ];

  const getCountries = async () => {
    await ApiHelper.get(API.listCountries)
      .then((resData) => {
        if (resData) {
          setCountryList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const selectGender = (event) => {
    setGender(event.target.value);
  };

  const addFavorite = (item) => {
    console.log(item, "item");
    const modifiedTalents = talentList.map((obj) => {
      console.log(obj, "obj");
      if (obj.id === item.id) {
        return { ...obj, isFavorite: true };
      }
      return obj;
    });
    setTalentList(modifiedTalents);
    console.log(modifiedTalents, "modifiedTalents");
  };
  const openTalent = (item) => {
    console.log(item, "item");
    navigate("/talent-profile", { state: { talentData: item } });
  };

  const handleSelectedState = (state) => {
    setState(state?.label);
  };

  const removeFavorite = (item) => {
    console.log(item, "item");
    const modifiedTalents = talentList.map((obj) => {
      console.log(obj, "obj");
      if (obj.id === item.id) {
        return { ...obj, isFavorite: false };
      }
      return obj;
    });
    setTalentList(modifiedTalents);
    console.log(modifiedTalents, "modifiedTalents");
  };

  const onRangeChange = (e) => {
    console.log(Math.round(e.min), "e");
    console.log(Math.round(e.max), "e");
    setMinAge(Math.round(e.min));
    setMaxAge(Math.round(e.max));
  };

  const handleSelectedCountry = (event) => {
    console.log(event, "event");
    console.log(event?.value, "event?.value");
    setCountry(event?.value);
    getStates(event?.value);
    console.log(country, "country");
  };

  const selectIndustry = (event) => {
    setIndustry(event.target.value);
  };
  const selectEthnicity = (event) => {
    setEthnicity(event.target.value);
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

  const onMinChange = (event) => {
    setMinAge(event.target.value); // Update the state with the new value
  };
  const onMaxChange = (event) => {
    setMaxAge(event.target.value); // Update the state with the new value
  };

  const search = async () => {
    const formData = {
      profession: profession,
      parentCountry: country,
      childCity: state,
      gender: gender,
      childEthnicity: ethnicity,
      languages: languages,
      childFirstName: fullName,
      parentFirstName: fullName,
      minAge: min,
      maxAge: max,
      industry: industry,
      searchTerm: searchKeyword,
      selectedTerms: selectedKeyword,
      features: features,
      childEthnicity: ethnicity,
    };
    console.log(formData, "formData talentFilterData");
    setIsLoading(true);
    await ApiHelper.post(API.talentFilterData, formData)
      .then((resData) => {
        console.log("talentFilterData response", resData.data.data.user._id);
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Filtered SuccessFully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("Error Occured Try Again");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "unset", // Reset the minHeight to avoid clipping
    }),
    menu: (provided, state) => ({
      ...provided,
      maxHeight: "200px", // Adjust the maxHeight as per your requirement
      zIndex: 9999, // Ensure menu appears above other elements
    }),
  };

  useEffect(() => {
    getCountries();
    getTalentList();
    getFeatures();
    setProfession([professionList[2], professionList[3]]);

    selectFeaturesList([
      {
        label: "HairColour",
        type: "select",
        options: ["red", "black", "brown"],
      },
      {
        label: "Height",
        type: "select",
        options: ["168.2 cm", "176.6 cm"],
      },
      {
        label: "BodyType",
        type: "select",
        options: ["small", "fat"],
      },
    ]);
  }, []);

  return (
    <>
      <Header />
      <section>
        <div className="popular-header">
          <div className="header-title">Popular Models</div>
          <div className="header-menu">
            <div>Home</div>
            <div>Models</div>
          </div>
        </div>
      </section>
      <section>
        <div className="filter-section">
          <div className="filter-wrapper">
            <div className="filter-btn-wrapper">
              <div
                onClick={() => {
                  setFilterOpen(!filterOpen);
                }}
                className="filter-btn"
              >
                Filters
              </div>
            </div>
            <div className="keyword-wrapper pt-4">
              <div className="filter-items">Keyword</div>
              <div className="filter-input-wrapper">
                <div>
                  <img className="search-icon" src={searchIcon}></img>
                </div>
                <input
                  className="keyword-input"
                  placeholder="Search Keyword"
                  onChange={(e) => {
                    setSearchKeyword(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="search-words-section">
              <div></div>
              <div className="search-history">
                <div
                  onClick={(e) => {
                    setSelectedKeywords("creators");
                  }}
                >
                  creators*
                </div>
                <div>makeup artists*</div>
                <div>writers*</div>
                <div>beauticians*</div>
                <div>fitness*</div>
              </div>
            </div>
            <div className="profession-creator-wrapper">
              <div className="filter-items">Profession</div>
              <div className="profession-wrapper talents-profession">
                <Select
                  defaultValue={[professionList[2], professionList[3]]}
                  isMulti
                  name="colors"
                  options={professionList}
                  valueField="value"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(value) => setProfession(value)}
                  styles={customStyles}
                />
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Industry</div>
              <div className="creators-filter-select">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={selectIndustry}
                >
                  <option value="" disabled selected>
                    Select Industry
                  </option>
                  <option defaultValue value="model">
                    Models
                  </option>
                  <option value="actor">Actors</option>
                </select>
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Location</div>
              <div className="creators-filter-select">
                <Select
                  placeholder="Select country..."
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
            <div className="keyword-wrapper">
              <div className="filter-items">City</div>
              <div className="creators-filter-select">
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
            <div className="keyword-wrapper">
              <div className="filter-items">Gender</div>
              <div className="creators-filter-select">
                <label className="form-label">Gender</label>
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
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Age</div>
              <div className="creators-filter-select creators-filter-select-range">
                <RangeSlider min={1} max={100} onChange={onRangeChange} />
                {/* <p>
                  Change in slider:
                  {min},{max}
                </p> */}
              </div>
            </div>
            <div className="keyword-wrapper creator-age-main">
              <div className="creators-filter-select creator-age-wrapper">
                <input
                  type="text"
                  className="form-control range-inputs"
                  placeholder="Min"
                  value={`Min Age :${min}`}
                  onChange={onMinChange}
                  readOnly
                ></input>
                <input
                  type="text"
                  className="form-control range-inputs"
                  placeholder="Max"
                  value={`Max Age :${max}`}
                  onChange={onMaxChange}
                  readOnly
                ></input>
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Ethnicity</div>
              <div className="creators-filter-select">
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
            <div className="keyword-wrapper">
              <div className="filter-items">Nationality</div>
              <div className="creators-filter-select">
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
            <div className="keyword-wrapper">
              <div className="filter-items">Language</div>
              <div className="creators-filter-select">
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
            <div className="keyword-wrapper">
              <div className="filter-items">Full Name</div>
              <div className="creators-filter-select">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                ></input>
              </div>
            </div>

            {featuresListSelect && (
              <>
                {featuresListSelect.map((item, index) => {
                  return (
                    <>
                      <div className="keyword-wrapper">
                        <div className="filter-items"> {item.label}</div>

                        <div className="creators-filter-select">
                          <select
                            className="form-select features-select"
                            aria-label="Default select example"
                            onChange={(e) =>
                              handleFeaturesChange(item.label, e.target.value)
                            }
                          >
                            <option value="" disabled selected>
                              {item.label}
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
                      </div>
                    </>
                  );
                })}
              </>
            )}

            <div className="submit-buttons">
              <div
                className="reset-btn"
                onClick={(e) => {
                  e.preventDefault();
                  reset();
                }}
              >
                Reset
              </div>
              <div
                className="search-btn"
                onClick={(e) => {
                  e.preventDefault();
                  search();
                }}
              >
                Search
              </div>
            </div>
          </div>
          <div className="models-images">
            <div className="gallery-section">
              <div className="gallery-main p-0 m-0">
                {talentList?.map((item) => {
                  return (
                    <div className="gallery-wrapper">
                      <div className="">
                        <img
                          className="gallery-img"
                          src={`${API.userFilePath}${item.image?.fileData}`}
                        ></img>
                        <div className="rating">
                          <img src={brightStar}></img>
                          <img src={brightStar}></img>
                          <img src={brightStar}></img>
                          <img src={darkStar}></img>
                          <img src={darkStar}></img>
                        </div>
                        {!item.isFavorite && (
                          <img
                            className="heart-icon"
                            src={heartIcon}
                            onClick={() => addFavorite(item)}
                          ></img>
                        )}
                        {item.isFavorite === true && (
                          <img
                            className="heart-icon"
                            src={favoruiteIcon}
                            onClick={() => removeFavorite(item)}
                          ></img>
                        )}
                      </div>
                      <div className="gallery-content">
                        <div className="content">
                          <div className="name">
                            {item?.preferredChildFirstname
                              ? `${item?.preferredChildFirstname}`
                              : "Elizabeth"}
                          </div>
                          <div className="address">
                            {item.profession?.map((profession, index) => (
                              <React.Fragment key={index}>
                                {profession.value}
                                {index !== item.profession.length - 1 && ","}
                              </React.Fragment>
                            ))}
                          </div>
                          <div className="user-details">
                            <div className="location-wrapper">
                              <img src={locationIcon} alt="" />
                              <div className="location-name">
                                {item?.parentCountry}
                              </div>
                            </div>
                            <div className="location-wrapper">
                              <img src={jobIcon} alt="" />
                              <div className="location-name">
                                25 Jobs Booked
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="find-more">
        <div>Find More</div>
      </div>
      <Footer />
    </>
  );
};

export default FindCreators;
