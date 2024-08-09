import React, { useState } from 'react';
import axios from 'axios';

function App({ data }) {
  const [item, setitem] = useState({
    price: data.amount,
    name: "",
    
  });

  const initPay = (data) => {
    if (window.Razorpay) {
      const options = {
        key: "************************",
        amount: data.amount,
        currency: data.currency,
        name: item.name,
        description: "Test",
        image: "https://images.pexels.com/photos/3490360/pexels-photo-3490360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyURL = "https://localhost:4000/api/payment/verify";
            const result = await axios.post(verifyURL, response);
            console.log(result.data);
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } else {
      console.error("Razorpay SDK not loaded");
    }
  };

  const handlePay = async () => {
    try {
      const orderURL = "https://localhost:4000/api/payment/orders";
      const response = await axios.post(orderURL, { amount: item.price });
      console.log(response.data);
      initPay(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="item_container">
        <p className="item_price">Price: {item.price}</p>
        <button onClick={() => initPay(data)} className="buyBtn">Buy items</button>
      </div>
    </div>
  );
}

export default App;
