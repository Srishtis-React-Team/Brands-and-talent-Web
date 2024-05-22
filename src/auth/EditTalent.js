import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsform-one.scss";
import Select from "react-select";
import Axios from "axios";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { useNavigate } from "react-router";
import nationalityOptions from "../components/nationalities";
import languageOptions from "../components/languages";
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
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import { EditorState, convertFromHTML, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import Modal from "react-modal";
import { ta } from "date-fns/locale";

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

const EditTalent = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleFileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const imageType = require("../assets/icons/imageType.png");
  const videoType = require("../assets/icons/videoType.png");
  const audiotype = require("../assets/icons/audiotype.png");
  const idCard = require("../assets/icons/id-card.png");
  const elipsis = require("../assets/icons/elipsis.png");
  const greenTickCircle = require("../assets/icons/small-green-tick.png");
  const docsIcon = require("../assets/icons/docsIcon.png");
  const [editProfileImage, setEditProfileImage] = useState("");
  const [editProfileImageObject, setEditProfileImageObject] = useState(null);
  const [portofolioFile, setPortofolioFile] = useState([]);
  const [videoAUdioFile, setVideoAudioFile] = useState([]);
  const [resumeFile, setResumeFile] = useState([]);

  const paramsValues = window.location.search;
  const urlParams = new URLSearchParams(paramsValues);
  const userId = urlParams.get("userId");
  const userEmail = urlParams.get("userEmail");
  const navigate = useNavigate();
  const btLogo = require("../assets/icons/Group 56.png");
  const kidsImage = require("../assets/images/kidsImage.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const [value, setValue] = useState(null);
  const [showError, setShowError] = useState(false);
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
  const [parentLastNameError, setparentLastNameError] = useState(false);
  const [parentEmailError, setparentEmailError] = useState(false);
  const [talentPasswordError, settalentPasswordError] = useState(false);
  const [talentConfirmPasswordError, settalentConfirmPasswordError] = useState(
    false
  );
  const [kidsLegalFirstNameError, setkidsLegalFirstNameError] = useState(false);
  const [kidsLegalLastNameError, setkidsLegalLastNameError] = useState(false);
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
  const [nationality, setNationality] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [languages, setLanguages] = useState([]);
  const [dateOfBirth, setDob] = useState("");
  const [profession, setProfession] = useState([]);
  const [aboutYou, setAboutYou] = useState([]);
  const [relevantCategories, setRelevantCategories] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [talentPassword, setTalentPassword] = useState("");
  const [talentConfirmPassword, setTalentConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [age, setAge] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [allJobsList, setAllJobsList] = useState([]);
  const [selectedLanguageOptions, setSelectedLanguageOptions] = useState([]);
  const [selectedProfessionsEdit, setSelectedProfessionsEdit] = useState([]);
  const [featuresList, setFeaturesList] = useState([]);
  const [features, setFeature] = useState([]);
  const [talentId, setTalentId] = useState(null);
  const [talentData, setTalentData] = useState();
  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "55px", // Reset the minHeight to avoid clipping
    }),
    menu: (provided, state) => ({
      ...provided,
      maxHeight: "500px", // Adjust the maxHeight as per your requirement
      zIndex: 9999, // Ensure menu appears above other elements
    }),
  };

  useEffect(() => {
    getFeatures();
  }, []);

  const professionList = [
    { value: "Model", label: "Model" },
    { value: "Celebrity", label: "Celebrity" },
    { value: "Creator", label: "Creator" },
    { value: "Stylist", label: "Stylist" },
    { value: "Photographer", label: "Photographer" },
    { value: "Videographer", label: "Videographer" },
    { value: "Hair & Makeup Artist", label: "Hair & Makeup Artist" },
    { value: "Actor", label: "Actor" },
    { value: "Singer", label: "Singer" },
    { value: "Writer", label: "Writer" },
    { value: "Filmmaker", label: "Filmmaker" },
    { value: "RJ", label: "RJ" },
    { value: "DJ", label: "DJ" },
    { value: "VJ", label: "VJ" },
    { value: "Graphic Designer", label: "Graphic Designer" },
    { value: "Personal Trainer", label: "Personal Trainer" },
    { value: "Sports Instructor", label: "Sports Instructor" },
    { value: "Dance Teacher", label: "Dance Teacher" },
    { value: "Choreographer", label: "Choreographer" },
    { value: "Martial Arts Instructor", label: "Martial Arts Instructor" },
    { value: "Yoga Teacher", label: "Yoga Teacher" },
    { value: "Webapp Developer", label: "Webapp Developer" },
    { value: "Virtual Assistant", label: "Virtual Assistant" },
    { value: "AI Influencer", label: "AI Influencer" },
    { value: "Fashion Designer", label: "Fashion Designer" },
    { value: "Other", label: "Other" },
  ];

  const categoryList = [
    "Fashion",
    "Parenting and family",
    "Sports/Martial Arts/Dance",
    "Arts and photography",
    "Videography",
    "Music",
    "Comedy/Entertainment",
    "Education",
    "Transportation",
    "Food and beverage",
    "Finance",
    "Beauty/Cosmetics",
    "Luxury",
    "Business and Technology",
    "Travel/Tourism",
    "Health/Wellness/Fitness",
    "Home and Gardening",
    "Eco-friendly/Nature/Sustainability",
    "Diversity and inclusion",
    "Outdoor and nature",
    "Content Creation",
    "Lifestyle",
    "Celebrity",
    "Animals/Pets",
    "Web3",
    "Home and DIY",
    "Anime/Memes",
    "Website/Mobile Applications",
    "Gaming",
    "Lifecoach/Relationships",
    "Cosplay/Memes",
    "Other",
  ];

  function chooseCategory(category) {
    setCategoryError(false);
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  const handleProfessionChange = (selectedOptions) => {
    setSelectedProfessions(selectedOptions);
    setProfessionError(false);
  };

  const handleDetailChange = (index, field, value) => {
    const updatedSelectedProfessions = [...selectedProfessions];
    updatedSelectedProfessions[index][field] = value;
    setSelectedProfessions(updatedSelectedProfessions);
    setProfessionError(false);
  };

  const ethnicityOptions = [
    "South Asian",
    "Indian/Pakistani",
    "South East Asian",
    "Khmer",
    "Vietnamese",
    "Indonesian",
    "Thai",
    "Middle-East",
    "Black",
    "African",
    "Latino/Hispanic",
    "Russian",
    "Ukrainian",
    "Nordic",
    "Scandinavian",
    "European",
    "Italian",
  ];

  const gendersOptions = [
    "Man",
    "Woman",
    "Non binary",
    "Transgender Woman",
    "Transgender Man",
    "Agender",
    "Other",
    "Prefer not to say",
  ];

  const customStylesProfession = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "55px", // Reset the minHeight to avoid clipping
    }),
    menu: (provided, state) => ({
      ...provided,
      maxHeight: "500px", // Adjust the maxHeight as per your requirement
      zIndex: 9999, // Ensure menu appears above other elements
    }),
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {}, [updateDisabled]);

  // Function to handle date picker change
  const handleDateChange = (e) => {
    // const selectedDate = e.target.value; // Assuming your date picker provides the selected date
    // setDob(selectedDate); // Set the DOB in state
    // // Calculate age
    // const dobDate = new Date(selectedDate);
    // const today = new Date();
    // const diff = today - dobDate;
    // const ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); // Calculating age in years
    // setAge(String(ageInYears)); // Set the age in state
    setValue(e);
    setDob(e);
    // let dateString = e;
    // if (dateString) {
    //   let dateObject = new Date(dateString);
    //   console.log(dateObject, "dateObject");
    //   console.log(typeof dateObject, "dateObject");
    //   if (dateObject) {
    //     let formattedDate = dateObject?.toISOString()?.split("T")[0];
    //     console.log(formattedDate, "formattedDate");
    //   }
    // }
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
  // Function to handle email input change
  const handleEmailChange = (e) => {
    setparentEmailError(false);
    const email = e.target.value;
    setParentEmail(e.target.value);
    // Validate email using regex
    setIsValidEmail(emailRegex.test(email));
  };

  const handleKidsEmailChange = (e) => {
    const email = e.target.value;
    // setKidsEmail(e.target.value);
    // Validate email using regex
    setIsValidEmail(emailRegex.test(email));
  };

  // Function to handle country selection

  const selectEthnicity = (event) => {
    console.log(event.target.value, "selectEthnicity");
    setEthnicity(event.target.value);
    setEthnicityError(false);
  };
  const selectGender = (event) => {
    setGender(event.target.value);
    setgenderError(false);
  };

  const selectLanguage = (selectedOptions) => {
    console.log(selectedOptions, "selectedOptions selectedLanguages");
    setLanguageError(false);
    if (!selectedOptions || selectedOptions.length === 0) {
      // Handle case when all options are cleared
      setLanguages([]); // Clear the languages state
      setSelectedLanguageOptions([]);

      return;
    }
    // Extract values of all selected languages
    const selectedLanguages = selectedOptions.map((option) => option.value);
    console.log(selectedLanguages, "selectedLanguages");
    setLanguages(selectedLanguages); // Update languages state with all selected languages

    setSelectedLanguageOptions(selectedOptions);
  };

  const selectNationality = (event) => {
    setNationality(event.target.value);
    setNationalityError(false);
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

  const initializeEditorState = (htmlContent) => {
    console.log(htmlContent, "htmlContent");
    const blocksFromHTML = convertFromHTML(...htmlContent);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState);
  };

  const [services, setServices] = useState();

  const getKidsData = async () => {
    await ApiHelper.post(`${API.getTalentById}${talentId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          console.log(resData?.data?.data, "KIDSFETCH");
          if (resData?.data?.data?.type === "kids") {
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
            setFeature(resData?.data?.data?.features);
            // handleSelectedCountry({
            //   value: resData?.data?.data?.parentCountry,
            //   label: resData?.data?.data?.parentCountry,
            //   key: 0,
            // });
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
            setNationality(resData?.data?.data?.childNationality);
            setMaritalStatus(resData?.data?.data?.maritalStatus);
            setEthnicity(resData?.data?.data?.childEthnicity);
            // setKidsEmail(resData?.data?.data?.childEmail);
            // setKidsPhone(resData?.data?.data?.childPhone);
            // setKidsLocation(resData?.data?.data?.childLocation);
            setKidsCity(resData?.data?.data?.childCity);
            setSelectedCategories([
              ...selectedCategories,
              ...resData.data.data?.relevantCategories,
            ]);
            setAboutYou(resData.data.data?.childAboutYou);
            setPortofolioFile(resData.data.data?.portfolio);
            setVideoAudioFile(resData.data.data?.videosAndAudios);
            setResumeFile(resData.data.data?.cv);
            setAge(resData.data.data?.age);
            const selectedOptions = resData.data.data?.languages.map(
              (language) => {
                return languageOptions.find(
                  (option) => option.label === language
                );
              }
            );
            setSelectedLanguageOptions(selectedOptions);
            console.log(selectedOptions, "selectedOptions");
            setServices(
              resData.data.data?.services.map((service) => ({
                ...service,
                editorState: initializeEditorState(
                  service.editorState || "<p></p>"
                ), // Initialize editor state
              }))
            );

            const selectedProfessionOptions = resData.data.data?.profession.map(
              (profession) => {
                console.log(profession, "professionmap");
                console.log(professionList, "professionList");
                return professionList.find(
                  (option) => option.label === profession
                );
              }
            );
            console.log(selectedProfessionOptions, "selectedProfessionOptions");
            setSelectedProfessionsEdit(selectedProfessionOptions);
          }
        }
      })
      .catch((err) => {});
  };
  const handleSelectedCountry = (event) => {
    setParentCountryError(false);
    console.log(event, "event");
    console.log(event, "event?.value");
    setCountry(event?.value);
    getStates(event?.value);
    console.log(country, "country");
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
      age: age,
    };
    await ApiHelper.post(`${API.editKids}${talentData?._id}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Updated SuccessFully!");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const [firstNameLetterError, setFirstNameLetterError] = useState(false);
  const [lastNameLetterError, setLastNameLetterError] = useState(false);
  const [kidsLegalFirstLetterError, setKidsLegalFirstError] = useState(false);
  const [
    kidsLegalLastNameLetterError,
    setKidsLegalLastNameLetterError,
  ] = useState(false);
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
    // Regular expression to allow only letters
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
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
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setFirstNameLetterError(false);
    }
  };
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
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
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setLastNameLetterError(false);
    }
  };

  const KidsLegalFirstNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
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
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setKidsLegalFirstError(false);
    }
  };

  const KidsLegalLastNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
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
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setKidsLegalLastNameLetterError(false);
    }
  };

  const kidsPreferedFirstNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
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
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setKidsPrefferedFirstNameLetterError(false);
    }
  };
  const kidsPreferedLastNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
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
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setKidsPrefferedLastNameLetterError(false);
    }
  };

  const [mobileNumError, setMobileNumError] = useState();

  const handleMobileChange = (value, countryData) => {
    // Update the parentMobile state with the new phone number
    console.log(value, "handleMobileChange");
    setParentMobile(value);
    setParentMobileError(false);
  };

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
    }
  };

  useEffect(() => {
    console.log(valueTabs, "valueTabs");
  }, [valueTabs]);
  useEffect(() => {
    console.log(editProfileImage, "editProfileImage");
  }, [editProfileImage]);

  const profileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      console.log(fileData, "fileData");
      uploadProfile(fileData);
    }
  };

  const newPortfolioUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      console.log(fileData, "fileData");
      uploadNewPortfolio(fileData);
    }
  };

  const newVideoUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      console.log(fileData, "fileData");
      uploadNewVideo(fileData);
    }
  };

  const newServiceFileUpload = (event, servicesIndex) => {
    console.log(servicesIndex, "newServiceFileUploadINDEX");
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      console.log(fileData, "fileData");
      uploadNewServiceFile(fileData);
    }
  };

  const newResumeUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      console.log(fileData, "fileData");
      uploadNewResume(fileData);
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

          updatePortfolioAPI(fileObj);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const updatePortfolioAPI = async (fileObj) => {
    let portofolioArray = [...portofolioFile, fileObj];
    console.log(portofolioArray, "portofolioArray");
    let formData;
    if (portofolioArray.length > 0) {
      formData = {
        portfolio: portofolioArray,
      };
    }
    await ApiHelper.post(`${API.editKids}${talentData?._id}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Portfolio Added Successfully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            getKidsData();
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 2000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const uploadNewVideo = async (fileData) => {
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
        console.log(resData, "uploadProfileDATA");
        if (resData?.data?.status === true) {
          let fileObj = {
            id: resData.data.data.fileId,
            title: fileData.name,
            fileData: resData.data.data.filename,
            type: resData?.data?.data?.filetype,
          };
          updateVideoAPI(fileObj);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const updateVideoAPI = async (fileObj) => {
    let portofolioArray = [...videoAUdioFile, fileObj];
    console.log(portofolioArray, "portofolioArray");
    let formData;
    if (portofolioArray.length > 0) {
      formData = {
        videosAndAudios: portofolioArray,
      };
    }
    await ApiHelper.post(`${API.editKids}${talentData?._id}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("File Added Successfully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            getKidsData();
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function() {
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
          updateResumeAPI(fileObj);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const updateResumeAPI = async (fileObj) => {
    let portofolioArray = [...resumeFile, fileObj];
    console.log(portofolioArray, "portofolioArray");
    let formData;
    if (portofolioArray.length > 0) {
      formData = {
        cv: portofolioArray,
      };
    }
    await ApiHelper.post(`${API.editKids}${talentData?._id}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("File Added Successfully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            getKidsData();
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 2000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const uploadNewServiceFile = async (fileData) => {
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
        console.log(resData, "uploadProfileDATA");
        if (resData?.data?.status === true) {
          let fileObj = {
            id: resData.data.data.fileId,
            title: fileData.name,
            fileData: resData.data.data.filename,
            type: resData?.data?.data?.filetype,
          };
          updateServiceFileAPI(fileObj);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const updateServiceFileAPI = async (fileObj) => {
    let portofolioArray = [...resumeFile, fileObj];
    console.log(portofolioArray, "portofolioArray");
    let formData;
    if (portofolioArray.length > 0) {
      formData = {
        cv: portofolioArray,
      };
    }
    await ApiHelper.post(`${API.editKids}${talentData?._id}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("File Added Successfully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            getKidsData();
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function() {
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
    const formData = {
      image: editProfileImageObject,
    };
    await ApiHelper.post(`${API.editKids}${talentData?._id}`, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Profile Image Update Successfully");
          setOpenPopUp(true);
          setTimeout(function() {
            setMyState(true);
            setOpenPopUp(false);
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 2000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  const fileInputRef = useRef(null);

  const File = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the click event on the file input
    }
  };

  const portfolioFileInputRef = useRef(null);

  const portfolioFile = () => {
    if (portfolioFileInputRef.current) {
      portfolioFileInputRef.current.click(); // Trigger the click event on the file input
    }
  };

  const videoFileInputRef = useRef(null);

  const videoFile = () => {
    if (videoFileInputRef.current) {
      videoFileInputRef.current.click(); // Trigger the click event on the file input
    }
  };

  const serviceFileInputRef = useRef(null);

  const serviceFile = () => {
    if (serviceFileInputRef.current) {
      serviceFileInputRef.current.click(); // Trigger the click event on the file input
    }
  };

  const resumeFileInputRef = useRef(null);

  const resumeFileFunction = () => {
    if (resumeFileInputRef.current) {
      resumeFileInputRef.current.click(); // Trigger the click event on the file input
    }
  };

  const viewUpdateFile = (item) => {
    console.log(item, "viewFile");
    window.open(`${API.userFilePath}${item.fileData}`, "_blank");
  };

  const customStylesAlert = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      /* margin: '0 auto', */
      width: "450px",
      height: "270px",
      transform: "translate(-50%, -50%)",
    },
  };

  const [alertpop, setAlertpop] = useState({
    status: false,
    item: "",
    label: "",
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
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            getKidsData();
          }, 2000);
        } else if (resData.data.status === false) {
          setIsLoading(false);
          setMessage(resData.data.message);
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 2000);
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(portofolioFile, "portofolioFile");
  }, [portofolioFile]);

  const handleEditorStateChange = (index, editorState) => {
    // console.log(index, "index handleEditorStateChange");
    // const newInputs = [...inputs];
    // newInputs[index]["editorState"] = [
    //   draftToHtml(convertToRaw(editorState.getCurrentContent())),
    // ];
    // setInputs(newInputs);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newServices = [...services];
    newServices[index][name] = value;
    setServices(newServices);
  };

  const addService = () => {
    setServices([
      ...services,
      { serviceName: "", serviceAmount: "", serviceDuration: "" },
    ]);
  };

  const submitServices = () => {
    console.log(services, "servicessubmitServices");
  };

  useEffect(() => {
    console.log(services, "services");
  }, [services]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Prepare data for submission, converting EditorState to HTML
    const submittedServices = services.map((service) => ({
      ...service,
      editorState: service.editorState.getCurrentContent().getPlainText(), // Convert editor content to HTML
    }));
    // Replace the following line with your actual submit logic, e.g., API call.
    console.log("Submitted services:", submittedServices);
  };

  const handleEditorChange = (index, editorState) => {
    const newServices = [...services];
    newServices[index].editorState = editorState;
    setServices(newServices);
  };

  const handleFeaturesChange = (label, value) => {
    const updatedValues = [...features];
    const index = updatedValues.findIndex((item) => item.label === label);
    if (index !== -1) {
      updatedValues[index] = { label, value };
    } else {
      updatedValues.push({ label, value });
    }
    setFeature(updatedValues);
    // Call your API here with the updated selectedValues array
    // Example:
    // callYourApi(selectedValues);
  };

  const getFeatures = async () => {
    await ApiHelper.get(API.getFeatures)
      .then((resData) => {
        if (resData) {
          setFeaturesList(resData.data.data[0].features);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    console.log(featuresList, "featuresList");
  }, [featuresList]);
  useEffect(() => {
    console.log(features, "features");
  }, [features]);

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} myState={myState} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "not-sidebar"
        }`}
      >
        <TalentSideMenu myState={myState} />
      </div>

      <main
        style={allJobsList?.length === 0 ? {} : {}}
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
                <Tab
                  label="Portfolio"
                  {...a11yProps(2)}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Videos & Audios"
                  {...a11yProps(3)}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="CV"
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
                  label="Reviews"
                  {...a11yProps(7)}
                  style={{ textTransform: "capitalize" }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={valueTabs} index={0}>
              <div className="profile-image-edit-section edit-basicdetails-section-main">
                <div>
                  <img
                    className="profile-image-edit"
                    src={`${API.userFilePath}${editProfileImage}`}
                    alt=""
                  />
                </div>
                <div className="btn-img-edit-wrapper">
                  <input
                    type="file"
                    className="select-cv-input"
                    id="profile-image"
                    accept="image/*"
                    onChange={profileUpload}
                    ref={fileInputRef}
                  />
                  <Button
                    onClick={File}
                    className="edit-profileimg-btn"
                    variant="text"
                    style={{ textTransform: "capitalize" }}
                  >
                    Change Image
                  </Button>
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
              <div className="kids-main edit-basicdetails-section-main">
                <div className="kids-form-title">Parent/Guardian Details</div>
                <div className="kids-form-row">
                  <div className="kids-form-section">
                    <div className="mb-3">
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
                  </div>
                  <div className="kids-form-section">
                    <div className="mb-3">
                      <label className="form-label">Legal Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={parentLastName}
                        onChange={(e) => {
                          handleLastNameChange(e);
                        }}
                        onKeyDown={handleLastNameKeyPress}
                        placeholder="Enter Legal Last name"
                      ></input>
                      {lastNameLetterError && (
                        <div className="invalid-fields">
                          Only Letters are allowed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="kids-form-row">
                  <div className="kids-form-section">
                    <div className="mb-3">
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
                  </div>
                  <div className="kids-form-section">
                    <div className="mb-3">
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
                          Please Select Country
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="kids-form-row">
                  <div className="kids-form-section">
                    <div className="mb-3">
                      <label className="form-label">
                        State<span className="mandatory">*</span>
                      </label>
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
                        <div className="invalid-fields">
                          Please Select State
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="kids-form-section">
                    <div className="mb-3">
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
                  </div>
                </div>

                <div className="kids-form-row">
                  <div className="kids-form-section">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                      >
                        Address<span className="mandatory">*</span>
                      </label>
                      <textarea
                        style={{ width: "714px" }}
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
                        <div className="invalid-fields">
                          Please Enter Address
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="kids-form-section">
                    <label className="form-label">
                      Mobile No <span className="mandatory">*</span>
                    </label>
                    <div className="mb-3">
                      {/* <input
                            type="text"
                            className="form-control"
                            maxLength="15"
                            pattern="[0-9]{10}"
                            value={parentMobile}
                            onChange={(e) => {
                              handleMobileChange(e);
                              setParentMobileError(false);
                            }}
                            placeholder=" Mobile No"
                          ></input> */}

                      <MuiPhoneNumber
                        value={parentMobile}
                        defaultCountry={"kh"}
                        className="form-control"
                        onChange={handleMobileChange}
                      />

                      {parentMobileError && (
                        <div className="invalid-fields">
                          Please enter Mobile Number
                        </div>
                      )}
                      {mobileNumError && (
                        <div className="invalid-fields">
                          Only Numbers Allowed
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="kids-form-title">Your Child Details</div>
                {/* <div className="profession-section-cover">
                  <div className="kids-form-row">
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label pay-info">
                          Profession (choose any 4)
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
                            placeholder="Search for Category”"
                            onChange={handleProfessionChange}
                            styles={customStyles}
                            value={selectedProfessionsEdit}
                          />
                          {professionError && (
                            <div className="invalid-fields">
                              Please Choose Profession
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="profession-content-section">
                    {selectedProfessions.map((profession, index) => (
                      <div key={index} className="dynamic-profession">
                        <div className="mb-3">
                          <label className="form-label">
                            {profession.label} / day
                          </label>
                          <input
                            type="number"
                            className="form-control profession-input"
                            value={profession.perDaySalary || ""}
                            onChange={(e) =>
                              handleDetailChange(
                                index,
                                "perDaySalary",
                                e.target.value
                              )
                            }
                            placeholder="$/day"
                          ></input>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            {profession.label} / hr
                          </label>
                          <input
                            type="number"
                            className="form-control profession-input"
                            value={profession.perHourSalary || ""}
                            onChange={(e) =>
                              handleDetailChange(
                                index,
                                "perHourSalary",
                                e.target.value
                              )
                            }
                            placeholder="$/hr"
                          ></input>
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
                            Open to Offers / Happy to negotiate
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
                <div className="kids-form-title-sub">
                  Please select the top 4 categories relevant to your profile.
                  <span className="mandatory">*</span>
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
                {categoryError && (
                  <div className="invalid-fields">Please Choose Categories</div>
                )}
                <div className="kids-form-title">Personal Details</div>
                <div className="kids-form-row">
                  <div className="kids-form-section">
                    <div className="mb-3">
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
                  </div>
                  <div className="kids-form-section">
                    <div className="mb-3">
                      <label className="form-label">Legal Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={kidsLegalLastName}
                        onChange={(e) => {
                          KidsLegalLastNameChange(e);
                        }}
                        onKeyDown={handleKidsLegalLastNameKeyPress}
                        placeholder="Enter Legal Last name"
                      ></input>
                      {kidsLegalLastNameLetterError && (
                        <div className="invalid-fields">
                          Only Letters Allowed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="kids-form-row">
                  <div className="kids-form-section">
                    <div className="mb-3">
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
                          Please Enter Preferred First Name
                        </div>
                      )}
                      {kidsPrefferedFirstNameLetterError && (
                        <div className="invalid-fields">
                          Only Letters Allowed
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="kids-form-section">
                    <div className="mb-3">
                      <label className="form-label">Preferred Last name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={kidsPreferedLastName}
                        onChange={(e) => {
                          kidsPreferedLastNameChange(e);
                        }}
                        onKeyDown={handleKidsPrefferedLasttNameKeyPress}
                        placeholder="Enter Preferred  Last name"
                      ></input>
                      {kidsPrefferedLastNameLetterError && (
                        <div className="invalid-fields">
                          Only Letters Allowed
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="kids-form-row">
                  <div className="kids-form-section">
                    <div className="mb-3">
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
                          Please Select Ethnicity
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="kids-form-section">
                    <div className="mb-3">
                      <label className="form-label">
                        Nationality <span className="mandatory">*</span>
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={selectNationality}
                        value={nationality}
                        style={{ fontSize: "14px" }}
                      >
                        <option value="" disabled selected>
                          Select Nationality
                        </option>
                        {nationalityOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {nationalityError && (
                        <div className="invalid-fields">
                          Please Select Nationality
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="kids-form-row ">
                  <div className="kids-form-section">
                    <label className="form-label">
                      Date Of Birth <span className="mandatory">*</span>
                    </label>
                    <div className="mb-3">
                      {/* <input
                            type="date"
                            className="form-control"
                            value={dateOfBirth}
                            onChange={(e) => {
                              handleDateChange(e);
                              setDobError(false);
                            }}
                            placeholder=""
                          ></input> */}

                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={dateOfBirth}
                          onChange={(newValue) => {
                            console.log(newValue, "newValue");
                            handleDateChange(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          disableFuture
                        />
                      </LocalizationProvider>

                      {dobError && (
                        <div className="invalid-fields">
                          Please Select Date Of Birth
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="kids-form-section">
                    <div className="mb-3">
                      <label className="form-label">
                        Language <span className="mandatory">*</span>
                      </label>
                      <Select
                        isMulti
                        name="colors"
                        options={languageOptions}
                        valueField="value"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(value) => selectLanguage(value)}
                        styles={customStylesProfession}
                        value={selectedLanguageOptions}
                      />
                      {languageError && (
                        <div className="invalid-fields">
                          Please Select Language
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="kids-form-row mb-5">
                  <div className="kids-form-section">
                    <div className="mb-3">
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
                        <option value="" disabled selected>
                          Select Gender
                        </option>
                        {gendersOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {genderError && (
                        <div className="invalid-fields">
                          Please Select Gender
                        </div>
                      )}
                    </div>
                  </div>
                  {talentData?.type != "kids" && (
                    <div className="kids-form-section">
                      <div className="mb-3">
                        <label className="form-label">Marital Status</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={selectMaritalStatus}
                        >
                          <option value="" disabled selected>
                            Select Marital Status
                          </option>
                          <option defaultValue value="married">
                            Married
                          </option>
                          <option value="unmarried">UnMarried</option>
                        </select>
                      </div>
                    </div>
                  )}
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
              <div className="update-portfolio-section edit-basicdetails-section-main">
                <div className="update-portfolio-cards-wrapper">
                  <div className="update-portfolio-title">Portfolio</div>
                  {talentData?.portfolio?.length === 0 && (
                    <div className="no-data">Please Add Files</div>
                  )}
                  {talentData &&
                    talentData?.portfolio?.length > 0 &&
                    talentData?.portfolio?.map((item) => {
                      return (
                        <>
                          <div className="update-portfolio-cards">
                            <div className="update-portfolio-icon">
                              <div className="file-section">
                                {item.type === "image" && (
                                  <div className="fileType">
                                    <i class="bi bi-card-image"></i>
                                  </div>
                                )}
                                <div className="update-portfolio-fileName">
                                  {item.title}
                                </div>
                                <div className="update-portfolio-action">
                                  <i
                                    className="bi bi-three-dots-vertical"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  ></i>
                                  <ul
                                    class="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                  >
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        onClick={() => viewUpdateFile(item)}
                                      >
                                        View
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        onClick={(e) => {
                                          setAlertpop({
                                            status: true,
                                            item: item,
                                            label: "delete",
                                          });
                                        }}
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
            <CustomTabPanel value={valueTabs} index={3}>
              <div className="update-portfolio-section edit-basicdetails-section-main">
                <div className="update-portfolio-cards-wrapper">
                  <div className="update-portfolio-title">Video & Audios</div>
                  {talentData?.videosAndAudios?.length === 0 && (
                    <div className="no-data">Please Add Files</div>
                  )}
                  {talentData &&
                    talentData?.videosAndAudios?.length > 0 &&
                    talentData?.videosAndAudios?.map((item) => {
                      return (
                        <>
                          <div className="update-portfolio-cards">
                            <div className="update-portfolio-icon">
                              <div className="file-section">
                                {item.type === "audio" && (
                                  <div className="fileType">
                                    <i class="bi bi-mic-fill"></i>
                                  </div>
                                )}
                                {item.type === "video" && (
                                  <div className="fileType">
                                    <i class="bi bi-play-circle-fill"></i>
                                  </div>
                                )}
                                {item.type === "document" && (
                                  <div className="fileType">
                                    <i class="bi bi-file-earmark-richtext"></i>
                                  </div>
                                )}
                                <div className="update-portfolio-fileName">
                                  {item.title}
                                </div>
                                <div className="update-portfolio-action">
                                  <i
                                    className="bi bi-three-dots-vertical"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  ></i>
                                  <ul
                                    class="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                  >
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        onClick={() => viewUpdateFile(item)}
                                      >
                                        View
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        class="dropdown-item"
                                        onClick={(e) => {
                                          setAlertpop({
                                            status: true,
                                            item: item,
                                            label: "delete",
                                          });
                                        }}
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="update-portfolio-action"></div>
                          </div>
                        </>
                      );
                    })}
                  <div className="add-portfoli-section">
                    <div className="add-portfolia-btn">
                      <input
                        type="file"
                        className="select-cv-input"
                        id="profile-image"
                        accept="audio/*,video/*"
                        onChange={newVideoUpload}
                        ref={videoFileInputRef}
                      />
                      <Button
                        onClick={videoFile}
                        className="edit-profileimg-btn"
                        variant="text"
                        style={{ textTransform: "capitalize" }}
                      >
                        Add Videos & Audios
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={4}>
              <div className="update-portfolio-cards-wrapper">
                <div className="update-portfolio-title">Resumes</div>
                {talentData?.cv?.length === 0 && (
                  <div className="no-data">Please Add Files</div>
                )}
                {talentData &&
                  talentData?.cv?.length > 0 &&
                  talentData?.cv?.map((item) => {
                    return (
                      <>
                        <div className="update-portfolio-cards">
                          <div className="update-portfolio-icon">
                            <div className="file-section">
                              {item.type === "audio" && (
                                <div className="fileType">
                                  <i class="bi bi-mic-fill"></i>
                                </div>
                              )}
                              {item.type === "video" && (
                                <div className="fileType">
                                  <i class="bi bi-play-circle-fill"></i>
                                </div>
                              )}
                              {item.type === "document" && (
                                <div className="fileType">
                                  <i class="bi bi-file-earmark-richtext"></i>
                                </div>
                              )}
                              <div className="update-portfolio-fileName">
                                {item.title}
                              </div>
                              <div className="update-portfolio-action">
                                <i
                                  className="bi bi-three-dots-vertical"
                                  type="button"
                                  id="dropdownMenuButton1"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                ></i>
                                <ul
                                  class="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton1"
                                >
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      onClick={() => viewUpdateFile(item)}
                                    >
                                      View
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      onClick={(e) => {
                                        setAlertpop({
                                          status: true,
                                          item: item,
                                          label: "delete",
                                        });
                                      }}
                                    >
                                      Delete
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="update-portfolio-action"></div>
                        </div>
                      </>
                    );
                  })}
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
                      Add Resumes
                    </Button>
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={5}>
              <div className="update-portfolio-section">
                <div className="update-service-cards-wrapper edit-service-section-main">
                  {services &&
                    services?.length > 0 &&
                    services?.map((item, servicesIndex) => {
                      // console.log(servicesIndex, "servicesIndex");
                      return (
                        <>
                          <div className="edit-service-section-wrapper">
                            <h5>{item.serviceName}</h5>
                            <div className="kids-form-row">
                              <div className="kids-form-section">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Service Name
                                    <span className="mandatory">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="service name"
                                    value={item.serviceName}
                                  ></input>
                                </div>
                              </div>
                              <div className="kids-form-section">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Service Amount
                                    <span className="mandatory">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="service amount"
                                    value={item.serviceAmount}
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div className="kids-form-row">
                              <div className="kids-form-section">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Features
                                    <span className="mandatory">*</span>
                                  </label>
                                  <Editor
                                    editorState={item.editorState}
                                    onEditorStateChange={(editorState) =>
                                      handleEditorChange(
                                        servicesIndex,
                                        editorState
                                      )
                                    }
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
                                </div>
                              </div>
                              <div className="kids-form-section">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Service Duration
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Service Duration"
                                    value={item.serviceDuration}
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div className="service-files-main">
                              <div>
                                {item?.files?.length > 0 &&
                                  item?.files?.map((item) => {
                                    return (
                                      <>
                                        <div className="update-portfolio-cards">
                                          <div className="update-portfolio-icon">
                                            <div className="file-section">
                                              {item.type === "audio" && (
                                                <div className="fileType">
                                                  <i class="bi bi-mic-fill"></i>
                                                </div>
                                              )}
                                              {item.type === "video" && (
                                                <div className="fileType">
                                                  <i class="bi bi-play-circle-fill"></i>
                                                </div>
                                              )}
                                              {item.type === "document" && (
                                                <div className="fileType">
                                                  <i class="bi bi-file-earmark-richtext"></i>
                                                </div>
                                              )}
                                              <div className="update-portfolio-fileName">
                                                {item.title}
                                              </div>
                                              <div className="update-portfolio-action">
                                                <i
                                                  className="bi bi-three-dots-vertical"
                                                  type="button"
                                                  id="dropdownMenuButton1"
                                                  data-bs-toggle="dropdown"
                                                  aria-expanded="false"
                                                ></i>
                                                <ul
                                                  class="dropdown-menu"
                                                  aria-labelledby="dropdownMenuButton1"
                                                >
                                                  <li>
                                                    <a
                                                      class="dropdown-item"
                                                      onClick={() =>
                                                        viewUpdateFile(item)
                                                      }
                                                    >
                                                      View
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a
                                                      class="dropdown-item"
                                                      onClick={(e) => {
                                                        setAlertpop({
                                                          status: true,
                                                          item: item,
                                                          label: "delete",
                                                        });
                                                      }}
                                                    >
                                                      Delete
                                                    </a>
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="update-portfolio-action"></div>
                                        </div>
                                      </>
                                    );
                                  })}
                              </div>
                              <div
                                className="add-service-section"
                                key={servicesIndex}
                              >
                                <div className="add-portfolia-btn">
                                  <input
                                    type="file"
                                    className="select-cv-input"
                                    id="profile-image"
                                    accept="audio/*,video/*"
                                    onChange={(e) =>
                                      newServiceFileUpload(e, servicesIndex)
                                    }
                                    ref={serviceFileInputRef}
                                  />
                                  <div
                                    className="add-more-files-btn"
                                    onClick={() => serviceFile()}
                                    variant="text"
                                  >
                                    <i class="bi bi-plus-circle-fill"></i> Add
                                    Files
                                  </div>
                                </div>
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
                    <i class="bi bi-plus-circle-fill"></i>Add More Service
                  </div>
                  <div className="add-service-btn-flex">
                    <Button
                      onClick={() => submitServices()}
                      className="edit-profileimg-btn"
                      variant="text"
                      style={{ textTransform: "capitalize" }}
                    >
                      Add Services
                    </Button>
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={6}>
              <div className="kids-form-title">Features</div>
              {talentData && talentData?.features?.length > 0 && (
                <div className="features-section">
                  {featuresList && (
                    <>
                      {featuresList?.map((item, index) => {
                        return (
                          <>
                            <div className="mb-3 features-input-wrapper">
                              <label className="form-label">{item.label}</label>
                              <select
                                className="form-select features-select"
                                aria-label="Default select example"
                                value={features}
                                onChange={(e) =>
                                  handleFeaturesChange(
                                    item.label,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="" disabled selected>
                                  {item.label}
                                </option>
                                {item?.options?.map((item, index) => {
                                  return (
                                    <>
                                      <option defaultValue value="1">
                                        {item}
                                      </option>
                                    </>
                                  );
                                })}
                              </select>
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
              )}
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={7}>
              Reviews
            </CustomTabPanel>

            <div className="edit-profile-navigations">
              {valueTabs >= 1 && (
                <div
                  className="edit-profile-navigation-btn"
                  onClick={() => {
                    handleNavigation("back");
                  }}
                >
                  <i class="bi bi-arrow-left-circle-fill arrow-left-circle"></i>
                  <span className="edit-profile-navigation-text">Back</span>
                </div>
              )}
              {valueTabs != 7 && (
                <div
                  className="edit-profile-navigation-btn"
                  onClick={() => {
                    handleNavigation("next");
                  }}
                >
                  <span className="edit-profile-navigation-text">Next</span>
                  <i class="bi bi-arrow-right-circle-fill"></i>
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
                });
                if (alertpop?.label === "delete") {
                  deleteUpdateFile();
                }
              }}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>
      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default EditTalent;
