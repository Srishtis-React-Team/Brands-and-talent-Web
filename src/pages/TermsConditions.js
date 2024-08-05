import { useNavigate } from "react-router";
import React, { useState, useEffect, useRef } from "react";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import "../assets/css/termsconditions.css";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
const TermsConditions = () => {
  const navigate = useNavigate();
  const [termsList, setTermsList] = useState([]);

  useEffect(() => {
    fetchContentByType();
  }, []);

  const fetchContentByType = async () => {
    const formData = {
      contentType: "terms and conditions",
    };
    await ApiHelper.post(API.fetchContentByType, formData)
      .then((resData) => {
        if (resData) {
          setTermsList(resData?.data?.data?.content);
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
            <div className="header-title">Terms & Conditions</div>
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
          dangerouslySetInnerHTML={{ __html: termsList }}
        />
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;
