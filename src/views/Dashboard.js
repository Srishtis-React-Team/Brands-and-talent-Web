import React, { useState } from "react";
import "../assets/css/dashboard.css";
import Header from "./header";
import Footer from "./Footer";
const Dashboard = () => {
  const btLogo = require("../assets/icons/Group 56.png");
  const searchLogo = require("../assets/icons/search (1).png");
  const starIcon = require("../assets/icons/star.png");
  const whiteStar = require("../assets/icons/white_star.png");
  const checkMark = require("../assets/icons/check-circle.png");
  const lockIcon = require("../assets/icons/lock.png");
  const gents = require("../assets/images/gents.png");
  const girl = require("../assets/images/girl.png");
  const female = require("../assets/images/female.png");
  const fashion = require("../assets/images/fashion.png");
  const sliderBackground = require("../assets/images/slider-background.png");
  const fieldsBackground = require("../assets/images/fields-background.png");
  const adidasIcon = require("../assets/icons/6539fea9ad514fe89ff5d7fc_adidas.png");
  const ubisoftIcon = require("../assets/icons/6539fd74ad514fe89ff48cdd_ubisoft.png");
  const wppIcon = require("../assets/icons/651508c575f862fac120d7b1_wpp.webp");
  const lorealIcon = require("../assets/icons/6539e8f83c874a7714db103c_Loreal 1.webp");
  const havasIcon = require("../assets/icons/6539e8f8ac5a3259e7f64ef8_Havas_logo 3.webp");
  const joseIcon = require("../assets/icons/6539e8f8fe903bed35dc07f8_jose-cuervo-logo-black-and-white 1.webp");
  const calvinIcon = require("../assets/icons/6539ea694436eb9715c9cba3_image 10.png");
  const socialIcons = require("../assets/icons/Social.png");
  const roundProfile = require("../assets/icons/round-profile.png");
  const quoteIcon = require("../assets/icons/9044931_quotes_icon 1.png");
  const heartIcon = require("../assets/icons/heart.png");
  const girl1 = require("../assets/images/girl1.png");
  const girl2 = require("../assets/images/girl2.png");
  const girl3 = require("../assets/images/girl3.png");
  const girl4 = require("../assets/images/girl4.jpg");
  const girl5 = require("../assets/images/girl5.png");

  const [artists, showArtists] = useState(true);
  const [photographers, showPhotographers] = useState(false);
  const [actors, showActors] = useState(false);
  const [influencers, setInfluencers] = useState(false);
  const [models, showModels] = useState(false);
  const [more, showMore] = useState(false);

  function handleTabs(e) {
    if (e == "artists") {
      showArtists(true);
    } else {
      showArtists(false);
    }
    if (e == "photographers") {
      showPhotographers(true);
    } else {
      showPhotographers(false);
    }
    if (e == "actors") {
      showActors(true);
    } else {
      showActors(false);
    }
    if (e == "influencers") {
      setInfluencers(true);
    } else {
      setInfluencers(false);
    }
    if (e == "models") {
      showModels(true);
    } else {
      showModels(false);
    }
    if (e == "more") {
      showMore(true);
    } else {
      showMore(false);
    }
  }

  const talentList = [
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
  ];

  return (
    <>
      <Header />
      <div className="section-1">
        <div className="find-work">
          <div className="section-title">Find Jobs</div>
          <div className="section-description">
            Talent can  build and manage their personal brands and will have a
            unique url like linkedin that they can share as thier portfolio...
          </div>
          <div className="Join-wrapper center">
            <div className="joinnow-btn">Join Now</div>
          </div>
        </div>
        <div className="find-work">
          <div className="section-title">Hire Talent</div>
          <div className="section-description">
            The platform will help brands find, attract, and hire the best
            talent as per their budget and requirement in less than 5 minutes.
          </div>
          <div className="white-joinnow center">
            <div className="joinnow-btn">Join Now</div>
          </div>
        </div>
      </div>
      <div className="tabs-section">
        <div className="title">Popular Talents</div>
        <div className="tabs">
          <div
            className={artists ? "active-tab" : null}
            onClick={(e) => {
              handleTabs("artists");
            }}
          >
            Artists
          </div>
          <div
            className={photographers ? "active-tab" : null}
            onClick={(e) => {
              handleTabs("photographers");
            }}
          >
            Photographers
          </div>
          <div
            className={actors ? "active-tab" : null}
            onClick={(e) => {
              handleTabs("actors");
            }}
          >
            Actors
          </div>
          <div
            className={influencers ? "active-tab" : null}
            onClick={(e) => {
              handleTabs("influencers");
            }}
          >
            Influencers
          </div>
          <div
            className={models ? "active-tab" : null}
            onClick={(e) => {
              handleTabs("models");
            }}
          >
            Models
          </div>
          <div
            className={more ? "active-tab" : null}
            onClick={(e) => {
              handleTabs("more");
            }}
          >
            More
          </div>
        </div>
      </div>

      {artists && (
        <div className="gallery-section">
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
      )}
      {photographers && (
        <div className="gallery-section">
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
      )}
      {actors && (
        <div className="gallery-section">
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
      )}
      {influencers && (
        <div className="gallery-section">
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
      )}
      {models && (
        <div className="gallery-section">
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
      )}

      <div className="center">
        <div className="Join-wrapper center">
          <div>Find More</div>
        </div>
      </div>
      <div className="title">Our Community</div>
      <div className="cards">
        <div className="card-wrapper card-background">
          <div className="count">5,258,451</div>
          <div className="cards-text">Models in community</div>
        </div>
        <div className="card-wrapper  card-background">
          <div className="count">5,258,451</div>
          <div className="cards-text">Industry Professionals</div>
        </div>
        <div className="card-wrapper  card-background">
          <div className="count">5,258,451</div>
          <div className="cards-text">Agencies</div>
        </div>
      </div>
      <div className="title">Products and Services</div>
      <div className="cards">
        <div className="card-wrapper ">
          <div className="card-picture center">
            <img src={checkMark}></img>
          </div>
          <div className="card-title">Talent Marketplace</div>
          <div className="cards-description">
            A platform where talents can create a profile, showcase their work,
            and connect with...
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card-picture center">
            <img src={lockIcon}></img>
          </div>
          <div className="card-title">Hire Talent</div>
          <div className="cards-description">
            The platform will help brands find, attract, and hire the best
            talent as per their ...
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card-picture center">
            <img src={whiteStar}></img>
          </div>
          <div className="card-title">Find Jobs</div>
          <div className="cards-description">
            Talent can  build and manage their personal brands and will have a
            unique url ...
          </div>
        </div>
      </div>
      <div className="title">Case studies</div>
      <div className="gallery-section">
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
      <div
        style={{
          backgroundImage: `url(${sliderBackground})`,
        }}
        className="carousel-section"
      >
        <div className="carousel-title center">Success Stories</div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="carousel-wrapper">
                <div className="box-one">
                  <div>
                    <img className="carousel-img" src={gents}></img>
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
                      <div>
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
                  <div>
                    <img className="carousel-img" src={female}></img>
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
                      <div>
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
                  <div>
                    <img className="carousel-img" src={girl}></img>
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
                      <div>
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
                  <div>
                    <img className="carousel-img" src={fashion}></img>
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
                      <div>
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
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon carousel-icons"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon carousel-icons"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="title">Trusted by renowned brands</div>
      <div className="brands-section">
        <div>
          <img src={adidasIcon}></img>
        </div>
        <div>
          <img src={ubisoftIcon}></img>
        </div>
        <div>
          <img src={wppIcon}></img>
        </div>
        <div>
          <img src={lorealIcon}></img>
        </div>
        <div>
          <img src={joseIcon}></img>
        </div>
        <div>
          <img src={calvinIcon}></img>
        </div>
        <div>
          <img src={havasIcon}></img>
        </div>
      </div>
      <Footer />
      {/* <ChatBot
        steps={[
          {
            id: "1",
            message: "What is your name?",
            trigger: "2",
          },
          {
            id: "2",
            user: true,
            trigger: "3",
          },
          {
            id: "3",
            message: "Hi {previousValue}, nice to meet you!",
            end: true,
          },
        ]}
      /> */}
    </>
  );
};

export default Dashboard;
