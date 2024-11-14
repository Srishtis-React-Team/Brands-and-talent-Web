import React, { useEffect, useState, useRef } from "react";
import "../assets/css/pricing.css";
import "../assets/css/forms/kidsformthree.css";
import "../assets/css/forms/kidsform-one.css";
import "../assets/css/forms/login.css";
import "../assets/css/dashboard.css";
import "../assets/css/register.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
import { useLocation } from "react-router-dom";
import CurrentUser from "../CurrentUser.js";
import MuiPhoneNumber from "material-ui-phone-number";
import {
  parsePhoneNumber,
  isValidPhoneNumber,
  getNumberType,
  validatePhoneNumberLength,
} from "libphonenumber-js";
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
import PaymentOptions from "./PaymentOptions.js";
import Loader from "./Loader.js";
// import { createPayment, checkTransactionStatus } from '../config/paymentGateway.js';
import { useTheme, useMediaQuery } from "@mui/material";
import "material-icons/iconfont/material-icons.css";

const Pricing = ({
  from,
  setSelectedPaymentStatus,
  setIsPaymentClicked,
  userType,
  receivedData
}) => {
  const { currentUserId, currentUserImage, currentUserType, avatarImage } =
    CurrentUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const brand_url = `https://brandsandtalent.com/client/${location?.state?.data?.publicUrl?.replace(
    /\s+/g,
    ""
  )}`;
  useEffect(() => {
    const data = localStorage.getItem("reloades")

    // Check if the page has already been reloaded
    if (!data) {
      localStorage.setItem("reloades", "true"); // Set flag in localStorage
      window.location.reload();
    }

    // Clear the flag when the component unmounts
    return () => {
      localStorage.removeItem("reloades");
    };
  }, []);
  // const [receivedData, setReceivedData] = useState(null);
  // useEffect(() => {
  //   if (location.state && location.state.data) {
  //     setReceivedData(location.state.data);
  //   }
  // }, [location.state]);
  // useEffect(() => {
  // }, [receivedData]);

  const paramsValues = window.location.search;

  const urlParams = new URLSearchParams(paramsValues);

  const signupUserId = urlParams.get("userId");

  const [userId, setUserId] = useState(null);

  const url = window.location.href;
  const queryString = url.split("?")[1];


  const handleClickOpen = () => {
    if (currentUserType == "talent") {
      if (talentData?.planName != "Basic") {
        setOpen(true);
      } else {
        setMessage("Please upgrade to pro plan to send gift subscription");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsPlanForm(false);
    setIsGiftPayment(false);
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
  const [isPlanForm, setIsPlanForm] = useState(false);
  const [showBtn, setShowBtn] = useState(true);
  const [isGiftPayment, setIsGiftPayment] = useState(false);
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
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedType, setSelectedType] = useState("annual");
  const [checkout, setCheckout] = useState(false);
  const [responseurl, setResponseUrl] = useState("");
  const [paymentOptions, setPaymentOption] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [paymentFrom, setPaymentFrom] = useState("giftsubscription");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState("");
  const [selectedPaymentPeriod, setSelectedPaymentPeriod] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [giftMessageError, setGiftMessageError] = useState("");
  const [email, setEmail] = useState("");
  const [recieversFirstName, setRecieversFirstName] = useState("");
  const [recieversLastName, setRecieversLastName] = useState("");
  const [recieversAddress, setRecieversAddress] = useState("");
  const [enquiry, setEnquiry] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [recieversNameError, setRecieversNameError] = useState(false);
  const [enquiryError, setEnquiryError] = useState(false);
  const [recieversLastNameError, setRecieversLastNameError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [mobileNumError, setMobileNumError] = useState(false);
  const [mobileValidationError, setMobileValidationError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [giftSub, setGiftSub] = useState(false);
  const [pathFrom, setPathFrom] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState("");
  const [success_url, setSuccess_url] = useState(``);
  const [giftError, setGiftError] = useState(`(Please fill out the form below to gift a subscription to someone special and support their creative journey).`);


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

  const [message, setMessage] = useState("");
  const greenTick = require("../assets/icons/greenTick.png");
  const [pricing, setPricing] = useState("");
  const [isBillingForm, setIsBillingForm] = useState(true);
  const [abaFormData, setAbaFormData] = useState({});
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

  const [activePlan,setActivePlan] = useState('')
  const [activePeriod,setActivePeriod] = useState('')

  useEffect(()=>{
    fetchPaymentDetails()
  },[])

  const fetchPaymentDetails = async () => {
    const userId = localStorage.getItem("currentUser");
    console.log('userId---------',userId)
    const obj = { 
      user_id: userId,
    };
    const paymentDetailsData = await ApiHelper.post(
      "https://brandsandtalent.com/api/users/fetchPaymentDetails",
      obj
    );
    console.log('paymentDetailsData',paymentDetailsData)
    let activatedPlan;
    let activatedPeriod = paymentDetailsData?.data?.data?.subscriptionPlan;
    if(paymentDetailsData?.data?.data?.planName == 'Pro'){
      activatedPlan = 'Pro (Popular)'
    }else{
      activatedPlan = paymentDetailsData?.data?.data?.planName;
    }
    setActivePlan(activatedPlan)
    setActivePeriod(activatedPeriod)
  };

  const [isChecked, setIsChecked] = useState(false);
  

  useEffect(() => {
    if (userType == "adults") {
      getPricingList();
    } else if (userType == "brands") {
      getBrandsPricingList();
    }
  }, [userType]);

  useEffect(() => {
    if (from != "signup") {
      if (isChecked) {
        getPricingList();
      } else {
        getBrandsPricingList();
      }
    }
  }, [isChecked]);

  const handleToggle = (event) => {
    setIsChecked(event.target.checked);
  };


  useEffect(() => { }, [comment]);

  const getPricingList = async () => {
    await ApiHelper.get(API.getPricingList)
      .then((resData) => {
        if (resData) {
          setPricingList(resData.data.data);
        }
      })
      .catch((err) => { });
  };

  const getBrandsPricingList = async () => {
    await ApiHelper.get(API.brandsPricingList)
      .then((resData) => {
        if (resData) {
          setPricingList(resData.data.data);
        }
      })
      .catch((err) => { });
  };

  const editKids = async () => {
    const userId = localStorage.getItem("currentUser");
    if (userType == 'adults') {
      const userData = {
        planName: 'Basic',
        user_id: userId,
        paymentStatus: "Pending",
      };
      const responseSubscription = await ApiHelper.post(
        API.subscriptionPlan,
        userData
      );
      navigate(`/adult-signup-files-details?${userId}`);
      // navigate(`/client/${receivedData?.publicUrl.replace(/\s+/g, "")}`, {
      //   state: { data: receivedData },
      // });
    } else {
      const userData = {
        planName: 'Basic',
        user_id: userId,
        paymentStatus: "Pending",
      };
      const responseSubscription = await ApiHelper.post(
        API.subscriptionPlan,
        userData
      );
      navigate(`/client/${receivedData?.publicUrl.replace(/\s+/g, "")}`, {
        state: { data: receivedData },
      });
    }
    // if (currentPath == "/pricing") {
    //   navigate(``);
    // } else {
    //   const userData = {
    //     planName: 'Basic',
    //     user_id: userId,
    //     paymentStatus: "Pending",
    //   };
    //   const responseSubscription = await ApiHelper.post(
    //     API.subscriptionPlan,
    //     userData
    //   );
    //   navigate(`/client/${receivedData?.publicUrl.replace(/\s+/g, "")}`, {
    //     state: { data: receivedData },
    //   });
    // }
  };

  const choosePlan = async (index, item, from) => {
    if (index == 0) {
      editKids();
    } else {
      setPathFrom(from);
      if (from == "giftsubscription") {
        setGiftSub(true);
        localStorage.setItem("giftsubscription", true);
      } else {
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
        // const type = 'https://brandsandtalent.com/create-jobs'
        localStorage.setItem("selectedPaymentPeriod", selectedPaymentPeriod);
        localStorage.setItem("selectedPaymentPlan", selectedPaymentPlan);
        setPaymentFrom(from);
        setPaymentOption(true);
      } else {
        console.error("Price string format is incorrect");
      }
    }
  };

  const handleSubmit = async () => {
    setShowBtn(false);
    if (isPlanForm === false) {
      if (!senderName) setSenderNameError(true);
      if (!email) setEmailError(true);
      if (!recieverEmail) setRecieverEmailError(true);
      if (!recieversFirstName) setRecieversNameError(true);
      if (senderName && email && recieverEmail && recieversFirstName) {
        setIsPlanForm(true);
      } else {
        setMessage("Kindly complete all mandatory fields");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      }
    } else if (isGiftPayment === false) {
      setIsGiftPayment(true);
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

  // const handleRecieverEmailChange = (e) => {
  //   setRecieverEmailError(false);
  //   setGiftRecieverEmailError(false);
  //   const email = e.target.value;
  //   setRecieverEmail(e.target.value);
  //   setIsValidRecieverEmail(emailRegex.test(email));
  // };

  useEffect(() => {
    if (userType == "adults") {
      setSuccess_url(
        `https://brandsandtalent.com/adult-signup-files-details?${queryString}`
      );
    } else if (userType == "brands") {
      setSuccess_url(brand_url);
    } else {
      setSuccess_url(`https://brandsandtalent.com/talent-home`);
    }
  }, []);

  const modalRef = useRef(null);

  const sendGiftSubscription = async () => {
    // if (senderName == "") {
    //   setSenderNameError(true);
    // }
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
  const [talentData, setTalentData] = useState();
  const [brandData, setBrandData] = useState();

  const handleCheckout = () => {
    if (window.AbaPaywayLoaded && window.AbaPayway) {
      window.AbaPayway.checkout();
    } else {
      console.error("PayWay checkout script not loaded");
    }
  };

  useEffect(() => {
    if (currentUserId) {
      if (currentUserType == "talent") {
        getTalentById();
      } else if (currentUserType == "brand") {
        getBrand();
      }
    }
  }, [currentUserId, currentUserType]);

  const getTalentById = async () => {
    await ApiHelper.post(`${API.getTalentById}${currentUserId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setTalentData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => { });
  };

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${currentUserId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => { });
  };

  const handleFormSubmit = (dataObject, hash) => {
    setAbaFormData({ ...dataObject, hash });
    setTimeout(() => {
      document.getElementById("checkout_button").click();
    }, 100);
  };

  return (
    <>
      <Header />
      {from != "signup" && (
        <>
          <section className="topSpace">
            <div className="popular-header">
              <div className="container">
                <div className="header-title">Pricing</div>
              </div>
            </div>
          </section>
          <div className="select-plan-main ">
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
        </>
      )}
      <form id="aba_merchant_request" target="aba_webservice" method="POST" action="https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase"
      >
        <input
          type="hidden"
          name="merchant_id"
          value={abaFormData.merchant_id || ""}
        />
        <input type="hidden" name="tran_id" value={abaFormData.tran_id || ""} />
        <input type="hidden" name="amount" value={abaFormData.amount || ""} />
        <input type="hidden" name="email" value={abaFormData.email || ""} />
        <input type="hidden" name="payment_option" value={abaFormData.payment_option || ""}/>
        <input type="hidden" name="req_time" value={abaFormData.req_time || ""}/>
        <input type="hidden" name="continue_success_url" value={abaFormData.continue_success_url || ""}/>
        <input type="hidden" name="return_params" value={abaFormData.return_params || ""} />
        <input type="hidden" name="hash" value={abaFormData.hash || ""} />
        <button type="button" id="checkout_button" style={{ opacity: "0", height: "1px", width: "1px", position: "absolute" }}>
          Pay Now
        </button>
      </form>

      <div
        className="plan-main"
        style={{
          marginTop: from === "signup" ? "100px" : "",
          marginBottom: from === "signup" ? "100px" : "",
        }}
      >
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
          {from != "signup" && (
            <>
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
            </>
          )}
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
        {console.log('activePlan',activePlan)}

        {item.plan_type_annual.length >= 1 && (
          <>
            <div className="annual-main-wrapper">
              {console.log('item.plan_type_annual',item.planname)}
              <div className="annual-wrapper">
                <input
                  type="radio"
                  name={`annual-${item._id}`}
                  id={`annual-${item._id}`}
                  checked={
                    selectedPlan === `annual-${item._id}`
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
                  disabled={
                    item.planname === activePlan && activePeriod === "annual"
                  }
                />
                <label
                  htmlFor={`annual-${item._id}`}
                  className={`annual ${
                    item.planname === activePlan && activePeriod === "annual"
                      ? "checked-label"
                      : ""
                  }`}
                >
                  {item.period}
                  {item.planname === activePlan && activePeriod === "annual" && (
                    <i className="bi bi-check-circle-fill active-icon"></i>
                  )}
                </label>
              </div>
              <div className="per-value">
                {item.annualTotalAmount}
              </div>
            </div>

            {item.plan_type_annual.map((plan, index) => (
              <>
                <div key={index} className="plan-amounts">
                  <div className="per-value">
                    {plan.afterDiscount}
                  </div>
                </div>
                <div className="border-bottom"></div>
              </>
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
                  disabled={
                    item.planname === activePlan && activePeriod === "monthly"
                  }
                />
                <label
                  htmlFor={`monthly-${item._id}`}
                  className={`monthly ${
                    item.planname === activePlan && activePeriod === "monthly"
                      ? "checked-label"
                      : ""
                  }`}
                >
                  Monthly
                  {item.planname === activePlan && activePeriod === "monthly" && (
                    <i className="bi bi-check-circle-fill active-icon"></i>
                  )}
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
        onClick={() => choosePlan(index, item, "plan")}
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
      {from != "signup" && (
        <>
          <Footer />
        </>
      )}
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
            },
            style: {
              width: isPlanForm
                ? isMobile
                  ? "90vw"
                  : "60vw" // If isPlanForm is true, always 90vw
                : "60vw", // If isPlanForm is false, always 60vw regardless of mobile or desktop
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
              {giftError}
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
                      className={`form-control ${!isValidEmail ? "is-invalid" : "form-control"
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
                      className={`form-control ${!isRecieverValidEmail ? "is-invalid" : "form-control"
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
                <div className="plan-main">
                  <div className="container">
                    {pricingList.length > 0 && (
                      <div className="plans-section">
                        <div className="row">
                          {pricingList.slice(1).map((item, index) => (
                            <div key={item._id} className="col-md-6">
                              <div
                                className={
                                  index === 0
                                    ? "plans-wrapper pro-plans" // index 0 here corresponds to the original index 1
                                    : index === 1
                                      ? "plans-wrapper premium-plans" // index 1 here corresponds to the original index 2
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
            {isGiftPayment === true && (
              <>
                <div>
                  <PaymentOptions
                  onConfirm={handleFormSubmit}
                    paymentFrom={paymentFrom}
                    selectedCurrency={selectedCurrency}
                    selectedAmount={selectedAmount}
                    setSelectedAmount={setSelectedAmount}
                    setSelectedPaymentOption={setSelectedPaymentOption}
                    setPaymentOption={setPaymentOption}
                    selectedPaymentPlan={selectedPaymentPlan}
                    selectedPaymentPeriod={selectedPaymentPeriod}
                    giftSub={giftSub}
                    senderName={senderName}
                    email={email}
                    recieversFirstName={recieversFirstName}
                    recieverEmail={recieverEmail}
                    appliedCouponCode={appliedCouponCode}
                    success_url={success_url}
                    setGiftError={setGiftError}
                  />
                </div>
              </>
            )}
          </DialogContent>
          <DialogActions>
            {isPlanForm == false && (
              <>
                <button
                  type="button"
                  className="btn gift-payment-btn"
                  onClick={handleSubmit}
                >
                  Next
                </button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </React.Fragment>
      {paymentOptions && (
        <PaymentOptions
          onConfirm={handleFormSubmit}
          paymentFrom={paymentFrom}
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
          success_url={success_url}
        />
      )}

      {checkout && (
        <CheckoutComponent
          responseUrl={responseurl}
          setCheckout={setCheckout}
        />
      )}
      {/* {isLoading ? "Loading..." : "Continue"} */}
      {loading ? <Loader /> : <div></div>}
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Pricing;
