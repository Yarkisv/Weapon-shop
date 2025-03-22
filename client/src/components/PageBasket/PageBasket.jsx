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
            {orders.length > 0 ? (
              <div className="basket-page-items">
                {orders.map((order) => (
                  <div key={order.id} className="basket-page-item">
                    <img src={order.image} alt={order.name} className="basket-page-item-image" />
                    <div className="basket-page-item-details">
                      <h4 className="basket-page-order-name">{order.name}</h4>
                      <p className="basket-page-order-characteristics"><strong>Caliber:</strong> {order.caliber}</p>
                      <p className="basket-page-order-characteristics"><strong>Code:</strong> {order.code}</p>
                      <p className="basket-page-order-characteristics"><strong>Price:</strong> {order.price} $</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="basket-page-empty">No orders yet</p>
            )}
    </div>
  );
}
