import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import Header from "../layout/header";

import Footer from "../layout/Footer";
import "../assets/css/blogs.css";
const CaseStudies = () => {
  const navigate = useNavigate();

  const bl_image = require("../assets/images/blogs/blog1.png");

  const navigateTO = async (event) => {
    console.log(event, "event");
    if (event == "industry-news") {
      navigate("/view-blog");
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
            <div className="header-title">Case Studies</div>
            {/* <div className="header-menu">
              <div>Home</div>
              <div>Learn</div>
            </div> */}
          </div>
        </div>
      </section>
      <section className="mb-4">
        <div className="container">
          <div className="blogs-main row">
            <div className="blog-contents col-sm-9 col-md-9">
              <div className="blog-card">
                <div className="blogs-wrapper">
                  <div className="blogimg-bx">
                    <img className="blogs-image" src={bl_image} alt="img" />
                  </div>
                  <div className="blogs-content-wrapper">
                    <div className="blogs-subhead">
                      Pellentesque ac eleifend
                    </div>
                    <div className="blogs-heading">
                      Donec vulputate quam ac tincidunt.Fusce vitae lacus lacus.
                      Pellentesque
                    </div>
                    <div className="blogs-description">
                      Vivamus aliquam ligula vel mi vulputate hendrerit.
                      Vestibulum ullamcorper mi nisl, sit amet ullamcorper justo
                      pellentesque eget. Donec condimentum, nisi quis venenatis
                      viverra, massa ante pellentesque est, non fermentum lorem
                      quam et mauris. Etiam vel eros erat. Phasellus eu massa
                      nunc. Cras diam eros, gravida vitae cursus vel, sagittis
                      eget diam. Phasellus feugiat faucibus enim sit amet
                      mattis.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="blogs-tabs col-sm-4 col-md-3">
              <div className="blogs-tabs-wrapper">
                <div
                  className="blogs-tab-text"
                  onClick={() => navigateTO("industry-news")}
                >
                  Industry Insights
                </div>
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

export default CaseStudies;
