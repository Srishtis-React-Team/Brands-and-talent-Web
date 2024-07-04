import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsform-one.scss";
import Select from "react-select";
import Axios from "axios";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import ReactFlagsSelect from "react-flags-select";
import { useNavigate } from "react-router";
import nationalityOptions from "../components/nationalities";
import languageOptions from "../components/languages";
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import nationalitiesArray from "../components/NationalitiesArray";
const KidsformOne = ({ sendDataToParent }) => {
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
  const [completedError, setJobsCompletedError] = useState(false);
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
  const [nationality, setNationality] = useState([]);
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
  const [completedJobs, setCompletedJobs] = useState("");
  const [selectedNationalityOptions, setSelectedNationalityOptions] = useState(
    []
  );

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
    setDobError(false);
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

  const handleJobsCompleted = (event) => {
    setCompletedJobs(event.target.value);
    setJobsCompletedError(false);
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

  const selectNationality = (selectedOptions) => {
    console.log(selectedOptions, "selectedOptions selectedLanguages");
    if (!selectedOptions || selectedOptions.length === 0) {
      // Handle case when all options are cleared
      setNationality([]); // Clear the languages state
      setSelectedNationalityOptions([]);

      return;
    }
    // Extract values of all selected languages
    const selectedLanguages = selectedOptions.map((option) => option.value);
    console.log(selectedLanguages, "selectedLanguages");
    setNationality(selectedLanguages); // Update languages state with all selected languages
    setSelectedNationalityOptions(selectedOptions);
    setNationalityError(false);
  };

  const selectMaritalStatus = (event) => {
    setMaritalStatus(event.target.value);
    setMaritalError(false);
  };

  const handlePasswordChange = (e) => {
    setTalentPassword(e.target.value);
    setPasswordMatch(e.target.value === talentConfirmPassword);
    settalentPasswordError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setTalentConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === talentPassword);
    settalentConfirmPasswordError(false);
  };

  const handleProfessionChange = (selectedOptions) => {
    // setSelectedProfessions(selectedOptions);
    // setProfessionError(false);

    if (selectedOptions.length > 5) {
      // setProfessionError(true);
      // Optionally show a message to the user
      setMessage("You can only select up to 5 skills");
      setOpenPopUp(true);
      setTimeout(function() {
        setOpenPopUp(false);
      }, 2000);
      return; // Prevent the state update
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

  const handleSubmit = () => {
    // Construct the final object containing selected professions and their details
  };

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

  // function chooseCategory(category) {
  //   setCategoryError(false);
  //   if (selectedCategories.includes(category)) {
  //     setSelectedCategories(
  //       selectedCategories.filter((item) => item !== category)
  //     );
  //   } else {
  //     setSelectedCategories([...selectedCategories, category]);
  //   }
  // }

  const chooseCategory = (category) => {
    setCategoryError(false);
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      if (selectedCategories.length < 6) {
        setSelectedCategories([...selectedCategories, category]);
      } else {
        // setCategoryError(true);
        setMessage("you can only select 6 categories");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
        }, 2000);
      }
    }
  };
  const deleteProfession = (profession, index) => {
    console.log(profession, "profession");
    console.log(index, "profession index");
    setSelectedProfessions((prevSelectedProfessions) =>
      prevSelectedProfessions.filter((item) => item.value !== profession.value)
    );
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
    await ApiHelper.post(`${API.getKidsData}${userId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          setKidsFillData(resData.data.data);
          setParentFirstName(resData?.data?.data?.parentFirstName);
          setParentLastName(resData?.data?.data?.parentLastName);
          setParentEmail(resData?.data?.data?.parentEmail);
          setParentMobile(resData?.data?.data?.parentMobileNo);
          setAddress(resData?.data?.data?.parentAddress);
          setKidsLegalFirstName(resData?.data?.data?.childFirstName);
          setKidsLegalLastName(resData?.data?.data?.childLastName);
          setDob(resData?.data?.data?.childDob);
          handleSelectedCountry({
            value: resData?.data?.data?.parentCountry,
            label: resData?.data?.data?.parentCountry,
            key: 0,
          });
          setKidsPreferedFirstName(
            resData?.data?.data?.preferredChildFirstname
          );
          setKidsPreferedLastName(resData?.data?.data?.preferredChildLastName);
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
        }
      })
      .catch((err) => {});
  };

  const handleSelectedCountry = (event) => {
    setParentCountryError(false);
    console.log(event, "event");
    console.log(event?.value, "event?.value");
    setCountry(event?.value);
    // setState("");
    // handleSelectedState("");
    getStates(event?.value);
    console.log(country, "country");
  };
  const handleSelectedState = (state) => {
    console.log(state, "state");
    setStateError(false);
    setState(state?.label);
    // setKidsCity("");
    getCities({
      countryName: country,
      stateName: state?.label,
    });
  };

  useEffect(() => {
    console.log(state, "stateUseeffect");
  }, [state]);

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

  const kidsSignUp = async () => {
    if (parentFirstName === "") {
      setparentFirstNameError(true);
    }
    if (parentEmail === "") {
      setparentEmailError(true);
    }
    if (talentPassword === "") {
      settalentPasswordError(true);
    }
    if (talentConfirmPassword === "") {
      settalentConfirmPasswordError(true);
    }
    if (kidsLegalFirstName === "") {
      setkidsLegalFirstNameError(true);
    }
    if (gender === "") {
      setgenderError(true);
    }
    if (parentMobile === "") {
      setParentMobileError(true);
    }
    if (country === "") {
      setParentCountryError(true);
    }

    if (address === "") {
      setAddressError(true);
    }
    if (selectedProfessions.length === 0) {
      setProfessionError(true);
    }
    if (selectedCategories.length === 0) {
      setCategoryError(true);
    }
    if (kidsPreferedFirstName === "") {
      setPreferedNameError(true);
    }
    if (kidsPreferedFirstName === "") {
      setPreferedNameError(true);
    }
    if (nationality === "") {
      setNationalityError(true);
    }
    if (ethnicity.length === 0) {
      setEthnicityError(true);
    }
    if (languages.length === 0) {
      setLanguageError(true);
    }
    if (dateOfBirth === "") {
      setDobError(true);
    }
    console.log(parentFirstName, "parentFirstName");
    console.log(parentEmail, "parentEmail");
    console.log(talentPassword, "talentPassword");
    console.log(talentConfirmPassword, "talentConfirmPassword");
    console.log(kidsLegalFirstName, "kidsLegalFirstName");
    console.log(gender, "gender");
    console.log(parentMobile, "parentMobile");
    console.log(country, "country");
    console.log(kidsCity, "kidsCity");
    console.log(address, "address");
    console.log(selectedProfessions, "selectedProfessions");
    console.log(selectedProfessions, "selectedProfessions");
    console.log(selectedCategories, "selectedCategories");
    console.log(selectedCategories, "selectedCategories");
    console.log(kidsPreferedFirstName, "kidsPreferedFirstName");
    console.log(nationality, "nationality");
    console.log(ethnicity, "ethnicity");
    console.log(languages, "languages");
    console.log(maritalStatus, "maritalStatus");
    console.log(dateOfBirth, "dateOfBirth");
    if (
      parentFirstName !== "" &&
      parentEmail !== "" &&
      talentPassword !== "" &&
      talentConfirmPassword !== "" &&
      kidsLegalFirstName !== "" &&
      gender !== "" &&
      parentMobile !== "" &&
      country !== "" &&
      address !== "" &&
      selectedProfessions.length !== 0 &&
      selectedCategories.length !== 0 &&
      kidsPreferedFirstName !== "" &&
      nationality !== "" &&
      ethnicity !== "" &&
      languages !== "" &&
      dateOfBirth !== "" &&
      passwordMatch === true
    ) {
      const formData = {
        parentFirstName: parentFirstName,
        parentLastName: parentLastName,
        parentEmail: parentEmail,
        parentMobileNo: parentMobile,
        parentCountry: country,
        parentState: state,
        parentAddress: address,
        talentPassword: talentPassword,
        confirmPassword: talentConfirmPassword,
        profession: selectedProfessions,
        relevantCategories: selectedCategories,
        maritalStatus: maritalStatus,
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
        noOfJobsCompleted: completedJobs,
        publicUrl: kidsPreferedFirstName,
      };
      setIsLoading(true);
      console.log(userId, "userId");
      if (!userId) {
        console.log("signup block");
        await ApiHelper.post(API.kidsSignUp, formData)
          .then((resData) => {
            if (resData.data.status === true) {
              setIsLoading(false);
              setMessage("Registered Successfully");
              setOpenPopUp(true);
              setTimeout(function() {
                setOpenPopUp(false);
                navigate(`/talent-otp?${resData.data.data}`);
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
      } else if (userId) {
        console.log("edit block");
        await ApiHelper.post(`${API.editKids}${userId}`, formData)
          .then((resData) => {
            if (resData.data.status === true) {
              setIsLoading(false);
              setMessage("Updated SuccessFully!");
              setOpenPopUp(true);
              setTimeout(function() {
                setOpenPopUp(false);
                navigate(
                  `/talent-signup-plan-details?userId=${resData.data.data["user_id"]}&userEmail=${resData.data.data["email"]}`
                );
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
    } else {
      setMessage("Please Update All Required Fields");
      setOpenPopUp(true);
      setTimeout(function() {
        setOpenPopUp(false);
      }, 1000);
    }
    console.log(passwordMatch, "passwordMatch");
    if (!passwordMatch) {
      setMessage("Please Update All Required Fields");
      setOpenPopUp(true);
      setTimeout(function() {
        setOpenPopUp(false);
      }, 1000);
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

  // const handleMobileChange = (e) => {
  //   const value = e.target.value;
  //   // Regular expression to allow only numbers and the "+" symbol
  //   const onlyNumbersRegex = /^[0-9+]*$/;
  //   if (!onlyNumbersRegex.test(value)) {
  //     setMobileNumError(true);
  //   } else {
  //     setParentMobile(value);
  //     setMobileNumError(false);
  //   }
  // };

  let line = document.querySelector(".line");
  let text = document.querySelector(".text");
  let password_strength_box = document.querySelector(".password_strength_box");
  let password = document.querySelector(".password");

  if (password && password_strength_box && line && text) {
    if (password.value.length == 0) {
      password_strength_box.style.display = "none";
    }

    password.oninput = function() {
      if (password.value.length == 0) {
        password_strength_box.style.display = "none";
      }

      if (password.value.length >= 1) {
        password_strength_box.style.display = "flex";
        line.style.width = "5%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (password.value.length >= 2) {
        password_strength_box.style.display = "flex";
        line.style.width = "10%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (password.value.length >= 3) {
        password_strength_box.style.display = "flex";
        line.style.width = "20%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (password.value.length >= 4) {
        password_strength_box.style.display = "flex";
        line.style.width = "35%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
        if (password.value.match(/[!@#$%^&*]/)) {
          password_strength_box.style.display = "flex";
          line.style.width = "45%";
          line.style.backgroundColor = "#e9ee30";
          text.style.color = "#e9ee30";
          text.innerHTML = "Medium";
        }
      }
      if (
        password.value.length >= 5 &&
        password.value.match(/[A-Z]/) &&
        password.value.match(/[a-z]/)
      ) {
        password_strength_box.style.display = "flex";
        line.style.width = "50%";
        line.style.backgroundColor = "#e9ee30";
        text.style.color = "#e9ee30";
        text.innerHTML = "Medium";
      }
      if (password.value.length >= 6 && password.value.match(/[0-9]/)) {
        password_strength_box.style.display = "flex";
        line.style.width = "70%";
        line.style.backgroundColor = "#e9ee30";
        text.style.color = "#e9ee30";
        text.innerHTML = "Medium";
      }
      if (
        password.value.length >= 7 &&
        password.value.match(/[A-Z]/) &&
        password.value.match(/[a-z]/) &&
        password.value.match(/[0-9]/)
      ) {
        password_strength_box.style.display = "flex";
        line.style.width = "80%";
        line.style.backgroundColor = "#e9ee30";
        text.style.color = "#e9ee30";
        text.innerHTML = "Medium";
      }

      if (
        password.value.length >= 8 &&
        password.value.match(/[A-Z]/) &&
        password.value.match(/[a-z]/) &&
        password.value.match(/[0-9]/) &&
        password.value.match(/[!@#$%^&*]/)
      ) {
        password_strength_box.style.display = "flex";
        line.style.width = "100%";
        line.style.backgroundColor = "#2ccc2c";
        text.style.color = "#2ccc2c";
        text.innerHTML = "Strong";
      }
    };
  }

  useEffect(() => {
    console.log(selectedProfessions, "selectedProfessions");
  }, [selectedProfessions]);

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
              <div className="step-text">Step 1 of 6</div>
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
              <div className="kids-wrapper row">
                <div className="kids-img col-md-4 col-lg-3">
                  <div className="fixImgs">
                    <img src={kidsImage} alt="" className="kids-image-sticky" />
                  </div>
                </div>
                <div className="kids-form col-md-8 col-lg-9">
                  <div className="kids-title">
                    Welcome to Kids & Teen Talent ( 4-17 years ) Registration
                    Form
                  </div>
                  <div className="kids-description">
                    Unleash your kid's inner star! ✨ Brands / Client & Talent
                    is your gateway to exciting opportunities for young creators
                    ( 4-17 )!  Imagine their talent shining on the big stage,
                    collaborating with renowned Brands / Client on fun gigs and
                    influencer projects.  This registration form is your first
                    step to making their dreams a reality. Register now and
                    unlock a world of possibilities for your kid!
                  </div>
                  <div className="kids-notes">NOTE: </div>
                  <div className="kids-notes">
                    1. Authorized Guardianship Required: This Kids & Teen
                    Registration form is for authorized guardians only,
                    registering on behalf of their child. Any unauthorized or
                    fraudulent registration constitutes a violation of our Terms
                    of Service and may result in immediate and permanent account
                    suspension.
                  </div>
                  <div className="kids-notes-two">
                    2. Violation of Policy: Any action or conduct that violates
                    our policies, including unauthorized registration, may lead
                    to account suspension.
                  </div>
                  <div className="kids-main">
                    <div className="kids-form-title">
                      <span>Parent/Guardian Details</span>
                    </div>
                    <div className="kids-form-row row">
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
                    <div className="kids-form-row row">
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
                        />
                        {!isValidEmail && (
                          <div className="invalid-feedback">
                            Please enter a valid email address.
                          </div>
                        )}
                        {parentEmailError && (
                          <div className="invalid-fields">
                            Please enter Email
                          </div>
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
                          value={country?.value}
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
                    <div className="kids-form-row row">
                      <div className="kids-form-section col-md-6 mb-3">
                        <label className="form-label">State</label>
                        <Select
                          placeholder="Select state..."
                          options={stateList.map((state) => ({
                            value: state.stateId, // or whatever unique identifier you want to use
                            label: state.name,
                          }))}
                          value={state?.label}
                          onChange={handleSelectedState}
                          isSearchable={true}
                        />
                        {stateError && (
                          <div className="invalid-fields">
                            Please Select State
                          </div>
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
                          value={kidsCity?.label}
                          onChange={handleSelectedCity}
                          isSearchable={true}
                        />
                      </div>
                    </div>
                    <div className="kids-form-row row">
                      <div className="kids-form-section col-md-6 mb-3">
                        <label className="form-label">
                          Password <span className="mandatory">*</span>
                        </label>
                        <div className="form-group has-search adult-password-wrapper">
                          <span className="fa fa-lock form-control-feedback"></span>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control password adult-signup-inputs"
                            placeholder="Password"
                            onChange={(e) => {
                              handlePasswordChange(e);
                              setTalentPassword(e.target.value);
                              settalentPasswordError(false);
                            }}
                          ></input>
                          <div className="password_strength_box">
                            <div className="password_strength">
                              <p className="text">Weak</p>
                              <div className="line_box">
                                <div className="line"></div>
                              </div>
                            </div>
                            <div className="tool_tip_box">
                              <span>
                                <i className="bi bi-question-circle"></i>
                              </span>
                              <div className="tool_tip">
                                <p style={{ listStyleType: "none" }}>
                                  <b>Password must be:</b>
                                </p>
                                <p>At least 8 character long</p>
                                <p>At least 1 uppercase letter</p>
                                <p>At least 1 lowercase letter</p>
                                <p>At least 1 number</p>
                                <p>
                                  At least 1 special character from !@#$%^&*
                                </p>
                              </div>
                            </div>
                          </div>
                          {showPassword ? (
                            <span
                              className="fa fa-eye show-password-icon"
                              onClick={togglePasswordVisibility}
                            ></span>
                          ) : (
                            <span
                              className="fa fa-eye-slash show-password-icon"
                              onClick={togglePasswordVisibility}
                            ></span>
                          )}
                          {talentPasswordError && (
                            <div className="invalid-fields">
                              Please enter Password
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="kids-form-section col-md-6 mb-3">
                        <label className="form-label">
                          Confirm Password <span className="mandatory">*</span>
                        </label>
                        <div className="form-group has-search adult-confirm-password-wrapper">
                          <span className="fa fa-lock form-control-feedback"></span>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control adult-signup-inputs"
                            placeholder="Confirm Password"
                            onChange={(e) => {
                              handleConfirmPasswordChange(e);
                              setTalentConfirmPassword(e.target.value);
                              settalentConfirmPasswordError(false);
                            }}
                          ></input>
                          {showConfirmPassword ? (
                            <span
                              className="fa fa-eye show-confirm-password-icon"
                              onClick={toggleConfirmPasswordVisibility}
                            ></span>
                          ) : (
                            <span
                              className="fa fa-eye-slash show-confirm-password-icon"
                              onClick={toggleConfirmPasswordVisibility}
                            ></span>
                          )}
                          {talentConfirmPasswordError && (
                            <div className="invalid-fields">
                              Please enter Password
                            </div>
                          )}
                        </div>
                        {!passwordMatch &&
                          talentConfirmPassword &&
                          talentConfirmPassword.length && (
                            <p className="password-wrong">
                              Passwords does not match.
                            </p>
                          )}
                      </div>
                    </div>
                    <div className="kids-form-row row">
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
                    <div className="kids-form-row row">
                      <div className="kids-form-section col-md-12 mb-3">
                        <label
                          htmlFor="exampleFormControlTextarea1"
                          className="form-label"
                        >
                          Address<span className="mandatory">*</span>
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
                          <div className="invalid-fields">
                            Please Enter Address
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="kids-form-title">
                      <span>Your Child Details</span>
                    </div>
                    <div className="profession-section-cover">
                      <div className="kids-form-row row">
                        <div className="kids-form-section col-md-12 mb-3">
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
                              placeholder="Search for Category"
                              onChange={handleProfessionChange}
                              styles={customStyles}
                              value={selectedProfessions}
                            />
                            {professionError && (
                              <div className="invalid-fields">
                                Please Choose Profession
                              </div>
                            )}
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
                            <div>
                              <i
                                onClick={(e) => {
                                  deleteProfession(profession, index);
                                }}
                                class="bi bi-trash"
                              ></i>
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
                      <div className="invalid-fields">
                        Please Choose Categories
                      </div>
                    )}
                    <div className="kids-form-title">
                      <span>Personal Details</span>
                    </div>
                    <div className="kids-form-row row">
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
                    <div className="kids-form-row row">
                      <div className="kids-form-section col-md-6 mb-3">
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
                      <div className="kids-form-section col-md-6 mb-3">
                        <label className="form-label">
                          Preferred Last name
                        </label>
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
                    <div className="kids-form-row row">
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
                          <div className="invalid-fields">
                            Please Select Gender
                          </div>
                        )}
                      </div>
                      <div className="kids-form-section col-md-6 mb-3">
                        <label className="form-label">
                          Languages <span className="mandatory">*</span>
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
                        />
                        {languageError && (
                          <div className="invalid-fields">
                            Please Select Language
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="kids-form-row row">
                      <div className="kids-form-section col-md-6 mb-3">
                        <label className="form-label">
                          Nationality <span className="mandatory">*</span>
                        </label>

                        <Select
                          isMulti
                          name="colors"
                          options={nationalitiesArray}
                          valueField="value"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(value) => selectNationality(value)}
                          styles={customStylesProfession}
                          value={selectedNationalityOptions}
                        />

                        {nationalityError && (
                          <div className="invalid-fields">
                            Please Select Nationality
                          </div>
                        )}
                      </div>
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
                    </div>
                    <div className="kids-form-row row mb-3">
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
                            value={value}
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
                          Number Of Jobs Completed
                          <span className="mandatory">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={completedJobs}
                          onChange={(e) => {
                            handleJobsCompleted(e);
                            setJobsCompletedError(false);
                          }}
                          placeholder="Number of jobs completed"
                        ></input>
                        {parentFirstNameError && (
                          <div className="invalid-fields">
                            Please enter Completed Jobs
                          </div>
                        )}
                      </div>
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
                navigate("/");
              }}
              className="step-back"
            >
              Back
            </button>
            <button
              type="button"
              className="step-continue"
              onClick={(e) => {
                kidsSignUp();
              }}
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
          </div>
        </div>
      </>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default KidsformOne;
