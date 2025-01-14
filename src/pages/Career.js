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
          console.log('resData',resData)
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
                <p className="descp m-0">
                  <strong>
                    Join the Brands & Talent team and be part of a dynamic and
                    innovative environment that is shaping the future of the
                    creator economy! We are passionate about empowering creators
                    and connecting them with brands for meaningful
                    collaborations.
                  </strong>
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
            {console.log('aboutusList',aboutusList)}
            {aboutusList.map((item) => {
              return (
                <div className="my-3 carrerList" key={item.id || item.title}>
                  <div className="descp">
                    <div className="jobtitle">
                      <i className="bi bi-suitcase-lg icons"></i>
                      <span dangerouslySetInnerHTML={{ __html: item.title }} />
                    </div>
                    <div className="jobLoct">
                      Location :<span dangerouslySetInnerHTML={{ __html: item.location }} />
                    </div>
                    <div className="jobDescp" dangerouslySetInnerHTML={{ __html: item.description }} />
                  </div>
                </div>
              );
            })}

            <div className="applyInst mt-4">
              <h6 className="titles">How to Apply</h6>
              <p>
                Please send your resume and cover letter to{" "}
                <a href="mailto:brandsntalent@gmail.com">
                  brandsntalent@gmail.com
                </a>{" "}
                with the subject line <strong>“Job Title Application”</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Career;
