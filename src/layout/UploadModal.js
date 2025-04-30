// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import { Api } from "@mui/icons-material";
import { API } from "../config/api";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { ApiHelper } from "../helpers/ApiHelper";
import Axios from "axios";
import PopUp from "../components/PopUp";
const UploadModal = ({ open, onClose, onSubmit, talentData }) => {
  const [idType, setIdType] = useState("");
  const [verificationID, setVerificationID] = useState([]);
  const idCard = require("../assets/icons/id-card.png");
  const docsIcon = require("../assets/icons/docsIcon.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [idAnchor, setIdAnchor] = useState(null);
  const [selectedIdItem, setSelectedIdItem] = useState(null); // Track the selected item
  const [idIndex, setIdIndex] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const imageType = require("../assets/icons/imageType.png");
  const videoType = require("../assets/icons/videoType.png");
  const audiotype = require("../assets/icons/audiotype.png");
  // Single function to handle menu open
  const handleIdClick = (event, item, index) => {
    setIdAnchor(event.currentTarget);
    setSelectedIdItem(item); // Set the selected item
    setIdIndex(index);
  };

  const handleIdClose = (index) => {
    setIdAnchor(null);
    setSelectedIdItem(null); // Reset the selected item when closing the menu
    setIdIndex(index);
  };

  const handleVerificationDelete = (index) => {
    setVerificationID((prevIds) => {
      // Create a copy of the previous state
      const ids = [...prevIds];
      // Remove the image at the specified index
      ids.splice(index, 1);
      return ids;
    });
  };
  const handleView = (item) => {
    let viewImage = `${API.userFilePath}${item.fileData}`;
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

  const verificationUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      if (!allowedTypes.includes(fileData.type)) {
        setMessage("Only images and documents are allowed.");
        setOpenPopUp(true);
        setTimeout(() => {
          setOpenPopUp(false);
        }, 1000);
        return;
      }
      uploadVerificationID(fileData);
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

  const uploadVerificationID = async (fileData) => {
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
          type: getFileType(fileData.type),
        };
        console.log(fileObj, "fileObj");
        setVerificationID(fileObj);
        // setVerificationID((prevFiles) => [...prevFiles, fileObj]);
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  useEffect(() => {
    console.log(verificationID, "verificationID");
  }, [verificationID]);

  const submit = async () => {
    setIsLoading(true);

    if (talentData?.type === "kids") {
      const formData = {
        verificationId: [verificationID],
      };
      await ApiHelper.post(`${API.editKids}${talentData?._id}`, formData)
        .then((resData) => {
          onSubmit(resData);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }

    if (talentData?.type === "adults") {
      const formData = {
        verificationId: [verificationID],
      };
      await ApiHelper.post(`${API.updateAdults}${talentData?._id}`, formData)
        .then((resData) => {
          console.log(resData.data.status, "resData_verificaation_adult");
          onSubmit(resData);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason === "backdropClick") {
            // Prevent dialog from closing when clicking outside
            return;
          }
          onClose(); // Allow dialog to close for other reasons
        }}
        fullWidth
        maxWidth="sm"
      >
        <div className="d-flex justify-content-between" onClick={onClose}>
          <DialogTitle>Upload Verification Documents</DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent style={{ marginBottom: "60px" }}>
          <div className="kids-form-row row">
            <div className="kids-form-section col-md-6 mb-3 mt-3">
              <label className="form-label">ID Type</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setIdType(e.target.value);
                }}
              >
                <option defaultValue value="National ID Card">
                  National ID Card
                </option>
                <option defaultValue value="Driving License">
                  Driving License
                </option>
                <option value="Passport">Passport</option>
              </select>
            </div>
          </div>

          <div className="verification-section mb-2">
            <div className="id-image">
              <img src={idCard} alt="" />
            </div>
            <div className="id-text" htmlFor="id-upload">
              Upload Parents ID
            </div>
            <label className="id-choose" htmlFor="id-upload">
              Choose ID
            </label>
            <input
              type="file"
              className="select-cv-input"
              id="id-upload"
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              onChange={verificationUpload}
            />
          </div>

          {verificationID &&
            verificationID.fileData &&
            verificationID.title && (
              <>
                <div className="uploaded-file-wrapper">
                  <div className="file-section">
                    {verificationID.type === "image" && (
                      <div className="fileType">
                        <img src={imageType} alt="" />
                      </div>
                    )}
                    {verificationID.type === "audio" && (
                      <div className="fileType">
                        <img src={audiotype} alt="" />
                      </div>
                    )}
                    {verificationID.type === "video" && (
                      <div className="fileType">
                        <img src={videoType} alt="" />
                      </div>
                    )}
                    {verificationID.type === "document" && (
                      <div className="fileType">
                        <img src={docsIcon} alt="" />
                      </div>
                    )}
                    {verificationID.type === "pdf" && (
                      <div className="fileType">
                        <img src={docsIcon} alt="" />
                      </div>
                    )}
                    <div className="fileName">{verificationID.title}</div>
                  </div>

                  <div className="update-portfolio-action">
                    <IconButton
                      aria-label="more"
                      aria-controls="dropdown-menu-single"
                      aria-haspopup="true"
                      onClick={(event) =>
                        handleIdClick(event, verificationID, 0)
                      }
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="dropdown-menu-single"
                      anchorEl={idAnchor}
                      open={Boolean(idAnchor)}
                      onClose={() => handleIdClose(0)}
                    >
                      <MenuItem
                        onClick={() => {
                          handleIdClose(0);
                          handleView(verificationID);
                        }}
                      >
                        View
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleIdClose(0);
                          handleVerificationDelete(0);
                        }}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </>
            )}

          <div className="verification-footer">
            <button
              type="button"
              onClick={(e) => {
                submit();
              }}
              className="step-continue"
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default UploadModal;
