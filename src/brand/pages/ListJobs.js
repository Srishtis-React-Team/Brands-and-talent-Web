import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.css";
import "../../assets/css/createjobs.css";
import "../../assets/css/talent-profile.css";
import "../../assets/css/brand-home.css";

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
import { useNavigate,useLocation } from "react-router";
import BrandHeader from "./BrandHeader";
import BrandSideMenu from "./BrandSideMenu";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";

const ListJobs = () => {
  const [brandId, setBrandId] = useState(null);
  const [brandData, setBrandData] = useState(null);

  useEffect(() => {
    const storedBrandId = localStorage.getItem("brandId");
    if (storedBrandId !== null) {
      setBrandId(storedBrandId);
      getBrand();
    }
  }, []);

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data);
          }
        }
      })
      .catch((err) => { });
  };

  useEffect(() => { }, [brandData]);

  useEffect(() => {
    const brandId = localStorage.getItem("brandId"); // Fetch brandId from localStorage
  
    if (!brandId) {
      localStorage.setItem("type", "post job"); // Set type=post job in localStorage
      console.log("Type saved:", localStorage.getItem("type")); // Debugging log

      setMessage("You must be logged in");
      setOpenPopUp(true);
  
      const timer = setTimeout(() => {
        setOpenPopUp(false);
        navigate("/login");
      }, 1000);
  
      return () => clearTimeout(timer); // Cleanup function to prevent memory leaks
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
      width: "94%",
      maxWidth: "450px",
      minHeight: "270px",
      transform: "translate(-50%, -50%)",
    },
  };
  const [alertpop, setAlertpop] = useState({
    status: false,
    jobId: "",
    jobType: "",
    label: "",
    jobObject: null,
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
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState("all-jobs");

 

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  function handleForms(e) {
    if (e == "all-jobs") {
      setActiveTab(e);
      showAllJobs(true);
    } else {
      showAllJobs(false);
    }
    if (e == "draft-jobs") {
      setActiveTab(e);
      showDraftJobs(true);
    } else {
      showDraftJobs(false);
    }
    if (e == "posted-jobs") {
      setActiveTab(e);
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
          setMessage("Job Deleted Successfully");
          window.location.reload();
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);

            if (resData?.data?.response?.type == "Draft") {
              getAllJobs("draft-jobs", brandId);
            } else if (resData?.data?.response?.type == "Posted") {
              getAllJobs("posted-jobs", brandId);
            }
          }, 1000);
        }
      })
      .catch((err) => { });
  };

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

 

  useEffect(() => {
    if (allJobs && brandId != null) {
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

  useEffect(() => { }, [allJobsList]);
 

  const postJob = async () => {
    if (alertpop?.jobObject?.adminApproved == true) {
      await ApiHelper.post(`${API.postJobByDraft}${alertpop?.jobId}`)
        .then((resData) => {
          if (resData.data.status === true) {
            setMessage("Job Posted Successfully!");
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
              window.location.reload(); // hard refresh to re-render sidebar too
              // setAllJobsList(resData.data.data, "resData.data.data");
              getAllJobs("posted-jobs", brandId);
            }, 2000);
          }
          if (resData.data.status == false) {
            setMessage(resData.data.message);
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
              getAllJobs("posted-jobs", brandId);
            }, 1000);
          }
        })
        .catch((err) => { });
    }
   
    
     else {
      setMessage(
        "Thank you for listing your job on BT. Our team will review and approve your post within two business days."
       // "Thank you for posting your job. BT team will review and approve your job within 2 working days. Subscribe to pro/premium membership for instant approval."
        // "Your Job Will be approved by admin with in 2 days For Instant approval upgrade your plan to Pro"
      );
      setOpenPopUp(true);
      
       setTimeout(function () {
        setOpenPopUp(false);
       
        // setAllJobsList(resData.data.data, "resData.data.data");
        getAllJobs();
      }, 3000);
    }
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

    await ApiHelper.get(apiUrl)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setAllJobsList(resData.data.data, "resData.data.data");
          }
        } else if (resData.data.status === false) {
          setAllJobsList(resData.data.data);
        }
      })
      .catch((err) => { });
  };

  // const shareJob = async (job) => {
  //   try {
  //     const formattedJobTitle = job?.jobTitle
  //       ?.trim()
  //       .toLowerCase()
  //       .replace(/\s+/g, "-")
  //       .replace(/[^a-zA-Z0-9\-]/g, ""); // Clean title for URL
  
  //     const currentUserId = job?.brandId;
  //     const currentUserType = "brand";
  
  //     localStorage.setItem("currentUserId", currentUserId);
  //     localStorage.setItem("userId", currentUserId);
  //     localStorage.setItem("currentUserType", currentUserType);
  
  //     const jobUrl = `https://brandsandtalent.com/jobs/view/${formattedJobTitle}/${job?.jobId}`;
  
  //    // const previewText =`${jobUrl}`;
  //    const previewText = `Brands & Talent\n${jobUrl}`;
  
  //     await navigator.clipboard.writeText(previewText);
  
  //     setMessage("Job link copied to clipboard!");
  //     setOpenPopUp(true);
  //     setTimeout(() => {
  //       setOpenPopUp(false);
  //     }, 2000);
  //   } catch (err) {
  //     console.error("Failed to copy:", err);
  //   }
  // };
  
  const shareJob = async (job) => {
    try {
     
      const formattedJobTitle = job?.jobTitle?.replace(/\s+/g, "-");
      const currentUserId = job?.brandId; // Get brandId as userId
      const currentUserType ="brand" // Get brandId as userId

      localStorage.setItem("currentUserId", currentUserId);
      localStorage.setItem("userId", currentUserId);
      localStorage.setItem("currentUserType", currentUserType);
     
      const jobUrl = `${window.location.origin}/jobs/view/${formattedJobTitle}/${job?.jobId} `;
  
      await navigator.clipboard.writeText(jobUrl);
      setMessage("Job link copied to clipboard!");
      setOpenPopUp(true);
      setTimeout(() => {
        setOpenPopUp(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
    


  return (
    <>
      <>
        <BrandHeader toggleMenu={toggleMenu} />
        <div
          id="sidebarBrand"
          className={`brand-sidebar ${showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
            }`}
        >
          <BrandSideMenu />
        </div>
        <main
          style={allJobsList.length === 0 ? { height: "100vh" } : {}}
          id="mainBrand"
          className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
        >
          <div className="brand-content-main boxBg">
            <div className="create-job-title">My Jobs</div>
            <div className="individual-talent-tabs">
            <div
        className={`individual-talent-tab-first ${
          activeTab === "all-jobs" ? "individual-talent-tab-first-active-tab" : ""
        }`}
        onClick={() => handleForms("all-jobs")}
      >
        All Jobs
      </div>
              {/* <div
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
              </div> */}
              <div
        className={`individual-talent-tab ${activeTab === "draft-jobs" ? "active-tab" : ""}`}
        onClick={() => handleForms("draft-jobs")}
      >
        Draft Jobs
      </div>
              {/* <div
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
              </div> */}
               <div
        className={`individual-talent-tab ${activeTab === "posted-jobs" ? "active-tab" : ""}`}
        onClick={() => handleForms("posted-jobs")}
      >
        Posted Jobs
      </div>

    
              {/* <div
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
              </div> */}
             
            </div>

            {allJobsList && allJobsList.length > 0 && (
              <>
                <div className="list-jobs-wrapper pt-3">
                  <div className="row">
                    {allJobsList.map((job, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="list-jobs-card col-md-12 "
                          >
                            <div className="recent-campaigns-wrapper wraper browseJob">
                              <div className="campaigns-wrapper-one">
                                <div className="campaigns-content-wrapper imgSpc">
                                  <div className="campaign-paid-wrapper">
                                    <div className="campaign-name">
                                      {job?.jobTitle}
                                    </div>
                                  </div>
                                  <div className="mb-2 logoSpc">
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
                                    <span className="job-company-name">
                                      <i className="bi bi-person-workspace"></i>
                                    </span>{" "}
                                    <span className="job-company-name">
                                      {job?.jobType}
                                    </span>
                                    <i className="bi bi-dot"></i>
                                    <span className="job-company_dtls">
                                      <i className="bi bi-geo-alt-fill location-icon"></i>
                                      {[
                                        job?.jobLocation,
                                        job?.city,
                                        job?.state,
                                        job?.country,
                                      ]
                                        .filter(Boolean)
                                        .join(", ")|| "No Data Added"}
                                    </span>
                                    <i className="bi bi-dot"></i>
                                    <span className="job-company-name">
                                      {job?.employmentType}
                                    </span>
                                    <i className="bi bi-dot"></i>
                                    <span className="job-company_dtls">
                                      {job?.category}{" "}
                                      <i className="bi bi-dot"></i>
                                    </span>
                                    <span className="job-company-name">
                                      {job && job.compensation && (
                                        <>
                                          {Object.keys(job.compensation)[0] ===
                                            "paid_collaboration_and_gift"
                                            ? "Paid Collaboration + Product/Gift"
                                            : Object.keys(
                                              job.compensation
                                            )[0] === "product_gift"
                                              ? "Product/Gift"
                                              : Object.keys(
                                                job.compensation
                                              )[0] === "paid_collaboration"
                                                ? "Paid Collaboration"
                                                : ""}
                                        </>
                                      )}

                                      {/* 
                                      {job && job.compensation
                                        ? Object.keys(job.compensation)[0]
                                            .split("_")
                                            .map(
                                              (word) =>
                                                word.charAt(0).toUpperCase() +
                                                word.slice(1)
                                            )
                                            .join(" ")
                                        : ""} */}
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
                                      {new Date(job.lastDateForApply).toLocaleDateString("en-GB", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </span>

                                    {new Date(job.lastDateForApply).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) && (
                                      <span style={{ color: "red", fontWeight: "bold", marginLeft: "8px" }}>
                                        (Expired)
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="campaigns-wrapper-two">
  <div className="campaign-company">
    <div className="campaign-company-wrapper">
      {job?.hiringCompany ? (
        <>
          <div className="campaign-initial">
            {job.hiringCompany.charAt(0)}
          </div>
          <div className="campaign-company-name">
            {job.hiringCompany}
          </div>
        </>
      ) : null}
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
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a
                className="dropdown-item"
                onClick={() => {
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
          

              {job?.type === "Posted" && ( // ✅ Only show "Share Job" for posted jobs
                  <li>
                    <a className="dropdown-item" onClick={() => shareJob(job)}>
                      Share Job
                    </a>
                  </li>
                )}

            <li>
              <a
                className="dropdown-item"
                onClick={() => {
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

      {job?.type === "Draft" && (
        <div
          className="post-work-btn"
          onClick={(e) => {
            e.preventDefault();
            setAlertpop({
              status: true,
              jobId: job?._id,
              jobType: job?.type,
              label: "post-job",
              jobObject: job,
            });
          }}
        >
          <i className="bi bi-briefcase-fill post-work-icon"></i>
          <div className="post-campaign-text">Post Job</div>
        </div>
      )}

      {job?.type === "Posted" && (
        <div
          className="preview-work-btn"
          onClick={(e) => {
            e.preventDefault();
            PreviewJob(job?._id);
          }}
        >
          <i className="bi bi-eye-fill post-work-icon"></i>
          <div className="preview-campaign-text">Preview Job</div>
        </div>
      )}
    </div>
  </div>
</div>

                              {/* <div className="campaigns-wrapper-two">
                                <div className="campaign-company">
                                  {job?.hiringCompany && (
                                    <div className="campaign-company-wrapper">
                                      <div className="campaign-initial">
                                        {job.hiringCompany.charAt(0)}
                                      </div>
                                      <div className="campaign-company-name">
                                        {job.hiringCompany}
                                      </div>
                                    </div>
                                  )}

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
                                              onClick={() => shareJob(job)}
                                            >
                                          Share Job
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
                                              jobObject: job,
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
                              </div> */}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
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
          <div className="alertBox mt-2">
            <div className="col-md-12 mx-1">
              <div className="alert-icon-section">
                <img src={jobImage} alt="" />
                {/* <i className="alert-icon bi bi-exclamation-triangle-fill"></i> */}
              </div>
              {alertpop?.label == "edit" && (
                <>
                  <h5>Do you want to edit this job?</h5>
                </>
              )}
              {alertpop?.label == "delete" && (
                <>
                  <h5>Are you sure you want to Delete this Job ? </h5>
                </>
              )}
              {alertpop?.label == "post-job" && (
                <>
                  <h5>Would you really like to post this job?</h5>
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
              Yes
            </button>
          </div>
        </div>
      </Modal>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default ListJobs;
