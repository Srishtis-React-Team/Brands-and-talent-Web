import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsformthree.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import Select from "react-select";
import Axios from "axios";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { useNavigate } from "react-router";

const KidsFormFour = ({ onDataFromChild, ...props }) => {
  const navigate = useNavigate();
  const btLogo = require("../assets/icons/Group 56.png");
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
  const handleRadioChange = () => {};

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
            <div className="step-text">Step 4 of 4</div>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              navigate("/");
            }}
          ></button>
        </div>
        <div className="dialog-body gmail-page-body">
          <div className="gmail-wrapper">
            <div className="gmail-tick">
              <img src={bigTick} alt="" />
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

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default KidsFormFour;
