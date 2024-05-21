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

  //passwords
  brandsForgotPassword: BASEURL + "brands/brandsForgotPassword",
  forgotPassword: BASEURL + "users/forgotPassword",
  resetPassword: BASEURL + "users/resetPassword",

  //brands
  socailSignUpBrands: BASEURL + "brands/socailSignUpBrands",
  otpVerificationBrands: BASEURL + "brands/otpVerificationBrands",
  editBrands: BASEURL + "brands/editBrands/",
  favouritesList: BASEURL + "brands/favouritesList",
  getBrandById: BASEURL + "brands/getBrandById/",

  //login
  talentLogin: BASEURL + "users/talentLogin",
  brandsLogin: BASEURL + "brands/brandsLogin",
  deleteNotification: BASEURL + "brands/deleteNotification",

  //pricing
  getPricingList: BASEURL + "pricing/pricingList",
  brandsPricingList: BASEURL + "pricing/brandsPricingList",
  subscriptionPlan: BASEURL + "users/subscriptionPlan/",

  //common
  getFeatures: BASEURL + "features/getFeatures",
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
  deleteFile: BASEURL + "users/deleteFile/",
  activateUser: BASEURL + "users/activateUser/",

  //keyword
  postUserSearchKeyword: BASEURL + "keyword/postUserSearchKeyword",
  getUserSearchKeyword: BASEURL + "keyword/getUserSearchKeyword/",
  deleteUserSearchKeyword: BASEURL + "keyword/deleteUserSearchKeyword/",

  //jobs
  createJob: BASEURL + "gigs/createJob",
  draftJob: BASEURL + "gigs/draftJob",
  getAllJobs: BASEURL + "gigs/getAllJobs/",
  getJobsByID: BASEURL + "gigs/getJobsByID/",
  getAnyJobById: BASEURL + "gigs/getAnyJobById/",
  getDraftJobsByID: BASEURL + "gigs/getDraftJobsByID/",
  getBrandDraftJobsByID: BASEURL + "gigs/getBrandDraftJobsByID/",
  getBrandPostedJobsByID: BASEURL + "gigs/getBrandPostedJobsByID/",
  postJobByDraft: BASEURL + "gigs/postJobByDraft/",
  deleteJob: BASEURL + "gigs/deleteJob",
  editDraft: BASEURL + "gigs/editDraft/",
  editJob: BASEURL + "gigs/editJob/",
  jobCount: BASEURL + "gigs/jobCount/",
  getPostedJobs: BASEURL + "gigs/getPostedJobs",
  applyjobs: BASEURL + "gigs/applyjobs",
  searchJobs: BASEURL + "gigs/searchJobs",
  getSkills: BASEURL + "gigs/getSkills",
  updateFavouriteJobs: BASEURL + "gigs/updateFavouriteJobs	",
  removeFavouritesJob: BASEURL + "gigs/removeFavouritesJob	",
  getSavedJobsByTalentId: BASEURL + "gigs/getSavedJobsByTalentId	",
  readNotification: BASEURL + "gigs/readNotification	",

  //notifications
  getBrandNotification: BASEURL + "gigs/getBrandNotification/",
  getTalentNotification: BASEURL + "gigs/getTalentNotification/",
  getCountNotification: BASEURL + "gigs/getCountNotification",
  getAppliedjobs: BASEURL + "gigs/getAppliedjobs",
  updatePassword: BASEURL + "gigs/updatePassword",

  //chat section
  listTalentsForChat: BASEURL + "message/listTalentsForChat",
  listBrandsForChat: BASEURL + "message/listBrandsForChat",
  addMessage: BASEURL + "message/addMessage",

  //conversation
  addConversation: BASEURL + "conversation/addConversation",
  listByConversationId: BASEURL + "conversation/listByConversationId",

  //new chat
  createChat: BASEURL + "chat/createChat",
  findPreviousChatUsers: BASEURL + "chat/findPreviousChatUsers/",
  findUserChats: BASEURL + "chat/findUserChats/",
  findChat: BASEURL + "chat/findChat/",
  filterNames: BASEURL + "chat/filterNames/",
  createMessage: BASEURL + "message/createMessage",
  getMessages: BASEURL + "message/getMessages/",
  getMessageByUser: BASEURL + "message/getMessageByUser",
  deleteMessage: BASEURL + "message/deleteMessage",

  //candidates
  newCandidates: BASEURL + "gigs/newCandidates",
  selectedLevelRange: BASEURL + "gigs/selectedLevelRange",
  informSelectedLevel: BASEURL + "gigs/informSelectedLevel",
  getSelectionList: BASEURL + "gigs/getSelectionList",
};
