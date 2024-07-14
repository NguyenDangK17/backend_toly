import React from "react";
import "./Mainboard.css";
import Banner from "../Banner/Banner";
import Strategy from "../Strategy/Strategy";
import Different from "../Different/Different";
import TopExplore from "./TopExplore";
import Benefits from "./Benefits";
import Tolymium from "./Tolymium";

const MainBoard: React.FC = () => {
  return (
    <div className="mainboard-container">
      <Banner />
      <TopExplore />
      <Benefits />
      <Tolymium />
    </div>
  );
};

export default MainBoard;
