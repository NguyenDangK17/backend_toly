import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, Space, Statistic, Select } from "antd";
import {
  UserOutlined,
  CompassOutlined,
  StarOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import StatisticsCard from "./StatisticsCard";
import TotalPrice from "./TotalPrice";
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface User {
  _id: string;
  name: string;
  pic: string;
  email: string;
  accountType: string;
  createdAt: string;
}

interface Order {
  _id: string;
  purchaser: User | null;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    yAxisID: string;
  }[];
}

const Dashboard = () => {
  const { user } = ChatState();
  const [users, setUsers] = useState<User[]>([]);
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [interval, setInterval] = useState<string>("month");
  const [filteredUserData, setFilteredUsersData] = useState<User[]>([]);

  const stats = {
    newUsers: users.length,
    newExplores: 45,
    premiumUpdates: 30,
    totalUsers: users.length,
  };

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "Revenue in VND",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        yAxisID: "y",
      },
      {
        label: "Users Created",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        yAxisID: "y1",
      },
    ],
  });
  console.log(chartData);

  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        min: 0,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
        min: 0,
      },
    },
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const usersData: User[] = response.data;
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching data from API", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/order/all-order",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const ordersData: Order[] = response.data;
      setOrderData(ordersData);
    } catch (error) {
      console.error("Error fetching orders from API", error);
    }
  };

  const getChartData = (interval: string) => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date;
    let labels: string[] = [];

    switch (interval) {
      case "week":
        startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate() - 6
        );
        endDate = now;
        labels = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(now.getDate() - (6 - i));
          return date.toISOString().split("T")[0];
        });
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        labels = Array.from({ length: endDate.getDate() }, (_, i) => {
          const date = new Date(now.getFullYear(), now.getMonth(), i + 1);
          return date.toISOString().split("T")[0];
        });
        break;
      case "year":
        startDate = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        );
        endDate = now;
        labels = Array.from({ length: 12 }, (_, i) => {
          const date = new Date(now.getFullYear() - 1, i, 1);
          return date.toLocaleString("default", { month: "long" });
        });
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        labels = Array.from({ length: endDate.getDate() }, (_, i) => {
          const date = new Date(now.getFullYear(), now.getMonth(), i + 1);
          return date.toISOString().split("T")[0];
        });
        break;
    }

    const filteredOrders = orderData.filter(
      (order) =>
        new Date(order.createdAt) >= startDate &&
        new Date(order.createdAt) <= endDate
    );

    const filteredUsers = users.filter(
      (user) =>
        new Date(user.createdAt) >= startDate &&
        new Date(user.createdAt) <= endDate
    );

    const revenueData = labels.map((label, index) => {
      const currentDate = new Date(labels[index]);
      const nextDate = new Date(labels[index + 1] || currentDate);

      const revenue = filteredOrders.reduce((totalRevenue, order) => {
        const orderDate = new Date(order.createdAt);
        if (orderDate >= currentDate && orderDate < nextDate) {
          if (order.type === "premium_month") {
            return totalRevenue + 29000;
          } else if (order.type === "premium_year") {
            return totalRevenue + 290000;
          }
        }
        return totalRevenue;
      }, 0);

      return revenue;
    });

    const usersData = labels.map((label, index) => {
      const currentDate = new Date(labels[index]);
      const nextDate = new Date(labels[index + 1] || currentDate);

      const userCount = filteredUsers.reduce((count, user) => {
        const userDate = new Date(user.createdAt);
        if (userDate >= currentDate && userDate < nextDate) {
          return count + 1;
        }
        return count;
      }, 0);

      return userCount;
    });

    return { labels, revenueData, usersData, filteredUsers };
  };

  useEffect(() => {
    fetchData();
    fetchOrders();
  }, [user]);

  useEffect(() => {
    const { labels, revenueData, usersData, filteredUsers } =
      getChartData(interval);
    setChartData({
      labels,
      datasets: [
        {
          ...chartData.datasets[0], // Keep existing dataset properties
          data: revenueData,
        },
        {
          ...chartData.datasets[1], // Keep existing dataset properties
          data: usersData,
        },
      ],
    });
    setFilteredUsersData(filteredUsers); // Update filtered users data for TotalPrice
  }, [orderData, users, interval]);

  return (
    <div style={{ height: "599px", boxSizing: "border-box" }}>
      <h1>Dashboard</h1>
      <Select
        value={interval}
        onChange={(value: string) => setInterval(value)}
        style={{ width: 200, marginBottom: 20 }}
      >
        <Select.Option value="week">Week</Select.Option>
        <Select.Option value="month">Month</Select.Option>
        <Select.Option value="year">Year</Select.Option>
      </Select>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          maxHeight: "200px",
        }}
      >
        <TotalPrice data={filteredUserData}></TotalPrice>
        <StatisticsCard data={filteredUserData}></StatisticsCard>
      </div>

      <div style={{ marginTop: "50px" }}>
        <Line data={chartData} options={chartOptions} height={70} />
      </div>
    </div>
  );
};

export default Dashboard;
