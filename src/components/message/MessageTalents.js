import React, { useState, useEffect } from "react";
import "../../assets/css/messages.scss";
import { ApiHelper } from "../../helpers/ApiHelper";
import { API } from "../../config/api";
import BrandHeader from "../../brand/pages/BrandHeader";
import { io } from "socket.io-client";
import TalentHeader from "../../layout/TalentHeader";

const MessageTalents = () => {
  const girl3 = require("../../assets/images/girl3.png");
  const [userList, setUsersList] = useState([]);
  const [selectedUSerImage, setSelectedUSerIMage] = useState("");
  const [currentUserId, setcurrentUserId] = useState(null);
  const [userType, setuserType] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [userMessage, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [currentChat, setCurrentChat] = useState("");
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [apiMessage, setApiMessage] = useState(null);

  const url = window.location.href;
  const clickedUserId = url.split("?")[1];
  console.log(" clickedUserId:", clickedUserId);

  //socket codes
  useEffect(() => {
    const newSocket = io("http://13.234.177.61:4014");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [currentUserId]);

  useEffect(() => {
    // if (socket === null) return;
    if (socket != null) {
      console.log(currentUserId, "currentUserIdSocketCall");
      socket.emit("addNewUser", currentUserId);
      socket.on("getOnlineUsers", (res) => {
        setOnlineUsers(res);
      });
    }
  }, [socket]);

  useEffect(() => {
    setcurrentUserId(localStorage.getItem("currentUser"));
    console.log(currentUserId, "currentUserId");
    if (currentUserId) {
      findPreviousChatUsers();
      findChat();
    }
  }, [currentUserId]);

  useEffect(() => {
    setuserType(localStorage.getItem("currentUserType"));
    console.log(userType, "userType");
    if (userType) {
    }
  }, [userType]);

  useEffect(() => {
    console.log(userList, "userList");
    if (userList && userList?.length > 0) {
      setSelectedUser(userList[0]);
    }
  }, [userList]);

  const createChat = async () => {
    let secondUserId;
    if (clickedUserId) {
      secondUserId = clickedUserId;
    } else {
      secondUserId = selectedUser?._id;
    }
    const formData = {
      firstId: currentUserId ? currentUserId : "",
      secondId: secondUserId,
    };
    await ApiHelper.post(API.createChat, formData)
      .then((resData) => {
        if (resData) {
          console.log(resData, "resData");
          setCurrentChat(resData?.data);
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
          console.log(resData?.data?.data, "findPreviousChatUsers");
          setUsersList(resData.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendMessage = async () => {
    //socket send message
    if (socket != null) {
      let recipientId = selectedUser?._id
        ? selectedUser?._id
        : userList[0]?._id;
      // let recipentId = currentChat?.members?.find(id !== currentUserId);
      let current_chat = currentChat?._id;
      let userImage = selectedUSerImage;
      console.log(
        {
          current_chat: current_chat,
          userMessage: userMessage,
          recipientId: recipientId,
          userImage: selectedUSerImage,
          currentTime: currentTime,
        },
        "SEndMEssagePayload"
      );
      socket.emit("sendMessage", {
        current_chat,
        userMessage,
        recipientId,
        userImage,
        currentTime: currentTime,
      });
    }

    /////socket ends
    const formData = {
      chatId: currentChat?._id,
      senderId: currentUserId,
      userMessage: userMessage,
      userImage: selectedUSerImage,
      currentTime: currentTime,
    };
    await ApiHelper.post(API.createMessage, formData)
      .then((resData) => {
        console.log(resData, "sendMessage");
        if (resData) {
          getMessages();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMessages = async () => {
    console.log(currentChat?._id, "getMessages called");
    await ApiHelper.get(`${API.getMessages}${currentChat?._id}`)
      .then((resData) => {
        console.log(resData?.data, "getMessagesAPiResponse called");
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
        // setApiMessage((prev) => [...prev, res]);
      });
      return () => {
        socket.off("getMessage");
      };
    }
  }, [socket, currentChat]);

  const findChat = async () => {
    let secondUserId;
    if (clickedUserId) {
      secondUserId = clickedUserId;
    } else {
      secondUserId = selectedUser?._id;
    }
    await ApiHelper.get(`${API.findChat}${currentUserId}/${secondUserId}`)
      .then((resData) => {
        if (resData) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(selectedUser, "selectedUser");
    if (selectedUser) {
      if (selectedUser.brandImage && selectedUser.brandImage.length > 0) {
        setSelectedUSerIMage(selectedUser.brandImage[0]?.fileData);
      }
      if (selectedUser?.image && selectedUser?.image?.fileData) {
        setSelectedUSerIMage(selectedUser?.image?.fileData);
      }
    }
  }, [selectedUser]);

  const searchNames = () => {};
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
    console.log(clickedUserId, "clickedUserId");
    if (clickedUserId && currentUserId) {
      createChat();
    }
  }, [clickedUserId, currentUserId]);

  const setCLickedUser = (data) => {
    setSelectedUser(data);
    if (currentUserId && selectedUser?._id) {
      createChat();
    }
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
                  <div>
                    {selectedUSerImage && (
                      <img
                        className="message-user-image"
                        src={`${API.userFilePath}${selectedUSerImage}`}
                        alt=""
                      />
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
                          <div>
                            {selectedUSerImage && (
                              <img
                                className="message-user-image"
                                src={`${API.userFilePath}${selectedUSerImage}`}
                                alt=""
                              />
                            )}
                          </div>
                          <div className="message-user-details">
                            <div className="message-user-name">
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
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "400",
                                  paddingLeft: "10px",
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
                <div className="conversation-left-side">
                  <div className="conversation-left-wrapper">
                    <div>
                      <img
                        className="conversation-left-user-img"
                        src={girl3}
                        alt=""
                      />
                    </div>
                    <div className="conversation-left-message-container">
                      <div className="conversation-message">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Doloribus eveniet quaerat odio, exercitationem,
                        eius expedita quisquam sint optio laboriosam distinctio
                        fugiat, sed error at dolores non impedit eaque dicta
                        beatae.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="conversation-right-side">
                  <div className="conversation-right-wrapper">
                    <div className="conversation-right-message-container">
                      <div className="conversation-message">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Doloribus eveniet quaerat odio, exercitationem,
                        eius expedita quisquam sint optio laboriosam distinctio
                        fugiat, sed error at dolores non impedit eaque dicta
                        beatae.
                      </div>
                    </div>
                    <div>
                      <img
                        className="conversation-right-user-img"
                        src={girl3}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="conversation-input-section">
                <div>
                  <i className="bi bi-paperclip conversation-attachment-icon"></i>
                </div>
                <div className="conversation-input-wrapper">
                  <input
                    type="text"
                    className="form-control conversation-input"
                    placeholder="Search"
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
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
    </>
  );
};

export default MessageTalents;
