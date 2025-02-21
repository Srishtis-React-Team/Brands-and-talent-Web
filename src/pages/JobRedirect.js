import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../layout/header";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import "../assets/css/talent-dashboard.css";
import "../assets/css/preview-job.css";
import "../assets/css/createjobs.css";
import Loader from "../views/Loader";
import { tr } from "date-fns/locale";
import CurrentUser from "../CurrentUser";
const JobRedirect = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [talentData, setTalentData] = useState();
  const { currentUserId } = CurrentUser();

  useEffect(() => {
    if (currentUserId) {
      getTalentById();
    }
  }, [currentUserId]);
  const [modalData, setModalData] = useState(null);

  const getTalentById = async () => {
    await ApiHelper.post(`${API.getTalentById}${currentUserId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setTalentData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => { });
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
      .catch((err) => { });
  };

  useEffect(() => {
    getJobsByID();
  }, [jobId]);

  const [jobData, setJobData] = useState("");
  const getJobsByID = async () => {
    let formData = {
      jobId: jobId,
    };
    setLoading(true);
    await ApiHelper.post(`${API.fetchByJobUrl}`, formData)
      .then((resData) => {
        setLoading(false);

        setJobData(resData.data.data);
        getBrand(resData.data.data?.brandId);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const applyjobs = async (data) => {
    const userId = localStorage.getItem("userId");
    const userType = localStorage.getItem("currentUserType");
    if (!userId) {
      // Redirect to "/get-booked" or "/get-booked/:jobId" based on jobId availability
      localStorage.setItem("pendingJobId", jobId);
      setMessage("You must be logged in");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
        navigate("/login");
      }, 2000);
      return;
    } else if (userId && userType == "talent") {
      if (talentData?.accountBlock == false) {
        if (talentData?.planName == "Basic") {
          let upgradeMessage;
          if (talentData?.planName === "Basic") {
            upgradeMessage = "Upgrade to Pro to apply for this job.";
          }
          setMessage(`${upgradeMessage}`);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            navigate("/pricing");
          }, 4000);
        } else if (
          talentData?.planName?.includes("Pro") ||
          talentData?.planName == "Premium"
        ) {
          setModalData(data);
          if (data?.isApplied != "Applied") {
            const modalElement = document.getElementById("viewJobApplyModal");
            const bootstrapModal = new window.bootstrap.Modal(modalElement);
            bootstrapModal.show();
          }
        }
      } else if (talentData?.accountBlock == true) {
        setMessage("Please upgrade your plan to access your profile");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate(`/pricing`);
        }, 3000);
      }

      // if (userType === "talent") {
      //   navigate("/talent-dashboard");
      // } else if (userType === "brand") {
      //   navigate("/list-jobs");
      // } else {
      //   navigate("/"); // Default fallback
      // }
    }
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  };

  // State to hold the window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const containerStyle = {
    width: windowWidth >= 600 ? "800px" : "400px", // 800px for desktop, 400px for mobile
  };

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const viewUpdateFile = (item) => {
    window.open(`${API.userFilePath}${item.fileData}`, "_blank");
  };

  useEffect(() => {
    console.log(jobData, "jobData");
  }, [jobData]);

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
          const modalElement = document.getElementById("viewJobApplyModal");
          const bootstrapModal = new window.bootstrap.Modal(modalElement);
          bootstrapModal.hide();
          navigate("/applied-jobs");
        }, 1000);
      })
      .catch((err) => { });
  };
  return (
    <>
      <>
        <Header />
        {jobData && (
          <>
            <div className="unique-job">
              <main id="mainBrand">
                {/* className={`scrolscrolPrevOut ${
              from !== "dashboard" ? "not-viewjob" : ""
            }`} */}
                <div>
                  <div className="brand-content-main preview-main-box boxBg scrlInner scroll">
                    <div className="preview-section-one">
                      <div className="job-main-details">
                        <div className="preview-job-name">
                          {jobData?.jobTitle}
                        </div>
                      </div>
                      {(jobData?.howLikeToApply === "easy-apply" ||
                        jobData?.isApplied == "Applied") && (
                          <div className="easy-apply-section">
                            <div
                              className={
                                jobData?.isApplied === "Apply Now" ||
                                  !jobData?.isApplied
                                  ? "apply-now-btn"
                                  : "apply-now-btn applied-btn"
                              }
                              onClick={() => {
                                applyjobs(jobData);
                              }}
                            >
                              <i className="bi bi-briefcase-fill"></i>

                              <div>Quick Apply</div>
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
                        <div className="company-name">
                          {jobData?.hiringCompany}
                        </div>
                      </div>

                      <div className="company-location">
                       
                        <span className="font-600">
                          Location :&nbsp;{" "}
                        </span>
                      
                        <span>
                          <span>
                            <span className="job-feature-heading">
                              {[
                                jobData?.jobLocation,
                                jobData?.city,
                                jobData?.state,
                                jobData?.country,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </span>
                          </span>
                        </span>
                      </div>

                      <div className="company-location">
                        <span className="job-feature-heading">
                        <span className="font-600">
                          Application Deadline :&nbsp;
                        </span>
                        </span>
                        <span className="job-feature-values">
                          {new Date(
                            jobData?.lastDateForApply
                          ).toLocaleDateString("en-GB", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="company-location">
                      <span className="font-600">
                      Job Type :&nbsp;
                          </span>
                        
                       
                        <span>
                          <span className="job-feature-values">{jobData?.jobType}</span>
                        </span>
                      </div>
                      <div className="company-location">
                       
                        <span className="font-600">
                          Category :&nbsp;
                          </span>
                       
                        <span className="job-feature-values">
                          {jobData?.category}
                        </span>
                      </div>

                      <div className="company-location comp-main">
                        {[
                          jobData?.compensation?.paid_collaboration,
                          jobData?.compensation?.product_gift,
                          jobData?.compensation?.paid_collaboration_and_gift,
                        ].some(
                          (obj) =>
                            obj &&
                            Object.values(obj).some(
                              (value) =>
                                value !== null &&
                                value !== undefined &&
                                value !== ""
                            )
                        ) && (
                            <>
                              <span className="font-600">
                                Compensation :&nbsp;
                              </span>
                            </>
                          )}

                        <span className="comp-H">
                          {jobData?.compensation && (
                            <>
                              <span className="job-feature-values">
                                {jobData?.compensation &&
                                  Object.entries(jobData?.compensation).map(
                                    ([key, value]) => (
                                      <span key={key}>
                                        {(value?.minPay ||
                                          value?.maxPay ||
                                          value?.exactPay) && (
                                            <>
                                              <span>{value.currency}</span>&nbsp;
                                            </>
                                          )}
                                        {value?.minPay && (
                                          <>
                                            <span>
                                              {value.minPay}&nbsp;
                                              {value.frequency}
                                            </span>
                                            &nbsp;
                                          </>
                                        )}
                                        {value?.maxPay && (
                                          <>
                                            <span>to</span>&nbsp;
                                          </>
                                        )}
                                        {value?.maxPay && (
                                          <>
                                            <span>
                                              {value.maxPay}&nbsp;
                                              {value.frequency}
                                            </span>
                                            &nbsp;
                                          </>
                                        )}
                                        {value?.exactPay && (
                                          <>
                                            <span>{value.exactPay}</span>&nbsp;
                                          </>
                                        )}

                                        {value.product_name && (
                                          <>
                                            &nbsp;
                                            {isValidURL(value.product_name) ? (
                                              <a
                                                href={value.product_name}
                                                style={{
                                                  color: "#c2114b",
                                                  textDecoration: "underline",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                {value.product_name}
                                              </a>
                                            ) : (
                                              <span>{value.product_name}</span>
                                            )}
                                            &nbsp;
                                          </>
                                        )}
                                        {value.product_name &&
                                          value?.productValue && (
                                            <>
                                              <span>
                                                ( valued at {value.currency}{" "}
                                                {value?.productValue} )
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
                          <div className="job-features col-md-12">
                            <div className="job-feature-title">
                              Key Details and Requirements
                            </div>
                            <div className="job-feature-points">
                              <ul>
                                {jobData?.benefits &&
                                  jobData.benefits.length > 0 && (
                                    <>
                                      <li
                                        className="job-features-li"
                                        style={containerStyle}
                                      >
                                        <span className="job-feature-heading">
                                          Benefits :
                                        </span>
                                        <span className="job-feature-values">
                                          {jobData?.benefits &&
                                            jobData.benefits
                                              .map((benefits, index) =>
                                                index ===
                                                  jobData.benefits.length - 1
                                                  ? benefits
                                                  : benefits + ", "
                                              )
                                              .join("")}
                                        </span>
                                      </li>
                                    </>
                                  )}

                                {jobData?.skills &&
                                  jobData?.skills.length > 0 && (
                                    <>
                                      <li className="job-features-li">
                                        <span className="job-feature-heading">
                                          Skills :
                                        </span>
                                        <span className="job-feature-values">
                                          {jobData?.skills &&
                                            jobData.skills
                                              .map((skill, index) =>
                                                index ===
                                                  jobData.skills.length - 1
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
                                    <span className="job-feature-heading">
                                      Age :
                                    </span>
                                    <span className="job-feature-values">
                                      {jobData?.minAge} -&nbsp;
                                      {jobData?.maxAge}
                                    </span>
                                  </li>
                                )}
                                {jobData?.gender &&
                                  jobData.gender.length > 0 ? (
                                  <li className="job-features-li">
                                    <span className="job-feature-heading">
                                      Gender :
                                    </span>
                                    <span className="job-feature-values">
                                      {jobData.gender
                                        .map((gender, index) =>
                                          index === jobData.gender.length - 1
                                            ? gender
                                            : gender + ", "
                                        )
                                        .join("")}
                                    </span>
                                  </li>
                                ) : (
                                  <li className="job-features-li">
                                    <span className="job-feature-heading">
                                      Gender :
                                    </span>
                                    <span className="job-feature-values">
                                      No data added
                                    </span>
                                  </li>
                                )}
                                {jobData?.languages &&
                                  jobData?.languages?.length > 0 && (
                                    <li className="job-features-li">
                                      <span className="job-feature-heading">
                                        Languages :
                                      </span>
                                      <span className="job-feature-values">
                                        {jobData?.languages &&
                                          jobData.languages
                                            .map((skill, index) =>
                                              index ===
                                                jobData.languages.length - 1
                                                ? skill
                                                : skill + ", "
                                            )
                                            .join("")}
                                      </span>
                                    </li>
                                  )}
                                {jobData?.nationality &&
                                  jobData.nationality.length > 0 ? (
                                  <li className="job-features-li">
                                    <span className="job-feature-heading">
                                      Nationality :
                                    </span>
                                    <span className="job-feature-values">
                                      {jobData.nationality
                                        .map((nationality, index) =>
                                          index ===
                                            jobData.nationality.length - 1
                                            ? nationality
                                            : nationality + ", "
                                        )
                                        .join("")}
                                    </span>
                                  </li>
                                ) : (
                                  <li className="job-features-li">
                                    <span className="job-feature-heading">
                                      Nationality :
                                    </span>
                                    <span className="job-feature-values">
                                      No data added
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
                                        <div className="d-flex flex-column">
                                          <span className="job-feature-heading pr-1">
                                            Social Media Followers Count:
                                          </span>
                                          <ul className="mb-0 mt-2">
                                            {jobData?.instaMin && (
                                              <li>
                                                <span className="job-feature-heading">
                                                  Instagram Followers:{" "}
                                                </span>{" "}
                                                <span className="job-feature-values">
                                                  {jobData?.instaMin} -{" "}
                                                  {jobData?.instaMax}
                                                </span>
                                              </li>
                                            )}
                                            {jobData?.tikTokMin && (
                                              <li>
                                                <span className="job-feature-heading">
                                                  TikTok:
                                                </span>{" "}
                                                <span className="job-feature-values">
                                                  {jobData?.tikTokMin} -{" "}
                                                  {jobData?.tikTokMax}
                                                </span>
                                              </li>
                                            )}

                                            {jobData?.linkedInMin && (
                                              <li>
                                                <span className="job-feature-heading">
                                                  LinkedIn:
                                                </span>{" "}
                                                <span className="job-feature-values">
                                                  {jobData?.linkedInMin} -{" "}
                                                  {jobData?.linkedInMax}
                                                </span>
                                              </li>
                                            )}

                                            {jobData?.fbMin && (
                                              <li>
                                                <span className="job-feature-heading">
                                                  Facebook:
                                                </span>{" "}
                                                <span className="job-feature-values">
                                                  {jobData?.fbMin} -{" "}
                                                  {jobData?.fbMax}
                                                </span>
                                              </li>
                                            )}

                                            {jobData?.twitterMin && (
                                              <li>
                                                <span className="job-feature-heading">
                                                  Twitter (X):
                                                </span>{" "}
                                                <span className="job-feature-values">
                                                  {jobData?.twitterMin} -{" "}
                                                  {jobData?.twitterMax}
                                                </span>
                                              </li>
                                            )}

                                            {jobData?.youTubeMin && (
                                              <li>
                                                <span className="job-feature-heading">
                                                  YouTube:
                                                </span>{" "}
                                                <span className="job-feature-values">
                                                  {jobData?.youTubeMin} -{" "}
                                                  {jobData?.youTubeMax}
                                                </span>
                                              </li>
                                            )}
                                          </ul>
                                        </div>
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
                              <div className="job-feature-title">
                                Screening Questions
                              </div>
                              <div>
                                <ul>
                                  {jobData?.questions &&
                                    jobData?.questions.map(
                                      (question, index) => (
                                        <li
                                          className="job-benefits-values"
                                          key={index}
                                        >
                                          {question}
                                        </li>
                                      )
                                    )}
                                </ul>
                              </div>
                            </>
                          )}
                      </div>

                      {jobData?.jobDescription &&
                        jobData?.jobDescription.length > 0 && (
                          <>
                            <div className="job-about-section">
                              <div className="job-feature-title">
                                Job Description
                              </div>
                              <div className="job-about-values">
                                {jobData?.jobDescription &&
                                  jobData?.jobDescription?.map(
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

                      {jobData?.whyWorkWithUs &&
                        jobData?.whyWorkWithUs.length > 0 && (
                          <>
                            <div className="job-about-section">
                              <div className="job-feature-title">
                                Why Work With Us
                              </div>
                              <div className="job-about-values">
                                {jobData?.whyWorkWithUs &&
                                  jobData?.whyWorkWithUs?.map(
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
                      {jobData?.workSamples &&
                        jobData?.workSamples?.length > 0 && (
                          <>
                            <div className="job-about-section">
                              <div className="job-feature-title">
                                Project brief / TOR
                              </div>
                              <div className="service-files-main">
                                <div className="w-100">
                                  {jobData?.workSamples?.length > 0 &&
                                    jobData?.workSamples?.map((item) => {
                                      return (
                                        <>
                                          <div className="update-portfolio-cards project-file-wrapper">
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
                                                        onClick={() =>
                                                          viewUpdateFile(item)
                                                        }
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
                            Interested candidates should submit their resume and
                            a link that contains portfolio from Brands & Talent
                            website to
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
                    </div>
                  </div>
                </div>
              </main>
            </div>

            <div
              className="modal fade"
              id="viewJobApplyModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    {modalData?.jobTitle && (
                      <>
                        <p id="exampleModalLabel" className="modal-job-title">
                          {modalData?.jobTitle}
                        </p>
                      </>
                    )}

                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div className="modal-body">
                    {modalData?.hiringCompany && (
                      <div className="modal-job-flex">
                        <i className="bi bi-building model-job-icons"></i>
                        <div className="model-job-name">
                          {modalData?.hiringCompany}
                        </div>
                      </div>
                    )}
                    {(modalData?.employmentType || modalData?.jobType) && (
                      <div className="modal-job-flex">
                        <i className="bi bi-briefcase-fill model-job-icons"></i>
                        <div className="model-job-name">
                          {modalData?.employmentType && (
                            <span className="modal-job-workplace">
                              {modalData?.employmentType}{" "}
                            </span>
                          )}
                          {modalData?.jobType}
                        </div>
                      </div>
                    )}
                    {(modalData?.city || modalData?.state) && (
                      <div className="modal-job-flex">
                        <i className="bi bi-geo-alt-fill model-job-icons"></i>
                        <div className="model-job-name">
                          {modalData?.city && <span>{modalData?.city}</span>}
                          {modalData?.city && modalData?.state && ", "}
                          {modalData?.state}
                        </div>
                      </div>
                    )}
                    {modalData?.category && (
                      <div className="modal-job-flex">
                        <i className="bi bi-bookmarks-fill model-job-icons"></i>
                        <div className="model-job-name">
                          {modalData?.category}
                        </div>
                      </div>
                    )}
                    {modalData?.compensation &&
                      Object.keys(modalData?.compensation).length > 0 && (
                        <div className="modal-job-flex">
                          <i className="bi bi-cash-coin model-job-icons"></i>
                          <div className="model-job-name">
                            {Object.keys(modalData?.compensation)[0] ===
                              "paid_collaboration_and_gift"
                              ? "Paid Collaboration + Product/Gift"
                              : Object.keys(modalData?.compensation)[0] ===
                                "product_gift"
                                ? "Product/Gift"
                                : Object.keys(modalData?.compensation)[0] ===
                                  "paid_collaboration"
                                  ? "Paid Collaboration"
                                  : ""}
                          </div>
                        </div>
                      )}
                    {modalData?.skills && modalData?.skills.length > 0 && (
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
                    )}
                    {modalData?.gender &&
                      modalData?.gender.length > 0 &&
                      Array.isArray(modalData?.gender) && (
                        <div className="modal-job-flex">
                          <i className="bi bi-gender-ambiguous model-job-icons"></i>
                          <div className="model-job-name">
                            {modalData.gender.join(", ")}
                          </div>
                        </div>
                      )}

                    {modalData?.lastDateForApply && (
                      <div className="modal-job-flex">
                        <i className="bi bi-alarm-fill model-job-icons"></i>
                        <div className="model-job-name">
                          <span className="job-company_dtls">
                            Application Deadline:{" "}
                          </span>
                          <span>
                            {new Date(
                              modalData.lastDateForApply
                            ).toLocaleDateString("en-GB", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    )}
                    {modalData?.jobDescription &&
                      modalData?.jobDescription.length > 0 && (
                        <>
                          <div className="model-about-title">About the job</div>
                          <div className="model-job-about-values">
                            {modalData?.jobDescription.map(
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
                        </>
                      )}
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
          </>
        )}

        {openPopUp && <PopUp message={message} />}
        {loading ? <Loader /> : <div></div>}
      </>
    </>
  );
};

export default JobRedirect;
