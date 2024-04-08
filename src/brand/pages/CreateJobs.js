import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.scss";
import "../../assets/css/createjobs.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";
import Select from "react-select";
import Axios from "axios";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import ReactFlagsSelect from "react-flags-select";
import { useNavigate } from "react-router";
import nationalityOptions from "../../components/nationalities";
import languageOptions from "../../components/languages";
import currencyList from "../../components/currency";
import compensationType from "../../components/compensationType";

const CreateJobs = ({ onButtonClick }) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // This line is necessary for Chrome
      return ""; // This line is necessary for Firefox
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const paramsValues = window.location.search;
  const urlParams = new URLSearchParams(paramsValues);
  const userId = urlParams.get("userId");
  const userEmail = urlParams.get("userEmail");
  const navigate = useNavigate();
  const docsIcon = require("../../assets/icons/docsIcon.png");
  const greenTickCircle = require("../../assets/icons/small-green-tick.png");
  const uploadIcon = require("../../assets/icons/uploadIcon.png");
  const imageType = require("../../assets/icons/imageType.png");
  const videoType = require("../../assets/icons/videoType.png");
  const audiotype = require("../../assets/icons/audiotype.png");
  const idCard = require("../../assets/icons/id-card.png");
  const elipsis = require("../../assets/icons/elipsis.png");
  const btLogo = require("../../assets/icons/Group 56.png");
  const kidsImage = require("../../assets/images/kidsImage.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const [editorStateJobDescription, setEditorStateJobDescription] = useState(
    EditorState.createEmpty()
  );
  const [editorStateJobRequirements, setEditorStateJobRequirements] = useState(
    EditorState.createEmpty()
  );
  const [editorStateWhyWorkWithUs, setEditorStateWhyWorkWithUs] = useState(
    EditorState.createEmpty()
  );
  const [
    editorStateClientDescription,
    setEditorStateClientDescription,
  ] = useState(EditorState.createEmpty());
  const [showError, setShowError] = useState(false);
  const [kidsFillData, setKidsFillData] = useState(null);
  const [jobTitleError, setjobTitleError] = useState(false);
  const [streetAddressError, setstreetAddressError] = useState(false);
  const [parentCountryError, setParentCountryError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [professionError, setProfessionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [preferedNameError, setPreferedNameError] = useState(false);
  const [jobTypeError, setjobTypeError] = useState(false);
  const [nationalityError, setNationalityError] = useState(false);
  const [ethnicityError, setEthnicityError] = useState(false);
  const [ageRangeError, setAgeRangeError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [parentLastNameError, setparentLastNameError] = useState(false);
  const [zipCodeError, setzipCodeError] = useState(false);
  const [talentPasswordError, settalentPasswordError] = useState(false);
  const [talentConfirmPasswordError, settalentConfirmPasswordError] = useState(
    false
  );
  const [kidsLegalFirstNameError, setkidsLegalFirstNameError] = useState(false);
  const [kidsLegalLastNameError, setkidsLegalLastNameError] = useState(false);
  const [workPlaceTypeError, setworkPlaceTypeError] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [jobTitle, setjobTitle] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [parentLastName, setParentLastName] = useState("");
  const [zipCode, setzipCode] = useState("");
  const [streetAddress, setstreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [kidsPreferedFirstName, setKidsPreferedFirstName] = useState("");
  const [kidsPreferedLastName, setKidsPreferedLastName] = useState("");
  const [kidsLegalFirstName, setKidsLegalFirstName] = useState("");
  const [kidsLegalLastName, setKidsLegalLastName] = useState("");
  const [kidsCity, setKidsCity] = useState("");
  const [workPlaceType, setworkPlaceType] = useState("");
  const [jobType, setjobType] = useState("");
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");
  const [nationality, setNationality] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [languages, setLanguages] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [profession, setProfession] = useState([]);
  const [jobDescription, setJobDescription] = useState([]);
  const [jobRequirements, setJobRequirements] = useState([]);
  const [whyWorkWithUs, setWhyWorkWithUs] = useState([]);
  const [clientDescription, setClientDescription] = useState([]);
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
  const [portofolioFile, setPortofolioFile] = useState([]);

  const [selectedApplyOption, setSelectedApplyOption] = useState("easy-apply");
  const [hiringCompany, setHiringCompany] = useState("");

  const handleApplyOption = (e) => {
    console.log(e.target.value, "e.target.value");
    setSelectedApplyOption(e.target.value);
  };

  const [selectedOption, setSelectedOption] = useState("Paid collaboration");
  const [type, setType] = useState("");
  const [currency, setCurrency] = useState("");
  const [productName, setProductName] = useState("");
  const [valueUSD, setValueUSD] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleValueUSDChange = (event) => {
    setValueUSD(event.target.value);
  };

  const handleCompensationSubmit = () => {
    let data = {};
    switch (selectedOption) {
      case "Paid collaboration":
        data = {
          "Paid collaboration": {
            type,
            currency,
          },
        };
        break;
      case "Product/ gift":
        data = {
          "Product/ gift": {
            "Product Name": productName,
            "Value (USD)": valueUSD,
          },
        };
        break;
      case "Paid collaboration + Gift":
        data = {
          "Paid collaboration + Gift": {
            type,
            currency,
            "Product Name": productName,
            "Value (USD)": valueUSD,
          },
        };
        break;
      default:
        break;
    }
    return data;
    console.log(data);
    // Here you can make your API call with the 'data' object
  };

  const [showQuestions, setShowQuestions] = useState(false);
  const [questions, setQuestions] = useState([""]);

  const handleCheckboxChange = () => {
    setShowQuestions(!showQuestions);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
    setTimeout(() => {
      const newQuestionIndex = questions.length;
      const input = document.getElementById(`question${newQuestionIndex}`);
      if (input) {
        input.focus();
      }
    }, 100);
  };

  const benefitsList = [
    { id: "dental", name: "Dental Insurance" },
    { id: "life", name: "Life Insurance" },
    { id: "medical", name: "Medical Insurance" },
    { id: "pto", name: "Paid Time Off" },
    { id: "retirement", name: "Retirement" },
    { id: "vision", name: "Vision Insurance" },
    { id: "none", name: "None of these above" },
  ];

  const [selectedBenefits, setSelectedBenefits] = useState([]);

  useEffect(() => {
    // Set "Dental Insurance" as initially selected
    setSelectedBenefits(["Dental Insurance"]);
  }, []);

  const handleBenefits = (e) => {
    const { value } = e.target;
    const isSelected = selectedBenefits.includes(value);

    if (isSelected) {
      setSelectedBenefits(
        selectedBenefits.filter((benefit) => benefit !== value)
      );
    } else {
      setSelectedBenefits([...selectedBenefits, value]);
    }
  };

  const jobTypeOptions = [
    "Full-Time",
    "Part-Time",
    "Per Diem",
    "Contractor",
    "Temporary",
    "Other",
  ];

  const workPlaceTypesOptions = [
    "Man",
    "Woman",
    "Non binary",
    "TransworkPlaceType Woman",
    "TransworkPlaceType Man",
    "AworkPlaceType",
    "Other",
    "Prefer not to say",
  ];

  const ageList = ["18-21", "22-26", "26-35", "36-45", "46-51"];

  const payTypeList = ["Pay Range ", "Exact Pay Amount"];

  const companyList = ["Company Name 1", "Company Name 2", "Company Name 3"];

  useEffect(() => {
    getCountries();
    if (userId) {
      getKidsData();
    }
  }, []);

  useEffect(() => {}, [updateDisabled]);

  // Function to handle date picker change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value; // Assuming your date picker provides the selected date
    setDob(selectedDate); // Set the DOB in state
    // Calculate age
    const dobDate = new Date(selectedDate);
    const today = new Date();
    const diff = today - dobDate;
    const ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365)); // Calculating age in years
    setAge(String(ageInYears)); // Set the age in state
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // Function to handle email input change
  const handleEmailChange = (e) => {
    setzipCodeError(false);
    const email = e.target.value;
    setzipCode(e.target.value);
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
  const selectworkPlaceType = (event) => {
    setworkPlaceType(event.target.value);
    setworkPlaceTypeError(false);
  };
  const selectLanguage = (event) => {
    setLanguages(event.target.value);
    setLanguageError(false);
  };
  const selectNationality = (event) => {
    setNationality(event.target.value);
    setNationalityError(false);
  };
  const selectGender = (event) => {
    setGender(event.target.value);
    setGenderError(false);
  };
  const selectAge = (event) => {
    setAgeRange(event.target.value);
    setAgeRangeError(false);
  };
  const selectjobType = (event) => {
    setjobType(event.target.value);
    setjobTypeError(false);
  };
  const selectHiringCompany = (event) => {
    setHiringCompany(event.target.value);
    // setjobTypeError(false);
  };

  const onEditorJobDescription = (editorState) => {
    console.log(editorState, "editorState");
    setJobDescription([
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    ]);
    setEditorStateJobDescription(editorState);
  };
  const onEditorRequirements = (editorState) => {
    console.log(editorState, "editorState");
    setJobRequirements([
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    ]);
    setEditorStateJobRequirements(editorState);
  };
  const onEditorWhyWorkWithUS = (editorState) => {
    console.log(editorState, "editorState");
    setWhyWorkWithUs([
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    ]);
    setEditorStateWhyWorkWithUs(editorState);
  };
  const onEditorClientDescription = (editorState) => {
    console.log(editorState, "editorState");
    setClientDescription([
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    ]);
    setEditorStateClientDescription(editorState);
  };

  const handleProfessionChange = (selectedOptions) => {
    setSelectedProfessions(selectedOptions);
    setProfessionError(false);
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
          setjobTitle(resData?.data?.data?.jobTitle);
          setParentLastName(resData?.data?.data?.parentLastName);
          setzipCode(resData?.data?.data?.zipCode);
          setstreetAddress(resData?.data?.data?.streetAddressNo);
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
          setworkPlaceType(resData?.data?.data?.childworkPlaceType);
          setLanguages(resData?.data?.data?.languages);
          setNationality(resData?.data?.data?.childNationality);
          setjobType(resData?.data?.data?.jobType);
          setEthnicity(resData?.data?.data?.childEthnicity);
          // setKidsEmail(resData?.data?.data?.childEmail);
          // setKidsPhone(resData?.data?.data?.childPhone);
          // setKidsLocation(resData?.data?.data?.childLocation);
          setKidsCity(resData?.data?.data?.childCity);
          setSelectedCategories([
            ...selectedCategories,
            ...resData.data.data?.relevantCategories,
          ]);
          // setAboutYou(resData.data.data?.childAboutYou);
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

  const createGigs = async () => {
    onButtonClick({
      jobId: "66100a6ce451e6c6782921b3",
      condition: "preview",
    });
    if (jobTitle === "") {
      setjobTitleError(true);
    }
    if (zipCode === "") {
      setzipCodeError(true);
    }
    if (workPlaceType === "") {
      setworkPlaceTypeError(true);
    }
    if (streetAddress === "") {
      setstreetAddressError(true);
    }
    if (selectedProfessions.length === 0) {
      setProfessionError(true);
    }
    if (nationality === "") {
      setNationalityError(true);
    }
    if (languages === "") {
      setLanguageError(true);
    }
    if (ageRange === "") {
      setAgeRangeError(true);
    }
    if (jobType === "") {
      setjobTypeError(true);
    }
    if (gender === "") {
      setGenderError(true);
    }
    if (
      jobTitle !== "" &&
      zipCode !== "" &&
      workPlaceType !== "" &&
      streetAddress !== "" &&
      jobType !== ""
    ) {
    }

    const formData = {
      jobTitle: jobTitle,
      jobLocation: zipCode,
      streetAddress: streetAddress,
      workplaceType: workPlaceType,
      jobType: jobType,
      jobDescription: jobDescription,
      skills: skills,
      additionalRequirements: jobRequirements,
      age: ageRange,
      gender: gender,
      nationality: nationality,
      languages: languages,
      questions: questions,
      benefits: selectedBenefits,
      compensation: handleCompensationSubmit(),
      jobCurrency: currency,
      paymentType: paymentOptionValue(),
      hiringCompany: hiringCompany,
      whyWorkWithUs: whyWorkWithUs,
      hiringCompanyDescription: clientDescription,
      howLikeToApply: selectedApplyOption,
      workSamples: portofolioFile,
      jobImage: profileFile,
    };
    console.log(formData, "CREATEJOB_PAYLOAD");
    setIsLoading(true);
    // await ApiHelper.post(API.draftJob, formData)
    //   .then((resData) => {
    //     console.log(resData.data.data._id, "draftedData");
    //     if (resData.data.status === true) {
    //       setIsLoading(false);
    //       setMessage("Job Created SuccessFully!");
    //       setOpenPopUp(true);
    //       setTimeout(function() {
    //         setOpenPopUp(false);
    //         onButtonClick({
    //           jobId: "66100a6ce451e6c6782921b3",
    //           condition: "preview",
    //         });
    //         // navigate(`/preview-job?${resData?.data?.data?._id}`);
    //       }, 1000);
    //     } else if (resData.data.status === false) {
    //       setIsLoading(false);
    //       setMessage(resData.data.message);
    //       setOpenPopUp(true);
    //       setTimeout(function() {
    //         setOpenPopUp(false);
    //       }, 1000);
    //     }
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //   });
  };

  const handlePortofolioDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log(droppedFiles[0], "droppedFiles");
    uploadFile(droppedFiles[0]);
    // setFiles(droppedFiles);
  };

  const uploadFile = async (fileData) => {
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
        let fileObj = {
          id: resData.data.data.fileId,
          title: fileData.name,
          fileData: resData.data.data.filename,
          type: resData?.data?.data?.filetype,
        };
        setPortofolioFile((prevFiles) => [...prevFiles, fileObj]);
        console.log(portofolioFile, "portofolioFile");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const handlePortofolioDragOver = (e) => {
    e.preventDefault();
  };

  const handlePortofolioDelete = (index) => {
    setPortofolioFile((prevImages) => {
      // Create a copy of the previous state
      const updatedImages = [...prevImages];
      // Remove the image at the specified index
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };
  const handleView = (imageUrl) => {
    let viewImage = `${API.userFilePath}${imageUrl?.fileData}`;
    window.open(viewImage, "_blank");
  };

  const [showOptions, setShowOptions] = useState(false);

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

  const portofolioUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      console.log(fileData, "fileData");
      uploadFile(fileData);
    }
  };
  const [profileFile, setProfileFile] = useState(null);

  const handleProfileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log(droppedFiles[0], "droppedFiles");
    uploadFile(droppedFiles[0]);
    // setFiles(droppedFiles);
  };

  // Function to handle deleting image
  const handleProfileDelete = () => {
    setProfileFile(null);
  };

  const profileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      console.log(fileData, "fileData");
      uploadProfile(fileData);
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
        setMessage(resData.data.message);
        let fileObj = {
          id: resData.data.data.fileId,
          title: fileData.name,
          fileData: resData.data.data.filename,
          type: resData?.data?.data?.filetype,
        };
        console.log(fileObj, "fileObj profileFile");
        setProfileFile(fileObj);

        console.log(profileFile, "profileFile");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {
        setLoader(false);
      });
  };

  const handleProfileDragOver = (e) => {
    e.preventDefault();
  };

  const [selectedPaymentOption, setSelectedPaymentOption] = useState("fixed");
  const [amount, setAmount] = useState("");
  const [minPay, setMinPay] = useState("");
  const [maxPay, setMaxPay] = useState("");

  const handlePaymentOptionChange = (event) => {
    setSelectedPaymentOption(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMinPayChange = (event) => {
    setMinPay(event.target.value);
  };

  const handleMaxPayChange = (event) => {
    setMaxPay(event.target.value);
  };

  const paymentOptionValue = () => {
    console.log("paymentOptionValue");
    if (selectedPaymentOption === "fixed") {
      const data = {
        fixedAmount: {
          amount: amount,
        },
      };
      return data;

      // Perform API call with data
      console.log(data);
    } else {
      const data = {
        rangeOfAmounts: {
          minPay: minPay,
          maxPay: maxPay,
        },
      };
      console.log(data, "datapaymentType");
      // Perform API call with data
      return data;
      console.log(data);
    }
  };

  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addSkill();
    }
  };

  const addSkill = () => {
    if (inputValue.trim() !== "") {
      setSkills([...skills, inputValue]);
      setInputValue("");
    }
  };

  const removeSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  return (
    <>
      <>
        <div className="dialog-body ">
          <div className="kidsform-one w-100 p-2">
            <div className="kids-main">
              <div className="kids-form-row">
                <div className="w-100">
                  <div className="mb-4">
                    <label className="form-label">
                      Gig/Job Title
                      <span className="mandatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={jobTitle}
                      onChange={(e) => {
                        setjobTitle(e.target.value);
                        setjobTitleError(false);
                      }}
                      placeholder="Enter Title"
                    ></input>
                    {jobTitleError && (
                      <div className="invalid-fields">
                        Please enter job Title
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="kids-form-row">
                <div className="kids-form-section">
                  <div className="mb-4">
                    <label className="form-label">
                      Job Location (Zip Code)
                      <span className="mandatory">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      maxLength={6}
                      onChange={(e) => {
                        setzipCode(e.target.value);
                        setzipCodeError(false);
                      }}
                      placeholder="Enter Zipcode"
                      value={zipCode}
                    />
                    {zipCodeError && (
                      <div className="invalid-fields">
                        Please enter Zip Code.
                      </div>
                    )}
                  </div>
                </div>
                <div className="kids-form-section">
                  <div className="mb-4">
                    <label className="form-label">
                      Street Address <span className="mandatory">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={streetAddress}
                      onChange={(e) => {
                        setstreetAddress(e.target.value);
                        setstreetAddressError(false);
                      }}
                      placeholder="Street Address"
                    ></input>
                    {streetAddressError && (
                      <div className="invalid-fields">
                        Please enter Street Address
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="kids-form-row">
                <div className="kids-form-section">
                  <div className="mb-4">
                    <label className="form-label">
                      Work Place Type <span className="mandatory">*</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectworkPlaceType}
                      value={workPlaceType}
                    >
                      <option value="" disabled selected>
                        Select Work Place Type
                      </option>
                      <option value="onsite" defaultValue>
                        On Site
                      </option>
                      <option value="remote">Remote</option>
                    </select>
                    {workPlaceTypeError && (
                      <div className="invalid-fields">
                        Please Select Work Place Type
                      </div>
                    )}
                  </div>
                </div>
                <div className="kids-form-section">
                  <div className="mb-4">
                    <label className="form-label">
                      Job Type <span className="mandatory">*</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectjobType}
                      value={jobType}
                    >
                      <option value="" disabled selected>
                        Select Job Type
                      </option>
                      {jobTypeOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {jobTypeError && (
                      <div className="invalid-fields">
                        Please Select Job Type
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="rich-editor mb-4">
                <label className="form-label">Gig/Job Description</label>
                <Editor
                  editorState={editorStateJobDescription}
                  editorStyle={{ overflow: "hidden" }}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorJobDescription}
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

              <div className="mb-4">
                <label className="form-label pay-info">
                  Profession/Skills (optional)
                  <span className="mandatory">*</span>
                </label>

                <div className="mb-3">
                  <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback"></span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search For Skills"
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>

                <div className="skills-section">
                  {skills.map((skill, index) => (
                    <div className="skills-wrapper" key={index}>
                      <div className="skill-text"> {skill}</div>
                      <i class="bi bi-x" onClick={() => removeSkill(index)}></i>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rich-editor mb-4">
                <label className="form-label">
                  Additional RequireMents (Optional)
                </label>
                <Editor
                  editorState={editorStateJobRequirements}
                  editorStyle={{ overflow: "hidden" }}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorRequirements}
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

              <div className="kids-form-row">
                <div className="kids-form-section">
                  <div className="mb-4">
                    <label className="form-label">
                      Age <span className="mandatory">*</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectAge}
                      value={ageRange}
                    >
                      <option value="" disabled selected>
                        Select Age
                      </option>
                      {ageList.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {ageRangeError && (
                      <div className="invalid-fields">Please Select Age</div>
                    )}
                  </div>
                </div>
                <div className="kids-form-section">
                  <div className="mb-4">
                    <label className="form-label">
                      Gender <span className="mandatory">*</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectGender}
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
                </div>
              </div>
              <div className="kids-form-row mb-2">
                <div className="kids-form-section">
                  <div className="mb-4">
                    <label className="form-label">
                      Nationality <span className="mandatory">*</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectNationality}
                      value={nationality}
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
                <div className="kids-form-section">
                  <div className="mb-4">
                    <label className="form-label">
                      Language <span className="mandatory">*</span>
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={selectLanguage}
                      value={languages}
                    >
                      <option value="" disabled selected>
                        Select Language
                      </option>
                      {languageOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {languageError && (
                      <div className="invalid-fields">
                        Please Select Language
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <label className="screening-questions-label mb-4">
                  <input
                    type="checkbox"
                    className="screening-checkbox profession-checkbox"
                    onChange={handleCheckboxChange}
                  />
                  Add Screening Questions (optional)
                </label>

                {showQuestions && (
                  <div className="kids-form-section">
                    {questions.map((question, index) => (
                      <div className="mb-4" key={index}>
                        <label className="form-label ">{`Question ${index +
                          1}:`}</label>
                        <input
                          type="text"
                          className="form-control "
                          placeholder={`Enter Question ${index + 1}`}
                          value={question}
                          id={`question${index + 1}`}
                          onChange={(event) =>
                            handleQuestionChange(index, event)
                          }
                        />
                      </div>
                    ))}
                    <div
                      className="add-more-questions "
                      onClick={handleAddQuestion}
                    >
                      <i class="bi bi-plus-square-fill"></i>

                      <div className="add-more-questions-text"> Add More</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-2">
                <div className="kids-form-section">
                  <div className="mb-4">
                    <label className="form-label">
                      Benefits <span className="mandatory">*</span>
                    </label>
                    <div className="benefits-wrapper">
                      {benefitsList.map((benefit, index) => (
                        <label
                          className="screening-questions-label"
                          key={index}
                          htmlFor={benefit.id}
                        >
                          <input
                            type="checkbox"
                            className="screening-checkbox profession-checkbox"
                            id={benefit.id}
                            value={benefit.name}
                            checked={selectedBenefits.includes(benefit.name)}
                            onChange={handleBenefits}
                          />
                          {benefit.name}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <div className="kids-form-section">
                  <div className="mb-3">
                    <label className="form-label">
                      Compensation <span className="mandatory">*</span>
                    </label>
                    <div className="compensation-radios mb-2">
                      <label className="compensation-labels">
                        <input
                          className="screening-checkbox profession-checkbox"
                          type="radio"
                          value="Paid collaboration"
                          checked={selectedOption === "Paid collaboration"}
                          onChange={handleOptionChange}
                        />
                        Paid collaboration
                      </label>
                      <label className="compensation-labels">
                        <input
                          className="screening-checkbox profession-checkbox"
                          type="radio"
                          value="Product/ gift"
                          checked={selectedOption === "Product/ gift"}
                          onChange={handleOptionChange}
                        />
                        Product/ gift
                      </label>
                      <label className="compensation-labels">
                        <input
                          className="screening-checkbox profession-checkbox"
                          type="radio"
                          value="Paid collaboration + Gift"
                          checked={
                            selectedOption === "Paid collaboration + Gift"
                          }
                          onChange={handleOptionChange}
                        />
                        Paid collaboration + Gift
                      </label>
                    </div>
                    <div className="mt-3">
                      {selectedOption === "Paid collaboration" && (
                        <div className="kids-form-row">
                          <div className="kids-form-section">
                            <div className="mb-4">
                              <label className="form-label">Type</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={handleTypeChange}
                                value={type}
                              >
                                <option value="" disabled selected>
                                  Select Type
                                </option>
                                {compensationType.map((option, index) => (
                                  <option key={index} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="kids-form-section">
                            <div className="mb-4">
                              <label className="form-label">Currency</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                value={currency}
                                onChange={handleCurrencyChange}
                              >
                                <option value="" disabled selected>
                                  Select Currency
                                </option>
                                {currencyList.map((option, index) => (
                                  <option key={index} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedOption === "Product/ gift" && (
                        <div className="kids-form-row">
                          <div className="kids-form-section">
                            <div className="mb-4">
                              <label className="form-label">Product</label>

                              <input
                                type="text"
                                className="form-control"
                                value={productName}
                                onChange={handleProductNameChange}
                                placeholder="Enter Product Name"
                              ></input>
                            </div>
                          </div>
                          <div className="kids-form-section">
                            <div className="mb-4">
                              <label className="form-label">
                                What is the value of the product (USD)
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                value={valueUSD}
                                onChange={handleValueUSDChange}
                                placeholder="Enter Value"
                              ></input>
                            </div>
                          </div>
                        </div>
                      )}
                      {selectedOption === "Paid collaboration + Gift" && (
                        <>
                          <div className="kids-form-row">
                            <div className="kids-form-section">
                              <div className="mb-4">
                                <label className="form-label">Type</label>
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  onChange={handleTypeChange}
                                  value={type}
                                >
                                  <option value="" disabled selected>
                                    Select Type
                                  </option>
                                  {compensationType.map((option, index) => (
                                    <option key={index} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="kids-form-section">
                              <div className="mb-4">
                                <label className="form-label">Currency</label>
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  value={currency}
                                  onChange={handleCurrencyChange}
                                >
                                  <option value="" disabled selected>
                                    Select Currency
                                  </option>
                                  {currencyList.map((option, index) => (
                                    <option key={index} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-row">
                            <div className="kids-form-section">
                              <div className="mb-4">
                                <label className="form-label">Product</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={productName}
                                  onChange={handleProductNameChange}
                                  placeholder="Enter Product Name"
                                ></input>
                              </div>
                            </div>
                            <div className="kids-form-section">
                              <div className="mb-4">
                                <label className="form-label">
                                  What is the value of the product (USD)
                                </label>

                                <input
                                  type="text"
                                  className="form-control"
                                  value={valueUSD}
                                  onChange={handleValueUSDChange}
                                  placeholder="Enter Value"
                                ></input>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <div className="kids-form-section">
                  <div className="mb-4">
                    <label className="compensation-labels form-label">
                      Payment type <span className="mandatory">*</span>
                    </label>
                    <div className="compensation-radios mb-2">
                      <input
                        type="radio"
                        className="screening-checkbox profession-checkbox"
                        value="fixed"
                        checked={selectedPaymentOption === "fixed"}
                        onChange={handlePaymentOptionChange}
                        id="fixed_amount"
                      />
                      <label
                        htmlFor="fixed_amount"
                        className="compensation-labels"
                      >
                        Fixed Amount
                      </label>
                      <input
                        className="screening-checkbox profession-checkbox"
                        type="radio"
                        value="range"
                        checked={selectedPaymentOption === "range"}
                        onChange={handlePaymentOptionChange}
                        id="range_amount"
                      />
                      <label
                        className="compensation-labels"
                        htmlFor="range_amount"
                      >
                        Range of Amounts
                      </label>
                    </div>
                    <div>
                      {selectedPaymentOption === "fixed" && (
                        <div style={{ width: "49%" }}>
                          <label>Amount:</label>
                          <input
                            className="form-control"
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                          />
                        </div>
                      )}

                      {selectedPaymentOption === "range" && (
                        <div className="kids-form-row">
                          <div className="kids-form-section">
                            <div className="mb-4">
                              <label className="form-label">Min Pay</label>
                              <input
                                type="text"
                                className="form-control"
                                value={minPay}
                                onChange={handleMinPayChange}
                                placeholder="Enter Min Pay"
                              ></input>
                            </div>
                          </div>
                          <div className="kids-form-section">
                            <div className="mb-4">
                              <label className="form-label">Max Pay</label>
                              <input
                                type="text"
                                className="form-control"
                                value={maxPay}
                                onChange={handleMaxPayChange}
                                placeholder="Enter Max Pay"
                              ></input>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="kids-form-section">
                <div className="mb-4">
                  <label className="form-label">Hiring Company/Client</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={selectHiringCompany}
                    value={hiringCompany}
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    {companyList.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="rich-editor mb-4">
                <label className="form-label">Why Work With Us</label>
                <Editor
                  editorState={editorStateWhyWorkWithUs}
                  editorStyle={{ overflow: "hidden" }}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorWhyWorkWithUS}
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
              <div className="rich-editor mb-4">
                <label className="form-label">
                  Hiring Company/Client Description
                </label>
                <Editor
                  editorState={editorStateClientDescription}
                  editorStyle={{ overflow: "hidden" }}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorClientDescription}
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

              <div className="kids-form-section">
                <div className="mb-4">
                  <label className="form-label">
                    How You would like to recieve Application{" "}
                  </label>
                  <div className="application-condition-wrapper">
                    <div className="application-condition-radios">
                      <input
                        type="radio"
                        id="easy_apply"
                        name="applyGroup"
                        className="screening-checkbox profession-checkbox"
                        value="easy-apply"
                        checked={selectedApplyOption == "easy-apply"}
                        onChange={handleApplyOption}
                      />
                      <label
                        className="compensation-labels form-label"
                        htmlFor="easy_apply"
                      >
                        Easy Apply
                      </label>
                    </div>
                    <div className="easy-apply-description">
                      (Easy apply option makes it easier for applications to
                      share thier profile and apply with a one click. Select
                      "Easy Apply" If you would like to receive and manage
                      applications directly through your dashboard on this
                      plaform.)
                    </div>
                  </div>
                  <div className="application-condition-wrapper">
                    <div className="application-condition-radios">
                      <input
                        type="radio"
                        id="how_apply"
                        name="applyGroup"
                        className="screening-checkbox profession-checkbox"
                        value="how_to_apply"
                        onChange={handleApplyOption}
                      />
                      <label
                        className="compensation-labels form-label"
                        htmlFor="how_apply"
                      >
                        How to apply
                      </label>
                    </div>
                    <div className="easy-apply-description">
                      (If you would like to receive and manage applications
                      outside this plaform, type the application instructions
                      below)
                    </div>
                    <div className="how-to-apply-steps">
                      <div>
                        1. To submit your application, kindly email your
                        portfolio
                      </div>
                      <div>
                        2. Applicants will be considered on a rolling basis.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="cv-section"
                onDrop={handlePortofolioDrop}
                onDragOver={handlePortofolioDragOver}
              >
                <label className="upload-backdrop" htmlFor="portofolio">
                  <img src={uploadIcon} alt="" />
                </label>
                <input
                  type="file"
                  className="select-cv-input"
                  id="portofolio"
                  accept="image/*"
                  multiple
                  onChange={portofolioUpload}
                />
                <div className="upload-text">
                  Attach a project brief [optional]
                </div>
                <div className="upload-info">
                  Drag and drop your photos/work samples here.
                </div>
              </div>

              {portofolioFile && (
                <>
                  {portofolioFile.map((item, index) => {
                    return (
                      <>
                        <div key={index} className="uploaded-file-wrapper">
                          <div className="file-section">
                            {item.type === "image" && (
                              <div className="fileType">
                                <img src={imageType} alt="" />
                              </div>
                            )}
                            {item.type === "audio" && (
                              <div className="fileType">
                                <img src={audiotype} alt="" />
                              </div>
                            )}
                            {item.type === "video" && (
                              <div className="fileType">
                                <img src={videoType} alt="" />
                              </div>
                            )}
                            {item.type === "document" && (
                              <div className="fileType">
                                <img src={docsIcon} alt="" />
                              </div>
                            )}
                            <div className="fileName">{item.title}</div>
                          </div>
                          <div className="file-options">
                            <div className="sucess-tick">
                              <img src={greenTickCircle} alt="" />
                            </div>
                            <div className="option-menu">
                              <div className="dropdown">
                                <img
                                  onClick={() => setShowOptions(!showOptions)}
                                  src={elipsis}
                                  alt=""
                                  className="dropdown-toggle elipsis-icon"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                />
                                <ul
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      onClick={() => handleView(item)}
                                      id="view"
                                    >
                                      View
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      onClick={() =>
                                        handlePortofolioDelete(item)
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

              <div
                className="cv-section"
                onDrop={handleProfileDrop}
                onDragOver={handleProfileDragOver}
              >
                <label className="upload-backdrop" htmlFor="profile-image">
                  <img src={uploadIcon} alt="" />
                </label>
                <input
                  type="file"
                  className="select-cv-input"
                  id="profile-image"
                  accept="image/*"
                  onChange={profileUpload}
                />
                <div className="upload-text">
                  Upload a Image For your Gig/Job
                </div>
                <div className="upload-info">Drag and drop your File here.</div>
              </div>
              {profileFile && (
                <>
                  <div className="uploaded-file-wrapper">
                    <div className="file-section">
                      {profileFile.type === "image" && (
                        <div className="fileType">
                          <img src={imageType} alt="" />
                        </div>
                      )}
                      <div className="fileName">{profileFile.title}</div>
                    </div>
                    <div className="file-options">
                      <div className="sucess-tick">
                        <img src={greenTickCircle} alt="" />
                      </div>
                      <div className="option-menu">
                        <div className="dropdown">
                          <img
                            onClick={() => setShowOptions(!showOptions)}
                            src={elipsis}
                            alt=""
                            className="dropdown-toggle elipsis-icon"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          />
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={() => handleView(profileFile)}
                                id="view"
                              >
                                View
                              </a>
                            </li>
                            <li>
                              <a
                                className="dropdown-item"
                                onClick={() => handleProfileDelete(profileFile)}
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
              )}

              <div className="job-post-terms">
                By clicking Save & Post Now, I agree that Brands&talent may
                publish and/or distribute my job advertisement on its site and
                through its distribution partners.
              </div>

              <div className="create-job-buttons my-4">
                <div
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Save Draft
                </div>
                <div
                  className="createjob-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    createGigs();
                  }}
                >
                  Preview & Post
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default CreateJobs;
