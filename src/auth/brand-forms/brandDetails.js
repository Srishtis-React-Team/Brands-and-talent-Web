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
import Select from "react-select";

const BrandDetails = () => {
  const navigate = useNavigate();
  const btLogo = require("../../assets/images/LOGO.png");
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
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [parentCountryError, setParentCountryError] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [kidsCity, setKidsCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    await ApiHelper.get(API.listCountries)
      .then((resData) => {
        if (resData) {
          setCountryList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const handleSelectedCountry = (event) => {
    setParentCountryError(false);
    console.log(event, "event");
    console.log(event?.value, "event?.value");
    setCountry(event?.value);
    // setState("");
    // handleSelectedState("");
    getStates(event?.value);
    console.log(country, "country");
  };
  const handleSelectedState = (state) => {
    console.log(state, "state");
    setStateError(false);
    setState(state?.label);
    // setKidsCity("");
    getCities({
      countryName: country,
      stateName: state?.label,
    });
  };

  useEffect(() => {
    console.log(state, "stateUseeffect");
  }, [state]);

  const handleSelectedCity = (state) => {
    setKidsCity(state?.label);
    setCityError(false);
  };

  const getStates = async (data) => {
    const formData = {
      countryName: data,
    };
    await ApiHelper.post(API.listStates, formData)
      .then((resData) => {
        if (resData) {
          setStateList(resData.data.data);
        }
      })
      .catch((err) => {});
  };
  const getCities = async (data) => {
    const formData = data;
    await ApiHelper.post(API.listCity, formData)
      .then((resData) => {
        if (resData) {
          setCityList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    // Check if data is passed through state
    if (location.state && location.state.data) {
      setReceivedData(location.state.data);
    }
  }, [location.state]);

  useEffect(() => {
    // console.log(receivedData, "receivedData");
    // if (receivedData?.brandName) {
    //   setBrandName(receivedData?.brandName);
    // }
  }, [receivedData]);

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

  const brandTypeList = [
    "Company ( 1-5 Employess )",
    "Company ( 6-10 Employess )",
    "Company ( 11-20 Employess )",
    "Company ( 21-50 Employess )",
    "Company ( 51-100 Employess )",
    "Company ( 101-250 Employess )",
    "Company ( 251-500 Employess )",
    "Company ( 501-3500 Employess )",
    "Company ( 3500+ Employess )",
    "Recruiting firms",
    "Staffing Agency",
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
    if (yourName === "") {
      setYourNameError(true);
    }
    if (
      brandName !== "" &&
      phoneNumber !== "" &&
      zipCode !== "" &&
      yourName !== ""
    ) {
      const formData = {
        brandName: brandName,
        brandEmail: receivedData?.brandEmail,
        brandPhone: phoneNumber,
        brandZipCode: zipCode,
        howHearAboutAs: hearAboutUs,
        address: address,
        publicUrl: brandName.replace(/ /g, "-"),
        yourFullName: yourName,
        brandType: brandType,
        brandCountry: country,
        brandState: state,
        brandCity: kidsCity,
        brandWebsite: websiteLink,
        linkedinUrl: linkedinUrl,
        facebookUrl: facebookUrl,
        twitterUrl: twitterUrl,
      };
      // setIsLoading(true);
      await ApiHelper.post(
        `${API.editBrands}${receivedData?.brandUserId}`,
        formData
      )
        .then((resData) => {
          if (resData.data.status === true) {
            console.log(resData.data, "brandetails");
            // setIsLoading(false);
            setMessage("Registered SuccessFully!");
            setTalentLocalStorage(resData.data.data);
            navigate("/brand-logo", {
              state: { data: resData.data.data },
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

  const [brandType, setBrandType] = useState("");

  const selectBrandType = (event) => {
    setBrandType(event.target.value);
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

  const [yourNameLetterError, setYourNameLetterError] = useState(false);
  const [yourNameError, setYourNameError] = useState(false);
  const [yourName, setYourName] = useState("");

  const handleYourName = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
      setYourNameLetterError(false);
      setYourName("");
    } else if (!onlyLettersRegex.test(value)) {
      setYourNameLetterError(true);
    } else {
      setYourName(value);
      setYourNameLetterError(false);
    }
  };
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  const handleLinkedinUrl = (e) => {
    const value = e.target.value;
    setLinkedinUrl(value);
  };
  const handleFacebookUrl = (e) => {
    const value = e.target.value;
    setFacebookUrl(value);
  };
  const handleTwitterUrl = (e) => {
    const value = e.target.value;
    setTwitterUrl(value);
  };

  const [websiteLinkError, setWebsiteLinkError] = useState(false);
  const [websiteLink, setWebsiteLink] = useState("");

  const handleWebsiteLink = (e) => {
    const value = e.target.value;
    setWebsiteLink(value);
  };

  const handleYourNameKeyPress = (e) => {
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setYourNameLetterError(false);
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
        <div className="dialog-body spaceTops">
          <div className="adult-signup-main">
            <div className="step-title mb-3">Brand / Client Details</div>

            <div className="kids-form-row row">
              <div className="kids-form-section col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Brand/Client Name<span className="mandatory">*</span>
                  </label>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control adult-signup-inputs"
                      placeholder="Enter your company name or your name if you’re an individual client"
                      onChange={(e) => {
                        handleBrandName(e);
                        setbrandNameError(false);
                      }}
                      onKeyDown={handleBrandNameKeyPress}
                      value={brandName}
                    ></input>
                    {brandNameError && (
                      <div className="invalid-fields">
                        Please enter Brand / Client name
                      </div>
                    )}
                    {brandNameLetterError && (
                      <div className="invalid-fields">
                        Only Letters are allowed
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="kids-form-section col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Your Full Name<span className="mandatory">*</span>
                  </label>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control adult-signup-inputs"
                      placeholder="Your Full Name"
                      onChange={(e) => {
                        handleYourName(e);
                        setYourNameError(false);
                      }}
                      onKeyDown={handleYourNameKeyPress}
                      value={yourName}
                    ></input>
                    {yourNameError && (
                      <div className="invalid-fields">
                        Please enter Your Full Name
                      </div>
                    )}
                    {yourNameLetterError && (
                      <div className="invalid-fields">
                        Only Letters are allowed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="kids-form-row row">
              <div className="kids-form-section col-md-6">
                <div className="mb-3">
                  <label className="form-label">Brand / Client Type</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={selectBrandType}
                    style={{ fontSize: "14px" }}
                  >
                    <option value="" disabled selected>
                      Brand / Client Type
                    </option>
                    {brandTypeList.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="kids-form-section col-md-6">
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
              </div>
            </div>

            <div className="kids-form-row row">
              <div className="kids-form-section col-md-6 mb-3">
                <label className="form-label">
                  Country<span className="mandatory">*</span>
                </label>
                <Select
                  placeholder="Search country..."
                  options={countryList.map((country, index) => ({
                    value: country,
                    label: country,
                    key: index,
                  }))}
                  value={country?.value}
                  onChange={handleSelectedCountry}
                  isSearchable={true}
                />
                {parentCountryError && (
                  <div className="invalid-fields">Please Select Country</div>
                )}
              </div>
              <div className="kids-form-section col-md-6 mb-3">
                <label className="form-label">State</label>
                <Select
                  placeholder="Select state..."
                  options={stateList.map((state) => ({
                    value: state.stateId, // or whatever unique identifier you want to use
                    label: state.name,
                  }))}
                  value={state?.label}
                  onChange={handleSelectedState}
                  isSearchable={true}
                />
                {stateError && (
                  <div className="invalid-fields">Please Select State</div>
                )}
              </div>
            </div>

            <div className="kids-form-row row">
              <div className="kids-form-section col-md-6 mb-3">
                <label className="form-label">City</label>
                <Select
                  placeholder="Select City..."
                  options={cityList.map((city) => ({
                    value: city.cityId, // or whatever unique identifier you want to use
                    label: city.name,
                  }))}
                  value={kidsCity?.label}
                  onChange={handleSelectedCity}
                  isSearchable={true}
                />
              </div>
              <div className="kids-form-section col-md-6">
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
                        Please enter Zip Code
                      </div>
                    )}
                    {zipCodeValidation && (
                      <div className="invalid-fields">Only Numbers Allowed</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="kids-form-row row">
              <div className="kids-form-section col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Brand / Client Website<span className="mandatory">*</span>
                  </label>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control adult-signup-inputs"
                      placeholder="Your Website"
                      onChange={(e) => {
                        handleWebsiteLink(e);
                        setWebsiteLinkError(false);
                      }}
                      value={websiteLink}
                    ></input>
                    {websiteLinkError && (
                      <div className="invalid-fields">Please enter Website</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="kids-form-section col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    How Did You Hear About Us?
                  </label>
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
              </div>
            </div>

            <div className="kids-form-row row">
              <div className="kids-form-section col-md-6">
                <div className="mb-3">
                  <label className="form-label">Linkedin Url</label>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control adult-signup-inputs"
                      placeholder="Linkedin Url"
                      onChange={(e) => {
                        handleLinkedinUrl(e);
                      }}
                      value={linkedinUrl}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="kids-form-section col-md-6">
                <div className="mb-3">
                  <label className="form-label">Facebook Url</label>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control adult-signup-inputs"
                      placeholder="Facebook Url"
                      onChange={(e) => {
                        handleFacebookUrl(e);
                      }}
                      value={facebookUrl}
                    ></input>
                  </div>
                </div>
              </div>
            </div>

            <div className="kids-form-row row">
              <div className="kids-form-section col-md-6">
                <div className="mb-3">
                  <label className="form-label">Twitter Url</label>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control adult-signup-inputs"
                      placeholder="Twitter Url"
                      onChange={(e) => {
                        handleTwitterUrl(e);
                      }}
                      value={twitterUrl}
                    ></input>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Brand / Client Address<span className="mandatory">*</span>
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
                <div className="invalid-fields">Please enter Address</div>
              )}
            </div> */}
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
