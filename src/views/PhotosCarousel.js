import React, { useEffect, useState } from "react";
import "../assets/css/PhotosCarousel.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import ImageSlider from "./ImageSlider";
import { Modal, Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Close } from "@mui/icons-material";
import CurrentUser from "../CurrentUser";

const PhotosCarousel = ({ photosList }) => {
  const {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
    fcmToken,
  } = CurrentUser();

  const [isSliderOpen, setSliderOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [talentData, setTalentData] = useState([]);

  useEffect(() => {
    getTalentById(currentUserId);
  }, []);

  const getTalentById = async (talent_id) => {
    await ApiHelper.post(`${API.getTalentById}${talent_id}`)
      .then((resData) => {
        if (resData) {
          console.log(resData, "resData talentDataProfile");
          setTalentData(resData.data.data);
          console.log(resData.data.data, "resData.data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageClick = (index) => {
    setSliderOpen(true);
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    // alert("handleCloseSlider");
    setSliderOpen(false);
  };

  useEffect(() => {
    console.log(isSliderOpen, "isSliderOpen ImageSlider");
  }, [isSliderOpen]);
  const [currentIndex, setCurrentIndex] = useState(currentImageIndex);

  useEffect(() => {
    setCurrentIndex(currentImageIndex);
  }, [currentImageIndex]);
  useEffect(() => {
    console.log(talentData, "talentDataPhotosCarousel");
  }, [talentData]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photosList.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photosList.length) % photosList.length
    );
  };

  return (
    <>
      <Box>
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
              items: 2,
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
                      onClick={() => {
                        handleImageClick(index);
                      }}
                    />
                  </div>
                </>
              );
            })}
          {photosList.length === 0 && talentData?.profileApprove === true && (
            <>
              <div>Data not added</div>
            </>
          )}
          {photosList.length === 0 && talentData?.profileApprove === false && (
            <>
              <div>Waiting For Admin Approval</div>
            </>
          )}
        </OwlCarousel>
      </Box>

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
            sx={{ position: "absolute", top: 5, right: 5, color: "#ffffff" }}
            onClick={handleClose}
          >
            <Close />
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
    </>
  );
};

export default PhotosCarousel;
