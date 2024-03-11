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

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    fetchPhotos();
  }, [userId]);

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
        if (resData) {
          setPhotosList(resData.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const [slideIndex, setSlideIndex] = useState(0);

  // useEffect(() => {
  //   showDivs(slideIndex);
  // }, [slideIndex]);

  // function plusDivs(n) {
  //   setSlideIndex((prevIndex) => {
  //     let newIndex = prevIndex + n;
  //     if (newIndex >= imageList.length) {
  //       return 0; // Loop back to the beginning
  //     }
  //     if (newIndex < 0) {
  //       return imageList.length - 1; // Loop to the end
  //     }
  //     return newIndex;
  //   });
  // }

  // function showDivs(n) {
  //   const x = document.getElementsByClassName("talents-photos-wrapper");
  //   if (x && x.length > 0) {
  //     let newIndex = n;
  //     if (n >= x.length) {
  //       newIndex = 0;
  //     }
  //     if (n < 0) {
  //       newIndex = x.length - 1;
  //     }
  //     for (let i = 0; i < x.length; i++) {
  //       x[i].style.display = "none";
  //     }
  //     x[newIndex].style.display = "block";
  //   }
  // }

  useEffect(() => {}, []);

  return (
    <>
      {/* <div className="talent-photos-section">
        {imageList.map((imageArray, index) => (
          <div
            key={index}
            className={`talents-photos-wrapper ${
              index === slideIndex ? "active" : ""
            }`}
            style={{ display: index === slideIndex ? "block" : "none" }}
          >
            {imageArray.map((imageSrc, idx) => (
              <img
                className="talent-photos-style"
                key={idx}
                src={imageSrc}
                alt={`Model ${idx + 1}`}
              />
            ))}
          </div>
        ))}
        <div className="photos-navigation-prev" onClick={() => plusDivs(-1)}>
          <i class="fa-solid fa-chevron-left"></i>
        </div>
        <div className="photos-navigation-next" onClick={() => plusDivs(1)}>
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div> */}
      <OwlCarousel
        className="owl-theme photos-carousel-owl"
        loop
        margin={10}
        nav
        items={6}
      >
        {photosList &&
          photosList.map((image) => {
            return (
              <>
                <div class="item">
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
