import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import moment from "moment";
import { Avatar, Box, Tooltip } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import { Image } from "antd";
import Linkify from "linkify-react";

const Messages = ({ messages }) => {
  const { user } = ChatState();
  let lastSender = "";

  return (
    <ScrollableFeed>
      {messages.map((message: any, index: any) => {
        const showAvatar = lastSender !== message.sender._id;
        lastSender = message.sender._id;

        const isCurrentUser = message.sender._id === user._id;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: isCurrentUser ? "row-reverse" : "row",
              alignItems: "flex-start",
            }}
          >
            {!isCurrentUser && showAvatar && (
              <Tooltip label={message.sender.name} placement="left">
                <Avatar
                  style={{ marginTop: "50px" }}
                  src={message.sender.pic}
                />
              </Tooltip>
            )}
            <div
              style={{
                marginTop: isCurrentUser ? 3 : showAvatar ? 32 : 3,
                marginLeft: isCurrentUser ? 0 : showAvatar ? 10 : 58,
                marginRight: isCurrentUser ? 10 : 0,
              }}
            >
              {!isCurrentUser && showAvatar && (
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "gray",
                    marginLeft: "5px",
                  }}
                >
                  {message.sender.name}
                </div>
              )}
              <Tooltip
                label={moment(message.createdAt).format("MMMM Do YYYY, h:mm a")}
                placement={isCurrentUser ? "left" : "right"}
              >
                <Box
                  style={{
                    backgroundColor: message.file
                      ? "none"
                      : isCurrentUser
                      ? "#243666"
                      : "#bfefef",
                    color: isCurrentUser ? "#fff" : "#243666",
                    padding: message.file ? 0 : 10,
                    borderRadius: 10,
                    maxWidth: "600px",
                    wordBreak: "break-word",
                  }}
                >
                  {message.file ? (
                    <Image
                      src={message.content}
                      alt="uploaded file"
                      style={{
                        maxHeight: "300px",
                        maxWidth: "300px",
                        borderRadius: "20px",
                      }}
                    />
                  ) : (
                    <Linkify>{message.content}</Linkify>
                  )}
                </Box>
              </Tooltip>
            </div>
          </div>
        );
      })}
    </ScrollableFeed>
  );
};

export default Messages;
