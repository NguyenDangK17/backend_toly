import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import MainBoard from "../components/Mainboard/Mainboard";

const Landingpage: React.FC = () => {
  return (
    <>
      <Navbar />
      <MainBoard />
      <Footer />
    </>
  );
};

export default Landingpage;
