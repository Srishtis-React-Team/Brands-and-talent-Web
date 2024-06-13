import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.scss";
import "../../assets/css/createjobs.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import Axios from "axios";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import ReactFlagsSelect from "react-flags-select";
import { useNavigate } from "react-router";
import nationalityOptions from "../../components/nationalities";
import languageOptions from "../../components/languages";
import Select from "react-select";

const DuplicateJobs = ({ sendDataToParent }) => {
  const paramsValues = window.location.search;
  const urlParams = new URLSearchParams(paramsValues);
  const userId = urlParams.get("userId");
  const userEmail = urlParams.get("userEmail");
  const navigate = useNavigate();
  const docsIcon = require("../../assets/icons/docsIcon.png");
  const greenTickCircle = require("../../assets/icons/small-green-tick.png");
  const uploadIcon = require("../../assets/icons/uploadIcon.png");
  const imageType = require("../../assets/icons/imageType.png");
  const videoType = require("../../assets/icons/videoType.png");
  const audiotype = require("../../assets/icons/audiotype.png");
  const idCard = require("../../assets/icons/id-card.png");
  const elipsis = require("../../assets/icons/elipsis.png");
  const btLogo = require("../../assets/images/LOGO.jpg");
  const kidsImage = require("../../assets/images/kidsImage.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const [jobTitleError, setjobTitleError] = useState(false);
  const [jobTitle, setjobTitle] = useState("");
  const [message, setMessage] = useState("");
  const [allJobsList, setAllJobsList] = useState([]);
  const [selectedJobID, setSelectedJobID] = useState(null);
  const [brandId, setBrandId] = useState(null);

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    console.log(e, "selectedJobID");
    setSelectedJobID(e?.value);
  };

  // handle custom filter
  const filterOption = (option, inputValue) => {
    // return option.allJobsList.jobTitle
    //   .toLowerCase()
    //   .includes(inputValue.toLowerCase());
  };

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
    console.log(brandId, "brandId");
    if (brandId && brandId != null) {
      getAllJobs(brandId);
    }
  }, [brandId]);

  const getAllJobs = async (id) => {
    console.log(id, "getAllJobsID");
    await ApiHelper.get(`${API.getAllJobs}${id}`)
      .then((resData) => {
        console.log(resData.data.data, "getJobsList");
        if (resData.data.status === true) {
          if (resData.data.data) {
            setAllJobsList(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <>
        <div className="dialog-body ">
          <div className="kidsform-one w-100  p-2">
            <div className="kids-main">
              <div style={{ height: "500px" }} className="kids-form-row">
                <div className="w-100">
                  <div className="mb-4">
                    <label className="form-label">
                      Enter a Previous Job Title
                      <span className="mandatory">*</span>
                    </label>
                    <Select
                      placeholder="Select City..."
                      options={allJobsList.map((job) => ({
                        value: job._id, // or whatever unique identifier you want to use
                        label: job.jobTitle,
                      }))}
                      onChange={handleChange}
                      isSearchable={true}
                    />
                    {jobTitleError && (
                      <div className="invalid-fields">
                        Please enter job Title
                      </div>
                    )}
                    <div className="duplicatejob-instruction">
                      Important: Posting an exact copy of an active job in the
                      same or nearby location will be rejected by the job
                      boards.
                    </div>
                  </div>
                </div>
              </div>

              <div className="create-job-buttons my-4">
                <div
                  className="createjob-btn"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Duplicate Job
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default DuplicateJobs;
