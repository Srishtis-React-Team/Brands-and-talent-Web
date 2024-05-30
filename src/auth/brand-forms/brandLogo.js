import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/register.scss";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";
import Axios from "axios";
import Spinner from "../../components/Spinner";
import PopUp from "../../components/PopUp";
const BrandLogo = () => {
  const navigate = useNavigate();
  const uploadIcon = require("../../assets/icons/uploadIcon.png");
  const btLogo = require("../../assets/icons/Group 56.png");
  const imageType = require("../../assets/icons/imageType.png");
  const videoType = require("../../assets/icons/videoType.png");
  const audiotype = require("../../assets/icons/audiotype.png");
  const elipsis = require("../../assets/icons/elipsis.png");
  const greenTickCircle = require("../../assets/icons/small-green-tick.png");
  const docsIcon = require("../../assets/icons/docsIcon.png");
  const [showOptions, setShowOptions] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [receivedData, setReceivedData] = useState(null);
  const [portofolioFile, setPortofolioFile] = useState([]);
  const [portofolioFileError, setPortofolioFileError] = useState(false);

  useEffect(() => {
    console.log(portofolioFile, "portofolioFile");
  }, [portofolioFile]);
  useEffect(() => {
    console.log(receivedData, "receivedData");
  }, [receivedData]);
  useEffect(() => {
    // Check if data is passed through state
    if (location.state && location.state.data) {
      setReceivedData(location.state.data);
    }
  }, [location.state]);

  const aboutUsOptions = [
    "Streaming Audio (Pandora, Spotify, etc.)",
    "Search Engine",
    "Billboard",
    "In the Mail",
    "Social (Facebook, LinkedIn, Instagram, etc.)",
    "Radio (AM/FM/XM)",
    "Podcast",
    "TV",
    "YouTube",
    "Other",
  ];

  useEffect(() => {
    //code for google auth
    console.log(openPopUp, "openPopUp");
  }, [openPopUp]);

  const handlePortofolioDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log(droppedFiles[0], "droppedFiles");
    uploadFile(droppedFiles[0]);
    // setFiles(droppedFiles);
  };

  const handlePortofolioDragOver = (e) => {
    e.preventDefault();
  };

  const portofolioUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      console.log(fileData, "fileData");
      uploadFile(fileData);
    }
  };

  const getFileType = (fileType) => {
    // Extract main category from MIME type
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

  const uploadFile = async (fileData) => {
    const params = new FormData();
    params.append("file", fileData);
    params.append("fileName", fileData.name);
    params.append("fileType", getFileType(fileData.type));
    /* await ApiHelper.post(API.uploadFile, params) */
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
        setPortofolioFile([fileObj]);
        console.log(portofolioFile, "portofolioFile");
        setPortofolioFileError(false);
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {});
  };

  const handleView = (imageUrl) => {
    let viewImage = `${API.userFilePath}${imageUrl?.fileData}`;
    window.open(viewImage, "_blank");
  };

  const handlePortofolioDelete = (index) => {
    setPortofolioFile(null);
  };

  const brandsSignup = async () => {
    if (portofolioFile.length === 0) {
      setPortofolioFileError(true);
    }
    if (portofolioFile && portofolioFile.length !== 0) {
      const formData = {
        logo: portofolioFile,
        brandImage: portofolioFile,
      };
      // setIsLoading(true);
      await ApiHelper.post(
        `${API.editBrands}${receivedData?.brandUserId}`,
        formData
      )
        .then((resData) => {
          if (resData.data.status === true) {
            console.log(resData.data.data, "brandsSignup");
            setBrandsLocalStorage(resData.data.data);
            // setIsLoading(false);
            setMessage("Registered SuccessFully!");
            navigate("/brand-activated", {
              state: { data: receivedData },
            });
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
            }, 1000);
          } else if (resData.data.status === false) {
            // setIsLoading(false);
            setMessage("Error Occured Try Again!");
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
            }, 1000);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setMessage("Error Occured Try Again!");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        });
    }
  };

  const setBrandsLocalStorage = (data) => {
    console.log(data, "data otp");
    localStorage.setItem("brandId", data?.brand_id);
    localStorage.setItem("currentUser", data?.brand_id);
    // localStorage.setItem("brandEmail", data?.data?.brandEmail);
    // localStorage.setItem("brandToken", data?.token);
    localStorage.setItem("currentUserType", "brand");
    localStorage.setItem("currentUserImage", data?.brandImage[0]?.fileData);
  };

  useEffect(() => {
    //code for google auth
    console.log(portofolioFile, "portofolioFile");
    console.log(portofolioFile.length, "portofolioFile length");
  }, [portofolioFile]);

  return (
    <>
      <div className="form-dialog">
        <div className="header-wrapper">
          <div className="step-wrapper">
            <img
              className="modal-logo"
              onClick={() => {
                navigate("/");
              }}
              src={btLogo}
            ></img>
            <div className="step-text">Step 5 of 6</div>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => {
              navigate("/");
            }}
          ></button>
        </div>
        <div className="dialog-body" style={{ height: "75vh" }}>
          <div className="adult-signup-main">
            <div className="step-title mb-3">Brand Logo</div>
            <div
              className="cv-section"
              onDrop={handlePortofolioDrop}
              onDragOver={handlePortofolioDragOver}
            >
              <label className="upload-backdrop" htmlFor="portofolio">
                <img src={uploadIcon} alt="" />
              </label>
              <input
                type="file"
                className="select-cv-input"
                id="portofolio"
                accept="image/*"
                multiple
                onChange={portofolioUpload}
              />
              <div className="upload-text">Upload Your Brand Logo</div>
              <div className="upload-info">Drag and drop your Logo here.</div>
            </div>
            {portofolioFileError && (
              <div className="invalid-fields">Please Upload Logo</div>
            )}

            {portofolioFile && portofolioFile.length > 0 && (
              <>
                {portofolioFile.map((item, index) => {
                  return (
                    <>
                      <div key={index} className="uploaded-file-wrapper">
                        <div className="file-section">
                          {item.type === "image" && (
                            <div className="fileType">
                              <img src={imageType} alt="" />
                            </div>
                          )}
                          {item.type === "audio" && (
                            <div className="fileType">
                              <img src={audiotype} alt="" />
                            </div>
                          )}
                          {item.type === "video" && (
                            <div className="fileType">
                              <img src={videoType} alt="" />
                            </div>
                          )}
                          {item.type === "document" && (
                            <div className="fileType">
                              <img src={docsIcon} alt="" />
                            </div>
                          )}
                          <div className="fileName">{item.title}</div>
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
                                    onClick={() => handleView(item)}
                                    id="view"
                                  >
                                    View
                                  </a>
                                </li>
                                <li>
                                  <a
                                    className="dropdown-item"
                                    onClick={() => handlePortofolioDelete(item)}
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
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className="dialog-footer">
          {/* <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
            className="step-back"
          >
            Back
          </button> */}
          <button
            type="button"
            className="step-continue"
            onClick={(e) => {
              brandsSignup();
            }}
          >
            Continue
          </button>
        </div>
      </div>
      {isLoading && <Spinner />}
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default BrandLogo;
