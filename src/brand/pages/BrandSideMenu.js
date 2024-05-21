import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/brand-dashboard.scss";
import "../../assets/css/talentHeader.scss";
import { NavLink } from "react-router-dom";
import { Link, useLocation, useHistory } from "react-router-dom";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";

const BrandSideMenu = ({ onChildClick }) => {
  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     const confirmationMessage =
  //       "You have unsaved changes. Are you sure you want to leave?";
  //     e.returnValue = confirmationMessage;
  //     return confirmationMessage;
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

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

  const setMenu = (e) => {
    console.log(e, "setMenu setMenu");
    if (e === "create-job") {
      setCreateJob(true);
    } else {
      setCreateJob(false);
    }
    if (e === "view-dashboard") {
      setViewDashboard(true);
    } else {
      setViewDashboard(false);
    }
    if (e === "my-jobs") {
      setMyJobs(true);
    } else {
      setMyJobs(false);
    }
    if (e === "view-talents") {
      setViewTalents(true);
    } else {
      setViewTalents(false);
    }
    if (e === "view-favorites") {
      setViewFavorites(true);
    } else {
      setViewFavorites(false);
    }
    if (e === "view-help") {
      setViewHelp(true);
    } else {
      setViewHelp(false);
    }
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

  useEffect(() => {
    console.log(createJob, "createJobStatus setMenu");
  }, [createJob]);

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

  useEffect(() => {
    console.log(isSmallScreen, "isSmallScreen");
  }, [isSmallScreen]);

  const handleClick = () => {
    if (typeof onChildClick === "function" && isSmallScreen) {
      onChildClick();
    }
  };

  return (
    <>
      <nav className="brand-sidebar-container">
        <div className="brand-profile-not-sidemenu">
          <div className="profImg">
            <img
              className="profile-img"
              src={`${API.userFilePath}${brandData?.logo[0]?.fileData}`}
              alt=""
            />
          </div>
        </div>
        <div className="talent-profile">
          <div className="talent-data-wrapper">
            <div className="profImg">
              <img
                className="profile-img"
                src={`${API.userFilePath}${brandData?.logo[0]?.fileData}`}
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
              Plan : <span>Basic</span>
            </div>

            <div className="talent-plan-name">
              campaigns : <span>{jobCountNumber && <>{jobCountNumber}</>}</span>
            </div>
          </div>
          <div className="upgrade-btn">Upgrade Now</div>
        </div>

        <div className="sidenavWraper scroll">
          {/* <Link
              to="/create-jobs"
              className={
                location.pathname === "/create-jobs"
                  ? "sidemenu-active mt-2"
                  : "brand-menu-wrapper mt-2"
              }
              onClick={() => handleClick()}
            >
              <i className="bi bi-plus-square-fill "
              ></i>
              <div className="brand-menu-text">Create Gig/Job</div>
            </Link> */}

          <Link
            to="/brand-dashboard"
            className={
              location.pathname === "/brand-dashboard"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-house-door icons"></i>
            <div className="brand-menu-text">Home</div>
          </Link>

          <Link
            to="/create-jobs"
            className={
              location.pathname === "/create-jobs"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-person-plus icons"></i>
            <div className="brand-menu-text">Create Jobs</div>
          </Link>

          <Link
            className={
              location.pathname === "/talent"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-person icons"></i>
            <div className="brand-menu-text">Edit Profile</div>
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
            <i className="bi bi-person-workspace icons"></i>
            <div className="brand-menu-text">Applicants</div>
          </Link>

          <Link
            to="/find-talents"
            className={
              location.pathname === "/find-talents"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-person-check icons"></i>
            <div className="brand-menu-text">Find Talent</div>
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
            <div className="brand-menu-text">Favourite Talent</div>
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
            to="/talent"
            className={
              location.pathname === "/talent"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-chat icons"></i>
            <div className="brand-menu-text">Messages</div>
          </Link>

          <Link
            to="/talent"
            className={
              location.pathname === "/talent"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-gear icons"></i>
            <div className="brand-menu-text">Settings</div>
          </Link>

          {/* <Link
              to="/find-talents"
              className={
                location.pathname === "/find-talents"
                  ? "sidemenu-active mt-2"
                  : "brand-menu-wrapper mt-2"
              }
            >
              <i className="bi bi-people-fill"></i>
              <div className="brand-menu-text">Invite To Apply</div>
            </Link> */}

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
