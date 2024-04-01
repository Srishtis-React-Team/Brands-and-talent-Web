import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/brand-dashboard.scss";
import "../../assets/css/talentHeader.scss";
import BrandHeader from "./BrandHeader";
const BrandDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const girl1 = require("../../assets/images/girl1.png");

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
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
          <div className="brand_sidebar__content">
            <div className="sidemenu-main">
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
            </div>
          </div>
        </nav>
      </div>
      //MAIN
      <main
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <h1>Sidebar Menu</h1>
      </main>
    </>
  );
};

export default BrandDashboard;
