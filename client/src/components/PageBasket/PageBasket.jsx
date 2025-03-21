import React, { useEffect, useState } from "react";
import "./PageBasket.css";

export default function PageBasket() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem("products");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
      console.log(storedOrders);
    }
  }, []);

  return (
    <div className="Basket">
      <p>Basket</p>
      {orders.length > 0 ? orders.map((order) => <div>{order.name}</div>) : <div>No orders yet</div>}
    </div>
  );
}
