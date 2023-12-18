import React, { useState } from "react";
import "../assets/css/findcreators.css";
import Header from "./header.js";
import Footer from "./Footer.js";
const FindCreators = () => {
  const [filterOpen, setFilterOpen] = useState(false);
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
              <div className="filter-items">Keyword</div>
              <div className="keyword-wrapper">
                <div className="search-icon">
                  <img src={searchIcon}></img>
                </div>
                <input
                  className="keyword-input"
                  placeholder="Search Keyword"
                ></input>
              </div>
              <div className="filter-items">Gender</div>
              <div className="check-section">
                <div>
                  <input type="checkbox"></input>
                  <label className="label-style">Male</label>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <label className="label-style">Female</label>
                </div>
                <div>
                  <input type="checkbox"></input>
                  <label className="label-style">other</label>
                </div>
              </div>
              <div className="filter-items">Age</div>
              <div className="input-items-wrapper">
                <div>
                  <input
                    placeholder="Min"
                    type="text"
                    className="input-items-style form-control"
                  ></input>
                </div>
                <div>
                  <input
                    placeholder="Max"
                    type="text"
                    className="input-items-style  form-control"
                  ></input>
                </div>
              </div>
              <div className="filter-items">Price</div>
              <div className="input-items-wrapper">
                <div>
                  <input
                    placeholder="Min"
                    type="text"
                    className="input-items-style form-control"
                  ></input>
                </div>
                <div>
                  <input
                    placeholder="Max"
                    type="text"
                    className="input-items-style  form-control"
                  ></input>
                </div>
              </div>
              <div className="filter-items">Country</div>
              <div>
                <div>
                  <input
                    placeholder="India"
                    type="text"
                    className="input-country-style form-control"
                  ></input>
                </div>
              </div>
              <div className="filter-items">Category</div>
              <div className="keyword-wrapper">
                <div className="search-icon">
                  <img src={searchIcon}></img>
                </div>
                <input
                  className="keyword-input"
                  placeholder="Search category"
                ></input>
              </div>
              <div className="category-chips">
                <div className="each-category">
                  <input type="checkbox"></input>
                  <label className="label-style">Vestibulum</label>
                </div>
                <div className="each-category">
                  <input type="checkbox"></input>
                  <label className="label-style">Vestibulum</label>
                </div>
                <div className="each-category">
                  <input type="checkbox"></input>
                  <label className="label-style">Vestibulum</label>
                </div>
                <div className="each-category">
                  <input type="checkbox"></input>
                  <label className="label-style">Vestibulum</label>
                </div>
                <div className="each-category">
                  <input type="checkbox"></input>
                  <label className="label-style">Vestibulum</label>
                </div>
                <div className="each-category">
                  <input type="checkbox"></input>
                  <label className="label-style">Vestibulum</label>
                </div>
              </div>
              <div className="submit-buttons">
                <div className="reset-btn">Reset</div>
                <div className="search-btn">Search</div>
              </div>
            </div>
          </div>
          <div className="models-images">
            <div className="gallery-section filtered-gallery">
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl1}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl2}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl3}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl4}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl5}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl6}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl7}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl8}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl9}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl10}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl11}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl12}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl13}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl14}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl15}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={girl16}></img>
                  <img className="heart-icon" src={heartIcon}></img>
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">Alexander</div>
                    <div className="address">Copenhagen, Denmark</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
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
