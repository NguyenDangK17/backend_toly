import { Box } from "@chakra-ui/layout";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../../context/ChatProvider";
import React from "react";

const Chatbox = ({
  fetchAgain,
  setFetchAgain,
  onOpenUpdateBox,
  isUpdateBoxOpen,
}) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{
        base: isUpdateBoxOpen ? "69%" : "100%",
        md: isUpdateBoxOpen ? "52%" : "76%",
      }}
      boxShadow="lg"
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        onOpenUpdateBox={onOpenUpdateBox}
      />
    </Box>
  );
};

export default Chatbox;
