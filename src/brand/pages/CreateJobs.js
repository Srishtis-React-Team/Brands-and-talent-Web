import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.scss";
import "../../assets/css/createjobs.scss";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { convertToRaw, ContentState, convertFromHTML } from "draft-js";
import Select from "react-select";
import Axios from "axios";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import ReactFlagsSelect from "react-flags-select";
import { useNavigate } from "react-router";
import nationalitiesArray from "../../components/NationalitiesArray";
import languageOptions from "../../components/languages";
import currencyList from "../../components/currency";
import compensationType from "../../components/compensationType";
import BrandHeader from "./BrandHeader";
import BrandSideMenu from "./BrandSideMenu";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, parseISO } from "date-fns";
import { FlashOnTwoTone } from "@mui/icons-material";

const CreateJobs = () => {
  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "50px", // Reset the minHeight to avoid clipping
    }),
    menu: (provided, state) => ({
      ...provided,
      maxHeight: "500px", // Adjust the maxHeight as per your requirement
      zIndex: 9999, // Ensure menu appears above other elements
    }),
  };

  const location = useLocation();
  let { editData } = location.state || {};

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
  const btLogo = require("../../assets/images/LOGO.jpg");
  const kidsImage = require("../../assets/images/kidsImage.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const [jobTitleError, setjobTitleError] = useState(false);
  const [jobTitle, setjobTitle] = useState("");
  const [message, setMessage] = useState("");
  const [allJobsList, setAllJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedJobID, setSelectedJobID] = useState(null);
  const [editJobData, setEditJobData] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [brandImage, setBrandImage] = useState(null);
  const [jobCountNumber, setJobCountNumber] = useState(null);
  const [brandData, setBrandData] = useState(null);
  const [minPay, setMinPay] = useState(null);
  const [maxPay, setMaxPay] = useState(null);
  const [instaMin, setInstaMin] = useState(null);
  const [instaMax, setInstaMax] = useState(null);
  const [tikTokMin, setTiktokMin] = useState(null);
  const [tikTokMax, setTiktokMax] = useState(null);
  const [linkedInMin, setLinkedInMin] = useState(null);
  const [linkedInMax, setLinkedInMax] = useState(null);
  const [fbMin, setFbMin] = useState(null);
  const [fbMax, setFbMax] = useState(null);
  const [twitterMin, setTwitterMin] = useState(null);
  const [twitterMax, setTwitterMax] = useState(null);
  const [youTubeMin, setYouTubeMin] = useState(null);
  const [youTubeMax, setYouTubeMax] = useState(null);
  const [employmentType, setEmploymentType] = useState(null);
  const [employmentError, setEmploymentError] = useState(null);
  const companyList = [];
  const [selectedLanguageOptions, setSelectedLanguageOptions] = useState([]);
  const [selectedGenderOptions, setSelectedGenderOptions] = useState([]);
  const [selectedNationalityOptions, setSelectedNationalityOptions] = useState(
    []
  );

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            console.log(resData.data.data, "resData.data.data");
            setBrandData(resData.data.data);
            companyList.push(resData.data.data?.brandName);
            console.log(companyList, "companyList");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    console.log(editData, "editData");
    if (editData?.value && editData?.type) {
      getJobsByID(editData?.value, editData?.type);
    }
  }, [editData]);

  const updateJobFormDatas = (editData) => {
    // alert("updateJobFormDatas");
    console.log(editData, "editDataupdateJobFormDatas");
    if (editData) {
      setjobTitle(editData?.jobTitle);
      setAgeRange(editData?.age);
      setzipCode(editData?.jobLocation);
      setstreetAddress(editData?.streetAddress);
      setjobType(editData?.jobType);
      setGender(editData?.gender);
      // setNationality(editData?.nationality);
      const selectedOptions = editData?.languages.map((language) => {
        return languageOptions.find((option) => option.label === language);
      });
      setSelectedLanguageOptions(selectedOptions);

      const nationalityOptions = editData?.nationality.map((language) => {
        return nationalityOptions.find((option) => option.label === language);
      });
      setSelectedNationalityOptions(nationalityOptions);

      const genderUpdatedOptions = editData?.gender.map((gender) => {
        return genderUpdatedOptions.find((option) => option.label === gender);
      });
      setSelectedGenderOptions(genderUpdatedOptions);

      const dynamicKey = Object.keys(editData.compensation)[0];
      const minPayValue = editData.compensation[dynamicKey].minPay;
      setMinPay(minPayValue);

      const maxPaydynamicKey = Object.keys(editData.compensation)[0];
      const maxPayValue = editData.compensation[maxPaydynamicKey].maxPay;
      setMaxPay(maxPayValue);

      const currencydynamicKey = Object.keys(editData.compensation)[0];
      const currencyValue = editData.compensation[currencydynamicKey].currency;
      setCurrency(currencyValue);

      const frequencydynamicKey = Object.keys(editData.compensation)[0];
      const frequencyValue =
        editData.compensation[frequencydynamicKey].frequency;
      setfrequency(frequencyValue);

      setWhyWorkWithUs(editData?.whyWorkWithUs);
      setSelectedApplyOption(editData?.selectedApplyOption);
      setHiringCompany(editData?.hiringCompany);
      setSkills(editData?.skills);
      setMinAge(editData?.minAge);
      setMaxAge(editData?.maxAge);
      setSelectedBenefits(editData?.benefits);
      setSelectedApplyOption(editData?.howLikeToApply);
      setPortofolioFile(editData?.workSamples);
      setJobCurrency(editData?.jobCurrency);
      setLastdateApply(editData?.lastDateForApply);
      setCategory(editData?.category);
      setInstaMin(editData?.instaMin);
      setInstaMax(editData?.instaMax);
      setTiktokMin(editData?.tikTokMin);
      setTiktokMax(editData?.tikTokMax);
      setLinkedInMin(editData?.linkedInMin);
      setLinkedInMax(editData?.linkedInMax);
      setFbMin(editData?.fbMin);
      setFbMax(editData?.fbMax);
      setTwitterMin(editData?.twitterMin);
      setTwitterMax(editData?.twitterMax);
      setYouTubeMin(editData?.youTubeMin);
      setYouTubeMax(editData?.youTubeMax);
      setCountry(editData.country);
      setState(editData.state);
      getStates(editData.country);
      setKidsCity(editData.city);
      getCities({
        countryName: editData.country,
        stateName: editData.state,
      });
      setEmploymentType(editData?.employmentType);
      if (editData?.questions && editData?.questions?.length > 0) {
        setShowQuestions(true);
        setQuestions(editData?.questions);
      }

      if (
        editData?.compensation.hasOwnProperty("paid_collaboration_and_gift")
      ) {
        setCompensationChange("paid_collaboration_and_gift");
        setType(editData?.compensation?.paid_collaboration_and_gift?.type);
        setCurrency(
          editData?.compensation?.paid_collaboration_and_gift?.currency
        );
        setProductName(
          editData?.compensation?.paid_collaboration_and_gift?.product_name
        );
        setValueUSD(
          editData?.compensation?.paid_collaboration_and_gift?.amount_value
        );
      } else if (editData?.compensation.hasOwnProperty("paid_collaboration")) {
        setCompensationChange("paid_collaboration");
        setType(editData?.compensation?.paid_collaboration?.type);
        setCurrency(editData?.compensation?.paid_collaboration?.currency);
      } else if (editData?.compensation.hasOwnProperty("product_gift")) {
        setCompensationChange("product_gift");
        setProductName(editData?.compensation?.product_gift?.product_name);
        setValueUSD(editData?.compensation?.product_gift?.amount_value);
      }
      if (editData?.paymentType?.label === "range") {
        setSelectedPaymentOption("range");
        setMinPay(editData?.paymentType?.minPay);
        setMaxPay(editData?.paymentType?.maxPay);
      } else if (editData?.paymentType?.label === "fixed") {
        setSelectedPaymentOption("fixed");
        setAmount(editData?.paymentType?.amount);
      }
      const jobDescriptionhtmlContent = editData?.jobDescription[0];
      const jobDescriptionContentBlocks = convertFromHTML(
        jobDescriptionhtmlContent
      );
      const jobDescriptionContentState = ContentState.createFromBlockArray(
        jobDescriptionContentBlocks
      );
      const updateJobDescription = EditorState.createWithContent(
        jobDescriptionContentState
      );
      setEditorStateJobDescription(updateJobDescription);
      setJobDescription(editData?.jobDescription);
      const whyWorkWithUsContent = editData?.whyWorkWithUs[0];
      const whyWorkWithUsContentBlocks = convertFromHTML(whyWorkWithUsContent);
      const whyWorkWithUsContentState = ContentState.createFromBlockArray(
        whyWorkWithUsContentBlocks
      );
      const updatewhyWorkWithUs = EditorState.createWithContent(
        whyWorkWithUsContentState
      );
      setEditorStateWhyWorkWithUs(updatewhyWorkWithUs);
      setWhyWorkWithUs(editData?.whyWorkWithUs);

      const hiringCompanyDescriptionContent =
        editData?.hiringCompanyDescription[0];
      const hiringCompanyDescriptionContentBlocks = convertFromHTML(
        hiringCompanyDescriptionContent
      );
      const hiringCompanyDescriptionContentState = ContentState.createFromBlockArray(
        hiringCompanyDescriptionContentBlocks
      );
      const hiringCompanyDescription = EditorState.createWithContent(
        hiringCompanyDescriptionContentState
      );
      setEditorStateClientDescription(hiringCompanyDescription);
      setClientDescription(editData?.hiringCompanyDescription);

      const howToApplyDescriptionContent = editData?.howToApplyDescription[0];
      const howToApplyDescriptionContentBlocks = convertFromHTML(
        howToApplyDescriptionContent
      );
      const howToApplyDescriptionContentState = ContentState.createFromBlockArray(
        howToApplyDescriptionContentBlocks
      );
      const howToApplyDescription = EditorState.createWithContent(
        howToApplyDescriptionContentState
      );
      setEditorStateHowToApply(howToApplyDescription);
      setHowToApplyDescription(editData?.howToApplyDescription);
    }
  };

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    console.log(e, "selectedJobID");
    setSelectedJobID(e?.value);
    getJobsByID(e?.value, e?.type);
  };

  const getJobsByID = async (jobId, type) => {
    if (type == "Posted") {
      await ApiHelper.get(`${API.getAnyJobById}${jobId}`)
        .then((resData) => {
          console.log(resData, "getEditJobsData");
          if (resData.data.status === true) {
            if (resData.data.data) {
              setEditJobData(resData.data.data, "resData.data.data");
              updateJobFormDatas(resData.data.data);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (type == "Draft") {
      await ApiHelper.get(`${API.getAnyJobById}${jobId}`)
        .then((resData) => {
          console.log(resData.data.data, "getJobsList");
          if (resData.data.status === true) {
            if (resData.data.data) {
              setEditJobData(resData.data.data, "resData.data.data");
              updateJobFormDatas(resData.data.data);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    console.log(editJobData, "editJobData");
  }, [editJobData]);

  const duplicateJob = () => {
    console.log(editJobData, "editJobData duplicateJob");
    if (editJobData) {
      setSelectedTab("create-job");
      setjobTitle(editJobData?.jobTitle);
      setAgeRange(editJobData?.age);
      setzipCode(editJobData?.jobLocation);
      setstreetAddress(editJobData?.streetAddress);
      setjobType(editJobData?.jobType);
      setGender(editJobData?.gender);
      // setNationality(editJobData?.nationality);
      setLastdateApply(editJobData?.lastDateForApply);
      setWhyWorkWithUs(editJobData?.whyWorkWithUs);
      setSelectedApplyOption(editJobData?.selectedApplyOption);
      setHiringCompany(editJobData?.hiringCompany);
      setSkills(editJobData?.skills);
      setSelectedBenefits(editJobData?.benefits);
      setSelectedApplyOption(editJobData?.howLikeToApply);
      setPortofolioFile(editJobData?.workSamples);
      setCategory(editJobData?.category);
      setMinAge(editJobData?.minAge);
      setMaxAge(editJobData?.maxAge);
      setJobCurrency(jobCurrency);
      setInstaMin(editJobData?.instaMin);
      setInstaMax(editJobData?.instaMax);
      setTiktokMin(editJobData?.tikTokMin);
      setTiktokMax(editJobData?.tikTokMax);
      setLinkedInMin(editJobData?.linkedInMin);
      setLinkedInMax(editJobData?.linkedInMax);
      setFbMin(editJobData?.fbMin);
      setFbMax(editJobData?.fbMax);
      setTwitterMin(editJobData?.twitterMin);
      setTwitterMax(editJobData?.twitterMax);
      setYouTubeMin(editData?.youTubeMin);
      setYouTubeMax(editData?.youTubeMax);
      setCountry(editJobData?.country);
      setState(editJobData?.state);
      getStates(editJobData?.country);
      setKidsCity(editJobData?.city);
      getCities({
        countryName: editJobData?.country,
        stateName: editJobData?.state,
      });
      setEmploymentType(editJobData?.employmentType);
      const selectedOptions = editJobData?.languages.map((language) => {
        return languageOptions.find((option) => option.label === language);
      });
      setSelectedLanguageOptions(selectedOptions);

      const nationalityOptions = editData?.nationality.map((language) => {
        return nationalityOptions.find((option) => option.label === language);
      });
      setSelectedNationalityOptions(nationalityOptions);

      const genderUpdatedOptions = editData?.gender.map((gender) => {
        return genderUpdatedOptions.find((option) => option.label === gender);
      });
      setSelectedGenderOptions(genderUpdatedOptions);

      if (editJobData?.questions && editJobData?.questions?.length > 0) {
        setShowQuestions(true);
        setQuestions(editJobData?.questions);
      }

      if (
        editJobData?.compensation.hasOwnProperty("paid_collaboration_and_gift")
      ) {
        setCompensationChange("paid_collaboration_and_gift");
        setType(editJobData?.compensation?.paid_collaboration_and_gift?.type);
        setCurrency(
          editJobData?.compensation?.paid_collaboration_and_gift?.currency
        );
        setProductName(
          editJobData?.compensation?.paid_collaboration_and_gift?.product_name
        );
        setValueUSD(
          editJobData?.compensation?.paid_collaboration_and_gift?.amount_value
        );
      } else if (
        editJobData?.compensation.hasOwnProperty("paid_collaboration")
      ) {
        setCompensationChange("paid_collaboration");
        setType(editJobData?.compensation?.paid_collaboration?.type);
        setCurrency(editJobData?.compensation?.paid_collaboration?.currency);
      } else if (editJobData?.compensation.hasOwnProperty("product_gift")) {
        setCompensationChange("product_gift");
        setProductName(editJobData?.compensation?.product_gift?.product_name);
        setValueUSD(editJobData?.compensation?.product_gift?.amount_value);
      }
      if (editJobData?.paymentType?.label === "range") {
        setSelectedPaymentOption("range");
        setMinPay(editJobData?.paymentType?.minPay);
        setMaxPay(editJobData?.paymentType?.maxPay);
      } else if (editJobData?.paymentType?.label === "fixed") {
        setSelectedPaymentOption("fixed");
        setAmount(editJobData?.paymentType?.amount);
      }
      if (
        editJobData?.jobDescription &&
        editJobData?.jobDescription.length > 0
      ) {
        const jobDescriptionhtmlContent = editJobData?.jobDescription[0];
        const jobDescriptionContentBlocks = convertFromHTML(
          jobDescriptionhtmlContent
        );
        const jobDescriptionContentState = ContentState.createFromBlockArray(
          jobDescriptionContentBlocks
        );
        const updateJobDescription = EditorState.createWithContent(
          jobDescriptionContentState
        );
        setEditorStateJobDescription(updateJobDescription);
        setJobDescription(editJobData?.jobDescription);
      }

      if (
        editJobData?.additionalRequirements &&
        editJobData?.additionalRequirements.length > 0
      ) {
        const jobRequirementshtmlContent =
          editJobData?.additionalRequirements[0];
        const jobRequirementsContentBlocks = convertFromHTML(
          jobRequirementshtmlContent
        );
        const jobRequirementsContentState = ContentState.createFromBlockArray(
          jobRequirementsContentBlocks
        );
        const updatejobRequirements = EditorState.createWithContent(
          jobRequirementsContentState
        );
        setEditorStateJobRequirements(updatejobRequirements);
        setJobRequirements(editJobData?.additionalRequirements);
      }
      if (editJobData?.whyWorkWithUs && editJobData?.whyWorkWithUs.length > 0) {
        const whyWorkWithUsContent = editJobData?.whyWorkWithUs[0];
        const whyWorkWithUsContentBlocks = convertFromHTML(
          whyWorkWithUsContent
        );
        const whyWorkWithUsContentState = ContentState.createFromBlockArray(
          whyWorkWithUsContentBlocks
        );
        const updatewhyWorkWithUs = EditorState.createWithContent(
          whyWorkWithUsContentState
        );
        setEditorStateWhyWorkWithUs(updatewhyWorkWithUs);
        setWhyWorkWithUs(editJobData?.whyWorkWithUs);
      }
      if (
        editJobData?.hiringCompanyDescription &&
        editJobData?.hiringCompanyDescription.length > 0
      ) {
        const hiringCompanyDescriptionContent =
          editJobData?.hiringCompanyDescription[0];
        const hiringCompanyDescriptionContentBlocks = convertFromHTML(
          hiringCompanyDescriptionContent
        );
        const hiringCompanyDescriptionContentState = ContentState.createFromBlockArray(
          hiringCompanyDescriptionContentBlocks
        );
        const hiringCompanyDescription = EditorState.createWithContent(
          hiringCompanyDescriptionContentState
        );
        setEditorStateClientDescription(hiringCompanyDescription);
        setClientDescription(editJobData?.hiringCompanyDescription);

        const howToApplyDescriptionContent = editData?.howToApplyDescription[0];
        const howToApplyDescriptionContentBlocks = convertFromHTML(
          howToApplyDescriptionContent
        );
        const howToApplyDescriptionContentState = ContentState.createFromBlockArray(
          howToApplyDescriptionContentBlocks
        );
        const howToApplyDescription = EditorState.createWithContent(
          howToApplyDescriptionContentState
        );
        setEditorStateHowToApply(howToApplyDescription);
        setHowToApplyDescription(editData?.howToApplyDescription);
      }
    }
  };

  useEffect(() => {
    // const howToApplyDescriptionContent = initialHowToApply;
    // const howToApplyDescriptionContentBlocks = convertFromHTML(
    //   howToApplyDescriptionContent
    // );
    // const howToApplyDescriptionContentState = ContentState.createFromBlockArray(
    //   howToApplyDescriptionContentBlocks
    // );
    // const howToApplyDescription = EditorState.createWithContent(
    //   howToApplyDescriptionContentState
    // );
    // setEditorStateHowToApply(howToApplyDescription);
    // setHowToApplyDescription(initialHowToApply);
    let initialHowToApply = [
      `<p>Interested candidates should submit their resume and a link that contains portfolio from Brands and Talent website to <a href="mailto:${brandData?.brandEmail}">${brandData?.brandEmail}</a>. Please include ${jobTitle} in the subject line.</p>\n`,
    ];

    const whyWorkWithUsContent = initialHowToApply[0];
    const whyWorkWithUsContentBlocks = convertFromHTML(whyWorkWithUsContent);
    const whyWorkWithUsContentState = ContentState.createFromBlockArray(
      whyWorkWithUsContentBlocks
    );
    const updatewhyWorkWithUs = EditorState.createWithContent(
      whyWorkWithUsContentState
    );
    setEditorStateHowToApply(updatewhyWorkWithUs);
    setHowToApplyDescription(editJobData?.whyWorkWithUs);
  }, []);

  const getAllJobs = async (id) => {
    await ApiHelper.get(`${API.getAllJobs}${id}`)
      .then((resData) => {
        console.log(resData.data.data, "getJobsList");
        if (resData.data.status === true) {
          if (resData.data.data) {
            setAllJobsList(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
    setBrandImage(localStorage.getItem("currentUserImage"));
    console.log(brandId, "brandId");
    console.log(brandImage, "brandImage");
    if (brandId && brandId != null) {
      getAllJobs(brandId);
      getBrand();
    }
  }, [brandId, brandImage]);

  const [showSidebar, setShowSidebar] = useState(true);

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

  const [editorStateHowToApply, setEditorStateHowToApply] = useState(
    EditorState.createEmpty()
  );
  const [showError, setShowError] = useState(false);
  const [kidsFillData, setKidsFillData] = useState(null);
  const [parentCountryError, setParentCountryError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [professionError, setProfessionError] = useState(false);
  const [preferedNameError, setPreferedNameError] = useState(false);
  const [jobTypeError, setjobTypeError] = useState(false);
  const [jobCurrencyError, setJobCurrencyError] = useState(false);
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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProfessions, setSelectedProfessions] = useState([]);
  const [ageRange, setAgeRange] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [minAgeError, setMinAgeError] = useState("");
  const [maxAgeError, setMaxAgeError] = useState("");
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
  const [jobType, setjobType] = useState("");
  const [gender, setGender] = useState([]);
  const [genderError, setGenderError] = useState("");
  const [nationality, setNationality] = useState([]);
  const [ethnicity, setEthnicity] = useState("");
  const [languages, setLanguages] = useState([]);
  const [dateOfBirth, setDob] = useState("");
  const [profession, setProfession] = useState([]);
  const [jobDescription, setJobDescription] = useState([]);
  const [jobRequirements, setJobRequirements] = useState([]);
  const [whyWorkWithUs, setWhyWorkWithUs] = useState([]);
  const [clientDescription, setClientDescription] = useState([]);
  const [howToApplyDescription, setHowToApplyDescription] = useState([]);
  const [relevantCategories, setRelevantCategories] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [talentPassword, setTalentPassword] = useState("");
  const [talentConfirmPassword, setTalentConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [age, setAge] = useState("");
  const [portofolioFile, setPortofolioFile] = useState([]);
  const [jobCurrency, setJobCurrency] = useState("");
  const [selectedApplyOption, setSelectedApplyOption] = useState("easy-apply");
  const [hiringCompany, setHiringCompany] = useState("");
  const [dobError, setDobError] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);

  const handleApplyOption = (e) => {
    console.log(e.target.value, "e.target.value");
    setSelectedApplyOption(e.target.value);
  };

  const [selectedOption, setCompensationChange] = useState(
    "paid_collaboration"
  );
  const [type, setType] = useState("");
  const [currency, setCurrency] = useState("");
  const [productCurrency, setProductCurrency] = useState("");
  const [frequency, setfrequency] = useState("");
  const [productFrequency, setProductFrequency] = useState("");
  const [productName, setProductName] = useState("");
  const [valueUSD, setValueUSD] = useState("");
  const [exactPay, setExactPay] = useState("");
  const [productValue, setProductValue] = useState("");

  const compensationChange = (event) => {
    console.log(event.target.value, "compensationChange");
    setCompensationChange(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleProductCurrencyChange = (event) => {
    setProductCurrency(event.target.value);
  };
  const handleProductFrequencyChange = (event) => {
    setProductFrequency(event.target.value);
  };
  const handleProductValueChange = (event) => {
    setProductValue(event.target.value);
  };
  const onMinPayChange = (event) => {
    setMinPay(event.target.value);
  };
  const onExactPayChange = (event) => {
    setExactPay(event.target.value);
  };
  const onMaxPayChange = (event) => {
    setMaxPay(event.target.value);
  };

  const handleFrequencyChange = (event) => {
    setfrequency(event.target.value);
  };

  const selectJobCurrency = (event) => {
    setJobCurrency(event.target.value);
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
      case "paid_collaboration":
        data = {
          paid_collaboration: {
            type: type,
            minPay: minPay,
            maxPay: maxPay,
            currency: currency,
            frequency: frequency,
            exactPay: exactPay,
          },
        };
        break;
      case "product_gift":
        data = {
          product_gift: {
            product_name: productName,
            currency: currency,
            frequency: frequency,
            productValue: productValue,
          },
        };
        break;
      case "paid_collaboration_and_gift":
        data = {
          paid_collaboration_and_gift: {
            type: type,
            product_name: productName,
            minPay: minPay,
            maxPay: maxPay,
            currency: currency,
            frequency: frequency,
            productCurrency: productCurrency,
            productFrequency: productCurrency,
            productValue: productValue,
            exactPay: exactPay,
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

  // const handleBenefits = (e) => {
  //   const { value } = e.target;
  //   const isSelected = selectedBenefits.includes(value);

  //   if (isSelected) {
  //     setSelectedBenefits(
  //       selectedBenefits.filter((benefit) => benefit !== value)
  //     );
  //   } else {
  //     setSelectedBenefits([...selectedBenefits, value]);
  //   }
  // };

  const handleBenefits = (e) => {
    const { value } = e.target;

    if (value === "None of these above") {
      setSelectedBenefits(["None of these above"]);
    } else {
      // Toggle selection for other options
      if (selectedBenefits.includes("None of these above")) {
        setSelectedBenefits([value]);
      } else {
        const isSelected = selectedBenefits.includes(value);
        if (isSelected) {
          setSelectedBenefits(
            selectedBenefits.filter((benefit) => benefit !== value)
          );
        } else {
          setSelectedBenefits([...selectedBenefits, value]);
        }
      }
    }
  };

  const jobTypeOptions = [
    "Full Time",
    "Part Time",
    "Per Diem",
    "Contractor",
    "Temporary",
    "Other",
  ];

  const frequencyOptions = [
    "Hourly",
    "Daily",
    "Weekly",
    "Monthly",
    "Annually",
    "Per Assignment",
  ];

  const ageList = ["4-17", "18+"];

  const payTypeList = ["Pay Range ", "Exact Pay Amount"];

  useEffect(() => {
    getCountries();
    if (userId) {
      getKidsData();
    }
  }, []);

  useEffect(() => {}, [updateDisabled]);

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

  // const selectLanguage = (event) => {
  //   console.log(event, "selectLanguage");
  //   if (event[0].value) {
  //     setLanguages(event[0].value);
  //     setLanguageError(false);
  //   }
  // };

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
  };

  // const selectGender = (event) => {
  //   setGender(event.target.value);
  //   setGenderError(false);
  // };

  const selectGender = (selectedOptions) => {
    console.log(selectedOptions, "selectedOptions selectedLanguages");
    setGenderError(false);
    if (!selectedOptions || selectedOptions.length === 0) {
      // Handle case when all options are cleared
      setGender([]); // Clear the languages state
      setSelectedGenderOptions([]);

      return;
    }
    // Extract values of all selected languages
    const selectedLanguages = selectedOptions.map((option) => option.value);
    console.log(selectedLanguages, "selectedLanguages");
    setGender(selectedLanguages); // Update languages state with all selected languages
    setSelectedGenderOptions(selectedOptions);
  };

  const selectCategory = (event) => {
    setCategory(event.target.value);
    setCategoryError(false);
  };

  const selectAge = (event) => {
    setAgeRange(event.target.value);
    setAgeRangeError(false);
  };
  const selectjobType = (event) => {
    setjobType(event.target.value);
    setjobTypeError(false);
  };
  const selectEmploymentType = (event) => {
    setEmploymentType(event.target.value);
    setEmploymentError(false);
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

  const onEditorHowToApply = (editorState) => {
    console.log(editorState, "editorState");
    setHowToApplyDescription([
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    ]);
    setEditorStateHowToApply(editorState);
  };

  const handleProfessionChange = (selectedOptions) => {
    setSelectedProfessions(selectedOptions);
    setProfessionError(false);
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

  const gendersOptions = [
    { value: "Man", label: "Man" },
    { value: "Woman", label: "Woman" },
    { value: "Non binary", label: "Non binary" },
    { value: "Transgender Woman", label: "Transgender Woman" },
    { value: "Transgender Man", label: "Transgender Man" },
    { value: "Agender", label: "Agender" },
    { value: "Other", label: "Other" },
    { value: "Prefer not to say", label: "Prefer not to say" },
  ];

  function chooseCategory(category) {
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
          // resData?.data?.data?.languages;
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

  const updateJob = async () => {
    if (jobTitle === "") {
      setjobTitleError(true);
    }
    if (zipCode === "") {
      setzipCodeError(true);
    }

    if (selectedProfessions.length === 0) {
      setProfessionError(true);
    }

    // if (languages === "") {
    //   setLanguageError(true);
    // }
    // if (minAge === "") {
    //   setMinAgeError(true);
    // }
    // if (maxAge === "") {
    //   setMaxAgeError(true);
    // }
    if (jobType === "") {
      setjobTypeError(true);
    }
    // if (gender === "") {
    //   setGenderError(true);
    // }
    if (jobCurrency === "") {
      setJobCurrencyError(true);
    }
    if (country === "") {
      setParentCountryError(true);
    }
    if (state === "") {
      setStateError(true);
    }
    if (kidsCity === "") {
      setCityError(true);
    }
    if (category == "") {
      setCategoryError(true);
    }
    if (employmentType == "") {
      setEmploymentError(true);
    }

    if (
      jobTitle !== "" &&
      zipCode !== "" &&
      jobType !== "" &&
      skills !== "" &&
      country !== "" &&
      category !== "" &&
      employmentType !== ""
    ) {
      const formData = {
        _id: editData?.value,
        jobTitle: jobTitle,
        jobLocation: zipCode,
        streetAddress: streetAddress,
        country: country,
        state: state,
        city: kidsCity,
        jobType: jobType,
        employmentType: employmentType,
        jobDescription: jobDescription,
        skills: skills,
        additionalRequirements: jobRequirements,
        minAge: minAge,
        maxAge: maxAge,
        gender: gender,
        nationality: nationality,
        languages: languages,
        questions: questions,
        benefits: selectedBenefits,
        compensation: handleCompensationSubmit(),
        jobCurrency: jobCurrency,
        // paymentType: paymentOptionValue(),
        hiringCompany: hiringCompany,
        whyWorkWithUs: whyWorkWithUs,
        hiringCompanyDescription: clientDescription,
        howLikeToApply: selectedApplyOption,
        workSamples: portofolioFile,
        brandImage: brandImage,
        lastDateForApply: lastdateApply,
        category: category,
        instaMin: instaMin,
        instaMax: instaMax,
        tikTokMin: tikTokMin,
        tikTokMax: tikTokMax,
        linkedInMin: linkedInMin,
        linkedInMax: linkedInMax,
        fbMin: fbMin,
        fbMax: fbMax,
        twitterMin: twitterMin,
        twitterMax: twitterMax,
        youTubeMin: youTubeMin,
        youTubeMax: youTubeMax,
      };
      if (editData?.type == "Draft") {
        await ApiHelper.post(`${API.editDraft}${editData?.value}`, formData)
          .then((resData) => {
            if (resData.data.status === true) {
              setMessage("Job Updated SuccessFully!");
              setOpenPopUp(true);
              setTimeout(function() {
                setOpenPopUp(false);
                navigate("/preview-job", {
                  state: {
                    jobId: resData?.data?.data?._id,
                  },
                });
              }, 2000);
            } else if (resData.data.status === false) {
              setMessage(resData.data.message);
              setOpenPopUp(true);
              setTimeout(function() {
                setOpenPopUp(false);
              }, 1000);
            }
          })
          .catch((err) => {});
      } else if (editData?.type == "Posted") {
        await ApiHelper.post(`${API.editJob}${editData?.value}`, formData)
          .then((resData) => {
            if (resData.data.status === true) {
              setMessage("Job Updated SuccessFully!");
              setOpenPopUp(true);
              setTimeout(function() {
                setOpenPopUp(false);
                navigate("/preview-job", {
                  state: {
                    jobId: resData?.data?.data?._id,
                  },
                });
              }, 2000);
            } else if (resData.data.status === false) {
              setMessage(resData.data.message);
              setOpenPopUp(true);
              setTimeout(function() {
                setOpenPopUp(false);
              }, 1000);
            }
          })
          .catch((err) => {});
      }
    } else {
      setMessage("Please Fill All Required Fields");
      setOpenPopUp(true);
      setTimeout(function() {
        setOpenPopUp(false);
      }, 2000);
    }
  };
  const createGigs = async () => {
    setIsLoading(true);

    console.log(
      jobTitle,
      zipCode,
      jobType,
      skills,
      country,
      state,
      kidsCity,
      category,
      employmentType,
      "PAYLOD_PRINT"
    );
    if (jobTitle === "") {
      setjobTitleError(true);
    }
    if (zipCode === "") {
      setzipCodeError(true);
    }
    if (selectedProfessions.length === 0) {
      setProfessionError(true);
    }

    if (jobType === "") {
      setjobTypeError(true);
    }

    if (jobCurrency === "") {
      setJobCurrencyError(true);
    }
    if (country === "") {
      setParentCountryError(true);
    }
    if (category == "") {
      setCategoryError(true);
    }
    if (employmentType == "") {
      setEmploymentError(true);
    }
    if (
      jobTitle !== "" &&
      zipCode !== "" &&
      jobType !== "" &&
      skills !== "" &&
      country !== "" &&
      category !== "" &&
      employmentType !== ""
    ) {
      const formData = {
        jobTitle: jobTitle,
        jobLocation: zipCode,
        streetAddress: streetAddress,
        country: country,
        state: state,
        city: kidsCity,
        jobType: jobType,
        employmentType: employmentType,
        jobDescription: jobDescription,
        skills: skills,
        additionalRequirements: jobRequirements,
        minAge: minAge,
        maxAge: maxAge,
        gender: gender,
        nationality: nationality,
        languages: languages,
        questions: questions,
        benefits: selectedBenefits,
        compensation: handleCompensationSubmit(),
        jobCurrency: jobCurrency,
        // paymentType: paymentOptionValue(),
        hiringCompany: hiringCompany,
        whyWorkWithUs: whyWorkWithUs,
        hiringCompanyDescription: clientDescription,
        howLikeToApply: selectedApplyOption,
        workSamples: portofolioFile,
        brandId: brandId,
        brandImage: brandImage,
        lastDateForApply: lastdateApply,
        category: category,
        instaMin: instaMin,
        instaMax: instaMax,
        tikTokMin: tikTokMin,
        tikTokMax: tikTokMax,
        linkedInMin: linkedInMin,
        linkedInMax: linkedInMax,
        fbMin: fbMin,
        fbMax: fbMax,
        twitterMin: twitterMin,
        twitterMax: twitterMax,
        youTubeMin: youTubeMin,
        youTubeMax: youTubeMax,
      };
      console.log(formData, "CREATEJOB_PAYLOAD");
      await ApiHelper.post(API.draftJob, formData)
        .then((resData) => {
          console.log(resData, "draftedData");
          if (resData.data.status === true) {
            setIsLoading(false);
            setMessage("Job Created SuccessFully!");
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
              if (brandData?.planName === "Basic") {
                setMessage(
                  "Your job will be approved by admin within 2 days. Upgrade to Pro for instant approval"
                );
                setOpenPopUp(true);
                setTimeout(function() {
                  setOpenPopUp(false);
                  navigate("/list-jobs");
                }, 3000);
              } else {
                navigate("/preview-job", {
                  state: {
                    jobId: resData?.data?.data?._id,
                  },
                });
              }
            }, 2000);
          } else if (resData.data.status === false) {
            setIsLoading(false);
            setMessage(resData.data.message);
            setOpenPopUp(true);
            setTimeout(function() {
              setOpenPopUp(false);
              if (resData?.data?.statusInfo == "limit-reached") {
                navigate("/pricing");
              }
            }, 3000);
          }
        })
        .catch((err) => {});
    } else {
      setMessage("Please Fill All Required Fields");
      setOpenPopUp(true);
      setTimeout(function() {
        setOpenPopUp(false);
      }, 2000);
    }
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
  const [minimumPaymnt, setMinimumPayment] = useState("");
  const [maximumPayment, setMaximumPayment] = useState("");

  const handlePaymentOptionChange = (event) => {
    setSelectedPaymentOption(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMinPayChange = (event) => {
    setMinimumPayment(event.target.value);
  };

  const handleMaxPayChange = (event) => {
    setMaximumPayment(event.target.value);
  };
  const onInstaMinChange = (event) => {
    setInstaMin(event.target.value);
  };
  const onInstaMaxChange = (event) => {
    setInstaMax(event.target.value);
  };
  const onTiktokMinChange = (event) => {
    setTiktokMin(event.target.value);
  };
  const onTiktokMaxChange = (event) => {
    setTiktokMax(event.target.value);
  };

  const paymentOptionValue = () => {
    console.log("paymentOptionValue");
    if (selectedPaymentOption === "fixed") {
      const data = {
        label: "fixed",
        amount: amount,
      };
      return data;
      // Perform API call with data
      console.log(data);
    } else {
      const data = {
        label: "range",
        minPay: minimumPaymnt,
        maxPay: maximumPayment,
      };
      console.log(data, "datapaymentType");
      // Perform API call with data
      return data;
      console.log(data);
    }
  };

  const [selectedTab, setSelectedTab] = useState("create-job");

  const handleJobTabs = (e) => {
    console.log(e.target.value, "e.target.value");
    setSelectedTab(e.target.value);
  };

  useEffect(() => {
    console.log(showQuestions, "showQuestions");
  }, [showQuestions]);

  const handleButtonClick = (data) => {
    setShowSidebar(!showSidebar);
    console.log(data, "handleButtonClickData");
  };

  const [skills, setSkills] = useState([]);
  const [skillInputValue, setSkillInputValue] = useState("");

  const handleKeyDown = (e) => {
    // console.log(e.inputProps.value, "e");
    setSkillInputValue(e.inputProps.value);
    if (e.key === "Enter") {
      addSkill();
    }
  };
  const addSkillCall = () => {
    addSkill();
  };
  const addSkill = () => {
    if (skillInputValue.trim() !== "") {
      setSkills([...skills, skillInputValue]);
      setSkillInputValue("");
    }
  };
  const removeSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  useEffect(() => {
    console.log(skillInputValue, "skills");
  }, [skills]);
  useEffect(() => {
    console.log(skills, "skills");
  }, [skills]);

  const skillsListing = [
    { title: "Actor" },
    { title: "Artist" },
    { title: "Creator" },
    { title: "Celebrity" },
    { title: "Influencer" },
    { title: "Model" },
    { title: "Event Planner" },
    { title: "Stylist" },
    { title: "Hair & Makeup Artist" },
    { title: "Nail Artist" },
    { title: "Tattooist" },
    { title: "Chef/Culinary Artist" },
    { title: "Personal Trainer" },
    { title: "Swimming Instructor" },
    { title: "Driving Instructor" },
    { title: "Meditation Teacher" },
    { title: "Yoga Instructor" },
    { title: "Dance Teacher" },
    { title: "Music Teacher" },
    { title: "Sports Instructor" },
    { title: "Martial Arts Instructor" },
    { title: "Craftsperson" },
    { title: "Sculptor" },
    { title: "Curator" },
    { title: "Singer" },
    { title: "Dancer" },
    { title: "Choreographer" },
    { title: "Musician" },
    { title: "Filmmaker" },
    { title: "Cinematographer" },
    { title: "Photographer" },
    { title: "Videographer" },
    { title: "DJ" },
    { title: "Video Jockey (VJ)" },
    { title: "Radio Jockey (RJ)" },
    { title: "Writer" },
    { title: "Copywriter" },
    { title: "Cartoonist" },
    { title: "Blogger/Vlogger" },
    { title: "Podcaster" },
    { title: "Host/MC" },
    { title: "Voice-over Artist" },
    { title: "Comedian" },
    { title: "Public Speaker" },
    { title: "Life Coach" },
    { title: "Career Coach" },
    { title: "Sustainability Consultant" },
    { title: "Fashion Designer" },
    { title: "Graphic Designer" },
    { title: "Web Designer/Developer" },
    { title: "Interior Designer" },
    { title: "Illustrator" },
    { title: "Animator" },
    { title: "Blockchain Developer" },
  ];

  console.log(skillInputValue, "skillInputValue");

  const [lastdateApply, setLastdateApply] = useState(null);

  const handleDateChange = (date) => {
    console.log(date, "ehandleDateChange");
    // Format the date to ensure it's correctly parsed and displayed
    const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    setLastdateApply(formattedDate);
    // Set the DOB state and calculate the age
    setDob(formattedDate);
    let dobDate = new Date(formattedDate);
    let today = new Date();
    let diff = today - dobDate;
    let ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    setAge(String(ageInYears));
    setDobError(false);
  };

  useEffect(() => {
    console.log(lastdateApply, "lastdateApply");
  }, [lastdateApply]);
  useEffect(() => {
    console.log(categoryError, "categoryError");
  }, [categoryError]);
  useEffect(() => {
    console.log(category, "category");
  }, [category]);

  const onMinChange = (event) => {
    setMinAge(event.target.value); // Update the state with the new value
    setMinAgeError(FlashOnTwoTone);
  };
  const onMaxChange = (event) => {
    setMaxAge(event.target.value); // Update the state with the new value
    setMaxAgeError(false);
  };
  const onLinkedInMinChange = (event) => {
    setLinkedInMin(event.target.value); // Update the state with the new value
  };
  const onLinkedInMaxChange = (event) => {
    setLinkedInMax(event.target.value); // Update the state with the new value
  };
  const onFbMinChange = (event) => {
    setFbMin(event.target.value); // Update the state with the new value
  };
  const onFbMaxChange = (event) => {
    setFbMax(event.target.value); // Update the state with the new value
  };
  const onTwitterMinChange = (event) => {
    setTwitterMin(event.target.value); // Update the state with the new value
  };
  const onTwitterMaxChange = (event) => {
    setTwitterMax(event.target.value); // Update the state with the new value
  };
  const onYouTubeMinChange = (event) => {
    setYouTubeMin(event.target.value); // Update the state with the new value
  };
  const onYouTubeMaxChange = (event) => {
    setYouTubeMax(event.target.value); // Update the state with the new value
  };

  return (
    <>
      <>
        <BrandHeader toggleMenu={toggleMenu} />
        <div
          id="sidebarBrand"
          className={`brand-sidebar ${
            showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
          }`}
        >
          <BrandSideMenu onButtonClick={handleButtonClick} />
        </div>
        <main
          id="mainBrand"
          className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
        >
          <div className="brand-content-main boxBg">
            <div className="create-job-title">
              {editData?.value && "Edit Gig/Job"}
              {!editData?.value && editJobData == null && "Post a Job"}
              {editJobData != null &&
                !editData?.value &&
                "Duplicate Existing Job"}
            </div>
            <div className="mandatory-label">
              <span style={{ color: "red" }}>*</span> marked field are mandatory
            </div>
            <div className="create-job-toggle">
              <div className="radio-toggles">
                <input
                  type="radio"
                  id="newjob"
                  name="radio-options"
                  value="create-job"
                  onChange={handleJobTabs}
                  className="job-toggle-inputs"
                  checked={selectedTab == "create-job"}
                ></input>
                {editData?.value && (
                  <>
                    <label className="create-job-toggle-label" htmlFor="newjob">
                      Edit Job
                    </label>
                  </>
                )}
                {!editData?.value && editJobData == null && (
                  <>
                    <label className="create-job-toggle-label" htmlFor="newjob">
                      Create New Job
                    </label>
                  </>
                )}
                {editJobData != null && !editData?.value && (
                  <>
                    <label className="create-job-toggle-label" htmlFor="newjob">
                      Duplicate Job
                    </label>
                  </>
                )}

                <input
                  type="radio"
                  id="duplicate"
                  name="radio-options"
                  value="duplicate-job"
                  className="job-toggle-inputs"
                  onChange={handleJobTabs}
                  checked={selectedTab == "duplicate-job"}
                ></input>
                <label className="create-job-toggle-label" htmlFor="duplicate">
                  Duplicate Existing Job
                </label>
                <div className="slide-item"></div>
              </div>
            </div>
            {selectedTab === "create-job" && (
              <>
                <div
                  className="dialog-body mt-0"
                  style={{ overflow: "hidden" }}
                >
                  <div className="kidsform-one w-100 p-2">
                    <div className="kids-main">
                      <div className="kids-form-row row">
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className="mb-0">
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
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className="mb-0">
                            <label className="form-label">
                              Category
                              <span className="mandatory">*</span>
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              onChange={selectCategory}
                              value={category}
                              style={{ fontSize: "14px" }}
                            >
                              <option value="" disabled selected>
                                Select Category
                              </option>
                              {categoryList.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            {categoryError && (
                              <div className="invalid-fields">
                                Please select Category
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="kids-form-row row">
                        <div className="kids-form-section col-md-6 mb-3">
                          {/* <div className="mb-4">
                            <label className="form-label">
                              Job Location
                              <span className="mandatory">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => {
                                setzipCode(e.target.value);
                                setzipCodeError(false);
                              }}
                              placeholder="Enter City, State, ZipCode"
                              value={zipCode}
                            />
                            {zipCodeError && (
                              <div className="invalid-fields">
                                Please enter Zip Code.
                              </div>
                            )}
                          </div> */}
                          <div className="mb-0">
                            <label className="form-label">
                              Country<span className="mandatory">*</span>
                            </label>
                            {/* <Select
                              placeholder="Search country..."
                              options={countryList.map((country, index) => ({
                                value: country,
                                label: country,
                                key: index,
                              }))}
                              value={country?.value}
                              onChange={handleSelectedCountry}
                              isSearchable={true}
                            /> */}

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
                        </div>
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className="mb-0">
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
                              <div className="invalid-fields">
                                Please select State
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="kids-form-row row">
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className="mb-0">
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
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className="mb-0">
                            <label className="form-label">Street Address</label>
                            <input
                              type="text"
                              className="form-control"
                              value={zipCode}
                              onChange={(e) => {
                                setzipCode(e.target.value);
                              }}
                              placeholder="Street Address"
                            ></input>
                          </div>
                        </div>
                      </div>

                      <div className="kids-form-row row">
                        <div className="kids-form-section col-md-6 mb-3">
                          <label className="form-label">
                            Job Type
                            <span className="mandatory">*</span>
                          </label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            onChange={selectjobType}
                            value={jobType}
                            style={{ fontSize: "14px" }}
                          >
                            <option value="" disabled selected>
                              Select Job Type
                            </option>
                            <option value="onsite" defaultValue>
                              On Site
                            </option>
                            <option value="remote">Remote</option>
                            <option value="Work From Anywhere">
                              Work From Anywhere
                            </option>
                            <option value="hybrid">Hybrid</option>
                          </select>
                          {jobTypeError && (
                            <div className="invalid-fields">
                              Please select Job Type
                            </div>
                          )}
                        </div>
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className="">
                            <label className="form-label">
                              Employment Type{" "}
                              <span className="mandatory">*</span>
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              onChange={selectEmploymentType}
                              value={employmentType}
                              style={{ fontSize: "14px" }}
                            >
                              <option value="" disabled selected>
                                Select Employment Type
                              </option>
                              {jobTypeOptions.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            {employmentError && (
                              <div className="invalid-fields">
                                Please select Employment Type
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="rich-editor mb-4">
                        <label className="form-label">
                          Gig/Job Description
                        </label>
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

                      <div className="kids-form-row row">
                        <div className="kids-form-section col-md-6 mb-3">
                          <label className="form-label  mb-2">
                            Application Deadline
                            <span className="mandatory">*</span>
                          </label>

                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              value={
                                lastdateApply ? parseISO(lastdateApply) : null
                              }
                              onChange={(newValue) => {
                                console.log(newValue, "newValue");
                                handleDateChange(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              disablePast
                            />
                          </LocalizationProvider>
                        </div>
                        <div className="kids-form-section col-md-6 mb-3">
                          <label className="form-label mb-2">
                            Profession/Skills (optional)
                            <span className="mandatory">*</span>
                          </label>

                          <div className="mb-0">
                            <div className="form-group add-skill-wrapper">
                              {/* has-search <span className="fa fa-search form-control-feedback"></span> */}

                              <Stack spacing={2} sx={{ width: 300 }}>
                                <Autocomplete
                                  freeSolo
                                  id="free-solo-2-demo"
                                  disableClearable
                                  options={skillsListing.map(
                                    (option) => option.title
                                  )}
                                  value={skillInputValue}
                                  onChange={(event, newValue) => {
                                    setSkillInputValue(newValue);
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Search input"
                                      InputProps={{
                                        ...params.InputProps,
                                        type: "search",
                                      }}
                                      onKeyUp={() => handleKeyDown(params)}
                                    />
                                  )}
                                />
                              </Stack>

                              {/* <input
                              type="text"
                              className="form-control"
                              placeholder="Add New Skills"
                              value={inputValue}
                              onChange={handleInputChange}
                              onKeyDown={handleKeyDown}
                            /> */}
                              <div
                                className="add-skill-btn"
                                onClick={addSkillCall}
                              >
                                Add Skill
                              </div>
                            </div>
                          </div>

                          <div className="skills-section">
                            {skills.map((skill, index) => (
                              <div className="skills-wrapper" key={index}>
                                <div className="skill-text"> {skill}</div>
                                <i
                                  className="bi bi-x"
                                  onClick={() => removeSkill(index)}
                                ></i>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="rich-editor mb-2">
                        <label className="form-label additional-requirements-title">
                          Additional Requirement (Optional)
                        </label>
                      </div>
                      <div className="kids-form-row row">
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className="">
                            <label className="form-label">Age Range</label>
                            <div className="creators-filter-select creator-age-wrapper splitterDiv">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Minimum Age"
                                value={minAge}
                                onChange={(e) => {
                                  onMinChange(e);
                                }}
                              ></input>

                              <input
                                type="text"
                                className="form-control"
                                placeholder="Maximum Age"
                                value={maxAge}
                                onChange={(e) => {
                                  onMaxChange(e);
                                }}
                              ></input>
                            </div>
                            {/* <label className="form-label">
                              Age <span className="mandatory">*</span>
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              onChange={selectAge}
                              value={ageRange}
                              style={{ fontSize: "14px" }}
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
                              <div className="invalid-fields">
                                Please select Age
                              </div>
                            )} */}
                          </div>
                        </div>
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className="">
                            <label className="form-label">Gender</label>

                            <Select
                              isMulti
                              name="colors"
                              options={gendersOptions}
                              valueField="value"
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={(value) => selectGender(value)}
                              styles={customStylesProfession}
                              value={selectedGenderOptions}
                            />

                            {/* <select
                              className="form-select"
                              aria-label="Default select example"
                              onChange={selectGender}
                              value={gender}
                              style={{ fontSize: "14px" }}
                            >
                              <option value="" disabled selected>
                                Select Gender
                              </option>
                              {gendersOptions.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select> */}
                          </div>
                        </div>
                      </div>
                      <div className="kids-form-row row">
                        <div className="kids-form-section col-md-6 mb-3">
                          <label className="form-label">Nationality</label>

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

                          {/* <select
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
                          </select> */}
                        </div>
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className="">
                            <label className="form-label">Languages</label>

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

                            {/* <select
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
                            </select> */}
                            {languageError && (
                              <div className="invalid-fields">
                                Please select Language
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="rich-editor mb-2">
                          <label className="form-label additional-requirements-title">
                            Audience Size on Social Media Platforms:
                          </label>
                        </div>

                        <div className="kids-form-row row">
                          <div className="kids-form-section col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                <i className="bi bi-instagram followers-social-icons"></i>
                                Instagram Followers
                              </label>
                              <div className="creators-filter-select creator-age-wrapper splitterDiv">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Minimum Followers"
                                  value={instaMin}
                                  onChange={(e) => {
                                    onInstaMinChange(e);
                                  }}
                                ></input>

                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Maximum Followers"
                                  value={instaMax}
                                  onChange={(e) => {
                                    onInstaMaxChange(e);
                                  }}
                                ></input>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-section col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                <i className="bi bi-tiktok followers-social-icons"></i>
                                TikTok Followers
                              </label>
                              <div className="creators-filter-select creator-age-wrapper splitterDiv">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Minimum Followers"
                                  value={tikTokMin}
                                  onChange={(e) => {
                                    onTiktokMinChange(e);
                                  }}
                                ></input>

                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Maximum Followers"
                                  value={tikTokMax}
                                  onChange={(e) => {
                                    onTiktokMaxChange(e);
                                  }}
                                ></input>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-section col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                <i className="bi bi-linkedin followers-social-icons"></i>
                                LinkedIn Followers
                              </label>
                              <div className="creators-filter-select creator-age-wrapper splitterDiv">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Minimum Followers"
                                  value={linkedInMin}
                                  onChange={(e) => {
                                    onLinkedInMinChange(e);
                                  }}
                                ></input>

                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Maximum Followers"
                                  value={linkedInMax}
                                  onChange={(e) => {
                                    onLinkedInMaxChange(e);
                                  }}
                                ></input>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-section col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                <i className="bi bi-facebook followers-social-icons"></i>
                                Facebook Followers
                              </label>
                              <div className="creators-filter-select creator-age-wrapper splitterDiv">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Minimum Followers"
                                  value={fbMin}
                                  onChange={(e) => {
                                    onFbMinChange(e);
                                  }}
                                ></input>

                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Maximum Followers"
                                  value={fbMax}
                                  onChange={(e) => {
                                    onFbMaxChange(e);
                                  }}
                                ></input>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-section col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                <i className="bi bi-twitter-x followers-social-icons"></i>
                                Twitter(X) Followers
                              </label>
                              <div className="creators-filter-select creator-age-wrapper splitterDiv">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Minimum Followers"
                                  value={twitterMin}
                                  onChange={(e) => {
                                    onTwitterMinChange(e);
                                  }}
                                ></input>

                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Maximum Followers"
                                  value={twitterMax}
                                  onChange={(e) => {
                                    onTwitterMaxChange(e);
                                  }}
                                ></input>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-section col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                <i className="bi bi-twitter-x followers-social-icons"></i>
                                YouTube
                              </label>
                              <div className="creators-filter-select creator-age-wrapper splitterDiv">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Minimum Followers"
                                  value={youTubeMin}
                                  onChange={(e) => {
                                    onYouTubeMinChange(e);
                                  }}
                                ></input>

                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Maximum Followers"
                                  value={youTubeMax}
                                  onChange={(e) => {
                                    onYouTubeMaxChange(e);
                                  }}
                                ></input>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mb-2">
                          <label className="screening-questions-label mb-4">
                            <input
                              type="checkbox"
                              className="screening-checkbox profession-checkbox"
                              onChange={handleCheckboxChange}
                              checked={showQuestions === true}
                            />
                            Add Screening Questions (optional)
                          </label>

                          {showQuestions && (
                            <div className="kids-form-section col-md-6 mb-3">
                              {questions.map((question, index) => (
                                <div className="mb-0" key={index}>
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
                                <i className="bi bi-plus-square-fill"></i>

                                <div className="add-more-questions-text">
                                  {" "}
                                  Add More
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mb-0 row">
                          <div className="kids-form-section col-md-12 mb-3">
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
                                    checked={selectedBenefits.includes(
                                      benefit.name
                                    )}
                                    onChange={handleBenefits}
                                  />
                                  {benefit.name}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="seperate-jobform-section row">
                          <div className="kids-form-section col-md-12 mb-3">
                            <div className="">
                              <label className="form-label mb-4">
                                Compensation{" "}
                                <span className="mandatory">*</span>
                              </label>
                              <div className="compensation-radios mb-2">
                                <label
                                  className="compensation-labels"
                                  htmlFor="paid-collab"
                                >
                                  <input
                                    id="paid-collab"
                                    className="screening-checkbox profession-checkbox"
                                    type="radio"
                                    value="paid_collaboration"
                                    checked={
                                      selectedOption === "paid_collaboration"
                                    }
                                    onChange={compensationChange}
                                  />
                                  Paid Collaboration
                                </label>
                                <label
                                  className="compensation-labels"
                                  htmlFor="product-gift"
                                >
                                  <input
                                    id="product-gift"
                                    className="screening-checkbox profession-checkbox"
                                    type="radio"
                                    value="product_gift"
                                    checked={selectedOption === "product_gift"}
                                    onChange={compensationChange}
                                  />
                                  Product/ Gift
                                </label>
                                <label
                                  className="compensation-labels"
                                  htmlFor="collab-gift"
                                >
                                  <input
                                    id="collab-gift"
                                    className="screening-checkbox profession-checkbox"
                                    type="radio"
                                    value="paid_collaboration_and_gift"
                                    checked={
                                      selectedOption ===
                                      "paid_collaboration_and_gift"
                                    }
                                    onChange={compensationChange}
                                  />
                                  Paid Collaboration + Gift
                                </label>
                              </div>
                              <div className="mt-3">
                                {selectedOption === "paid_collaboration" && (
                                  <div className="compensation-row row ">
                                    <div className="kids-form-section col-md-3 mb-3">
                                      <div className=" ">
                                        <label className="form-label">
                                          Pay Type
                                        </label>
                                        <select
                                          className="form-select"
                                          aria-label="Default select example"
                                          onChange={handleTypeChange}
                                          value={type}
                                          style={{
                                            fontSize: "14px",
                                          }}
                                        >
                                          <option value="" disabled selected>
                                            Select Pay Type
                                          </option>
                                          <option value="exact_pay">
                                            Exact Pay
                                          </option>
                                          <option value="pay_range">
                                            Pay Range
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    {type === "exact_pay" && (
                                      <>
                                        <div className="kids-form-section col-md-3 mb-3">
                                          <div className="">
                                            <label className="form-label">
                                              Exact Pay
                                            </label>
                                            <div className="creators-filter-select creator-age-wrapper">
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Exact Pay"
                                                value={exactPay}
                                                onChange={(e) => {
                                                  onExactPayChange(e);
                                                }}
                                              ></input>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                    {type == "pay_range" && (
                                      <>
                                        <div className="kids-form-section col-md-3 mb-3">
                                          <div className="">
                                            <label className="form-label">
                                              Minimum Pay
                                            </label>
                                            <div className="creators-filter-select creator-age-wrapper">
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Minimum Pay"
                                                value={minPay}
                                                onChange={(e) => {
                                                  onMinPayChange(e);
                                                }}
                                              ></input>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="kids-form-section col-md-3 mb-3">
                                          <div className="">
                                            <label className="form-label">
                                              Maximum Pay
                                            </label>
                                            <div className="creators-filter-select creator-age-wrapper">
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Maximum Pay"
                                                value={maxPay}
                                                onChange={(e) => {
                                                  onMaxPayChange(e);
                                                }}
                                              ></input>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}

                                    <div className="kids-form-section col-md-3 mb-3">
                                      <div className="">
                                        <label className="form-label">
                                          Currency
                                        </label>
                                        <select
                                          className="form-select"
                                          aria-label="Default select example"
                                          value={currency}
                                          onChange={handleCurrencyChange}
                                          style={{
                                            fontSize: "14px",
                                          }}
                                        >
                                          <option value="" disabled selected>
                                            Select Currency
                                          </option>
                                          {currencyList.map((option, index) => (
                                            <option
                                              key={index}
                                              value={option?.value}
                                            >
                                              {option?.title}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>

                                    <div className="kids-form-section col-md-3 mb-3">
                                      <div className="">
                                        <label className="form-label">
                                          Frequency
                                        </label>
                                        <select
                                          className="form-select"
                                          aria-label="Default select example"
                                          value={frequency}
                                          onChange={handleFrequencyChange}
                                          style={{
                                            fontSize: "14px",
                                          }}
                                        >
                                          <option value="" disabled selected>
                                            Select Frequency
                                          </option>
                                          {frequencyOptions.map(
                                            (option, index) => (
                                              <option
                                                key={index}
                                                value={option}
                                              >
                                                {option}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {selectedOption === "product_gift" && (
                                  <div className="compensation-row row">
                                    <div className="kids-form-section col-md-3 mb-3">
                                      <div className="">
                                        <label className="form-label">
                                          Product/Gift Name
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={productName}
                                          onChange={handleProductNameChange}
                                          placeholder="Enter Product/Gift Name"
                                        ></input>
                                      </div>
                                    </div>

                                    <div className="kids-form-section col-md-3 mb-3">
                                      <div className="">
                                        <label className="form-label">
                                          Product/Gift Value
                                        </label>
                                        <div className="creators-filter-select creator-age-wrapper">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Product/Gift Value"
                                            value={productValue}
                                            onChange={(e) => {
                                              handleProductValueChange(e);
                                            }}
                                          ></input>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="kids-form-section col-md-3 mb-3">
                                      <div className="">
                                        <label className="form-label">
                                          Currency
                                        </label>
                                        <select
                                          className="form-select"
                                          aria-label="Default select example"
                                          value={currency}
                                          onChange={handleCurrencyChange}
                                          style={{
                                            fontSize: "14px",
                                          }}
                                        >
                                          <option value="" disabled selected>
                                            Select Currency
                                          </option>
                                          {currencyList.map((option, index) => (
                                            <option
                                              key={index}
                                              value={option?.value}
                                            >
                                              {option?.title}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                    <div className="kids-form-section col-md-3 mb-3">
                                      <div className="">
                                        <label className="form-label">
                                          Frequency
                                        </label>
                                        <select
                                          className="form-select"
                                          aria-label="Default select example"
                                          value={frequency}
                                          onChange={handleFrequencyChange}
                                          style={{
                                            fontSize: "14px",
                                          }}
                                        >
                                          <option value="" disabled selected>
                                            Select Frequency
                                          </option>
                                          {frequencyOptions.map(
                                            (option, index) => (
                                              <option
                                                key={index}
                                                value={option}
                                              >
                                                {option}
                                              </option>
                                            )
                                          )}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                {selectedOption ===
                                  "paid_collaboration_and_gift" && (
                                  <>
                                    <div className="compensation-row row">
                                      <div className="kids-form-section col-md-3 mb-3">
                                        <div className="">
                                          <label className="form-label">
                                            Pay Type
                                          </label>
                                          <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            onChange={handleTypeChange}
                                            value={type}
                                            style={{
                                              fontSize: "14px",
                                            }}
                                          >
                                            <option value="" disabled selected>
                                              Select Pay Type
                                            </option>
                                            <option value="exact_pay">
                                              Exact Pay
                                            </option>
                                            <option value="pay_range">
                                              Pay Range
                                            </option>
                                          </select>
                                        </div>
                                      </div>
                                      {type === "exact_pay" && (
                                        <>
                                          <div className="kids-form-section col-md-3 mb-3">
                                            <div className="">
                                              <label className="form-label">
                                                Exact Pay
                                              </label>
                                              <div className="creators-filter-select creator-age-wrapper">
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder="Exact Pay"
                                                  value={exactPay}
                                                  onChange={(e) => {
                                                    onExactPayChange(e);
                                                  }}
                                                ></input>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                      {type == "pay_range" && (
                                        <>
                                          <div className="kids-form-section col-md-3 mb-3">
                                            <div className="">
                                              <label className="form-label">
                                                Minimum Pay
                                              </label>
                                              <div className="creators-filter-select creator-age-wrapper">
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder="Minimum Pay"
                                                  value={minPay}
                                                  onChange={(e) => {
                                                    onMinPayChange(e);
                                                  }}
                                                ></input>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="kids-form-section col-md-3 mb-3">
                                            <div className="">
                                              <label className="form-label">
                                                Maximum Pay
                                              </label>
                                              <div className="creators-filter-select creator-age-wrapper">
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder="Maximum Pay"
                                                  value={maxPay}
                                                  onChange={(e) => {
                                                    onMaxPayChange(e);
                                                  }}
                                                ></input>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                      <div className="kids-form-section col-md-3 mb-3">
                                        <div className="">
                                          <label className="form-label">
                                            Currency
                                          </label>
                                          <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={currency}
                                            onChange={handleCurrencyChange}
                                            style={{
                                              fontSize: "14px",
                                            }}
                                          >
                                            <option value="" disabled selected>
                                              Select Currency
                                            </option>
                                            {currencyList.map(
                                              (option, index) => (
                                                <option
                                                  key={index}
                                                  value={option?.value}
                                                >
                                                  {option?.title}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </div>
                                      </div>
                                      <div className="kids-form-section col-md-3 mb-3">
                                        <div className="">
                                          <label className="form-label">
                                            Frequency
                                          </label>
                                          <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={frequency}
                                            onChange={handleFrequencyChange}
                                            style={{
                                              fontSize: "14px",
                                            }}
                                          >
                                            <option value="" disabled selected>
                                              Select Frequency
                                            </option>
                                            {frequencyOptions.map(
                                              (option, index) => (
                                                <option
                                                  key={index}
                                                  value={option}
                                                >
                                                  {option}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="compensation-row row">
                                      <div className="kids-form-section col-md-3 mb-3">
                                        <div className="">
                                          <label className="form-label">
                                            Product/Gift Name
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={productName}
                                            onChange={handleProductNameChange}
                                            placeholder="Enter Product/Gift Name"
                                          ></input>
                                        </div>
                                      </div>
                                      <div className="kids-form-section col-md-3 mb-3">
                                        <div className="">
                                          <label className="form-label">
                                            Product/Gift Value
                                          </label>
                                          <div className="creators-filter-select creator-age-wrapper">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Product/Gift Value"
                                              value={productValue}
                                              onChange={(e) => {
                                                handleProductValueChange(e);
                                              }}
                                            ></input>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="kids-form-section col-md-3 mb-3">
                                        <div className=" ">
                                          <label className="form-label">
                                            Currency
                                          </label>
                                          <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={productCurrency}
                                            onChange={
                                              handleProductCurrencyChange
                                            }
                                            style={{
                                              fontSize: "14px",
                                            }}
                                          >
                                            <option value="" disabled selected>
                                              Select Currency
                                            </option>
                                            {currencyList.map(
                                              (option, index) => (
                                                <option
                                                  key={index}
                                                  value={option?.value}
                                                >
                                                  {option?.title}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </div>
                                      </div>
                                      <div className="kids-form-section col-md-3 mb-3">
                                        <div className="">
                                          <label className="form-label">
                                            Frequency
                                          </label>
                                          <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={productFrequency}
                                            onChange={
                                              handleProductFrequencyChange
                                            }
                                            style={{
                                              fontSize: "14px",
                                            }}
                                          >
                                            <option value="" disabled selected>
                                              Select Frequency
                                            </option>
                                            {frequencyOptions.map(
                                              (option, index) => (
                                                <option
                                                  key={index}
                                                  value={option}
                                                >
                                                  {option}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedTab != "duplicate-job" && (
              <>
                {/* <div className=" seperate-jobform-section">
                  <div className="kids-form-section">
                    <div className="mb-4">
                      <label className="compensation-labels form-label mb-3">
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
                          <div className="amount-wrapper-job">
                            <label>Amount:</label>
                            <input
                              className="form-control"
                              type="number"
                              value={amount}
                              onChange={handleAmountChange}
                            />
                          </div>
                        )}

                        {selectedPaymentOption === "range" && (
                          <div className="kids-form-row row">
                            <div className="kids-form-section col-md-6 mb-3">
                              <label className="form-label">Min Pay</label>
                              <input
                                type="number"
                                className="form-control"
                                value={minimumPaymnt}
                                onChange={handleMinPayChange}
                                placeholder="Enter Min Pay"
                              ></input>
                            </div>
                            <div className="kids-form-section col-md-6 mb-3">
                              <label className="form-label">Max Pay</label>
                              <input
                                type="number"
                                className="form-control"
                                value={maximumPayment}
                                onChange={handleMaxPayChange}
                                placeholder="Enter Max Pay"
                              ></input>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div> */}

                <div className="kids-form-section col-md-6 mb-3">
                  <label className="form-label">Hiring Company/Client</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={selectHiringCompany}
                    value={hiringCompany}
                    style={{ fontSize: "14px" }}
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    {[brandData?.brandName].map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
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

                <div className="kids-form-section col-md-12 mb-3">
                  <label className="form-label">
                    How you would like to receive Application{" "}
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
                      {/* (Easy apply option makes it easier for
                              applications to share thier profile and apply with
                              a one click. Select "Easy Apply" If you would like
                              to receive and manage applications directly
                              through your dashboard on this plaform.) */}
                      Make it simple for applicants to apply with one click.
                      Choose "Easy Apply" to receive and manage applications
                      directly through your dashboard on our platform.
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
                        checked={selectedApplyOption == "how_to_apply"}
                        onChange={handleApplyOption}
                      />
                      <label
                        className="compensation-labels form-label"
                        htmlFor="how_apply"
                      >
                        How to Apply
                      </label>
                    </div>
                    <div className="easy-apply-description">
                      {/* (If you would like to receive and manage
                              applications outside this plaform, type the
                              application instructions below) */}
                      <Editor
                        editorState={editorStateHowToApply}
                        editorStyle={{ overflow: "hidden" }}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorHowToApply}
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
                    {/* <div className="how-to-apply-steps">
                              <div>
                                1. To submit your application, kindly email your
                                portfolio
                              </div>
                              <div>
                                2. Applicants will be considered on a rolling
                                basis.
                              </div>
                            </div> */}
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
                    Attach your project brief/TOR/job description (optional)
                  </div>
                  <div className="upload-info">(PDF, Word and Image files)</div>
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

                <div className="job-post-terms">
                  By clicking Preview & Post , I agree that Brands and Talent
                  may publish and distribute my job advertisement on its site
                  and through its distribution partners.
                </div>

                <div className="create-job-buttons mt-4 mb-2">
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      createGigs();
                    }}
                    className="save-draft-button"
                  >
                    Save Draft
                  </div>
                  {editData?.value && (
                    <>
                      <div
                        className="createjob-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          updateJob();
                        }}
                      >
                        Update Job
                      </div>
                    </>
                  )}
                  {!editData?.value && (
                    <>
                      <div
                        className="createjob-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          createGigs();
                        }}
                      >
                        {isLoading ? "Loading..." : " Preview & Post"}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {selectedTab === "duplicate-job" && (
              <>
                <div className="mt-0">
                  <div className="kidsform-one w-100  p-2">
                    <div className="kids-main">
                      <div
                        style={{ minHeight: "200px" }}
                        className="kids-form-row"
                      >
                        <div className="w-100">
                          <div className="mb-4">
                            <label className="form-label">
                              Enter a Previous Job Title
                              <span className="mandatory">*</span>
                            </label>
                            <Select
                              placeholder="Select Previous Job..."
                              options={allJobsList.map((job) => ({
                                value: job._id, // or whatever unique identifier you want to use
                                label: job.jobTitle,
                                type: job?.type,
                              }))}
                              onChange={handleChange}
                              isSearchable={true}
                            />
                            {jobTitleError && (
                              <div className="invalid-fields">
                                Please enter job Title
                              </div>
                            )}
                            <div className="duplicatejob-instruction">
                              Important: Posting an exact copy of an active job
                              in the same or nearby location will be rejected by
                              the job boards.
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="create-job-buttons mt-4 mb-2">
                        <div
                          className="createjob-btn"
                          onClick={(e) => {
                            e.preventDefault();

                            duplicateJob();
                          }}
                        >
                          Duplicate Job
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default CreateJobs;
