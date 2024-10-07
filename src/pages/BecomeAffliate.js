import { useNavigate } from "react-router";
import Header from "../layout/header";
import Footer from "../layout/Footer";

import "../assets/css/guidelines.css";

import React, { useState, useEffect, useRef } from "react";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";

const BecomeAffliate = () => {
  const navigate = useNavigate();

  const [aboutusList, setAboutusList] = useState([]);

  useEffect(() => {
    fetchContentByType();
  }, []);

  const fetchContentByType = async () => {
    const formData = {
      contentType: "Become an affiliate",
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
            <div className="header-title">Become an Affiliate</div>
          </div>
        </div>
      </section>

      <section className="abtWraper genCont_desg">
        <div className="container">
          <div className="topCont pt-5 pb-0">
            <div className="text-center">

              <h2 className="maintitles">Become an Affiliate</h2>
              <div className="widthParg">
                <p
                  className="descp">
                    If you’re passionate about the creator industry and want to contribute your time by collaborating with us, we’d love to hear from you! As an affiliate, you’ll have the opportunity to play a key role in connecting talent with brands globally and helping creators thrive. <br/><br/>
                    Email your CV to <strong><a href="mailto:brandsntalent@gmail.com">brandsntalent@gmail.com</a></strong> and let’s explore how we can work together to grow the future of the creator economy.
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

export default BecomeAffliate;
