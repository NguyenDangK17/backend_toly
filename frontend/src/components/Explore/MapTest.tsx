// DBtest.tsx
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
// import UserImage from "../../assets/images/user-map.png";

const apiKey = "AIzaSyApCxLqCsVpq5Ig_9hklh2DZSgWnL8EJEg";

const mapContainerStyle = {
  height: "88vh",
  width: "100%",
};

const zoom = 13;

const DBtest = ({ center, selectedLocation }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });
  const { user } = ChatState();
  const userId = user._id;
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [friends, setFriends] = useState<any>([]);
  const [friendLists, setFriendLists] = useState<any>([]);
  const fetchFriend = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response.data);

      setFriends(response.data.friends);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };
  const fetchFriendsDetails = async (friends) => {
    try {
      const friendDetails = await Promise.all(
        friends.map(async (friendId) => {
          const response = await axios.get(
            `http://localhost:5000/api/user/${friendId}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          return response.data;
        })
      );
      setFriendLists(friendDetails);
    } catch (error) {
      console.log("Error fetching friends details: ", error.message);
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude: ", latitude);
          console.log("Longitude: ", longitude);
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    fetchFriend();
  }, [userId]);
  useEffect(() => {
    if (friends.length > 0) {
      fetchFriendsDetails(friends);
    }
  }, [friends]);
  console.log(friendLists);

  return isLoaded ? (
    <div style={{ height: "80vh", width: "100%" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={{
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        {currentLocation && (
          <Marker position={currentLocation} label="My Location" />
        )}
        {friendLists.map((friend) => (
          <Marker
            key={friend._id}
            position={{ lat: friend.position.lat, lng: friend.position.lng }}
            label={friend.name}
            icon={{
              url: friend.pic,
              scaledSize: new window.google.maps.Size(50, 50),
            }}
          />
        ))}
        {selectedLocation && (
          <Marker
            position={selectedLocation.position}
            label={selectedLocation.name}
          />
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default DBtest;
