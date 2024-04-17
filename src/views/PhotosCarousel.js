import React, { useEffect, useState } from "react";
import "../assets/css/PhotosCarousel.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
const PhotosCarousel = ({ photosList }) => {
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
  const [userId, setUserId] = useState(null);

  return (
    <>
      <OwlCarousel
        className="owl-theme photos-carousel-owl"
        // loop
        margin={10}
        nav
        items={photosList?.length === 1 ? 1 : 5}
        responsive={{
          // Breakpoint from 0 up
          0: {
            items: 2,
          },
          // Breakpoint from 768 up
          768: {
            items: 5,
          },
        }}
      >
        {photosList &&
          photosList.length > 0 &&
          photosList.map((image, index) => {
            // console.log(photosList, "photosList map");
            console.log(image, "image");
            return (
              <>
                <div className="item" key={index}>
                  <img
                    className="talents-profile-slider-image"
                    src={`${API.userFilePath}${image}`}
                    alt=""
                  />
                </div>
              </>
            );
          })}
      </OwlCarousel>
    </>
  );
};

export default PhotosCarousel;
