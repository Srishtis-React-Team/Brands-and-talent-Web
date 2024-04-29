import React, { useState, useEffect, useRef } from "react";
import "../assets/css/dashboard.css";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import { useNavigate } from "react-router";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { NavLink } from "react-router-dom";
import ChatBot from "../components/ChatBot";
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
  const americanExpress = require("../assets/icons/American-Express-Color.png");
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
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [All, showAll] = useState(true);
  const [featuredMembers, setFeaturedMembers] = useState(false);
  const [Actor, showActor] = useState(false);
  const [Model, showModel] = useState(false);
  const [influencers, setInfluencers] = useState(false);
  const [Director, showDirector] = useState(false);
  const [Singer, showSinger] = useState(false);
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
  const [talentsList, setTalentsList] = useState([]);
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

  const getByProfession = async (e) => {
    let formData = {
      type: e,
    };
    await ApiHelper.post(API.getByProfession, formData)
      .then((resData) => {
        if (resData) {
          setTalentsList(resData.data.data);
        }
      })
      .catch((err) => {});
  };
  const getTalentList = async () => {
    await ApiHelper.get(API.getTalentList)
      .then((resData) => {
        if (resData) {
          console.log(resData, "resData");
          setTalentsList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getTalentList();
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

  const addFavorite = async (data) => {
    const formData = {
      type: data?.type,
    };
    await ApiHelper.post(`${API.setUserFavorite}${data._id}`, formData)
      .then((resData) => {
        if (resData.status === false) {
        }
        setMessage("You Need To Register First");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {});
  };

  const removeFavorite = (item) => {
    console.log(item, "item");
    const modifiedTalents = talentList?.map((obj) => {
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
    if (e === "All") {
      getTalentList();
      showAll(true);
    } else {
      showAll(false);
    }
    if (e !== "All") {
      getByProfession(e);
    }
    if (e == "more") {
      navigate(`/find-creators`);
    }
    if (e == "Actor") {
      showActor(true);
    } else {
      showActor(false);
    }
    if (e == "Model") {
      showModel(true);
    } else {
      showModel(false);
    }
    if (e == "featured-members") {
      setFeaturedMembers(true);
    } else {
      setFeaturedMembers(false);
    }
    if (e == "Actor") {
      showActor(true);
    } else {
      showActor(false);
    }
    if (e == "Director") {
      showDirector(true);
    } else {
      showDirector(false);
    }
    if (e == "Singer") {
      showSinger(true);
    } else {
      showSinger(false);
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
          <div className="container-fluid">
            <div className="row banner-content">
              <div className="col-lg-12">
                <div className="brand-section flex-column banner-title-section">
                  <p className="brand-title">
                    <span>C</span>onnecting <span>B</span>rands and
                    <span>T</span>
                    alent
                  </p>
                  <p className="brand-description">
                    No Middlemen. No Commission. No Hidden Fees
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="brand-options">
                  <div className="section-title">Get Booked</div>
                  <div className="section-description brand-secription">
                    Get discovered by top brands, set your own rates, and keep
                    100% of your earnings. Chat directly with brands you love
                    and build lasting relationships. We put creators first. Sign
                    up today and start earning!
                  </div>
                  <div
                    className="Join-now-wrapper"
                    data-bs-toggle="modal"
                    data-bs-target="#verify_age"
                  >
                    <div className="joinnow-text">Join Now</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="brand-options">
                  <div className="section-title">Hire Talent</div>
                  <div className="section-description brand-secription">
                    Skip the search, skip the stress. Hire dream talent in
                    minutes.
                  </div>

                  <div
                    className="Join-now-wrapper"
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
        </section>

        {/* <div className="section-1">
          <div className="brand-section"></div>
          <div className="brand-options"></div>
        </div> */}

        <div className="container-fluid">
          <div className="tabs-section">
            <div className="title">Popular Talent</div>
            {/* <div className="tabs">
              <div
                className={All ? "active-tab" : null}
                onClick={(e) => {
                  handleTabs("All");
                }}
              >
                All Talents
              </div>
              <div
                className={featuredMembers ? "active-tab" : null}
                onClick={(e) => {
                  handleTabs("featured-members");
                }}
              >
                Featured Members
              </div>
              <div
                className={Actor ? "active-tab" : null}
                onClick={(e) => {
                  handleTabs("Actor");
                }}
              >
                Actor
              </div>
              <div
                className={Director ? "active-tab" : null}
                onClick={(e) => {
                  handleTabs("Director");
                }}
              >
                Director
              </div>
              <div
                className={Singer ? "active-tab" : null}
                onClick={(e) => {
                  handleTabs("Singer");
                }}
              >
                Singer
              </div>
              <div
                className={Model ? "active-tab" : null}
                onClick={(e) => {
                  handleTabs("Model");
                }}
              >
                Model
              </div>
              <div
                className="more-text"
                onClick={(e) => {
                  handleTabs("more");
                }}
              >
                More
              </div>
            </div> */}
          </div>
        </div>

        <div className="container-fluid">
          <div className="gallery-section">
            <div className="gallery-main">
              {talentsList?.map((item) => {
                return (
                  <div className="gallery-wrapper">
                    <div className="gallery-top">
                      <img
                        className="gallery-img"
                        src={`${API.userFilePath}${item.image?.fileData}`}
                      ></img>
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
                        <div className="name">
                          {item?.preferredChildFirstname
                            ? `${item?.preferredChildFirstname}`
                            : "Elizabeth"}
                        </div>
                        <div className="address">
                          {item.profession?.map((profession, index) => (
                            <React.Fragment key={index}>
                              {profession.value}
                              {index !== item.profession.length - 1 && ","}
                            </React.Fragment>
                          ))}
                        </div>
                        <div className="user-details">
                          <div className="location-wrapper">
                            <img src={locationIcon} alt="" />
                            <div className="location-name">
                              {item?.parentCountry
                                ? item?.parentCountry
                                : "cambodia"}
                            </div>
                          </div>
                          <div className="location-wrapper">
                            <img src={jobIcon} alt="" />
                            <div className="location-name">25 Jobs Booked</div>
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

        <div className="find-more">
          <div>Find More</div>
        </div>

        <div className="title">Our Community</div>

        <div className="-fluid">
          <div className="cards">
            <div className="community-card-wrapper card-background">
              <div className="count">5,258,451</div>
              <div className="cards-text">Talents in community</div>
            </div>
            <div className="community-card-wrapper  card-background">
              <div className="count">5,258,451</div>
              <div className="cards-text">Brands Professionals</div>
            </div>
            <div className="community-card-wrapper  card-background">
              <div className="count">5,258,451</div>
              <div className="cards-text">Brands</div>
            </div>
          </div>
        </div>

        <div className="title">Products and Services</div>

        <div className="container-fluid">
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

        <div className="container-fluid">
          <div className="gallery-section">
            <div className="case-study-main">
              {caseList?.map((item) => {
                return (
                  <div className="case-wrapper">
                    <div className="">
                      <img className="case-img" src={item.photo}></img>
                    </div>
                    <div className="case-gallery-content">
                      <div className="">
                        <div className="case-study-name">{item.name}</div>
                        <div className="case-study-address">{item.address}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="find-more">
          <div>Find More</div>
        </div>

        {/* data-bs-ride="carousel" <= under id="carouselExampleControls"
            className="carousel slide" */}

        <div
          style={{
            backgroundImage: `url(${sliderBackground})`,
          }}
          className="carousel-section"
        >
          <div className="carousel-title center">Success Stories</div>
          <div id="carouselExampleControls" className="carousel slide">
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

        <div className="container-fluid">
          <div className="brands-section">
            <div>
              <img src={adidasIcon}></img>
            </div>
            <div>
              <img src={ubisoftIcon}></img>
            </div>
            <div>
              <img src={americanExpress}></img>
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
      {/* <div className="chat-section">
        <ChatBot />
      </div> */}
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Dashboard;
