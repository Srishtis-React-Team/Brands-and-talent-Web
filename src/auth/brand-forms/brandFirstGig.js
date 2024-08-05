import React, { useState, useEffect } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/register.scss";
import { useNavigate } from "react-router";
import Spinner from "../../components/Spinner";
import PopUp from "../../components/PopUp";
import { generateToken } from "../firebase";

const BrandFirstGig = () => {
  const navigate = useNavigate();
  const btLogo = require("../../assets/images/LOGO.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState("");
  const [positionError, setPositionError] = useState(false);

  useEffect(() => {
    generateToken();
  }, []);

  const positionOptions = [
    "1 job",
    "2 to 3 jobs",
    "4 to 10 jobs",
    "11 to 20 jobs",
    "21 to 50 jobs",
    "51 to 100 jobs",
    "101 to 250 jobs",
    "250+ jobs",
  ];

  useEffect(() => {}, [openPopUp]);

  const brandsSignup = async () => {
    if (position === "") {
      setPositionError(true);
    }
    if (position) {
      navigate("/brand-signup", {
        state: { data: position },
      });
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
            <div className="step-text">Step 1 of 6</div>
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
                  How many positions are you looking to staff?
                </option>
                {positionOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
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
              brandsSignup();
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
