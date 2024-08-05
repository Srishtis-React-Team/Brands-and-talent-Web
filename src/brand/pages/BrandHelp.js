import React, { useState } from "react";
import "../../assets/css/forms/kidsform-one.scss";
import "../../assets/css/createjobs.scss";
import "../../assets/css/talent-profile.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import PopUp from "../../components/PopUp";
import BrandHeader from "./BrandHeader.js";
import BrandSideMenu from "./BrandSideMenu.js";
const BrandHelp = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <>
      <>
        <BrandHeader toggleMenu={toggleMenu} />
        <div
          id="sidebarBrand"
          className={`brand-sidebar ${
            showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
          }`}
        >
          <BrandSideMenu />
        </div>
        <main
          id="mainBrand"
          className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
        >
          <div className="brand-content-main">
            <section>
              <div className="brand-filter-section">Help Page</div>
            </section>
          </div>
        </main>
      </>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default BrandHelp;
