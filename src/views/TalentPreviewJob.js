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
import CurrentUser from "../CurrentUser.js";

const TalentPreviewJob = () => {
  const url = window.location.href;
  const queryString = url.split("?")[1];
  console.log(" queryString:", queryString);

  const {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
  } = CurrentUser();

  useEffect(() => {
    console.log(currentUserId, "currentUserId");
    if (!currentUserId) {
      navigate("/login");
    }
  }, [currentUserId]);

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

  const getJobsByID = async () => {
    await ApiHelper.get(`${API.getAnyJobById}${jobId ? jobId : queryString}`)
      .then((resData) => {
        console.log(resData.data.data, "getJobsByID");
        setJobData(resData.data.data);
      })
      .catch((err) => {});
  };

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const viewFile = (file) => {
    window.open(`${API.userFilePath}${file.fileData}`, "_blank");
  };

  const saveAsDraft = async () => {
    if (jobId ? jobId : queryString) {
      setMessage("Job Saved To Draft");
      setOpenPopUp(true);
      setTimeout(function() {
        setOpenPopUp(false);
      }, 2000);
    }
  };

  const postJob = async () => {
    await ApiHelper.post(`${API.postJobByDraft}${jobId ? jobId : queryString}`)
      .then((resData) => {
        console.log(resData, "draftedData");
        console.log(resData.data.data._id, "draftedData");
        if (resData.data.status === true) {
          setMessage("Job Posted SuccessFully!");
          setOpenPopUp(true);
          setTimeout(function() {
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
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getJobsByID();
  }, []);
  useEffect(() => {
    console.log(jobData, "jobData");
    console.log(jobData?.questions, "jobData questions");
  }, [jobData]);
  useEffect(() => {
    console.log(jobId, "jobId");
  }, [jobId]);

  const createJob = () => {
    navigate("/talent-dashboard");
  };

  const handleBackClick = () => {
    if (location.state && location.state.from) {
      navigate(`/${location.state.from}`);
    } else {
      navigate(-1); // Equivalent to history.goBack() in v5
    }
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

  const handleCloseModal = async () => {
    const formData = {
      talentId: currentUserId,
      brandId: modalData?.brandId,
      gigId: modalData?._id,
    };
    await ApiHelper.post(API.applyjobs, formData)
      .then((resData) => {
        setMessage("Job Applied SuccessFully!");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
          getJobsByID();
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
          showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
        }`}
      >
        <TalentSideMenu />
      </div>

      <main
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div className="brand-content-main boxBg p-4">
          <div className="back-create">
            <i className="bi bi-arrow-left-circle-fill"></i>
            <div onClick={handleBackClick} className="back-to">
              Back to jobs
            </div>
          </div>
          <div className="preview-section-one">
            <div className="job-main-details">
              <div className="preview-job-name">
                <i class="bi bi-suitcase-lg"></i>&nbsp; {jobData?.jobTitle}
              </div>
              <div className="job-price">
                {jobData?.paymentType?.label === "range" && (
                  <>
                    <span className="job-pay">
                      {jobData?.paymentType?.minPay}&nbsp;
                      {jobData?.jobCurrency}
                    </span>
                    <span className="job-to-pay">to</span>
                    <span className="job-pay">
                      {jobData?.paymentType?.maxPay}&nbsp;
                      {jobData?.jobCurrency}
                    </span>
                  </>
                )}
                {jobData?.paymentType?.label === "fixed" && (
                  <>
                    <span className="job-pay">
                      {jobData?.paymentType?.amount}
                      {jobData?.jobCurrency}
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="easy-apply-section">
              <div
                className={
                  jobData?.isApplied === "Apply Now" || !jobData?.isApplied
                    ? "apply-now-btn"
                    : "apply-now-btn applied-btn"
                }
                onClick={() => {
                  applyjobs(jobData);
                }}
              >
                {jobData?.isApplied == "Applied" && (
                  <>
                    <i className="bi bi-check-circle-fill"></i>
                  </>
                )}
                {jobData?.isApplied == "Apply Now" ||
                  (!jobData?.isApplied && (
                    <>
                      <i className="bi bi-briefcase-fill"></i>
                    </>
                  ))}
                {jobData?.isApplied === "Apply Now" ||
                  (!jobData?.isApplied && <div>Easy Apply</div>)}
                {jobData?.isApplied === "Applied" && <div>Applied</div>}
              </div>

              {/* <div className="easy-apply-btn">Easy Apply</div> */}
            </div>
          </div>
          <div className="preview-section-two">
            <div className="company-name">{jobData?.hiringCompany}</div>
            <div className="company-location">
              <span>
                <i className="bi bi-geo-alt-fill company-logos"></i>
              </span>
              <span>
                {jobData?.streetAddress} {jobData?.jobLocation}
              </span>
              <span>
                <i className="bi bi-clock-fill company-logos time-logo"></i>
              </span>
              <span> {jobData?.jobType}</span>
            </div>
            <div className="job-features-benefits pt-0">
              <div className="row">
                <div className="job-features col-md-6">
                  <div className="job-feature-title">Features</div>
                  <div className="job-feature-points">
                    <ul>
                      <li className="job-features-li">
                        <span className="job-feature-heading">
                          WorkPlace Type :
                        </span>
                        <span className="job-feature-values">
                          {jobData?.workplaceType}
                        </span>
                      </li>
                      <li className="job-features-li">
                        <span className="job-feature-heading">Age :</span>
                        <span className="job-feature-values">
                          {jobData?.age}
                        </span>
                      </li>
                      <li className="job-features-li">
                        <span className="job-feature-heading">Gender :</span>
                        <span className="job-feature-values">
                          {jobData?.gender}
                        </span>
                      </li>
                      <li className="job-features-li">
                        <span className="job-feature-heading">
                          Nationality :
                        </span>
                        <span className="job-feature-values">
                          {jobData?.nationality}
                        </span>
                      </li>
                      <li className="job-features-li">
                        <span className="job-feature-heading">Language :</span>
                        <span className="job-feature-values">
                          {jobData?.languages}
                        </span>
                      </li>
                      <li className="job-features-li">
                        <span className="job-feature-heading">Skills :</span>
                        <span className="job-feature-values">
                          {jobData?.skills &&
                            jobData.skills
                              .map((skill, index) =>
                                index === jobData.skills.length - 1
                                  ? skill
                                  : skill + ", "
                              )
                              .join("")}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="job-benefits col-md-6">
                  <div className="job-feature-title">Benefits</div>
                  <div className="job-benefits-points">
                    <ul>
                      {jobData?.benefits &&
                        jobData.benefits.map((benefit, index) => (
                          <li className="job-benefits-values" key={index}>
                            <span>{benefit}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="job-about-section">
              <div className="job-feature-title mt-0">About Job</div>
              <div className="job-about-values">
                {jobData?.jobDescription &&
                  jobData?.jobDescription?.map((htmlContent, index) => (
                    <div
                      key={index}
                      dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                  ))}
              </div>
            </div>
            <div className="job-questions-section">
              {jobData?.questions?.length > 0 &&
                jobData?.questions?.some((question) => question) && (
                  <>
                    <div className="job-feature-title mt-0">
                      Screening Questions
                    </div>
                    <div>
                      <ul>
                        {jobData?.questions &&
                          jobData?.questions.map((question, index) => (
                            <li className="job-benefits-values" key={index}>
                              {question}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </>
                )}
            </div>
            {/* <div className="job-feature-title">Work Samples</div>

              <div className="cvlist-wrapper">
                {jobData?.workSamples?.length > 0 &&
                  jobData?.workSamples.map((file) => {
                    return (
                      <>
                        <>
                          <div className="cv-card" key={file.title}>
                            <i className="fa-solid fa-file"></i>
                            <div className="fileName">{file.title}</div>
                            <button
                              className="view-cv"
                              onClick={() => viewFile(file)}
                            >
                              View
                            </button>
                          </div>
                        </>
                      </>
                    );
                  })}
              </div> */}

            {jobData?.type == "Draft" && (
              <>
                <div className="create-job-buttons my-4">
                  <div
                    className="save-draft-button"
                    onClick={(e) => {
                      e.preventDefault();
                      saveAsDraft();
                    }}
                  >
                    Save Draft
                  </div>
                  <div
                    className="post-job-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      postJob();
                    }}
                  >
                    Post Job Now
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

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

export default TalentPreviewJob;
