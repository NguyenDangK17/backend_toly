import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import axios from "axios";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { ChatState } from "../../context/ChatProvider";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid3VhdmFubjUwNzYiLCJhIjoiY2x4cDF5ZTMxMGQwOTJqcHV2ZXlvYzBybSJ9.S90q1YyODPdio83xGUtYAw";

interface Location {
  _id: string;
  name: string;
  area: string;
  rating: number;
  priceRange: string;
  position: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
}
interface MemberData {
  _id: string;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
}
interface MapProps {
  selectedLocation: Location | null;
  hintLocation: Location | null;
  memberChatData: MemberData[] | null;
}

const Map: React.FC<MapProps> = ({
  selectedLocation,
  hintLocation,
  memberChatData,
}) => {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: 10.7941,
    longitude: 106.7216,
    zoom: 16,
  });

  useEffect(() => {
    if (selectedLocation) {
      setViewport({
        ...viewport,
        latitude: selectedLocation.position.lat,
        longitude: selectedLocation.position.lng,
      });
    } else if (hintLocation) {
      setViewport({
        ...viewport,
        latitude: hintLocation.position.lat,
        longitude: hintLocation.position.lng,
      });
    }
  }, [selectedLocation, hintLocation]);
  useEffect(() => {
    if (showDirections && userLocation) {
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: "metric",
        profile: "mapbox/driving",
      });

      directions.setOrigin([userLocation.lng, userLocation.lat]);

      if (hintLocation) {
        directions.setDestination([
          hintLocation.position.lng,
          hintLocation.position.lat,
        ]);
      } else {
        // If hintLocation is undefined, set the destination to viewport coordinates
        directions.setDestination([viewport.longitude, viewport.latitude]);
      }
      const map = new mapboxgl.Map({
        container: "map",
        center: [userLocation.lng, userLocation.lat],
        zoom: 16,
      });
      map.addControl(directions, "top-left");
    }
  }, [
    hintLocation,
    showDirections,
    userLocation,
    viewport.latitude,
    viewport.longitude,
  ]);

  console.log("viewport lat", viewport.latitude);
  console.log("viewport lng", viewport.longitude);
  console.log("User Location:", userLocation);
  console.log("Hint Location:", hintLocation?.position);

  return (
    <div className="map-wrapper">
      <button onClick={() => setShowDirections(true)}>Show Directions</button>

      <div className="map-container">
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={mapboxgl.accessToken}
          id="map"
        >
          <NavigationControl />

          {selectedLocation && (
            <Marker
              latitude={selectedLocation.position.lat}
              longitude={selectedLocation.position.lng}
              offset={[-20, -20]}
            >
              <img
                src={selectedLocation.imageUrl}
                alt={selectedLocation.name}
                style={{ height: 50, width: 50, borderRadius: 50 }}
              />
            </Marker>
          )}

          {hintLocation && (
            <Marker
              latitude={hintLocation.position.lat}
              longitude={hintLocation.position.lng}
              offset={[-20, -20]}
            >
              <img
                src={hintLocation.imageUrl}
                alt={hintLocation.name}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  border: "2px solid black",
                }}
              />
            </Marker>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default Map;
