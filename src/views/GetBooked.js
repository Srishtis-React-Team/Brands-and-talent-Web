import React, { useEffect, useState, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import { useNavigate, useParams } from "react-router-dom";
import PopUp from "../components/PopUp.js";
import "../assets/css/talent-dashboard.css";
import { styled } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Select from "react-select";
import Header from "../layout/header.js";
import useFieldDatas from "../config/useFieldDatas.js";
import Loader from "./Loader.js";
const GetBooked = () => {
  const { categoryList, professionList } = useFieldDatas();
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [kidsCity, setKidsCity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    await ApiHelper.get(API.listCountries)
      .then((resData) => {
        if (resData) {
          setCountryList(resData.data.data);
        }
      })
      .catch((err) => { });
  };

  const employmentTypeList = [
    "Full Time",
    "Part Time",
    "Per Diem",
    "Contractor",
    "Temporary",
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
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
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

  const handleSelectedCountry = (event) => {
    setCountry(event?.value);
    getStates(event?.value);
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

  const navigate = useNavigate();
  const offcanvasRef = useRef(null);
  const [gigsList, setGigsList] = useState([]);
  const [currentUserId, setcurrentUserId] = useState(null);
  const [currentUser_image, setCurrentUserImage] = useState("");
  const [currentUser_type, setCurrentUserType] = useState("");

  const sliderIcon = require("../assets/icons/sliders.png");
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "50px",
    }),
    menu: (provided, state) => ({
      ...provided,
      maxHeight: "500px",
      zIndex: 9999,
    }),
  };
  const jobImage = require("../assets/icons/jobImage.png");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [skillsList, setSkillsList] = useState([]);

  const url = window.location.href;

  useEffect(() => {
    setcurrentUserId(localStorage.getItem("currentUser"));
    setCurrentUserImage(localStorage.getItem("currentUserImage"));
    setCurrentUserType(localStorage.getItem("currentUserType"));
  }, [currentUserId]);

  useEffect(() => {
    getRecentGigs();
  }, []);

  const { jobId } = useParams(); // Extract jobId if available

  useEffect(() => {
    if (!jobId) {
      console.log("No jobId provided, showing general booking page.");
      // If no jobId, you can show a default message or redirect if necessary
    } else {
      console.log(`JobId received: ${jobId}`);
    }
  }, [jobId, navigate]);

  const getRecentGigs = async () => {
    setLoading(true);
    // alert("getRecentGigs");
    const formData = {
      talentId: localStorage.getItem("userId"),
      jobId: "",
    };
    await ApiHelper.post(API.getPostedJobs, formData)
      .then((resData) => {
        setLoading(false);
        if (resData) {
          setGigsList(resData.data.data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const [modalData, setModalData] = useState(null);

  const applyjobs = async (data) => {
    if (!currentUserId) {
      setMessage("You must be logged in");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
        navigate("/login");
      }, 1000);
    } else if (currentUserId && currentUser_type == "talent") {
      setModalData(data);
      if (data?.isApplied != "Applied") {
        const modalElement = document.getElementById("applyModal");
        const bootstrapModal = new window.bootstrap.Modal(modalElement);
        bootstrapModal.show();
      }
    } else if (currentUserId && currentUser_type == "brand") {
      setMessage("Login as an talent to use this feature");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
        navigate("/login");
      }, 1000);
    }
  };
  const viewJob = async (jobId) => {
    if (!currentUserId) {
      setMessage("You must be logged in");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
        navigate("/login");
      }, 1000);
    } else if (currentUserId && currentUser_type == "talent") {
      navigate("/preview-job-talent", {
        state: {
          jobId: jobId,
        },
      });
    } else if (currentUserId && currentUser_type == "brand") {
      setMessage("Login as an talent to use this feature");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
        navigate("/login");
      }, 1000);
    }
  };
  const shareJob = async (item) => {
    // const jobUrl = `https://brandsandtalent.com/jobs/view/${jobId}`;
    // const jobUrl = `http://localhost:3000/jobs/view/${jobId}`;
    console.log("item",item)
    const jobUrl = `${window.location.origin}/jobs/view/${item.jobTitle}/${item.jobId}`;

    try {
      await navigator.clipboard.writeText(jobUrl);
      // alert("Job link copied to clipboard!"); // Optional: Show feedback to the use
      setMessage("Job link copied to clipboard!");
      setOpenPopUp(true);
      setTimeout(function () {
        setOpenPopUp(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCloseModal = async () => {
    const formData = {
      talentId: talentId,
      brandId: modalData?.brandId,
      gigId: modalData?._id,
    };
    await ApiHelper.post(API.applyjobs, formData)
      .then((resData) => {
        setMessage("Job applied Successfully");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          getRecentGigs();
          const modalElement = document.getElementById("applyModal");
          const bootstrapModal = new window.bootstrap.Modal(modalElement);
          bootstrapModal.hide();
        }, 1000);
      })
      .catch((err) => { });
  };

  const [talentId, setTalentId] = useState(null);

  useEffect(() => {
    setTalentId(localStorage.getItem("userId"));
  }, [talentId]);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ageList = ["4-17", "18+"];
  const selectedSkillsRef = useRef([]);

  const selectSkills = (selectedOptions) => {
    if (!selectedOptions || selectedOptions.length === 0) {
      selectedSkillsRef.current = []; // Clear the selected skills
    } else {
      selectedSkillsRef.current = selectedOptions.map((option) => option.value);
    }
  };
  const applyFilter = async () => {
    let key_word;
    let job_location;
    let job_age;
    let job_full_name;
    let job_type;
    let work_place_type;
    let job_name;
    let category;
    let employment_type;

    var selectElement = document.getElementById("workPlaceSelect");
    work_place_type = selectElement?.value;
    var selectJobElement = document.getElementById("jobtypeID");
    job_type = selectJobElement?.value;
    var selectEmploymentElement = document.getElementById("employmentTypeID");
    employment_type = selectEmploymentElement?.value;
    var selectAgeElement = document.getElementById("ageSelectID");
    job_age = selectAgeElement?.value;
    var selectCategoryElement = document.getElementById("selectedCategoryID");
    category = selectCategoryElement?.value;
    if (keyWordRef.current) {
      key_word = keyWordRef?.current?.value;
    }
    if (jobLocationRef?.current) {
      job_location = jobLocationRef?.current?.value;
    }
    if (jobNameRef?.current) {
      job_name = jobNameRef?.current?.value;
    }
    if (jobFullNameRef?.current) {
      job_full_name = jobFullNameRef?.current?.value;
    }

    const formData = {
      keyword: key_word,
      jobTitle: job_name,
      jobLocation: job_location,
      age: job_age,
      jobType: job_type,
      workPlaceType: work_place_type,
      skills: selectedSkillsRef?.current,
      talentId: talentId,
      category: category,
      employmentType: employment_type,
      country: country,
      state: state,
      city: kidsCity,
    };

    setIsLoading(true);
    await ApiHelper.post(API.searchJobs, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setGigsList(resData.data.data);
          setMessage("Filtered Successfully");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("No Matching Users Found");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => { });

    setOpen(false);
  };

  const keyWordRef = useRef(null);
  const jobLocationRef = useRef(null);
  const jobNameRef = useRef(null);
  const jobAgeRef = useRef(null);
  const jobFullNameRef = useRef(null);

  const jobTypeOptions = [
    "Full-Time",
    "Part-Time",
    "Per Diem",
    "Contractor",
    "Temporary",
    "Other",
  ];

  useEffect(() => {
    getSkills();
  }, []);

  const getSkills = async () => {
    await ApiHelper.get(API.getSkills)
      .then((resData) => {
        if (resData.data.status === true) {
          setSkillsList(resData.data.data);
        }
      })
      .catch((err) => { });

    setOpen(false);
  };

  const addToSavedJobs = async (data) => {
    const formData = {
      gigId: data?._id,
      brandId: data?.brandId,
      talentId: talentId,
    };
    await ApiHelper.post(API.updateFavouriteJobs, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Job Saved Successfully");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getRecentGigs();
          }, 1000);
        }
      })
      .catch((err) => {
        if (!currentUserId) {
          setMessage("You must be logged in");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getRecentGigs();
            navigate("/login");
          }, 3000);
        }
      });

    setOpen(false);
  };
  const removeFromSavedJobs = async (data) => {
    const formData = {
      gigId: data?._id,
      talentId: talentId,
    };
    await ApiHelper.post(API.removeFavouritesJob, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Removed From Saved Jobs");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            getRecentGigs();
          }, 1000);
        }
      })
      .catch((err) => {
        setMessage("Error Occured Try Again");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
      });

    setOpen(false);
  };

  return (
    <>
      <Header />
      <div className="container-fluid get-booked-main">
        <div className="row talent-dashboard-main justify-content-center">
          <div className="col-md-8 col-lg-8">
            <div className="talent-column-one">
              <div className="filter-text-wrapper">
                <div className="recent-gigs-title">Get Booked</div>
                <React.Fragment>
                  <div className="header-filter-icon" onClick={handleClickOpen}>
                    Filter Jobs
                    <img className="filter-icon" src={sliderIcon} alt="" />
                  </div>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      component: "form",
                      onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;

                        handleClose();
                      },
                    }}
                  >
                    <div className="gift-dialog-header">
                      <DialogTitle>Filter</DialogTitle>
                      <i
                        className="bi bi-x-lg close-gift"
                        onClick={handleClose}
                      ></i>
                    </div>
                    <DialogContent>
                      <div className="search-filter-section">
                        <div className="kids-form-row row">
                          <div className="kids-form-section col-md-6 mb-3">
                            <label className="form-label">Keywords</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Keyword"
                              ref={keyWordRef}
                            ></input>
                          </div>

                          <div className="kids-form-section col-md-6 mb-3">
                            <label className="form-label">Category</label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              style={{ fontSize: "14px" }}
                              id="selectedCategoryID"
                            >
                              <option value="" disabled selected>
                                Select Category
                              </option>
                              {categoryList.map((option, index) => (
                                <option key={index} value={option?.value}>
                                  {option?.value}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="kids-form-row row">
                        <div className="kids-form-section col-md-6 mb-3">
                          <label className="form-label">Country</label>
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
                        </div>
                        <div className="kids-form-section col-md-6 mb-3">
                          <label className="form-label">State</label>
                          <Select
                            placeholder="Select state..."
                            options={stateList.map((state) => ({
                              value: state.stateId,
                              label: state.name,
                            }))}
                            value={state?.label}
                            onChange={handleSelectedState}
                            isSearchable={true}
                            styles={customStylesProfession}
                          />
                        </div>
                      </div>

                      <div className="kids-form-row row">
                        <div className="kids-form-section col-md-6 mb-3">
                          <label className="form-label">City</label>
                          <Select
                            placeholder="Select City..."
                            options={cityList.map((city) => ({
                              value: city.cityId,
                              label: city.name,
                            }))}
                            value={kidsCity?.label}
                            onChange={handleSelectedCity}
                            isSearchable={true}
                            styles={customStylesProfession}
                          />
                        </div>
                        <div className="kids-form-section col-md-6 mb-3">
                          <label className="form-label">Age</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            style={{ fontSize: "14px" }}
                            id="ageSelectID"
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
                        </div>
                      </div>
                      <div className="row">
                        <div className="kids-form-section col-md-6 mb-3">
                          <label className="form-label">Skills</label>
                          <Select
                            isMulti
                            name="skills"
                            options={skillsList}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={(value) => selectSkills(value)}
                            styles={customStyles}
                          />
                        </div>
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className=" ">
                            <label className="form-label">Job Type</label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              style={{ fontSize: "14px" }}
                              id="jobtypeID"
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
                          </div>
                        </div>
                      </div>
                      <div className="kids-form-row row ">
                        <div className="kids-form-section col-md-6 mb-3">
                          <label className="form-label">Job Title</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Job Title"
                            ref={jobNameRef}
                          ></input>
                        </div>
                        <div className="kids-form-section col-md-6 mb-3">
                          <div className=" ">
                            <label className="form-label">
                              Employment Type
                            </label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              style={{ fontSize: "14px" }}
                              id="employmentTypeID"
                            >
                              <option value="" disabled selected>
                                Select Employment Type
                              </option>
                              {employmentTypeList.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                    <DialogActions>
                      <button
                        type="button"
                        className="btn gift-payment-btn"
                        onClick={applyFilter}
                      >
                        {isLoading ? "Loading..." : "Filter"}
                      </button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              </div>

              {gigsList.length && (
                <div className="recent-gigs-main">
                  {gigsList.map((item, index) => {
                    return (
                      <>
                        <div className="recent-gigs-wrapper">
                          <div className="recent-setone alignDivs mb-2">
                            <div className="userBox">
                              <div className="recent-img-div">
                                {item?.brandImage && (
                                  <img
                                    className="recent-img"
                                    src={`${API.userFilePath}${item?.brandImage}`}
                                    alt=""
                                  />
                                )}
                                {!item?.brandImage && (
                                  <img
                                    className="recent-img"
                                    src={jobImage}
                                    alt=""
                                  />
                                )}
                              </div>

                              <div className="recent-gig-details">
                                <div className="recent-gig-company">
                                  {item.hiringCompany}
                                </div>
                                <div className="recent-gig-name">
                                  {item.jobTitle}
                                </div>
                                <div className="recent-gig-description">
                                  {item.description}
                                </div>
                              </div>
                              <div className="recent-gig-favorite">
                                {!item?.isFavourite && (
                                  <i
                                    className="bi bi-heart save-job-icon"
                                    onClick={() => {
                                      addToSavedJobs(item);
                                    }}
                                  ></i>
                                )}
                                {item?.isFavourite && (
                                  <i
                                    className="bi bi-heart-fill remove-job-icon"
                                    onClick={() => {
                                      removeFromSavedJobs(item);
                                    }}
                                  ></i>
                                )}
                              </div>
                            </div>

                            <div className="recent-set-three">
                              <div
                                className="view-gig-btn"
                                onClick={() => {
                                  const currentUserId = localStorage.getItem("currentUserId");
                                  console.log("currentUserId:", currentUserId);
                                  console.log("Item ID:", item?._id); // Debugging

                                  if (currentUserId) {
                                    viewJob(item?._id);
                                  } else {
                                    setMessage("You must be logged in");
                                    setOpenPopUp(true);
                                    setTimeout(() => {
                                      setOpenPopUp(false);
                                      navigate("/login");
                                    }, 1000);
                                  }
                                }}
                              >

                                <i className="bi bi-eye-fill"></i>
                                <div>View</div>
                              </div>
                              <div
                                className={
                                  item?.isApplied === "Apply Now"
                                    ? "apply-now-btn"
                                    : "apply-now-btn applied-btn"
                                }
                                onClick={() => {
                                  applyjobs(item);
                                }}
                              >
                                {item?.isApplied == "Applied" && (
                                  <>
                                    <i className="bi bi-check-circle-fill"></i>
                                  </>
                                )}
                                {item?.isApplied == "Apply Now" && (
                                  <>
                                    <i className="bi bi-briefcase-fill"></i>
                                  </>
                                )}
                                {item?.isApplied === "Apply Now" && (
                                  <div>Apply Now</div>
                                )}
                                {item?.isApplied === "Applied" && (
                                  <div>Applied</div>
                                )}
                                <div
                                  className="view-gig-btn"
                                  onClick={() => {
                                    shareJob(item);
                                    
                                  }}
                                >
                                  <i class="bi bi-copy"></i>
                                  <div>Share</div>
                                </div>

                              </div>
                            </div>
                          </div>
                          <div className="recent-settwo pt-0">
                            <div className="mb-2">
                              <span className="job-company_dtls">
                                <i className="bi bi-person-workspace"></i>
                              </span>{" "}
                              {/* . */}
                              <span className="job-company_dtls">
                                {item?.jobType} <i className="bi bi-dot"></i>
                              </span>
                              <span className="job-company_dtls">
                                <i className="bi bi-geo-alt-fill location-icon"></i>
                                {item?.state}, {item?.city}{" "}
                                <i className="bi bi-dot"></i>
                              </span>
                              <span className="job-company_dtls">
                                {item?.employmentType}{" "}
                                <i className="bi bi-dot"></i>
                              </span>
                              <span className="job-company_dtls">
                                {item?.category} <i className="bi bi-dot"></i>
                              </span>
                              <span className="job-company_dtls">
                                {Object.keys(item?.compensation)[0] ===
                                  "paid_collaboration_and_gift"
                                  ? "Paid Collaboration + Product/Gift"
                                  : Object.keys(item?.compensation)[0] ===
                                    "product_gift"
                                    ? "Product/Gift"
                                    : Object.keys(item?.compensation)[0] ===
                                      "paid_collaboration"
                                      ? "Paid Collaboration"
                                      : ""}
                              </span>
                            </div>
                          </div>
                          <div className="mb-2">
                            <span
                              style={{ fontWeight: "bold" }}
                              className="job-company_dtls"
                            >
                              Application Deadline :{" "}
                            </span>{" "}
                            <span>
                              {" "}
                              {new Date(
                                item.lastDateForApply
                              ).toLocaleDateString("en-GB", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
              {gigsList && gigsList.length == 0 && (
                <div className="recent-gigs-main">No Jobs Available</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="applyModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <p id="exampleModalLabel" className="modal-job-title">
                {modalData?.jobTitle}
              </p>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="modal-job-flex">
                <i className="bi bi-building model-job-icons"></i>
                <div className="model-job-name">{modalData?.hiringCompany}</div>
              </div>

              <div className="modal-job-flex">
                <i className="bi bi-briefcase-fill model-job-icons"></i>
                <div className="model-job-name">
                  <span className="modal-job-workplace">
                    {modalData?.employmentType}{" "}
                  </span>{" "}
                  {modalData?.jobType}
                </div>
              </div>
              <div className="modal-job-flex">
                <i className="bi bi-list-check model-job-icons"></i>
                <div className="model-job-name">
                  {modalData?.skills.map((skill, index) => (
                    <span key={index}>
                      {skill}
                      {index !== modalData?.skills.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
              <div className="modal-job-flex">
                <i className="bi bi-gender-ambiguous model-job-icons"></i>
                <div className="model-job-name">{modalData?.gender}</div>
              </div>
              <div className="modal-job-flex">
                <i className="bi  bi-cash-coin model-job-icons"></i>
                <div className="model-job-name">
                  {modalData?.paymentType?.amount} {modalData?.jobCurrency}
                </div>
              </div>
              <div className="model-about-title">About the job</div>
              <div className="model-job-about-values">
                {modalData?.jobDescription &&
                  modalData?.jobDescription?.map((htmlContent, index) => (
                    <div
                      key={index}
                      dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                  ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCloseModal}
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? <Loader /> : <div></div>}

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default GetBooked;
