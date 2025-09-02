import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/register.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";
import Axios from "axios";
import Spinner from "../../components/Spinner";
import PopUp from "../../components/PopUp";
const JobSuccess = () => {
  const navigate = useNavigate();
  const btLogo = require("../../assets/images/LOGO.jpeg");
  const successJob = require("../../assets/images/job-success.png");
  const greenTick = require("../../assets/icons/greenTick.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [receivedData, setReceivedData] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {}, [receivedData]);
  useEffect(() => {
    // Check if data is passed through state
    if (location.state && location.state.data) {
      setReceivedData(location.state.data);
    }
  }, [location.state]);

  useEffect(() => {
    //code for google auth
  }, [openPopUp]);

  const brandsSignup = async () => {
    navigate("/brand", {
      state: { data: receivedData },
    });
  };

  return (
    <>
      <div className="form-dialog">
        <div className="header-wrapper">
          <div className="step-wrapper">
            <img
              className="modal-logo"
              onClick={() => {
                navigate("/");
              }}
              src={btLogo}
            ></img>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              navigate("/");
            }}
          ></button>
        </div>
        <div className="dialog-body" style={{ height: "75vh" }}>
          <div className="trial-page">
            <div className="trial-wrapper" style={{ paddingRight: "50px" }}>
              <div className="trial-title" style={{ color: "#c2114b" }}>
                Job Posted Successfully
              </div>
              <div
                className="include-text"
                style={{ width: "500px", padding: "40px 0px 20px 0px" }}
              >
                Thank you for posting your job on our portal. Your job listing
                has been received and is now under review.
              </div>
              <div
                className="include-text"
                style={{ width: "500px", padding: "20px 0px" }}
              >
                Our team will ensure that your job post meets our quality
                standards before it is published on our platform. We appreciate
                your patience and look forward to helping you find the perfect
                candidates for your job opening. Stay tuned for updates
              </div>
            </div>
            <div className="trialing">
              <img src={successJob} alt="" />
            </div>
          </div>
        </div>
        <div className="dialog-footer">
          {/* <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
            className="step-back"
          >
            Back
          </button> */}
          <button
            type="button"
            className="step-continue"
            style={{ marginRight: "60px" }}
            onClick={(e) => {
              brandsSignup();
            }}
          >
            Preview Job
          </button>
        </div>
      </div>
      {isLoading && <Spinner />}
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default JobSuccess;
