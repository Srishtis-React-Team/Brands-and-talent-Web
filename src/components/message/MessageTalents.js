import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/messages.css";
import { ApiHelper } from "../../helpers/ApiHelper";
import { API } from "../../config/api";
import BrandHeader from "../../brand/pages/BrandHeader";
import { io } from "socket.io-client";
import TalentHeader from "../../layout/TalentHeader";
import Axios from "axios";
import PopUp from "../PopUp";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { create } from "@mui/material/styles/createTransitions";
import CurrentUser from "../../CurrentUser";
import { Dropdown } from "@mui/base";

const MessageTalents = () => {
  const { currentUserType } = CurrentUser();
  const location = useLocation();
  const avatar = require("../../assets/images/avatar.webp");
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
  const [socketId, setSocketId] = useState(null);

  const fileInputRef = useRef(null);
  const handleAttachmentClick = () => {
    // Trigger click on file input
    fileInputRef.current.click();
  };

  const profileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      let fileData = event.target.files[0];
      // Check if file size is less than 1MB (1048576 bytes)
      if (fileData.size > 1048576) {
        setPopUpMessage("File size should be less than 1MB");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 3000);
        return;
      }

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

  const handleBackClick = () => {
    // if (currentUserType == "brand") {
    //   navigate(`/brand`);
    // }
    // if (currentUserType == "talent") {
    //   navigate("/talent-dashboard");
    // }
    if (location.state && location.state.from) {
      navigate(`/${location.state.from}`);
    } else {
      navigate(-1); // Equivalent to history.goBack() in v5
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

        setProfileFile(fileObj);
        if (Object.values(fileObj).every((value) => !!value)) {
          if (fileObj) {
            sendMessage(fileObj);
          }
        } else {
        }

        setPopUpMessage("The file has been successfully uploaded");
        setOpenPopUp(true);
        setTimeout(function () {
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
      getMessageByUser(urlUserID);
      // fetchUserData(urlUserID);
      createChat(urlUserID);
    }
    if (currentUserId) {
      getMessageByUser(currentUserId);
      findPreviousChatUsers();
      // fetchUserData(currentUserId);
    }
  }, [currentUserId, urlUserID]);

  //socket codes
  // useEffect(() => {
  //
  //
  //   const newSocket = io(
  //     "https://hybrid.sicsglobal.com/project/brandsandtalent"
  //   );
  //
  //   setSocket(newSocket);
  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, [currentUserId]);
  // const newSocket = io("https://hybrid.sicsglobal.com", {
  //   path: "/project/brandsandtalent/socket.io",
  // });

  useEffect(() => {
    const newSocket = io("http://13.234.177.61:4014");

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [currentUserId]);

  // useEffect(() => {
  //
  //
  //   const newSocket = io("http://13.234.177.61:4014");
  //
  //   setSocket(newSocket);
  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, [currentUserId]);

  useEffect(() => {
    setuserType(localStorage.getItem("currentUserType"));
  }, [userType]);

  useEffect(() => {
    // if (socket === null) return;
    if (socket != null) {
      socket.emit("addNewUser", currentUserId);
      socket.on("getOnlineUsers", (res) => {
        setOnlineUsers(res);
      });
    }
  }, [socket]);

  useEffect(() => {
    // if (socket === null) return;
    if (socket != null) {
      socket.on("connect", () => {
        //
        socket.emit("createChat", currentUserId, clickedUserId, socket.id);
        setSocketId(socket.id);
      });
      socket.on("chatCreated", (res) => {
        if (res) {
          findPreviousChatUsers();
        }
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socketId) {
      // createChat("fromSocketID");
    }
  }, [socketId]);

  const createChat = async (secand_id) => {
    if (currentUserId && secand_id) {
      const formData = {
        firstId: currentUserId,
        secondId: secand_id,
        socketId: socketId,
      };

      await ApiHelper.post(API.createChat, formData)
        .then((resData) => {
          if (resData) {
            setCurrentChat(resData?.data);
            findPreviousChatUsers();
          }
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {}, [userList]);

  const findPreviousChatUsers = async () => {
    await ApiHelper.post(`${API.findPreviousChatUsers}${currentUserId}`)
      .then((resData) => {
        if (resData) {
          setUsersList(resData?.data?.data);
          if (resData.data.data.length > 0 && userList?.length === 0) {
            setInitaialUser(resData.data.data, resData.data.data[0]?._id);
          }
          if (resData?.data?.status === false) {
            createChat(urlUserID);
          }
        }
      })
      .catch((err) => {
        setUsersList([]);
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
        senderId: currentUserId,
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
      receiverId: clickedUserId ? clickedUserId : selectedUser?._id,
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
      .catch((err) => {});
  };

  const getMessages = async () => {
    await ApiHelper.get(`${API.getMessages}${currentChat?._id}`)
      .then((resData) => {
        if (resData) {
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (socket != null) {
      socket.on("getMessage", (res) => {
        setClickedUserId(res?.senderId);
        createChat(res?.senderId);
        // findPreviousChatUsers();
        setRecivedUser(res?.senderId);
        getMessageByUser(res?.senderId);

        if (currentChat?._id !== res?.current_chat) return;
        setMessagesList((prev) => [...prev, res]);
        // setApiMessage((prev) => [...prev, res]);
      });
      return () => {
        socket.off("getMessage");
      };
    }
  }, [socket, currentChat]);

  const setRecivedUser = async (sender_id) => {
    await ApiHelper.post(`${API.fetchUserData}${sender_id}`)
      .then((resData) => {
        if (resData.data.status === true) {
          if (resData.data.data) {
            setSelectedUser(resData.data.data);
          }
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (selectedUser) {
      if (selectedUser.brandImage && selectedUser.brandImage.length > 0) {
        setSelectedUSerIMage(selectedUser.brandImage[0]?.fileData);
      }
      if (selectedUser?.image && selectedUser?.image?.fileData) {
        setSelectedUSerIMage(selectedUser?.image?.fileData);
      }
      // createChat("fromSelectedUSer");
      // findChat();
      // getMessageByUser(selectedUser?._id);
    }
  }, [selectedUser]);

  const searchNames = async (data) => {
    const formData = {
      startingSequence: data,
    };
    await ApiHelper.post(`${API.filterNames}${currentUserId}`, formData)
      .then((resData) => {
        if (resData) {
          setUsersList(resData?.data?.data);
        }
      })
      .catch((err) => {});
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
          setTimeout(function () {
            setOpenPopUp(false);
            getMessageByUser(data?.receiverId);
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    getMessages();
  }, [currentChat]);
  useEffect(() => {}, [socket]);
  useEffect(() => {}, [onlineUsers]);
  useEffect(() => {}, [selectedUSerImage]);
  useEffect(() => {}, [messagesList]);
  useEffect(() => {}, [profileFile]);

  const setCLickedUser = (data) => {
    setClickedUserId(data?._id);
    setSelectedUser(data);
    if (currentUserId && selectedUser?._id) {
      // createChat("createChatFromsetCLickedUser");
      // findChat();
      getMessageByUser(data?._id);
    }
  };

  useEffect(() => {}, [clickedUserId]);

  const findChat = async () => {
    await ApiHelper.get(`${API.findChat}${currentUserId}/${clickedUserId}`)
      .then((resData) => {
        if (resData) {
        }
      })
      .catch((err) => {});
  };

  // const [currentTime, setCurrentTime] = useState("");

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const date = new Date();
  //     const hours = date.getHours();
  //     const minutes = date.getMinutes();
  //     const ampm = hours >= 12 ? "PM" : "AM";
  //     const formattedHours = hours % 12 || 12; // Convert 0 to 12
  //     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if needed
  //     setCurrentTime(`${formattedHours}:${formattedMinutes} ${ampm}`);
  //
  //
  //   }, 1000); // Update time every second

  //   return () => clearInterval(interval); // Clean up interval on component unmount
  // }, []);

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
    }, 1000); // Update time every second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Log currentTime only when it updates
  useEffect(() => {}, [currentTime]);

  const setInitaialUser = async (userData, selectedID) => {
    if (userData.length > 0) {
      const obj = userData.find((item) => item._id === selectedID);

      setSelectedUser(obj);

      if (currentUserId && selectedID) {
        //
        // createChat("createChatFromsetInitaialUser");
        // findChat();
        getMessageByUser(selectedID);
      }
    }
  };

  // useEffect(() => {
  //   if (clickedUserId && currentUserId) {
  //     createChat();
  //     findChat();
  //   }
  // }, [clickedUserId, currentUserId]);

  const getMessageByUser = async (sender_id) => {
    const formData = {
      senderId: sender_id,
      receiverId: currentUserId,
    };

    await ApiHelper.post(API.getMessageByUser, formData)
      .then((resData) => {
        if (resData) {
          setMessagesList(resData?.data);
        }
      })
      .catch((err) => {});
  };

  const handleView = (imageUrl) => {
    let viewImage = `${API.userFilePath}${imageUrl?.fileData}`;
    window.open(viewImage, "_blank");
  };
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messagesList]);

  return (
    <>
      {userType && userType == "talent" && (
        <TalentHeader from={"message"} toggleMenu={toggleMenu} />
      )}
      {userType && userType == "brand" && (
        <BrandHeader from={"message"} toggleMenu={toggleMenu} />
      )}
      <div className="message-main px-2">
        <div className="container-fluid message-section-container">
          <div className="messages-section m-0">
            <div className="message-header">
              <div className="message-header-main row">
                <div className="col-md-4 col-lg-3">
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
                </div>
                <div className="col-md-8 col-lg-9">
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
                        {!selectedUSerImage && (
                          <img
                            className="message-user-image"
                            src={avatar}
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
                            {`${selectedUser?.preferredChildFirstname} ${selectedUser?.preferredChildLastName}`}
                          </div>
                        )}
                        {selectedUser?.preferredChildFirstname && (
                          <>
                            {" "}
                            <div className="message-user-time">Just Now</div>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      {/* <div className="message-more">More</div> */}
                      <div className="go-dashboard" onClick={handleBackClick}>
                        Back
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="message-container-wrapper">
              <div className="row">
                <div className="message-sidebar col-md-4 col-lg-3">
                  <div className="message-leftmenu-main scroll">
                    <div className="message-list-wrapper">
                      {userList?.length === 0 && (
                        <div className="no-data">
                          <p>
                            You will be able to see a brand / client or talent
                            contact you here
                          </p>
                        </div>
                      )}
                      {userList?.length > 0 &&
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
                                {/* {item?.brandImage &&
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
                                )} */}

                                {item?.brandImage &&
                                item?.brandImage.length > 0 ? (
                                  <img
                                    className="message-user-image"
                                    src={`${API.userFilePath}${item?.brandImage[0]?.fileData}`}
                                    alt=""
                                  />
                                ) : item?.image && item?.image?.fileData ? (
                                  <img
                                    className="message-user-image"
                                    src={`${API.userFilePath}${item?.image?.fileData}`}
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    className="message-user-image"
                                    src={avatar}
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
                                      {`${item?.preferredChildFirstname} ${item?.preferredChildLastName}`}
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
                                <div className="message-user-time">
                                  Just Now
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="conversation-section col-md-8 col-lg-9">
                  <div
                    className="conversation-main scroll"
                    ref={contentRef}
                    style={{
                      overflowY: "auto",
                    }}
                  >
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
                                            <i className="bi bi-card-image"></i>
                                          </div>
                                        )}
                                        {item?.chatFile?.type === "audio" && (
                                          <div className="fileType">
                                            <i className="bi bi-mic-fill"></i>
                                          </div>
                                        )}
                                        {item?.chatFile?.type === "video" && (
                                          <div className="fileType">
                                            <i className="bi bi-play-circle-fill"></i>
                                          </div>
                                        )}
                                        {item?.chatFile?.type ===
                                          "document" && (
                                          <div className="fileType">
                                            <i className="bi bi-file-earmark-richtext"></i>
                                          </div>
                                        )}
                                      </div>
                                      <div className="message-file-title">
                                        {item?.chatFile?.title}
                                      </div>
                                      <div className="message-file-options">
                                        <i
                                          className="bi bi-eye-fill view-file-icon"
                                          onClick={() =>
                                            handleView(item?.chatFile)
                                          }
                                        ></i>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {/* {item.senderId === currentUserId && (
                                  <div>
                                    <Dropdown className="reportDrop">
                                      <Dropdown.Toggle className="dropColorHead message-elips-dropdown">
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu>
                                        <Dropdown.Item
                                          onClick={() => handleDelete(item)}
                                        >
                                          Delete
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                )} */}
                              </div>
                            </div>
                          </>
                        );
                      })}
                    {/* {messagesList && messagesList?.length === 0 && (
                      <>
                        <div className="no-messages-wrapper">
                          <div className="no-messages-title">
                            Welcome To Messages
                          </div>
                          <p>When an Brand/Client or Talent contact you</p>
                          <p>You will see messages Here</p>
                        </div>
                      </>
                    )} */}
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
        </div>
      </div>
      {openPopUp && <PopUp message={popupMessage} />}
    </>
  );
};

export default MessageTalents;
