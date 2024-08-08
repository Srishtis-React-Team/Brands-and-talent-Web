import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp.js";
import "../assets/css/talent-dashboard.css";
import TalentSideMenu from "../layout/TalentSideMenu.js";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Select from "react-select";
import TalentPreviewJob from "./TalentPreviewJob.js";
import useFieldDatas from "../config/useFieldDatas.js";

const TalentDashBoard = () => {
  const { categoryList } = useFieldDatas();

  const navigate = useNavigate();
  const offcanvasRef = useRef(null);
  const [gigsList, setGigsList] = useState([]);
  const [topBrandsList, setTopBrandsList] = useState([]);
  const [isFilled, setIsFilled] = useState(true);
  const [job, setJob] = useState("");
  const sliderIcon = require("../assets/icons/sliders.png");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [kidsCity, setKidsCity] = useState("");

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
      .catch((err) => {});
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
      .catch((err) => {});
  };

  const customStylesProfession = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "45px",
      zIndex: 1,
    }),
    menu: (provided, state) => ({
      ...provided,
      maxHeight: "500px",
      zIndex: 1,
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
      .catch((err) => {});
  };

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
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const doitnow = require("../assets/images/doitnow.png");
  const headsetLogo = require("../assets/icons/headset.png");
  const [showSidebar, setShowSidebar] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [skillsList, setSkillsList] = useState([]);
  const [flag, setFlag] = useState(false);
  const url = window.location.href;
  const location = useLocation();

  useEffect(() => {}, [location]);

  const queryString = url.split("?")[1];

  useEffect(() => {
    getTopBrands();
    const storedUserId = localStorage.getItem("userId");

    setUserId(storedUserId);
    if (userId) {
      checkProfileStatus();
    }
  }, [userId]);

  const checkProfileStatus = async () => {
    await ApiHelper.post(`${API.checkProfileStatus}${queryString}`)
      .then((resData) => {
        if (resData.data.profileStatus === false) {
          openDoItNowModal();
        }
      })
      .catch((err) => {});
  };

  const getRecentGigs = async () => {
    const formData = {
      talentId: userId,
    };
    await ApiHelper.post(API.getPostedJobs, formData)
      .then((resData) => {
        if (resData) {
          setGigsList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const [modalData, setModalData] = useState(null);

  const applyjobs = async (data) => {
    setModalData(data);
    if (data?.isApplied != "Applied") {
      const modalElement = document.getElementById("exampleModal");
      const bootstrapModal = new window.bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  };

  const viewJob = async (jobId) => {
    setJob(jobId);
    setFlag(true);
  };

  useEffect(() => {}, [gigsList]);

  useEffect(() => {}, [flag]);

  const getTopBrands = async () => {
    await ApiHelper.post(API.getTopBrands)
      .then((resData) => {
        if (resData) {
          setTopBrandsList(resData.data.data);
        }
      })
      .catch((err) => {});
  };

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };
  const [talentId, setTalentId] = useState(null);

  useEffect(() => {
    setTalentId(localStorage.getItem("userId"));

    if (talentId) {
      getRecentGigs();
    }
  }, [talentId]);

  const openSignup = () => {
    closeDoItNowModal();
    setTimeout(() => {
      navigate(`/adult-signup-basic-details`);
    }, 800);
  };

  const doItNowRef = useRef(null);
  const openDoItNowModal = () => {
    const modal = new window.bootstrap.Modal(doItNowRef.current);
    modal.show();
  };

  const closeDoItNowModal = () => {
    const modal = new window.bootstrap.Modal(doItNowRef.current);
    modal.hide();
  };

  const handleCloseModal = async () => {
    const formData = {
      talentId: talentId,
      brandId: modalData?.brandId,
      gigId: modalData?._id,
    };
    await ApiHelper.post(API.applyjobs, formData)
      .then((resData) => {
        setMessage("Job applied successfully");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          getRecentGigs();
          const modalElement = document.getElementById("exampleModal");
          const bootstrapModal = new window.bootstrap.Modal(modalElement);
          bootstrapModal.hide();
        }, 1000);
      })
      .catch((err) => {});
  };

  useEffect(() => {}, [modalData]);

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
  const [category, setCategory] = useState("");

  const ageList = ["4-17", "18+"];

  const employmentTypeList = [
    "Full Time",
    "Part Time",
    "Per Diem",
    "Contractor",
    "Temporary",
    "Other",
  ];

  const selectedSkillsRef = useRef([]);

  const selectSkills = (selectedOptions) => {
    if (!selectedOptions || selectedOptions.length === 0) {
      selectedSkillsRef.current = [];
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
          setMessage("Filtered SuccessFully");
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
      .catch((err) => {});

    setOpen(false);
  };

  const keyWordRef = useRef(null);
  const jobLocationRef = useRef(null);
  const jobNameRef = useRef(null);
  const jobAgeRef = useRef(null);
  const jobFullNameRef = useRef(null);

  const jobTypeOptions = [
    "On Site",
    "Remote",
    "Work From Anywhere",
    "Hybrid",
    "Temporary",
    "Other",
  ];

  useEffect(() => {
    getSkills();
  }, []);

  const [jobType, setjobType] = useState("");

  const selectjobType = (event) => {
    setjobType(event.target.value);
  };

  const getSkills = async () => {
    await ApiHelper.get(API.getSkills)
      .then((resData) => {
        if (resData.data.status === true) {
          setSkillsList(resData.data.data);
        }
      })
      .catch((err) => {});

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
          setMessage("Job Saved SuccessFully");
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
          getRecentGigs();
        }, 1000);
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

  const contactUs = () => {
    navigate("/contact-us");
  };

  return (
    <>
      <TalentHeader toggleMenu={toggleMenu} />
      <div
        id="sidebarBrand"
        className={`brand-sidebar ${
          showSidebar ? "show-sidebar" : "show-sidebar hide-sidebar"
        }`}
      >
        <TalentSideMenu myState={queryString} />
      </div>
      <main
        id="mainBrand"
        className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
      >
        <div
          ref={doItNowRef}
          className="modal fade"
          id="verify_age"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content ">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body talent-popup-body pt-1">
                <div className="doitnow-main row">
                  <div className="doit-one col-md-8">
                    <div className="talent-popup-title">
                      Welcome To Brands / Client And Talent
                    </div>
                    <div className="talent-popup-enter">
                      Complete Your{" "}
                      <span className="talent-popup-span">Profile</span>
                    </div>
                    <div>
                      <div
                        style={{
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: isFilled ? "20%" : "0%",
                            backgroundColor: "#c2114b",
                            height: "8px",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="talent-popup-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ea repellat corporis corrupti aliquid laboriosam neque
                      ratione fuga. <br></br>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </div>
                  </div>
                  <div className="doit-two col-md-4 text-center">
                    <img className="img-fluid" src={doitnow} alt="" />
                  </div>
                </div>
              </div>
              <div className="doitnow">
                <div
                  className="doit-btn"
                  onClick={() => {
                    openSignup();
                  }}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Update Profile Now
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid my-2 p-0">
          <div className="row talent-dashboard-main">
            <div className={flag ? "col-md-8 col-lg-6" : "col-md-8 col-lg-8"}>
              <div className="talent-column-one">
                <div className="filter-text-wrapper mb-3">
                  <div className="recent-gigs-title">Most Recent Jobs</div>
                  <React.Fragment>
                    <div
                      className="header-filter-icon"
                      onClick={handleClickOpen}
                    >
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
                          const formJson = Object.fromEntries(
                            formData.entries()
                          );
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
                          <div className="recent-gigs-wrapper browseJob">
                            <div className="recent-setone alignDivs mb-2">
                              <div className="userBox w-100 d-block">
                                <div className="">
                                  <div className="campaigns-content-wrapper imgSpc">
                                    <div className="campaign-paid-wrapper">
                                      <div className="campaign-name">
                                        {item?.jobTitle}
                                      </div>

                                      <div className="recent-gig-description">
                                        {!item?.isFavorite && (
                                          <i
                                            className="bi bi-heart save-job-icon"
                                            onClick={() => {
                                              addToSavedJobs(item);
                                            }}
                                          ></i>
                                        )}
                                        {item?.isFavorite && (
                                          <i
                                            className="bi bi-heart-fill remove-job-icon"
                                            onClick={() => {
                                              removeFromSavedJobs(item);
                                            }}
                                          ></i>
                                        )}
                                      </div>
                                    </div>

                                    <div className="row">
                                      <div className="mb-2 col-md-7 logoSpc">
                                        {item?.brandImage && (
                                          <img
                                            className="job-company-logo"
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

                                        <span className="job-company-name">
                                          {item?.hiringCompany}
                                        </span>
                                      </div>

                                      <div className="recent-set-three col-md-5">
                                        <div
                                          className="view-gig-btn"
                                          onClick={() => {
                                            viewJob(item?._id);
                                          }}
                                        >
                                          <i className="bi bi-eye-fill"></i>
                                          <div>View Job</div>
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
                                        </div>
                                      </div>
                                    </div>

                                    <div className="mb-2">
                                      <span className="job-company_dtls">
                                        <i className="bi bi-person-workspace"></i>
                                      </span>{" "}
                                      {/* . */}
                                      <span className="job-company_dtls">
                                        {item?.jobType}{" "}
                                        <i className="bi bi-dot"></i>
                                      </span>
                                      <span className="job-company_dtls">
                                        <i className="bi bi-geo-alt-fill"></i>
                                        {item?.city}, {item?.state}{" "}
                                        <i className="bi bi-dot"></i>
                                      </span>
                                      <span className="job-company_dtls">
                                        {item?.employmentType}{" "}
                                        <i className="bi bi-dot"></i>
                                      </span>
                                      <span className="job-company_dtls">
                                        {item?.category}{" "}
                                        <i className="bi bi-dot"></i>
                                      </span>
                                      <span className="job-company_dtls">
                                        {Object.keys(item?.compensation)[0] ===
                                        "paid_collaboration_and_gift"
                                          ? "Paid Collaboration + Product/Gift"
                                          : Object.keys(
                                              item?.compensation
                                            )[0] === "product_gift"
                                          ? "Product/Gift"
                                          : Object.keys(
                                              item?.compensation
                                            )[0] === "paid_collaboration"
                                          ? "Paid Collaboration"
                                          : ""}
                                      </span>
                                    </div>
                                    <div className="mb-2">
                                      <span className="job-company_dtls">
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
                                </div>
                              </div>
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

              <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      {modalData?.jobTitle && (
                        <>
                          <p id="exampleModalLabel" className="modal-job-title">
                            {modalData?.jobTitle}
                          </p>
                        </>
                      )}

                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div className="modal-body">
                      {modalData?.hiringCompany && (
                        <div className="modal-job-flex">
                          <i className="bi bi-building model-job-icons"></i>
                          <div className="model-job-name">
                            {modalData?.hiringCompany}
                          </div>
                        </div>
                      )}
                      {(modalData?.employmentType || modalData?.jobType) && (
                        <div className="modal-job-flex">
                          <i className="bi bi-briefcase-fill model-job-icons"></i>
                          <div className="model-job-name">
                            {modalData?.employmentType && (
                              <span className="modal-job-workplace">
                                {modalData?.employmentType}{" "}
                              </span>
                            )}
                            {modalData?.jobType}
                          </div>
                        </div>
                      )}
                      {(modalData?.city || modalData?.state) && (
                        <div className="modal-job-flex">
                          <i className="bi bi-geo-alt-fill model-job-icons"></i>
                          <div className="model-job-name">
                            {modalData?.city && <span>{modalData?.city}</span>}
                            {modalData?.city && modalData?.state && ", "}
                            {modalData?.state}
                          </div>
                        </div>
                      )}
                      {modalData?.category && (
                        <div className="modal-job-flex">
                          <i className="bi bi-bookmarks-fill model-job-icons"></i>
                          <div className="model-job-name">
                            {modalData?.category}
                          </div>
                        </div>
                      )}
                      {modalData?.compensation &&
                        Object.keys(modalData?.compensation).length > 0 && (
                          <div className="modal-job-flex">
                            <i className="bi bi-cash-coin model-job-icons"></i>
                            <div className="model-job-name">
                              {Object.keys(modalData?.compensation)[0] ===
                              "paid_collaboration_and_gift"
                                ? "Paid Collaboration + Product/Gift"
                                : Object.keys(modalData?.compensation)[0] ===
                                  "product_gift"
                                ? "Product/Gift"
                                : Object.keys(modalData?.compensation)[0] ===
                                  "paid_collaboration"
                                ? "Paid Collaboration"
                                : ""}
                            </div>
                          </div>
                        )}
                      {modalData?.skills && modalData?.skills.length > 0 && (
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
                      )}
                      {modalData?.gender &&
                        Array.isArray(modalData?.gender) && (
                          <div className="modal-job-flex">
                            <i className="bi bi-gender-ambiguous model-job-icons"></i>
                            <div className="model-job-name">
                              {modalData.gender.join(", ")}
                            </div>
                          </div>
                        )}

                      {modalData?.lastDateForApply && (
                        <div className="modal-job-flex">
                          <i className="bi bi-alarm-fill model-job-icons"></i>
                          <div className="model-job-name">
                            <span className="job-company_dtls">
                              Application Deadline:{" "}
                            </span>
                            <span>
                              {new Date(
                                modalData.lastDateForApply
                              ).toLocaleDateString("en-GB", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      )}
                      {modalData?.jobDescription &&
                        modalData?.jobDescription.length > 0 && (
                          <>
                            <div className="model-about-title">
                              About the job
                            </div>
                            <div className="model-job-about-values">
                              {modalData?.jobDescription.map(
                                (htmlContent, index) => (
                                  <div
                                    key={index}
                                    dangerouslySetInnerHTML={{
                                      __html: htmlContent,
                                    }}
                                  />
                                )
                              )}
                            </div>
                          </>
                        )}
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
            </div>
            <div className={flag ? "col-md-4 col-lg-6" : "col-md-4 col-lg-4"}>
              {flag ? (
                <TalentPreviewJob job={job} />
              ) : (
                <div className="rightBx">
                  <div className="contact-section-main remvSpace">
                    <div className="contact-wrapper px-3 py-4 boxsWhite mb-4 text-center">
                      <div className="contact-logo">
                        <img src={headsetLogo} alt="" />
                      </div>
                      <p className="contact-q">Seeking Assistance?</p>
                      <div className="contact-description">
                        Have a question? Fill out the form below, and we'll get
                        back to you within 1-2 business days
                      </div>
                      <div className="contact-btn" onClick={() => contactUs()}>
                        Contact Now
                      </div>
                    </div>

                    <div className="boxsWhite mb-4">
                      <div className="top-brands-section px-3 pt-3">
                        <div className="top-brands-title py-1">
                          Top Brands / Client
                        </div>
                      </div>
                      {topBrandsList.length && (
                        <div className="top-brands-main p-3">
                          <div className="row rowSpc">
                            {topBrandsList?.map((item, index) => {
                              return (
                                <>
                                  <div
                                    className="top-brands-wrapper col-md-4"
                                    key={index}
                                  >
                                    <div className="top-brand-img-wrapper">
                                      {item?.brandImage?.length > 0 ? (
                                        <img
                                          className="top-brand-img"
                                          src={
                                            API.userFilePath +
                                            item?.brandImage[0].fileData
                                          }
                                          alt=""
                                        />
                                      ) : (
                                        <div>No Image Available</div>
                                      )}
                                    </div>
                                    <div className="top-brands-name">
                                      {item.brandName}
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* <div className="col-md-4 col-lg-3">
              <div className="rightBx">
                <div className="contact-section-main remvSpace">
                  <div className="contact-wrapper px-3 py-4 boxsWhite mb-4 text-center">
                    <div className="contact-logo">
                      <img src={headsetLogo} alt="" />
                    </div>
                    <p className="contact-q">Seeking Assistance?</p>
                    <div className="contact-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti, voluptatum labore aspernatur at temporibus
                    </div>
                    <div className="contact-btn" onClick={() => contactUs()}>
                      Contact Now
                    </div>
                  </div>

                  <div className="boxsWhite mb-4">
                    <div className="top-brands-section px-3 pt-3">
                      <div className="top-brands-title py-1">
                        Top Brands / Client
                      </div>
                      <div className="view-all-brands">View All</div>
                    </div>
                    {topBrandsList.length && (
                      <div className="top-brands-main p-3">
                        <div className="row rowSpc">
                          {topBrandsList.map((item, index) => {
                            return (
                              <>
                                <div className="top-brands-wrapper col-md-4">
                                  <div className="top-brand-img-wrapper">
                                    {item?.brandImage?.length > 0 ? (
                                      <img
                                        className="top-brand-img"
                                        src={
                                          API.userFilePath +
                                          item?.brandImage[0].fileData
                                        }
                                        alt=""
                                      />
                                    ) : (
                                      <div>No Image Available</div>
                                    )}
                                  </div>
                                  <div className="top-brands-name">
                                    {item.brandName}
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default TalentDashBoard;
