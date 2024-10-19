import React, {
  Suspense,
  lazy,
  useEffect,
  useState,
  startTransition,
} from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import ErrorBoundary from "../components/ErrorBoundary";

// Lazy load components
const PopUp = lazy(() => import("../components/PopUp"));
const Dashboard = lazy(() => import("../views/Dashboard"));
const FindCreators = lazy(() => import("../views/FindCreators"));
const TalentProfile = lazy(() => import("../views/TalentProfile"));
const Pricing = lazy(() => import("../views/pricing"));
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
const KidsFormTwo = lazy(() => import("../auth/KidsFormTwo"));
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
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/find-creators" element={<FindCreators />} />
            <Route path="/talent/:name" element={<TalentProfile />} />
            <Route path="/client/:name" element={<BrandHome />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/adult-signup" element={<AdultSignup />} />
            <Route path="/otp" element={<OTPComponent />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/community-guidelines" element={<Guidelines />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/job-list" element={<OverallJobs />}></Route>
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
            <Route
              path="/talent-signup-basic-details"
              element={<KidsformOne />}
            />
            <Route path="/talent-otp" element={<KidsOTP />} />
            <Route
              path="/talent-social-media-connections"
              element={<KidsSocialMedias />}
            />
            <Route
              path="/talent-signup-plan-details"
              element={<KidsFormTwo />}
            />
            <Route
              path="/adult-signup-plan-details"
              element={<AdultPricing />}
            />
            <Route
              path="/brand-signup-plan-details"
              element={<BrandPricing />}
            />
            <Route
              path="/talent-signup-files-details"
              element={<KidsFormThree />}
            />
            <Route
              path="/talent-signup-files-success"
              element={<KidsFormFour />}
            />
            <Route
              path="/talent-signup-service-details"
              element={<KidsServices />}
            />
            <Route
              path="/adult-signup-basic-details"
              element={<AdultFormOne />}
            />
            <Route
              path="/adult-signup-service-details"
              element={<AdultFormTwo />}
            />
            <Route
              path="/adult-signup-files-details"
              element={<AdultFormThree />}
            />
            <Route
              path="/adult-social-medias-details"
              element={<AdultSocialMedias />}
            />
            <Route path="/otp-verification" element={<OTPComponent />} />
            <Route path="/otp-verification-brands" element={<BrandsOtp />} />
            <Route path="/adult-success" element={<AdultSuccess />} />
            <Route
              path="/update-talent-password"
              element={<UpdateAdultPassword />}
            />
            <Route path="/brand-signup" element={<BrandSignup />} />
            <Route path="/brand-firstGig" element={<BrandFirstGig />} />
            <Route path="/brand-details" element={<BrandDetails />} />
            <Route path="/brand-logo" element={<BrandLogo />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/contact-support" element={<ContactSupport />} />
            <Route path="/brand-activated" element={<BrandActivation />} />
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
            <Route path="/pricingadmin" element={<AdminPayment />} />
            <Route
              path="/talent-notification"
              element={<TalentNotification />}
            />
            <Route path="/talent-settings" element={<TalentSettings />} />
            <Route path="/brand-settings" element={<BrandSettings />} />
            <Route path="/talent-home" element={<TalentHome />} />
            <Route path="/brand-notification" element={<BrandNotification />} />
            <Route path="/get-booked" element={<GetBooked />} />
            <Route path="/industry-news" element={<IndustryNews />} />
            <Route path="/edit-feature" element={<EditFeatures />} />
            <Route path="/careers" element={<Career />} />
            <Route path="/become-affliate" element={<BecomeAffliate />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/feedback" element={<Feedbackreporting />} />
            <Route path="/location-select" element={<LocationComponent />} />
          </Routes>
        </Suspense>
        {openPopUp && (
          <PopUp message={message} onClose={() => setOpenPopUp(false)} />
        )}
      </ErrorBoundary>
    </>
  );
}

export default Routing;
