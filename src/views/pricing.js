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
    getPricingList();
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

  const selectPricing = (event) => {
    setPricing(event.target.value);
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
    if (checked) {
      getBrandsPricingList();
    } else {
      getPricingList();
    }
  };

  return (
    <>
      <Header />
      <section>
        <div className="popular-header">
          <div className="header-title">Popular Talents</div>
          <div className="header-menu">
            <div>Home</div>
            <div>Talent</div>
          </div>
        </div>
      </section>
      {/* className={artists ? "active-tab" : null} */}

      <div className="select-plan-main">
        <div className="select-pricing">
          <label className="toggleSwitch nolabel">
            <input type="checkbox" onChange={handleToggle} />
            <a></a>
            <span>
              <span className="left-span">Talent</span>
              <span className="right-span">Brand</span>
            </span>
          </label>
        </div>
      </div>

      <div className="plan-main">
        {pricingList.length && (
          <div className="plans-section">
            {pricingList.map((item, index) => {
              return (
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
                  <div className="plan-name">
                    {item.planname}
                    <div
                      className={
                        index == 1
                          ? "pro-gift"
                          : "" || index == 2
                          ? "premium-gift"
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
                  {item.plan_type_annual.length >= 1 && (
                    <>
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
                      {item.plan_type_annual.map((item) => {
                        return (
                          <>
                            <div className="plan-amounts">
                              <div className="value-wrapper">
                                <div className="previous-value">
                                  {item.beforeValue}
                                </div>
                                <div className="after-value">
                                  {item.afterDiscount}
                                </div>
                              </div>
                              <div className="per-value">{item.amount}</div>
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
                  >
                    Choose plan
                  </div>
                  <div className="include">WHAT'S INCLUDED</div>
                  <div className="included-things">
                    {item.data.map((item) => {
                      return (
                        <>
                          <div className="plan-content">
                            <div>
                              <img src={greenTick} alt="" />
                            </div>
                            <div className="plan-content-text">{item}</div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="learn-btn">Learn More</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
