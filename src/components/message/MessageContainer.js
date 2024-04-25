import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/messages.scss";
import { ApiHelper } from "../../helpers/ApiHelper";
import { API } from "../../config/api";
import PopUp from "../PopUp";
import { NavLink } from "react-router-dom";
import BrandHeader from "../../brand/pages/BrandHeader";
import { io } from "socket.io-client";

const MessageContainer = () => {
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [socket_Id, setSocketId] = useState(null);
  const [brandId, setBrandId] = useState(null);

  useEffect(() => {
    setBrandId(localStorage.getItem("brandId"));
    console.log(brandId, "brandId");
    if (brandId) {
      listTalentsForChat();
    }
  }, [brandId]);

  useEffect(() => {
    socket.current = io("http://13.234.177.61:4014");
    socket.current.on("connect", () => {
      alert(socket.current.id, "dfdf");
      setSocketId(socket.current.id);
      let socketId = socket.current.id;
      let userId = localStorage.getItem("brandId");
      console.log(userId, socketId, "addUser");
      socket.current.emit("addUser", userId, socketId);
      console.log(socket_Id, "socketId");
    });
  }, []);

  const [newSectionID, setNewSectionID] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const girl3 = require("../../assets/images/girl3.png");
  const girl4 = require("../../assets/images/girl14.png");
  const [userMessage, setMessage] = useState("");
  const searchNames = () => {};
  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };

  const [userList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [conversationID, setConversationID] = useState("");

  const listTalentsForChat = async () => {
    const formData = {
      brandId: brandId,
    };
    await ApiHelper.post(API.listTalentsForChat, formData)
      .then((resData) => {
        if (resData) {
          setUsersList(resData.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addConversation = async (id) => {
    const formData = {
      senderId: brandId,
      receiverId: id,
    };
    await ApiHelper.post(API.addConversation, formData)
      .then((resData) => {
        if (resData) {
          console.log(resData.data.conversation._id, "resDataCOnversation");
          setConversationID(resData?.data?.conversation?._id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    socket.current.on("getUsers", (users) => {
      console.log("Userssocket", users);
    });
  }, [socket]);

  useEffect(() => {
    if (socket.current) {
      console.log("getMessage");
      socket.current.on("getMessage", (data) => {
        console.log(data, "getMessagesocket");
      });
    }
  }, [socket]);

  const sendMessage = async () => {
    // const formData = {
    //   conversationId: conversationID,
    //   senderId: brandId,
    //   message: userMessage,
    //   userss: conversationID,
    // };
    socket.current.emit("sendMessage", {
      senderId: brandId,
      conversationId: conversationID,
      text: userMessage,
      userss: conversationID,
    });

    // await ApiHelper.post(API.addMessage, formData)
    //   .then((resData) => {
    //     if (resData) {
    //       // setUsersList(resData.data.data);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const listByConversationId = async () => {
    const formData = {
      conversationId: conversationID,
    };
    await ApiHelper.post(API.listByConversationId, formData)
      .then((resData) => {
        if (resData) {
          // setUsersList(resData.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(conversationID, "conversationID");
    if (conversationID) {
      listByConversationId();
    }
  }, [conversationID]);

  useEffect(() => {
    console.log(userList, "userList");
    if (userList && userList?.length > 0) {
      setSelectedUser(userList[0]);
      addConversation(userList[0]?._id);
    }
  }, [userList]);

  const setCLickedUser = (data) => {
    setSelectedUser(data);
    addConversation(data?._id);
  };

  return (
    <>
      <BrandHeader toggleMenu={toggleMenu} />
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
                    <img
                      className="message-user-image"
                      src={`${API.userFilePath}${selectedUser?.image?.fileData}`}
                      alt=""
                    />
                  </div>
                  <div className="message-user-details">
                    <div className="message-user-name">
                      {" "}
                      {`${selectedUser?.preferredChildFirstname}${selectedUser?.preferredChildLastName}`}
                    </div>
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
                    userList.map((item, index) => (
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
                            <img
                              className="message-user-menu-image"
                              src={`${API.userFilePath}${item?.image?.fileData}`}
                              alt=""
                            />
                          </div>
                          <div className="message-user-details">
                            <div className="message-user-name">
                              {`${item?.preferredChildFirstname}${item?.preferredChildLastName}`}
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

export default MessageContainer;
