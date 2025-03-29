import React, { useContext, useEffect, useState } from "react";
import "./Basket.css";
import { useModal } from "../../contexts/modalContext";
import cancel from "../../images/cancel.svg";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/cartContext";

export default function Basket() {
  const { orders, setOrders, clearCart } = useCart();
  const { setBasketOpen } = useModal();

  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = localStorage.getItem("products");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
      console.log(storedOrders);
    }
  }, []);

  const handleClosePanel = () => {
    setBasketOpen(false);
  };

  return (
    <div className="basket-container">
      <img
        src={cancel}
        alt="Close basket"
        className="basket-close"
        onClick={handleClosePanel}
      />
      <button className="clear-basket" onClick={clearCart}>
        Clear basket
      </button>
      {orders.length > 0 ? (
        <div className="basket-items">
          {orders.map((order) => (
            <div key={order.id} className="basket-item">
              <img
                src={`data:image/jpg;base64,${order.image}`}
                alt={order.name}
                className="basket-item-image"
              />
              <div className="basket-item-details">
                <h4 className="basket-order-name">{order.name}</h4>
                <p className="basket-order-characteristics">
                  <strong>Caliber:</strong> {order.caliber}
                </p>
                <p className="basket-order-characteristics">
                  <strong>Code:</strong> {order.code}
                </p>
                <p className="basket-order-characteristics">
                  <strong>Price:</strong> {order.price} $
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="basket-empty">Basket is empty</p>
      )}

      <button onClick={() => navigate("/checkout")}>
        Перейти до оформлення
      </button>
    </div>
  );
}
