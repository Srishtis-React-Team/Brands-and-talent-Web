import React, { useState, useEffect } from "react";
import "../assets/css/forms/kidsformthree.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { useNavigate } from "react-router";

const KidsFormTwo = () => {
  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [pricingList, setPricingList] = useState([]);
  const [selectedPlan, setPlan] = useState("");
  const [selectedIndex, setSelectedIndex] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const paramsValues = window.location.search;
  const urlParams = new URLSearchParams(paramsValues);
  const userId = urlParams.get("userId");
  const userEmail = urlParams.get("userEmail");
  console.log(userId, "userId");
  console.log(userEmail, "userEmail");

  useEffect(() => {
    getPricingList();
    console.log(selectedPlan, "selectedPlan");
  }, [selectedPlan]);

  const getPricingList = async () => {
    await ApiHelper.get(API.getPricingList)
      .then((resData) => {
        if (resData) {
          setPricingList(resData.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const subscriptionPlan = async (index) => {
    console.log(selectedPlan, "selectedPlan");
    console.log(index);
    setSelectedIndex(index);
    if (!selectedPlan) {
      setMessage("Please choose Annual Or Monthly");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    } else if (selectedPlan) {
      const formData = {
        subscriptionPlan: "annual",
        planName: "Premium",
        user_id: "668cc6fb9545f3d7afde294e",
      };
      console.log(formData, "formData subscription");
      await ApiHelper.post(`${API.subscriptionPlan}${userId}`, formData)
        .then((resData) => {
          if (resData) {
            console.log(resData.data, "resData subscriptionPlan");
            setMessage("Plan Selected SuccessFully!");
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const choosePlan = async (index) => {
    navigate(`/talent-signup-files-details?userId=${userId}`);
  };

  const handleRadioChange = (event, plan, type) => {
    setPlan(type);
    console.log("Selected Plan:", type);
  };

  const goBack = () => {
    navigate(`/talent-signup-basic-details?userId=${userId}`);
  };

  return (
    <>
      <div className="form-dialog">
        <div className="header-wrapper">
          <div className="step-wrapper">
            <img
              className="modal-logo"
              onClick={() => {
                navigate("/");
              }}
              src={btLogo}
            ></img>
            <div className="step-text">Step 4 of 6</div>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              navigate("/");
            }}
          ></button>
        </div>

        <div className="dialog-body">
          <div className="container">
            <div className="subscribe-form">
              <div className="subscriptions-wrapper">
                {pricingList.length && (
                  <div className="plans-section kids-pan-section">
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
                                        <label
                                          for={item.planname}
                                          className="annual"
                                        >
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
                                        <label
                                          for={item._id}
                                          className="monthly"
                                        >
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
                              {/* <div
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
                              </div> */}
                              <div className="include">What's Included</div>
                              <div className="included-things">
                                {item.data.map((item) => {
                                  return (
                                    <>
                                      <div className="plan-content">
                                        <div className="icPrice">
                                          <i className="bi bi-check-circle-fill"></i>
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
          </div>
        </div>

        <div className="dialog-footer">
          <button
            type="button"
            onClick={(e) => {
              goBack();
            }}
            className="step-back"
          >
            Back
          </button>

          <button
            className="step-continue"
            type="button"
            onClick={(e) => {
              choosePlan();
            }}
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default KidsFormTwo;
