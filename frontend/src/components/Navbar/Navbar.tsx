import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import LogoutButton from "../Chat/LogoutButton";
import { Badge, Dropdown, MenuProps, Space } from "antd";
import {
  MessageFilled,
  TeamOutlined,
  StarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = ChatState();
  console.log("hi", user);

  const profileData = JSON.parse(localStorage.getItem("chat-user") || "{}");
  const profilePic = profileData.pic;
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  console.log("ne:", userData);

  const [menuOpen, setMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const navigate = (toUrl) => {
    window.location.href = toUrl;
  };
  useEffect(() => {
    if (user && user._id && user.token) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/user/${user._id}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setUserProfile(response.data);
        } catch (error) {
          console.error("Error fetching user profile", error);
        }
      };
      fetchUserProfile();
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const truncateName = (name: string) => {
    return name.length > 10 ? `${name.slice(0, 10)}...` : name;
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Space
          onClick={() => navigate(`/profile/${user?._id}`)}
          className="profile-link"
        >
          {user && (
            <>
              <img
                src={profilePic || user.pic}
                alt=""
                style={{ height: 24, width: 24, borderRadius: 50 }}
              />
              {truncateName(user.name)}
            </>
          )}
        </Space>
      ),
      key: "0",
    },

    {
      type: "divider",
    },
    {
      label: (
        <Space
          onClick={() => navigate(`/editProfile`)}
          className="profile-link"
        >
          <SettingOutlined style={{ fontSize: 20, marginLeft: 5 }} />
          Setting
        </Space>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Space>
          <LogoutButton />
        </Space>
      ),
      key: "2",
    },
  ];

  const renderBadge = () => {
    if (user.accountType === "premium_month") {
      return <StarOutlined />;
    } else if (user.accountType === "premium_year") {
      return <DiamondOutlinedIcon />;
    }
    return null;
  };

  return (
    <nav
      style={
        isScrolled
          ? {
              backgroundColor: " rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid #ccc",
            }
          : { backgroundColor: "transparent" }
      }
    >
      <Link to={"/home"}>
        <div className="logo">
          <img alt="logo" src={Logo} />
        </div>
      </Link>
      <div
        className={`menu ${menuOpen ? "active" : ""}`}
        style={!user ? { marginLeft: "125px" } : {}}
      >
        <Link to={"/home"} style={{ textDecoration: "none", color: "unset" }}>
          <div className="menu-link">Home</div>
        </Link>
        <div className="divider">|</div>
        <Link
          to={"/explore"}
          style={{ textDecoration: "none", color: "unset" }}
        >
          <div className="menu-link">Explore</div>
        </Link>
        <div className="divider">|</div>
        <Link
          to={"/contact"}
          style={{ textDecoration: "none", color: "unset" }}
        >
          <div className="menu-link">Contact</div>
        </Link>
      </div>

      {!user ? (
        <div className={`login ${menuOpen ? "active" : ""}`}>
          <Link to={"/signup"} className="login-link">
            SIGNIN
          </Link>
          <Link to={"/login"}>
            <button className="login-btn">LOGIN</button>
          </Link>
        </div>
      ) : (
        <div className="login">
          <Link
            to={"/tolymium"}
            style={{ textDecoration: "none", color: "unset" }}
          >
            <DiamondOutlinedIcon fontSize="inherit" className="mess-icon" />
          </Link>
          <Link
            to={"/friends"}
            style={{ textDecoration: "none", color: "unset" }}
          >
            <TeamOutlined className="mess-icon" />
          </Link>
          <Link
            to={"/chats"}
            style={{ textDecoration: "none", color: "unset" }}
          >
            <MessageFilled className="mess-icon" />
          </Link>
          <Dropdown menu={{ items }} trigger={["click"]}>
            {/* <Badge count={<DiamondOutlinedIcon />}> */}
            <Badge count={renderBadge()}>
              <a onClick={(e) => e.preventDefault()}>
                <img
                  src={profilePic || user.pic}
                  alt="Profile"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50px",
                  }}
                />
              </a>
            </Badge>
          </Dropdown>
        </div>
      )}
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
