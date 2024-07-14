import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { Badge, Spin, Tabs } from "antd";
import FriendList from "./FriendList";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import toast from "react-hot-toast";
import { CameraFilled, LoadingOutlined } from "@ant-design/icons";
import CurrentPlan from "./CurrentPlan";
interface UserProfileProps {
  _id: string;
  name: string;
  pic: string;
  coverPic: string;
  friends: string[];
}

const UserProfile: React.FC = () => {
  const { user } = ChatState();
  const { id } = useParams<{ id: string }>();
  console.log(user);

  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUserProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, [id, user.token]);

  const items = [
    {
      key: "1",
      label: "Friends",
      children: <FriendList />,
    },
    {
      key: "2",
      label: "Your premium",
      children: <CurrentPlan />,
    },
  ];

  if (!userProfile) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 60 }} spin />} />
      </div>
    );
  }

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.patch(
        "http://localhost:5000/api/user/upload-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserProfile({ ...userProfile, pic: res.data.url });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.patch(
        "http://localhost:5000/api/user/upload-cover",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setUserProfile({ ...userProfile, coverPic: res.data.url });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile">
      <div className="profileContainer">
        <div className="profileCenter">
          <div className="profileCenterTop">
            <img
              src={userProfile.coverPic}
              alt="coverphoto"
              className="coverPhoto"
            />
            <input
              type="file"
              onChange={handleCoverUpload}
              style={{ display: "none" }}
              id="cover"
            />
            {user._id === userProfile._id ? (
              <button className="editCoverPhotoBtn">
                {user.accountType === "free" ? (
                  <>
                    <CameraAltIcon />
                    <b
                      onClick={() => {
                        toast.error("Premium Account Only");
                      }}
                    >
                      Edit <span className="editPicText">Cover Photo</span>
                    </b>
                  </>
                ) : (
                  <>
                    <CameraAltIcon />
                    <label htmlFor="cover" style={{ cursor: "pointer" }}>
                      <b>
                        Edit <span className="editPicText">Cover Photo</span>
                      </b>
                    </label>
                  </>
                )}
              </button>
            ) : null}
          </div>
          <div className="profileCenterDown">
            <div className="profileCenterDownCont">
              <div className="profilePhotoCont">
                <input
                  type="file"
                  onChange={handleAvatarUpload}
                  style={{ display: "none" }}
                  id="upload"
                />
                {user.accountType === "free" ? (
                  <>
                    <img
                      src={userProfile.pic}
                      alt={userProfile.name}
                      className="profilePhoto"
                      onClick={() => toast.error("Premium Account Only")}
                    />
                  </>
                ) : (
                  <>
                    <Badge
                      count={
                        <label htmlFor="upload">
                          <CameraFilled
                            style={{
                              fontSize: "20px",
                              padding: 5,
                              backgroundColor: "#ccc",
                              borderRadius: 50,
                              cursor: "pointer",
                            }}
                          />
                        </label>
                      }
                      offset={[-20, 125]}
                    >
                      <img
                        src={userProfile.pic}
                        alt={userProfile.name}
                        className="profilePhoto"
                      />
                    </Badge>
                  </>
                )}
              </div>
              <h4 className="profileUsername">
                {userProfile.name}
                <p style={{ fontSize: "16px", margin: "0", opacity: "0.5" }}>
                  {userProfile.friends.length} friends
                </p>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="profileMain">
        <Tabs defaultActiveKey="1" items={items} className="user-tab" />
      </div>
    </div>
  );
};

export default UserProfile;
