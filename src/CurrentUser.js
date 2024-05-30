import { useState, useEffect } from "react";

const CurrentUser = () => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentUserType, setCurrentUserType] = useState("");
  const [avatarImage, setAvatarImage] = useState("");

  const avatar = require("../src/assets/images/avatar.webp");

  useEffect(() => {
    setCurrentUserId(localStorage.getItem("currentUser"));
    setCurrentUserImage(localStorage.getItem("currentUserImage"));
    setCurrentUserType(localStorage.getItem("currentUserType"));
    setAvatarImage(avatar);
  }, []);

  return { currentUserId, currentUserImage, currentUserType, avatarImage };
};

export default CurrentUser;
