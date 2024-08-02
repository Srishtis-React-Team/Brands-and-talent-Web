import React, { useEffect, useState, useRef } from "react";
import "../assets/css/pricing.css";
import Header from "../layout/header.js";
import Footer from "../layout/Footer.js";
import PopUp from "../components/PopUp.js";
import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";

const QrCode = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const location = useLocation();
  const qrCodeHtml = location.state && location.state;

  useEffect(() => {
    if (qrCodeHtml) {
      console.log(qrCodeHtml, "qrCodeHtml");

      const sanitizedHtml = DOMPurify.sanitize(qrCodeHtml);
      console.log(sanitizedHtml, "sanitizedHtml");
      setHtmlContent(sanitizedHtml);
    }
  }, [qrCodeHtml]);
  useEffect(() => {
    console.log(htmlContent, "htmlContent");
  }, [htmlContent]);

  console.log(qrCodeHtml, "qrCodeHtml");
  console.log(typeof qrCodeHtml, "qrCodeHtml");
  return (
    <>
      <Header />
      <section className="topSpace">
        <div className="popular-header">
          <div className="container">
            <div className="header-title">QR Code Payment</div>
            {/* <div className="header-menu">
              <div>Home</div>
              <div>Talent</div>
            </div> */}
          </div>
        </div>
      </section>
      <div>
        <h1>HTML Content</h1>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default QrCode;
