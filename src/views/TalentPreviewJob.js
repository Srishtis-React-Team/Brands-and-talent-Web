import React, { useEffect, useState } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp.js";
import "../assets/css/talent-dashboard.css";
import "../assets/css/preview-job.css";
import { useLocation } from "react-router-dom";
import CurrentUser from "../CurrentUser.js";

const TalentPreviewJob = (props) => {
  const { job } = props;
  const job_id = job;

  const url = window.location.href;
  const queryString = url.split("?")[1];

  const { currentUserId } = CurrentUser();

  const location = useLocation();

  const { jobId } = location.state || {};

  const navigate = useNavigate();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [jobData, setJobData] = useState("");
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [brandData, setBrandData] = useState(null);

  const getJobsByID = async () => {
    await ApiHelper.get(`${API.getAnyJobById}${job_id ? job_id : queryString}`)
      .then((resData) => {
        setJobData(resData.data.data);
        getBrand(resData.data.data?.brandId);
      })
      .catch((err) => {});
  };

  const getBrand = async (brandId) => {
    await ApiHelper.get(`${API.getBrandById}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data);
          }
        }
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
      setTimeout(function () {
        setOpenPopUp(false);
      }, 2000);
    }
  };

  const postJob = async () => {
    await ApiHelper.post(`${API.postJobByDraft}${jobId ? jobId : queryString}`)
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
  }, [job_id]);

  useEffect(() => {}, [jobData]);
  useEffect(() => {}, [jobId]);

  const createJob = () => {
    navigate("/talent-dashboard");
  };

  const handleBackClick = () => {
    if (location.state && location.state.from) {
      navigate(`/${location.state.from}`);
    } else {
      navigate(-1);
    }
  };
  const [modalData, setModalData] = useState(null);

  const applyjobs = async (data) => {
    setModalData(data);
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
        setMessage("Job applied Successfully");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          getJobsByID();
          const modalElement = document.getElementById("exampleModal");
          const bootstrapModal = new window.bootstrap.Modal(modalElement);
          bootstrapModal.hide();
        }, 1000);
      })
      .catch((err) => {});
  };

  const viewUpdateFile = (item) => {
    window.open(`${API.userFilePath}${item.fileData}`, "_blank");
  };

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} />

      <main id="mainBrand">
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

            {jobData?.howLikeToApply === "easy-apply" && (
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
              </div>
            )}
          </div>
          <div className="preview-section-two">
            <div className="d-flex align-items-center">
              <img
                className="job-company-logo"
                src={`${API.userFilePath}${jobData?.brandImage}`}
                alt=""
              />
              <div className="company-name">{jobData?.hiringCompany}</div>
            </div>

            <div className="company-location">
              <span className="job-feature-heading">Location :&nbsp; </span>
              <span>
                <span className="">
                  {jobData?.country && `${jobData.country}`}
                  {jobData?.country && jobData?.state && `, `}
                  {jobData?.state && `${jobData.state}`}
                  {(jobData?.country || jobData?.state) &&
                    jobData?.jobLocation &&
                    `, `}
                  {jobData?.jobLocation && `${jobData.jobLocation}`}
                </span>
              </span>
            </div>

            <div className="company-location">
              <span className="job-feature-heading">
                Application Deadline :&nbsp;
              </span>
              <span>
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
              <span className="job-feature-heading">Job Type :&nbsp; </span>
              <span>
                <span className="">{jobData?.jobType}</span>
              </span>
            </div>
            <div className="company-location">
              <span className="job-feature-heading">Category :&nbsp; </span>
              <span className="job-feature-values">{jobData?.category}</span>
            </div>

            <div className="company-location">
              <span className="job-feature-heading">Compensation :&nbsp; </span>
              <span>
                {jobData.compensation && (
                  <>
                    <span className="job-feature-values">
                      {jobData.compensation &&
                        Object.entries(jobData.compensation).map(
                          ([key, value]) => (
                            <span key={key}>
                              <span>{value.currency}</span>&nbsp;
                              {value?.minPay && (
                                <>
                                  <span>{value.minPay}/day</span> +&nbsp;
                                </>
                              )}
                              {value?.exactPay && (
                                <>
                                  <span>{value.exactPay}</span> + &nbsp;
                                </>
                              )}
                              {value.product_name && (
                                <>
                                  <span>{value.product_name}</span>
                                  &nbsp;
                                </>
                              )}
                              {value.product_name && value?.productValue && (
                                <>
                                  <span>
                                    ( valued at {value?.productValue} )
                                  </span>
                                </>
                              )}
                            </span>
                          )
                        )}
                    </span>
                  </>
                )}
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
                      {jobData?.benefits && jobData.benefits.length > 0 && (
                        <>
                          <li className="job-features-li">
                            <span className="job-feature-heading">
                              Benefits :
                            </span>
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
                        </>
                      )}

                      {jobData?.skills && jobData?.skills.length > 0 && (
                        <>
                          <li className="job-features-li">
                            <span className="job-feature-heading">
                              Skills :
                            </span>
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
                        </>
                      )}

                      {jobData?.minAge && (
                        <li className="job-features-li">
                          <span className="job-feature-heading">Age :</span>
                          <span className="job-feature-values">
                            {jobData?.minAge} -&nbsp;
                            {jobData?.maxAge}
                          </span>
                        </li>
                      )}
                      {jobData?.gender && (
                        <li className="job-features-li">
                          <span className="job-feature-heading">Gender :</span>
                          <span className="job-feature-values">
                            {jobData?.gender &&
                              jobData.gender
                                .map((gender, index) =>
                                  index === jobData.gender.length - 1
                                    ? gender
                                    : gender + ", "
                                )
                                .join("")}
                          </span>
                        </li>
                      )}
                      {jobData?.languages && jobData?.languages?.length > 0 && (
                        <li className="job-features-li">
                          <span className="job-feature-heading">
                            Languages :
                          </span>
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
                      )}
                      {jobData?.nationality && (
                        <li className="job-features-li">
                          <span className="job-feature-heading">
                            Nationality :
                          </span>
                          <span className="job-feature-values">
                            {jobData?.nationality &&
                              jobData.nationality
                                .map((nationality, index) =>
                                  index === jobData.nationality.length - 1
                                    ? nationality
                                    : nationality + ", "
                                )
                                .join("")}
                          </span>
                        </li>
                      )}
                      {jobData?.ethnicity && (
                        <li className="job-features-li">
                          <span className="job-feature-heading">
                            Ethnicity :
                          </span>
                          <span className="job-feature-values">
                            {jobData?.ethnicity}
                          </span>
                        </li>
                      )}

                      {(jobData?.instaMin ||
                        jobData?.tikTokMin ||
                        jobData?.linkedInMin ||
                        jobData?.fbMin ||
                        jobData?.twitterMin ||
                        jobData?.youTubeMin) && (
                        <>
                          <li className="job-features-li">
                            <span className="job-feature-heading">
                              Social Media Followers Count:
                            </span>
                            <ul>
                              {jobData?.instaMin && (
                                <li>
                                  Instagram Followers:{" "}
                                  <span className="job-feature-values">
                                    {jobData?.instaMin} - {jobData?.instaMax}
                                  </span>
                                </li>
                              )}

                              {jobData?.tikTokMin && (
                                <li>
                                  TikTok Followers:{" "}
                                  <span className="job-feature-values">
                                    {jobData?.tikTokMin} - {jobData?.tikTokMax}
                                  </span>
                                </li>
                              )}

                              {jobData?.linkedInMin && (
                                <li>
                                  Linkedin Followers:{" "}
                                  <span className="job-feature-values">
                                    {jobData?.linkedInMin} -{" "}
                                    {jobData?.linkedInMax}
                                  </span>
                                </li>
                              )}

                              {jobData?.fbMin && (
                                <li>
                                  Facebook Followers:{" "}
                                  <span className="job-feature-values">
                                    {jobData?.fbMin} - {jobData?.fbMax}
                                  </span>
                                </li>
                              )}

                              {jobData?.twitterMin && (
                                <li>
                                  Twitter(X) Followers:{" "}
                                  <span className="job-feature-values">
                                    {jobData?.twitterMin} -{" "}
                                    {jobData?.twitterMax}
                                  </span>
                                </li>
                              )}

                              {jobData?.youTubeMin && (
                                <li>
                                  YouTube Followers:{" "}
                                  <span className="job-feature-values">
                                    {jobData?.youTubeMin} -{" "}
                                    {jobData?.youTubeMax}
                                  </span>
                                </li>
                              )}
                            </ul>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
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

            {jobData?.jobDescription && jobData?.jobDescription.length > 0 && (
              <>
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
              </>
            )}

            {jobData?.whyWorkWithUs && jobData?.whyWorkWithUs.length > 0 && (
              <>
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
              </>
            )}

            {jobData?.hiringCompanyDescription &&
              jobData?.hiringCompanyDescription?.length > 0 && (
                <>
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
                              dangerouslySetInnerHTML={{
                                __html: htmlContent,
                              }}
                            />
                          )
                        )}
                    </div>
                  </div>
                </>
              )}
            {jobData?.workSamples && jobData?.workSamples?.length > 0 && (
              <>
                <div className="job-about-section">
                  <div className="job-feature-title">Project brief / TOR</div>
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
              </>
            )}

            {jobData?.howLikeToApply !== "easy-apply" && (
              <div className="job-about-section">
                <div className="job-feature-title">How to Apply</div>
                <div className="job-about-values">
                  Interested candidates should submit their resume and a link
                  that contains portfolio from Brands and Talent website to
                  <span className="how-apply-terms-link">
                    {brandData?.brandEmail}
                  </span>
                  Please include
                  <span className="how-apply-terms-link">
                    {jobData?.jobTitle}
                  </span>
                  in the subject line.
                </div>
              </div>
            )}

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
