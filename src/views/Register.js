import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/dashboard.css";
import { useNavigate } from "react-router";
import PopUp from "../components/PopUp";
import Header from "./header";

const Register = () => {
  const navigate = useNavigate();
  const btLogo = require("../assets/icons/Group 56.png");
  const uploadIcon = require("../assets/icons/upload.png");
  const importIcon = require("../assets/icons/instagram.png");
  const mailIcon = require("../assets/icons/mail.png");
  const lockiIcon = require("../assets/icons/lock.png");
  const eyeOff = require("../assets/icons/eye-off.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [formOne_visibility, showFormOne] = useState(true);
  const [formTwo_visibility, showFormTwo] = useState(false);
  const [formThree_visibility, showForThree] = useState(false);
  const [formFour_visibility, showFormFour] = useState(false);
  const [formFive_visibility, showFormFive] = useState(false);
  const [brands_form1, setBrands_form1] = useState(false);
  const [brands_form2, setBrands_form2] = useState(false);
  const [brands_form3, setBrands_form3] = useState(false);
  const [brands_form4, setBrands_form4] = useState(false);
  const [header, showHeader] = useState(true);
  const [dob, setDOB] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGenders] = useState("");
  const [genderList, setGenderList] = useState([]);
  const [talent, setTalent] = useState(true);
  const [brand, setBrand] = useState(false);

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

  function talent_submit(e) {
    navigate("/");
    setMessage("Talent Registered Successfully !");
    setOpenPopUp(true);
    setTimeout(function () {
      setOpenPopUp(false);
    }, 1000);
  }

  function brand_submit(e) {
    navigate("/");
  }

  useEffect(() => {
    setGenderList(["Male", "Female"]);
  }, []);

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

  function handleForms(e) {
    console.log(e, "e");
    if (talent === true && brand === false) {
      if (e == "form-one") {
        showFormOne(false);
        showFormTwo(true);
        showHeader(true);
      } else {
        showFormTwo(false);
        showHeader(false);
      }
      if (e == "form-two") {
        showForThree(true);
        showHeader(false);
      } else {
        showForThree(false);
      }
      if (e == "form-three") {
        showFormFour(true);
      } else {
        showFormFour(false);
      }
      if (e == "form-four") {
        showFormFive(true);
      } else {
        showFormFive(false);
      }
    }
    if (brand === true && talent === false) {
      if (e == "form-one") {
        showFormOne(false);
        setBrands_form1(true);
        showHeader(true);
      } else {
        setBrands_form1(false);
        showHeader(false);
      }
    }
  }

  function brandClick(e) {
    console.log(e, "e");
    console.log(talent, "talent in brand");
    if (brand === true && talent === false) {
      console.log("brands block called");
      if (e == "register-model") {
        showFormOne(true);
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
        console.log(brands_form3, "brands_form3 true");
      } else {
        setBrands_form3(false);
      }
      if (e == "brand-form4") {
        setBrands_form4(true);
        console.log(brands_form3, "brands_form3 true");
      } else {
        setBrands_form4(false);
      }
    }
    console.log(brands_form1, "brands_form1");
    console.log(brands_form2, "brands_form2");

    console.log(brands_form4, "brands_form4");
  }

  return (
    <>
      {formOne_visibility && (
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
                handleForms("form-one");
              }}
            >
              Register Now
            </div>
          </div>
        </div>
      )}

      {formTwo_visibility && (
        <div className="modal-wrapper">
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
                onClick={(e) => {
                  showFormOne(true);
                  showFormTwo(false);
                  setTalent(true);
                }}
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={(e) => {
                  handleForms("form-two");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {formThree_visibility && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img className="modal-logo" src={btLogo}></img>
              <div className="step-text">Step 2 of 4</div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body modal-content ">
              <div className="step-title">Personal Details</div>
              <div className="step-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div className="step2-selection">
                <div className="step-section-1">
                  <input
                    type="text"
                    placeholdertextcolor="#202020"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    className=" form-control step-input"
                  />
                  <select
                    onChange={handleSelectChange}
                    value={gender}
                    id="disabledSelect"
                    className="form-select step-select"
                    placeholder="Gender"
                  >
                    {genderList.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    onChange={handleSelectChange}
                    value={gender}
                    id="disabledSelect"
                    className="form-select step-select"
                    placeholder="Nationality"
                  >
                    {genderList.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="step-section-2">
                  <input
                    className="form-control"
                    placeholder="Date of birth"
                    value={dob}
                    onChange={(e) => {
                      setDOB(e.target.value);
                    }}
                  ></input>
                  <select
                    className="form-select step-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue>Height</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <select
                    className="form-select step-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue>Ethnicity</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={(e) => {
                  handleForms("form-one");
                }}
                className="step-back"
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={(e) => {
                  handleForms("form-three");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {formFour_visibility && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img className="modal-logo" src={btLogo}></img>
              <div className="step-text">Step 3 of 4</div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body modal-content ">
              <div className="step-title">Contact Details</div>
              <div className="step-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div className="step2-selection">
                <div className="step-section-1">
                  <input
                    className="form-control step-input"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  ></input>
                  <select
                    className="form-select step-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue>Country</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="step-section-2">
                  <input className="form-control" placeholder="Email"></input>
                  <select
                    className="form-select step-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue>City</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={(e) => {
                  handleForms("form-two");
                }}
                className="step-back"
              >
                Back
              </button>
              <button
                type="button"
                className="step-continue"
                onClick={(e) => {
                  handleForms("form-four");
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {formFive_visibility && (
        <div className="modal-wrapper">
          <div className="modal-content">
            <div className="modal-header header-wrapper">
              <img className="modal-logo" src={btLogo}></img>
              <div className="step-text">Step 4 of 4</div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body modal-content ">
              <div className="step-title">Only one more thing to do</div>
              <div className="step-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div className="step-selection upload-step">
                <div className="upload-wrapper">
                  <img src={uploadIcon}></img>
                  <div className="upload-text"> Professional Talent</div>
                </div>
                <div className="import-wrapper">
                  <img src={importIcon}></img>
                  <div className="import-text"> Professional Talent</div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={(e) => {
                  handleForms("form-three");
                }}
                className="step-back"
              >
                Back
              </button>
              <button
                type="button"
                data-bs-dismiss="modal"
                className="step-continue"
                onClick={(e) => {
                  talent_submit();
                }}
              >
                Submit
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
                <div className="select-wrapper">
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
                <div className="select-wrapper">
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
              <div className="step-text">Step 2 of 4</div>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  navigate("/");
                }}
              ></button>
            </div>
            <div className="modal-body modal-content ">
              <div className="step-title">Introduce Yourself</div>
              <div className="step-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div className="step2-selection">
                <div className="step-section-1">
                  <input
                    type="text"
                    placeholdertextcolor="#202020"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    className="form-control step-input"
                  />
                  <select
                    onChange={handleSelectChange}
                    value={gender}
                    id="disabledSelect"
                    className="form-select step-select"
                    placeholder="Gender"
                  >
                    {genderList.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    onChange={handleSelectChange}
                    value={gender}
                    id="disabledSelect"
                    className="form-select step-select"
                    placeholder="Nationality"
                  >
                    {genderList.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="step-section-2">
                  <input
                    className="form-control"
                    placeholder="Date of birth"
                    value={dob}
                    onChange={(e) => {
                      setDOB(e.target.value);
                    }}
                  ></input>
                  <select
                    className="form-select step-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue>Height</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <select
                    className="form-select step-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue>Ethnicity</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
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
              <div className="step-text">Step 3 of 4</div>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  navigate("/");
                }}
              ></button>
            </div>
            <div className="modal-body modal-content ">
              <div className="step-title">Upload Your Brand Logo</div>
              <div className="step-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div className="step2-selection">
                <div className="step-section-1">
                  <input
                    type="text"
                    placeholdertextcolor="#202020"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    className="form-control step-input"
                  />
                </div>
                <div className="step-section-2">
                  <input
                    className="form-control"
                    placeholder="Date of birth"
                    value={dob}
                    onChange={(e) => {
                      setDOB(e.target.value);
                    }}
                  ></input>
                  <select
                    className="form-select step-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue>Height</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <select
                    className="form-select step-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue>Ethnicity</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
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
              <div className="step-text">Step 4 of 4</div>
              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  navigate("/");
                }}
              ></button>
            </div>
            <div className="modal-body modal-content ">
              <div className="step-title">Choose a Plan</div>
              <div className="step-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div className="step2-selection">
                <div className="step-section-1">
                  <input
                    type="text"
                    placeholdertextcolor="#202020"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                    className="form-control step-input"
                  />
                </div>
                <div className="step-section-2">
                  <input
                    className="form-control"
                    placeholder="Date of birth"
                    value={dob}
                    onChange={(e) => {
                      setDOB(e.target.value);
                    }}
                  ></input>
                  <select
                    className="form-select step-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue>Height</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <select
                    className="form-select step-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue>Ethnicity</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
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
                  brand_submit();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
