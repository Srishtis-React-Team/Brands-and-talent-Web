import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.css";
import "../../assets/css/forms/kidsformthree.css";
import "../../assets/css/kidsmain.scss";
import "../../assets/css/talent-dashboard.css";
import "../../assets/css/createjobs.css";
import "../../assets/css/brand-home.css";
import "../../assets/css/dashboard.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, ContentState, convertFromHTML } from "draft-js";
import Select from "react-select";
import Axios from "axios";
import { API } from "../../config/api";
import PopUp from "../../components/PopUp";
import { ApiHelper } from "../../helpers/ApiHelper";
import ReactFlagsSelect from "react-flags-select";
import { useNavigate } from "react-router";
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
import useFieldDatas from "../../config/useFieldDatas";

const CreateJobs = () => {
  const {
    categoryList,
    professionList,
    gendersList,
    languagesList,
    nationalitiesList,
  } = useFieldDatas();

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
  const btLogo = require("../../assets/images/LOGO.png");
  const kidsImage = require("../../assets/images/kidsImage.png");
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const [jobTitleError, setjobTitleError] = useState(false);
  const [deadlineError, setDeadlineError] = useState(false);
  const [skillError, setSkillError] = useState(false);
  const [jobTitle, setjobTitle] = useState("");
  const [message, setMessage] = useState("");
  const [allJobsList, setAllJobsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDraftLoading, setIsDraftLoading] = useState(false);

  const [selectedJobID, setSelectedJobID] = useState("");
  const [editJobData, setEditJobData] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brandImage, setBrandImage] = useState("");
  const [jobCountNumber, setJobCountNumber] = useState("");
  const [brandData, setBrandData] = useState("");
  const [minPay, setMinPay] = useState(null);
  const [minPayError, setMinPayError] = useState("");
  const [maxPay, setMaxPay] = useState(null);
  const [maxPayError, setMaxPayError] = useState("");
  const [instaMin, setInstaMin] = useState("");
  const [instaMax, setInstaMax] = useState("");
  const [tikTokMin, setTiktokMin] = useState("");
  const [tikTokMax, setTiktokMax] = useState("");
  const [linkedInMin, setLinkedInMin] = useState("");
  const [linkedInMax, setLinkedInMax] = useState("");
  const [fbMin, setFbMin] = useState("");
  const [fbMax, setFbMax] = useState("");
  const [twitterMin, setTwitterMin] = useState("");
  const [twitterMax, setTwitterMax] = useState("");
  const [youTubeMin, setYouTubeMin] = useState("");
  const [youTubeMax, setYouTubeMax] = useState("");

  const [instaMinError, setInstaMinError] = useState("");
  const [instaMaxError, setInstaMaxError] = useState("");

  const [linkedInMinError, setLinkedInMinError] = useState("");
  const [linkedInMaxError, setLinkedInMaxError] = useState("");

  useEffect(() => {
    if (instaMin && instaMax && parseInt(instaMin) > parseInt(instaMax)) {
      setInstaMinError(
        "Minimum followers cannot be greater than maximum followers."
      );
    } else {
      setInstaMinError(""); // Clear error if valid
    }

    if (instaMax && instaMin && parseInt(instaMax) < parseInt(instaMin)) {
      setInstaMaxError(
        "Maximum followers cannot be less than minimum followers."
      );
    } else {
      setInstaMaxError(""); // Clear error if valid
    }
  }, [instaMin, instaMax]);

  const [tikTokMinError, setTikTokMinError] = useState("");
  const [tikTokMaxError, setTikTokMaxError] = useState("");

  useEffect(() => {
    if (tikTokMin && tikTokMax && parseInt(tikTokMin) > parseInt(tikTokMax)) {
      setTikTokMinError(
        "Minimum followers cannot be greater than maximum followers."
      );
    } else {
      setTikTokMinError(""); // Clear error if valid
    }

    if (tikTokMax && tikTokMin && parseInt(tikTokMax) < parseInt(tikTokMin)) {
      setTikTokMaxError(
        "Maximum followers cannot be less than minimum followers."
      );
    } else {
      setTikTokMaxError(""); // Clear error if valid
    }
  }, [tikTokMin, tikTokMax]);

  useEffect(() => {
    if (
      linkedInMin &&
      linkedInMax &&
      parseInt(linkedInMin) > parseInt(linkedInMax)
    ) {
      setLinkedInMinError(
        "Minimum followers cannot be greater than maximum followers."
      );
    } else {
      setLinkedInMinError(""); // Clear error if valid
    }

    if (
      linkedInMax &&
      linkedInMin &&
      parseInt(linkedInMax) < parseInt(linkedInMin)
    ) {
      setLinkedInMaxError(
        "Maximum followers cannot be less than minimum followers."
      );
    } else {
      setLinkedInMaxError(""); // Clear error if valid
    }
  }, [linkedInMin, linkedInMax]);

  const [fbMinError, setFbMinError] = useState("");
  const [fbMaxError, setFbMaxError] = useState("");

  useEffect(() => {
    if (fbMin && fbMax && parseInt(fbMin) > parseInt(fbMax)) {
      setFbMinError(
        "Minimum followers cannot be greater than maximum followers."
      );
    } else {
      setFbMinError(""); // Clear error if valid
    }

    if (fbMax && fbMin && parseInt(fbMax) < parseInt(fbMin)) {
      setFbMaxError("Maximum followers cannot be less than minimum followers.");
    } else {
      setFbMaxError(""); // Clear error if valid
    }
  }, [fbMin, fbMax]);

  const [twitterMinError, setTwitterMinError] = useState("");
  const [twitterMaxError, setTwitterMaxError] = useState("");

  useEffect(() => {
    if (
      twitterMin &&
      twitterMax &&
      parseInt(twitterMin) > parseInt(twitterMax)
    ) {
      setTwitterMinError(
        "Minimum followers cannot be greater than maximum followers."
      );
    } else {
      setTwitterMinError(""); // Clear error if valid
    }

    if (
      twitterMax &&
      twitterMin &&
      parseInt(twitterMax) < parseInt(twitterMin)
    ) {
      setTwitterMaxError(
        "Maximum followers cannot be less than minimum followers."
      );
    } else {
      setTwitterMaxError(""); // Clear error if valid
    }
  }, [twitterMin, twitterMax]);

  const [youTubeMinError, setYouTubeMinError] = useState("");
  const [youTubeMaxError, setYouTubeMaxError] = useState("");

  useEffect(() => {
    if (minPay && maxPay && parseInt(minPay) > parseInt(maxPay)) {
      setMinPayError("Minimum pay cannot be greater than maximum pay.");
    } else {
      setMinPayError(""); // Clear error if valid
    }

    if (maxPay && minPay && parseInt(maxPay) < parseInt(minPay)) {
      setMaxPayError("Maximum pay cannot be less than minimum pay.");
    } else {
      setMaxPayError(""); // Clear error if valid
    }
  }, [minPay, maxPay]);

  useEffect(() => {
    if (
      youTubeMin &&
      youTubeMax &&
      parseInt(youTubeMin) > parseInt(youTubeMax)
    ) {
      setYouTubeMinError(
        "Minimum followers cannot be greater than maximum followers."
      );
    } else {
      setYouTubeMinError(""); // Clear error if valid
    }

    if (
      youTubeMax &&
      youTubeMin &&
      parseInt(youTubeMax) < parseInt(youTubeMin)
    ) {
      setYouTubeMaxError(
        "Maximum followers cannot be less than minimum followers."
      );
    } else {
      setYouTubeMaxError(""); // Clear error if valid
    }
  }, [youTubeMin, youTubeMax]);

  const [employmentType, setEmploymentType] = useState("");
  const [employmentError, setEmploymentError] = useState(false);
  const companyList = [];
  const [selectedLanguageOptions, setSelectedLanguageOptions] = useState([]);
  const [selectedGenderOptions, setSelectedGenderOptions] = useState([]);
  const [selectedNationalityOptions, setSelectedNationalityOptions] = useState(
    []
  );

  const [isDuplicateJob, setIsDuplicateJob] = useState(false);

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${brandId}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data);
            companyList.push(resData.data.data?.brandName);
          }
        }
      })
      .catch((err) => { });
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
    if (editData?.value && editData?.type) {
      getJobsByID(editData?.value, editData?.type);
    } else {
      setEditJobData(null);
    }
  }, [editData]);

  const updateJobFormDatas = (editData) => {
    if (editData) {
      setCategory(editData?.category);
      setEmploymentType(editData?.employmentType);
      setLastdateApply(editData?.lastDateForApply);
      setSkills(editData?.skills);
      setMinAge(editData?.minAge);
      setMaxAge(editData?.maxAge);
      setjobTitle(editData?.jobTitle);
      setAgeRange(editData?.age);
      setzipCode(editData?.jobLocation);
      setstreetAddress(editData?.streetAddress);
      setjobType(editData?.jobType);
      setGender(editData?.gender);
      setWhyWorkWithUs(editData?.whyWorkWithUs);
      setSelectedApplyOption(editData?.selectedApplyOption);
      setHiringCompany(editData?.hiringCompany);
      setSelectedBenefits(editData?.benefits);
      setSelectedApplyOption(editData?.howLikeToApply);
      setPortofolioFile(editData?.workSamples);
      setJobCurrency(editData?.jobCurrency);
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

      const genderUpdatedOptions = editData?.gender?.map((gender) => {
        return gendersList.find((option) => option?.label === gender);
      });

      setSelectedGenderOptions(genderUpdatedOptions);

      console.log("editData?.nationality?", editData?.nationality);

      const selectedOptions = editData?.languages.map((language) => {
        return languagesList.find((option) => option.label === language);
      });

      setSelectedLanguageOptions(selectedOptions);

      if (nationalitiesList.length > 0) {
        const nationalitiesList = editData?.nationality?.map((language) => {
          return nationalitiesList.find((option) => option?.label === language);
        });
        setSelectedNationalityOptions(nationalitiesList);
      }

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

      getCities({
        countryName: editData.country,
        stateName: editData.state,
      });
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
        setExactPay(editData?.compensation?.paid_collaboration?.exactPay);
        setfrequency(editData?.compensation?.paid_collaboration?.frequency);
      } else if (editData?.compensation.hasOwnProperty("paid_collaboration")) {
        setCompensationChange("paid_collaboration");
        setType(editData?.compensation?.paid_collaboration?.type);
        setCurrency(editData?.compensation?.paid_collaboration?.currency);
        setExactPay(editData?.compensation?.paid_collaboration?.exactPay);
        setfrequency(editData?.compensation?.paid_collaboration?.frequency);
      } else if (editData?.compensation.hasOwnProperty("product_gift")) {
        setCompensationChange("product_gift");
        setProductName(editData?.compensation?.product_gift?.product_name);
        setValueUSD(editData?.compensation?.product_gift?.amount_value);
        setExactPay(editData?.compensation?.paid_collaboration?.exactPay);
        setfrequency(editData?.compensation?.paid_collaboration?.frequency);
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
      let whyWorkWithUsContentBlocks;
      if (whyWorkWithUsContent) {
        whyWorkWithUsContentBlocks = convertFromHTML(whyWorkWithUsContent);
      }
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
      const hiringCompanyDescriptionContentState =
        ContentState.createFromBlockArray(
          hiringCompanyDescriptionContentBlocks
        );
      const hiringCompanyDescription = EditorState.createWithContent(
        hiringCompanyDescriptionContentState
      );
      setEditorStateClientDescription(hiringCompanyDescription);
      setClientDescription(editData?.hiringCompanyDescription);

      setfrequency(frequencyValue);
    }
  };

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    setSelectedJobID(e?.value);
    getJobsByID(e?.value, e?.type);
    setIsDuplicateJob(true);
  };

  const getJobsByID = async (jobId, type) => {
    if (type == "Posted") {
      const formData = {
        type: "brand",
      };
      await ApiHelper.post(`${API.getAnyJobById}${jobId}`, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            if (resData.data.data) {
              setEditJobData(resData.data.data, "resData.data.data");
              updateJobFormDatas(resData.data.data);
            }
          }
        })
        .catch((err) => { });
    } else if (type == "Draft") {
      const formData = {
        type: "brand",
      };
      await ApiHelper.post(`${API.getAnyJobById}${jobId}`, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            if (resData.data.data) {
              setEditJobData(resData.data.data, "resData.data.data");
              updateJobFormDatas(resData.data.data);
            }
          }
        })
        .catch((err) => { });
    }
  };

  useEffect(() => {
    let initialHowToApply = [
      `<p>Sample Application Instructions (Customize as Needed Before Posting):<br/>
       Interested candidates should submit their Resume along with their Brands & Talent (BT) portfolio link to ${brandData?.brandEmail}.<br/>
       Please include ${jobTitle} in the subject line.</p>`,
    ];
    
    //`<p>Interested candidates should submit their resume and a link that contains a portfolio from Brands & Talent website to ${brandData?.brandEmail}. Please include ${jobTitle} in the subject line.</p>\n`,

    const whyWorkWithUsContent = initialHowToApply[0];
    const whyWorkWithUsContentBlocks = convertFromHTML(whyWorkWithUsContent);
    let whyWorkWithUsContentState;
    if (whyWorkWithUsContentBlocks) {
      whyWorkWithUsContentState = ContentState.createFromBlockArray(
        whyWorkWithUsContentBlocks
      );
    }

    const updatewhyWorkWithUs = EditorState.createWithContent(
      whyWorkWithUsContentState
    );
    setEditorStateHowToApply(updatewhyWorkWithUs);
    setHowToApplyDescription(editJobData?.whyWorkWithUs);

    // Check if applyDescription exists and is not empty


    const applyDescriptionContent =
      Array.isArray(editJobData?.applyDescription) &&
        editJobData.applyDescription.length > 0
        ? editJobData.applyDescription.join(" ").trim()
        : initialHowToApply[0];


    // Convert HTML content to Draft.js content block
    const contentBlock = convertFromHTML(applyDescriptionContent);

    // Handle empty content block case
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks || [],
      contentBlock.entityMap || {}
    );

    const initialEditorState = EditorState.createWithContent(contentState);
    setEditorStateApplyDescription(initialEditorState);
    setApplyDescription([applyDescriptionContent]);
  }, [brandData, jobTitle, editJobData]);

  // useEffect(() => {
  //   let initialHowToApply = [
  //     `<p>Interested candidates should submit their resume and a link that contains portfolio from Brands & Talent website to ${brandData?.brandEmail}. Please include ${jobTitle} in the subject line</p>\n`,
  //   ];

  //   const whyWorkWithUsContent = initialHowToApply[0];
  //   const whyWorkWithUsContentBlocks = convertFromHTML(whyWorkWithUsContent);
  //   let whyWorkWithUsContentState;
  //   if (whyWorkWithUsContentBlocks) {
  //     whyWorkWithUsContentState = ContentState.createFromBlockArray(
  //       whyWorkWithUsContentBlocks
  //     );
  //   }

  //   const updatewhyWorkWithUs = EditorState.createWithContent(
  //     whyWorkWithUsContentState
  //   );
  //   setEditorStateHowToApply(updatewhyWorkWithUs);
  //   setHowToApplyDescription(editJobData?.whyWorkWithUs);

  // }, [brandData, jobTitle]);

  const getAllJobs = async (id) => {
    await ApiHelper.get(`${API.getAllJobs}${id}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setAllJobsList(resData.data.data, "resData.data.data getAllJobs");
          }
        }
      })
      .catch((err) => { });
  };

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
    setBrandImage(localStorage.getItem("currentUserImage"));
    if (brandId && brandId != null) {
      getAllJobs(brandId);
      getBrand();
    }
  }, [brandId, brandImage]);

  const [showSidebar, setShowSidebar] = useState(true);

  const [editorStateJobDescription, setEditorStateJobDescription] = useState(
    EditorState.createEmpty()
  );
  const [editorStateApplyDescription, setEditorStateApplyDescription] =
    useState(EditorState.createEmpty());
  const [editorStateJobRequirements, setEditorStateJobRequirements] = useState(
    EditorState.createEmpty()
  );
  const [editorStateWhyWorkWithUs, setEditorStateWhyWorkWithUs] = useState(
    EditorState.createEmpty()
  );
  const [editorStateClientDescription, setEditorStateClientDescription] =
    useState(EditorState.createEmpty());

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
  const [talentPasswordError, settalentPasswordError] = useState(false);
  const [talentConfirmPasswordError, settalentConfirmPasswordError] =
    useState(false);
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
  const [applyDescription, setApplyDescription] = useState([]);

  const handleApplyOption = (e) => {
    setSelectedApplyOption(e.target.value);
  };

  const [selectedOption, setCompensationChange] =
    useState("paid_collaboration");
  const [type, setType] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [productCurrency, setProductCurrency] = useState(null);
  const [frequency, setfrequency] = useState(null);
  const [productFrequency, setProductFrequency] = useState(null);
  const [productName, setProductName] = useState(null);
  const [valueUSD, setValueUSD] = useState(null);
  const [exactPay, setExactPay] = useState(null);
  const [productValue, setProductValue] = useState(null);

  const compensationChange = (event) => {
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
    // setQuestions([...questions]);
    setTimeout(() => {
      const newQuestionIndex = questions.length;
      const input = document.getElementById(`question${newQuestionIndex}`);
      if (input) {
        input.focus();
      }
    }, 100);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
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

  useEffect(() => { }, [updateDisabled]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // Function to handle email input change
  const handleEmailChange = (e) => {
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
    setEthnicity(event.target.value);
    setEthnicityError(false);
  };

  // const selectLanguage = (event) => {
  //
  //   if (event[0].value) {
  //     setLanguages(event[0].value);
  //     setLanguageError(false);
  //   }
  // };

  const selectLanguage = (selectedOptions) => {
    setLanguageError(false);
    if (!selectedOptions || selectedOptions.length === 0) {
      // Handle case when all options are cleared
      setLanguages([]); // Clear the languages state
      setSelectedLanguageOptions([]);

      return;
    }
    // Extract values of all selected languages
    const selectedLanguages = selectedOptions.map((option) => option.value);

    setLanguages(selectedLanguages); // Update languages state with all selected languages

    setSelectedLanguageOptions(selectedOptions);
  };

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
  };

  // const selectGender = (event) => {
  //   setGender(event.target.value);
  //   setGenderError(false);
  // };

  const selectGender = (selectedOptions) => {
    setGenderError(false);
    if (!selectedOptions || selectedOptions.length === 0) {
      // Handle case when all options are cleared
      setGender([]); // Clear the languages state
      setSelectedGenderOptions([]);

      return;
    }
    // Extract values of all selected languages
    const selectedLanguages = selectedOptions.map((option) => option.value);

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
    setJobDescription([
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    ]);
    setEditorStateJobDescription(editorState);
  };
  const onEditorApplyDescription = (editorState) => {
    setApplyDescription([
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    ]);
    setEditorStateApplyDescription(editorState);
  };
  const onEditorRequirements = (editorState) => {
    setJobRequirements([
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    ]);
    setEditorStateJobRequirements(editorState);
  };
  const onEditorWhyWorkWithUS = (editorState) => {
    setWhyWorkWithUs([
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    ]);
    setEditorStateWhyWorkWithUs(editorState);
  };
  const onEditorClientDescription = (editorState) => {
    setClientDescription([
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    ]);
    setEditorStateClientDescription(editorState);
  };

  const onEditorHowToApply = (editorState) => {
    setHowToApplyDescription([
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    ]);
    setEditorStateHowToApply(editorState);
  };

  const handleProfessionChange = (selectedOptions) => {
    setSelectedProfessions(selectedOptions);
    setProfessionError(false);
  };

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
      .catch((err) => { });
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
      .catch((err) => { });
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

  const updateJob = async () => {
    if (jobTitle === "") {
      setjobTitleError(true);
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
        applyDescription: applyDescription,
      };
      if (editData?.type == "Draft") {
        await ApiHelper.post(`${API.editDraft}${editData?.value}`, formData)
          .then((resData) => {
            if (resData.data.status === true) {
              setMessage("Job Updated Successfully!");
              setOpenPopUp(true);
              setTimeout(function () {
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
              setTimeout(function () {
                setOpenPopUp(false);
              }, 1000);
            }
          })
          .catch((err) => { });
      } else if (editData?.type == "Posted") {
        await ApiHelper.post(`${API.editJob}${editData?.value}`, formData)
          .then((resData) => {
            if (resData.data.status === true) {
              setMessage("Job Updated Successfully!");
              setOpenPopUp(true);
              setTimeout(function () {
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
              setTimeout(function () {
                setOpenPopUp(false);
              }, 1000);
            }
          })
          .catch((err) => { });
      }
    } else {
      setMessage("Please fill out all mandatory fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 2000);
    }
  };
  const createGigs = async (type) => {
    if (type == "draft") {
      setIsDraftLoading(true);
    } else if (type == "post") {
      setIsLoading(true);
    }

    if (jobTitle === "") {
      setjobTitleError(true);
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
    if (lastdateApply == null) {
      setDeadlineError(true);
    }
    if (skills.length == 0) {
      setSkillError(true);
    }
    if (
      jobTitle !== "" &&
      jobType !== "" &&
      skills !== "" &&
      country !== "" &&
      category !== "" &&
      employmentType !== "" &&
      !minAgeError &&
      !maxAgeError &&
      !instaMinError &&
      !instaMaxError &&
      !tikTokMinError &&
      !tikTokMaxError &&
      !linkedInMinError &&
      !linkedInMaxError &&
      !fbMinError &&
      !fbMaxError &&
      !twitterMinError &&
      !twitterMaxError &&
      !youTubeMinError &&
      !youTubeMaxError &&
      !minPayError &&
      !maxPayError &&
      lastdateApply != null &&
      skills.length != 0
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
        applyDescription: applyDescription,
      };

      await ApiHelper.post(API.draftJob, formData)
        .then((resData) => {
          if (resData.data.status === true) {
            if (type == "draft") {
              setIsDraftLoading(false);
            } else if (type == "post") {
              setIsLoading(false);
            }
            // setMessage("Kindly review the job!");
            // navigate("/preview-job", {
            //   state: {
            //     jobId: resData?.data?.data?._id,
            //   },
            // });
            setMessage("Kindly review the job!");

            setTimeout(() => {
              setMessage(""); // Clear the message after a longer duration (e.g., 5 seconds)

              navigate("/preview-job", {
                state: {
                  jobId: resData?.data?.data?._id,
                },
              });
            }, 5000); // Display message for 5 seconds before navigating
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
              if (brandData?.planName === "Basic") {
                setMessage(
                  "Thank you for posting your job. BT team will review and approve your job within 2 working days. Subscribe to pro/premium membership for instant approval."
                );
                setOpenPopUp(true);
                setTimeout(function () {
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
            if (type == "draft") {
              setIsDraftLoading(false);
            } else if (type == "post") {
              setIsLoading(false);
            }
            setMessage(resData.data.message);
            setOpenPopUp(true);
            setTimeout(function () {
              setOpenPopUp(false);
              if (resData?.data?.statusInfo == "limit-reached") {
                navigate("/pricing");
              }
            }, 3000);
          }
        })
        .catch((err) => { });
    } else {
      setMessage("Please fill out all mandatory fields");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
        if (type == "draft") {
          setIsDraftLoading(false);
        } else if (type == "post") {
          setIsLoading(false);
        }
      }, 2000);
    }
  };

  const handlePortofolioDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

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

        setOpenPopUp(true);
        setTimeout(function () {
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

      uploadFile(fileData);
    }
  };
  const [profileFile, setProfileFile] = useState(null);

  const handleProfileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

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

        setProfileFile(fileObj);

        setOpenPopUp(true);
        setTimeout(function () {
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
    if (selectedPaymentOption === "fixed") {
      const data = {
        label: "fixed",
        amount: amount,
      };
      return data;
      // Perform API call with data
    } else {
      const data = {
        label: "range",
        minPay: minimumPaymnt,
        maxPay: maximumPayment,
      };

      // Perform API call with data
      return data;
    }
  };

  const [selectedTab, setSelectedTab] = useState("create-job");

  const handleJobTabs = (e) => {
    setSelectedTab(e.target.value);
  };

  useEffect(() => { }, [showQuestions, employmentError, isDuplicateJob]);

  const handleButtonClick = (data) => {
    setShowSidebar(!showSidebar);
  };

  const [skills, setSkills] = useState([]);
  const [skillInputValue, setSkillInputValue] = useState("");

  const handleKeyDown = (e) => {
    //
    setSkillInputValue(e.inputProps.value);
    if (e.key === "Enter") {
      addSkill();
    }
  };
  const addSkillCall = () => {
    addSkill();
  };
  const addSkill = () => {
    if (skillInputValue?.trim() !== "") {
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
    if (skills.length > 0) {
      setSkillError(false);
    }
  }, [skills]);
  useEffect(() => { }, [skills]);

  const skillsListing = [
    { title: "Actor" },
    { title: "Animator" },
    { title: "Architect " },
    { title: "Artist" },
    { title: "Blogger/Vlogger" },
    { title: "Careers Coach" },
    { title: "Cartoonist" },
    { title: "Celebrity" },
    { title: "Chef/Culinary Artist" },
    { title: "Choreographer" },
    { title: "Cinematographer" },
    { title: "Comedian" },
    { title: "Copywriter" },
    { title: "Craftsperson" },
    { title: "Creator" },
    { title: "Curator" },
    { title: "Dance Teacher" },
    { title: "Dancer" },
    { title: "Designer " },
    { title: "Dietitian " },
    { title: "DJ" },
    { title: "Driving Instructor" },
    { title: "Event Planner" },
    { title: "Fashion Designer" },
    { title: "Filmmaker" },
    { title: "Graphic Designer" },
    { title: "Hair & Makeup Artist" },
    { title: "Host/MC" },
    { title: "Illustrator" },
    { title: "Influencer" },
    { title: "Interior Designer" },
    { title: "Life Coach" },
    { title: "Martial Arts Instructor" },
    { title: "Meditation Teacher" },
    { title: "Model" },
    { title: "Music Teacher" },
    { title: "Musician" },
    { title: "Nail Artist" },
    { title: "Nutritionist " },
    { title: "Personal Trainer" },
    { title: "Photographer" },
    { title: "Podcaster" },
    { title: "Public Speaker" },
    { title: "Radio Jockey (RJ)" },
    { title: "Sculptor" },
    { title: "Singer" },
    { title: "Sports Instructor" },
    { title: "Stylist" },
    { title: "Sustainability Consultant" },
    { title: "Swimming Instructor" },
    { title: "Tattooist" },
    { title: "Voice-over Artist" },
    { title: "Web Designer/Developer" },
    { title: "Wedding Planner" },
    { title: "Writer" },
    { title: "Yoga Instructor" },
    { title: "Video Jockey (VJ)" },
    { title: "Videographer" },
  ];

  const [lastdateApply, setLastdateApply] = useState(null);

  // const handleDateChange = (date) => {
  //   // Format the date to ensure it's correctly parsed and displayed
  //   setDeadlineError(false);
  //   const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  //   setLastdateApply(formattedDate);
  //   // Set the DOB state and calculate the age
  //   setDob(formattedDate);
  //   let dobDate = new Date(formattedDate);
  //   let today = new Date();
  //   let diff = today - dobDate;
  //   let ageInYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  //   setAge(String(ageInYears));
  //   setDobError(false);
  // };
  const handleDateChange = (date) => {
    if (!date) return;

    setDeadlineError(false);

    // Get local date without timezone shift
    const localDate = new Date(date);
    localDate.setHours(0, 0, 0, 0); // Set time to midnight

    // Convert to ISO format without shifting time
    const formattedDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    ).toISOString();

    setLastdateApply(formattedDate); // Store this in DB

    // Also update DOB and Age
    setDob(formattedDate);
    let today = new Date();
    let ageInYears = today.getFullYear() - localDate.getFullYear();
    setAge(String(ageInYears));
    setDobError(false);
  };

  useEffect(() => { }, [lastdateApply]);
  useEffect(() => { }, [category]);

  useEffect(() => {
    if (minAge && maxAge && parseInt(minAge) > parseInt(maxAge)) {
      setMinAgeError("Minimum age cannot be greater than maximum age.");
    } else {
      setMinAgeError(""); // Clear error if valid
    }

    if (maxAge && minAge && parseInt(maxAge) < parseInt(minAge)) {
      setMaxAgeError("Maximum age cannot be less than minimum age.");
    } else {
      setMaxAgeError(""); // Clear error if valid
    }
  }, [minAge, maxAge]);

  const onMinChange = (e) => {
    const value = e.target.value;
    // Allow only positive numbers or empty string (in case the user is deleting the input)
    if (/^\d*$/.test(value)) {
      setMinAge(value);
    }
  };
  const onMaxChange = (e) => {
    const value = e.target.value;
    // Allow only positive numbers or empty string
    if (/^\d*$/.test(value)) {
      setMaxAge(value);
    }
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

  const duplicateJob = () => {
    if (editJobData) {
      setSelectedTab("create-job");
      setCategory(editJobData?.category);
      setEmploymentType(editJobData?.employmentType);
      setLastdateApply(editJobData?.lastDateForApply);
      setSkills(editJobData?.skills);
      setMinAge(editJobData?.minAge);
      setMaxAge(editJobData?.maxAge);
      setjobTitle(editJobData?.jobTitle);
      setAgeRange(editJobData?.age);
      setzipCode(editJobData?.jobLocation);
      setstreetAddress(editJobData?.streetAddress);
      setjobType(editJobData?.jobType);
      setGender(editJobData?.gender);
      setWhyWorkWithUs(editJobData?.whyWorkWithUs);
      setSelectedApplyOption(editJobData?.selectedApplyOption);
      setHiringCompany(editJobData?.hiringCompany);
      setSelectedBenefits(editJobData?.benefits);
      setSelectedApplyOption(editJobData?.howLikeToApply);
      setPortofolioFile(editJobData?.workSamples);
      setJobCurrency(editJobData?.jobCurrency);
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
      setYouTubeMin(editJobData?.youTubeMin);
      setYouTubeMax(editJobData?.youTubeMax);
      setCountry(editJobData.country);
      setState(editJobData.state);
      getStates(editJobData.country);
      setKidsCity(editJobData.city);
      setApplyDescription(editJobData?.applyDescription);

      const genderUpdatedOptions = editJobData?.gender.map((gender) => {
        return gendersList.find((option) => option?.label === gender);
      });

      setSelectedGenderOptions(genderUpdatedOptions);

      const selectedOptions = editJobData?.languages.map((language) => {
        return languagesList.find((option) => option?.label === language);
      });

      setSelectedLanguageOptions(selectedOptions);

      if (nationalitiesList?.length > 0) {
        const selectedNationalities = editJobData?.nationality?.map(
          (language) => {
            return nationalitiesList.find(
              (option) => option?.label === language
            );
          }
        );
        setSelectedNationalityOptions(selectedNationalities);
      }

      // if (nationalitiesList.length > 0) {
      //   const nationalitiesList = editJobData?.nationality?.map((language) => {
      //     return nationalitiesList.find((option) => option?.label === language);
      //   });
      //   setSelectedNationalityOptions(nationalitiesList);
      // }

      const dynamicKey = Object.keys(editJobData.compensation)[0];
      const minPayValue = editJobData.compensation[dynamicKey].minPay;
      setMinPay(minPayValue);
      const maxPaydynamicKey = Object.keys(editJobData.compensation)[0];
      const maxPayValue = editJobData.compensation[maxPaydynamicKey].maxPay;
      setMaxPay(maxPayValue);

      const currencydynamicKey = Object.keys(editJobData.compensation)[0];
      const currencyValue =
        editJobData.compensation[currencydynamicKey].currency;
      setCurrency(currencyValue);

      const frequencydynamicKey = Object.keys(editJobData.compensation)[0];
      const frequencyValue =
        editJobData.compensation[frequencydynamicKey].frequency;

      getCities({
        countryName: editJobData.country,
        stateName: editJobData.state,
      });
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
        setExactPay(editJobData?.compensation?.paid_collaboration?.exactPay);
        setfrequency(editJobData?.compensation?.paid_collaboration?.frequency);
      } else if (
        editJobData?.compensation.hasOwnProperty("paid_collaboration")
      ) {
        setCompensationChange("paid_collaboration");
        setType(editJobData?.compensation?.paid_collaboration?.type);
        setCurrency(editJobData?.compensation?.paid_collaboration?.currency);
        setExactPay(editJobData?.compensation?.paid_collaboration?.exactPay);
        setfrequency(editJobData?.compensation?.paid_collaboration?.frequency);
      } else if (editJobData?.compensation.hasOwnProperty("product_gift")) {
        setCompensationChange("product_gift");
        setProductName(editJobData?.compensation?.product_gift?.product_name);
        setValueUSD(editJobData?.compensation?.product_gift?.amount_value);
        setExactPay(editJobData?.compensation?.paid_collaboration?.exactPay);
        setfrequency(editJobData?.compensation?.paid_collaboration?.frequency);
      }
      if (editJobData?.paymentType?.label === "range") {
        setSelectedPaymentOption("range");
        setMinPay(editJobData?.paymentType?.minPay);
        setMaxPay(editJobData?.paymentType?.maxPay);
      } else if (editJobData?.paymentType?.label === "fixed") {
        setSelectedPaymentOption("fixed");
        setAmount(editJobData?.paymentType?.amount);
      }
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

      //aadeddd

      const applyDescriptionhtmlContent = editJobData?.applyDescription[0];
      const applyDescriptionContentBlocks = convertFromHTML(
        applyDescriptionhtmlContent
      );
      const applyDescriptionContentState = ContentState.createFromBlockArray(
        applyDescriptionContentBlocks
      );
      const updateApplyDescription = EditorState.createWithContent(
        applyDescriptionContentState
      );
      setEditorStateApplyDescription(updateApplyDescription);
      setApplyDescription(editJobData?.applyDescription);

      //adeddd
      const whyWorkWithUsContent = editJobData?.whyWorkWithUs[0];
      const whyWorkWithUsContentBlocks = convertFromHTML(whyWorkWithUsContent);
      const whyWorkWithUsContentState = ContentState.createFromBlockArray(
        whyWorkWithUsContentBlocks
      );
      const updatewhyWorkWithUs = EditorState.createWithContent(
        whyWorkWithUsContentState
      );
      setEditorStateWhyWorkWithUs(updatewhyWorkWithUs);
      setWhyWorkWithUs(editJobData?.whyWorkWithUs);

      const hiringCompanyDescriptionContent =
        editJobData?.hiringCompanyDescription[0];
      const hiringCompanyDescriptionContentBlocks = convertFromHTML(
        hiringCompanyDescriptionContent
      );
      const hiringCompanyDescriptionContentState =
        ContentState.createFromBlockArray(
          hiringCompanyDescriptionContentBlocks
        );
      const hiringCompanyDescription = EditorState.createWithContent(
        hiringCompanyDescriptionContentState
      );
      setEditorStateClientDescription(hiringCompanyDescription);
      setClientDescription(editJobData?.hiringCompanyDescription);

      setfrequency(frequencyValue);
    }
  };

  return (
    <>
      <>
        <BrandHeader toggleMenu={toggleMenu} />
        <div
          id="sidebarBrand"
          className={`brand-sidebar ${showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
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
                isDuplicateJob === true &&
                "Duplicate Existing Job"}
            </div>
            <div className="mandatory-label">
              <span style={{ color: "red" }}>*</span> marked fields are
              mandatory
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
                {editData?.value && editJobData && isDuplicateJob === false && (
                  <>
                    <label className="create-job-toggle-label" htmlFor="newjob">
                      Edit Job
                    </label>
                  </>
                )}
                {!editJobData && (
                  <>
                    <label className="create-job-toggle-label" htmlFor="newjob">
                      Create New Job
                    </label>
                  </>
                )}

                {editJobData && isDuplicateJob === true && (
                  <>
                    <label className="create-job-toggle-label" htmlFor="newjob">
                      Create New Job
                    </label>
                  </>
                )}

                {/* {editJobData && isDuplicateJob === true && (
                  <>
                    <label className="create-job-toggle-label" htmlFor="newjob">
                      Duplicate Job
                    </label>
                  </>
                )} */}

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
                  className="dialog-body mt-0 mobile-mb-0"
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
                            Company / Client Category
                            
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
                                Select Company / Client Category
                              </option>
                              {categoryList.map((option, index) => (
                                <option
                                  key={index}
                                  value={option?.value}
                                  title={option?.description}
                                >
                                  {option?.value}
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
                              className="cs-select"
                              placeholder="Search country..."
                              options={countryList.map((country, index) => ({
                                value: country,
                                label: country,
                                key: index,
                              }))}
                              value={{ value: country, label: country }}
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
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className="mb-0">
                            <label className="form-label">State</label>
                            <Select
                              className="cs-select"
                              placeholder="Select state..."
                              options={stateList?.map((state) => ({
                                value: state.stateId, // or whatever unique identifier you want to use
                                label: state.name,
                              }))}
                              value={{ value: state, label: state }}
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
                        </div>
                      </div>
                      <div className="kids-form-row row">
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className="mb-0">
                            <label className="form-label">City</label>
                            <Select
                              className="cs-select"
                              placeholder="Select City..."
                              options={cityList?.map((city) => ({
                                value: city.cityId, // or whatever unique identifier you want to use
                                label: city.name,
                              }))}
                              value={{ value: kidsCity, label: kidsCity }}
                              onChange={handleSelectedCity}
                              isSearchable={true}
                              styles={customStylesProfession}
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
                            <option value="On site" defaultValue>
                              On site
                            </option>
                            <option value="Remote">Remote</option>
                            <option value="Work from anywhere">
                              Work from anywhere
                            </option>
                            <option value="Hybrid">Hybrid</option>
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
                              {jobTypeOptions?.map((option, index) => (
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
                              "link",
                            ],
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            textAlign: {
                              inDropdown: true,
                              options: ["left", "center", "right", "justify"],
                            }, // Ensure 'justify' is present
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
                                handleDateChange(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              disablePast
                            />
                          </LocalizationProvider>
                          {deadlineError && (
                            <div className="invalid-fields">
                              Please select Application Deadline
                            </div>
                          )}
                        </div>
                        <div className="kids-form-section col-md-6 mb-3">
                          <label className="form-label mb-2">
                            Profession/Skills
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
                                  options={professionList?.map(
                                    (option) => option.value
                                  )}
                                  value={skillInputValue}
                                  onChange={(event, newValue) => {
                                    setSkillInputValue(newValue);
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Search or add input"
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
                            {skillError && (
                              <div className="invalid-fields">
                                Please select Profession/Skills
                              </div>
                            )}
                          </div>

                          <div className="skills-section">
                            {skills?.map((skill, index) => (
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
                          Additional Requirement (optional)
                          <br />
                          <span
                            className="note"
                            style={{ fontSize: "0.875rem", color: "#6c757d" }}
                          >
                            Note: Target the exact talent/creators you need by
                            adding these additional requirements below.
                          </span>
                        </label>
                      </div>
                      <div className="kids-form-row row">
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className="rangeWidth">
                            <label className="form-label">Age Range</label>
                            <div className="creators-filter-select creator-age-wrapper">
                              <div className="age-inputs ">
                                {" "}
                                <input
                                  type="number"
                                  className="form-control "
                                  value={minAge}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Check if the value is a valid number and is non-negative
                                    if (
                                      /^\d*\.?\d*$/.test(value) &&
                                      (value >= 0 || value === "")
                                    ) {
                                      onMinChange(e);
                                    }
                                  }}
                                  placeholder="Minimum Age"
                                  min="0"
                                ></input>
                                {minAgeError && (
                                  <div className="invalid-fields">
                                    {minAgeError}
                                  </div>
                                )}{" "}
                              </div>

                              <div className="age-inputs ">
                                <input
                                  type="number"
                                  className="form-control  "
                                  value={maxAge}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Check if the value is a valid number and is non-negative
                                    if (
                                      /^\d*\.?\d*$/.test(value) &&
                                      (value >= 0 || value === "")
                                    ) {
                                      onMaxChange(e);
                                    }
                                  }}
                                  placeholder="Maximum Age"
                                  min="0"
                                ></input>
                                {maxAgeError && (
                                  <div className="invalid-fields">
                                    {maxAgeError}
                                  </div>
                                )}{" "}
                              </div>
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
                              options={gendersList}
                              valueField="value"
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={(value) => selectGender(value)}
                              styles={customStylesProfession}
                              value={selectedGenderOptions}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="kids-form-row row">
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
                          />
                        </div>
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className="">
                            <label className="form-label">Languages</label>

                            <Select
                              isMulti
                              name="colors"
                              options={languagesList}
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
                              <div className="creators-filter-select creator-age-wrapper">
                                <div className="age-inputs ">
                                  <input
                                    type="number"
                                    className="form-control "
                                    value={instaMin}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      // Check if the value is a valid number and is non-negative
                                      if (
                                        /^\d*\.?\d*$/.test(value) &&
                                        (value >= 0 || value === "")
                                      ) {
                                        onInstaMinChange(e);
                                      }
                                    }}
                                    placeholder="Minimum Followers"
                                    min="0"
                                  ></input>
                                  {instaMinError && (
                                    <div className="invalid-fields">
                                      {instaMinError}
                                    </div>
                                  )}{" "}
                                </div>
                                <div className="age-inputs ">
                                  <input
                                    type="number"
                                    className="form-control "
                                    value={instaMax}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      // Check if the value is a valid number and is non-negative
                                      if (
                                        /^\d*\.?\d*$/.test(value) &&
                                        (value >= 0 || value === "")
                                      ) {
                                        onInstaMaxChange(e);
                                      }
                                    }}
                                    placeholder="Maximum Followers"
                                    min="0"
                                  ></input>
                                  {instaMaxError && (
                                    <div className="invalid-fields">
                                      {instaMaxError}
                                    </div>
                                  )}{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-section col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                <i className="bi bi-tiktok followers-social-icons"></i>
                                TikTok Followers
                              </label>
                              <div className="creators-filter-select creator-age-wrapper">
                                <div className="age-inputs">
                                  <input
                                    type="number"
                                    className="form-control "
                                    value={tikTokMin}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      // Check if the value is a valid number and is non-negative
                                      if (
                                        /^\d*\.?\d*$/.test(value) &&
                                        (value >= 0 || value === "")
                                      ) {
                                        onTiktokMinChange(e);
                                      }
                                    }}
                                    placeholder="Minimum Followers"
                                    min="0"
                                  ></input>
                                  {tikTokMinError && (
                                    <div className="invalid-fields">
                                      {tikTokMinError}
                                    </div>
                                  )}{" "}
                                </div>

                                <div className="age-inputs">
                                  <input
                                    type="number"
                                    className="form-control "
                                    value={tikTokMax}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      // Check if the value is a valid number and is non-negative
                                      if (
                                        /^\d*\.?\d*$/.test(value) &&
                                        (value >= 0 || value === "")
                                      ) {
                                        onTiktokMaxChange(e);
                                      }
                                    }}
                                    placeholder="Maximum Followers"
                                    min="0"
                                  ></input>
                                  {tikTokMaxError && (
                                    <div className="invalid-fields">
                                      {tikTokMaxError}
                                    </div>
                                  )}{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-section col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                <i className="bi bi-linkedin followers-social-icons"></i>
                                LinkedIn Followers
                              </label>
                              <div className="creators-filter-select creator-age-wrapper">
                                <div className="age-inputs">
                                  <input
                                    type="number"
                                    className="form-control "
                                    value={linkedInMin}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      // Check if the value is a valid number and is non-negative
                                      if (
                                        /^\d*\.?\d*$/.test(value) &&
                                        (value >= 0 || value === "")
                                      ) {
                                        onLinkedInMinChange(e);
                                      }
                                    }}
                                    placeholder="Minimum Followers"
                                    min="0"
                                  ></input>
                                  {linkedInMinError && (
                                    <div className="invalid-fields">
                                      {linkedInMinError}
                                    </div>
                                  )}{" "}
                                </div>

                                <div className="age-inputs">
                                  <input
                                    type="number"
                                    className="form-control "
                                    value={linkedInMax}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      // Check if the value is a valid number and is non-negative
                                      if (
                                        /^\d*\.?\d*$/.test(value) &&
                                        (value >= 0 || value === "")
                                      ) {
                                        onLinkedInMaxChange(e);
                                      }
                                    }}
                                    placeholder="Maximum Followers"
                                    min="0"
                                  ></input>
                                  {linkedInMaxError && (
                                    <div className="invalid-fields">
                                      {linkedInMaxError}
                                    </div>
                                  )}{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-section col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                <i className="bi bi-facebook followers-social-icons"></i>
                                Facebook Followers
                              </label>
                              <div className="creators-filter-select creator-age-wrapper ">
                                <div className="age-inputs">
                                  <input
                                    type="number"
                                    className="form-control "
                                    value={fbMin}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      // Check if the value is a valid number and is non-negative
                                      if (
                                        /^\d*\.?\d*$/.test(value) &&
                                        (value >= 0 || value === "")
                                      ) {
                                        onFbMinChange(e);
                                      }
                                    }}
                                    placeholder="Minimum Followers"
                                    min="0"
                                  ></input>
                                  {fbMinError && (
                                    <div className="invalid-fields">
                                      {fbMinError}
                                    </div>
                                  )}{" "}
                                </div>

                                <div className="age-inputs">
                                  <input
                                    type="number"
                                    className="form-control "
                                    value={fbMax}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      // Check if the value is a valid number and is non-negative
                                      if (
                                        /^\d*\.?\d*$/.test(value) &&
                                        (value >= 0 || value === "")
                                      ) {
                                        onFbMaxChange(e);
                                      }
                                    }}
                                    placeholder="Maximum Followers"
                                    min="0"
                                  ></input>
                                  {fbMaxError && (
                                    <div className="invalid-fields">
                                      {fbMaxError}
                                    </div>
                                  )}{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-section col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                <i className="bi bi-twitter-x followers-social-icons"></i>
                                Twitter(X) Followers
                              </label>
                              <div className="creators-filter-select creator-age-wrapper ">
                                <div className="age-inputs">
                                  <input
                                    type="number"
                                    className="form-control "
                                    value={twitterMin}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      // Check if the value is a valid number and is non-negative
                                      if (
                                        /^\d*\.?\d*$/.test(value) &&
                                        (value >= 0 || value === "")
                                      ) {
                                        onTwitterMinChange(e);
                                      }
                                    }}
                                    placeholder="Minimum Followers"
                                    min="0"
                                  ></input>
                                  {twitterMinError && (
                                    <div className="invalid-fields">
                                      {twitterMinError}
                                    </div>
                                  )}{" "}
                                </div>

                                <div className="age-inputs">
                                  <input
                                    type="number"
                                    className="form-control "
                                    value={twitterMax}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      // Check if the value is a valid number and is non-negative
                                      if (
                                        /^\d*\.?\d*$/.test(value) &&
                                        (value >= 0 || value === "")
                                      ) {
                                        onTwitterMaxChange(e);
                                      }
                                    }}
                                    placeholder="Maximum Followers"
                                    min="0"
                                  ></input>
                                  {twitterMaxError && (
                                    <div className="invalid-fields">
                                      {twitterMaxError}
                                    </div>
                                  )}{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="kids-form-section col-md-6">
                            <div className="mb-4">
                              <label className="form-label">
                                <i className="bi bi-youtube followers-social-icons"></i>
                                Youtube
                              </label>
                              <div className="creators-filter-select creator-age-wrapper ">
                                <div className="age-inputs">
                                  <input
                                    type="number"
                                    className="form-control "
                                    value={youTubeMin}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      // Check if the value is a valid number and is non-negative
                                      if (
                                        /^\d*\.?\d*$/.test(value) &&
                                        (value >= 0 || value === "")
                                      ) {
                                        onYouTubeMinChange(e);
                                      }
                                    }}
                                    placeholder="Minimum Followers"
                                    min="0"
                                  ></input>
                                  {youTubeMinError && (
                                    <div className="invalid-fields">
                                      {youTubeMinError}
                                    </div>
                                  )}{" "}
                                </div>
                                <div className="age-inputs">
                                  <input
                                    type="number"
                                    className="form-control "
                                    value={youTubeMax}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      // Check if the value is a valid number and is non-negative
                                      if (
                                        /^\d*\.?\d*$/.test(value) &&
                                        (value >= 0 || value === "")
                                      ) {
                                        onYouTubeMaxChange(e);
                                      }
                                    }}
                                    placeholder="Maximum Followers"
                                    min="0"
                                  ></input>
                                  {youTubeMaxError && (
                                    <div className="invalid-fields">
                                      {youTubeMaxError}
                                    </div>
                                  )}{" "}
                                </div>
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
                              {questions?.map((question, index) => (
                                <div className=" mb-2" key={index}>
                                  <label className="form-label mb-2">{`Question ${index + 1
                                    }:`}</label>
                                  <div className="question-input-wrapper">
                                    <input
                                      type="text"
                                      className="form-control "
                                      placeholder={`Enter Question ${index + 1
                                        }`}
                                      value={question}
                                      id={`question${index + 1}`}
                                      onChange={(event) =>
                                        handleQuestionChange(index, event)
                                      }
                                    />
                                    <div className="trash pl-2">
                                      <i
                                        onClick={() =>
                                          handleDeleteQuestion(index)
                                        }
                                        className="bi bi-trash ml-2"
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <div
                                className="add-more-questions"
                                onClick={handleAddQuestion}
                                style={{ cursor: "pointer" }}
                              >
                                <i className="bi bi-plus-square-fill"></i>
                                <div className="add-more-questions-text">
                                  Add More
                                </div>
                              </div>
                              {/* <div
                                className="add-more-questions "
                                onClick={handleAddQuestion}
                                
                              >
                                <i className="bi bi-plus-square-fill"></i>

                                <div className="add-more-questions-text">
                                  {" "}
                                  Add More
                                </div>
                              </div> */}
                            </div>
                          )}
                        </div>

                        <div className="mb-0 row">
                          <div className="kids-form-section col-md-12 mb-3">
                            <label className="form-label">
                              Benefits <span className="mandatory">*</span>
                            </label>
                            <div className="benefits-wrapper">
                              {benefitsList?.map((benefit, index) => (
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
                                  Paid Collaboration + Product/Gift
                                </label>
                              </div>
                              <div className="mt-3">
                                {selectedOption === "paid_collaboration" && (
                                  <div className="compensation-row row ">
                                    <div className="kids-form-section col-md-3 mb-3 pr-sp">
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
                                        <div className="kids-form-section col-md-3 mb-3 pr-sp">
                                          <div className="">
                                            <label className="form-label">
                                              Exact Pay
                                            </label>
                                            <div className="creators-filter-select creator-age-wrapper">
                                              <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Exact Pay"
                                                value={exactPay}
                                                onChange={(e) => {
                                                  onExactPayChange(e);
                                                }}
                                                min={1}
                                              ></input>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                    {type == "pay_range" && (
                                      <>
                                        <div className="kids-form-section col-md-3 mb-3 pr-sp">
                                          <div className="payWidth">
                                            <label className="form-label">
                                              Minimum Pay
                                            </label>
                                            <div className="creators-filter-select creator-age-wrapper">
                                              <div>
                                                <input
                                                  type="number"
                                                  className="form-control"
                                                  placeholder="Minimum Pay"
                                                  value={minPay}
                                                  onChange={(e) => {
                                                    onMinPayChange(e);
                                                  }}
                                                  min={1}
                                                ></input>
                                                {minPayError && (
                                                  <div className="invalid-fields">
                                                    {minPayError}
                                                  </div>
                                                )}{" "}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="kids-form-section col-md-3 mb-3 pr-sp">
                                          <div className="payWidth">
                                            <label className="form-label">
                                              Maximum Pay
                                            </label>
                                            <div className="creators-filter-select creator-age-wrapper">
                                              <div>
                                                <input
                                                  type="number"
                                                  className="form-control"
                                                  placeholder="Maximum Pay"
                                                  value={maxPay}
                                                  onChange={(e) => {
                                                    onMaxPayChange(e);
                                                  }}
                                                  min={1}
                                                ></input>
                                                {maxPayError && (
                                                  <div className="invalid-fields">
                                                    {maxPayError}
                                                  </div>
                                                )}{" "}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}

                                    <div className="kids-form-section col-md-3 mb-3 pr-sp">
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
                                          {currencyList?.map(
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
                                          {frequencyOptions?.map(
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
                                    <div className="kids-form-section col-lg-4 col-md-4 mb-3 pr-sp">
                                      <div className="">
                                        <label className="form-label">
                                          Product/Gift Name (or) Product link
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={productName}
                                          onChange={handleProductNameChange}
                                          placeholder="Enter Product/Gift Name (or) Product link"
                                        ></input>
                                      </div>
                                    </div>

                                    <div className="kids-form-section col-lg-3 col-md-3 mb-3 pr-sp">
                                      <div className="">
                                        <label className="form-label">
                                          Product/Gift Value
                                        </label>
                                        <div className="creators-filter-select creator-age-wrapper">
                                          <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Product/Gift Value"
                                            value={productValue}
                                            onChange={(e) => {
                                              handleProductValueChange(e);
                                            }}
                                            min={0}
                                          ></input>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="kids-form-section col-lg-3 col-md-3 mb-3 pr-sp">
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
                                          {currencyList?.map(
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
                                    <div className="kids-form-section col-lg-2 col-md-3 mb-3">
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
                                          {frequencyOptions?.map(
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
                                        <div className="kids-form-section col-md-3 mb-3 pr-sp">
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
                                            <div className="kids-form-section col-md-3 mb-3 pr-sp">
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
                                            <div className="kids-form-section col-md-3 mb-3 pr-sp">
                                              <div className="payWidth">
                                                <label className="form-label">
                                                  Minimum Pay
                                                </label>
                                                <div className="creators-filter-select creator-age-wrapper">
                                                  <div>
                                                    <input
                                                      type="number"
                                                      className="form-control"
                                                      placeholder="Minimum Pay"
                                                      value={minPay}
                                                      onChange={(e) => {
                                                        onMinPayChange(e);
                                                      }}
                                                      min={1}
                                                    ></input>
                                                    {minPayError && (
                                                      <div
                                                        className="invalid-fields"
                                                        style={{}}
                                                      >
                                                        {minPayError}
                                                      </div>
                                                    )}{" "}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="kids-form-section col-md-3 mb-3 pr-sp">
                                              <div className="payWidth">
                                                <label className="form-label">
                                                  Maximum Pay
                                                </label>
                                                <div className="creators-filter-select creator-age-wrapper">
                                                  <div>
                                                    <input
                                                      type="number"
                                                      className="form-control"
                                                      placeholder="Maximum Pay"
                                                      value={maxPay}
                                                      onChange={(e) => {
                                                        onMaxPayChange(e);
                                                      }}
                                                      style={{}}
                                                      min={1}
                                                    ></input>
                                                    {maxPayError && (
                                                      <div
                                                        className="invalid-fields"
                                                        style={{}}
                                                      >
                                                        {maxPayError}
                                                      </div>
                                                    )}{" "}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                        <div className="kids-form-section col-md-3 mb-3 pr-sp">
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
                                              {currencyList?.map(
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
                                        <div className="kids-form-section col-md-3 mb-3 pr-sp">
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
                                              {frequencyOptions?.map(
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
                                        <div className="kids-form-section col-md-4 mb-3 pr-sp">
                                          <div className="">
                                            <label className="form-label">
                                              Product/Gift Name (or) Product link
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              value={productName}
                                              onChange={handleProductNameChange}
                                              placeholder="Enter Product/Gift Name (or) Product link"
                                            ></input>
                                          </div>
                                        </div>
                                        <div className="kids-form-section col-md-3 mb-3 pr-sp">
                                          <div className="">
                                            <label className="form-label">
                                              Product/Gift Value
                                            </label>
                                            <div className="creators-filter-select creator-age-wrapper">
                                              <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Product/Gift Value"
                                                value={productValue}
                                                onChange={(e) => {
                                                  handleProductValueChange(e);
                                                }}
                                                min={0}
                                              ></input>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="kids-form-section col-md-3 mb-3 pr-sp">
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
                                              {currencyList?.map(
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
                                        <div className="kids-form-section col-md-2 mb-3">
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
                                              {frequencyOptions?.map(
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
                    {[brandData?.brandName]?.map((option, index) => (
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
                        "link",
                      ],
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: {
                        inDropdown: true,
                        options: ["left", "center", "right", "justify"],
                      }, // Ensure 'justify' is present
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
                        "link",
                      ],
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: {
                        inDropdown: true,
                        options: ["left", "center", "right", "justify"],
                      }, // Ensure 'justify' is present
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                    }}
                  />
                </div>

                <div className="kids-form-section col-md-12 mb-3">
                  <label className="form-label">
                    How Would You Like to Receive Applications?
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
                        checked={selectedApplyOption === "how_to_apply"}
                        onChange={handleApplyOption}
                      />
                      <label
                        className="compensation-labels form-label"
                        htmlFor="how_apply"
                      >
                        How to Apply
                      </label>
                    </div>

                    {selectedApplyOption === "how_to_apply" && (
                      <div className="rich-editor mb-4">
                        <Editor
                          editorState={editorStateApplyDescription}
                          editorStyle={{ overflow: "hidden" }}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onEditorStateChange={onEditorApplyDescription}
                          toolbar={{
                            options: [
                              "inline",
                              "blockType",
                              "fontSize",
                              "list",
                              "textAlign",
                              "history",
                              "link",
                            ],
                            inline: { inDropdown: true },
                            list: { inDropdown: true },
                            textAlign: {
                              inDropdown: true,
                              options: ["left", "center", "right", "justify"],
                            },
                            link: { inDropdown: true },
                            history: { inDropdown: true },
                          }}
                        />
                      </div>
                    )}
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
                    {portofolioFile?.map((item, index) => {
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

                <div className="create-job-buttons mt-4 mb-2 justify-content-center">
                  {/* Render the "Preview & Save Draft" button only if not editing */}
                  {!editData?.value && (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        createGigs("draft");
                      }}
                      className="createjob-btn"
                    >
                      {isDraftLoading ? "Loading..." : "Save Draft"}
                    </div>
                  )}

                  {/* Render the "Update Job" button only if editing */}
                  {editData?.value && (
                    <div
                      className="createjob-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        updateJob();
                      }}
                    >
                      Update Job
                    </div>
                  )}

                  {/* <div className="create-job-buttons mt-4 mb-2 justify-content-center">
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      createGigs();
                    }}
                    className="createjob-btn"
                  >
                    Preview & Save Draft
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
                  )} */}
                  {!editData?.value && (
                    <>
                      <div
                        className="createjob-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          createGigs("post");
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
                              options={allJobsList?.map((job) => ({
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

                      <div className="create-job-buttons mt-4 mb-2 justify-content-center">
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
