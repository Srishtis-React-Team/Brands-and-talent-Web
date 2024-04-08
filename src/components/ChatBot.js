import React, { useState, useEffect, useRef } from "react";
import "../assets/css/chatbot.css";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "../config/api";
import PopUp from "../components/PopUp";
import { NavLink } from "react-router-dom";

const ChatBot = () => {
  const chatIcon = require("../assets/icons/chat-icon.png");
  const smallChat = require("../assets/icons/smallChat.png");
  const closeIcon = require("../assets/icons/close-icon.png");
  const [inputHeight, setInputHeight] = useState(0);
  const [newSectionID, setNewSectionID] = useState(null);

  const generateSessionId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 20; // You can adjust the length of the session ID as needed
    let sessionId = "";
    for (let i = 0; i < length; i++) {
      sessionId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return sessionId;
  };

  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: {
        botResponse: "Hi! welcome to brands and talents",
      },
    },
  ]);

  const chatInputRef = useRef(null);

  useEffect(() => {
    console.log(newSectionID, "newSectionID");
    if (newSectionID === null) {
      setNewSectionID(generateSessionId());
    }
  }, [newSectionID]);
  useEffect(() => {
    setInputHeight(chatInputRef.current.scrollHeight);
  }, []);

  useEffect(() => {
    console.log(messages, "messages");
  }, [messages]);

  const handleSend = async (e) => {
    const message = chatInputRef.current.value.trim();
    if (!message) return;
    chatInputRef.current.value = "";

    if (newSectionID != null) {
      let formData = {
        message: message,
        sessionId: newSectionID,
      };
      await ApiHelper.post(API.chatbot, formData)
        .then((resData) => {
          console.log(resData, "resData");
          if (resData) {
            console.log(resData.data.message, "message");
            setMessages([...messages, { role: "bot", content: resData.data }]);
            var elem = document.getElementById("message-box");
            elem.scrollTop = elem.scrollHeight;
          }
        })
        .catch((err) => {
          setMessages([
            ...messages,
            {
              role: "bot",
              content: "Oops! Something went wrong. Please try again.",
            },
          ]);
        });
    }
  };

  // const fetchResponse = (message) => {
  //   // You need to replace "PASTE-YOUR-API-KEY" with your actual API key
  //   const API_KEY = "PASTE-YOUR-API-KEY";
  //   const API_URL = "https://api.openai.com/v1/chat/completions";

  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${API_KEY}`,
  //     },
  //     body: JSON.stringify({
  //       model: "gpt-3.5-turbo",
  //       messages: [{ role: "user", content: message }],
  //     }),
  //   };
  //   fetch(API_URL, requestOptions)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMessages([
  //         ...messages,
  //         { role: "bot", content: data.choices[0].message.content.trim() },
  //       ]);
  //     })
  //     .catch(() => {
  //       setMessages([
  //         ...messages,
  //         {
  //           role: "bot",
  //           content: "Oops! Something went wrong. Please try again.",
  //         },
  //       ]);
  //     });
  // };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent default behavior (creating a new line)
      handleSend(); // Trigger the handleSend function
    }
  };

  return (
    <>
      <button
        className="chatbot-toggler"
        onClick={() => document.body.classList.toggle("show-chatbot")}
      >
        <span className="material-symbols-rounded">
          <img src={chatIcon} alt="" />
        </span>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className="chatbot">
        <div className="chatbox-header">
          <div className="chat-dropdown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
            </svg>
          </div>
          <div className="chatbot-title">Chat With Us! </div>
          <div
            className="close-icon"
            onClick={() => document.body.classList.remove("show-chatbot")}
          >
            <img src={closeIcon} alt="" />
          </div>
        </div>
        <div className="chatbox-sub-header">
          <div className="active-chat">
            <div className="active-chat-wrapper">
              <img src={smallChat} alt="" />
            </div>
            <div className="green-dot"></div>
          </div>
          <div className="chatbot-subtitle-section">
            <div className="chatbot-subtitle">ChatBot</div>
            <div className="chatbot-support">Support Agent</div>
          </div>
        </div>
        <ul className="chatbox" id="message-box">
          {messages.map((message, index) => (
            <div key={index}>
              {message?.content?.userMsg && (
                <div className="sender-message-section">
                  <div className="sender-message-wrapper">
                    {message?.content?.userMsg}
                  </div>
                </div>
              )}

              <div
                className={`chat ${
                  message.role === "bot" ? "incoming" : "outgoing"
                }`}
              >
                {message.role === "bot" ? (
                  <>
                    <span className="small-bot-wrapper">
                      <img className="small-chat-icon" src={smallChat} alt="" />
                    </span>
                    <div className="reciever-section">
                      <div className="live-chat">
                        Live Chat {message?.content?.time}
                      </div>
                      <div
                        className="response-message"
                        dangerouslySetInnerHTML={{
                          __html: message?.content?.botResponse,
                        }}
                      ></div>
                    </div>
                  </>
                ) : (
                  <p>{message?.content?.botResponse}</p>
                )}
              </div>
            </div>
          ))}
        </ul>
        <div className="chat-input">
          <textarea
            ref={chatInputRef}
            style={{ height: inputHeight }}
            placeholder="Enter a message..."
            spellCheck="false"
            required
            onKeyPress={handleKeyPress}
          ></textarea>
          <span
            id="send-btn"
            className="material-symbols-rounded"
            onClick={handleSend}
          >
            send
          </span>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
