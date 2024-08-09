// src/Components/ProductList/ProductList.js
import React from "react";
import "./ProductList.css";
import { Link } from "react-router-dom";

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((product) => (
          <Link to={`/product/${product.id}`} style={{ width: '100%', textDecoration: "none" }} >
            <div key={product.id} className="product-list-item">
              {product.name}
            </div>
          </Link>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default ProductList;
