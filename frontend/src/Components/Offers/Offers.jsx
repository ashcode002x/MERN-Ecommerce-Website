import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.png";

const Offers = () => {
  return (
    <div className="offers" style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", padding:"20px", background:"linear-gradient(135deg, #f5f7fa, #c3cfe2)", borderRadius:"10px", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button>Check Now</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="Exclusive" />
      </div>
    </div>
  );
};

export default Offers;
