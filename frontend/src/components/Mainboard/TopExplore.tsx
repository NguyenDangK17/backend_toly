import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TopExplore.css";
import { useNavigate } from "react-router-dom";
interface ExploreData {
  _id: string;
  name: string;
  imageUrl: string;
  rating: number;
}

const TopExplore: React.FC = () => {
  const [exploreData, setExploreData] = useState<ExploreData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ExploreData[]>(
          "http://localhost:5000/api/explore"
        );
        console.log(response.data);

        // Filter destinations with rating > 4.5 and sort them by rating in descending order
        const filteredData = response.data
          .filter((destination) => destination.rating > 4.5)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4); // Get top 4 destinations

        setExploreData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="top-explore">
      <h1>Top Vacation Destinations</h1>
      <div className="destinations">
        {exploreData.map((destination) => (
          <div
            key={destination._id}
            className="destination"
            onClick={() => navigate(`/explore/${destination._id}`)}
          >
            <img src={destination.imageUrl} alt={destination.name} />
            <h2>{destination.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopExplore;
