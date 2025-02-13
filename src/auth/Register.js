import React, { useState, useEffect, useRef } from "react";
import "../assets/css/dashboard.css";
import "../assets/css/register.css";
import { useNavigate } from "react-router";
import PopUp from "../components/PopUp";
import { useLocation } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { API } from "../config/api";
import Select from "react-select";
import { ApiHelper } from "../helpers/ApiHelper";
import Axios from "axios";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import "../assets/css/register.css";

const Register = () => {
  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.png");
  const userIcon = require("../assets/icons/user.png");
  const cameraIcon = require("../assets/icons/cameraIcon.png");
  const fbLogo = require("../assets/icons/fbLogo.png");
  const googleLogo = require("../assets/icons/googleLogo.png");
  const importIcon = require("../assets/icons/instagram.png");
  const mailIcon = require("../assets/icons/mail.png");
  const lockiIcon = require("../assets/icons/lock.png");
  const eyeOff = require("../assets/icons/eye-off.png");
  const mapIcon = require("../assets/icons/map-pin.png");
  const userLogo = require("../assets/icons/user-only.png");
  const genderIcon = require("../assets/icons/gender.png");
  const trialIcon = require("../assets/icons/trial-icon.png");
  const greenTick = require("../assets/icons/greenTick.png");
  const bigTick = require("../assets/icons/bigTick.png");
  const gmailGrey = require("../assets/icons/gmailGrey.png");
  const kidsImage = require("../assets/images/kidsImage.png");

  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [kids_step, setKidsStep] = useState(Number);
  const [adults_step, setAdultsStep] = useState(Number);
  const [ageForm_visiblity, showAgeForm] = useState(false);
  const [talentSignup, showTalentSignup] = useState(false);
  const [talentGmail, showTalentGmail] = useState(false);
  const [under18_formOne, showUnder18_formOne] = useState(false);
  const [under18_formTwo, showUnder18_formTwo] = useState(false);
  const [brands_form1, setBrands_form1] = useState(false);
  const [brands_form2, setBrands_form2] = useState(false);
  const [brands_form3, setBrands_form3] = useState(false);
  const [brands_form4, setBrands_form4] = useState(false);
  const [brands_form5, setBrands_form5] = useState(false);
  const [brands_form6, setBrands_form6] = useState(false);
  const [brands_step, setBrands_step] = useState(Number);
  const [brandGmail, showBrandGmail] = useState(false);
  const [header, showHeader] = useState(true);
  const [gigPreview, setGigPreview] = useState("");
  const [talentEmail, setTalentEmail] = useState("");
  const [talentPassword, setTalentPassword] = useState("");
  const [talentConfirmPassword, setTalentConfirmPassword] = useState("");
  const [adultEmail, setAdultEmail] = useState("");
  const [adultPassword, setAdultPassword] = useState("");
  const [adultConfirmPassword, setAdultConfirmPassword] = useState("");
  const [brandName, setBrandName] = useState("");
  const [brandEmail, setBrandEmail] = useState("");
  const [brandPassword, setBrandPassword] = useState("");
  const [brandPhone, setBrandPhone] = useState();
  const [brandZipcode, setBrandZipcode] = useState();
  const [enableTracking, setTrackingSystem] = useState("");
  const [howHearAboutUs, sethowHearAboutUs] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobAge, setJobAge] = useState();
  const [jobGender, setJobGender] = useState("");
  const [jobSocialFollowers, setJobSocialFollowers] = useState();
  const [jobLanguages, setJobLanguages] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobRemote, setJobRemote] = useState("");
  const [jobSummary, setJobSummary] = useState("");
  const [jobYouWill, setJobYouWill] = useState("");
  const [jobIdeallyWill, setJobIdeallyWill] = useState("");
  const [jobAboutUs, setJobAboutUs] = useState("");
  const [jobBenefits, setJobBenefits] = useState("");
  const [jobPayInformation, setJobPayInformation] = useState("");
  const [jobCurrency, setJobCurrency] = useState("");
  const [jobFrequency, setJobFrequency] = useState("");
  const [jobAmountType, setJobAmountType] = useState("");
  const [jobMinPay, setJobMinPay] = useState();
  const [jobMaxPay, setJobMaxPay] = useState();
  const [jobImage, setJobImage] = useState("");
  const [kidsFormOneData, setKidsFormOneData] = useState("");
  const [signupDisabled, setSignupDisabled] = useState(false);
  const [adultSignupDisabled, setAdultSignupDisabled] = useState(false);
  const [parentData, setParentData] = useState();
  const [adultParentData, setAdultParentData] = useState();
  const [adultSignUpData, setAdultSignUpData] = useState();
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChildData = (data) => {
    if (data.signupStatus === true) {
      setSignupDisabled(true);
      setParentData(data);
    } else {
      setSignupDisabled(false);
    }
  };

  const handleAdultOtp = (data) => {
    if (data === "back") {
      setAdultsStep(1);
    }
    if (data == "verified") {
      setAdultsStep(3);
    }
    // if (data.signupStatus === true) {
    //
    //   setAdultSignUpData(data);
    //
    // } else {
    //   setSignupDisabled(false);
    // }
  };

  const [dataFromChild, setDataFromChild] = useState("");
  const handleDataFromChild = (data) => {
    if (data === "payment success") {
      setPaymentStatus(true);
    }
    setDataFromChild(data);
  };
  const paymentSuccess = () => {
    if (paymentStatus === true) {
      setKidsStep(4);
    }
  };

  const [childData, setChildData] = useState("");
  // Function to receive data from ChildComponent
  const receiveDataFromChild = (dataFromChild) => {
    setChildData(dataFromChild);

    if (dataFromChild === "back") {
      setKidsStep(1);
    }
    if (dataFromChild === "verified") {
      setKidsStep(3);
    }
  };

  const DataFromKidsOtp = (dataFromChild) => {
    setChildData(dataFromChild);

    if (dataFromChild === "back") {
      setKidsStep(1);
    }
    if (dataFromChild === "verified") {
      setKidsStep(3);
    }
  };

  const location = useLocation();
  const routeData = location.state;

  useEffect(() => {
    if (routeData?.signupCategory == "kids") {
      navigate(`/talent-kids-teen-signup-basic-details`);
      // setKidsStep(1);
    } else if (routeData?.signupCategory == "brand") {
      navigate(`/brand-firstGig`);
    } else if (routeData?.signupCategory == "adults") {
      // setAdultsStep(1);
      navigate(`/talent-signup`);
    }
  }, []);

  function brandClick(e) {
    if (
      routeData?.signupCategory == "brand" &&
      routeData?.signupCategory != "kids"
    ) {
      if (e === "goTo-brandForm-one") {
        setBrands_form1(true);
      }
      if (e === "goTo-brandForm-two") {
        setBrands_form1(false);
        setBrands_form2(true);
      } else {
        setBrands_form2(false);
      }
    }
  }

  function handleKidsForms(e) {
    if (
      routeData.signupCategory == "kids" &&
      routeData.signupCategory != "brand"
    ) {
      if (e === "goto-kids-otp") {
        setKidsStep(2);
      }
    }
  }

  const selectTrackingSystem = (event) => {
    setTrackingSystem(event.target.value);
  };
  const selecthowHearAboutUs = (event) => {
    sethowHearAboutUs(event.target.value);
  };
  const selectJobGender = (event) => {
    setJobGender(event.target.value);
  };
  const selectJobLanguages = (event) => {
    setJobLanguages(event.target.value);
  };
  const selectJobType = (event) => {
    setJobType(event.target.value);
  };
  const selectJobRemote = (event) => {
    setJobRemote(event.target.value);
  };
  const selectJobCurrency = (event) => {
    setJobCurrency(event.target.value);
  };
  const selectJobFrequency = (event) => {
    setJobFrequency(event.target.value);
  };

  const professionList = [
    { value: "Actor", label: "Actor" },
    { value: "Animator", label: "Animator" },
    { value: "Architect ", label: "Architect " },
    { value: "Artist", label: "Artist" },
    { value: "Blogger/Vlogger", label: "Blogger/Vlogger" },
    { value: "Blockchain Developer", label: "Blockchain Developer" },
    { value: "Careers Coach", label: "Careers Coach" },
    { value: "Cartoonist", label: "Cartoonist" },
    { value: "Celebrity", label: "Celebrity" },
    { value: "Chef/Culinary Artist", label: "Chef/Culinary Artist" },
    { value: "Choreographer", label: "Choreographer" },
    { value: "Cinematographer", label: "Cinematographer" },
    { value: "Comedian", label: "Comedian" },
    { value: "Copywriter", label: "Copywriter" },
    { value: "Craftsperson", label: "Craftsperson" },
    { value: "Creator", label: "Creator" },
    { value: "Curator", label: "Curator" },
    { value: "Dance Teacher", label: "Dance Teacher" },
    { value: "Dancer", label: "Dancer" },
    { value: "Designer ", label: "Designer " },
    { value: "Dietitian ", label: "Dietitian " },
    { value: "DJ", label: "DJ" },
    { value: "Driving Instructor", label: "Driving Instructor" },
    { value: "Event Planner", label: "Event Planner" },
    { value: "Fashion Designer", label: "Fashion Designer" },
    { value: "Filmmaker", label: "Filmmaker" },
    { value: "Graphic Designer", label: "Graphic Designer" },
    { value: "Hair & Makeup Artist", label: "Hair & Makeup Artist" },
    { value: "Host/MC", label: "Host/MC" },
    { value: "Illustrator", label: "Illustrator" },
    { value: "Influencer", label: "Influencer" },
    { value: "Interior Designer", label: "Interior Designer" },
    { value: "Life Coach", label: "Life Coach" },
    { value: "Martial Arts Instructor", label: "Martial Arts Instructor" },
    { value: "Meditation Teacher", label: "Meditation Teacher" },
    { value: "Model", label: "Model" },
    { value: "Music Teacher", label: "Music Teacher" },
    { value: "Musician", label: "Musician" },
    { value: "Nail Artist", label: "Nail Artist" },
    { value: "Nutritionist ", label: "Nutritionist " },
    { value: "Personal Trainer", label: "Personal Trainer" },
    { value: "Photographer", label: "Photographer" },
    { value: "Podcaster", label: "Podcaster" },
    { value: "Public Speaker", label: "Public Speaker" },
    { value: "Radio Jockey (RJ)", label: "Radio Jockey (RJ)" },
    { value: "Singer", label: "Singer" },
    { value: "Sports Instructor", label: "Sports Instructor" },
    { value: "Sculptor", label: "Sculptor" },
    { value: "Stylist", label: "Stylist" },
    { value: "Sustainability Consultant", label: "Sustainability Consultant" },
    { value: "Swimming Instructor", label: "Swimming Instructor" },
    { value: "Tattooist", label: "Tattooist" },
    { value: "Videographer", label: "Videographer" },
    { value: "Voice-over Artist", label: "Voice-over Artist" },
    { value: "Web Designer/Developer", label: "Web Designer/Developer" },
    { value: "Wedding Planner", label: "Wedding Planner" },
    { value: "Writer", label: "Writer" },
    { value: "Yoga Instructor", label: "Yoga Instructor" },
    { value: "Video Jockey (VJ)", label: "Video Jockey (VJ)" },
  ];

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      uploadFile(fileData);
    }
  };

  const uploadFile = async (fileData) => {
    setLoader(true);
    const params = new FormData();
    params.append("file", fileData);
    /* await ApiHelper.post(API.uploadFile, params) */
    await Axios.post(API.uploadFile, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resData) => {
        setGigPreview(resData.data.data.filename);
        setJobImage(resData.data.data);
        setMessage(resData.data.message);
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 2000);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorSummary = (editorState) => {
    setJobSummary(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
  };
  const onEditorYouWill = (editorState) => {
    setJobYouWill(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
  };
  const onEditorIdeally = (editorState) => {
    setJobIdeallyWill(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
    setEditorState(editorState);
  };
  const onEditorAboutUs = (editorState) => {
    setJobAboutUs(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
  };

  const openGmail = () => {
    // Open Gmail in a new tab
    window.open("https://mail.google.com/", "_blank");
  };

  const brandSignup = async () => {
    const formData = {
      brandName: brandName,
      brandEmail: brandEmail,
      brandPassword: brandPassword,
      brandPhone: brandPhone,
      brandZipCode: brandZipcode,
      enableTracking: enableTracking,
      howHearAboutUs: howHearAboutUs,
      jobTitle: jobTitle,
      jobLocation: jobLocation,
      jobAge: jobAge,
      jobGender: jobGender,
      jobSocialFollowers: jobSocialFollowers,
      jobLanguages: jobLanguages,
      jobType: jobType,
      jobRemote: jobRemote,
      jobSummary: jobSummary,
      jobYouWill: jobYouWill,
      jobIdeallyWill: jobIdeallyWill,
      jobAboutUs: jobAboutUs,
      jobBenefits: jobBenefits,
      jobPayInformation: jobPayInformation,
      jobCurrency: jobCurrency,
      jobFrequency: jobFrequency,
      jobAmountType: jobAmountType,
      jobMinPay: jobMinPay,
      jobMaxPay: jobMaxPay,
      jobImage: jobImage,
    };
    await ApiHelper.post(API.brandRegisteration, formData)
      .then((resData) => {
        setMessage(resData.data.msg);
        if (resData.data.status === true) {
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };
  const adultSignUp = async () => {
    const formData = {
      adultEmail: adultEmail,
      talentPassword: adultPassword,
      confirmPassword: adultConfirmPassword,
    };
    setIsLoading(true);
    await ApiHelper.post(API.adultSignUp, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setAdultSignupDisabled(true);
          setMessage("Registered Successfully!");

          setAdultParentData(resData?.data);

          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setAdultSignupDisabled(false);
          setMessage("Error Occured Try Again!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setAdultSignupDisabled(false);
        setMessage("Error Occured Try Again!");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      });
  };

  return (
    <>
      {brands_step === 1 && (
        <div className="form-dialog">
          <div className="header-wrapper">
            <div className="step-wrapper">
              <img className="modal-logo" src={btLogo}></img>
              <div className="step-text">Step 1 of 5</div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                navigate("/");
              }}
            ></button>
          </div>
          <div className="dialog-body">
            <div className="brands-form-wrapper">
              <div className="step-title">Sign up</div>
              <div className="step-selection">
                <div className="select-wrapper email-input">
                  <img className="user-icon" src={userIcon}></img>
                  <input
                    type="text"
                    className="select-text absolute-input"
                    placeholder="Your Name"
                    onChange={(e) => {
                      setBrandName(e.target.value);
                    }}
                  />
                </div>
                <div className="select-wrapper email-input">
                  <img src={mailIcon}></img>
                  <input
                    type="text"
                    className="select-text absolute-input"
                    placeholder="Gmail"
                    onChange={(e) => {
                      setBrandEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="email-info">
                  Talent that apply to your job will be send to this email
                </div>
                <div className="select-wrapper password-wrapper">
                  <div>
                    <img src={lockiIcon}></img>
                    <input
                      type="password"
                      className="select-text absolute-input password-input"
                      placeholder="Password"
                      onChange={(e) => {
                        setBrandPassword(e.target.value);
                      }}
                    />
                  </div>
                  <img src={eyeOff}></img>
                </div>
                <div className="stroke-wrapper">
                  <div className="stroke-div"></div>
                  <div className="or-signup">Or Signup with</div>
                  <div className="stroke-div"></div>
                </div>
                <div className="signup-options">
                  <div className="google-media">
                    <img src={googleLogo} alt="" />
                    <div className="media-text">Google</div>
                  </div>
                  <div className="fb-media">
                    <img src={fbLogo} alt="" />
                    <div className="media-text">Facebook</div>
                  </div>
                </div>
                <div className="signup-terms">
                  By registering you confirm that you accept the 
                  <span>Terms & Conditions</span> and 
                  <span>Privacy Policy</span>
                </div>
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
              onClick={() => {
                setBrands_step(2);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {brands_step === 2 && (
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
              <div className="step-text">Step 2 of 5</div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                navigate("/");
              }}
            ></button>
          </div>
          <div className="dialog-body">
            <div className="brands-form-wrapper">
              <div className="step-title">Brand Details</div>
              <div className="step-selection">
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {
                      setBrandPhone(e.target.value);
                    }}
                    placeholder="Phone Number"
                  ></input>
                </div>

                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {
                      setBrandZipcode(e.target.value);
                    }}
                    placeholder="Zip Code"
                  ></input>
                </div>

                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Do you use an applicant Tracking System?
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={selectTrackingSystem}
                  >
                    <option defaultValue value="yes">
                      Yes
                    </option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    How did you hear about us?
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={selecthowHearAboutUs}
                  >
                    <option defaultValue value="social platforms">
                      Social Platforms
                    </option>
                    <option value="myself">MySelf</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="dialog-footer">
            <button
              type="button"
              onClick={() => {
                navigate(`/brand-firstGig`);
              }}
              className="step-back"
            >
              Back
            </button>
            <button
              type="button"
              className="step-continue"
              onClick={() => {
                setBrands_step(3);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {brands_step === 3 && (
        <div className="form-dialog">
          <div className="header-wrapper">
            <div className="step-wrapper">
              <img
                onClick={() => {
                  navigate("/");
                }}
                className="modal-logo"
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
          <div className="dialog-body">
            <div className="brands-form-wrapper">
              <div className="step-title">Post Your Gig/Job</div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Tittle
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  onChange={(e) => {
                    setJobTitle(e.target.value);
                  }}
                  placeholder="Enter tittle"
                ></input>
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Location (Zip Code)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  onChange={(e) => {
                    setJobLocation(e.target.value);
                  }}
                  placeholder="Enter Location"
                ></input>
              </div>
              <div className="splitter">
                <div className="splitter-one">
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Age
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => {
                        setJobAge(e.target.value);
                      }}
                      placeholder="Enter Age"
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Social Media Followers
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => {
                        setJobSocialFollowers(e.target.value);
                      }}
                      placeholder="Followers"
                    ></input>
                  </div>
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Employment Type
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectJobType}
                    >
                      <option defaultValue value="freelancer">
                        Freelancer
                      </option>
                      <option value="regular">Regular</option>
                    </select>
                  </div>
                </div>
                <div className="splitter-two">
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Gender
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectJobGender}
                    >
                      <option defaultValue value="male">
                        Male
                      </option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Languages
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectJobLanguages}
                    >
                      <option defaultValue value="english">
                        English
                      </option>
                      <option value="french">French</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Remote Work?
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectJobRemote}
                    >
                      <option defaultValue value="true">
                        Yes
                      </option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </div>
              </div>
              <label className="form-label">Short gig/job summary</label>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorSummary}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "list",
                    "textAlign",
                    "history",
                  ],
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: {
                    inDropdown: true,
                    options: ["left", "center", "right", "justify"],
                  }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
              />
              <label className="form-label">You Will(Optional)</label>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorYouWill}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "list",
                    "textAlign",
                    "history",
                  ],
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: {
                    inDropdown: true,
                    options: ["left", "center", "right", "justify"],
                  }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
              />
              <label className="form-label">
                Ideally You Will Have(Optional)
              </label>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorIdeally}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "list",
                    "textAlign",
                    "history",
                  ],
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: {
                    inDropdown: true,
                    options: ["left", "center", "right", "justify"],
                  }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
              />
              <label className="form-label">About Us</label>
              <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorAboutUs}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "list",
                    "textAlign",
                    "history",
                  ],
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: {
                    inDropdown: true,
                    options: ["left", "center", "right", "justify"],
                  }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present  textAlign: { inDropdown: true, options: ["left", "center", "right", "justify"] }, // Ensure 'justify' is present
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                }}
              />
              <label className="form-label pay-info">Benefits</label>
              <div className="profession-wrapper benefits-dropdown">
                <Select
                  defaultValue={[professionList[2], professionList[3]]}
                  isMulti
                  name="colors"
                  options={professionList}
                  valueField="value"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(value) => setJobBenefits(value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label pay-info">Pay Information</label>
                <div className="choose-pay">
                  <div className="radio-wrapper">
                    <input
                      type="radio"
                      id="html"
                      name="fav_language"
                      value="paid collaboration"
                      onChange={(e) => {
                        setJobPayInformation(e.target.value);
                      }}
                    ></input>
                    <label className="pay-label" htmlFor="html">
                      Paid collaboration
                    </label>
                  </div>
                  <div className="radio-wrapper">
                    <input
                      type="radio"
                      id="css"
                      name="fav_language"
                      value="product/ gift"
                      onChange={(e) => {
                        setJobPayInformation(e.target.value);
                      }}
                    ></input>
                    <label className="pay-label" htmlFor="css">
                      Product/ gift
                    </label>
                  </div>
                  <div className="radio-wrapper">
                    <input
                      type="radio"
                      id="javascript"
                      name="fav_language"
                      value="paid collaboration + gift"
                      onChange={(e) => {
                        setJobPayInformation(e.target.value);
                      }}
                    ></input>
                    <label className="pay-label" htmlFor="javascript">
                      Paid collaboration + Gift
                    </label>
                  </div>
                </div>
              </div>
              <div className="splitter">
                <div className="splitter-one">
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Currency
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectJobCurrency}
                    >
                      <option defaultValue value="USD">
                        USD
                      </option>
                      <option value="AUD">AUD</option>
                    </select>
                  </div>
                </div>
                <div className="splitter-two">
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Frequency
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectJobFrequency}
                    >
                      <option defaultValue value="monthly">
                        Monthly
                      </option>
                      <option value="annually">Annualy</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="choose-pay">
                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="fixed_amount"
                    name="amounts"
                    value="fixed amount"
                    onChange={(e) => {
                      setJobAmountType(e.target.value);
                    }}
                  ></input>
                  <label className="pay-label" htmlFor="fixed_amount">
                    Fixed Amount
                  </label>
                </div>
                <div className="radio-wrapper">
                  <input
                    type="radio"
                    id="range"
                    name="amounts"
                    value="range of amounts"
                    onChange={(e) => {
                      setJobAmountType(e.target.value);
                    }}
                  ></input>
                  <label className="pay-label" htmlFor="range">
                    Range Of Amounts
                  </label>
                </div>
              </div>
              <div className="splitter">
                <div className="splitter-one">
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Min Pay
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => {
                        setJobMinPay(e.target.value);
                      }}
                      placeholder="Min Pay Amount"
                    ></input>
                  </div>
                </div>
                <div className="splitter-two">
                  <div className="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Max Pay
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      onChange={(e) => {
                        setJobMaxPay(e.target.value);
                      }}
                      placeholder="Max Pay Amount"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="gig-upload">
                <label className="gig-img-wrapper" htmlFor="input-file">
                  <img src={cameraIcon} alt="" />
                  <div className="add-text">Add Image</div>
                </label>
                <input
                  className="gig-input"
                  type="file"
                  id="input-file"
                  accept="image/*"
                  onChange={onImageChange}
                ></input>
                <div className="upload-text">
                  Upload a Image For your Gig/Job
                </div>
              </div>
              {gigPreview && (
                <div className="image-preview">
                  <img src={API.userFilePath + gigPreview} />
                </div>
              )}
            </div>
          </div>
          <div className="dialog-footer">
            <button
              type="button"
              onClick={() => {
                setBrands_step(2);
              }}
              className="step-back"
            >
              Back
            </button>
            <button
              type="button"
              className="step-continue"
              onClick={() => {
                setBrands_step(4);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {brands_step === 4 && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img
                className="modal-logo"
                onClick={() => {
                  navigate("/");
                }}
                src={btLogo}
              ></img>
              <div className="step-text">Step 4 of 5</div>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  navigate("/");
                }}
              ></button>
            </div>
            <div className="modal-body brands-preview-modal modal-content ">
              <div className="step-title">Gig/Job Preview</div>
              <div className="gig-preview">
                <div>
                  {gigPreview && (
                    <img
                      className="gig-image"
                      src={API.userFilePath + gigPreview}
                      alt=""
                    />
                  )}
                  {/* {!gigPreview && (
                    <img className="gig-image" src={model} alt="" />
                  )} */}
                </div>
                <div className="gig-content">
                  <div className="gig-name">{jobTitle}</div>
                  <div className="gig-description">{jobSummary}</div>
                  <div className="gig-infos">
                    <div className="gig-followers">
                      <div className="gig-logo">
                        <img src={userLogo} alt="" />
                      </div>
                      <div className="gig-counts">
                        <div className="followers-text">Followers</div>
                        <div className="followers-count">
                          {jobSocialFollowers}
                        </div>
                      </div>
                    </div>
                    <div className="gig-followers">
                      <div className="gig-logo">
                        <img src={userLogo} alt="" />
                      </div>
                      <div className="gig-counts">
                        <div className="followers-text">Age</div>
                        <div className="followers-count">{jobAge}</div>
                      </div>
                    </div>
                    <div className="gig-followers">
                      <div className="gig-logo">
                        <img src={genderIcon} alt="" />
                      </div>
                      <div className="gig-counts">
                        <div className="followers-text">Gender</div>
                        <div className="followers-count">{jobGender}</div>
                      </div>
                    </div>
                    <div className="gig-followers">
                      <div className="gig-logo">
                        <img src={mapIcon} alt="" />
                      </div>
                      <div className="gig-counts">
                        <div className="followers-text">Location</div>
                        <div className="followers-count">{jobLocation}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="company">
                <div className="company-name">
                  <div className="name-wrapper">S</div>
                  <div className="company-text">{brandName}</div>
                </div>
                <div className="company-plan">
                  {jobMaxPay}
                  {jobCurrency}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => {
                  setBrands_step(3);
                }}
                className="step-back"
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={() => {
                  setBrands_step(5);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {brands_step === 5 && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img
                className="modal-logo"
                onClick={() => {
                  navigate("/");
                }}
                src={btLogo}
              ></img>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  navigate("/");
                }}
              ></button>
            </div>
            <div className="modal-body modal-content ">
              <div className="step-title">Loading Form</div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => {
                  setBrands_step(4);
                }}
                className="step-back"
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={() => {
                  setBrands_step(6);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {brands_step === 6 && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img
                className="modal-logo"
                onClick={() => {
                  navigate("/");
                }}
                src={btLogo}
              ></img>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  navigate("/");
                }}
              ></button>
            </div>
            <div className="modal-body trial-model modal-content ">
              <div className="trial-page">
                <div className="trial-wrapper">
                  <div className="trial-title">Trial Version Activated</div>
                  <div className="inlcluded">WHAT’S INCLUDED</div>
                  <div className="included-content">
                    <div className="">
                      <div className="included-line">
                        <img src={greenTick} alt="" />
                        <div className="include-text">
                          Create 1  free job posts
                        </div>
                      </div>
                      <div className="included-line">
                        <img src={greenTick} alt="" />
                        <div className="include-text">
                          2 days Job Post approval
                        </div>
                      </div>
                      <div className="included-line">
                        <img src={greenTick} alt="" />
                        <div className="include-text">
                          View & Manage Job Applications
                        </div>
                      </div>
                      <div className="included-line">
                        <img src={greenTick} alt="" />
                        <div className="include-text">Bookmark Talent</div>
                      </div>
                    </div>
                    <div className="include-wrapper">
                      <div className="included-line">
                        <img src={greenTick} alt="" />
                        <div className="include-text">
                          Email and chat support
                        </div>
                      </div>
                      <div className="included-line">
                        <img src={greenTick} alt="" />
                        <div className="include-text">
                          Pay the Talent Your Way: Transfer, Gift, or Both
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="trialing">
                  <img src={trialIcon} alt="" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => {
                  setBrands_step(5);
                }}
                className="step-back"
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={() => {
                  setBrands_step(7);
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {brands_step === 7 && (
        <>
          <div className="modal-wrapper">
            <div className="modal-content">
              <div className="modal-header header-wrapper">
                <img
                  className="modal-logo"
                  onClick={() => {
                    navigate("/");
                  }}
                  src={btLogo}
                ></img>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    navigate("/");
                  }}
                ></button>
              </div>
              <div className="modal-body trial-model modal-content gmail-page-body">
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
                  <div className="open-gmail">
                    <img src={gmailGrey} alt="" />
                    <div className="gmail-btn-text">Open Gmail</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {adults_step === 1 && (
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
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                navigate("/");
              }}
            ></button>
          </div>
          <div className="dialog-body">
            <div className="adult-signup-main">
              <div className="step-title">Sign up</div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <div className="form-group has-search">
                  <span className="fa fa-envelope form-control-feedback"></span>
                  <input
                    type="text"
                    className="form-control adult-signup-inputs"
                    placeholder="Email "
                    onChange={(e) => {
                      setAdultEmail(e.target.value);
                    }}
                  ></input>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="form-group has-search adult-password-wrapper">
                  <span className="fa fa-lock form-control-feedback"></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control adult-signup-inputs"
                    placeholder="Password"
                    onChange={(e) => {
                      setAdultPassword(e.target.value);
                    }}
                  ></input>
                  {showPassword ? (
                    <span
                      className="fa fa-eye show-password-icon"
                      onClick={togglePasswordVisibility}
                    ></span>
                  ) : (
                    <span
                      className="fa fa-eye-slash show-password-icon"
                      onClick={togglePasswordVisibility}
                    ></span>
                  )}
                </div>
              </div>
              <div className="mb-1">
                <label className="form-label">Confirm Password</label>
                <div className="form-group has-search adult-confirm-password-wrapper">
                  <span className="fa fa-lock form-control-feedback"></span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control adult-signup-inputs"
                    placeholder="Confirm Password"
                    onChange={(e) => {
                      setAdultConfirmPassword(e.target.value);
                    }}
                  ></input>
                  {showConfirmPassword ? (
                    <span
                      className="fa fa-eye show-confirm-password-icon"
                      onClick={toggleConfirmPasswordVisibility}
                    ></span>
                  ) : (
                    <span
                      className="fa fa-eye-slash show-confirm-password-icon"
                      onClick={toggleConfirmPasswordVisibility}
                    ></span>
                  )}
                </div>
              </div>

              <div className="stroke-wrapper">
                <div className="stroke-div"></div>
                <div className="or-signup">Or Signup with</div>
                <div className="stroke-div"></div>
              </div>
              <div className="signup-options">
                <div className="google-media">
                  <img src={googleLogo} alt="" />
                  <div className="media-text">Google</div>
                </div>
              </div>
              <div className="signup-terms">
                By registering you confirm that you accept the 
                <span>Terms & Conditions</span> and 
                <span>Privacy Policy</span>
              </div>
              <div className="signup-btn-section">
                <div
                  className="signup-btn"
                  onClick={(e) => {
                    adultSignUp();
                  }}
                >
                  {isLoading ? "Loading..." : "SignUp"}
                </div>
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
              className={
                !adultSignupDisabled
                  ? "step-continue disabled-continue"
                  : "step-continue"
              }
              onClick={() => {
                setAdultsStep(2);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {adults_step === 2 && (
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
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                navigate("/");
              }}
            ></button>
          </div>
          <div className="dialog-body">
            {/* <AdultsOTP
              adultParentData={adultParentData}
              sendDataToParent={handleAdultOtp}
            /> */}
          </div>
        </div>
      )}
      {adults_step === 3 && (
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
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                navigate("/");
              }}
            ></button>
          </div>
          <div className="dialog-body gmail-page-body successWrap">
            <div className="container">
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
        </div>
      )}

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Register;
