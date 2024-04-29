// import { useContext, useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import BrandHeader from "../../brand/pages/BrandHeader";
// import { ApiHelper } from "../../helpers/ApiHelper";
// import { API } from "../../config/api";

// const SocketTalents = () => {
//   const [conversations, setConversations] = useState([]);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const socket = useRef();
//   const user = localStorage.getItem("currentUser");
//   console.log(user, "userMainID");
//   const scrollRef = useRef();
//   const [selectedUSerImage, setSelectedUSerIMage] = useState("");

//   useEffect(() => {
//     socket.current = io("http://13.234.177.61:4014");
//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     arrivalMessage &&
//       currentChat?.members.includes(arrivalMessage.sender) &&
//       setMessages((prev) => [...prev, arrivalMessage]);
//   }, [arrivalMessage, currentChat]);

//   useEffect(() => {
//     let userId = user;
//     socket.current.emit("addUser", userId);
//     socket.current.on("getUsers", (users) => {
//       setOnlineUsers();
//       // users?.followings?.filter((f) => users.some((u) => u.userId === f))
//     });
//   }, [user]);

//   useEffect(() => {
//     const getConversations = async () => {
//       try {
//         const res = await axios.get("/conversations/" + user);
//         setConversations(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getConversations();
//   }, [user]);

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const res = await axios.get("/messages/" + currentChat?._id);
//         setMessages(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getMessages();
//   }, [currentChat]);

//   const sendMessage = async (e) => {
//     // e.preventDefault();
//     // const message = {
//     //   sender: user,
//     //   text: newMessage,
//     //   conversationId: currentChat._id,
//     // };

//     // const receiverId = currentChat.members.find((member) => member !== user);

//     socket.current.emit("sendMessage", {
//       senderId: user,
//       receiverId: selectedUser?._id,
//       text: userMessage,
//     });

//     const formData = {
//       senderId: user,
//       receiverId: selectedUser?._id,
//       text: userMessage,
//     };
//     await ApiHelper.post(API.addMessage, formData)
//       .then((resData) => {
//         if (resData) {
//           // setUsersList(resData.data.data);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     // try {
//     //   const res = await axios.post("/messages", message);
//     //   setMessages([...messages, res.data]);
//     //   setNewMessage("");
//     // } catch (err) {
//     //   console.log(err);
//     // }
//   };

//   useEffect(() => {
//     listBrandsForChat();
//   }, [user]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const [showSidebar, setShowSidebar] = useState(true);
//   const girl3 = require("../../assets/images/girl3.png");
//   const [userMessage, setMessage] = useState("");
//   const [userList, setUsersList] = useState([]);
//   const [selectedUser, setSelectedUser] = useState("");
//   const [conversationID, setConversationID] = useState("");

//   const listBrandsForChat = async () => {
//     const formData = {
//       brandId: user,
//     };
//     await ApiHelper.post(API.listBrandsForChat, formData)
//       .then((resData) => {
//         if (resData) {
//           setUsersList(resData.data.data);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const addConversation = async (id) => {
//     const formData = {
//       senderId: user,
//       receiverId: id,
//     };
//     await ApiHelper.post(API.addConversation, formData)
//       .then((resData) => {
//         if (resData) {
//           console.log(resData, "resDataCOnversation");
//           console.log(resData?.data?._id, "resDataCOnversation");
//           setConversationID(resData?.data?._id);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   //   const sendMessage = async () => {
//   //     const formData = {
//   //       conversationId: conversationID,
//   //       senderId: user,
//   //       message: userMessage,
//   //       userss: conversationID,
//   //     };
//   //     await ApiHelper.post(API.addMessage, formData)
//   //       .then((resData) => {
//   //         if (resData) {
//   //           // setUsersList(resData.data.data);
//   //         }
//   //       })
//   //       .catch((err) => {
//   //         console.log(err);
//   //       });
//   //   };

//   const listByConversationId = async () => {
//     const formData = {
//       conversationId: conversationID,
//     };
//     await ApiHelper.post(API.listByConversationId, formData)
//       .then((resData) => {
//         if (resData) {
//           // setUsersList(resData.data.data);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     console.log(conversationID, "conversationID");
//     if (conversationID) {
//       listByConversationId();
//     }
//   }, [conversationID]);

//   useEffect(() => {
//     console.log(userList, "userList");
//     if (userList && userList?.length > 0) {
//       setSelectedUser(userList[0]);
//       addConversation(userList[0]?._id);
//     }
//   }, [userList]);

//   const setCLickedUser = (data) => {
//     setSelectedUser(data);
//     addConversation(data?._id);
//   };

//   useEffect(() => {
//     if (selectedUser) {
//       if (selectedUser.brandImage && selectedUser.brandImage.length > 0) {
//         console.log(selectedUser, "selectedUser");
//         setSelectedUSerIMage(selectedUser.brandImage[0]?.fileData);
//       }
//     }
//   }, [selectedUser]);

//   const searchNames = () => {};

//   return (
//     <>
//       <BrandHeader />
//       <div className="message-main">
//         <div className="messages-section">
//           <div className="message-header">
//             <div className="message-header-main">
//               <div className="message-search">
//                 <div className="mb-0">
//                   <div className="form-group has-search">
//                     <span className="fa fa-search form-control-feedback "></span>
//                     <input
//                       type="text"
//                       className="form-control adult-signup-inputs"
//                       placeholder="Search"
//                       onChange={(e) => {
//                         searchNames(e.target.value);
//                       }}
//                     ></input>
//                   </div>
//                 </div>
//               </div>
//               <div className="message-user-wrapper">
//                 <div className="message-userdetails-wrapper">
//                   <div>
//                     <img
//                       className="message-user-image"
//                       src={`${API.userFilePath}${selectedUSerImage}`}
//                       alt=""
//                     />
//                   </div>
//                   <div className="message-user-details">
//                     <div className="message-user-name">
//                       {`${selectedUser?.brandName}`}
//                     </div>
//                     <div className="message-user-time">Just Now</div>
//                   </div>
//                 </div>
//                 <div className="message-more">More</div>
//               </div>
//             </div>
//           </div>
//           <div className="message-container-wrapper">
//             <div className="message-sidebar">
//               <div className="message-leftmenu-main">
//                 <div className="message-list-wrapper">
//                   {userList &&
//                     userList.map((item, index) => (
//                       <>
//                         <div
//                           className={
//                             item?._id == selectedUser?._id
//                               ? "message-userdetails-menu-wrapper-selected"
//                               : "message-userdetails-menu-wrapper"
//                           }
//                           onClick={() => setCLickedUser(item)}
//                           key={index}
//                         >
//                           <div>
//                             <img
//                               className="message-user-menu-image"
//                               src={`${API.userFilePath}${item?.brandImage[0]?.fileData}`}
//                               alt=""
//                             />
//                           </div>
//                           <div className="message-user-details">
//                             <div className="message-user-name">
//                               {`${item?.brandName}`}
//                               <span
//                                 style={{
//                                   fontSize: "12px",
//                                   fontWeight: "400",
//                                   paddingLeft: "10px",
//                                 }}
//                               >
//                                 Send a message
//                               </span>
//                             </div>
//                             <div className="message-user-time">Just Now</div>
//                           </div>
//                         </div>
//                       </>
//                     ))}
//                 </div>
//               </div>
//             </div>
//             <div className="conversation-section">
//               <div className="conversation-main">
//                 <div className="conversation-left-side">
//                   <div className="conversation-left-wrapper">
//                     <div>
//                       <img
//                         className="conversation-left-user-img"
//                         src={girl3}
//                         alt=""
//                       />
//                     </div>
//                     <div className="conversation-left-message-container">
//                       <div className="conversation-message">
//                         Lorem, ipsum dolor sit amet consectetur adipisicing
//                         elit. Doloribus eveniet quaerat odio, exercitationem,
//                         eius expedita quisquam sint optio laboriosam distinctio
//                         fugiat, sed error at dolores non impedit eaque dicta
//                         beatae.
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="conversation-right-side">
//                   <div className="conversation-right-wrapper">
//                     <div className="conversation-right-message-container">
//                       <div className="conversation-message">
//                         Lorem, ipsum dolor sit amet consectetur adipisicing
//                         elit. Doloribus eveniet quaerat odio, exercitationem,
//                         eius expedita quisquam sint optio laboriosam distinctio
//                         fugiat, sed error at dolores non impedit eaque dicta
//                         beatae.
//                       </div>
//                     </div>
//                     <div>
//                       <img
//                         className="conversation-right-user-img"
//                         src={girl3}
//                         alt=""
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="conversation-input-section">
//                 <div>
//                   <i className="bi bi-paperclip conversation-attachment-icon"></i>
//                 </div>
//                 <div className="conversation-input-wrapper">
//                   <input
//                     type="text"
//                     className="form-control conversation-input"
//                     placeholder="Search"
//                     onChange={(e) => {
//                       setMessage(e.target.value);
//                     }}
//                   ></input>
//                 </div>
//                 <div>
//                   <div className="conversation-send">
//                     <i className="bi bi-send conversation-send-icon"></i>
//                     <div
//                       onClick={() => sendMessage()}
//                       className="conversation-send-text"
//                     >
//                       Send
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SocketTalents;
