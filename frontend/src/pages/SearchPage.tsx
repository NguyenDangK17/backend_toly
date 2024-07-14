import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import SearchUsers from "../components/Search/SearchUser";
import Footer from "../components/Footer/Footer";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  return (
    <>
      <Navbar />
      <SearchUsers initialSearchTerm={searchTerm || ""} />
      <Footer />
    </>
  );
};

export default SearchPage;
