import React, { useState } from "react";
import "./Banner.css";
interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to Toly!!! ^^",
      isUser: false,
      timestamp: "9:00 AM, Today",
    },
    {
      id: 2,
      text: "Oh hi Toly ^^",
      isUser: true,
      timestamp: "9:05 AM, Today",
    },
    {
      id: 3,
      text: "Ok, let talk?",
      isUser: false,
      timestamp: "9:07 AM, Today",
    },
    {
      id: 4,
      text: "Oteeeeeeeeeee",
      isUser: true,
      timestamp: "9:10 AM, Today",
    },
  ]);
  console.log(setMessages);

  const renderMessages = () => {
    return messages.map((message) => (
      <div
        key={message.id}
        className={`message ${
          message.isUser ? "user-message" : "other-message"
        }`}
      >
        <div className="message-content">
          {message.text}
          <div className="timestamp">{message.timestamp}</div>
        </div>
      </div>
    ));
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat</div>
      <div className="chat-messages">{renderMessages()}</div>
    </div>
  );
};

export default Chat;
