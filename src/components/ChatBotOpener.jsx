import React, { useState, useRef, useEffect } from 'react';
import styles from './ChatBotOpener.module.css';
import { TbMessageChatbotFilled } from "react-icons/tb";
import ChatBot from './ChatBot';

const ChatBotOpener = () => {
    const [chatBotVisible, setChatBotVisible] = useState(false);
    const chatBotRef = useRef(null);
    const chatBotIconRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatBotVisible &&
                chatBotRef.current &&
                !chatBotRef.current.contains(event.target) &&
                !chatBotIconRef.current.contains(event.target)) {
                setChatBotVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [chatBotVisible]);

    return (
        <div className={styles.chatBotOpener}>
            {chatBotVisible && (
                <div ref={chatBotRef}>
                    <ChatBot />
                </div>
            )}
            <div ref={chatBotIconRef}>
                <TbMessageChatbotFilled
                    className={styles.chatBotIcon}
                    onClick={() => setChatBotVisible(!chatBotVisible)}
                    style={chatBotVisible ? { color: "#004AAD" } : {}}
                />
            </div>
        </div>
    );
};

export default ChatBotOpener