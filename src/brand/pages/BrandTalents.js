import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.css";
import "../../assets/css/createjobs.css";
import "../../assets/css/talent-profile.css";
import "../../assets/css/findcreators.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from "react-select";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import { useNavigate } from "react-router";
import RangeSlider from "../../components/RangeSlider";
import BrandHeader from "./BrandHeader.js";
import BrandSideMenu from "./BrandSideMenu.js";
import CurrentUser from "../../CurrentUser.js";
import SocialMediasList from "../../components/SocialMediasList.js";
import useFieldDatas from "../../config/useFieldDatas.js";
const BrandTalents = () => {
  const {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
    talentName,
    brandName,
  } = CurrentUser();

  const {
    categoryList,
    professionList,
    gendersList,
    languagesList,
    nationalitiesList,
  } = useFieldDatas();

  const navigate = useNavigate();
  const heartIcon = require("../../assets/icons/heart.png");
  const favoruiteIcon = require("../../assets/icons/favorite.png");
  const pinkStar = require("../../assets/icons/pink-star.png");

  const [filterOpen, setFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  const [minimumAge, setMinimumAge] = useState("");
  const [maximumAge, setMaximumAge] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [industry, setIndustry] = useState("");
  const [nationality, setNationality] = useState([]);
  const [fullName, setFullName] = useState("");
  const [featuresListSelect, selectFeaturesList] = useState([]);
  const [featuresList, setFeaturesList] = useState([]);
  const [height, setHeight] = useState("");

  const [features, setFeature] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [kidsCity, setKidsCity] = useState("");
  const [keywordsList, setkeywordsList] = useState([]);
  const [currentUserData, steCurrentUserData] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [brandId, setBrandId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [socialMedias, setSocialMedias] = useState([]);
  const [minFollowers, setMinFollowers] = useState("");
  const [maxFollowers, setMaxFollowers] = useState("");

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const searchInputChange = async (e) => {
    setSearchKeyword(e.target.value);
  };

  const postKeyword = async (e) => {
    const fromData = {
      searchedKeyword: searchKeyword,
      user_id: localStorage.getItem("brandId"),
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
    await ApiHelper.get(
      `${API.getUserSearchKeyword}${localStorage.getItem("brandId")}`
    )
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
          setMessage("Removed Successfully");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getUserSearchKeyword();
          }, 800);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    const formData = {
      user_id: "65fbf4bcd8acb33fc6a706f7",
    };
    await ApiHelper.post(API.checkUserStatus, formData)
      .then((resData) => {
        if (resData) {
          steCurrentUserData(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  // useEffect(() => {
  //   getUserSearchKeyword();
  // }, [keywordsList]);

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
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
    setMinAge("0");
    setMaxAge("100");
    setLanguages("");
    setMaritalStatus("");
    setIndustry("");
    setNationality([]);
    setFullName("");
    setFeature([]);
    getTalentList();
  };

  const customNoOptionsMessageState = ({ inputValue }) =>
    inputValue ? "No States Available" : "Choose Country First";
  const customNoOptionsMessageCity = ({ inputValue }) =>
    inputValue ? "No States Available" : "Choose City First";

  const ethnicityOptions = [
    "Khmer",
    "Thai",
    "Asian",
    "Vietnamese",
    "Indonesian",
    "Filipino",
    "Chinese",
    "South-East Asian",
    "South-Asian",
    "Central Asian",
    "Indian",
    "Pakistani",
    "Nepali",
    "Russian",
    "Ukrainian",
    "Japanese",
    "Korean",
    "Latino/Hispanic",
    "European",
    "Scandinavian",
    "Turk",
    "Native American",
    "Native Hawaiian/Pacific Islander",
    "White",
    "Black",
    "African",
    "Middle-Eastern",
    "Arab",
    "Persian",
    "Other",
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

  const onMinFollowersChange = (event) => {
    setMinFollowers(event.target.value); // Update the state with the new value
  };
  const onMaxFollowersChange = (event) => {
    setMaxFollowers(event.target.value); // Update the state with the new value
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
  };

  const getTalentList = async () => {
    const formData = {
      userId: localStorage.getItem("brandId"),
    };
    await ApiHelper.post(API.getTalentList, formData)
      .then((resData) => {
        if (resData) {
          setTalentList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const reset = async () => {
    clear();
  };

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
    const formData = {
      type: item?.type,
      user: item?._id,
    };
    const loggedID = localStorage.getItem("currentUser");
    await ApiHelper.post(`${API.setUserFavorite}${loggedID}`, formData, true)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Talent added to your favourite list");
          setOpenPopUp(true);
          getTalentList();
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("Please Login First");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };
  const openTalent = (item) => {
    navigate(`/talent/${item.publicUrl}`, {
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
    const formData = {
      type: item?.type,
      user: item?._id,
    };
    const loggedID = localStorage.getItem("currentUser");
    await ApiHelper.post(`${API.removeFavorite}${loggedID}`, formData, true)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Removed Talent From Favorites");
          setOpenPopUp(true);
          getTalentList();

          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  const onRangeChange = (e) => {
    setMinAge(Math.round(e.min));
    setMaxAge(Math.round(e.max));
    setMinimumAge(Math.round(e.min));
    setMaximumAge(Math.round(e.max));
  };

  const handleSelectedCountry = (event) => {
    setCountry(event?.value);
    getStates(event?.value);
  };

  const selectIndustry = (event) => {
    setIndustry(event.target.value);
  };
  const selectEthnicity = (event) => {
    setEthnicity(event.target.value);
  };

  const selectLanguage = (selectedOptions) => {
    if (!selectedOptions || selectedOptions.length === 0) {
      setLanguages([]);
      return;
    }
    const selectedLanguages = selectedOptions.map((option) => option.value);
    setLanguages(selectedLanguages);
  };

  const selectNationality = (selectedOptions) => {
    if (!selectedOptions || selectedOptions.length === 0) {
      setNationality([]);
      return;
    }
    const selectedLanguages = selectedOptions.map((option) => option.value);

    setNationality(selectedLanguages);
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
    setMinAge(event.target.value);
  };
  const onMaxChange = (event) => {
    setMaxAge(event.target.value);
  };

  const search = async () => {
    const formData = {
      profession: profession ? profession : [],
      parentCountry: country,
      parentCountry: country,
      parentState: state,
      childCity: kidsCity,
      childGender: gender,
      childEthnicity: ethnicity,
      languages: languages,
      childNationality: nationality,
      // preferredChildFirstname: fullName,
      // preferredChildLastName: fullName,
      minAge: minimumAge,
      maxAge: maximumAge,
      keyword: searchKeyword,
      features: features,
      childEthnicity: ethnicity,
      socialmedia: socialMedias,
      name: fullName,
      height: height,
      relevantCategories: categories,
      minfollowerscount: Number(minFollowers),
      maxfollowerscount: Number(maxFollowers),
    };

    setIsLoading(true);
    await ApiHelper.post(API.talentFilterData, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Filtered Successfully");
          setOpenPopUp(true);
          setTalentList(resData?.data?.data);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("No Matching Users Found");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  const handleSelectedCity = (state) => {
    setKidsCity(state?.label);
  };

  useEffect(() => {
    getCountries();
    getTalentList();
    getFeatures();
    selectFeaturesList([
      {
        label: "Build",
        type: "select",
        options: ["Slim", "Average", "Athletic", "Curvy", "Plus Size", "Other"],
      },
    ]);
  }, []);

  const [starCount, setStarCount] = useState(0);
  const handleStarClick = (index) => {
    setStarCount(index + 1);
  };

  const [modalData, setModalData] = useState(null);
  const [comments, setComments] = useState(null);
  const rateTalent = (item) => {
    if (currentUserType === "brand") {
      setModalData(item);
      const modalElement = document.getElementById("ratingModal");
      const bootstrapModal = new window.bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  };

  const handleCloseModal = async (talent) => {
    const formData = {
      comment: comments,
      starRatings: starCount,
      reviewerName: talentName ? talentName : brandName,
      reviewerId: localStorage.getItem("brandId"),//currentUserId,
      talentId: talent?._id,
    };
    await ApiHelper.post(API.reviewsPosting, formData)
      .then((resData) => {
        setMessage("Rating Submitted Successfully!");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          const modalElement = document.getElementById("ratingModal");
          const bootstrapModal = new window.bootstrap.Modal(modalElement);
          bootstrapModal.hide();
          getTalentList();
        }, 2000);
      })
      .catch((err) => {});
  };

  const stars = document.querySelectorAll(".stars i");
  const starsNone = document.querySelector(".rating-box");

  stars.forEach((star, index1) => {
    star.addEventListener("click", () => {
      stars.forEach((star, index2) => {
        index1 >= index2
          ? star.classList.add("active")
          : star.classList.remove("active");
      });
    });
  });

  const customStylesProfession = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "55px",
    }),
    menu: (provided, state) => ({
      ...provided,
      maxHeight: "500px",
      zIndex: 9999,
    }),
  };

  const selectSocialMedias = (selectedOptions) => {
    if (!selectedOptions || selectedOptions.length === 0) {
      setSocialMedias([]);
      return;
    }
    const selectedLanguages = selectedOptions.map((option) => option.value);

    setSocialMedias(selectedLanguages);
  };

  const handleProfessionChange = (selectedOptions) => {
    setProfession(selectedOptions);
  };

  const selectCategory = (selectedOptions) => {
    if (!selectedOptions || selectedOptions.length === 0) {
      setCategories([]);
      return;
    }
    const selectedLanguages = selectedOptions.map((option) => option.value);

    setCategories(selectedLanguages);
  };

  const [visibleProfessions, setVisibleProfessions] = useState(2); // Start by showing 2 professions

  const toggleShowMore = (currentItem) => {
    if (!currentItem?.profession) return;
    setVisibleProfessions((prev) =>
      Math.min(prev + 1, currentItem.profession.length)
    );
  };

  return (
    <>
      <>
        <BrandHeader toggleMenu={toggleMenu} />
        <div
          id="sidebarBrand"
          className={`brand-sidebar ${
            showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
          }`}
        >
          <BrandSideMenu />
        </div>
        <main
          id="mainBrand"
          className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
        >
          <div className="brand-content-main">
            <section className="creatorPage-Wraper">
              <div className="container">
                <div className="filter-section py-2 mt-3">
                  <div className="brand-filter-section row px-4">
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
                        {/* <div className="keyword-wrapper pt-4">
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
                        </div> */}
                        <div className="keyword-wrapper">
                          <div className="filter-items">Name</div>
                          <div className="creators-filter-select inpWid">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              onChange={(e) => {
                                setFullName(e.target.value);
                              }}
                              value={fullName}
                            ></input>
                          </div>
                        </div>

                        <div className="profession-creator-wrapper">
                          <div className="filter-items">Category</div>
                          <div className="profession-wrapper talents-profession inpWid">
                            <Select
                              defaultValue={[]}
                              isMulti
                              name="professions"
                              options={categoryList}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              placeholder="Search for category"
                              onChange={selectCategory}
                              styles={customStylesProfession}
                            />
                          </div>
                        </div>

                        <div className="profession-creator-wrapper">
                          <div className="filter-items">Profession</div>
                          <div className="profession-wrapper talents-profession inpWid">
                            {/* <Select
                              isMulti
                              name="colors"
                              options={professionList}
                              valueField="value"
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={(value) => setProfession(value?.value)}
                              styles={customStylesProfession}
                            /> */}
                            <Select
                              defaultValue={[]}
                              isMulti
                              name="professions"
                              options={professionList}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              placeholder="Search for Profession / Skills"
                              onChange={handleProfessionChange}
                              styles={customStylesProfession}
                            />
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
                                country
                                  ? { value: country, label: country }
                                  : null
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
                                value: state.stateId,
                                label: state.name,
                              }))}
                              value={
                                state ? { value: state, label: state } : null
                              }
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
                                value: city.cityId,
                                label: city.name,
                              }))}
                              value={
                                kidsCity
                                  ? { value: kidsCity, label: kidsCity }
                                  : null
                              }
                              onChange={handleSelectedCity}
                              isSearchable={true}
                              noOptionsMessage={customNoOptionsMessageCity}
                            />
                          </div>
                        </div>

                        <div className="keyword-wrapper">
                          <div className="filter-items">Social Media</div>
                          <div className="creators-filter-select inpWid">
                            <Select
                              isMulti
                              placeholder="Filter by social media platform"
                              name="colors"
                              options={SocialMediasList}
                              valueField="value"
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={(value) => selectSocialMedias(value)}
                              styles={customStylesProfession}
                            />
                          </div>
                        </div>

                        <div className="keyword-wrapper creator-age-main ">
                          <div className="filter-items">Followers</div>
                          <div className="creators-filter-select creator-age-wrapper inpWid">
                            <input
                              type="text"
                              className="form-control range-inputs"
                              placeholder="Min Followers"
                              value={minFollowers}
                              onChange={onMinFollowersChange}
                            ></input>
                            <input
                              type="text"
                              className="form-control range-inputs"
                              placeholder="Max Followers"
                              value={maxFollowers}
                              onChange={onMaxFollowersChange}
                            ></input>
                          </div>
                        </div>

                        <div className="keyword-wrapper">
                          <div className="filter-items">Gender</div>
                          <div className="creators-filter-select inpWid">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              onChange={selectGender}
                              style={{ fontSize: "14px" }}
                              value={gender}
                            >
                              <option value="" disabled>
                                Select Gender
                              </option>
                              {gendersList?.map((option) => (
                                <option key={option.id} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="keyword-wrapper">
                          <div className="filter-items">Age</div>
                          <div className="creators-filter-select creators-filter-select-range inpWid">
                            <RangeSlider
                              min={1}
                              max={100}
                              onChange={onRangeChange}
                            />
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
                            <Select
                              isMulti
                              name="colors"
                              options={nationalitiesList}
                              valueField="value"
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={(value) => selectNationality(value)}
                              styles={customStylesProfession}
                            />
                          </div>
                        </div>
                        <div className="keyword-wrapper">
                          <div className="filter-items">Language</div>
                          <div className="creators-filter-select inpWid">
                            <Select
                              isMulti
                              name="colors"
                              options={languagesList}
                              valueField="value"
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={(value) => selectLanguage(value)}
                              styles={customStylesProfession}
                            />
                          </div>
                        </div>

                        {featuresListSelect && (
                          <>
                            {featuresListSelect.map((item, index) => {
                              return (
                                <>
                                  <div className="keyword-wrapper">
                                    <div className="filter-items">
                                      {" "}
                                      {item.label}
                                    </div>
                                    <div className="creators-filter-select">
                                      <select
                                        style={{ width: "100%" }}
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
                                          {item.label}
                                        </option>
                                        {item.options.map((option, idx) => (
                                          <option key={idx} value={option}>
                                            {option}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </>
                        )}

                        <div className="keyword-wrapper pt-4">
                          <div className="filter-items">Height ( cm )</div>
                          <div className="filter-input-wrapper inpWid">
                            <input
                              className="keyword-input"
                              placeholder="Enter value in cm"
                              value={height}
                              onChange={(e) => {
                                setHeight(e.target.value);
                              }}
                            ></input>
                          </div>
                        </div>

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
                          <div className="gallery-main find-creator-gallery-main p-0 m-0">
                            <div className="row favTalent px-2 mb-3">
                              {talentList?.map((item) => {
                                return (
                                  <div className="col-sm-6 col-md-4 col-lg-3 px-1">
                                    <div className="gallery-wrapper modalSpc  mb-2">
                                      <div className="imgBox">
                                        {item.image?.fileData && (
                                          <>
                                            <img
                                              onClick={() => openTalent(item)}
                                              className="gallery-img"
                                              src={`${API.userFilePath}${item.image?.fileData}`}
                                            ></img>
                                          </>
                                        )}
                                        {!item.image?.fileData && (
                                          <>
                                            <img
                                              onClick={() => openTalent(item)}
                                              className="gallery-img"
                                              src={avatarImage}
                                            ></img>
                                          </>
                                        )}

                                        {(() => {
                                          const starRatings = parseInt(
                                            item?.averageStarRatings,
                                            10
                                          );
                                          const totalStars = 5;
                                          const filledStars =
                                            !isNaN(starRatings) &&
                                            starRatings > 0
                                              ? starRatings
                                              : 0;
                                          return (
                                            <div
                                              className={`rating ${
                                                currentUserType === "brand"
                                                  ? "cursor"
                                                  : ""
                                              }`}
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
                                      <div className="galCont">
                                        <div className="content">
                                          <div
                                            className="find-creator-name"
                                            onClick={() => openTalent(item)}
                                          >
                                            {`${item?.preferredChildFirstname} ${item?.preferredChildLastName}`}
                                          </div>
                                          {item?.averageStarRatings &&
                                            item?.averageStarRatings > 0 && (
                                              <>
                                                <div className="talent-details-wrapper">
                                                  <div className="logo-fill-briefcase">
                                                    <i class="bi bi-star-fill model-job-icons"></i>
                                                  </div>

                                                  <div className="contSect">
                                                    <span>
                                                      {item?.averageStarRatings}{" "}
                                                      ({item?.totalReviews}{" "}
                                                      ratings)
                                                    </span>
                                                  </div>
                                                </div>
                                              </>
                                            )}
                                          {item?.noOfJobsCompleted && (
                                            <>
                                              <div className="talent-details-wrapper nweAlign pt-1 pb-0">
                                                <div className="logo-fill-briefcase">
                                                  <i className="bi bi-briefcase-fill model-job-icons"></i>
                                                </div>
                                                <div className="contSect">
                                                  <span>
                                                    {item?.noOfJobsCompleted}{" "}
                                                    Jobs Completed
                                                  </span>
                                                </div>
                                              </div>
                                            </>
                                          )}
                                          {/* {item?.profession &&
                                            item.profession.length > 0 && (
                                              <div className="talent-details-wrapper nweAlign pt-1 pb-0">
                                                <div className="logo-fill-briefcase">
                                                  <i className="bi bi-person-workspace model-job-icons"></i>
                                                </div>
                                                <div className="contSect profession-text">
                                                  {item.profession
                                                    .slice(
                                                      0,
                                                      showAllProfessions
                                                        ? item.profession.length
                                                        : 2
                                                    )
                                                    .map((prof, index) => (
                                                      <span key={prof.id}>
                                                        {prof.value}
                                                        {index <
                                                          item.profession
                                                            .length -
                                                            1 &&
                                                          index < 1 &&
                                                          ", "}
                                                      </span>
                                                    ))}
                                                  {item.profession.length >
                                                    2 && (
                                                    <span
                                                      className="show-more"
                                                      onClick={toggleShowAll}
                                                    >
                                                      {showAllProfessions
                                                        ? " Show Less"
                                                        : " ..."}
                                                    </span>
                                                  )}
                                                </div>
                                              </div>
                                            )} */}

                                          {item?.profession &&
                                            item.profession.length > 0 && (
                                              <div className="talent-details-wrapper nweAlign pt-1 pb-0">
                                                <div className="logo-fill-briefcase">
                                                  <i className="bi bi-person-workspace model-job-icons"></i>
                                                </div>
                                                <div className="contSect profession-text">
                                                  {item.profession
                                                    .slice(
                                                      0,
                                                      visibleProfessions
                                                    )
                                                    .map((prof, index) => (
                                                      <span key={prof.id}>
                                                        {prof.value}
                                                        {index <
                                                          visibleProfessions -
                                                            1 &&
                                                          index <
                                                            item.profession
                                                              .length -
                                                              1 &&
                                                          ", "}
                                                      </span>
                                                    ))}
                                                  {visibleProfessions <
                                                    item.profession.length && (
                                                    <span
                                                      className="show-more"
                                                      onClick={() =>
                                                        toggleShowMore(item)
                                                      } // Pass the current `item`
                                                    >
                                                      {" ..."}
                                                    </span>
                                                  )}
                                                </div>
                                              </div>
                                            )}

                                          <span className="job-company_dtls nweAlign pt-2 pb-0 d-flex">
                                            <div className="logo-fill-briefcase">
                                              <i className="bi bi-geo-alt-fill location-icon model-job-icons"></i>
                                            </div>
                                            {item?.childCity &&
                                              `${item.childCity}`}
                                            {item?.childCity &&
                                              item?.parentState &&
                                              `, `}
                                            {item?.parentState &&
                                              `${item.parentState}`}
                                            {(item?.childCity ||
                                              item?.parentState) &&
                                              item?.parentCountry &&
                                              `, `}
                                            {item?.parentCountry &&
                                              `${item.parentCountry}`}
                                          </span>
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
          </div>
        </main>
      </>
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
              <div className="mb-3">
                <div className="rating-box">
                  <h3> Rate {modalData?.preferredChildFirstname}</h3>
                  <div className="stars">
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
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default BrandTalents;
