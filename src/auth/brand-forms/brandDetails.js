import React, { useState, useEffect } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/register.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";
import Spinner from "../../components/Spinner";
import PopUp from "../../components/PopUp";
import MuiPhoneNumber from "material-ui-phone-number";
import Select from "react-select";
import {
  parsePhoneNumber,
  isValidPhoneNumber,
  getNumberType,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import "material-icons/iconfont/material-icons.css";

const BrandDetails = () => {
  const navigate = useNavigate();
  const btLogo = require("../../assets/images/LOGO.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const url = window.location.href;
    const params = new URLSearchParams(window.location.search);
    const userIdFromUrl = params.get("userId");
    const userEmailFromUrl = params.get("userEmail");
    if (userIdFromUrl) setUserId(userIdFromUrl);
    if (userEmailFromUrl) setUserEmail(userEmailFromUrl);
  }, []);

  useEffect(() => {
    getBrand();
  }, [userId]);

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${userId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandName(resData?.data?.data?.brandName);
            setPhoneNumber(resData?.data?.data?.brandPhone);
            setZipCode(resData?.data?.data?.brandZipCode);
            setHearAboutUs(resData?.data?.data?.hearAboutUs);
            setCountry(resData?.data?.data?.brandCountry);
            setState(resData?.data?.data?.brandState);
            getStates(resData?.data?.data?.brandCountry);
            setKidsCity(resData?.data?.data?.brandCity);
            setWebsiteLink(resData?.data?.data?.brandWebsite);
            setLinkedinUrl(resData?.data?.data?.linkedinUrl);
            setFacebookUrl(resData?.data?.data?.facebookUrl);
            setTwitterUrl(resData?.data?.data?.facebookUrl);
            setYourName(resData?.data?.data?.yourFullName);
            setBrandType(resData?.data?.data?.brandType);
          }
        }
      })
      .catch((err) => {});
  };

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

    setCountry(event?.value);
    getStates(event?.value);
  };
  const handleSelectedState = (state) => {
    setStateError(false);
    setState(state?.label);
    getCities({
      countryName: country,
      stateName: state?.label,
    });
  };

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
    "Recruiting firm",
    "Talent agency",
  ];

  useEffect(() => {}, [openPopUp]);

  const brandsSignup = async () => {
    console.log("brandName:", brandName);
    console.log("phoneNumber:", phoneNumber);
    console.log("zipCode:", zipCode);
    console.log("yourName:", yourName);
    console.log("mobileValidationError:", mobileValidationError);

    if (!brandName) {
      setbrandNameError(true);
    }
    if (!phoneNumber) {
      setPhoneNumberError(true);
    }
    if (!zipCode) {
      setZipCodeError(true);
    }
    if (!address) {
      setAddressError(true);
    }
    if (!yourName) {
      setYourNameError(true);
    }
    if (
      brandName &&
      phoneNumber &&
      zipCode &&
      yourName &&
      !mobileValidationError
    ) {
      const formData = {
        brandName: brandName,
        brandEmail: userEmail,
        brandPhone: phoneNumber,
        brandZipCode: zipCode,
        howHearAboutAs: hearAboutUs,
        address: address,
        publicUrl: brandName?.replace(/ /g, "-"),
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
      await ApiHelper.post(`${API.editBrands}${userId}`, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setMessage("Registered Successfully!");
            setBrandsLocalStorage(resData.data.data);
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
              navigate(
                `/brand-logo?userId=${resData?.data?.data["brand_id"]}&userEmail=${resData?.data?.data?.brandEmail}`
              );
            }, 1000);
          } else if (resData.data.status === false) {
            setMessage("Error Occured Try Again!");
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
            }, 1000);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setMessage("Error Occured Try Again!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        });
    } else {
      setMessage("Kindly complete all mandatory fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }
  };

  const setBrandsLocalStorage = (data) => {
    localStorage.setItem("brandId", data?.brand_id);
    localStorage.setItem("userEmail", data?.brandEmail);
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
    if (e.key === "Backspace") {
      setBrandNameLetterError(false);
    }
  };

  const [yourNameLetterError, setYourNameLetterError] = useState(false);
  const [yourNameError, setYourNameError] = useState(false);
  const [yourName, setYourName] = useState("");

  const handleYourName = (e) => {
    const value = e.target.value;
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
  const [linkedinError, setLinkedinError] = useState(false);
  const [facebookError, setFacebookError] = useState(false);
  const [twitterError, setTwitterError] = useState(false);

  const isValidSocialURL = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z0-9\\-]+)\\.)+[a-z]{2,}|localhost|" +
        "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" +
        "\\[?[a-f0-9]*:[a-f0-9:%.]+\\]?)" +
        "(\\:\\d+)?(\\/[-a-z0-9%_.~+]*)*" +
        "(\\?[;&a-z0-9%_.~+=-]*)?" +
        "(\\#[-a-z0-9_]*)?$",
      "i"
    );
    return !!pattern.test(url);
  };

  const handleLinkedinUrl = (e) => {
    const value = e.target.value;
    setLinkedinUrl(value);
    setLinkedinError(value && !isValidSocialURL(value)); // Validate and set error state
  };

  const handleFacebookUrl = (e) => {
    const value = e.target.value;
    setFacebookUrl(value);
    setFacebookError(value && !isValidSocialURL(value)); // Validate and set error state
  };

  const handleTwitterUrl = (e) => {
    const value = e.target.value;
    setTwitterUrl(value);
    setTwitterError(value && !isValidSocialURL(value)); // Validate and set error state
  };

  const [websiteLinkError, setWebsiteLinkError] = useState(false);
  const [websiteValidError, setWebsiteValidError] = useState(false);
  const [websiteLink, setWebsiteLink] = useState("");

  const isValidURL = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z0-9\\-]+)\\.)+[a-z]{2,}|localhost|" + // domain name
        "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" + // OR ip (v4) address
        "\\[?[a-f0-9]*:[a-f0-9:%.]+\\]?)" + // OR ipv6
        "(\\:\\d+)?(\\/[-a-z0-9%_.~+]*)*" + // port and path
        "(\\?[;&a-z0-9%_.~+=-]*)?" + // query string
        "(\\#[-a-z0-9_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  };

  const handleWebsiteLink = (e) => {
    const value = e.target.value;
    setWebsiteLink(value); // Update the input value

    if (value && !isValidURL(value)) {
      setWebsiteValidError(true); // Set error state if URL is invalid
    } else {
      setWebsiteValidError(false); // Clear error state if URL is valid
    }
  };

  const validateWebsiteLink = () => {
    const urlPattern = new RegExp(
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/
    );

    if (websiteLink === "" || urlPattern.test(websiteLink)) {
      setWebsiteLinkError(false); // Reset the error state if the URL is valid or empty
    } else {
      setWebsiteLinkError(true); // Set error state if invalid
    }
  };

  const handleYourNameKeyPress = (e) => {
    if (e.key === "Backspace") {
      setYourNameLetterError(false);
    }
  };

  const [zipCodeValidation, setZipCodeValidation] = useState(false);

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    const onlyNumbersRegex = /^[0-9+]*$/;
    if (!onlyNumbersRegex.test(value)) {
      setZipCodeValidation(true);
    } else {
      setZipCode(value);
      setZipCodeValidation(false);
    }
  };

  const handleZipCodeKeyPress = (e) => {
    if (e.key === "Backspace") {
      setBrandNameLetterError(false);
    }
  };
  const [mobileValidation, setMobileValidation] = useState(false);

  const [mobileValidationError, setMobileValidationError] = useState(false);

  const handleMobileChange = (value, countryData) => {
    setPhoneNumber(value);
    setPhoneNumberError(false);

    const isValid = isValidPhoneNumber(value);

    if (isValid) {
      setMobileValidationError(false);
    } else {
      setMobileValidationError(true);
    }
  };

  const goBack = async () => {
    navigate(
      `/otp-verification-brands?userId=${userId}&userEmail=${userEmail}`
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
                      className="form-control adult-signup-inputs adult-name-input"
                      placeholder="Company / Client Name"
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
                    value={brandType}
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
                    <MuiPhoneNumber
                      sx={{ "& svg": { height: "1em" } }}
                      countryCodeEditable={false}
                      defaultCountry={"kh"}
                      className="material-mobile-style"
                      onChange={handleMobileChange}
                      value={phoneNumber}
                    />
                    {mobileValidationError && (
                      <div className="invalid-fields">
                        Please enter correct Mobile Number
                      </div>
                    )}

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
                  options={countryList?.map((country, index) => ({
                    value: country,
                    label: country,
                    key: index,
                  }))}
                  value={country ? { value: country, label: country } : null}
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
                  options={stateList?.map((state) => ({
                    value: state.stateId, // or whatever unique identifier you want to use
                    label: state.name,
                  }))}
                  value={state ? { value: state, label: state } : null}
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
                  options={cityList?.map((city) => ({
                    value: city.cityId, // or whatever unique identifier you want to use
                    label: city.name,
                  }))}
                  value={kidsCity ? { value: kidsCity, label: kidsCity } : null}
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
                      type="number"
                      className="form-control projects-completed"
                      value={zipCode}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          /^\d*\.?\d*$/.test(value) &&
                          (value >= 0 || value === "")
                        ) {
                          handleZipCodeChange(e);
                          setZipCodeError(false);
                        }
                      }}
                      onKeyDown={handleZipCodeKeyPress}
                      min="0"
                      placeholder="Zip Code"
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
                    {websiteValidError && (
                      <div className="invalid-fields">
                        Please enter valid website
                      </div>
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
                    value={hearAboutUs}
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
                    {linkedinError && (
                      <div className="invalid-fields">
                        Please enter valid linkedin url
                      </div>
                    )}
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
                    {facebookError && (
                      <div className="invalid-fields">
                        Please enter valid facebook url
                      </div>
                    )}
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
                    {twitterError && (
                      <div className="invalid-fields">
                        Please enter valid twitter url
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dialog-footer">
          {/* <button
            type="button"
            onClick={(e) => {
              goBack();
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
