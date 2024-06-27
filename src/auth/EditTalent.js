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
import { v4 as uuidv4 } from "uuid";
import RichTextEditor from "../views/RichTextEditor";

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

  let testEditor = [
    '<p><span style="color: rgb(0,0,0);background-color: rgb(255,255,255);font-size: 14px;font-family: Open Sans", Arial, sans-serif;">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text</span>&nbsp;</p>\n',
  ];

  console.log(EditorState.createEmpty(testEditor), "testEditor");

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
  const btLogo = require("../assets/images/LOGO.jpg");
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
  const [talentId, setTalentId] = useState(null);
  const [talentData, setTalentData] = useState();
  const [videoUrl, setVideoUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };
  const [features, setFeatures] = useState();

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
    { value: "Actor", label: "Actor" },
    { value: "Artist", label: "Artist" },
    { value: "Creator", label: "Creator" },
    { value: "Celebrity", label: "Celebrity" },
    { value: "Influencer", label: "Influencer" },
    { value: "Model", label: "Model" },
    { value: "Event Planner", label: "Event Planner" },
    { value: "Stylist", label: "Stylist" },
    { value: "Hair & Makeup Artist", label: "Hair & Makeup Artist" },
    { value: "Nail Artist", label: "Nail Artist" },
    { value: "Tattooist", label: "Tattooist" },
    { value: "Chef/Culinary Artist", label: "Chef/Culinary Artist" },
    { value: "Personal Trainer", label: "Personal Trainer" },
    { value: "Swimming Instructor", label: "Swimming Instructor" },
    { value: "Driving Instructor", label: "Driving Instructor" },
    { value: "Meditation Teacher", label: "Meditation Teacher" },
    { value: "Yoga Instructor", label: "Yoga Instructor" },
    { value: "Dance Teacher", label: "Dance Teacher" },
    { value: "Music Teacher", label: "Music Teacher" },
    { value: "Sports Instructor", label: "Sports Instructor" },
    { value: "Martial Arts Instructor", label: "Martial Arts Instructor" },
    { value: "Craftsperson", label: "Craftsperson" },
    { value: "Sculptor", label: "Sculptor" },
    { value: "Curator", label: "Curator" },
    { value: "Singer", label: "Singer" },
    { value: "Dancer", label: "Dancer" },
    { value: "Choreographer", label: "Choreographer" },
    { value: "Musician", label: "Musician" },
    { value: "Filmmaker", label: "Filmmaker" },
    { value: "Cinematographer", label: "Cinematographer" },
    { value: "Photographer", label: "Photographer" },
    { value: "Videographer", label: "Videographer" },
    { value: "DJ", label: "DJ" },
    { value: "Video Jockey (VJ)", label: "Video Jockey (VJ)" },
    { value: "Radio Jockey (RJ)", label: "Radio Jockey (RJ)" },
    { value: "Writer", label: "Writer" },
    { value: "Copywriter", label: "Copywriter" },
    { value: "Cartoonist", label: "Cartoonist" },
    { value: "Blogger/Vlogger", label: "Blogger/Vlogger" },
    { value: "Podcaster", label: "Podcaster" },
    { value: "Host/MC", label: "Host/MC" },
    { value: "Voice-over Artist", label: "Voice-over Artist" },
    { value: "Comedian", label: "Comedian" },
    { value: "Public Speaker", label: "Public Speaker" },
    { value: "Life Coach", label: "Life Coach" },
    { value: "Career Coach", label: "Career Coach" },
    { value: "Sustainability Consultant", label: "Sustainability Consultant" },
    { value: "Fashion Designer", label: "Fashion Designer" },
    { value: "Graphic Designer", label: "Graphic Designer" },
    { value: "Web Designer/Developer", label: "Web Designer/Developer" },
    { value: "Interior Designer", label: "Interior Designer" },
    { value: "Illustrator", label: "Illustrator" },
    { value: "Animator", label: "Animator" },
    { value: "Blockchain Developer", label: "Blockchain Developer" },
  ];

  const categoryList = [
    "Fashion & Beauty",
    "Media & Entertainment",
    "Sports, Fitness, & Wellness",
    "Creative Arts & Design",
    "Celebrity",
    "Writing, Marketing, & Content Creation",
    "Performing Arts",
    "Education & Coaching",
    "Business & Technology",
    "Luxury & Lifestyle",
    "Eco-friendly & Sustainability",
    "Home & Gardening",
    "Food & Travel",
    "Diversity & Inclusion",
    "Kids & Teens",
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
    "African",
    "Arab",
    "Asian",
    "Black",
    "Central Asian",
    "Chinese",
    "European",
    "Filipino",
    "Indian",
    "Indonesian",
    "Japanese",
    "Khmer",
    "Korean",
    "Latino/Hispanic",
    "Middle-Eastern",
    "Native American",
    "Native Hawaiian/Pacific Islander",
    "Nepali",
    "Other",
    "Pakistani",
    "Persian",
    "Russian",
    "Scandinavian",
    "South-Asian",
    "South-East Asian",
    "Thai",
    "Turk",
    "Ukrainian",
    "Vietnamese",
    "White",
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
  const [updatedServices, setUpdatedServices] = useState();

  const getFeatures = async () => {
    await ApiHelper.get(API.getFeatures)
      .then((resData) => {
        if (resData) {
          setFeaturesList(resData.data.data[0].features);
        }
      })
      .catch((err) => {});
  };

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
            // handleSelectedCountry({
            //   value: resData?.data?.data?.parentCountry,
            //   label: resData?.data?.data?.parentCountry,
            //   key: 0,
            // });
            setCountry(resData?.data?.data?.parentCountry);
            setState(resData?.data?.data?.parentState);
            getStates(resData?.data?.data?.parentCountry);
            setKidsCity(resData?.data?.data?.childCity);

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
            setLanguages(resData?.data?.data?.languages);
            setNationality(resData?.data?.data?.childNationality);
            setMaritalStatus(resData?.data?.data?.maritalStatus);
            setEthnicity(resData?.data?.data?.childEthnicity);
            // setKidsEmail(resData?.data?.data?.childEmail);
            // setKidsPhone(resData?.data?.data?.childPhone);
            // setKidsLocation(resData?.data?.data?.childLocation);
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
            setServices(resData.data.data?.services);
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

            // const initialState = featuresList.reduce((acc, curr) => {
            //   const initialValueObj = resData?.data?.data?.features?.find(
            //     (item) => item.label === curr.label
            //   );
            //   acc[curr.label] = initialValueObj ? initialValueObj.value : "";
            //   return acc;
            // }, {});
            setFeatures(resData?.data?.data?.features);
          } else if (resData?.data?.data?.type === "adults") {
            setTalentData(resData.data.data, "resData.data.data");
            setEditProfileImage(resData.data.data?.image?.fileData);
            setKidsFillData(resData.data.data);
            setParentFirstName(resData?.data?.data?.adultLegalFirstName);
            setParentLastName(resData?.data?.data?.adultLegalLastName);
            setParentEmail(resData?.data?.data?.adultEmail);
            setParentMobile(resData?.data?.data?.childPhone);
            setAddress(resData?.data?.data?.parentAddress);
            setKidsLegalFirstName(resData?.data?.data?.childFirstName);
            setKidsLegalLastName(resData?.data?.data?.childLastName);
            setDob(resData?.data?.data?.childDob);
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
            setServices(resData.data.data?.services);
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
            setFeatures(resData?.data?.data?.features);
          }
        }
      })
      .catch((err) => {});
  };

  const handleFeaturesChange = (label, value) => {
    console.log(label, value, "label, value");
    const updatedValues = [...features];
    const index = updatedValues.findIndex((item) => item.label === label);
    if (index !== -1) {
      updatedValues[index] = { label, value };
    } else {
      updatedValues.push({ label, value });
    }
    console.log(updatedValues, "updatedValues");
    setFeatures(updatedValues);
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
    setMyState(false);

    if (talentData?.type === "kids") {
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
              setMyState(true);
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
    }
    if (talentData?.type === "adults") {
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
      };
      await ApiHelper.post(`${API.updateAdults}${talentData?._id}`, formData)
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
    }
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
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setFirstNameLetterError(false);
    }
  };
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
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
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setKidsLegalLastNameLetterError(false);
    }
  };

  const kidsPreferedFirstNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
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
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setKidsPrefferedFirstNameLetterError(false);
    }
  };
  const kidsPreferedLastNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
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

  useEffect(() => {
    console.log(features, "features");
  }, [features]);

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

  const serviceFileInputRefs = useRef([]);

  const serviceFile = (index) => {
    // console.log(eachService, "serviceFileUpload"); // should correctly log each service
    if (serviceFileInputRefs.current[index]) {
      serviceFileInputRefs.current[index].click();
    }
  };

  const newServiceFileUpload = (event, serviceData) => {
    console.log(serviceData, "serviceData newServiceFileUploadINDEX");
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      console.log(fileData, "fileData");
      uploadNewServiceFile(fileData, serviceData);
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

  const uploadNewServiceFile = async (fileData, serviceData) => {
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
          updateServiceFileAPI(fileObj, serviceData);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const updateServiceFileAPI = async (fileObj, serviceData) => {
    console.log(serviceData, "serviceData  updateServiceFileAPI");
    let serviceFilesArray = [...resumeFile, fileObj];
    let myValue = services.map((item) => {
      if (item?.uniqueId === serviceData?.uniqueId) {
        console.log(item, "item updateServiceFileAPI");
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
    console.log(myValue, "myValue");
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
    setMyState(false);
    const formData = {
      image: editProfileImageObject,
    };
    if (talentData?.type === "kids") {
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
    } else if (talentData?.type === "adults") {
      await ApiHelper.post(`${API.updateAdults}${talentData?._id}`, formData)
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
    }
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

  const viewVideoFile = (item) => {
    console.log(item, "viewFile");
    window.open(item, "_blank");
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

  const deleteServiceFile = async () => {
    console.log(alertpop, "alertpop");
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
    console.log(services, "servicessubmitServices");
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
  const submitFeatures = async () => {
    console.log(services, "servicessubmitServices");
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
    const editInputs = [...services];
    editInputs[index]["editorState"] = editorState;
    console.log(editInputs, "editInputs");
    setServices(editInputs);
  };

  useEffect(() => {
    console.log(featuresList, "featuresList");
  }, [featuresList]);
  useEffect(() => {
    console.log(features, "features");
  }, [features]);

  const handleInputChange = (index, key, value) => {
    console.log(index, "index handleInputChange");
    const newInputs = [...services];
    newInputs[index][key] = value;
    console.log(newInputs, "newInputs");
    setServices(newInputs);
  };

  const removeServices = async (data) => {
    console.log(alertpop, "alertpop");
    let formData = {
      talentId: talentId,
      serviceId: alertpop?.item?.uniqueId,
    };
    await ApiHelper.post(`${API.deleteIndividualService}`, formData)
      .then((resData) => {
        console.log(resData, "resDataremoveServices");
        if (resData) {
          setIsLoading(false);
          setMessage("Service Removed Successfully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            getKidsData();
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

  const handleUrlChange = (e) => {
    setVideoUrl(e.target.value);
    console.log(e.target.value, "handleUrlChange");
  };

  const handleAddUrl = async () => {
    if (videoUrl.trim() !== "") {
      // setUrls([...urls, videoUrl]);
      // console.log([...urls, videoUrl], "handleAddUrl");
      setVideoUrl("");
      // navigate(`/talent-signup-files-success`);
      const formData = {
        videosAndAudios: [...talentData?.videoAudioUrls, videoUrl],
        videoAudioUrls: [...talentData?.videoAudioUrls, videoUrl],
      };
      setIsLoading(true);
      await ApiHelper.post(`${API.editKids}${talentId}`, formData)
        .then((resData) => {
          console.log(resData, "resData");
          console.log(resData.data, "resData.data");
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Updated SuccessFully");
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
              getKidsData();
            }, 1000);
          } else {
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  };

  const handlePaste = (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData(
      "text"
    );
    setVideoUrl(pastedText);
    console.log(pastedText, "handlePaste");
  };

  const submitVideoAudios = async () => {
    // navigate(`/talent-signup-files-success`);
    const formData = {
      videosAndAudios: urls,
      videoAudioUrls: urls,
    };
    setIsLoading(true);
    await ApiHelper.post(`${API.editKids}${talentId}`, formData)
      .then((resData) => {
        console.log(resData, "resData");
        console.log(resData.data, "resData.data");
        if (resData.data.status === true) {
          setIsLoading(false);
          setMessage("Updated SuccessFully");
          setOpenPopUp(true);
          setTimeout(function() {
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

  const deleteVideoUrls = async (item, index) => {
    // navigate(`/talent-signup-files-success`);
    const formData = {
      talentId: talentId,
      index: index,
    };
    setIsLoading(true);
    await ApiHelper.post(`${API.deleteVideoUrls}`, formData)
      .then((resData) => {
        console.log(resData, "resDatadeleteVideoUrls");
        console.log(resData.data, "resData.data");
        if (resData.data.message === "URL deleted successfully") {
          setIsLoading(false);
          setMessage("Deleted SuccessFully");
          setOpenPopUp(true);
          setTimeout(function() {
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

  const handleDeleteUrl = (index) => {
    const newUrls = urls.filter((url, i) => i !== index);
    setUrls(newUrls);
  };
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (option) => {
    // Handle the option click here
    if (option === "view") {
      // Code to view the image in a new window
      window.open("your-image-url", "_blank");
    } else if (option === "delete") {
      // Code to delete the image
    }

    // Hide the options after selection
    setShowOptions(false);
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
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div className="brand-content-main boxBg edit_talentprofile">
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
              <div className="kids-main edit-basicdetails-section-main">
                <div className="kids-form-title kids-form-title">
                  <span>Personal Details</span>
                </div>
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
                        Please Enter Preferred First Name
                      </div>
                    )}
                    {kidsPrefferedFirstNameLetterError && (
                      <div className="invalid-fields">Only Letters Allowed</div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
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
                        Please Select Ethnicity
                      </div>
                    )}
                  </div>
                  <div className="kids-form-section col-md-6 mb-3">
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
                <div className="row">
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">
                      Date Of Birth <span className="mandatory">*</span>
                    </label>

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
                  <div className="kids-form-section col-md-6 mb-3">
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
                      <div className="invalid-fields">Please Select Gender</div>
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
                        <option defaultValue value="married">
                          Married
                        </option>
                        <option value="unmarried">UnMarried</option>
                      </select>
                    </div>
                  )}
                  {/* </div>

                <div className="row"> */}
                  <div className="kids-form-section col-md-6 mb-3">
                    <label className="form-label">
                      Mobile No <span className="mandatory">*</span>
                    </label>

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

                  <div className="kids-form-section col-md-6 mb-3">
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
                      <div className="invalid-fields">Please Select State</div>
                    )}
                  </div>
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
                {talentData?.type === "kids" && (
                  <div className="kids-form-title mb-3">Your Child Details</div>
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
                </div>
                <div className="kids-form-title-sub">
                  Select 3 to 6 categories relevant to your profile
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
                  <div className="update-portfolio-title">Portfolio </div>

                  {talentData?.portfolio?.length === 0 && (
                    <>
                      <div className="update-portfolio-label">
                        Add Your work samples here
                      </div>

                      <div className="no-data">Please Add Files</div>
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
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                      >
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            onClick={() => viewUpdateFile(item)}
                                          >
                                            View
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            onClick={(e) => {
                                              setAlertpop({
                                                status: true,
                                                item: item,
                                                label: "delete",
                                                eachService: null,
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
            <CustomTabPanel value={valueTabs} index={3}>
              <div className="update-portfolio-section edit-basicdetails-section-main">
                <div className="update-portfolio-cards-wrapper">
                  <div className="update-portfolio-title">Video & Audios</div>
                  <div className="row">
                    <div className="col-md-6">
                      {talentData?.videoAudioUrls?.length === 0 && (
                        <>
                          <div className="update-portfolio-label">
                            Add Your work samples here
                          </div>
                          <div className="no-data">Please Add Files</div>
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
                                    <div className="update-portfolio-fileName">
                                      {item}
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
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                      >
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            onClick={() => viewVideoFile(item)}
                                          >
                                            View
                                          </a>
                                        </li>
                                        <li>
                                          <a
                                            className="dropdown-item"
                                            onClick={() =>
                                              deleteVideoUrls(item, index)
                                            }
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
                  </div>

                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      {/* <label className="form-label">Videos & Audios</label> */}
                      <div className="videos-label">
                        ( Upload your previous work samples videos/audios.)
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
                          placeholder="Paste Videos/Audios Url"
                        ></input>
                        <i
                          className="bi bi-plus-circle-fill pl-4 add-vidoe-icon"
                          onClick={handleAddUrl}
                        ></i>
                      </div>
                      {urls && (
                        <>
                          {urls.map((url, index) => {
                            return (
                              <>
                                <div key={index} className="url-file-wrapper">
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
                                          id="resumeDropdown"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        />
                                        <ul
                                          className="dropdown-menu"
                                          aria-labelledby="resumeDropdown"
                                        >
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              onClick={() =>
                                                handleDeleteUrl(index)
                                              }
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
            <CustomTabPanel value={valueTabs} index={4}>
              <div className="update-portfolio-cards-wrapper">
                <div className="update-portfolio-title">CV</div>
                <div className="row">
                  {talentData?.cv?.length === 0 && (
                    <>
                      <div className="update-portfolio-label">
                        Add Your work samples here
                      </div>
                      <div className="no-data">Please Add Files</div>
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
                                      className="dropdown-menu"
                                      aria-labelledby="dropdownMenuButton1"
                                    >
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          onClick={() => viewUpdateFile(item)}
                                        >
                                          View
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="dropdown-item"
                                          onClick={(e) => {
                                            setAlertpop({
                                              status: true,
                                              item: item,
                                              label: "delete",
                                              eachService: null,
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
                    services?.map((eachService, servicesIndex) => {
                      console.log(eachService, "eachService");
                      return (
                        <>
                          <div className="edit-service-section-wrapper">
                            <div className="edit-service-header">
                              <h5>{eachService.serviceName}</h5>
                              <div>
                                <i
                                  class="bi bi-trash"
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
                                  placeholder="service name"
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
                                  Service Amount
                                  <span className="mandatory">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="service amount"
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
                                  Features
                                  <span className="mandatory">*</span>
                                </label>
                                {/* 
                                  <Editor
                                    editorStyle={{
                                      overflow: "hidden",
                                    }}
                                    editorState={eachService?.editorState}
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
                                  /> */}
                                <RichTextEditor
                                  value={eachService?.editorState}
                                  onChange={(editorState) =>
                                    handleEditorChange(
                                      servicesIndex,
                                      editorState
                                    )
                                  }
                                />
                              </div>
                              <div className="kids-form-section col-md-6 mb-3">
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
                              </div>
                            </div>
                            <div className="service-files-main">
                              <div>
                                {eachService?.files?.length > 0 &&
                                  eachService?.files?.map((item) => {
                                    return (
                                      <>
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
                                                  className="dropdown-menu"
                                                  aria-labelledby="dropdownMenuButton1"
                                                >
                                                  <li>
                                                    <a
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        viewUpdateFile(item)
                                                      }
                                                    >
                                                      View
                                                    </a>
                                                  </li>
                                                  <li>
                                                    <a
                                                      className="dropdown-item"
                                                      onClick={(e) => {
                                                        setAlertpop({
                                                          status: true,
                                                          item: item,
                                                          label:
                                                            "delete-service",
                                                          eachService: eachService,
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
                              <div className="add-service-section">
                                <div className="add-portfolia-btn">
                                  <input
                                    type="file"
                                    className="select-cv-input"
                                    id={servicesIndex}
                                    accept="image/*"
                                    onChange={(e) =>
                                      newServiceFileUpload(e, eachService)
                                    }
                                    ref={(el) =>
                                      (serviceFileInputRefs.current[
                                        servicesIndex
                                      ] = el)
                                    }
                                  />
                                  <div
                                    className="add-more-files-btn"
                                    onClick={() => serviceFile(servicesIndex)}
                                    variant="text"
                                  >
                                    <i className="bi bi-plus-circle-fill"></i>{" "}
                                    Add Files
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
                    <i className="bi bi-plus-circle-fill"></i>Add More Service
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
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={6}>
              {talentData && talentData?.features?.length > 0 && (
                <>
                  <div className="selected-features update-portfolio-cards-wrapper mt-3 mb-5">
                    {features && (
                      <>
                        <div className="table-container">
                          <table>
                            <tbody>
                              <tr>
                                <td className="left-column">
                                  <table>
                                    <tbody>
                                      {features
                                        ?.slice(
                                          0,
                                          Math.ceil(features?.length / 2)
                                        )
                                        .map((feature, index) => (
                                          <tr key={feature.label}>
                                            <td>{feature.label}</td>
                                            <td>{feature.value}</td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </td>
                                <td className="right-column">
                                  <table>
                                    <tbody>
                                      {features
                                        ?.slice(Math.ceil(features?.length / 2))
                                        .map((feature, index) => (
                                          <tr key={feature.label}>
                                            <td>{feature.label}</td>
                                            <td>{feature.value}</td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="features-section">
                    <div className="row">
                      {featuresList.map((item, index) => {
                        return (
                          <>
                            <div className="mb-3 mr-3 features-input-wrapper">
                              <label className="form-label">{item.label}</label>
                              <select
                                className="form-select features-select"
                                aria-label="Default select example"
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
                                {item.options.map((option, idx) => (
                                  <option key={idx} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        );
                      })}
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
                  <i className="bi bi-arrow-left-circle-fill arrow-left-circle"></i>
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
