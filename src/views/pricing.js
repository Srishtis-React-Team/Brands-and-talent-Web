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
      <div className="pricing-title">Choose your plan</div>
      <div className="pricing-section">
        <div
          className={plan1_Selected ? "pricing-fill" : "pricing-wrapper"}
          onClick={(e) => {
            handleForms("plan-1");
          }}
        >
          <div className="plan-name">Phasellus faucibus sem ac efficitur</div>
          <div className="plan-status">Paid</div>
          <div className="plan-action center">Start for Free</div>
          <div className="plan-info">Core plan includes</div>
          <div className="plan-details">
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
              <span className="plan-details-content"> magna vestibulum </span>
            </div>
          </div>
        </div>
        <div
          className={plan2_Selected ? "pricing-fill" : "pricing-wrapper"}
          onClick={(e) => {
            handleForms("plan-2");
          }}
        >
          <div className="plan-name">Phasellus faucibus sem ac efficitur</div>
          <div className="plan-status">Paid</div>
          <div className="plan-action center">Start for Free</div>
          <div className="plan-info">Core plan includes</div>
          <div className="plan-details">
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
              <span className="plan-details-content"> magna vestibulum </span>
            </div>
          </div>
        </div>
        <div
          className={plan3_Selected ? "pricing-fill" : "pricing-wrapper"}
          onClick={(e) => {
            handleForms("plan-3");
          }}
        >
          <div className="plan-name">Phasellus faucibus sem ac efficitur</div>
          <div className="plan-status">Paid</div>
          <div className="plan-action center">Start for Free</div>
          <div className="plan-info">Core plan includes</div>
          <div className="plan-details">
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
              <span className="plan-details-content"> magna vestibulum </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Pricing;
