import React, { useState } from "react";
import "../assets/css/dashboard.css";
import { NavLink } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";
const Dashboard = () => {
  const btLogo = require("../assets/icons/Group 56.png");
  const searchLogo = require("../assets/icons/search (1).png");
  const starIcon = require("../assets/icons/star.png");
  const whiteStar = require("../assets/icons/white_star.png");
  const checkMark = require("../assets/icons/check-circle.png");
  const lockIcon = require("../assets/icons/lock.png");
  const gridLogo = require("../assets/icons/4243313_ux_basic_app_menu_icon 1.png");
  const gents = require("../assets/images/gents.png");
  const girl = require("../assets/images/girl.png");
  const female = require("../assets/images/female.png");
  const fashion = require("../assets/images/fashion.png");
  const sliderBackground = require("../assets/images/slider-background.png");
  const fieldsBackground = require("../assets/images/fields-background.png");
  const adidasIcon = require("../assets/icons/6539fea9ad514fe89ff5d7fc_adidas.png");
  const ubisoftIcon = require("../assets/icons/6539fd74ad514fe89ff48cdd_ubisoft.png");
  const wppIcon = require("../assets/icons/651508c575f862fac120d7b1_wpp.webp");
  const lorealIcon = require("../assets/icons/6539e8f83c874a7714db103c_Loreal 1.webp");
  const havasIcon = require("../assets/icons/6539e8f8ac5a3259e7f64ef8_Havas_logo 3.webp");
  const joseIcon = require("../assets/icons/6539e8f8fe903bed35dc07f8_jose-cuervo-logo-black-and-white 1.webp");
  const calvinIcon = require("../assets/icons/6539ea694436eb9715c9cba3_image 10.png");
  const socialIcons = require("../assets/icons/Social.png");
  const roundProfile = require("../assets/icons/round-profile.png");
  const quoteIcon = require("../assets/icons/9044931_quotes_icon 1.png");
  const heartIcon = require("../assets/icons/heart.png");
  const uploadIcon = require("../assets/icons/upload.png");
  const importIcon = require("../assets/icons/instagram.png");
  const placeholder = "Your message";
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOne_visibility, showFormOne] = useState(true);
  const [formTwo_visibility, showFormTwo] = useState(false);
  const [formThree_visibility, showForThree] = useState(false);
  const [formFour_visibility, showFormFour] = useState(false);
  const [formFive_visibility, showFormFive] = useState(false);

  function handleForms(e) {
    console.log(e, "e");
    if (e == "form-one") {
      showFormOne(false);
      showFormTwo(true);
    } else {
      showFormTwo(false);
    }
    if (e == "form-two") {
      showForThree(true);
    } else {
      showForThree(false);
    }
    if (e == "form-three") {
      showFormFour(true);
    } else {
      showFormFour(false);
    }
    if (e == "form-four") {
      showFormFive(true);
    } else {
      showFormFive(false);
    }
  }

  return (
    <>
      <Header />
      <section>
        <div className="section-1">
          <div className="find-work">
            <div className="section-title">Find work as a model</div>
            <div className="section-description">
              Unlock Your Gateway to Modeling Opportunities.
            </div>
            <div className="Join-wrapper center">
              <div className="joinnow-btn">Join Now</div>
            </div>
          </div>
          <div className="find-work">
            <div className="section-title">Find models and talents</div>
            <div className="section-description">
              Discover Your Ideal Model: Connecting Visions with Talent.
            </div>
            <div className="white-joinnow center">
              <div className="joinnow-btn">Join Now</div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="tabs-section">
          <div className="title">Popular Models</div>
          <div className="tabs">
            <div className="active-tab">Fashion</div>
            <div>Plus sized</div>
            <div>Real people</div>
            <div>Unique</div>
          </div>
        </div>
      </section>
      <section>
        <div className="gallery-section">
          <div className="gallery-warpper">
            <div className="gallery-position">
              <img className="gallery-img" src={gents}></img>
              <img className="heart-icon" src={heartIcon}></img>
            </div>
            <div className="gallery-content">
              <div className="content">
                <div className="name">Alexander</div>
                <div className="address">Copenhagen, Denmark</div>
              </div>
              <div className="rating">
                <img src={starIcon}></img>
                <img src={starIcon}></img>
                <img src={starIcon}></img>
              </div>
            </div>
          </div>
          <div className="gallery-warpper">
            <div className="gallery-position">
              <img className="gallery-img" src={gents}></img>
              <img className="heart-icon" src={heartIcon}></img>
            </div>
            <div className="gallery-content">
              <div className="content">
                <div className="name">Alexander</div>
                <div className="address">Copenhagen, Denmark</div>
              </div>
              <div className="rating">
                <img src={starIcon}></img>
                <img src={starIcon}></img>
                <img src={starIcon}></img>
              </div>
            </div>
          </div>
          <div className="gallery-warpper">
            <div className="gallery-position">
              <img className="gallery-img" src={gents}></img>
              <img className="heart-icon" src={heartIcon}></img>
            </div>
            <div className="gallery-content">
              <div className="content">
                <div className="name">Alexander</div>
                <div className="address">Copenhagen, Denmark</div>
              </div>
              <div className="rating">
                <img src={starIcon}></img>
                <img src={starIcon}></img>
                <img src={starIcon}></img>
              </div>
            </div>
          </div>
          <div className="gallery-warpper">
            <div className="gallery-position">
              <img className="gallery-img" src={gents}></img>
              <img className="heart-icon" src={heartIcon}></img>
            </div>
            <div className="gallery-content">
              <div className="content">
                <div className="name">Alexander</div>
                <div className="address">Copenhagen, Denmark</div>
              </div>
              <div className="rating">
                <img src={starIcon}></img>
                <img src={starIcon}></img>
                <img src={starIcon}></img>
              </div>
            </div>
          </div>
          <div className="gallery-warpper">
            <div className="gallery-position">
              <img className="gallery-img" src={gents}></img>
              <img className="heart-icon" src={heartIcon}></img>
            </div>
            <div className="gallery-content">
              <div className="content">
                <div className="name">Alexander</div>
                <div className="address">Copenhagen, Denmark</div>
              </div>
              <div className="rating">
                <img src={starIcon}></img>
                <img src={starIcon}></img>
                <img src={starIcon}></img>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="center">
          <div className="Join-wrapper center">
            <div>Find More</div>
          </div>
        </div>
      </section>
      <section>
        <div className="title">Our Community</div>
      </section>
      <section>
        <div className="cards">
          <div className="card-wrapper card-background">
            <div className="count">5,258,451</div>
            <div className="cards-text">Models in community</div>
          </div>
          <div className="card-wrapper  card-background">
            <div className="count">5,258,451</div>
            <div className="cards-text">Industry Professionals</div>
          </div>
          <div className="card-wrapper  card-background">
            <div className="count">5,258,451</div>
            <div className="cards-text">Agencies</div>
          </div>
        </div>
      </section>
      <section>
        <div className="title">Prioritizing Your Well-being</div>
      </section>
      <section>
        <div className="cards">
          <div className="card-wrapper ">
            <div className="card-picture center">
              <img src={checkMark}></img>
            </div>
            <div className="cards-description">
              Every professional member undergoes thorough verification by our
              team.
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card-picture center">
              <img src={lockIcon}></img>
            </div>
            <div className="cards-description">
              Cutting-edge tools designed to thwart scammers at every turn.
            </div>
          </div>
          <div className="card-wrapper">
            <div className="card-picture center">
              <img src={whiteStar}></img>
            </div>
            <div className="cards-description">
              Rely on community reviews for an extra layer of assurance.
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="title">Case studies</div>
      </section>
      <section>
        <div className="gallery-section">
          <div className="gallery-warpper">
            <img src={gents} className="case-images"></img>
            <div className="gallery-content">
              <div className="content">
                <div className="name">Lorem ipsum dolor sit</div>
                <div className="address">Copenhagen, Denmark</div>
              </div>
            </div>
          </div>
          <div className="gallery-warpper">
            <img src={gents} className="case-images"></img>
            <div className="gallery-content">
              <div className="content">
                <div className="name">Lorem ipsum dolor sit</div>
                <div className="address">Copenhagen, Denmark</div>
              </div>
            </div>
          </div>
          <div className="gallery-warpper">
            <img src={gents} className="case-images"></img>
            <div className="gallery-content">
              <div className="content">
                <div className="name">Lorem ipsum dolor sit</div>
                <div className="address">Copenhagen, Denmark</div>
              </div>
            </div>
          </div>
          <div className="gallery-warpper">
            <img src={gents} className="case-images"></img>
            <div className="gallery-content">
              <div className="content">
                <div className="name">Lorem ipsum dolor sit</div>
                <div className="address">Copenhagen, Denmark</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="center">
          <div className="Join-wrapper center">
            <div>Find More</div>
          </div>
        </div>
      </section>
      <section>
        <div
          style={{
            backgroundImage: `url(${sliderBackground})`,
          }}
          className="carousel-section"
        >
          <div className="carousel-title center">Success Stories</div>
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="carousel-wrapper">
                  <div className="box-one">
                    <div>
                      <img className="carousel-img" src={gents}></img>
                    </div>
                    <div className="box-content">
                      <div className="quote">
                        <img src={quoteIcon}></img>
                      </div>
                      <div className="carousel-description">
                        A great photographer's tool for online castings that
                        really works!
                      </div>
                      <div className="profile-section">
                        <div>
                          <img src={roundProfile}></img>
                        </div>
                        <div className="profile-content">
                          <div className="profile-name">Dorothy</div>
                          <div className="profile-info">Lorem ipsum dolor</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-one box-two">
                    <div>
                      <img className="carousel-img" src={female}></img>
                    </div>
                    <div className="box-content">
                      <div className="quote">
                        <img src={quoteIcon}></img>
                      </div>
                      <div className="carousel-description">
                        A great photographer's tool for online castings that
                        really works!
                      </div>
                      <div className="profile-section">
                        <div>
                          <img src={roundProfile}></img>
                        </div>
                        <div className="profile-content">
                          <div className="profile-name">Dorothy</div>
                          <div className="profile-info">Lorem ipsum dolor</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="carousel-wrapper">
                  <div className="box-one">
                    <div>
                      <img className="carousel-img" src={girl}></img>
                    </div>
                    <div className="box-content">
                      <div className="quote">
                        <img src={quoteIcon}></img>
                      </div>
                      <div className="carousel-description">
                        A great photographer's tool for online castings that
                        really works!
                      </div>
                      <div className="profile-section">
                        <div>
                          <img src={roundProfile}></img>
                        </div>
                        <div className="profile-content">
                          <div className="profile-name">Dorothy</div>
                          <div className="profile-info">Lorem ipsum dolor</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-one box-two">
                    <div>
                      <img className="carousel-img" src={fashion}></img>
                    </div>
                    <div className="box-content">
                      <div className="quote">
                        <img src={quoteIcon}></img>
                      </div>
                      <div className="carousel-description">
                        A great photographer's tool for online castings that
                        really works!
                      </div>
                      <div className="profile-section">
                        <div>
                          <img src={roundProfile}></img>
                        </div>
                        <div className="profile-content">
                          <div className="profile-name">Dorothy</div>
                          <div className="profile-info">Lorem ipsum dolor</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon carousel-icons"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon carousel-icons"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="title">Trusted by renowned brands</div>
      </section>
      <section>
        <div className="brands-section">
          <div>
            <img src={adidasIcon}></img>
          </div>
          <div>
            <img src={ubisoftIcon}></img>
          </div>
          <div>
            <img src={wppIcon}></img>
          </div>
          <div>
            <img src={lorealIcon}></img>
          </div>
          <div>
            <img src={joseIcon}></img>
          </div>
          <div>
            <img src={calvinIcon}></img>
          </div>
          <div>
            <img src={havasIcon}></img>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
