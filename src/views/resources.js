import React, { useEffect, useState } from "react";
import "../assets/css/resources.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
const Resources = () => {
  const [data, setDate] = useState([]);
  useEffect(() => {}, []);
  let condition;
  const [question_1, selectQuestion1] = useState(true);
  const [question_2, selectQuestion2] = useState(false);
  const [question_3, selectQuestion3] = useState(false);
  const talentGroup_1 = require("../assets/images/talents-group1.png");
  const talentGroup_2 = require("../assets/images/talents-group2.png");
  const checkIcon = require("../assets/icons/check-square.png");
  const plus = require("../assets/icons/plus-square.png");
  function handleForms(e) {
    console.log(e, "e");
    if (e == "question_1") {
      selectQuestion1(!question_1);
    }
    if (e == "question_2") {
      selectQuestion2(!question_2);
    }
  }
  return (
    <>
      <Header />
      <section>
        <div className="popular-header">
          <div className="header-title">Resources</div>
          <div className="header-menu">
            <div>Home</div>
            <div>Resources</div>
          </div>
        </div>
      </section>
      <div className="resources">
        <div className="resource-wrapper">
          <div className="resource-content-wrapper">
            <div className="resource-name">
              Pellentesque ac eleifend diam, a finibus dolor
            </div>
            <div className="resource-description space">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              varius nisl et pretium mattis. Vivamus ullamcorper justo sed
              dignissim placerat. Duis viverra ligula quis magna vestibulum
              ultricies. Fusce feugiat ultricies pulvinar.
            </div>
            <div className="resource-description space">
              Phasellus vestibulum leo sed tincidunt pretium. In eget tortor
              orci. Integer non nibh a libero interdum feugiat quis sed elit.
              Curabitur imperdiet lacinia justo at cursus. Nam mauris lectus,
              varius id orci et, condimentum ultricies felis. Pellentesque
              commodo a massa et tempor. Interdum et malesuada fames ac ante
              ipsum primis in faucibus.
            </div>
          </div>
          <div className="resource-image-wrapper">
            <img className="resource-image" src={talentGroup_1}></img>
          </div>
        </div>
        <div className="resource-wrapper top-space">
          <div className="resource-image-wrapper">
            <img className="resource-image" src={talentGroup_2}></img>
          </div>
          <div className="resource-content-wrapper">
            <div className="resource-name">
              Pellentesque ac eleifend diam, a finibus dolor
            </div>
            <div className="resource-description space">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              varius nisl et pretium mattis. Vivamus ullamcorper justo sed
              dignissim placerat. Duis viverra ligula quis magna vestibulum
              ultricies. Fusce feugiat ultricies pulvinar.
            </div>
            <div className="resource-description space">
              Phasellus vestibulum leo sed tincidunt pretium. In eget tortor
              orci. Integer non nibh a libero interdum feugiat quis sed elit.
              Curabitur imperdiet lacinia justo at cursus. Nam mauris lectus,
              varius id orci et, condimentum ultricies felis. Pellentesque
              commodo a massa et tempor. Interdum et malesuada fames ac ante
              ipsum primis in faucibus.
            </div>
            <div className="resource-details">
              <div className="">
                <div className="plan-details-wrapper">
                  <img src={checkIcon}></img>
                  <span className="plan-details-content">Lorem ipsum</span>
                </div>
                <div className="plan-details-wrapper">
                  <img src={checkIcon}></img>
                  <span className="plan-details-content">consectetur adi</span>
                </div>
                <div className="plan-details-wrapper">
                  <img src={checkIcon}></img>
                  <span className="plan-details-content">varius nisl et </span>
                </div>
              </div>
              <div className="details-flex ">
                <div className="plan-details-wrapper">
                  <img src={checkIcon}></img>
                  <span className="plan-details-content">Vivamus ullam</span>
                </div>
                <div className="plan-details-wrapper">
                  <img src={checkIcon}></img>
                  <span className="plan-details-content">placerat. Duis </span>
                </div>
                <div className="plan-details-wrapper">
                  <img src={checkIcon}></img>
                  <span className="plan-details-content">magna vestibulum</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tabs-section">
          <div className="title">Frequently Asked Questions</div>
          <div className="tabs">
            <div className="active-tab">Fashion</div>
            <div>Clients</div>
            <div>Talent</div>
            <div>Best Practice</div>
          </div>
        </div>
        <div className="faq-section">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Question 1
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the first item's accordion body.</strong> It
                  is shown by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Question 2
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Question 3
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Resources;
