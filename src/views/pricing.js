import React, { useEffect, useState } from "react";
import "../assets/css/pricing.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
const Pricing = () => {
  const [pricingList, setPricingList] = useState([]);
  const [plan1_Selected, selectPlan1] = useState(false);
  const [plan2_Selected, selectPlan2] = useState(true);
  const [plan3_Selected, selectPlan3] = useState(false);
  const greenTick = require("../assets/icons/greenTick.png");
  const [pricing, setPricing] = useState("");

  useEffect(() => {
    getBrandsPricingList();
  }, []);
  const getPricingList = async () => {
    await ApiHelper.get(API.getPricingList)
      .then((resData) => {
        if (resData) {
          setPricingList(resData.data.data);
        }
        console.log("getPricingList", resData.data.data);
        console.log("pricingList", pricingList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBrandsPricingList = async () => {
    await ApiHelper.get(API.brandsPricingList)
      .then((resData) => {
        if (resData) {
          setPricingList(resData.data.data);
        }
        console.log("getPricingList", resData.data.data);
        console.log("pricingList", pricingList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const choosePlan = (event) => {
    // setPricing(event.target.value);
    window.location.href =
      "https://buymeacoffee.com/brandsandtalent/membership";
  };

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

  const handleToggle = (event) => {
    const { checked } = event.target;
    console.log(checked, "checked");
    if (checked) {
      getPricingList();
    } else {
      getBrandsPricingList();
    }
  };

  return (
    <>
      <Header />
      <section className="topSpace">
        <div className="popular-header">
          <div className="container">
            <div className="header-title">Popular Talents</div>
            <div className="header-menu">
              <div>Home</div>
              <div>Talent</div>
            </div>
          </div>
        </div>
      </section>
      {/* className={artists ? "active-tab" : null} */}

      <div className="select-plan-main">
        <div className="select-pricing container text-center">
          <label className="toggleSwitch nolabel">
            <input type="checkbox" onChange={handleToggle} />
            <a></a>
            <span>
              <span className="right-span">Brand /Clients</span>
              <span className="left-span">Talent</span>
            </span>
          </label>
        </div>
      </div>

      <div className="plan-main">
        <div className="container">
          {pricingList.length && (
            <div className="plans-section">
              <div className="row">
                {pricingList.map((item, index) => {
                  return (
                    <div className="col-md-4">
                      <div
                        className={
                          index == 0
                            ? "plans-wrapper free-plans"
                            : "" || index == 1
                            ? "plans-wrapper pro-plans"
                            : "" || index == 2
                            ? "plans-wrapper premium-plans"
                            : ""
                        }
                      >
                        <div className="priceHeight">
                          <div className="plan-name">
                            {item.planname}
                            <div
                              className={
                                index == 1
                                  ? "pro-gift giftSize"
                                  : "" || index == 2
                                  ? "premium-gift giftSize"
                                  : ""
                              }
                            >
                              {item.gift}
                            </div>
                          </div>

                          {item.planname == "Basic" && (
                            <>
                              <div className="plan-value">Free</div>
                              <div className="plan-validity">Forever</div>
                            </>
                          )}
                          {item.planname == "Free For ever" && (
                            <>
                              <div className="plan-value">Free</div>
                              <div className="plan-validity">Forever</div>
                            </>
                          )}

                          {item.plan_type_annual.length >= 1 && (
                            <>
                              <div className="annual-main-wrapper">
                                <div className="annual-wrapper">
                                  <input
                                    type="radio"
                                    name="click"
                                    value="save"
                                    CHECKED
                                    id={item.planname}
                                    className={
                                      item.planname == "Pro (Popular)"
                                        ? "pro-checkbox"
                                        : "premium-checkbox"
                                    }
                                  ></input>
                                  <label for={item.planname} className="annual">
                                    {item.period}
                                  </label>
                                </div>
                                <div className="per-value">
                                  {item.annualTotalAmount}
                                </div>
                              </div>

                              {item.plan_type_annual.map((item) => {
                                return (
                                  <>
                                    <div className="plan-amounts">
                                      <div className="value-wrapper">
                                        {/* <div className="previous-value">
                                          {item.beforeValue}
                                        </div> */}
                                        <div className="after-value">
                                          {item.afterDiscount}
                                        </div>
                                      </div>
                                      {/* <div className="per-value">
                                        {item.amount}
                                      </div> */}
                                    </div>
                                    <div className="border-bottom"></div>
                                  </>
                                );
                              })}
                              <div className="monthly-wrapper pt-3">
                                <div>
                                  <input
                                    type="radio"
                                    name="click"
                                    value="save"
                                    CHECKED
                                    id={item._id}
                                    className={
                                      item.planname == "Pro (Popular)"
                                        ? "pro-checkbox"
                                        : "premium-checkbox"
                                    }
                                  ></input>
                                  <label for={item._id} className="monthly">
                                    Monthly
                                  </label>
                                </div>
                                {item.plan_type_monthly.map((item) => {
                                  return (
                                    <>
                                      <div className="monthly-amount">
                                        {item.amount}
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </>
                          )}
                        </div>
                        <div
                          className={
                            index == 0
                              ? "choose-btn free-btn"
                              : "" || index == 1
                              ? "choose-btn pro-btn"
                              : "" || index == 2
                              ? "choose-btn premium-btn"
                              : ""
                          }
                          onClick={() => choosePlan()}
                        >
                          Choose plan
                        </div>
                        <div className="include">What's Included</div>
                        <div className="included-things">
                          {item.data.map((item) => {
                            return (
                              <>
                                <div className="plan-content">
                                  <div className="icPrice">
                                    <i class="bi bi-check-circle-fill"></i>
                                  </div>
                                  {/* <img
                                      className="listIc"
                                      src={greenTick}
                                      alt=""
                                    /> */}
                                  <div className="plan-content-text">
                                    {item}
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                        {/* <div className="learn-btn">Learn More</div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
