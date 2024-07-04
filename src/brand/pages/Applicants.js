import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/forms/kidsform-one.scss";
import "../../assets/css/createjobs.scss";
import "../../assets/css/talent-profile.css";
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
import { useNavigate } from "react-router";
import BrandHeader from "./BrandHeader";
import BrandSideMenu from "./BrandSideMenu";
import { NavLink } from "react-router-dom";
import Modal from "react-modal";
import Spinner from "../../components/Spinner";

const Applicants = () => {
  const [brandId, setBrandId] = useState(null);

  const [meetLink, setMeetLink] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    const storedBrandId = localStorage.getItem("brandId");
    if (storedBrandId !== null) {
      setBrandId(storedBrandId);
    }
  }, []);

  const navigate = useNavigate();

  const customStylesAlert = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      /* margin: '0 auto', */
      width: "500px",
      hight: "100%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [alertpop, setAlertpop] = useState({
    status: false,
    jobId: "",
    jobType: "",
    label: "",
    candidate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const jobImage = require("../../assets/icons/jobImage.png");
  const [showSidebar, setShowSidebar] = useState(true);
  const [loader, setLoader] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [newCandidates, showNewCandidates] = useState(true);
  const [sortListedCandidates, showsortListedCandidates] = useState(false);
  const [interviewInvitations, showinterviewInvitations] = useState(false);
  const [rejectedCandidates, showRejectedCandidates] = useState(false);
  const [bookedCandidates, showBookedCandidates] = useState(false);
  const [candidatesList, setCandidatesList] = useState([]);

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  function editJob() {}

  function inviteToInterview(candidate) {
    const formData = {
      talentId: candidate?.talentId,
      selectedLevel: "interviewInvitations",
      interviewType: "online",
    };
  }
  const sortListCandidate = async (candidate) => {
    console.log(candidate?.gigId, "candidate GigId");
    const formData = {
      talentId: candidate?.talentId,
      selectedLevel: "shortlistedCandidates",
      gigId: candidate?.gigId,
    };
    await ApiHelper.post(API.selectedLevelRange, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          // getNewCandidates(brandId, "new");
          setMessage("Candidate Shortlisted SuccessFully!");
          setOpenPopUp(true);
          setTimeout(function() {
            handleForms("sortlisted-candidates");
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const bookCandidate = async (candidate) => {
    console.log(candidate?.gigId, "candidate GigId");
    const formData = {
      talentId: candidate?.talentId,
      selectedLevel: "bookedCandidates",
      gigId: candidate?.gigId,
    };
    await ApiHelper.post(API.selectedLevelRange, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          // getNewCandidates(brandId, "new");
          setMessage("Candidate Booked SuccessFully!");
          setOpenPopUp(true);
          setTimeout(function() {
            handleForms("booked-candidates");
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteJob = async () => {};

  useEffect(() => {
    console.log(candidatesList, "candidatesList");
  }, [candidatesList]);
  useEffect(() => {
    console.log(newCandidates, "newCandidates");
  }, [newCandidates]);

  const postJob = async () => {};

  function PreviewJob(jobId) {
    navigate("/preview-job", {
      state: {
        jobId: jobId,
      },
    });
  }

  const getAllJobs = () => {};

  function handleForms(e) {
    console.log(e, "handleForms");
    if (e == "new-candidates") {
      showNewCandidates(true);
      getNewCandidates(brandId, "new");
    } else {
      showNewCandidates(false);
    }
    if (e == "sortlisted-candidates") {
      showsortListedCandidates(true);
      getNewCandidates(brandId, "sortListed");
    } else {
      showsortListedCandidates(false);
    }
    if (e == "interview-invitations") {
      showinterviewInvitations(true);
      getNewCandidates(brandId, "invitedCandidates");
    } else {
      showinterviewInvitations(false);
    }
    if (e == "rejected-candidates") {
      showRejectedCandidates(true);
      getNewCandidates(brandId, "rejectedCandidates");
    } else {
      showRejectedCandidates(false);
    }
    if (e == "booked-candidates") {
      console.log("booked-candidatesCAlled");
      showBookedCandidates(true);
      getNewCandidates(brandId, "bookedCandidates");
    } else {
      showBookedCandidates(false);
    }
  }

  const getNewCandidates = async (id, filterCandidates) => {
    console.log(filterCandidates, "filterCandidates");
    let apiUrl;
    let formData;
    if (filterCandidates == "new") {
      apiUrl = `${API.getSelectionList}`;
      formData = {
        brandId: id,
        selectedLevel: "new",
      };
    } else if (filterCandidates == "sortListed") {
      apiUrl = `${API.getSelectionList}`;
      formData = {
        brandId: id,
        selectedLevel: "shortlistedCandidates",
      };
    } else if (filterCandidates == "invitedCandidates") {
      apiUrl = `${API.getSelectionList}`;
      formData = {
        brandId: id,
        selectedLevel: "interviewInvitations",
      };
    } else if (filterCandidates == "rejectedCandidates") {
      apiUrl = `${API.getSelectionList}`;
      formData = {
        brandId: id,
        selectedLevel: "rejectedCandidates",
      };
    } else if (filterCandidates == "bookedCandidates") {
      console.log("bookedCandidatesFROMDATASETTING");
      apiUrl = `${API.getSelectionList}`;
      formData = {
        brandId: id,
        selectedLevel: "bookedCandidates ",
      };
    }
    console.log(formData, "formDatagetNewCandidates");
    await ApiHelper.post(apiUrl, formData)
      .then((resData) => {
        console.log(resData, "resData newCandidatesresData");
        if (resData.data.status === true) {
          console.log(resData.data.data, "newCandidatesresData");
          setCandidatesList(resData.data.data, "resData.data.data");
        }
        if (resData.data.status === false) {
          console.log(resData.data.data, "newCandidatesresData");
          setCandidatesList(resData.data.data, "resData.data.data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [interviewMode, setInterviewMode] = useState("offline");
  const handleToggle = (event) => {
    const { checked } = event.target;
    if (checked) {
      setInterviewMode("online");
    } else {
      setInterviewMode("offline");
    }
  };

  const onlineInvite = async () => {
    const formData = {
      talentId: alertpop?.talentId,
      selectedLevel: "interviewInvitations",
      gigId: alertpop?.jobId,
    };

    await ApiHelper.post(API.selectedLevelRange, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          onlineInterviewCall();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onlineInterviewCall = async () => {
    const formData = {
      talentId: alertpop?.talentId,
      selectedLevel: "interviewInvitations",
      interviewType: "online",
      meetingLink: meetLink,
    };
    setIsLoading(true);
    await ApiHelper.post(API.informSelectedLevel, formData)
      .then((resData) => {
        setIsLoading(false);
        console.log(resData, "onlineInvite resData");
        if (resData.data.status === true) {
          setMessage("An Invite has been send to the candidate");
          setOpenPopUp(true);
          setTimeout(function() {
            handleForms("interview-invitations");
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const offlineInvite = async () => {
    console.log("offlineInvite");
    const formData = {
      talentId: alertpop?.talentId,
      selectedLevel: "interviewInvitations",
      gigId: alertpop?.jobId,
    };

    await ApiHelper.post(API.selectedLevelRange, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          offlineInviteCall();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const offlineInviteCall = async () => {
    const formData = {
      talentId: alertpop?.talentId,
      selectedLevel: "interviewInvitations",
      interviewType: "offline",
      officeAddress: address,
    };
    setIsLoading(true);

    await ApiHelper.post(API.informSelectedLevel, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setIsLoading(false);

          setMessage("An Invite has been send to the candidate");
          setOpenPopUp(true);
          setTimeout(function() {
            handleForms("interview-invitations");
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err);
      });
  };

  const rejectCandidate = async () => {
    const formData = {
      talentId: alertpop?.talentId,
      selectedLevel: "rejectedCandidates",
      gigId: alertpop?.jobId,
    };
    await ApiHelper.post(API.selectedLevelRange, formData)
      .then((resData) => {
        if (resData.data.status === true) {
          setMessage("Candidate Rejected SuccessFully");
          setOpenPopUp(true);
          setTimeout(function() {
            handleForms("rejected-candidates");
            setOpenPopUp(false);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(address, "textAreaValue");
  }, [address]);
  useEffect(() => {
    console.log(candidatesList, "candidatesList");
  }, [candidatesList]);
  useEffect(() => {
    console.log(interviewMode, "interviewMode");
  }, [interviewMode]);

  useEffect(() => {
    if (newCandidates && brandId != null) {
      console.log(brandId, "brandId");
      console.log(newCandidates, "newCandidates");
      getNewCandidates(brandId, "new");
    }
  }, [newCandidates, brandId]);
  useEffect(() => {
    console.log(alertpop, "alertpop");
  }, [alertpop]);

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
          <BrandSideMenu />
        </div>
        <main
          style={candidatesList.length === 0 ? { height: "100vh" } : {}}
          id="mainBrand"
          className={`brand-main-container ${showSidebar ? "" : "main-pd"}`}
        >
          <div className="brand-content-main boxBg">
            <div className="create-job-title">My Candidates</div>
            <div className="individual-talent-tabs">
              <div
                style={{ marginLeft: "0px" }}
                className={
                  newCandidates
                    ? "individual-talent-tab-first-active-tab  candidates-tabs"
                    : "individual-talent-tab candidates-tabs"
                }
                onClick={(e) => {
                  handleForms("new-candidates");
                }}
              >
                New
              </div>
              <div
                className={
                  sortListedCandidates
                    ? "active-tab individual-talent-tab candidates-tabs"
                    : "individual-talent-tab candidates-tabs"
                }
                onClick={(e) => {
                  handleForms("sortlisted-candidates");
                }}
              >
                ShortListed
              </div>
              <div
                className={
                  interviewInvitations
                    ? "active-tab individual-talent-tab candidates-tabs"
                    : "individual-talent-tab candidates-tabs"
                }
                onClick={(e) => {
                  handleForms("interview-invitations");
                }}
              >
                Invite to Interview
              </div>
              <div
                className={
                  bookedCandidates
                    ? "active-tab individual-talent-tab candidates-tabs"
                    : "individual-talent-tab candidates-tabs"
                }
                onClick={(e) => {
                  handleForms("booked-candidates");
                }}
              >
                Booked
              </div>
              <div
                className={
                  rejectedCandidates
                    ? "active-tab individual-talent-tab candidates-tabs"
                    : "individual-talent-tab candidates-tabs"
                }
                onClick={(e) => {
                  handleForms("rejected-candidates");
                }}
              >
                Rejected
              </div>
            </div>

            {candidatesList && candidatesList.length > 0 && (
              <>
                <div className="list-jobs-wrapper">
                  {candidatesList?.map((candidate, index) => {
                    return (
                      <>
                        <div key={index} className="list-jobs-card">
                          <div className="recent-campaigns-wrapper">
                            <div className="campaigns-wrapper-one">
                              <div className="candidate-image-wrapper">
                                {candidate?.image && (
                                  <img
                                    className="candidate-image-styling"
                                    src={`${API.userFilePath}${candidate?.talentDetails?.image?.fileData}`}
                                    alt=""
                                  />
                                )}
                              </div>
                              <div className="campaigns-content-wrapper">
                                <div className="campaign-paid-wrapper">
                                  <div className="campaign-name ">
                                    {
                                      candidate?.talentDetails
                                        ?.preferredChildFirstname
                                    }
                                    &nbsp;
                                    {
                                      candidate?.talentDetails
                                        ?.preferredChildLastName
                                    }
                                  </div>
                                </div>
                                <div className="candidate-job">
                                  <span>Applied For</span> &nbsp;
                                  <span className="candidate-job-title">
                                    {candidate?.gigDetails?.jobTitle}
                                  </span>
                                </div>
                                <div className="candidate-job">
                                  <span>
                                    <i className="bi bi-telephone-fill"></i>
                                  </span>
                                  <span className="phone-number">
                                    {candidate?.talentDetails?.childPhone &&
                                      candidate?.talentDetails?.childPhone}
                                    {candidate?.talentDetails?.parentMobileNo &&
                                      candidate?.talentDetails?.parentMobileNo}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="campaigns-wrapper-two">
                              <div className="campaign-company">
                                <div className="campaign-company-wrapper">
                                  {candidate?.talentDetails?.parentEmail && (
                                    <>
                                      <div className="campaign-initial">
                                        {" "}
                                        {candidate?.talentDetails
                                          ?.parentEmail &&
                                          candidate?.talentDetails?.parentEmail.charAt(
                                            0
                                          )}
                                      </div>
                                      <div className="campaign-company-name">
                                        {candidate?.talentDetails?.parentEmail}
                                      </div>
                                    </>
                                  )}
                                  {candidate?.talentDetails?.adultEmail && (
                                    <>
                                      <div className="campaign-initial">
                                        {" "}
                                        {candidate?.talentDetails?.adultEmail &&
                                          candidate?.talentDetails?.adultEmail.charAt(
                                            0
                                          )}
                                      </div>
                                      <div className="campaign-company-name">
                                        {candidate?.talentDetails?.adultEmail}
                                      </div>
                                    </>
                                  )}
                                </div>
                                <div className="job-card-buttons">
                                  <div className="manage-dropdown">
                                    <div className="dropdown">
                                      <button
                                        className="btn manage-btn dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        Manage
                                      </button>
                                      <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1"
                                      >
                                        {!sortListedCandidates && (
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              onClick={(e) => {
                                                sortListCandidate(candidate);
                                              }}
                                            >
                                              Shortlist
                                            </a>
                                          </li>
                                        )}
                                        {!interviewInvitations && (
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              onClick={(e) => {
                                                setAlertpop({
                                                  status: true,
                                                  talentId: candidate?.talentId,
                                                  label: "invite",
                                                  jobId: candidate?.gigId,
                                                  candidate: candidate,
                                                });
                                                setAddress(
                                                  `Hi ${candidate?.talentDetails?.preferredChildFirstname}, We think you'd be a great fit for an exciting opportunity with us. We would love for you to apply for the ${candidate?.gigDetails?.jobTitle} role. Please apply at https://hybrid.sicsglobal.com/project/brandsandtalent/preview-job-talent?${candidate?.gigId}. Looking forward to your application! Should you need more info, please feel free to contact us at ${candidate?.brandDetails?.brandEmail} / +888 555 555 555.
                                                   Best, ${candidate?.brandDetails?.brandName}`
                                                );
                                              }}
                                            >
                                              Invite To Interview
                                            </a>
                                          </li>
                                        )}
                                        {!bookedCandidates && (
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              onClick={(e) => {
                                                bookCandidate(candidate);
                                              }}
                                            >
                                              Book
                                            </a>
                                          </li>
                                        )}
                                        {!rejectedCandidates && (
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              onClick={(e) => {
                                                setAlertpop({
                                                  status: true,
                                                  talentId: candidate?.talentId,
                                                  label: "reject",
                                                  jobId: candidate?.gigId,
                                                  candidate: candidate,
                                                });
                                              }}
                                            >
                                              Reject
                                            </a>
                                          </li>
                                        )}
                                      </ul>
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
              </>
            )}

            {candidatesList && candidatesList.length == 0 && newCandidates && (
              <>
                <div
                  style={{ textAlign: "center", padding: "20px" }}
                  className="list-jobs-wrapper"
                >
                  No Candidates Available
                </div>
              </>
            )}
            {candidatesList &&
              candidatesList.length == 0 &&
              sortListedCandidates && (
                <>
                  <div
                    style={{ textAlign: "center", padding: "20px" }}
                    className="list-jobs-wrapper"
                  >
                    No Candidates Available
                  </div>
                </>
              )}
            {candidatesList &&
              candidatesList.length == 0 &&
              interviewInvitations && (
                <>
                  <div
                    style={{ textAlign: "center", padding: "20px" }}
                    className="list-jobs-wrapper"
                  >
                    No Candidates Available
                  </div>
                </>
              )}
            {bookedCandidates && candidatesList.length == 0 && (
              <>
                <div
                  style={{ textAlign: "center", padding: "20px" }}
                  className="list-jobs-wrapper"
                >
                  No Candidates Available
                </div>
              </>
            )}
            {rejectedCandidates && candidatesList.length == 0 && (
              <>
                <div
                  style={{ textAlign: "center", padding: "20px" }}
                  className="list-jobs-wrapper"
                >
                  No Candidates Available
                </div>
              </>
            )}
          </div>
        </main>
      </>
      <Modal style={customStylesAlert} isOpen={alertpop?.status === true}>
        <div>
          {/* <div className='uploadHead'>
                        <h4 className='mt-2'>Reason For stock Return</h4>
                        <img src={CloseIcon} className='pop-close' onClick={() => { setIsModalOpen(false); }} />
                    </div> */}
          <div className="alertBox">
            <div className="col-md-12  mx-5">
              <div className="alert-icon-section">
                <i className="bi bi-headset interview-headset"></i>
                {/* <i className="alert-icon bi bi-exclamation-triangle-fill"></i> */}
              </div>
              {alertpop?.label == "invite" && (
                <>
                  <h5 className="interview-model-title">
                    Invite to Apply/Interview
                  </h5>
                  {/* <label className="toggleSwitch nolabel">
                    <input type="checkbox" onChange={handleToggle} />
                    <a></a>
                    <span>
                      <span className="left-span">Offline</span>
                      <span className="right-span">Online</span>
                    </span>
                  </label> */}
                  <div className="invite-box">
                    {interviewMode && interviewMode == "offline" && (
                      <>
                        <div className="mb-3" style={{ textAlign: "left" }}>
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label pb-2"
                          >
                            Type your message here:
                          </label>
                          <textarea
                            className="form-control invite-textarea"
                            id="exampleFormControlTextarea1"
                            value={address}
                            rows="5"
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                          ></textarea>
                        </div>
                      </>
                    )}
                    {interviewMode && interviewMode == "online" && (
                      <>
                        <div className="mb-3" style={{ textAlign: "left" }}>
                          <label className="form-label">Meeting Link</label>
                          <input
                            type="text"
                            className="form-control smaller-placeholder"
                            value={meetLink}
                            onChange={(e) => {
                              setMeetLink(e.target.value);
                            }}
                            placeholder="Paste Your Link"
                          ></input>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {alertpop?.label == "reject" && (
                <>
                  <h5 className="interview-model-title">
                    Do you wish to reject this candidate ?
                  </h5>
                </>
              )}
            </div>
          </div>
          <div className="alert-button-section">
            <button
              type="submit"
              className=" btn btn-warning model-btn-candidate"
              onClick={() => {
                setAlertpop({
                  status: false,
                  talentId: null,
                  label: null,
                  candidate: null,
                });
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" btn btn-danger alert-ok-btn model-btn-candidate"
              onClick={(e) => {
                e.preventDefault();
                setAlertpop({
                  status: false,
                  label: null,
                  candidate: null,
                });
                if (alertpop?.label === "invite" && interviewMode == "online") {
                  onlineInvite();
                } else if (
                  alertpop?.label === "invite" &&
                  interviewMode == "offline"
                ) {
                  offlineInvite();
                } else if (alertpop?.label === "reject") {
                  rejectCandidate();
                }
              }}
            >
              {alertpop?.label === "invite" && "Invite"}
              {alertpop?.label === "reject" && "Reject"}
            </button>
          </div>
        </div>
      </Modal>
      {isLoading && <Spinner />}

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default Applicants;
