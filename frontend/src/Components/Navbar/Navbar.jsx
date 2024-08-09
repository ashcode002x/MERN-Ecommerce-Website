import React, { useContext, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { ShopContext } from "../../Context/ShopContext";
import cart_icon from "../Assets/cart_icon.png";
import dropdown_icon from "../Assets/new_dropdown_icon.png";
import SearchBar from "../../SearchBar/SearchBar";

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const location = useLocation();

  const dropDown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const getLinkStyle = (path) => ({
    borderBottom: location.pathname === path ? "3px solid #00796b" : "3px solid transparent",
    textDecoration: "none",
    color: "black",
  });

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" id="store">
            <path fill="none" d="M0 0h48v48H0z"></path>
            <path d="M40 8H8v4h32V8zm2 20v-4l-2-10H8L6 24v4h2v12h20V28h8v12h4V28h2zm-18 8H12v-8h12v8z"></path>
          </svg>
          <p>CodeCart</p>
        </Link>
      </div>
      <SearchBar />

      <div className="nav-links">
        <ul ref={menuRef} className="nav-menu">
          <li>
            <Link to="/" style={getLinkStyle("/")}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/mens" style={getLinkStyle("/mens")}>
              Men
            </Link>
          </li>
          <li>
            <Link to="/womens" style={getLinkStyle("/womens")}>
              Women
            </Link>
          </li>
          <li>
            <Link to="/kids" style={getLinkStyle("/kids")}>
              Kids
            </Link>
          </li>
        </ul>
      </div>

      <div className="nav-login-cart">
        {localStorage.getItem("auth_token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth_token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="linkStyle">
            <button className="buttonStyle">Login</button>
          </Link>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="Cart Icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
      <img
        onClick={dropDown_toggle}
        className="nav-dropdown"
        src={dropdown_icon}
        alt="Dropdown Icon"
      />
    </div>
  );
};

export default Navbar;
  