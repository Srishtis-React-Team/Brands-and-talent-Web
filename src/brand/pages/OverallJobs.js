import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.scss";
import "../../assets/css/createjobs.scss";
import "../../assets/css/talent-profile.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import Select from "react-select";
import Axios from "axios";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import { useNavigate } from "react-router";
import BrandHeader from "./BrandHeader";
import BrandSideMenu from "./BrandSideMenu";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import Header from "../../layout/header";

const OverallJobs = () => {
  const [brandId, setBrandId] = useState(null);

  useEffect(() => {
    const storedBrandId = localStorage.getItem("brandId");
    if (storedBrandId !== null) {
      setBrandId(storedBrandId);
    }
  }, []);

  const navigate = useNavigate();

  const customStylesAlert = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      /* margin: '0 auto', */
      width: "450px",
      height: "270px",
      transform: "translate(-50%, -50%)",
    },
  };
  const [alertpop, setAlertpop] = useState({
    status: false,
    jobId: "",
    jobType: "",
    label: "",
  });
  const jobImage = require("../../assets/icons/jobImage.png");
  const [showSidebar, setShowSidebar] = useState(true);
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [allJobs, showAllJobs] = useState(true);
  const [draftJobs, showDraftJobs] = useState(false);
  const [postedJobs, showPostedJobs] = useState(false);
  const [allJobsList, setAllJobsList] = useState([]);

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  function handleForms(e) {
    if (e == "all-jobs") {
      showAllJobs(true);
    } else {
      showAllJobs(false);
    }
    if (e == "draft-jobs") {
      showDraftJobs(true);
    } else {
      showDraftJobs(false);
    }
    if (e == "posted-jobs") {
      showPostedJobs(true);
    } else {
      showPostedJobs(false);
    }
  }

  function editJob() {
    if (alertpop?.jobId) {
      let editData = {
        label: null,
        type: alertpop?.jobType,
        value: alertpop?.jobId,
      };
      navigate("/create-jobs", {
        state: {
          editData: editData,
        },
      });
    }
  }
  function PreviewJob(jobId) {
    navigate("/preview-job", {
      state: {
        jobId: jobId,
      },
    });
  }

  const deleteJob = async () => {
    const formdata = {
      gigId: alertpop?.jobId,
      type: alertpop?.jobType,
    };
    await ApiHelper.post(API.deleteJob, formdata)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Job Deleted SuccessFully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            console.log(resData?.data?.response?.type, "resData?.data");
            if (resData?.data?.response?.type == "Draft") {
              getAllJobs("draft-jobs", brandId);
            } else if (resData?.data?.response?.type == "Posted") {
              getAllJobs("posted-jobs", brandId);
            }
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(allJobs, "allJobsdf");
    if (allJobs && brandId != null) {
      console.log(brandId, "allJobsdf brandId");
      console.log("allJobsdfCAlled");
      getAllJobs("all-jobs", brandId);
    }
  }, [allJobs, brandId]);

  useEffect(() => {
    if (draftJobs && brandId != null) {
      getAllJobs("draft-jobs", brandId);
    }
  }, [draftJobs]);

  useEffect(() => {
    if (postedJobs && brandId != null) {
      getAllJobs("posted-jobs", brandId);
    }
  }, [postedJobs]);

  useEffect(() => {
    console.log(allJobsList, "allJobsList");
  }, [allJobsList]);

  const postJob = async () => {
    await ApiHelper.post(`${API.postJobByDraft}${alertpop?.jobId}`)
      .then((resData) => {
        console.log(resData, "draftedData");
        console.log(resData.data.data._id, "draftedData");
        if (resData.data.status === true) {
          setMessage("Job Posted SuccessFully!");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            setAllJobsList(resData.data.data, "resData.data.data");
          }, 2000);
        } else if (resData.data.status === false) {
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  function PreviewJob(jobId) {
    navigate("/preview-job", {
      state: {
        jobId: jobId,
      },
    });
  }

  const getAllJobs = async (filterJob, id) => {
    let apiUrl;
    if (filterJob == "all-jobs") {
      apiUrl = `${API.getAllJobs}${id}`;
    } else if (filterJob == "draft-jobs") {
      apiUrl = `${API.getBrandDraftJobsByID}${id}`;
    } else if (filterJob == "posted-jobs") {
      apiUrl = `${API.getBrandPostedJobsByID}${id}`;
    }
    console.log(apiUrl, "apiUrl");
    await ApiHelper.get(apiUrl)
      .then((resData) => {
        console.log(resData.data.data, "getJobsList");
        if (resData.data.status === true) {
          if (resData.data.data) {
            setAllJobsList(resData.data.data, "resData.data.data");
          }
        } else if (resData.data.status === false) {
          setAllJobsList(resData.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <>
        <Header />
        <main
          style={allJobsList.length === 0 ? { height: "100vh" } : {}}
          id="mainBrand"
          className="brand-main-container overalljobs-container"
        >
          <div className="brand-content-main">
            <div className="create-job-title">Campaigns</div>
            {/* <div className="individual-talent-tabs">
              <div
                className={
                  allJobs
                    ? "individual-talent-tab-first-active-tab  individual-talent-tab-first"
                    : "individual-talent-tab-first"
                }
                onClick={(e) => {
                  handleForms("all-jobs");
                }}
              >
                All Jobs
              </div>
              <div
                className={
                  draftJobs
                    ? "active-tab individual-talent-tab"
                    : "individual-talent-tab"
                }
                onClick={(e) => {
                  handleForms("draft-jobs");
                }}
              >
                Draft Jobs
              </div>
              <div
                className={
                  postedJobs
                    ? "active-tab individual-talent-tab"
                    : "individual-talent-tab"
                }
                onClick={(e) => {
                  handleForms("posted-jobs");
                }}
              >
                Posted Jobs
              </div>
            </div> */}

            {allJobsList && allJobsList.length > 0 && (
              <>
                <div className="list-jobs-wrapper">
                  {allJobsList.map((job, index) => {
                    return (
                      <>
                        <div key={index} className="list-jobs-card">
                          <div className="recent-campaigns-wrapper">
                            <div className="campaigns-wrapper-one">
                              <div className="campaigns-content-wrapper">
                                <div className="campaign-paid-wrapper">
                                  <div className="campaign-name">
                                    {job?.jobTitle}
                                  </div>
                                  <div className="campaign-status">
                                    <div className="campaign-features-count">
                                      Paid
                                    </div>
                                  </div>
                                </div>

                                {job?.jobDescription?.map(
                                  (htmlContent, index) => (
                                    <div
                                      className="campaign-description"
                                      key={index}
                                      dangerouslySetInnerHTML={{
                                        __html: htmlContent,
                                      }}
                                    />
                                  )
                                )}
                                <div className="campaign-features">
                                  <div className="campaign-features-wrapper">
                                    <div className="campaign-icons-wrapper">
                                      <i className="bi bi-person-check-fill"></i>
                                    </div>
                                    <div>
                                      <div className="campaign-features-title">
                                        Followers
                                      </div>
                                      <div className="campaign-features-count">
                                        2000
                                      </div>
                                    </div>
                                  </div>
                                  <div className="campaign-features-wrapper">
                                    <div className="campaign-icons-wrapper">
                                      <i className="bi bi-person-arms-up"></i>
                                    </div>
                                    <div>
                                      <div className="campaign-features-title">
                                        Age
                                      </div>
                                      <div className="campaign-features-count">
                                        {job?.age}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="campaign-features-wrapper">
                                    <div className="campaign-icons-wrapper">
                                      <i className="bi bi-gender-ambiguous"></i>
                                    </div>
                                    <div>
                                      <div className="campaign-features-title">
                                        Gender
                                      </div>
                                      <div className="campaign-features-count">
                                        {job?.gender}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="campaign-features-wrapper">
                                    <div className="campaign-icons-wrapper">
                                      <i className="bi bi-geo-alt-fill"></i>
                                    </div>
                                    <div>
                                      <div className="campaign-features-title">
                                        Location
                                      </div>
                                      <div className="campaign-features-count">
                                        Australia
                                      </div>
                                    </div>
                                  </div>
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
                                  <div className="manage-dropdown">
                                    <div className="dropdown">
                                      <button
                                        className="btn manage-btn dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        Manage
                                      </button>
                                      <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                      >
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            onClick={(e) => {
                                              setAlertpop({
                                                status: true,
                                                jobId: job?._id,
                                                jobType: job?.type,
                                                label: "edit",
                                              });
                                            }}
                                          >
                                            Edit Job
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            onClick={(e) => {
                                              setAlertpop({
                                                status: true,
                                                jobId: job?._id,
                                                jobType: job?.type,
                                                label: "delete",
                                              });
                                            }}
                                          >
                                            Delete Job
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  {job?.type == "Draft" && (
                                    <>
                                      <div
                                        className="post-work-btn"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setAlertpop({
                                            status: true,
                                            jobId: job?._id,
                                            jobType: job?.type,
                                            label: "post-job",
                                          });
                                        }}
                                      >
                                        <i className="bi bi-briefcase-fill post-work-icon"></i>
                                        <div className="post-campaign-text">
                                          Post Job
                                        </div>
                                      </div>
                                    </>
                                  )}
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
      </>
      <Modal style={customStylesAlert} isOpen={alertpop?.status === true}>
        <div>
          {/* <div className='uploadHead'>
                        <h4 className='mt-2'>Reason For stock Return</h4>
                        <img src={CloseIcon} className='pop-close' onClick={() => { setIsModalOpen(false); }} />
                    </div> */}
          <div className="alertBox">
            <div className="col-md-12  mx-5">
              <div className="alert-icon-section">
                <img src={jobImage} alt="" />
                {/* <i className="alert-icon bi bi-exclamation-triangle-fill"></i> */}
              </div>
              {alertpop?.label == "edit" && (
                <>
                  <h5>Are you sure you want to Edit this Job ? </h5>
                </>
              )}
              {alertpop?.label == "delete" && (
                <>
                  <h5>Are you sure you want to Delete this Job ? </h5>
                </>
              )}
              {alertpop?.label == "post-job" && (
                <>
                  <h5>Are you sure you want to Post this Job ? </h5>
                </>
              )}
            </div>
          </div>
          <div className="alert-button-section">
            <button
              type="submit"
              className=" btn btn-warning"
              onClick={() => {
                setAlertpop({
                  status: false,
                  jobId: null,
                  jobType: null,
                  label: null,
                });
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" btn btn-danger alert-ok-btn"
              onClick={(e) => {
                e.preventDefault();
                setAlertpop({
                  status: false,
                  jobId: null,
                  jobType: null,
                  label: null,
                });
                if (alertpop?.label === "delete") {
                  deleteJob();
                } else if (alertpop?.label === "edit") {
                  editJob();
                } else if (alertpop?.label === "post-job") {
                  postJob();
                }
              }}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default OverallJobs;
