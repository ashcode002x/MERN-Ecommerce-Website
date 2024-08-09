import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import ShopContextProvider from "./Context/ShopContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ShopContextProvider>
        <App />
    </ShopContextProvider>
);
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>

reportWebVitals();
