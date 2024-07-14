import React, { useState } from "react";
import {
  ProfileOutlined,
  UserOutlined,
  FireOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Logo from "../assets/images/logo.png";
import Dashboard from "../components/Admin/Dashboard";
import User from "../components/Admin/User";
import Explore from "../components/Admin/Explore";
import Post from "../components/Admin/Post";
import LogoutButton from "../components/Chat/LogoutButton";
const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: "1",
    icon: <LineChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: "User",
  },
  {
    key: "3",
    icon: <FireOutlined />,
    label: "Destination",
  },
];

const AdmingPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedKey, setSelectedKey] = useState("1");
  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };
  return (
    <Layout style={{ height: "850px" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        theme="light"
      >
        <img
          src={Logo}
          alt="logo"
          style={{
            height: 64,
            width: "100%",
            padding: "10px",
            objectFit: "contain",
          }}
        />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          style={{ fontSize: "16px", fontWeight: "500" }}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <LogoutButton />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {selectedKey === "1" && <Dashboard />}
            {selectedKey === "2" && <User />}
            {selectedKey === "3" && <Explore />}
            {selectedKey === "4" && <Post />}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Created by Toly Team</Footer>
      </Layout>
    </Layout>
  );
};

export default AdmingPage;
