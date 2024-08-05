import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/brand-dashboard.scss";
import "../../assets/css/talentHeader.scss";
import { Link, useLocation } from "react-router-dom";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";
import CurrentUser from "../../CurrentUser";

const postJob = require("../../assets/icons/postJob.png");
const postJobHv = require("../../assets/icons/postJob-h.png");

const BrandSideMenu = ({ onChildClick, myState }) => {
  const { currentUserType, avatarImage } = CurrentUser();

  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const girl1 = require("../../assets/images/girl1.png");
  const [createJob, setCreateJob] = useState(null);
  const [viewDashboard, setViewDashboard] = useState(true);
  const [myJobs, setMyJobs] = useState(null);
  const [viewTalents, setViewTalents] = useState(null);
  const [viewFavorites, setViewFavorites] = useState(null);
  const [viewHelp, setViewHelp] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [jobCountNumber, setJobCountNumber] = useState(null);

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
    console.log(brandId, "brandId");
    if (brandId) {
      getBrand();
      jobCount();
    }
  }, [brandId]);
  useEffect(() => {
    console.log(brandData, "brandData");
  }, [brandData]);

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const jobCount = async () => {
    await ApiHelper.post(`${API.jobCount}${brandId}`)
      .then((resData) => {
        if (resData) {
          console.log(resData.data.data[2].count, "countData");
          setJobCountNumber(resData.data.data[2].count);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(isSmallScreen, "isSmallScreen");
  }, [isSmallScreen]);

  useEffect(() => {
    if (myState === true) {
      getBrand();
    }
  }, [myState]);

  return (
    <>
      <nav className="brand-sidebar-container">
        <div className="brand-profile-not-sidemenu">
          <div className="profImg">
            <img
              className="profile-img"
              src={`${API.userFilePath}${brandData?.brandImage[0]?.fileData}`}
              alt=""
            />
          </div>
        </div>
        <div className="talent-profile">
          <div className="talent-data-wrapper">
            <div className="profImg">
              {!brandData?.brandImage[0] && (
                <img className="profile-img" src={avatarImage} alt="" />
              )}

              <img
                className="profile-img"
                src={`${API.userFilePath}${brandData?.brandImage[0]?.fileData}`}
                alt=""
              />
            </div>
            <div className="talent-details">
              <div className="talent-name">{brandData?.brandName}</div>
              <div className="talent-category">Brand</div>
            </div>
          </div>
          <div className="talents-plan-info">
            <div className="talent-plan-name">
              Plan : <span>{brandData?.planName}</span>
            </div>

            <div className="talent-plan-name">
              campaigns : <span>{jobCountNumber && <>{jobCountNumber}</>}</span>
            </div>
          </div>

          {brandData?.planName !== "Premium" && (
            <Link to="/pricing">
              <div className="upgrade-btn">Upgrade Now</div>
            </Link>
          )}
        </div>

        <div className="sidenavWraper scroll">
          <Link
            to={`/brand/${brandData?.publicUrl.replace(/\s+/g, "")}`}
            className={
              location.pathname ===
              `/brand/${brandData?.publicUrl.replace(/\s+/g, "")}`
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-house-door icons"></i>
            <div className="brand-menu-text">Dashboard</div>
          </Link>
          <Link
            to="/create-jobs"
            className={
              location.pathname === "/create-jobs"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <img src={postJob} className="iconMenu normal" alt="icon" />
            <img src={postJobHv} className="iconMenu hover" alt="icon" />

            <div className="brand-menu-text">Post a Job</div>
          </Link>

          <Link
            to="/find-talents"
            className={
              location.pathname === "/find-talents"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-send icons"></i>
            <div className="brand-menu-text">Invite To Apply</div>
          </Link>

          <Link
            to="/list-jobs"
            className={
              location.pathname === "/list-jobs"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-suitcase-lg icons"></i>
            <div className="brand-menu-text">My Jobs</div>
          </Link>

          <Link
            to="/applicants"
            className={
              location.pathname === "/applicants"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-people icons"></i>
            <div className="brand-menu-text">Applicants</div>
          </Link>

          <Link
            to="/favorite-talents"
            className={
              location.pathname === "/favorite-talents"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-heart icons"></i>
            <div className="brand-menu-text">Favourite Talents</div>
          </Link>

          <Link
            to="/brand-notification"
            className={
              location.pathname === "/brand-notification"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-bell icons"></i>
            <div className="brand-menu-text">Notification</div>
          </Link>

          <Link
            to="/message"
            className={
              location.pathname === "/message"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-chat icons"></i>
            <div className="brand-menu-text">Messages</div>
          </Link>

          <Link
            to="/edit-brand-profile"
            className={
              location.pathname === "/edit-brand-profile"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-person icons"></i>
            <div className="brand-menu-text">Edit Profile</div>
          </Link>

          <Link
            to="/brand-settings"
            className={
              location.pathname === "/brand-settings"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-gear icons"></i>
            <div className="brand-menu-text">Settings</div>
          </Link>

          {/* <Link
              to="/brand-help"
              className={
                location.pathname === "/brand-help"
                  ? "sidemenu-active mt-2"
                  : "brand-menu-wrapper mt-2"
              }
            >
              <i
               className="bi bi-info-circle-fill"
              ></i>
              <div className="brand-menu-text">Help</div>
            </Link> */}
        </div>
      </nav>
    </>
  );
};

export default BrandSideMenu;
