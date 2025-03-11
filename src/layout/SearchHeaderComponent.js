import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/dashboard.css";
import { useNavigate } from "react-router";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu, MenuListboxSlotProps } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
import PopUp from "../components/PopUp";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import { Button, Modal, Box, Typography } from "@mui/material";
import SearchPaths from "../components/SearchPaths";
const SearchHeaderComponent = ({ onData }) => {
  const navigate = useNavigate();
  const btLogo = require("../assets/images/LOGO.png");
  const gridLogo = require("../assets/icons/4243313_ux_basic_app_menu_icon 1.png");
  const [menuOpen, setMenuOpen] = useState(false);
  const [signupCategory, setSignupCategory] = useState("talent");
  const [above_18, setAbove_18] = useState(false);
  const [below_18, setBelow_18] = useState(false);
  const [talent, setTalent] = useState(true);
  const [brand, setBrand] = useState(false);
  const [currentUserId, setcurrentUserId] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [currentUser_image, setCurrentUserImage] = useState("");
  const [currentUser_type, setCurrentUserType] = useState("");
  const [talentData, setTalentData] = useState();
  const [talentId, setTalentId] = useState(null);
  const searchPathOptions = SearchPaths(); // Call the function/component to get the options
  const [brandData, setBrandData] = useState(null);

  useEffect(() => {
    setcurrentUserId(localStorage.getItem("currentUser"));
    setCurrentUserImage(localStorage.getItem("currentUserImage"));
    setCurrentUserType(localStorage.getItem("currentUserType"));
  }, [currentUserId]);
  useEffect(() => {}, [currentUser_type]);

  const logout = () => {
    localStorage.clear();
    setcurrentUserId(null);
    setMessage("Logged out Successfully");
    setOpenPopUp(true);
    setTimeout(function () {
      setOpenPopUp(false);
      navigate("/");
    }, 1000);
  };

  function userType(e) {
    if (e == "talent") {
      setTalent(true);
      setSignupCategory("talent");
    } else {
      setTalent(false);
    }
    if (e == "brand") {
      setBrand(true);
      setSignupCategory("brand");
    } else {
      setBrand(false);
    }
  }
  useEffect(() => {
    getBrand();
  }, []);

  const getBrand = async () => {
    await ApiHelper.get(`${API.getBrandById}${localStorage.getItem("brandId")}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setBrandData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {});
  };

  const handleRegister = () => {
    if (brand === true) {
      navigate("/signup", {
        state: { signupCategory: signupCategory },
      });
    } else if (talent === true) {
      setTimeout(() => {
        // sendMessageToParent("open-kids-form");
        openModal();
      }, 800);
    }
  };

  useEffect(() => {
    setTimeout(function () {
      setTalentId(localStorage.getItem("userId"));
    }, 1000);

    if (talentId) {
      getTalentById();
    }
  }, [talentId]);

  const getTalentById = async () => {
    await ApiHelper.post(
      `${API.getTalentById}${localStorage.getItem("userId")}`
    )
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setTalentData(resData.data.data, "resData.data.data");
          }
        }
      })
      .catch((err) => {});
  };

  const modalRef = useRef(null);
  const openModal = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  const handleClick = (data) => {
    window.scrollTo(0, 0); // Scroll to top on link click
    if (data == "post-job") {
      if (!currentUserId) {
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else if (currentUser_type === "brand" && currentUserId) {
        navigate("/create-jobs");
      }
    }

    if (data == "find-talent") {
      if (!currentUserId) {
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else if (currentUser_type === "brand" && currentUserId) {
        // if (brandData?.planName === "Pro" || brandData?.planName === "Premium"){
        //   setMessage("Upgrade Pro or Premium Plan to unlock this feature");
        //   setOpenPopUp(true);
        //   setTimeout(function () {
        //     setOpenPopUp(false);
        //     navigate("/pricing");
        //   }, 3000);
        // }
        //  else {
        navigate("/find-talents");
        // }
        navigate("/find-talent");
      } else if (currentUser_type === "talent" && currentUserId) {
        setMessage("You need to sign Up as Brand to find talents");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/brand-firstGig");
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if (onData === "talent-signup") {
      setTalent(true);
      openModal();
    }
  }, [onData]);

  const createHandleMenuClick = (menuItem) => {
    return () => {
      if (menuItem === "dashboard") {
        if (currentUser_type === "talent") {
          navigate("/talent", { state: { talentData: talentData } });
        } else if (currentUser_type === "brand") {
          navigate(`brand-dashboard`);
        }
      }
      if (menuItem === "edit") {
        if (talentData?.accountBlock == false) {
          if (currentUser_type === "talent") {
            if (talentData?.adminApproved === true) {
              navigate(`/edit-talent-profile?${talentData?._id}`);
            } else {
              handleClose();

              setMessage(
                "After your verification is approved, you can update your profile"
              );
              setOpenPopUp(true);
              setTimeout(() => {
                setOpenPopUp(false);
              }, 2000);
            }
          } else if (currentUser_type === "brand") {
            navigate(`/`);
          }
        } else if (talentData?.accountBlock == true) {
          setMessage("Please upgrade your plan to access your profile");
          setOpenPopUp(true);
          setTimeout(function () {
            setOpenPopUp(false);
            navigate(`/pricing`);
          }, 3000);
        }
      }
    };
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (query === "talents") {
      navigate.push("/talents");
    } else if (query === "projects") {
      navigate.push("/");
    } else {
      navigate.push(`/search?query=${query}`);
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const searchModalStyle = {
    position: "absolute",
    top: "10%", // Adjust this value to move the modal further up or down
    left: "50%",
    transform: "translate(-50%, 0%)", // Remove the vertical centering transform
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLabelClick = (route) => {
    if (route == "/") {
      navigate("/");
    }
    if (route == "/privacy-policy") {
      navigate("/privacy-policy");
    }
    if (route == "/terms-conditions") {
      navigate("/terms-conditions");
    }
    if (route === "/find-talent") {
      if (!currentUserId || currentUser_type != "brand") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/talent") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/pricing") {
      navigate(route);
    } else if (route === "/resources") {
      navigate(route);
    } else if (route === "/signup") {
      navigate(route);
    } else if (route === "/about-us") {
      navigate("/about-us");
    } else if (route === "/community-guidelines") {
      navigate(route);
    } else if (route === "/blogs") {
      navigate(route);
    } else if (route === "/post-job") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate("/create-jobs");
      }
    } else if (route === "/how-it-works") {
      navigate(route);
    } else if (route === "/login") {
      navigate("/login");
    } else if (route === "/talent-dashboard") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/brand") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/list-jobs") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/applied-jobs") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/saved-jobs") {
      if (!currentUserId) {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/create-jobs") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/find-talents") {
      if (!currentUserId) {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else if (currentUserId && currentUser_type == "talent") {
        navigate("/find-talent");
      } else if (currentUserId && currentUser_type == "brand") {
        navigate(route);
      }
    } else if (route === "/favorite-talents") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/brand-help") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/applicants") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/edit-talent-profile") {
      if (talentData?.adminApproved === true) {
        navigate(`${"/edit-talent-profile"}?${talentData?._id}`);
      } else {
        handleClose();

        setMessage(
          "After your verification is approved, you can update your profile"
        );
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 2000);
      }
    } else if (route === "/edit-brand-profile") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/talent-notification") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/talent-settings") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/brand-settings") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/talent-home") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/talent-help") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/brand-notification") {
      if (!currentUserId || currentUser_type == "talent") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    } else if (route === "/get-booked") {
      if (!currentUserId || currentUser_type == "brand") {
        handleClose();
        setMessage("You must be logged in");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
          navigate("/login");
        }, 1000);
      } else {
        navigate(route);
      }
    }

    if (route == "/careers") {
      handleClose();
      navigate("/careers");
    }
    if (route == "/become-affiliate") {
      handleClose();
      navigate("/become-affiliate");
    }
    if (route == "/investors") {
      handleClose();
      navigate("/investors");
    }
    if (route == "/feedback") {
      handleClose();
      navigate("/feedback");
    }

    if (route == "/talent-signup") {
      handleClose();
      handleRegister();
    }
    if (route == "/contact-us") {
      handleClose();
      navigate("/contact-us");
    }
    if (route == "/brand-firstGig") {
      navigate(route);
    }
  };

  const filteredOptions = Array.from(
    new Set(
      searchPathOptions
        .filter(
          (option) =>
            option.label.toLowerCase().startsWith(searchTerm.toLowerCase()) // Changed startsWith to includes for partial matching
        )
        .map((option) => option.label)
    )
  ).map((label) => searchPathOptions.find((option) => option.label === label));

  return (
    <>
      <div className="searchBtn">
        <i className="fas fa-search" onClick={handleOpen}></i>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={searchModalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                ></input>
              </form>
              {searchTerm && (
                <>
                  <div className="search-path-options">
                    {searchTerm &&
                      filteredOptions.map((option) => (
                        <>
                          <div
                            className="search-path-wrapper"
                            onClick={() => handleLabelClick(option.routes)}
                          >
                            <i className="fas fa-search search-path-icon"></i>
                            <div
                              className="search-path-labels"
                              key={option.routes}
                            >
                              {option.label}
                            </div>
                          </div>
                        </>
                      ))}

                    {filteredOptions.length == 0 && (
                      <>
                        <div className="invalid-fields">No results found!</div>
                      </>
                    )}
                  </div>
                </>
              )}
            </Typography>
          </Box>
        </Modal>
      </div>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default SearchHeaderComponent;
