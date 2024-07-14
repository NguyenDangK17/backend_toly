import { createContext, useContext, useState } from "react";

export const ChatContext = createContext();

export const ChatState = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
