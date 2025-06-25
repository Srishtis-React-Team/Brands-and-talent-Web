import React, { useState, useEffect, useRef } from "react";
import "../assets/css/brand-dashboard.css";
import "../assets/css/talentHeader.css";
import { NavLink } from "react-router-dom";
import { Link, useLocation, useHistory } from "react-router-dom";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import CurrentUser from "../CurrentUser";
import { useNavigate } from "react-router";
import PopUp from "../components/PopUp";
import UploadModal from "./UploadModal";

const TalentSideMenu = ({ myState }) => {
  const { currentUserId, currentUserImage, currentUserType, avatarImage } =
    CurrentUser();
  const navigate = useNavigate();

  const location = useLocation();
  const [talentData, setTalentData] = useState();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getTalentById();
  }, []);

  const getTalentById = async () => {
    await ApiHelper.post(
      `${API.getTalentById}${localStorage.getItem("userId")}`
    )
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setTalentData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {}, [talentData]);

  useEffect(() => {
    if (myState === true) {
      getTalentById();
    }
  }, [myState]);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (
        window.matchMedia("(min-width: 320px) and (max-width: 768px)").matches
      ) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    // Call handleResize initially to check the screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavigation = () => {
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
  };

  const handleMessages = async () => {
    const formData = {
      talentId: talentData?._id,
    };
    await ApiHelper.post(`${API.allowPermission}`, formData)
      .then((resData) => {
        if (resData?.data?.msg == "Yes") {
          navigate("/messages");
        } else if (resData?.data?.msg == "No") {
          if (talentData?.planName !== "Basic") {
            navigate("/messages");
          } else {
            setMessage(
              "To use this feature, please upgrade to a Pro or Premium membership plan."
            );
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
              navigate(`/pricing`);
            }, 3000);
          }
        }
      })
      .catch((err) => {});
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (resData) => {
    handleClose();
    getTalentById();
    if (resData.data.status === true) {
      setIsLoading(false);
      setMessage("Updated Successfully");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    } else if (resData.data.status === false) {
      setIsLoading(false);
      setMessage(resData.message);
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }
  };

  useEffect(() => {
    console.log(talentData?.isVerificationUpload, "talentData");
  }, [talentData]);
  return (
    <>
      <nav className="brand-sidebar-container">
        <div className="brand-profile-not-sidemenu">
          <div className="profImg">
            {talentData?.image && (
              <img
                className="profile-img"
                src={`${API.userFilePath}${talentData?.image?.fileData}`}
                alt=""
              />
            )}
            {!talentData?.image && (
              <img className="profile-img" src={avatarImage} alt="" />
            )}
          </div>
        </div>
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
                  <img className="profile-img" src={`${avatarImage}`} alt="" />
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
          {console.log("talentData",talentData)}

          {talentData?.isVerificationUpload === true && (
  <div className="talents-plan-info">
    {talentData?.idVerified === true? (  //talentData?.adminApproved === true && 
      // ✅ Show verified badge
      <div className="verification-badge" style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "18px", color: "green", marginRight: "8px" }}>✅</span>
        <span style={{ color: "green", fontWeight: "bold" }}>Verified</span>
      </div>
    ) : (
      // ➕ Show Add verification badge link with hover message if Basic
      <div
        className="upload-hyper"
        onClick={() => {
          if (talentData?.planName !== "Basic") {
            handleClickOpen();
          }
        }}
        style={{
          cursor: talentData?.planName === "Basic" ? "not-allowed" : "pointer",
          color: "#007bff",
          textDecoration: "underline",
        }}
        title={
          talentData?.planName === "Basic"
            ? "Kindly upgrade to Pro or Premium membership to display ✅ Verified badge"
            : ""
        }
      >
        Add verification badge
      </div>
    )}
  </div>
)}



          {/* {talentData?.isVerificationUpload === true && (
  <div className="talents-plan-info">
    {talentData?.adminApproved === true ? (
      // ✅ Show verified badge
      <div className="verification-badge" style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "18px", color: "green", marginRight: "8px" }}>✅</span>
        <span style={{ color: "green", fontWeight: "bold" }}>Verified</span>
      </div>
    ) : (
      // ➕ Show Add verification badge link
      <div
        className="upload-hyper"
        onClick={handleClickOpen}
        style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}
      >
        Add verification badge
      </div>
    )}
  </div>
)} */}


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

        <div className="sidenavWraper scroll">
          <Link
            to="/talent-home"
            className={
              location.pathname === "/talent-home"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-house-door icons"></i>
            <div className="brand-menu-text">Dashboard</div>
          </Link>

          {/* <Link
            to="https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG"
            target="_blank"
            className={
              location.pathname === "/talent-dashboard"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-suitcase-lg icons"></i>
            <div className="brand-menu-text">Browse Jobs</div>
          </Link> */}
          <Link
            to="/talent-dashboard"
            className={
              location.pathname === "/talent-dashboard"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-suitcase-lg icons"></i>
            <div className="brand-menu-text">Browse Jobs</div>
          </Link>

          {/* <Link
            to="https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG"
            target="_blank"
            className={
              location.pathname === "/talent-notification"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-bell icons"></i>
            <div className="brand-menu-text">Notification</div>
          </Link> */}

          <Link
            to="/talent-notification"
            className={
              location.pathname === "/talent-notification"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-bell icons"></i>
            <div className="brand-menu-text">Notification</div>
          </Link>

          {/* <Link
            to="https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG"
            target="_blank"
            className={
              location.pathname === "/message"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-chat icons"></i>
            <div className="brand-menu-text">Messages</div>
          </Link> */}
          <div
            onClick={handleMessages}
            className={
              location.pathname === "/messages"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-chat icons"></i>
            <div className="brand-menu-text">Messages</div>
          </div>

          <div
            onClick={handleNavigation}
            className={
              location.pathname === "/edit-talent-profile"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-person icons"></i>
            <div className="brand-menu-text">Edit Profile</div>
          </div>

          {/* <Link
            to="https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG"
            target="_blank"
            className={
              location.pathname === "/saved-jobs"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-heart icons"></i>
            <div className="brand-menu-text">Saved Jobs</div>
          </Link> */}
          <Link
            to="/saved-jobs"
            className={
              location.pathname === "/saved-jobs"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-heart icons"></i>
            <div className="brand-menu-text">Saved Jobs</div>
          </Link>

          {/* <Link
            to="https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG"
            target="_blank"
            className={
              location.pathname === "/applied-jobs"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-check-circle icons"></i>
            <div className="brand-menu-text">Applied Jobs</div>
          </Link> */}
          <Link
            to="/applied-jobs"
            className={
              location.pathname === "/applied-jobs"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-check-circle icons"></i>
            <div className="brand-menu-text">Applied Jobs</div>
          </Link>
          {/* <Link
            to="/message"
            className={
              location.pathname === "/message"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-chat-dots icons"></i>
            <div className="brand-menu-text">Messages</div>
          </Link> */}

          <Link
            to="/talent-settings"
            className={
              location.pathname === "/talent-settings"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-gear icons"></i>
            <div className="brand-menu-text">Settings</div>
          </Link>

          {/* <Link
            to="/pricing"
            className={
              location.pathname === "/pricing"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-tags-fill icons"></i>
            <div className="brand-menu-text">Pricing</div>
          </Link> */}
        </div>
      </nav>
      {openPopUp && <PopUp message={message} />}

      <UploadModal
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        talentData={talentData}
      />
    </>
  );
};

export default TalentSideMenu;
