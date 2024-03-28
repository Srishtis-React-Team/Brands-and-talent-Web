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
const BrandFirstGig = () => {
  const navigate = useNavigate();
  const btLogo = require("../../assets/icons/Group 56.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [adultSignupDisabled, setAdultSignupDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState("");
  const [positionError, setPositionError] = useState(false);

  useEffect(() => {
    //code for google auth
    console.log(openPopUp, "openPopUp");
  }, [openPopUp]);

  const adultSignUp = async () => {
    if (position === "") {
      setPositionError(true);
    }
    if (position) {
      navigate(`/brand-signup}`);
    }
  };

  const selectPosition = (event) => {
    setPosition(event.target.value);
    setPositionError(false);
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
            <div className="step-text">Step 1 of 5</div>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              navigate("/");
            }}
          ></button>
        </div>
        <div className="dialog-body">
          <div className="adult-signup-main">
            <div className="step-title mb-3">Post Your First Gig/Job Now</div>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={selectPosition}
                value={position}
              >
                <option value="" disabled selected>
                  How Many Positions are you looking to staff?
                </option>
              </select>
              {positionError && (
                <div className="invalid-fields">Please Select position</div>
              )}
            </div>
          </div>
        </div>
        <div className="dialog-footer">
          <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
            className="step-back"
          >
            Back
          </button>
          <button
            type="button"
            className="step-continue"
            onClick={(e) => {
              adultSignUp();
            }}
          >
            Get Started
          </button>
        </div>
      </div>
      {isLoading && <Spinner />}
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default BrandFirstGig;
