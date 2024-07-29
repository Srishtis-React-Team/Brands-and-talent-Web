import React, { useEffect, useState, useRef } from "react";
import "../assets/css/pricing.css";
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

  const [message, setMessage] = useState("");
  const greenTick = require("../assets/icons/greenTick.png");
  const [pricing, setPricing] = useState("");

  useEffect(() => {
    getBrandsPricingList();
  }, []);
  useEffect(() => {
    console.log(comment, "comment");
  }, [comment]);
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

  const choosePlan = async (event) => {
    // setPricing(event.target.value);
    setIsLoading(true);
    await ApiHelper.post(API.payment)
      .then((resData) => {
        setIsLoading(false);

        console.log("getpayment", resData);
        // alert("sfsf");
        let stateObj = resData?.data?.data;
        // navigate("/qrcode-payment", { state: stateObj });
        // navigate("https://checkout-sandbox.payway.com.kh/api");
        window.location.href = "https://checkout-sandbox.payway.com.kh/api";
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err);
      });

    // window.location.href =
    //   "https://buymeacoffee.com/brandsandtalent";
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

  const handleSenderNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
      setSenderNameLetterError(false);
      setSenderName("");
    } else if (!onlyLettersRegex.test(value)) {
      setSenderNameLetterError(true);
    } else {
      setSenderName(value);
      console.log(value, "value handleSenderNameChange");
      setSenderNameLetterError(false);
    }
  };

  const handleSenderNameKeyPress = (e) => {
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setSenderNameLetterError(false);
    }
  };

  const handleRecieverNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
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
    // If the Backspace key is pressed and the input value is empty, clear the error
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
    console.log(formData, "formData giftSubscription");
    setIsLoading(true);
    await ApiHelper.post(API.giftMail, formData)
      .then((resData) => {
        setIsLoading(false);
        console.log(resData, "sendGiftSubscription");
        if (resData.data.status === true) {
          handleClose();
          setMessage("Gift Subscription Sent Successfully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 3000);
        } else if (resData.data.status === false) {
          setMessage("Error Occured!");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
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
            {/* <div className="header-menu">
              <div>Home</div>
              <div>Talent</div>
            </div> */}
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
              <span className="right-span">Brands /Clients</span>
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
      <Footer />

      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          <div className="gift-dialog-header">
            <DialogTitle>Gift Subscription</DialogTitle>
            <i className="bi bi-x-lg close-gift" onClick={handleClose}></i>
          </div>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText> */}
            <div className="search-filter-section">
              <div className="kids-form-row row ">
                <div className="kids-form-section col-md-12 mb-3">
                  <label className="form-label">
                    Your full name <span className="mandatory">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your full name"
                    onChange={(e) => {
                      handleSenderNameChange(e);
                      setSenderNameError(false);
                    }}
                    onKeyDown={handleSenderNameKeyPress}
                    value={senderName}
                  ></input>
                  {senderNameError && (
                    <div className="invalid-fields">
                      Please enter Your full name
                    </div>
                  )}
                </div>
                <div className="kids-form-section col-md-12 mb-3">
                  <label className="form-label">
                    Email <span className="mandatory">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      !isValidEmail ? "is-invalid" : "form-control"
                    }`}
                    onChange={handleSenderEmailChange}
                    placeholder="Enter E-mail"
                    value={senderEmail}
                  />
                  {!isValidEmail && (
                    <div className="invalid-feedback">
                      Please enter a valid E-mail address.
                    </div>
                  )}
                  {senderEmailError && (
                    <div className="invalid-fields">Please enter E-mail</div>
                  )}
                </div>
                <div className="kids-form-section col-md-12 mb-3">
                  <label className="form-label">
                    Gift receiver’s full name{" "}
                    <span className="mandatory">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Gift receiver’s full name"
                    onChange={(e) => {
                      handleRecieverNameChange(e);
                      setGiftRecieverNameError(false);
                    }}
                    onKeyDown={handleRecieverNameKeyPress}
                    value={giftRecieverName}
                  ></input>
                  {giftRecieverNameError && (
                    <div className="invalid-fields">
                      Please enter Gift receiver’s full name
                    </div>
                  )}
                </div>
                <div className="kids-form-section col-md-12 mb-3">
                  <label className="form-label">
                    Gift receiver’s email <span className="mandatory">*</span>
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      !isValidRecieverEmail ? "is-invalid" : "form-control"
                    }`}
                    onChange={handleRecieverEmailChange}
                    placeholder="Gift receiver’s email"
                    value={recieverEmail}
                  />
                  {!isValidRecieverEmail && (
                    <div className="invalid-feedback">
                      Please enter a valid E-mail address.
                    </div>
                  )}
                  {giftRecieverEmailError && (
                    <div className="invalid-fields">
                      Please enter Gift receiver’s email
                    </div>
                  )}
                </div>

                <div className="kids-form-section col-md-12 mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Comment<span className="mandatory">*</span>
                  </label>
                  <textarea
                    style={{ width: "100%" }}
                    className="form-control address-textarea"
                    id="exampleFormControlTextarea1"
                    value={comment}
                    rows="3"
                    onChange={(e) => {
                      setComment(e.target.value);
                      setCommentError(false);
                    }}
                  ></textarea>
                  {commentError && (
                    <div className="invalid-fields">Please enter Comment</div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose}>Cancel</Button> */}
            <button
              type="button"
              className="btn gift-payment-btn"
              onClick={sendGiftSubscription}
            >
              {isLoading ? "Loading..." : "Next"}
            </button>
          </DialogActions>
        </Dialog>
      </React.Fragment>

      {/* <div
        ref={modalRef}
        className="modal fade"
        id="giftSendModal"
        tabIndex="-1"
        aria-labelledby="giftSendModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg signupModal">
          <div className="modal-content ">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="search-filter-section">
                <div className="kids-form-row row mt-3">
                  <div className="kids-form-section col-md-12 mb-3">
                    <label className="form-label">Full name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full name"
                      onChange={(e) => {
                        handleSenderNameChange(e);
                      }}
                      onKeyDown={handleSenderNameKeyPress}
                      value={senderName}
                    ></input>
                  </div>
                  <div className="kids-form-section col-md-12 mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        !isValidEmail ? "is-invalid" : "form-control"
                      }`}
                      onChange={handleSenderEmailChange}
                      placeholder="Enter E-mail"
                      value={senderEmail}
                    />
                    {!isValidEmail && (
                      <div className="invalid-feedback">
                        Please enter a valid E-mail address.
                      </div>
                    )}
                    {senderEmailError && (
                      <div className="invalid-fields">Please enter E-mail</div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-12 mb-3">
                    <label className="form-label">Gift receiver’s name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Gift receiver’s name"
                      onChange={(e) => {
                        handleRecieverNameChange(e);
                      }}
                      onKeyDown={handleRecieverNameKeyPress}
                      value={giftRecieverName}
                    ></input>
                  </div>
                  <div className="kids-form-section col-md-12 mb-3">
                    <label className="form-label">Gift receiver’s email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        !isValidRecieverEmail ? "is-invalid" : "form-control"
                      }`}
                      onChange={handleRecieverEmailChange}
                      placeholder="Gift receiver’s email"
                      value={recieverEmail}
                    />
                    {!isValidRecieverEmail && (
                      <div className="invalid-feedback">
                        Please enter a valid E-mail address.
                      </div>
                    )}
                    {recieverEmailError && (
                      <div className="invalid-fields">Please enter E-mail</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn gift-payment-btn"
                onClick={sendGiftSubscription}
              >
                {isLoading ? "Loading..." : "Payment"}
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Pricing;
