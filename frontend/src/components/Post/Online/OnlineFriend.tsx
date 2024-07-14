import React from "react";
import "./onlineFriend.css";

export default function OnlineFriend({ user }) {
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImageCont">
        <img
          src={user.pic}
          alt=""
          className="rightbarProfileImage"
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">
        <b>{user.name}</b>
      </span>
    </li>
  );
}
