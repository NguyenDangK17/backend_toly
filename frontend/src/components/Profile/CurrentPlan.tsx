import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";

interface PremiumCount {
  createdAt: string;
  numOfCreateGroupChat: number;
  numOfNavigate: number;
  premiumType: string;
  subscriber: string;
  subscriptionDate: string;
  subscriptionExpire: string;
  updatedAt: string;
}

const CurrentPlan = () => {
  const { user } = ChatState();
  const [premiumCount, setPremiumCount] = useState<PremiumCount>();

  useEffect(() => {
    const fetchPremium = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/order/premium-feature",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(data[0]);
        setPremiumCount(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPremium();
  }, [user.token]);

  return (
    <div>
      {user.accountType === "free" ? (
        <p>Your account is free</p>
      ) : premiumCount ? (
        <div>
          <h2>Current Plan Details</h2>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(premiumCount.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Number of Group Chats Created:</strong>{" "}
            {premiumCount.numOfCreateGroupChat}
          </p>
          <p>
            <strong>Number of Navigations:</strong> {premiumCount.numOfNavigate}
          </p>
          <p>
            <strong>Premium Type:</strong> {premiumCount.premiumType}
          </p>
          <p>
            <strong>Subscriber ID:</strong> {premiumCount.subscriber}
          </p>
          <p>
            <strong>Subscription Date:</strong>{" "}
            {new Date(premiumCount.subscriptionDate).toLocaleString()}
          </p>
          <p>
            <strong>Subscription Expiry:</strong>{" "}
            {new Date(premiumCount.subscriptionExpire).toLocaleString()}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CurrentPlan;
