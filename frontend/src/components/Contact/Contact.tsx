import React from "react";
import "./Contact.css";
import {
  FacebookFilled,
  HomeFilled,
  MailFilled,
  PhoneFilled,
  TikTokFilled,
} from "@ant-design/icons";
import { Space } from "antd";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h1>Let’s discuss on something cool together</h1>
          <div className="contact-text">
            <Space className="contact-detail">
              <MailFilled />
              <p>tolyinc.exe2@gmail.com</p>
            </Space>
            <Space className="contact-detail">
              <PhoneFilled />
              <p>094 135 86 57</p>
            </Space>
            <Space className="contact-detail">
              <HomeFilled />
              <p>FPT University HCM</p>
            </Space>
          </div>
          <div className="contact-icon">
            <a
              href="https://www.facebook.com/profile.php?id=61559735338853"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "unset" }}
            >
              <FacebookFilled className="icon-contact-link" />
            </a>
            <a
              href="https://www.tiktok.com/@tuiminhlatolyne"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "unset" }}
            >
              <TikTokFilled className="icon-contact-link" />
            </a>
            <a
              href="mailto:tolyinc.exe2@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "unset" }}
            >
              <MailFilled className="icon-contact-link" />
            </a>
          </div>
        </div>
        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit">
            <SendIcon />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
