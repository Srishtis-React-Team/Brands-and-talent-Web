import React, { useEffect, useState, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript
import PopUp from "../components/PopUp.js";
import "../assets/css/talent-dashboard.scss";
import TalentSideMenu from "../layout/TalentSideMenu.js";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "./RichTextEditor";

const TalentHelp = () => {
  const [talentId, setTalentId] = useState(null);
  const [notificationList, setNotifications] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(function() {
      setTalentId(localStorage.getItem("userId"));
    }, 1000);

    console.log(talentId, "talentId");
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

  const viewNotification = async (item) => {
    const formData = {
      notificationId: item?._id,
    };
    await ApiHelper.post(`${API.readNotification}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          getTalentNotification();
        }
      })
      .catch((err) => {});
    navigate("/preview-job-talent", {
      state: {
        jobId: item?.gigId,
      },
    });
  };

  const deleteNotification = async (item) => {
    const formData = {
      notificationId: item?._id,
    };
    await ApiHelper.post(`${API.deleteNotification}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          getTalentNotification();
        }
      })
      .catch((err) => {});
  };

  const [editors, setEditors] = useState(["", ""]); // Initial state with two empty editors
  useEffect(() => {
    setValues();
  }, []);

  const setValues = (value, index) => {
    setEditors(["<p>Hello</p>", "<p>world</p>"]);
  };

  const handleEditorChange = (value, index) => {
    const newEditors = [...editors];
    newEditors[index] = value;
    setEditors(newEditors);
  };

  useEffect(() => {
    console.log(editors, "editors");
  }, [editors]);

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
          <div className="create-job-title">Help And Support</div>

          <div>
            {editors.map((value, index) => (
              <div key={index} style={{ marginBottom: "20px" }}>
                <RichTextEditor
                  value={value}
                  onChange={(value) => handleEditorChange(value, index)}
                />
              </div>
            ))}
            <button onClick={() => setEditors([...editors, ""])}>
              Add New Editor
            </button>
          </div>
        </div>
      </main>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default TalentHelp;
