import React, { useEffect, useState } from "react";
import "../assets/css/CardCarousel.css";

const CardCarousel = () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".carousel-slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Auto-advance the carousel every 3 seconds (adjust as needed)
  setInterval(nextSlide, 3000);

  // Initial display
  showSlide(currentSlide);

  return (
    <>
      <div className="carousel-container">
        <div className="carousel-slide">
          <img src="image1.jpg" alt="Image 1"></img>
        </div>
        <div className="carousel-slide">
          <img src="image2.jpg" alt="Image 2"></img>
        </div>
        <div className="carousel-slide">
          <img src="image3.jpg" alt="Image 3"></img>
        </div>
      </div>
    </>
  );
};

export default CardCarousel;
