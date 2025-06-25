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
      .catch((err) => {});
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
        navigate("/my-jobs", {
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
            navigate("/my-jobs", {
              state: {
                jobId: resData?.data?.data?._id,
              },
            });
          }, 2000);
        } else if (resData.data.status === false) {
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            navigate("/my-jobs", {
              state: {
                jobId: resData?.data?.data?._id,
              },
            });

            setOpenPopUp(false);
          }, 4000);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getJobsByID();
  }, []);

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

  // const convertLinks = (text) => {
  //   if (!text || typeof text !== "string") return ""; // Handle undefined, null, or non-string values
  //   const urlRegex = /(https?:\/\/[^\s<]+)/g; // Stop at whitespace or '<' to prevent trailing tags
  //   return text.replace(urlRegex, (url) => {
  //     // Remove any trailing encoded tags or HTML tags
  //     const cleanUrl = url.replace(/(%3C\/p%3E|<\/p>)$/g, "");
  //     return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>`;
  //   });
  // };
  const convertLinks = (text) => {
    if (!text || typeof text !== "string") return ""; // Handle undefined, null, or non-string values

    // Improved regex to match URLs without capturing unwanted tags or attributes
    const urlRegex = /(https?:\/\/[^\s<>"']+)/g;

    // Check if the text already contains an anchor tag
    if (text.includes("<a ")) {
      return text; // Return as is if it's already an anchor link
    }

    return text.replace(urlRegex, (url) => {
      // Clean up the URL by removing any trailing tags or unwanted characters
      const cleanUrl = url.replace(/["'>]$/g, "").trim();
      return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="apply-Description">${cleanUrl}</a>`;
    });
  };

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  };
console.log("jobDatacccccccccccccccc",jobData?.jobDescription)
  return (
    <>
      <>
        <BrandHeader toggleMenu={toggleMenu} />
        <div
          id="sidebarBrand"
          className={`brand-sidebar ${
            showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
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
                style={{ cursor: "pointer" }} // Optional: to indicate it’s clickable
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
                        .join(", ") || "No Data Added"}
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

                {[
                  jobData.compensation?.paid_collaboration,
                  jobData.compensation?.product_gift,
                  jobData.compensation?.paid_collaboration_and_gift,
                ].some(
                  (obj) =>
                    obj &&
                    Object.values(obj).some(
                      (value) =>
                        value !== null && value !== undefined && value !== ""
                    )
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
                            <span className="job-feature-heading">
                              Benefits :
                            </span>
                            <span className="job-feature-values">
                              {jobData.benefits.join(", ")}
                            </span>
                          </li>
                        ) : (
                          <li className="job-features-li">
                            <span className="job-feature-heading">
                              Benefits :
                            </span>
                            <span className="job-feature-values">
                              No data added
                            </span>
                          </li>
                        )}

                        {jobData?.skills && jobData.skills.length > 0 ? (
                          <li className="job-features-li">
                            <span className="job-feature-heading">
                              Skills :
                            </span>
                            <span className="job-feature-values">
                              {jobData.skills.join(", ")}
                            </span>
                          </li>
                        ) : (
                          <li className="job-features-li">
                            <span className="job-feature-heading">
                              Skills :
                            </span>
                            <span className="job-feature-values">
                              No data added
                            </span>
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
                        {jobData?.gender && jobData.gender.length > 0 ? (
                          <li className="job-features-li">
                            <span className="job-feature-heading">
                              Gender :
                            </span>
                            <span className="job-feature-values">
                              {jobData.gender.join(", ")}
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
                                      index === jobData.languages.length - 1
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
                              {jobData.nationality.join(", ")}
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
                          <li className="job-features-li">
                            <div className="social-followers-container">
                              <span className="job-feature-heading">
                                Social Media Followers Count:
                              </span>
                              <ul className="followers-list">
                                {jobData?.instaMin && (
                                  <li>
                                    Instagram Followers:
                                    <span className="job-feature-values">
                                      {jobData?.instaMin} - {jobData?.instaMax}
                                    </span>
                                  </li>
                                )}

                                {jobData?.tikTokMin && (
                                  <li>
                                    TikTok Followers:
                                    <span className="job-feature-values">
                                      {jobData?.tikTokMin} -{" "}
                                      {jobData?.tikTokMax}
                                    </span>
                                  </li>
                                )}

                                {jobData?.linkedInMin && (
                                  <li>
                                    LinkedIn Followers:
                                    <span className="job-feature-values">
                                      {jobData?.linkedInMin} -{" "}
                                      {jobData?.linkedInMax}
                                    </span>
                                  </li>
                                )}

                                {jobData?.fbMin && (
                                  <li>
                                    Facebook Followers:
                                    <span className="job-feature-values">
                                      {jobData?.fbMin} - {jobData?.fbMax}
                                    </span>
                                  </li>
                                )}

                                {jobData?.twitterMin && (
                                  <li>
                                    Twitter(X) Followers:
                                    <span className="job-feature-values">
                                      {jobData?.twitterMin} -{" "}
                                      {jobData?.twitterMax}
                                    </span>
                                  </li>
                                )}

                                {jobData?.youTubeMin && (
                                  <li>
                                    YouTube Followers:
                                    <span className="job-feature-values">
                                      {jobData?.youTubeMin} -{" "}
                                      {jobData?.youTubeMax}
                                    </span>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </li>
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
    typeof jobData.jobDescription === "string" &&
    jobData.jobDescription.trim().replace(/\n/g, "") !== "" &&
    jobData.jobDescription.trim().replace(/\n/g, "") !== "<p></p>" ? (
      <div
        dangerouslySetInnerHTML={{
          __html: jobData.jobDescription.trim().replace(/\n/g, ""),
        }}
      />
    ) : (
      <div>No Data Added</div>
    )}
  </div>
</div>

              {/* {jobData?.jobDescription && jobData?.jobDescription.length > 0 ? (
                <>
                  <div className="job-about-section">
                    <div className="job-feature-title">Job Description</div>

                    <div className="job-about-values">
                      {Array.isArray(jobData?.jobDescription) &&
                      jobData.jobDescription.length > 0 ? (
                        jobData.jobDescription.some((htmlContent) => {
                          const cleanedContent = htmlContent
                            .trim()
                            .replace(/\n/g, "");
                          return cleanedContent && cleanedContent !== "<p></p>";
                        }) ? (
                          jobData.jobDescription.map((htmlContent, index) => {
                            const cleanedContent = htmlContent
                              .trim()
                              .replace(/\n/g, "");
                            return cleanedContent &&
                              cleanedContent !== "<p></p>" ? (
                              <div
                                key={index}
                                dangerouslySetInnerHTML={{
                                  __html: cleanedContent,
                                }}
                              />
                            ) : null;
                          })
                        ) : (
                          <div>No Data Added</div>
                        )
                      ) : (
                        <div>No Data Added</div>
                      )}
                    </div>

                   
                  </div>
                </>
              ) : (
                <div className="job-about-section">
                  <div className="job-feature-title">Job Description</div>
                  <div className="job-about-values">No Data Added</div>
                </div>
              )} */}

              {jobData?.whyWorkWithUs && (
                <>
                  <div className="job-about-section">
                    <div className="job-feature-title">Why Work With Us</div>
                    <div className="job-about-values">
                      {jobData?.whyWorkWithUs && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: jobData.whyWorkWithUs,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </>
              )}
{jobData?.hiringCompanyDescription && (
  <div className="job-about-section">
    <div className="job-feature-title">Hiring Company Description</div>
    <div
      className="job-about-values"
      dangerouslySetInnerHTML={{
        __html: jobData.hiringCompanyDescription,
      }}
    />
  </div>
)}

              {/* {jobData?.hiringCompanyDescription && (
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
              )} */}

{jobData?.workSamples && (
  <div className="job-about-section">
    <div className="job-feature-title">Project brief / TOR</div>
    <div className="service-files-main">
      <div>
        {jobData.workSamples.length > 0 ? (
          jobData.workSamples.map((item, index) => (
            <div className="update-portfolio-cards" key={item._id || index}>
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
                      id={`dropdownMenuButton-${index}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></i>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby={`dropdownMenuButton-${index}`}
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
            </div>
          ))
        ) : (
          <div className="text-muted">No data added</div>
        )}
      </div>
    </div>
  </div>
)}

              {/* {jobData?.workSamples && (
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
                          })
                          
                          }
                      </div>
                    </div>
                  </div>
                </>
              )} */}

              {jobData?.howLikeToApply !== "easy-apply" ? (
                <div className="job-about-section">
                  <div className="job-feature-title">How to Apply</div>
                  <div className="job-about-values">
                    {jobData?.applyDescription ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: convertLinks(jobData?.applyDescription),
                        }}
                        className="apply-description"
                        //   __html: convertLinks(
                        //     jobData?.applyDescription.join(" ")
                        //   ),
                        // }}
                        // className="apply-description"
                      />
                    ) : (
                      <>
                        Interested candidates should submit their resume and a
                        link that contains a portfolio from the Brands & Talent
                        website to
                        <span className="how-apply-terms-link">
                          {brandData?.brandEmail}
                        </span>
                        . Please include
                        <span className="how-apply-terms-link">
                          {jobData?.jobTitle}
                        </span>
                        in the subject line.
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="job-about-section">
                  <div className="job-feature-title">Quick Apply</div>
                  <div className="job-about-values">
                    {/* {jobData?.applyDescription ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: convertLinks(jobData?.applyDescription.join(" ")) }}
                        className="apply-description"
                      />
                    ) : ( */}
                    <>
                      Make it simple for applicants to apply with one click.
                      Choose "Quick apply" to receive and manage applications
                      directly through your dashboard on our platform.
                    </>
                    {/* )} */}
                  </div>
                </div>
              )}

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
