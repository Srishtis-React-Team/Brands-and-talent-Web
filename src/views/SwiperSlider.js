import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import core Swiper styles
import "swiper/css/navigation"; // Import navigation styles
import "swiper/css/pagination"; // Import pagination styles
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Correct module imports
import "../assets/css/SwiperSlider.css"; // Import your custom CSS
import { API } from "../config/api";

const SwiperSlider = ({ photosList }) => {
  const logoWhite = require("../assets/images/logo-white.png");
  console.log(photosList, "photosList");

  return (
    <div className="swiper-container">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={true} // Explicitly pass 'navigation'
        pagination={{ clickable: true }}
        loop={true}
        // autoplay={{ delay: 3000 }} // Uncomment and use autoplay if required
        modules={[Navigation, Pagination, Autoplay]} // Ensure these modules are loaded
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {photosList?.map((item) => (
          <SwiperSlide key={item}>
            <div className="slide-content">
              <img
                style={{ borderRadius: "10px" }}
                src={`${API.userFilePath}${item}`}
                alt="Slide"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
