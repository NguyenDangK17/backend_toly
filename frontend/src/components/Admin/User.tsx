import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Popconfirm } from "antd";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";

interface User {
  _id: string;
  name: string;
  pic: string;
  email: string;
}

const UsersList: React.FC = () => {
  const { user } = ChatState();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h3>Total: {users.length} users</h3>
      <List
        pagination={{ pageSize: 7 }}
        dataSource={users}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Popconfirm
                title="Delete the user"
                description="Are you sure to delete this user?"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={() => deleteUser(item._id)}
              >
                <Button danger>Delete</Button>
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.pic} size={"large"} />}
              title={item.name}
              description={item.email}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default UsersList;
