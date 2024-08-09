import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
import new_hero_image from "../Assets/new_hero_image.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero" style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"25vw" }}>
      <div className="hero-left" style={{display:"flex", flexDirection:"column", justifyContent:"center", gap:"20px", alignItems:"center" }}>
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="Hand Icon" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <Link style={{ textDecoration: "none" }} to="/mens">
          <div className="hero-latest-button">
            <div>
              Latest Collection
              <img src={arrow_icon} alt="Arrow Icon" />
            </div>
          </div>
        </Link>
      </div>
      <div className="hero-right">
        <img src={new_hero_image} alt="Hero" />
      </div>
    </div>
  );
};

export default Hero;
