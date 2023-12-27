import React, { useEffect, useState } from "react";
import "../assets/css/pricing.css";
import Header from "./header.js";
import Footer from "./Footer.js";
const Pricing = () => {
  const [data, setDate] = useState([]);
  useEffect(() => {}, []);
  const [plan1_Selected, selectPlan1] = useState(false);
  const [plan2_Selected, selectPlan2] = useState(true);
  const [plan3_Selected, selectPlan3] = useState(false);
  const checkIcon = require("../assets/icons/check-square.png");
  const checkShield = require("../assets/icons/check-shield.png");
  const greyCircle = require("../assets/icons/grey-filled-circle.png");
  const filledCircle = require("../assets/icons/pink-filled-circle.png");
  function handleForms(e) {
    console.log(e, "e");
    if (e == "plan-1") {
      selectPlan1(true);
    } else {
      selectPlan1(false);
    }
    if (e == "plan-2") {
      selectPlan2(true);
    } else {
      selectPlan2(false);
    }
    if (e == "plan-3") {
      selectPlan3(true);
    } else {
      selectPlan3(false);
    }
  }
  return (
    <>
      <Header />
      <section>
        <div className="popular-header">
          <div className="header-title">Popular Models</div>
          <div className="header-menu">
            <div>Home</div>
            <div>Models</div>
          </div>
        </div>
      </section>
      <div className="pricing-section">
        <div className="guarantee-wrapper">
          <div>
            <img src={checkShield}></img>
          </div>
          <div className="plan-name">Our Top</div>
          <div className="plan-name-bold">Plans</div>
        </div>
        <div
          className={plan1_Selected ? "pricing-fill" : "pricing-wrapper"}
          onClick={(e) => {
            handleForms("plan-1");
          }}
        >
          <div className="plan-name">Starter</div>
          <div className="plan-value">$0</div>
          <div className="plan-duration">per month</div>
          <div className="plan-action center">Choose plan</div>
        </div>
        <div
          className={plan2_Selected ? "pricing-fill" : "pricing-wrapper"}
          onClick={(e) => {
            handleForms("plan-2");
          }}
        >
          <div className="plan-name">Enterprise</div>
          <div className="plan-value">$19</div>
          <div className="plan-duration">per month</div>

          <div className="plan-action center">Choose plan</div>
        </div>
        <div
          className={plan3_Selected ? "pricing-fill" : "pricing-wrapper"}
          onClick={(e) => {
            handleForms("plan-3");
          }}
        >
          <div className="plan-name">Premium</div>
          <div className="plan-value">$99</div>
          <div className="plan-duration">per month</div>
          <div className="plan-action center">Choose plan</div>
        </div>
      </div>
      <div className="pricing-table">
        <div className="pricing-row">
          <div className="pricing-name">create profile upload for free</div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
        </div>
        <div className="pricing-row">
          <div className="pricing-name">Verification</div>
          <div className="pricing-img-wrapper">
            <img src={greyCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
        </div>
        <div className="pricing-row">
          <div className="pricing-name">Verification</div>
          <div className="pricing-img-wrapper">
            <img src={greyCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
        </div>
        <div className="pricing-row">
          <div className="pricing-name">Photos</div>
          <div className="pricing-img-wrapper">3 Photos</div>
          <div className="pricing-img-wrapper">6 Photos</div>
          <div className="pricing-img-wrapper">Unlimited</div>
        </div>
        <div className="pricing-row">
          <div className="pricing-name">Cv(copy paste box)</div>
          <div className="pricing-img-wrapper">
            <img src={greyCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
        </div>
        <div className="pricing-row">
          <div className="pricing-name">ReviewsGet invited to job button</div>
          <div className="pricing-img-wrapper">
            <img src={greyCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
        </div>
        <div className="pricing-row">
          <div className="pricing-name">
            Showcase thier social media profile
          </div>
          <div className="pricing-img-wrapper">
            <img src={greyCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
        </div>
        <div className="pricing-row">
          <div className="pricing-name">Notification</div>
          <div className="pricing-img-wrapper">
            <img src={greyCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
        </div>
        <div className="pricing-row">
          <div className="pricing-name">Rates ( Fixed/Negotiable)</div>
          <div className="pricing-img-wrapper">
            <img src={greyCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
          <div className="pricing-img-wrapper">
            <img src={filledCircle}></img>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Pricing;
