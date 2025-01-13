import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import core Swiper styles
import "swiper/css/navigation"; // Import navigation styles
import "swiper/css/pagination"; // Import pagination styles
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Correct module imports
import "../assets/css/SwiperSlider.css"; // Import your custom CSS
import { API } from "../config/api";
import { Modal, Box, IconButton } from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Close,
  ArrowBack,
} from "@mui/icons-material";
const SwiperSlider = ({ photosList }) => {
  const logoWhite = require("../assets/images/logo-white.png");
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleImageClick = (index) => {
    setSliderOpen(true);
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setSliderOpen(false);
  };

  const [currentIndex, setCurrentIndex] = useState(currentImageIndex);

  useEffect(() => {
    setCurrentIndex(currentImageIndex);
  }, [currentImageIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photosList.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photosList.length) % photosList.length
    );
  };

  return (
    <div className="swiper-container">
      <Swiper
        spaceBetween={8}
        slidesPerView={1}
        navigation={true} // Explicitly pass 'navigation'
        pagination={{ clickable: true }}
        loop={true}
        // autoplay={{ delay: 3000 }} // Uncomment and use autoplay if required
        modules={[Navigation, Pagination, Autoplay]} // Ensure these modules are loaded
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
      >
        {photosList?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content swiper-slider-width">
              <img
                style={{ borderRadius: "10px" }}
                src={`${API.userFilePath}${item}`}
                onClick={() => {
                  handleImageClick(index);
                }}
                alt="Slide"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Modal
        open={isSliderOpen}
        onClose={handleClose}
        aria-labelledby="image-slider-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "#000",
            boxShadow: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "90px",
              right: 5,
              color: "#ffffff",
              left: "-95%",
            }}
            onClick={handleClose}
          >
            <ArrowBack />
          </IconButton>
          <img
            src={`${API.userFilePath}${photosList[currentIndex]}`}
            alt=""
            style={{
              width: "auto !important",
              height: "auto !important",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
            className="big-slider-image"
          />
          <IconButton
            sx={{ position: "absolute", top: "50%", left: 8, color: "#ffffff" }}
            onClick={handlePrevious}
          >
            <ArrowBackIos />
          </IconButton>
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              right: 5,
              color: "#ffffff",
            }}
            onClick={handleNext}
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>
      </Modal>
    </div>
  );
};

export default SwiperSlider;
