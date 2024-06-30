import { useState, useEffect } from "react";
import { generateToken } from "./auth/firebase";
const CurrentUser = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [brandId, setBrandID] = useState(null);
  const [talentName, setTalentName] = useState(null);
  const [brandName, setBrandName] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentUserType, setCurrentUserType] = useState("");
  const [avatarImage, setAvatarImage] = useState("");
  // const [fcmToken, serFcmToken] = useState("");

  const avatar = require("../src/assets/images/avatar.webp");

  useEffect(() => {
    generateToken();
  }, []);

  useEffect(() => {
    setCurrentUserId(localStorage.getItem("currentUser"));
    setBrandID(localStorage.getItem("brandId"));
    setCurrentUserImage(localStorage.getItem("currentUserImage"));
    setCurrentUserType(localStorage.getItem("currentUserType"));
    setTalentName(localStorage.getItem("talentName"));
    setBrandName(localStorage.getItem("brandName"));
    console.log(localStorage.getItem("fcmToken"), "fcmTokenCurrentUs4er5");
    // serFcmToken(localStorage.getItem("fcmToken"));
    setAvatarImage(avatar);
  }, []);

  let fcmToken = localStorage.getItem("fcmToken");

  return {
    currentUserId,
    currentUserImage,
    currentUserType,
    avatarImage,
    fcmToken,
    talentName,
    brandName,
    brandId,
  };
};

export default CurrentUser;
