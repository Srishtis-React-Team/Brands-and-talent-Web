import React, { useState, useEffect, useRef } from "react";
import "../assets/css/dashboard.css";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import { NavLink } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const starIcon = require("../assets/icons/star.png");
  const whiteStar = require("../assets/icons/white_star.png");
  const checkMark = require("../assets/icons/check-circle.png");
  const lockIcon = require("../assets/icons/white-lock.png");
  const gents = require("../assets/images/gents.png");
  const girl = require("../assets/images/girl.png");
  const female = require("../assets/images/female.png");
  const fashion = require("../assets/images/fashion.png");
  const sliderBackground = require("../assets/images/slider-background.png");
  const adidasIcon = require("../assets/icons/6539fea9ad514fe89ff5d7fc_adidas.png");
  const ubisoftIcon = require("../assets/icons/6539fd74ad514fe89ff48cdd_ubisoft.png");
  const mapIcon = require("../assets/icons/map-pin.png");
  const wppIcon = require("../assets/icons/651508c575f862fac120d7b1_wpp.webp");
  const lorealIcon = require("../assets/icons/6539e8f83c874a7714db103c_Loreal 1.webp");
  const havasIcon = require("../assets/icons/6539e8f8ac5a3259e7f64ef8_Havas_logo 3.webp");
  const joseIcon = require("../assets/icons/6539e8f8fe903bed35dc07f8_jose-cuervo-logo-black-and-white 1.webp");
  const calvinIcon = require("../assets/icons/6539ea694436eb9715c9cba3_image 10.png");
  const roundProfile = require("../assets/icons/round-profile.png");
  const quoteIcon = require("../assets/icons/9044931_quotes_icon 1.png");
  const heartIcon = require("../assets/icons/heart.png");
  const chatIcon = require("../assets/icons/chat-icon.png");
  const favoruiteIcon = require("../assets/icons/favorite.png");
  const locationIcon = require("../assets/icons/locationIcon.png");
  const darkStar = require("../assets/icons/darkStar.png");
  const brightStar = require("../assets/icons/brightStar.png");
  const jobIcon = require("../assets/icons/jobIcon.png");
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

  const [artists, showArtists] = useState(true);
  const [photographers, showPhotographers] = useState(false);
  const [actors, showActors] = useState(false);
  const [influencers, setInfluencers] = useState(false);
  const [models, showModels] = useState(false);
  const [more, showMore] = useState(false);
  const [above_18, setAbove_18] = useState(false);
  const [below_18, setBelow_18] = useState(false);
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
  const [caseList, setCaseList] = useState([]);
  const [photoGraphersList, setphotoGraphersList] = useState([]);
  const [messageFromHeader, setMessageFromHeader] = useState("");
  const [hideAll, setHideAll] = useState(false);

  function userType(e) {
    if (e == "above_18") {
      setAbove_18(true);
    } else {
      setAbove_18(false);
    }
    if (e == "below_18") {
      setBelow_18(true);
    } else {
      setBelow_18(false);
    }
  }

  useEffect(() => {
    setTalentList([
      {
        id: 1,
        photo: girl1,
        name: "Alexander",
        address: "Copenhagen, Denmark",
        isFavorite: false,
        location: "Australia",
        booked: "3 Jobs Booked",
        rating: 4,
      },
      {
        id: 2,
        photo: girl2,
        name: "william",
        address: "Copenhagen, Denmark",
        location: "America",
        booked: "3 Jobs Booked",
        isFavorite: false,
        rating: 3,
      },
      {
        id: 3,
        photo: girl3,
        name: "Michael",
        address: "Pitsburg, Canada",
        location: "Canada",
        booked: "6 Jobs Booked",
        isFavorite: false,
        rating: 5,
      },
      {
        id: 4,
        photo: girl4,
        name: "Andrea",
        address: "North Carolina, USA",
        isFavorite: false,
        location: "Russia",
        booked: "150 Jobs Booked",
        rating: 1,
      },
      {
        id: 5,
        photo: girl5,
        name: "Alexa",
        address: "South Carolina, USA",
        isFavorite: false,
        location: "China",
        booked: "8 Jobs Booked",
        rating: 1,
      },
      {
        id: 6,
        photo: girl5,
        name: "Alexa",
        address: "South Carolina, USA",
        isFavorite: false,
        location: "China",
        booked: "8 Jobs Booked",
        rating: 1,
      },
      {
        id: 7,
        photo: girl5,
        name: "Alexa",
        address: "South Carolina, USA",
        isFavorite: false,
        location: "China",
        booked: "8 Jobs Booked",
        rating: 1,
      },
      {
        id: 8,
        photo: girl5,
        name: "Alexa",
        address: "South Carolina, USA",
        isFavorite: false,
        location: "China",
        booked: "8 Jobs Booked",
        rating: 1,
      },
      {
        id: 9,
        photo: girl5,
        name: "Alexa",
        address: "South Carolina, USA",
        isFavorite: false,
        location: "China",
        booked: "8 Jobs Booked",
        rating: 1,
      },
      {
        id: 10,
        photo: girl5,
        name: "Alexa",
        address: "South Carolina, USA",
        isFavorite: false,
        location: "China",
        booked: "8 Jobs Booked",
        rating: 1,
      },
      {
        id: 11,
        photo: girl5,
        name: "Alexa",
        address: "South Carolina, USA",
        isFavorite: false,
        location: "China",
        booked: "8 Jobs Booked",
        rating: 1,
      },
      {
        id: 12,
        photo: girl5,
        name: "Alexa",
        address: "South Carolina, USA",
        isFavorite: false,
        location: "China",
        booked: "8 Jobs Booked",
        rating: 1,
      },
    ]);
    setCaseList([
      {
        id: 1,
        photo: girl1,
        name: "Alexander",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        isFavorite: false,
        location: "Australia",
        booked: "3 Jobs Booked",
        rating: 4,
      },
      {
        id: 2,
        photo: girl2,
        name: "william",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        location: "America",
        booked: "3 Jobs Booked",
        isFavorite: false,
        rating: 3,
      },
      {
        id: 3,
        photo: girl3,
        name: "Michael",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        location: "Canada",
        booked: "6 Jobs Booked",
        isFavorite: false,
        rating: 5,
      },
      {
        id: 4,
        photo: girl4,
        name: "Andrea",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        isFavorite: false,
        location: "Russia",
        booked: "150 Jobs Booked",
        rating: 1,
      },
    ]);
    setphotoGraphersList([
      {
        id: 1,
        photo: girl6,
        name: "Alexander",
        address: "Copenhagen, Denmark",
        location: "China",
        booked: "8 Jobs Booked",
        isFavorite: false,
        rating: 4,
      },
      {
        id: 2,
        photo: girl7,
        name: "william",
        address: "Copenhagen, Denmark",
        isFavorite: false,
        location: "China",
        booked: "8 Jobs Booked",
        rating: 3,
      },
      {
        id: 3,
        photo: girl8,
        name: "Michael",
        address: "Pitsburg, Canada",
        isFavorite: false,
        location: "China",
        booked: "8 Jobs Booked",
        rating: 5,
      },
      {
        id: 4,
        photo: girl9,
        name: "Andrea",
        address: "North Carolina, USA",
        isFavorite: false,
        location: "China",
        booked: "8 Jobs Booked",
        rating: 1,
      },
      {
        id: 5,
        photo: girl10,
        name: "Alexa",
        address: "South Carolina, USA",
        isFavorite: false,
        location: "China",
        booked: "8 Jobs Booked",
        rating: 1,
      },
      // {
      //   id: 6,
      //   photo: girl10,
      //   name: "Alexa",
      //   address: "South Carolina, USA",
      //   isFavorite: false,
      //   location: "China",
      //   booked: "8 Jobs Booked",
      //   rating: 1,
      // },
      // {
      //   id: 7,
      //   photo: girl10,
      //   name: "Alexa",
      //   address: "South Carolina, USA",
      //   isFavorite: false,
      //   location: "China",
      //   booked: "8 Jobs Booked",
      //   rating: 1,
      // },
      // {
      //   id: 8,
      //   photo: girl10,
      //   name: "Alexa",
      //   address: "South Carolina, USA",
      //   isFavorite: false,
      //   location: "China",
      //   booked: "8 Jobs Booked",
      //   rating: 1,
      // },
      // {
      //   id: 9,
      //   photo: girl10,
      //   name: "Alexa",
      //   address: "South Carolina, USA",
      //   isFavorite: false,
      //   location: "China",
      //   booked: "8 Jobs Booked",
      //   rating: 1,
      // },
      // {
      //   id: 10,
      //   photo: girl10,
      //   name: "Alexa",
      //   address: "South Carolina, USA",
      //   isFavorite: false,
      //   location: "China",
      //   booked: "8 Jobs Booked",
      //   rating: 1,
      // },
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

  const handleMessageFromHeader = (message) => {
    console.log(message, "message from header");
    if (message === "open-kids-form") {
      openModal();
    }
    if (message.menuStatus === false) {
      setHideAll(true);
    }
    setMessageFromHeader(message);
  };

  const modalRef = useRef(null);
  const openModal = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  return (
    <>
      <div className="dashboard-main">
        <Header sendMessageToParent={handleMessageFromHeader} />

        <section className="section-1">
          <div className="container">
            <div className="row banner-content">
              <div className="col-lg-12">
                <div className="brand-section flex-column banner-title-section">
                  <p className="brand-title">
                    <span>C</span>onnecting <span>B</span>rands and{" "}
                    <span>T</span>
                    alent
                  </p>
                  <p className="brand-description">
                    No Middle Man. No Commisions. No Hidden Fees
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="brand-section">
                  <div className="join-talent-section">
                    <div className="section-title">Get Booked</div>
                    <div className="section-description">
                      Get discovered by top brands, set your own rates, and keep
                      100% of your earnings. Chat directly with brands you love
                      and build lasting relationships. We put creators first.
                      Sign up today and start earning!
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="brand-options">
                  <div className="hire-talent-section">
                    <div className="section-title">Hire Talent</div>
                    <div className="section-description brand-secription">
                      Skip the search, skip the stress. Hire dream talent in
                      minutes.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="brand-section">
                  <div className="join-talent-section">
                    <div
                      className="Join-wrapper center"
                      data-bs-toggle="modal"
                      data-bs-target="#verify_age"
                    >
                      <div className="joinnow-text">Join Now</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="brand-options">
                  <div className="hire-talent-section">
                    <div
                      className="hire-wrapper center"
                      onClick={(e) => {
                        navigate("/signup", {
                          state: { signupCategory: "brand" },
                        });
                      }}
                    >
                      <div className="joinnow-text">Hire Now</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <div className="section-1">
          <div className="brand-section"></div>
          <div className="brand-options"></div>
        </div> */}

        <div className="container">
          <div className="tabs-section">
            <div className="title">Popular Talents</div>
            <div className="tabs">
              <div
                className={artists ? "active-tab" : null}
                onClick={(e) => {
                  handleTabs("artists");
                }}
              >
                Featured
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
                className={more ? "active-tab more-text" : "more-text"}
                onClick={(e) => {
                  handleTabs("more");
                }}
              >
                More
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="gallery-section">
            <div className="gallery-main">
              {talentList.map((item) => {
                return (
                  <div className="gallery-warpper">
                    <div className="gallery-position">
                      <img className="gallery-img" src={item.photo}></img>
                      <div className="rating">
                        <img src={brightStar}></img>
                        <img src={brightStar}></img>
                        <img src={brightStar}></img>
                        <img src={darkStar}></img>
                        <img src={darkStar}></img>
                      </div>
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
                        <div className="user-details">
                          <div className="location-wrapper">
                            <img src={locationIcon} alt="" />
                            <div className="location-name">{item.location}</div>
                          </div>
                          <div className="location-wrapper">
                            <img src={jobIcon} alt="" />
                            <div className="location-name">{item.booked}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="center">
          <div className="Join-wrapper center">
            <div>Find More</div>
          </div>
        </div>

        <div className="title">Our Community</div>

        <div className="container">
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
        </div>

        <div className="title">Products and Services</div>

        <div className="container">
          <div className="cards">
            <div className="card-wrapper ">
              <div className="card-picture">
                <img src={checkMark}></img>
              </div>
              <div className="card-title">Talent Marketplace</div>
              <div className="cards-description">
                A platform where talents can create a profile, showcase their
                work, and connect with...
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
                Talent can  build and manage their personal brands and will have
                a unique url ...
              </div>
            </div>
          </div>
        </div>

        <div className="title">Case studies</div>

        <div className="container">
          <div className="gallery-section">
            <div className="gallery-main">
              {caseList.map((item) => {
                return (
                  <div className="case-warpper">
                    <div className="gallery-position">
                      <img className="case-img" src={item.photo}></img>
                    </div>
                    <div className="gallery-content">
                      <div className="content">
                        <div className="name">{item.name}</div>
                        <div className="address">{item.address}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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

        <div className="title brands-row-title">Trusted by renowned brands</div>

        <div className="container">
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
        </div>

        <Footer />
      </div>
      <div className="chat-section"></div>
      <div className="chatbot-icon">
        <img src={chatIcon} alt="" />
      </div>
    </>
  );
};

export default Dashboard;
