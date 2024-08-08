import React, { useState, useEffect } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/register.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner";
import PopUp from "../../components/PopUp";
const BrandActivation = () => {
  const navigate = useNavigate();
  const btLogo = require("../../assets/images/LOGO.png");
  const trialIcon = require("../../assets/icons/trial-icon.png");
  const greenTick = require("../../assets/icons/greenTick.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [receivedData, setReceivedData] = useState(null);

  useEffect(() => {
    if (location.state && location.state.data) {
      setReceivedData(location.state.data);
    }
  }, [location.state]);

  const brandsSignup = async () => {
    navigate(`/brand/${receivedData?.publicUrl.replace(/\s+/g, "")}`, {
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
                    <div className="include-text">
                      Create up to 3 job posts per month
                    </div>
                  </div>
                  <div className="included-line">
                    <img src={greenTick} alt="" />
                    <div className="include-text">Browse Talent</div>
                  </div>
                  <div className="included-line">
                    <img src={greenTick} alt="" />
                    <div className="include-text">
                      Quick 2-day job post approval
                    </div>
                  </div>
                </div>
                <div className="include-wrapper">
                  <div className="included-line">
                    <img src={greenTick} alt="" />
                    <div className="include-text">
                      View and manage job applicants
                    </div>
                  </div>
                  <div className="included-line">
                    <img src={greenTick} alt="" />
                    <div className="include-text">Bookmark Talent</div>
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
