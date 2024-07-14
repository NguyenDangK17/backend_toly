import React, { useState, useEffect } from "react";
import { Button, Card, Flex, Input } from "antd";
import {
  EnvironmentOutlined,
  StarFilled,
  CompassOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

interface ExploreListProps {
  setCenter: (position: { lat: number; lng: number }) => void;
  setSelectedLocation: (location: Location) => void;
  // setHintLocation: (location: Location) => void;
}

interface Location {
  _id: string;
  name: string;
  area: string;
  rating: number;
  priceRange: string;
  position: { lat: number; lng: number };
  imageUrl: string;
}

const ExploreList: React.FC<ExploreListProps> = ({
  setCenter,
  setSelectedLocation,
  // setHintLocation,
}) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation(); // Access location object from React Router
  const selectedExplore = location.state?.selectedExplore;
  const selectedLocationFromState = location.state?.location;
  const [btnStatus, setbtnStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchTerm === "") {
          response = await axios.get<Location[]>(
            "http://localhost:5000/api/explore"
          );
          const filteredData = response.data
            .filter((destination) => destination.rating > 4.5)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 4);
          setLocations(filteredData);
        } else {
          response = await axios.get<Location[]>(
            "http://localhost:5000/api/explore"
          );
          setLocations(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  useEffect(() => {
    if (selectedExplore) {
      setSearchTerm(selectedExplore.name);
    } else if (selectedLocationFromState) {
      setSearchTerm(selectedLocationFromState.name);
    } else {
      setSearchTerm("");
    }
  }, [selectedExplore]);

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ height: "88vh", overflowY: "auto" }}>
      <Input
        placeholder="Search location..."
        maxLength={300}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredLocations.map((location, index) => (
        <Card
          key={index}
          hoverable
          style={{ margin: "10px " }}
          // onClick={() => {
          //   setCenter(location.position);
          //   setSelectedLocation(location);
          // }}
          className={
            selectedExplore && selectedExplore._id === location._id
              ? "selected-explore"
              : ""
          }
        >
          <Flex justify="space-between" align="center" vertical>
            <img
              src={location.imageUrl}
              alt={location.name}
              style={{
                width: "300px",
                height: "150px",
                objectFit: "cover",
                alignItems: "center",
                borderRadius: "10px",
              }}
            />
            <Flex style={{ width: "100%" }} gap="0" align="center" vertical>
              <Flex style={{ width: "100%" }} vertical>
                <Flex justify="space-between">
                  <p className="location-name" style={{ fontWeight: "700" }}>
                    Destination: {location.name}
                  </p>
                  <p className="location-rating">
                    <StarFilled /> {location.rating}
                  </p>
                </Flex>
                <Flex justify="space-between">
                  <p className="location-address">
                    <EnvironmentOutlined style={{ marginRight: 5 }} />
                    {location.area}
                  </p>
                </Flex>
              </Flex>
              <Flex
                style={{ paddingLeft: 5, width: "100%" }}
                justify="space-between"
              >
                <Button
                  icon={<EnvironmentOutlined />}
                  onClick={() => {
                    setCenter(location.position);
                    setSelectedLocation(location);
                  }}
                >
                  View on map
                </Button>
                {/* <Button
                  icon={<CompassOutlined />}
                  onClick={() => {
                    // setCenter(location.position);
                    // setSelectedLocation(location);
                    // navigate("/map", {
                    //   state: { location },
                    // });
                    // setbtnStatus(!btnStatus);
                  }}
                >
                  Directions
                </Button> */}
              </Flex>
            </Flex>
          </Flex>
        </Card>
      ))}
    </div>
  );
};

export default ExploreList;
