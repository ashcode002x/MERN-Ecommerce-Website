// src/Components/Search/SearchBar.js
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductList from "../Components/ProductList/ProductList";
import './SearchBar.css'; // Import the CSS file

function SearchBar() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchRef = useRef(null);

  const fetchProducts = async (searchQuery) => {
    try {
      const response = await axios.get(`http://localhost:4000/allproducts?search=${searchQuery}`);
      setProducts(response.data);
    } catch (error) {const searchQuery = req.query.search || '';
      console.log(searchQuery);
      let products;

      if (searchQuery) {
          products = await Product.find({
              $or: [
                  { name: { $regex: searchQuery, $options: 'i' } },
                  { category: { $regex: searchQuery, $options: 'i' } },
              ]
          });
      } else {
          products = await Product.find({});
      }
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      fetchProducts(query);
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div ref={searchRef} className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
      />
      <div className="search-icon"></div>
      {isDropdownVisible && <ProductList products={products} />}
    </div>
  );
  
}

export default SearchBar;
