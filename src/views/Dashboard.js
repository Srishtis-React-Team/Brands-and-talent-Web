import React, { useState } from "react";
import "../assets/css/dashboard.css";
import { NavLink } from "react-router-dom";
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
      <div className="mobile-navbar">
        <div className="icon">
          <img className="btLogo" src={btLogo}></img>
        </div>
        <div
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className="menu-icon"
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <div className={menuOpen ? "mobile-nav-content" : "hide-nav"}>
        <div className="login-text">Login</div>
        <div
          className="signup"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Sign up
        </div>
      </div>

      <div className="header">
        <div className="icon">
          <img src={btLogo}></img>
        </div>
        <div className="menu-items">
          <div>
            <NavLink to="/">Home</NavLink>
          </div>
          <div>
            <NavLink to="/find-creators">Find Creators</NavLink>
          </div>
          <div>Get Booked</div>
          <div>Pricing</div>
          <div>Learn</div>
        </div>
        <div className="header-functions">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </div>
          <div className="login-text">Login</div>
          <div
            className="signup"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Sign up
          </div>
          <div className="gridLogo">
            <img src={gridLogo}></img>
          </div>
        </div>
      </div>
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
      <section className="main-form">
        <div
          className="form-section"
          style={{
            backgroundImage: `url(${fieldsBackground})`,
          }}
        >
          <div className="form-title">Get Discovered</div>
          <div className="form-fields">
            <input
              className="input-style form-control"
              placeholder="First Name"
            ></input>
            <input
              className="input-style form-control"
              placeholder="Email Address"
            ></input>
            <div className="subscribe-btn">Subscribe Now</div>
          </div>
        </div>
      </section>
      <section>
        <div className="footer-section">
          <div className="footer-wrapper">
            <div className="footer-icon">
              <img src={btLogo}></img>
            </div>
            <div className="company-info">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              placerat dapibus sapien, pellentesque elementum dolor finibus sed.
            </div>
            <div className="social-medias">
              <img src={socialIcons}></img>
            </div>
          </div>
          <div className="footer-wrapper">
            <div className="footer-title">Company</div>
            <div>Home</div>
            <div>Find Creators</div>
            <div>Pricing</div>
            <div>Learn</div>
          </div>
          <div className="footer-wrapper">
            <div className="footer-title">Help</div>
            <div>Customer Support</div>
            <div>Help & FAQ</div>
            <div>Terms & Conditions</div>
            <div>Pricing</div>
          </div>
          <div className="footer-wrapper">
            <div className="footer-title">Resources</div>
            <div>Featured Lists</div>
            <div>New Faces</div>
            <div>How to - Blog</div>
            <div>Youtube Playlist</div>
          </div>
        </div>
      </section>
      <section>
        <div className="copyright-section">
          <div>© Copyright 2023 Brandsandtalent All Right Reserved.</div>
        </div>
      </section>
      <section>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          {formOne_visibility && (
            <div className="modal-dialog modal-wrapper MODAL ONE">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body modal-content ">
                  <div className="modal-title">Welcome</div>
                  <div className="modal-description">
                    Welcome to our vibrant community! To tailor your experience,
                    we'd love to know more about you.
                  </div>
                  <div className="modal-buttons">
                    <div className="model-btn">I'm a Model</div>
                    <div className="seeker-btn">I'm a Model Seeker</div>
                  </div>
                  <div className="question-model">
                    Are you the star of the show or the one seeking brilliance?
                  </div>
                  <div className="register-modal">
                    <div
                      className="register-btn"
                      onClick={(e) => {
                        handleForms("form-one");
                      }}
                    >
                      Register Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {formTwo_visibility && (
            <div className="modal-dialog modal-wrapper">
              <div className="modal-content">
                <div className="modal-header header-wrapper">
                  <img className="modal-logo" src={btLogo}></img>
                  <div className="step-text">Step 1 of 4</div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body modal-content ">
                  <div className="step-title">Which one are you?</div>
                  <div className="step-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                  <div className="step-selection">
                    <div className="select-wrapper">
                      <input type="checkbox"></input>
                      <div className="select-text"> Aspiring model</div>
                    </div>
                    <div className="select-wrapper">
                      <input type="checkbox"></input>
                      <div className="select-text"> Professional model</div>
                    </div>
                    <div className="select-wrapper">
                      <input type="checkbox"></input>
                      <div className="select-text">
                        {" "}
                        Talent (Actor, dancer, musician, sports person, etc)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="step-back">
                    Back
                  </button>
                  <button
                    type="button"
                    className="step-continue"
                    onClick={(e) => {
                      handleForms("form-two");
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
          {formThree_visibility && (
            <div className="modal-dialog modal-wrapper MODAL THREE">
              <div className="modal-content">
                <div className="modal-header header-wrapper">
                  <img className="modal-logo" src={btLogo}></img>
                  <div className="step-text">Step 2 of 4</div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body modal-content ">
                  <div className="step-title">Personal Details</div>
                  <div className="step-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                  <div className="step2-selection">
                    <div className="step-section-1">
                      <input
                        type="text"
                        placeholderTextColor="#202020"
                        placeholder="Room Name"
                        className=" form-control step-input"
                      />
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option selected>Gender</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option selected>Nationality</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="step-section-2">
                      <input
                        className="form-control"
                        placeholder="Date of birth"
                      ></input>
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option selected>Height</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option selected>Ethnicity</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={(e) => {
                      handleForms("form-one");
                    }}
                    className="step-back"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="step-continue"
                    onClick={(e) => {
                      handleForms("form-three");
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {formFour_visibility && (
            <div className="modal-dialog modal-wrapper MODAL FOUR">
              <div className="modal-content">
                <div className="modal-header header-wrapper">
                  <img className="modal-logo" src={btLogo}></img>
                  <div className="step-text">Step 3 of 4</div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body modal-content ">
                  <div className="step-title">Contact Details</div>
                  <div className="step-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                  <div className="step2-selection">
                    <div className="step-section-1">
                      <input
                        className="form-control step-input"
                        placeholder="Phone"
                      ></input>
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option selected>Country</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="step-section-2">
                      <input
                        className="form-control"
                        placeholder="Email"
                      ></input>
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option selected>City</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={(e) => {
                      handleForms("form-two");
                    }}
                    className="step-back"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="step-continue"
                    onClick={(e) => {
                      handleForms("form-four");
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {formFive_visibility && (
            <div className="modal-dialog modal-wrapper MODAL FIVE">
              <div className="modal-content">
                <div className="modal-header header-wrapper">
                  <img className="modal-logo" src={btLogo}></img>
                  <div className="step-text">Step 4 of 4</div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body modal-content ">
                  <div className="step-title">Only one more thing to do</div>
                  <div className="step-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                  <div className="step-selection upload-step">
                    <div className="upload-wrapper">
                      <img src={uploadIcon}></img>
                      <div className="upload-text"> Professional model</div>
                    </div>
                    <div className="import-wrapper">
                      <img src={importIcon}></img>
                      <div className="import-text"> Professional model</div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={(e) => {
                      handleForms("form-three");
                    }}
                    className="step-back"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="step-continue"
                    onClick={(e) => {
                      handleForms("form-five");
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
