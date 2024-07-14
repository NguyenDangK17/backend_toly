import "./rightbar.css";
import React, { useEffect, useState } from "react";
import { Users } from "../../../dummyData";
import OnlineFriend from "../Online/OnlineFriend";
import axios from "axios";
import { ChatState } from "../../../context/ChatProvider";

interface Friends {
  _id: String;
  name: String;
  pic: String;
  email: String;
}

function Rightbar() {
  const { user } = ChatState();
  const [friends, setFriends] = useState<Friends[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const result = await axios.get("http://localhost:5000/api/friend", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setFriends(result.data.friends);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <p className="rightbarTitle">Contacts</p>
        <ul className="rightbarFriendList">
          {friends
            // .filter((user) => {
            //   return user.id > 1;
            // })
            .map((u: any) => (
              <OnlineFriend key={u._id} user={u} />
            ))}
        </ul>

        <hr />
        <h3 style={{ color: "grey", marginTop: "0px" }}>Conversations</h3>
      </div>
    </div>
  );
}

export default Rightbar;
