import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";

import "../assets/css/guidelines.css";

import React, { useState, useEffect, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";

const Investors = () => {
  const navigate = useNavigate();

  const [aboutusList, setAboutusList] = useState([]);
  const [investorData, setInvestorData] = useState("");

  useEffect(() => {
    fetchContentByType();
  }, []);

  const fetchContentByType = async () => {
    const formData = {
      contentType: "Investor",
    };
    await ApiHelper.post(API.fetchContentByType, formData)
      .then((resData) => {
        if (resData) {
          setAboutusList(resData?.data?.data?.items);
          setInvestorData(resData?.data?.data?.items[0].description[0]);
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
            <div className="header-title">Investors</div>
          </div>
        </div>
      </section>
      <section className="abtWraper genCont_desg">
        <div className="container">
          <div className="topCont mt-4">
            <div className="text-center">
              <div className="widthParg mb-3">
                <div dangerouslySetInnerHTML={{ __html: investorData }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Investors;
