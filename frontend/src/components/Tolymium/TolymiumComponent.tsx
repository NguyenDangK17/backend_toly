import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Space } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import "./Tolymium.css";
import Tolymium from "../Mainboard/Tolymium";

const TolymiumComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    beforeChange: (current, next) => setCurrentIndex(next),
    afterChange: (current) => setCurrentIndex(current),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#ccc" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "#ccc" }}
        onClick={onClick}
      />
    );
  }

  return (
    <div className="slider-container">
      {/* <Slider {...settings}>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`slider-price-card ${
              index === currentIndex ? "active" : ""
            } ${
              index === currentIndex - 1 ||
              index === currentIndex + 1 ||
              (currentIndex === 0 && index === 2) ||
              (currentIndex === 2 && index === 0)
                ? "adjacent"
                : ""
            }`}
          >
            <div className="slider-price-header">
              <p className="slider-pre-package-name">Tolymium {index + 1}</p>
              <div className="slider-pre-package-price">
                <h1 className="slider-price-number">{49 + index * 10}.000đ</h1>
                <p className="slider-price-number-time">/month</p>
              </div>
            </div>
            <div className="slider-pre-description">
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
              <Space align="center" size="middle">
                <CheckOutlined /> Some description of this package
              </Space>
            </div>
            <button className="slider-trial-btn">USE TOLYMIUM</button>
          </div>
        ))}
      </Slider> */}
      <Tolymium />
    </div>
  );
};

export default TolymiumComponent;
