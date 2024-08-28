import React, { useEffect, useState } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
import PopUp from "../components/PopUp.js";
import "../assets/css/talent-dashboard.css";
import TalentSideMenu from "../layout/TalentSideMenu.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const TalentHome = () => {
  const [talentId, setTalentId] = useState(null);
  const [notificationList, setNotifications] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      setTalentId(localStorage.getItem("userId"));
    }, 1000);

    if (talentId) {
      getTalentNotification();
    }
  }, [talentId]);

  const getTalentNotification = async () => {
    await ApiHelper.get(`${API.getTalentNotification}${talentId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          setNotifications(resData.data.data);
        }
      })
      .catch((err) => {});
  };
  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {}, [notificationList]);

  const navigate = useNavigate();

  const handleNavigation = () => {
    const data = {
      isJobAlert: true,
    };
    // navigate("/talent-notification", { state: data });
    window.open(
      "https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG",
      "_blank"
    );
  };

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
        }`}
      >
        <TalentSideMenu />
      </div>

      <main
        style={{ height: "100%" }}
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div className="brand-content-main">
          <div className="create-job-title">Welcome To Brands and Talent</div>
          <div className="home-cards mt-1 row pad8">
            <div className="col-md-4 col-lg-3 pad8">
              <Link to="/edit-talent-profile">
                <div className="home-cards-wrapper hovBx">
                  <div className="home-card-content">
                    <i className="bi bi-person icons home-card-icons"></i>
                    <div className="home-cards-names">
                      Create / Update Profile
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4 col-lg-3 pad8">
              <Link
                to="https://airtable.com/appluOJ2R4RAOIloi/shr99sNN8682idCXG"
                target="_blank"
              >
                <div className="home-cards-wrapper hovBx">
                  <div className="home-card-content">
                    <i className="bi bi-search icons home-card-icons"></i>
                    <div className="home-cards-names">Browse Jobs</div>
                  </div>
                </div>
              </Link>
              {/* <Link to="/talent-dashboard ">
                <div className="home-cards-wrapper hovBx">
                  <div className="home-card-content">
                    <i className="bi bi-search icons home-card-icons"></i>
                    <div className="home-cards-names">Browse Jobs</div>
                  </div>
                </div>
              </Link> */}
            </div>
            <div className="col-md-4 col-lg-3 pad8">
              <Link to="/contact-us">
                <div className="home-cards-wrapper hovBx">
                  <div className="home-card-content">
                    <i className="bi bi-info-circle-fill  home-card-icons"></i>
                    <div className="home-cards-names">Help And Support</div>
                  </div>
                </div>
              </Link>
            </div>
            <div
              className="col-md-4 col-lg-3 pad8"
              onClick={() => handleNavigation()}
            >
              <Link>
                <div className="home-cards-wrapper hovBx">
                  <div className="home-card-content">
                    <i className="bi bi-briefcase-fill home-card-icons"></i>
                    <div className="home-cards-names">Create Job Alert</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default TalentHome;
