import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import "../../src/assets/css/commingsoon.css";
import FeaturedBlogsCarousel from "../views/FeaturedBlogsCarousel";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import nightVideo from "../assets/images/night-sky.mp4";

const CommingSoon = () => {
  const [valueTabs, setValueTabs] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  const navigate = useNavigate();
  const [blogsList, setBlogsList] = useState([]);
  const image1 = require("../assets/images/blogs/blog1.png");
  const image2 = require("../assets/images/blogs/blog2.png");
  const image3 = require("../assets/images/blogs/blog3.png");
  const image4 = require("../assets/images/blogs/blog4.png");
  const image5 = require("../assets/images/blogs/blog5.png");

  useEffect(() => {
    fetchBlogByType("Industry News & Insights");
  }, []);

  const [blogsLsit, setBlogsLsit] = useState([]);

  const fetchBlogByType = async (type) => {
    const formdata = {
      type: type,
    };
    await ApiHelper.post(API.fetchBlogByType, formdata)
      .then((resData) => {
        if (resData) {
          console.log(resData?.data?.data, "resData fetchBlogByType");
          setBlogsLsit(resData?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createHandleMenuClick = (blogData) => {
    return () => {
      navigate(`/view-blog`, {
        state: { blogData },
      });
    };

    // if (menuItem == "find-talent") {
    //   setMessage("You need to sign Up as Brand to find talents");
    //   setOpenPopUp(true);
    //   setTimeout(function() {
    //     setOpenPopUp(false);
    //     navigate("/brand-firstGig");
    //   }, 3000);
    // }
  };

  const location = useLocation();
  let recievedStep = location?.state?.step;
  console.log(recievedStep, "recievedStep");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (recievedStep) {
      setValueTabs(recievedStep);
    }
  }, []);

  useEffect(() => {
    if (location.state && location.state.step !== undefined) {
      console.log(location.state.step, "location.state.step");
    }
  }, [location.state]);

  useEffect(() => {
    console.log(step, "steplocation");
  }, [step]);

  const logoWhite = require("../assets/images/logo-white.png");

  return (
    <>
      <div className="combgCover">
        <video id="backgroundVideo" autoPlay loop playsInline muted>
          <source src={nightVideo} type="video/mp4"></source>
        </video>

        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            <div className="cover-container">
              <div className="masthead clearfix">
                <div className="inner">
                  <h3 className="masthead-brand">
                    <img className="comLogo" src={logoWhite} alt="logo"></img>
                  </h3>
                </div>
              </div>
              <div className="inner cover">
                <h1 className="cover-heading">Coming Soon</h1>
                <p className="lead cover-copy">
                  Our website is launching soon. Come back and check it out.
                </p>
                <nav className="nav-masthead">
                  <a className="nav-social" href="#" title="Facebook">
                    <i className="fab fa-facebook-f" aria-hidden="true"></i>
                  </a>
                  <a className="nav-social" href="#" title="Twitter">
                    <i className="fab fa-twitter" aria-hidden="true"></i>
                  </a>
                  <a className="nav-social" href="#" title="Youtube">
                    <i className="fab fa-youtube" aria-hidden="true"></i>
                  </a>
                  <a className="nav-social" href="#" title="Instagram">
                    <i className="fab fa-instagram" aria-hidden="true"></i>
                  </a>
                </nav>
              </div>
              <div className="mastfoot">
                <div className="inner">
                  <p>&copy; BrandsandTalent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommingSoon;
