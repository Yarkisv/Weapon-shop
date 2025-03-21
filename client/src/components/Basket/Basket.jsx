import React, { useEffect, useState } from "react";
import "./Basket.css";

export default function Basket() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("products");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
      console.log(storedOrders);
    }
  }, []);

  const handleClearBasket = () => {
    localStorage.removeItem("products");
    setOrders([]);
  };

  return (
    <div className="basket-container">
      {orders.length > 0 ? (
        orders.map((order) => <div key={order.id}>{order.name}</div>)
      ) : (
        <p>Basket is empty</p>
      )}
      <button className="clear-basket" onClick={handleClearBasket}>
        Clear basket
      </button>
    </div>
  );
}
