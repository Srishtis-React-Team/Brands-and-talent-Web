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
      {/* className={artists ? "active-tab" : null} */}
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
                            <div className="monthly-amount">{item.amount}</div>
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
      {/* <div className="plans-wrapper free-plans">
          <div className="premium-text">Basic</div>
          <div className="plan-value">Free</div>
          <div className="plan-validity">Forever</div>
          <div className="choose-btn free-btn">Choose plan</div>
          <div className="include">WHAT'S INCLUDED</div>
          <div className="included-things">
            <div>1. Create a profile </div>
            <div>2. Verified profile</div>
            <div>3. portfolio</div>
            <div>4. 3 photos</div>
            <div>5. 1 videos</div>
            <div>6. Bio</div>
            <div>7. CV</div>
            <div>8. Get Invited to a Job</div>
            <div>9. Apply to unlimited jobs</div>
            <div>10. Chat with thebrands (clients)directly</div>
          </div>
          <div className="learn-btn">Learn More</div>
        </div>
        <div className="plans-wrapper pro-plans">
          <div className="plan-name">
            Pro (Recommended)
            <div className="pro-gift">Gift Subscription</div>
          </div>
          <div className="plan-value">$7 per / month</div>
          <div className="save-plan">
            Annual (save 22.2%) US$ 7/month <span>US$ 108</span>  US $84/year
          </div>
          <div className="choose-btn pro-btn">Choose plan</div>
          <div className="include">WHAT'S INCLUDED</div>
          <div className="included-things">
            <div>1. Create a profile </div>
            <div>2. Verified profile</div>
            <div>3. portfolio</div>
            <div>4. 20 photos</div>
            <div>5. 6 videos</div>
            <div>6. Bio</div>
            <div>7. CV</div>
            <div>8. Get Invited to a Job</div>
            <div>9. Apply to unlimited jobs</div>
            <div>10. Chat with thebrands (clients)directly</div>
          </div>
          <div className="learn-btn">Learn More</div>
        </div>
        <div className="plans-wrapper premium-plans">
          <div className="plan-name">
            Premium
            <div className="premium-gift">Gift Subscription</div>
          </div>
          <div className="plan-value">$17 per / month</div>
          <div className="save-plan">
            Annual (save 29.2%) US$ 17/month <span>US$ 288</span>  US$ 204/year
          </div>
          <div className="choose-btn premium-btn">Choose plan</div>
          <div className="include">WHAT'S INCLUDED</div>
          <div className="included-things">
            <div>1. Create a profile </div>
            <div>2. Verified profile</div>
            <div>3. portfolio</div>
            <div>4. 20 photos</div>
            <div>5. 6 videos</div>
            <div>6. Bio</div>
            <div>7. CV</div>
            <div>8. Get Invited to a Job</div>
            <div>9. Apply to unlimited jobs</div>
            <div>10. Chat with thebrands (clients)directly</div>
          </div>
          <div className="learn-btn">Learn More</div>
        </div> */}
      <Footer />
    </>
  );
};

export default Pricing;
