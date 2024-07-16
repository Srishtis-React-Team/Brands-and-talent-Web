import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import "../assets/css/blogs.css";
import FeaturedBlogsCarousel from "../views/FeaturedBlogsCarousel";
import { API } from "../config/api";
import { ApiHelper } from "../helpers/ApiHelper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Blogs = () => {
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
  const [blogStep, setBlogStep] = useState(0);

  const location = useLocation();
  let recievedStep = location?.state?.step;
  console.log(recievedStep, "recievedStep");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (recievedStep) {
      setBlogStep(recievedStep);
    }
  }, [recievedStep]);

  useEffect(() => {
    if (blogStep) {
      console.log(blogStep, "blogStep");
      setValueTabs(blogStep);
    }
  }, [blogStep]);

  useEffect(() => {
    if (location.state && location.state.step !== undefined) {
      console.log(location.state.step, "location.state.step");
    }
  }, [location.state]);

  useEffect(() => {
    console.log(step, "steplocation");
  }, [step]);

  return (
    <>
      <Header />{" "}
      <section style={{ marginTop: "64px" }}>
        <div className="popular-header">
          <div className="container">
            <div className="header-title">Blog</div>
            {/* <div className="header-menu">
              <div>Home</div>
              <div>Learn</div>
            </div> */}
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className=" row py-3">
            <div className="col-sm-12 col-md-12 col-lg-12 featured-articles-main">
              <div className="featured-articles-title">Featured Articles</div>
              <div className="featured-articles-slider">
                <FeaturedBlogsCarousel />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="blogs-tabs col-sm-4 col-md-3">
          <div className="blogs-tabs-wrapper">
            <div className="blogs-tab-text">Industry News & Insights</div>
            <div
              className="blogs-tab-text"
              onClick={() => fetchBlogByType("case-studies")}
            >
              Case Studies
            </div>
            <div
              className="blogs-tab-text"
              onClick={() => fetchBlogByType("talent-stories")}
            >
              Talent Stories
            </div>
            <div
              className="blogs-tab-text"
              onClick={() => fetchBlogByType("talent-tips")}
            >
               Talent Tips & Tricks
            </div>
            <div
              className="blogs-tab-text"
              onClick={() => fetchBlogByType("brand-tips")}
            >
               Brand Tips & Tricks
            </div>
          </div>
        </div> */}

        <div className="container">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={valueTabs}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
                centered
              >
                <Tab
                  label="All"
                  {...a11yProps(0)}
                  style={{ textTransform: "capitalize" }}
                  onClick={() => fetchBlogByType("All")}
                />
                <Tab
                  label="News & Announcements"
                  {...a11yProps(1)}
                  style={{ textTransform: "capitalize" }}
                  onClick={() => fetchBlogByType("news & announcements")}
                />
                <Tab
                  label="Industry News & Insights"
                  {...a11yProps(2)}
                  style={{ textTransform: "capitalize" }}
                  onClick={() => fetchBlogByType("Industry News & Insights")}
                />
                <Tab
                  label="Interviews"
                  {...a11yProps(3)}
                  style={{ textTransform: "capitalize" }}
                  onClick={() => fetchBlogByType("interview")}
                />
                <Tab
                  label="Case Studies"
                  {...a11yProps(4)}
                  onClick={() => fetchBlogByType("case-studies")}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Talent Stories"
                  {...a11yProps(5)}
                  style={{ textTransform: "capitalize" }}
                  onClick={() => fetchBlogByType("talent-stories")}
                />
                <Tab
                  label="Talent Tips & Tricks"
                  {...a11yProps(6)}
                  onClick={() => fetchBlogByType("talent-tips")}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Brand Tips & Tricks"
                  {...a11yProps(7)}
                  onClick={() => fetchBlogByType("brand-tips")}
                  style={{ textTransform: "capitalize" }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={valueTabs} index={0}>
              <div className="">
                <div className=" row">
                  <div className="blog-contents col-sm-9 col-md-9">
                    {blogsLsit && blogsLsit.length > 0 && (
                      <div className="blog-card">
                        {blogsLsit?.map((item, index) => {
                          return (
                            <>
                              <div
                                className="blogs-wrapper"
                                onClick={createHandleMenuClick(item)}
                              >
                                <div className="blogimg-bx">
                                  <img
                                    className="blogs-image"
                                    src={`${API.userFilePath}${item.image}`}
                                    alt=""
                                  />
                                </div>
                                <div className="blogs-content-wrapper">
                                  <div className="blogs-subhead">
                                    {item?.title}
                                  </div>
                                  <div className="blogs-heading">
                                    {item?.heading}
                                  </div>
                                  <div className="blogs-description">
                                    {item?.description}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={1}>
              <div className="container">
                <div className=" row">
                  <div className="blog-contents col-sm-9 col-md-9">
                    {blogsLsit && blogsLsit.length > 0 && (
                      <div className="blog-card">
                        {blogsLsit?.map((item, index) => {
                          return (
                            <>
                              <div
                                className="blogs-wrapper"
                                onClick={createHandleMenuClick(item)}
                              >
                                <div className="blogimg-bx">
                                  <img
                                    className="blogs-image"
                                    src={`${API.userFilePath}${item.image}`}
                                    alt=""
                                  />
                                </div>
                                <div className="blogs-content-wrapper">
                                  <div className="blogs-subhead">
                                    {item?.title}
                                  </div>
                                  <div className="blogs-heading">
                                    {item?.heading}
                                  </div>
                                  <div className="blogs-description">
                                    {item?.description}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={2}>
              <div className="container">
                <div className=" row">
                  <div className="blog-contents col-sm-9 col-md-9">
                    {blogsLsit && blogsLsit.length > 0 && (
                      <div className="blog-card">
                        {blogsLsit?.map((item, index) => {
                          return (
                            <>
                              <div
                                className="blogs-wrapper"
                                onClick={createHandleMenuClick(item)}
                              >
                                <div className="blogimg-bx">
                                  <img
                                    className="blogs-image"
                                    src={`${API.userFilePath}${item.image}`}
                                    alt=""
                                  />
                                </div>
                                <div className="blogs-content-wrapper">
                                  <div className="blogs-subhead">
                                    {item?.title}
                                  </div>
                                  <div className="blogs-heading">
                                    {item?.heading}
                                  </div>
                                  <div className="blogs-description">
                                    {item?.description}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={3}>
              <div className="container">
                <div className=" row">
                  <div className="blog-contents col-sm-9 col-md-9">
                    {blogsLsit && blogsLsit.length > 0 && (
                      <div className="blog-card">
                        {blogsLsit?.map((item, index) => {
                          return (
                            <>
                              <div
                                className="blogs-wrapper"
                                onClick={createHandleMenuClick(item)}
                              >
                                <div className="blogimg-bx">
                                  <img
                                    className="blogs-image"
                                    src={`${API.userFilePath}${item.image}`}
                                    alt=""
                                  />
                                </div>
                                <div className="blogs-content-wrapper">
                                  <div className="blogs-subhead">
                                    {item?.title}
                                  </div>
                                  <div className="blogs-heading">
                                    {item?.heading}
                                  </div>
                                  <div className="blogs-description">
                                    {item?.description}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={4}>
              <div className="container">
                <div className=" row">
                  <div className="blog-contents col-sm-9 col-md-9">
                    {blogsLsit && blogsLsit.length > 0 && (
                      <div className="blog-card">
                        {blogsLsit?.map((item, index) => {
                          return (
                            <>
                              <div
                                className="blogs-wrapper"
                                onClick={createHandleMenuClick(item)}
                              >
                                <div className="blogimg-bx">
                                  <img
                                    className="blogs-image"
                                    src={`${API.userFilePath}${item.image}`}
                                    alt=""
                                  />
                                </div>
                                <div className="blogs-content-wrapper">
                                  <div className="blogs-subhead">
                                    {item?.title}
                                  </div>
                                  <div className="blogs-heading">
                                    {item?.heading}
                                  </div>
                                  <div className="blogs-description">
                                    {item?.description}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={5}>
              <div className="container">
                <div className=" row">
                  <div className="blog-contents col-sm-9 col-md-9">
                    {blogsLsit && blogsLsit.length > 0 && (
                      <div className="blog-card">
                        {blogsLsit?.map((item, index) => {
                          return (
                            <>
                              <div
                                className="blogs-wrapper"
                                onClick={createHandleMenuClick(item)}
                              >
                                <div className="blogimg-bx">
                                  <img
                                    className="blogs-image"
                                    src={`${API.userFilePath}${item.image}`}
                                    alt=""
                                  />
                                </div>
                                <div className="blogs-content-wrapper">
                                  <div className="blogs-subhead">
                                    {item?.title}
                                  </div>
                                  <div className="blogs-heading">
                                    {item?.heading}
                                  </div>
                                  <div className="blogs-description">
                                    {item?.description}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={6}>
              <div className="container">
                <div className=" row">
                  <div className="blog-contents col-sm-9 col-md-9">
                    {blogsLsit && blogsLsit.length > 0 && (
                      <div className="blog-card">
                        {blogsLsit?.map((item, index) => {
                          return (
                            <>
                              <div
                                className="blogs-wrapper"
                                onClick={createHandleMenuClick(item)}
                              >
                                <div className="blogimg-bx">
                                  <img
                                    className="blogs-image"
                                    src={`${API.userFilePath}${item.image}`}
                                    alt=""
                                  />
                                </div>
                                <div className="blogs-content-wrapper">
                                  <div className="blogs-subhead">
                                    {item?.title}
                                  </div>
                                  <div className="blogs-heading">
                                    {item?.heading}
                                  </div>
                                  <div className="blogs-description">
                                    {item?.description}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={7}>
              <div className="container">
                <div className=" row">
                  <div className="blog-contents col-sm-9 col-md-9">
                    {blogsLsit && blogsLsit.length > 0 && (
                      <div className="blog-card">
                        {blogsLsit?.map((item, index) => {
                          return (
                            <>
                              <div
                                className="blogs-wrapper"
                                onClick={createHandleMenuClick(item)}
                              >
                                <div className="blogimg-bx">
                                  <img
                                    className="blogs-image"
                                    src={`${API.userFilePath}${item.image}`}
                                    alt=""
                                  />
                                </div>
                                <div className="blogs-content-wrapper">
                                  <div className="blogs-subhead">
                                    {item?.title}
                                  </div>
                                  <div className="blogs-heading">
                                    {item?.heading}
                                  </div>
                                  <div className="blogs-description">
                                    {item?.description}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CustomTabPanel>
          </Box>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blogs;
