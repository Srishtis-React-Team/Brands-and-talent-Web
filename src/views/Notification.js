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

const Notification = () => {
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
  const [userId, setUserId] = useState(null);
  const jobImage = require("../assets/icons/jobImage.png");

  const [allJobs, showAllJobs] = useState(true);
  const [draftJobs, showDraftJobs] = useState(false);
  const [postedJobs, showPostedJobs] = useState(false);
  const [allJobsList, setAllJobsList] = useState([]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log(storedUserId, "storedUserId");
    setUserId(storedUserId);
    if (storedUserId) {
      getAppliedjobs(storedUserId);
    }
  }, [userId]);

  const getJobsByID = async () => {
    await ApiHelper.get(`${API.getAnyJobById}${jobId}`)
      .then((resData) => {
        setJobData(resData.data.data);
      })
      .catch((err) => {});
  };

  function PreviewJob(jobId) {
    navigate("/preview-job-talent", {
      state: {
        jobId: jobId,
      },
    });
  }

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

  const getAppliedjobs = async (id) => {
    const formData = {
      userId: id,
    };
    await ApiHelper.post(API.getAppliedjobs, formData)
      .then((resData) => {
        console.log(resData, "getAppliedjobs");
        setAllJobsList(resData?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    navigate("/talent-dashboard");
  };

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "not-sidebar"
        }`}
      >
        <TalentSideMenu />
      </div>

      <main
        style={allJobsList?.length === 0 ? { height: "100vh" } : {}}
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div className="brand-content-main">
          <div className="create-job-title">Notification</div>
        </div>
      </main>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Notification;
