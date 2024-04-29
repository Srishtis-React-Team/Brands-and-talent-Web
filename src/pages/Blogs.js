import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import "../assets/css/blogs.css";
const Blogs = () => {
  const navigate = useNavigate();
  const [blogsList, setBlogsList] = useState([]);
  const image1 = require("../assets/images/blogs/blog1.png");
  const image2 = require("../assets/images/blogs/blog2.png");
  const image3 = require("../assets/images/blogs/blog3.png");
  const image4 = require("../assets/images/blogs/blog4.png");
  const image5 = require("../assets/images/blogs/blog5.png");

  useEffect(() => {
    setBlogsList([
      {
        image: image1,
        subheading: "Pellentesque ac eleifend",
        heading:
          "Donec vulputate quam ac tincidunt.Fusce vitae lacus lacus. Pellentesque",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut lorem sed ex sodales matt",
      },
      {
        image: image2,
        subheading: "Pellentesque ac eleifend",
        heading:
          "Donec vulputate quam ac tincidunt.Fusce vitae lacus lacus. Pellentesque",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut lorem sed ex sodales matt",
      },
      {
        image: image3,
        subheading: "Pellentesque ac eleifend",
        heading:
          "Donec vulputate quam ac tincidunt.Fusce vitae lacus lacus. Pellentesque",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut lorem sed ex sodales matt",
      },
      {
        image: image4,
        subheading: "Pellentesque ac eleifend",
        heading:
          "Donec vulputate quam ac tincidunt.Fusce vitae lacus lacus. Pellentesque",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut lorem sed ex sodales matt",
      },
      {
        image: image5,
        subheading: "Pellentesque ac eleifend",
        heading:
          "Donec vulputate quam ac tincidunt.Fusce vitae lacus lacus. Pellentesque",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut lorem sed ex sodales matt",
      },
    ]);
  }, []);

  return (
    <>
      <Header />{" "}
      <section style={{ marginTop: "64px" }}>
        <div className="popular-header">
          <div className="header-title">Blog</div>
          <div className="header-menu">
            <div>Home</div>
            <div>Learn</div>
          </div>
        </div>
      </section>
      <div className="blogs-main">
        <div className="blog-contents">
          {blogsList && blogsList.length > 0 && (
            <div className="blog-card">
              {blogsList?.map((item, index) => {
                return (
                  <>
                    <div className="blogs-wrapper">
                      <div>
                        <img className="blogs-image" src={item?.image} alt="" />
                      </div>
                      <div className="blogs-content-wrapper">
                        <div className="blogs-subhead">{item?.subheading}</div>
                        <div className="blogs-heading">{item?.heading}</div>
                        <div className="blogs-description">
                          {item?.description}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
        <div className="blogs-tabs">
          <div className="blogs-tabs-wrapper">
            <div className="blogs-tab-text">Industry News & Insights</div>
            <div className="blogs-tab-text">Case Studies</div>
            <div className="blogs-tab-text">Talent Diaries</div>
            <div className="blogs-tab-text"> Talent Tips & Tricks</div>
            <div className="blogs-tab-text"> Brand Tips & Tricks</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blogs;
