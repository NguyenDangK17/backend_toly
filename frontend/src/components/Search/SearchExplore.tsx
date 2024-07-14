import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";
import "./SearchExplore.css";
import { useNavigate } from "react-router-dom";

interface Explore {
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

interface SearchExploreComponentProps {
  initialSearchTerm: string;
}

const SearchExploreComponent: React.FC<SearchExploreComponentProps> = ({
  initialSearchTerm,
}) => {
  const [exploreList, setExploreList] = useState<Explore[]>([]);
  const { user } = ChatState();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchExploreList = async () => {
      try {
        const response = await axios.get<Explore[]>(
          `/api/explore/search/${initialSearchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setExploreList(response.data);
      } catch (error) {
        console.error("Error fetching explore list:", error);
      }
    };

    if (user && user.token && initialSearchTerm) {
      fetchExploreList();
    }
  }, [initialSearchTerm, user]);
  const handleExploreClick = (id: string) => {
    navigate(`/explore/${id}`);
  };
  return (
    <div className="search-results-container">
      <h2>Search Results</h2>
      <div className="explore-list">
        {exploreList.length > 0 ? (
          exploreList.map((explore) => (
            <div
              key={explore._id}
              className="explore-item"
              onClick={() => handleExploreClick(explore._id)}
            >
              <img
                src={explore.imageUrl}
                alt={explore.name}
                className="explore-image"
              />
              <div className="explore-details">
                <h3>{explore.name}</h3>
                <p>Area: {explore.area}</p>
                <p className="rating">Rating: {explore.rating}</p>
                <p className="price">Price Range: {explore.priceRange}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchExploreComponent;
