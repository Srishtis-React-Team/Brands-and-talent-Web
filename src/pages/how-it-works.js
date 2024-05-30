import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import React, { useEffect, useState } from "react";

const HowItWorks = () => {
  const navigate = useNavigate();
  const checkIcon = require("../assets/icons/check-square.png");
  const plus = require("../assets/icons/plus-square.png");
  const [data, setDate] = useState([]);
  useEffect(() => {}, []);
  let condition;
  const [question_1, selectQuestion1] = useState(true);
  const [question_2, selectQuestion2] = useState(false);
  const [question_3, selectQuestion3] = useState(false);
  const resorcesBanner1 = require("../assets/images/term1.png");
  const resorcesBanner2 = require("../assets/images/term2.png");
  const resorcesBanner3 = require("../assets/images/term3.png");
  const resorcesBanner4 = require("../assets/images/term4.png");
  const resorcesBanner5 = require("../assets/images/term5.png");
  const resorcesBanner6 = require("../assets/images/term6.png");
  const resorcesBanner7 = require("../assets/images/term7.png");
  const resorcesBanner8 = require("../assets/images/term8.png");
  const resorcesBanner9 = require("../assets/images/term9.png");
  const resorcesBanner10 = require("../assets/images/term10.png");
  const resorcesBanner11 = require("../assets/images/term11.png");
  const resorcesBanner12 = require("../assets/images/term12.png");

  const talentGroup_1 = require("../assets/images/resources/Group 4.png");
  const talentGroup_2 = require("../assets/images/resources/Group 5.png");
  const talentGroup_3 = require("../assets/images/resources/Group 6.png");
  const talentGroup_4 = require("../assets/images/resources/Group 6.png");
  const [caseList, setCaseList] = useState([]);

  function handleForms(e) {
    console.log(e, "e");
    if (e == "question_1") {
      selectQuestion1(!question_1);
    }
    if (e == "question_2") {
      selectQuestion2(!question_2);
    }
  }

  useEffect(() => {
    setCaseList([
      {
        id: 1,
        photo: talentGroup_1,
        name: "Alexander",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        isFavorite: false,
        location: "Australia",
        booked: "3 Jobs Booked",
        rating: 4,
      },
      {
        id: 2,
        photo: talentGroup_2,
        name: "william",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        location: "America",
        booked: "3 Jobs Booked",
        isFavorite: false,
        rating: 3,
      },
      {
        id: 3,
        photo: talentGroup_3,
        name: "Michael",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        location: "Canada",
        booked: "6 Jobs Booked",
        isFavorite: false,
        rating: 5,
      },
      {
        id: 4,
        photo: talentGroup_4,
        name: "Andrea",
        address: "Lorem ipsum dolor sit amet, consect adipiscing elit",
        isFavorite: false,
        location: "Russia",
        booked: "150 Jobs Booked",
        rating: 1,
      },
    ]);
  }, []);
  return (
    <>
      <Header />
      <section style={{ marginTop: "64px" }}>
        <div className="popular-header">
          <div className="container">
          <div className="header-title">How It Works</div>
            <div className="header-menu">
              <div>Home</div>
              <div>Learn</div>
            </div>
          </div>
        </div>
      </section>

      <section className="howIts">
        <div className="container">

          <div className="resources-main">
            <div className="resources">

              <div className="resource-description widthParg text-center">
                Welcome to Brands & Talent (BT), your gateway to a vibrant community of creators, influencers, talent, brands, and clients. Whether you're a brand/client seeking talent or a creator looking to showcase your work, our platform offers a seamless and empowering experience. Here's how it works:
              </div>

              <h2 className="maintitles text-center">For Brands/Clients</h2>

              <div className="resource-wrapper align-items-center row">
                <div className="resource-image-wrapper imgL col-md-6">
                  <img className="resource-image imgWid" src={resorcesBanner1}></img>
                </div>
                <div className="resource-content-wrapper col-md-6 padSpace">
                  <h4 className="resource-name">Create a Job Post for Your Project</h4>
                  <div className="resource-description space">
                  Start by creating a job post  with the project brief outlining your requirements, objectives, and budget. Provide as much detail as possible to attract the right talent for your project. While creating the job post/campaign, you can choose any of the two options on how you would like to receive applications : Option 1: Easy Apply (you can review and manage the applicants directly on your BT dashboard) or Option 2: External Dashboard (you will receive applicants outside the BT platform)


                  </div>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row revs">
                <div className="resource-content-wrapper col-md-6 padSpaceR">
                  <h4 className="resource-name">Browse Talent</h4>
                  <div className="resource-description space">
                     our diverse pool of talented creators and influencers. Use our advanced search filters to narrow down your options based on skills, expertise, location, and more. You can also use our ‘’invite to apply’’ feature to invite potential talent to apply for your job post.
                  </div>
                </div>
                <div className="resource-image-wrapper col-md-6">
                  <img className="resource-image imgWid" src={resorcesBanner2}></img>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row">
                <div className="resource-image-wrapper imgL col-md-6">
                  <img className="resource-image imgWid" src={resorcesBanner3}></img>
                </div>
                <div className="resource-content-wrapper col-md-6 padSpace">
                  <h4 className="resource-name">Review Applicants</h4>
                  <div className="resource-description space">
                    Review the applicants and shortlist or reject them based on your requirements. You can also bookmark strong applicants for your project.
                  </div>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row revs">
                <div className="resource-content-wrapper col-md-6 padSpaceR">
                  <h4 className="resource-name">Connect with Talent</h4>
                  <div className="resource-description space">
                    Once you've found the perfect matches for your project, send a direct message or collaboration request to the talent. Discuss the details, negotiate rates, and finalize the terms of your collaboration.
                  </div>
                </div>
                <div className="resource-image-wrapper col-md-6">
                  <img className="resource-image imgWid" src={resorcesBanner4}></img>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row">
                <div className="resource-image-wrapper imgL col-md-6">
                  <img className="resource-image imgWid" src={resorcesBanner5}></img>
                </div>
                <div className="resource-content-wrapper col-md-6 padSpace">
                  <h4 className="resource-name">Manage Your Projects</h4>
                  <div className="resource-description space">
                    Track the progress of your projects, communicate with talent, and ensure timely delivery of work through our chat features on the platform.
                  </div>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row mb-3 revs">
                <div className="resource-content-wrapper col-md-6 padSpaceR">
                  <h4 className="resource-name">Leave Feedback</h4>
                  <div className="resource-description space">
                    After the completion of a project, you can leave feedback and ratings for the talent on the BT platform based on your experience. Your feedback helps build a trustworthy and reliable community on our platform.
                  </div>
                </div>
                <div className="resource-image-wrapper col-md-6 mb-3">
                  <img className="resource-image imgWid" src={resorcesBanner6}></img>
                </div>
              </div>

              <h2 className="maintitles text-center mt-5">For Talent</h2>

              <div className="resource-wrapper align-items-center row">
                <div className="resource-image-wrapper imgL col-md-6">
                  <img className="resource-image imgWid" src={resorcesBanner7}></img>
                </div>
                <div className="resource-content-wrapper col-md-6 padSpace">
                  <h4 className="resource-name">Create Your Profile</h4>
                  <div className="resource-description space">
                    Build a compelling profile that showcases your skills, expertise, portfolio, and rates. Highlight your unique talents and experiences to attract potential clients.
                  </div>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row revs">
                <div className="resource-content-wrapper col-md-6 padSpaceR">
                  <h4 className="resource-name">Browse Jobs/Projects</h4>
                  <div className="resource-description space">
                    Explore a wide range of job posts posted by brands and clients. Filter jobs based on your interests, expertise, and availability.
                  </div>
                </div>
                <div className="resource-image-wrapper col-md-6">
                  <img className="resource-image imgWid" src={resorcesBanner8}></img>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row">
                <div className="resource-image-wrapper imgL col-md-6">
                  <img className="resource-image imgWid" src={resorcesBanner9}></img>
                </div>
                <div className="resource-content-wrapper col-md-6 padSpace">
                  <h4 className="resource-name">Chat with Brands/Clients</h4>
                  <div className="resource-description space">
                    Chat directly with the brand/client if you have any specific questions regarding their job post/project.
                  </div>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row revs">
                <div className="resource-content-wrapper col-md-6 padSpaceR">
                  <h4 className="resource-name">Submit Application</h4>
                  <div className="resource-description space">
                    Make sure your profile is up to date before applying. Apply directly via ‘’easy apply’’ button or as per the instruction in the job post.
                  </div>
                </div>
                <div className="resource-image-wrapper  col-md-6">
                  <img className="resource-image imgWid" src={resorcesBanner10}></img>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row">
                <div className="resource-image-wrapper imgL col-md-6">
                  <img className="resource-image imgWid" src={resorcesBanner11}></img>
                </div>
                <div className="resource-content-wrapper col-md-6 padSpace">
                  <h4 className="resource-name">Collaborate with Clients</h4>
                  <div className="resource-description space">
                    Communicate with clients, negotiate rates, and clarify project requirements before accepting collaboration offers. Ensure clear communication and alignment on expectations.
                  </div>
                </div>
              </div>

              <div className="resource-wrapper align-items-center row revs">
                <div className="resource-content-wrapper col-md-6 padSpaceR">
                  <h4 className="resource-name">Deliver High-Quality Work</h4>
                  <div className="resource-description space">
                    Once accepted for a project, deliver high-quality work within the agreed-upon timeframe. Keep clients updated on your progress and seek feedback to ensure satisfaction.
                  </div>
                </div>
                <div className="resource-image-wrapper col-md-6">
                  <img className="resource-image imgWid" src={resorcesBanner12}></img>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </section>

      

      <section className="howIts mt-5">
        <h2 className="maintitles text-center">
          Frequently Asked Questions (FAQs)
        </h2>
        <div className="container">
          <div className="tabs faq">
            <div className="active-tab tabLink">For Brands/Clients</div>
            <div className="tabLink">For Talent</div>
            <div className="tabLink">Best Practices</div>
            {/* <div className="tabLink">Best Practice</div> */}
          </div>

          <div className="faq-section faqWraper">
            <div className="accordion accordion-pad" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    How do I find the right talent for my project?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                      Use our advanced search filters to browse talent based on skills, expertise, location, and more. We recommend you to post a job with  a project brief outlining your requirements to attract relevant talent. You can benefit from both the features : find talent and post a job feature to receive a large number of qualified applications.
                    
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    How does payment work on Brands & Talent?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    
                      It is
                      hidden by default, until the collapse plugin adds the
                      appropriate classes that we use to style each element. These
                      classes control the overall appearance, as well as the showing
                      and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It's also worth
                      noting that just about any HTML can go within the does limit
                      overflow.
                   
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Can I communicate directly with talent?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <div className="accordion-pad">
                      <strong>This is the third item's accordion body.</strong> It is
                      hidden by default, until the collapse plugin adds the
                      appropriate classes that we use to style each element. These
                      classes control the overall appearance, as well as the showing
                      and hiding via CSS transitions. You can modify any of this with
                      custom CSS or overriding our default variables. It's also worth
                      noting that just about any HTML can go within the{" "}
                      <code>.accordion-body</code>, though the transition does limit
                      overflow.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </>
  );
};

export default HowItWorks;
