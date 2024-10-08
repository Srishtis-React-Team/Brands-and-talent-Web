import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsform-one.css";
import "../assets/css/forms/kidsformthree.css";
import Select from "react-select";
import "../assets/css/register.css";
import "../assets/css/kidsmain.scss";
import "../assets/css/createjobs.css";
import "../assets/css/talent-profile.css";
import {
  parsePhoneNumber,
  isValidPhoneNumber,
  getNumberType,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import Axios from "axios";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { useNavigate } from "react-router";
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TalentHeader from "../layout/TalentHeader";
import TalentSideMenu from "../layout/TalentSideMenu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
import RichTextEditor from "../views/RichTextEditor";
import CreatableSelect from "react-select/creatable";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Tooltip } from "react-tooltip";
import useFieldDatas from "../config/useFieldDatas";
import EditFeatures from "../pages/EditFeatures";
import EditSocialMedias from "../pages/EditSocialMedias";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
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

const scrollToTop = () => {
  window.scrollTo(0, 0); // Scroll to top on link click
};

// Regular expressions for different video platforms
const urlPatterns = {
  youtube:
    /^.*(youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/,
  vimeo: /^.*(vimeo\.com\/)(\d+|[\w-]+\/[\w-]+)(?:\?.*)?$/,
  instagram: /^.*(instagram\.com\/(p|reel|tv)\/[^/?#&]+)\/?(?:\?.*)?$/,
  twitter: /^.*((twitter|x)\.com\/.*\/status\/\d+)\/?$/,
};
const audioUrlPatterns = {
  youtube:
    /^.*(youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/,
  vimeo: /^.*(vimeo\.com\/)(\d+|[\w-]+\/[\w-]+)(?:\?.*)?$/,
  instagram: /^.*(instagram\.com\/(p|reel|tv)\/[^/?#&]+)\/?(?:\?.*)?$/,
  twitter: /^.*((twitter|x)\.com\/.*\/status\/\d+)\/?$/,
  audio: /\.(mp3|wav|ogg)$/i,
};
const isValidUrl = (url) => {
  return (
    urlPatterns.youtube.test(url) ||
    urlPatterns.vimeo.test(url) ||
    urlPatterns.instagram.test(url) ||
    urlPatterns.twitter.test(url)
  );
};

const EditTalent = () => {
  const [languages, setLanguages] = useState([]);
  const [nationality, setNationality] = useState("");
  const [mobileValidationError, setMobileValidationError] = useState(false);

  const [listOfLanguages, setListOfLanguages] = useState([]);
  const [listOfNationalities, setListOfNationalities] = useState([]);
  const {
    categoryList,
    professionList,
    gendersList,
    languagesList,
    nationalitiesList,
    featuresList,
  } = useFieldDatas();

  const durationList = ["Days", "Weeks", "Months"];

  const isDocumentFile = (fileType) => {
    return (
      fileType === "application/pdf" ||
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
  };

  useEffect(() => {
    if (languagesList.length > 0) {
      setListOfLanguages(languagesList);
      getKidsData();
    }
  }, [languagesList]);
  useEffect(() => {
    if (nationalitiesList.length > 0) {
      setListOfNationalities(nationalitiesList);
      getKidsData();
    }
  }, [nationalitiesList]);

  useEffect(() => {
    let selectedOptions;
    if (listOfLanguages && listOfLanguages.length > 0) {
      selectedOptions = languages.map((language) => {
        return listOfLanguages.find((option) => option.label === language);
      });
    }

    setSelectedLanguageOptions(selectedOptions);
  }, [languagesList, languages]);

  useEffect(() => {
    let selectedOptions;
    if (listOfNationalities && listOfNationalities.length > 0) {
      selectedOptions = nationality.map((nationality) => {
        return listOfNationalities.find(
          (option) => option.label === nationality
        );
      });
    }

    setSelectedNationalityOptions(selectedOptions);
  }, [nationalitiesList, nationality]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dropDownClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleFileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let testEditor = [
    '<p><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: Open Sans", Arial, sans-serif;">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text</span>&nbsp;</p>\n',
  ];

  const creatableOptions = ["Dress Size", "Shoe Size"];

  const creatableInputOptions = [
    "Hip Size",
    "Waist",
    "Chest",
    "Height",
    "Bra Size",
  ];

  const cmPlaceholderOptions = ["Height", "Chest", "Waist", "Hip Size"];

  const getPlaceholder = (label) => {
    if (cmPlaceholderOptions.includes(label)) {
      return "Type in cm";
    }
    if (
      label === "Shoe Size" ||
      label === "Bra Size" ||
      label === "Dress Size"
    ) {
      return "US or EU size only";
    }
    return label;
  };

  const elipsis = require("../assets/icons/elipsis.png");
  const greenTickCircle = require("../assets/icons/small-green-tick.png");
  const [editProfileImage, setEditProfileImage] = useState("");
  const [editProfileImageObject, setEditProfileImageObject] = useState(null);
  const [portofolioFile, setPortofolioFile] = useState([]);
  const [resumeFile, setResumeFile] = useState([]);
  const paramsValues = window.location.search;
  const urlParams = new URLSearchParams(paramsValues);
  const userId = urlParams.get("userId");
  const userEmail = urlParams.get("userEmail");
  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.png");
  const kidsImage = require("../assets/images/kidsImage.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const [value, setValue] = useState(null);
  const [kidsFillData, setKidsFillData] = useState(null);
  const [parentFirstNameError, setparentFirstNameError] = useState(false);
  const [parentMobileError, setParentMobileError] = useState(false);
  const [parentCountryError, setParentCountryError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [professionError, setProfessionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [preferedNameError, setPreferedNameError] = useState(false);
  const [maritalError, setMaritalError] = useState(false);
  const [nationalityError, setNationalityError] = useState(false);
  const [ethnicityError, setEthnicityError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [parentEmailError, setparentEmailError] = useState(false);
  const [kidsLegalFirstNameError, setkidsLegalFirstNameError] = useState(false);
  const [genderError, setgenderError] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentLastName, setParentLastName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentMobile, setParentMobile] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [kidsPreferedFirstName, setKidsPreferedFirstName] = useState("");
  const [kidsPreferedLastName, setKidsPreferedLastName] = useState("");
  const [kidsLegalFirstName, setKidsLegalFirstName] = useState("");
  const [kidsLegalLastName, setKidsLegalLastName] = useState("");
  const [kidsCity, setKidsCity] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [aboutYou, setAboutYou] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);
  const [publicUrlEdit, setPublicUrlEdit] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [age, setAge] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [completedError, setJobsCompletedError] = useState(false);

  const [allJobsList, setAllJobsList] = useState([]);
  const [selectedLanguageOptions, setSelectedLanguageOptions] = useState([]);
  const [talentId, setTalentId] = useState(null);
  const [talentData, setTalentData] = useState();
  const [publicUrl, setPublicUrl] = useState("");
  const [selectedNationalityOptions, setSelectedNationalityOptions] = useState(
    []
  );
  const [videoUrl, setVideoUrl] = useState("");
  const [completedJobs, setCompletedJobs] = useState("");

  const [audioUrl, setAudioUrl] = useState("");
  const [checkVideoUrl, setCheckVideoUrl] = useState(false);
  const [checkAudioUrl, setCheckAudioUrl] = useState(false);
  const [initialUrl, setInitialUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [audioUrlsList, setAudioUrlsList] = useState([]);
  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };
  const [features, setFeatures] = useState();

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "55px",
    }),
    menu: (provided, state) => ({
      ...provided,
      maxHeight: "500px",
      zIndex: 9999,
    }),
  };

  const maritalStatusOptions = [
    "Single",
    "Married",
    "Divorced",
    "Widowed",
    "In a Relationship",
    "Engaged",
    "Prefer Not to Say",
  ];

  const chooseCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      if (selectedCategories.length < 6) {
        setSelectedCategories([...selectedCategories, category]);
        setCategoryError(false);
      } else {
        setMessage("you can only select 6 categories");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 2000);
      }
    }

    if (selectedCategories.length < 4) {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
  };

  const handleProfessionChange = (selectedOptions) => {
    if (selectedOptions.length > 5) {
      setMessage("You can only select up to 5 skills");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 2000);
      return;
    } else {
      setSelectedProfessions(selectedOptions);
      setProfessionError(false);
    }
  };

  const handleDetailChange = (index, field, value) => {
    const updatedSelectedProfessions = [...selectedProfessions];
    updatedSelectedProfessions[index][field] = value;
    setSelectedProfessions(updatedSelectedProfessions);
    setProfessionError(false);
  };

  const ethnicityOptions = [
    "Khmer",
    "Thai",
    "Asian",
    "Vietnamese",
    "Indonesian",
    "Filipino",
    "Chinese",
    "South-East Asian",
    "South-Asian",
    "Central Asian",
    "Indian",
    "Pakistani",
    "Nepali",
    "Russian",
    "Ukrainian",
    "Japanese",
    "Korean",
    "Latino/Hispanic",
    "European",
    "Scandinavian",
    "Turk",
    "Native American",
    "Native Hawaiian/Pacific Islander",
    "White",
    "Black",
    "African",
    "Middle-Eastern",
    "Arab",
    "Persian",
    "Other",
  ];

  const customStylesProfession = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "45px",
    }),
    menu: (provided, state) => ({
      ...provided,
      maxHeight: "500px",
      zIndex: 9999,
    }),
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {}, [updateDisabled]);

  const handleDateChange = (e) => {
    setValue(e);
    setDob(e);
    let dobDate = new Date(e);
    let today = new Date();
    let diff = today - dobDate;
    let ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    setAge(String(ageInYears));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleEmailChange = (e) => {
    setparentEmailError(false);
    const email = e.target.value;
    setParentEmail(e.target.value);
    setIsValidEmail(emailRegex.test(email));
  };

  const selectEthnicity = (event) => {
    setEthnicity(event.target.value);
    setEthnicityError(false);
  };
  const selectGender = (event) => {
    setGender(event.target.value);
    setgenderError(false);
  };

  const selectLanguage = (selectedOptions) => {
    setLanguageError(false);
    if (!selectedOptions || selectedOptions.length === 0) {
      setLanguages([]);
      setSelectedLanguageOptions([]);
      return;
    }
    const selectedLanguages = selectedOptions.map((option) => option.value);
    setLanguages(selectedLanguages);
    setSelectedLanguageOptions(selectedOptions);
  };

  const selectNationality = (selectedOptions) => {
    setNationalityError(false);
    if (!selectedOptions || selectedOptions.length === 0) {
      setNationality([]);
      setSelectedNationalityOptions([]);
      return;
    }
    const selectedLanguages = selectedOptions.map((option) => option.value);
    setNationality(selectedLanguages);
    setSelectedNationalityOptions(selectedOptions);
  };
  const selectMaritalStatus = (event) => {
    setMaritalStatus(event.target.value);
    setMaritalError(false);
  };

  const getCountries = async () => {
    await ApiHelper.get(API.listCountries)
      .then((resData) => {
        if (resData) {
          setCountryList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    setTalentId(localStorage.getItem("userId"));
    if (talentId) {
      getKidsData();
    }
  }, [talentId]);

  const [services, setServices] = useState();
  const [isBasic, setIsBasic] = useState(false);

  const getKidsData = async () => {
    await ApiHelper.post(`${API.getTalentById}${talentId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData?.data?.data?.type === "kids") {
            if (resData?.data?.data?.planName == "Basic") {
              setIsBasic(true);
            } else {
              setIsBasic(false);
            }
            setLanguages(resData?.data?.data?.languages);
            setCompletedJobs(resData?.data?.data?.noOfJobsCompleted);
            setTalentData(resData.data.data, "resData.data.data");
            setEditProfileImage(resData.data.data?.image?.fileData);
            setKidsFillData(resData.data.data);
            setParentFirstName(resData?.data?.data?.parentFirstName);
            setParentLastName(resData?.data?.data?.parentLastName);
            setParentEmail(resData?.data?.data?.parentEmail);
            setParentMobile(resData?.data?.data?.parentMobileNo);
            setAddress(resData?.data?.data?.parentAddress);
            setKidsLegalFirstName(resData?.data?.data?.childFirstName);
            setKidsLegalLastName(resData?.data?.data?.childLastName);
            setDob(resData?.data?.data?.childDob);
            setCountry(resData?.data?.data?.parentCountry);
            setState(resData?.data?.data?.parentState);
            getStates(resData?.data?.data?.parentCountry);
            setKidsCity(resData?.data?.data?.childCity);
            setAudioUrlsList(
              Array.isArray(resData?.data?.data?.audioList)
                ? resData.data.data.audioList
                : []
            );
            setUrls(
              Array.isArray(resData?.data?.data?.videoList)
                ? resData.data.data.videoList
                : []
            );

            getCities({
              countryName: resData?.data?.data?.parentCountry,
              stateName: resData?.data?.data?.parentState,
            });
            setKidsPreferedFirstName(
              resData?.data?.data?.preferredChildFirstname
            );
            setKidsPreferedLastName(
              resData?.data?.data?.preferredChildLastName
            );
            setGender(resData?.data?.data?.childGender);
            setNationality(resData?.data?.data?.childNationality);
            setMaritalStatus(resData?.data?.data?.maritalStatus);
            setEthnicity(resData?.data?.data?.childEthnicity);
            // setSelectedCategories([
            //   ...selectedCategories,
            //   ...resData.data.data?.relevantCategories,
            // ]);
            setSelectedCategories(resData.data.data?.relevantCategories);
            setAboutYou(resData.data.data?.childAboutYou);
            setPortofolioFile(resData.data.data?.portfolio);
            setResumeFile(resData.data.data?.cv);
            setAge(resData.data.data?.age);

            const selectedNationalityOptions =
              resData.data.data?.childNationality.map((language) => {
                return nationalitiesList.find(
                  (option) => option.label === language
                );
              });
            setSelectedNationalityOptions(selectedNationalityOptions);

            setServices(resData.data.data?.services);
            const selectedProfessionOptions = resData.data.data?.profession.map(
              (profession) => {
                return professionList.find(
                  (option) => option.label === profession
                );
              }
            );

            setSelectedProfessions(resData.data.data?.profession);
            setFeatures(resData?.data?.data?.features);
            setPublicUrl(`${resData?.data?.data?.publicUrl}`);
            setInitialUrl(`${resData?.data?.data?.publicUrl}`);
          } else if (resData?.data?.data?.type === "adults") {
            setTalentData(resData.data.data);
            setCompletedJobs(resData?.data?.data?.noOfJobsCompleted);

            setEditProfileImage(resData.data.data?.image?.fileData);
            setKidsFillData(resData.data.data);
            setParentFirstName(resData?.data?.data?.adultLegalFirstName);
            setParentLastName(resData?.data?.data?.adultLegalLastName);
            setParentEmail(resData?.data?.data?.adultEmail);
            setParentMobile(resData?.data?.data?.childPhone);
            setAddress(resData?.data?.data?.parentAddress);
            setKidsLegalFirstName(resData?.data?.data?.childFirstName);
            setKidsLegalLastName(resData?.data?.data?.childLastName);
            setPublicUrl(`${resData?.data?.data?.publicUrl}`);
            setInitialUrl(`${resData?.data?.data?.publicUrl}`);
            setDob(resData?.data?.data?.childDob);
            setAudioUrlsList(
              Array.isArray(resData?.data?.data?.audioList)
                ? resData.data.data.audioList
                : []
            );

            setUrls(
              Array.isArray(resData?.data?.data?.videoList)
                ? resData.data.data.videoList
                : []
            );

            setCountry(resData?.data?.data?.parentCountry);
            setState(resData?.data?.data?.parentState);
            setKidsCity(resData?.data?.data?.childCity);
            setKidsPreferedFirstName(
              resData?.data?.data?.preferredChildFirstname
            );
            setKidsPreferedLastName(
              resData?.data?.data?.preferredChildLastName
            );
            setGender(resData?.data?.data?.childGender);

            setLanguages(resData?.data?.data?.languages);

            const selectedOptions = resData?.data?.data?.languages.map(
              (language) => {
                return listOfLanguages.find(
                  (option) => option.label === language
                );
              }
            );
            setSelectedLanguageOptions(selectedOptions);

            setNationality(resData?.data?.data?.childNationality);
            setMaritalStatus(resData?.data?.data?.maritalStatus);
            setEthnicity(resData?.data?.data?.childEthnicity);
            setKidsCity(resData?.data?.data?.childCity);
            setSelectedCategories(resData.data.data?.relevantCategories);
            // setSelectedCategories([
            //   ...selectedCategories,
            //   ...resData.data.data?.relevantCategories,
            // ]);
            setAboutYou(resData.data.data?.childAboutYou);
            setPortofolioFile(resData.data.data?.portfolio);
            setResumeFile(resData.data.data?.cv);
            setAge(resData.data.data?.age);

            const selectedNationalityOptions =
              resData.data.data?.childNationality.map((language) => {
                return nationalitiesList.find(
                  (option) => option.label === language
                );
              });
            setSelectedNationalityOptions(selectedNationalityOptions);
            setServices(resData.data.data?.services);
            const selectedProfessionOptions = resData.data.data?.profession.map(
              (profession) => {
                return professionList.find(
                  (option) => option.label === profession
                );
              }
            );
            setSelectedProfessions(resData.data.data?.profession);
            setFeatures(resData?.data?.data?.features);
          }
        }
      })
      .catch((err) => {});
  };

  const handleEditFeatureChanges = (values) => {
    setFeatures(values);
  };

  const handleEditSocialMediaChanges = (values) => {
    // setFeatures(values);
  };

  const handleFeaturesChange = (label, value) => {
    const updatedValues = [...features];
    const index = updatedValues.findIndex((item) => item.label === label);
    let finalValue = value;

    if (
      creatableInputOptions.includes(label) ||
      creatableOptions.includes(label)
    ) {
      if (/^\d+$/.test(value)) {
        finalValue = `${value} cm`;
      } else {
        return;
      }
    }

    if (index !== -1) {
      updatedValues[index] = { label, value: finalValue };
    } else {
      updatedValues.push({ label, value: finalValue });
    }

    setFeatures(updatedValues);
  };

  const handleSelectedCountry = (event) => {
    setParentCountryError(false);

    setCountry(event?.value);
    getStates(event?.value);
  };
  const handleSelectedState = (state) => {
    setStateError(false);
    setState(state?.label);
    getCities({
      countryName: country,
      stateName: state?.label,
    });
  };
  const handleSelectedCity = (state) => {
    setKidsCity(state?.label);
    setCityError(false);
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
      .catch((err) => {});
  };
  const getCities = async (data) => {
    const formData = data;
    await ApiHelper.post(API.listCity, formData)
      .then((resData) => {
        if (resData) {
          setCityList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const basicDetailsUpdate = async () => {
    setMyState(false);
    if (talentData?.type === "kids") {
      if (selectedCategories.length >= 3 && selectedCategories.length <= 6) {
        const formData = {
          parentFirstName: parentFirstName,
          parentLastName: parentLastName,
          parentEmail: parentEmail,
          parentMobileNo: parentMobile,
          parentCountry: country,
          parentState: state,
          parentAddress: address,
          relevantCategories: selectedCategories,
          childFirstName: kidsLegalFirstName,
          childLastName: kidsLegalLastName,
          preferredChildFirstname: kidsPreferedFirstName,
          preferredChildLastName: kidsPreferedLastName,
          childGender: gender,
          childNationality: nationality,
          childEthnicity: ethnicity,
          languages: languages,
          childDob: dateOfBirth,
          childCity: kidsCity,
          childAboutYou: aboutYou,
          profession: selectedProfessions,
          age: age,
          publicUrl: publicUrl,
          noOfJobsCompleted: completedJobs,
        };
        await ApiHelper.post(`${API.editKids}${talentData?._id}`, formData)
          .then((resData) => {
            if (resData.data.status === true) {
              setIsLoading(false);
              setMessage("Updated Successfully!");
              scrollToTop();
              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
                setMyState(true);
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
      } else {
        setMessage("Please Update All Required Fields");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      }
    }
    if (talentData?.type === "adults") {
      if (selectedCategories.length >= 3 && selectedCategories.length <= 6) {
        let formData = {
          adultLegalFirstName: parentFirstName,
          adultLegalLastName: parentLastName,
          preferredChildFirstname: kidsPreferedFirstName,
          preferredChildLastName: kidsPreferedLastName,
          profession: selectedProfessions,
          relevantCategories: selectedCategories,
          childGender: gender,
          maritalStatus: maritalStatus,
          childNationality: nationality,
          childEthnicity: ethnicity,
          languages: languages,
          childDob: dateOfBirth,
          childPhone: parentMobile,
          contactEmail: parentEmail,
          childLocation: address,
          parentCountry: country,
          parentState: state,
          parentAddress: address,
          childCity: kidsCity,
          age: age,
          publicUrl: publicUrl,
          noOfJobsCompleted: completedJobs,
        };
        await ApiHelper.post(`${API.updateAdults}${talentData?._id}`, formData)
          .then((resData) => {
            if (resData.data.status === true) {
              setIsLoading(false);
              setMessage("Updated Successfully!");
              scrollToTop();

              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
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
      } else {
        setMessage("Please Update All Required Fields");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      }
    }
  };

  const [firstNameLetterError, setFirstNameLetterError] = useState(false);
  const [lastNameLetterError, setLastNameLetterError] = useState(false);
  const [kidsLegalFirstLetterError, setKidsLegalFirstError] = useState(false);
  const [kidsLegalLastNameLetterError, setKidsLegalLastNameLetterError] =
    useState(false);
  const [
    kidsPrefferedFirstNameLetterError,
    setKidsPrefferedFirstNameLetterError,
  ] = useState(false);
  const [
    kidsPrefferedLastNameLetterError,
    setKidsPrefferedLastNameLetterError,
  ] = useState(false);

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value?.trim() === "") {
      setFirstNameLetterError(false);
      setParentFirstName("");
    } else if (!onlyLettersRegex.test(value)) {
      setFirstNameLetterError(true);
    } else {
      setParentFirstName(value);
      setFirstNameLetterError(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Backspace") {
      setFirstNameLetterError(false);
    }
  };
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value?.trim() === "") {
      setLastNameLetterError(false);
      setParentLastName("");
    } else if (!onlyLettersRegex.test(value)) {
      setLastNameLetterError(true);
    } else {
      setParentLastName(value);
      setLastNameLetterError(false);
    }
  };

  const handleLastNameKeyPress = (e) => {
    if (e.key === "Backspace") {
      setLastNameLetterError(false);
    }
  };

  const KidsLegalFirstNameChange = (e) => {
    const value = e.target.value;
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
      setKidsLegalFirstError(false);
      setKidsLegalFirstName("");
    } else if (!onlyLettersRegex.test(value)) {
      setKidsLegalFirstError(true);
    } else {
      setKidsLegalFirstName(value);
      setKidsLegalFirstError(false);
    }
  };

  const handleKidsLegalKeyPress = (e) => {
    if (e.key === "Backspace") {
      setKidsLegalFirstError(false);
    }
  };

  const KidsLegalLastNameChange = (e) => {
    const value = e.target.value;
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value?.trim() === "") {
      setKidsLegalLastNameLetterError(false);
      setKidsLegalLastName("");
    } else if (!onlyLettersRegex.test(value)) {
      setKidsLegalLastNameLetterError(true);
    } else {
      setKidsLegalLastName(value);
      setKidsLegalLastNameLetterError(false);
    }
  };

  const handleKidsLegalLastNameKeyPress = (e) => {
    if (e.key === "Backspace") {
      setKidsLegalLastNameLetterError(false);
    }
  };

  const kidsPreferedFirstNameChange = (e) => {
    const value = e.target.value;
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value?.trim() === "") {
      setKidsPrefferedFirstNameLetterError(false);
      setKidsPreferedFirstName("");
    } else if (!onlyLettersRegex.test(value)) {
      setKidsPrefferedFirstNameLetterError(true);
    } else {
      setKidsPreferedFirstName(value);
      setKidsPrefferedFirstNameLetterError(false);
    }
  };

  const handleKidsPrefferedFirstNameKeyPress = (e) => {
    if (e.key === "Backspace") {
      setKidsPrefferedFirstNameLetterError(false);
    }
  };
  const kidsPreferedLastNameChange = (e) => {
    const value = e.target.value;
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value?.trim() === "") {
      setKidsPrefferedLastNameLetterError(false);
      setKidsPreferedLastName("");
    } else if (!onlyLettersRegex.test(value)) {
      setKidsPrefferedLastNameLetterError(true);
    } else {
      setKidsPreferedLastName(value);
      setKidsPrefferedLastNameLetterError(false);
    }
  };

  const handleKidsPrefferedLasttNameKeyPress = (e) => {
    if (e.key === "Backspace") {
      setKidsPrefferedLastNameLetterError(false);
    }
  };

  const [mobileNumError, setMobileNumError] = useState();

  const handleMobileChange = (value, countryData) => {
    setParentMobile(value);
    setParentMobileError(false);
    isValidPhoneNumber(value);
    if (isValidPhoneNumber(value)) {
      setMobileValidationError(false);
      setParentMobile(value);
    } else {
      setMobileValidationError(true);
    }
  };

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
    }
  };

  useEffect(() => {}, [valueTabs]);

  useEffect(() => {}, [editProfileImage]);

  const profileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];

      uploadProfile(fileData);
    }
  };

  // const newPortfolioUpload = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let fileData = event.target.files[0];

  //     uploadNewPortfolio(fileData);
  //   }
  // };

  const newPortfolioUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      const imageFiles = filesArray.filter((file) =>
        file.type.startsWith("image/")
      );
      const nonImageFiles = filesArray.filter(
        (file) => !file.type.startsWith("image/")
      );

      // Check for non-image files
      if (nonImageFiles.length > 0) {
        setMessage("You can only upload images");
        setOpenPopUp(true);
        setTimeout(() => {
          setOpenPopUp(false);
        }, 1000);
        return;
      }

      // Determine allowed file limits based on plan type
      let maxFiles;
      if (talentData?.planName === "Basic") {
        maxFiles = 5;
      } else if (talentData?.planName === "Pro") {
        maxFiles = 15;
      } else if (talentData?.planName === "Premium") {
        maxFiles = Infinity; // Unlimited
      }

      // Check if the current count plus new uploads exceeds the limit
      if (portofolioFile.length + imageFiles.length > maxFiles) {
        let upgradeMessage;
        if (talentData?.planName === "Basic") {
          upgradeMessage = "Upgrade to Pro to add more files.";
        } else if (talentData?.planName === "Pro") {
          upgradeMessage = "Upgrade to Premium to add more files.";
        }

        setMessage(
          `You can upload a maximum of ${maxFiles} images. ${upgradeMessage}`
        );
        setOpenPopUp(true);
        setTimeout(() => {
          setOpenPopUp(false);
        }, 3000);
        return;
      }

      // Upload valid image files
      imageFiles.forEach((file) => {
        uploadNewPortfolio(file);
      });
    }
  };

  const serviceFileInputRefs = useRef([]);

  const serviceFile = (index) => {
    if (serviceFileInputRefs.current[index]) {
      serviceFileInputRefs.current[index].click();
    }
  };

  const newServiceFileUpload = (event, serviceData) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];

      uploadNewServiceFile(fileData, serviceData);
    }
  };

  // const newResumeUpload = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     let fileData = event.target.files[0];

  //     uploadNewResume(fileData);
  //   }
  // };

  const newResumeUpload = (event) => {
    if (talentData?.planName != "Basic") {
      if (event.target.files && event.target.files.length > 0) {
        const filesArray = Array.from(event.target.files);
        const documentFiles = filesArray.filter((file) =>
          isDocumentFile(file.type)
        );
        const nonDocumentFiles = filesArray.filter(
          (file) => !isDocumentFile(file.type)
        );
        if (nonDocumentFiles.length > 0) {
          setMessage("You can only upload PDF, Word documents, etc.");
          setOpenPopUp(true);
          setTimeout(() => {
            setOpenPopUp(false);
          }, 1000);
          return;
        }
        documentFiles.forEach((file) => {
          uploadNewResume(file);
        });
        // Reset the input value to allow re-uploading the same file
      }
    } else {
      let upgradeMessage;
      if (talentData?.planName === "Basic") {
        upgradeMessage = "Upgrade to Pro to add resumes.";
      } else if (talentData?.planName === "Pro") {
        upgradeMessage = "Upgrade to Premium to add resumes.";
      }

      setMessage(`${upgradeMessage}`);
      setOpenPopUp(true);
      setTimeout(() => {
        setOpenPopUp(false);
      }, 3000);
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
        if (resData?.data?.status === true) {
          let fileObj = {
            id: resData.data.data.fileId,
            title: fileData.name,
            fileData: resData.data.data.filename,
            type: resData?.data?.data?.filetype,
          };

          setEditProfileImage(fileObj?.fileData);
          setEditProfileImageObject(fileObj);
          scrollToTop();
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const uploadNewPortfolio = async (fileData) => {
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
        if (resData?.data?.status === true) {
          let fileObj = {
            id: resData.data.data.fileId,
            title: fileData.name,
            fileData: resData.data.data.filename,
            type: resData?.data?.data?.filetype,
          };

          updatePortfolioAPI(fileObj);
          scrollToTop();
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const updatePortfolioAPI = async (fileObj) => {
    let portofolioArray = [...portofolioFile, fileObj];

    let formData;
    if (portofolioArray.length > 0) {
      formData = {
        portfolio: portofolioArray,
      };
    }
    let apiUrl;
    if (talentData?.type == "kids") {
      apiUrl = API.editKids;
    } else if (talentData?.type == "adults") {
      apiUrl = API.updateAdults;
    }
    await ApiHelper.post(`${apiUrl}${talentData?._id}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Portfolio Added Successfully");
          scrollToTop();

          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getKidsData();
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 2000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const uploadNewResume = async (fileData) => {
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
        if (resData?.data?.status === true) {
          let fileObj = {
            id: resData.data.data.fileId,
            title: fileData.name,
            fileData: resData.data.data.filename,
            type: resData?.data?.data?.filetype,
          };
          updateResumeAPI(fileObj);
          scrollToTop();
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const updateResumeAPI = async (fileObj) => {
    let portofolioArray = [...resumeFile, fileObj];

    let formData;
    if (portofolioArray.length > 0) {
      formData = {
        cv: portofolioArray,
      };
    }
    let apiUrl;
    if (talentData?.type == "kids") {
      apiUrl = API.editKids;
    } else if (talentData?.type == "adults") {
      apiUrl = API.updateAdults;
    }
    await ApiHelper.post(`${apiUrl}${talentData?._id}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("File Added Successfully");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getKidsData();
            scrollToTop();
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 2000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const uploadNewServiceFile = async (fileData, serviceData) => {
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
        if (resData?.data?.status === true) {
          let fileObj = {
            id: resData.data.data.fileId,
            title: fileData.name,
            fileData: resData.data.data.filename,
            type: resData?.data?.data?.filetype,
          };
          updateServiceFileAPI(fileObj, serviceData);
          scrollToTop();
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const updateServiceFileAPI = async (fileObj, serviceData) => {
    let serviceFilesArray = [...resumeFile, fileObj];
    let myValue = services.map((item) => {
      if (item?.uniqueId === serviceData?.uniqueId) {
        if (item?.files?.length > 0) {
          return {
            ...item,
            files: [...item?.files, fileObj],
          };
        } else {
          return {
            ...item,
            files: [fileObj],
          };
        }
      }
      return item;
    });

    let formData = {
      services: myValue,
    };

    let apiUrl;
    if (talentData?.type == "kids") {
      apiUrl = API.editKids;
    } else if (talentData?.type == "adults") {
      apiUrl = API.updateAdults;
    }

    await ApiHelper.post(`${apiUrl}${talentData?._id}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("File Added Successfully");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getKidsData();
            scrollToTop();
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 2000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const [myState, setMyState] = useState(false);

  const updateProfileImage = async () => {
    setMyState(false);
    const formData = {
      image: editProfileImageObject,
    };
    if (talentData?.type === "kids") {
      await ApiHelper.post(`${API.editKids}${talentData?._id}`, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Profile image updated Successfully");
            scrollToTop();
            setOpenPopUp(true);
            setTimeout(function () {
              setMyState(true);
              setOpenPopUp(false);
            }, 2000);
          } else if (resData.data.status === false) {
            setIsLoading(false);
            setMessage(resData.data.message);
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
            }, 2000);
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else if (talentData?.type === "adults") {
      await ApiHelper.post(`${API.updateAdults}${talentData?._id}`, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Profile image updated Successfully");
            scrollToTop();

            setOpenPopUp(true);
            setTimeout(function () {
              setMyState(true);
              setOpenPopUp(false);
            }, 2000);
          } else if (resData.data.status === false) {
            setIsLoading(false);
            setMessage(resData.data.message);
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
            }, 2000);
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  const fileInputRef = useRef(null);

  const File = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const portfolioFileInputRef = useRef(null);

  const portfolioFile = () => {
    if (portfolioFileInputRef.current) {
      portfolioFileInputRef.current.click();
    }
  };

  const resumeFileInputRef = useRef(null);

  const resumeFileFunction = () => {
    if (resumeFileInputRef.current) {
      resumeFileInputRef.current.click();
    }
  };

  const viewUpdateFile = (item) => {
    window.open(`${API.userFilePath}${item.fileData}`, "_blank");
  };

  const viewVideoFile = (item) => {
    window.open(item, "_blank");
  };

  const customStylesAlert = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      /* margin: '0 auto', */
      width: "94%",
      maxWidth: "450px",
      minHeight: "270px",
      transform: "translate(-50%, -50%)",
    },
  };

  const deleteProfession = (profession, index) => {
    setSelectedProfessions((prevSelectedProfessions) =>
      prevSelectedProfessions.filter((item) => item.value !== profession.value)
    );
  };

  const [alertpop, setAlertpop] = useState({
    status: false,
    item: "",
    label: "",
    eachService: null,
  });

  const deleteUpdateFile = async () => {
    const formData = {
      element_id: alertpop?.item?.id,
    };
    await ApiHelper.post(`${API.deleteFile}${talentData?._id}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("File Deleted Successfully");
          scrollToTop();

          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getKidsData();
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 2000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const deleteServiceFile = async () => {
    const formData = {
      talentId: talentData?._id,
      serviceUniqueId: alertpop?.eachService?.uniqueId,
      fileId: alertpop?.item?.id,
    };
    await ApiHelper.post(`${API.deleteService}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("File Deleted Successfully");
          scrollToTop();

          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getKidsData();
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 2000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {}, [portofolioFile]);

  const addService = () => {
    setServices([
      ...services,
      {
        serviceName: "",
        serviceAmount: "",
        serviceDuration: "",
        uniqueId: uuidv4(),
      },
    ]);
  };

  const submitServices = async () => {
    let formData = {
      services: services,
    };
    let apiUrl;
    if (talentData?.type == "kids") {
      apiUrl = API.editKids;
    } else if (talentData?.type == "adults") {
      apiUrl = API.updateAdults;
    }
    await ApiHelper.post(`${apiUrl}${talentId}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Services Updated Successfully");
          scrollToTop();

          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
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
  const submitFeatures = async () => {
    let formData = {
      features: features,
    };
    let apiUrl;
    if (talentData?.type == "kids") {
      apiUrl = API.editKids;
    } else if (talentData?.type == "adults") {
      apiUrl = API.updateAdults;
    }
    await ApiHelper.post(`${apiUrl}${talentId}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Features Updated Successfully");
          scrollToTop();

          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
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
  const submitSocialMedia = async () => {
    let formData = {
      features: features,
    };
    let apiUrl;
    if (talentData?.type == "kids") {
      apiUrl = API.editKids;
    } else if (talentData?.type == "adults") {
      apiUrl = API.updateAdults;
    }
    await ApiHelper.post(`${apiUrl}${talentId}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Features Updated Successfully");
          scrollToTop();
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
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

  const handleEditorChange = (index, editorState) => {
    const editInputs = [...services];
    editInputs[index]["editorState"] = editorState;

    setServices(editInputs);
  };

  const handleInputChange = (index, key, value) => {
    const newInputs = [...services];
    newInputs[index][key] = value;

    setServices(newInputs);
  };

  const removeServices = async (data) => {
    let formData = {
      talentId: talentId,
      serviceId: alertpop?.item?.uniqueId,
    };
    await ApiHelper.post(`${API.deleteIndividualService}`, formData)
      .then((resData) => {
        if (resData) {
          setIsLoading(false);
          setMessage("Service Removed Successfully");
          scrollToTop();

          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getKidsData();
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

  const handlePaste = (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );
    setVideoUrl(pastedText);
    // Validate pasted URL
    setCheckVideoUrl(!isValidUrl(pastedText));
    e.preventDefault();
  };

  const deleteVideoUrls = async (item, index) => {
    const formData = {
      talentId: talentId,
      index: index,
    };
    setIsLoading(true);
    await ApiHelper.post(`${API.deleteVideoUrls}`, formData)
      .then((resData) => {
        if (resData.data.message === "URL deleted Successfully") {
          setIsLoading(false);
          setMessage("Deleted Successfully");
          scrollToTop();

          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getKidsData();
          }, 1000);
        } else {
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (option) => {
    if (option === "view") {
      // Code to view the image in a new window
      window.open("your-image-url", "_blank");
    } else if (option === "delete") {
      // Code to delete the image
    }

    // Hide the options after selection
    setShowOptions(false);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const publicUrlChange = async (event) => {
    const inputValue = event.target.value.replace(/ /g, "-");

    const formData = {
      name: inputValue,
      type: "talent",
      category: talentData?.type,
    };
    await ApiHelper.post(`${API.checkPublicUrlName}`, formData)
      .then((resData) => {
        if (resData?.data?.status === true || publicUrl) {
          setPublicUrl(inputValue);
          setErrorMessage("");
        }
        if (resData?.data?.status === false && inputValue != initialUrl) {
          setErrorMessage(
            "Talent name already exists. Please enter a new name."
          );
        }
      })
      .catch((err) => {});
  };

  const updatePublicUrl = async () => {
    if (talentData?.type === "kids") {
      const formData = {
        publicUrl: publicUrl,
      };
      await ApiHelper.post(`${API.editKids}${talentData?._id}`, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Url updated Successfully!");
            setPublicUrlEdit(false);
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
              setMyState(true);
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
    }
    if (talentData?.type === "adults") {
      let formData = {
        publicUrl: publicUrl,
      };
      await ApiHelper.post(`${API.updateAdults}${talentData?._id}`, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Url updated Successfully!");
            setPublicUrlEdit(false);

            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
              setMyState(true);
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
    }
  };

  const isNotKnownFormatUrl = (url) => {
    const isValidAudioUrl = audioUrlPatterns?.audio?.test(url); // Check for audio URLs

    const isValidUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i?.test(url); // Check for valid URL format
    return !(
      (
        audioUrlPatterns.youtube.test(url) ||
        audioUrlPatterns.vimeo.test(url) ||
        audioUrlPatterns.instagram.test(url) ||
        audioUrlPatterns.twitter.test(url) ||
        isValidAudioUrl || // Accept valid audio URLs
        isValidUrl
      ) // Accept any standard valid URL
    );
  };

  const handleAudioUrl = async () => {
    let maxUrls;
    if (talentData?.planName === "Basic") {
      maxUrls = 2;
    } else if (talentData?.planName === "Pro") {
      maxUrls = 5;
    } else if (talentData?.planName === "Premium") {
      maxUrls = Infinity; // Unlimited
    }
    // Check if adding the new URL exceeds the limit
    if (audioUrlsList.length >= maxUrls) {
      let upgradeMessage;
      if (talentData?.planName === "Basic") {
        upgradeMessage = "Upgrade to Pro to add more URLs.";
      } else if (talentData?.planName === "Pro") {
        upgradeMessage = "Upgrade to Premium to add more URLs.";
      }
      setMessage(
        `You can upload a maximum of ${maxUrls} video URLs. ${upgradeMessage}`
      );
      setOpenPopUp(true);
      setTimeout(() => {
        setAudioUrl("");

        setOpenPopUp(false);
      }, 1000);
    } else {
      if (audioUrl.trim() !== "") {
        if (isNotKnownFormatUrl(audioUrl)) {
          setAudioUrlsList([...audioUrlsList, audioUrl]);
          setAudioUrl("");
          setCheckAudioUrl(true);
        } else {
          setCheckAudioUrl(false);
        }
      }
      postNewAudios([...audioUrlsList, audioUrl]);
    }
  };

  const handleUrlChange = (e) => {
    if (e.inputType === "insertFromPaste") return;
    const url = e.target.value;
    setVideoUrl(url);
    // Validate URL in real-time
    setCheckVideoUrl(!isValidUrl(url));
  };

  const handleAudioChange = (e) => {
    if (e.inputType === "insertFromPaste") return;
    const url = e.target.value;
    setAudioUrl(url);
    // Validate URL in real-time
    setCheckAudioUrl(isNotKnownFormatUrl(url));
  };

  const handleAudioPaste = (e) => {
    e.preventDefault();
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );
    setAudioUrl(pastedText);
    // Validate pasted URL
    setCheckAudioUrl(isNotKnownFormatUrl(pastedText));
  };

  const handleAddUrl = async () => {
    if (videoUrl.trim() !== "") {
      if (isValidUrl(videoUrl)) {
        if (!Array.isArray(urls)) {
          console.error("urls is not an array:", urls);
          return;
        }

        let maxUrls;
        if (talentData?.planName === "Basic") {
          maxUrls = 2;
        } else if (talentData?.planName === "Pro") {
          maxUrls = 5;
        } else if (talentData?.planName === "Premium") {
          maxUrls = Infinity; // Unlimited
        }

        // Check if adding the new URL exceeds the limit
        if (urls.length >= maxUrls) {
          let upgradeMessage;
          if (talentData?.planName === "Basic") {
            upgradeMessage = "Upgrade to Pro to add more URLs.";
          } else if (talentData?.planName === "Pro") {
            upgradeMessage = "Upgrade to Premium to add more URLs.";
          }

          setMessage(
            `You can upload a maximum of ${maxUrls} video URLs. ${upgradeMessage}`
          );
          setOpenPopUp(true);
          setTimeout(() => {
            setVideoUrl("");
            setOpenPopUp(false);
          }, 1000);
          return;
        }

        setUrls([...urls, videoUrl]);
        setVideoUrl("");
        setCheckVideoUrl(false);
      } else {
        setCheckVideoUrl(true);
      }
    }
    postNewVideos([...urls, videoUrl]);
  };

  const handleJobsCompleted = (event) => {
    setCompletedJobs(event.target.value);

    setJobsCompletedError(false);
  };

  const handleDeleteUrl = async (index) => {
    const newUrls = urls.filter((url, i) => i !== index);
    setUrls(newUrls);

    let apiName;
    if (talentData?.type === "adults") {
      apiName = `${API.deleteVideoUrls}`;
    } else {
      apiName = `${API.deleteVideoUrls}`;
    }
    const formData = {
      talentId: talentData?._id,
      index: index,
    };
    setIsLoading(true);
    await ApiHelper.post(`${apiName}`, formData)
      .then((resData) => {
        if (resData?.data?.status) {
          setIsLoading(false);
          setMessage("Deleted Successfully");
          scrollToTop();
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        } else {
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const deleteAudioUrl = async (index) => {
    const newUrls = audioUrlsList.filter((url, i) => i !== index);
    setAudioUrlsList(newUrls);

    let apiName;
    if (talentData?.type === "adults") {
      apiName = `${API.deleteAudioUrls}`;
    } else {
      apiName = `${API.deleteAudioUrls}`;
    }
    const formData = {
      talentId: talentData?._id,
      index: index,
    };
    setIsLoading(true);
    await ApiHelper.post(`${apiName}`, formData)
      .then((resData) => {
        if (resData?.data?.status === true) {
          setIsLoading(false);
          setMessage("Deleted Successfully");
          scrollToTop();
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        } else {
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const postNewVideos = async (urlsData) => {
    let apiName;
    if (talentData?.type === "adults") {
      apiName = `${API.updateAdults}`;
    } else {
      apiName = `${API.editKids}`;
    }
    if (urlsData.length > 0) {
      const formData = {
        videoList: urlsData,
      };
      setIsLoading(true);
      await ApiHelper.post(`${apiName}${talentData?._id}`, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Updated Successfully");
            scrollToTop();

            setOpenPopUp(true);
            setTimeout(function () {
              setVideoUrl("");
              getKidsData();

              setOpenPopUp(false);
            }, 1000);
          } else {
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };
  const postNewAudios = async (urlsData) => {
    let apiName;
    if (talentData?.type === "adults") {
      apiName = `${API.updateAdults}`;
    } else {
      apiName = `${API.editKids}`;
    }
    if (urlsData.length > 0) {
      const formData = {
        audioList: urlsData,
      };
      setIsLoading(true);
      await ApiHelper.post(`${apiName}${talentData?._id}`, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Updated Successfully");
            scrollToTop();
            setOpenPopUp(true);
            setTimeout(function () {
              setAudioUrl("");
              getKidsData();
              setOpenPopUp(false);
            }, 1000);
          } else {
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
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
  const [videoAnchor, setVideoAnchor] = useState(null);

  const videoOpen = Boolean(videoAnchor);
  const [selectedVideoItem, setSelectedVideoItem] = useState(null); // Track the selected item

  // Single function to handle menu open
  const handleVideoClick = (event, item) => {
    setVideoAnchor(event.currentTarget);
    setSelectedVideoItem(item); // Set the selected item
  };

  const handleVideoClose = () => {
    setVideoAnchor(null);
    setSelectedVideoItem(null); // Reset the selected item when closing the menu
  };

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} myState={myState} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
        }`}
      >
        <TalentSideMenu myState={myState} />
      </div>

      <main
        style={allJobsList?.length === 0 ? {} : {}}
        id="mainBrand"
        className={`profileCont brand-main-container ${
          showSidebar ? "" : "main-pd"
        }`}
      >
        <div className="brand-content-main boxBg edit_talentprofile">
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
                <Tab
                  label="Social Media"
                  {...a11yProps(2)}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Portfolio"
                  {...a11yProps(3)}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Videos & Audios"
                  {...a11yProps(4)}
                  style={{ textTransform: "capitalize" }}
                />

                <Tab
                  label="Services"
                  {...a11yProps(5)}
                  style={{ textTransform: "capitalize" }}
                />

                <Tab
                  label="Features"
                  {...a11yProps(6)}
                  style={{ textTransform: "capitalize" }}
                />

                <Tab
                  label="CV"
                  {...a11yProps(7)}
                  style={{ textTransform: "capitalize" }}
                />

                {/* <Tab
                  label="Reviews"
                  {...a11yProps(7)}
                  style={{ textTransform: "capitalize" }}
                /> */}
              </Tabs>
            </Box>
            <CustomTabPanel value={valueTabs} index={0}>
              <div className="profile-image-edit-section  mt-5">
                <div className="profileImg">
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
              <div className="kids-main ">
                <div className="kids-form-title kids-form-title mb-3">
                  <span>Personal Details</span>
                </div>
                {talentData?.type === "adults" && (
                  <>
                    <div className="row">
                      <div className="kids-form-section col-md-6 mb-3">
                        <label className="form-label">
                          Legal First Name
                          <span className="mandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={parentFirstName}
                          onChange={(e) => {
                            handleFirstNameChange(e);
                            setparentFirstNameError(false);
                          }}
                          onKeyDown={handleKeyPress}
                          placeholder="Enter Legal First Name"
                        ></input>
                        {parentFirstNameError && (
                          <div className="invalid-fields">
                            Please enter First Name
                          </div>
                        )}
                        {firstNameLetterError && (
                          <div className="invalid-fields">
                            Only Letters are allowed
                          </div>
                        )}
                      </div>
                      <div className="kids-form-section col-md-6 mb-3">
                        <label className="form-label">Legal Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={parentLastName}
                          onChange={(e) => {
                            handleLastNameChange(e);
                          }}
                          onKeyDown={handleLastNameKeyPress}
                          placeholder="Enter Legal Last Name"
                        ></input>
                        {lastNameLetterError && (
                          <div className="invalid-fields">
                            Only Letters are allowed
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {talentData?.type === "kids" && (
                  <div className="row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">
                        Legal First Name
                        <span className="mandatory">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          KidsLegalFirstNameChange(e);
                          setkidsLegalFirstNameError(false);
                        }}
                        onKeyDown={handleKidsLegalKeyPress}
                        value={kidsLegalFirstName}
                        placeholder="Enter Legal First Name"
                      ></input>
                      {kidsLegalFirstNameError && (
                        <div className="invalid-fields">
                          Please enter First Name
                        </div>
                      )}
                      {kidsLegalFirstLetterError && (
                        <div className="invalid-fields">
                          Only Letters Allowed
                        </div>
                      )}
                    </div>
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Legal Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={kidsLegalLastName}
                        onChange={(e) => {
                          KidsLegalLastNameChange(e);
                        }}
                        onKeyDown={handleKidsLegalLastNameKeyPress}
                        placeholder="Enter Legal Last Name"
                      ></input>
                      {kidsLegalLastNameLetterError && (
                        <div className="invalid-fields">
                          Only Letters Allowed
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="row">
                  <div className="kids-form-section  col-md-6 mb-3">
                    <label className="form-label">
                      Preferred First Name
                      <span className="mandatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={kidsPreferedFirstName}
                      onChange={(e) => {
                        kidsPreferedFirstNameChange(e);
                        setPreferedNameError(false);
                      }}
                      onKeyDown={handleKidsPrefferedFirstNameKeyPress}
                      placeholder="Enter Preferred  First Name"
                    ></input>
                    {preferedNameError && (
                      <div className="invalid-fields">
                        Please enter Preferred First Name
                      </div>
                    )}
                    {kidsPrefferedFirstNameLetterError && (
                      <div className="invalid-fields">Only Letters Allowed</div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">Preferred Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={kidsPreferedLastName}
                      onChange={(e) => {
                        kidsPreferedLastNameChange(e);
                      }}
                      onKeyDown={handleKidsPrefferedLasttNameKeyPress}
                      placeholder="Enter Preferred  Last Name"
                    ></input>
                    {kidsPrefferedLastNameLetterError && (
                      <div className="invalid-fields">Only Letters Allowed</div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">
                      Ethnicity <span className="mandatory">*</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectEthnicity}
                      value={ethnicity}
                      style={{ fontSize: "14px" }}
                    >
                      <option value="" disabled>
                        Select Ethnicity
                      </option>
                      {ethnicityOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {ethnicityError && (
                      <div className="invalid-fields">
                        Please select Ethnicity
                      </div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">
                      Nationality <span className="mandatory">*</span>
                    </label>
                    <Select
                      isMulti
                      name="colors"
                      options={nationalitiesList}
                      valueField="value"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(value) => selectNationality(value)}
                      styles={customStylesProfession}
                      value={selectedNationalityOptions}
                      menuPlacement="auto"
                      menuPortalTarget={document.body}
                      menuShouldScrollIntoView={false}
                    />
                    {nationalityError && (
                      <div className="invalid-fields">
                        Please select Nationality
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">
                      Date Of Birth <span className="mandatory">*</span>
                    </label>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={dateOfBirth}
                        onChange={(newValue) => {
                          handleDateChange(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        disableFuture
                      />
                    </LocalizationProvider>

                    {dobError && (
                      <div className="invalid-fields">
                        Please select Date Of Birth
                      </div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">
                      Language <span className="mandatory">*</span>
                    </label>
                    <Select
                      isMulti
                      name="colors"
                      options={listOfLanguages}
                      valueField="value"
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(value) => selectLanguage(value)}
                      styles={customStylesProfession}
                      value={selectedLanguageOptions}
                    />
                    {languageError && (
                      <div className="invalid-fields">
                        Please select Language
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">
                      Gender <span className="mandatory">*</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectGender}
                      style={{ fontSize: "14px" }}
                      value={gender}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      {gendersList?.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {genderError && (
                      <div className="invalid-fields">Please select Gender</div>
                    )}
                  </div>
                  {talentData?.type != "kids" && (
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Marital Status</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={selectMaritalStatus}
                        value={maritalStatus}
                      >
                        <option value="" disabled selected>
                          Select Marital Status
                        </option>
                        {maritalStatusOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">
                      Mobile No <span className="mandatory">*</span>
                    </label>

                    <MuiPhoneNumber
                      value={parentMobile}
                      defaultCountry={"kh"}
                      countryCodeEditable={false}
                      className="material-mobile-style"
                      onChange={handleMobileChange}
                    />
                    {mobileValidationError && (
                      <div className="invalid-fields">
                        Please enter correct Mobile Number
                      </div>
                    )}

                    {parentMobileError && (
                      <div className="invalid-fields">
                        Please enter Mobile Number
                      </div>
                    )}
                    {mobileNumError && (
                      <div className="invalid-fields">Only Numbers Allowed</div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">
                      E-mail <span className="mandatory">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        !isValidEmail ? "is-invalid" : "form-control"
                      }`}
                      onChange={handleEmailChange}
                      placeholder="Enter E-mail"
                      value={parentEmail}
                      disabled={true}
                    />
                    {!isValidEmail && (
                      <div className="invalid-feedback">
                        Please enter a valid email address.
                      </div>
                    )}
                    {parentEmailError && (
                      <div className="invalid-fields">Please enter Email</div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">
                      Country<span className="mandatory">*</span>
                    </label>
                    <Select
                      placeholder="Search country..."
                      options={countryList?.map((country, index) => ({
                        value: country,
                        label: country,
                        key: index,
                      }))}
                      // value={{ value: country, label: country }}
                      value={
                        country ? { value: country, label: country } : null
                      }
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
                    <label className="form-label">
                      State<span className="mandatory">*</span>
                    </label>
                    <Select
                      placeholder="Select state..."
                      options={stateList?.map((state) => ({
                        value: state.stateId, // or whatever unique identifier you want to use
                        label: state.name,
                      }))}
                      value={state ? { value: state, label: state } : null}
                      onChange={handleSelectedState}
                      isSearchable={true}
                    />
                    {stateError && (
                      <div className="invalid-fields">Please select State</div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <Select
                      placeholder="Select City..."
                      options={cityList?.map((city) => ({
                        value: city.cityId, // or whatever unique identifier you want to use
                        label: city.name,
                      }))}
                      value={
                        kidsCity ? { value: kidsCity, label: kidsCity } : null
                      }
                      onChange={handleSelectedCity}
                      isSearchable={true}
                    />
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">
                      Projects Completed
                      <span className="mandatory">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control projects-completed"
                      value={completedJobs}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (
                          /^\d*\.?\d*$/.test(value) &&
                          (value >= 0 || value === "")
                        ) {
                          handleJobsCompleted(e);
                          setJobsCompletedError(false);
                        }
                      }}
                      min="0"
                      placeholder="Number of jobs/client projects completed"
                    ></input>
                    {completedError && (
                      <div className="invalid-fields">
                        Please enter Projects Completed
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="kids-form-section col-md-12 mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Address<span className="mandatory">*</span>
                    </label>
                    <textarea
                      className="contact-us-textarea w-100"
                      id="exampleFormControlTextarea1"
                      value={address}
                      rows="3"
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setAddressError(false);
                      }}
                    ></textarea>
                    {addressError && (
                      <div className="invalid-fields">Please enter Address</div>
                    )}
                  </div>
                </div>
                {talentData?.type === "kids" && (
                  <div className="kids-form-title mb-3 ">
                    Your Child Details
                  </div>
                )}
                <div className="profession-section-cover">
                  <div className="row">
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label pay-info">
                          Profession / Skills (Choose any 5)
                          <span className="mandatory">*</span>
                        </label>
                        <div>
                          <Select
                            defaultValue={[]}
                            isMulti
                            name="professions"
                            options={professionList}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Search for Profession / Skills"
                            onChange={handleProfessionChange}
                            styles={customStyles}
                            value={selectedProfessions}
                          />
                          {professionError && (
                            <div className="invalid-fields">
                              Please choose Profession
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="profession-content-section">
                    {selectedProfessions.length > 0 && (
                      <>
                        <p className="set-rates">
                          *Set Your Rates in USD (Choose one or more rates for
                          each selected skill)
                        </p>
                      </>
                    )}

                    {selectedProfessions.map((profession, index) => (
                      <>
                        <div>
                          <label className="form-label">
                            {profession.label}
                          </label>
                        </div>
                        <div
                          key={index}
                          className="dynamic-profession newAlign"
                        >
                          <div className="algSepc">
                            <div className="row">
                              <div className="mb-3 col-md-3 divSep">
                                <input
                                  type="number"
                                  className="form-control profession-input"
                                  value={profession.perHourSalary || ""}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Check if the value is a valid number and is non-negative
                                    if (
                                      /^\d*\.?\d*$/.test(value) &&
                                      (value >= 0 || value === "")
                                    ) {
                                      handleDetailChange(
                                        index,
                                        "perHourSalary",
                                        value
                                      );
                                    }
                                  }}
                                  placeholder="$/hr"
                                  min="0"
                                ></input>
                              </div>
                              <div className="mb-3 col-md-3 divSep">
                                <input
                                  type="number"
                                  className="form-control profession-input"
                                  value={profession.perDaySalary || ""}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Check if the value is a valid number and is non-negative
                                    if (
                                      /^\d*\.?\d*$/.test(value) &&
                                      (value >= 0 || value === "")
                                    ) {
                                      handleDetailChange(
                                        index,
                                        "perDaySalary",
                                        value
                                      );
                                    }
                                  }}
                                  placeholder="$/day"
                                  min="0"
                                ></input>
                              </div>

                              {profession?.value == "Creator" && (
                                <>
                                  <div className="mb-3 col-md-2 divSep">
                                    <input
                                      type="number"
                                      className="form-control profession-input"
                                      value={profession.perPostSalary || ""}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        // Check if the value is a valid number and is non-negative
                                        if (
                                          /^\d*\.?\d*$/.test(value) &&
                                          (value >= 0 || value === "")
                                        ) {
                                          handleDetailChange(
                                            index,
                                            "perPostSalary",
                                            value
                                          );
                                        }
                                      }}
                                      placeholder="$/post"
                                      min="0"
                                    ></input>
                                  </div>
                                  <div className="mb-3 col-md-2 divSep">
                                    <input
                                      type="number"
                                      className="form-control profession-input"
                                      value={profession.perImageSalary || ""}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        // Check if the value is a valid number and is non-negative
                                        if (
                                          /^\d*\.?\d*$/.test(value) &&
                                          (value >= 0 || value === "")
                                        ) {
                                          handleDetailChange(
                                            index,
                                            "perImageSalary",
                                            value
                                          );
                                        }
                                      }}
                                      placeholder="$/image"
                                      min="0"
                                    ></input>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="offer-wrapper">
                            <input
                              className="profession-checkbox"
                              id={profession.label}
                              type="checkbox"
                              checked={profession.openToOffers || false}
                              onChange={(e) =>
                                handleDetailChange(
                                  index,
                                  "openToOffers",
                                  e.target.checked
                                )
                              }
                            />
                            <label
                              className="form-label offer-label"
                              htmlFor={profession.label}
                            >
                              Negotiable
                            </label>
                            <div>
                              <i
                                onClick={(e) => {
                                  deleteProfession(profession, index);
                                }}
                                className="bi bi-trash"
                              ></i>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="kids-form-title">
                  Select 3 to 6 categories relevant to your profile
                  <span className="mandatory">*</span>
                </div>
                <div className="category-list">
                  {categoryList?.map((category, index) => (
                    <div
                      className={
                        selectedCategories.includes(category?.value)
                          ? "selected-category"
                          : "category-name"
                      }
                      onClick={(e) => {
                        chooseCategory(category?.value);
                      }}
                      key={index}
                      data-tooltip-id={`tooltip-${index}`}
                    >
                      {category?.value}
                      <Tooltip
                        id={`tooltip-${index}`}
                        place="top"
                        content={category?.description}
                      />
                    </div>
                  ))}
                </div>
                {/* {categoryError && (
                  <div className="invalid-fields">Please choose Categories</div>
                )} */}
                {(selectedCategories?.length < 3 ||
                  selectedCategories?.length > 6) &&
                  categoryError && (
                    <div className="invalid-fields">
                      Please select 3 to 6 categories relevant to your profile
                    </div>
                  )}
                <div className="row">
                  <div className="kids-form-section  col-md-9 mb-3 mt-3">
                    <label className="form-label">Public Url</label>
                    <div className="public-url-wrapper">
                      {!publicUrlEdit && (
                        <>
                          <div className="public-url-text">
                            {`https://brandsandtalent.com/talent/${publicUrl}`}
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
                          {`https://brandsandtalent.com/talent/`}
                        </div>
                      )}

                      {publicUrlEdit && (
                        <>
                          <input
                            type="text"
                            className="form-control public-url-input"
                            value={publicUrl}
                            onChange={(e) => {
                              publicUrlChange(e);
                            }}
                            placeholder="Edit url"
                          ></input>
                        </>
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
                      <div className="invalid-fields pt-2">{errorMessage}</div>
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
            <CustomTabPanel value={valueTabs} index={2}>
              {talentData && (
                <>
                  <div className="mt-4">
                    <div className="row">
                      <EditSocialMedias
                        talentData={talentData}
                        onValuesChange={handleEditSocialMediaChanges}
                      />
                    </div>
                  </div>
                </>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={3}>
              <div className="update-portfolio-section ">
                <div className="update-portfolio-cards-wrapper">
                  <div className="update-portfolio-title">Portfolio </div>
                  <label className="form-label">
                    Build a stunning portfolio by adding your photos or sample
                    work photos that showcases your strengths
                  </label>

                  {talentData?.portfolio?.length === 0 && (
                    <>
                      <div className="update-portfolio-label">
                        Add Your work samples here
                      </div>

                      {/* <div className="no-data">Please Add Files</div> */}
                    </>
                  )}
                  <div className="row">
                    {talentData &&
                      talentData?.portfolio?.length > 0 &&
                      talentData?.portfolio?.map((item) => {
                        return (
                          <>
                            <div className="col-md-6">
                              <div className="update-portfolio-cards">
                                <div className="update-portfolio-icon">
                                  <div className="file-section">
                                    {item.type === "image" && (
                                      <div className="fileType">
                                        <i className="bi bi-card-image"></i>
                                      </div>
                                    )}
                                    <div className="update-portfolio-fileName pl-0">
                                      {item.title}
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
                                            viewUpdateFile(
                                              selectedPortfolioItem
                                            ); // Use selected item
                                          }}
                                        >
                                          View
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() => {
                                            dropDownClose();
                                            setAlertpop({
                                              status: true,
                                              item: item,
                                              label: "delete",
                                              eachService: null,
                                            });
                                          }}
                                        >
                                          Delete
                                        </MenuItem>
                                      </Menu>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                  <div className="add-portfoli-section">
                    <div className="add-portfolia-btn">
                      <input
                        type="file"
                        className="select-cv-input"
                        id="profile-image"
                        accept="image/*"
                        onChange={newPortfolioUpload}
                        ref={portfolioFileInputRef}
                      />
                      <Button
                        onClick={portfolioFile}
                        className="edit-profileimg-btn"
                        variant="text"
                        style={{ textTransform: "capitalize" }}
                      >
                        Add Portfolio
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CustomTabPanel>

            <CustomTabPanel value={valueTabs} index={4}>
              <div className="update-portfolio-section ">
                <div className="update-portfolio-cards-wrapper">
                  <div className="update-portfolio-title">Videos & Audios</div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Videos</label>
                      <div className="videos-label">
                        ( Upload your previous work samples videos.)
                      </div>
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control mt-2 ml-3"
                          value={videoUrl}
                          onChange={(e) => {
                            handleUrlChange(e);
                          }}
                          onPaste={handlePaste}
                          placeholder="Paste Video Url"
                        ></input>
                        <i
                          className="bi bi-plus-circle-fill pl-4 add-vidoe-icon"
                          onClick={handleAddUrl}
                        ></i>
                      </div>
                      {checkVideoUrl && (
                        <>
                          <div className="invalid-fields">
                            Invalid video URL. Please enter a valid YouTube,
                            Vimeo, Instagram, or Twitter URL.
                          </div>
                        </>
                      )}

                      {urls && (
                        <>
                          {urls.map((url, index) => {
                            return (
                              <>
                                <div
                                  key={index}
                                  className="url-file-wrapper urlSect mt-2"
                                >
                                  <div className="file-section">
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="url-fileName"
                                    >
                                      {url}
                                    </a>
                                  </div>

                                  <div className="update-portfolio-action">
                                    <IconButton
                                      aria-label="more"
                                      aria-controls={`dropdown-menu-${index}`}
                                      aria-haspopup="true"
                                      onClick={(event) =>
                                        handleVideoClick(event, url)
                                      }
                                    >
                                      <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                      id={`dropdown-menu-${index}`} // Use unique ID
                                      anchorEl={videoAnchor} // Correct prop name
                                      open={videoOpen} // Control visibility
                                      onClose={handleVideoClose}
                                    >
                                      <MenuItem
                                        onClick={() => {
                                          handleVideoClose();
                                          handleDeleteUrl(index);
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
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Audios</label>
                      <div className="videos-label">
                        ( Upload your previous work samples Audios.)
                      </div>
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control mt-2 ml-3"
                          value={audioUrl}
                          onChange={(e) => {
                            handleAudioChange(e);
                          }}
                          onPaste={handleAudioPaste}
                          placeholder="Paste Audio Url"
                        ></input>
                        <i
                          className="bi bi-plus-circle-fill pl-4 add-vidoe-icon"
                          onClick={handleAudioUrl}
                        ></i>
                      </div>
                      {checkAudioUrl && (
                        <>
                          <div className="invalid-fields">
                            Invalid Audio URL. Please enter a valid Audio URL .
                          </div>
                        </>
                      )}

                      {audioUrlsList && (
                        <>
                          {audioUrlsList.map((url, index) => {
                            return (
                              <>
                                <div
                                  key={index}
                                  className="url-file-wrapper mt-2"
                                >
                                  <div className="file-section">
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="url-fileName"
                                    >
                                      {url}
                                    </a>
                                  </div>

                                  <div className="update-portfolio-action">
                                    <IconButton
                                      aria-label="more"
                                      aria-controls="dropdown-menu"
                                      aria-haspopup="true"
                                      onClick={handleClick}
                                    >
                                      <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                      id="dropdown-menu"
                                      anchorEl={anchorEl}
                                      open={Boolean(anchorEl)}
                                      onClose={handleClose}
                                    >
                                      <MenuItem
                                        onClick={() => {
                                          dropDownClose();
                                          deleteAudioUrl(index);
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
                  <div className="row">
                    <div className="col-md-6">
                      {talentData?.videoAudioUrls?.length === 0 && (
                        <>
                          <div className="update-portfolio-label">
                            Add Your work samples here
                          </div>
                          {/* <div className="no-data">Please Add Files</div> */}
                        </>
                      )}
                      {talentData &&
                        talentData?.videoAudioUrls?.length > 0 &&
                        talentData?.videoAudioUrls?.map((item, index) => {
                          return (
                            <>
                              <div className="update-portfolio-cards">
                                <div className="update-portfolio-icon">
                                  <div className="file-section">
                                    {/* {item.type === "audio" && (
                                      <div className="fileType">
                                        <i className="bi bi-mic-fill"></i>
                                      </div>
                                    )}
                                                                        {item.type === "document" && (
                                      <div className="fileType">
                                        <i className="bi bi-file-earmark-richtext"></i>
                                      </div>
                                    )} */}
                                    <div className="fileType">
                                      <i className="bi bi-play-circle-fill"></i>
                                    </div>
                                    <div className="update-portfolio- pl-0">
                                      {item}
                                    </div>

                                    <div className="update-portfolio-action">
                                      <IconButton
                                        aria-label="more"
                                        aria-controls="dropdown-menu"
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                      >
                                        <MoreVertIcon />
                                      </IconButton>
                                      <Menu
                                        id="dropdown-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                      >
                                        <MenuItem
                                          onClick={() => {
                                            handleClose();
                                            viewVideoFile(item);
                                          }}
                                        >
                                          View
                                        </MenuItem>
                                        <MenuItem
                                          onClick={() => {
                                            dropDownClose();
                                            deleteVideoUrls(item, index);
                                          }}
                                        >
                                          Delete
                                        </MenuItem>
                                      </Menu>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  </div>

                  <div className="add-portfoli-section">
                    <div className="add-portfolia-btn">
                      {/* <input
                        type="file"
                        className="select-cv-input"
                        id="profile-image"
                        accept="audio/*,video/*"
                        onChange={newVideoUpload}
                        ref={videoFileInputRef}
                      /> */}
                      {/* <Button
                        onClick={() => {
                          submitVideoAudios();
                        }}
                        className="edit-profileimg-btn"
                        variant="text"
                        style={{ textTransform: "capitalize" }}
                      >
                        Submit
                      </Button> */}
                    </div>
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={5}>
              {isBasic == false && (
                <>
                  <div className="update-portfolio-section">
                    <div className="update-service-cards-wrapper edit-service-section-main">
                      {services &&
                        services?.length > 0 &&
                        services?.map((eachService, servicesIndex) => {
                          return (
                            <>
                              <div className="edit-service-section-wrapper">
                                <div className="edit-service-header">
                                  <h5>{eachService.serviceName}</h5>
                                  <div>
                                    <i
                                      className="bi bi-trash"
                                      onClick={(e) => {
                                        setAlertpop({
                                          status: true,
                                          item: eachService,
                                          label: "delete-individual-service",
                                          eachService: null,
                                        });
                                      }}
                                    ></i>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="kids-form-section col-md-6 mb-3">
                                    <label className="form-label">
                                      Service Name
                                      <span className="mandatory">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Custom Photoshoot"
                                      value={eachService.serviceName}
                                      onChange={(e) =>
                                        handleInputChange(
                                          servicesIndex,
                                          "serviceName",
                                          e.target.value
                                        )
                                      }
                                    ></input>
                                  </div>
                                  <div className="kids-form-section col-md-6 mb-3">
                                    <label className="form-label">
                                      Rates (in USD)
                                      <span className="mandatory">*</span>
                                    </label>
                                    <input
                                      min="0"
                                      type="number"
                                      className="form-control"
                                      placeholder="$200 per hour (negotiable)"
                                      value={eachService.serviceAmount}
                                      onChange={(e) =>
                                        handleInputChange(
                                          servicesIndex,
                                          "serviceAmount",
                                          e.target.value
                                        )
                                      }
                                    ></input>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="kids-form-section col-md-6 mb-2">
                                    <label className="form-label">
                                      Short Description
                                      <span className="mandatory">*</span>
                                    </label>
                                    <RichTextEditor
                                      from={"service"}
                                      value={eachService?.editorState}
                                      onChange={(editorState) =>
                                        handleEditorChange(
                                          servicesIndex,
                                          editorState
                                        )
                                      }
                                    />
                                  </div>
                                  {/* <div className="kids-form-section col-md-6 mb-3">
                                    <label className="form-label">
                                      Service Duration
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Service Duration"
                                      value={eachService.serviceDuration}
                                      onChange={(e) =>
                                        handleInputChange(
                                          servicesIndex,
                                          "serviceDuration",
                                          e.target.value
                                        )
                                      }
                                    ></input>
                                  </div> */}

                                  <div className="kids-form-section col-md-6 mb-3">
                                    <label className="form-label">
                                      Delivery Time
                                    </label>
                                    <div className="duration-splitter">
                                      <div className="duration-value-main">
                                        <input
                                          type="text"
                                          name="duration"
                                          value={eachService.serviceDuration}
                                          onChange={(e) =>
                                            handleInputChange(
                                              servicesIndex,
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
                                          value={eachService.serviceTime}
                                          onChange={(e) =>
                                            handleInputChange(
                                              servicesIndex,
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
                                <div className="service-files-main uplWraps">
                                  <div className="wraper">
                                    {" "}
                                    <div className="row">
                                      <div className="col-md-6">
                                        <div>
                                          {eachService?.files?.length > 0 &&
                                            eachService?.files?.map((item) => {
                                              return (
                                                <>
                                                  <div className="update-portfolio-cards">
                                                    <div className="update-portfolio-icon">
                                                      <div className="file-section">
                                                        {item.type ===
                                                          "audio" && (
                                                          <div className="fileType">
                                                            <i className="bi bi-mic-fill"></i>
                                                          </div>
                                                        )}
                                                        {item.type ===
                                                          "video" && (
                                                          <div className="fileType">
                                                            <i className="bi bi-play-circle-fill"></i>
                                                          </div>
                                                        )}
                                                        {item.type ===
                                                          "document" && (
                                                          <div className="fileType">
                                                            <i className="bi bi-file-earmark-richtext"></i>
                                                          </div>
                                                        )}
                                                        <div className="update-portfolio-fileName pl-0">
                                                          {item.title}
                                                        </div>

                                                        <div className="ml-2">
                                                          <IconButton
                                                            aria-label="more"
                                                            aria-controls="dropdown-menu"
                                                            aria-haspopup="true"
                                                            onClick={
                                                              handleClick
                                                            }
                                                          >
                                                            <MoreVertIcon />
                                                          </IconButton>
                                                          <Menu
                                                            id="dropdown-menu"
                                                            anchorEl={anchorEl}
                                                            open={Boolean(
                                                              anchorEl
                                                            )}
                                                            onClose={
                                                              handleClose
                                                            }
                                                          >
                                                            <MenuItem
                                                              onClick={() => {
                                                                handleClose();
                                                                viewUpdateFile(
                                                                  item
                                                                );
                                                              }}
                                                            >
                                                              View
                                                            </MenuItem>
                                                            <MenuItem
                                                              onClick={(e) => {
                                                                dropDownClose();
                                                                setAlertpop({
                                                                  status: true,
                                                                  item: item,
                                                                  label:
                                                                    "delete-service",
                                                                  eachService:
                                                                    eachService,
                                                                });
                                                              }}
                                                            >
                                                              Delete
                                                            </MenuItem>
                                                          </Menu>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </>
                                              );
                                            })}
                                        </div>

                                        <div className="add-service-section">
                                          <div className="add-portfolia-btn">
                                            <input
                                              type="file"
                                              className="select-cv-input"
                                              id={servicesIndex}
                                              accept="image/*"
                                              onChange={(e) =>
                                                newServiceFileUpload(
                                                  e,
                                                  eachService
                                                )
                                              }
                                              ref={(el) =>
                                                (serviceFileInputRefs.current[
                                                  servicesIndex
                                                ] = el)
                                              }
                                            />
                                            <div className="btnWraper">
                                              <div
                                                className="add-more-files-btn"
                                                onClick={() =>
                                                  serviceFile(servicesIndex)
                                                }
                                                variant="text"
                                              >
                                                <i className="bi bi-plus-circle-fill"></i>{" "}
                                                Add Files
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>{" "}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      <div
                        className="add-more-services-btn"
                        onClick={() => addService()}
                        variant="text"
                      >
                        <i className="bi bi-plus-circle-fill"></i>Add More
                        Service
                      </div>
                      <div className="add-service-btn-flex">
                        <Button
                          onClick={() => submitServices()}
                          className="edit-profileimg-btn"
                          variant="text"
                          style={{ textTransform: "capitalize" }}
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CustomTabPanel>

            <CustomTabPanel value={valueTabs} index={6}>
              {talentData && (
                <>
                  <div className="features-section mt-4">
                    <div className="row">
                      <EditFeatures
                        featuresStructure={featuresList}
                        featureValues={features}
                        onValuesChange={handleEditFeatureChanges}
                      />
                    </div>
                  </div>
                  <div className="add-service-btn-flex">
                    <Button
                      onClick={() => submitFeatures()}
                      className="edit-profileimg-btn"
                      variant="text"
                      style={{ textTransform: "capitalize" }}
                    >
                      Submit
                    </Button>
                  </div>
                </>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={7}>
              <div className="update-portfolio-cards-wrapper">
                <div className="update-portfolio-title">CV</div>
                {talentData?.cv?.length === 0 && (
                  <>
                    <label className="form-label">Please add your CV</label>
                  </>
                )}
                <div className="row">
                  {talentData?.cv?.length === 0 && (
                    <>
                      {/* <div className="no-data">Add Your work samples here</div> */}
                      {/* <div className="no-data">Please Add Files</div> */}
                    </>
                  )}
                  {talentData &&
                    talentData?.cv?.length > 0 &&
                    talentData?.cv?.map((item) => {
                      return (
                        <>
                          <div className="col-md-6">
                            <div className="update-portfolio-cards">
                              <div className="update-portfolio-icon">
                                <div className="file-section">
                                  {item.type === "audio" && (
                                    <div className="fileType">
                                      <i className="bi bi-mic-fill"></i>
                                    </div>
                                  )}
                                  {item.type === "video" && (
                                    <div className="fileType">
                                      <i className="bi bi-play-circle-fill"></i>
                                    </div>
                                  )}
                                  {item.type === "document" && (
                                    <div className="fileType">
                                      <i className="bi bi-file-earmark-richtext"></i>
                                    </div>
                                  )}
                                  <div className="update-portfolio- pl-0">
                                    {item.title}
                                  </div>

                                  <div className="update-portfolio-action">
                                    <IconButton
                                      aria-label="more"
                                      aria-controls="dropdown-menu"
                                      aria-haspopup="true"
                                      onClick={handleClick}
                                    >
                                      <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                      id="dropdown-menu"
                                      anchorEl={anchorEl}
                                      open={Boolean(anchorEl)}
                                      onClose={handleClose}
                                    >
                                      <MenuItem
                                        onClick={() => {
                                          handleClose();
                                          viewUpdateFile(item);
                                        }}
                                      >
                                        View
                                      </MenuItem>
                                      <MenuItem
                                        onClick={(e) => {
                                          dropDownClose();

                                          setAlertpop({
                                            status: true,
                                            item: item,
                                            label: "delete",
                                            eachService: null,
                                          });
                                        }}
                                      >
                                        Delete
                                      </MenuItem>
                                    </Menu>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>

                <div className="add-portfoli-section">
                  <div className="add-portfolia-btn">
                    <input
                      type="file"
                      className="select-cv-input"
                      id="profile-image"
                      accept="*/*"
                      onChange={newResumeUpload}
                      ref={resumeFileInputRef}
                    />
                    <Button
                      onClick={resumeFileFunction}
                      className="edit-profileimg-btn"
                      variant="text"
                      style={{ textTransform: "capitalize" }}
                    >
                      Add CV
                    </Button>
                  </div>
                </div>
              </div>
            </CustomTabPanel>

            {/* <CustomTabPanel value={valueTabs} index={7}>
              Reviews
            </CustomTabPanel> */}

            <div className="edit-profile-navigations mt-3 mb-3">
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
              {((talentData?.planName == "Basic" && valueTabs != 6) ||
                (talentData?.planName != "Basic" && valueTabs != 7)) && (
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

      <Modal style={customStylesAlert} isOpen={alertpop?.status === true}>
        <div>
          {/* <div className='uploadHead'>
                        <h4 className='mt-2'>Reason For stock Return</h4>
                        <img src={CloseIcon} className='pop-close' onClick={() => { setIsModalOpen(false); }} />
                    </div> */}
          <div className="alertBox">
            <div className="col-md-12  mx-5">
              <div className="alert-icon-section">
                <i className="alert-icon bi bi-exclamation-triangle-fill"></i>
              </div>
              {alertpop?.label == "delete" && (
                <>
                  <h5>Are you sure you want to Delete this File? </h5>
                </>
              )}
              {alertpop?.label === "delete-service" && (
                <>
                  <h5>Are you sure you want to Delete this File? </h5>
                </>
              )}
              {alertpop?.label == "delete-individual-service" && (
                <>
                  <h5>Are you sure you want to Delete this Service? </h5>
                </>
              )}
            </div>
          </div>
          <div className="alert-button-section">
            <button
              type="submit"
              className=" btn btn-warning"
              onClick={() => {
                setAlertpop({
                  status: false,
                  item: null,
                  label: null,
                  eachService: null,
                });
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" btn btn-danger alert-ok-btn"
              onClick={(e) => {
                e.preventDefault();
                setAlertpop({
                  status: false,
                  item: null,
                  label: null,
                  eachService: null,
                });
                if (alertpop?.label === "delete") {
                  deleteUpdateFile();
                } else if (alertpop?.label === "delete-service") {
                  deleteServiceFile();
                } else if (alertpop?.label === "delete-individual-service") {
                  removeServices();
                }
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default EditTalent;
