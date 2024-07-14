import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Card } from "antd";
import { ChatState } from "../../context/ChatProvider";
import "./SearchUser.css";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
} from "@mui/material";
interface User {
  _id: string;
  name: string;
  pic: string;
  mutualFriends: number;
}

interface Request {
  _id: string;
  requester: string;
  recipient: string;
  status: number;
}

interface SearchUsersProps {
  initialSearchTerm: string;
}

const SearchUsers: React.FC<SearchUsersProps> = ({ initialSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const { user } = ChatState();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            search: searchTerm,
          },
        });
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    const fetchFriendRequest = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5000/api/friend/request",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const filteredRequests = result.data.filter(
          (req) => req.recipient._id === user._id
        );
        setRequests(filteredRequests);
        console.log("Request: ", requests);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchUsers();
    fetchFriendRequest();
  }, [searchTerm]);

  console.log("REada:", requests);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFriend = async (id: any) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/friend/${id}`, {}, config);
      console.log("Friend: ", data);

      // Update the requests state
      setRequests((prevRequests) => [
        ...prevRequests,
        { _id: data._id, requester: user._id, recipient: id, status: 1 },
      ]);
    } catch (error) {
      console.log("Error when sent friend request", error.message);
    }
  };

  return (
    <div className="search-container">
      {/* Changed the container to a grid */}
      {filteredUsers.map((user) => {
        const request = requests.find((req) => req.recipient === user._id);
        const status = request ? request.status : 0;
        let buttonText: any;
        switch (status) {
          case 1:
            buttonText = "Friend Requested";
            break;
          case 2:
            buttonText = "Friends";
            break;
          default:
            buttonText = "Add friend";
        }

        return (
          <>
            <Grid item key={user._id} xs={2}>
              {" "}
              {/* Added class */}
              <Card className="card-user-search">
                <CardContent>
                  <div className="user-search-detail">
                    <img
                      // src={`https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433__480.png`}
                      src={user.pic}
                      alt={user.name}
                      className="user-image"
                    />
                    <Typography
                      variant="h5"
                      component="h2"
                      className="user-search-name"
                    >
                      {user.name}
                    </Typography>
                  </div>
                  {/* ... rest of the card content */}
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    className="add-friend-button"
                    onClick={() => handleAddFriend(user._id)}
                    disabled={status !== 0}
                  >
                    {buttonText}
                  </Button>
                  <Button variant="contained" className="send-message-button">
                    Nhắn tin
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </>
        );
      })}
    </div>
  );
};

export default SearchUsers;
