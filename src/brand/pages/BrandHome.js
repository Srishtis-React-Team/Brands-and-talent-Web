import React, { useState, useEffect } from "react";
import "../../assets/css/brand-home.css";
import "../../assets/css/PhotosCarousel.css";
import "../../assets/css/createjobs.css";
import BrandHeader from "./BrandHeader";
import { ApiHelper } from "../../helpers/ApiHelper";
import { API } from "../../config/api";
import Talentscarousel from "../../views/Talentscarousel.js";
import BrandSideMenu from "./BrandSideMenu.js";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TalentsSlider from "../../views/TalentsSlider.js";

const BrandHome = () => {
  const navigate = useNavigate();
  const bigAdd = require("../../assets/icons/sidemenu/bigAdd.png");
  const girl1 = require("../../assets/images/girl1.png");
  const [showSidebar, setShowSidebar] = useState(true);
  const [mobileSideBar, setMobileSidebar] = useState(true);
  const [jobsList, setJobsList] = useState([]);
  const [brandId, setBrandId] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [myState, setMyState] = useState(false);

  const headsetLogo = require("../../assets/icons/headset.png");

  useEffect(() => {
    if (brandId) {
      getBrand();
    }
  }, [brandId]);

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {});
  };
  const location = useLocation();

  useEffect(() => {
    // Extract the last part of the URL (i.e., 'peter')
    const pathParts = location.pathname.split("/");
    const name = pathParts[pathParts?.length - 1];
    getDataByPublicUrl(name);
  }, [location]);

  const getDataByPublicUrl = async (name) => {
    const formData = {
      publicUrl: name,
      userId: localStorage.getItem("brandId"),
    };
    await ApiHelper.post(`${API.getDataByPublicUrl}`, formData)
      .then((resData) => {
        // setUrlTalentData(resData?.data?.data);
        // checkUser(resData?.data?.data?._id, resData?.data?.data);
        setBrandData(resData?.data?.data);
      })
      .catch((err) => {});
  };

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const createJob = () => {
    navigate("/create-jobs");
  };
  const listJob = () => {
    navigate("/my-jobs");
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
    if (brandId) {
      getAllJobs();
    }
  }, [brandId]);

  const getAllJobs = async () => {
    await ApiHelper.get(`${API.getAllJobs}${brandId}`)
      .then((resData) => {
        if (resData) {
          setJobsList(resData.data.data[0]);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {}, [jobsList]);

  function PreviewJob(jobId) {
    navigate("/preview-job", {
      state: {
        jobId: jobId,
      },
    });
  }

  const handleChildClick = () => {
    setMobileSidebar(false);
  };

  useEffect(() => {}, [mobileSideBar]);
  useEffect(() => {}, [showSidebar]);

  const contactUs = () => {
    navigate("/contact-support");
  };

  useEffect(() => {
    getBrandsPricingList();
  }, []);

  const [basicList, setBasicList] = useState([]);
  const [filteresPricingList, setFilteresPricingList] = useState([]);

  const [pricingList, setPricingList] = useState(null);

  const getBrandsPricingList = async () => {
    await ApiHelper.get(API.brandsPricingList)
      .then((resData) => {
        if (resData) {
          resData?.data?.data?.forEach((item) => {
            if (brandData?.planName == "Basic" && item?.planname === "Basic") {
              setFilteresPricingList(item.data);
            } else if (
              brandData?.planName == "Pro" &&
              item.planname === "Pro"
            ) {
              setFilteresPricingList(item.data);
            } else if (
              brandData?.planName == "Premium" &&
              item.planname === "Premium"
            ) {
              setFilteresPricingList(item.data);
            }
          });
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <BrandHeader toggleMenu={toggleMenu} myState={myState} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
        }`}
      >
        <BrandSideMenu myState={myState} />
      </div>
      <main
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div className="brand-content-main my-2">
          <div className="brand-home-main row">
            <div className="brand-home-left-container col-md-8 col-lg-8">
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
                <div
                  className="view-all-text"
                  onClick={() => {
                    navigate("/find-talent");
                  }}
                >
                  View All
                </div>
              </div>

              <div className="photos-slider">
                <div className="row">
                  <div className="col-lg-12">
                    <Talentscarousel />
                  </div>
                </div>
                {/* <TalentsSlider talentList={talentList} /> */}
              </div>
              <div className="brand-home-title-flex">
                <div className="kids-title pb-2">Most Recent Campaigns</div>
                {jobsList && (
                  <>
                    <div className="view-all-text" onClick={listJob}>
                      View All
                    </div>
                  </>
                )}
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
                              <i className="bi bi-person-workspace"></i>
                            </span>{" "}
                            <span className="job-company-name">
                              {jobsList?.jobType}
                            </span>
                            <i className="bi bi-dot"></i>
                            <span className="job-company_dtls">
                              <i className="bi bi-geo-alt-fill location-icon"></i>
                              {[
                                jobsList?.jobLocation,
                                jobsList?.city,
                                jobsList?.state,
                                jobsList?.country,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </span>
                            <i className="bi bi-dot"></i>
                            <span className="job-company-name">
                              {jobsList?.employmentType}
                            </span>
                            <i className="bi bi-dot"></i>
                            <span className="job-company_dtls">
                              {jobsList?.category} <i className="bi bi-dot"></i>
                            </span>
                            <span className="job-company-name">
                              {jobsList && jobsList.compensation && (
                                <>
                                  {Object.keys(jobsList.compensation)[0] ===
                                  "paid_collaboration_and_gift"
                                    ? "Paid Collaboration + Product/Gift"
                                    : Object.keys(jobsList.compensation)[0] ===
                                      "product_gift"
                                    ? "Product/Gift"
                                    : Object.keys(jobsList.compensation)[0] ===
                                      "paid_collaboration"
                                    ? "Paid Collaboration"
                                    : ""}
                                </>
                              )}
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

            <div className="brand-home-right-container col-md-4 col-lg-4">
              <div className="contact-section-main">
                <div className="contact-wrapper">
                  <div className="contact-logo">
                    <img src={headsetLogo} alt="" />
                  </div>
                  <p className="contact-q">Seeking Assistance?</p>
                  <div className="contact-description">
                    Have a question? Fill out the form below, and we'll get back
                    to you within 1-2 business days
                  </div>
                  <div className="contact-btn" onClick={() => contactUs()}>
                    Contact Now
                  </div>
                </div>
              </div>
              {/* <div className="brand-plan-section">
                <div className="planImg">
                  <img className="plan-backdrop-image" src={girl1} alt="" />
                </div>
                <div className="my-plan-contents">
                  <p className="my-plan">My Plan</p>
                  <div className="my-plan-features scroll">
                    {filteresPricingList && filteresPricingList?.length > 0 && (
                      <>
                        {filteresPricingList?.map((item, index) => {
                          return (
                            <>
                              <div className="myplan-wrapper" key={index}>
                                <div>
                                  <i
                                    style={{
                                      color: "#c2114b",
                                      fontSize: "18px",
                                    }}
                                    className="bi bi-check-square-fill"
                                  ></i>
                                </div>
                                <div className="myplan-features-text">
                                  {item}
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                  </div>
                  {brandData?.planName !== "Premium" && (
                    <div
                      className="contact-btn"
                      onClick={() => {
                        navigate("/pricing");
                      }}
                    >
                      {brandData?.planName === "Basic"
                        ? "Upgrade to Pro/Premium"
                        : brandData?.planName === "Pro"
                        ? "Upgrade to Premium"
                        : ""}
                    </div>
                  )}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BrandHome;
