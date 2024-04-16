import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.scss";
import "../../assets/css/createjobs.scss";
import "../../assets/css/preview-job.css";
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
import ReactFlagsSelect from "react-flags-select";
import { useNavigate } from "react-router";
import nationalityOptions from "../../components/nationalities";
import languageOptions from "../../components/languages";
import { useLocation } from "react-router-dom";
import BrandHeader from "./BrandHeader";
import BrandSideMenu from "./BrandSideMenu";
const PreviewJob = ({ data, onButtonClick }) => {
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
    await ApiHelper.get(`${API.getAnyJobById}${jobId}`)
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
      setTimeout(function() {
        setOpenPopUp(false);
      }, 2000);
    }
  };

  const postJob = async () => {
    await ApiHelper.post(`${API.postJobByDraft}${jobId}`)
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
  }, [jobData]);
  useEffect(() => {
    console.log(jobId, "jobId");
  }, [jobId]);

  const createJob = () => {
    navigate("/create-jobs");
  };

  return (
    <>
      <>
        <BrandHeader toggleMenu={toggleMenu} />
        <div
          id="sidebarBrand"
          className={`brand-sidebar ${
            showSidebar ? "show-sidebar" : "not-sidebar"
          }`}
        >
          <BrandSideMenu />
        </div>
        <main
          id="mainBrand"
          className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
        >
          <div className="brand-content-main">
            <div className="back-create">
              <i className="bi bi-arrow-left-circle-fill"></i>
              <div onClick={createJob} className="back-to">
                Back to Create job
              </div>
            </div>
            <div className="preview-section-one">
              <div className="job-main-details">
                <div className="preview-job-name">{jobData?.jobTitle}</div>
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
                <div className="easy-apply-btn">Easy Apply</div>
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
              <div className="job-features-benefits">
                <div className="job-features">
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
                <div className="job-benefits">
                  <div className="job-feature-title">Benefits</div>
                  <div className="job-benefits-points">
                    <ul>
                      {jobData?.benefits &&
                        jobData.benefits.map((benefit, index) => (
                          <li className="job-benefits-values" key={index}>
                            {benefit}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="job-about-section">
                <div className="job-feature-title">About Job</div>
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
      </>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default PreviewJob;
