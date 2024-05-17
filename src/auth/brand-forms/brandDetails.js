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
import MuiPhoneNumber from "material-ui-phone-number";

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
  const [phoneNumberError, setPhoneNumberError] = useState(false);
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
      setPhoneNumberError(true);
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
            setTalentLocalStorage(resData.data.data);

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

  // Function to set user ID
  const setTalentLocalStorage = (data) => {
    console.log(data, "data otp");
    localStorage.setItem("brandId", data?.brand_id);
    // localStorage.setItem("emailID", data?.email);
    // localStorage.setItem("token", data?.token);
  };

  const selectHearAbout = (event) => {
    setHearAboutUs(event.target.value);
  };

  const [brandNameLetterError, setBrandNameLetterError] = useState(false);

  const handleBrandName = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
      setBrandNameLetterError(false);
      setBrandName("");
    } else if (!onlyLettersRegex.test(value)) {
      setBrandNameLetterError(true);
    } else {
      setBrandName(value);
      setBrandNameLetterError(false);
    }
  };

  const handleBrandNameKeyPress = (e) => {
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setBrandNameLetterError(false);
    }
  };

  const [zipCodeValidation, setZipCodeValidation] = useState(false);

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only numbers and the "+" symbol
    const onlyNumbersRegex = /^[0-9+]*$/;
    if (!onlyNumbersRegex.test(value)) {
      setZipCodeValidation(true);
    } else {
      setZipCode(value);
      setZipCodeValidation(false);
    }
  };

  const handleZipCodeKeyPress = (e) => {
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setBrandNameLetterError(false);
    }
  };
  const [mobileValidation, setMobileValidation] = useState(false);

  // const handleMobbileChange = (e) => {
  //   const value = e.target.value;
  //   // Regular expression to allow only numbers and the "+" symbol
  //   const onlyNumbersRegex = /^[0-9+]*$/;
  //   if (!onlyNumbersRegex.test(value)) {
  //     setMobileValidation(true);
  //   } else {
  //     setPhoneNumber(value);
  //     setMobileValidation(false);
  //   }
  // };

  // const handleMobileKeyPress = (e) => {
  //   // If the Backspace key is pressed and the input value is empty, clear the error
  //   if (e.key === "Backspace") {
  //     setBrandNameLetterError(false);
  //   }
  // };

  const handleMobileChange = (value, countryData) => {
    // Update the parentMobile state with the new phone number
    console.log(value, "handleMobileChange");
    setPhoneNumber(value);
    setPhoneNumberError(false);
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
        <div
          className="dialog-body spaceTops"
          
        >
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
                    handleBrandName(e);
                    setbrandNameError(false);
                  }}
                  onKeyDown={handleBrandNameKeyPress}
                ></input>
                {brandNameError && (
                  <div className="invalid-fields">Please enter Brand Name</div>
                )}
                {brandNameLetterError && (
                  <div className="invalid-fields">Only Letters are allowed</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Phone Number<span className="mandatory">*</span>
              </label>
              <div className="form-group">
                {/* <input
                  type="text"
                  className="form-control adult-signup-inputs"
                  placeholder="Phone Number "
                  onChange={(e) => {
                    handleMobbileChange(e);
                    setPhoneNumber(false);
                  }}
                  onKeyDown={handleMobileKeyPress}
                ></input> */}

                <MuiPhoneNumber
                  defaultCountry={"kh"}
                  className="form-control"
                  onChange={handleMobileChange}
                />

                {phoneNumberError && (
                  <div className="invalid-fields">
                    Please enter Phone Number
                  </div>
                )}
                {mobileValidation && (
                  <div className="invalid-fields">Only Numbers Allowed</div>
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
                    handleZipCodeChange(e);
                    setZipCodeError(false);
                  }}
                  onKeyDown={handleZipCodeKeyPress}
                ></input>
                {zipCodeError && (
                  <div className="invalid-fields">
                    Please enter Phone Number
                  </div>
                )}
                {zipCodeValidation && (
                  <div className="invalid-fields">Only Numbers Allowed</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">How Did You Hear About Us?</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={selectHearAbout}
                style={{ fontSize: "14px" }}
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
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Company Address<span className="mandatory">*</span>
              </label>
              <textarea
                style={{ width: "100%" }}
                className="form-control address-textarea"
                id="exampleFormControlTextarea1"
                value={address}
                rows="3"
                onChange={(e) => {
                  setAddress(e.target.value);
                  setAddressError(false);
                }}
              ></textarea>
              {addressError && (
                <div className="invalid-fields">
                  Please enter Company Address
                </div>
              )}
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
