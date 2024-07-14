import React, { useState } from "react";
import { SettingOutlined, SafetyOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Navbar from "../components/Navbar/Navbar";
import SearchFriends from "../components/Friends/SearchFriends";
import ChangePass from "../components/EditProfile/ChangePass";
import GeneralChange from "../components/EditProfile/GeneralChange";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    label: (
      <span style={{ fontWeight: "bold", fontSize: "16px" }}>General</span>
    ),
    icon: <SettingOutlined style={{ fontSize: "18px" }} />,
  },
  {
    key: "sub2",
    label: (
      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
        Change password
      </span>
    ),
    icon: <SafetyOutlined style={{ fontSize: "18px" }} />,
  },
];

const EditProfile: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKey, setSelectedKey] = useState("sub1");

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Navbar />
      <Layout>
        <Sider
          width={250}
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            height: "85vh",
            padding: 20,
          }}
        >
          <h1 style={{ marginLeft: "15px", fontSize: "22px" }}>Settings</h1>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            items={items}
            onClick={handleMenuClick} // Add onClick handler
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: "calc(100vh - 64px - 45px)", // Adjusting for Navbar height and padding
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Conditionally render component based on selected menu item */}
            {selectedKey === "sub1" && <GeneralChange />}
            {selectedKey === "sub2" && <ChangePass />}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default EditProfile;
