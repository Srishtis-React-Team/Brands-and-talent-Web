import React, { useEffect, useState } from "react";
import "../assets/css/FeaturedBlogsCarousel.css";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import { useNavigate } from "react-router";

const FeaturedBlogsCarousel = () => {
  const navigate = useNavigate();

  const model1 = require("../assets/images/model1.png");
  const model2 = require("../assets/images/model2.png");
  const model3 = require("../assets/images/model3.png");
  const model4 = require("../assets/images/model4.png");
  const model5 = require("../assets/images/model5.png");
  const model6 = require("../assets/images/model6.png");
  const model7 = require("../assets/images/model7.png");
  const model8 = require("../assets/images/model8.png");
  const model9 = require("../assets/images/model9.png");
  const instaLogo = require("../assets/icons/social-media-icons/instagram.png");
  const blogs = [
    {
      image: model1,
      title: "Exploring the Beauty of Nature",
      heading: "Nature's Wonders",
      description:
        "Discover the breathtaking landscapes and diverse wildlife that nature has to offer in this in-depth exploration of the great outdoors.",
    },
    {
      image: model2,
      title: "Tech Innovations of 2024",
      heading: "Future of Technology",
      description:
        "A look at the most exciting technological advancements and innovations that are set to shape our future in 2024 and beyond.",
    },
    {
      image: model3,
      title: "Healthy Eating Habits",
      heading: "Nutrition and Wellness",
      description:
        "Learn about the best practices for maintaining a healthy diet and lifestyle with tips from top nutritionists and wellness experts.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const changeSlide = (direction) => {
    const totalSlides = blogs.length;
    const newSlide = (currentSlide + direction + totalSlides) % totalSlides;
    setCurrentSlide(newSlide);
  };

  useEffect(() => {
    getFeaturedArticles();
    fetchBlogByType();
  }, []);

  const [featuredBlogsLsit, setFeaturedBlogsLsit] = useState(0);
  const [blogsLsit, setBlogsLsit] = useState(0);

  const getFeaturedArticles = async () => {
    await ApiHelper.get(API.getFeaturedArticles)
      .then((resData) => {
        if (resData) {
          console.log(resData?.data?.data, "resData getFeaturedArticles");
          setFeaturedBlogsLsit(resData?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBlogByType = async () => {
    const formdata = {
      type: "Industry News & Insights",
    };
    await ApiHelper.post(API.fetchBlogByType, formdata)
      .then((resData) => {
        if (resData) {
          console.log(resData?.data?.data, "resData fetchBlogByType");
          setBlogsLsit(resData?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createHandleMenuClick = (blogData) => {
    return () => {
      navigate(`/view-blog`, {
        state: { blogData },
      });
    };
  };

  return (
    <>
      <div className="featured-blogs-wrapper ">
        {/* <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src={model1}
                alt="First slide"
              ></img>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={model2}
                alt="Second slide"
              ></img>
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={model3}
                alt="Third slide"
              ></img>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div> */}

        {/* <Carousel>
          {blogs.map((blog, index) => (
            <Carousel.Item key={index}>
              <div className="row">
                <div className="col-6">
                  <img
                    className="d-block w-100 blog-slider-img"
                    src={blog.image}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
                <div className="col-6">
                  <h3>{blog.title}</h3>
                  <h4>{blog.heading}</h4>
                  <p>{blog.description}</p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel> */}

        <div className="slider-container">
          <div
            className="slider"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {featuredBlogsLsit && featuredBlogsLsit.length > 0 && (
              <>
                {featuredBlogsLsit?.map((blog, index) => (
                  <div
                    className={`slide ${
                      index === currentSlide ? "active" : ""
                    }`}
                    key={index}
                    onClick={createHandleMenuClick(blog)}
                  >
                    <div className="slide-content">
                      <div className="slide-image">
                        <img
                          src={`${API.userFilePath}${blog.image}`}
                          alt={`Slide ${index + 1}`}
                        />
                      </div>
                      <div className="slide-text">
                        <div className="blogs-subhead">{blog.title}</div>
                        <div className="blogs-heading">{blog.heading}</div>
                        <div className="blogs-description">
                          {blog.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <button className="blog-prev" onClick={() => changeSlide(-1)}>
            <div>❮</div>
          </button>
          <button className="next" onClick={() => changeSlide(1)}>
            <div>❯</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default FeaturedBlogsCarousel;
