import React, { useEffect, useState } from "react";
import "../assets/css/PhotosCarousel.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
const Talentscarousel = ({ talentList }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    console.log(talentList, "talentList");
  }, []);

  return (
    <>
      <OwlCarousel
        className="owl-theme photos-carousel-owl"
        // loop
        margin={10}
        nav
        items={talentList?.length === 1 ? 1 : 5}
      >
        {talentList &&
          talentList.length > 0 &&
          talentList.map((item, index) => {
            // console.log(talentList, "talentList map");
            console.log(item, "item");
            return (
              <>
                <div className="item" key={index}>
                  <img
                    className="talents-profile-slider-image"
                    src={`${API.userFilePath}${item?.image?.fileData}`}
                    alt=""
                  />
                  <div className="carousel-talent-name">
                    {item?.preferredChildFirstname}
                  </div>
                </div>
              </>
            );
          })}
      </OwlCarousel>
    </>
  );
};

export default Talentscarousel;
