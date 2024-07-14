// Different.tsx

import React from "react";
import "./Different.css"; // Import the corresponding CSS file

const Different: React.FC = () => {
  return (
    <div className="different-container">
      <p style={{ textAlign: "center", color: "#33405e", fontSize: "40px" }}>
        What makes Landbot different
      </p>
      <div className="card-container">
        <div className="card">
          <img
            src="https://assets-global.website-files.com/5e1c4fb5db4d5243c0021d34/651691538c6b54eb527b0cfd_Layer_1%20(2).png"
            alt="Green Icon"
          />
          <h2>Easy, Flexible Setup</h2>
          <p>
            Build chatbots that impress and engage your customers in little
            time.
          </p>
        </div>

        <div className="card">
          <img
            src="https://assets-global.website-files.com/5e1c4fb5db4d5243c0021d34/651691534360c2e04965f360_Vector%20(10).png"
            alt="Yellow Icon"
          />
          <h2>Built-in Integrations</h2>
          <p>
            Connect your bot to existing tech stacks, so you have all the data
            right where you want it.
          </p>
        </div>

        <div className="card">
          <img
            src="https://assets-global.website-files.com/5e1c4fb5db4d5243c0021d34/6516914c1d2c66f7761f6e72_Group%20996%20(1).png"
            alt="Teal Icon"
          />
          <h2>Bot-to-Human Handoff</h2>
          <p>
            Allow your bot to work alone and hand over to humans whenever
            needed.
          </p>
        </div>

        <div className="card">
          <img
            src="https://assets-global.website-files.com/5e1c4fb5db4d5243c0021d34/6516914d7104e01bc421ba0d_Group%20991%20(1).png"
            alt="Orange Icon"
          />
          <h2>Educational Resources</h2>
          <p>
            Access ready-made templates, course articles, or contact us for
            additional support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Different;
