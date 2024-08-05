import React, { useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import Axios from "axios";
import { useNavigate } from "react-router";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import "../assets/css/talent-dashboard.scss";
import "../assets/css/forms/kidsform-one.scss";
import PopUp from "../components/PopUp";
import { v4 as uuidv4 } from "uuid";
import RichTextEditor from "../views/RichTextEditor";

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
  console.log(" queryString:", queryString);
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSubmit = async () => {
    let formData = {
      services: inputs,
    };
    await ApiHelper.post(`${API.editKids}${queryString}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Updated SuccessFully Login to Continue");
          setOpenPopUp(true);
          loginTemplate(resData?.data?.data?.email);
          setTimeout(function () {
            setOpenPopUp(false);
            navigate(
              `/login?type=talent&user_id=${resData?.data?.data?.user_id}`
            );
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

  const loginTemplate = async (email) => {
    const formData = {
      parentEmail: email,
    };
    setIsLoading(true);
    await ApiHelper.post(API.loginTemplate, formData)
      .then((resData) => {
        console.log(resData, "resData");
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

  const handleFileChange = (index, event) => {
    console.log("handleFileChange");
    console.log(index, "index file");
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      uploadProfile(fileData, (fileObj) => {
        setInputs((prevInputs) => {
          const newInputs = [...prevInputs];
          newInputs[index]["files"] = [
            ...(newInputs[index]["files"] || []),
            fileObj,
          ];
          console.log(newInputs, "newInputs");
          return newInputs;
        });
      });
    }
  };

  const handleInputChange = (index, key, value) => {
    console.log(index, "index handleInputChange");
    const newInputs = [...inputs];
    newInputs[index][key] = value;
    setInputs(newInputs);
  };

  const handleEditorStateChange = (index, editorState) => {
    console.log(index, "index handleEditorStateChange");
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

    console.log(inputs, "inputs");
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
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  };

  const handleView = (imageUrl) => {
    let viewImage = `${API.userFilePath}${imageUrl?.fileData}`;
    window.open(viewImage, "_blank");
  };

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
                                  Service name
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
                                  placeholder="Enter Service Heading"
                                ></input>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-row row">
                            <div className="kids-form-section col-md-6 mb-3">
                              <label className="form-label">Amount</label>
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
                                placeholder="Enter Amount In $"
                              ></input>
                            </div>
                            <div className="kids-form-section col-md-6 mb-3">
                              <label className="form-label">
                                Duration (Weeks/Months)
                              </label>
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
                                placeholder="Duration (Weeks/Months)"
                              ></input>
                            </div>
                          </div>
                          <div className="adults-titles">Features</div>
                          <div className="rich-editor">
                            <label className="form-label">Features</label>

                            <RichTextEditor
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
                          {input.files.map((file, fileIndex) => (
                            <div
                              key={fileIndex}
                              className="uploaded-file-wrapper"
                            >
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
                              <div className="file-options">
                                <div className="sucess-tick">
                                  <img src={greenTickCircle} alt="" />
                                </div>
                                <div className="option-menu">
                                  <div className="dropdown">
                                    <img
                                      onClick={() =>
                                        setShowOptions(!showOptions)
                                      }
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
                                          onClick={() => handleView(file)}
                                          id="view"
                                        >
                                          View
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="dropdown-item"
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
                navigate("/adult-signup-basic-details");
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
