import React, { useEffect, useState, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp.js";
import "../assets/css/talent-dashboard.css";
import "../assets/css/dashboard.css";
import "../assets/css/brand-home.css";
import "../assets/css/register.css";
import "../assets/css/kidsmain.scss";
import "../assets/css/createjobs.css";
import "../assets/css/talent-profile.css";
import TalentSideMenu from "../layout/TalentSideMenu.js";
import { useLocation } from "react-router-dom";

const AppliedJobs = () => {
  const location = useLocation();
  const { jobId } = location.state || {};
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const [jobTitleError, setjobTitleError] = useState(false);
  const [jobTitle, setjobTitle] = useState("");
  const [jobData, setJobData] = useState("");
  const [message, setMessage] = useState("");
  const [minPay, setMinPay] = useState("");
  const [maxPay, setMaxpay] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [userId, setUserId] = useState(null);
  const jobImage = require("../assets/icons/jobImage.png");
  const [allJobs, showAllJobs] = useState(true);
  const [draftJobs, showDraftJobs] = useState(false);
  const [postedJobs, showPostedJobs] = useState(false);
  const [allJobsList, setAllJobsList] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    setUserId(storedUserId);
    if (storedUserId) {
      getAppliedjobs(storedUserId);
    }
  }, [userId]);

  const getJobsByID = async () => {
    const formData = {
      type: "talent",
    };
    await ApiHelper.post(`${API.getAnyJobById}${jobId}`, formData)
      .then((resData) => {
        setJobData(resData.data.data);
      })
      .catch((err) => {});
  };

  function PreviewJob(jobId) {
    navigate("/preview-job-talent", {
      state: { from: "applied-jobs", jobId: jobId },
    });

    // navigate("/preview-job-talent", {
    //   state: {
    //     jobId: jobId,
    //   },
    // });
  }

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const viewFile = (file) => {
    window.open(`${API.userFilePath}${file.fileData}`, "_blank");
  };

  const saveAsDraft = async () => {
    if (jobId) {
      setMessage("Job Saved To Draft");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 2000);
    }
  };

  const getAppliedjobs = async (id) => {
    const formData = {
      userId: id,
    };
    await ApiHelper.post(API.getAppliedjobs, formData)
      .then((resData) => {
        setAllJobsList(resData?.data?.data);
      })
      .catch((err) => {});
  };

  const postJob = async () => {
    await ApiHelper.post(`${API.postJobByDraft}${jobId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Job Posted Successfully!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            navigate("/list-jobs", {
              state: {
                jobId: resData?.data?.data?._id,
              },
            });
          }, 2000);
        } else if (resData.data.status === false) {
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getJobsByID();
  }, []);
  useEffect(() => {}, [jobData]);
  useEffect(() => {}, [jobId]);
  useEffect(() => {}, [allJobsList]);

  const createJob = () => {
    navigate("/talent-dashboard");
  };

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
        }`}
      >
        <TalentSideMenu />
      </div>

      <main
        style={allJobsList?.length === 0 ? { height: "100vh" } : {}}
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div className="brand-content-main boxBg">
          <div className="create-job-title">Applied Jobs</div>
          {allJobsList && allJobsList?.length > 0 && (
            <>
              <div className="list-jobs-wrapper">
                {allJobsList?.map((job, index) => {
                  return (
                    <>
                      <div key={index} className="list-jobs-card">
                        <div className="recent-campaigns-wrapper">
                          <div className="campaigns-wrapper-one">
                            <div className="campaigns-content-wrapper imgSpc">
                              <div className="campaign-paid-wrapper">
                                <div className="campaign-name">
                                  {job?.jobTitle}
                                </div>
                              </div>
                              <div className="mb-2">
                                <img
                                  className="job-company-logo"
                                  src={`${API.userFilePath}${job?.brandImage}`}
                                  alt=""
                                />
                                <span className="job-company-name">
                                  {job?.hiringCompany}
                                </span>
                              </div>
                              <div className="mb-2">
                                <span className="job-company_dtls">
                                  <i className="bi bi-person-workspace"></i>
                                </span>{" "}
                                {/* . */}
                                <span className="job-company_dtls">
                                  {job?.jobType} <i className="bi bi-dot"></i>
                                </span>
                                <span className="job-company_dtls">
                                  <i className="bi bi-geo-alt-fill location-icon"></i>
                                  {job?.city && <>{job?.city}</>}{" "}
                                  {/* Display city if it exists */}
                                  {job?.city &&
                                    (job?.state || job?.country) && (
                                      <span>, </span>
                                    )}{" "}
                                  {/* Show comma if city exists and either state or country exists */}
                                  {job?.state && <>{job?.state}</>}{" "}
                                  {/* Display state if it exists */}
                                  {job?.state && job?.country && (
                                    <span>, </span>
                                  )}{" "}
                                  {/* Show comma if state exists and country exists */}
                                  {job?.country && <>{job?.country}</>}{" "}
                                  <i className="bi bi-dot"></i>
                                </span>
                                <span className="job-company_dtls">
                                  {job?.employmentType}{" "}
                                  <i className="bi bi-dot"></i>
                                </span>
                                <span className="job-company_dtls">
                                  {job?.category} <i className="bi bi-dot"></i>
                                </span>
                                <span className="job-company_dtls">
                                  {Object.keys(job?.compensation)[0] ===
                                  "paid_collaboration_and_gift"
                                    ? "Paid Collaboration + Product/Gift"
                                    : Object.keys(job?.compensation)[0] ===
                                      "product_gift"
                                    ? "Product/Gift"
                                    : Object.keys(job?.compensation)[0] ===
                                      "paid_collaboration"
                                    ? "Paid Collaboration"
                                    : ""}

                                  {/* {Object.keys(job?.compensation)[0]
                                    ?.split("_")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1)
                                    )
                                    .join(" ")} */}
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
                                    job?.lastDateForApply
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
                                  {job?.hiringCompany &&
                                    job.hiringCompany.charAt(0)}
                                </div>
                                <div className="campaign-company-name">
                                  {job?.hiringCompany}
                                </div>
                              </div>
                              <div className="job-card-buttons">
                                {job?.type == "Posted" && (
                                  <>
                                    <div
                                      className="preview-work-btn"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        PreviewJob(job?._id);
                                      }}
                                    >
                                      <i className="bi bi-eye-fill post-work-icon"></i>
                                      <div className="preview-campaign-text">
                                        Preview Job
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}

          {(!allJobsList || allJobsList.length === 0) && (
            <div
              style={{ textAlign: "center", padding: "20px" }}
              className="list-jobs-wrapper"
            >
              No Jobs Available
            </div>
          )}
        </div>
      </main>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default AppliedJobs;
