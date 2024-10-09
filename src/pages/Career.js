import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";

import "../assets/css/guidelines.css";

import React, { useState, useEffect, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";

const Career = () => {
  const navigate = useNavigate();

  const [aboutusList, setAboutusList] = useState([]);

  useEffect(() => {
    fetchContentByType();
  }, []);

  const fetchContentByType = async () => {
    const formData = {
      contentType: "Career",
    };
    await ApiHelper.post(API.fetchContentByType, formData)
      .then((resData) => {
        if (resData) {
          setAboutusList(resData?.data?.data?.items);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    console.log(aboutusList, "aboutusList");
  }, [aboutusList]);

  return (
    <>
      <Header />{" "}
      <section style={{ marginTop: "64px" }}>
        <div className="popular-header">
          <div className="container">
            <div className="header-title">Careers</div>
          </div>
        </div>
      </section>
      <section className="abtWraper">
        <div className="container">

          <div className="topCont mt-4">
            <div className="text-center">
              {/* <h2 className="maintitles">Careers</h2> */}
              <div className="widthParg mb-3">
                <p
                  className="descp m-0">
                    <strong>Join the Brands & Talent team and be part of a dynamic and innovative environment that is shaping the future of the creator economy! We are passionate about empowering creators and connecting them with brands for meaningful collaborations.</strong>
                  </p>
              </div>
            </div>
          </div>




            {/* <div className="row textAlg mt-3 mb-5">
              <div
                className="col-md-6 descp"
                dangerouslySetInnerHTML={{
                  __html: aboutusList[2]?.description,
                }}
              ></div>
            </div> */}


          <div className="contSpc careerWraps pt-3 pb-5">
            <h4 className="toptitle">Current Openings</h4>

            <div className="my-3 carrerList">
              <div className="descp">
                  <div className="jobtitle"><i class="bi bi-suitcase-lg icons"></i> 
                    <span>Board of Advisors</span>
                  </div>
                  <div className="jobLoct">Location :
                    <span>Remote (Part-Time)</span>
                  </div>
                  <div className="jobDescp">
                    We are looking to assemble a diverse and experienced Board of Advisors to guide and support our mission at Brands & Talent.  <br/>
                    Advisors will play a crucial role in providing strategic insights, industry expertise, and networking opportunities to help shape our growth and impact in the creator economy.  <br/>
                    We welcome professionals with backgrounds in the creator industry,  sustainability industry (including sustainable fashion), marketing, business development, and technology. <br/>
                    If you’re passionate about empowering creators and want to make a difference, we invite you to join us. Write to us at <a href="mailto:brandsntalent@gmail.com">brandsntalent@gmail.com</a> mentioning ‘board of advisors’ in the subject line.
                  </div>
              </div>
            </div>

           <div className="my-3 carrerList">
              <div className="descp">
                  <div className="jobtitle"><i class="bi bi-suitcase-lg icons"></i> 
                    <span>Social Media Officer (Intern Role)</span>
                  </div>
                  <div className="jobLoct">Location :
                    <span>Remote (Part-Time)</span>
                  </div>
                  <div className="jobDescp">
                    Join our team as a Social Media Officer, where you'll create engaging content that resonates with our audience. Ideal candidates are creative, resourceful, and passionate about the creator industry. If you have a flair for storytelling and a knack for social media platforms, we want to hear from you! <br/><br/>
                    We welcome graduates as well as students currently enrolled in bachelor’s or master’s programs, especially if your college requires internships as part of your degree. Must be able to communicate in English.
                  </div>
              </div>
            </div>

            <div className="my-3 carrerList">
              <div className="descp">
                  <div className="jobtitle"><i class="bi bi-suitcase-lg icons"></i> 
                    <span>Business Development Intern</span>
                  </div>
                  <div className="jobLoct">Location :
                    <span>Remote (Part-Time)</span>
                  </div>
                  <div className="jobDescp">
                    We’re seeking a Business Development Intern to assist in identifying growth opportunities and building relationships with potential partners. If you’re enthusiastic, driven, and eager to learn about the business side of the creator economy, this role is perfect for you! <br/><br/>
                    We welcome graduates as well as students currently enrolled in bachelor’s or master’s programs, especially if your college requires internships as part of your degree. Must be able to communicate in English.
                  </div>
              </div>
            </div>

            <div className="my-3 carrerList">
              <div className="descp">
                  <div className="jobtitle"><i class="bi bi-suitcase-lg icons"></i> 
                    <span>Graphic Designer</span>
                  </div>
                  <div className="jobLoct">Location :
                    <span>Remote (Part-Time)</span>
                  </div>
                  <div className="jobDescp">
                    As a Graphic Designer at Brands & Talent, you will bring our brand to life through visually compelling designs. This role requires creativity, strong design skills, and proficiency in graphic design software. If you have a passion for creating eye-catching visuals that communicate our mission, we’d love to have you on board! <br/><br/>
                    We welcome graduates as well as students currently enrolled in bachelor’s or master’s programs, especially if your college requires internships as part of your degree. Must be able to communicate in English.
                  </div>
              </div>
            </div>

            <div className="applyInst mt-4">
              <h6 className="titles">How to Apply</h6>
              <p>Please send your resume and cover letter to <a href="mailto:brandsntalent@gmail.com">brandsntalent@gmail.com</a> with the subject line <strong>“Job Title Application”</strong>.</p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Career;
