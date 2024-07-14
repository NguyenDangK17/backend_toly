import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./NewExplore.css";
import { useNavigate } from "react-router-dom";
interface ExploreData {
  _id: string;
  name: string;
  imageUrl: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

const NewExplore: React.FC = () => {
  const [exploreData, setExploreData] = useState<ExploreData[]>([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get<ExploreData[]>(
        "http://localhost:5000/api/explore"
      );
      console.log(response.data);

      const latestData = response.data
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 4);

      setExploreData(latestData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="top-explore">
      <h1>New Destinations</h1>
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

export default NewExplore;
