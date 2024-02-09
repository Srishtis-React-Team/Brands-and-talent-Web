import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsform-one.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import Select from "react-select";
import Axios from "axios";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
const KidsformOne = () => {
  const kidsImage = require("../assets/images/kidsImage.png");
  const uploadIcon = require("../assets/icons/uploadIcon.png");
  const imageType = require("../assets/icons/imageType.png");
  const videoType = require("../assets/icons/videoType.png");
  const audiotype = require("../assets/icons/audiotype.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [jobSummary, setJobSummary] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [jobBenefits, setJobBenefits] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [portofolioFile, setPortofolioFile] = useState([]);
  const [showPdfModal, setShowPdfModal] = useState(false);

  useEffect(() => {
    if (portofolioFile) {
      console.log(portofolioFile, "portofolioFile");
    }
  }, [portofolioFile]);

  const portofolioUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      uploadFile(fileData);
    }
  };

  // const uploadedFiles = Array.from(event.target.files);
  // const updatedFiles = uploadedFiles.map((file, index) => ({
  //   id: index + 1,
  //   title: file.name,
  //   apiresponse: null, // Placeholder for API response
  // }));
  // setPortofolioFiles([...portofolioFiles, ...updatedFiles]);

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
    console.log(fileData, "fileData");
    setLoader(true);
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
        console.log(resData.data, "resData");
        let fileObj = {
          id: resData.data.data.fileId,
          title: fileData.name,
          fileData: resData.data.data.filename,
          type: getFileType(fileData.type),
        };
        setPortofolioFile((prevFiles) => [...prevFiles, fileObj]);
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        console.log(err);
      });
  };

  const professionList = [
    {
      value: "photographer",
      label: "Photographer",
      color: "#00B8D9",
      isFixed: true,
    },
    { value: "beauticians", label: "Beauticians", color: "#5243AA" },
    { value: "artists", label: "Artists", color: "#FF5630", isFixed: true },
    { value: "video Grapher", label: "Video Grapher", color: "#FF8B00" },
  ];

  const categoryList = [
    "Actor",
    "Model",
    "Director",
    "Singer",
    "Fashion",
    "Food",
    "Beauty",
    "Luxury",
    "Business and Technology",
    "Artist",
    "Mummy & Parenting",
    "Travel",
    "Health & Fitness",
    "Home and Gardening",
    "Eco & Sustainability",
    "Music",
    "Movies/Films",
    "Lifestyle",
    "Celebrity",
    "Content Creation",
    "Virtual Assistant",
  ];

  const onEditorSummary = (editorState) => {
    setJobSummary(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    setEditorState(editorState);
  };

  function chooseCategory(category) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  return (
    <>
      <div className="kidsform-one">
        <div className="kids-wrapper">
          <div className="kids-img">
            <img src={kidsImage} alt="" />
          </div>
          <div className="kids-form">
            <div className="kids-title">
              Welcome to Kids & Teen Talent (3-17 years) Registration Form
            </div>
            <div className="kids-description">
              Unleash your kid's inner star! ✨ Brands & Talent is your gateway
              to exciting opportunities for young creators (3-17)!  Imagine
              their talent shining on the big stage, collaborating with renowned
              brands on fun gigs and influencer projects.  This registration
              form is your first step to making their dreams a reality. Register
              now and unlock a world of possibilities for your kid!
            </div>
            <div className="kids-notes">
              NOTE:  1. Authorized Guardianship Required: This Kids & Teen
              Registration form is for authorized guardians only, registering on
              behalf of their child. Any unauthorized or fraudulent registration
              constitutes a violation of our Terms of Service and may result in
              immediate and permanent account suspension.
            </div>
            <div className="kids-notes-two">
              2. Violation of Policy: Any action or conduct that violates our
              policies, including unauthorized registration, may lead to account
              suspension.
            </div>
            <div className="kids-form-title">Parent/Guardian Details</div>

            <div className="splitter">
              <div className="splitter-one">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Legal First Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder="Enter Legal First Name"
                  ></input>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    E-mail
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder="Enter E-mail"
                  ></input>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder="Enter Country"
                  ></input>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder="Enter Password"
                  ></input>
                </div>
              </div>
              <div className="splitter-two">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Legal Last name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder="Enter Legal Last name"
                  ></input>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Mobile No.
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder=" Mobile No."
                  ></input>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder="State"
                  ></input>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder=" Confirm Password"
                  ></input>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Address
              </label>
              <textarea
                class="form-control address-textarea"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>

            <div className="kids-form-title">Your Child Details</div>

            <label className="form-label pay-info">
              Profession (choose any 4)
            </label>
            <div className="profession-wrapper benefits-dropdown">
              <Select
                defaultValue={[professionList[2], professionList[3]]}
                isMulti
                name="colors"
                options={professionList}
                valueField="value"
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(value) => setJobBenefits(value)}
              />
            </div>

            <div className="kids-form-title">
              Please select the top 4 categories relevant to your profile.
            </div>

            <div className="category-list">
              {categoryList.map((category, index) => (
                <div
                  className={
                    selectedCategories.includes(category)
                      ? "selected-category"
                      : "category-name"
                  }
                  onClick={(e) => {
                    chooseCategory(category);
                  }}
                  key={index}
                >
                  {category}
                </div>
              ))}
            </div>

            <div className="splitter">
              <div className="splitter-one">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Prefered First Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder="Enter Prefered First Name"
                  ></input>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Gender
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected value="1">
                      Male
                    </option>
                    <option value="2">Female</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Ethnicity
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected value="1">
                      Asian
                    </option>
                    <option value="2">African</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder=""
                  ></input>
                </div>
              </div>
              <div className="splitter-two">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Prefered Last name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder="Prefered Legal Last name"
                  ></input>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Nationality
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected value="1">
                      Asian
                    </option>
                    <option value="2">African</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Language
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected value="1">
                      English
                    </option>
                    <option value="2">Spanish</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="kids-form-title">Contact Details</div>

            <div className="splitter">
              <div className="splitter-one">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Phone
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder="Enter Phone number"
                  ></input>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder="Enter Location"
                  ></input>
                </div>
              </div>
              <div className="splitter-two">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {}}
                    placeholder="Email"
                  ></input>
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    City
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected value="1">
                      Asian
                    </option>
                    <option value="2">African</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="kids-form-title">Bio</div>

            <label className="form-label">About You</label>
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorSummary}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "history",
                ],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
            />

            <div className="kids-form-title">Portofolio</div>

            <div className="cv-section">
              <label className="upload-backdrop" for="cv-input">
                <img src={uploadIcon} alt="" />
              </label>
              <input
                type="file"
                className="select-cv-input"
                id="cv-input"
                accept="image/*"
                onChange={portofolioUpload}
              />
              <div className="upload-text kids-form-title">
                Upload Your Photos
              </div>
              <div className="upload-info">
                Drag and drop your photos/work samples here.
              </div>
            </div>
            {portofolioFile && <div className="uploaded-files"></div>}
            <div className="cv-section">
              <label className="upload-backdrop" for="cv-input">
                <img src={uploadIcon} alt="" />
              </label>
              <input
                type="file"
                className="select-cv-input"
                id="cv-input"
                accept="image/*"
                onChange={portofolioUpload}
              />
              <div className="upload-text kids-form-title">Videos & Audios</div>
              <div className="upload-info">
                Upload your previous work samples videos/audios.
              </div>
            </div>
            {portofolioFile && <div className="uploaded-files"></div>}
            <div className="kids-form-title">CV</div>
            <div className="cv-section">
              <label className="upload-backdrop" for="cv-input">
                <img src={uploadIcon} alt="" />
              </label>
              <input
                type="file"
                className="select-cv-input"
                id="cv-input"
                accept="image/*"
                onChange={portofolioUpload}
              />
              <div className="upload-text kids-form-title"> Upload CV</div>
              <div className="upload-info">Drag and drop CV to upload</div>
            </div>
            {portofolioFile && <div className="uploaded-files"></div>}
            <div className="upload-text kids-form-title">
              Features (Optional)
            </div>
            
          </div>
        </div>
      </div>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default KidsformOne;
