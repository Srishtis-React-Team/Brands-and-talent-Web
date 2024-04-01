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
const BrandDetails = () => {
  const navigate = useNavigate();
  const btLogo = require("../../assets/icons/Group 56.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [adultSignupDisabled, setAdultSignupDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState("");
  const [brandName, setBrandName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [brandNameError, setbrandNameError] = useState(false);
  const [phoneNumberError, sePhoneNumberError] = useState(false);
  const [hearAboutUs, setHearAboutUs] = useState(false);
  const [zipCodeError, setZipCodeError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const location = useLocation();
  const [receivedData, setReceivedData] = useState(null);

  useEffect(() => {
    console.log(receivedData, "receivedData");
  }, [receivedData]);
  useEffect(() => {
    // Check if data is passed through state
    if (location.state && location.state.data) {
      setReceivedData(location.state.data);
    }
  }, [location.state]);

  const aboutUsOptions = [
    "Streaming Audio (Pandora, Spotify, etc.)",
    "Search Engine",
    "Billboard",
    "In the Mail",
    "Social (Facebook, LinkedIn, Instagram, etc.)",
    "Radio (AM/FM/XM)",
    "Podcast",
    "TV",
    "YouTube",
    "Other",
  ];

  useEffect(() => {
    //code for google auth
    console.log(openPopUp, "openPopUp");
  }, [openPopUp]);

  const brandsSignup = async () => {
    if (brandName === "") {
      setbrandNameError(true);
    }
    if (phoneNumber === "") {
      sePhoneNumberError(true);
    }
    if (zipCode === "") {
      setZipCodeError(true);
    }
    if (address === "") {
      setAddressError(true);
    }
    if (
      brandName !== "" &&
      phoneNumber !== "" &&
      zipCode !== "" &&
      address !== ""
    ) {
      const formData = {
        brandName: brandName,
        brandEmail: receivedData?.brandEmail,
        brandPhone: phoneNumber,
        brandZipCode: zipCode,
        howHearAboutAs: hearAboutUs,
        address: address,
      };
      // setIsLoading(true);
      await ApiHelper.post(
        `${API.editBrands}${receivedData?.brandUserId}`,
        formData
      )
        .then((resData) => {
          if (resData.data.status === true) {
            console.log(resData.data);
            // setIsLoading(false);
            setMessage("Registered SuccessFully!");
            navigate("/brand-logo", {
              state: { data: receivedData },
            });
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
            }, 1000);
          } else if (resData.data.status === false) {
            // setIsLoading(false);
            setMessage("Error Occured Try Again!");
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
            }, 1000);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setMessage("Error Occured Try Again!");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        });
    }
  };

  const selectHearAbout = (event) => {
    setHearAboutUs(event.target.value);
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
        <div className="dialog-body" style={{ height: "75vh" }}>
          <div className="adult-signup-main">
            <div className="step-title mb-3">Brand Details</div>

            <div className="mb-3">
              <label className="form-label">
                Brand/Client Name<span className="mandatory">*</span>
              </label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control adult-signup-inputs"
                  placeholder="Brand Name"
                  onChange={(e) => {
                    setBrandName(e.target.value);
                  }}
                ></input>
                {brandNameError && (
                  <div className="invalid-fields">Please enter Brand Name</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Phone Number<span className="mandatory">*</span>
              </label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control adult-signup-inputs"
                  placeholder="Phone Number "
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                ></input>
                {phoneNumberError && (
                  <div className="invalid-fields">
                    Please enter Phone Number
                  </div>
                )}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Zip Code<span className="mandatory">*</span>
              </label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control adult-signup-inputs"
                  placeholder="Zip Code "
                  onChange={(e) => {
                    setZipCode(e.target.value);
                  }}
                ></input>
                {zipCodeError && (
                  <div className="invalid-fields">
                    Please enter Phone Number
                  </div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">How Did You Hear About Us?</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={selectHearAbout}
              >
                <option value="" disabled selected>
                  How Did You Hear About Us?
                </option>
                {aboutUsOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Company Address<span className="mandatory">*</span>
              </label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control adult-signup-inputs"
                  placeholder="Company Address "
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                ></input>
                {addressError && (
                  <div className="invalid-fields">
                    Please enter Company Address
                  </div>
                )}
              </div>
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

export default BrandDetails;
