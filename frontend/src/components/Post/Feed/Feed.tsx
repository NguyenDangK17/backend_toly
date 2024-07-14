import Post from "../Post/Post";
import "./feed.css";
import Share from "../Share/Share";
// import axios from 'axios'
// import { useEffect,useState } from "react";
import { Posts } from "../../../dummyData";
import React from "react";

export default function Feed({ changeState }) {
  // const[posts,setPosts] = useState([]);
  // useEffect(()=>{
  //   const fetchPosts = async()=>{
  //     const res = await axios.get("posts/timeline/62b980a429037a1e38b07192")
  //     setPosts(res.data)
  //   }
  //   fetchPosts();
  // },[]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share changeState={changeState} />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
