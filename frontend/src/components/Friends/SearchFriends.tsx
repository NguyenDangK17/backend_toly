import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, List, Avatar, Button, message, Form, Empty } from "antd";
import { ChatState } from "../../context/ChatProvider";
import { SearchOutlined } from "@ant-design/icons";
interface User {
  _id: string;
  name: string;
  email: string;
  pic: string;
  friends: string[];
}

interface Request {
  _id: string;
  requester: {
    _id: string;
    name: string;
    pic: string;
    email: string;
  };
  recipient: {
    _id: string;
    name: string;
    pic: string;
    email: string;
  };
  status: number;
}

const SearchFriends: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [submittedSearch, setSubmittedSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = ChatState();

  useEffect(() => {
    const fetchUsers = async () => {
      if (submittedSearch.trim()) {
        setLoading(true);
        try {
          const response = await axios.get(
            `/api/user/name/${submittedSearch}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching users", error);
          // message.error("Failed to fetch users. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        setUsers([]);
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
        setRequests(result.data);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    if (submittedSearch) {
      setUsers([]); // Reset users state before fetching new data
      setRequests([]); // Reset requests state before fetching new data
      fetchUsers();
      fetchFriendRequest();
    }
  }, [submittedSearch, user.token]);

  const handleAddFriend = async (id: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/friend/${id}`, {}, config);
      setRequests((prevRequests) => [
        ...prevRequests,
        {
          _id: data._id,
          requester: user,
          recipient: { _id: id, name: "", pic: "", email: "" },
          status: 1,
        },
      ]);
    } catch (error) {
      console.log("Error when sending friend request", error.message);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSearch(search);
  };

  const handleCancelRequest = async (id: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.delete(`api/friend/decline/${id}`, config);
    } catch (error) {
      console.log("Error when decline friend request", error.message);
    }
  };

  const handleConfirmRequest = async (id: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.patch(`/api/friend/accept/${id}`, config);
    } catch (error) {
      console.log("Error when sent friend request", error.message);
    }
  };

  const getFriendRequestStatus = (userId: string) => {
    const request = requests.find(
      (req) => req.requester._id === userId || req.recipient._id === userId
    );

    if (request) {
      if (request.status === 2) {
        return "friends";
      } else if (request.requester._id === user._id) {
        return "sent";
      } else if (request.recipient._id === user._id) {
        return "received";
      }
    }
    return null;
  };

  return (
    <div>
      <h1>Search Friends</h1>
      <Form onSubmitCapture={handleSearch}>
        <Input
          placeholder="Search friends by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="large"
          style={{ marginBottom: "20px" }}
          prefix={<SearchOutlined />}
        />
      </Form>
      {submittedSearch && (
        <List
          itemLayout="horizontal"
          dataSource={users}
          loading={loading}
          locale={{
            emptyText: (
              <Empty
                description={
                  <span style={{ fontWeight: "bold" }}>No results found</span>
                }
                style={{ fontSize: "24px" }}
                image="https://static.vecteezy.com/system/resources/previews/003/274/356/non_2x/no-result-search-flat-illustration-vector.jpg"
                imageStyle={{ height: 300 }}
              >
                Please ensure all spellings are correct or try using different
                keywords.
              </Empty>
            ),
          }}
          renderItem={(user) => {
            const requestStatus = getFriendRequestStatus(user._id);
            return (
              <List.Item
                actions={[
                  !requestStatus ? (
                    <Button key="add" onClick={() => handleAddFriend(user._id)}>
                      Add friend
                    </Button>
                  ) : requestStatus === "sent" ? (
                    <Button
                      key="cancel"
                      onClick={() => handleCancelRequest(user._id)}
                    >
                      Cancel Request
                    </Button>
                  ) : requestStatus === "received" ? (
                    <Button
                      key="confirm"
                      onClick={() => handleConfirmRequest(user._id)}
                    >
                      Confirm
                    </Button>
                  ) : (
                    <Button key="friends" disabled>
                      Friends
                    </Button>
                  ),
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={user.pic} />}
                  title={<a href={`/profile/${user._id}`}>{user.name}</a>}
                  description={user.email}
                />
              </List.Item>
            );
          }}
        />
      )}
    </div>
  );
};

export default SearchFriends;
