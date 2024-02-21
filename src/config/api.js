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

  //login
  kidsLogin: BASEURL + "users/kidsLogin",

  //pricing
  getPricingList: BASEURL + "pricing/pricingList",
  subscriptionPlan: BASEURL + "users/subscriptionPlan",

  //common
  getFeatures: BASEURL + "features/getFeatures",
};
