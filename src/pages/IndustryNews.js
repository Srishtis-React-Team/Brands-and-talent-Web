import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import "../assets/css/blogs.css";

const IndustryNews = () => {
  const navigate = useNavigate();

  const bl_image = require("../assets/images/blogs/blog1.png");

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
            <div className="header-title">Industry News & Insights</div>
            <div className="header-menu">
              <div>Blog</div>
              <div>Industry News & Insights</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5 wraper">
        <div className="blog-DetailBg wraper">
          <div className="blog-card container d-flex justify-content-center">
                <div className="blogs-wrapper widF col-sm-9">
                  <div className="row">
                    <div className="blogs-content-wrapper col-md-8 col-lg-7">
                      <div className="blogs-subhead">
                        Pellentesque ac eleifend
                      </div>
                      <div className="blogs-heading">Donec vulputate quam ac tincidunt, Fusce vitae lacus lacus pellentesque</div>
                      <div className="blogs-description">
                        Vivamus aliquam ligula vel mi vulputate hendrerit. Vestibulum ullamcorper mi nisl, sit amet ullamcorper justo pellentesque eget. Donec condimentum, nisi quis venenatis viverra, massa ante pellentesque est, non fermentum lorem quam et mauris. Etiam vel eros erat. Phasellus eu massa nunc. Cras diam eros, gravida vitae cursus vel, sagittis eget diam. Phasellus feugiat faucibus enim sit amet mattis.
                      </div>

                      <div className="shareWrap">
                        <label>Share Now</label>
                        <ul className="shareDiv">
                          <li><i class="bi bi-facebook"></i></li>
                          <li><i class="bi bi-twitter-x"></i></li>
                          <li><i class="bi bi-linkedin"></i></li>
                          <li><i class="bi bi-whatsapp"></i></li>
                        </ul>
                      </div>
                    </div>
                    <div className="blogimg-bx col-md-4 col-lg-5">
                        <img
                            className="blogs-image img-fluid"
                            src={bl_image}
                            alt="img"
                          />
                    </div>
                  </div>
                </div>
          </div>
        </div>

        <div className="wraper">
          <div className="container">
            <div className="blogs-main row">
              <div className="blog-contents widF col-sm-7">
              
                  <div className="blogs-description">
                      Vivamus aliquam ligula vel mi vulputate hendrerit. Vestibulum ullamcorper mi nisl, sit amet ullamcorper justo pellentesque eget. Donec condimentum, nisi quis venenatis viverra, massa ante pellentesque est, non fermentum lorem quam et mauris. Etiam vel eros erat. Phasellus eu massa nunc. Cras diam eros, gravida vitae cursus vel, sagittis eget diam. Phasellus feugiat faucibus enim sit amet mattis.
                  </div>
                  <div className="blogs-description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor nibh sed nisi tempus maximus. Donec semper vel ipsum at feugiat. Sed nec nisl non ipsum consectetur aliquet id eu ex. Curabitur ut neque accumsan, tincidunt orci iaculis, convallis eros. Curabitur faucibus sed nunc non finibus. Etiam et egestas tortor. Donec quis placerat sapien. Integer bibendum ut orci non volutpat. Phasellus eget iaculis nunc. Duis aliquam mi posuere, vestibulum justo a, mollis justo. Nulla facilisi.
                  </div>  
                  <div className="blogs-description">
                      In ante elit, vulputate in placerat id, tempus non eros. Donec eget interdum velit. Integer vel lectus iaculis, ultrices nibh at, dictum tortor. Nunc vehicula felis eu cursus sodales. Proin pulvinar lorem a congue lobortis. Praesent lorem augue, viverra sed euismod a, semper sit amet ex. Duis sagittis dui at nunc sollicitudin, a congue tortor cursus. In posuere, ipsum sit amet congue rhoncus, magna augue laoreet ante, nec maximus magna velit a ante. Fusce bibendum nunc vel leo elementum convallis. Suspendisse dictum ac eros eu hendrerit. Sed maximus ante massa, nec molestie massa hendrerit at. Pellentesque egestas, magna quis suscipit consectetur, turpis ex iaculis dolor, nec congue sapien sapien vitae lacus. Ut sodales posuere nulla, eget viverra ex cursus in.
                  </div>
                  <div className="blogs-description">
                      Morbi a ex ac nisl dignissim suscipit. Vestibulum in elementum enim. Morbi finibus interdum condimentum. Integer convallis malesuada maximus. Ut tincidunt quam tempor, maximus nibh a, rutrum augue. In dapibus non felis vitae interdum. Nam at pharetra augue. Nulla tempus, erat at tincidunt luctus, nibh libero vulputate lectus, vitae interdum tellus sem vel lacus. Nunc commodo, mauris in porta vulputate, augue sapien auctor lectus, vel auctor eros ligula hendrerit leo. Integer eros metus, faucibus eu velit non, sodales ullamcorper felis. Suspendisse et eleifend turpis, sed blandit quam. Suspendisse potenti. Vivamus varius iaculis sem, nec dictum nunc laoreet imperdiet.
                  </div>
                  <div className="dtTitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                  <div className="blogs-description">
                      In ante elit, vulputate in placerat id, tempus non eros. Donec eget interdum velit. Integer vel lectus iaculis, ultrices nibh at, dictum tortor. Nunc vehicula felis eu cursus sodales. Proin pulvinar lorem a congue lobortis. Praesent lorem augue, viverra sed euismod a, semper sit amet ex. Duis sagittis dui at nunc sollicitudin, a congue tortor cursus. In posuere, ipsum sit amet congue rhoncus, magna augue laoreet ante, nec maximus magna velit a ante. Fusce bibendum nunc vel leo elementum convallis. Suspendisse dictum ac eros eu hendrerit. Sed maximus ante massa, nec molestie massa hendrerit at. Pellentesque egestas, magna quis suscipit consectetur, turpis ex iaculis dolor, nec congue sapien sapien vitae lacus. Ut sodales posuere nulla, eget viverra ex cursus in.
                  </div>
                  <div className="blogs-description">
                      Morbi a ex ac nisl dignissim suscipit. Vestibulum in elementum enim. Morbi finibus interdum condimentum. Integer convallis malesuada maximus. Ut tincidunt quam tempor, maximus nibh a, rutrum augue. In dapibus non felis vitae interdum. Nam at pharetra augue. Nulla tempus, erat at tincidunt luctus, nibh libero vulputate lectus, vitae interdum tellus sem vel lacus. Nunc commodo, mauris in porta vulputate, augue sapien auctor lectus, vel auctor eros ligula hendrerit leo. Integer eros metus, faucibus eu velit non, sodales ullamcorper felis. Suspendisse et eleifend turpis, sed blandit quam. Suspendisse potenti. Vivamus varius iaculis sem, nec dictum nunc laoreet imperdiet.
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

export default IndustryNews;
