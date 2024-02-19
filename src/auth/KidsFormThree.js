import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsformthree.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import Select from "react-select";
import Axios from "axios";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
const KidsFormThree = ({ onDataFromChild, ...props }) => {
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [pricingList, setPricingList] = useState([]);
  const [selectedPlan, setPlan] = useState("");
  const [selectedIndex, setSelectedIndex] = useState();
  const [email, setEmail] = useState("");

  const greenTick = require("../assets/icons/greenTick.png");

  const sendDataToParent = () => {
    const data = "payment success";
    console.log("sendDataToParent");

    onDataFromChild(data);
  };

  useEffect(() => {
    getPricingList();
    console.log(selectedPlan, "selectedPlan");
    console.log(props?.emailData?.email, "props pricing");
    setEmail(props?.emailData?.email);
  }, [selectedPlan]);

  const handlePlan = (e) => {
    console.log("handlePlan");
  };

  const getPricingList = async () => {
    await ApiHelper.get(API.getPricingList)
      .then((resData) => {
        if (resData) {
          setPricingList(resData.data.data);
          sendDataToParent();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const subscriptionPlan = async (index) => {
    console.log(index);
    setSelectedIndex(index);
    const formData = {
      parentEmail: email,
      subscriptionPlan: selectedPlan,
    };
    console.log(formData, "formData subscription");
    await ApiHelper.post(API.subscriptionPlan, formData)
      .then((resData) => {
        if (resData) {
          console.log(resData.data, "resData subscriptionPlan");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRadioChange = (event, plan, type) => {
    setPlan(type);
    console.log("Selected Plan:", type);
  };

  return (
    <>
      <div className="subscribe-form">
        <div className="subscriptions-wrapper">
          {pricingList.length && (
            <div className="plans-section" s>
              {pricingList.map((item, index) => {
                return (
                  <div
                    className={
                      index === 0
                        ? "plans-wrapper disabled-plan"
                        : "plans-wrapper"
                    }
                    style={{
                      border:
                        selectedIndex === index ? "4px solid #c2114b" : "none",
                    }}
                  >
                    <div className="plan-name">
                      {item.planname}
                      <div className="subcribe-gift">{item.gift}</div>
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
                            onChange={(event) =>
                              handleRadioChange(event, item, "anual")
                            }
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
                              onChange={(event) =>
                                handleRadioChange(event, item, "monthly")
                              }
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
                        index === 0 ? "choose-btn disabled-plan" : "choose-btn"
                      }
                      onClick={(e) => {
                        subscriptionPlan(index);
                      }}
                    >
                      Choose plan
                    </div>
                    <div
                      className={
                        index === 0 ? "include disabled-plan" : "include"
                      }
                    >
                      WHAT'S INCLUDED
                    </div>
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
                    {/* <div className="learn-btn">Learn More</div> */}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default KidsFormThree;
