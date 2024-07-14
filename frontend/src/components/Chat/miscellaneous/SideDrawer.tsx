import { IconButton } from "@chakra-ui/button";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Spinner } from "@chakra-ui/spinner";
import { Box, Flex } from "@chakra-ui/layout";
import { ArrowBackIcon, SearchIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../../context/ChatProvider";
import React from "react";

interface User {
  _id: string;
  name: string;
  pic: string;
}

interface SideDrawerProps {
  onEnterSearchMode: () => void;
  onExitSearchMode: () => void;
}

function SideDrawer({ onEnterSearchMode, onExitSearchMode }: SideDrawerProps) {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingChat, setLoadingChat] = useState<boolean>(false);
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId: string) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c: any) => c._id === data._id))
        setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      handleExitSearchMode();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleEnterSearchMode = () => {
    setIsSearchMode(true);
    onEnterSearchMode();
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 0);
  };

  const handleExitSearchMode = () => {
    setIsSearchMode(false);
    onExitSearchMode();
    setSearch("");
    setSearchResult([]);
  };

  return (
    <>
      {isSearchMode ? (
        <Box p="10px" bg="white" w="100%" h="100vh">
          <Flex mb="10px" alignItems="center">
            <IconButton
              icon={<ArrowBackIcon />}
              onClick={handleExitSearchMode}
              mr="10px"
              aria-label="Back"
              bg="none"
              fontSize={20}
            />
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                borderRadius={20}
                ref={searchInputRef}
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && handleSearch()}
              />
            </InputGroup>
          </Flex>
          {loading ? (
            <ChatLoading />
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
          {loadingChat && <Spinner ml="auto" display="flex" />}
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bg="white"
          w="100%"
          p="10px"
          borderBottom="1px solid lightgray"
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search User"
              onFocus={handleEnterSearchMode}
              borderRadius={20}
              borderColor={"lightgray"}
            />
          </InputGroup>
        </Box>
      )}
    </>
  );
}

export default SideDrawer;
