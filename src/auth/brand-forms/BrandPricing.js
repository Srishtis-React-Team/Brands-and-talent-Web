import React, { useState, useEffect } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/register.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner";
import PopUp from "../../components/PopUp";
import Pricing from "../../views/pricing";
const BrandPricing = () => {
  const navigate = useNavigate();
  const btLogo = require("../../assets/images/LOGO.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [receivedData, setReceivedData] = useState(null);

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

  const goBack = async () => {
    navigate(
      `/brand-logo?userId=${receivedData?.brand_id}&userEmail=${receivedData?.brandEmail}`
    );
  };

  useEffect(() => {
    if (location.state && location.state.data) {
      setReceivedData(location.state.data);
    }
  }, [location.state]);

  useEffect(() => {
    console.log(receivedData, "receivedData");
  }, [receivedData]);

  const brandsSignup = async () => {
    navigate(`/brand/${receivedData?.publicUrl.replace(/\s+/g, "")}`, {
      state: { data: receivedData },
    });

    // navigate("/brand-activated", {
    //   state: { data: receivedData },
    // });
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
        <Pricing from={"signup"} userType={"brands"} />

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

export default BrandPricing;
