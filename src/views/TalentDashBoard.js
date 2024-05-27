import React, { useEffect, useState, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript
import { useNavigate } from "react-router-dom";
import PopUp from "../components/PopUp.js";
import "../assets/css/talent-dashboard.scss";
import TalentSideMenu from "../layout/TalentSideMenu.js";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu, MenuListboxSlotProps } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "react-select";

const TalentDashBoard = () => {
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

  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const offcanvasRef = useRef(null); // Reference to the offcanvas element
  const [gigsList, setGigsList] = useState([]);
  const [topBrandsList, setTopBrandsList] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isFilled, setIsFilled] = useState(true);
  const girl1 = require("../assets/images/girl1.png");
  const btLogo = require("../assets/icons/Group 56.png");
  const sliderIcon = require("../assets/icons/sliders.png");
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

  const url = window.location.href;
  const queryString = url.split("?")[1];
  console.log(" queryString:", queryString);

  useEffect(() => {
    getRecentGigs();
    getTopBrands();
    const storedUserId = localStorage.getItem("userId");
    console.log(storedUserId, "storedUserId");
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
        console.log("checkProfileStatus", resData.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
        console.log("gigsList", resData.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [modalData, setModalData] = useState(null);

  const applyjobs = async (data) => {
    console.log(data, "applyJobData");
    setModalData(data); // Set data to be displayed in the modal
    // Open the modal programmatically
    if (data?.isApplied != "Applied") {
      const modalElement = document.getElementById("exampleModal");
      const bootstrapModal = new window.bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  };
  const viewJob = async (jobId) => {
    navigate("/preview-job-talent", {
      state: {
        jobId: jobId,
      },
    });
  };

  useEffect(() => {
    console.log(gigsList, "gigsList");
  }, [gigsList]);

  const getTopBrands = async () => {
    await ApiHelper.post(API.getTopBrands)
      .then((resData) => {
        if (resData) {
          setTopBrandsList(resData.data.data);
        }
        console.log("topBrandsList", resData.data.data);
        console.log("topBrandsList", topBrandsList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };
  const [talentId, setTalentId] = useState(null);

  useEffect(() => {
    setTalentId(localStorage.getItem("userId"));
    console.log(talentId, "brandId");
  }, [talentId]);

  const openSignup = () => {
    closeDoItNowModal();
    setTimeout(() => {
      navigate(`/adult-signup-basic-details`);
    }, 800);
  };

  // Define refs for the modals
  const doItNowRef = useRef(null);
  const openDoItNowModal = () => {
    const modal = new window.bootstrap.Modal(doItNowRef.current);
    modal.show();
  };

  // Function to close the "doItNow" modal
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
        setMessage("Job Applied SuccessFully!");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
          getRecentGigs();
          // Close the modal programmatically
          const modalElement = document.getElementById("exampleModal");
          const bootstrapModal = new window.bootstrap.Modal(modalElement);
          bootstrapModal.hide();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const [keywordError, setKeywordError] = useState(false);
  const [jobNameError, setJobNameError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [skillsError, setSkillsError] = useState(false);
  const [jobTypeError, setJobTypeError] = useState(false);
  const [workPlaceType, setWorkPlaceType] = useState("");
  const ageList = ["13-17", "18+"];

  const applyFilter = async () => {
    let key_word;
    let job_location;
    let job_age;
    let job_full_name;
    let job_type;
    let work_place_type;
    let job_name;

    // Get the select element
    var selectElement = document.getElementById("workPlaceSelect");
    // Get the selected value
    work_place_type = selectElement?.value;
    // Now you can use the selectedValue variable to access the value of the selected option
    console.log(work_place_type, "workPlaceSelect");

    // Get the select element
    var selectJobElement = document.getElementById("jobtypeID");
    // Get the selected value
    job_type = selectJobElement?.value;
    // Now you can use the selectedValue variable to access the value of the selected option
    console.log(job_type, "job_type");

    // Get the select element
    var selectAgeElement = document.getElementById("ageSelectID");
    // Get the selected value
    job_age = selectAgeElement?.value;
    // Now you can use the selectedValue variable to access the value of the selected option
    console.log(job_age, "job_age");

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
    console.log(
      key_word,
      "key_word",
      job_location,
      "job_location",
      job_age,
      "job_age",
      job_type,
      "job_type",
      work_place_type,
      "work_place_type"
    );
    const formData = {
      keyword: key_word,
      jobTitle: job_name,
      jobLocation: job_location,
      age: job_age,
      jobType: job_type,
      workPlaceType: work_place_type,
      skills: selectedSkills,
    };
    console.log(formData, "formData talentFilterData");
    setIsLoading(true);
    await ApiHelper.post(API.searchJobs, formData)
      .then((resData) => {
        console.log();
        if (resData.data.status === true) {
          setMessage("Filtered SuccessFully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        } else if (resData.data.status === false) {
          setMessage("No Matching Users Found");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
  };

  // Ref to store the input element
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

  const [jobType, setjobType] = useState("");

  // Function to handle getting the input value
  const selectjobType = (event) => {
    setjobType(event.target.value);
  };

  const getSkills = async () => {
    await ApiHelper.get(API.getSkills)
      .then((resData) => {
        if (resData.data.status === true) {
          setSkillsList(resData.data.data);
          console.log(resData.data.data, "getSkills");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
  };

  const addToSavedJobs = async (data) => {
    console.log(data, "dataaddToSavedJobs");
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
          setTimeout(function() {
            setOpenPopUp(false);
            getRecentGigs();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error Occured Try Again");
        setOpenPopUp(true);
        setTimeout(function() {
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
        console.log(resData, "resDataremoveFromSavedJobs");
        if (resData.data.status === true) {
          setMessage("Removed From Saved Jobs");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            getRecentGigs();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error Occured Try Again");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
        }, 1000);
      });

    setOpen(false);
  };

  const selectSkills = (selectedOptions) => {
    setSkillsError(false);
    if (!selectedOptions || selectedOptions.length === 0) {
      // Handle case when all options are cleared
      setSelectedSkills([]); // Clear the languages state
      return;
    }

    // Extract values of all selected languages
    const selectedLanguages = selectedOptions.map((option) => option.value);
    setSelectedSkills(selectedLanguages); // Update languages state with all selected languages
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
                      Welcome To Brands And Talent
                    </div>
                    <div className="talent-popup-enter">
                      Complete Your{" "}
                      <span className="talent-popup-span">Profile</span>
                    </div>
                    <div>
                      {/* Progress bar */}
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
            <div className="col-md-8 col-lg-9">
              <div className="talent-column-one">
                <div className="filter-text-wrapper">
                  <div className="recent-gigs-title">Most Recent Jobs</div>
                  <React.Fragment>
                    <div
                      className="header-filter-icon"
                      onClick={handleClickOpen}
                    >
                      Filter Jobs
                      <img className="filter-icon" src={sliderIcon} alt="" />
                    </div>
                    <BootstrapDialog
                      onClose={handleClose}
                      aria-labelledby="customized-dialog-title"
                      open={open}
                      PaperProps={{
                        sx: {
                          marginTop: "10vh", // Adjust this value to suit your needs
                          position: "absolute",
                          top: 0,
                          maxHeight: "90vh", // Optional: Limit the height of the dialog
                        },
                      }}
                    >
                      <DialogTitle
                        sx={{ m: 0, p: 2 }}
                        id="customized-dialog-title"
                      >
                        Filter Jobs
                      </DialogTitle>
                      <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <DialogContent dividers>
                        <div className="search-filter-section">
                          <div className="search-labels">Keywords</div>
                          <div>
                            {/* <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="email"
                      label="Email Address"
                      type="email"
                      fullWidth
                      variant="standard"
                    /> */}

                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Keyword"
                              ref={keyWordRef}
                              // onChange={(e) => {
                              //   e.preventDefault();
                              //   setJobName(e.target.value);
                              // }}
                            ></input>
                          </div>

                          <div className="kids-form-row mt-3">
                            <div className="kids-form-section">
                              <div className="mb-3 ">
                                <label className="form-label">Location</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Location"
                                  ref={jobLocationRef}
                                ></input>
                              </div>
                            </div>
                            <div className="kids-form-section">
                              <div className="mb-3">
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
                          </div>
                          {/* <div className="kids-form-section">
                            <div className="mb-3">
                              <label className="form-label">Skills</label>
                              <Select
                                isMulti
                                name="colors"
                                options={skillsList}
                                valueField="value"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(value) => selectSkills(value)}
                                styles={customStyles}
                              />
                            </div>
                          </div> */}
                          <div className="kids-form-row mt-3">
                            <div className="kids-form-section">
                              <div className="mb-3 ">
                                <label className="form-label">Job Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Name"
                                  ref={jobNameRef}
                                ></input>
                              </div>
                            </div>
                            <div className="kids-form-section">
                              <div className="mb-3 ">
                                <label className="form-label">Job Type</label>
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  style={{ fontSize: "14px" }}
                                  id="jobtypeID"
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          className="search-popup-btn"
                          onClick={applyFilter}
                        >
                          Filter
                        </Button>
                      </DialogActions>
                    </BootstrapDialog>
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
                                  {/* <i className="bi bi-briefcase-fill "></i> */}
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
                              <div className="recent-set-three">
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
                            <div className="recent-settwo pt-0">
                              <div className="recent-gigs-count-wrapper">
                                <div className="recent-gigs-logo">
                                  <i className="bi bi-person-check-fill"></i>
                                </div>
                                <div className="recent-gig-count-details">
                                  <div className="recent-gig-name">
                                    Followers
                                  </div>
                                  <div className="recent-gigs-count">2500</div>
                                </div>
                              </div>

                              <div className="recent-gigs-count-wrapper">
                                {/* <div className="recent-gigs-logo">
                                    <i className="bi bi-person-arms-up"></i>
                                  </div> */}
                                {/* <div className="recent-gig-count-details">
                                    <div className="recent-gig-name">Age</div>
                                    <div className="recent-gigs-count">
                                      {item.age}
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
                                  </div> */}

                                <div className="recent-settwo">
                                  <div className="recent-gigs-count-wrapper">
                                    <div className="recent-gigs-logo">
                                      <i className="bi bi-person-check-fill"></i>
                                    </div>
                                    <div className="recent-gig-count-details">
                                      <div className="recent-gig-name">
                                        Followers
                                      </div>
                                      <div className="recent-gigs-count">
                                        2500
                                      </div>
                                    </div>
                                  </div>
                                  <div className="recent-gigs-count-wrapper">
                                    <div className="recent-gigs-logo">
                                      <i className="bi bi-person-arms-up"></i>
                                    </div>
                                    <div className="recent-gig-count-details">
                                      <div className="recent-gig-name">Age</div>
                                      <div className="recent-gigs-count">
                                        {item.age}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="recent-gigs-count-wrapper">
                                    <div className="recent-gigs-logo">
                                      <i className="bi bi-gender-ambiguous"></i>
                                    </div>
                                    <div className="recent-gig-count-details">
                                      <div className="recent-gig-name">
                                        Gender
                                      </div>
                                      <div className="recent-gigs-count">
                                        {item.gender}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="recent-gigs-count-wrapper">
                                    <div className="recent-gigs-logo">
                                      <i className="bi bi-geo-alt-fill"></i>
                                    </div>
                                    <div className="recent-gig-count-details">
                                      <div className="recent-gig-name">
                                        Location
                                      </div>
                                      <div className="recent-gigs-count">
                                        {item.jobLocation}
                                      </div>
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
            </div>
            <div className="col-md-4 col-lg-3">
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
                    <div className="contact-btn">Contact Now</div>
                  </div>

                  <div className="boxsWhite mb-4">
                    <div className="top-brands-section px-3 pt-3">
                      <div className="top-brands-title py-1">Top Brands</div>
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
            </div>
          </div>
        </div>
      </main>

      {/* Bootstrap Modal */}
      {/* Bootstrap Modal */}
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
                    {modalData?.workplaceType}{" "}
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

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default TalentDashBoard;
