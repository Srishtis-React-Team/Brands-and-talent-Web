import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.css";
import "../../assets/css/kidsmain.scss";
import "../../assets/css/brand-dashboard.css";
import Select from "react-select";
import Axios from "axios";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import { useNavigate } from "react-router";
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
import CurrentUser from "../../CurrentUser";
import RichTextEditor from "../../views/RichTextEditor";
import "material-icons/iconfont/material-icons.css";

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

const brandTypeList = [
  "Company ( 1-5 Employess )",
  "Company ( 6-10 Employess )",
  "Company ( 11-20 Employess )",
  "Company ( 21-50 Employess )",
  "Company ( 51-100 Employess )",
  "Company ( 101-250 Employess )",
  "Company ( 251-500 Employess )",
  "Company ( 501-3500 Employess )",
  "Company ( 3500+ Employess )",
  "Recruiting firm",
  "Talent agency",
];

const EditBrands = () => {
  const {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
    fcmToken,
  } = CurrentUser();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleFileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [myState, setMyState] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [whyWorkWithUsEditorState, setWhyWorkWithUsEditorState] = useState(
    EditorState.createEmpty()
  );
  const [aboutYou, setAboutYou] = useState([]);
  const [whyWorkWithUs, setWhyWorkWithUs] = useState([]);

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
  const [personalProfileImage, setPersonalProfileImage] = useState(
    "cd2f455f-de24-48d1-a91a-a45b3ad74d94.webp"
  );
  const [personalProfileImageObject, setPersonalProfileImageObject] =
    useState(null);
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
  const [websiteLink, setWebsiteLink] = useState("");
  const [websiteLinkError, setWebsiteLinkError] = useState(false);
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [publicUrlEdit, setPublicUrlEdit] = useState(false);
  const [publicUrl, setPublicUrl] = useState("");
  const [initialUrl, setInitialUrl] = useState("");
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [parentCountryError, setParentCountryError] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [kidsCity, setKidsCity] = useState("");
  const [state, setState] = useState("");
  const [aboutBrand, setAboutBrand] = useState("");

  const [brandType, setBrandType] = useState("");

  const selectBrandType = (event) => {
    setBrandType(event.target.value);
  };

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    await ApiHelper.get(API.listCountries)
      .then((resData) => {
        if (resData) {
          setCountryList(resData.data.data);
        }
      })
      .catch((err) => { });
  };

  const handleSelectedCountry = (event) => {
    setParentCountryError(false);

    setCountry(event?.value);
    // setState("");
    // handleSelectedState("");
    getStates(event?.value);
  };
  const handleSelectedState = (state) => {
    setStateError(false);
    setState(state?.label);
    // setKidsCity("");
    getCities({
      countryName: country,
      stateName: state?.label,
    });
  };

  useEffect(() => { }, [state]);

  const handleSelectedCity = (state) => {
    setKidsCity(state?.label);
    setCityError(false);
  };

  const onEditorSummary = (editorState) => {
    setAboutYou([draftToHtml(convertToRaw(editorState.getCurrentContent()))]);
    // setAboutYou(editorState);
    setEditorState(editorState);
  };

  const onWhyWorkWithUsEditorSummary = (editorState) => {
    setAboutYou([draftToHtml(convertToRaw(editorState.getCurrentContent()))]);
    // setAboutYou(editorState);
    setWhyWorkWithUsEditorState(editorState);
  };

  const getStates = async (data) => {
    const formData = {
      countryName: data,
    };
    await ApiHelper.post(API.listStates, formData)
      .then((resData) => {
        if (resData) {
          setStateList(resData.data.data);
        }
      })
      .catch((err) => { });
  };
  const getCities = async (data) => {
    const formData = data;
    await ApiHelper.post(API.listCity, formData)
      .then((resData) => {
        if (resData) {
          setCityList(resData.data.data);
        }
      })
      .catch((err) => { });
  };

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

    if (brandId) {
      getBrand();
    }
  }, [brandId]);

  const [errorMessage, setErrorMessage] = useState("");

  const publicUrlChange = async (event) => {
    const inputValue = event.target.value.replace(/ /g, "-");

    const formData = { name: inputValue, type: "brand" };
    await ApiHelper.post(`${API.checkPublicUrlName}`, formData)
      .then((resData) => {
        if (resData?.data?.status === true || publicUrl) {
          setPublicUrl(inputValue);
          setErrorMessage("");
        }
        if (resData?.data?.status === false && inputValue != initialUrl) {
          setErrorMessage(
            "Brand name already exists. Please enter a new name."
          );
        }
      })
      .catch((err) => { });
  };

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            console.log(resData.data.data, "resData.data.data");
            setBrandData(resData.data.data);
            setEditProfileImage(resData.data.data?.brandImage[0]?.fileData);
            setBrandName(resData.data.data?.brandName);
            setBrandEmail(resData.data.data?.brandEmail);
            setAddress(resData.data.data?.address);
            setBrandPhone(resData.data.data?.brandPhone);
            setBrandZipCode(resData.data.data?.brandZipCode);
            setPosition(resData.data.data?.position);
            setUserName(resData.data.data?.userName);
            setPersonalProfileImage(
              resData.data.data?.profileImage[0]?.fileData
            );
            setEditProfileImageObject(resData.data.data?.brandImage);
            setPersonalProfileImageObject(resData.data.data?.profileImage);
            setWebsiteLink(resData?.data?.data?.websiteLink);
            setPublicUrl(resData?.data?.data?.publicUrl);
            setInitialUrl(resData?.data?.data?.publicUrl);
            setWebsiteLink(resData?.data?.data?.brandWebsite);
            setLinkedinUrl(resData?.data?.data?.linkedinUrl);
            setTwitterUrl(resData?.data?.data?.twitterUrl);
            setFacebookUrl(resData?.data?.data?.facebookUrl);
            setCountry(resData?.data?.data?.brandCountry);
            setState(resData?.data?.data?.brandState);
            setKidsCity(resData?.data?.data?.brandCity);
            setBrandType(resData?.data?.data?.brandType);
            setAboutBrand(resData?.data?.data?.aboutBrand);
            setWhyWorkWithUs(...resData?.data?.data?.whyWorkWithUs);
          }
        }
      })
      .catch((err) => { });
  };

  useEffect(() => {
    console.log(errorMessage, "errorMessage");
  }, [errorMessage]);
  useEffect(() => { }, [brandData]);

  useEffect(() => {
    console.log(aboutBrand, "aboutBrand");
  }, [aboutBrand]);

  const [valueTabs, setValueTabs] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  const handleNavigation = (event) => {
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

      uploadProfile(fileData);
    }
  };

  const personalFileRef = useRef(null);

  const personalFile = () => {
    if (personalFileRef.current) {
      personalFileRef.current.click(); // Trigger the click event on the file input
    }
  };

  const personalImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];

      uploadPersonalProfile(fileData);
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
        if (resData?.data?.status === true) {
          let fileObj = {
            id: resData.data.data.fileId,
            title: fileData.name,
            fileData: resData.data.data.filename,
            type: resData?.data?.data?.filetype,
          };

          setEditProfileImage(fileObj?.fileData);
          setEditProfileImageObject([fileObj]);
          // updateProfile(fileObj);
        }
      })
      .catch((err) => { });
  };

  const uploadPersonalProfile = async (fileData) => {
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
        if (resData?.data?.status === true) {
          let fileObj = {
            id: resData.data.data.fileId,
            title: fileData.name,
            fileData: resData.data.data.filename,
            type: resData?.data?.data?.filetype,
          };

          setPersonalProfileImage(fileObj?.fileData);
          setPersonalProfileImageObject([fileObj]);
          // updateProfile(fileObj);
        }
      })
      .catch((err) => { });
  };

  const updateProfileImage = async () => {
    const formData = {
      brandImage: [editProfileImageObject],
    };
    await ApiHelper.post(`${API.editBrands}${brandId}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Profile image updated Successfully");
          setOpenPopUp(true);
          setTimeout(function () {
            setMyState(true);
            setOpenPopUp(false);
          }, 2000);
        } else if (resData.data.status === false) {
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 2000);
        }
      })
      .catch((err) => { });
  };

  const basicDetailsUpdate = async () => {
    const formData = {
      brandImage: editProfileImageObject,
      userName: userName,
      brandName: brandName,
      brandPhone: brandPhone,
      brandZipCode: brandZipCode,
      howHearAboutAs: hearAboutUs,
      publicUrl: publicUrl,
      yourFullName: userName,
      brandType: brandType,
      brandCountry: country,
      brandState: state,
      brandCity: kidsCity,
      brandWebsite: websiteLink,
      linkedinUrl: linkedinUrl,
      facebookUrl: facebookUrl,
      twitterUrl: twitterUrl,
      position: position,
      logo: editProfileImageObject,
      profileImage: personalProfileImageObject,
      aboutBrand: aboutBrand,
      whyWorkWithUs: whyWorkWithUs,
    };
    await ApiHelper.post(`${API.editBrands}${brandId}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Updated Successfully!");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            setMyState(true);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => { });
  };

  const updatePublicUrl = async () => {
    const formData = {
      publicUrl: publicUrl,
    };
    await ApiHelper.post(`${API.editBrands}${brandId}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Url updated Successfully!");
          setPublicUrlEdit(false);

          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            setMyState(true);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => { });
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
  const [hearAboutUs, setHearAboutUs] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  const handleLinkedinUrl = (e) => {
    const value = e.target.value;
    setLinkedinUrl(value);
  };
  const handleFacebookUrl = (e) => {
    const value = e.target.value;
    setFacebookUrl(value);
  };
  const handleTwitterUrl = (e) => {
    const value = e.target.value;
    setTwitterUrl(value);
  };

  const selectHearAbout = (event) => {
    setHearAboutUs(event.target.value);
  };

  const handleWebsiteLink = (e) => {
    setWebsiteLink(e.target.value);
    setWebsiteLinkError(false);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    setUserNameError(false);
  };

  const handleKeyPress = (e) => {
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setBrandNameLetterError(false);
    }
  };

  const handleMobileChange = (value, countryData) => {
    // Update the parentMobile state with the new phone number

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

  useEffect(() => { }, [editProfileImage]);

  const handleEditorChange = (editorState) => {
    setAboutBrand(editorState);
  };
  const handleWhyWorkEditorChange = (editorState) => {
    setWhyWorkWithUs(editorState);
  };

  return (
    <>
      <BrandHeader toggleMenu={toggleMenu} myState={myState} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
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
                variant="scrollable"
                scrollButtons="auto"
              >
                {/* <Tab
                  label="Personal Info"
                  {...a11yProps(0)}
                  style={{ textTransform: "capitalize" }}
                /> */}
                <Tab
                  label="Brand / Client Info"
                  {...a11yProps(1)}
                  style={{ textTransform: "capitalize" }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={valueTabs} index={0}>
              <div className="kids-main  p-0">
                <div className="kids-form-row row">
                  <div className="kids-form-section col-md-12">
                    <div className="profile-image-edit-section  p-0 mt-2 mx-0">
                      <div>
                        <label className="form-label">
                          Brand / Client logo
                        </label>
                        
                        <div className="image-upload-label mb-2">
                          ( Upload your company logo or your photo if signing up
                        as an individual client )
                        </div>
                      </div>
                      {!editProfileImage && (
                        <img
                          className="profile-image-edit"
                          src={avatarImage}
                          alt=""
                        />
                      )}
                      {editProfileImage && (
                        <img
                          className="profile-image-edit"
                          src={`${API.userFilePath}${editProfileImage}`}
                          alt=""
                        />
                      )}

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

                      {/* <div className="btn-img-edit-wrapper">
                        <Button
                          onClick={() => updateProfileImage()}
                          className="update-profileimg-btn"
                          variant="text"
                          style={{ textTransform: "capitalize" }}
                        >
                          Update Logo
                        </Button>
                      </div> */}
                    </div>
                  </div>
                  {/* <div className="kids-form-section col-md-6">
                    <div className="profile-image-edit-section  p-0 mt-2 mx-0">
                      <div>
                        <label className="form-label">Profile Image</label>
                        <div className="image-upload-label">
                          (Upload Your Profile Image)
                        </div>
                      </div>
                      {!personalProfileImage && (
                        <img
                          className="profile-image-edit"
                          src={avatarImage}
                          alt=""
                        />
                      )}
                      {personalProfileImage && (
                        <img
                          className="profile-image-edit"
                          src={`${API.userFilePath}${personalProfileImage}`}
                          alt=""
                        />
                      )}

                      <div className="image-edit-icon" onClick={personalFile}>
                        <input
                          type="file"
                          className="select-cv-input"
                          id="profile-image"
                          accept="image/*"
                          onChange={personalImageUpload}
                          ref={personalFileRef}
                        />
                        <i className="bi bi-pencil-fill profile-edit-icon"></i>
                      </div>
                      <div className="btn-img-edit-wrapper"></div>
                    </div>
                  </div> */}
                </div>

                <div className="kids-form-row row mt-3">
                  <div className="kids-form-section col-md-6 mb-3 ">
                    <label className="form-label">Brand / Client Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={brandName}
                      onChange={(e) => {
                        handleBrandNameChange(e);
                        setBrandNameError(false);
                      }}
                      onKeyDown={handleKeyPress}
                      placeholder="Enter your company name or your name if you’re an individual client"
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
                    <label className="form-label">Your Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={userName}
                      onChange={(e) => {
                        handleUserNameChange(e);
                        setUserNameError(false);
                      }}
                      onKeyDown={handleKeyPress}
                      placeholder="Enter User Name"
                    ></input>
                    {userNameError && (
                      <div className="invalid-fields">
                        Please enter Your Full Name
                      </div>
                    )}
                    {brandNameLetterError && (
                      <div className="invalid-fields">
                        Only Letters are allowed
                      </div>
                    )}
                  </div>
                </div>

                <div className="kids-form-row row">
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">
                      Country<span className="mandatory">*</span>
                    </label>
                    <Select
                      placeholder="Search country..."
                      options={countryList.map((country, index) => ({
                        value: country,
                        label: country,
                        key: index,
                      }))}
                      value={{ value: country, label: country }}
                      onChange={handleSelectedCountry}
                      isSearchable={true}
                    />
                    {parentCountryError && (
                      <div className="invalid-fields">
                        Please select Country
                      </div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">State</label>
                    <Select
                      placeholder="Select state..."
                      options={stateList.map((state) => ({
                        value: state.stateId, // or whatever unique identifier you want to use
                        label: state.name,
                      }))}
                      value={{ value: state, label: state }}
                      onChange={handleSelectedState}
                      isSearchable={true}
                    />
                    {stateError && (
                      <div className="invalid-fields">Please Select State</div>
                    )}
                  </div>
                </div>

                <div className="kids-form-row row">
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <Select
                      placeholder="Select City..."
                      options={cityList.map((city) => ({
                        value: city.cityId, // or whatever unique identifier you want to use
                        label: city.name,
                      }))}
                      value={{ value: kidsCity, label: kidsCity }}
                      onChange={handleSelectedCity}
                      isSearchable={true}
                    />
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">E-mail</label>
                    <input
                      type="email"
                      className={`form-control ${!isValidEmail ? "is-invalid" : "form-control"
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
                      sx={{ "& svg": { height: "1em" } }}
                      countryCodeEditable={false}
                      value={brandPhone}
                      defaultCountry={"kh"}
                      className="material-mobile-style"
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
                        Please select position
                      </div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">Brand / Client Website</label>
                    <input
                      type="text"
                      className="form-control"
                      value={websiteLink}
                      onChange={(e) => {
                        handleWebsiteLink(e);
                        setWebsiteLinkError(false);
                      }}
                      onKeyDown={handleKeyPress}
                      placeholder="Brand / Client Website"
                    ></input>
                    {brandZipCodeError && (
                      <div className="invalid-fields">Please enter ZipCode</div>
                    )}
                  </div>
                </div>

                <div className="kids-form-row row">
                  {/* <div className="kids-form-section col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        How Did You Hear About Us?
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={selectHearAbout}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="" disabled selected>
                          How Did You Hear About Us?
                        </option>
                        {aboutUsOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> */}

                  <div className="kids-form-section col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Brand / Client Type</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={selectBrandType}
                        style={{ fontSize: "14px" }}
                        value={brandType}
                      >
                        <option value="" disabled selected>
                          Brand / Client Type
                        </option>
                        {brandTypeList.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="kids-form-section col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Linkedin Url</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control adult-signup-inputs"
                          placeholder="Linkedin Url"
                          onChange={(e) => {
                            handleLinkedinUrl(e);
                          }}
                          value={linkedinUrl}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="kids-form-row row">
                  <div className="kids-form-section col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Facebook Url</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control adult-signup-inputs"
                          placeholder="Facebook Url"
                          onChange={(e) => {
                            handleFacebookUrl(e);
                          }}
                          value={facebookUrl}
                        ></input>
                      </div>
                    </div>
                  </div>
                  <div className="kids-form-section col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Twitter Url</label>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control adult-signup-inputs"
                          placeholder="Twitter Url"
                          onChange={(e) => {
                            handleTwitterUrl(e);
                          }}
                          value={twitterUrl}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="kids-form-row row">
                  <div className="kids-form-section col-md-6">
                    <div className="rich-editor">
                      <label className="form-label">
                        About Brand / Client{" "}
                      </label>
                      {/* <Editor
                        editorState={editorState}
                        editorStyle={{ overflow: "hidden" }}
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
                      /> */}

                      <RichTextEditor
                        value={aboutBrand}
                        onChange={(aboutBrand) =>
                          handleEditorChange(aboutBrand)
                        }
                      />
                    </div>
                  </div>
                  <div className="kids-form-section col-md-6">
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

                <div className="row">
                  <div className="kids-form-section  col-md-9 mb-3 mt-3">
                    <label className="form-label">Public Url</label>
                    <div className="public-url-wrapper">
                      {!publicUrlEdit && (
                        <>
                          <div className="public-url-text">
                            {`https://brandsandtalent.com/client/${publicUrl}`}
                            <i
                              onClick={(e) => {
                                setPublicUrlEdit(true);
                              }}
                              className="bi bi-pencil-square"
                            ></i>
                          </div>
                        </>
                      )}
                      {publicUrlEdit && (
                        <div className="public-url-text">
                          {`https://brandsandtalent.com/client/`}
                        </div>
                      )}
                      {publicUrlEdit && (
                        <input
                          type="text"
                          className="form-control public-url-input"
                          value={publicUrl}
                          onChange={(e) => {
                            publicUrlChange(e);
                          }}
                          placeholder="Edit url"
                        ></input>
                      )}

                      {publicUrlEdit && (
                        <Button
                          onClick={() => updatePublicUrl()}
                          className="pub-url-btn"
                          variant="text"
                          style={{ textTransform: "capitalize" }}
                          disabled={errorMessage}
                        >
                          save
                        </Button>
                      )}
                    </div>
                    {errorMessage && (
                      <>
                        <p className="errorMessage">{errorMessage}</p>
                      </>
                    )}

                    {/* {preferedNameError && (
                      <div className="invalid-fields">
                        Please Enter Preferred First Name
                      </div>
                    )}
                    {kidsPrefferedFirstNameLetterError && (
                      <div className="invalid-fields">Only Letters Allowed</div>
                    )} */}
                  </div>
                </div>

                <div className="update-profile-flex">
                  <Button
                    onClick={() => basicDetailsUpdate()}
                    className="edit-profileimg-btn"
                    variant="text"
                    style={{ textTransform: "capitalize" }}
                  >
                    Update Company Info
                  </Button>
                </div>
              </div>
            </CustomTabPanel>

            {/* <div className="edit-profile-navigations editOnly p-0">
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
            </div> */}
          </Box>
        </div>
      </main>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default EditBrands;
