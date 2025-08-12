"use client";

import React, { useState, useRef } from "react";
import { Send, Mic, X, ImageIcon, Paperclip } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./page.module.css";

function ChatBoat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(
        chatRef.current,
        { scale: 0.5, opacity: 0, y: 100 },
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
      gsap.to(boatRef.current, {
        rotate: 360,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.chatContainer}>
      {/* Chat Boat Trigger */}
      <div
        ref={boatRef}
        onClick={toggleChat}
        className={styles.chatBoat}
      >
        {isOpen ? (
          <X className={styles.boatIcon} />
        ) : (
          <img 
            src="/chatbticon3.gif" 
            alt="Chat Icon" 
            className={styles.boatGifIcon}
          />
        )}
      </div>

      {/* Chat Interface */}
      {isOpen && (
        <div
          ref={chatRef}
          className={styles.chatInterface}
        >
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerContent}>
              <div className={styles.avatar}>
                <img 
                  src="/chatbticon3.gif" 
                  alt="Chat Avatar" 
                  className={styles.avatarGif}
                />
              </div>
              <div>
                <h3 className={styles.headerTitle}>Ritz Media Assistant</h3>
                <p className={styles.headerStatus}>We are online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messageRef}
            className={styles.messagesContainer}
          >
            {/* Welcome Message */}
            <div className={styles.message}>
              <div className={styles.messageAvatar}>
                <img 
                  src="/chatbticon3.gif" 
                  alt="Bot Avatar" 
                  className={styles.avatarGifSmall}
                />
              </div>
              <div className={styles.messageBubble}>
                <p className={styles.messageText}>
                  Welcome to <span className={styles.highlight}>Ritz Media</span>!
                  We are a full-service digital agency specializing in web & app
                  development, digital advertising, and influencer marketing.
                  How can we help you today?
                </p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className={styles.inputArea}>
            <div className={styles.attachmentButtons}>
              <button className={styles.attachmentButton}>
                <ImageIcon className={styles.buttonIcon} />
              </button>
              <button className={styles.attachmentButton}>
                <Paperclip className={styles.buttonIcon} />
              </button>
            </div>
            <div className={styles.messageInputContainer}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className={styles.messageInput}
              />
              <div className={styles.sendButtonContainer}>
                {message ? (
                  <button className={styles.sendButton}>
                    <Send className={styles.sendIcon} />
                  </button>
                ) : (
                  <button className={styles.micButton}>
                    <Mic className={styles.micIcon} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBoat;