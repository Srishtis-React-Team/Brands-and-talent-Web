import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.scss";
import "../../assets/css/createjobs.scss";
import "../../assets/css/talent-profile.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import { useNavigate } from "react-router";
import Header from "../../layout/header";

const OverallJobs = () => {
  const [currentUserId, setcurrentUserId] = useState(null);
  useEffect(() => {
    setcurrentUserId(localStorage.getItem("currentUser"));
  }, []);
  const navigate = useNavigate();

  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [allJobs, showAllJobs] = useState(true);
  const [allJobsList, setAllJobsList] = useState(true);

  function PreviewJob(jobId) {
    navigate("/preview-job", {
      state: {
        jobId: jobId,
      },
    });
  }

  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = async () => {
    const formData = {
      talentId: currentUserId,
    };
    await ApiHelper.post(API.getPostedJobs, formData)
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
        <div>
          {allJobsList && allJobsList.length > 0 && (
            <>
              <div className="overall-jobs-main">
                <div className="container">
                  <div className="overall-job-list">
                    <h5>Our Jobs</h5>
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
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
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
        </div>
      </>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default OverallJobs;
