import React, { useEffect, useState, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp.js";
import "../assets/css/talent-dashboard.scss";
import TalentSideMenu from "../layout/TalentSideMenu.js";
const TalentDashBoard = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const offcanvasRef = useRef(null); // Reference to the offcanvas element
  const [gigsList, setGigsList] = useState([]);
  const [topBrandsList, setTopBrandsList] = useState([]);
  const [isFilled, setIsFilled] = useState(true);
  const girl1 = require("../assets/images/girl1.png");
  const btLogo = require("../assets/icons/Group 56.png");
  const jobImage = require("../assets/icons/jobImage.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const doitnow = require("../assets/images/doitnow.png");
  const headsetLogo = require("../assets/icons/headset.png");
  const [showSidebar, setShowSidebar] = useState(true);
  const [userId, setUserId] = useState(null);
  const url = window.location.href;
  const queryString = url.split("?")[1];
  console.log(" queryString:", queryString);

  useEffect(() => {
    getRecentGigs();
    getTopBrands();
    const storedUserId = localStorage.getItem("userId");
    console.log(storedUserId, "storedUserId");
    setUserId(storedUserId);
    if (userId) {
      checkProfileStatus();
    }
  }, [userId]);

  const checkProfileStatus = async () => {
    await ApiHelper.post(`${API.checkProfileStatus}${queryString}`)
      .then((resData) => {
        if (resData.data.profileStatus === false) {
          openDoItNowModal();
        }
        console.log("checkProfileStatus", resData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRecentGigs = async () => {
    const formData = {
      talentId: userId,
    };
    await ApiHelper.post(API.getPostedJobs, formData)
      .then((resData) => {
        if (resData) {
          setGigsList(resData.data.data);
        }
        console.log("gigsList", resData.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [modalData, setModalData] = useState(null);

  const applyjobs = async (data) => {
    console.log(data, "applyJobData");
    setModalData(data); // Set data to be displayed in the modal
    // Open the modal programmatically
    if (data?.isApplied != "Applied") {
      const modalElement = document.getElementById("exampleModal");
      const bootstrapModal = new window.bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  };
  const viewJob = async (jobId) => {
    navigate("/preview-job-talent", {
      state: {
        jobId: jobId,
      },
    });
  };

  useEffect(() => {
    console.log(gigsList, "gigsList");
  }, [gigsList]);

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
    setShowSidebar(!showSidebar);
  };
  const [talentId, setTalentId] = useState(null);

  useEffect(() => {
    setTalentId(localStorage.getItem("userId"));
    console.log(talentId, "brandId");
  }, [talentId]);

  const openSignup = () => {
    closeDoItNowModal();
    setTimeout(() => {
      navigate(`/adult-signup-basic-details`);
    }, 800);
  };

  // Define refs for the modals
  const doItNowRef = useRef(null);
  const openDoItNowModal = () => {
    const modal = new window.bootstrap.Modal(doItNowRef.current);
    modal.show();
  };

  // Function to close the "doItNow" modal
  const closeDoItNowModal = () => {
    const modal = new window.bootstrap.Modal(doItNowRef.current);
    modal.hide();
  };

  const handleCloseModal = async () => {
    const formData = {
      talentId: talentId,
      brandId: modalData?.brandId,
      gigId: modalData?._id,
    };
    await ApiHelper.post(API.applyjobs, formData)
      .then((resData) => {
        setMessage("Job Applied SuccessFully!");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
          getRecentGigs();
          // Close the modal programmatically
          const modalElement = document.getElementById("exampleModal");
          const bootstrapModal = new window.bootstrap.Modal(modalElement);
          bootstrapModal.hide();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "not-sidebar"
        }`}
      >
        <TalentSideMenu myState={queryString} />
      </div>

      <main
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div
          ref={doItNowRef}
          className="modal fade"
          id="verify_age"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content ">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body talent-popup-body">
                <div className="doitnow-main">
                  <div className="doit-one">
                    <div className="talent-popup-title">
                      Welcome To Brands And Talent
                    </div>
                    <div className="talent-popup-enter">
                      Complete Your{" "}
                      <span className="talent-popup-span">Profile</span>
                    </div>
                    <div>
                      {/* Progress bar */}
                      <div
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: isFilled ? "20%" : "0%",
                            backgroundColor: "#c2114b",
                            height: "8px",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="talent-popup-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ea repellat corporis corrupti aliquid laboriosam neque
                      ratione fuga. <br></br>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                  </div>
                  <div className="doit-two">
                    <img src={doitnow} alt="" />
                  </div>
                </div>
              </div>
              <div className="doitnow">
                <div
                  className="doit-btn"
                  onClick={() => {
                    openSignup();
                  }}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Update Profile Now
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid my-2 p-0">
          <div className="row talent-dashboard-main">
            <div className="col-md-8 col-lg-9">
              <div className="talent-column-one">
                <div className="recent-gigs-title">Most Recent Gigs</div>
                  {gigsList.length && (
                    <div className="recent-gigs-main">
                      {gigsList.map((item, index) => {
                        return (
                          <>
                            <div className="recent-gigs-wrapper">
                              <div className="recent-setone">
                                <div className="recent-img-div">
                                  {/* <i className="bi bi-briefcase-fill "></i> */}
                                  {item?.brandImage && (
                                    <img
                                      className="recent-img"
                                      src={`${API.userFilePath}${item?.brandImage}`}
                                      alt=""
                                    />
                                  )}
                                  {!item?.brandImage && (
                                    <img
                                      className="recent-img"
                                      src={jobImage}
                                      alt=""
                                    />
                                  )}
                                </div>
                                <div className="recent-gig-details">
                                  <div className="recent-gig-company">
                                    {item.hiringCompany}
                                  </div>
                                  <div className="recent-gig-name">
                                    {item.jobTitle}
                                  </div>
                                  <div className="recent-gig-description">
                                    {item.description}
                                  </div>
                                </div>
                              </div>
                              <div className="recent-settwo">
                                <div className="recent-gigs-count-wrapper">
                                  <div className="recent-gigs-logo">
                                    <i className="bi bi-person-check-fill"></i>
                                  </div>
                                  <div className="recent-gig-count-details">
                                    <div className="recent-gig-name">Followers</div>
                                    <div className="recent-gigs-count">2500</div>
                                  </div>
                                </div>
                                <div className="recent-gigs-count-wrapper">
                                  <div className="recent-gigs-logo">
                                    <i className="bi bi-person-arms-up"></i>
                                  </div>
                                  <div className="recent-gig-count-details">
                                    <div className="recent-gig-name">Age</div>
                                    <div className="recent-gigs-count">
                                      {item.age}
                                    </div>
                                    <div className="recent-gig-details">
                                      <div className="recent-gig-company">
                                        {item.hiringCompany}
                                      </div>
                                      <div className="recent-gig-name">
                                        {item.jobTitle}
                                      </div>
                                      <div className="recent-gig-description">
                                        {item.description}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="recent-settwo">
                                    <div className="recent-gigs-count-wrapper">
                                      <div className="recent-gigs-logo">
                                        <i className="bi bi-person-check-fill"></i>
                                      </div>
                                      <div className="recent-gig-count-details">
                                        <div className="recent-gig-name">Followers</div>
                                        <div className="recent-gigs-count">2500</div>
                                      </div>
                                    </div>
                                    <div className="recent-gigs-count-wrapper">
                                      <div className="recent-gigs-logo">
                                        <i className="bi bi-person-arms-up"></i>
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
                                        <i className="bi bi-gender-ambiguous"></i>
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
                                        <i className="bi bi-geo-alt-fill"></i>
                                      </div>
                                      <div className="recent-gig-count-details">
                                        <div className="recent-gig-name">Location</div>
                                        <div className="recent-gigs-count">
                                          {item.jobLocation}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="recent-set-three">
                                    <div
                                      className="view-gig-btn"
                                      onClick={() => {
                                        viewJob(item?._id);
                                      }}
                                    >
                                      <i className="bi bi-eye-fill"></i>
                                      <div>View Job</div>
                                    </div>
                                    <div
                                      className={
                                        item?.isApplied
                                          ? " apply-now-btn"
                                          : "apply-now-btn applied-btn"
                                      }
                                      style={{
                                        backgroundColor:
                                          item?.isApplied == "Apply Now"
                                            ? "yellow"
                                            : "green",
                                        color:
                                          item?.isApplied == "Apply Now"
                                            ? "black"
                                            : "#FFFFFF",
                                      }}
                                      onClick={() => {
                                        applyjobs(item);
                                      }}
                                    >
                                      {item?.isApplied == "Applied" && (
                                        <>
                                          <i className="bi bi-check-circle-fill"></i>
                                        </>
                                      )}
                                      {item?.isApplied == "Apply Now" && (
                                        <>
                                          <i className="bi bi-briefcase-fill"></i>
                                        </>
                                      )}

                                      <div>{item?.isApplied}</div>
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
                  {gigsList && gigsList.length == 0 && (
                    <div className="recent-gigs-main">No Jobs Available</div>
                  )}
                </div>
            </div>
            <div className="col-md-4 col-lg-3">
              <div className="rightBx">
                <div className="contact-section-main remvSpace">
                  <div className="contact-wrapper boxsWhite mb-4">
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

                  <div className="boxsWhite mb-4">
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
                                  {item?.brandImage?.length > 0 ? (
                                    <img
                                      className="top-brand-img"
                                      src={
                                        API.userFilePath +
                                        item?.brandImage[0].fileData
                                      }
                                      alt=""
                                    />
                                  ) : (
                                    <div>No Image Available</div>
                                  )}
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

          </div>
        </div>
      </main>

      {/* Bootstrap Modal */}
      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <p id="exampleModalLabel" className="modal-job-title">
                {modalData?.jobTitle}
              </p>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-job-flex">
                <i className="bi bi-building model-job-icons"></i>
                <div className="model-job-name">{modalData?.hiringCompany}</div>
              </div>

              <div className="modal-job-flex">
                <i className="bi bi-briefcase-fill model-job-icons"></i>
                <div className="model-job-name">
                  <span className="modal-job-workplace">
                    {modalData?.workplaceType}{" "}
                  </span>{" "}
                  {modalData?.jobType}
                </div>
              </div>
              <div className="modal-job-flex">
                <i className="bi bi-list-check model-job-icons"></i>
                <div className="model-job-name">
                  {modalData?.skills.map((skill, index) => (
                    <span key={index}>
                      {skill}
                      {index !== modalData?.skills.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
              <div className="modal-job-flex">
                <i className="bi bi-gender-ambiguous model-job-icons"></i>
                <div className="model-job-name">{modalData?.gender}</div>
              </div>
              <div className="modal-job-flex">
                <i className="bi  bi-cash-coin model-job-icons"></i>
                <div className="model-job-name">
                  {modalData?.paymentType?.amount} {modalData?.jobCurrency}
                </div>
              </div>
              <div className="model-about-title">About the job</div>
              <div className="model-job-about-values">
                {modalData?.jobDescription &&
                  modalData?.jobDescription?.map((htmlContent, index) => (
                    <div
                      key={index}
                      dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                  ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCloseModal}
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default TalentDashBoard;
