import React from "react";
import { Routes, Route, useRef, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PopUp from "../components/PopUp";
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
import ContactUs from "../views/ContactUs";
import TermsConditions from "../pages/TermsConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import CurrentUser from "../CurrentUser";
import AdultSocialMedias from "../views/Adult forms/AdultSocialMedias";
import IndustryNews from "../pages/IndustryNews";
import CaseStudies from "../pages/CaseStudies";
import TalentDiaries from "../pages/TalentDiaries";
import TalentTips from "../pages/TalentTips";
import BrandTips from "../pages/BrandTips";
import CommingSoon from "../views/CommingSoon";
import QrCode from "../views/QrCode";
function Routing() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserType, setCurrentUserType] = useState(null);
  const [brandID, setBrandID] = useState(null);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLocalStorageData = () => {
      try {
        const userString = localStorage.getItem("currentUser");
        const userType = localStorage.getItem("currentUserType");
        if (userString) {
          setCurrentUserId(userString);
        }
        if (userType) {
          setCurrentUserType(userType);
        }
      } catch (error) {
        console.error("Error parsing currentUser from localStorage:", error);
      }

      try {
        const brandString = localStorage.getItem("brandId");
        if (brandString) {
          setBrandID(brandString);
        }
      } catch (error) {
        console.error("Error parsing brandId from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocalStorageData();
  }, [location]);

  if (isLoading) {
    return <div>Loading...</div>; // Improved loading fallback
  }

  return (
    <>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/find-creators"
            element={currentUserId || brandID ? <FindCreators /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/talent/:name"
            element={currentUserId ? <TalentProfile /> : <Navigate to="/login" replace />}
          />
          <Route path="/brand/:name" element={<BrandHome />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/otp" element={<OTPComponent />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/community-guidelines" element={<Guidelines />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/job-list" element={<OverallJobs />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/brand/:token" element={<ResetPassword />} />
          <Route path="/reset-password/adult/:token" element={<ResetPassword />} />
          <Route path="/success-password" element={<PasswordSuccess />} />
          <Route path="/talent-dashboard" element={<TalentDashBoard />} />
          <Route path="/talent-signup-basic-details" element={<KidsformOne />} />
          <Route path="/talent-otp" element={<KidsOTP />} />
          <Route path="/talent-social-media-connections" element={<KidsSocialMedias />} />
          <Route path="/talent-profile-upload" element={<KidsFormTwo />} />
          <Route path="/talent-services" element={<KidsServices />} />
          <Route path="/talent-parental" element={<KidsFormThree />} />
          <Route path="/talent-payment" element={<KidsFormFour />} />
          <Route path="/edit-talent" element={<EditTalent />} />
          <Route path="/edit-brand" element={<EditBrands />} />
          <Route path="/applied-jobs" element={<AppliedJobs />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/talent-notifications" element={<TalentNotification />} />
          <Route path="/talent-settings" element={<TalentSettings />} />
          <Route path="/adult-signup-basic-details" element={<AdultFormOne />} />
          <Route path="/adult-services" element={<AdultFormTwo />} />
          <Route path="/adult-social-media-connections" element={<AdultSocialMedias />} />
          <Route path="/adult-profile-upload" element={<AdultFormThree />} />
          <Route path="/signup-success" element={<AdultSuccess />} />
          <Route path="/brand-signup-basic-details" element={<BrandSignup />} />
          <Route path="/brand-first-gig" element={<BrandFirstGig />} />
          <Route path="/brands-otp" element={<BrandsOtp />} />
          <Route path="/brand-details" element={<BrandDetails />} />
          <Route path="/brand-logo" element={<BrandLogo />} />
          <Route path="/brand-activation" element={<BrandActivation />} />
          <Route path="/brand-list-jobs" element={<ListJobs />} />
          <Route path="/brand-preview-job" element={<PreviewJob />} />
          <Route path="/brand-create-job" element={<CreateJobs />} />
          <Route path="/brand-talents" element={<BrandTalents />} />
          <Route path="/brand-favorites" element={<BrandFavorites />} />
          <Route path="/brand-help" element={<BrandHelp />} />
          <Route path="/brand-job-success" element={<JobSuccess />} />
          <Route path="/brand-notifications" element={<BrandNotification />} />
          <Route path="/brand-settings" element={<BrandSettings />} />
          <Route path="/talent-preview-job" element={<TalentPreviewJob />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/get-booked" element={<GetBooked />} />
          <Route path="/support" element={<ContactSupport />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/industry-news" element={<IndustryNews />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/talent-diaries" element={<TalentDiaries />} />
          <Route path="/talent-tips" element={<TalentTips />} />
          <Route path="/brand-tips" element={<BrandTips />} />
          <Route path="/coming-soon" element={<CommingSoon />} />
          <Route path="/qr-code" element={<QrCode />} />
          <Route path="/update-adult-password" element={<UpdateAdultPassword />} />
          <Route path="/message-talents" element={<MessageTalents />} />
          <Route path="/applicants" element={<Applicants />} />
        </Routes>
      {openPopUp && (
        <PopUp
          open={openPopUp}
          onClose={() => setOpenPopUp(false)}
          message={message}
          setOpenPopUp={setOpenPopUp}
        />
      )}
    </>
  );
}

export default Routing;

