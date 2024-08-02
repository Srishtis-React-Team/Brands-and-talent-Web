import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsformthree.scss";
import Axios from "axios";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { useNavigate } from "react-router";

const AdultSuccess = () => {
  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const greenTick = require("../assets/icons/greenTick.png");
  const bigTick = require("../assets/icons/bigTick.png");
  const gmailGrey = require("../assets/icons/gmailGrey.png");
  useEffect(() => {}, []);
  const openGmail = () => {
    // Open Gmail in a new tab
    window.open("https://mail.google.com/", "_blank");
  };
  const back = () => {
    navigate("/");
  };
  const close = () => {
    navigate("/");
  };

  return (
    <>
      <div className="form-dialog">
        <div className="header-wrapper">
          <div className="step-wrapper">
            <img
              className="modal-logo"
              onClick={() => {
                back();
              }}
              src={btLogo}
            ></img>
            <div className="step-text">Step 3 of 3</div>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              close();
            }}
          ></button>
        </div>
        <div
          className="dialog-body gmail-page-body successWrap"
          style={{ minHeight: "90vh" }}
        >
          <div className="container">
            <div className="gmail-wrapper">
              <div className="gmail-tick">
                <img src={bigTick} className="kids-image-sticky" alt="" />
              </div>
              <div className="done">Done!</div>
              <div className="gmail-info">
                Get ready to embark on your journey! Your account will be
                activated within the next 48 hours, unlocking a world of
                possibilities.
              </div>
              <div className="open-gmail" onClick={openGmail}>
                <img src={gmailGrey} alt="" />
                <div className="gmail-btn-text">Open Gmail</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default AdultSuccess;
