import React, { Suspense, lazy, useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import PopUp from "../components/PopUp";

// Lazy load the components
const Dashboard = lazy(() => import("../views/Dashboard"));
const FindCreators = lazy(() => import("../views/FindCreators"));
const TalentProfile = lazy(() => import("../views/TalentProfile"));
const Pricing = lazy(() => import("../views/pricing"));
const Resources = lazy(() => import("../views/resources"));
const About = lazy(() => import("../pages/About"));
const Guidelines = lazy(() => import("../pages/Guidelines"));
const PostJob = lazy(() => import("../pages/PostJob"));
const HowItWorks = lazy(() => import("../pages/how-it-works"));
const Register = lazy(() => import("../auth/Register"));
const Login = lazy(() => import("../auth/Login"));
const ForgotPassword = lazy(() => import("../auth/forgotpassword"));
const TalentDashBoard = lazy(() => import("../views/TalentDashBoard"));
const ResetPassword = lazy(() => import("../auth/ResetPassword"));
const PasswordSuccess = lazy(() => import("../auth/PasswordSuccess"));
const KidsformOne = lazy(() => import("../auth/KidsformOne"));
const KidsFormTwo = lazy(() => import("../auth/KidsFormTwo"));
const KidsFormThree = lazy(() => import("../auth/KidsFormThree"));
const KidsFormFour = lazy(() => import("../auth/KidsFormFour"));
const AdultFormOne = lazy(() => import("../views/Adult forms/AdultFormOne"));
const AdultFormTwo = lazy(() => import("../views/Adult forms/AdultFormTwo"));
const AdultFormThree = lazy(() => import("../views/Adult forms/AdultFormThree"));
const OTPComponent = lazy(() => import("../auth/OTPComponent"));
const KidsOTP = lazy(() => import("../auth/KidsOTP"));
const KidsSocialMedias = lazy(() => import("../auth/KidsSocialMedias"));
const AdultSuccess = lazy(() => import("../auth/AdultSuccess"));
const KidsServices = lazy(() => import("../auth/KidsServices"));
const UpdateAdultPassword = lazy(() => import("../auth/UpdateAdultPassword"));
const BrandSignup = lazy(() => import("../auth/brand-forms/brandSignup"));
const BrandFirstGig = lazy(() => import("../auth/brand-forms/brandFirstGig"));
const BrandsOtp = lazy(() => import("../auth/brand-forms/brandsOtp"));
const BrandDetails = lazy(() => import("../auth/brand-forms/brandDetails"));
const BrandLogo = lazy(() => import("../auth/brand-forms/brandLogo"));
const BrandActivation = lazy(() => import("../auth/brand-forms/brandActivation"));
const PreviewJob = lazy(() => import("../brand/pages/PreviewJob"));
const BrandHome = lazy(() => import("../brand/pages/BrandHome"));
const ListJobs = lazy(() => import("../brand/pages/ListJobs"));
const CreateJobs = lazy(() => import("../brand/pages/CreateJobs"));
const BrandTalents = lazy(() => import("../brand/pages/BrandTalents"));
const BrandFavorites = lazy(() => import("../brand/pages/BrandFavorites"));
const BrandHelp = lazy(() => import("../brand/pages/BrandHelp"));
const JobSuccess = lazy(() => import("../brand/pages/JobSuccess"));
const MessageTalents = lazy(() => import("../components/message/MessageTalents"));
const TalentPreviewJob = lazy(() => import("../views/TalentPreviewJob"));
const Blogs = lazy(() => import("../pages/Blogs"));
const AppliedJobs = lazy(() => import("../views/AppliedJobs"));
const Applicants = lazy(() => import("../brand/pages/Applicants"));
const OverallJobs = lazy(() => import("../brand/pages/OverallJobs"));
const EditTalent = lazy(() => import("../auth/EditTalent"));
const SavedJobs = lazy(() => import("../views/SavedJobs"));
const TalentSettings = lazy(() => import("../auth/TalentSettings"));
const TalentNotification = lazy(() => import("../views/TalentNotification"));
const BrandNotification = lazy(() => import("../brand/pages/BrandNotification"));
const BrandSettings = lazy(() => import("../brand/pages/BrandSettings"));
const EditBrands = lazy(() => import("../brand/pages/EditBrands"));
const GetBooked = lazy(() => import("../views/GetBooked"));
const ContactSupport = lazy(() => import("../views/ContactSupport"));
const ContactUs = lazy(() => import("../views/ContactUs"));
const TermsConditions = lazy(() => import("../pages/TermsConditions"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const AdultSocialMedias = lazy(() => import("../views/Adult forms/AdultSocialMedias"));
const IndustryNews = lazy(() => import("../pages/IndustryNews"));
const CommingSoon = lazy(() => import("../views/CommingSoon"));

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

  

  return (
    <>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/find-creators"
            element={
              currentUserId || brandID ? (
                <FindCreators />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/talent/:name"
            element={
              currentUserId ? <TalentProfile /> : <Navigate to="/login" replace />
            }
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
          <Route
            path="/reset-password/brand/:token"
            element={<ResetPassword />}
          />
          <Route
            path="/reset-password/adult/:token"
            element={<ResetPassword />}
          />
          <Route path="/success-password" element={<PasswordSuccess />} />
          <Route path="/talent-dashboard" element={<TalentDashBoard />} />
          <Route path="/talent-signup-basic-details" element={<KidsformOne />} />
          <Route path="/talent-otp" element={<KidsOTP />} />
          <Route
            path="/talent-social-media-connections"
            element={<KidsSocialMedias />}
          />
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
          <Route
            path="/adult-social-media-connections"
            element={<AdultSocialMedias />}
          />
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
          <Route path="/coming-soon" element={<CommingSoon />} />
          <Route
            path="/update-adult-password"
            element={<UpdateAdultPassword />}
          />
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
