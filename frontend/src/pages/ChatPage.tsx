// import { Box } from "@chakra-ui/layout";
// import React, { useState } from "react";
// import Chatbox from "../components/Chat/Chatbox";
// import MyChats from "../components/Chat/MyChats";
// import SideDrawer from "../components/Chat/miscellaneous/SideDrawer";
// import { ChatState } from "../context/ChatProvider.jsx";
// import Navbar from "../components/Navbar/Navbar.js";

// const Chatpage: React.FC = () => {
//   const [fetchAgain, setFetchAgain] = useState<boolean>(false);
//   const { user } = ChatState();

//   return (
//     <div style={{ width: "100%" }}>
//       <Navbar />
//       {/* {user && <SideDrawer />} */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         width="100%"
//         // height="91.5vh"
//         height="88vh"
//         padding="10px"
//       >
//         {user && <MyChats fetchAgain={fetchAgain} />}
//         {user && (
//           <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
//         )}
//       </Box>
//     </div>
//   );
// };

// export default Chatpage;

import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import Chatbox from "../components/Chat/Chatbox";
import MyChats from "../components/Chat/MyChats";
import { ChatState } from "../context/ChatProvider.jsx";
import Navbar from "../components/Navbar/Navbar.js";
import UpdateGroupChatBox from "../components/Chat/miscellaneous/UpdateGroupChatBox";
import UpdateUserChatBox from "../components/Chat/miscellaneous/UpdateUserChatBox.js";
import { getSenderFull } from "../config/ChatLogics.js";
import "./FixBox.css";
const Chatpage: React.FC = () => {
  const [fetchAgain, setFetchAgain] = useState<boolean>(false);
  const { user, selectedChat } = ChatState();
  const [isUpdateBoxOpen, setIsUpdateBoxOpen] = useState<boolean>(false);

  const toggleUpdateBox = () => {
    setIsUpdateBoxOpen(!isUpdateBoxOpen);
  };

  return (
    <div style={{ width: "100%" }}>
      <Navbar />
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="88vh"
        padding="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <>
            <Chatbox
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              onOpenUpdateBox={toggleUpdateBox}
              isUpdateBoxOpen={isUpdateBoxOpen}
            />
            {isUpdateBoxOpen && (
              <>
                {selectedChat.isGroupChat ? (
                  <UpdateGroupChatBox
                    fetchMessages={() => {}}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                ) : (
                  <UpdateUserChatBox
                    user={getSenderFull(user, selectedChat.users)}
                    children={undefined}
                  />
                )}
              </>
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
