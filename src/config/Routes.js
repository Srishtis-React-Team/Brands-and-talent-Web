import React, {
  Suspense,
  lazy,
  useEffect,
  useState,
  startTransition,
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorBoundary from "../components/ErrorBoundary";
import Pricing from "../views/pricing";
import KidsFormTwo from "../auth/KidsFormTwo";

// Lazy load components
const PopUp = lazy(() => import("../components/PopUp"));
const Dashboard = lazy(() => import("../views/Dashboard"));
const FindCreators = lazy(() => import("../views/FindCreators"));
const TalentProfile = lazy(() => import("../views/TalentProfile"));
// const Pricing = lazy(() => import("../views/pricing"));
const Resources = lazy(() => import("../views/resources"));
const AdminPayment = lazy(() => import("../views/AdminPayment"));
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
const AdultPricing = lazy(() => import("../views/Adult forms/AdultPricing"));
const KidsFormThree = lazy(() => import("../auth/KidsFormThree"));
const KidsFormFour = lazy(() => import("../auth/KidsFormFour"));
const AdultFormOne = lazy(() => import("../views/Adult forms/AdultFormOne"));
const AdultFormTwo = lazy(() => import("../views/Adult forms/AdultFormTwo"));
const AdultFormThree = lazy(() =>
  import("../views/Adult forms/AdultFormThree")
);
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
const BrandPricing = lazy(() => import("../auth/brand-forms/BrandPricing"));
const BrandActivation = lazy(() =>
  import("../auth/brand-forms/brandActivation")
);
const PreviewJob = lazy(() => import("../brand/pages/PreviewJob"));
const BrandHome = lazy(() => import("../brand/pages/BrandHome"));
const ListJobs = lazy(() => import("../brand/pages/ListJobs"));
const CreateJobs = lazy(() => import("../brand/pages/CreateJobs"));
const BrandTalents = lazy(() => import("../brand/pages/BrandTalents"));
const BrandFavorites = lazy(() => import("../brand/pages/BrandFavorites"));
const BrandHelp = lazy(() => import("../brand/pages/BrandHelp"));
const JobSuccess = lazy(() => import("../brand/pages/JobSuccess"));
const MessageTalents = lazy(() =>
  import("../components/message/MessageTalents")
);
const TalentPreviewJob = lazy(() => import("../views/TalentPreviewJob"));
const Blogs = lazy(() => import("../pages/Blogs"));
const AppliedJobs = lazy(() => import("../views/AppliedJobs"));
const Applicants = lazy(() => import("../brand/pages/Applicants"));
const OverallJobs = lazy(() => import("../brand/pages/OverallJobs"));
const EditTalent = lazy(() => import("../auth/EditTalent"));
const AdultSignup = lazy(() => import("../auth/AdultSignup"));
const SavedJobs = lazy(() => import("../views/SavedJobs"));
const TalentSettings = lazy(() => import("../auth/TalentSettings"));
const TalentNotification = lazy(() => import("../views/TalentNotification"));
const TalentHome = lazy(() => import("../views/TalentHome"));

const BrandNotification = lazy(() =>
  import("../brand/pages/BrandNotification")
);
const BrandSettings = lazy(() => import("../brand/pages/BrandSettings"));
const EditBrands = lazy(() => import("../brand/pages/EditBrands"));
const GetBooked = lazy(() => import("../views/GetBooked"));
const ContactSupport = lazy(() => import("../views/ContactSupport"));
const ContactUs = lazy(() => import("../views/ContactUs"));
const TermsConditions = lazy(() => import("../pages/TermsConditions"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const AdultSocialMedias = lazy(() =>
  import("../views/Adult forms/AdultSocialMedias")
);
const IndustryNews = lazy(() => import("../pages/IndustryNews"));
const CommingSoon = lazy(() => import("../views/CommingSoon"));
const Feedbackreporting = lazy(() => import("../pages/Feedbackreporting"));
const BecomeAffliate = lazy(() => import("../pages/BecomeAffliate"));
const Investors = lazy(() => import("../pages/Investors"));
const Career = lazy(() => import("../pages/Career"));
const EditFeatures = lazy(() => import("../pages/EditFeatures"));
// const ErrorBoundary = lazy(() => import('../components/ErrorBoundary'));
const LocationComponent = lazy(() => import("../components/LocationComponent"));
const JobRedirect = lazy(() => import("../pages/JobRedirect"));

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
      setIsLoading(true);
      try {
        const userString = localStorage.getItem("currentUser");
        const userType = localStorage.getItem("currentUserType");
        const brandString = localStorage.getItem("brandId");

        startTransition(() => {
          if (userString) setCurrentUserId(userString);
          if (userType) setCurrentUserType(userType);
          if (brandString) setBrandID(brandString);
        });
      } catch (error) {
        console.error("Error fetching from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocalStorageData();
  }, [location]);

  return (
    <>
      <ErrorBoundary>
        <Routes>
          {/* Normal route for Pricing */}
          <Route path="/pricing" element={<Pricing />} />

          <Route path="/talent-signup-plan-details" element={<KidsFormTwo />} />

          {/* Lazy-loaded route for Dashboard */}
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/find-talent"
            element={
              <Suspense fallback={<Spinner />}>
                <FindCreators />
              </Suspense>
            }
          />
          <Route
            path="/talent/:name"
            element={
              <Suspense fallback={<Spinner />}>
                <TalentProfile />
              </Suspense>
            }
          />
          <Route
            path="/client/:name"
            element={
              <Suspense fallback={<Spinner />}>
                <BrandHome />
              </Suspense>
            }
          />
          <Route
            path="/pricing"
            element={
              <Suspense fallback={<Spinner />}>
                <Pricing />
              </Suspense>
            }
          />
          <Route
            path="/resources"
            element={
              <Suspense fallback={<Spinner />}>
                <Resources />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<Spinner />}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/talent-signup"
            element={
              <Suspense fallback={<Spinner />}>
                <AdultSignup />
              </Suspense>
            }
          />
          <Route
            path="/otp"
            element={
              <Suspense fallback={<Spinner />}>
                <OTPComponent />
              </Suspense>
            }
          />
          <Route
            path="/about-us"
            element={
              <Suspense fallback={<Spinner />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/community-guidelines"
            element={
              <Suspense fallback={<Spinner />}>
                <Guidelines />
              </Suspense>
            }
          />
          <Route
            path="/terms-conditions"
            element={
              <Suspense fallback={<Spinner />}>
                <TermsConditions />
              </Suspense>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <Suspense fallback={<Spinner />}>
                <PrivacyPolicy />
              </Suspense>
            }
          />
          <Route
            path="/blogs"
            element={
              <Suspense fallback={<Spinner />}>
                <Blogs />
              </Suspense>
            }
          />
          <Route
            path="/post-job"
            element={
              <Suspense fallback={<Spinner />}>
                <PostJob />
              </Suspense>
            }
          />
          <Route
            path="/how-it-works"
            element={
              <Suspense fallback={<Spinner />}>
                <HowItWorks />
              </Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <Suspense fallback={<Spinner />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            path="/job-list"
            element={
              <Suspense fallback={<Spinner />}>
                <OverallJobs />
              </Suspense>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <Suspense fallback={<Spinner />}>
                <ForgotPassword />
              </Suspense>
            }
          />
          <Route
            path="/reset-password"
            element={
              <Suspense fallback={<Spinner />}>
                <ResetPassword />
              </Suspense>
            }
          />
          <Route
            path="/reset-password/brand/:token"
            element={
              <Suspense fallback={<Spinner />}>
                <ResetPassword />
              </Suspense>
            }
          />
          <Route
            path="/reset-password/adult/:token"
            element={
              <Suspense fallback={<Spinner />}>
                <ResetPassword />
              </Suspense>
            }
          />
          <Route
            path="/success-password"
            element={
              <Suspense fallback={<Spinner />}>
                <PasswordSuccess />
              </Suspense>
            }
          />
          <Route
            path="/talent-dashboard"
            element={
              <Suspense fallback={<Spinner />}>
                <TalentDashBoard />
              </Suspense>
            }
          />

          <Route
            path="/talent-kids-teen-signup-basic-details"
            element={
              <Suspense fallback={<Spinner />}>
                <KidsformOne />
              </Suspense>
            }
          />

          <Route
            path="/talent-kids-teen-signup-otp"
            element={
              <Suspense fallback={<Spinner />}>
                <KidsOTP />
              </Suspense>
            }
          />

          <Route
            path="/talent-kids-teen-social-media-connections"
            element={
              <Suspense fallback={<Spinner />}>
                <KidsSocialMedias />
              </Suspense>
            }
          />
          <Route
            path="/talent-signup-plan-details"
            element={
              <Suspense fallback={<Spinner />}>
                <AdultPricing />
              </Suspense>
            }
          />
          <Route
            path="/brand-signup-plan-details"
            element={
              <Suspense fallback={<Spinner />}>
                <BrandPricing />
              </Suspense>
            }
          />

          <Route
            path="/talent-kids-teen-signup-files-details"
            element={
              <Suspense fallback={<Spinner />}>
                <KidsFormThree />
              </Suspense>
            }
          />

          <Route
            path="/talent-kids-teen-signup-files-success"
            element={
              <Suspense fallback={<Spinner />}>
                <KidsFormFour />
              </Suspense>
            }
          />

          <Route
            path="/talent-kids-teen-signup-service-details"
            element={
              <Suspense fallback={<Spinner />}>
                <KidsServices />
              </Suspense>
            }
          />

          <Route
            path="/talent-signup-basic-details"
            element={
              <Suspense fallback={<Spinner />}>
                <AdultFormOne />
              </Suspense>
            }
          />

          <Route
            path="/talent-signup-service-details"
            element={
              <Suspense fallback={<Spinner />}>
                <AdultFormTwo />
              </Suspense>
            }
          />

          <Route
            path="/talent-signup-files-details"
            element={
              <Suspense fallback={<Spinner />}>
                <AdultFormThree />
              </Suspense>
            }
          />
          <Route
            path="/talent-signup-social-medias-details"
            element={
              <Suspense fallback={<Spinner />}>
                <AdultSocialMedias />
              </Suspense>
            }
          />
          <Route
            path="/otp-verification"
            element={
              <Suspense fallback={<Spinner />}>
                <OTPComponent />
              </Suspense>
            }
          />
          <Route
            path="/otp-verification-brands"
            element={
              <Suspense fallback={<Spinner />}>
                <BrandsOtp />
              </Suspense>
            }
          />
          <Route
            path="/adult-success"
            element={
              <Suspense fallback={<Spinner />}>
                <AdultSuccess />
              </Suspense>
            }
          />
          <Route
            path="/update-talent-password"
            element={
              <Suspense fallback={<Spinner />}>
                <UpdateAdultPassword />
              </Suspense>
            }
          />
          <Route
            path="/brand-signup"
            element={
              <Suspense fallback={<Spinner />}>
                <BrandSignup />
              </Suspense>
            }
          />
          <Route
            path="/brand-firstGig"
            element={
              <Suspense fallback={<Spinner />}>
                <BrandFirstGig />
              </Suspense>
            }
          />
          <Route
            path="/brand-details"
            element={
              <Suspense fallback={<Spinner />}>
                <BrandDetails />
              </Suspense>
            }
          />
          <Route
            path="/brand-logo"
            element={
              <Suspense fallback={<Spinner />}>
                <BrandLogo />
              </Suspense>
            }
          />
          <Route
            path="/contact-us"
            element={
              <Suspense fallback={<Spinner />}>
                <ContactUs />
              </Suspense>
            }
          />
          <Route
            path="/contact-support"
            element={
              <Suspense fallback={<Spinner />}>
                <ContactSupport />
              </Suspense>
            }
          />
          <Route
            path="/brand-activated"
            element={
              <Suspense fallback={<Spinner />}>
                <BrandActivation />
              </Suspense>
            }
          />
          <Route
            path="/list-jobs"
            element={
              <Suspense fallback={<Spinner />}>
                <ListJobs />
              </Suspense>
            }
          />
          <Route
            path="/applied-jobs"
            element={
              <Suspense fallback={<Spinner />}>
                <AppliedJobs />
              </Suspense>
            }
          />
          <Route
            path="/saved-jobs"
            element={
              <Suspense fallback={<Spinner />}>
                <SavedJobs />
              </Suspense>
            }
          />
          <Route
            path="/create-jobs"
            element={
              <Suspense fallback={<Spinner />}>
                <CreateJobs />
              </Suspense>
            }
          />
          <Route
            path="/find-talents"
            element={
              <Suspense fallback={<Spinner />}>
                <BrandTalents />
              </Suspense>
            }
          />
          <Route
            path="/favorite-talents"
            element={
              <Suspense fallback={<Spinner />}>
                <BrandFavorites />
              </Suspense>
            }
          />
          <Route
            path="/brand-help"
            element={
              <Suspense fallback={<Spinner />}>
                <BrandHelp />
              </Suspense>
            }
          />
          <Route
            path="/preview-job"
            element={
              <Suspense fallback={<Spinner />}>
                <PreviewJob />
              </Suspense>
            }
          />
          <Route
            path="/job-success"
            element={
              <Suspense fallback={<Spinner />}>
                <JobSuccess />
              </Suspense>
            }
          />
          <Route
            path="/message"
            element={
              <Suspense fallback={<Spinner />}>
                <MessageTalents />
              </Suspense>
            }
          />
          <Route
            path="/preview-job-talent"
            element={
              <Suspense fallback={<Spinner />}>
                <TalentPreviewJob />
              </Suspense>
            }
          />
          <Route
            path="/applicants"
            element={
              <Suspense fallback={<Spinner />}>
                <Applicants />
              </Suspense>
            }
          />
          <Route
            path="/edit-talent-profile"
            element={
              <Suspense fallback={<Spinner />}>
                <EditTalent />
              </Suspense>
            }
          />
          <Route
            path="/edit-brand-profile"
            element={
              <Suspense fallback={<Spinner />}>
                <EditBrands />
              </Suspense>
            }
          />
          <Route
            path="/pricingadmin"
            element={
              <Suspense fallback={<Spinner />}>
                <AdminPayment />
              </Suspense>
            }
          />
          <Route
            path="/talent-notification"
            element={
              <Suspense fallback={<Spinner />}>
                <TalentNotification />
              </Suspense>
            }
          />
          <Route
            path="/talent-settings"
            element={
              <Suspense fallback={<Spinner />}>
                <TalentSettings />
              </Suspense>
            }
          />
          <Route
            path="/brand-settings"
            element={
              <Suspense fallback={<Spinner />}>
                <BrandSettings />
              </Suspense>
            }
          />
          <Route
            path="/talent-home"
            element={
              <Suspense fallback={<Spinner />}>
                <TalentHome />
              </Suspense>
            }
          />
          <Route
            path="/brand-notification"
            element={
              <Suspense fallback={<Spinner />}>
                <BrandNotification />
              </Suspense>
            }
          />
          <Route
            path="/get-booked/:jobId?"
            element={
              <Suspense fallback={<Spinner />}>
                <GetBooked />
              </Suspense>
            }
          />
          <Route
            path="/industry-news"
            element={
              <Suspense fallback={<Spinner />}>
                <IndustryNews />
              </Suspense>
            }
          />
          <Route
            path="/edit-feature"
            element={
              <Suspense fallback={<Spinner />}>
                <EditFeatures />
              </Suspense>
            }
          />
          <Route
            path="/careers"
            element={
              <Suspense fallback={<Spinner />}>
                <Career />
              </Suspense>
            }
          />
          <Route
            path="/become-affliate"
            element={
              <Suspense fallback={<Spinner />}>
                <BecomeAffliate />
              </Suspense>
            }
          />
          <Route
            path="/investors"
            element={
              <Suspense fallback={<Spinner />}>
                <Investors />
              </Suspense>
            }
          />
          <Route
            path="/feedback"
            element={
              <Suspense fallback={<Spinner />}>
                <Feedbackreporting />
              </Suspense>
            }
          />
          <Route
            path="/location-select"
            element={
              <Suspense fallback={<Spinner />}>
                <LocationComponent />
              </Suspense>
            }
          />
          <Route
            path="/jobs/view/:jobId"
            element={
              <Suspense fallback={<Spinner />}>
                <JobRedirect />
              </Suspense>
            }
          />
        </Routes>

        {openPopUp && (
          <PopUp message={message} onClose={() => setOpenPopUp(false)} />
        )}
      </ErrorBoundary>
    </>
  );
}

export default Routing;
