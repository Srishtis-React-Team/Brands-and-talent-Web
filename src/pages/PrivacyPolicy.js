import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";
import "../assets/css/privacypolicy.css";
import React, { useState, useEffect, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const [privacyPolicyList, setPrivacyPolicyList] = useState([]);

  useEffect(() => {
    fetchContentByType();
  }, []);

  const fetchContentByType = async () => {
    const formData = {
      contentType: "Privacy policy",
    };
    await ApiHelper.post(API.fetchContentByType, formData)
      .then((resData) => {
        console.log(resData?.data?.data?.content, "resDataterms");
        if (resData) {
          setPrivacyPolicyList(resData?.data?.data?.content);
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
            <div className="header-title">Privacy Policy</div>
            {/* <div className="header-menu">
              <div>Home</div>
              <div>Learn</div>
            </div> */}
          </div>
        </div>
      </section>
      <div className="policy-container container">
        <div
          className="terms-and-conditions"
          dangerouslySetInnerHTML={{ __html: privacyPolicyList }}
        />
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
