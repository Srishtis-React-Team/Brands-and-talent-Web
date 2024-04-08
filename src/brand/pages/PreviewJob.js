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

const PreviewJob = (props) => {
  const paramsValues = window.location.search;
  const urlParams = new URLSearchParams(paramsValues);
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

  const url = window.location.href;
  const queryString = url.split("?")[1];
  console.log(" queryString:", queryString);
  console.log(" props:", props);

  const getDraftJobsByID = async () => {
    await ApiHelper.get(`${API.getDraftJobsByID}${props.data}`)
      .then((resData) => {
        setJobData(resData.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getDraftJobsByID();
  }, []);
  useEffect(() => {
    console.log(jobData, "jobData");
    if (jobData?.paymentType[0]?.rangeOfAmounts?.minPay) {
      setMinPay(jobData?.paymentType[0]?.rangeOfAmounts?.minPay);
    }
  }, [jobData]);

  return (
    <>
      <>
        <div className="brand-content-main">
          <div className="preview-section-one">
            <div className="job-main-details">
              <div className="create-job-title">{jobData?.jobTitle}</div>
              <div className="job-price">
                {jobData?.paymentType?.rangeOfAmounts && (
                  <>
                    <div>{}USD</div>
                    <span>to</span>
                    <div>
                      {jobData?.paymentType[0]?.rangeOfAmounts?.minPay}USD
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="back-create">
              <i class="bi bi-arrow-left-circle-fill"></i>
              <div className="back-to">Back to Create job</div>
            </div>
          </div>
        </div>
      </>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default PreviewJob;
