// evaluation.tsx

import React from "react";
import "./Strategy.css"; // You can create a separate CSS file for styling
import Mkt from "../../assets/6974920_4445.svg";
const Strategy: React.FC = () => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: "40px" }}>
          Your bots do the manual work, so you don't have to
        </p>
        <p style={{ fontSize: "24px", width: "50%", margin: "auto" }}>
          Save time for your teams and cut operating costs automating
          conversations across the entire customer journey.
        </p>
      </div>
      <div className="evaluation-container">
        <div className="section marketing">
          <div className="icon">
            <img src={Mkt} alt="Handshake Icon" />
          </div>
          <div className="content">
            <h2>Contact at info@getzio.com</h2>
            <p>
              Make lead generation a two-way street with engaging, human-like
              conversations.
            </p>
          </div>
        </div>

        <div className="section sales">
          <div className="icon">
            <img src={Mkt} alt="Graph Icon" />
          </div>
          <div className="content">
            <h2>10x Booking Appointments</h2>
            <p>
              Increase meetings and show rates with leads who have high interest
              and buying intent.
            </p>
          </div>
        </div>

        <div className="section customer-service">
          <div className="icon">
            <img src={Mkt} alt="Customer Service Icon" />
          </div>
          <div className="content">
            <h2>Provide 24/7 Assistance</h2>
            <p>
              Delight customers by combining bots and human agents for fast,
              friendly response times.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Strategy;
