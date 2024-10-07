import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";

import "../assets/css/guidelines.css";

import React, { useState, useEffect, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";

const Feedbackreporting = () => {
  const navigate = useNavigate();

  const [aboutusList, setAboutusList] = useState([]);

  useEffect(() => {
    fetchContentByType();
  }, []);

  const fetchContentByType = async () => {
    const formData = {
      contentType: "feedback",
    };
    await ApiHelper.post(API.fetchContentByType, formData)
      .then((resData) => {
        if (resData) {
          setAboutusList(resData?.data?.data?.items);
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <Header />{" "}
      <section style={{ marginTop: "64px" }}>
        <div className="popular-header">
          <div className="container">
            <div className="header-title">Feedback and Reporting</div>
          </div>
        </div>
      </section>
      <section className="abtWraper genCont_desg">
        <div className="container">
          <div className="topCont pt-5 pb-0">

            <div className="text-center">
              <h2 className="maintitles">Feedback & Reporting</h2>
              <div className="widthParg">
                <p
                  className="descp">
                    We’re committed to providing the best and safest platform for brands/clients, and creators to collaborate professionally. At Brands & Talent, we empower creators to be easily discovered and booked for meaningful projects.<br/><br/>
                    We have zero tolerance for any form of platform misuse, harassment, or discrimination. Please review our Terms & Conditions, Community Guidelines, and Privacy Policy in the Policy section for full details on platform conduct.<br/><br/>
                    Your feedback is valuable in helping us continuously improve. For feedback, complaints, or to report any issues, please contact us at <strong><a href="mailto:brandsntalent@gmail.com">brandsntalent@gmail.com</a></strong>. We appreciate your input as we work to enhance your experience on our platform.
                  </p>
              </div>
            </div>

          </div>
      
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Feedbackreporting;
