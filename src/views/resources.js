import React, { useEffect, useState } from "react";
import "../assets/css/resources.css";
import Header from "./header.js";
import Footer from "./Footer.js";
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
                  <span className="plan-details-content">
                    {" "}
                    magna vestibulum{" "}
                  </span>
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
          <div className="faq-question-wrapper">
            <div className="faq-question">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit?
            </div>
            <div
              className="plus-icon"
              onClick={(e) => {
                handleForms("question_1");
              }}
            >
              <img src={plus}></img>
            </div>
          </div>
          {question_1 && (
            <div className="faq-answer space">
              Phasellus vestibulum leo sed tincidunt pretium. In eget tortor
              orci. Integer non nibh a libero interdum feugiat quis sed elit.
              Curabitur imperdiet lacinia justo at cursus. Nam mauris lectus,
              varius id orci et, condimentum ultricies felis. Pellentesque
              commodo a massa et tempor. Interdum et malesuada fames ac ante
              ipsum primis in faucibus.
            </div>
          )}
          <div className="faq-question-wrapper">
            <div className="faq-question">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit?
            </div>
            <div
              className="plus-icon"
              onClick={(e) => {
                handleForms("question_2");
              }}
            >
              <img src={plus}></img>
            </div>
          </div>
          {question_2 && (
            <div className="faq-answer space">
              Phasellus vestibulum leo sed tincidunt pretium. In eget tortor
              orci. Integer non nibh a libero interdum feugiat quis sed elit.
              Curabitur imperdiet lacinia justo at cursus. Nam mauris lectus,
              varius id orci et, condimentum ultricies felis. Pellentesque
              commodo a massa et tempor. Interdum et malesuada fames ac ante
              ipsum primis in faucibus.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Resources;
