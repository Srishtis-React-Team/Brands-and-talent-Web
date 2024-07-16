import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import Header from "../layout/header";
import Footer from "../layout/Footer";

import "../assets/css/blogs.css";
const BrandTips = () => {
  const navigate = useNavigate();

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
            <div className="header-title">Brand Tips & Tricks</div>
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
              Brand Tips & Tricks
            </div>
            <div className="blogs-tabs col-sm-4 col-md-3">
              <div className="blogs-tabs-wrapper">
                <div
                  className="blogs-tab-text"
                  onClick={() => navigateTO("industry-news")}
                >
                  Industry News & Insights
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

export default BrandTips;
