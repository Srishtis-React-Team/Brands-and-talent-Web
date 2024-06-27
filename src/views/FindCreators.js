import React, { useState, useEffect } from "react";
import "../assets/css/findcreators.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
import Select from "react-select";
import RangeSlider from "../components/RangeSlider.js";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import { useNavigate } from "react-router-dom";
import nationalityOptions from "../components/nationalities.js";
import languageOptions from "../components/languages.js";
import PopUp from "../components/PopUp.js";
import CurrentUser from "../CurrentUser.js";
const FindCreators = () => {
  const {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
    talentName,
    brandName,
  } = CurrentUser();
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
  const [cityList, setCityList] = useState([]);
  const [kidsCity, setKidsCity] = useState("");
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [keywordsList, setkeywordsList] = useState([]);
  const [currentUserData, steCurrentUserData] = useState([]);
  const [brandId, setBrandId] = useState(null);

  const searchInputChange = async (e) => {
    setSearchKeyword(e.target.value);
  };

  const postKeyword = async (e) => {
    const fromData = {
      searchedKeyword: searchKeyword,
      user_id: brandId,
    };
    await ApiHelper.post(API.postUserSearchKeyword, fromData)
      .then((resData) => {
        if (resData.data.status === true) {
          getUserSearchKeyword();
          search();
        }
      })
      .catch((err) => {});
  };

  const getUserSearchKeyword = async () => {
    await ApiHelper.get(`${API.getUserSearchKeyword}${brandId}`)
      .then((resData) => {
        if (resData) {
          setkeywordsList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const deleteKeyword = async (e) => {
    const formData = {
      searchedKeyword: e,
    };
    await ApiHelper.post(`${API.deleteUserSearchKeyword}`, formData)
      .then((resData) => {
        if (resData) {
          setMessage("Removed SuccessFully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            getUserSearchKeyword();
          }, 800);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
    console.log(brandId, "brandId");
  }, [brandId]);

  useEffect(() => {
    checkUserStatus();
    console.log(currentUserData, "currentUserData");
  }, []);
  useEffect(() => {
    console.log(keywordsList, "keywordsList");
  }, [keywordsList]);

  const checkUserStatus = async () => {
    const formData = {
      user_id: "65fbf4bcd8acb33fc6a706f7",
    };
    await ApiHelper.post(API.checkUserStatus, formData)
      .then((resData) => {
        if (resData) {
          steCurrentUserData(resData.data.data);
        }
        console.log("checkUserStatus", resData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (brandId) {
      getUserSearchKeyword();
    }
  }, [brandId]);

  const clear = () => {
    setSearchKeyword("");
    setSelectedKeywords("");
    setProfession("");
    setGender("");
    setSubCategory("");
    setAge("");
    setCountry(null);
    setState("");
    setEthnicity("");
    setTalentList([]);
    setMinAge("0");
    setMaxAge("100");
    setLanguages("");
    setMaritalStatus("");
    setIndustry("");
    setNationality("");
    setFullName("");
    setFeature([]);
    // window.location.reload();
  };

  const customNoOptionsMessageState = ({ inputValue }) =>
    inputValue ? "No States Available" : "Choose Country First";
  const customNoOptionsMessageCity = ({ inputValue }) =>
    inputValue ? "No States Available" : "Choose City First";

  const ethnicityOptions = [
    "South Asian",
    "Indian/Pakistani",
    "South East Asian",
    "Khmer",
    "Vietnamese",
    "Indonesian",
    "Thai",
    "Middle-East",
    "Black",
    "African",
    "Latino/Hispanic",
    "Russian",
    "Ukrainian",
    "Nordic",
    "Scandinavian",
    "European",
    "Italian",
  ];

  const industryList = [
    "Fashion",
    "Parenting and family",
    "Sports/Martial Arts/Dance",
    "Arts and photography",
    "Videography",
    "Music",
    "Comedy/Entertainment",
    "Education",
    "Transportation",
    "Food and beverage",
    "Finance",
    "Beauty/Cosmetics",
    "Luxury",
    "Business and Technology",
    "Travel/Tourism",
    "Health/Wellness/Fitness",
    "Home and Gardening",
    "Eco-friendly/Nature/Sustainability",
    "Diversity and inclusion",
    "Outdoor and nature",
    "Content Creation",
    "Lifestyle",
    "Celebrity",
    "Animals/Pets",
    "Web3",
    "Home and DIY",
    "Anime/Memes",
    "Website/Mobile Applications",
    "Gaming",
    "Lifecoach/Relationships",
    "Cosplay/Memes",
    "Other",
  ];

  // const industryList = [
  //   "Animal",
  //   "Arts and Entertainment",
  //   "Automotive",
  //   "Business",
  //   "Construction",
  //   "Education",
  //   "Energy and Environment",
  //   "Engineering",
  //   "Finance and Insurance",
  //   "Food",
  //   "Government",
  //   "Healthcare",
  //   "Legal",
  //   "Manufacturing",
  //   "Personal Care",
  //   "Real Estate",
  //   "Retail",
  //   "Technology",
  //   "Transportation and Storage",
  //   "Travel",
  //   "N/A",
  // ];

  const gendersOptions = [
    "Man",
    "Woman",
    "Non binary",
    "Transgender Woman",
    "Transgender Man",
    "Agender",
    "Other",
    "Prefer not to say",
  ];

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
    { value: "Model", label: "Model" },
    { value: "Celebrity", label: "Celebrity" },
    { value: "Creator", label: "Creator" },
    { value: "Stylist", label: "Stylist" },
    { value: "Photographer", label: "Photographer" },
    { value: "Videographer", label: "Videographer" },
    { value: "Hair & Makeup Artist", label: "Hair & Makeup Artist" },
    { value: "Actor", label: "Actor" },
    { value: "Singer", label: "Singer" },
    { value: "Writer", label: "Writer" },
    { value: "Filmmaker", label: "Filmmaker" },
    { value: "RJ", label: "RJ" },
    { value: "DJ", label: "DJ" },
    { value: "VJ", label: "VJ" },
    { value: "Graphic Designer", label: "Graphic Designer" },
    { value: "Personal Trainer", label: "Personal Trainer" },
    { value: "Sports Instructor", label: "Sports Instructor" },
    { value: "Dance Teacher", label: "Dance Teacher" },
    { value: "Choreographer", label: "Choreographer" },
    { value: "Martial Arts Instructor", label: "Martial Arts Instructor" },
    { value: "Yoga Teacher", label: "Yoga Teacher" },
    { value: "Webapp Developer", label: "Webapp Developer" },
    { value: "Virtual Assistant", label: "Virtual Assistant" },
    { value: "AI Influencer", label: "AI Influencer" },
    { value: "Fashion Designer", label: "Fashion Designer" },
    { value: "Other", label: "Other" },
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

  const addFavorite = async (item) => {
    console.log(item);
    const formData = {
      type: item?.type,
      user: item?._id,
    };
    let brandId = localStorage.getItem("brandId");
    let talentId = localStorage.getItem("userId");
    console.log(brandId, "userid");
    console.log(talentId, "userid");
    let loggidInID;
    if (brandId) {
      loggidInID = brandId;
    } else if (talentId) {
      loggidInID = talentId;
    }
    await ApiHelper.post(`${API.setUserFavorite}${loggidInID}`, formData, true)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Added The Talent To Your Favorites ");
          setOpenPopUp(true);
          getTalentList();
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("Please Login First");
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
  const openTalent = (item) => {
    console.log(item, "item");
    // navigate("/talent-profile", { state: { talentData: item } });

    navigate(`/talent-profile/${item.preferredChildFirstname}`, {
      state: { talentData: item },
    });
  };

  const handleSelectedState = (state) => {
    setState(state?.label);
    getCities({
      countryName: country,
      stateName: state?.label,
    });
  };

  const removeFavorite = async (item) => {
    console.log(item);
    const formData = {
      type: item?.type,
      user: item?._id,
    };
    let brandId = localStorage.getItem("brandId");
    let talentId = localStorage.getItem("userId");
    console.log(brandId, "userid");
    console.log(talentId, "userid");
    let loggidInID;
    if (brandId) {
      loggidInID = brandId;
    } else if (talentId) {
      loggidInID = talentId;
    }
    await ApiHelper.post(`${API.removeFavorite}${loggidInID}`, formData, true)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Removed Talent From Favorites");
          setOpenPopUp(true);
          getTalentList();

          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage(resData.data.message);
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

  const getCities = async (data) => {
    const formData = data;
    await ApiHelper.post(API.listCity, formData)
      .then((resData) => {
        if (resData) {
          setCityList(resData.data.data);
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
      parentCountry: country,
      parentState: state,
      childCity: kidsCity,
      childGender: gender,
      childEthnicity: ethnicity,
      languages: languages,
      childNationality: nationality,
      preferredChildFirstname: fullName,
      preferredChildLastName: fullName,
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
        console.log("talentFilterData response", resData);
        if (resData.data.status === true) {
          console.log(resData?.data?.data, "filtered talents");
          setIsLoading(false);
          setMessage("Filtered SuccessFully");
          setOpenPopUp(true);
          setTalentList(resData?.data?.data);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("No Matching Users Found");
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

  const handleSelectedCity = (state) => {
    setKidsCity(state?.label);
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

  const [starCount, setStarCount] = useState(0);
  const handleStarClick = (index) => {
    setStarCount(index + 1);
  };

  useEffect(() => {
    console.log(starCount, "starCount");
  }, [starCount]);

  const [modalData, setModalData] = useState(null);
  const [comments, setComments] = useState(null);
  const rateTalent = (item) => {
    setModalData(item);
    const modalElement = document.getElementById("ratingModal");
    const bootstrapModal = new window.bootstrap.Modal(modalElement);
    bootstrapModal.show();
  };

  const handleCloseModal = async (talent) => {
    const formData = {
      comment: comments,
      starRatings: starCount,
      reviewerName: talentName ? talentName : brandName,
      reviewerId: currentUserId,
      talentId: talent?._id,
    };
    await ApiHelper.post(API.reviewsPosting, formData)
      .then((resData) => {
        setMessage("Rating Submitted SuccessFully!");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
          const modalElement = document.getElementById("ratingModal");
          const bootstrapModal = new window.bootstrap.Modal(modalElement);
          bootstrapModal.hide();
          getTalentList();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ---- ---- Const ---- ---- //
  const stars = document.querySelectorAll(".stars i");
  const starsNone = document.querySelector(".rating-box");

  // ---- ---- Stars ---- ---- //
  stars.forEach((star, index1) => {
    star.addEventListener("click", () => {
      stars.forEach((star, index2) => {
        // ---- ---- Active Star ---- ---- //
        index1 >= index2
          ? star.classList.add("active")
          : star.classList.remove("active");
      });
    });
  });

  return (
    <>
      <Header />
      <section>
        <div className="popular-header" style={{ marginTop: "64px" }}>
          <div className="container">
            <div className="header-title">Popular Talents</div>
            {/* <div className="header-menu">
              <div>Home</div>
              <div>Talents</div>
            </div> */}
          </div>
        </div>
      </section>
      <section className="creatorPage-Wraper">
        <div className="container">
          <div className="filter-section py-2 mt-3">
            <div className="brand-filter-section row">
              <div className="col-md-4 col-lg-4">
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
                    <div className="filter-input-wrapper inpWid">
                      <input
                        className="keyword-input"
                        placeholder="Search Keyword"
                        value={searchKeyword}
                        onChange={searchInputChange}
                      ></input>
                      <div onClick={postKeyword}>
                        <i className="search-icon bi bi-search"></i>
                      </div>
                    </div>
                  </div>
                  <div className="search-words-section">
                    <div></div>
                    {keywordsList && keywordsList.length > 0 && (
                      <>
                        <div className="search-history">
                          {keywordsList &&
                            keywordsList.length > 0 &&
                            keywordsList.map((item, index) => {
                              return (
                                <>
                                  <div className="searched-word-wrapper">
                                    <div
                                      key={index}
                                      className="selected-word-style"
                                      onClick={(e) => {
                                        setSelectedKeywords(item);
                                        setSearchKeyword(item);
                                      }}
                                    >
                                      {item}
                                    </div>
                                    <div
                                      onClick={(e) => {
                                        deleteKeyword(item);
                                      }}
                                    >
                                      <i className="bi bi-x cancel-icon"></i>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="keyword-wrapper">
                    <div className="filter-items">Full Name</div>
                    <div className="creators-filter-select inpWid">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
                        value={fullName}
                      ></input>
                    </div>
                  </div>

                  <div className="profession-creator-wrapper">
                    <div className="filter-items">Profession</div>
                    <div className="profession-wrapper talents-profession inpWid">
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
                    <div className="filter-items">Category</div>
                    <div className="creators-filter-select inpWid">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={selectIndustry}
                        value={industry}
                      >
                        <option value="" disabled selected>
                          Select Category
                        </option>
                        {industryList.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="keyword-wrapper">
                    <div className="filter-items">Country</div>
                    <div className="creators-filter-select inpWid">
                      <Select
                        placeholder="Select country..."
                        options={countryList.map((country, index) => ({
                          value: country,
                          label: country,
                          key: index,
                        }))}
                        value={
                          country ? { value: country, label: country } : null
                        }
                        onChange={handleSelectedCountry}
                        isSearchable={true}
                      />
                    </div>
                  </div>
                  <div className="keyword-wrapper">
                    <div className="filter-items">State</div>
                    <div className="creators-filter-select inpWid">
                      <Select
                        placeholder="Select state..."
                        options={stateList.map((state) => ({
                          value: state.stateId, // or whatever unique identifier you want to use
                          label: state.name,
                        }))}
                        value={state ? { value: state, label: state } : null}
                        onChange={handleSelectedState}
                        isSearchable={true}
                        noOptionsMessage={customNoOptionsMessageState}
                      />
                    </div>
                  </div>
                  <div className="keyword-wrapper">
                    <div className="filter-items">City</div>
                    <div className="creators-filter-select inpWid">
                      <Select
                        placeholder="Select City..."
                        options={cityList.map((city) => ({
                          value: city.cityId, // or whatever unique identifier you want to use
                          label: city.name,
                        }))}
                        value={
                          kidsCity ? { value: kidsCity, label: kidsCity } : null
                        }
                        onChange={handleSelectedCity}
                        isSearchable={true}
                        noOptionsMessage={customNoOptionsMessageCity}
                      />
                    </div>
                  </div>
                  <div className="keyword-wrapper">
                    <div className="filter-items">Gender</div>
                    <div className="creators-filter-select inpWid">
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
                        {gendersOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="keyword-wrapper">
                    <div className="filter-items">Age</div>
                    <div className="creators-filter-select creators-filter-select-range inpWid">
                      <RangeSlider min={1} max={100} onChange={onRangeChange} />
                      {/* <p>
                        Change in slider:
                        {min},{max}
                      </p> */}
                    </div>
                  </div>
                  <div className="keyword-wrapper creator-age-main ">
                    <div className="creators-filter-select creator-age-wrapper inpWid">
                      <input
                        type="text"
                        className="form-control range-inputs"
                        placeholder="Min"
                        value={`Min Age: ${min}`}
                        onChange={onMinChange}
                        readOnly
                      ></input>
                      <input
                        type="text"
                        className="form-control range-inputs"
                        placeholder="Max"
                        value={`Max Age: ${max}`}
                        onChange={onMaxChange}
                        readOnly
                      ></input>
                    </div>
                  </div>
                  <div className="keyword-wrapper">
                    <div className="filter-items">Ethnicity</div>
                    <div className="creators-filter-select inpWid">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={selectEthnicity}
                        value={ethnicity}
                      >
                        <option value="" disabled selected>
                          Select Ethnicity
                        </option>
                        {ethnicityOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="keyword-wrapper">
                    <div className="filter-items">Nationality</div>
                    <div className="creators-filter-select inpWid">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={selectNationality}
                        value={nationality}
                      >
                        <option value="" disabled selected>
                          Select Nationality
                        </option>
                        {nationalityOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="keyword-wrapper">
                    <div className="filter-items">Language</div>
                    <div className="creators-filter-select inpWid">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={selectLanguage}
                        value={languages}
                      >
                        <option value="" disabled selected>
                          Select Language
                        </option>
                        {languageOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* {featuresListSelect && (
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
                                  value={features}
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
                  )} */}

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
              </div>
              <div className="col-md-8 col-lg-8">
                <div className="models-images">
                  <div className="gallery-section">
                    <div className="gallery-main p-0 m-0">
                      <div className="row favTalent px-2 mb-3">
                        {talentList?.map((item) => {
                          return (
                            <div className="col-sm-6 col-md-4 col-lg-3 px-1">
                              <div className="gallery-wrapper modalSpc">
                                <div className="imgBox">
                                  <img
                                    className="gallery-img"
                                    src={`${API.userFilePath}${item.image?.fileData}`}
                                  ></img>
                                  {(() => {
                                    const starRatings = parseInt(
                                      item?.averageStarRatings,
                                      10
                                    );
                                    const totalStars = 5;
                                    const filledStars =
                                      !isNaN(starRatings) && starRatings > 0
                                        ? starRatings
                                        : 0;

                                    return (
                                      <div
                                        className="rating"
                                        onClick={() => rateTalent(item)}
                                      >
                                        {[...Array(totalStars)].map(
                                          (_, starIndex) => (
                                            <i
                                              key={starIndex}
                                              className={
                                                starIndex < filledStars
                                                  ? "bi bi-star-fill rating-filled-star"
                                                  : "bi bi-star rating-unfilled-star"
                                              }
                                              alt="Star"
                                            ></i>
                                          )
                                        )}
                                      </div>
                                    );
                                  })()}
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
                                <div
                                  className="galCont"
                                  onClick={() => openTalent(item)}
                                >
                                  <div className="content">
                                    <div className="find-creator-name">
                                      {`${item?.preferredChildFirstname} ${item?.preferredChildLastName}`}
                                    </div>
                                    <div className="find-creator-address ">
                                      {item.profession?.map(
                                        (profession, index) => (
                                          <React.Fragment key={index}>
                                            {profession.value}
                                            {index !==
                                              item.profession.length - 1 && ","}
                                          </React.Fragment>
                                        )
                                      )}
                                    </div>
                                    <div className="user-details">
                                      <div className="location-wrapper">
                                        <img src={locationIcon} alt="" />
                                        <div className="find-creator-location-name ">
                                          {item?.parentCountry}
                                        </div>
                                      </div>
                                      <div className="location-wrapper">
                                        <img src={jobIcon} alt="" />
                                        <div className="find-creator-location-name">
                                          25 Jobs Booked
                                        </div>
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="find-more mt-2 pt-0">
        <div className="moreBtn">Find More</div>
      </div>
      {openPopUp && <PopUp message={message} />}

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
              {/* <p id="ratingModalLabel" className="modal-job-title">
                  Rate {modalData?.preferredChildFirstname}
                </p> */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <div class="rating-box">
                  <h3> Rate {modalData?.preferredChildFirstname}</h3>
                  <div class="stars">
                    {[...Array(5)].map((star, index) => {
                      return (
                        <i
                          key={index}
                          className={`fa-solid fa-star ${
                            index < starCount ? "active" : ""
                          }`}
                          onClick={() => handleStarClick(index)}
                        ></i>
                      );
                    })}
                  </div>
                </div>
              </div>
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
                disabled={starCount === 0}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FindCreators;
