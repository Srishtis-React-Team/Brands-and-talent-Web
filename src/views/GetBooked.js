import React, { useState } from "react";
import "../assets/css/findcreators.css";
import Header from "./header.js";
import Footer from "./Footer.js";
const GetBooked = () => {
  const girl1 = require("../assets/images/girl1.png");

  return (
    <>
      <Header />
      <section>
        <div className="popular-header">
          <div className="header-title">Popular Models</div>
          <div className="header-menu">
            <div>Home</div>
            <div>Models</div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default GetBooked;
