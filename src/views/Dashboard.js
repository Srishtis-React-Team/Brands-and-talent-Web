import React, { useState, useEffect } from "react";
import "../assets/css/dashboard.css";
import Header from "./header";
import Footer from "./Footer";
import { useNavigate } from "react-router";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
const Dashboard = () => {
  const navigate = useNavigate();

  const uploadIcon = require("../assets/icons/upload.png");
  const importIcon = require("../assets/icons/instagram.png");
  const btLogo = require("../assets/icons/Group 56.png");
  const searchLogo = require("../assets/icons/search (1).png");
  const starIcon = require("../assets/icons/star.png");
  const whiteStar = require("../assets/icons/white_star.png");
  const checkMark = require("../assets/icons/check-circle.png");
  const lockIcon = require("../assets/icons/lock.png");
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
  const favoruiteIcon = require("../assets/icons/favorite.png");
  const girl1 = require("../assets/images/girl1.png");
  const girl2 = require("../assets/images/girl2.png");
  const girl3 = require("../assets/images/girl3.png");
  const girl4 = require("../assets/images/girl4.jpg");
  const girl5 = require("../assets/images/girl5.png");
  const girl6 = require("../assets/images/girl6.png");
  const girl7 = require("../assets/images/girl7.png");
  const girl8 = require("../assets/images/girl8.png");
  const girl9 = require("../assets/images/girl9.png");
  const girl10 = require("../assets/images/girl10.png");
  const model1 = require("../assets/images/model1.png");
  const model2 = require("../assets/images/model2.png");
  const model3 = require("../assets/images/model3.png");
  const model4 = require("../assets/images/model4.png");
  const model5 = require("../assets/images/model5.png");

  const [artists, showArtists] = useState(true);
  const [photographers, showPhotographers] = useState(false);
  const [actors, showActors] = useState(false);
  const [influencers, setInfluencers] = useState(false);
  const [models, showModels] = useState(false);
  const [more, showMore] = useState(false);

  const [formOne_visibility, showFormOne] = useState(true);
  const [formTwo_visibility, showFormTwo] = useState(false);
  const [formThree_visibility, showForThree] = useState(false);
  const [formFour_visibility, showFormFour] = useState(false);
  const [formFive_visibility, showFormFive] = useState(false);
  const [model, setModel] = useState(true);
  const [seeker, setSeeker] = useState(false);
  const [dob, setDOB] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGenders] = useState("");
  const [genderList, setGenderList] = useState([]);
  const [talentList, setTalentList] = useState([]);
  const [photoGraphersList, setphotoGraphersList] = useState([]);
  useEffect(() => {
    setTalentList([
      {
        id: 1,
        photo: girl1,
        name: "Alexander",
        address: "Copenhagen, Denmark",
        isFavorite: false,
        rating: 4,
      },
      {
        id: 2,
        photo: girl2,
        name: "william",
        address: "Copenhagen, Denmark",
        isFavorite: false,
        rating: 3,
      },
      {
        id: 3,
        photo: girl3,
        name: "Michael",
        address: "Pitsburg, Canada",
        isFavorite: false,
        rating: 5,
      },
      {
        id: 4,
        photo: girl4,
        name: "Andrea",
        address: "North Carolina, USA",
        isFavorite: false,
        rating: 1,
      },
      {
        id: 5,
        photo: girl5,
        name: "Alexa",
        address: "South Carolina, USA",
        isFavorite: false,
        rating: 1,
      },
    ]);
    setphotoGraphersList([
      {
        id: 1,
        photo: girl6,
        name: "Alexander",
        address: "Copenhagen, Denmark",
        isFavorite: false,
        rating: 4,
      },
      {
        id: 2,
        photo: girl7,
        name: "william",
        address: "Copenhagen, Denmark",
        isFavorite: false,
        rating: 3,
      },
      {
        id: 3,
        photo: girl8,
        name: "Michael",
        address: "Pitsburg, Canada",
        isFavorite: false,
        rating: 5,
      },
      {
        id: 4,
        photo: girl9,
        name: "Andrea",
        address: "North Carolina, USA",
        isFavorite: false,
        rating: 1,
      },
      {
        id: 5,
        photo: girl10,
        name: "Alexa",
        address: "South Carolina, USA",
        isFavorite: false,
        rating: 1,
      },
    ]);
    getDemo();
  }, []);

  const getDemo = async () => {
    await ApiHelper.post(API.getDemo)
      .then((resData) => {
        console.log("getDemo", resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to top on link click
  };

  const addFavorite = (item) => {
    console.log(item, "item");
    const modifiedTalents = talentList.map((obj) => {
      console.log(obj, "obj");
      if (obj.id === item.id) {
        return { ...obj, isFavorite: true };
      }
      return obj;
    });
    setTalentList(modifiedTalents);
    console.log(modifiedTalents, "modifiedTalents");
  };

  const removeFavorite = (item) => {
    console.log(item, "item");
    const modifiedTalents = talentList.map((obj) => {
      console.log(obj, "obj");
      if (obj.id === item.id) {
        return { ...obj, isFavorite: false };
      }
      return obj;
    });
    setTalentList(modifiedTalents);
    console.log(modifiedTalents, "modifiedTalents");
  };

  useEffect(() => {
    setGenderList(["Male", "Female"]);
  }, []);

  const handleSelectChange = (event) => {
    setGenders(event.target.value);
    const selectedName = event.target.options[event.target.selectedIndex].text;
    // setRoomType(selectedName);
  };

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
    if (e == "model") {
      setModel(true);
    } else {
      setModel(false);
    }
    if (e == "seeker") {
      setSeeker(true);
    } else {
      setSeeker(false);
    }
  }

  function handleTabs(e) {
    if (e == "artists") {
      showArtists(true);
    } else {
      showArtists(false);
    }
    if (e == "photographers") {
      showPhotographers(true);
    } else {
      showPhotographers(false);
    }
    if (e == "actors") {
      showActors(true);
    } else {
      showActors(false);
    }
    if (e == "influencers") {
      setInfluencers(true);
    } else {
      setInfluencers(false);
    }
    if (e == "models") {
      showModels(true);
    } else {
      showModels(false);
    }
    if (e == "more") {
      showMore(true);
    } else {
      showMore(false);
    }
  }

  return (
    <>
      <Header />
      <div className="section-1">
        <div className="find-work">
          <div className="section-title">Find Jobs</div>
          <div className="section-description">
            Talent can  build and manage their personal brands and will have a
            unique url like linkedin that they can share as thier portfolio...
          </div>
          <div className="Join-wrapper center">
            <div
              className="joinnow-btn"
              // onClick={() => {
              //   navigate("/signup");
              // }}
            >
              Join Now
            </div>
          </div>
        </div>
        <div className="find-work">
          <div className="section-title">Hire Talent</div>
          <div className="section-description">
            The platform will help brands find, attract, and hire the best
            talent as per their budget and requirement in less than 5 minutes.
          </div>
          <div className="white-joinnow center">
            <div
              className="joinnow-btn"
              // onClick={() => {
              //   navigate("/signup");
              // }}
            >
              Join Now
            </div>
          </div>
        </div>
      </div>
      <div className="tabs-section">
        <div className="title">Popular Talents</div>
        <div className="tabs">
          <div
            className={artists ? "active-tab" : null}
            onClick={(e) => {
              handleTabs("artists");
            }}
          >
            Artists
          </div>
          <div
            className={photographers ? "active-tab" : null}
            onClick={(e) => {
              handleTabs("photographers");
            }}
          >
            Photographers
          </div>
          <div
            className={actors ? "active-tab" : null}
            onClick={(e) => {
              handleTabs("actors");
            }}
          >
            Actors
          </div>
          <div
            className={influencers ? "active-tab" : null}
            onClick={(e) => {
              handleTabs("influencers");
            }}
          >
            Influencers
          </div>
          <div
            className={models ? "active-tab" : null}
            onClick={(e) => {
              handleTabs("models");
            }}
          >
            Models
          </div>
          <div
            className={more ? "active-tab" : null}
            onClick={(e) => {
              handleTabs("more");
            }}
          >
            More
          </div>
        </div>
      </div>

      {artists && (
        <div className="gallery-section">
          {talentList.map((item) => {
            return (
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={item.photo}></img>
                  {!item.isFavorite && (
                    <img
                      className="heart-icon"
                      src={heartIcon}
                      onClick={() => addFavorite(item)}
                    ></img>
                  )}
                  {item.isFavorite === true && (
                    <img
                      className="heart-icon"
                      src={favoruiteIcon}
                      onClick={() => removeFavorite(item)}
                    ></img>
                  )}
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">{item.name}</div>
                    <div className="address">{item.address}</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {photographers && (
        <div className="gallery-section">
          {photoGraphersList.map((item) => {
            return (
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={item.photo}></img>
                  {!item.isFavorite && (
                    <img
                      className="heart-icon"
                      src={heartIcon}
                      onClick={() => addFavorite(item)}
                    ></img>
                  )}
                  {item.isFavorite === true && (
                    <img
                      className="heart-icon"
                      src={favoruiteIcon}
                      onClick={() => removeFavorite(item)}
                    ></img>
                  )}
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">{item.name}</div>
                    <div className="address">{item.address}</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {actors && (
        <div className="gallery-section">
          {talentList.map((item) => {
            return (
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={item.photo}></img>
                  {!item.isFavorite && (
                    <img
                      className="heart-icon"
                      src={heartIcon}
                      onClick={() => addFavorite(item)}
                    ></img>
                  )}
                  {item.isFavorite === true && (
                    <img
                      className="heart-icon"
                      src={favoruiteIcon}
                      onClick={() => removeFavorite(item)}
                    ></img>
                  )}
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">{item.name}</div>
                    <div className="address">{item.address}</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {influencers && (
        <div className="gallery-section">
          {talentList.map((item) => {
            return (
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={item.photo}></img>
                  {!item.isFavorite && (
                    <img
                      className="heart-icon"
                      src={heartIcon}
                      onClick={() => addFavorite(item)}
                    ></img>
                  )}
                  {item.isFavorite === true && (
                    <img
                      className="heart-icon"
                      src={favoruiteIcon}
                      onClick={() => removeFavorite(item)}
                    ></img>
                  )}
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">{item.name}</div>
                    <div className="address">{item.address}</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {models && (
        <div className="gallery-section">
          {talentList.map((item) => {
            return (
              <div className="gallery-warpper">
                <div className="gallery-position">
                  <img className="gallery-img" src={item.photo}></img>
                  {!item.isFavorite && (
                    <img
                      className="heart-icon"
                      src={heartIcon}
                      onClick={() => addFavorite(item)}
                    ></img>
                  )}
                  {item.isFavorite === true && (
                    <img
                      className="heart-icon"
                      src={favoruiteIcon}
                      onClick={() => removeFavorite(item)}
                    ></img>
                  )}
                </div>
                <div className="gallery-content">
                  <div className="content">
                    <div className="name">{item.name}</div>
                    <div className="address">{item.address}</div>
                  </div>
                  <div className="rating">
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                    <img src={starIcon}></img>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="center">
        <div className="Join-wrapper center">
          <div>Find More</div>
        </div>
      </div>
      <div className="title">Our Community</div>
      <div className="cards">
        <div className="community-card-wrapper card-background">
          <div className="count">5,258,451</div>
          <div className="cards-text">Models in community</div>
        </div>
        <div className="community-card-wrapper  card-background">
          <div className="count">5,258,451</div>
          <div className="cards-text">Industry Professionals</div>
        </div>
        <div className="community-card-wrapper  card-background">
          <div className="count">5,258,451</div>
          <div className="cards-text">Agencies</div>
        </div>
      </div>
      <div className="title">Products and Services</div>
      <div className="cards">
        <div className="card-wrapper ">
          <div className="card-picture">
            <img src={checkMark}></img>
          </div>
          <div className="card-title">Talent Marketplace</div>
          <div className="cards-description">
            A platform where talents can create a profile, showcase their work,
            and connect with...
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card-picture">
            <img src={lockIcon}></img>
          </div>
          <div className="card-title">Hire Talent</div>
          <div className="cards-description">
            The platform will help brands find, attract, and hire the best
            talent as per their ...
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card-picture">
            <img src={whiteStar}></img>
          </div>
          <div className="card-title">Find Jobs</div>
          <div className="cards-description">
            Talent can  build and manage their personal brands and will have a
            unique url ...
          </div>
        </div>
      </div>
      <div className="title">Case studies</div>
      <div className="gallery-section">
        {talentList.map((item) => {
          return (
            <div className="gallery-warpper">
              <div className="gallery-position">
                <img className="gallery-img" src={item.photo}></img>
                {!item.isFavorite && (
                  <img
                    className="heart-icon"
                    src={heartIcon}
                    onClick={() => addFavorite(item)}
                  ></img>
                )}
                {item.isFavorite === true && (
                  <img
                    className="heart-icon"
                    src={favoruiteIcon}
                    onClick={() => removeFavorite(item)}
                  ></img>
                )}
              </div>
              <div className="gallery-content">
                <div className="content">
                  <div className="name">{item.name}</div>
                  <div className="address">{item.address}</div>
                </div>
                <div className="rating">
                  <img src={starIcon}></img>
                  <img src={starIcon}></img>
                  <img src={starIcon}></img>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="center">
        <div className="Join-wrapper center">
          <div>Find More</div>
        </div>
      </div>
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
      <div className="title">Trusted by renowned brands</div>
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
      <Footer />
      {/* <ChatBot /> */}

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
                  <div
                    onClick={(e) => {
                      handleForms("model");
                    }}
                    className={model ? "selected-register" : "choose-register"}
                  >
                    I'm a Talent
                  </div>
                  <div
                    onClick={(e) => {
                      handleForms("seeker");
                    }}
                    className={seeker ? "selected-register" : "choose-register"}
                  >
                    I'm a Talent Seeker
                  </div>
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
                    <input type="checkbox" id="aspiring"></input>
                    <label htmlFor="aspiring" className="select-text">
                      Aspiring Talent
                    </label>
                  </div>
                  <div className="select-wrapper">
                    <input type="checkbox" id="professional"></input>
                    <label htmlFor="professional" className="select-text">
                      Professional Talent
                    </label>
                  </div>
                  <div className="select-wrapper">
                    <input type="checkbox" id="other-talent"></input>
                    <label htmlFor="other-talent" className="select-text">
                      Talent (Actor, dancer, musician, sports person, etc)
                    </label>
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
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                      className=" form-control step-input"
                    />
                    <select
                      onChange={handleSelectChange}
                      value={gender}
                      id="disabledSelect"
                      className="form-select step-select"
                      placeholder="Gender"
                    >
                      {genderList.map((item) => {
                        return <option value={item}>{item}</option>;
                      })}
                    </select>
                    <select
                      onChange={handleSelectChange}
                      value={gender}
                      id="disabledSelect"
                      className="form-select step-select"
                      placeholder="Nationality"
                    >
                      {genderList.map((item) => {
                        return <option value={item}>{item}</option>;
                      })}
                    </select>
                  </div>
                  <div className="step-section-2">
                    <input
                      className="form-control"
                      placeholder="Date of birth"
                      value={dob}
                      onChange={(e) => {
                        setDOB(e.target.value);
                      }}
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
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
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
                    <input className="form-control" placeholder="Email"></input>
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
                    <div className="upload-text"> Professional Talent</div>
                  </div>
                  <div className="import-wrapper">
                    <img src={importIcon}></img>
                    <div className="import-text"> Professional Talent</div>
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
    </>
  );
};

export default Dashboard;
