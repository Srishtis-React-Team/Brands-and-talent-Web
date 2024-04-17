import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/brand-dashboard.scss";
import "../../assets/css/talentHeader.scss";
import { NavLink } from "react-router-dom";
import { Link, useLocation, useHistory } from "react-router-dom";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";

const BrandSideMenu = ({ onButtonClick }) => {
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

  const handleClick = () => {
    const data = "Data from child"; // Data to be passed to the parent
    if (typeof onButtonClick === "function") {
      onButtonClick(data);
    }
  };

  return (
    <>
      <nav className="brand-sidebar-container">
        <div className="brand-profile-not-sidemenu">
          <img
            className="profile-img"
            src={`${API.userFilePath}${brandData?.logo[0]?.fileData}`}
            alt=""
          />
        </div>
        <div className="talent-profile">
          <div className="talent-data-wrapper">
            <div>
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

        <Link to="/create-jobs" className="brand-profile-not-sidemenu mt-5">
          <i
            className={
              location.pathname === "/create-jobs"
                ? "sidemenu-icons active-sidemenu-icons  bi bi-plus-square-fill mt-4"
                : "sidemenu-icons bi bi-plus-square-fill  mt-4"
            }
            onClick={(e) => {
              setMenu("create-job");
            }}
          ></i>
        </Link>

        <div onClick={handleClick}>
          <Link
            to="/create-jobs"
            className={
              location.pathname === "/create-jobs"
                ? "sidemenu-active mt-4"
                : "brand-menu-wrapper mt-4"
            }
          >
            <i
              style={{ paddingLeft: "15px" }}
              className="bi bi-plus-square-fill "
            ></i>
            <div className="brand-menu-text">Create Gig/Job</div>
          </Link>
        </div>

        <Link to="/brand-dashboard" className="brand-profile-not-sidemenu mt-5">
          <i
            className={
              location.pathname === "/brand-dashboard"
                ? "sidemenu-icons active-sidemenu-icons bi bi-speedometer mt-4"
                : "sidemenu-icons bi bi-speedometer mt-4"
            }
            onClick={(e) => {
              setMenu("view-dashboard");
            }}
          ></i>
        </Link>

        <Link
          to="/brand-dashboard"
          className={
            location.pathname === "/brand-dashboard"
              ? "sidemenu-active mt-4"
              : "brand-menu-wrapper mt-4"
          }
        >
          <i style={{ paddingLeft: "15px" }} className="bi bi-speedometer "></i>
          <div className="brand-menu-text">Dashboard</div>
        </Link>

        <Link to="/list-jobs" className="brand-profile-not-sidemenu mt-5">
          <i
            className={
              myJobs
                ? "sidemenu-icons active-sidemenu-icons bi bi-person-workspace mt-4"
                : "sidemenu-icons bi bi-person-workspace mt-4"
            }
            onClick={(e) => {
              setMenu("my-jobs");
            }}
          ></i>
        </Link>

        <Link
          to="/list-jobs"
          className={
            location.pathname === "/list-jobs"
              ? "sidemenu-active mt-4"
              : "brand-menu-wrapper mt-4"
          }
        >
          <i
            style={{ paddingLeft: "15px" }}
            className="bi bi-person-workspace "
          ></i>
          <div className="brand-menu-text">My Gigs/Jobs</div>
        </Link>

        <Link to="/find-talents" className="brand-profile-not-sidemenu mt-5">
          <i
            className={
              viewTalents
                ? "sidemenu-icons active-sidemenu-icons bi bi-people-fill mt-4"
                : "sidemenu-icons bi bi-people-fill mt-4"
            }
            onClick={(e) => {
              setMenu("view-talents");
            }}
          ></i>
        </Link>

        <Link
          to="/find-talents"
          className={
            location.pathname === "/find-talents"
              ? "sidemenu-active mt-4"
              : "brand-menu-wrapper mt-4"
          }
        >
          <i style={{ paddingLeft: "15px" }} className="bi bi-people-fill"></i>
          <div className="brand-menu-text">Find Talents</div>
        </Link>

        <Link
          to="/favorite-talents"
          className="brand-profile-not-sidemenu mt-5"
        >
          <i
            className={
              viewFavorites
                ? "sidemenu-icons active-sidemenu-icons bi bi-heart-fill mt-4"
                : "sidemenu-icons bi bi-heart-fill mt-4"
            }
            onClick={(e) => {
              setMenu("view-favorites");
            }}
          ></i>
        </Link>

        <Link
          to="/favorite-talents"
          className={
            location.pathname === "/favorite-talents"
              ? "sidemenu-active mt-4"
              : "brand-menu-wrapper mt-4"
          }
        >
          <i style={{ paddingLeft: "15px" }} className="bi bi-heart-fill"></i>
          <div className="brand-menu-text">Favorites</div>
        </Link>

        <Link to="/brand-help" className="brand-profile-not-sidemenu mt-5">
          <i
            className={
              viewHelp
                ? "sidemenu-icons active-sidemenu-icons bi  bi-info-circle-fill mt-4"
                : "sidemenu-icons bi-info-circle-fill mt-4"
            }
            onClick={(e) => {
              setMenu("view-help");
            }}
          ></i>
        </Link>

        <Link
          to="/brand-help"
          className={
            location.pathname === "/brand-help"
              ? "sidemenu-active mt-4"
              : "brand-menu-wrapper mt-4"
          }
        >
          <i
            style={{ paddingLeft: "15px" }}
            className="bi bi-info-circle-fill"
          ></i>
          <div className="brand-menu-text">Help</div>
        </Link>
      </nav>
    </>
  );
};

export default BrandSideMenu;
