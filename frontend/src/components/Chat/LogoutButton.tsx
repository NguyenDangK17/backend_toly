import React from "react";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { Space } from "antd";

const LogoutButton: React.FC = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <Space
          onClick={logout}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          <BiLogOut
            style={{
              width: "24px",
              height: "24px",
              color: "black",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          />
          Logout
        </Space>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
