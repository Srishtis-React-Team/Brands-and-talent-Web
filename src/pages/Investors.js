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
      <section className="abtWraper genCont_desg">
        <div className="container">
          <div className="topCont mt-4">

          <div className="text-center">

              {/* <h2 className="maintitles">Investors</h2> */}
              <div className="widthParg mb-3">
                <p
                  className="descp m-0">
                    At Brands & Talent, we’re redefining the creator industry in the age of AI, providing a seamless platform for brands and talent to connect, collaborate, and succeed. We welcome visionary investors who want to join us in shaping this dynamic industry and empowering creators worldwide.<br/><br/>
                    Our minimum investment amount is USD 80,000. If you’re interested in learning more or investing, please contact us at <strong><a href="mailto:brandsntalent@gmail.com">brandsntalent@gmail.com</a></strong>.
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

export default Investors;
