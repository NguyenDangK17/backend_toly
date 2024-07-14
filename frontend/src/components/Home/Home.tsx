import { Button, Carousel, Input } from "antd";
import React, { useState } from "react";
import "./Home.css";
import { SearchOutlined } from "@ant-design/icons";
import TopExplore from "../Mainboard/TopExplore";
import { useNavigate } from "react-router-dom";
import SearchExplore from "../../pages/SearchExplore";
import NewExplore from "./NewExplore";
const Home = () => {
  const slides = [
    {
      title: "Discover and Share Locations with Ease",
      description:
        "With just a few simple steps, users can effortlessly share their current location with friends and family, ensuring a quick and accurate connection.",
    },
    {
      title: "Intelligent Exploration at Your Fingertips",
      description:
        "Toly suggests nearby locations tailored to users' interests. With just a few taps, users can embark on thrilling adventures, effortlessly discovering new and captivating places along the way.",
    },
    {
      title: "Group-Friendly Location Recommendations",
      description:
        "Our innovative feature suggests locations ensure a balanced distance for all group members. Explore together and find the perfect meeting spot effortlessly.",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/searchExplore?query=${searchTerm}`);
  };

  return (
    <div className="home-container">
      <div className="home-banner">
        <img
          src="https://images.unsplash.com/photo-1613310023042-ad79320c00ff?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="home-img-carousel"
        />
        <div className="home-heading-container">
          <div className="home-heading-left">
            <h1 className="home-heading">Unleash your journey's potential</h1>
            <div className="search-bar-home">
              <Input
                size="large"
                placeholder="Search name"
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-home"
              />
              <Button size="large" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
          <div className="home-heading-right">
            <Carousel>
              {slides.map((slide, index) => (
                <div key={index} className="carousel-slide">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <TopExplore />
      <NewExplore />
    </div>
  );
};

export default Home;
