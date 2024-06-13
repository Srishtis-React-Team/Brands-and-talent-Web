import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.scss";
import Select from "react-select";
import Axios from "axios";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import { useNavigate } from "react-router";
import nationalityOptions from "../../components/nationalities";
import languageOptions from "../../components/languages";
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TalentHeader from "../../layout/TalentHeader";
import TalentSideMenu from "../../layout/TalentSideMenu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import Modal from "react-modal";
import { ta } from "date-fns/locale";
import BrandHeader from "./BrandHeader";
import BrandSideMenu from "./BrandSideMenu";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      className="editTabs"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EditBrands = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleFileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [myState, setMyState] = useState(false);

  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [brandId, setBrandId] = useState(null);
  const [brandName, setBrandName] = useState("");
  const [brandNameError, setBrandNameError] = useState("");
  const [brandNameLetterError, setBrandNameLetterError] = useState("");
  const [brandEmail, setBrandEmail] = useState("");
  const [brandData, setBrandData] = useState(null);
  const [editProfileImage, setEditProfileImage] = useState("");
  const [editProfileImageObject, setEditProfileImageObject] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [addressError, setAddressError] = useState(false);
  const [address, setAddress] = useState("");
  const [brandPhone, setBrandPhone] = useState("");
  const [brandPhoneError, setBrandPhoeError] = useState("");
  const [mobileNumError, setMobileNumError] = useState();
  const [brandZipCode, setBrandZipCode] = useState();
  const [brandZipCodeError, setBrandZipCodeError] = useState();
  const [position, setPosition] = useState("");
  const [positionError, setPositionError] = useState(false);

  const positionOptions = [
    "1 job",
    "2 to 3 jobs",
    "4 to 10 jobs",
    "11 to 20 jobs",
    "21 to 50 jobs",
    "50 to 100 jobs",
    "100 to 250 jobs",
    "250+ jobs",
  ];

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
    console.log(brandId, "brandId");
    if (brandId) {
      getBrand();
    }
  }, [brandId]);

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data, "resData.data.data");
            setEditProfileImage(resData.data.data?.brandImage[0]?.fileData);
            setBrandName(resData.data.data?.brandName);
            setBrandEmail(resData.data.data?.brandEmail);
            setAddress(resData.data.data?.address);
            setBrandPhone(resData.data.data?.brandPhone);
            setBrandZipCode(resData.data.data?.brandZipCode);
            setPosition(resData.data.data?.position);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(brandData, "brandDataEditBrands");
  }, [brandData]);

  const [valueTabs, setValueTabs] = React.useState(0);

  const handleChange = (event, newValue) => {
    console.log(newValue, "newValue");
    setValueTabs(newValue);
  };

  const handleNavigation = (event) => {
    console.log(valueTabs, "valueTabs");
    console.log(event, "event");
    if (valueTabs === 0 && event === "back") {
      setValueTabs(0);
    } else if (event === "next") {
      setValueTabs(valueTabs + 1);
    } else if (event === "back") {
      setValueTabs(valueTabs - 1);
    } else if (valueTabs === 1) {
      setValueTabs(1);
    }
  };
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const fileInputRef = useRef(null);

  const File = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the click event on the file input
    }
  };

  const profileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      console.log(fileData, "fileData");
      uploadProfile(fileData);
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

  const uploadProfile = async (fileData) => {
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
        console.log(resData, "uploadProfileDATA");
        if (resData?.data?.status === true) {
          let fileObj = {
            id: resData.data.data.fileId,
            title: fileData.name,
            fileData: resData.data.data.filename,
            type: resData?.data?.data?.filetype,
          };
          console.log(fileObj, "fileObj");
          setEditProfileImage(fileObj?.fileData);
          setEditProfileImageObject(fileObj);
          // updateProfile(fileObj);
        }
      })
      .catch((err) => {});
  };

  const updateProfileImage = async () => {
    const formData = {
      brandImage: [editProfileImageObject],
    };
    await ApiHelper.post(`${API.editBrands}${brandId}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Profile Image Update Successfully");
          setOpenPopUp(true);
          setTimeout(function() {
            setMyState(true);
            setOpenPopUp(false);
          }, 2000);
        } else if (resData.data.status === false) {
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 2000);
        }
      })
      .catch((err) => {});
  };

  const basicDetailsUpdate = async () => {
    const formData = {
      brandName: brandName,
      brandPhone: brandPhone,
      brandZipCode: brandZipCode,
      address: address,
      position: position,
    };
    await ApiHelper.post(`${API.editBrands}${brandId}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Updated SuccessFully!");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  const handleBrandNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
      setBrandNameLetterError(false);
      setBrandName("");
    } else if (!onlyLettersRegex.test(value)) {
      setBrandNameLetterError(true);
    } else {
      setBrandName(value);
      setBrandNameLetterError(false);
    }
  };

  const handleKeyPress = (e) => {
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setBrandNameLetterError(false);
    }
  };

  const handleMobileChange = (value, countryData) => {
    // Update the parentMobile state with the new phone number
    console.log(value, "handleMobileChange");
    setBrandPhone(value);
    setBrandPhoeError(false);
  };

  const selectPosition = (event) => {
    setPosition(event.target.value);
    setPositionError(false);
  };
  const [zipCodeValidation, setZipCodeValidation] = useState(false);

  const handleZipCodeChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only numbers and the "+" symbol
    const onlyNumbersRegex = /^[0-9+]*$/;
    if (!onlyNumbersRegex.test(value)) {
      setZipCodeValidation(true);
    } else {
      setBrandZipCode(value);
      setZipCodeValidation(false);
    }
  };

  const handleZipCodeKeyPress = (e) => {
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setBrandNameLetterError(false);
    }
  };

  return (
    <>
      <BrandHeader toggleMenu={toggleMenu} myState={myState} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
        }`}
      >
        <BrandSideMenu myState={myState} />
      </div>
      <main
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div className="brand-content-main boxBg">
          <div className="create-job-title">Edit Profile</div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={valueTabs}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="Profile Image"
                  {...a11yProps(0)}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Personal Info"
                  {...a11yProps(1)}
                  style={{ textTransform: "capitalize" }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={valueTabs} index={0}>
              <div className="profile-image-edit-section edit-basicdetails-section-main p-0 mb-5 mt-2 mx-0">
                <img
                  className="profile-image-edit"
                  src={`${API.userFilePath}${editProfileImage}`}
                  alt=""
                />
                <div className="image-edit-icon" onClick={File}>
                  <input
                    type="file"
                    className="select-cv-input"
                    id="profile-image"
                    accept="image/*"
                    onChange={profileUpload}
                    ref={fileInputRef}
                  />
                  <i className="bi bi-pencil-fill profile-edit-icon"></i>
                </div>
                <div className="btn-img-edit-wrapper">
                  <Button
                    onClick={() => updateProfileImage()}
                    className="update-profileimg-btn"
                    variant="text"
                    style={{ textTransform: "capitalize" }}
                  >
                    Update Image
                  </Button>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={1}>
              <div className="kids-main edit-basicdetails-section-main p-0">
                <div className="kids-form-row row">
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">Brand Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={brandName}
                      onChange={(e) => {
                        handleBrandNameChange(e);
                        setBrandNameError(false);
                      }}
                      onKeyDown={handleKeyPress}
                      placeholder="Enter Brand Name"
                    ></input>
                    {brandNameError && (
                      <div className="invalid-fields">
                        Please enter Brand Name
                      </div>
                    )}
                    {brandNameLetterError && (
                      <div className="invalid-fields">
                        Only Letters are allowed
                      </div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">E-mail</label>
                    <input
                      type="email"
                      className={`form-control ${
                        !isValidEmail ? "is-invalid" : "form-control"
                      }`}
                      placeholder="Enter E-mail"
                      value={brandEmail}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="kids-form-row row">
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={brandZipCode}
                      onChange={(e) => {
                        handleZipCodeChange(e);
                        setBrandZipCodeError(false);
                      }}
                      onKeyDown={handleKeyPress}
                      placeholder="Enter Zip Code"
                    ></input>
                    {brandZipCodeError && (
                      <div className="invalid-fields">Please enter ZipCode</div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">Mobile No</label>

                    <MuiPhoneNumber
                      value={brandPhone}
                      defaultCountry={"kh"}
                      className="form-control"
                      onChange={handleMobileChange}
                    />
                    {brandPhoneError && (
                      <div className="invalid-fields">
                        Please enter Mobile Number
                      </div>
                    )}
                    {mobileNumError && (
                      <div className="invalid-fields">Only Numbers Allowed</div>
                    )}
                  </div>
                </div>
                <div className="kids-form-row row">
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">Position</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectPosition}
                      value={position}
                    >
                      <option value="" disabled selected>
                        How Many Positions are you looking to staff?
                      </option>
                      {positionOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {positionError && (
                      <div className="invalid-fields">
                        Please Select position
                      </div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-12 mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Address
                    </label>
                    <textarea
                      style={{ width: "100%" }}
                      className="form-control address-textarea"
                      id="exampleFormControlTextarea1"
                      value={address}
                      rows="3"
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setAddressError(false);
                      }}
                    ></textarea>
                    {addressError && (
                      <div className="invalid-fields">Please Enter Address</div>
                    )}
                  </div>
                </div>
                <div className="update-profile-flex">
                  <Button
                    onClick={() => basicDetailsUpdate()}
                    className="edit-profileimg-btn"
                    variant="text"
                    style={{ textTransform: "capitalize" }}
                  >
                    Update
                  </Button>
                </div>
              </div>
            </CustomTabPanel>

            <div className="edit-profile-navigations editOnly p-0">
              {valueTabs >= 1 && (
                <div
                  className="edit-profile-navigation-btn"
                  onClick={() => {
                    handleNavigation("back");
                  }}
                >
                  <i className="bi bi-arrow-left-circle-fill arrow-left-circle"></i>
                  <span className="edit-profile-navigation-text">Back</span>
                </div>
              )}
              {valueTabs != 1 && (
                <div
                  className="edit-profile-navigation-btn"
                  onClick={() => {
                    handleNavigation("next");
                  }}
                >
                  <span className="edit-profile-navigation-text">Next</span>
                  <i className="bi bi-arrow-right-circle-fill"></i>
                </div>
              )}
            </div>
          </Box>
        </div>
      </main>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default EditBrands;
