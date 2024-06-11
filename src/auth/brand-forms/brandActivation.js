import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/register.scss";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";
import Axios from "axios";
import Spinner from "../../components/Spinner";
import PopUp from "../../components/PopUp";
const BrandActivation = () => {
  const navigate = useNavigate();
  const btLogo = require("../../assets/images/LOGO.jpg");
  const trialIcon = require("../../assets/icons/trial-icon.png");
  const greenTick = require("../../assets/icons/greenTick.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [receivedData, setReceivedData] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log(receivedData, "receivedData");
  }, [receivedData]);
  useEffect(() => {
    // Check if data is passed through state
    if (location.state && location.state.data) {
      setReceivedData(location.state.data);
    }
  }, [location.state]);

  useEffect(() => {
    //code for google auth
    console.log(openPopUp, "openPopUp");
  }, [openPopUp]);

  const brandsSignup = async () => {
    navigate("/brand-dashboard", {
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
            <div className="step-text">Step 6 of 6</div>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              navigate("/");
            }}
          ></button>
        </div>
        <div className="dialog-body spaceTops" style={{ minHeight: "85vh" }}>
          <div className="trial-page">
            <div className="trial-wrapper">
              <div className="trial-title">Trial Version Activated</div>
              <div className="inlcluded">WHAT’S INCLUDED</div>
              <div className="included-content">
                <div className="">
                  <div className="included-line">
                    <img src={greenTick} alt="" />
                    <div className="include-text">Create a profile</div>
                  </div>
                  <div className="included-line">
                    <img src={greenTick} alt="" />
                    <div className="include-text">
                      Portfolio (up to 5 photos + 2 Video/Audio sample works)
                    </div>
                  </div>
                  <div className="included-line">
                    <img src={greenTick} alt="" />
                    <div className="include-text">Bio</div>
                  </div>
                  <div className="included-line">
                    <img src={greenTick} alt="" />
                    <div className="include-text">
                      Add your social media accounts
                    </div>
                  </div>
                  <div className="included-line">
                    <img src={greenTick} alt="" />
                    <div className="include-text">Add your features</div>
                  </div>
                </div>
                <div className="include-wrapper">
                  <div className="included-line">
                    <img src={greenTick} alt="" />
                    <div className="include-text">Reviews</div>
                  </div>
                  <div className="included-line">
                    <img src={greenTick} alt="" />
                    <div className="include-text">Set your Rates</div>
                  </div>
                  <div className="included-line">
                    <img src={greenTick} alt="" />
                    <div className="include-text">Access to job postings</div>
                  </div>
                  <div className="included-line">
                    <img src={greenTick} alt="" />
                    <div className="include-text">Basic customer support</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="trialing">
              <img src={trialIcon} alt="" />
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
            onClick={(e) => {
              brandsSignup();
            }}
          >
            Continue
          </button>
        </div>
      </div>
      {isLoading && <Spinner />}
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default BrandActivation;
