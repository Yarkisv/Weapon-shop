import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./CheckoutPage.css";
import { useCart } from "../../contexts/cartContext";

export default function CheckoutPage() {
  const { orders } = useCart();

  return (
    <div className="checkout-page-wrapper">
      <Header />
      <div className="checkout-page">
        {orders.length > 0 ? (
          <div className="orders">
            {orders.map((order) => (
              <div className="orders-item-checkout" key={order.name}>
                <img
                  className="order-image-checkout"
                  src={`data:image/jpg;base64,${order.image}`}
                />
                <div className="name-price-checkout">
                  <p className="order-name-checkout">{order.name}</p>
                  <p className="order-price-checkout">{order.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>Нема замовленнь</p>
          </div>
        )}
        <div className="ordering-checkout">
          <p>Разом</p>
        </div>
      </div>
    </div>
  );
}
