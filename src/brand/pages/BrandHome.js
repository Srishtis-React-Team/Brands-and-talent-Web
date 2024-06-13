import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/brand-home.scss";
import BrandHeader from "./BrandHeader";
import CreateJobs from "./CreateJobs";
import DuplicateJobs from "./DuplicateJobs";
import { ApiHelper } from "../../helpers/ApiHelper";
import { API } from "../../config/api";
import Talentscarousel from "../../views/Talentscarousel.js";
import BrandSideMenu from "./BrandSideMenu.js";
import { useNavigate } from "react-router-dom";

const BrandHome = () => {
  const navigate = useNavigate();
  const bigAdd = require("../../assets/icons/sidemenu/bigAdd.png");
  const users = require("../../assets/icons/sidemenu/users.png");
  const girl1 = require("../../assets/images/girl1.png");
  const [showSidebar, setShowSidebar] = useState(true);
  const [mobileSideBar, setMobileSidebar] = useState(true);
  const [photosList, setPhotosList] = useState([]);
  const [talentList, setTalentList] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [brandId, setBrandId] = useState(null);

  const headsetLogo = require("../../assets/icons/headset.png");
  const getTalentList = async () => {
    await ApiHelper.get(API.getTalentList)
      .then((resData) => {
        if (resData) {
          setTalentList(resData.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const createJob = () => {
    navigate("/create-jobs");
  };
  const listJob = () => {
    navigate("/list-jobs");
  };

  const planBenefits = [
    "Create a profile",
    "Verified profile",
    "Portfolio, 20 Photos, 6 video",
    "20 photos",
    "6 video",
  ];

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
    console.log(brandId, "brandId");
    if (brandId) {
      getAllJobs();
    }
  }, [brandId]);

  const getAllJobs = async () => {
    await ApiHelper.get(`${API.getAllJobs}${brandId}`)
      .then((resData) => {
        if (resData) {
          console.log(resData.data, "resData.getAllJobs");
          setJobsList(resData.data.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTalentList();
  }, []);

  useEffect(() => {
    console.log(jobsList, "jobsList");
  }, [jobsList]);
  useEffect(() => {
    console.log(talentList, "jobsList");
  }, [talentList]);

  function PreviewJob(jobId) {
    navigate("/preview-job", {
      state: {
        jobId: jobId,
      },
    });
  }

  const handleChildClick = () => {
    console.log("Child button clicked");
    setMobileSidebar(false);
  };

  useEffect(() => {
    console.log(mobileSideBar, "ChildmobileSideBar");
  }, [mobileSideBar]);
  useEffect(() => {
    console.log(showSidebar, "ChildshowSidebar");
  }, [showSidebar]);

  const contactUs = () => {
    navigate("/contact-us");
  };

  return (
    <>
      <BrandHeader toggleMenu={toggleMenu} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar && mobileSideBar ? "show-sidebar" : "not-sidebar"
        }`}
      >
        <BrandSideMenu onChildClick={handleChildClick} />
      </div>
      <main
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div className="brand-content-main my-2">
          <div className="brand-home-main row">
            <div className="brand-home-left-container col-md-8 col-lg-9">
              <div className="brand-home-one">
                <div className="row">
                  <div className="col-md-8 col-lg-9">
                    <div className="home-job-add" onClick={createJob}>
                      <img src={bigAdd} alt="" />
                    </div>
                    <div className="home-add-title-wrapper">
                      <div className="home-add-title">Post a Job</div>
                      <div className="home-add-description">
                        Provide a clear and concise title for the job position.
                        The title should accurately reflect the role and
                        responsibilities of the job.
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3 btnSpace">
                    <div className="home-job-start" onClick={createJob}>
                      Start Now
                    </div>
                  </div>
                </div>
              </div>
              <div className="brand-home-title-flex">
                <div className="kids-title">Talents</div>
                <div className="view-all-text">View All</div>
              </div>

              <div className="photos-slider">
                <Talentscarousel talentList={talentList} />
              </div>
              <div className="brand-home-title-flex">
                <div className="kids-title">Most Recent Campaigns</div>
                <div className="view-all-text" onClick={listJob}>
                  View All
                </div>
              </div>
              {!jobsList && (
                <>
                  <div className="recent-campaigns">
                    <div className="recent-campaigns-wrapper">
                      <div className="campaigns-content-wrapper">
                        <div className="campaign-paid-wrapper">
                          <div className="campaign-name">
                            No Campaigns Available
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {jobsList && (
                <>
                  <div className="recent-campaigns">
                    <div className="recent-campaigns-wrapper">
                      <div className="campaigns-wrapper-one">
                        <div className="campaigns-content-wrapper imgSpc">
                          <div className="campaign-paid-wrapper">
                            <div className="campaign-name">
                              {jobsList?.jobTitle}
                            </div>
                          </div>
                          <div className="mb-2">
                            <img
                              className="job-company-logo"
                              src={`${API.userFilePath}${jobsList?.brandImage}`}
                              alt=""
                            />
                            <span className="job-company-name">
                              {jobsList?.hiringCompany}
                            </span>
                          </div>
                          <div className="mb-2">
                            <span className="job-company-name">
                              {jobsList?.state}
                            </span>{" "}
                            ,
                            <span className="job-company-name">
                              {jobsList?.city}
                            </span>
                          </div>
                          <div className="mb-2">
                            <span className="job-company-name">
                              <i class="bi bi-person-workspace"></i>
                            </span>{" "}
                            <i class="bi bi-dot"></i>
                            <span className="job-company-name">
                              {jobsList?.jobType}
                            </span>
                            <i class="bi bi-dot"></i>
                            <span className="job-company-name">
                              {jobsList?.employmentType}
                            </span>
                            <i class="bi bi-dot"></i>
                            <span className="job-company-name">
                              {jobsList && jobsList.compensation
                                ? Object.keys(jobsList.compensation)[0]
                                    .split("_")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(" ")
                                : ""}
                            </span>
                          </div>
                          <div className="mb-2">
                            <span
                              style={{ fontWeight: "bold" }}
                              className="job-company-name"
                            >
                              Application Deadline :{" "}
                            </span>{" "}
                            <span>
                              {" "}
                              {new Date(
                                jobsList.lastDateForApply
                              ).toLocaleDateString("en-GB", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="campaigns-wrapper-two">
                        <div className="campaign-company">
                          <div className="campaign-company-wrapper">
                            <div className="campaign-initial">
                              {" "}
                              {jobsList?.hiringCompany &&
                                jobsList.hiringCompany.charAt(0)}
                            </div>
                            <div className="campaign-company-name">
                              {jobsList?.hiringCompany}
                            </div>
                          </div>
                          <div
                            className="view-campaign"
                            onClick={(e) => {
                              e.preventDefault();
                              PreviewJob(jobsList?._id);
                            }}
                          >
                            <div>
                              <i className="bi bi-eye-fill"></i>
                            </div>
                            <div className="view-campaign-text">
                              View Campaign
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="brand-home-right-container col-md-4 col-lg-3">
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
                  <div className="contact-btn" onClick={() => contactUs()}>
                    Contact Now
                  </div>
                </div>
              </div>
              <div className="brand-plan-section">
                <div className="planImg">
                  <img className="plan-backdrop-image" src={girl1} alt="" />
                </div>
                <div className="my-plan-contents">
                  <p className="my-plan">My Plan</p>
                  <div className="my-plan-features scroll">
                    {planBenefits?.map((item, index) => {
                      return (
                        <>
                          <div className="myplan-wrapper" key={item}>
                            <div>
                              <i
                                style={{ color: "#c2114b", fontSize: "18px" }}
                                className="bi bi-check-square-fill"
                              ></i>
                            </div>
                            <div className="myplan-features-text">{item}</div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="contact-btn">Upgrade Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BrandHome;
