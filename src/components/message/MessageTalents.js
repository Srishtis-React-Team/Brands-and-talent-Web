import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/messages.scss";
import { ApiHelper } from "../../helpers/ApiHelper";
import { API } from "../../config/api";
import BrandHeader from "../../brand/pages/BrandHeader";
import { io } from "socket.io-client";
import TalentHeader from "../../layout/TalentHeader";
import Axios from "axios";
import { Dropdown } from "react-bootstrap";
import PopUp from "../PopUp";
import { useNavigate } from "react-router";

const MessageTalents = () => {
  const imageType = require("../../assets/icons/imageType.png");
  const videoType = require("../../assets/icons/videoType.png");
  const audiotype = require("../../assets/icons/audiotype.png");
  const docsIcon = require("../../assets/icons/docsIcon.png");
  const elipsis = require("../../assets/icons/elipsis.png");
  const navigate = useNavigate();

  const [userList, setUsersList] = useState([]);
  const [selectedUSerImage, setSelectedUSerIMage] = useState("");
  const [currentUserId, setcurrentUserId] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState(null);
  const [userType, setuserType] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [text, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [currentChat, setCurrentChat] = useState("");
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [apiMessage, setApiMessage] = useState(null);
  const [messagesList, setMessagesList] = useState([]);
  const [clickedUserId, setClickedUserId] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [popupMessage, setPopUpMessage] = useState("");
  const fileInputRef = useRef(null);
  const handleAttachmentClick = () => {
    // Trigger click on file input
    fileInputRef.current.click();
  };

  const profileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      console.log(fileData, "fileData");
      uploadProfile(fileData);
    }
  };

  const getFileType = (fileType) => {
    // Extract main category from MIME type
    if (fileType.startsWith("image/")) {
      return "image";
    } else if (fileType.startsWith("video/")) {
      return "video";
    } else if (fileType.startsWith("audio/")) {
      return "audio";
    } else if (fileType === "application/pdf") {
      return "pdf";
    } else {
      return "other";
    }
  };

  const uploadProfile = async (fileData) => {
    const params = new FormData();
    params.append("file", fileData);
    params.append("fileName", fileData.name);
    params.append("fileType", getFileType(fileData.type));
    /* await ApiHelper.post(API.uploadFile, params) */
    await Axios.post(API.uploadFile, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((resData) => {
        let fileObj = {
          id: resData.data.data.fileId,
          title: fileData.name,
          fileData: resData.data.data.filename,
          type: resData?.data?.data?.filetype,
        };
        console.log(fileObj, "fileObj profileFile");
        setProfileFile(fileObj);
        if (Object.values(fileObj).every((value) => !!value)) {
          if (fileObj) {
            sendMessage(fileObj);
          }
        } else {
          console.log("Some values are missing");
        }
        console.log(profileFile, "profileFile");
        setPopUpMessage("File Uploaded Successfully");
        setOpenPopUp(true);
        setTimeout(function() {
          setOpenPopUp(false);
        }, 1000);
      })
      .catch((err) => {});
  };

  const url = window.location.href;
  let urlUserID = url.split("?")[1];

  useEffect(() => {
    setcurrentUserId(localStorage.getItem("currentUser"));
    setCurrentUserImage(localStorage.getItem("currentUserImage"));
    if (urlUserID) {
      setClickedUserId(urlUserID);
    }
    if (currentUserId) {
      getMessageByUser(urlUserID);
      findPreviousChatUsers();
    }
  }, [currentUserId, urlUserID]);

  //socket codes
  useEffect(() => {
    console.log(currentUserId, "currentUserId");
    const newSocket = io("http://13.234.177.61:4014");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [currentUserId]);

  useEffect(() => {
    setuserType(localStorage.getItem("currentUserType"));
    if (userType) {
    }
  }, [userType]);

  useEffect(() => {
    // if (socket === null) return;
    if (socket != null) {
      socket.emit("addNewUser", currentUserId);
      socket.on("getOnlineUsers", (res) => {
        console.log(res, "getOnlineUsers");
        setOnlineUsers(res);
      });
    }
  }, [socket]);
  useEffect(() => {
    // if (socket === null) return;
    if (socket != null) {
      const formData = {
        firstId: currentUserId,
        secondId: clickedUserId,
      };
      socket.emit("createChat", formData);
      socket.on("chatCreated", (res) => {
        console.log(res, "chatCreated");
        if (res) {
          findPreviousChatUsers();
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    console.log(userList, "userList");
  }, [userList]);

  const createChat = async () => {
    const formData = {
      firstId: currentUserId,
      secondId: clickedUserId,
    };

    await ApiHelper.post(API.createChat, formData)
      .then((resData) => {
        if (resData) {
          setCurrentChat(resData?.data);
          findPreviousChatUsers();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findPreviousChatUsers = async () => {
    await ApiHelper.post(`${API.findPreviousChatUsers}${currentUserId}`)
      .then((resData) => {
        if (resData) {
          setUsersList(resData.data.data);
          setInitaialUser(resData.data.data, clickedUserId);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async (fileObj) => {
    //socket send message
    if (socket != null) {
      let recipientId = selectedUser?._id
        ? selectedUser?._id
        : userList[0]?._id;
      // let recipentId = currentChat?.members?.find(id !== currentUserId);
      let current_chat = currentChat?._id;
      let userImage = currentUserImage;
      let chat_file = fileObj;
      socket.emit("sendMessage", {
        current_chat,
        text,
        recipientId,
        userImage,
        currentTime: currentTime,
        chatFile: chat_file ? chat_file : null,
      });
    }
    /////socket ends
    let chat_file = fileObj;
    const formData = {
      chatId: currentChat?._id,
      senderId: currentUserId,
      text: text,
      userImage: currentUserImage,
      currentTime: currentTime,
      receiverId: clickedUserId,
      chatFile: chat_file ? chat_file : null,
    };
    await ApiHelper.post(API.createMessage, formData)
      .then((resData) => {
        if (resData) {
          getMessages();
          getMessageByUser(clickedUserId);
          setMessage("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMessages = async () => {
    await ApiHelper.get(`${API.getMessages}${currentChat?._id}`)
      .then((resData) => {
        if (resData) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (socket != null) {
      socket.on("getMessage", (res) => {
        console.log(res, "SocketgetMessage");
        if (currentChat?._id !== res?.current_chat) return;
        setMessagesList((prev) => [...prev, res]);
        // setApiMessage((prev) => [...prev, res]);
      });
      return () => {
        socket.off("getMessage");
      };
    }
  }, [socket, currentChat]);

  useEffect(() => {
    if (selectedUser) {
      if (selectedUser.brandImage && selectedUser.brandImage.length > 0) {
        setSelectedUSerIMage(selectedUser.brandImage[0]?.fileData);
      }
      if (selectedUser?.image && selectedUser?.image?.fileData) {
        setSelectedUSerIMage(selectedUser?.image?.fileData);
      }
    }
  }, [selectedUser]);

  const searchNames = async (data) => {
    console.log(data, "data");
    const formData = {
      startingSequence: data,
    };
    await ApiHelper.post(`${API.filterNames}${currentUserId}`, formData)
      .then((resData) => {
        if (resData) {
          console.log(resData?.data?.data, "resData");
          setUsersList(resData?.data?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = async (data) => {
    const formData = {
      messageId: data?._id,
    };
    await ApiHelper.post(API.deleteMessage, formData)
      .then((resData) => {
        if (resData?.data?.status === true) {
          setPopUpMessage("Message Deleted Successfully");
          setOpenPopUp(true);
          setTimeout(function() {
            setOpenPopUp(false);
            getMessageByUser(data?.receiverId);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    console.log(currentChat, "currentChat");
    getMessages();
  }, [currentChat]);
  useEffect(() => {
    console.log(socket, "socket");
  }, [socket]);
  useEffect(() => {
    console.log(onlineUsers, "onlineUsers");
  }, [onlineUsers]);
  useEffect(() => {
    console.log(selectedUSerImage, "selectedUSerImage");
  }, [selectedUSerImage]);
  useEffect(() => {
    console.log(messagesList, "messagesList");
  }, [messagesList]);
  useEffect(() => {
    console.log(profileFile, "profileFile");
  }, [profileFile]);

  const setCLickedUser = (data) => {
    console.log("setCLickedUser");
    setClickedUserId(data?._id);
    setInitaialUser(userList, data?._id);
    if (currentUserId && selectedUser?._id) {
      createChat();
      findChat();
      getMessageByUser(data?._id);
    }
  };

  useEffect(() => {
    console.log(clickedUserId, "clickedUserId");
  }, [clickedUserId]);

  const findChat = async () => {
    await ApiHelper.get(`${API.findChat}${currentUserId}/${clickedUserId}`)
      .then((resData) => {
        if (resData) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert 0 to 12
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if needed
      setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
      console.log(currentTime, "currentTime");
      console.log(typeof currentTime, "currentTime");
    }, 1000); // Update time every second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const setInitaialUser = async (userData, selectedID) => {
    console.log(userData, "userData callingblock");
    console.log(selectedID, "selectedID callingblock");
    if (userData.length > 0) {
      // Find the object with the matching id
      const obj = userData.find((item) => item._id === selectedID);
      console.log(obj, "obj callingblock");
      // Update the state with the filtered object
      setSelectedUser(obj);
      console.log(selectedUser, "selectedUser callingblock");
    }
  };

  useEffect(() => {
    if (clickedUserId && currentUserId) {
      createChat();
      findChat();
    }
  }, [clickedUserId, currentUserId]);

  const getMessageByUser = async (sender_id) => {
    console.log(currentUserId, "currentUserId getMessageByUser");
    const formData = {
      senderId: sender_id,
      receiverId: currentUserId,
    };
    console.log(formData, "getMessageByUserPAYLOAD");
    await ApiHelper.post(API.getMessageByUser, formData)
      .then((resData) => {
        if (resData) {
          console.log(resData?.data, "resData.data getMessageByUserRESPONSE");
          setMessagesList(resData?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleView = (imageUrl) => {
    let viewImage = `${API.userFilePath}${imageUrl?.fileData}`;
    window.open(viewImage, "_blank");
  };

  return (
    <>
      {userType && userType == "talent" && (
        <TalentHeader toggleMenu={toggleMenu} />
      )}
      {userType && userType == "brand" && (
        <BrandHeader toggleMenu={toggleMenu} />
      )}
      <div className="message-main">
        <div className="messages-section">
          <div className="message-header">
            <div className="message-header-main">
              <div className="message-search">
                <div className="mb-0">
                  <div className="form-group has-search">
                    <span className="fa fa-search form-control-feedback "></span>
                    <input
                      type="text"
                      className="form-control adult-signup-inputs"
                      placeholder="Search"
                      onChange={(e) => {
                        searchNames(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="message-user-wrapper">
                <div className="message-userdetails-wrapper">
                  <div className="message-images-position">
                    {selectedUSerImage && (
                      <img
                        className="message-user-image"
                        src={`${API.userFilePath}${selectedUSerImage}`}
                        alt=""
                      />
                    )}
                    {selectedUser?.isOnline === true && (
                      <div className="online-dot"></div>
                    )}
                    {selectedUser?.isOnline === false && (
                      <div className="offline-dot"></div>
                    )}
                  </div>
                  <div className="message-user-details">
                    {selectedUser?.brandName && (
                      <div className="message-user-name">
                        {`${selectedUser?.brandName}`}
                      </div>
                    )}
                    {selectedUser?.preferredChildFirstname && (
                      <div className="message-user-name">
                        {`${selectedUser?.preferredChildFirstname}${selectedUser?.preferredChildLastName}`}
                      </div>
                    )}

                    <div className="message-user-time">Just Now</div>
                  </div>
                </div>
                <div className="message-more">More</div>
              </div>
            </div>
          </div>
          <div className="message-container-wrapper">
            <div className="message-sidebar">
              <div className="message-leftmenu-main">
                <div className="message-list-wrapper">
                  {userList &&
                    userList?.map((item, index) => (
                      <>
                        <div
                          className={
                            item?._id == selectedUser?._id
                              ? "message-userdetails-menu-wrapper-selected"
                              : "message-userdetails-menu-wrapper"
                          }
                          onClick={() => setCLickedUser(item)}
                          key={index}
                        >
                          <div className="message-images-position">
                            {item?.brandImage &&
                              item?.brandImage.length > 0 && (
                                <img
                                  className="message-user-image"
                                  src={`${API.userFilePath}${item?.brandImage[0]?.fileData}`}
                                  alt=""
                                />
                              )}
                            {item?.image && item?.image?.fileData && (
                              <img
                                className="message-user-image"
                                src={`${API.userFilePath}${item?.image?.fileData}`}
                                alt=""
                              />
                            )}
                            {item?.isOnline === true && (
                              <div className="online-dot"></div>
                            )}
                            {item?.isOnline === false && (
                              <div className="offline-dot"></div>
                            )}
                          </div>
                          <div className="message-user-details">
                            <div className="message-user-name">
                              {item?.brandName && (
                                <div className="message-user-name">
                                  {`${item?.brandName}`}
                                </div>
                              )}
                              {item?.preferredChildFirstname && (
                                <div className="message-user-name">
                                  {`${item?.preferredChildFirstname}${item?.preferredChildLastName}`}
                                </div>
                              )}
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "400",
                                }}
                              >
                                Send a message
                              </span>
                            </div>
                            <div className="message-user-time">Just Now</div>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              </div>
            </div>
            <div className="conversation-section">
              <div className="conversation-main">
                {messagesList &&
                  messagesList?.length > 0 &&
                  messagesList?.map((item, index) => {
                    return (
                      <>
                        <div className="conversation-left-side">
                          <div
                            className={`conversation-all-wrapper ${
                              item.senderId === currentUserId
                                ? "conversation-allign-right"
                                : "conversation-allign-left"
                            }`}
                          >
                            <div>
                              <img
                                className="conversation-left-user-img"
                                src={`${API.userFilePath}${item?.userImage}`}
                                alt=""
                              />
                            </div>
                            <div
                              className={`conversation-left-message-container ${
                                item.senderId === currentUserId
                                  ? "conversation-allign-right-message"
                                  : "conversation-allign-left-message"
                              }`}
                            >
                              {item?.text && (
                                <div className="conversation-message">
                                  {item.text}
                                </div>
                              )}
                              {item?.chatFile && (
                                <div className="message-files">
                                  <div className="message-file-type">
                                    {item?.chatFile?.type === "image" && (
                                      <div className="fileType">
                                        <img src={imageType} alt="" />
                                      </div>
                                    )}
                                    {item?.chatFile?.type === "audio" && (
                                      <div className="fileType">
                                        <img src={audiotype} alt="" />
                                      </div>
                                    )}
                                    {item?.chatFile?.type === "video" && (
                                      <div className="fileType">
                                        <img src={videoType} alt="" />
                                      </div>
                                    )}
                                    {item?.chatFile?.type === "document" && (
                                      <div className="fileType">
                                        <img src={docsIcon} alt="" />
                                      </div>
                                    )}
                                  </div>
                                  <div className="message-file-title">
                                    {item?.chatFile?.title}
                                  </div>
                                  <div className="message-file-options">
                                    <i
                                      className="bi bi-eye-fill view-file-icon"
                                      onClick={() => handleView(item?.chatFile)}
                                    ></i>
                                  </div>
                                </div>
                              )}
                            </div>
                            {item.senderId === currentUserId && (
                              <div>
                                <Dropdown className="reportDrop">
                                  <Dropdown.Toggle className="dropColorHead message-elips-dropdown">
                                    {/* <img
                                    className="message-elipsis-options"
                                    src={elipsis}
                                    alt=""
                                  /> */}
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    {/* <Dropdown.Item
                                      onClick={() => handleView(item?.chatFile)}
                                    >
                                      Edit
                                    </Dropdown.Item> */}
                                    <Dropdown.Item
                                      onClick={() => handleDelete(item)}
                                    >
                                      Delete
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })}
              </div>
              <div className="conversation-input-section">
                <div onClick={handleAttachmentClick}>
                  <i className="bi bi-paperclip conversation-attachment-icon"></i>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={profileUpload}
                  style={{ display: "none" }}
                  accept=".pdf,.doc,.docx,.txt,.rtf"
                />
                <div className="conversation-input-wrapper">
                  <input
                    type="text"
                    className="form-control conversation-input"
                    placeholder="Search"
                    value={text}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                  ></input>
                </div>
                <div>
                  <div className="conversation-send">
                    <i className="bi bi-send conversation-send-icon"></i>
                    <div
                      onClick={() => sendMessage()}
                      className="conversation-send-text"
                    >
                      Send
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openPopUp && <PopUp message={popupMessage} />}
    </>
  );
};

export default MessageTalents;
