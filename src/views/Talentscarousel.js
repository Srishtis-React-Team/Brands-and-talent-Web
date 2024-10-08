import React, { useEffect, useState } from "react";
import "../assets/css/PhotosCarousel.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import { useNavigate } from "react-router-dom";
import "../assets/css/findcreators.css";
import PopUp from "../components/PopUp";

const Talentscarousel = ({ talentList }) => {
  const navigate = useNavigate();
  const favoruiteIcon = require("../assets/icons/favorite.png");
  const heartIcon = require("../assets/icons/heart.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [itemsToShow, setItemsToShow] = useState(4); // Default to 4 items

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsToShow(2); // Mobile
      } else {
        setItemsToShow(4); // Desktop
      }
    };

    handleResize(); // Set initial items to show
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  const addFavorite = async (item) => {
    const formData = {
      type: item?.type,
      user: item?._id,
    };
    let brandId = localStorage.getItem("brandId");
    let talentId = localStorage.getItem("userId");

    let loggidInID;
    if (brandId) {
      loggidInID = brandId;
    } else if (talentId) {
      loggidInID = talentId;
    }

    await ApiHelper.post(`${API.setUserFavorite}${loggidInID}`, formData, true)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Talent added to your favourite list");
          setOpenPopUp(true);
          setTimeout(() => setOpenPopUp(false), 1000);
        }
      })
      .catch((err) => {
        setMessage("Please Login First");
        setOpenPopUp(true);
        setTimeout(() => setOpenPopUp(false), 1000);
      });
  };

  const removeFavorite = async (item) => {
    const formData = {
      type: item?.type,
      user: item?._id,
    };
    let brandId = localStorage.getItem("brandId");
    let talentId = localStorage.getItem("userId");

    let loggidInID;
    if (brandId) {
      loggidInID = brandId;
    } else if (talentId) {
      loggidInID = talentId;
    }

    await ApiHelper.post(`${API.removeFavorite}${loggidInID}`, formData, true)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Removed Talent From Favorites");
          setOpenPopUp(true);
          setTimeout(() => setOpenPopUp(false), 1000);
        }
      })
      .catch((err) => {
        setMessage("Unable To Remove Please Try Again");
        setOpenPopUp(true);
        setTimeout(() => setOpenPopUp(false), 1000);
      });
  };

  return (
    <div className="photos-carousel-owl-container">
      {" "}
      {/* Ensure the parent div takes full width */}
      <OwlCarousel
        className="owl-theme photos-carousel-owl"
        margin={10}
        nav
        items={itemsToShow} // Use dynamic item count
        responsive={{
          0: {
            items: 2,
          },
          768: {
            items: 4, // Use 4 for larger screens
          },
        }}
        onInitialized={(event) => {
          const totalItems = event.item.count; // Total number of items
          const visibleItems = itemsToShow; // Number of items to show

          // Adjust to ensure no empty space
          if (totalItems > visibleItems) {
            event.target.style.width = "100%"; // Set the width to 100%
          }
        }}
        onChanged={(event) => {
          const totalItems = event.item.count; // Total number of items
          const visibleItems = itemsToShow; // Number of items to show

          // Adjust to ensure no empty space
          if (totalItems > visibleItems) {
            event.target.style.width = "100%"; // Set the width to 100%
          }
        }}
      >
        {talentList &&
          talentList.length > 0 &&
          talentList.map((item) => (
            <div
              style={{ cursor: "pointer" }}
              className="item"
              key={item?._id}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/talent/${item.publicUrl}`, {
                  state: { talentData: item },
                });
              }}
            >
              <div className="sliderImg">
                <img
                  className="talents-profile-slider-image"
                  src={`${API.userFilePath}${item?.image?.fileData}`}
                  alt=""
                />
                {!item.isFavorite && (
                  <img
                    className="heart-icon"
                    style={{ left: "80%" }}
                    src={heartIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      addFavorite(item);
                    }}
                  />
                )}
                {item.isFavorite && (
                  <img
                    className="heart-icon"
                    style={{ left: "80%" }}
                    src={favoruiteIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavorite(item);
                    }}
                  />
                )}
              </div>
              <div className="carousel-talent-name">
                {item?.preferredChildFirstname}
              </div>
            </div>
          ))}
      </OwlCarousel>
      {openPopUp && <PopUp message={message} />}
    </div>
  );
};

export default Talentscarousel;
