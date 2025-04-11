import React, { useState, useEffect } from "react";
import Select from "react-select";
import Axios from "axios";
import { useNavigate } from "react-router";
import { API } from "../../config/api";
import { ApiHelper } from "../../helpers/ApiHelper";
import PopUp from "../../components/PopUp";
import "../../assets/css/talent-dashboard.css";
import "../../assets/css/forms/kidsform-one.css";

import "../../assets/css/forms/login.css";
import "../../assets/css/dashboard.css";
import "../../assets/css/register.css";
import "../../assets/css/kidsmain.scss";

import MuiPhoneNumber from "material-ui-phone-number";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CurrentUser from "../../CurrentUser";
import useFieldDatas from "../../config/useFieldDatas";
import { Tooltip } from "react-tooltip";
import { isValidPhoneNumber } from "libphonenumber-js";
import "material-icons/iconfont/material-icons.css";

const AdultFormOne = () => {
  const {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
    fcmToken,
  } = CurrentUser();
  const {
    categoryList,
    professionList,
    gendersList,
    languagesList,
    nationalitiesList,
  } = useFieldDatas();
  const [listOfNationalities, setListOfNationalities] = useState([]);
  const [listOfLanguages, setListOfLanguages] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (nationalitiesList.length > 0) {
      setListOfNationalities(nationalitiesList);
      getTalentById();
    }
  }, [nationalitiesList]);

  useEffect(() => {
    if (languagesList.length > 0) {
      setListOfLanguages(languagesList);
      getTalentById();
    }
  }, [languagesList]);

  useEffect(() => {
    let selectedOptions;
    if (listOfLanguages && listOfLanguages.length > 0) {
      selectedOptions = languages.map((language) => {
        return listOfLanguages.find((option) => option.label === language);
      });
    }

    setSelectedLanguageOptions(selectedOptions);
  }, [languagesList, languages]);

  const [talentData, setTalentData] = useState();

  useEffect(() => {
    if (currentUserId) {
      getTalentById();
    }
  }, [currentUserId]);
  const [selectedLanguageOptions, setSelectedLanguageOptions] = useState([]);
  const [selectedPublicUrl, setSelectedPublicUrl] = useState("");

  const getTalentById = async () => {
    await ApiHelper.post(`${API.getTalentById}${currentUserId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setAdultsLegalFirstName(resData?.data?.data?.adultLegalFirstName);
            setAdultsLegalLastName(resData?.data?.data?.adultLegalLastName);
            setAdultsPreferedFirstName(
              resData?.data?.data?.preferredChildFirstname
            );
            setAdultsPreferedLastName(
              resData?.data?.data?.preferredChildLastName
            );
            setAdultsPhone(resData?.data?.data?.childPhone);
            setCompletedJobs(resData?.data?.data?.noOfJobsCompleted);
            setAddress(resData?.data?.data?.parentAddress);
            setDob(resData?.data?.data?.childDob);
            setCountry(resData?.data?.data?.parentCountry);
            setState(resData?.data?.data?.parentState);
            setKidsCity(resData?.data?.data?.childCity);
            setGender(resData?.data?.data?.childGender);
            setLanguages(resData?.data?.data?.languages);
            setSelectedPublicUrl(resData?.data?.data?.publicUrl);

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
            setAge(resData.data.data?.age);
            const selectedProfessionOptions = resData.data.data?.profession.map(
              (profession) => {
                return professionList.find(
                  (option) => option.label === profession
                );
              }
            );
            setSelectedProfessions(resData.data.data?.profession);

            const selectedNationalityOptions =
              resData.data.data?.childNationality.map((language) => {
                return nationalitiesList.find(
                  (option) => option.label === language
                );
              });
            setSelectedNationalityOptions(selectedNationalityOptions);
          }
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {}, [talentData]);

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
      minHeight: "45px",
    }),
    menu: (provided, state) => ({
      ...provided,
      maxHeight: "500px",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#fff" : "#fff", // or any color you want for selected option
      color: state.isSelected ? "#000" : "#333", // text color for selected and non-selected options
      "&:hover": {
        backgroundColor: "#e0e0e0", // hover state color
      },
    }),
  };
  const btLogo = require("../../assets/images/LOGO.png");
  const adultsBanner = require("../../assets/images/adultsBanner.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [value, setValue] = useState(null);

  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [age, setAge] = useState("");
  const [adultsPreferedFirstName, setAdultsPreferedFirstName] = useState("");
  const [adultsPreferedLastName, setAdultsPreferedLastName] = useState("");
  const [adultsLegalFirstName, setAdultsLegalFirstName] = useState("");
  const [adultsLegalLastName, setAdultsLegalLastName] = useState("");
  const [adultsPhone, setAdultsPhone] = useState("");
  const [adultsLocation, setAdultsLocation] = useState("");
  const [kidsCity, setKidsCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [nationality, setNationality] = useState([]);
  // Auto-filled fields
  const [preferredChildFirstname, setPreferredChildFirstname] = useState("");
  const [preferredChildLastName, setPreferredChildLastName] = useState("");

  const [selectedNationalityOptions, setSelectedNationalityOptions] = useState(
    []
  );

  const [ethnicity, setEthnicity] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [kidsEmail, setKidsEmail] = useState("");

  const [selectedProfessionsError, setSelectedProfessionsError] =
    useState(false);
  const [selectedCategoriesError, setSelectedCategoriesError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [adultsPreferedFirstNameError, setAdultsPreferedFirstNameError] =
    useState(false);
  const [adultsPreferedLastNameError, setAdultsPreferedLastNameError] =
    useState(false);
  const [adultsLegalFirstNameError, setAdultsLegalFirstNameError] =
    useState(false);
  const [adultsLegalLastNameError, setAdultsLegalLastNameError] =
    useState(false);
  const [adultsPhoneError, setAdultsPhoneError] = useState(false);
  const [adultsLocationError, setAdultsLocationError] = useState(false);
  const [kidsCityError, setKidsCityError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [maritalStatusError, setMaritalStatusError] = useState(false);
  const [nationalityError, setNationalityError] = useState(false);
  const [ethnicityError, setEthnicityError] = useState(false);
  const [languagesError, setLanguagesError] = useState(false);
  const [dateOfBirthError, setDobError] = useState(false);
  const [kidsEmailError, setKidsEmailError] = useState(false);

  useEffect(() => {
    getCountries();
    const storedUserId = localStorage.getItem("userId");

    setUserId(storedUserId);
  }, [userId]);

  const handleSelectedCountry = (event) => {
    setCountry(event?.value);
    getStates(event?.value);
    setCountryError(false);
  };
  const handleSelectedState = (state) => {
    setState(state?.label);
    getCities({
      countryName: country,
      stateName: state?.label,
    });
  };
  const handleSelectedCity = (state) => {
    setKidsCity(state?.label);
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

  const maritalStatusOptions = [
    "Single",
    "Married",
    "Divorced",
    "Widowed",
    "In a Relationship",
    "Engaged",
    "Prefer Not to Say",
  ];

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
    setDobError(false);
    // let dateString = e;
    // if (dateString) {
    //   let dateObject = new Date(dateString);
    //
    //
    //   if (dateObject) {
    //     let formattedDate = dateObject?.toISOString()?.split("T")[0];
    //
    //   }
    // }
    let dobDate = new Date(e);
    let today = new Date();
    let diff = today - dobDate;
    let ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    setAge(String(ageInYears));
  };

  const updateAdultSignup = async () => {
    setIsSubmitted(true);

    if (adultsLegalFirstName === "") {
      setAdultsLegalFirstNameError(true);
    }
    if (adultsLegalLastName === "") {
      setAdultsLegalLastNameError(true);
    }
    if (adultsPreferedFirstName === "") {
      setAdultsPreferedFirstNameError(true);
    }
    if (adultsPreferedLastName === "") {
      setAdultsPreferedLastNameError(true);
    }
    if (selectedProfessions.length === 0) {
      setSelectedProfessionsError(true);
    }
    if (selectedCategories.length === 0) {
      setSelectedCategoriesError(true);
    }
    if (gender === "") {
      setGenderError(true);
    }
    if (languages.length === 0) {
      setLanguagesError(true);
    }
    if (dateOfBirth === "") {
      setDobError(true);
    }
    if (adultsPhone === "") {
      setAdultsPhoneError(true);
    }
    if (kidsEmail === "") {
      setKidsEmailError(true);
    }
    if (country === "") {
      setCountryError(true);
    }
    if (address === "") {
      setAddressError(true);
    }
    if (age === "") {
      setAgeError(true);
    }
    if (completedJobs === "") {
      setJobsCompletedError(true);
    }
console.log("adultsPreferedFirstName",adultsPreferedFirstName)
// Check for public URL availability if the preferred first name has changed
let publicUrl = adultsPreferedFirstName.replace(/ /g, "-");

try {
  const checkNameResponse = await ApiHelper.post(API.publicUrlCheck, {
    preferredChildFirstname: adultsPreferedFirstName,
  });

  // If the name is taken, append a random number to make it unique
  if (checkNameResponse.data.status !== true) {
    publicUrl = `${publicUrl}-${Math.floor(Math.random() * 900) + 100}`;
  }

    let formData = {
      adultLegalFirstName: adultsLegalFirstName,
      adultLegalLastName: adultsLegalLastName,
      preferredChildFirstname: adultsPreferedFirstName,
      preferredChildLastName: adultsPreferedLastName,
      profession: selectedProfessions,
      relevantCategories: selectedCategories,
      childGender: gender,
      maritalStatus: maritalStatus,
      childNationality: nationality,
      childEthnicity: ethnicity,
      languages: languages,
      childDob: dateOfBirth,
      childPhone: adultsPhone,
      contactEmail: "",
      childLocation: address,
      parentCountry: country,
      parentState: state,
      parentAddress: address,
      childCity: kidsCity,
      age: age,
      noOfJobsCompleted: completedJobs,
      publicUrl: publicUrl, // Updated public URL after checking
     // publicUrl: adultsPreferedFirstName?.replace(/ /g, "-"),
    };

    if (
      adultsLegalFirstName !== "" &&
      adultsLegalLastName !== "" &&
      adultsPreferedFirstName !== "" &&
      adultsPreferedLastName !== "" &&
      selectedProfessions.length !== 0 &&
      selectedCategories.length != 0 &&
      selectedCategories.length <= 6 &&
      gender !== "" &&
      languages.length !== 0 &&
      dateOfBirth !== "" &&
      adultsPhone !== "" &&
      country !== "" &&
      address !== "" &&
      age !== "" &&
      completedJobs !== "" &&
      !mobileValidationError
    ) {
      let formData = {
        adultLegalFirstName: adultsLegalFirstName,
        adultLegalLastName: adultsLegalLastName,
        preferredChildFirstname: adultsPreferedFirstName,
        preferredChildLastName: adultsPreferedLastName,
        profession: selectedProfessions,
        relevantCategories: selectedCategories,
        childGender: gender,
        maritalStatus: maritalStatus,
        childNationality: nationality,
        childEthnicity: ethnicity,
        languages: languages,
        childDob: dateOfBirth,
        childPhone: adultsPhone,
        contactEmail: "",
        childLocation: address,
        parentCountry: country,
        parentState: state,
        parentAddress: address,
        childCity: kidsCity,
        age: age,
        noOfJobsCompleted: completedJobs,
        publicUrl:publicUrl//selectedPublicUrl,
      };

      if (userId) {
        await ApiHelper.post(`${API.updateAdults}${userId}`, formData)
          .then((resData) => {
            if (resData.data.status === true) {
              setIsLoading(false);
              setMessage("Updated Successfully!");
              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
                navigate(`/talent-signup-social-medias-details?${userId}`);
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
    } else {
      setMessage("Kindly complete all mandatory fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }
  } catch (err) {
    setIsLoading(false);
    setMessage("Error occurred, please try again.");
    setOpenPopUp(true);
    setTimeout(() => setOpenPopUp(false), 1000);
  }
  };

  const handleProfessionChange = (selectedOptions) => {
    // setSelectedProfessions(selectedOptions);
    // setProfessionError(false);

    if (selectedOptions.length > 5) {
      // setProfessionError(true);
      // Optionally show a message to the user
      setMessage("You may select a maximum of five skills");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 2000);
      return; // Prevent the state update
    } else {
      setSelectedProfessions(selectedOptions);
      setSelectedProfessionsError(false);
    }
  };
  const [professionError, setProfessionError] = useState(false);

  const handleDetailChange = (index, field, value) => {
    const updatedSelectedProfessions = [...selectedProfessions];
    updatedSelectedProfessions[index][field] = value;

    setSelectedProfessions(updatedSelectedProfessions);
    setProfessionError(false);
  };

  const chooseCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      if (selectedCategories.length < 6) {
        setSelectedCategories([...selectedCategories, category]);
        setSelectedCategoriesError(false);
      } else {
        // setCategoryError(true);
        setMessage("A maximum of six categories may be selected");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      if (selectedCategories.length === 0) {
        setSelectedCategoriesError(true);
      } else {
        setSelectedCategoriesError(false);
      }
    }
  }, [isSubmitted, selectedCategories]);

  const selectEthnicity = (event) => {
    setEthnicity(event.target.value);
  };
  const selectGender = (event) => {
    setGender(event.target.value);
    setGenderError(false);
  };
  const selectLanguage = (selectedOptions) => {
    setLanguagesError(false);
    if (!selectedOptions || selectedOptions.length === 0) {
      // Handle case when all options are cleared
      setLanguages([]); // Clear the languages state
      return;
    }

    // Extract values of all selected languages
    const selectedLanguages = selectedOptions.map((option) => option.value);
    setLanguages(selectedLanguages); // Update languages state with all selected languages
  };
  // const selectNationality = (event) => {
  //   setNationality(event.target.value);
  // };

  const selectNationality = (selectedOptions) => {
    if (!selectedOptions || selectedOptions.length === 0) {
      // Handle case when all options are cleared
      setNationality([]); // Clear the languages state
      setSelectedNationalityOptions([]);

      return;
    }
    // Extract values of all selected languages
    const selectedLanguages = selectedOptions.map((option) => option.value);

    setNationality(selectedLanguages); // Update languages state with all selected languages
    setSelectedNationalityOptions(selectedOptions);
    setNationalityError(false);
  };

  const selectMaritalStatus = (event) => {
    setMaritalStatus(event.target.value);
    setMaritalStatusError(false);
  };
  const handleKidsEmailChange = (e) => {
    const email = e.target.value;
    setKidsEmail(e.target.value);
    // Validate email using regex
    setIsValidEmail(emailRegex.test(email));
    setKidsEmailError(false);
  };
  const [mobileValidationError, setMobileValidationError] = useState(false);

  const handleMobileChange = (value, countryData) => {
    setAdultsPhone(value);
    setAdultsPhoneError(false);

    const isValid = isValidPhoneNumber(value);

    if (isValid) {
      setMobileValidationError(false);
    } else {
      setMobileValidationError(true);
    }
  };

  const [adultsLegalFirstNameLetterError, setAdultsLegalFirstNameLetterError] =
    useState(false);

  const adultsLegalFirstNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
      setAdultsLegalFirstNameLetterError(false);
      setAdultsLegalFirstName("");
    } else if (!onlyLettersRegex.test(value)) {
      setAdultsLegalFirstNameLetterError(true);
    } else {
      setAdultsLegalFirstName(value);
      setAdultsLegalFirstNameLetterError(false);
    }
  };

  const handleAdultLegalFirstNameKeyPress = (e) => {
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setAdultsLegalFirstNameLetterError(false);
    }
  };
  const [adultsLegalLastNameLetterError, setAdultsLegalLastNameLetterError] =
    useState(false);

  const adultsLegalLastNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
      setAdultsLegalLastNameLetterError(false);
      setAdultsLegalLastName("");
    } else if (!onlyLettersRegex.test(value)) {
      setAdultsLegalLastNameLetterError(true);
    } else {
      setAdultsLegalLastName(value);
      setAdultsLegalLastNameLetterError(false);
    }
  };

  const handleAdultLegalLastNameKeyPress = (e) => {
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setAdultsLegalLastNameLetterError(false);
    }
  };
  const [
    adultsPrefferedFirstNameLetterError,
    setAdultsPrefferedFirstNameLetterError,
  ] = useState(false);

  const adultsPrefferedFirstNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
      setAdultsPrefferedFirstNameLetterError(false);
      setAdultsPreferedFirstName("");
    } else if (!onlyLettersRegex.test(value)) {
      setAdultsPrefferedFirstNameLetterError(true);
    } else {
      setAdultsPreferedFirstName(value);
      setAdultsPrefferedFirstNameLetterError(false);
    }
  };

  const handleAdultPrefferedFirstNameKeyPress = (e) => {
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setAdultsPrefferedFirstNameLetterError(false);
    }
  };

  const [
    adultsPrefferedLastNameLetterError,
    setAdultsPrefferedLastNameLetterError,
  ] = useState(false);

  const adultsPrefferedLastNameChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only letters
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    if (value.trim() === "") {
      setAdultsPrefferedLastNameLetterError(false);
      setAdultsPreferedLastName("");
    } else if (!onlyLettersRegex.test(value)) {
      setAdultsPrefferedLastNameLetterError(true);
    } else {
      setAdultsPreferedLastName(value);
      setAdultsPrefferedLastNameLetterError(false);
    }
  };

  const handleAdultPrefferedLastNameKeyPress = (e) => {
    // If the Backspace key is pressed and the input value is empty, clear the error
    if (e.key === "Backspace") {
      setAdultsPrefferedLastNameLetterError(false);
    }
  };

  const deleteProfession = (profession, index) => {
    setSelectedProfessions((prevSelectedProfessions) =>
      prevSelectedProfessions.filter((item) => item.value !== profession.value)
    );
  };
  const [completedJobs, setCompletedJobs] = useState("");

  const handleJobsCompleted = (event) => {
    setCompletedJobs(event.target.value);
    setJobsCompletedError(false);
  };
  const [completedError, setJobsCompletedError] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.target.type === "number") {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  useEffect(() => {}, [maritalStatus]);

   // Sync preferred names into main name fields
   useEffect(() => {
    setPreferredChildFirstname(adultsPreferedFirstName);
  }, [adultsPreferedFirstName]);

  useEffect(() => {
    setPreferredChildLastName(adultsPreferedLastName);
  }, [adultsPreferedLastName]);


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
              <div className="step-text">Step 1 of 5</div>
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
                <div className="col-md-4 col-lg-3  mt-5">
                  <div className="fixImgs">
                    <img
                      src={adultsBanner}
                      className="kids-image-sticky"
                      alt="img"
                    />
                  </div>
                </div>
                <div className="adult-main remvSpc col-md-8 col-lg-9">
                  <div className="adults-form-title mt-3">
                    Complete your Profile
                  </div>{" "}
                  <div className="profession-section-cover">
                    <div className="row">
                      <div className="kids-form-section col-md-12 mb-3">
                        <label
                          style={{ fontWeight: "bold", fontSize: "small" }}
                          className="adults-titles kids-form-title mb-2"
                        >
                        Select your profession/skills (1 to 5, max 5) that showcase your talents, experience, and passion:
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

                          {selectedProfessionsError && (
                            <div className="invalid-fields">
                              Please choose Profession
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="profession-content-section">
                        {selectedProfessions.length > 0 && (
                          <>
                            <p className="set-rates">
                              *Set Your Rates in USD (Choose one or more rates
                              for each selected skill)
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
                                {" "}
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
                                          (value >= 1 || value === "")
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
                                          (value >= 1 || value === "")
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
                                  {/* <div className="mb-3 col-md-2 divSep">
                                    <input
                                      type="number"
                                      className="form-control profession-input"
                                      value={profession.perMonthSalary || ""}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        if (
                                          /^\d*\.?\d*$/.test(value) &&
                                          (value >= 0 || value === "")
                                        ) {
                                          handleDetailChange(
                                            index,
                                            "perMonthSalary",
                                            value
                                          );
                                        }
                                      }}
                                      placeholder="$/month"
                                      min="0"
                                    ></input>
                                  </div> */}
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
                                          value={
                                            profession.perImageSalary || ""
                                          }
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
                                </div>{" "}
                              </div>

                              <div className="offer-wrapper pt-0">
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
                  </div>
                  <div className="adults-titles kids-form-title mb-2">
                    <span style={{ fontWeight: "bold", fontSize: "small" }}>
                    Select job categories (1 to 6, max 6) that best reflect your skills, experiences, and interests for your portfolio and job notifications{" "}
                      <span className="mandatory">*</span>
                    </span>
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
                  {(selectedCategories?.length == 0 ||
                    selectedCategories?.length > 6) &&
                    selectedCategoriesError && (
                      <div className="invalid-fields">
                        Please select 1 to 6 categories relevant to your profile
                      </div>
                    )}
                  <div className="adults-titles kids-form-title mt-3">
                    <span>Personal Details</span>
                  </div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Legal First Name</label>{" "}
                      <span className="mandatory">*</span>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          adultsLegalFirstNameChange(e);
                          setAdultsLegalFirstNameError(false);
                        }}
                        onKeyDown={handleAdultLegalFirstNameKeyPress}
                        placeholder="Enter Legal First Name"
                        value={adultsLegalFirstName}
                      ></input>
                      {adultsLegalFirstNameError && (
                        <div className="invalid-fields">
                          Please enter Legal First Name
                        </div>
                      )}
                      {adultsLegalFirstNameLetterError && (
                        <div className="invalid-fields">
                          Only Letters Allowed
                        </div>
                      )}
                    </div>
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Legal Last name</label>{" "}
                      <span className="mandatory">*</span>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          adultsLegalLastNameChange(e);
                          setAdultsLegalLastNameError(false);
                        }}
                        onKeyDown={handleAdultLegalLastNameKeyPress}
                        placeholder="Enter Legal Last name"
                        value={adultsLegalLastName}
                      ></input>
                      {adultsLegalLastNameError && (
                        <div className="invalid-fields">
                          Please enter Legal Last Name
                        </div>
                      )}
                      {adultsLegalLastNameLetterError && (
                        <div className="invalid-fields">
                          Only Letters Allowed
                        </div>
                      )}
                    </div>
                  </div>
                  {/* added */}
                  <div className="kids-form-row row">
  {/* Preferred First Name */}
  <div className="kids-form-section col-md-6 mb-3">
    <label className="form-label">Preferred First Name</label>
    <span className="mandatory">*</span>
    <input
      type="text"
      className="form-control"
      onChange={(e) => {
        adultsPrefferedFirstNameChange(e);
        setAdultsPreferedFirstNameError(false);
      }}
      onKeyDown={handleAdultPrefferedFirstNameKeyPress}
      placeholder="Enter Preferred First Name"
      value={adultsPreferedFirstName}
    />
    {adultsPreferedFirstNameError && (
      <div className="invalid-fields">
        Please enter Preferred First Name
      </div>
    )}
    {adultsPrefferedFirstNameLetterError && (
      <div className="invalid-fields">Only Letters Allowed</div>
    )}
  </div>

  {/* Preferred Last Name */}
  <div className="kids-form-section col-md-6 mb-3">
    <label className="form-label">Preferred Last Name</label>
    <span className="mandatory">*</span>
    <input
      type="text"
      className="form-control"
      onChange={(e) => {
        adultsPrefferedLastNameChange(e);
        setAdultsPreferedLastNameError(false);
      }}
      onKeyDown={handleAdultPrefferedLastNameKeyPress}
      placeholder="Enter Preferred Last Name"
      value={adultsPreferedLastName}
    />
    {adultsPreferedLastNameError && (
      <div className="invalid-fields">
        Please enter Preferred Last Name
      </div>
    )}
    {adultsPrefferedLastNameLetterError && (
      <div className="invalid-fields">Only Letters Allowed</div>
    )}
  </div>
</div>

                  {/* addedd */}
                  {/* <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Preferred First Name</label>{" "}
                      <span className="mandatory">*</span>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          adultsPrefferedFirstNameChange(e);
                          setAdultsPreferedFirstNameError(false);
                        }}
                        onKeyDown={handleAdultPrefferedFirstNameKeyPress}
                        placeholder="Enter Preferred  First Name"
                        value={adultsPreferedFirstName}
                      ></input>
                      {adultsPreferedFirstNameError && (
                        <div className="invalid-fields">
                          Please enter Preferred First Name
                        </div>
                      )}
                      {adultsPrefferedFirstNameLetterError && (
                        <div className="invalid-fields">
                          Only Letters Allowed
                        </div>
                      )}
                    </div>
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Preferred Last name</label>{" "}
                      <span className="mandatory">*</span>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          adultsPrefferedLastNameChange(e);
                          setAdultsPreferedLastNameError(false);
                        }}
                        value={adultsPreferedLastName}
                        onKeyDown={handleAdultPrefferedLastNameKeyPress}
                        placeholder="Preferred  Legal Last name"
                      ></input>
                      {adultsPreferedLastNameError && (
                        <div className="invalid-fields">
                          Please enter Preferred Last Name
                        </div>
                      )}
                      {adultsPrefferedLastNameLetterError && (
                        <div className="invalid-fields">
                          Only Letters Allowed
                        </div>
                      )}
                    </div>
                  </div> */}
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Country</label>
                      <span className="mandatory">*</span>
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
                      {countryError && (
                        <div className="invalid-fields">
                          Please select Country
                        </div>
                      )}
                    </div>
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">State</label>
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
                    </div>
                  </div>
                  <div className="kids-form-row row">
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
                    <div className="kids-form-section col-md-6">
                      <label className="form-label">Phone</label>
                      <span className="mandatory">*</span>
                      {/* <input
                          type="number"
                          className="form-control"
                          minLength="15"
                          onChange={(e) => {
                            setAdultsPhone(e.target.value);
                            setAdultsPhoneError(false);
                          }}
                          placeholder="Enter Phone number"
                        ></input> */}
                      <MuiPhoneNumber
                        sx={{ "& svg": { height: "1em" } }}
                        countryCodeEditable={false}
                        defaultCountry={"kh"}
                        className="material-mobile-style"
                        onChange={handleMobileChange}
                        value={adultsPhone}
                      />
                      {adultsPhoneError && (
                        <div className="invalid-fields">
                          Please enter Phone Number
                        </div>
                      )}
                      {mobileValidationError && (
                        <div className="invalid-fields">
                          Please enter correct Mobile Number
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Gender</label>
                      <span className="mandatory">*</span>
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
                        <div className="invalid-fields">
                          Please select Gender
                        </div>
                      )}
                    </div>
                    <div className="kids-form-section col-md-6 mb-3 ">
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
                  </div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Ethnicity</label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={selectEthnicity}
                        value={ethnicity}
                      >
                        <option value="" disabled selected>
                          Select Ethnicity
                        </option>
                        {ethnicityOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Nationality</label>

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
                    </div>
                  </div>
                  <div className="kids-form-row row">
                    <div className="kids-form-section col-md-6">
                      <label className="form-label">Date of Birth</label>
                      <span className="mandatory">*</span>
                      <div className="mb-3">
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
                        {dateOfBirthError && (
                          <div className="invalid-fields">
                            Please select Date Of Birth
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Language</label>
                      <span className="mandatory">*</span>
                      <Select
                        isMulti
                        name="colors"
                        options={languagesList}
                        valueField="value"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(value) => selectLanguage(value)}
                        styles={customStyles}
                        value={selectedLanguageOptions}
                      />
                      {languagesError && (
                        <div className="invalid-fields">
                          Please select Language
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="kids-form-row row mb-5">
                    <div className="kids-form-section col-md-12 mb-3">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                      >
                        Address
                      </label>
                      <span className="mandatory">*</span>
                      <textarea
                        className="address-textarea"
                        style={{ width: "100%", height: "150px !important" }}
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
                          Please select Address
                        </div>
                      )}
                    </div>
                    {/* <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <span className="mandatory">*</span>
                      <input
                        type="email"
                        className={`form-control ${
                          isValidEmail ? "" : "is-invalid"
                        }`}
                        value={kidsEmail}
                        onChange={handleKidsEmailChange}
                        placeholder="Enter E-mail"
                      />
                      {!isValidEmail && (
                        <div className="invalid-feedback">
                          Please enter a valid email address.
                        </div>
                      )}
                      {kidsEmailError && (
                        <div className="invalid-fields">Please enter Email</div>
                      )}
                    </div> */}
                    <div className="kids-form-section col-md-6 mb-3">
                      <label className="form-label">
                        Projects Completed
                        <span className="mandatory">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
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
                          Please enter completed jobs
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <div className="adults-titles kids-form-title">
                    <span>Contact Details</span>
                  </div> */}
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
              className="step-continue"
              type="button"
              onClick={() => {
                updateAdultSignup();
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

export default AdultFormOne;
