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
import Pricing from "../views/pricing.js";
import Loader from "../views/Loader.js";
import { useTheme, useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PaymentOptions from "../views/PaymentOptions.js";
import CheckoutComponent from "../views/CheckoutComponent.js";

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

  useEffect(() => {
    // Check if the page has already been reloaded
    if (!localStorage.getItem("reloaded")) {
      localStorage.setItem("reloaded", "true"); // Set flag in localStorage
      window.location.reload();
    }

    // Clear the flag when the component unmounts
    return () => {
      localStorage.removeItem("reloaded");
    };
  }, []);

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
  const [senderName, setSenderName] = useState("");
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
  const [giftSub, setGiftSub] = useState(false);
  const [appliedCouponCode, setAppliedCouponCode] = useState("");
  const [abaFormData, setAbaFormData] = useState({});


  const handleMobileChange = (value) => {
    isValidPhoneNumber(value);
    if (isValidPhoneNumber(value)) {
      setMobileError(false);
      setMobileValidationError(false);
      setMobile(value);
    } else {
      setMobileValidationError(true);
    }
  };

  const editKids = async () => {
    const userData = {
      planName: 'Basic',
      user_id: userId,
      paymentStatus: "Pending",
    };
    console.log('userData',userData)
    const responseSubscription = await ApiHelper.post(
      API.subscriptionPlan,
      userData
    );
    console.log("responseSubscription", responseSubscription);
    navigate(`/talent-signup-files-details?userId=${userId}`);
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
  const [htmlContent,setHtmlContent] = useState('')
  const [checkout, setCheckout] = useState(false);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState("");
  const [selectedPaymentPeriod, setSelectedPaymentPeriod] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [paymentOptions, setPaymentOption] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [pathFrom, setPathFrom] = useState("");

  const handleRadioChange = (type, id, planname) => (event) => {
    setPlan(id);
    setSelectedPaymentPlan(planname);
    setSelectedPaymentPeriod(type);
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

  const choosePlan = async (index, item, from) => {
    console.log("item", item);
    console.log("index", index);
    if (index == 0) {
      editKids();
    } else {
      setPathFrom(from);
      console.log("selectedPlan", `annual-${selectedPlan}`);
      if (from == "giftsubscription") {
        console.log('inside from ')
        setGiftSub(true);
        localStorage.setItem("giftsubscription", true);
      } else {
        console.log('else from00')
        setGiftSub(false);
        localStorage.setItem("giftsubscription", false);
      }
      const selectedPlanItem =
        item.plan_type_annual.find(
          (plan) => `annual-${item._id}` === selectedPlan
        ) ||
        item.plan_type_monthly.find(
          (plan) => `monthly-${item._id}` === selectedPlan
        );
      const currency = selectedPlanItem ? selectedPlanItem.currency : "Unknown";
      const price = selectedPlanItem ? selectedPlanItem.amount : "N/A";
      const afterDiscount = selectedPlanItem
        ? selectedPlanItem.afterDiscount
        : "N/A";

      const regex = /^(\w+)\s([\d.,]+)\/(\w+)$/;
      const match = price.match(regex);
      if (match) {
        let amount;
        if (afterDiscount.includes("per year")) {
          const match = afterDiscount.match(/(\w+)\s([\d.,]+)\sper\syear/);
          if (match) {
            amount = parseFloat(match[2]); // Extracts the numeric part
          }
        } else {
          amount = parseFloat(match[2]); // 29.99
        }
        const currency = match[1].toUpperCase(); // "USD"
        const duration = match[3]; // "month"
        setSelectedCurrency(currency);
        setSelectedAmount(amount);
        localStorage.setItem("selectedPaymentPeriod", selectedPaymentPeriod);
        localStorage.setItem("selectedPaymentPlan", selectedPaymentPlan);
        setPaymentOption(true);
      } else {
        console.error("Price string format is incorrect");
      }
    }

    // const type = `https://brandsandtalent.com/talent-signup-files-details?userId=${userId}`
    // handlePayment(amount, currency, type)
    // /api/pricing/create-payment
    // /check-transaction
    // handlePayment(amount, currency)

    // const formData = {
    // };
    // setIsLoading(true);
    // await ApiHelper.post(`${API.updateAdults}${queryString}`, formData)
    //   .then((resData) => {
    //     if (resData.data.status === true) {
    //       setIsLoading(false);
    //       setMessage("Updated Successfully!");
    //       setOpenPopUp(true);
    //       setTimeout(function () {
    //         setOpenPopUp(false);
    //         navigate(`/adult-signup-files-details?${queryString}`);
    //       }, 1000);
    //     } else {
    //     }
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //   });
  };
  const goBack = async () => {
    navigate(
      `/talent-social-media-connections?userId=${userId}&userEmail=${userEmail}`
    );
  };

  const handleFormSubmit = (dataObject, hash) => {
    setAbaFormData({ ...dataObject, hash });
    setTimeout(() => {
      document.getElementById("checkout_button").click();
    }, 100);
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
        <form
        id="aba_merchant_request"
        target="aba_webservice"
        method="POST"
        action="https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase"
      >
        <input type="hidden" name="merchant_id" value={abaFormData.merchant_id || ""} />
        <input type="hidden" name="tran_id" value={abaFormData.tran_id || ""} />
        <input type="hidden" name="amount" value={abaFormData.amount || ""} />
        <input type="hidden" name="email" value={abaFormData.email || ""} />
        <input type="hidden" name="payment_option" value={abaFormData.payment_option || ""} />
        <input type="hidden" name="req_time" value={abaFormData.req_time || ""} />
        <input type="hidden" name="continue_success_url" value={abaFormData.continue_success_url || ""} />
        <input type="hidden" name="return_params" value={abaFormData.return_params || ""} />
        <input type="hidden" name="hash" value={abaFormData.hash || ""} />
        <button type="button" id="checkout_button" style={{ opacity: "0", height: "1px", width: "1px", position: "absolute" }}>
          Pay Now
        </button>
      </form>
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
                                onClick={() => choosePlan(index, item, "plan")}
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
            type="button"
            className="step-continue"
            onClick={(e) => {
              editKids();
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
                                  onClick={() =>
                                    choosePlan(
                                      index + 1,
                                      item,
                                      "giftsubscription"
                                    )
                                  } // Adjust the index for the chosen plan
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
          onConfirm={handleFormSubmit}
          selectedCurrency={selectedCurrency}
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
          setSelectedPaymentOption={setSelectedPaymentOption}
          setPaymentOption={setPaymentOption}
          selectedPaymentPlan={selectedPaymentPlan}
          setAppliedCouponCode={setAppliedCouponCode}
          selectedPaymentPeriod={selectedPaymentPeriod}
          giftSub={giftSub}
          senderName={senderName}
          email={email}
          recieversFirstName={recieversFirstName}
          recieverEmail={recieverEmail}
          enquiry={enquiry}
          appliedCouponCode={appliedCouponCode}
          success_url={`https://brandsandtalent.com/talent-signup-files-details?userId=${userId}`}
        />
      )}
      {checkout && (
        <CheckoutComponent
          responseUrl={responseurl}
          setCheckout={setCheckout}
          htmlContent={htmlContent}
        />
      )}
      {loading ? <Loader /> : <div></div>}
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default KidsFormTwo;
