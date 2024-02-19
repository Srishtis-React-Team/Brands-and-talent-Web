import React, { useEffect, useState } from "react";
import "../assets/css/pricing.css";
import { ApiHelper } from "../helpers/ApiHelper.js";
import { API } from "../config/api.js";
import TalentHeader from "../layout/TalentHeader.js";
const TalentDashBoard = () => {
  useEffect(() => {}, []);

  return (
    <>
      <TalentHeader />
      <div>talent dashboard</div>
    </>
  );
};

export default TalentDashBoard;
