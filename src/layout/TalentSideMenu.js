import React, { useState, useEffect, useRef } from "react";
import "../assets/css/brand-dashboard.scss";
import "../assets/css/talentHeader.scss";
import { NavLink } from "react-router-dom";
import { Link, useLocation, useHistory } from "react-router-dom";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";

const TalentSideMenu = ({ myState }) => {
  const location = useLocation();
  const [createJob, setCreateJob] = useState(null);
  const [talentId, setTalentId] = useState(null);
  const [talentData, setTalentData] = useState();
  const [jobCountNumber, setJobCountNumber] = useState(null);
  console.log(myState, "myState");

  useEffect(() => {
    if (myState === true) {
      getTalentById();
    }
  }, [myState]);

  useEffect(() => {
    console.log(talentData, "talentData");
  }, [talentData]);

  useEffect(() => {
    setTimeout(function() {
      setTalentId(localStorage.getItem("userId"));
    }, 1000);
    console.log(talentId, "talentId");
    if (talentId) {
      getTalentById();
      jobCount();
    }
  }, [talentId]);
  useEffect(() => {
    console.log(talentData, "talentData");
  }, [talentData]);

  const getTalentById = async () => {
    await ApiHelper.post(`${API.getTalentById}${talentId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setTalentData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const jobCount = async () => {
    await ApiHelper.post(`${API.jobCount}${talentId}`)
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

  return (
    <>
      <nav className="brand-sidebar-container">
        <div className="brand-profile-not-sidemenu">
          <div className="profImg">
            <img
              className="profile-img"
              src={`${API.userFilePath}${talentData?.image?.fileData}`}
              alt=""
            />
          </div>
        </div>
        <div className="talent-profile">
          <div className="talent-data-wrapper">
            <div className="profImg">
              <img
                className="profile-img"
                src={`${API.userFilePath}${talentData?.image?.fileData}`}
                alt=""
              />
            </div>
            <div className="talent-details">
              <div className="talent-name">
                {talentData?.preferredChildFirstname}
                {talentData?.preferredChildLastName}
              </div>
              <div className="talent-category">Talent</div>
            </div>
          </div>
          <div className="talents-plan-info">
            <div className="talent-plan-name">
              Plan : <span>Basic</span>
            </div>

            <div className="talent-plan-name">
              {/* campaigns : <span>{jobCountNumber && <>{jobCountNumber}</>}</span> */}
            </div>
          </div>
          <div className="upgrade-btn">Upgrade Now</div>
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
            <div className="brand-menu-text">Home</div>
          </Link>

          <Link
            to="/talent-dashboard"
            className={
              location.pathname === "/talent-dashboard"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i class="bi bi-suitcase-lg icons"></i>
            <div className="brand-menu-text">Browse Jobs</div>
          </Link>

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
            to="/edit-talent-profile"
            className={
              location.pathname === "/edit-talent-profile"
                ? "sidemenu-active mt-2"
                : "brand-menu-wrapper mt-2"
            }
          >
            <i className="bi bi-person icons"></i>
            <div className="brand-menu-text">Edit Profile</div>
          </Link>

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
        </div>
      </nav>
    </>
  );
};

export default TalentSideMenu;
