import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.css";
import "../../assets/css/forms/kidsformthree.css";
import "../../assets/css/forms/login.css";
import "../../assets/css/dashboard.css";
import "../../assets/css/register.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import { useNavigate } from "react-router";
import "../../assets/css/register.css";
import Pricing from "../pricing";

const AdultPricing = ({ onDataFromChild, ...props }) => {
  const navigate = useNavigate();
  const btLogo = require("../../assets/images/LOGO.png");
  const [isLoading, setIsLoading] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);

  const url = window.location.href;
  const queryString = url.split("?")[1];

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, [userId]);

  const editKids = async () => {
    navigate(`/adult-signup-files-details?${userId}`);
    // const formData = {
    // };
    // setIsLoading(true);
    // await ApiHelper.post(`${API.updateAdults}${queryString}`, formData)
    //   .then((resData) => {
    //     if (resData.data.status === true) {
    //       setIsLoading(false);
    //       setMessage("Updated Successfully!");
    //       setOpenPopUp(true);
    //       setTimeout(function () {
    //         setOpenPopUp(false);
    //         navigate(`/adult-signup-files-details?${queryString}`);
    //       }, 1000);
    //     } else {
    //     }
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //   });
  };
  const goBack = async () => {
    navigate(`/adult-social-medias-details?${queryString}`);
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
            <div className="step-text">Step 3 of 5</div>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              navigate("/");
            }}
          ></button>
        </div>
        <Pricing from={"signup"} userType={"adults"} />
        <div className="dialog-footer">
          <button
            type="button"
            onClick={(e) => {
              goBack();
            }}
            className="step-back"
          >
            Back
          </button>

          <button
            type="button"
            className="step-continue"
            onClick={(e) => {
              editKids();
            }}
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default AdultPricing;
