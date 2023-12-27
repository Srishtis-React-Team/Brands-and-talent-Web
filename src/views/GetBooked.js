import React, { useEffect, useState } from "react";
import "../assets/css/findcreators.css";
import "../assets/css/getbooked.css";
import Header from "./header.js";
import Footer from "./Footer.js";
import axios from "axios";
const GetBooked = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(data, "features data");
  }, []);
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
  const [photos, showPhotos] = useState(true);
  const [videos, showVideos] = useState(false);
  const [features, showFeatures] = useState(false);
  const [reviews, setReviews] = useState(false);
  const [bio, showBio] = useState(false);
  const [analytics, showAnalytics] = useState(false);

  function handleForms(e) {
    console.log(e, "e");
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
      console.log(data, "features");
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
    if (e == "analytics") {
      showAnalytics(true);
    } else {
      showAnalytics(false);
    }
  }

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

      <div className="model-profile">
        <div>
          <img className="modal-profile-img" src={model}></img>
        </div>
        <div className="model-details">
          <div className="model-name">Elizabeth</div>
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
      </div>

      <div className="tabs">
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
          Videos
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
          Bio
        </div>
        <div
          className={analytics ? "active-tab" : null}
          onClick={(e) => {
            handleForms("analytics");
          }}
        >
          Analytics
        </div>
      </div>

      {photos && (
        <div className="models-photos">
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model1}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model2}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model3}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model4}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model5}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model6}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model7}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model8}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model9}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model10}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model11}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model12}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model13}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model14}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model15}></img>
          </div>
        </div>
      )}
      {videos && (
        <div className="models-photos">
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model1}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model2}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model3}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model4}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model5}></img>
          </div>
          <div className="model-picture-wrapper">
            <img className="model-picture" src={model6}></img>
          </div>
        </div>
      )}
      {features && (
        <div className="features-wrapper">
          <div className="features-row1">
            {data.map((titleList) => {
              const titles = Object.keys(titleList);
              const values = Object.values;
              return titles.map((item, key) => {
                return (
                  <div key={key} className="features-heading">
                    {item}
                  </div>
                );
              });
            })}
          </div>
          <div className="features-row2">
            {data.map((valuesList) => {
              const values = Object.values(valuesList);
              return values.map((item, key) => {
                return (
                  <div key={key} className="features-values">
                    {item}
                  </div>
                );
              });
            })}
          </div>
        </div>
      )}
      {bio && (
        <div className="models-bio">
          I'm a fashion, fitness and lifestyle influencer/content creator based
          in Melbourne. Australia. I am personable, have great attention to
          detail and pride myself on being a coffee snob! I love to share my
          understated but elegant personal style with my followers. In
          particular I enjoy putting together simple, minimalist and wearable
          outfits. I also really enjoy cooking/baking and indulging in cruelty
          free skincare and makeup. I started my Instagram page with the vision
          of sharing my style tips and snippets of my lifestyle with a wider
          audience. I have already collaborated with a variety of brands, from
          jewelry to wellness and skincare. I'm looking forward to collaborating
          on many more quality campaigns. I have an understated and elegant
          style. I the ability to manage tight deadlines and give my best to
          every project that I am a part of. I like meeting new people and I'm
          looking forward to collaborating with a lot of lovely brands and
          people on a personal and professional level.
        </div>
      )}

      {reviews && (
        <div className="model-reviews">
          <div className="model-review-wrapper">
            <div className="review-date">23 Nov 2023</div>
            <div className="review-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className="review-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              sed auctor velit, ut lacinia ante. Etiam eget nunc bibendum...
            </div>
            <div className="reviewer-section">
              <div className="reviewers-rating">
                <img src={pinkStar}></img>
                <img src={pinkStar}></img>
                <img src={pinkStar}></img>
                <img src={pinkStar}></img>
                <img src={greyStar}></img>
              </div>
              <div className="reviewer-details">
                <div className="initial center">S</div>
                <div className="reviewer-name">Sanjay Manuel</div>
              </div>
            </div>
          </div>
          <div className="model-review-wrapper">
            <div className="review-date">23 Nov 2023</div>
            <div className="review-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className="review-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              sed auctor velit, ut lacinia ante. Etiam eget nunc bibendum...
            </div>
            <div className="reviewer-section">
              <div className="reviewers-rating">
                <img src={pinkStar}></img>
                <img src={pinkStar}></img>
                <img src={pinkStar}></img>
                <img src={pinkStar}></img>
                <img src={greyStar}></img>
              </div>
              <div className="reviewer-details">
                <div className="initial center">S</div>
                <div className="reviewer-name">Sanjay Manuel</div>
              </div>
            </div>
          </div>
          <div className="model-review-wrapper">
            <div className="review-date">23 Nov 2023</div>
            <div className="review-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className="review-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              sed auctor velit, ut lacinia ante. Etiam eget nunc bibendum...
            </div>
            <div className="reviewer-section">
              <div className="reviewers-rating">
                <img src={pinkStar}></img>
                <img src={pinkStar}></img>
                <img src={pinkStar}></img>
                <img src={pinkStar}></img>
                <img src={greyStar}></img>
              </div>
              <div className="reviewer-details">
                <div className="initial center">S</div>
                <div className="reviewer-name">Sanjay Manuel</div>
              </div>
            </div>
          </div>
          <div className="model-review-wrapper">
            <div className="review-date">23 Nov 2023</div>
            <div className="review-title">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <div className="review-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              sed auctor velit, ut lacinia ante. Etiam eget nunc bibendum...
            </div>
            <div className="reviewer-section">
              <div className="reviewers-rating">
                <img src={pinkStar}></img>
                <img src={pinkStar}></img>
                <img src={pinkStar}></img>
                <img src={pinkStar}></img>
                <img src={greyStar}></img>
              </div>
              <div className="reviewer-details">
                <div className="initial center">S</div>
                <div className="reviewer-name">Sanjay Manuel</div>
              </div>
            </div>
          </div>
        </div>
      )}

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
