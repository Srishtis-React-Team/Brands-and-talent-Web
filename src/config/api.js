const BASEURL = "https://hybrid.sicsglobal.com/brandsntalent_api/";

export const API = {
  //common
  baseUrl: BASEURL,
  userFilePath:
    "https://hybrid.sicsglobal.com/project/brandsandtalent/backend/uploads/",
  uploadFile: BASEURL + "admin/fileUpload",
  listCountries: BASEURL + "admin/listCountries",
  listStates: BASEURL + "admin/listLocation",

  //Registration
  brandRegisteration: BASEURL + "brands/brandsRegister",
  kidsSignUp: BASEURL + "users/kidsSignUp ",
  adultSignUp: BASEURL + "users/adultSignUp ",
  otpVerification: BASEURL + "users/otpVerification",
  otpVerificationAdult: BASEURL + "users/otpVerificationAdult",
  otpResend: BASEURL + "users/otpResend",
  otpResendAdult: BASEURL + "users/otpResendAdult",
  forgotPassword: BASEURL + "users/forgotPassword",
  resetPassword: BASEURL + "users/resetPassword",
  checkProfileStatus: BASEURL + "users/checkProfileStatus/",
  editKids: BASEURL + "users/editKids/",
  updateAdults: BASEURL + "users/updateAdults/",

  //login
  talentLogin: BASEURL + "users/talentLogin",

  //pricing
  getPricingList: BASEURL + "pricing/pricingList",
  subscriptionPlan: BASEURL + "users/subscriptionPlan/",

  //common
  getFeatures: BASEURL + "features/getFeatures",
  getRecentGigs: BASEURL + "gigs/recentGigs",
  getTopBrands: BASEURL + "brands/topBrands",
  getTalentList: BASEURL + "users/talentList",
  getKidsData: BASEURL + "users/kidsFetch/",
  unifiedDataFetch: BASEURL + "users/unifiedDataFetch/",
  getTalentById: BASEURL + "users/getTalentById/",
};
