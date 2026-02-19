"use client";
import React, { useState, useRef, useEffect, useContext } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';
import { RubyContext } from '@/ruby-context/ruby.context';

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
    isFirstInSequence?: boolean;
}

interface QuickReply {
    id: string;
    text: string;
}

function RubyBot() {
    const context = useContext(RubyContext);
    if (!context) {
        throw new Error('RubyBot must be used within RubyProvider');
    }
    const { isRubyOpen, setIsRubyOpen } = context;
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello 👋 I'm Ruby.\nWelcome to Ritz Media World.\n\nIf you're exploring our services, campaigns, or capabilities,\nI'm here to help you 😊",
            sender: 'bot',
            timestamp: new Date(),
            isFirstInSequence: true,
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [quickReplies] = useState<QuickReply[]>([
        { id: '1', text: 'Get Started' },
        { id: '2', text: 'Learn More' },
        { id: '3', text: 'Contact Sales' },
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playNotificationSound = () => {
        try {
            if (audioRef.current) {
                audioRef.current.currentTime = 0; // Reset to start
                audioRef.current.play().catch((error) => {
                    console.log('Audio play failed:', error);
                });
            } else {
                // Create audio element if it doesn't exist
                const audio = new Audio('/msg-receive.mp3');
                audioRef.current = audio;
                audio.play().catch((error) => {
                    console.log('Audio play failed:', error);
                });
            }
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const handleSendMessage = (text?: string) => {
        const messageText = text || inputValue.trim();
        if (!messageText) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: messageText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue('');

        // Show typing indicator
        setTimeout(() => {
            setIsTyping(true);

            // Call API to get bot response
            axios.post('https://rmw-chatbot-5jm3.onrender.com/v1/chat', {
                message: messageText,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then((response) => {
                    // After API response, display the message
                    setTimeout(() => {
                        const botResponse: Message = {
                            id: Date.now().toString(),
                            text: response.data.answer || "I'm sorry, I couldn't process that. Please try again.",
                            sender: 'bot',
                            timestamp: new Date(),
                        };
                        setMessages((prev) => [...prev, botResponse]);
                        setIsTyping(false);
                        // Play notification sound when bot replies
                        playNotificationSound();
                    }, 500); // Small delay after API response
                })
                .catch((error) => {
                    console.error('Error fetching bot response:', error);
                    // Show error message if API fails
                    setTimeout(() => {
                        const botResponse: Message = {
                            id: Date.now().toString(),
                            text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
                            sender: 'bot',
                            timestamp: new Date(),
                        };
                        setMessages((prev) => [...prev, botResponse]);
                        setIsTyping(false);
                    }, 500);
                });
        }, 500);
    };

    const handleQuickReply = (reply: QuickReply) => {
        handleSendMessage(reply.text);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        isRubyOpen && (
            <div className="fixed bottom-4 right-16 z-50 flex flex-col">
                <div className="w-[400px] max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl flex flex-col h-[600px] max-h-[calc(100vh-8rem)]">
                    {/* Header */}
                    <div className="bg-[#bc8429] px-4 py-3 rounded-t-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 border-2 border-[#001697] bg-white rounded-full flex items-center justify-center">
                                    <img src="/ruby-logo2.png" alt="RubyBot" className="w-[100%] h-[100%] object-cover" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#19d408]"></div>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-white font-semibold text-sm leading-tight">Ruby</h2>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xs text-white/90">Online Now</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">

                            <button onClick={() => setIsRubyOpen(false)} className="text-white/90 cursor-pointer hover:text-white transition-all duration-300 ease-in-out hover:rotate-[360deg] p-1">
                                <IoMdClose className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Message Area */}
                    <div className="flex-1 overflow-y-auto bg-white px-4 py-4 space-y-3">
                        {messages.map((message, index) => {
                            const isFirstInSequence =
                                index === 0 ||
                                messages[index - 1].sender !== message.sender ||
                                message.isFirstInSequence;

                            if (message.sender === 'bot') {
                                return (
                                    <div key={message.id} className="flex items-start gap-2">
                                        {isFirstInSequence && (
                                            <div className="w-6 h-6 border border-[#001697] bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden">
                                                <img src="/ruby-logo2.png" alt="Ruby" className="w-full h-full object-cover rounded-full" />
                                            </div>
                                        )}
                                        {!isFirstInSequence && <div className="w-6"></div>}
                                        <div className="flex flex-col gap-1 max-w-[75%]">
                                            <div
                                                className="bg-[#f3f4f6] text-[#1f2937] px-4 py-2.5 rounded-3xl rounded-bl-md text-sm leading-relaxed whitespace-pre-line"
                                            >
                                                {message.text}
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={message.id} className="flex justify-end">
                                        <div className="flex flex-col gap-1 max-w-[75%]">
                                            <div className="bg-[#001697] text-white px-4 py-2.5 rounded-3xl rounded-br-md text-sm leading-relaxed whitespace-pre-line">
                                                {message.text}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex items-start gap-2">
                                <div className="w-6 h-6 border border-[#001697] bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden">
                                    <img src="/ruby-logo2.png" alt="Ruby" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <div className="flex flex-col gap-1 max-w-[75%]">
                                    <div className="bg-[#f3f4f6] text-[#1f2937] px-4 py-2.5 rounded-3xl rounded-bl-md text-sm leading-relaxed">
                                        <div className="flex gap-1.5 items-center py-1">
                                            <span className="w-2 h-2 bg-[#6b7280] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-[#6b7280] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-[#6b7280] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Reply Buttons */}
                    {messages.length === 1 && (
                        <div className="px-4 pb-3">
                            <div className="flex flex-wrap gap-2">
                                {quickReplies.map((reply) => (
                                    <button
                                        key={reply.id}
                                        onClick={() => handleQuickReply(reply)}
                                        className="px-4 py-2 border border-[#001697] text-[#001697] rounded-full text-xs font-medium hover:bg-[#001697] hover:text-white transition-colors cursor-pointer"
                                    >
                                        {reply.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="border-t border-gray-200 bg-white rounded-b-xl">
                        <div className="px-4 py-3">
                            <div className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Reply to Ruby..."
                                    className="flex-1 text-sm text-[#1f2937] placeholder:text-[#6b7280] outline-none bg-transparent"
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    type="button"
                                    className="text-[#001697] hover:text-[#001697] transition-colors p-1"
                                    style={{ cursor: 'pointer' }}
                                >
                                    <FiSend className="w-5 h-5" style={{ cursor: 'pointer' }} />
                                </button>
                            </div>
                        </div>
                        <div className="px-4 pb-2">
                            <p className="text-[10px] text-[#6b7280] text-right">
                                We're ⚡ by Ritz Media World
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default RubyBot;