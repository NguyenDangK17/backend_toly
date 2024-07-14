// import React, { useEffect, useState } from "react";
// import "./FriendList.css";
// import { Button, Dropdown, MenuProps } from "antd";
// import { MoreOutlined } from "@ant-design/icons";
// import { ChatState } from "../../context/ChatProvider";
// import axios from "axios";

// interface FriendsListProps {
//   setFriendsOnMap: (friends: any) => void;
// }

// const FriendsList = ({ setFriendsOnMap }: FriendsListProps) => {
//   const { user } = ChatState();
//   console.log(user._id);

//   const [friends, setFriends] = useState<any>([]);

//   const items: MenuProps["items"] = [
//     {
//       label: <a href="https://www.antgroup.com">View Profile</a>,
//       key: "0",
//     },
//     {
//       label: <a href="https://www.aliyun.com">Delete</a>,
//       key: "1",
//     },
//   ];

//   useEffect(() => {
//     const fetchFriend = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/friend", {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });
//         console.log(response.data);

//         const friendData = response.data.filter(
//           (friend) => friend.requester === user._id
//         );
//         console.log(friendData);

//         const friendsInfo = await Promise.all(
//           friendData.map(async (friend) => {
//             try {
//               const res = await axios.get(
//                 `http://localhost:5000/api/user/${friend.recipient._id}`,
//                 {
//                   headers: {
//                     Authorization: `Bearer ${user.token}`,
//                   },
//                 }
//               );
//               console.log(res.data);
//               return res.data;
//             } catch (error) {
//               console.error(
//                 `Error fetching data for friend ID ${friend.recipient}: `,
//                 error.message
//               );
//             }
//           })
//         );

//         setFriends(friendsInfo);
//         setFriendsOnMap(friendsInfo);
//       } catch (error) {
//         console.log("Error: ", error.message);
//       }
//     };

//     fetchFriend();
//   }, [user, setFriendsOnMap]);

//   return (
//     <ul className="friends-list">
//       {friends.map((friend: any, index: number) => (
//         <li key={index} className="friend-item">
//           <div className="friend-detail">
//             <img
//               src="https://i.pinimg.com/564x/ea/56/d8/ea56d8b90e525b069de9448d473da337.jpg"
//               // src={friend.pic}
//               alt="Profile"
//               className="friend-image"
//             />
//             <div className="friend-info">
//               <p className="friend-name">{friend.name}</p>
//               <p className="friend-mutuals">Number of mutual friends</p>
//             </div>
//           </div>
//           <div className="friend-action">
//             <Dropdown
//               menu={{ items }}
//               trigger={["click"]}
//               placement="bottomRight"
//             >
//               <a onClick={(e) => e.preventDefault()}>
//                 <Button icon={<MoreOutlined />} />
//               </a>
//             </Dropdown>
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default FriendsList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";
import {
  Container,
  Box,
  Typography,
  InputBase,
  Button,
  Avatar,
  IconButton,
  Grid,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface FriendsListProps {
  _id: string;
  email: string;
  name: string;
  pic: string;
  position: {
    lat: number;
    lng: number;
  };
}

const FriendList = () => {
  const { user } = ChatState();
  const { id } = useParams();
  const [friends, setFriends] = useState<FriendsListProps[]>([]);
  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };
  useEffect(() => {
    const fetchFriend = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/friend/list/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setFriends(response.data.friends);
      } catch (error) {
        console.log("ERROR GETTING FRIENDS");
      }
    };

    fetchFriend();
  }, []);

  console.log("Friends: ", friends);

  return (
    <Container
      // maxWidth="100vw"
      sx={{
        bgcolor: "#fff",
        color: "#000",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        marginBottom: "50px",
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid #ddd",
          paddingBottom: 1,
          marginBottom: 2,
        }}
      >
        <Typography variant="h6">Friends</Typography>
        <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
          <Box sx={{ position: "relative", flex: 1 }}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: 8,
                transform: "translateY(-50%)",
              }}
            >
              {/* <SearchIcon style={{c}} /> */}
            </Box>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
            </svg> */}
            <InputBase
              placeholder="Search"
              sx={{
                width: "100%",
                paddingLeft: 4,
                paddingRight: 1,
                borderRadius: 1,
                backgroundColor: "#f1f1f1",
                color: "#000",
              }}
            />
          </Box>
          <Button
            // variant="contained"
            sx={{ backgroundColor: "#fff", color: "#000", fontSize: "14px" }}
          >
            Friend requests
          </Button>
          <Button
            // variant="contained"
            sx={{ backgroundColor: "#fff", color: "#000", fontSize: "14px" }}
          >
            Find Friends
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#ddd", color: "#000" }}
          >
            ...
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {friends.map((friend, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#fff",
                padding: 2,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Avatar
                src={friend.pic}
                alt={friend.name}
                sx={{ width: 50, height: 50 }}
              />
              <Box
                sx={{ flex: 1, marginLeft: 2, cursor: "pointer" }}
                onClick={() => navigate(`/profile/${friend._id}`)}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {friend.name}
                </Typography>
                {/* <Typography variant="body2" sx={{ color: "#555" }}>
                  {friend.mutualFriends} mutual friends
                </Typography> */}
              </Box>
              <IconButton sx={{ color: "#555" }}>
                <MoreVertIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FriendList;
