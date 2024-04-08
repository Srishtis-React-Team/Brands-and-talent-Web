const BASEURL = "https://hybrid.sicsglobal.com/brandsntalent_api/";

export const API = {
  //common
  baseUrl: BASEURL,
  userFilePath:
    "https://hybrid.sicsglobal.com/project/brandsandtalent/backend/uploads/",
  uploadFile: BASEURL + "admin/fileUpload",
  listCountries: BASEURL + "admin/listCountries",
  listStates: BASEURL + "admin/listLocation",
  listCity: BASEURL + "admin/listCity",
  getAllCitiesList: BASEURL + "admin/getAllCitiesList",
  getAllStatesList: BASEURL + "admin/getAllStatesList",
  chatbot: BASEURL + "admin/chatbot",
  chatbot: BASEURL + "admin/chatbot",

  //Registration
  brandsRegister: BASEURL + "brands/brandsRegister",
  kidsSignUp: BASEURL + "users/kidsSignUp ",
  adultSignUp: BASEURL + "users/adultSignUp ",
  otpVerification: BASEURL + "users/otpVerification",
  otpVerificationAdult: BASEURL + "users/otpVerificationAdult",
  otpResend: BASEURL + "users/otpResend",
  otpResendAdult: BASEURL + "users/otpResendAdult",
  forgotPassword: BASEURL + "users/forgotPassword",
  resetPassword: BASEURL + "users/resetPassword",
  editKids: BASEURL + "users/editKids/",
  updateAdults: BASEURL + "users/updateAdults/",
  checkProfileStatus: BASEURL + "users/checkProfileStatus/",
  updateProfileStatus: BASEURL + "users/updateProfileStatus/",
  loginTemplate: BASEURL + "users/loginTemplate",
  checkUserStatus: BASEURL + "users/checkUserStatus",
  updateAdultPassword: BASEURL + "users/updateAdultPassword",
  socialSignup: BASEURL + "users/socialSignup",

  //brands
  socailSignUpBrands: BASEURL + "brands/socailSignUpBrands",
  otpVerificationBrands: BASEURL + "brands/otpVerificationBrands",
  editBrands: BASEURL + "brands/editBrands/",
  createJob: BASEURL + "gigs/createJob",
  draftJob: BASEURL + "gigs/draftJob",
  getAllJobs: BASEURL + "gigs/getAllJobs",
  getJobsByID: BASEURL + "gigs/getJobsByID/",
  getDraftJobsByID: BASEURL + "gigs/getDraftJobsByID/",

  //login
  talentLogin: BASEURL + "users/talentLogin",

  //pricing
  getPricingList: BASEURL + "pricing/pricingList",
  subscriptionPlan: BASEURL + "users/subscriptionPlan/",

  //common
  getFeatures: BASEURL + "features/getFeatures",
  getRecentGigs: BASEURL + "gigs/getAllJobs",
  getTopBrands: BASEURL + "brands/topBrands",
  getTalentList: BASEURL + "users/talentList",
  getKidsData: BASEURL + "users/kidsFetch/",
  unifiedDataFetch: BASEURL + "users/unifiedDataFetch/",
  getTalentById: BASEURL + "users/getTalentById/",
  talentFilterData: BASEURL + "users/talentFilterData",
  getByProfession: BASEURL + "users/getByProfession",
  setUserFavorite: BASEURL + "users/setUserFavorite/",
  removeFavorite: BASEURL + "users/removeFavorite/",
  subscriptionStatus: BASEURL + "users/subscriptionStatus/",
  setUserFavorite: BASEURL + "users/setUserFavorite/",

  //keyword
  postUserSearchKeyword: BASEURL + "keyword/postUserSearchKeyword",
  getUserSearchKeyword: BASEURL + "keyword/getUserSearchKeyword/",
  deleteUserSearchKeyword: BASEURL + "keyword/deleteUserSearchKeyword/",
};
