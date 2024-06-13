import React, { useEffect, useState, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp.js";
import "../assets/css/talent-dashboard.scss";
import TalentSideMenu from "../layout/TalentSideMenu.js";
import { useLocation } from "react-router-dom";

const SavedJobs = () => {
  const location = useLocation();
  const { jobId } = location.state || {};
  console.log(jobId, "jobId");
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
    console.log(storedUserId, "storedUserId");
    setUserId(storedUserId);
    if (storedUserId) {
      getSavedJobsByTalentId(storedUserId);
    }
  }, [userId]);

  const getSavedJobsByTalentId = async (id) => {
    const formData = {
      talentId: id,
    };
    await ApiHelper.post(`${API.getSavedJobsByTalentId}`, formData)
      .then((resData) => {
        if (resData?.data?.status === true) {
          setAllJobsList(resData?.data?.data);
          console.log(resData?.data?.data, "resDatagetSavedJobsByTalentId");
        }
      })
      .catch((err) => {});
  };

  function PreviewJob(jobId) {
    console.log(jobId, "jobId");
    navigate("/preview-job-talent", {
      state: {
        jobId: jobId,
      },
    });
  }

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    console.log(allJobsList, "allJobsList");
  }, [allJobsList]);

  const addToSavedJobs = async (data) => {
    console.log(data, "dataaddToSavedJobs");
    const formData = {
      gigId: data?._id,
      brandId: data?.brandId,
      talentId: userId,
    };
    await ApiHelper.post(API.updateFavouriteJobs, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Job Saved SuccessFully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            getSavedJobsByTalentId(userId);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error Occured Try Again");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
          getSavedJobsByTalentId(userId);
        }, 1000);
      });
  };
  const removeFromSavedJobs = async (data) => {
    console.log(data, "dataremoveFromSavedJobs");
    const formData = {
      gigId: data?.gigId,
      talentId: userId,
    };
    await ApiHelper.post(API.removeFavouritesJob, formData)
      .then((resData) => {
        console.log(resData, "resDataremoveFromSavedJobs");
        if (resData.data.status === true) {
          setMessage("Jab Removed From Saved Jobs");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            getSavedJobsByTalentId(userId);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error Occured Try Again");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
          getSavedJobsByTalentId(userId);
        }, 1000);
      });
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
          <div className="create-job-title">Saved Jobs</div>
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
                                  {job?.gigDetails?.jobTitle}
                                </div>
                              </div>
                              <div className="mb-2">
                                <img
                                  className="job-company-logo"
                                  src={`${API.userFilePath}${job?.brandDetails?.brandImage[0]?.fileData}`}
                                  alt=""
                                />
                                <span className="job-company-name">
                                  {job?.gigDetails?.hiringCompany}
                                </span>
                              </div>
                              <div className="mb-2">
                                <span className="job-company-name">
                                  {job?.gigDetails?.state}
                                </span>{" "}
                                ,
                                <span className="job-company-name">
                                  {job?.gigDetails?.city}
                                </span>
                              </div>
                              <div className="mb-2">
                                <span className="job-company-name">
                                  <i class="bi bi-person-workspace"></i>
                                </span>{" "}
                                .
                                <span className="job-company-name">
                                  {job?.gigDetails?.jobType}
                                </span>
                                .
                                <span className="job-company-name">
                                  {job?.gigDetails?.employmentType}
                                </span>
                                .
                                <span className="job-company-name">
                                  {
                                    Object.keys(
                                      job?.gigDetails?.compensation
                                    )[0]
                                  }
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
                                    job?.gigDetails?.lastDateForApply
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
                                  {job?.gigDetails?.hiringCompany &&
                                    job.gigDetails?.hiringCompany.charAt(0)}
                                </div>
                                <div className="campaign-company-name">
                                  {job?.gigDetails?.hiringCompany}
                                </div>
                              </div>
                              <div className="job-card-buttons">
                                {job?.gigDetails?.type == "Posted" && (
                                  <>
                                    <div
                                      className="preview-work-btn"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        PreviewJob(job?.gigId);
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

          {allJobsList && allJobsList.length == 0 && allJobs && (
            <>
              <div
                style={{ textAlign: "center", padding: "20px" }}
                className="list-jobs-wrapper"
              >
                No Jobs Available
              </div>
            </>
          )}
          {allJobsList && allJobsList.length == 0 && draftJobs && (
            <>
              <div
                style={{ textAlign: "center", padding: "20px" }}
                className="list-jobs-wrapper"
              >
                No Draft Jobs Available
              </div>
            </>
          )}
          {allJobsList && allJobsList.length == 0 && postedJobs && (
            <>
              <div
                style={{ textAlign: "center", padding: "20px" }}
                className="list-jobs-wrapper"
              >
                No Posted Jobs Available
              </div>
            </>
          )}
        </div>
      </main>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default SavedJobs;
