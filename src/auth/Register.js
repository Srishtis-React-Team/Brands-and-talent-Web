import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/dashboard.css";
import "../assets/css/register.css";
import { useNavigate } from "react-router";
import PopUp from "../components/PopUp";
import Header from "../layout/header";
import { useLocation } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import Select from "react-select";

const Register = () => {
  const navigate = useNavigate();
  const btLogo = require("../assets/icons/Group 56.png");
  const userIcon = require("../assets/icons/user.png");
  const cameraIcon = require("../assets/icons/cameraIcon.png");
  const fbLogo = require("../assets/icons/fbLogo.png");
  const googleLogo = require("../assets/icons/googleLogo.png");
  const uploadIcon = require("../assets/icons/upload.png");
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
  const model = require("../assets/images/model-profile.png");

  const [registerModal, setRegisterModal] = useState(true);
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
  const [brandGmail, showBrandGmail] = useState(false);
  const [header, showHeader] = useState(true);
  const [dob, setDOB] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGenders] = useState("");
  const [genderList, setGenderList] = useState([]);
  const [talent, setTalent] = useState(true);
  const [brand, setBrand] = useState(false);
  const [above_18, setAbove_18] = useState(false);
  const [below_18, setBelow_18] = useState(false);
  const [profession, setProfession] = useState("");

  const handleClick = () => {
    window.scrollTo(0, 0); // Scroll to top on link click
  };

  useEffect(() => {
    setGenderList(["Male", "Female"]);
  }, []);

  const handleSelectChange = (event) => {
    setGenders(event.target.value);
    const selectedName = event.target.options[event.target.selectedIndex].text;
    // setRoomType(selectedName);
  };

  const professionList = [
    {
      value: "photographer",
      label: "Photographer",
      color: "#00B8D9",
      isFixed: true,
    },
    { value: "beauticians", label: "Beauticians", color: "#5243AA" },
    { value: "artists", label: "Artists", color: "#FF5630", isFixed: true },
    { value: "video Grapher", label: "Video Grapher", color: "#FF8B00" },
  ];

  useEffect(() => {
    setGenderList(["Male", "Female"]);
  }, []);

  function ageCategory(e) {
    if (e == "above_18") {
      setAbove_18(true);
    } else {
      setAbove_18(false);
    }
    if (e == "below_18") {
      setBelow_18(true);
    } else {
      setBelow_18(false);
    }
  }

  function userType(e) {
    if (e == "talent") {
      setTalent(true);
    } else {
      setTalent(false);
    }
    if (e == "brand") {
      setBrand(true);
    } else {
      setBrand(false);
    }
  }

  function brandClick(e) {
    if (brand === true && talent === false) {
      if (e == "register-model") {
        setRegisterModal(true);
        setBrands_form1(false);
      }
      if (e == "brand-form1") {
        setBrands_form1(true);
      }
      if (e == "brand-form2") {
        setBrands_form1(false);
        setBrands_form2(true);
      } else {
        setBrands_form2(false);
      }
      if (e == "brand-form3") {
        setBrands_form3(true);
      } else {
        setBrands_form3(false);
      }
      if (e == "brand-form4") {
        console.log("setBrands_form4");
        setBrands_form4(true);
      } else {
        setBrands_form4(false);
      }
      if (e == "brand-form5") {
        setBrands_form5(true);
      } else {
        setBrands_form5(false);
      }
      if (e == "brand-form6") {
        setBrands_form6(true);
      } else {
        setBrands_form6(false);
      }
      if (e == "brand-gmail") {
        showBrandGmail(true);
      } else {
        showBrandGmail(false);
      }
    }
  }

  function handleForms(e) {
    if (talent === true && brand === false) {
      if (e === "register-model") {
        setRegisterModal(true);
        showTalentSignup(false);
        showUnder18_formOne(false);
      }
      if (e == "age-form") {
        setRegisterModal(false);
        showHeader(true);
        showAgeForm(true);
      }
      if (e == "talent-signup") {
        showAgeForm(false);
        showTalentSignup(true);
      }
      if (e == "talent-gmail") {
        showTalentSignup(false);
        showTalentGmail(true);
      }
      if (e == "under_18-formOne") {
        showAgeForm(false);
        showUnder18_formOne(true);
        showUnder18_formTwo(false);
      }
      if (e == "under_18-formTwo") {
        showUnder18_formOne(false);
        showUnder18_formTwo(true);
      }
    }
    if (brand === true && talent === false) {
      if (e == "age-form") {
        setRegisterModal(false);
        setBrands_form1(true);
        showHeader(true);
      }
    }
  }

  return (
    <>
      {registerModal && (
        <div className="register-modal">
          <div className="modal-header header-wrapper">
            <img className="modal-logo" src={btLogo}></img>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                navigate("/");
              }}
            ></button>
          </div>
          <div className="modal-title">Welcome</div>
          <div className="modal-description">
            Welcome to our vibrant community! To tailor your experience, we'd
            love to know more about you.
          </div>
          <div className="modal-buttons">
            <div
              onClick={(e) => {
                userType("talent");
              }}
              className={talent ? "selected-register" : "choose-register"}
            >
              I'm a Talent
            </div>
            <div
              onClick={(e) => {
                userType("brand");
              }}
              className={brand ? "selected-register" : "choose-register"}
            >
              I'm a Brand
            </div>
          </div>
          <div className="question-model">
            Are you the star of the show or the one seeking brilliance?
          </div>
          <div className="register-modal">
            <div
              className="register-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={(e) => {
                handleForms("age-form");
              }}
            >
              Register Now
            </div>
          </div>
        </div>
      )}

      {ageForm_visiblity && (
        <div className="register-modal">
          <div className="modal-header header-wrapper">
            <img className="modal-logo" src={btLogo}></img>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                navigate("/");
              }}
            ></button>
          </div>
          <div className="modal-title">Age Verification</div>
          <div className="modal-description">
            We need to check how old you are,specify your age range.
          </div>
          <div className="modal-buttons ">
            <div
              onClick={(e) => {
                ageCategory("below_18");
              }}
              className={
                below_18
                  ? "selected-register age-button"
                  : "choose-register age-button"
              }
            >
              I'm not yet 18
            </div>
            <div
              onClick={(e) => {
                ageCategory("above_18");
              }}
              className={
                above_18
                  ? "selected-register age-button"
                  : "choose-register age-button"
              }
            >
              I'm 18 years older
            </div>
          </div>
          <div className="register-modal mt-5">
            <div
              className="register-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={(e) => {
                if (above_18 === true) {
                  handleForms("talent-signup");
                } else if (below_18 === true) {
                  handleForms("under_18-formOne");
                }
              }}
            >
              Submit
            </div>
          </div>
        </div>
      )}

      {talentSignup && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img className="modal-logo" src={btLogo}></img>
              {/* <div className="step-text">Step 1 of 4</div> */}
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  navigate("/");
                }}
              ></button>
            </div>
            <div className="modal-body modal-content ">
              <div className="step-title">Sign up</div>
              <div className="step-selection">
                <div className="select-wrapper email-input">
                  <img src={mailIcon}></img>
                  <input
                    type="password"
                    className="select-text absolute-input"
                    placeholder="Email"
                  />
                </div>
                <div className="select-wrapper password-wrapper">
                  <div>
                    <img src={lockiIcon}></img>
                    <input
                      type="password"
                      className="select-text absolute-input"
                      placeholder="Password"
                    />
                  </div>
                  <img src={eyeOff}></img>
                </div>
                <div className="select-wrapper password-wrapper">
                  <div>
                    <img src={lockiIcon}></img>
                    <input
                      type="password"
                      className="select-text absolute-input"
                      placeholder="Confirm-Password"
                    />
                  </div>
                  <img src={eyeOff}></img>
                </div>
                <div className="stroke-wrapper">
                  <div className="stroke-div"></div>
                  <div className="or-signup">Or Signup with</div>
                  <div className="stroke-div"></div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="step-back"
                onClick={(e) => {
                  handleForms("register-model");
                  setTalent(true);
                }}
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={(e) => {
                  handleForms("talent-gmail");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {talentGmail && (
        <>
          <div>Gmail popup</div>
          <button
            type="button"
            className="step-back"
            onClick={(e) => {
              handleForms("register-model");
              setTalent(true);
            }}
          >
            Back
          </button>
        </>
      )}

      {under18_formOne && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img className="modal-logo" src={btLogo}></img>
              <div className="step-text">Step 1 of 2</div>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  navigate("/");
                }}
              ></button>
            </div>
            <div className="modal-body modal-content ">
              <div className="step-title">Under 18 Model Registration</div>
              <div className="step-selection">
                <div className="select-wrapper email-input">
                  <img src={mailIcon}></img>
                  <input
                    type="password"
                    className="select-text absolute-input"
                    placeholder="Email"
                  />
                </div>
                <div className="select-wrapper password-wrapper">
                  <div>
                    <img src={lockiIcon}></img>
                    <input
                      type="password"
                      className="select-text absolute-input"
                      placeholder="Password"
                    />
                  </div>
                  <img src={eyeOff}></img>
                </div>
                <div className="select-wrapper password-wrapper">
                  <div>
                    <img src={lockiIcon}></img>
                    <input
                      type="password"
                      className="select-text absolute-input"
                      placeholder="Confirm-Password"
                    />
                  </div>
                  <img src={eyeOff}></img>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="step-back"
                onClick={(e) => {
                  handleForms("register-model");
                  setTalent(true);
                }}
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={(e) => {
                  handleForms("under_18-formTwo");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {under18_formTwo && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img className="modal-logo" src={btLogo}></img>
              <div className="step-text">Step 2 of 2</div>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  navigate("/");
                }}
              ></button>
            </div>
            <div className="modal-body modal-content ">
              <div className="step-title">Basic Plan</div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="step-back"
                onClick={(e) => {
                  handleForms("under_18-formOne");
                  setTalent(true);
                }}
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={(e) => {
                  handleForms("under_18-formTwo");
                }}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      {brands_form1 && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img className="modal-logo" src={btLogo}></img>
              <div className="step-text">Step 1 of 5</div>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  navigate("/");
                }}
              ></button>
            </div>
            <div className="modal-body modal-content ">
              <div className="step-title">Sign up</div>
              <div className="step-selection">
                <div className="select-wrapper email-input">
                  <img className="user-icon" src={userIcon}></img>
                  <input
                    type="text"
                    className="select-text absolute-input"
                    placeholder="Your Name"
                  />
                </div>
                <div className="select-wrapper email-input">
                  <img src={mailIcon}></img>
                  <input
                    type="password"
                    className="select-text absolute-input"
                    placeholder="Gmail"
                  />
                </div>
                <div className="gmail-info">
                  Talents that apply to your job will be send to this email
                </div>
                <div className="select-wrapper password-wrapper">
                  <div>
                    <img src={lockiIcon}></img>
                    <input
                      type="password"
                      className="select-text absolute-input"
                      placeholder="Password"
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
            <div className="modal-footer">
              <button
                type="button"
                className="step-back"
                onClick={(e) => {
                  brandClick("register-model");
                  setBrand(true);
                }}
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={(e) => {
                  brandClick("brand-form2");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {brands_form2 && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img className="modal-logo" src={btLogo}></img>
              <div className="step-text">Step 2 of 5</div>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  navigate("/");
                }}
              ></button>
            </div>
            <div className="modal-body modal-content ">
              <div className="step-title">Brand Details</div>
              <div className="step-selection">
                <div className="select-wrapper email-input">
                  <input
                    type="text"
                    className="select-text absolute-input"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="select-wrapper email-input">
                  <input
                    type="text"
                    className="select-text absolute-input"
                    placeholder="Zip Code"
                  />
                </div>
                <div className="select-wrapper email-input">
                  <select
                    className="form-select step-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue>
                      Do you use an applicant Tracking System?
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="select-wrapper email-input">
                  <select
                    className="form-select step-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue>How did you hear about us?</option>
                    <option value="true">Social Platforms</option>
                    <option value="false">MySelf</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={(e) => {
                  brandClick("brand-form1");
                }}
                className="step-back"
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={(e) => {
                  brandClick("brand-form3");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {brands_form3 && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img className="modal-logo" src={btLogo}></img>
              <div className="step-text">Step 3 of 5</div>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  navigate("/");
                }}
              ></button>
            </div>
            <div className="modal-body modal-content ">
              <div className="step-title">Post Your Gig/Job</div>
              <div className="step-selection">
                <div className="form-group">
                  <label className="form-label">Gig/Job Tittle</label>
                  <div className="select-wrapper email-input">
                    <input
                      type="text"
                      className="select-text-only absolute-input"
                      placeholder="Enter tittle"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Location (Zip Code)</label>
                  <div className="select-wrapper email-input">
                    <input
                      type="text"
                      className="select-text-only absolute-input"
                      placeholder="Enter Location"
                    />
                  </div>
                </div>
                <div className="splitter">
                  <div className="splitter-one">
                    <label className="form-label">Age</label>
                    <div className="select-wrapper email-input splited-input">
                      <input
                        type="text"
                        className="select-text-only absolute-input"
                        placeholder="Age"
                      />
                    </div>
                    <label className="form-label">Social Media Followers</label>
                    <div className="select-wrapper email-input splited-input">
                      <input
                        type="text"
                        className="select-text-only absolute-input"
                        placeholder="Followers"
                      />
                    </div>
                    <label className="form-label">Employment Type</label>
                    <div className="select-wrapper email-input splited-input">
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option defaultValue>Select Employment Type </option>
                        <option value="true">Social Platforms</option>
                        <option value="false">MySelf</option>
                      </select>
                    </div>
                  </div>
                  <div className="splitter-two">
                    <label className="form-label">Social Media Followers</label>
                    <div className="select-wrapper email-input splited-input">
                      <input
                        type="text"
                        className="select-text-only absolute-input"
                        placeholder="Followers"
                      />
                    </div>
                    <label className="form-label">Social Media Followers</label>
                    <div className="select-wrapper email-input splited-input">
                      <input
                        type="text"
                        className="select-text-only absolute-input"
                        placeholder="Followers"
                      />
                    </div>
                    <label className="form-label">Employment Type</label>
                    <div className="select-wrapper email-input splited-input">
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option defaultValue>Select Employment Type </option>
                        <option value="true">Social Platforms</option>
                        <option value="false">MySelf</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* <Editor
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                /> */}
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
                    onChange={(value) => setProfession(value)}
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
                        value="HTML"
                      ></input>
                      <label className="pay-label" for="html">
                        Paid collaboration
                      </label>
                    </div>
                    <div className="radio-wrapper">
                      <input
                        type="radio"
                        id="css"
                        name="fav_language"
                        value="CSS"
                      ></input>
                      <label className="pay-label" for="css">
                        Product/ gift
                      </label>
                    </div>
                    <div className="radio-wrapper">
                      <input
                        type="radio"
                        id="javascript"
                        name="fav_language"
                        value="JavaScript"
                      ></input>
                      <label className="pay-label" for="javascript">
                        Paid collaboration + Gift
                      </label>
                    </div>
                  </div>
                </div>
                <div className="splitter">
                  <div className="splitter-one">
                    <label className="form-label">Currency</label>
                    <div className="select-wrapper email-input splited-input">
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option defaultValue>Currency</option>
                        <option value="true">USD</option>
                        <option value="false">AUD</option>
                      </select>
                    </div>
                  </div>
                  <div className="splitter-two">
                    <label className="form-label">Frequency</label>
                    <div className="select-wrapper email-input splited-input">
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option defaultValue>Frequency</option>
                        <option value="true">Monthly</option>
                        <option value="false">Annualy</option>
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
                      value="HTML"
                    ></input>
                    <label className="pay-label" for="fixed_amount">
                      Fixed Amount
                    </label>
                  </div>
                  <div className="radio-wrapper">
                    <input
                      type="radio"
                      id="range"
                      name="amounts"
                      value="CSS"
                    ></input>
                    <label className="pay-label" for="range">
                      Range Of Amounts
                    </label>
                  </div>
                </div>
                <div className="splitter">
                  <div className="splitter-one">
                    <label className="form-label">Min Pay</label>
                    <div className="select-wrapper email-input splited-input">
                      <input
                        type="text"
                        className="select-text-only absolute-input"
                        placeholder="Followers"
                      />
                    </div>
                  </div>
                  <div className="splitter-two">
                    <label className="form-label">Max Pay</label>
                    <div className="select-wrapper email-input splited-input">
                      <input
                        type="text"
                        className="select-text-only absolute-input"
                        placeholder="Followers"
                      />
                    </div>
                  </div>
                </div>
                <div className="gig-upload">
                  <div className="gig-img-wrapper">
                    <img src={cameraIcon} alt="" />
                    <div className="add-text">Add Image</div>
                  </div>
                  <div className="upload-text">
                    Upload a Image For your Gig/Job
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={(e) => {
                  brandClick("brand-form2");
                }}
                className="step-back"
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={(e) => {
                  brandClick("brand-form4");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {brands_form4 && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img className="modal-logo" src={btLogo}></img>
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
                  <img className="gig-image" src={model} alt="" />
                </div>
                <div className="gig-content">
                  <div className="gig-name">Gig Name</div>
                  <div className="gig-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras blandit volutpat ipsum non.
                  </div>
                  <div className="gig-infos">
                    <div className="gig-followers">
                      <div className="gig-logo">
                        <img src={userLogo} alt="" />
                      </div>
                      <div className="gig-counts">
                        <div className="followers-text">Followers</div>
                        <div className="followers-count">2000</div>
                      </div>
                    </div>
                    <div className="gig-followers">
                      <div className="gig-logo">
                        <img src={userLogo} alt="" />
                      </div>
                      <div className="gig-counts">
                        <div className="followers-text">Age</div>
                        <div className="followers-count">18-65</div>
                      </div>
                    </div>
                    <div className="gig-followers">
                      <div className="gig-logo">
                        <img src={genderIcon} alt="" />
                      </div>
                      <div className="gig-counts">
                        <div className="followers-text">Gender</div>
                        <div className="followers-count">Male</div>
                      </div>
                    </div>
                    <div className="gig-followers">
                      <div className="gig-logo">
                        <img src={mapIcon} alt="" />
                      </div>
                      <div className="gig-counts">
                        <div className="followers-text">Location</div>
                        <div className="followers-count">Australia</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="company">
                <div className="company-name">
                  <div className="name-wrapper">S</div>
                  <div className="company-text">SBM Communications</div>
                </div>
                <div className="company-plan">100$</div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={(e) => {
                  brandClick("brand-form3");
                }}
                className="step-back"
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={(e) => {
                  brandClick("brand-form5");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {brands_form5 && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img className="modal-logo" src={btLogo}></img>
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
                onClick={(e) => {
                  brandClick("brand-form4");
                }}
                className="step-back"
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={(e) => {
                  brandClick("brand-form6");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {brands_form6 && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img className="modal-logo" src={btLogo}></img>
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
                onClick={(e) => {
                  brandClick("brand-form5");
                }}
                className="step-back"
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={(e) => {
                  brandClick("brand-gmail");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {brandGmail && (
        <>
          <div className="modal-wrapper">
            <div className="modal-content">
              <div className="modal-header header-wrapper">
                <img className="modal-logo" src={btLogo}></img>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    navigate("/");
                  }}
                ></button>
              </div>
              <div className="modal-body trial-model modal-content ">
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
    </>
  );
};

export default Register;

{
  /* <div className="modal-wrapper">
<div className="modal-content">
  <div className="modal-header header-wrapper">
    <img className="modal-logo" src={btLogo}></img>
    <div className="step-text">Step 1 of 4</div>
    <button
      type="button"
      className="btn-close"
      onClick={() => {
        navigate("/");
      }}
    ></button>
  </div>
  <div className="modal-body modal-content ">
    <div className="step-title">Which one are you?</div>
    <div className="step-description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
    <div className="step-selection">
      <div className="select-wrapper">
        <input type="checkbox" id="aspiring"></input>
        <label htmlFor="aspiring" className="select-text">
          Aspiring Talent
        </label>
      </div>
      <div className="select-wrapper">
        <input type="checkbox" id="professional"></input>
        <label htmlFor="professional" className="select-text">
          Professional Talent
        </label>
      </div>
      <div className="select-wrapper">
        <input type="checkbox" id="other-talent"></input>
        <label htmlFor="other-talent" className="select-text">
          Talent (Actor, dancer, musician, sports person, etc)
        </label>
      </div>
    </div>
  </div>
  <div className="modal-footer">
    <button
      type="button"
      className="step-back"
      
    >
      Back
    </button>
    <button
      type="button"
      className="step-continue"
    
    >
      Continue
    </button>
  </div>
</div>
</div> */
}
