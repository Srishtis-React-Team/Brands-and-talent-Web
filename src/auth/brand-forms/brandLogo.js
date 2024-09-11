import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/dashboard.css";
import "../../assets/css/forms/kidsform-one.css";
import "../../assets/css/register.css";
import "../../assets/css/talent-dashboard.css";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";
import Axios from "axios";
import Spinner from "../../components/Spinner";
import PopUp from "../../components/PopUp";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import RichTextEditor from "../../views/RichTextEditor";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Tooltip } from "react-tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const BrandLogo = () => {
  const navigate = useNavigate();
  const uploadIcon = require("../../assets/icons/uploadIcon.png");
  const btLogo = require("../../assets/images/LOGO.png");
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
  const [profileFile, setProfileFile] = useState([]);
  const [profileFileError, setProfileFileError] = useState(false);
  const [aboutYou, setAboutYou] = useState([]);
  const [whyWorkWithUs, setWhyWorkWithUs] = useState([]);

  useEffect(() => {
    if (location.state && location.state.data) {
      setReceivedData(location.state.data);
    }
  }, [location.state]);

  const handleEditorChange = (value, index) => {
    setAboutYou(value);
  };
  const handleWhyWorkEditorChange = (value, index) => {
    setWhyWorkWithUs(value);
  };

  const handlePortofolioDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    uploadFile(droppedFiles[0]);
  };
  const handlePortofolioDragOver = (e) => {
    e.preventDefault();
  };
  const portofolioUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];

      uploadFile(fileData);
    }
    event.target.value = null;
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

  const uploadFile = async (fileData) => {
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
        setPortofolioFile([fileObj]);

        setPortofolioFileError(false);
        setOpenPopUp(true);
        setTimeout(function () {
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
    if (profileFile.length === 0) {
      setProfileFileError(true);
    }
    const formData = {
      logo: portofolioFile,
      brandImage: portofolioFile,
      profileImage: profileFile,
      aboutBrand: aboutYou,
      whyWorkWithUs: whyWorkWithUs,
    };
    await ApiHelper.post(`${API.editBrands}${receivedData?.brand_id}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setBrandsLocalStorage(resData.data.data);
          setMessage("Registered Successfully!");
          navigate("/brand-activated", {
            state: { data: receivedData },
          });
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("Error Occured Try Again!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setMessage("Error Occured Try Again!");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      });
  };

  const setBrandsLocalStorage = (data) => {
    localStorage.setItem("brandId", data?.brand_id);
    localStorage.setItem("currentUser", data?.brand_id);
    localStorage.setItem("currentUserType", "brand");
    localStorage.setItem("currentUserImage", data?.brandImage[0]?.fileData);
  };
  const dropDownClose = () => {
    setPortfolioAnchor(null);
  };

  const [portfolioAnchor, setPortfolioAnchor] = useState(null);

  const portfolioOpen = Boolean(portfolioAnchor);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null); // Track the selected item

  // Single function to handle menu open
  const handlePortfolioClick = (event, item) => {
    setPortfolioAnchor(event.currentTarget);
    setSelectedPortfolioItem(item); // Set the selected item
  };

  const handlePortfolioClose = () => {
    setPortfolioAnchor(null);
    setSelectedPortfolioItem(null); // Reset the selected item when closing the menu
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {}, [portofolioFile]);

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
        <div className="dialog-body spaceTops">
          <div className="adult-signup-main">
            <div className="kids-form-row row">
              <div className="kids-form-section col-md-12">
                <label className="form-label">Brand / Client Logo</label>
                <div
                  className="cv-section my-2"
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
                  <div className="upload-text">
                    Upload your company logo or your photo <br /> if signing up
                    as an individual client
                  </div>
                  <div className="upload-info">Or</div>
                  <div className="upload-info">Drag and drop image here</div>
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

                            <div className="update-portfolio-action">
                              <IconButton
                                aria-label="more"
                                aria-controls={`dropdown-menu-${item.id}`}
                                aria-haspopup="true"
                                onClick={(event) =>
                                  handlePortfolioClick(event, item)
                                }
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                id={`dropdown-menu-${item.id}`} // Use unique ID
                                anchorEl={portfolioAnchor} // Correct prop name
                                open={portfolioOpen} // Control visibility
                                onClose={handlePortfolioClose}
                              >
                                <MenuItem
                                  onClick={() => {
                                    handlePortfolioClose();
                                    handleView(selectedPortfolioItem); // Use selected item
                                  }}
                                >
                                  View
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    dropDownClose();
                                    handlePortofolioDelete(item);
                                  }}
                                >
                                  Delete
                                </MenuItem>
                              </Menu>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>

            <div className="rich-editor my-4">
              <label className="form-label">About Brand / Client </label>

              <RichTextEditor
                value={aboutYou}
                onChange={(aboutYou) => handleEditorChange(aboutYou)}
              />
            </div>

            <div className="rich-editor">
              <label className="form-label">Why work with us</label>
              <RichTextEditor
                value={whyWorkWithUs}
                onChange={(whyWorkWithUs) =>
                  handleWhyWorkEditorChange(whyWorkWithUs)
                }
              />
            </div>
          </div>
        </div>
        <div className="dialog-footer">
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
