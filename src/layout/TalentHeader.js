import React, { useState, useEffect } from "react";
import "../assets/css/talentHeader.scss";
import { useNavigate } from "react-router";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
const TalentHeader = ({ toggleMenu }) => {
  const navigate = useNavigate();
  const btLogo = require("../assets/icons/Group 56.png");
  const model1 = require("../assets/images/girl1.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [talentId, setTalentId] = useState(null);
  const [talentData, setTalentData] = useState();

  useEffect(() => {
    setTalentId(localStorage.getItem("userId"));
    console.log(talentId, "talentId");
    if (talentId) {
      getTalentById();
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

  const logout = () => {
    navigate("/");
  };

  return (
    <>
      <div className="talent-header-main">
        <div className="talent-nav-logo">
          <img
            src={btLogo}
            alt=""
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <div className="talent-menu" onClick={toggleMenu}>
          <div className="telent-menubar">
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="mydashboard font-styles">My Dashboard</div>
        </div>
        <div className="talent-navbar-functions">
          <div
            className=""
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            <i className="fas fa-search"></i>
          </div>

          <div
            className="offcanvas offcanvas-top search-canvas-top"
            tabIndex="-1"
            id="offcanvasTop"
            aria-labelledby="offcanvasTopLabel"
          >
            <div className="offcanvas-header">
              <h5 id="offcanvasTopLabel">Search Anything</h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <form className="d-flex search-bootstrap">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                ></input>
                <button
                  className="btn btn-outline-success search-bootstrap-btn"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="talent-notification">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bell"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
            </svg>
          </div>
          <div className="talent-chat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chat"
              viewBox="0 0 16 16"
            >
              <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
            </svg>
          </div>
          <div
            className="talent-profile-icon dropdown"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={`${API.userFilePath}${talentData?.image?.fileData}`}
              alt=""
            />
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a
                  className="dropdown-item"
                  onClick={(e) => {
                    logout();
                  }}
                >
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TalentHeader;
