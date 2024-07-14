import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Avatar, IconButton } from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import React from "react";
import moment from "moment";
import SideDrawer from "./miscellaneous/SideDrawer";
import "./styles.css";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const [isSearchMode, setIsSearchMode] = useState(false);

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setLoggedUser(JSON.parse(userInfo));
    }
    fetchChats();
  }, [fetchAgain]);

  const handleEnterSearchMode = () => {
    setIsSearchMode(true);
  };

  const handleExitSearchMode = () => {
    setIsSearchMode(false);
  };

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      bg="white"
      w={{ base: "100%", md: "23%" }}
      boxShadow="lg"
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        px={3}
        mt={3}
        fontSize={{ base: "28px", md: "30px" }}
        // fontFamily="Work sans"
        fontWeight="bold"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        Chats
        <GroupChatModal>
          <IconButton
            aria-label="Create Group Chat"
            display="flex"
            fontSize={{ base: "17px", md: "20px", lg: "20px" }}
            icon={<EditIcon />}
            variant="ghost"
            borderRadius="20px"
          />
        </GroupChatModal>
      </Box>
      <SideDrawer
        onEnterSearchMode={handleEnterSearchMode}
        onExitSearchMode={handleExitSearchMode}
      />
      {!isSearchMode && (
        <>
          <Box
            display="flex"
            flexDir="column"
            p={3}
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {chats ? (
              <Stack overflowY="scroll">
                {chats.map((chat: any) => (
                  <Box
                    onClick={() => setSelectedChat(chat)}
                    cursor="pointer"
                    bg={selectedChat === chat ? "#bfefef" : ""}
                    color="black"
                    px={3}
                    py={2}
                    borderRadius="lg"
                    key={chat._id}
                  >
                    <Flex align="center">
                      {chat.isGroupChat ? (
                        <Box className="avatar-group-custom">
                          {chat.users.slice(0, 2).map((userItem, index) => (
                            <Avatar
                              key={index}
                              className={
                                index === 0
                                  ? "avatar avatar-top-right"
                                  : "avatar avatar-bottom-left"
                              }
                              src={userItem.pic}
                            />
                          ))}
                        </Box>
                      ) : (
                        <Avatar
                          style={{ marginRight: "14px" }}
                          src={
                            chat.users.find(
                              (userItem) => userItem._id !== user._id
                            ).pic
                          }
                        />
                      )}

                      <Flex direction="column">
                        <Text>
                          <b>
                            {!chat.isGroupChat
                              ? getSender(loggedUser, chat.users)
                              : chat.chatName}
                          </b>
                        </Text>
                        {chat.latestMessage && (
                          <Text fontSize="xs">
                            {chat.latestMessage.sender.name}
                            {chat.latestMessage.file
                              ? " sent an image"
                              : ": " +
                                (chat.latestMessage.content.length > 50
                                  ? chat.latestMessage.content.substring(
                                      0,
                                      16
                                    ) + "..."
                                  : chat.latestMessage.content)}
                            <span style={{ opacity: "70%" }}>
                              {" · " +
                                moment(chat.latestMessage.createdAt).fromNow()}
                            </span>
                          </Text>
                        )}
                      </Flex>
                    </Flex>
                  </Box>
                ))}
              </Stack>
            ) : (
              <ChatLoading />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MyChats;
