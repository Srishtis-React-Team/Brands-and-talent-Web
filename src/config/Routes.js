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
import JobSuccess from "../brand/pages/JobSuccess";
import MessageTalents from "../components/message/MessageTalents";
import TalentPreviewJob from "../views/TalentPreviewJob";
import Blogs from "../pages/Blogs";
import AppliedJobs from "../views/AppliedJobs";
import Applicants from "../brand/pages/Applicants";
import OverallJobs from "../brand/pages/OverallJobs";
import EditTalent from "../auth/EditTalent";
import SavedJobs from "../views/SavedJobs";
import TalentSettings from "../auth/TalentSettings";
import TalentNotification from "../views/TalentNotification";
import TalentHome from "../views/TalentHome";
import TalentHelp from "../views/TalentHelp";
import BrandNotification from "../brand/pages/BrandNotification";
import BrandSettings from "../brand/pages/BrandSettings";
import EditBrands from "../brand/pages/EditBrands";
import GetBooked from "../views/GetBooked";
import ContactSupport from "../views/ContactSupport";
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/find-creators" element={<FindCreators />} />
      <Route path="/talent-profile/:name" element={<TalentProfile />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/otp" element={<OTPComponent />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/community-guidelines" element={<Guidelines />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/job-list" element={<OverallJobs />}></Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password/brand/:token" element={<ResetPassword />} />
      <Route path="/reset-password/adult/:token" element={<ResetPassword />} />
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
      <Route path="/applied-jobs" element={<AppliedJobs />} />
      <Route path="/saved-jobs" element={<SavedJobs />} />
      <Route path="/create-jobs" element={<CreateJobs />} />
      <Route path="/find-talents" element={<BrandTalents />} />
      <Route path="/favorite-talents" element={<BrandFavorites />} />
      <Route path="/brand-help" element={<BrandHelp />} />
      <Route path="/preview-job" element={<PreviewJob />} />
      <Route path="/job-success" element={<JobSuccess />} />
      <Route path="/message" element={<MessageTalents />} />
      <Route path="/preview-job-talent" element={<TalentPreviewJob />} />
      <Route path="/applicants" element={<Applicants />} />
      <Route path="/edit-talent-profile" element={<EditTalent />} />
      <Route path="/edit-brand-profile" element={<EditBrands />} />
      <Route path="/talent-notification" element={<TalentNotification />} />
      <Route path="/talent-settings" element={<TalentSettings />} />
      <Route path="/brand-settings" element={<BrandSettings />} />
      <Route path="/talent-home" element={<TalentHome />} />
      <Route path="/talent-help" element={<TalentHelp />} />
      <Route path="/brand-notification" element={<BrandNotification />} />
      <Route path="/get-booked" element={<GetBooked />} />
      <Route path="/contact-us" element={<ContactSupport />} />
    </Routes>
  );
}

export default Routing;
