"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Mic, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.css";
import axios from "axios";
// import { headers } from "next/headers";
// import chatData from "../../../chatboat.data.json";
interface CHATS {
  id: string;
  msg: string;
  date: Date;
}
function ChatBoat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionId, setSessionId] = useState("");
  // const [responseText, setResponseText] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const crChatRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [userMsgs, setUserMsgs] = useState<CHATS[]>([]);

  useGSAP(() => {
    if (isOpen) {
      // Animate backdrop
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );

      // Animate chat interface
      gsap.fromTo(
        chatRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );

      if (messageRef.current) {
        gsap.fromTo(
          messageRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, delay: 0.3 }
        );
      }
    } else {
      // Animate backdrop out
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (backdropRef.current) {
            backdropRef.current.style.display = "none";
          }
        },
      });

      // Animate boat icon
      gsap.to(boatRef.current, {
        rotate: 360,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  const toggleChat = async () => {
    const res = await axios.get(
      "https://ritz-ai-production.up.railway.app/api/v1/session/create",
      {
        headers: {
          "X-API-KEY":
            "26f8eb961b3d0b30a20b838cad928389aa38397695d78aa3f89f936903f42bce",
        },
      }
    );
    console.log(res);
    setSessionId(res.data.session_id);
    setIsOpen(!isOpen);
    if (backdropRef.current && !isOpen) {
      backdropRef.current.style.display = "block";
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You would typically send this data to your backend
  };

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // const handleChatting = () => {};
  // console.log(messageRef.current.children.length);
  const [resLoader, setResLoader] = useState(false);

  const sendMessageToApi = async () => {
    try {
      if (message.split("").length <= 1) {
        return;
      }
      const data = {
        session_id: sessionId,
        user_input: message,
      };
      setResLoader(true);
      setMessage("");
      setUserMsgs((pr) => [
        ...pr,
        {
          id: "user",
          msg: message,
          date: new Date(),
        },
      ]);

      const res = await axios.post(
        "https://ritz-ai-production.up.railway.app/api/v1/chat/",
        data,
        {
          headers: {
            "X-API-KEY":
              "26f8eb961b3d0b30a20b838cad928389aa38397695d78aa3f89f936903f42bce",
          },
        }
      );

      if (res.data.response) {
        setResLoader(false);
        setUserMsgs((pr) => [
          ...pr,
          {
            id: "boat",
            msg: res.data.response,
            date: new Date(),
          },
        ]);
      }
      crChatRef.current?.scrollIntoView({ behavior: "smooth" });
      // setResponseText(res.data.response);
    } catch (error) {
      console.log(error);
      setResLoader(false);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        sendMessageToApi();
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [message]); // add dependencies if needed
  return (
    <>
      {/* Full-screen blur backdrop */}
      <div
        ref={backdropRef}
        className={styles.backdrop}
        style={{ display: isOpen ? "block" : "none" }}
      />

      <div className={styles.chatContainer} ref={containerRef}>
        {/* Chat Boat Trigger */}
        <div ref={boatRef} onClick={toggleChat} className={styles.chatBoat}>
          {isOpen ? (
            <X className={styles.boatIcon} />
          ) : (
            <img
              src="/chrl.webp"
              alt="Chat Icon"
              className={styles.boatGifIcon}
            />
          )}
        </div>

        {/* Chat Interface */}
        {isOpen && (
          <div ref={chatRef} className={styles.chatInterface}>
            {/* Split Container */}
            <div className={styles.splitContainer}>
              {/* Left Panel - User Form */}
              {formOpen && <div className={styles.formPanel}>
                <div className={styles.formHeader}>
                  <h3 className={styles.formTitle}>Contact Information</h3>
                  <p className={styles.formSubtitle}>
                    Fill out the form to start chatting
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className={styles.userForm}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className={styles.formInput}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.formLabel}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className={styles.formInput}
                    />
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    Submit
                  </button>
                </form>
                <div className={styles.userInfo}>
                  <div className={styles.userInfoTitle}>Your Details:</div>
                  <div className={styles.userInfoItem}>
                    <span className={styles.userInfoLabel}>Name:</span>{" "}
                    {formData.name || "-"}
                  </div>
                  <div className={styles.userInfoItem}>
                    <span className={styles.userInfoLabel}>Email:</span>{" "}
                    {formData.email || "-"}
                  </div>
                  <div className={styles.userInfoItem}>
                    <span className={styles.userInfoLabel}>Phone:</span>{" "}
                    {formData.phone || "-"}
                  </div>
                </div>
              </div>}

              {/* Right Panel - Chat Interface */}
              <div className={styles.chatPanel} style={{width:formOpen ? '70%' : '100%'}}>
                {/* Header */}
                <div className={styles.chatHeader}>
                  <X
                    className={styles.cncl}
                    onClick={() => setIsOpen((pr) => !pr)}
                  />
                  <div className={styles.headerContent}>
                    <div className={styles.avatar}>
                      <img
                        src="/chrl.webp"
                        alt="Chat Avatar"
                        className={styles.avatarGif}
                      />
                    </div>
                    <div>
                      <h3 className={styles.headerTitle}>
                        Ritz Media Assistant
                      </h3>
                      <p className={styles.headerStatus}>
                        <span className={styles.statusIndicator}></span> Online
                        now
                      </p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div ref={messageRef} className={styles.messagesContainer}>
                  {/* Welcome Message */}

                  <div className={styles.greetingMessage}>
                    <p className={styles.messageText}>
                      Welcome to{" "}
                      <span className={styles.highlight}>Ritz Media</span>! We
                      are a full-service digital agency specializing in web &
                      app development, digital advertising, and influencer
                      marketing. How can we help you today?
                    </p>
                    <div className={styles.messageTime}>10:42 AM</div>
                  </div>
                  {userMsgs.length > 0 &&
                    userMsgs.map((tk, idx) => {
                      const isUser = tk.id === "user";
                      // const isBoat = tk.id === "boat";

                      return (
                        <div
                          key={idx}
                          className={`${styles.message} ${
                            isUser ? styles.messageRight : styles.messageLeft
                          }`}
                        >
                          {!isUser && (
                            <div className={styles.messageAvatar}>
                              <img
                                src="/chrl.webp"
                                alt="Bot Avatar"
                                className={styles.avatarGifSmall}
                              />
                            </div>
                          )}
                          <div
                            ref={crChatRef}
                            className={`${styles.messageBubble} ${
                              isUser ? styles.bubbleRight : styles.bubbleLeft
                            }`}
                          >
                            <p className={styles.messageText}>{tk.msg}</p>
                            <div
                              className={`${styles.messageTime} ${
                                isUser ? styles.timeRight : styles.timeLeft
                              }`}
                            >
                              {tk.date.toDateString()}
                            </div>
                          </div>
                          {isUser && (
                            <div className={styles.messageAvatar}>
                              <img
                                src="/userCh.webp"
                                alt="Bot Avatar"
                                className={styles.avatarGifSmall}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  {resLoader && (
                    <div className={styles.chatBubble}>
                      <div className={styles.loadingDots}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className={styles.inputArea}>
                  <div className={styles.attachmentButtons}>
                    <button className={styles.qrBtn} onClick={()=>setFormOpen((pr)=>!pr)}>Quick Response</button>
                  </div>
                  <div className={styles.messageInputContainer}>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className={styles.messageInput}
                      // rows={1}
                    />
                    <div className={styles.sendButtonContainer}>
                      {message ? (
                        <button
                          type="button"
                          className={styles.sendButton}
                          onClick={() => sendMessageToApi()}
                        >
                          <Send className={styles.sendIcon} />
                        </button>
                      ) : (
                        <button type="button" className={styles.micButton}>
                          <Mic className={styles.micIcon} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChatBoat;
