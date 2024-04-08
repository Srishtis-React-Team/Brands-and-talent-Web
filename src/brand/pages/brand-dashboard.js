import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/brand-dashboard.scss";
import "../../assets/css/talentHeader.scss";
import BrandHeader from "./BrandHeader";
import CreateJobs from "./CreateJobs";
import DuplicateJobs from "./DuplicateJobs";
import BrandHome from "./BrandHome";
import PreviewJob from "./PreviewJob";
const BrandDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const girl1 = require("../../assets/images/girl1.png");
  const menu_1 = require("../../assets/icons/sidemenu/add-job.png");
  const menu_2 = require("../../assets/icons/sidemenu/box.png");
  const menu_3 = require("../../assets/icons/sidemenu/codec.png");
  const menu_5 = require("../../assets/icons/sidemenu/heart.png");
  const menu_6 = require("../../assets/icons/sidemenu/help-circle.png");
  const menu_4 = require("../../assets/icons/sidemenu/users.png");
  const [sideMenu_1, setMenu_1] = useState(false);
  const [sideMenu_2, setMenu_2] = useState(true);
  const [sideMenu_3, setMenu_3] = useState(false);
  const [sideMenu_4, setMenu_4] = useState(false);
  const [sideMenu_5, setMenu_5] = useState(false);
  const [sideMenu_6, setMenu_6] = useState(false);
  const [previewPage, setPreviewPage] = useState(false);
  const [homePageData, setHomePageData] = useState("");
  const [createJobData, setCreateJobData] = useState("");
  const [viewJobID, setViewJobID] = useState("");

  const handleHomeData = (buttonName, additionalData) => {
    setHomePageData(additionalData);
  };

  const handleCreateJobData = (data) => {
    setCreateJobData(data);
  };

  useEffect(() => {
    console.log(homePageData, "homePageData");
    if (homePageData === "create-job" || homePageData === "start-now") {
      setMenu_1(true);
      setMenu_2(false);
    }
  }, [homePageData]);

  useEffect(() => {
    console.log(createJobData, "createJobData");
    if (createJobData?.jobId && createJobData?.condition == "preview") {
      setViewJobID(createJobData?.jobId);
      setPreviewPage(true);
      setMenu_1(false);
      setMenu_2(false);
    }
  }, [createJobData]);

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };
  const setMenu = (e) => {
    console.log(e, "e");
    if (e === "one") {
      setMenu_1(true);
    } else {
      setMenu_1(false);
    }
    if (e === "two") {
      setMenu_2(true);
    } else {
      setMenu_2(false);
    }
    if (e === "three") {
      setMenu_3(true);
    } else {
      setMenu_3(false);
    }
    if (e === "four") {
      setMenu_4(true);
    } else {
      setMenu_4(false);
    }
    if (e === "five") {
      setMenu_5(true);
    } else {
      setMenu_5(false);
    }
    if (e === "six") {
      setMenu_6(true);
    } else {
      setMenu_6(false);
    }
  };

  const [selectedTab, setSelectedTab] = useState("create-job");

  const handleJobTabs = (e) => {
    console.log(e.target.value, "e.target.value");
    setSelectedTab(e.target.value);
  };

  return (
    <>
      <BrandHeader toggleMenu={toggleMenu} />
      //SIDEBAR
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "not-sidebar"
        }`}
      >
        <nav className="brand-sidebar-container">
          <div className="brand-profile-not-sidemenu">
            <img className="profile-img" src={girl1} alt="" />
          </div>
          <div className="talent-profile">
            <div className="talent-data-wrapper">
              <div>
                <img className="profile-img" src={girl1} alt="" />
              </div>
              <div className="talent-details">
                <div className="talent-name">Elizabeth</div>
                <div className="talent-category">Talent</div>
              </div>
            </div>
            <div className="talents-plan-info">
              <div className="talent-plan-name">
                Plan : <span>Basic</span>
              </div>
              <div className="talent-plan-name">
                campaigns : <span>0</span>
              </div>
            </div>
            <div className="upgrade-btn">Upgrade Now</div>
          </div>
          <div className="brand-profile-not-sidemenu mt-5">
            <i
              className={
                sideMenu_1
                  ? "sidemenu-icons active-sidemenu-icons  bi bi-plus-square-fill mt-4"
                  : "sidemenu-icons bi bi-plus-square-fill  mt-4"
              }
              onClick={(e) => {
                setMenu("one");
              }}
            ></i>
          </div>
          <div
            className={
              sideMenu_1 ? "sidemenu-active mt-4" : "brand-menu-wrapper mt-4"
            }
            onClick={(e) => {
              setMenu("one");
            }}
          >
            <i
              style={{ paddingLeft: "15px" }}
              className="bi bi-plus-square-fill "
            ></i>
            <div className="brand-menu-text">Create Gig/Job</div>
          </div>
          <div className="brand-profile-not-sidemenu mt-5">
            <i
              className={
                sideMenu_2
                  ? "sidemenu-icons active-sidemenu-icons bi bi-speedometer mt-4"
                  : "sidemenu-icons bi bi-speedometer mt-4"
              }
              onClick={(e) => {
                setMenu("two");
              }}
            ></i>
          </div>
          <div
            className={
              sideMenu_2 ? "sidemenu-active mt-4" : "brand-menu-wrapper mt-4"
            }
            onClick={(e) => {
              setMenu("two");
            }}
          >
            <i style={{ paddingLeft: "15px" }} class="bi bi-speedometer "></i>
            <div className="brand-menu-text">Dashboard</div>
          </div>

          <div className="brand-profile-not-sidemenu mt-5">
            <i
              className={
                sideMenu_3
                  ? "sidemenu-icons active-sidemenu-icons bi bi-person-workspace mt-4"
                  : "sidemenu-icons bi bi-person-workspace mt-4"
              }
              onClick={(e) => {
                setMenu("three");
              }}
            ></i>
          </div>
          <div
            className={
              sideMenu_3 ? "sidemenu-active mt-4" : "brand-menu-wrapper mt-4"
            }
            onClick={(e) => {
              setMenu("three");
            }}
          >
            <i
              style={{ paddingLeft: "15px" }}
              class="bi bi-person-workspace"
            ></i>
            <div className="brand-menu-text">My Gigs/Jobs</div>
          </div>

          <div className="brand-profile-not-sidemenu mt-5">
            <i
              className={
                sideMenu_4
                  ? "sidemenu-icons active-sidemenu-icons bi bi-people-fill mt-4"
                  : "sidemenu-icons bi bi-people-fill mt-4"
              }
              onClick={(e) => {
                setMenu("four");
              }}
            ></i>
          </div>
          <div
            className={
              sideMenu_4 ? "sidemenu-active mt-4" : "brand-menu-wrapper mt-4"
            }
            onClick={(e) => {
              setMenu("four");
            }}
          >
            <i style={{ paddingLeft: "15px" }} class="bi bi-people-fill"></i>
            <div className="brand-menu-text">Find Talents</div>
          </div>

          <div className="brand-profile-not-sidemenu mt-5">
            <i
              className={
                sideMenu_5
                  ? "sidemenu-icons active-sidemenu-icons bi bi-heart-fill mt-4"
                  : "sidemenu-icons bi bi-heart-fill mt-4"
              }
              onClick={(e) => {
                setMenu("five");
              }}
            ></i>
          </div>
          <div
            className={
              sideMenu_5 ? "sidemenu-active mt-4" : "brand-menu-wrapper mt-4"
            }
            onClick={(e) => {
              setMenu("five");
            }}
          >
            <i style={{ paddingLeft: "15px" }} class="bi bi-heart-fill"></i>
            <div className="brand-menu-text">Favorites</div>
          </div>
          <div className="brand-profile-not-sidemenu mt-5">
            <i
              className={
                sideMenu_6
                  ? "sidemenu-icons active-sidemenu-icons bi  bi-info-circle-fill mt-4"
                  : "sidemenu-icons bi-info-circle-fill mt-4"
              }
              onClick={(e) => {
                setMenu("six");
              }}
            ></i>
          </div>
          <div
            className={
              sideMenu_6 ? "sidemenu-active mt-4" : "brand-menu-wrapper mt-4"
            }
            onClick={(e) => {
              setMenu("six");
            }}
          >
            <i
              style={{ paddingLeft: "15px" }}
              class="bi bi-info-circle-fill"
            ></i>
            <div className="brand-menu-text">Help</div>
          </div>
        </nav>
      </div>
      //MAIN
      <main
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        {sideMenu_1 && (
          <div className="brand-content-main">
            <div className="create-job-title">Create Gig/Job</div>
            <div className="create-job-toggle">
              <div className="radio-toggles">
                <input
                  type="radio"
                  id="newjob"
                  name="radio-options"
                  value="create-job"
                  onChange={handleJobTabs}
                  className="job-toggle-inputs"
                  checked={selectedTab == "create-job"}
                ></input>
                <label className="create-job-toggle-label" htmlFor="newjob">
                  Create a new job
                </label>
                <input
                  type="radio"
                  id="duplicate"
                  name="radio-options"
                  value="duplicate-job"
                  className="job-toggle-inputs"
                  onChange={handleJobTabs}
                  checked={selectedTab == "duplicate-job"}
                ></input>
                <label className="create-job-toggle-label" htmlFor="duplicate">
                  Duplicate Existing Jobs
                </label>
                <div className="slide-item"></div>
              </div>
            </div>
            {selectedTab === "create-job" && (
              <CreateJobs onButtonClick={handleCreateJobData} />
            )}
            {selectedTab === "duplicate-job" && <DuplicateJobs />}
          </div>
        )}
        {sideMenu_2 && <BrandHome onButtonClick={handleHomeData} />}
        {previewPage && <PreviewJob data={viewJobID} />}
      </main>
    </>
  );
};

export default BrandDashboard;
