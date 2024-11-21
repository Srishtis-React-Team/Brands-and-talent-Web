import React, { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import Axios from "axios";
import { useNavigate } from "react-router";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import "../assets/css/talent-dashboard.css";
import PopUp from "../components/PopUp";
import { v4 as uuidv4 } from "uuid";
import RichTextEditor from "../views/RichTextEditor";
import "../assets/css/forms/kidsformthree.css";
import "../assets/css/forms/kidsform-one.css";
import "../assets/css/register.css";
import "../assets/css/dashboard.css";
import "../assets/css/kidsmain.scss";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const KidsServices = () => {
  const btLogo = require("../assets/images/LOGO.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const adultsBanner = require("../assets/images/adultsBanner.png");
  const uploadIcon = require("../assets/icons/uploadIcon.png");
  const imageType = require("../assets/icons/imageType.png");
  const videoType = require("../assets/icons/videoType.png");
  const audiotype = require("../assets/icons/audiotype.png");
  const elipsis = require("../assets/icons/elipsis.png");
  const greenTickCircle = require("../assets/icons/small-green-tick.png");
  const docsIcon = require("../assets/icons/docsIcon.png");
  const [isLoading, setIsLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const url = window.location.href;
  let queryString = url.split("?")[1];
  const paramsValues = window.location.search;

  const urlParams = new URLSearchParams(paramsValues);

  const userId = urlParams.get("userId");

  const [talentData, setTalentData] = useState();

  useEffect(() => {
    if (userId) {
      getTalentById();
    }
  }, [userId]);

  const getTalentById = async () => {
    await ApiHelper.post(`${API.getTalentById}${userId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setTalentData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {});
  };

  const durationList = ["Days", "Weeks", "Months"];

  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSubmit = async () => {
    let formData = {
      services: inputs,
    };
    console.log(formData, "formData");
    await ApiHelper.post(`${API.editKids}${userId}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Updated successfully");
          setOpenPopUp(true);
          // setTalentLocalStorage(resData.data.data);
          loginTemplate(resData?.data?.data?.email);

          localStorage.setItem("userId", resData.data.data?.user_id);
          localStorage.setItem("emailID", resData.data.data?.email);
          localStorage.setItem("currentUser", resData.data.data?.user_id);
          localStorage.setItem("currentUserType", "talent");

          setTimeout(function () {
            setOpenPopUp(false);
            navigate(`/talent-home?${resData?.data?.data?.user_id}`);
          }, 1000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const setTalentLocalStorage = (data) => {
    localStorage.setItem("userId", data?.user?._id);
    localStorage.setItem("emailID", data?.email);
    localStorage.setItem("userEmail", data?.email);
    localStorage.setItem("token", data?.token);
    localStorage.setItem("currentUser", data?.user?._id);
    localStorage.setItem("currentUserType", "talent");
    localStorage.setItem("currentUserImage", data?.user?.image?.fileData);
    localStorage.setItem(
      "talentName",
      `${data?.user?.preferredChildFirstname} ${data?.user?.preferredChildLastName}`
    );
    // setUserId(userId);
  };

  const loginTemplate = async (email) => {
    const formData = {
      parentEmail: email,
    };
    setIsLoading(true);
    await ApiHelper.post(API.loginTemplate, formData)
      .then((resData) => {
        if (resData.data.status === true) {
        } else {
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const [inputs, setInputs] = useState([
    {
      serviceName: "",
      serviceAmount: "",
      serviceDuration: "",
      editorState: "",
      files: [],
      uniqueId: uuidv4(),
    },
  ]);

  const goBack = () => {
    navigate(`/talent-kids-teen-signup-files-details?userId=${userId}`);
  };

  const handleFileChange = (index, event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      uploadProfile(fileData, (fileObj) => {
        setInputs((prevInputs) => {
          const newInputs = [...prevInputs];
          newInputs[index]["files"] = [
            ...(newInputs[index]["files"] || []),
            fileObj,
          ];

          return newInputs;
        });
      });
    }
  };

  const handleInputChange = (index, key, value) => {
    const newInputs = [...inputs];
    newInputs[index][key] = value;
    setInputs(newInputs);
  };

  const handleEditorStateChange = (index, editorState) => {
    const newInputs = [...inputs];
    newInputs[index]["editorState"] = editorState;
    setInputs(newInputs);
  };

  const handleAddMore = () => {
    setInputs([
      ...inputs,
      {
        serviceName: "",
        serviceAmount: "",
        serviceDuration: "",
        editorState: "",
        files: [],
        uniqueId: uuidv4(),
      },
    ]);
  };

  const uploadProfile = async (fileData, callback) => {
    const params = new FormData();
    params.append("file", fileData);
    params.append("fileName", fileData.name);
    try {
      const resData = await Axios.post(API.uploadFile, params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      let fileObj = {
        id: resData.data.data.fileId,
        title: fileData.name,
        fileData: resData.data.data.filename,
        type: resData?.data?.data?.filetype,
      };
      callback(fileObj);
    } catch (err) {}
  };

  const handleView = (imageUrl) => {
    let viewImage = `${API.userFilePath}${imageUrl?.fileData}`;
    window.open(viewImage, "_blank");
  };

  const [videoAnchor, setVideoAnchor] = useState(null);
  const [selectedVideoItem, setSelectedVideoItem] = useState(null); // Track the selected item
  const [videoIndex, setVideoIndex] = useState(null);
  const videoOpen = Boolean(videoAnchor);

  // Single function to handle menu open
  const handleVideoClick = (event, item, index) => {
    setVideoAnchor(event.currentTarget);
    setSelectedVideoItem(item); // Set the selected item
    setVideoIndex(index);
  };

  const handleVideoClose = (index) => {
    setVideoAnchor(null);
    setSelectedVideoItem(null); // Reset the selected item when closing the menu
    setVideoIndex(index);
  };

  const handleDeleteFile = (serviceIndex, fileIndex) => {
    alert(fileIndex);
    setInputs((prevInputs) => {
      const newInputs = prevInputs.map(
        (input, index) =>
          index === serviceIndex
            ? {
                ...input,
                files: input.files.filter((_, i) => i !== fileIndex), // Update only the files array of the targeted object
              }
            : { ...input } // Ensure other objects remain unaffected
      );

      return newInputs;
    });
  };

  useEffect(() => {
    console.log(inputs, "inputs");
  }, [inputs]);

  return (
    <>
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
              <div className="step-text">Step 6 of 6</div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                navigate("/");
              }}
            ></button>
          </div>
          <div className="dialog-body">
            <div className="kidsform-one container">
              <div className="adult-form-wrapper row ml-0 mr-0">
                <div className="col-md-4 col-lg-3">
                  <div className="adult-img-img fixImgs">
                    <img
                      src={adultsBanner}
                      alt=""
                      className="kids-image-sticky"
                    />
                  </div>
                </div>

                <div className="adult-main remvSpc col-md-8 col-lg-9">
                  <div className="adults-form-title">Complete your Profile</div>
                  <div className="adults-titles">Services (Optional)</div>
                  <div>
                    {inputs.map((input, serviceIndex) => (
                      <>
                        <div key={serviceIndex}>
                          <div className="">
                            <div className="">
                              <div className="mb-3 mt-3">
                                <label className="form-label">
                                  Service Name
                                </label>
                                <input
                                  value={input.serviceName}
                                  onChange={(e) =>
                                    handleInputChange(
                                      serviceIndex,
                                      "serviceName",
                                      e.target.value
                                    )
                                  }
                                  type="text"
                                  name="serviceName"
                                  className="form-control"
                                  placeholder="Custom Photoshoot"
                                ></input>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-row row">
                            <div className="kids-form-section col-md-6 mb-3">
                              <label className="form-label">
                                Rates (in USD)
                              </label>
                              <input
                                type="number"
                                name="amount"
                                value={input.serviceAmount}
                                onChange={(e) =>
                                  handleInputChange(
                                    serviceIndex,
                                    "serviceAmount",
                                    e.target.value
                                  )
                                }
                                className="form-control"
                                placeholder="$200 per hour (negotiable)"
                                min="1"
                              ></input>
                            </div>
                            <div className="kids-form-section col-md-6 mb-3">
                              <label className="form-label">
                                Delivery Time
                              </label>
                              <div className="duration-splitter">
                                <div className="duration-value-main">
                                  <input
                                    type="text"
                                    name="duration"
                                    value={input.serviceDuration}
                                    onChange={(e) =>
                                      handleInputChange(
                                        serviceIndex,
                                        "serviceDuration",
                                        e.target.value
                                      )
                                    }
                                    className="form-control"
                                    placeholder="3-5 days"
                                  ></input>
                                </div>
                                <div className="duration-select-main">
                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    style={{ fontSize: "14px" }}
                                    onChange={(e) =>
                                      handleInputChange(
                                        serviceIndex,
                                        "serviceTime",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value="" disabled selected>
                                      Time Unit
                                    </option>
                                    {durationList.map((option, index) => (
                                      <option key={index} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="rich-editor">
                            <label className="form-label">
                              Short Description
                            </label>
                            <RichTextEditor
                              from={"service"}
                              value={input.editorState}
                              onChange={(editorState) =>
                                handleEditorStateChange(
                                  serviceIndex,
                                  editorState
                                )
                              }
                            />
                          </div>
                          <div className="cv-section">
                            <label
                              className="upload-backdrop"
                              htmlFor={serviceIndex}
                            >
                              <img src={uploadIcon} alt="" />
                            </label>
                            <input
                              type="file"
                              className="select-cv-input"
                              id={serviceIndex}
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChange(serviceIndex, e)
                              }
                            />
                            <div className="upload-text">
                              Upload Your Photos
                            </div>
                            <div className="upload-info">
                              Drag and drop your photos/work samples here.
                            </div>
                          </div>

                          {input.files.map((file, index) => (
                            <div key={index} className="uploaded-file-wrapper">
                              <div className="file-section">
                                {file.type === "image" && (
                                  <div className="fileType">
                                    <img src={imageType} alt="" />
                                  </div>
                                )}
                                {file.type === "audio" && (
                                  <div className="fileType">
                                    <img src={audiotype} alt="" />
                                  </div>
                                )}
                                {file.type === "video" && (
                                  <div className="fileType">
                                    <img src={videoType} alt="" />
                                  </div>
                                )}
                                {file.type === "document" && (
                                  <div className="fileType">
                                    <img src={docsIcon} alt="" />
                                  </div>
                                )}
                                <div className="fileName">{file.title}</div>
                              </div>

                              <div className="update-portfolio-action">
                                <IconButton
                                  aria-label="more"
                                  aria-controls={`dropdown-menu-${index}`} // Use unique ID
                                  aria-haspopup="true"
                                  onClick={(event) =>
                                    handleVideoClick(event, url, index)
                                  }
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id={`dropdown-menu-${index}`} // Use unique ID
                                  anchorEl={videoAnchor} // Correct prop name
                                  open={videoOpen} // Control visibility
                                  onClose={() => handleVideoClose(index)}
                                >
                                  <MenuItem onClick={() => handleView(file)}>
                                    View
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() =>
                                      handleDeleteFile(serviceIndex, videoIndex)
                                    }
                                  >
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ))}
                  </div>

                  <div className="add-more-services mb-3">
                    <div
                      onClick={handleAddMore}
                      className="add-more-services-btn"
                    >
                      Add More Services
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dialog-footer">
            <button
              type="button"
              onClick={(e) => {
                goBack();
              }}
              className="step-back"
            >
              Back
            </button>

            <button
              className="step-continue"
              type="button"
              onClick={() => {
                handleSubmit();
              }}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default KidsServices;
