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
import PaymentOptions from "../views/PaymentOptions.js";
import MuiPhoneNumber from "material-ui-phone-number";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Loader from "../views/Loader.js";
import { useTheme, useMediaQuery } from "@mui/material";

import {
  parsePhoneNumber,
  isValidPhoneNumber,
  getNumberType,
  validatePhoneNumberLength,
} from "libphonenumber-js";
const KidsFormTwo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    // Handle form submission or transition to next form
    // setIsBillingForm(false);
    setIsPlanForm(false);
  };
  const [isBillingForm, setIsBillingForm] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isRecieverValidEmail, setIsRecieverValidEmail] = useState(true);
  const [isValidRecieverEmail, setIsValidRecieverEmail] = useState(true);
  const [senderName, setSenderName] = useState("");
  const [giftRecieverName, setGiftRecieverName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [recieverEmail, setRecieverEmail] = useState("");
  const [recieverEmailError, setRecieverEmailError] = useState(false);
  const [senderNameLetterError, setSenderNameLetterError] = useState(false);
  const [recieverNameLetterError, setRecieverNameLetterError] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [selectedType, setSelectedType] = useState("annual");
  const [giftMessage, setGiftMessage] = useState("");
  const [giftMessageError, setGiftMessageError] = useState("");
  const [email, setEmail] = useState("");
  const [recieversFirstName, setRecieversFirstName] = useState("");
  const [recieversLastName, setRecieversLastName] = useState("");
  const [recieversAddress, setRecieversAddress] = useState("");
  const [enquiry, setEnquiry] = useState("");
  const [mobile, setMobile] = useState("");
  const [senderNameError, setSenderNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [recieversNameError, setRecieversNameError] = useState(false);
  const [enquiryError, setEnquiryError] = useState(false);
  const [recieversLastNameError, setRecieversLastNameError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [mobileNumError, setMobileNumError] = useState(false);
  const [mobileValidationError, setMobileValidationError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [isPlanForm, setIsPlanForm] = useState(false);

  const handleMobileChange = (value) => {
    console.log(value, "handleMobileChange");
    isValidPhoneNumber(value);
    if (isValidPhoneNumber(value)) {
      setMobileError(false);
      setMobileValidationError(false);
      setMobile(value);
    } else {
      setMobileValidationError(true);
    }
  };

  const handleEmailChange = (e) => {
    setEmailError(false);
    const email = e.target.value;
    setEmail(email);
    setIsValidEmail(emailRegex.test(email));
  };

  const handleRecieverEmailChange = (e) => {
    setRecieverEmailError(false);
    const email = e.target.value;
    setRecieverEmail(email);
    setIsRecieverValidEmail(emailRegex.test(email));
  };

  const handleSubmit = async () => {
    if (isPlanForm === false) {
      setIsPlanForm(true);
    } else {
      console.log("Sender Name: ", senderName);
      console.log("Email: ", email);
      console.log("Receiver's Email: ", recieverEmail);
      console.log("Receiver's First Name: ", recieversFirstName);
      console.log("Receiver's Last Name: ", recieversLastName);
      if (!senderName) setSenderNameError(true);
      if (!email) setEmailError(true);
      if (!recieverEmail) setRecieverEmailError(true);
      if (!recieversFirstName) setRecieversNameError(true);
      if (!recieversLastName) setRecieversLastNameError(true);
      if (
        senderName &&
        email &&
        recieverEmail &&
        recieversFirstName &&
        recieversLastName
      ) {
        setIsLoading(true);
        try {
          const payload = {
            senderName: senderName,
            email: email,
            gift: [
              {
                receiversFirstName: recieversFirstName,
                receiversLastName: recieversLastName,
                address: recieversAddress,
                mobile: mobile,
                receiverEmail: recieverEmail,
                message: enquiry,
              },
            ],
          };

          try {
            const resData = await ApiHelper.post(
              `${API.giftSubCreation}`,
              payload
            );
            console.log(resData, "resData");
            if (resData.data.status) {
              setIsLoading(false);
              setMessage("Form Submitted Successfully");
              setOpenPopUp(true);
              setTimeout(() => {
                setSenderName("");
                setEmail("");
                setRecieversFirstName("");
                setRecieversLastName("");
                setRecieversAddress("");
                setEnquiry("");
                setMobile("");
                setMessage("");
                setOpenPopUp(false);

                handleClose();
              }, 2000);
            }
          } catch (err) {
            setIsLoading(false);
            // Handle error
          }

          // Handle successful submission,
          // handleClose(); // Close the dialog
        } catch (err) {
          console.error("Error submitting form:", err);
          // setError('There was an error submitting the form. Please try again.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setMessage("Please Update All Required Fields");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      }
    }
  };

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
  const [responseurl, setResponseUrl] = useState("");
  const [checkout, setCheckout] = useState(false);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState("");
  const [selectedPaymentPeriod, setSelectedPaymentPeriod] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [paymentOptions, setPaymentOption] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");

  useEffect(() => {
    if (selectedPaymentOption == "qr") {
      setLoading(true)
      handlePayment(
        selectedAmount,
        selectedCurrency,
        `https://dev.brandsandtalent.com/talent-signup-files-details?userId=${userId}`,
        "qr"
      );
    } else if (selectedPaymentOption == "card") {
      setLoading(true)
      handlePayment(
        selectedAmount,
        selectedCurrency,
        `https://dev.brandsandtalent.com/talent-signup-files-details?userId=${userId}`,
        "card"
      );
    }
  }, [selectedPaymentOption]);

  useEffect(() => {
    checkTransaction();
  }, []);

  const checkTransaction = async () => {
    const paymenttrans_id = localStorage.getItem("paymenttrans_id");
    const obj = { tranId: paymenttrans_id };

    try {
      const resData = await ApiHelper.post(
        "https://brandsandtalent.com/api/pricing/check-transaction",
        obj
      );

      if (resData) {
        if (resData.data.status.message == "Success!") {
          const paymentData = resData.data.data;
          if (paymentData.payment_status == "APPROVED") {
            localStorage.setItem("paymentData", JSON.stringify(paymentData));
            // alert('payment successfully completed')
            const userId = localStorage.getItem("userId");
            const userData = {
              subscriptionPlan: selectedPaymentPeriod,
              planName: selectedPaymentPlan,
              user_id: userId,
              transactionDate: paymentData?.transaction_date,
              paymentStatus: paymentData?.payment_status,
              paymentCurreny: paymentData?.payment_currency,
              paymentAmount: paymentData?.payment_amount,
            };
            const responseSubscription = await ApiHelper.post(
              API.subscriptionPlan,
              userData
            );
            console.log("responseSubscription", responseSubscription);
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
    console.log("item", item);
    console.log("selectedPlan", `annual-${selectedPlan}`);
    const selectedPlanItem =
      item.plan_type_annual.find(
        (plan) => `annual-${item._id}` === selectedPlan
      ) ||
      item.plan_type_monthly.find(
        (plan) => `monthly-${item._id}` === selectedPlan
      );
    console.log("selectedPlanItem", selectedPlanItem);
    const currency = selectedPlanItem ? selectedPlanItem.currency : "Unknown";
    const price = selectedPlanItem ? selectedPlanItem.amount : "N/A";
    console.log("price", price);
    const regex = /^(\w+)\s([\d.,]+)\/(\w+)$/;
    const match = price.match(regex);
    if (match) {
      const currency = match[1].toUpperCase(); // "USD"
      const amount = parseFloat(match[2]); // 29.99
      const duration = match[3]; // "month"
      setSelectedCurrency(currency);
      setSelectedAmount(amount);
      localStorage.setItem("selectedPaymentPeriod", selectedPaymentPeriod);
      localStorage.setItem("selectedPaymentPlan", selectedPaymentPlan);
      setPaymentOption(true);

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
      let apiUrl =
        paymentOption == "card" ? API.createPayment : API.createqrpayment;
      const response = await ApiHelper.post(apiUrl, { amount, currency, type });
      // await axios.post('/api/pricing/create-payment', { amount, currency, type });
      console.log("Payment Response:", response);
      setResponseUrl(response.data.url);
      localStorage.setItem("paymenttrans_id", response.data.trans_id);
      setCheckout(true);
      setLoading(false)
      // Handle the response and update UI
    } catch (error) {
      console.error("Error during payment:", error);
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
                                    onClick={handleClickOpen}
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
                                          checked={
                                            selectedPlan ===
                                            `annual-${item._id}`
                                          }
                                          value="save"
                                          onChange={handleRadioChange(
                                            "annual",
                                            `annual-${item._id}`,
                                            item.planname
                                          )}
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
                                          checked={
                                            selectedPlan ===
                                            `monthly-${item._id}`
                                          }
                                          onChange={handleRadioChange(
                                            "monthly",
                                            `monthly-${item._id}`,
                                            item.planname
                                          )}
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

      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              if (isPlanForm == false) {
                handleNext();
              } else {
                handleSubmit();
              }
            },
            style: {
              width: isMobile ? "90vw" : "60vw", // Adjust width for mobile and larger screens
              maxWidth: "90vw", // Ensure the dialog does not exceed the viewport width
            },
          }}
        >
          <div className="gift-dialog-header">
            <div className="gift-dialog-wrapper">
              <h5>Gift a Subscription Form</h5>
              <i className="bi bi-x-lg close-gift" onClick={handleClose}></i>
            </div>
            <p className="plan-content-text-popup pb-2">
              Gift a Subscription to Your Favorite Talent
            </p>

            <p
              className="plan-content-text-popup pb-2"
              style={{ color: "#c2114b" }}
            >
              (Please fill out the form below to gift a subscription to someone
              special and support their creative journey).
            </p>
          </div>

          <DialogContent>
            {isPlanForm == false && (
              <>
                <div>
                  <p className="plan-content-text-head pb-2">Your Details:</p>
                  <div className="kids-form-section col-md-12 mb-3">
                    <label className="form-label">
                      Full Name<span className="mandatory">*</span>
                    </label>
                    <div className="form-group adult-password-wrapper">
                      <input
                        type="text"
                        className="form-control adult-signup-inputs"
                        placeholder="Full Name"
                        value={senderName}
                        onChange={(e) => {
                          setSenderName(e.target.value);
                          setSenderNameError(false);
                        }}
                      />
                      {senderNameError && (
                        <div className="invalid-fields">
                          Please enter full name
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="kids-form-section col-md-12 mb-3">
                    <label className="form-label">
                      Email Address <span className="mandatory">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        !isValidEmail ? "is-invalid" : "form-control"
                      }`}
                      onChange={handleEmailChange}
                      placeholder="Email Address"
                      value={email}
                    />
                    {!isValidEmail && (
                      <div className="invalid-feedback">
                        Please enter a valid email address .
                      </div>
                    )}
                    {emailError && (
                      <div className="invalid-fields">
                        Please enter email address
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                <div>
                  <p className="plan-content-text-head pb-2">
                    Recipient’s Details:
                  </p>
                  <div className="kids-form-section col-md-12 mb-3">
                    <label className="form-label">
                      Recipient's Full Name <span className="mandatory">*</span>
                    </label>
                    <div className="form-group adult-password-wrapper">
                      <input
                        type="text"
                        className="form-control adult-signup-inputs"
                        placeholder="Recipient's Full Name*"
                        value={recieversFirstName}
                        onChange={(e) => {
                          setRecieversFirstName(e.target.value);
                          setRecieversNameError(false);
                        }}
                      />
                      {recieversNameError && (
                        <div className="invalid-fields">
                          Please enter recipient's full name
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="kids-form-section col-md-12 mb-3">
                    <label className="form-label">
                      Recipient's Email Address
                      <span className="mandatory">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        !isRecieverValidEmail ? "is-invalid" : "form-control"
                      }`}
                      onChange={handleRecieverEmailChange}
                      placeholder="Recipient's Email Address"
                      value={recieverEmail}
                    />
                    {!isRecieverValidEmail && (
                      <div className="invalid-feedback">
                        Please enter a valid recipient's email address.
                      </div>
                    )}
                    {recieverEmailError && (
                      <div className="invalid-fields">
                        Please enter recipient's email address
                      </div>
                    )}
                  </div>

                  <div className="kids-form-section col-md-12 mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Personalized Message
                    </label>
                    <textarea
                      className="contact-us-textarea w-100"
                      id="exampleFormControlTextarea1"
                      placeholder="Write a message to be included with your gift!"
                      value={enquiry}
                      rows="3"
                      onChange={(e) => {
                        setEnquiry(e.target.value);
                        setEnquiryError(false);
                      }}
                    />
                    {enquiryError && (
                      <div className="invalid-fields">
                        Please enter personalized message
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            {isPlanForm == true && (
              <>
                <div className="">
                  <div className="container">
                    {pricingList.length > 0 && (
                      <div className="plans-section">
                        <div className="row">
                          {pricingList.slice(1).map((item, index) => (
                            <div key={item._id} className="col-md-6">
                              <div
                                className={
                                  index === 0
                                    ? "plans-wrapper pro-plans mb-0" // index 0 here corresponds to the original index 1
                                    : index === 1
                                    ? "plans-wrapper premium-plans mb-0" // index 1 here corresponds to the original index 2
                                    : ""
                                }
                              >
                                <div className="priceHeight">
                                  <div className="plan-name">
                                    {item.planname}
                                  </div>
                                  {item.planname === "Basic" && (
                                    <>
                                      <div className="plan-value">Free</div>
                                      <div className="plan-validity">
                                        Forever
                                      </div>
                                    </>
                                  )}
                                  {item.planname === "Free For ever" && (
                                    <>
                                      <div className="plan-value">Free</div>
                                      <div className="plan-validity">
                                        Forever
                                      </div>
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
                                              selectedPlan ===
                                              `annual-${item._id}`
                                            }
                                            onChange={handleRadioChange(
                                              "annual",
                                              `annual-${item._id}`,
                                              item.planname
                                            )}
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

                                      {item.plan_type_annual.map(
                                        (plan, index) => (
                                          <React.Fragment key={index}>
                                            <div className="plan-amounts">
                                              <div className="per-value">
                                                {plan.afterDiscount}
                                              </div>
                                            </div>
                                            <div className="border-bottom"></div>
                                          </React.Fragment>
                                        )
                                      )}

                                      <div className="monthly-wrapper pt-3">
                                        <div>
                                          <input
                                            type="radio"
                                            name={`monthly-${item._id}`}
                                            id={`monthly-${item._id}`}
                                            checked={
                                              selectedPlan ===
                                              `monthly-${item._id}`
                                            }
                                            onChange={handleRadioChange(
                                              "monthly",
                                              `monthly-${item._id}`,
                                              item.planname
                                            )}
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
                                        {item.plan_type_monthly.map(
                                          (plan, index) => (
                                            <div
                                              key={index}
                                              className="monthly-amount"
                                            >
                                              {plan.amount}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div
                                  className={
                                    index === 0
                                      ? "choose-btn pro-btn" // index 0 here corresponds to the original index 1
                                      : index === 1
                                      ? "choose-btn premium-btn" // index 1 here corresponds to the original index 2
                                      : ""
                                  }
                                  onClick={() => choosePlan(index + 1, item)} // Adjust the index for the chosen plan
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
                                      <div className="plan-content-text">
                                        {content}
                                      </div>
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
              </>
            )}
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              className="btn gift-payment-btn"
              onClick={handleSubmit}
            >
              {isPlanForm == false ? "Next" : "Submit"}
            </button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      {paymentOptions && (
        <PaymentOptions
          selectedCurrency={selectedCurrency}
          selectedAmount={selectedAmount}
          setSelectedPaymentOption={setSelectedPaymentOption}
          setPaymentOption={setPaymentOption}
          selectedPaymentPlan={selectedPaymentPlan}
        />
      )}
      {checkout && (
        <CheckoutComponent
          responseUrl={responseurl}
          setCheckout={setCheckout}
        />
      )}
      {loading ? <Loader /> : <div></div>}
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default KidsFormTwo;
