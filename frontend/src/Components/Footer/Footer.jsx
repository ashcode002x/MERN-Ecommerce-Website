import React from "react";
import "./Footer.css";
// import footer_logo from "../Assets/logo_big.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pinterest_icon from "../Assets/pinterest_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        {/* <img src={footer_logo} alt='' /> */}
        <span className="logo" style={{scale:"1.5"}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            id="store"
          >
            <path fill="none" d="M0 0h48v48H0z"></path>
            <path d="M40 8H8v4h32V8zm2 20v-4l-2-10H8L6 24v4h2v12h20V28h8v12h4V28h2zm-18 8H12v-8h12v8z"></path>
          </svg>
        </span>
        <p>QuickCart</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={pinterest_icon} alt="" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="" />
        </div>
      </div>

      <div className="footer-copyright">
        <hr />
        <p>Copyright @2024 - All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
