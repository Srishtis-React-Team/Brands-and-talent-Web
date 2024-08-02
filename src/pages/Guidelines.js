import "../assets/css/guidelines.css";

import { useNavigate } from "react-router";
import React, { useState, useEffect, useRef } from "react";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";

const Guidelines = () => {
  const navigate = useNavigate();

  const [guidelinesList, setGuidelinesList] = useState([]);

  useEffect(() => {
    fetchContentByType();
  }, []);

  const fetchContentByType = async () => {
    const formData = {
      contentType: "Community Guidelines",
    };
    await ApiHelper.post(API.fetchContentByType, formData)
      .then((resData) => {
        console.log(resData?.data?.data?.content, "resDataterms");
        if (resData) {
          setGuidelinesList(resData?.data?.data?.content);
        }
      })
      .catch((err) => {});
  };

  return (
    <>
      <Header />{" "}
      <section className="topSpace mb-2">
        <div className="popular-header">
          <div className="container">
            <div className="header-title">Community Guidelines</div>
            {/* <div className="header-menu">
              <div>Home</div>
              <div>Learn</div>
            </div> */}
          </div>
        </div>
      </section>
      <div className="terms-container container">
        <div
          className="terms-and-conditions"
          dangerouslySetInnerHTML={{ __html: guidelinesList }}
        />
      </div>
      <Footer />
    </>
  );
};

export default Guidelines;
