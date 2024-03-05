import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import FindCreators from "../views/FindCreators";
import GetBooked from "../views/GetBooked";
import Pricing from "../views/pricing";
import Resources from "../views/resources";
import About from "../pages/About";
import Guidelines from "../pages/Guidelines";
import PostJob from "../pages/PostJob";
import HowItWorks from "../pages/how-it-works";
import Register from "../auth/Register";
import Login from "../auth/Login";
import ForgotPassword from "../auth/forgotpassword";
import BrandDashboard from "../brand/pages/brand-dashboard";
import TalentDashBoard from "../views/TalentDashBoard";
import ResetPassword from "../auth/ResetPassword";
import PasswordSuccess from "../auth/PasswordSuccess";
import KidsformOne from "../auth/KidsformOne";
import KidsFormTwo from "../auth/KidsFormTwo";
import KidsFormThree from "../auth/KidsFormThree";
import KidsFormFour from "../auth/KidsFormFour";
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/find-creators" element={<FindCreators />} />
      <Route path="/talent" element={<GetBooked />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/community-guidelines" element={<Guidelines />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/success-password" element={<PasswordSuccess />} />
      <Route path="/brand-dashboard" element={<BrandDashboard />} />
      <Route path="/talent-dashboard" element={<TalentDashBoard />} />
      <Route path="/talent-login-basic-details" element={<KidsformOne />} />
      <Route path="/talent-login-plan-details" element={<KidsFormTwo />} />
      <Route path="/talent-login-files-details" element={<KidsFormThree />} />
      <Route path="/talent-login-files-success" element={<KidsFormFour />} />
    </Routes>
  );
}

export default Routing;
