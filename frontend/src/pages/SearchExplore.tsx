import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import SearchExploreComponent from "../components/Search/SearchExplore";

const SearchExplore: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  return (
    <>
      <Navbar />
      <SearchExploreComponent initialSearchTerm={searchTerm || ""} />
      <Footer />
    </>
  );
};

export default SearchExplore;
