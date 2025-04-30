import React, { useEffect, useState, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
import PopUp from "../components/PopUp.js";
import "../assets/css/talent-dashboard.css";
import TalentSideMenu from "../layout/TalentSideMenu.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CurrentUser from "../CurrentUser.js";
const TalentHome = () => {
  const [talentId, setTalentId] = useState(null);
  const [notificationList, setNotifications] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [modalData, setModalData] = useState(null);
  const doitnow = require("../assets/images/doitnow.png");
  const [isFilled, setIsFilled] = useState(true);
  const [talentData, setTalentData] = useState();
  const { currentUserId, currentUserImage, currentUserType, avatarImage } =
    CurrentUser();
  useEffect(() => {
    setTimeout(function () {
      setTalentId(localStorage.getItem("userId"));
    }, 1000);

    if (talentId) {
      getTalentNotification();
      getTalentById();
    }
  }, [talentId]);

  useEffect(() => {
    checkTransaction();
  }, []);

  const getTalentById = async () => {
    await ApiHelper.post(`${API.getTalentById}${talentId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setTalentData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {});
  };

  const checkTransaction = async () => {
    const paymenttrans_id = localStorage.getItem("paymenttrans_id");
    const selectedPaymentPeriod = localStorage.getItem("selectedPaymentPeriod");
    const selectedPaymentPlan = localStorage.getItem("selectedPaymentPlan");

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
          }
        }
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const getTalentNotification = async () => {
    await ApiHelper.get(`${API.getTalentNotification}${talentId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          setNotifications(resData.data.data);
        }
      })
      .catch((err) => {});
  };
  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {}, [notificationList]);

  const navigate = useNavigate();

  const handleNavigation = () => {
    const data = {
      isJobAlert: true,
    };
    navigate("/talent-notification", { state: data });
    // window.open(
    //   "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
    //   "_blank"
    // );
  };
  const url = window.location.href;

  const [userId, setUserId] = useState(null);
  const queryString = url.split("?")[1];

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    if (userId) {
      checkProfileStatus();
    }
  }, [userId]);

  const checkProfileStatus = async () => {
    await ApiHelper.post(`${API.checkProfileStatus}${userId}`)
      .then((resData) => {
        if (resData.data.profileStatus === false) {
          openDoItNowModal();
        }
      })
      .catch((err) => {});
  };

  const doItNowRef = useRef(null);
  // const openDoItNowModal = () => {
  //   const modal = new window.bootstrap.Modal(doItNowRef.current);
  //   modal.show();
  // };

  const openDoItNowModal = () => {
    const modal = new window.bootstrap.Modal(doItNowRef.current, {
      backdrop: "static", // Prevent closing when clicking outside the modal
      keyboard: false, // Optional: Prevent closing via the Esc key
    });
    modal.show();
  };

  const closeDoItNowModal = () => {
    const modal = new window.bootstrap.Modal(doItNowRef.current);
    modal.hide();
  };

  const openSignup = async () => {
    const formData = {
      image: "",
    };
    await ApiHelper.post(`${API.updateAdults}${queryString}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
        } else {
        }
      })
      .catch((err) => {});

    closeDoItNowModal();
    setTimeout(() => {
      navigate(`/talent-signup-basic-details`);
    }, 800);
  };

  const handleEditNavigation = () => {
    if (talentData) {
      if (talentData?.accountBlock == false) {
        navigate(`/edit-talent-profile?${talentData?._id}`);
        // if (talentData?.adminApproved === true) {
        //   navigate(`/edit-talent-profile?${talentData?._id}`);
        // } else {
        //   setMessage(
        //     "After your verification is approved, you can update your profile"
        //   );
        //   setOpenPopUp(true);
        //   setTimeout(() => {
        //     setOpenPopUp(false);
        //   }, 2000);
        // }
      } else if (talentData?.accountBlock == true) {
        setMessage("Please upgrade your plan to access your profile");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate(`/pricing`);
        }, 3000);
      }
    }
  };

  const sampleProfileNavigate = () => {
    window.open("https://brandsandtalent.com/talent/Grace", "_blank");
  };

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
        }`}
      >
        <TalentSideMenu />
      </div>

      <main
        style={{ height: "100%" }}
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div className="brand-content-main">
          <div className="brand-headings-wrapper mobilevw">
            <div className="create-job-title w-50">
              Welcome To Brands & Talent
            </div>
            <div className="sample-profile" onClick={sampleProfileNavigate}>
              View Sample Profile
            </div>
          </div>

          <div className="mobile-profile-details">
            <div className="talent-profile">
              <div className="talent-data-wrapper">
                <div className="profImg">
                  {talentData?.image?.fileData && (
                    <>
                      <img
                        className="profile-img"
                        src={`${API.userFilePath}${talentData?.image?.fileData}`}
                        alt=""
                      />
                    </>
                  )}

                  {!talentData?.image?.fileData && (
                    <>
                      <img
                        className="profile-img"
                        src={`${avatarImage}`}
                        alt=""
                      />
                    </>
                  )}
                </div>
                <div className="talent-details">
                  <div className="talent-name">
                    {talentData?.preferredChildFirstname}{" "}
                    {talentData?.preferredChildLastName}
                  </div>
                  <div className="talent-category">Talent</div>
                </div>
              </div>
              <div className="talents-plan-info">
                <div className="talent-plan-name">
                  Plan : <span>{talentData?.planName}</span>
                </div>

                <div className="talent-plan-name">
                  {/* campaigns : <span>{jobCountNumber && <>{jobCountNumber}</>}</span> */}
                </div>
              </div>

              {talentData?.planName !== "Premium" && (
                <Link to="/pricing">
                  <div className="upgrade-btn">Upgrade Now</div>
                </Link>
              )}
            </div>
          </div>

          <div className="home-cards mt-1 row pad8">
            <div className="col-md-4 col-lg-3 pad8">
              <div>
                <div
                  className="home-cards-wrapper hovBx"
                  onClick={handleEditNavigation}
                >
                  <div className="home-card-content">
                    <i className="bi bi-person icons home-card-icons"></i>
                    <div className="home-cards-names">
                      Create / Update Profile
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-3 pad8">
              <Link to="/talent-dashboard">
                <div className="home-cards-wrapper hovBx">
                  <div className="home-card-content">
                    <i className="bi bi-search icons home-card-icons"></i>
                    <div className="home-cards-names">Browse Jobs</div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4 col-lg-3 pad8">
              <Link to="/contact-us">
                <div className="home-cards-wrapper hovBx">
                  <div className="home-card-content">
                    <i className="bi bi-info-circle-fill  home-card-icons"></i>
                    <div className="home-cards-names">Help And Support</div>
                  </div>
                </div>
              </Link>
            </div>
            <div
              className="col-md-4 col-lg-3 pad8"
              onClick={() => handleNavigation()}
            >
              <Link>
                <div className="home-cards-wrapper hovBx">
                  <div className="home-card-content">
                    <i className="bi bi-briefcase-fill home-card-icons"></i>
                    <div className="home-cards-names">Create Job Alert</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div
        ref={doItNowRef}
        className="modal fade"
        id="verify_age"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-header">
              {/* <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
            </div>
            <div className="modal-body talent-popup-body pt-1">
              <div className="doitnow-main row">
                <div className="doit-one col-md-8">
                  <div className="talent-popup-title">
                    Welcome To Brands & Talent
                  </div>
                  <div className="talent-popup-enter">
                    Complete Your{" "}
                    <span className="talent-popup-span">Profile</span>
                  </div>
                  <div>
                    <div
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: isFilled ? "20%" : "0%",
                          backgroundColor: "#c2114b",
                          height: "8px",
                        }}
                      ></div>
                    </div>
                  </div>
                  {/* <div className="talent-popup-description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    repellat corporis corrupti aliquid laboriosam neque ratione
                    fuga. <br></br>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </div> */}
                </div>
                
                <div className="doit-two col-md-4 text-center">
                  <img className="img-fluid" src={doitnow} alt="" />
                </div>
                {/* aadedd */}
                <div className="sample-profile" onClick={sampleProfileNavigate}>
                 View Sample Profile
                </div>
                 {/* aadedd */}
              </div>
            </div>
            <div className="doitnow">
            
              <button
                className="doit-btn"
                onClick={() => {
                  openSignup();
                }}
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Create / Update Profile Now
              </button>

             
            </div>
          </div>
        </div>
      </div>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default TalentHome;
