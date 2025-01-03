import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.css";
import "../../assets/css/createjobs.css";
import "../../assets/css/preview-job.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import BrandHeader from "./BrandHeader";
import BrandSideMenu from "./BrandSideMenu";
const PreviewJob = ({ data, onButtonClick }) => {
  const location = useLocation();
  const { jobId } = location.state || {};

  const navigate = useNavigate();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [jobData, setJobData] = useState("");
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  const getJobsByID = async () => {
    const formData = {
      type: "brand",
    };
    await ApiHelper.post(`${API.getAnyJobById}${jobId}`, formData)
      .then((resData) => {
        setJobData(resData.data.data);
      })
      .catch((err) => { });
  };

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
        navigate("/list-jobs", {
          state: {
            jobId: jobId,
          },
        });
      }, 2000);
    }
  };
  const [brandId, setBrandId] = useState(null);
  const [brandData, setBrandData] = useState(null);

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));

    if (brandId && brandId != null) {
      getBrand();
    }
  }, [brandId]);

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
      .catch((err) => { });
  };

  useEffect(() => {
    getJobsByID();
  }, []);
  useEffect(() => {
    console.log(jobData, "jobData");
  }, [jobData]);
  useEffect(() => { }, [jobId]);

  const handleBackClick = () => {
    if (location.state && location.state.from) {
      navigate(`/${location.state.from}`);
    } else {
      navigate(-1); // Equivalent to history.goBack() in v5
    }
  };

  const viewUpdateFile = (item) => {
    window.open(`${API.userFilePath}${item.fileData}`, "_blank");
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
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
          id="mainBrand"
          className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
        >
          <div className="brand-content-main boxBg px-4">
            <div className="back-create">
              <i
                className="bi bi-arrow-left-circle-fill"
                onClick={handleBackClick} // Add onClick to the icon
                style={{ cursor: 'pointer' }} // Optional: to indicate it’s clickable
              ></i>
              {/* <i className="bi bi-arrow-left-circle-fill"></i> */}
              <div onClick={handleBackClick} className="back-to">
                Back to My Jobs
              </div>
            </div>
            <div className="preview-section-one">
              <div className="job-main-details">
                <div className="preview-job-name">{jobData?.jobTitle}</div>
              </div>
              {/* <div className="easy-apply-section">
                <div className="easy-apply-btn">Easy Apply</div>
              </div> */}
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
                <span className="font-600">Location :&nbsp; </span>
                {/* {jobData?.paymentType?.label} */}
                <span>
                  <span>
                    <span className="">
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
                <span className="font-600">Application Deadline :&nbsp;</span>
                {new Date(jobData?.lastDateForApply).toLocaleDateString(
                  "en-GB",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </div>

              {/* <div className="company-location">
                <span>Payment :&nbsp; </span>
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
              </div> */}

              <div className="company-location">
                <span className="font-600">Job Type :&nbsp; </span>
                {/* {jobData?.paymentType?.label} */}
                <span>
                  <span className="">{jobData?.jobType}</span>
                </span>
              </div>

              <div className="company-location">
                <span className="font-600">Category :&nbsp; </span>
                <span className="job-feature-values">{jobData?.category}</span>
              </div>

              <div className="company-location compSect">
                {/* {jobData.compensation &&
                  Object.keys(jobData.compensation).length > 0 && (
                    <>
                      <span className="font-600">Compensation :&nbsp;</span>
                    </>
                  )} */}

                {jobData.compensation?.paid_collaboration &&
                  Object.values(jobData.compensation.paid_collaboration).some(
                    (value) =>
                      value !== null && value !== undefined && value !== ""
                  ) && (
                    <>
                      <span className="font-600">Compensation :&nbsp;</span>
                    </>
                  )}

                {/* {jobData?.paymentType?.label} */}
                {jobData.compensation &&
                  Object.entries(jobData.compensation).map(([key, value]) => (
                    <span style={{ wordBreak: "break-all" }} key={key}>
                      {(value?.minPay || value?.maxPay || value?.exactPay) && (
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
                          +&nbsp;
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
                      {value.product_name && value?.productValue && (
                        <>
                          <span>
                            ( valued at {value.currency} {value?.productValue} )
                          </span>
                        </>
                      )}
                    </span>
                  ))}
              </div>

              {/* <div className="company-location">
                <span>Application Type :&nbsp; </span>
                <span>
                  <span className="">
                    {jobData?.howLikeToApply
                      ? jobData.howLikeToApply
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")
                      : ""}
                  </span>
                </span>
              </div> */}

              <div className="job-features-benefits pb-0">
                <div className="row">
                  <div className="job-features col-md-6">
                    <div className="job-feature-title">
                      Key Details and Requirements
                    </div>
                    <div className="job-feature-points">
                      <ul>
                        {jobData?.benefits && jobData.benefits.length > 0 ? (
                          <li className="job-features-li">
                            <span className="job-feature-heading">Benefits :</span>
                            <span className="job-feature-values">
                              {jobData.benefits.join(", ")}
                            </span>
                          </li>
                        ) : (
                          <li className="job-features-li">
                            <span className="job-feature-heading">Benefits :</span>
                            <span className="job-feature-values">No data added</span>
                          </li>
                        )}

                        {/* {jobData?.benefits && jobData.benefits.length > 0 && (
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
                        )} */}

                        {/* {jobData?.skills && jobData?.skills.length > 0 && (
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
                            )} */}

                        {jobData?.skills && jobData.skills.length > 0 ? (
                          <li className="job-features-li">
                            <span className="job-feature-heading">Skills :</span>
                            <span className="job-feature-values">
                              {jobData.skills.join(", ")}
                            </span>
                          </li>
                        ) : (
                          <li className="job-features-li">
                            <span className="job-feature-heading">Skills :</span>
                            <span className="job-feature-values">No data added</span>
                          </li>
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
                            <span className="job-feature-heading">
                              Gender :
                            </span>

                            <span className="job-feature-values">
                              {jobData?.gender && jobData.gender.join(", ")}
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
                                      index === jobData.languages.length - 1
                                        ? skill
                                        : skill + ", "
                                    )
                                    .join("")}
                              </span>
                            </li>
                          )}
                        {jobData?.nationality && jobData.nationality.length > 0 ? (
                          <li className="job-features-li">
                            <span className="job-feature-heading">Nationality :</span>
                            <span className="job-feature-values">
                              {jobData.nationality.join(", ")}
                            </span>
                          </li>
                        ) : (
                          <li className="job-features-li">
                            <span className="job-feature-heading">Nationality :</span>
                            <span className="job-feature-values">No data added</span>
                          </li>
                        )}
                        {/*   {jobData?.nationality && (
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
                        )} */}
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
                                <div className="d-flex">
                                  <span className="job-feature-heading">
                                    Social Media Followers Count:
                                  </span>
                                  <ul>
                                    {jobData?.instaMin && (
                                      <li>
                                        Instagram Followers:{" "}
                                        <span className="job-feature-values">
                                          {jobData?.instaMin} -{" "}
                                          {jobData?.instaMax}
                                        </span>
                                      </li>
                                    )}

                                    {jobData?.tikTokMin && (
                                      <li>
                                        TikTok Followers:{" "}
                                        <span className="job-feature-values">
                                          {jobData?.tikTokMin} -{" "}
                                          {jobData?.tikTokMax}
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
                                </div>
                              </li>
                            </>
                          )}
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
                      <div className="job-feature-title">
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

              {jobData?.jobDescription &&
                jobData?.jobDescription.length > 0 && (
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
                    Interested candidates should submit their resume and a link
                    that contains portfolio from Brands & Talent website to
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
                  <div className="create-job-buttons mt-4 mb-2 justify-content-center">
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
      </>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default PreviewJob;
