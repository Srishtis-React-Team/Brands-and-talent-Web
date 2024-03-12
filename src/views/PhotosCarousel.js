import React, { useEffect, useState } from "react";
import "../assets/css/PhotosCarousel.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
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
  const [photosList, setPhotosList] = useState([]);

  const [userId, setUserId] = useState(null);

  const servicesList = [
    {
      image: "model1",
      amount: "from US $2300",
      title: "Full Branding Package",
      description: "lorem ipsumssfd sdsds sfsssads asdadasd",
      duration: "within-2months",
      concepts: "3 Conscepts, 2 Revisions",
    },
    {
      image: "model1",
      amount: "from US $2300",
      title: "Full Branding Package",
      description: "lorem ipsumssfd sdsds sfsssads asdadasd",
      duration: "within-2months",
      concepts: "3 Conscepts, 2 Revisions",
    },
    {
      image: "model1",
      amount: "from US $2300",
      title: "Full Branding Package",
      description: "lorem ipsumssfd sdsds sfsssads asdadasd",
      duration: "within-2months",
      concepts: "3 Conscepts, 2 Revisions",
    },
  ];

  const fetchPhotos = async () => {
    await ApiHelper.post(`${API.unifiedDataFetch}${userId}/1`)
      .then((resData) => {
        console.log(resData, "resData photos");
        if (resData.data.status === true) {
          if (resData.data.data) {
            setPhotosList(resData.data.data);
          }
          console.log(photosList, "photosList");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchPhotos();
    }
  }, [userId]);

  useEffect(() => {
    console.log(photosList, "photosList");
  }, [photosList]);

  return (
    <>
      <OwlCarousel
        className="owl-theme photos-carousel-owl"
        // loop
        margin={10}
        nav
        items={photosList?.length === 1 ? 1 : 5}
      >
        {photosList &&
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
