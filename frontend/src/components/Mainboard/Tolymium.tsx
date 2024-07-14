import React from "react";
import "./Tolymium.css";
import { Space } from "antd";
import { CheckCircleFilled, StarFilled, CrownFilled } from "@ant-design/icons";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const contentStyle: React.CSSProperties = {
  height: "10px",
  width: "10px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const Tolymium: React.FC = () => {
  const { user } = ChatState();
  console.log(user);
  const navigate = useNavigate();
  const handleButtonClick = async (amount, description, type) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/order/create-payment-link",
        {
          amount: amount,
          description: description,
          type: type,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="pre-container">
      <div className="pre">
        <h1 className="pre-header">Tolymium</h1>
        <div className="pre-detail">
          <div className="price-card">
            <div className="price-header">
              <Space className="pre-package-name" align="center">
                Tolymium
                <StarFilled style={{ fontSize: "24px", color: "#FFE500" }} />
              </Space>
              <div className="pre-package-price">
                <h1 className="price-number">29.000đ</h1>
                <p className="price-number-time">/months</p>
              </div>
            </div>
            <div className="pre-description">
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} /> Unlimited fun
                place recommendations for groups
              </Space>
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} /> Unlimited
                personal location customization
              </Space>
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} /> Can use
                explore in your group chat
              </Space>
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} /> Can do more
                feature of your profile
              </Space>
            </div>
            {user && (
              <button
                className="trial-btn"
                onClick={() => {
                  if (user.accountType !== "premium_month") {
                    handleButtonClick(
                      2000,
                      "Payment for Tolymium ",
                      "premium_month"
                    );
                  }
                }}
              >
                {user.accountType === "premium_month"
                  ? "YOUR CURRENT PLAN"
                  : "USE TOLYMIUM"}
              </button>
            )}
            {!user && (
              <button className="trial-btn" onClick={() => navigate("/login")}>
                USE TOLYMIUM
              </button>
            )}
          </div>
          <div className="price-card">
            <div className="price-header">
              <Space className="pre-package-name">
                Tolymium{" "}
                <CrownFilled style={{ fontSize: "24px", color: "#FFE500" }} />
              </Space>
              <div className="pre-package-price">
                <h1 className="price-number">290.000đ</h1>
                <p className="price-number-time">/year</p>
              </div>
            </div>
            <div className="pre-description">
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} /> Unlimited fun
                place recommendations for groups
              </Space>
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} /> Unlimited
                personal location customization
              </Space>{" "}
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} /> Unlock all
                sticker and theme locks
              </Space>{" "}
              <Space align="center" size="middle">
                <CheckCircleFilled style={{ color: "#54b4b9" }} /> No limit to
                friend circle groups (max: 50 groups)
              </Space>
            </div>
            {user && (
              <button
                className="trial-btn"
                onClick={() => {
                  if (user.accountType !== "premium_year") {
                    handleButtonClick(
                      4000,
                      "Payment for Tolymium ",
                      "premium_year"
                    );
                  } else {
                    navigate(`/profile/${user._id}`);
                  }
                }}
              >
                {user.accountType === "premium_year"
                  ? "YOUR CURRENT PLAN"
                  : "USE TOLYMIUM"}
              </button>
            )}
            {!user && (
              <button className="trial-btn" onClick={() => navigate("/login")}>
                USE TOLYMIUM
              </button>
            )}
          </div>
          {!user || (user && user.accountType === "free") ? (
            <div className="price-card">
              <div className="price-header">
                <p className="pre-package-name">Free</p>
                <div className="pre-package-price">
                  <h1 className="price-number">0đ</h1>
                  <p className="price-number-time">/month</p>
                </div>
              </div>
              <div className="pre-description">
                <Space align="center" size="middle">
                  <CheckCircleFilled style={{ color: "#54b4b9" }} /> Two
                  location recommendations per week
                </Space>

                <Space align="center" size="middle">
                  <CheckCircleFilled style={{ color: "#54b4b9" }} /> Create only
                  1 groups
                </Space>
                <Space align="center" size="middle">
                  <CheckCircleFilled style={{ color: "#54b4b9" }} /> Use basic
                  icons
                </Space>
                <Space align="center" size="middle">
                  <CheckCircleFilled style={{ color: "#54b4b9" }} /> Chat with
                  friends via mini social
                </Space>
                <Space align="center" size="middle">
                  <CheckCircleFilled style={{ color: "#54b4b9" }} /> Personal
                  and friend location tracking
                </Space>
              </div>
              <button
                className="trial-btn"
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  }
                }}
              >
                {!user || user.accountType !== "free" ? "USE FREE" : "USED"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Tolymium;
