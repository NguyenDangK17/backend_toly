import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import useLogout from "../../hooks/useLogout";

interface OrderProps {
  orderCode: string;
  amount: number;
  createdAt: Date;
}

const SuccessPay: React.FC = () => {
  const navigate = useNavigate();
  const { user } = ChatState();
  const [orders, setOrders] = useState<OrderProps | null>(null);
  const urlParams = new URLSearchParams(window.location.search);
  const orderCode = urlParams.get("orderCode");
  const { loading, logout } = useLogout();

  useEffect(() => {
    const getOrder = async () => {
      try {
        if (orderCode) {
          const { data } = await axios.get(
            `http://localhost:5000/api/order/get-payment-link-info/${orderCode}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setOrders(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getOrder();
  }, [orderCode, user.token]);

  useEffect(() => {
    const createOrder = async () => {
      if (orderCode && orders) {
        try {
          const { data } = await axios.post(
            `http://localhost:5000/api/order/create-order/${orderCode}`,
            {
              amount: orders.amount,
              createdAt: orders.createdAt,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          // const updatedUser = {
          //   ...user,
          //   accountType: data.userInfo.accountType,
          // };
          // localStorage.setItem("user", JSON.stringify(updatedUser));
          // navigate("/home");
          // logout();
        } catch (error) {
          if (error.response) {
            console.error("Fetch error:", error.response.data);
          } else {
            console.error("Fetch error:", error.message);
          }
        }
      }
    };

    createOrder();
  }, [orderCode, orders, user.token]);

  return (
    <>
      <Result
        status="success"
        title="Successfully Purchased Cloud Server ECS!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => navigate("/home")}
          >
            Log out to use Premium
          </Button>,
          <Button onClick={() => navigate("/home")} key="buy">
            Go home
          </Button>,
        ]}
      />
    </>
  );
};

export default SuccessPay;
