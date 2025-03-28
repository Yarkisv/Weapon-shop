import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./CheckoutPage.css";

export default function CheckoutPage() {
    const [orders, setOrders] = useState(() => {
      const savedProducts = localStorage.getItem("products");
      return savedProducts ? JSON.parse(savedProducts) : [];
    });

  return (
    <div className="checkout-page">
      <Header />
      {orders.length > 0 ? (
        <div className="orders">
          {orders.map((order) => (
            <div className="orders-item" key={order.id}>
              <img
                className="order-image"
                src={`data:image/jpg;base64,${order.image}`}
              />
              <p className="order-name">{order.name}</p>
              <p className="order-price">{order.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>Нема замовленнь</p>
        </div>
      )}
    </div>
  );
}
