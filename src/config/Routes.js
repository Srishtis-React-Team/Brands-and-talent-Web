import React from "react";
import { Routes, Route, useRef } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import FindCreators from "../views/FindCreators";
import TalentProfile from "../views/TalentProfile";
import Pricing from "../views/pricing";
import Resources from "../views/resources";
import About from "../pages/About";
import Guidelines from "../pages/Guidelines";
import PostJob from "../pages/PostJob";
import HowItWorks from "../pages/how-it-works";
import Register from "../auth/Register";
import Login from "../auth/Login";
import ForgotPassword from "../auth/forgotpassword";
import TalentDashBoard from "../views/TalentDashBoard";
import ResetPassword from "../auth/ResetPassword";
import PasswordSuccess from "../auth/PasswordSuccess";
import KidsformOne from "../auth/KidsformOne";
import KidsFormTwo from "../auth/KidsFormTwo";
import KidsFormThree from "../auth/KidsFormThree";
import KidsFormFour from "../auth/KidsFormFour";
import AdultFormOne from "../views/Adult forms/AdultFormOne";
import AdultFormTwo from "../views/Adult forms/AdultFormTwo";
import AdultFormThree from "../views/Adult forms/AdultFormThree";
import OTPComponent from "../auth/OTPComponent";
import KidsOTP from "../auth/KidsOTP";
import KidsSocialMedias from "../auth/KidsSocialMedias";
import AdultSignup from "../auth/AdultSignup";
import AdultsOTP from "../auth/AdultsOTP";
import AdultSuccess from "../auth/AdultSuccess";
import KidsServices from "../auth/KidsServices";
import UpdateAdultPassword from "../auth/UpdateAdultPassword";
import BrandSignup from "../auth/brand-forms/brandSignup";
import BrandFirstGig from "../auth/brand-forms/brandFirstGig";
import BrandsOtp from "../auth/brand-forms/brandsOtp";
import BrandDetails from "../auth/brand-forms/brandDetails";
import BrandLogo from "../auth/brand-forms/brandLogo";
import BrandActivation from "../auth/brand-forms/brandActivation";
import PreviewJob from "../brand/pages/PreviewJob";
import BrandHome from "../brand/pages/BrandHome";
import ListJobs from "../brand/pages/ListJobs";
import CreateJobs from "../brand/pages/CreateJobs";
import BrandTalents from "../brand/pages/BrandTalents";
import BrandFavorites from "../brand/pages/BrandFavorites";
import BrandHelp from "../brand/pages/BrandHelp";
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/find-creators" element={<FindCreators />} />
      <Route path="/talent-profile" element={<TalentProfile />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/otp" element={<OTPComponent />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/community-guidelines" element={<Guidelines />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/success-password" element={<PasswordSuccess />} />
      <Route path="/talent-dashboard" element={<TalentDashBoard />} />
      <Route path="/talent-signup-basic-details" element={<KidsformOne />} />
      <Route path="/talent-otp" element={<KidsOTP />} />
      <Route
        path="/talent-social-media-connections"
        element={<KidsSocialMedias />}
      />
      <Route path="/talent-signup-plan-details" element={<KidsFormTwo />} />
      <Route path="/talent-signup-files-details" element={<KidsFormThree />} />
      <Route path="/talent-signup-files-success" element={<KidsFormFour />} />
      <Route path="/talent-signup-service-details" element={<KidsServices />} />
      <Route path="/adult-signup-basic-details" element={<AdultFormOne />} />
      <Route path="/adult-signup-service-details" element={<AdultFormTwo />} />
      <Route path="/adult-signup-files-details" element={<AdultFormThree />} />
      <Route path="/adult-signup" element={<AdultSignup />} />
      <Route path="/otp-verification" element={<OTPComponent />} />
      <Route path="/otp-verification-brands" element={<BrandsOtp />} />
      <Route path="/adult-success" element={<AdultSuccess />} />
      <Route path="/update-talent-password" element={<UpdateAdultPassword />} />
      <Route path="/brand-signup" element={<BrandSignup />} />
      <Route path="/brand-firstGig" element={<BrandFirstGig />} />
      <Route path="/brand-details" element={<BrandDetails />} />
      <Route path="/brand-logo" element={<BrandLogo />} />
      <Route path="/brand-activated" element={<BrandActivation />} />
      <Route path="/brand-dashboard" element={<BrandHome />} />
      <Route path="/list-jobs" element={<ListJobs />} />
      <Route path="/create-jobs" element={<CreateJobs />} />
      <Route path="/find-talents" element={<BrandTalents />} />
      <Route path="/favorite-talents" element={<BrandFavorites />} />
      <Route path="/brand-help" element={<BrandHelp />} />
      <Route path="/preview-job" element={<PreviewJob />} />
    </Routes>
  );
}

export default Routing;
