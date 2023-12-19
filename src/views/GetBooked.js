import React, { useState } from "react";
import "../assets/css/findcreators.css";
import "../assets/css/getbooked.css";
import Header from "./header.js";
import Footer from "./Footer.js";
const GetBooked = () => {
  const model = require("../assets/images/model-profile.png");
  const mapPin = require("../assets/icons/map-pin.png");
  const message = require("../assets/icons/message-circle.png");
  const share = require("../assets/icons/share-2.png");
  const plus = require("../assets/icons/plus-square.png");
  const calander = require("../assets/icons/calendar.png");
  const user = require("../assets/icons/user-plus.png");

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
        <div className="active-tab">Photos</div>
        <div>Videos</div>
        <div>Features</div>
        <div>Reviews</div>
        <div>Bio</div>
        <div>Analytics</div>
      </div>

      <Footer />
    </>
  );
};

export default GetBooked;
