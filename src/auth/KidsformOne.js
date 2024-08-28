import React, { useState, useEffect, useRef } from "react";
import "../assets/css/forms/kidsform-one.css";
import "../assets/css/forms/login.css";
import "../assets/css/dashboard.css";
import "../assets/css/register.css";
import Select from "react-select";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { ApiHelper } from "../helpers/ApiHelper";
import { useNavigate } from "react-router";
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useFieldDatas from "../config/useFieldDatas";
import { Tooltip } from "react-tooltip";
import {
  parsePhoneNumber,
  isValidPhoneNumber,
  getNumberType,
  validatePhoneNumberLength,
} from "libphonenumber-js";

const KidsformOne = () => {
  const {
    categoryList,
    professionList,
    gendersList,
    languagesList,
    nationalitiesList,
  } = useFieldDatas();

  const paramsValues = window.location.search;
  const urlParams = new URLSearchParams(paramsValues);
  const userId = urlParams.get("userId");
  const userEmail = urlParams.get("userEmail");
  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.png");
  const kidsImage = require("../assets/images/kidsImage.png");
  const [openPopUp, setOpenPopUp] = useState(false);
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
  const [nationalityError, setNationalityError] = useState(false);
  const [ethnicityError, setEthnicityError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [parentEmailError, setparentEmailError] = useState(false);
  const [completedError, setJobsCompletedError] = useState(false);
  const [talentPasswordError, settalentPasswordError] = useState(false);
  const [mobileValidationError, setMobileValidationError] = useState(false);

  const [talentConfirmPasswordError, settalentConfirmPasswordError] =
    useState(false);
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
  const [nationality, setNationality] = useState([]);
  const [ethnicity, setEthnicity] = useState("");
  const [languages, setLanguages] = useState([]);
  const [dateOfBirth, setDob] = useState("");
  const [aboutYou, setAboutYou] = useState([]);
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
      // zIndex: 1,
    }),
    menu: (provided, state) => ({
      ...provided,
      maxHeight: "500px",
      // zIndex: 1,
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  useEffect(() => {
    getCountries();
    if (userId) {
      getKidsData();
    }
  }, []);

  const handleDateChange = (e) => {
    setValue(e);
    setDob(e);
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

  const handleJobsCompleted = (event) => {
    setCompletedJobs(event.target.value);

    setJobsCompletedError(false);
  };

  const selectLanguage = (selectedOptions) => {
    setLanguageError(false);
    if (!selectedOptions || selectedOptions.length === 0) {
      setLanguages([]);
      return;
    }

    const selectedLanguages = selectedOptions.map((option) => option.value);
    setLanguages(selectedLanguages);
  };

  const selectNationality = (selectedOptions) => {
    if (!selectedOptions || selectedOptions.length === 0) {
      setNationality([]);
      setSelectedNationalityOptions([]);
      return;
    }
    const selectedLanguages = selectedOptions.map((option) => option.value);

    setNationality(selectedLanguages);
    setSelectedNationalityOptions(selectedOptions);
    setNationalityError(false);
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

  const chooseCategory = (category) => {
    console.log(category, "category selectedCategories");
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
    console.log(selectedCategories.length, "selectedCategories");

    if (selectedCategories.length < 4) {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
  };

  const deleteProfession = (profession, index) => {
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
    if (nationality.length === 0) {
      setNationalityError(true);
    }
    if (ethnicity === "") {
      setEthnicityError(true);
    }
    if (languages.length === 0) {
      setLanguageError(true);
    }
    if (dateOfBirth === "") {
      setDobError(true);
    }
    if (completedJobs === "") {
      setJobsCompletedError(true);
    }
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
      selectedCategories.length >= 3 &&
      selectedCategories.length <= 6 &&
      kidsPreferedFirstName !== "" &&
      nationality !== "" &&
      ethnicity !== "" &&
      languages.length !== 0 &&
      dateOfBirth !== "" &&
      passwordMatch === true &&
      completedJobs !== "" &&
      !mobileValidationError &&
      passwordStatus &&
      passwordMatch
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
        publicUrl: kidsPreferedFirstName.replace(/ /g, "-"),
      };
      setIsLoading(true);
      if (!userId) {
        await ApiHelper.post(API.kidsSignUp, formData)
          .then((resData) => {
            if (resData.data.status === true) {
              setIsLoading(false);
              setMessage("Registered Successfully");
              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
                navigate(`/talent-otp?${resData.data.data}`);
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
      } else if (userId) {
        await ApiHelper.post(`${API.editKids}${userId}`, formData)
          .then((resData) => {
            if (resData.data.status === true) {
              setIsLoading(false);
              setMessage("Updated SuccessFully!");
              setOpenPopUp(true);
              setTimeout(function () {
                setOpenPopUp(false);
                navigate(
                  `/talent-signup-plan-details?userId=${resData.data.data["user_id"]}&userEmail=${resData.data.data["email"]}`
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
      }
    } else {
      setMessage("Please Update All Required Fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }

    if (!passwordMatch) {
      setMessage("Please Update All Required Fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
    }
    if (!passwordStatus) {
      setMessage("Please strengthen your password");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 1000);
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
  const handleCondition = (e) => {
    if (e == "terms") {
      navigate("/terms-conditions");
    }
    if (e == "privacy") {
      navigate("/privacy-policy");
    }
    if (e == "community") {
      navigate("/community-guidelines");
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
    if (e.key === "Backspace") {
      setKidsLegalLastNameLetterError(false);
    }
  };

  const kidsPreferedFirstNameChange = (e) => {
    const value = e.target.value;
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
    if (e.key === "Backspace") {
      setKidsPrefferedFirstNameLetterError(false);
    }
  };
  const kidsPreferedLastNameChange = (e) => {
    const value = e.target.value;
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
    if (e.key === "Backspace") {
      setKidsPrefferedLastNameLetterError(false);
    }
  };

  const navigateTo = (option) => {
    let url = "";

    if (option === "terms") {
      url = "/terms-conditions";
    } else if (option === "community") {
      url = "/community-guidelines";
    } else if (option === "privacy") {
      url = "/privacy-policy";
    }

    if (url) {
      window.open(url, "_blank"); // Open in a new tab
    }
  };

  const [mobileNumError, setMobileNumError] = useState();

  const handleMobileChange = (value, countryData) => {
    setParentMobile(value);
    setParentMobileError(false);
    isValidPhoneNumber(value);
    console.log(value, "isValidPhoneNumber");
    if (isValidPhoneNumber(value)) {
      console.log(true, "isValidPhoneNumber");
      setMobileValidationError(false);
      setParentMobile(value);
    } else {
      setMobileValidationError(true);
      console.log(false, "isValidPhoneNumber");
    }
  };

  const [passwordStatus, setPasswordStatus] = useState(false);
  let line = document.querySelector(".line");
  let text = document.querySelector(".text");
  let password_strength_box = document.querySelector(".password_strength_box");
  let password = document.querySelector(".password");

  if (password && password_strength_box && line && text) {
    if (password.value.length == 0) {
      password_strength_box.style.display = "none";
    }

    password.oninput = function () {
      if (password.value.length == 0) {
        password_strength_box.style.display = "none";
      }
      if (password.value.length >= 1) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "5%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (password.value.length >= 2) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "10%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (password.value.length >= 3) {
        setPasswordStatus(false);
        password_strength_box.style.display = "flex";
        line.style.width = "20%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
      }
      if (password.value.length >= 4) {
        setPasswordStatus(false);

        password_strength_box.style.display = "flex";
        line.style.width = "35%";
        line.style.backgroundColor = "red";
        text.style.color = "red";
        text.innerHTML = "Weak";
        if (password.value.match(/[!@#$%^&*]/)) {
          setPasswordStatus(true);
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
        setPasswordStatus(false);

        password_strength_box.style.display = "flex";
        line.style.width = "50%";
        line.style.backgroundColor = "#e9ee30";
        text.style.color = "#e9ee30";
        text.innerHTML = "Medium";
      }
      if (password.value.length >= 6 && password.value.match(/[0-9]/)) {
        setPasswordStatus(false);

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
        setPasswordStatus(false);

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
        setPasswordStatus(true);

        password_strength_box.style.display = "flex";
        line.style.width = "100%";
        line.style.backgroundColor = "#2ccc2c";
        text.style.color = "#2ccc2c";
        text.innerHTML = "Strong";
      }
    };
  }

  useEffect(() => {
    console.log(selectedProfessions);
  }, [selectedProfessions]);

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
                <div className="kids-img col-md-4 col-lg-3 col-xl-3">
                  <div className="fixImgs">
                    <img src={kidsImage} alt="" className="kids-image-sticky" />
                  </div>
                </div>
                <div className="kids-form col-md-8 col-lg-9 col-xl-9">
                  <div className="kids-title">
                    Welcome to Kids & Teen Talent ( 4-17 years ) Registration
                    Form
                  </div>
                  <div className="kids-description">
                    Unleash your kid's inner star! ✨ Brands and Talent is your
                    gateway to exciting opportunities for young creators ( 4-17
                    )!  Imagine their talent shining on the big stage,
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
                            Please enter a valid E-mail address.
                          </div>
                        )}
                        {parentEmailError && (
                          <div className="invalid-fields">
                            Please enter E-mail
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
                          styles={customStylesProfession}
                        />
                        {parentCountryError && (
                          <div className="invalid-fields">
                            Please select Country
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
                          styles={customStylesProfession}
                        />
                        {stateError && (
                          <div className="invalid-fields">
                            Please select State
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
                          styles={customStylesProfession}
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

                        <MuiPhoneNumber
                          countryCodeEditable={false}
                          defaultCountry={"kh"}
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
                          style={{ width: "100%", height: "150px !important" }}
                          className="address-textarea"
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
                            Please enter Address
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
                            Profession / Skills (Choose any 1 to 5)
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
                              styles={customStylesProfession}
                              value={selectedProfessions}
                              menuPlacement="auto"
                              menuPortalTarget={document.body}
                              menuShouldScrollIntoView={false}
                            />
                            {professionError && (
                              <div className="invalid-fields">
                                Please choose Profession
                              </div>
                            )}
                          </div>
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
                            <div key={index} className="dynamic-profession newAlign">

                                <div className="algSepc"> <div className="row">
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

                                  <div className="mb-3 col-md-2 divSep">
                                    <input
                                      type="number"
                                      className="form-control profession-input"
                                      value={profession.perMonthSalary || ""}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        // Check if the value is a valid number and is non-negative
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
                                  </div>
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
                                  <div className="mb-3 col-md-2 divSepmb-3">
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
                                </div> </div>

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
                    <div className="kids-form-title-sub">
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
                      <div className="invalid-fields">
                        Please choose Categories
                      </div>
                    )} */}
                    {(selectedCategories?.length < 3 ||
                      selectedCategories?.length > 6) &&
                      categoryError && (
                        <div className="invalid-fields">
                          Please select 3 to 6 categories relevant to your
                          profile
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
                            Please enter Preferred First Name
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
                          Preferred Last Name
                        </label>
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
                          {gendersList?.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {genderError && (
                          <div className="invalid-fields">
                            Please select Gender
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
                          options={languagesList}
                          valueField="value"
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(value) => selectLanguage(value)}
                          styles={customStylesProfession}
                          menuPlacement="auto"
                          menuPortalTarget={document.body}
                          menuShouldScrollIntoView={false}
                        />
                        {languageError && (
                          <div className="invalid-fields">
                            Please select Language
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
                    </div>
                    <div className="kids-form-row row mb-1">
                      <div className="kids-form-section col-md-6 mb-3">
                        <label className="form-label">
                          Date of Birth <span className="mandatory">*</span>
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            value={value}
                            onChange={(newValue) => {
                              handleDateChange(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            disableFuture
                          />
                        </LocalizationProvider>

                        {dobError && (
                          <div className="invalid-fields">
                            Please select Date of Birth
                          </div>
                        )}
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

                    <div className="kids-signup-terms mb-5">
                      By registering you confirm that you accept the Brands &
                      Talent (BT){" "}
                      <span
                        onClick={() => navigateTo("terms")}
                        style={{ color: "#c2114b", cursor: "pointer" }}
                      >
                        Terms & Conditions
                      </span>
                      ,{" "}
                      <span
                        style={{ color: "#c2114b", cursor: "pointer" }}
                        onClick={() => navigateTo("privacy")}
                      >
                        Privacy Policy
                      </span>{" "}
                      and{" "}
                      <span
                        style={{ color: "#c2114b", cursor: "pointer" }}
                        onClick={() => navigateTo("community")}
                      >
                        Community Guidelines
                      </span>
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
