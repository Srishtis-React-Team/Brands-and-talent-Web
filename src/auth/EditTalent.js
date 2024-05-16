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
    if (userId) {
      getKidsData();
    }
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
    setLanguageError(false);
    if (!selectedOptions || selectedOptions.length === 0) {
      // Handle case when all options are cleared
      setLanguages([]); // Clear the languages state
      return;
    }

    // Extract values of all selected languages
    const selectedLanguages = selectedOptions.map((option) => option.value);
    setLanguages(selectedLanguages); // Update languages state with all selected languages
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

  const getKidsData = async () => {
    await ApiHelper.post(`${API.getTalentById}${talentData?._id}`)
      .then((resData) => {
        if (resData.data.status === true) {
          console.log(resData?.data?.data, "KIDSFETCH");
          if (resData?.data?.data?.type === "kids") {
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

  useEffect(() => {
    console.log(parentEmail, "parentEmail");
  }, [parentEmail]);
  useEffect(() => {
    console.log(country, "country");
  }, [country]);
  useEffect(() => {
    console.log(dateOfBirth, "dateOfBirth");
  }, [dateOfBirth]);

  const handleSelectedCountry = (event) => {
    setParentCountryError(false);
    console.log(event, "event");
    console.log(event?.value, "event?.value");

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
    setValueTabs(newValue);
  };

  const [talentId, setTalentId] = useState(null);
  const [talentData, setTalentData] = useState();

  useEffect(() => {
    setTalentId(localStorage.getItem("userId"));
    console.log(talentId, "talentId");
    if (talentId) {
      getTalentById();
    }
  }, [talentId]);

  const getTalentById = async () => {
    await ApiHelper.post(`${API.getTalentById}${talentId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setTalentData(resData.data.data, "resData.data.data");
            setEditProfileImage(resData.data.data?.image?.fileData);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(talentData, "talentDataEdit");
    if (talentData?._id) {
      getKidsData();
    }
  }, [talentData]);

  const [editProfileImage, setEditProfileImage] = useState("");

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
          updateProfile(fileObj);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const [myState, setMyState] = useState(false);

  const updateProfile = async (data) => {
    const formData = {
      image: data,
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

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} />
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
        <div className="brand-content-main">
          <div className="create-job-title">Edit Profile</div>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={valueTabs}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="Update Profile Image"
                  {...a11yProps(0)}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Update Basic Details"
                  {...a11yProps(1)}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Update Portfolio"
                  {...a11yProps(2)}
                  style={{ textTransform: "capitalize" }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={valueTabs} index={0}>
              <div className="profile-image-edit-section">
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
                    Update Image
                  </Button>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={1}>
              <div className="kids-main">
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
              <div className="update-portfolio-section">
                <div className="update-portfolio-cards-wrapper">
                  <div className="update-portfolio-title">Portfolio</div>

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
                                  <Button
                                    id="basic-button"
                                    aria-controls={
                                      open ? "basic-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleFileClick}
                                  >
                                    <i class="bi bi-three-dots-vertical"></i>
                                  </Button>
                                  <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                      "aria-labelledby": "basic-button",
                                    }}
                                  >
                                    <MenuItem onClick={handleClose}>
                                      View
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                      Edit
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
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
                <div className="update-portfolio-cards-wrapper">
                  <div className="update-portfolio-title">Videos & Audios</div>

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
                                  <Button
                                    id="basic-button"
                                    aria-controls={
                                      open ? "basic-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleFileClick}
                                  >
                                    <i class="bi bi-three-dots-vertical"></i>
                                  </Button>
                                  <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                      "aria-labelledby": "basic-button",
                                    }}
                                  >
                                    <MenuItem onClick={handleClose}>
                                      View
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                      Edit
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                      Delete
                                    </MenuItem>
                                  </Menu>
                                </div>
                              </div>
                            </div>
                            <div className="update-portfolio-action"></div>
                          </div>
                        </>
                      );
                    })}
                </div>

                <div className="update-portfolio-cards-wrapper">
                  <div className="update-portfolio-title">Resumes</div>

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
                                  <Button
                                    id="basic-button"
                                    aria-controls={
                                      open ? "basic-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleFileClick}
                                  >
                                    <i class="bi bi-three-dots-vertical"></i>
                                  </Button>
                                  <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                      "aria-labelledby": "basic-button",
                                    }}
                                    className="update-portfolio-menu"
                                  >
                                    <MenuItem onClick={handleClose}>
                                      View
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                      Edit
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                      Delete
                                    </MenuItem>
                                  </Menu>
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
            </CustomTabPanel>
          </Box>
        </div>
      </main>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default EditTalent;
