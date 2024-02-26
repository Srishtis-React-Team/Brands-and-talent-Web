import React, { useEffect, useState, useRef } from "react";
import "../assets/css/talent-dashboard.scss";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript

const TalentDashBoard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const offcanvasRef = useRef(null); // Reference to the offcanvas element
  const [gigsList, setGigsList] = useState([]);
  const [topBrandsList, setTopBrandsList] = useState([]);
  const girl1 = require("../assets/images/girl1.png");
  const headsetLogo = require("../assets/icons/headset.png");
  const user = require("../assets/icons/user-only.png");
  const gender = require("../assets/icons/gender.png");
  const map = require("../assets/icons/map-pin.png");
  useEffect(() => {
    // Initialize the offcanvas with Bootstrap's Offcanvas API
    const offcanvas = new window.bootstrap.Offcanvas(offcanvasRef.current);
    offcanvasRef.current.addEventListener("hidden.bs.offcanvas", () => {
      setIsMenuOpen(false); // Update state when offcanvas is closed
    });
    getRecentGigs();
    getTopBrands();
  }, []);

  const getRecentGigs = async () => {
    await ApiHelper.get(API.getRecentGigs)
      .then((resData) => {
        if (resData) {
          setGigsList(resData.data.data);
        }
        console.log("gigsList", resData.data.data);
        console.log("gigsList", gigsList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTopBrands = async () => {
    await ApiHelper.post(API.getTopBrands)
      .then((resData) => {
        if (resData) {
          setTopBrandsList(resData.data.data);
        }
        console.log("topBrandsList", resData.data.data);
        console.log("topBrandsList", topBrandsList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMenu = () => {
    const offcanvas = new window.bootstrap.Offcanvas(offcanvasRef.current);
    if (!isMenuOpen) {
      offcanvas.show(); // Open offcanvas when menu is closed
    } else {
      offcanvas.hide(); // Close offcanvas when menu is open
    }
  };

  const closeMenu = () => {
    const offcanvas = offcanvasRef.current;
    if (offcanvas) {
      const offcanvasInstance = window.bootstrap.Offcanvas.getInstance(
        offcanvas
      );
      offcanvasInstance.hide(); // Close offcanvas
    }
  };

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="talent-column-one col-lg-8 mr-2">
            <div className="recent-gigs-title">Most Recent Gigs</div>
            {gigsList.length && (
              <div className="recent-gigs-main">
                {gigsList.map((item, index) => {
                  return (
                    <>
                      <div className="recent-gigs-wrapper">
                        <div className="recent-setone">
                          <div className="recent-img-div">
                            <img
                              className="recent-img"
                              src={API.userFilePath + item.image}
                              alt=""
                            />
                          </div>
                          <div className="recent-gig-details">
                            <div className="recent-gig-company">
                              {item.companyName}
                            </div>
                            <div className="recent-gig-name">{item.title}</div>
                            <div className="recent-gig-description">
                              {item.description}
                            </div>
                          </div>
                        </div>
                        <div className="recent-settwo">
                          <div className="recent-gigs-count-wrapper">
                            <div className="recent-gigs-logo">
                              <img src={user} alt="" />
                            </div>
                            <div className="recent-gig-count-details">
                              <div className="recent-gig-name">Followers</div>
                              <div className="recent-gigs-count">
                                {item.followers}
                              </div>
                            </div>
                          </div>
                          <div className="recent-gigs-count-wrapper">
                            <div className="recent-gigs-logo">
                              <img src={user} alt="" />
                            </div>
                            <div className="recent-gig-count-details">
                              <div className="recent-gig-name">Age</div>
                              <div className="recent-gigs-count">
                                {item.age}
                              </div>
                            </div>
                          </div>
                          <div className="recent-gigs-count-wrapper">
                            <div className="recent-gigs-logo">
                              <img src={gender} alt="" />
                            </div>
                            <div className="recent-gig-count-details">
                              <div className="recent-gig-name">Gender</div>
                              <div className="recent-gigs-count">
                                {item.gender}
                              </div>
                            </div>
                          </div>
                          <div className="recent-gigs-count-wrapper">
                            <div className="recent-gigs-logo">
                              <img src={map} alt="" />
                            </div>
                            <div className="recent-gig-count-details">
                              <div className="recent-gig-name">Location</div>
                              <div className="recent-gigs-count">
                                {item.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
          </div>
          <div className="talent-column-two col-lg-3">
            <div className="contact-section-main">
              <div className="contact-wrapper">
                <div className="contact-logo">
                  <img src={headsetLogo} alt="" />
                </div>
                <p className="contact-q">Seeking Assistance?</p>
                <div className="contact-description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Corrupti, voluptatum labore aspernatur at temporibus
                </div>
                <div className="contact-btn">Contact Now</div>
              </div>
              <div className="top-brands-section">
                <div className="top-brands-title">Top Brands</div>
                <div className="view-all-brands">View All</div>
              </div>
              {topBrandsList.length && (
                <div className="top-brands-main">
                  {topBrandsList.map((item, index) => {
                    return (
                      <>
                        <div className="top-brands-wrapper">
                          <div className="top-brand-img-wrapper">
                            <img
                              className="top-brand-img"
                              src={API.userFilePath + item.brandImage}
                              alt=""
                            />
                          </div>
                          <div className="top-brands-name">
                            {item.brandName}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div class="offcanvas-body">
        <div
          className={`offcanvas offcanvas-start side-menu ${
            isMenuOpen ? "show" : ""
          }`}
          tabIndex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
          ref={offcanvasRef} // Assign ref to the offcanvas element
          style={{ visibility: isMenuOpen ? "visible" : "hidden" }}
        >
          <div className="sidemnu-close">
            <button
              type="button"
              className="btn-close text-reset"
              onClick={closeMenu}
            ></button>
          </div>
          <div className="sidemenu-main">
            <div className="talent-profile">
              <div className="talent-data-wrapper">
                <img className="profile-img" src={girl1} alt="" />
                <div className="talent-details">
                  <div className="talent-name">Elizabeth</div>
                  <div className="talent-category">Talent</div>
                </div>
              </div>
              <div className="talents-plan-info">
                <div className="talent-plan-name">
                  Plan : <span>Basic</span>
                </div>
                <div className="talent-plan-name">
                  campaigns : <span>0</span>
                </div>
              </div>
              <div className="upgrade-btn">Upgrade Now</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TalentDashBoard;
