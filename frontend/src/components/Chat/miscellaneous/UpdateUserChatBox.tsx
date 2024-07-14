import {
  Box,
  Button,
  Text,
  Image,
  Collapse,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompass,
  faUser,
  faBell,
  faTrash,
  faBan,
  faTriangleExclamation,
  faImages,
  faFileLines,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface User {
  _id: string;
  name: string;
  pic: string;
  email: string;
  position: {
    lat: number;
    lng: number;
  };
}

interface ProfileBoxProps {
  user: User;
  children?: React.ReactNode;
}

const UpdateUserChatBox: React.FC<ProfileBoxProps> = ({ user, children }) => {
  const navigate = useNavigate();
  const [mediaFilesOpen, setMediaFilesOpen] = useState(false);
  const [privacySupportOpen, setPrivacySupportOpen] = useState(false);

  const toggleMediaFiles = () => setMediaFilesOpen(!mediaFilesOpen);
  const togglePrivacySupport = () => setPrivacySupportOpen(!privacySupportOpen);

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      background="white"
      padding="20px"
      boxShadow="lg"
      w={{ base: "100%", md: "23%" }}
      borderRadius="lg"
      borderWidth="1px"
      overflowY="scroll"
    >
      <Box
        display="flex"
        flexDirection="column"
        // alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box
          display="flex"
          justifyContent="center"
          // position="relative"
          // mb={6}
        >
          <Image
            borderRadius="full"
            boxSize="100px"
            border="1px solid lightgray"
            src={user.pic}
            alt={user.name}
            mb={4}
          />
        </Box>
        <Box
          fontSize="24px"
          fontWeight="bold"
          display="flex"
          justifyContent="center"
          mb={4}
        >
          {user.name}
        </Box>
        <Box display="flex" justifyContent="space-evenly" width="100%" mb={4}>
          <VStack>
            <IconButton
              icon={<FontAwesomeIcon icon={faUser} />}
              bgColor="#dff7f7"
              isRound
              aria-label="Profile"
              onClick={() => navigate(`/profile/${user._id}`)}
            />
            <Text fontSize="sm" color="gray.500">
              Profile
            </Text>
          </VStack>
          <VStack>
            <IconButton
              icon={<FontAwesomeIcon icon={faCompass} />}
              bgColor="#dff7f7"
              isRound
              aria-label="Navigate"
              onClick={() => navigate(`/explore`)}
            />
            <Text fontSize="sm" color="gray.500">
              Navigate
            </Text>
          </VStack>
        </Box>
        <Button
          onClick={toggleMediaFiles}
          width="100%"
          bg="none"
          justifyContent="space-between"
          rightIcon={mediaFilesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        >
          Media & Files
        </Button>
        <Collapse in={mediaFilesOpen}>
          <Box display="flex" flexDirection="column" width="100%">
            <Button
              leftIcon={<FontAwesomeIcon icon={faImages} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Media
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faFileLines} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Files
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faLink} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Links
            </Button>
          </Box>
        </Collapse>

        <Button
          onClick={togglePrivacySupport}
          width="100%"
          bg="none"
          justifyContent="space-between"
          rightIcon={
            privacySupportOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
          }
        >
          Privacy Settings
        </Button>
        <Collapse in={privacySupportOpen}>
          <Box display="flex" flexDirection="column" width="100%">
            <Button
              leftIcon={<FontAwesomeIcon icon={faBell} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Mute notifications
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faBan} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Block
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faTriangleExclamation} />}
              iconSpacing={4}
              bg="none"
              justifyContent="flex-start"
            >
              Report
            </Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faTrash} />}
              iconSpacing={4}
              color="red"
              bg="none"
              justifyContent="flex-start"
            >
              Delete chat
            </Button>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default UpdateUserChatBox;
