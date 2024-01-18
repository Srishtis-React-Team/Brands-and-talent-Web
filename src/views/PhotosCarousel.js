import React, { useEffect, useState } from "react";
import "../assets/css/PhotosCarousel.css";
import Carousel from "react-elastic-carousel";
import Item from "./Item";

const PhotosCarousel = () => {
  const model1 = require("../assets/images/model1.png");
  const model2 = require("../assets/images/model2.png");
  const model3 = require("../assets/images/model3.png");
  const model4 = require("../assets/images/model4.png");
  const model5 = require("../assets/images/model5.png");
  const model6 = require("../assets/images/model6.png");
  const model7 = require("../assets/images/model7.png");
  const model8 = require("../assets/images/model8.png");
  const model9 = require("../assets/images/model9.png");
  const instaLogo = require("../assets/icons/instagram.png");

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
  return (
    <>
      <div className="App">
        <Carousel breakPoints={breakPoints}>
          <div className="carousel-post-wrapper">
            <img className="carousel-img" src={model2}></img>
          </div>
          <div className="carousel-post-wrapper">
            <img className="carousel-img" src={model3}></img>
          </div>
          <div className="carousel-post-wrapper">
            <img className="carousel-img" src={model4}></img>
          </div>
          <div className="carousel-post-wrapper">
            <img className="carousel-img" src={model5}></img>
          </div>
          <div className="carousel-post-wrapper">
            <img className="carousel-img" src={model6}></img>
          </div>
          <div className="carousel-post-wrapper">
            <img className="carousel-img" src={model7}></img>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default PhotosCarousel;
