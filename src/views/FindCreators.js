import React, { useState, useEffect } from "react";
import "../assets/css/findcreators.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
import Select from "react-select";
import RangeSlider from "../components/RangeSlider.js";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
const FindCreators = () => {
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
  const [min, setMinAge] = useState([]);
  const [max, setMaxAge] = useState([]);

  useEffect(() => {
    getTalentList();
  }, []);

  const clear = () => {
    setSearchKeyword("");
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
    {
      value: "photographer",
      label: "Photographer",
      color: "#00B8D9",
      isFixed: true,
    },
    { value: "beauticians", label: "Beauticians", color: "#5243AA" },
    { value: "artists", label: "Artists", color: "#FF5630", isFixed: true },
    { value: "video Grapher", label: "Video Grapher", color: "#FF8B00" },
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

  const search = async () => {
    console.log(profession, "profession");
    console.log(gender, "gender");
    console.log(age, "age");
    console.log(selectedKeyword, "selectedKeyword");
    console.log(searchKeyword, "searchKeyword");

    let filteredTalents = talentList.filter((element) => {
      // 👇️ using AND (&&) operator
      return (
        element.name === searchKeyword || element.address === searchKeyword
      );
    });

    // 👉️ [ {name: 'Carl', age: 30} ]
    console.log(filteredTalents, "Filtered Talent List");
    setTalentList(filteredTalents);
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

  const onMinChange = (event) => {
    setMinAge(event.target.value); // Update the state with the new value
  };
  const onMaxChange = (event) => {
    setMaxAge(event.target.value); // Update the state with the new value
  };

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
                />
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Industry</div>
              <div className="creators-filter-select">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  options={genderList}
                  valueField="value"
                  onChange={(value) => setGender(value.value)}
                />
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Location</div>
              <div className="creators-filter-select">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  options={genderList}
                  valueField="value"
                  onChange={(value) => setGender(value.value)}
                />
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">City</div>
              <div className="creators-filter-select">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  options={genderList}
                  valueField="value"
                  onChange={(value) => setGender(value.value)}
                />
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Gender</div>
              <div className="creators-filter-select">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  options={genderList}
                  valueField="value"
                  onChange={(value) => setGender(value.value)}
                />
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Age</div>
              <div className="creators-filter-select">
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
                  className="form-control"
                  placeholder="Min"
                  value={`Min Age :${min}`}
                  onChange={onMinChange}
                  readOnly
                ></input>
                <input
                  type="text"
                  className="form-control"
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
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  options={genderList}
                  valueField="value"
                  onChange={(value) => setGender(value.value)}
                />
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Nationality</div>
              <div className="creators-filter-select">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  options={genderList}
                  valueField="value"
                  onChange={(value) => setGender(value.value)}
                />
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Language</div>
              <div className="creators-filter-select">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  options={genderList}
                  valueField="value"
                  onChange={(value) => setGender(value.value)}
                />
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Full Name</div>
              <div className="creators-filter-select">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                ></input>
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Body Type</div>
              <div className="creators-filter-select">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  options={genderList}
                  valueField="value"
                  onChange={(value) => setGender(value.value)}
                />
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Hair Color</div>
              <div className="creators-filter-select">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  options={genderList}
                  valueField="value"
                  onChange={(value) => setGender(value.value)}
                />
              </div>
            </div>
            <div className="keyword-wrapper">
              <div className="filter-items">Height</div>
              <div className="creators-filter-select">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  options={genderList}
                  valueField="value"
                  onChange={(value) => setGender(value.value)}
                />
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
          <div className="models-images">
            <div className="gallery-section filtered-gallery">
              {talentList.map((item) => {
                return (
                  <div className="gallery-warpper">
                    <div className="gallery-position">
                      <img
                        className="gallery-img"
                        src={API.userFilePath + item.image}
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
                          {item?.childFirstName
                            ? `${item?.childFirstName}`
                            : "Elizabeth"}
                        </div>
                        <div className="address">
                          {" "}
                          {item?.childLocation
                            ? `${item?.childLocation}`
                            : "Australia"}{" "}
                        </div>
                        <div className="user-details">
                          <div className="location-wrapper">
                            <img src={locationIcon} alt="" />
                            <div className="location-name">New York</div>
                          </div>
                          <div className="location-wrapper">
                            <img src={jobIcon} alt="" />
                            <div className="location-name">10 Jobs Booked</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="center">
              <div className="Join-wrapper center">
                <div>Find More</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FindCreators;
