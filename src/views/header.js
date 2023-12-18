import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/dashboard.css";

const Header = () => {
  const btLogo = require("../assets/icons/Group 56.png");
  const searchLogo = require("../assets/icons/search (1).png");
  const gridLogo = require("../assets/icons/4243313_ux_basic_app_menu_icon 1.png");
  const uploadIcon = require("../assets/icons/upload.png");
  const importIcon = require("../assets/icons/instagram.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOne_visibility, showFormOne] = useState(true);
  const [formTwo_visibility, showFormTwo] = useState(false);
  const [formThree_visibility, showForThree] = useState(false);
  const [formFour_visibility, showFormFour] = useState(false);
  const [formFive_visibility, showFormFive] = useState(false);
  function handleForms(e) {
    console.log(e, "e");
    if (e == "form-one") {
      showFormOne(false);
      showFormTwo(true);
    } else {
      showFormTwo(false);
    }
    if (e == "form-two") {
      showForThree(true);
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

  return (
    <>
      <div className="mobile-navbar">
        <div className="icon">
          <img className="btLogo" src={btLogo}></img>
        </div>
        <div
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
          className="menu-icon"
        >
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
      <div className={menuOpen ? "mobile-nav-content" : "hide-nav"}>
        <div className="login-text">Login</div>
        <div
          className="signup"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Sign up
        </div>
      </div>

      <div className="header">
        <div className="icon">
          <img src={btLogo}></img>
        </div>
        <div className="menu-items">
          <div>
            <NavLink to="/">Home</NavLink>
          </div>
          <div>
            <NavLink to="/find-creators">Find Creators</NavLink>
          </div>
          <div>
            <NavLink to="/get-booked">Get Booked</NavLink>
          </div>
          <div>Pricing</div>
          <div>Learn</div>
        </div>
        <div className="header-functions">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </div>
          <div className="login-text">Login</div>
          <div
            className="signup"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Sign up
          </div>
          <div className="gridLogo">
            <img src={gridLogo}></img>
          </div>
        </div>
      </div>

      <section>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          {formOne_visibility && (
            <div className="modal-dialog modal-wrapper MODAL ONE">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body modal-content ">
                  <div className="modal-title">Welcome</div>
                  <div className="modal-description">
                    Welcome to our vibrant community! To tailor your experience,
                    we'd love to know more about you.
                  </div>
                  <div className="modal-buttons">
                    <div className="model-btn">I'm a Model</div>
                    <div className="seeker-btn">I'm a Model Seeker</div>
                  </div>
                  <div className="question-model">
                    Are you the star of the show or the one seeking brilliance?
                  </div>
                  <div className="register-modal">
                    <div
                      className="register-btn"
                      onClick={(e) => {
                        handleForms("form-one");
                      }}
                    >
                      Register Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {formTwo_visibility && (
            <div className="modal-dialog modal-wrapper">
              <div className="modal-content">
                <div className="modal-header header-wrapper">
                  <img className="modal-logo" src={btLogo}></img>
                  <div className="step-text">Step 1 of 4</div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body modal-content ">
                  <div className="step-title">Which one are you?</div>
                  <div className="step-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                  <div className="step-selection">
                    <div className="select-wrapper">
                      <input type="checkbox"></input>
                      <div className="select-text"> Aspiring model</div>
                    </div>
                    <div className="select-wrapper">
                      <input type="checkbox"></input>
                      <div className="select-text"> Professional model</div>
                    </div>
                    <div className="select-wrapper">
                      <input type="checkbox"></input>
                      <div className="select-text">
                        {" "}
                        Talent (Actor, dancer, musician, sports person, etc)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="step-back">
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
            <div className="modal-dialog modal-wrapper MODAL THREE">
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
                        placeholderTextColor="#202020"
                        placeholder="Room Name"
                        className=" form-control step-input"
                      />
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option selected>Gender</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option selected>Nationality</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="step-section-2">
                      <input
                        className="form-control"
                        placeholder="Date of birth"
                      ></input>
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option selected>Height</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option selected>Ethnicity</option>
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
            <div className="modal-dialog modal-wrapper MODAL FOUR">
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
                      ></input>
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option selected>Country</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="step-section-2">
                      <input
                        className="form-control"
                        placeholder="Email"
                      ></input>
                      <select
                        className="form-select step-select"
                        aria-label="Default select example"
                      >
                        <option selected>City</option>
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
            <div className="modal-dialog modal-wrapper MODAL FIVE">
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
                      <div className="upload-text"> Professional model</div>
                    </div>
                    <div className="import-wrapper">
                      <img src={importIcon}></img>
                      <div className="import-text"> Professional model</div>
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
                      handleForms("form-five");
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Header;
