import React, { useState, useEffect } from "react";
import "../assets/css/forms/kidsformthree.css";
import "../assets/css/forms/kidsform-one.css";
import "../assets/css/pricing.css";
import "../assets/css/register.css";
import "../assets/css/dashboard.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { useNavigate } from "react-router";
import "../assets/css/register.css";
import CheckoutComponent from "../views/CheckoutComponent.js";
import PaymentOptions from '../views/PaymentOptions.js'


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
  const [responseurl,setResponseUrl] = useState('')
  const [checkout,setCheckout] = useState(false)
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState('')
  const [selectedPaymentPeriod,setSelectedPaymentPeriod] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [selectedAmount, setSelectedAmount] = useState('')
  const [paymentOptions, setPaymentOption] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('')



  useEffect(()=>{
    if(selectedPaymentOption == 'qr'){
      handlePayment(selectedAmount, selectedCurrency, `https://dev.brandsandtalent.com/talent-signup-files-details?userId=${userId}`,'qr')
    }else if(selectedPaymentOption == 'card'){
      handlePayment(selectedAmount, selectedCurrency, `https://dev.brandsandtalent.com/talent-signup-files-details?userId=${userId}`,'card')
    }
  },[selectedPaymentOption])

  useEffect(() => {
    checkTransaction();
  }, []);

  const checkTransaction = async () => {
    const paymenttrans_id = localStorage.getItem("paymenttrans_id")
    const obj = { tranId: paymenttrans_id };

    try {
      const resData = await ApiHelper.post('https://brandsandtalent.com/api/pricing/check-transaction', obj);

      if (resData) {
        if(resData.data.status.message == "Success!"){
        const paymentData = resData.data.data;
        if(paymentData.payment_status == "APPROVED"){
          localStorage.setItem("paymentData", JSON.stringify(paymentData));
          // alert('payment successfully completed')
          const userId = localStorage.getItem("userId")
          const userData = {
              "subscriptionPlan":selectedPaymentPeriod,
              "planName":selectedPaymentPlan,
              "user_id":userId,
              "transactionDate":paymentData?.transaction_date,
              "paymentStatus":paymentData?.payment_status,
              "paymentCurreny":paymentData?.payment_currency,
              "paymentAmount":paymentData?.payment_amount,
          } 
          const responseSubscription = await ApiHelper.post(API.subscriptionPlan, userData);
          console.log('responseSubscription',responseSubscription)
        }
        }
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    getPricingList();
  }, [selectedPlan]);

  const getPricingList = async () => {
    await ApiHelper.get(API.getPricingList)
      .then((resData) => {
        if (resData) {
          setPricingList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  // const subscriptionPlan = async (index) => {
  //   setSelectedIndex(index);
  //   if (!selectedPlan) {
  //     setMessage("Please choose Annual Or Monthly");
  //     setOpenPopUp(true);
  //     setTimeout(function () {
  //       setOpenPopUp(false);
  //     }, 1000);
  //   } else if (selectedPlan) {
  //     const formData = {
  //       subscriptionPlan: "annual",
  //       planName: "Premium",
  //       user_id: "668cc6fb9545f3d7afde294e",
  //     };

  //     await ApiHelper.post(`${API.subscriptionPlan}${userId}`, formData)
  //       .then((resData) => {
  //         if (resData) {
  //           setMessage("Plan Selected Successfully!");
  //           setOpenPopUp(true);
  //           setTimeout(function () {
  //             setOpenPopUp(false);
  //           }, 1000);
  //         }
  //       })
  //       .catch((err) => {});
  //   }
  // };
  const choosePlan = async (index, item) => {
    console.log('item',item)
    console.log('selectedPlan',`annual-${selectedPlan}`)
    const selectedPlanItem = item.plan_type_annual.find(plan => `annual-${item._id}` === selectedPlan) || 
                             item.plan_type_monthly.find(plan => `monthly-${item._id}` === selectedPlan);
    console.log('selectedPlanItem',selectedPlanItem)
    const currency = selectedPlanItem ? selectedPlanItem.currency : 'Unknown';
    const price = selectedPlanItem ? selectedPlanItem.amount : 'N/A';
    console.log('price',price)
    const regex = /^(\w+)\s([\d.,]+)\/(\w+)$/;
    const match = price.match(regex);
    if (match) {
      const currency = match[1].toUpperCase(); // "USD"
      const amount = parseFloat(match[2]);     // 29.99
      const duration = match[3];               // "month"
      setSelectedCurrency(currency);
      setSelectedAmount(amount);
      localStorage.setItem("selectedPaymentPeriod", selectedPaymentPeriod);
      localStorage.setItem("selectedPaymentPlan", selectedPaymentPlan);
      setPaymentOption(true)

      // const type = `https://dev.brandsandtalent.com/talent-signup-files-details?userId=${userId}`
      // handlePayment(amount, currency, type)
      // /api/pricing/create-payment
      // /check-transaction
      // handlePayment(amount, currency)
    } else {
      console.error("Price string format is incorrect");
    }
  };

  const handlePayment = async (amount, currency, type, paymentOption) => {
    try {
      let apiUrl = paymentOption == 'card' ? API.createPayment : API.createqrpayment;
      const response =  await ApiHelper.post(apiUrl, { amount, currency, type })
        // await axios.post('/api/pricing/create-payment', { amount, currency, type });
        console.log('Payment Response:', response);
        setResponseUrl(response.data.url)
        localStorage.setItem("paymenttrans_id", response.data.trans_id);
      setCheckout(true)
        // Handle the response and update UI
    } catch (error) {
        console.error('Error during payment:', error);
    }
};

  const handleRadioChange = (type, id, planname) => (event) => {
    setPlan(id);
    setSelectedPaymentPlan(planname);
    setSelectedPaymentPeriod(type);
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

        <div className="dialog-body spaceTops">
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
                                          name={`annual-${item._id}`}
                                          id={`annual-${item._id}`}
                                          checked={selectedPlan === `annual-${item._id}`}
                                          value="save"
                                          onChange={handleRadioChange("annual",`annual-${item._id}`,item.planname)}
                                          CHECKED
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
                                          name={`monthly-${item._id}`}
                                          id={`monthly-${item._id}`}
                                          checked={selectedPlan === `monthly-${item._id}`}
                                          onChange={handleRadioChange("monthly",`monthly-${item._id}`,item.planname)}
                                          CHECKED
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
                                onClick={() => choosePlan(index, item)}
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
      {paymentOptions && (
        <PaymentOptions 
          selectedCurrency = {selectedCurrency}
          selectedAmount = {selectedAmount}
          setSelectedPaymentOption = {setSelectedPaymentOption}
          setPaymentOption = {setPaymentOption}
          selectedPaymentPlan = {selectedPaymentPlan}
      />
      )}
      {checkout && <CheckoutComponent responseUrl={responseurl} setCheckout={setCheckout}/>}
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default KidsFormTwo;
