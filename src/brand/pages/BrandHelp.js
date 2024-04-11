import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.scss";
import "../../assets/css/createjobs.scss";
import "../../assets/css/talent-profile.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import Select from "react-select";
import Axios from "axios";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import { useNavigate } from "react-router";
import RangeSlider from "../../components/RangeSlider";
import nationalityOptions from "../../components/nationalities.js";
import languageOptions from "../../components/languages.js";
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
            showSidebar ? "show-sidebar" : "not-sidebar"
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
