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

  const viewUpdateFile = (item) => {
    console.log(item, "viewFile");
    window.open(`${API.userFilePath}${item.fileData}`, "_blank");
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
        <div className="brand-content-main boxBg px-4">
          <div className="back-create">
            <i className="bi bi-arrow-left-circle-fill"></i>
            <div onClick={handleBackClick} className="back-to">
              Back
            </div>
          </div>
          <div className="preview-section-one">
            <div className="job-main-details">
              <div className="preview-job-name">{jobData?.jobTitle}</div>
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
            {/* <div className="easy-apply-section">
                <div className="easy-apply-btn">Easy Apply</div>
              </div> */}
          </div>
          <div className="preview-section-two">
            <div className="d-flex">
              <img
                className="job-company-logo"
                src={`${API.userFilePath}${jobData?.brandImage}`}
                alt=""
              />
              <div className="company-name">{jobData?.hiringCompany}</div>
            </div>

            <div className="company-location">
              <span>Location :&nbsp; </span>
              {/* {jobData?.paymentType?.label} */}
              <span>
                <span className="">
                  {jobData?.state}, {jobData?.country}, {jobData?.jobLocation}
                </span>
              </span>
            </div>

            <div className="company-location">
              <span>
                Application Deadline :&nbsp;
                {new Date(jobData?.lastDateForApply).toLocaleDateString(
                  "en-GB",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </div>

            <div className="company-location">
              <span>Payment :&nbsp; </span>
              {/* {jobData?.paymentType?.label} */}
              <span>
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
              </span>
            </div>

            <div className="company-location">
              <span>Job Type :&nbsp; </span>
              {/* {jobData?.paymentType?.label} */}
              <span>
                <span className="">{jobData?.jobType}</span>
              </span>
            </div>

            <div className="company-location">
              <span>Application Type :&nbsp; </span>
              {/* {jobData?.paymentType?.label} */}
              <span>
                <span className="">
                  {jobData?.howLikeToApply
                    ? jobData.howLikeToApply
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")
                    : ""}
                </span>
              </span>
            </div>

            <div className="job-features-benefits pb-0">
              <div className="row">
                <div className="job-features col-md-6">
                  <div className="job-feature-title">
                    Key Details and Requirements
                  </div>
                  <div className="job-feature-points">
                    <ul>
                      <li className="job-features-li">
                        <span className="job-feature-heading">
                          Compensation :
                        </span>
                        <span className="job-feature-values">
                          {jobData.compensation &&
                            Object.entries(jobData.compensation).map(
                              ([key, value]) => (
                                <span key={key}>
                                  <span>{value.currency}</span>
                                  <span>{value.minPay}/day</span> +&nbsp;
                                  <span>{value.product_name}</span>
                                  {/* <p>
                                      <strong>{key}</strong>
                                    </p>
                                    <p>Type: {value.type}</p>
                                    <p>Product Name: {value.product_name}</p>
                                    <p>Min Pay: {value.minPay}</p>
                                    <p>Max Pay: {value.maxPay}</p>
                                    <p>Currency: {value.currency}</p>
                                    <p>Frequency: {value.frequency}</p> */}
                                </span>
                              )
                            )}
                        </span>
                      </li>
                      <li className="job-features-li">
                        <span className="job-feature-heading">Benefits :</span>
                        <span className="job-feature-values">
                          {jobData?.benefits &&
                            jobData.benefits
                              .map((benefits, index) =>
                                index === jobData.benefits.length - 1
                                  ? benefits
                                  : benefits + ", "
                              )
                              .join("")}
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
                      <li className="job-features-li">
                        <span className="job-feature-heading">
                          Categories :
                        </span>
                        <span className="job-feature-values">
                          {/* {jobData?.skills &&
                              jobData.skills
                                .map((skill, index) =>
                                  index === jobData.skills.length - 1
                                    ? skill
                                    : skill + ", "
                                )
                                .join("")} */}
                        </span>
                      </li>
                      <li className="job-features-li">
                        <span className="job-feature-heading">Age :</span>
                        <span className="job-feature-values">
                          {jobData?.minAge} -&nbsp;
                          {jobData?.maxAge}
                        </span>
                      </li>
                      <li className="job-features-li">
                        <span className="job-feature-heading">Gender :</span>
                        <span className="job-feature-values">
                          {jobData?.gender}
                        </span>
                      </li>
                      <li className="job-features-li">
                        <span className="job-feature-heading">Languages :</span>
                        <span className="job-feature-values">
                          {jobData?.languages &&
                            jobData.languages
                              .map((skill, index) =>
                                index === jobData.languages.length - 1
                                  ? skill
                                  : skill + ", "
                              )
                              .join("")}
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
                        <span className="job-feature-heading">Ethnicity :</span>
                        <span className="job-feature-values">
                          {jobData?.nationality}
                        </span>
                      </li>
                      <li className="job-features-li">
                        <span className="job-feature-heading">
                          Social Media Followers Count:
                        </span>
                        <ul>
                          <li>
                            Instagram Followers:{" "}
                            <span className="job-feature-values">
                              {jobData?.linkedInMin} - {jobData?.linkedInMax}
                            </span>
                          </li>

                          <li>
                            TikTok Followers:{" "}
                            <span className="job-feature-values">
                              {jobData?.tikTokMin} - {jobData?.tikTokMax}
                            </span>
                          </li>

                          <li>
                            Linkedin Followers:{" "}
                            <span className="job-feature-values">
                              {jobData?.linkedInMin} - {jobData?.linkedInMax}
                            </span>
                          </li>

                          <li>
                            Facebook Followers:{" "}
                            <span className="job-feature-values">
                              {jobData?.fbMin} - {jobData?.fbMax}
                            </span>
                          </li>

                          <li>
                            Twitter(X) Followers :{" "}
                            <span className="job-feature-values">
                              {jobData?.twitterMin} - {jobData?.twitterMax}
                            </span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className="job-benefits col-md-6">
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
                  </div> */}
              </div>
            </div>
            <div className="job-questions-section">
              {jobData?.questions?.length > 0 &&
                jobData?.questions?.some((question) => question) && (
                  <>
                    <div className="job-feature-title">Screening Questions</div>
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
            <div className="job-about-section">
              <div className="job-feature-title">Job Description</div>
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
            <div className="job-about-section">
              <div className="job-feature-title">Why Work With Us</div>
              <div className="job-about-values">
                {jobData?.whyWorkWithUs &&
                  jobData?.whyWorkWithUs?.map((htmlContent, index) => (
                    <div
                      key={index}
                      dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                  ))}
              </div>
            </div>
            <div className="job-about-section">
              <div className="job-feature-title">
                Hiring Company Description
              </div>
              <div className="job-about-values">
                {jobData?.hiringCompanyDescription &&
                  jobData?.hiringCompanyDescription?.map(
                    (htmlContent, index) => (
                      <div
                        key={index}
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                      />
                    )
                  )}
              </div>
            </div>
            <div className="job-about-section">
              <div className="job-feature-title">Work Samples</div>
              <div className="service-files-main">
                <div>
                  {jobData?.workSamples?.length > 0 &&
                    jobData?.workSamples?.map((item) => {
                      return (
                        <>
                          <div className="update-portfolio-cards">
                            <div className="update-portfolio-icon">
                              <div className="file-section">
                                {item.type === "image" && (
                                  <div className="fileType">
                                    <i className="bi bi-card-image"></i>
                                  </div>
                                )}
                                {item.type === "audio" && (
                                  <div className="fileType">
                                    <i className="bi bi-mic-fill"></i>
                                  </div>
                                )}
                                {item.type === "video" && (
                                  <div className="fileType">
                                    <i className="bi bi-play-circle-fill"></i>
                                  </div>
                                )}
                                {item.type === "document" && (
                                  <div className="fileType">
                                    <i className="bi bi-file-earmark-richtext"></i>
                                  </div>
                                )}
                                <div className="update-portfolio-fileName">
                                  {item.title}
                                </div>
                                <div className="update-portfolio-action">
                                  <i
                                    className="bi bi-three-dots-vertical"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  ></i>
                                  <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                  >
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        onClick={() => viewUpdateFile(item)}
                                      >
                                        View
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="update-portfolio-action"></div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>

            {jobData?.howLikeToApply !== "easy-apply" && (
              <div className="job-about-section">
                <div className="job-feature-title">How to Apply</div>
                <div className="job-about-values">
                  <p className="mb-3 how-apply-terms">
                    Email your resume along with your Brands & Talent portfolio
                    to brandsntalent@gmail.com.
                  </p>
                  <p className="mb-3 how-apply-terms">
                    For more information: Call us at +855 855 855.
                  </p>
                  <p>
                    <span className="how-apply-terms-bold">
                      {" "}
                      View all jobs at Brands & Talent:
                    </span>
                    &nbsp;
                    <span className="how-apply-terms-link">
                      {" "}
                      brandsandtalent.com/company/brandsandtalent/jobs
                    </span>
                  </p>
                </div>
              </div>
            )}

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
                <div className="create-job-buttons mt-4 mb-2">
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
