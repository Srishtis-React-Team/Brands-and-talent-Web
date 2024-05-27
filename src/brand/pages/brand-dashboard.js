import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/brand-dashboard.scss";
import "../../assets/css/talentHeader.scss";
import BrandHeader from "./BrandHeader";
import CreateJobs from "./CreateJobs";
import DuplicateJobs from "./DuplicateJobs";
import BrandHome from "./BrandHome";
import PreviewJob from "./PreviewJob";
import ListJobs from "./ListJobs";
import BrandTalents from "./BrandTalents";
const BrandDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const girl1 = require("../../assets/images/girl1.png");
  const menu_1 = require("../../assets/icons/sidemenu/add-job.png");
  const menu_2 = require("../../assets/icons/sidemenu/box.png");
  const menu_3 = require("../../assets/icons/sidemenu/codec.png");
  const menu_5 = require("../../assets/icons/sidemenu/heart.png");
  const menu_6 = require("../../assets/icons/sidemenu/help-circle.png");
  const menu_4 = require("../../assets/icons/sidemenu/users.png");
  const [createJob, setCreateJob] = useState(true);
  const [viewDashboard, setViewDashboard] = useState(false);
  const [myJobs, setMyJobs] = useState(false);
  const [viewTalents, setViewTalents] = useState(false);
  const [viewFavorites, setViewFavorites] = useState(false);
  const [viewHelp, setViewHelp] = useState(false);
  const [previewPage, setPreviewPage] = useState(false);
  const [homePageData, setHomePageData] = useState("");
  const [createJobData, setCreateJobData] = useState("");
  const [viewJobID, setViewJobID] = useState("");

  const handleHomeData = (buttonName, additionalData) => {
    setHomePageData(additionalData);
  };

  const handlePreviewData = (buttonName, additionalData) => {
    console.log(additionalData, "additionalData");
    setHomePageData(additionalData);
  };

  const handleCreateJobData = (data) => {
    setCreateJobData(data);
  };

  useEffect(() => {
    console.log(myJobs, "myJobs");
  }, [myJobs]);
  useEffect(() => {
    console.log(viewJobID, "viewJobID");
  }, [viewJobID]);

  useEffect(() => {
    console.log(homePageData, "homePageData");
    if (homePageData === "create-job" || homePageData === "start-now") {
      setMenu("create-job");
      setSelectedTab("create-job");
    }
  }, [homePageData]);

  useEffect(() => {
    console.log(createJobData, "createJobData");
    if (createJobData?.jobId && createJobData?.condition == "preview") {
      console.log(createJobData, "createJobData");
      setViewJobID(createJobData?.jobId);
      setMenu("preview-page");
    }
  }, [createJobData]);

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };
  const setMenu = (e) => {
    console.log(e, "e");
    if (e === "preview-page") {
      setPreviewPage(true);
    } else {
      setPreviewPage(false);
    }
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
          showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
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
                createJob
                  ? "sidemenu-icons active-sidemenu-icons  bi bi-plus-square-fill mt-4"
                  : "sidemenu-icons bi bi-plus-square-fill  mt-4"
              }
              onClick={(e) => {
                setMenu("create-job");
              }}
            ></i>
          </div>
          <div
            className={
              createJob ? "sidemenu-active mt-4" : "brand-menu-wrapper mt-4"
            }
            onClick={(e) => {
              setMenu("create-job");
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
                viewDashboard
                  ? "sidemenu-icons active-sidemenu-icons bi bi-speedometer mt-4"
                  : "sidemenu-icons bi bi-speedometer mt-4"
              }
              onClick={(e) => {
                setMenu("view-dashboard");
              }}
            ></i>
          </div>
          <div
            className={
              viewDashboard ? "sidemenu-active mt-4" : "brand-menu-wrapper mt-4"
            }
            onClick={(e) => {
              setMenu("view-dashboard");
            }}
          >
            <i
              style={{ paddingLeft: "15px" }}
              className="bi bi-speedometer "
            ></i>
            <div className="brand-menu-text">Dashboard</div>
          </div>

          <div className="brand-profile-not-sidemenu mt-5">
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
          </div>
          <div
            className={
              myJobs ? "sidemenu-active mt-4" : "brand-menu-wrapper mt-4"
            }
            onClick={(e) => {
              setMenu("my-jobs");
            }}
          >
            <i
              style={{ paddingLeft: "15px" }}
              className="bi bi-person-workspace"
            ></i>
            <div className="brand-menu-text">My Gigs/Jobs</div>
          </div>

          <div className="brand-profile-not-sidemenu mt-5">
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
          </div>
          <div
            className={
              viewTalents ? "sidemenu-active mt-4" : "brand-menu-wrapper mt-4"
            }
            onClick={(e) => {
              setMenu("view-talents");
            }}
          >
            <i
              style={{ paddingLeft: "15px" }}
              className="bi bi-people-fill"
            ></i>
            <div className="brand-menu-text">Find Talents</div>
          </div>

          <div className="brand-profile-not-sidemenu mt-5">
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
          </div>
          <div
            className={
              viewFavorites ? "sidemenu-active mt-4" : "brand-menu-wrapper mt-4"
            }
            onClick={(e) => {
              setMenu("view-favorites");
            }}
          >
            <i style={{ paddingLeft: "15px" }} className="bi bi-heart-fill"></i>
            <div className="brand-menu-text">Favorites</div>
          </div>
          <div className="brand-profile-not-sidemenu mt-5">
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
          </div>
          <div
            className={
              viewHelp ? "sidemenu-active mt-4" : "brand-menu-wrapper mt-4"
            }
            onClick={(e) => {
              setMenu("view-help");
            }}
          >
            <i
              style={{ paddingLeft: "15px" }}
              className="bi bi-info-circle-fill"
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
        {viewDashboard && <BrandHome onButtonClick={handleHomeData} />}
        {previewPage && (
          <PreviewJob data={viewJobID} onButtonClick={handlePreviewData} />
        )}
        {myJobs && <ListJobs />}
        {viewTalents && <BrandTalents />}
      </main>
    </>
  );
};

export default BrandDashboard;
