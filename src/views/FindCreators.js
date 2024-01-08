import React, { useState, useEffect } from "react";
import "../assets/css/findcreators.css";
import Header from "./header.js";
import Footer from "./Footer.js";
import Select from "react-select";
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

  useEffect(() => {
    setTalentList([
      {
        photo: girl1,
        name: "Alexander",
        address: "Copenhagen, Denmark",
        isFavorite: true,
        rating: 4,
      },
      {
        photo: girl2,
        name: "william",
        address: "Copenhagen, Denmark",
        isFavorite: false,
        rating: 3,
      },
      {
        photo: girl3,
        name: "Michael",
        address: "Pitsburg, Canada",
        isFavorite: false,
        rating: 5,
      },
      {
        photo: girl4,
        name: "Andrea",
        address: "North Carolina, USA",
        isFavorite: false,
        rating: 1,
      },
      {
        photo: girl5,
        name: "Alexa",
        address: "South Carolina, USA",
        isFavorite: false,
        rating: 1,
      },
    ]);
  }, []);

  const clear = () => {
    setSearchKeyword("");
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
      value: "male",
      label: "Male",
      color: "#00B8D9",
      isFixed: true,
    },
    { value: "female", label: "Female", color: "#5243AA" },
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
            <div className={filterOpen ? "filter-content" : "hide-filter"}>
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
              <div className="">
                <div className="filter-items">Profession</div>
                <div className="profession-wrapper">
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
                <div className="filter-items">Gender</div>
                <div className="">
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
                <div className="filter-items">Sub Category</div>
                <div className="">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={professionList[0]}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    name="color"
                    options={professionList}
                  />
                </div>
              </div>
              <div className="filter-items">Age</div>
              <div className="input-items-wrapper">
                <div>
                  <input
                    placeholder="Min"
                    type="text"
                    className="input-items-style form-control"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  ></input>
                </div>
                <div>
                  <input
                    placeholder="Max"
                    type="text"
                    className="input-items-style  form-control"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  ></input>
                </div>
              </div>

              <div className="keyword-wrapper">
                <div className="filter-items">Country</div>
                <div className="">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={professionList[0]}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    name="color"
                    options={professionList}
                  />
                </div>
              </div>
              <div className="keyword-wrapper">
                <div className="filter-items">State</div>
                <div className="">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={professionList[0]}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    name="color"
                    options={professionList}
                  />
                </div>
              </div>
              <div className="keyword-wrapper">
                <div className="filter-items">Ethnicity</div>
                <div className="">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={professionList[0]}
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    isClearable={isClearable}
                    isRtl={isRtl}
                    isSearchable={isSearchable}
                    name="color"
                    options={professionList}
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
          </div>
          <div className="models-images">
            <div className="gallery-section filtered-gallery">
              {talentList.map((item) => {
                return (
                  <div className="gallery-warpper">
                    <div className="gallery-position">
                      <img className="gallery-img" src={item.photo}></img>
                      <img className="heart-icon" src={heartIcon}></img>
                    </div>
                    <div className="gallery-content">
                      <div className="content">
                        <div className="name">{item.name}</div>
                        <div className="address">{item.address}</div>
                      </div>
                      <div className="rating">
                        <img src={starIcon}></img>
                        <img src={starIcon}></img>
                        <img src={starIcon}></img>
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
