import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import React, { useEffect, useState } from "react";
import "../assets/css/blogs.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";

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

const HowItWorks = () => {
  useEffect(() => {}, []);
  const [question_1, selectQuestion1] = useState(true);
  const [question_2, selectQuestion2] = useState(false);
  const [valueTabs, setValueTabs] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  function handleForms(e) {
    if (e == "question_1") {
      selectQuestion1(!question_1);
    }
    if (e == "question_2") {
      selectQuestion2(!question_2);
    }
  }

  const [content, setContent] = useState([]);
  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    fetchContentByType();
    getFaq();
  }, []);

  const fetchContentByType = async () => {
    const formData = {
      contentType: "How It works",
    };
    await ApiHelper.post(API.fetchContentByType, formData)
      .then((resData) => {
        if (resData) {
          setContent(resData?.data?.data?.items);
        }
      })
      .catch((err) => {});
  };

  const [brandsFaq, setBrandsFaq] = useState([]);
  const [talentsFaq, setTalentsFaq] = useState([]);
  const [bestPracticesFaq, setBestPracticesFaq] = useState([]);

  const getFaq = async () => {
    const brands = [];
    const talents = [];
    const bestPractices = [];
    const formData = {
      contentType: "faq",
    };
    await ApiHelper.post(API.fetchContentByType, formData)
      .then((resData) => {
        if (resData) {
          setFaqList(resData?.data?.data?.items);

          resData?.data?.data?.items.forEach((item) => {
            if (item.userType === "Brands") {
              brands.push(item);
              setBrandsFaq(brands);
            } else if (item.userType === "Talent") {
              talents.push(item);
              setTalentsFaq(talents);
            } else if (item.userType === "Best Practices") {
              bestPractices.push(item);
              setBestPracticesFaq(bestPractices);
            }
          });

          setBrandsFaq(brands);
          setTalentsFaq(talents);
          setBestPracticesFaq(bestPractices);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <section style={{ marginTop: "64px" }}>
        <div className="popular-header">
          <div className="container">
            <div className="header-title">How It Works</div>
            {/* <div className="header-menu">
              <div>Home</div>
              <div>Learn</div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="howIts">
        <div className="container">
          <div className="resources-main">
            <div className="resources">
              <h1 className="howworks-title widthParg text-center" id="brand">
                Welcome to Brands & Talent (BT), your gateway to a vibrant
                community of creators, influencers, talent, brands, and clients.
                Whether you're a brand/client seeking talent or a creator
                looking to showcase your work, our platform offers a seamless
                and empowering experience. Here's how it works:
              </h1>

              <div>
                {/* style={{
          width: '600px',
          height: '400px',
          borderRadius: '15px',
        }} */}
              </div>

              <div className="howitworks-labels">
                <div className="howitworks-labels-text">
                  <a href="#brand">Brands / Clients</a>
                </div>
                <div className="howitworks-labels-text">
                  <a href="#talent">Talent</a>
                </div>
                <div className="howitworks-labels-text">
                  <a href="#faq">FAQ</a>
                </div>
              </div>

              <div>
                <h2 className="maintitles text-center">
                  For Brands / Clients{" "}
                </h2>
                <div className="video-container">
                  <video
                    src="https://brandsandtalent.com/backend/uploads/db93829f-8cf9-4787-9d2e-6ae76b9ff3ae.mp4"
                    autoPlay
                    loop
                    controls
                    className="responsive-video mb-3"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="how-it-works-mobile-only">
                  {content
                    .filter((resource) => resource.userType === "Brands")
                    .map((resource, index) => (
                      <div
                        key={resource.uniqueId}
                        className=" align-items-center row"
                      >
                        {index % 2 === 0 ? (
                          <>
                            <div
                              className="resource-name mb-3"
                              dangerouslySetInnerHTML={{
                                __html: resource.title,
                              }}
                            />
                            <div className="resource-image-wrapper imgL col-md-6">
                              <div className="resource-image-padding">
                                {resource.image ? (
                                  <img
                                    className="resource-image imgWid"
                                    src={resource.image}
                                    alt="Resource"
                                  />
                                ) : (
                                  <div className="placeholder">
                                    No Image Available
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="resource-content-wrapper col-md-6 padSpace">
                              <div className="resource-description space">
                                {resource.description.map((desc, descIndex) => (
                                  <div
                                    key={descIndex}
                                    dangerouslySetInnerHTML={{
                                      __html: desc,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div
                              className="resource-name mb-3"
                              dangerouslySetInnerHTML={{
                                __html: resource.title,
                              }}
                            />
                            <div className="resource-image-wrapper imgL col-md-6">
                              <div className="resource-image-padding">
                                {resource.image ? (
                                  <img
                                    className="resource-image imgWid"
                                    src={resource.image}
                                    alt="Resource"
                                  />
                                ) : (
                                  <div className="placeholder">
                                    No Image Available
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="resource-content-wrapper col-md-6 padSpace">
                              <div className="resource-description space">
                                {resource.description.map((desc, descIndex) => (
                                  <div
                                    key={descIndex}
                                    dangerouslySetInnerHTML={{
                                      __html: desc,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                </div>

                <div className="how-it-works-desktop-only">
                  {content
                    .filter((resource) => resource.userType === "Brands")
                    .map((resource, index) => (
                      <div
                        key={resource.uniqueId}
                        className="resource-wrapper align-items-center row"
                      >
                        {index % 2 === 0 ? (
                          <>
                            <div className="resource-image-wrapper imgL col-md-6">
                              <div className="resource-image-padding">
                                {resource.image ? (
                                  <img
                                    className="resource-image imgWid"
                                    src={resource.image}
                                    alt="Resource"
                                  />
                                ) : (
                                  <div className="placeholder">
                                    No Image Available
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="resource-content-wrapper col-md-6 padSpace">
                              <div
                                className="resource-name"
                                dangerouslySetInnerHTML={{
                                  __html: resource.title,
                                }}
                              />
                              <div className="resource-description space">
                                {resource.description.map((desc, descIndex) => (
                                  <div
                                    key={descIndex}
                                    dangerouslySetInnerHTML={{ __html: desc }}
                                  />
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="resource-content-wrapper col-md-6 padSpace">
                              <div
                                className="resource-name"
                                dangerouslySetInnerHTML={{
                                  __html: resource.title,
                                }}
                              />
                              <div className="resource-description space">
                                {resource.description.map((desc, descIndex) => (
                                  <div
                                    key={descIndex}
                                    dangerouslySetInnerHTML={{ __html: desc }}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="resource-image-wrapper imgL col-md-6">
                              <div className="resource-image-padding">
                                {resource.image ? (
                                  <img
                                    className="resource-image imgWid"
                                    src={resource.image}
                                    alt="Resource"
                                  />
                                ) : (
                                  <div className="placeholder">
                                    No Image Available
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <div id="talent">
                  <h2 className="maintitles text-center">For Talent</h2>

                  <div className="video-container">
                    <video
                      src="https://brandsandtalent.com/backend/uploads/7813127a-686c-4e23-bed6-dc3ec51784ec.mp4"
                      loop
                      controls
                      className="responsive-video mb-3"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="how-it-works-mobile-only">
                    {content
                      .filter((resource) => resource.userType === "Talent")
                      .map((resource, index) => (
                        <div
                          key={resource.uniqueId}
                          className=" align-items-center row"
                        >
                          {index % 2 === 0 ? (
                            <>
                              <div
                                className="resource-name"
                                dangerouslySetInnerHTML={{
                                  __html: resource.title,
                                }}
                              />
                              <div className="resource-image-wrapper imgL col-md-6">
                                <div className="resource-image-padding">
                                  {resource.image ? (
                                    <img
                                      className="resource-image imgWid"
                                      src={resource.image}
                                      alt="Resource"
                                    />
                                  ) : (
                                    <div className="placeholder">
                                      No Image Available
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="resource-content-wrapper col-md-6 padSpace">
                                <div className="resource-description space">
                                  {resource.description.map(
                                    (desc, descIndex) => (
                                      <div
                                        key={descIndex}
                                        dangerouslySetInnerHTML={{
                                          __html: desc,
                                        }}
                                      />
                                    )
                                  )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className="resource-name"
                                dangerouslySetInnerHTML={{
                                  __html: resource.title,
                                }}
                              />
                              <div className="resource-image-wrapper imgL col-md-6">
                                <div className="resource-image-padding">
                                  {" "}
                                  {resource.image ? (
                                    <img
                                      className="resource-image imgWid"
                                      src={resource.image}
                                      alt="Resource"
                                    />
                                  ) : (
                                    <div className="placeholder">
                                      No Image Available
                                    </div>
                                  )}{" "}
                                </div>
                              </div>
                              <div className="resource-content-wrapper col-md-6 padSpace">
                                <div className="resource-description space">
                                  {resource.description.map(
                                    (desc, descIndex) => (
                                      <div
                                        key={descIndex}
                                        dangerouslySetInnerHTML={{
                                          __html: desc,
                                        }}
                                      />
                                    )
                                  )}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                  </div>
                  <div className="how-it-works-desktop-only">
                    {content
                      .filter((resource) => resource.userType === "Talent")
                      .map((resource, index) => (
                        <div
                          key={resource.uniqueId}
                          className="resource-wrapper align-items-center row"
                        >
                          {index % 2 === 0 ? (
                            <>
                              <div className="resource-image-wrapper imgL col-md-6">
                                <div className="resource-image-padding">
                                  {resource.image ? (
                                    <img
                                      className="resource-image imgWid"
                                      src={resource.image}
                                      alt="Resource"
                                    />
                                  ) : (
                                    <div className="placeholder">
                                      No Image Available
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="resource-content-wrapper col-md-6 padSpace">
                                <div
                                  className="resource-name"
                                  dangerouslySetInnerHTML={{
                                    __html: resource.title,
                                  }}
                                />
                                <div className="resource-description space">
                                  {resource.description.map(
                                    (desc, descIndex) => (
                                      <div
                                        key={descIndex}
                                        dangerouslySetInnerHTML={{
                                          __html: desc,
                                        }}
                                      />
                                    )
                                  )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="resource-content-wrapper col-md-6 padSpace">
                                <div
                                  className="resource-name"
                                  dangerouslySetInnerHTML={{
                                    __html: resource.title,
                                  }}
                                />
                                <div className="resource-description space">
                                  {resource.description.map(
                                    (desc, descIndex) => (
                                      <div
                                        key={descIndex}
                                        dangerouslySetInnerHTML={{
                                          __html: desc,
                                        }}
                                      />
                                    )
                                  )}
                                </div>
                              </div>
                              <div className="resource-image-wrapper imgL col-md-6">
                                <div className="resource-image-padding">
                                  {" "}
                                  {resource.image ? (
                                    <img
                                      className="resource-image imgWid"
                                      src={resource.image}
                                      alt="Resource"
                                    />
                                  ) : (
                                    <div className="placeholder">
                                      No Image Available
                                    </div>
                                  )}{" "}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* <div className="resource-wrapper align-items-center row">
                <div className="resource-image-wrapper imgL col-md-6">
                  <img
                    className="resource-image imgWid"
                    src={resorcesBanner1}
                  ></img>
                </div>
                <div className="resource-content-wrapper col-md-6 padSpace">
                  <h4 className="resource-name">
                    Create a Job Post for Your Project
                  </h4>
                  <div className="resource-description space">
                    Start by creating a job post  with the project brief
                    outlining your requirements, objectives, and budget. Provide
                    as much detail as possible to attract the right talent for
                    your project. While creating the job post/campaign, you can
                    choose any of the two options on how you would like to
                    receive applications : Option 1: Easy Apply (you can review
                    and manage the applicants directly on your BT dashboard) or
                    Option 2: External Dashboard (you will receive applicants
                    outside the BT platform)
                  </div>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row revs">
                <div className="resource-content-wrapper col-md-6 padSpaceR">
                  <h4 className="resource-name">Browse Talent</h4>
                  <div className="resource-description space">
                    our diverse pool of talented creators and influencers. Use
                    our advanced search filters to narrow down your options
                    based on skills, expertise, location, and more. You can also
                    use our ‘’invite to apply’’ feature to invite potential
                    talent to apply for your job post.
                  </div>
                </div>
                <div className="resource-image-wrapper col-md-6">
                  <img
                    className="resource-image imgWid"
                    src={resorcesBanner2}
                  ></img>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row">
                <div className="resource-image-wrapper imgL col-md-6">
                  <img
                    className="resource-image imgWid"
                    src={resorcesBanner3}
                  ></img>
                </div>
                <div className="resource-content-wrapper col-md-6 padSpace">
                  <h4 className="resource-name">Review Applicants</h4>
                  <div className="resource-description space">
                    Review the applicants and shortlist or reject them based on
                    your requirements. You can also bookmark strong applicants
                    for your project.
                  </div>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row revs">
                <div className="resource-content-wrapper col-md-6 padSpaceR">
                  <h4 className="resource-name">Connect with Talent</h4>
                  <div className="resource-description space">
                    Once you've found the perfect matches for your project, send
                    a direct message or collaboration request to the talent.
                    Discuss the details, negotiate rates, and finalize the terms
                    of your collaboration.
                  </div>
                </div>
                <div className="resource-image-wrapper col-md-6">
                  <img
                    className="resource-image imgWid"
                    src={resorcesBanner4}
                  ></img>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row">
                <div className="resource-image-wrapper imgL col-md-6">
                  <img
                    className="resource-image imgWid"
                    src={resorcesBanner5}
                  ></img>
                </div>
                <div className="resource-content-wrapper col-md-6 padSpace">
                  <h4 className="resource-name">Manage Your Projects</h4>
                  <div className="resource-description space">
                    Track the progress of your projects, communicate with
                    talent, and ensure timely delivery of work through our chat
                    features on the platform.
                  </div>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row mb-3 revs">
                <div className="resource-content-wrapper col-md-6 padSpaceR">
                  <h4 className="resource-name">Leave Feedback</h4>
                  <div className="resource-description space">
                    After the completion of a project, you can leave feedback
                    and ratings for the talent on the BT platform based on your
                    experience. Your feedback helps build a trustworthy and
                    reliable community on our platform.
                  </div>
                </div>
                <div
                  className="resource-image-wrapper col-md-6 mb-3"
                  id="talent"
                >
                  <img
                    className="resource-image imgWid"
                    src={resorcesBanner6}
                  ></img>
                </div>
              </div>

              <h2 className="maintitles text-center mt-5"> Talent</h2>

              <div className="resource-wrapper align-items-center row">
                <div className="resource-image-wrapper imgL col-md-6">
                  <img
                    className="resource-image imgWid"
                    src={resorcesBanner7}
                  ></img>
                </div>
                <div className="resource-content-wrapper col-md-6 padSpace">
                  <h4 className="resource-name">Create Your Profile</h4>
                  <div className="resource-description space">
                    Build a compelling profile that showcases your skills,
                    expertise, portfolio, and rates. Highlight your unique
                    talents and experiences to attract potential clients.
                  </div>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row revs">
                <div className="resource-content-wrapper col-md-6 padSpaceR">
                  <h4 className="resource-name">Browse Jobs/Projects</h4>
                  <div className="resource-description space">
                    Explore a wide range of job posts posted by brands and
                    clients. Filter jobs based on your interests, expertise, and
                    availability.
                  </div>
                </div>
                <div className="resource-image-wrapper col-md-6">
                  <img
                    className="resource-image imgWid"
                    src={resorcesBanner8}
                  ></img>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row">
                <div className="resource-image-wrapper imgL col-md-6">
                  <img
                    className="resource-image imgWid"
                    src={resorcesBanner9}
                  ></img>
                </div>
                <div className="resource-content-wrapper col-md-6 padSpace">
                  <h4 className="resource-name">Chat with Brands/Clients</h4>
                  <div className="resource-description space">
                    Chat directly with the brand/client if you have any specific
                    questions regarding their job post/project.
                  </div>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row revs">
                <div className="resource-content-wrapper col-md-6 padSpaceR">
                  <h4 className="resource-name">Submit Application</h4>
                  <div className="resource-description space">
                    Make sure your profile is up to date before applying. Apply
                    directly via ‘’easy apply’’ button or as per the instruction
                    in the job post.
                  </div>
                </div>
                <div className="resource-image-wrapper  col-md-6">
                  <img
                    className="resource-image imgWid"
                    src={resorcesBanner10}
                  ></img>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row">
                <div className="resource-image-wrapper imgL col-md-6">
                  <img
                    className="resource-image imgWid"
                    src={resorcesBanner11}
                  ></img>
                </div>
                <div className="resource-content-wrapper col-md-6 padSpace">
                  <h4 className="resource-name">Collaborate with Clients</h4>
                  <div className="resource-description space">
                    Communicate with clients, negotiate rates, and clarify
                    project requirements before accepting collaboration offers.
                    Ensure clear communication and alignment on expectations.
                  </div>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row revs">
                <div className="resource-content-wrapper col-md-6 padSpaceR">
                  <h4 className="resource-name">Deliver High-Quality Work</h4>
                  <div className="resource-description space">
                    Once accepted for a project, deliver high-quality work
                    within the agreed-upon timeframe. Keep clients updated on
                    your progress and seek feedback to ensure satisfaction.
                  </div>
                </div>
                <div className="resource-image-wrapper col-md-6" id="faq">
                  <img
                    className="resource-image imgWid"
                    src={resorcesBanner12}
                  ></img>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="howIts mt-5" id="faq">
        <h2 className="maintitles text-center">
          Frequently Asked Questions (FAQs)
        </h2>
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
                  label="Brands/Clients"
                  {...a11yProps(0)}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Talent"
                  {...a11yProps(1)}
                  style={{ textTransform: "capitalize" }}
                />
                <Tab
                  label="Best Practices"
                  {...a11yProps(2)}
                  style={{ textTransform: "capitalize" }}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={valueTabs} index={0}>
              <div className="faq-section faqWraper">
                <div className="accordion accordion-pad" id="accordionExample">
                  {brandsFaq.map((faq, index) => (
                    <div className="accordion-item" key={faq.uniqueId}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded="true"
                          aria-controls={`collapse${index}`}
                          dangerouslySetInnerHTML={{ __html: faq.title }}
                        />
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }`}
                        aria-labelledby={`heading${index}`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {faq.description.map((desc, i) => (
                            <div
                              key={i}
                              dangerouslySetInnerHTML={{ __html: desc }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={1}>
              <div className="faq-section faqWraper">
                <div className="accordion accordion-pad" id="accordionExample">
                  {talentsFaq.map((faq, index) => (
                    <div className="accordion-item" key={faq.uniqueId}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded="true"
                          aria-controls={`collapse${index}`}
                          dangerouslySetInnerHTML={{ __html: faq.title }}
                        />
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }`}
                        aria-labelledby={`heading${index}`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {faq.description.map((desc, i) => (
                            <div
                              key={i}
                              dangerouslySetInnerHTML={{ __html: desc }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={valueTabs} index={2}>
              <div className="faq-section faqWraper">
                <div className="accordion accordion-pad" id="accordionExample">
                  {bestPracticesFaq.map((faq, index) => (
                    <div className="accordion-item" key={faq.uniqueId}>
                      <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapse${index}`}
                          aria-expanded="true"
                          aria-controls={`collapse${index}`}
                          dangerouslySetInnerHTML={{ __html: faq.title }}
                        />
                      </h2>
                      <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${
                          index === 0 ? "show" : ""
                        }`}
                        aria-labelledby={`heading${index}`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          {faq.description.map((desc, i) => (
                            <div
                              key={i}
                              dangerouslySetInnerHTML={{ __html: desc }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
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

export default HowItWorks;
