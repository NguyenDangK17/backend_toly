import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Avatar, Button, message, Empty } from "antd";
import { ChatState } from "../../context/ChatProvider";

interface User {
  _id: string;
  name: string;
  email: string;
  pic: string;
  friends: string[];
}

interface Request {
  _id: string;
  requester: { _id: string; name: string; pic: string; email: string };
  recipient: string;
  status: number;
}

const RequestList: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = ChatState();

  useEffect(() => {
    const fetchUsers = async () => {
      if (search.trim()) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/user/name/${search}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users", error);
          message.error("Failed to fetch users. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        setUsers([]);
      }
    };

    const fetchFriendRequests = async () => {
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
          (req: any) => req.recipient._id === user._id
        );
        setRequests(filteredRequests);
        console.log("Request: ", result.data);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
      fetchFriendRequests();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, user.token]);

  const handleAcceptFriend = async (id: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.patch(
        `/api/friend/accept/${id}`,
        {},
        config
      );
      // Remove the accepted friend request from the state
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.requester._id !== id)
      );
      message.success("Friend request accepted");
    } catch (error) {
      console.log("Error when accepting friend request", error.message);
      message.error("Failed to accept friend request. Please try again later.");
    }
  };

  const handleDeleteRequest = async (id: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.delete(`api/friend/decline/${id}`, config);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.requester._id !== id)
      );
      message.success("Friend request deleted");
    } catch (error) {
      console.log("Error when decline friend request", error.message);
    }
  };

  const filteredRequests = requests.filter((request) => request.status === 1);

  return (
    <div>
      <h1>Friend Requests</h1>
      <List
        itemLayout="horizontal"
        dataSource={filteredRequests}
        loading={loading}
        locale={{
          emptyText: (
            <Empty
              description={
                <span style={{ fontWeight: "bold" }}>No new requests</span>
              }
              style={{ fontSize: "24px" }}
              image="https://img.freepik.com/premium-vector/nothing-here-flat-illustration_418302-77.jpg"
              imageStyle={{ height: 300 }}
            >
              It looks a bit lonely here. Add some friends to brighten things
              up!
            </Empty>
          ),
        }}
        renderItem={(request) => (
          <List.Item
            actions={[
              <Button
                key="add"
                onClick={() => handleAcceptFriend(request.requester._id)}
              >
                Confirm
              </Button>,
              <Button
                key="delete"
                onClick={() => handleDeleteRequest(request.requester._id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={request.requester.pic} />}
              title={
                <a href={`/profile/${request.requester._id}`}>
                  {request.requester.name}
                </a>
              }
              description={request.requester.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default RequestList;
