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
      <section className="abtWraper">
        <div className="container">
          <div className="topCont pt-5 pb-0">
            <div className="text-center">
              <h2 className="maintitles">About Brands & Talent</h2>
              <div className="widthParg">
                <p
                  className="descp"
                  dangerouslySetInnerHTML={{
                    __html: aboutusList[0]?.description,
                  }}
                ></p>
              </div>
            </div>
          </div>
          <div className="contSpc pt-3 pb-5">
            <div className="row textAlg mb-5">
              <div
                className="col-md-6 descp"
                dangerouslySetInnerHTML={{
                  __html: aboutusList[1]?.description,
                }}
              ></div>
              <div className="col-md-6">
                <img
                  className="img-fluid"
                  src={
                    "https://brandsandtalent.com//backend/uploads/060b5e10-128d-455e-9a63-9d4bd1531031.webp"
                  }
                ></img>
              </div>
            </div>

            <div className="row textAlg mt-3 mb-5">
              <div className="col-md-6 ">
                <img
                  className="img-fluid"
                  src={
                    "https://brandsandtalent.com//backend/uploads/76f0ef01-9a84-4459-90f6-b2c7aaa9f1e3.webp"
                  }
                ></img>
              </div>
              <div
                className="col-md-6 descp"
                dangerouslySetInnerHTML={{
                  __html: aboutusList[2]?.description,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Investors;
