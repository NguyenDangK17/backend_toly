import "./home.css";
import Feed from "../../components/Post/Feed/Feed";
import Sidebar from "../../components/Post/Sidebar/Sidebar";
import Topbar from "../../components/Post/Topbar/Topbar";
import Rightbar from "../../components/Post/Rightbar/Rightbar";
import Navbar from "../../components/Navbar/Navbar";
import React from "react";

export default function Home({ showCreatePost, changeState }) {
  return (
    <>
      <div className={showCreatePost ? "halfVisualHome" : "fullVisualHome"}>
        <Topbar />
        {/* <Navbar />
        <hr/> */}
        <div className="homeContainer">
          <Sidebar />
          <Feed changeState={changeState} />
          <Rightbar />
        </div>
      </div>
    </>
  );
}
