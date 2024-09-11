import React, { useEffect, useState, useRef } from "react";
import "../assets/css/pricing.css";
import "../assets/css/forms/kidsformthree.css";
import "../assets/css/forms/kidsform-one.css";
import "../assets/css/forms/login.css";
import "../assets/css/dashboard.css";
import "../assets/css/register.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PopUp from "../components/PopUp.js";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import { useNavigate } from "react-router-dom";
import CheckoutComponent from "./CheckoutComponent.js";
import PaymentOptions from './PaymentOptions.js'
// import { createPayment, checkTransactionStatus } from '../config/paymentGateway.js';

const Pricing = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [pricingList, setPricingList] = useState([]);
  const [comment, setComment] = useState();
  const [plan1_Selected, selectPlan1] = useState(false);
  const [senderNameError, setSenderNameError] = useState(false);
  const [giftRecieverNameError, setGiftRecieverNameError] = useState(false);
  const [senderEmailError, setSenderEmailError] = useState(false);
  const [giftRecieverEmailError, setGiftRecieverEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [plan2_Selected, selectPlan2] = useState(true);
  const [plan3_Selected, selectPlan3] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidRecieverEmail, setIsValidRecieverEmail] = useState(true);
  const [senderName, setSenderName] = useState("");
  const [giftRecieverName, setGiftRecieverName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [recieverEmail, setRecieverEmail] = useState("");
  const [recieverEmailError, setRecieverEmailError] = useState(false);
  const [senderNameLetterError, setSenderNameLetterError] = useState(false);
  const [recieverNameLetterError, setRecieverNameLetterError] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedType, setSelectedType] = useState("annual");
  const [checkout, setCheckout] = useState(false);
  const [responseurl, setResponseUrl] = useState("");
  const [paymentOptions, setPaymentOption] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('')
  const [selectedAmount, setSelectedAmount] = useState('')
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('')
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState('')
  const [selectedPaymentPeriod,setSelectedPaymentPeriod] = useState('')

  const [message, setMessage] = useState("");
  const greenTick = require("../assets/icons/greenTick.png");
  const [pricing, setPricing] = useState("");
  const [isBillingForm, setIsBillingForm] = useState(true);
  const [formData, setFormData] = useState({
    billingFirstName: "",
    billingLastName: "",
    organization: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    email: "",
    retypeEmail: "",
    recipientFirstName: "",
    recipientLastName: "",
    recipientAddress1: "",
    recipientAddress2: "",
    recipientCity: "",
    recipientState: "",
    recipientZipcode: "",
    recipientCountry: "",
    recipientEmail: "",
    confirmRecipientEmail: "",
    comment: "",
    // Add other states as needed
  });

  useEffect(() => {
    getBrandsPricingList();
  }, []);
  useEffect(() => {}, [comment]);
  const getPricingList = async () => {
    await ApiHelper.get(API.getPricingList)
      .then((resData) => {
        if (resData) {
          setPricingList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

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
              "user_id":userId
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

  const handlePlanTypeChange = (type) => {
    setSelectedType(type);
  };

  const handleNext = () => {
    // Handle form submission or transition to next form
    setIsBillingForm(false);
  };

  const getBrandsPricingList = async () => {
    await ApiHelper.get(API.brandsPricingList)
      .then((resData) => {
        if (resData) {
          setPricingList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const choosePlan = async (index, item) => {
    const selectedPlanItem =
      item.plan_type_annual.find(
        (plan) => `annual-${item._id}` === selectedPlan
      ) ||
      item.plan_type_monthly.find(
        (plan) => `monthly-${item._id}` === selectedPlan
      );
    const currency = selectedPlanItem ? selectedPlanItem.currency : "Unknown";
    const price = selectedPlanItem ? selectedPlanItem.amount : "N/A";
    const regex = /^(\w+)\s([\d.,]+)\/(\w+)$/;
    const match = price.match(regex);
    if (match) {
      const currency = match[1].toUpperCase(); // "USD"
      const amount = parseFloat(match[2]); // 29.99
      const duration = match[3]; // "month"
      setSelectedCurrency(currency);
      setSelectedAmount(amount);
      // const type = 'https://dev.brandsandtalent.com/create-jobs'
      localStorage.setItem("selectedPaymentPeriod", selectedPaymentPeriod);
      localStorage.setItem("selectedPaymentPlan", selectedPaymentPlan);
      setPaymentOption(true)
    } else {
      console.error("Price string format is incorrect");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // setError(null);

    try {
      const payload = {
        name: formData.billingFirstName,
        lastName: formData.billingLastName,
        company: formData.organization,
        address: formData.address1,
        additionalAddrees: formData.address2,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipcode: formData.zipcode,
        email: formData.email,
        user_id: "", // Provide actual user_id if needed
        gift: [
          {
            name: formData.recipientFirstName,
            lastName: formData.recipientLastName,
            company: formData.organization,
            address: formData.recipientAddress1,
            additionalAddrees: formData.recipientAddress2,
            city: formData.recipientCity,
            state: formData.recipientState,
            country: formData.recipientCountry,
            zipcode: formData.recipientZipcode,
            email: formData.recipientEmail,
            message: formData.comment,
          },
        ],
      };
      const resultData = await ApiHelper.post(API.giftSubCreation, payload);
      // Handle successful submission,
      handleClose(); // Close the dialog
    } catch (err) {
      console.error("Error submitting form:", err);
      // setError('There was an error submitting the form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async (amount, currency, type, paymentOption) => {
    try {
      let apiUrl = paymentOption == 'card' ? API.createPayment : API.createqrpayment;
      const response = await ApiHelper.post(apiUrl, {
        amount,
        currency,
        type,
      });
      setResponseUrl(response.data.url);
      localStorage.setItem("paymenttrans_id", response.data.trans_id);
      setCheckout(true);
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  const handleRadioChange = (type, id, planname) => (event) => {
    setSelectedPlan(id);
    setSelectedPaymentPlan(planname);
    setSelectedPaymentPeriod(type);
  };

  function handleForms(e) {
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
      getPricingList();
    } else {
      getBrandsPricingList();
    }
  };

  const handleSenderNameChange = (e) => {
    const value = e.target.value;
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
      setSenderNameLetterError(false);
      setSenderName("");
    } else if (!onlyLettersRegex.test(value)) {
      setSenderNameLetterError(true);
    } else {
      setSenderName(value);

      setSenderNameLetterError(false);
    }
  };

  const handleSenderNameKeyPress = (e) => {
    if (e.key === "Backspace") {
      setSenderNameLetterError(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecieverNameChange = (e) => {
    const value = e.target.value;
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
      setRecieverNameLetterError(false);
      setGiftRecieverName("");
    } else if (!onlyLettersRegex.test(value)) {
      setRecieverNameLetterError(true);
    } else {
      setGiftRecieverName(value);
      setRecieverNameLetterError(false);
    }
  };

  const handleRecieverNameKeyPress = (e) => {
    if (e.key === "Backspace") {
      setRecieverNameLetterError(false);
    }
  };

  const handleSenderEmailChange = (e) => {
    setSenderEmailError(false);
    const email = e.target.value;
    setSenderEmail(e.target.value);
    setIsValidEmail(emailRegex.test(email));
  };

  const handleRecieverEmailChange = (e) => {
    setRecieverEmailError(false);
    setGiftRecieverEmailError(false);
    const email = e.target.value;
    setRecieverEmail(e.target.value);
    setIsValidRecieverEmail(emailRegex.test(email));
  };

  useEffect(()=>{
    if(selectedPaymentOption == 'qr'){
      handlePayment(selectedAmount, selectedCurrency, 'https://dev.brandsandtalent.com/create-jobs','qr')
    }else if(selectedPaymentOption == 'card'){
      handlePayment(selectedAmount, selectedCurrency, 'https://dev.brandsandtalent.com/create-jobs','card')
    }
  },[selectedPaymentOption])

  const modalRef = useRef(null);

  const sendGiftSubscription = async () => {
    if (senderName == "") {
      setSenderNameError(true);
    }
    if (senderEmail == "") {
      setSenderEmailError(true);
    }
    if (giftRecieverName == "") {
      setGiftRecieverNameError(true);
    }
    if (recieverEmail == "") {
      setGiftRecieverEmailError(true);
    }
    if (comment == "" || comment == undefined || !comment) {
      setCommentError(true);
    }
    setIsLoading(true);
    if (
      senderName &&
      senderEmail &&
      giftRecieverName &&
      recieverEmail &&
      comment
    ) {
    }
    const formData = {
      fullName: senderName,
      giftSenderEmail: senderEmail,
      giftReceiversName: giftRecieverName,
      giftReceiversEmail: recieverEmail,
      comment: comment,
    };

    setIsLoading(true);
    await ApiHelper.post(API.giftMail, formData)
      .then((resData) => {
        setIsLoading(false);

        if (resData.data.status === true) {
          handleClose();
          setMessage("Gift Subscription Sent Successfully");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 3000);
        } else if (resData.data.status === false) {
          setMessage("Error Occured!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Header />
      <section className="topSpace">
        <div className="popular-header">
          <div className="container">
            <div className="header-title">Pricing</div>
          </div>
        </div>
      </section>
      <div className="select-plan-main">
        <div className="select-pricing container text-center">
          <label className="toggleSwitch nolabel">
            <input type="checkbox" onChange={handleToggle} />
            <a></a>
            <span>
              <span className="right-span">Brands /Clients</span>
              <span className="left-span">Talent</span>
            </span>
          </label>
        </div>
      </div>
      <div className="plan-main">
        <div className="container">
          {pricingList.length > 0 && (
            <div className="plans-section">
              <div className="row">
                {pricingList.map((item, index) => (
                  <div key={item._id} className="col-md-4">
                    <div
                      className={
                        index === 0
                          ? "plans-wrapper free-plans"
                          : index === 1
                          ? "plans-wrapper pro-plans"
                          : index === 2
                          ? "plans-wrapper premium-plans"
                          : ""
                      }
                    >
                      <div className="priceHeight">
                        <div className="plan-name">
                          {item.planname}
                          <div
                            className={
                              index === 1
                                ? "pro-gift giftSize"
                                : index === 2
                                ? "premium-gift giftSize"
                                : ""
                            }
                            onClick={handleClickOpen}
                          >
                            {item.gift}
                          </div>
                        </div>

                        {item.planname === "Basic" && (
                          <>
                            <div className="plan-value">Free</div>
                            <div className="plan-validity">Forever</div>
                          </>
                        )}
                        {item.planname === "Free For ever" && (
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
                                  checked={
                                    selectedPlan === `annual-${item._id}`
                                  }
                                  onChange={handleRadioChange("annual",`annual-${item._id}`,item.planname)}
                                  className={
                                    item.planname === "Pro (Popular)"
                                      ? "pro-checkbox"
                                      : "premium-checkbox"
                                  }
                                />
                                <label
                                  htmlFor={`annual-${item._id}`}
                                  className="annual"
                                >
                                  {item.period}
                                </label>
                              </div>
                              <div className="per-value">
                                {item.annualTotalAmount}
                              </div>
                            </div>

                            {item.plan_type_annual.map((plan, index) => (
                              <div key={index} className="plan-amounts">
                                <div className="value-wrapper">
                                  <div className="after-value">
                                    {plan.afterDiscount}
                                  </div>
                                </div>
                                <div className="border-bottom"></div>
                              </div>
                            ))}

                            <div className="monthly-wrapper pt-3">
                              <div>
                                <input
                                  type="radio"
                                  name={`monthly-${item._id}`}
                                  id={`monthly-${item._id}`}
                                  checked={
                                    selectedPlan === `monthly-${item._id}`
                                  }
                                  onChange={handleRadioChange("monthly",`monthly-${item._id}`,item.planname)}
                                  className={
                                    item.planname === "Pro (Popular)"
                                      ? "pro-checkbox"
                                      : "premium-checkbox"
                                  }
                                />
                                <label
                                  htmlFor={`monthly-${item._id}`}
                                  className="monthly"
                                >
                                  Monthly
                                </label>
                              </div>
                              {item.plan_type_monthly.map((plan, index) => (
                                <div key={index} className="monthly-amount">
                                  {plan.amount}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                      <div
                        className={
                          index === 0
                            ? "choose-btn free-btn"
                            : index === 1
                            ? "choose-btn pro-btn"
                            : index === 2
                            ? "choose-btn premium-btn"
                            : ""
                        }
                        onClick={() => choosePlan(index, item)}
                      >
                        Choose plan
                      </div>
                      <div className="include">What's Included</div>
                      <div className="included-things">
                        {item.data.map((content, index) => (
                          <div key={index} className="plan-content">
                            <div className="icPrice">
                              <i className="bi bi-check-circle-fill"></i>
                            </div>
                            <div className="plan-content-text">{content}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              if (isBillingForm) {
                handleNext();
              } else {
                handleSubmit();
              }
            },
          }}
        >
          <div className="gift-dialog-header">
            <DialogTitle>
              {isBillingForm
                ? "Your Billing Address"
                : "Gift Recipient Information"}
            </DialogTitle>
            <i className="bi bi-x-lg close-gift" onClick={handleClose}></i>
          </div>
          <DialogContent>
            <div className="search-filter-section">
              {isBillingForm ? (
                <div className="billing-form">
                  <div className="kids-form-row row">
                    {/* Billing Information Fields */}
                    {[
                      "First Name",
                      "Last Name",
                      "Organization",
                      "Address 1",
                      "Address 2",
                      "City",
                      "State",
                      "Zipcode",
                      "Country",
                    ].map((field) => (
                      <div
                        className="kids-form-section col-md-12 mb-3"
                        key={field}
                      >
                        <label className="form-label">
                          {field} <span className="mandatory">*</span>
                        </label>
                        <input
                          type="text"
                          name={`billing${field.replace(" ", "")}`}
                          className="form-control"
                          placeholder={field}
                          onChange={handleInputChange}
                          value={formData[`billing${field.replace(" ", "")}`]}
                        />
                      </div>
                    ))}
                    <div className="kids-form-section col-md-12 mb-3">
                      <label className="form-label">
                        Email <span className="mandatory">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className={`form-control ${
                          formData.email === formData.retypeEmail
                            ? ""
                            : "is-invalid"
                        }`}
                        placeholder="Enter E-mail"
                        onChange={handleInputChange}
                        value={formData.email}
                      />
                    </div>
                    <div className="kids-form-section col-md-12 mb-3">
                      <label className="form-label">
                        Re-type Email <span className="mandatory">*</span>
                      </label>
                      <input
                        type="email"
                        name="retypeEmail"
                        className={`form-control ${
                          formData.email === formData.retypeEmail
                            ? ""
                            : "is-invalid"
                        }`}
                        placeholder="Re-type E-mail"
                        onChange={handleInputChange}
                        value={formData.retypeEmail}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="recipient-form">
                  {/* Recipient Information Fields */}
                  {[
                    "First Name",
                    "Last Name",
                    "Address 1",
                    "Address 2",
                    "City",
                    "State",
                    "Zipcode",
                    "Country",
                  ].map((field) => (
                    <div
                      className="kids-form-section col-md-12 mb-3"
                      key={field}
                    >
                      <label className="form-label">
                        {field} <span className="mandatory">*</span>
                      </label>
                      <input
                        type="text"
                        name={`recipient${field.replace(" ", "")}`}
                        className="form-control"
                        placeholder={field}
                        onChange={handleInputChange}
                        value={formData[`recipient${field.replace(" ", "")}`]}
                      />
                    </div>
                  ))}
                  <div className="kids-form-section col-md-12 mb-3">
                    <label className="form-label">
                      Email Address <span className="mandatory">*</span>
                    </label>
                    <input
                      type="email"
                      name="recipientEmail"
                      className={`form-control ${
                        formData.recipientEmail ===
                        formData.confirmRecipientEmail
                          ? ""
                          : "is-invalid"
                      }`}
                      placeholder="Email Address"
                      onChange={handleInputChange}
                      value={formData.recipientEmail}
                    />
                  </div>
                  <div className="kids-form-section col-md-12 mb-3">
                    <label className="form-label">
                      Confirm Email Address <span className="mandatory">*</span>
                    </label>
                    <input
                      type="email"
                      name="confirmRecipientEmail"
                      className={`form-control ${
                        formData.recipientEmail ===
                        formData.confirmRecipientEmail
                          ? ""
                          : "is-invalid"
                      }`}
                      placeholder="Confirm Email Address"
                      onChange={handleInputChange}
                      value={formData.confirmRecipientEmail}
                    />
                  </div>
                  <div className="kids-form-section col-md-12 mb-3">
                    <label className="form-label">
                      Announce Your Gift With A Personalized Message (Hide)
                      <span className="mandatory">*</span>
                    </label>
                    <textarea
                      name="comment"
                      style={{ width: "100%" }}
                      className="form-control address-textarea"
                      placeholder="Enter message here"
                      rows="3"
                      onChange={handleInputChange}
                      value={formData.comment}
                    ></textarea>
                    <div className="character-count">
                      Count (250 maximum characters): {formData.comment.length}
                    </div>
                  </div>
                  <div className="kids-form-section col-md-12 mb-3">
                    <label className="form-label">Total Due</label>
                    <input
                      type="text"
                      name="totalDue"
                      className="form-control"
                      placeholder="Total Due"
                      onChange={handleInputChange}
                      value={formData.totalDue}
                    />
                  </div>
                  <button type="button" className="btn add-another-gift-btn">
                    Add Another Gift
                  </button>
                </div>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              className="btn gift-payment-btn"
              onClick={isBillingForm ? handleNext : handleSubmit}
            >
              {isLoading ? "Loading..." : isBillingForm ? "Next" : "Submit"}
            </button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {paymentOptions && (
        <PaymentOptions 
          selectedCurrency = {selectedCurrency}
          selectedAmount = {selectedAmount}
          setSelectedPaymentOption = {setSelectedPaymentOption}
          setPaymentOption = {setPaymentOption}
          selectedPaymentPlan = {selectedPaymentPlan}
      />
      )}

      {checkout && (
        <CheckoutComponent
          responseUrl={responseurl}
          setCheckout={setCheckout}
        />
      )}
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Pricing;
