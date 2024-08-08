import React, { useState, useEffect, useRef } from "react";
import "../assets/css/dashboard.css";
const MobileSlider = () => {
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
              <div className="carousel-item active">
                <div className="carousel-wrapper">
                  <div className="box-one">
                    <div className="carimg_Box">
                      <img
                        className="carousel-img"
                        src={
                          "https://brandsandtalent.com/backend/uploads/7d395e65-191b-426f-81fd-baf80a033275.webp"
                        }
                      ></img>
                    </div>
                    <div className="box-content">
                      <div className="quote">
                        <img src={quoteIcon}></img>
                      </div>
                      <div className="carousel-description">
                        A great photographer's tool for online castings that
                        really works!
                      </div>
                      <div className="profile-section">
                        <div className="profImg">
                          <img src={roundProfile}></img>
                        </div>
                        <div className="profile-content">
                          <div className="profile-name">Dorothy</div>
                          <div className="profile-info">Lorem ipsum dolor</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-one box-two">
                    <div className="carimg_Box">
                      <img
                        className="carousel-img"
                        src={
                          "https://brandsandtalent.com/backend/uploads/6cde52e8-2f83-4cc9-bb1c-c8e244fc5437.webp"
                        }
                      ></img>
                    </div>
                    <div className="box-content">
                      <div className="quote">
                        <img src={quoteIcon}></img>
                      </div>
                      <div className="carousel-description">
                        A great photographer's tool for online castings that
                        really works!
                      </div>
                      <div className="profile-section">
                        <div className="profImg">
                          <img src={roundProfile}></img>
                        </div>
                        <div className="profile-content">
                          <div className="profile-name">Dorothy</div>
                          <div className="profile-info">Lorem ipsum dolor</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="carousel-wrapper">
                  <div className="box-one">
                    <div className="carimg_Box">
                      <img
                        className="carousel-img"
                        src={
                          "https://brandsandtalent.com/backend/uploads/279f9276-f06c-4682-8b6f-58bc8ed48876.webp"
                        }
                      ></img>
                    </div>
                    <div className="box-content">
                      <div className="quote">
                        <img src={quoteIcon}></img>
                      </div>
                      <div className="carousel-description">
                        A great photographer's tool for online castings that
                        really works!
                      </div>
                      <div className="profile-section">
                        <div className="profImg">
                          <img src={roundProfile}></img>
                        </div>
                        <div className="profile-content">
                          <div className="profile-name">Dorothy</div>
                          <div className="profile-info">Lorem ipsum dolor</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-one box-two">
                    <div className="carimg_Box">
                      <img
                        className="carousel-img"
                        src={
                          "https://brandsandtalent.com/backend/uploads/5b203bf5-6e37-42d4-a76b-da8cdb378e5b.webp"
                        }
                      ></img>
                    </div>
                    <div className="box-content">
                      <div className="quote">
                        <img src={quoteIcon}></img>
                      </div>
                      <div className="carousel-description">
                        A great photographer's tool for online castings that
                        really works!
                      </div>
                      <div className="profile-section">
                        <div className="profImg">
                          <img src={roundProfile}></img>
                        </div>
                        <div className="profile-content">
                          <div className="profile-name">Dorothy</div>
                          <div className="profile-info">Lorem ipsum dolor</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mobile-carousel">
                <div className="carousel-item">
                  <div className="carousel-wrapper">
                    <div className="box-one">
                      <div className="carimg_Box">
                        <img
                          className="carousel-img"
                          src={
                            "https://brandsandtalent.com/backend/uploads/6cde52e8-2f83-4cc9-bb1c-c8e244fc5437.webp"
                          }
                        ></img>
                      </div>
                      <div className="box-content">
                        <div className="quote">
                          <img src={quoteIcon}></img>
                        </div>
                        <div className="carousel-description">
                          A great photographer's tool for online castings that
                          really works! 3rd carousel
                        </div>
                        <div className="profile-section">
                          <div className="profImg">
                            <img src={roundProfile}></img>
                          </div>
                          <div className="profile-content">
                            <div className="profile-name">Dorothy</div>
                            <div className="profile-info">
                              Lorem ipsum dolor
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item">
                  <div className="carousel-wrapper">
                    <div className="box-one">
                      <div className="carimg_Box">
                        <img
                          className="carousel-img"
                          src={
                            "https://brandsandtalent.com/backend/uploads/5b203bf5-6e37-42d4-a76b-da8cdb378e5b.webp"
                          }
                        ></img>
                      </div>
                      <div className="box-content">
                        <div className="quote">
                          <img src={quoteIcon}></img>
                        </div>
                        <div className="carousel-description">
                          A great photographer's tool for online castings that
                          really works! 4th slide
                        </div>
                        <div className="profile-section">
                          <div className="profImg">
                            <img src={roundProfile}></img>
                          </div>
                          <div className="profile-content">
                            <div className="profile-name">Dorothy</div>
                            <div className="profile-info">
                              Lorem ipsum dolor
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
