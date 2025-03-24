import React, { useEffect, useState } from "react";

const SearchPaths = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState(null);
  const [currentUserType, setCurrentUserType] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage
    setCurrentUserId(localStorage.getItem("currentUser"));
    setCurrentUserImage(localStorage.getItem("currentUserImage"));
    setCurrentUserType(localStorage.getItem("currentUserType"));
  }, []);

  // Dynamically generate the array based on currentUserType
  const searchPathOptions = [
    ...(currentUserType == "brand"
      ? [
          { routes: "/post-job", label: "Post Job" },
          { routes: "/list-jobs", label: "List Jobs" },
          { routes: "/create-jobs", label: "Create Jobs" },
          { routes: "/edit-brand-profile", label: "Edit Brand Profile" },
          { routes: "/brand-settings", label: "Brand Settings" },
          { routes: "/brand-notification", label: "Brand Notification" },
        ]
      : []), // Add this only if currentUserType is "brand"
    ...(currentUserType == "talent"
      ? [
          { routes: "/talent-dashboard", label: "Talent Dashboard" },
          { routes: "/applied-jobs", label: "Applied Jobs" },
          { routes: "/saved-jobs", label: "Saved Jobs" },
          { routes: "/applicants", label: "Applicants" },
          { routes: "/edit-talent-profile", label: "Edit Talent Profile" },
          { routes: "/talent-notification", label: "Talent Notification" },
          { routes: "/talent-settings", label: "Talent Settings" },
          { routes: "/talent-home", label: "Talent Home" },
          { routes: "/talent-dashboard", label: "Get Booked" },
        ]
      : []), // Example for another condition
    { routes: "/", label: "Home Page" },
    // { routes: "/find-talent", label: "Find Creators" },
    { routes: "/pricing", label: "Pricing" },
    // { routes: "/resources", label: "Resources" },
    // { routes: "/signup", label: "Register" },
    { routes: "/talent-signup", label: "Signup" },
    { routes: "/community-guidelines", label: "Community Guidelines" },
    { routes: "/terms-conditions", label: "Terms & Conditions" },
    { routes: "/privacy-policy", label: "Privacy Policy" },

    { routes: "/how-it-works", label: "How It Works" },
    { routes: "/login", label: "Login" },

    // { routes: "/brand-signup", label: "Brand Signup" },
    { routes: "/contact-us", label: "Contact Us" },

    { routes: "/find-talent", label: "Find Talents" },
    // { routes: "/favorite-talents", label: "Favorite Talents" },

    { routes: "/careers", label: "Careers" },
    { routes: "/become-an-affiliate", label: "Become Affiliate" },
    { routes: "/investors", label: "Investors" },
    { routes: "/feedback", label: "Feedback Reporting" },
    { routes: "/about-us", label: "About Us" }, // Common route for all users
  ];

  return searchPathOptions; // Export the array
};

export default SearchPaths;
