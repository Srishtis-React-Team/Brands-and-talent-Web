const BASEURL = "https://brandsandtalent.com/api/";

export const API = {
  //common
  baseUrl: BASEURL,
  userFilePath: "https://brandsandtalent.com/backend/uploads/",
  uploadFile: BASEURL + "admin/fileUpload",
  listCountries: BASEURL + "admin/listCountries",
  listStates: BASEURL + "admin/listLocation",
  listCity: BASEURL + "admin/listCity",
  getAllCitiesList: BASEURL + "admin/getAllCitiesList",
  getAllStatesList: BASEURL + "admin/getAllStatesList",
  chatbot: BASEURL + "admin/chatbot",
  giftMail: BASEURL + "admin/giftMail",
  payment: BASEURL + "admin/payment",
  getSuccessStories: BASEURL + "admin/getSuccessStories",
  getLogos: BASEURL + "admin/getLogos",
  getFieldDatas: BASEURL + "features/getFieldDatas",

  //Registration
  brandsRegister: BASEURL + "brands/brandsRegister",
  kidsSignUp: BASEURL + "users/kidsSignUp ",
  adultSignUp: BASEURL + "users/adultSignUp ",
  otpVerification: BASEURL + "users/otpVerification",
  otpVerificationAdult: BASEURL + "users/otpVerificationAdult",
  otpResend: BASEURL + "users/otpResend",
  otpResendAdult: BASEURL + "users/otpResendAdult",
  resetPassword: BASEURL + "users/resetPassword",
  editKids: BASEURL + "users/editKids/",
  updateAdults: BASEURL + "users/updateAdults/",
  checkProfileStatus: BASEURL + "users/checkProfileStatus/",
  updateProfileStatus: BASEURL + "users/updateProfileStatus/",
  loginTemplate: BASEURL + "users/loginTemplate",
  checkUserStatus: BASEURL + "users/checkUserStatus",
  updateAdultPassword: BASEURL + "users/updateAdultPassword",
  socialSignup: BASEURL + "users/socialSignup",
  adultFetch: BASEURL + "users/adultFetch/",
  typeChecking: BASEURL + "users/typeChecking",
  getDataByPublicUrl: BASEURL + "users/getDataByPublicUrl",

  //passwords
  brandsForgotPassword: BASEURL + "brands/brandsForgotPassword",
  brandsResetPassword: BASEURL + "brands/brandsResetPassword",
  forgotPassword: BASEURL + "users/forgotPassword",
  resetPassword: BASEURL + "users/resetPassword",
  adultResetPassword: BASEURL + "users/adultResetPassword",
  adultForgotPassword: BASEURL + "users/adultForgotPassword",
  fetchUserData: BASEURL + "users/fetchUserData/",
  fetchPaymentDetails: BASEURL + "users/fetchPaymentDetails",

  //brands
  socailSignUpBrands: BASEURL + "brands/socailSignUpBrands",
  otpVerificationBrands: BASEURL + "brands/otpVerificationBrands",
  editBrands: BASEURL + "brands/editBrands/",
  favouritesList: BASEURL + "brands/favouritesList",
  getBrandById: BASEURL + "brands/getBrandById/",
  updateBrandPassword: BASEURL + "brands/updateBrandPassword/",
  postSupportMail: BASEURL + "brands/postSupportMail",
  otpResendBrands: BASEURL + "brands/otpResendBrands",

  //login
  talentLogin: BASEURL + "users/talentLogin",
  brandsLogin: BASEURL + "brands/brandsLogin",
  deleteNotification: BASEURL + "brands/deleteNotification",
  updatePasswordInSettings: BASEURL + "brands/updatePasswordInSettings",
  checkPublicUrlName: BASEURL + "brands/checkPublicUrlName",

  //pricing
  getPricingList: BASEURL + "pricing/pricingList",
  brandsPricingList: BASEURL + "pricing/brandsPricingList",
  subscriptionPlan: BASEURL + "users/subscriptionPlan",
  adminSubscriptionPlan: BASEURL + "users/adminSubscriptionPlan", //added
  createPayment: BASEURL + "pricing/create-payment",
  checktransaction: BASEURL + "pricing/check-transaction",
  createqrpayment: BASEURL + "pricing/createqrpayment",
  giftSubCreation: BASEURL + "giftsub/giftSubCreation",
  getGiftSubscriptionsByUser: BASEURL + "giftsub/getGiftSubscriptionsByUser",
  fetchTransactionId: BASEURL + "pricing/fetchTransactionId",

  // /api/pricing/create-payment

  //common
  getFeatures: BASEURL + "features/getFeatures",
  getTopBrands: BASEURL + "brands/topBrands",
  getTalentList: BASEURL + "users/talentList",
  getPopularTalent: BASEURL + "users/popularTalent",
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
  deleteService: BASEURL + "users/deleteService",
  deleteIndividualService: BASEURL + "users/deleteIndividualService",
  reviewsPosting: BASEURL + "users/reviewsPosting",
  countUsers: BASEURL + "users/countUsers",
  deleteVideoUrls: BASEURL + "users/deleteVideoUrls",
  deleteAudioUrls: BASEURL + "users/deleteAudioUrls",
  directKidsLogin: BASEURL + "users/directKidsLogin",

  reportReview: BASEURL + "users/reportReview",

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
  createJobAlert: BASEURL + "gigs/createJobAlert	",
  updateJobAlert: BASEURL + "gigs/updateJobAlert	",
  saveUser: BASEURL + "gigs/saveUser	",
  fetchUser: BASEURL + "gigs/fetchUser	",
  inviteTalentNotification: BASEURL + "gigs/inviteTalentNotification	",

  //notifications
  getBrandNotification: BASEURL + "gigs/getBrandNotification/",
  getTalentNotification: BASEURL + "gigs/getTalentNotification/",
  getCountNotification: BASEURL + "gigs/getCountNotification",
  getAppliedjobs: BASEURL + "gigs/getAppliedjobs",
  updatePassword: BASEURL + "gigs/updatePassword",
  inviteTalentToApply: BASEURL + "gigs/inviteTalentToApply",

  //chat section
  listTalentsForChat: BASEURL + "message/listTalentsForChat",
  listBrandsForChat: BASEURL + "message/listBrandsForChat",
  addMessage: BASEURL + "message/addMessage",
  allowPermission: BASEURL + "message/allowPermission",

  //conversation
  addConversation: BASEURL + "conversation/addConversation",
  listByConversationId: BASEURL + "conversation/listByConversationId",

  //new chat
  createChat: BASEURL + "chat/createChat",
  findPreviousChatUsers: BASEURL + "chat/findPreviousChatUsers/",
  findPlan: BASEURL + "chat/findPlan",
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

  //
  activateBrandUser: BASEURL + "brands/activateBrandUser",
  fetchContentByType: BASEURL + "content/fetchContentByType",

  //blogs
  getFeaturedArticles: BASEURL + "blog/getFeaturedArticles",
  fetchBlogByType: BASEURL + "blog/fetchBlogByType",
  //blogs
  twitterCount: BASEURL + "socialmedia/twitterCount",
  youtubeCount: BASEURL + "socialmedia/youtubeCount",

  // coupons

  applyCoupon: BASEURL + "coupon/applyCoupon",

  //ABA payway

  abaTestingUrl:
    BASEURL +
    "https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase",
  abaProductionUrl:
    BASEURL +
    "https://checkout.payway.com.kh/api/payment-gateway/v1/payments/purchase",
};
