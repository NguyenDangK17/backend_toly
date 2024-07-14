import React, { useEffect, useState } from "react";
import { Col, Row, notification } from "antd";
import ExploreList from "./ExploreList";
import Map from "./Map";
import locationDb, { Location } from "./LocationDB"; // Import locationDb
import DBtest from "./MapTest";
import FriendsList from "../Profile/FriendList";
import type { NotificationArgsProps } from "antd";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import { useLocation } from "react-router-dom";

type NotificationPlacement = NotificationArgsProps["placement"];
interface ExploreData {
  _id: string;
  name: string;
  area: string;
  rating: number;
  priceRange: string;
  imageUrl: string;
  position: {
    lat: number;
    lng: number;
  };
}

const Explore: React.FC = () => {
  const [center, setCenter] = useState({ lat: 10.762622, lng: 106.660172 });
  const { user } = ChatState();
  const [selectedLocation, setSelectedLocation] = useState<ExploreData | null>(
    null
  );

  const [userData, setUserData] = useState<any>({});
  const [api, contextHolder] = notification.useNotification();
  const [showNotification, setShowNotification] = useState(false);

  const userId = user._id;

  const getUserData = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUserData(response.data);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  const openNotification = (placement: NotificationPlacement) => {
    api.error({
      message: null,
      description: "Please update position for further features",
      placement,
      duration: 5,
    });
  };

  const checkUserPosition = () => {
    if (
      userData.position &&
      userData.position.lat === 0 &&
      userData.position.lng === 0
    ) {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  };

  useEffect(() => {
    getUserData(userId);
  }, [userId]);

  useEffect(() => {
    checkUserPosition();
  }, [userData]);

  useEffect(() => {
    if (showNotification) {
      openNotification("bottomLeft");
    }
  }, [showNotification]);
  const location = useLocation();
  const { state } = location;
  const selectedLocationFromState = state ? state.location : null;
  const memberChatDataFromStatte = state ? state.chatMembersData : null;
  console.log("location prop from chat:", selectedLocationFromState);
  console.log("member prop from chat:", memberChatDataFromStatte);

  return (
    <Row>
      <Col span={18} push={6}>
        <Map
          selectedLocation={selectedLocation}
          hintLocation={selectedLocationFromState}
          memberChatData={memberChatDataFromStatte}
        />
      </Col>
      <Col span={6} pull={18} style={{ height: "50vh" }}>
        <ExploreList
          setCenter={setCenter}
          setSelectedLocation={setSelectedLocation}
          // setHintLocation={selectedLocationFromState}
        />
      </Col>
    </Row>
  );
};

export default Explore;
