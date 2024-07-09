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

  const navigateTO = async (event) => {
    console.log(event, "event");
    if (event == "industry-news") {
      navigate("/industry-news");
    }
    if (event == "case-studies") {
      navigate("/case-studies");
    }
    if (event == "talent-diary") {
      navigate("/talent-diaries");
    }
    if (event == "talent-tips") {
      navigate("/talent-tips");
    }
    if (event == "brand-tips") {
      navigate("/brand-tips");
    }
  };

  return (
    <>
      <Header />{" "}
      <section style={{ marginTop: "64px" }}>
        <div className="popular-header">
          <div className="container">
            <div className="header-title">Blog</div>
            {/* <div className="header-menu">
              <div>Home</div>
              <div>Learn</div>
            </div> */}
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="blogs-main row">
            <div className="blog-contents col-sm-9 col-md-9">
              {blogsList && blogsList.length > 0 && (
                <div className="blog-card">
                  {blogsList?.map((item, index) => {
                    return (
                      <>
                        <div className="blogs-wrapper">
                          <div className="blogimg-bx">
                            <img
                              onClick={() => navigateTO("industry-news")}
                              className="blogs-image"
                              src={item?.image}
                              alt=""
                            />
                          </div>
                          <div className="blogs-content-wrapper">
                            <div
                              className="blogs-subhead"
                              onClick={() => navigateTO("industry-news")}
                            >
                              {item?.subheading}
                            </div>
                            <div
                              className="blogs-heading"
                              onClick={() => navigateTO("industry-news")}
                            >
                              {item?.heading}
                            </div>
                            <div
                              className="blogs-description"
                              onClick={() => navigateTO("industry-news")}
                            >
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
            <div className="blogs-tabs col-sm-4 col-md-3">
              <div className="blogs-tabs-wrapper">
                <div className="blogs-tab-text">Industry News & Insights</div>
                <div
                  className="blogs-tab-text"
                  onClick={() => navigateTO("case-studies")}
                >
                  Case Studies
                </div>
                <div
                  className="blogs-tab-text"
                  onClick={() => navigateTO("talent-diary")}
                >
                  Talent Stories
                </div>
                <div
                  className="blogs-tab-text"
                  onClick={() => navigateTO("talent-tips")}
                >
                   Talent Tips & Tricks
                </div>
                <div
                  className="blogs-tab-text"
                  onClick={() => navigateTO("brand-tips")}
                >
                   Brand Tips & Tricks
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blogs;
