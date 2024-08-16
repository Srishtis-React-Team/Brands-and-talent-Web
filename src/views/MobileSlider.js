import React, { useState, useEffect, useRef } from "react";
import "../assets/css/dashboard.css";
const MobileSlider = ({ successStories }) => {
  const roundProfile = require("../assets/icons/round-profile.png");
  const quoteIcon = require("../assets/icons/9044931_quotes_icon 1.png");
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${"https://brandsandtalent.com/backend/uploads/7b095214-6b38-46a7-a806-6293d4007b51.webp"})`,
        }}
        className="carousel-section storyCar secSpac wraper"
      >
        <div className="carousel-title title center">Success Stories</div>
        <div className="container">
          <div id="carouselExampleControlsMobile" className="carousel slide">
            <div className="carousel-inner">
              {successStories?.map((story, index) => {
                return (
                  <>
                    <div
                      Key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <div className="carousel-wrapper">
                        <div className="box-one" Key={index}>
                          <div className="carimg_Box">
                            <img
                              className="carousel-img"
                              src={story?.image}
                            ></img>
                          </div>
                          <div className="box-content">
                            <div className="quote">
                              <img src={quoteIcon}></img>
                            </div>
                            <div className="carousel-description">
                              {story?.content}
                            </div>
                            <div className="profile-section">
                              <div>
                                <img
                                  className="profImg"
                                  src={story?.image}
                                ></img>
                              </div>
                              <div className="profile-content">
                                <div className="profile-name">
                                  {story?.name}
                                </div>
                                <div className="profile-info">
                                  {story?.category}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControlsMobile"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon carousel-icons"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next carousel-next-control"
              type="button"
              data-bs-target="#carouselExampleControlsMobile"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon  carousel-icons"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSlider;
