import React, { useState, useEffect } from "react";
import "../assets/css/forms/kidsformthree.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Axios from "axios";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import useFieldDatas from "../config/useFieldDatas";
import { useNavigate } from "react-router";

const ProfileUpload = () => {
  const [profileFile, setProfileFile] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.jpeg");
  const uploadIcon = require("../assets/icons/uploadIcon.png");
  const imageType = require("../assets/icons/imageType.png");
  const videoType = require("../assets/icons/videoType.png");
  const audiotype = require("../assets/icons/audiotype.png");
  const idCard = require("../assets/icons/id-card.png");
  const elipsis = require("../assets/icons/elipsis.png");
  const greenTickCircle = require("../assets/icons/small-green-tick.png");
  const docsIcon = require("../assets/icons/docsIcon.png");
  const [portofolioFile, setPortofolioFile] = useState([]);
  const [loader, setLoader] = useState(false);

  const kidsImage = require("../assets/images/kidsImage.png");

  const handleProfileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    uploadProfile(droppedFiles[0]);
  };

  const handleProfileDragOver = (e) => {
    e.preventDefault();
  };

  const handlePortofolioDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    const nonImageFiles = droppedFiles.filter(
      (file) => !file.type.startsWith("image/")
    );

    if (nonImageFiles.length > 0) {
      setMessage("You can only upload images");
      setOpenPopUp(true);
      setTimeout(() => {
        setOpenPopUp(false);
      }, 1000);
      return;
    }
    imageFiles.forEach((file) => {
      uploadFile(file);
    });
  };

  const handlePortofolioDragOver = (e) => {
    e.preventDefault();
  };

  const getFileType = (fileType) => {
    if (fileType.startsWith("image/")) {
      return "image";
    } else if (fileType.startsWith("video/")) {
      return "video";
    } else if (fileType.startsWith("audio/")) {
      return "audio";
    } else if (fileType === "application/pdf") {
      return "pdf";
    } else {
      return "other";
    }
  };
  const [showOptions, setShowOptions] = useState(false);

  const profileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!file.type.startsWith("image/")) {
        setMessage("You can only upload images");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
        return;
      }

      uploadProfile(file);
    }
  };

  const handleView = (imageUrl) => {
    let viewImage = `${API.userFilePath}${imageUrl?.fileData}`;
    window.open(viewImage, "_blank");
  };

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ];

  const uploadProfile = async (fileData) => {
    setLoader(true);
    const params = new FormData();
    params.append("file", fileData);
    params.append("fileName", fileData.name);
    params.append("fileType", getFileType(fileData.type));
    await Axios.post(API.uploadFile, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resData) => {
        setMessage(resData.data.message);
        let fileObj = {
          id: resData.data.data.fileId,
          title: fileData.name,
          fileData: resData.data.data.filename,
          type: resData?.data?.data?.filetype,
        };

        setProfileFile(fileObj);

        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  const uploadFile = async (fileData) => {
    setLoader(true);
    const params = new FormData();
    params.append("file", fileData);
    params.append("fileName", fileData.name);
    params.append("fileType", getFileType(fileData.type));

    await Axios.post(API.uploadFile, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resData) => {
        setMessage(resData.data.message);
        let fileObj = {
          id: resData.data.data.fileId,
          title: fileData.name,
          fileData: resData.data.data.filename,
          type: resData?.data?.data?.filetype,
        };
        setPortofolioFile((prevFiles) => [...prevFiles, fileObj]);

        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const handleProfileDelete = () => {
    setProfileFile(null);
  };

  return (
    <>
      <div className="kids-form-title pb-0">
        <span>
          Profile Picture <span className="astrix">*</span>
        </span>
      </div>
      <div
        className="cv-section"
        onDrop={handleProfileDrop}
        onDragOver={handleProfileDragOver}
      >
        <label className="upload-backdrop" htmlFor="profile-image">
          <img src={uploadIcon} alt="" />
        </label>
        <input
          type="file"
          className="select-cv-input"
          id="profile-image"
          accept="image/*"
          onChange={profileUpload}
        />
        <div className="upload-text">Upload your profile photo</div>
        <div className="upload-info">
          Drag and drop your profile photo here.
        </div>
      </div>
      {profileFile && (
        <>
          <div className="uploaded-file-wrapper">
            <div className="file-section">
              {profileFile.type === "image" && (
                <div className="fileType">
                  <img src={imageType} alt="" />
                </div>
              )}
              <div className="fileName">{profileFile.title}</div>
            </div>
            <div className="file-options">
              <div className="sucess-tick">
                <img src={greenTickCircle} alt="" />
              </div>
              <div className="option-menu">
                <div className="dropdown">
                  <img
                    onClick={() => setShowOptions(!showOptions)}
                    src={elipsis}
                    alt=""
                    className="dropdown-toggle elipsis-icon"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => handleView(profileFile)}
                        id="view"
                      >
                        View
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={() => handleProfileDelete(profileFile)}
                        id="delete"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default ProfileUpload;
