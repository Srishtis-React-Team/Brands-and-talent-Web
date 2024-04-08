import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.scss";
import "../../assets/css/createjobs.scss";
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
  const btLogo = require("../../assets/icons/Group 56.png");
  const kidsImage = require("../../assets/images/kidsImage.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const [jobTitleError, setjobTitleError] = useState(false);
  const [jobTitle, setjobTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <>
        <div className="dialog-body ">
          <div className="kidsform-one w-100 p-2">
            <div className="kids-main">
              <div className="kids-form-row">
                <div className="w-100">
                  <div className="mb-4">
                    <label className="form-label">
                      Enter a Previous Job Title
                      <span className="mandatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={jobTitle}
                      onChange={(e) => {
                        setjobTitle(e.target.value);
                        setjobTitleError(false);
                      }}
                      placeholder="Start Typing Previous Job Title, Location Or Company"
                    ></input>
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
