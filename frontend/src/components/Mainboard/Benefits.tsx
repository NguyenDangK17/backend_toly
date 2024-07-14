import React from "react";
import "./Benefits.css"; // Import the CSS file for styling
import GrChat from "../../assets/images/Group Chat-cuate.svg";
import HintLocaiton from "../../assets/images/Location search-pana.svg";
import Explore from "../../assets/images/Exploring-cuate.svg";
interface BenefitProps {
  svg: string;
  title: string;
  description: string;
}

const Benefit: React.FC<BenefitProps> = ({ svg, title, description }) => (
  <div className="benefit">
    <img src={svg} alt={title} className="benefit-svg" />
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

const Benefits: React.FC = () => (
  <div className="benefits">
    <h1 className="benefit-header">Benefits</h1>
    <div className="benefits-detail">
      <Benefit
        svg={GrChat}
        title="Group Chat"
        description="Engage in group chats with your friends and colleagues."
      />
      <Benefit
        svg={HintLocaiton}
        title="Hint Location"
        description="Share your location with others in real-time."
      />
      <Benefit
        svg={Explore}
        title="Explore Locations"
        description="Discover and explore locations around you."
      />
    </div>
  </div>
);

export default Benefits;
