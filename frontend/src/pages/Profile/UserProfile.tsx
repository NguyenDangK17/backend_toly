import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import UserProfile from "../../components/Profile/UserProfile";

const UserProfilePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <UserProfile />
    </>
  );
};

export default UserProfilePage;
