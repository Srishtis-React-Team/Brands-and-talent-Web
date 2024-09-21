import React, { useState, useEffect } from "react";
import "../assets/css/forms/kidsformthree.css";
import "../assets/css/forms/kidsform-one.css";
import "../assets/css/pricing.css";
import "../assets/css/register.css";
import "../assets/css/dashboard.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { useNavigate } from "react-router";
import "../assets/css/register.css";
import Pricing from "../views/pricing.js";
import Loader from "../views/Loader.js";

const KidsFormTwo = () => {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get the current URL
    const url = window.location.href;

    // Create a new URLSearchParams object with the query string
    const params = new URLSearchParams(window.location.search);

    // Extract userId and userEmail from the URL query string
    const userIdFromUrl = params.get("userId");
    const userEmailFromUrl = params.get("userEmail");

    // Save the values into state
    if (userIdFromUrl) setUserId(userIdFromUrl);
    if (userEmailFromUrl) setUserEmail(userEmailFromUrl);

    console.log(userIdFromUrl, userEmailFromUrl, "fetched");
  }, []);

  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.png");
  const [isLoading, setIsLoading] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const paramsValues = window.location.search;
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(false);
  const [isPaymentClicked, setIsPaymentClicked] = useState(false);

  // const urlParams = new URLSearchParams(paramsValues);

  // const userId = urlParams.get("userId");

  useEffect(() => {
    if (selectedPaymentStatus == true && isPaymentClicked == true) {
      navigate(`/talent-signup-files-details?userId=${userId}`);
    }

    console.log(selectedPaymentStatus, "selectedPaymentStatus");
  }, [selectedPaymentStatus, isPaymentClicked]);

  const editKids = async () => {
    navigate(`/talent-signup-files-details?userId=${userId}`);

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
    navigate(
      `/talent-social-media-connections?userId=${userId}&userEmail=${userEmail}`
    );
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
            <div className="step-text">Step 4 of 6</div>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              navigate("/");
            }}
          ></button>
        </div>
        <Pricing
          from={"signup"}
          setSelectedPaymentStatus={setSelectedPaymentStatus}
          setIsPaymentClicked={setIsPaymentClicked}
        />
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

export default KidsFormTwo;
