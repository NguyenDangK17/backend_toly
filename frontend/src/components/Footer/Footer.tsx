// footer.tsx

import React from "react";
import Logo from "../../assets/images/logo.png";
import FbLogo from "../../assets/images/fb.svg";
import IGLogo from "../../assets/images/ig.svg";
import TikLogo from "../../assets/images/tiktok.svg";
import "./Footer.css";
import classes from "./Footer.module.css";
import {
  FacebookOutlined,
  MailOutlined,
  TikTokOutlined,
  InfoCircleOutlined,
  FacebookFilled,
  PhoneOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
const Footer: React.FC = () => {
  return (
    <div className="footer-container">
      <div className="footer-info">
        <div className="footer-about">
          <img src={Logo} alt="logo" className="footer-logo" />
          <div className="footer-about-text">
            <h2 className="aboutUs-header">About Us</h2>
            <br />
            Toly là một nền tảng định vị trực tuyến độc đáo, nơi mọi người có
            thể chia sẻ những khoảnh khắc, theo dõi vị trí của nhau và khám phá
            những địa điểm xung quanh một cách an toàn và bảo mật. Với những
            tính năng độc đáo và thú vị, Toly sẽ mang đến cho bạn, người thân và
            những người xung quanh tạo thêm nhiều khoảnh khắc đáng nhớ. Hãy cùng
            khám phá những điều đặc biệt mà Toly mang lại nhé!
            <br />
            Toly - Unleash your journey’s potential.
          </div>
        </div>
        <div className="footer-contact">
          <Space style={{ fontWeight: 700 }}>
            <InfoCircleOutlined />
            Thông tin liên hệ
          </Space>
          <p>Toly Team - Đại học FPT TP.HCM</p>
          <Space style={{ fontWeight: 700 }}>
            <PhoneOutlined />
            Hỗ trợ khách hàng
          </Space>
          <p>tolyinc.exe2@gmail.com</p>
          <Space style={{ fontWeight: 700, marginBottom: "2rem" }}>
            <FacebookFilled />
            Fanpage
          </Space>
          <img src={Logo} alt="Logo" className="footer-logo" />
        </div>
        <div className="footer-signup">
          <h2 className="footer-signup-header">ĐĂNG KÝ NHẬN ƯU ĐÃI</h2>
          <input
            type="text"
            name=""
            id=""
            placeholder="Name"
            className="footer-input"
          />
          <input
            type="text"
            name=""
            id=""
            placeholder="Phone"
            className="footer-input"
          />
          <button className="footer-btn">SIGN UP</button>
        </div>
      </div>
      <div className="footer-social">
        <h3>Social media</h3>
        <div className="social-info">
          <a href="https://www.instagram.com/tuiminhlatolyne/" target="_blank">
            <img src={IGLogo} alt="Instagram" className="social-icon" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61559735338853"
            target="_blank"
          >
            <img src={FbLogo} alt="Facebook" className="social-icon" />
          </a>
          <a href="https://www.tiktok.com/@tuiminhlatolyne" target="_blank">
            <img src={TikLogo} alt="" className="social-icon" />
          </a>
        </div>
      </div>
      <p>
        Việc sử dụng trang web này cho thấy bạn tuân thủ chính sách quyền riêng
        tư, điều khoản và điều kiện của chúng tôi
      </p>
    </div>
  );
};

export default Footer;
