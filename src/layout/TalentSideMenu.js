import React, { useState, useEffect, useRef } from "react";
import "../assets/css/brand-dashboard.scss";
import "../assets/css/talentHeader.scss";
import { NavLink } from "react-router-dom";
import { Link, useLocation, useHistory } from "react-router-dom";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";

const TalentSideMenu = ({ onChildClick }) => {
  const location = useLocation();
  const [createJob, setCreateJob] = useState(null);
  const [talentId, setTalentId] = useState(null);
  const [talentData, setTalentData] = useState();
  const [jobCountNumber, setJobCountNumber] = useState(null);

  useEffect(() => {
    setTalentId(localStorage.getItem("userId"));
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

  const handleClick = () => {
    if (typeof onChildClick === "function" && isSmallScreen) {
      onChildClick();
    }
  };

  return (
    <>
      <nav className="brand-sidebar-container">
        <div className="brand-profile-not-sidemenu">
          <img
            className="profile-img"
            src={`${API.userFilePath}${talentData?.image?.fileData}`}
            alt=""
          />
        </div>
        <div className="talent-profile">
          <div className="talent-data-wrapper">
            <div>
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

        <Link
          to="/talent-dashboard"
          className={
            location.pathname === "/talent-dashboard"
              ? "sidemenu-active mt-4"
              : "brand-menu-wrapper mt-4"
          }
        >
          <i style={{ paddingLeft: "15px" }} className="bi bi-speedometer "></i>
          <div className="brand-menu-text">Dashboard</div>
        </Link>
      </nav>
    </>
  );
};

export default TalentSideMenu;
