// ImageSlider.js
import React, { useState, useEffect } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Close } from "@mui/icons-material";
import { API } from "../config/api";

const ImageSlider = ({ images, open, initialIndex, handleClose }) => {
  console.log(images, "images");
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    console.log(open, "open ImageSlider");

    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="image-slider-modal"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          height: "100%",
          widows: "100%",
          paddingTop: "50px",
          paddingBottom: "50px",
          paddingRight: "50px",
          paddingLeft: "50px",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 5, right: 5 }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
        <img
          src={`${API.userFilePath}${images[currentIndex]}`}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
        <IconButton
          sx={{ position: "absolute", top: "50%", left: 8 }}
          onClick={handlePrevious}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          sx={{ position: "absolute", top: "50%", right: 5 }}
          onClick={handleNext}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default ImageSlider;
