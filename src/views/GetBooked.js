import React, { useEffect, useState } from "react";
import "../assets/css/findcreators.css";
import "../assets/css/getbooked.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
import CardCarousel from "./CardCarousel.js";
import PhotosCarousel from "./PhotosCarousel.js";

import axios from "axios";
import $ from "jquery";
const GetBooked = () => {
  const [data, setData] = useState([]);

  useEffect(() => {}, []);
  const girl1 = require("../assets/images/girl.png");
  const model = require("../assets/images/model-profile.png");
  const model1 = require("../assets/images/model1.png");
  const model2 = require("../assets/images/model2.png");
  const model3 = require("../assets/images/model3.png");
  const model4 = require("../assets/images/model4.png");
  const model5 = require("../assets/images/model5.png");
  const model6 = require("../assets/images/model6.png");
  const model7 = require("../assets/images/model7.png");
  const model8 = require("../assets/images/model8.png");
  const model9 = require("../assets/images/model9.png");
  const model10 = require("../assets/images/model10.png");
  const model11 = require("../assets/images/model11.png");
  const model12 = require("../assets/images/model12.png");
  const model13 = require("../assets/images/model13.png");
  const model14 = require("../assets/images/model14.png");
  const model15 = require("../assets/images/model15.png");
  const mapPin = require("../assets/icons/map-pin.png");
  const message = require("../assets/icons/message-circle.png");
  const share = require("../assets/icons/share-2.png");
  const plus = require("../assets/icons/plus-square.png");
  const calander = require("../assets/icons/calendar.png");
  const user = require("../assets/icons/user-plus.png");
  const pinkStar = require("../assets/icons/pink-star.png");
  const greyStar = require("../assets/icons/grey-star.png");
  const darkStar = require("../assets/icons/darkStar.png");
  const instaLogo = require("../assets/icons/insta.png");
  const xLogo = require("../assets/icons/twitter_x.png");
  const userFill = require("../assets/icons/userFill.png");
  const mapFill = require("../assets/icons/mapFill.png");
  const checkShield = require("../assets/icons/check-shield.png");
  const whitePlus = require("../assets/icons/whitePlus.png");
  const white_star = require("../assets/icons/white_star.png");
  const check = require("../assets/icons/check.png");
  const fbIcon = require("../assets/icons/facebook logo_icon.png");
  const linkdin = require("../assets/icons/linkdin_icon.png");
  const tiktok = require("../assets/icons/tiktok_social media_icon.png");

  const [portofolio, showPortofolio] = useState(true);
  const [photos, showPhotos] = useState(false);
  const [videos, showVideos] = useState(false);
  const [features, showFeatures] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [bio, showBio] = useState(false);
  const [test, setTest] = useState("");

  const photosList = [
    {
      photo: model1,
    },
    {
      photo: model2,
    },
    {
      photo: model3,
    },
    {
      photo: model4,
    },
    {
      photo: model5,
    },
    {
      photo: model6,
    },
    {
      photo: model7,
    },
    {
      photo: model8,
    },
    {
      photo: model9,
    },
  ];

  const reviewsList = [
    {
      date: "23 Nov 2023",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed auctor velit, ut lacinia ante. Etiam eget nunc bibendum...",
      rating: [4],
      reviewer_name: "Sanjay Manuel",
    },
    {
      date: "23 Nov 2023",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed auctor velit, ut lacinia ante. Etiam eget nunc bibendum...",
      rating: [4],
      reviewer_name: "Sanjay Manuel",
    },
  ];

  function handleForms(e) {
    setTest("features set");
    if (e == "portofolio") {
      showPortofolio(true);
    } else {
      showPortofolio(false);
    }
    if (e == "photos") {
      showPhotos(true);
    } else {
      showPhotos(false);
    }
    if (e == "videos") {
      showVideos(true);
    } else {
      showVideos(false);
    }
    if (e == "features") {
      showFeatures(true);
    } else {
      showFeatures(false);
    }
    if (e == "reviews") {
      setReviews(true);
    } else {
      setReviews(false);
    }
    if (e == "bio") {
      showBio(true);
    } else {
      showBio(false);
    }
  }

  function prev() {
    document.getElementById("slider-container").scrollLeft -= 270;
  }

  function next() {
    document.getElementById("slider-container").scrollLeft += 270;
  }

  $(".slide img").on("click", function () {
    $(this).toggleClass("zoomed");
    $(".overlay").toggleClass("active");
  });

  useEffect(() => {
    setData([
      {
        _id: "6581594628ccd5fc45f027e0",
        email: "aiswrya@gmail.com",
        password:
          "$2a$10$KWp5g7TyUYHzccm/vHCzg.ewDhRyxdQn7XH2NCe2BFVM5cFzZEAfu",
        isActive: true,
        ethnicity: "white/Caucasian",
        height: "170cm",
        hairColour: "Brown",
        hairType: "Wavy",
        build: "Ferite",
        skinType: "Regular",
        skinTone: "Olive",
        eyeColour: "Brown",
        hairLength: "Long",
        chest: "82cm",
        waist: "64cm",
        hipSize: "84cm",
        dressSize: "64cm",
        shoeSize: "64cm",
        braSize: "64cm",
        transgender: "No",
        sexuality: "Straight",
        maritalStatus: "Long term Relationship",
        children: "None",
        pets: "None",
        diet: "None",
        created: "2023-12-19T08:50:14.498Z",
        createdAt: "2023-12-19T08:50:14.532Z",
        updatedAt: "2023-12-19T08:50:14.532Z",
        __v: 0,
      },
    ]);
    console.log(data, "features data useeffect");
  }, [test]);

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

      <div className="talent-profile-main">
        <div className="talent-wrapper">
          <div className="talent-backdrop">
            <img className="talent-img-backdrop" src={model9}></img>
            <img className="talent-img" src={girl1}></img>
          </div>
          <div className="talent-name">
            <div className="model-name">Elizabeth</div>
            <div className="talent-status">
              <span>
                <img src={darkStar}></img>
              </span>
              Pro
            </div>
          </div>
          <div className="talents-social-wrapper mt-4">
            <div className="talents-social">
              <span className="insta-backdrop">
                <img src={instaLogo}></img>
              </span>
              <soan className="social-count">15.6k</soan>
              <div className="followers-text">Followers</div>
            </div>
            <div className="talents-social">
              <img src={fbIcon}></img>
              <soan className="social-count">9.6k</soan>
              <div className="followers-text">Followers</div>
            </div>
            <div className="talents-social">
              <img src={tiktok}></img>
              <soan className="social-count">9.6k</soan>
              <div className="followers-text">Followers</div>
            </div>
            <div className="talents-social">
              <img src={linkdin}></img>
              <soan className="social-count">9.6k</soan>
              <div className="followers-text">Followers</div>
            </div>
          </div>
          <div className="talent-details">
            <div className="talent-details-wrapper">
              <div className="logo-fill">
                <img className="talent-logo" src={checkShield}></img>
              </div>
              <span>Verified</span>
            </div>
            <div className="talent-details-wrapper">
              <div className="logo-fill">
                <img className="talent-logo" src={pinkStar}></img>
              </div>
              <span>5.0 (45 jobs completed)</span>
            </div>
            <div className="talent-details-wrapper">
              <div className="logo-fill">
                <img className="talent-logo" src={mapFill}></img>
              </div>
              <span>Lorem ipsum dolor sit</span>
            </div>
            <div className="talent-details-wrapper">
              <div className="logo-fill">
                <img className="talent-logo" src={userFill}></img>
              </div>
              <span>Actor, Model, Creator</span>
            </div>
          </div>
          <div className="invite-btn">
            <img src={whitePlus}></img>
            <div>Invite to Job</div>
          </div>
          <div className="talent-rates">
            <div className="title">Vlada D Rates</div>
            <div className="name">Actor</div>
            <div className="value">$100 per hour (Negotiable)</div>
            <div className="value">$100 per hour (Negotiable)</div>
            <div className="name">Model</div>
            <div className="value">$100 per hour (Negotiable)</div>
            <div className="value">$100 per hour (Negotiable)</div>
            <div className="name">Creator</div>
            <div className="value">$100 per hour (Negotiable)</div>
            <div className="value">$100 per hour (Negotiable)</div>
          </div>
        </div>
        <div className="talent-info-section">
          <div className="talent-info-wrapper">
            <div className="bio-text">Bio</div>
            <div className="bio-info">
              I'm a fashion, fitness and lifestyle influencer/content creator
              based in Melbourne. Australia. I am personable, have great
              attention to detail and pride myself on being a coffee snob! I
              love to share my understated but elegant personal style with my
              followers. In particular I enjoy putting together simple,
              minimalist and wearable outfits. I also really enjoy
              cooking/baking and indulging in cruelty free skincare and makeup.
              I started my Instagram page with the vision of sharing my style
              tips and snippets of my lifestyle with a wider audience. I have
              already collaborated with a variety of brands, from jewelry to
              wellness and skincare. I'm looking forward to collaborating on
              many more quality campaigns. I have an understated and elegant
              style. I the ability to manage tight deadlines and give my best to
              every project that I am a part of. I like meeting new people and
              I'm looking forward to collaborating with a lot of lovely brands
              and people on a personal and professional level.
            </div>
            <div className="tabs profile-tabs">
              <div
                className={portofolio ? "active-tab" : null}
                onClick={(e) => {
                  handleForms("portofolio");
                }}
              >
                Porfolio
              </div>
              <div
                className={photos ? "active-tab" : null}
                onClick={(e) => {
                  handleForms("photos");
                }}
              >
                Photos
              </div>
              <div
                className={videos ? "active-tab" : null}
                onClick={(e) => {
                  handleForms("videos");
                }}
              >
                Videos & Audios
              </div>
              <div
                className={features ? "active-tab" : null}
                onClick={(e) => {
                  handleForms("features");
                }}
              >
                Features
              </div>
              <div
                className={reviews ? "active-tab" : null}
                onClick={(e) => {
                  handleForms("reviews");
                }}
              >
                Reviews
              </div>
              <div
                className={bio ? "active-tab" : null}
                onClick={(e) => {
                  handleForms("bio");
                }}
              >
                CV
              </div>
            </div>
            {portofolio && (
              <>
                <div className="portofolio-section">
                  <div className="portofolio-title">Photos</div>
                  <div className="view-all">View All</div>
                </div>
                <div className="photos-slider">{/* <PhotosCarousel /> */}</div>
                <div className="portofolio-section">
                  <div className="portofolio-title">Social media posts</div>
                  <div className="view-all">View All</div>
                </div>
                {/* <CardCarousel /> */}
                <div className="portofolio-section">
                  <div className="portofolio-title">Reviews</div>
                  <div className="view-all">View All</div>
                </div>
                <div className="reviews-section">
                  <div className="rating">
                    <div className="num">4.5</div>
                    <img src={white_star}></img>
                  </div>
                  <div className="content">
                    <div className="title">
                      Studio Shoot for Unrecognisable Ecommerce
                    </div>
                    <div className="description">
                      Kate is a delight to work with, beautiful both punctual &
                      professional. She knew exactly what was required and
                      everything was effortless.
                    </div>
                  </div>
                  <div className="booked-btn">
                    <div className="wrapper">
                      <img src={check}></img>
                    </div>
                    <div className="posted-jobs">24 Jobs Booked</div>
                  </div>
                </div>
              </>
            )}
            {photos && (
              <div className="models-photos">
                <section className="photos-gallery">
                  <div className="photos-gallery-image">
                    <img src={model}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model2}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model3}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model4}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model5}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model6}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model7}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model8}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model9}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model10}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model11}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model12}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model13}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model14}></img>
                  </div>
                  <div className="photos-gallery-image">
                    <img src={model15}></img>
                  </div>
                </section>
              </div>
            )}
            {videos && (
              <div className="models-photos">
                {photosList.map((item) => {
                  return (
                    <div className="model-picture-wrapper">
                      <img className="model-picture" src={item.photo}></img>
                    </div>
                  );
                })}
              </div>
            )}
            {features && (
              <div className="features-section">
                <div className="features-wrapper">
                  <div className="features-heading">Ethnicity</div>
                  <div className="features-value">{data[0].ethnicity}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Height</div>
                  <div className="features-value">{data[0].height}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Hair Color</div>
                  <div className="features-value">{data[0].hairColour}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Hair Type</div>
                  <div className="features-value">{data[0].hairType}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Build</div>
                  <div className="features-value">{data[0].build}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Skin Type</div>
                  <div className="features-value">{data[0].skinType}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Skin Tone</div>
                  <div className="features-value">{data[0].skinTone}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Eye Color</div>
                  <div className="features-value">{data[0].eyeColour}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Ethnicity</div>
                  <div className="features-value">{data[0].ethnicity}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Ethnicity</div>
                  <div className="features-value">{data[0].ethnicity}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Ethnicity</div>
                  <div className="features-value">{data[0].ethnicity}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Ethnicity</div>
                  <div className="features-value">{data[0].ethnicity}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Ethnicity</div>
                  <div className="features-value">{data[0].ethnicity}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Ethnicity</div>
                  <div className="features-value">{data[0].ethnicity}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Ethnicity</div>
                  <div className="features-value">{data[0].ethnicity}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Ethnicity</div>
                  <div className="features-value">{data[0].ethnicity}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Ethnicity</div>
                  <div className="features-value">{data[0].ethnicity}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Ethnicity</div>
                  <div className="features-value">{data[0].ethnicity}</div>
                </div>
                <div className="features-wrapper">
                  <div className="features-heading">Ethnicity</div>
                  <div className="features-value">{data[0].ethnicity}</div>
                </div>
              </div>
            )}
            {bio && (
              <div className="models-bio">
                I'm a fashion, fitness and lifestyle influencer/content creator
                based in Melbourne. Australia. I am personable, have great
                attention to detail and pride myself on being a coffee snob! I
                love to share my understated but elegant personal style with my
                followers. In particular I enjoy putting together simple,
                minimalist and wearable outfits. I also really enjoy
                cooking/baking and indulging in cruelty free skincare and
                makeup. I started my Instagram page with the vision of sharing
                my style tips and snippets of my lifestyle with a wider
                audience. I have already collaborated with a variety of brands,
                from jewelry to wellness and skincare. I'm looking forward to
                collaborating on many more quality campaigns. I have an
                understated and elegant style. I the ability to manage tight
                deadlines and give my best to every project that I am a part of.
                I like meeting new people and I'm looking forward to
                collaborating with a lot of lovely brands and people on a
                personal and professional level.
              </div>
            )}
            {reviews && (
              <div className="model-reviews">
                {reviewsList.map((item) => {
                  return (
                    <div className="model-review-wrapper">
                      <div className="review-date">{item.date}</div>
                      <div className="review-title">{item.title}</div>
                      <div className="review-content">{item.description}</div>
                      <div className="reviewer-section">
                        <div className="reviewers-rating">
                          {item.rating.map((item) => {
                            return <img src={pinkStar}></img>;
                          })}
                        </div>
                        <div className="reviewer-details">
                          <div className="initial center">S</div>
                          <div className="reviewer-name">
                            {item.reviewer_name}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="model-profile">
        <div>
          <img className="modal-profile-img" src={model}></img>
        </div>
        <div className="model-details">
          <div className="model-infos">Professional model</div>
          <div className="model-location">
            <div>
              <img src={mapPin}></img>
            </div>
            <div className="location-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </div>
          <div className="models-options">
            <div className="share-wrapper center">
              <img className="share-icon" src={share}></img>
            </div>
            <div className="message-wrapper">
              <img src={message}></img>
              <span>Message</span>
            </div>
            <div className="reserve-background">
              <img src={plus}></img>
              <span className="text-span">Reserve</span>
            </div>
            <div className="reserve-background invite">
              <img src={calander}></img>
              <span className="text-span">Invite to Casting</span>
            </div>
            <div className="reserve-background follow">
              <img src={user}></img>
              <span className="text-span">Follow</span>
            </div>
          </div>
          <div className="models-social-counts">
            <span className="count-wrapper">
              Views <span>11863</span>
            </span>
            <span className="count-wrapper">
              Followers <span>77</span>Followers <span>77</span>
            </span>
            <span className="count-wrapper">
              Last login<span> More than 3 months</span>
            </span>
          </div>
        </div>
      </div> */}

      <div className="center">
        <div className="Join-wrapper center">
          <div>Find More</div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GetBooked;
