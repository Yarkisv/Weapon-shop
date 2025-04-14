import React, { useContext, useEffect, useState } from "react";
import "./Basket.css";
import { useModal } from "../../contexts/modalContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/cartContext";

import cancel from "../../images/cancel.svg";
import plus from "../../images/plus.svg";
import minus from "../../images/minus.svg";
import trash from "../../images/trash.svg";

export default function Basket() {
  const {
    orders,
    totalPrice,
    clearCart,
    removeItem,
    decreaceQuantity,
    increaceQuantity,
  } = useCart();
  const { setBasketOpen } = useModal();

  const navigate = useNavigate();

  const handleClosePanel = () => {
    setBasketOpen(false);
  };

  return (
    <div className="basket-container">
      <div className="close-clear-basket">
        <img
          src={cancel}
          alt="Close basket"
          className="basket-close"
          onClick={handleClosePanel}
        />
        <button className="clear-basket" onClick={clearCart}>
          <img className="clear-basket-img" src={trash} />
        </button>
      </div>
      {orders.length > 0 ? (
        <div className="basket-items">
          {orders.map((order) => (
            <div key={order.id} className="basket-item">
              <img
                src={`data:image/jpg;base64,${order.image}`}
                alt={order.name}
                className="basket-item-image"
              />
              <button
                className="remove-item-button"
                onClick={() => removeItem(order.product_id)}
              >
                <img className="clear-basket-img" src={trash} />
              </button>
              <div className="basket-item-details">
                <h4 className="basket-order-name">{order.name}</h4>
                <p className="basket-order-characteristics">
                  <strong>Caliber:</strong> {order.caliber}
                </p>
                <p className="basket-order-characteristics">
                  <strong>Code:</strong> {order.code}
                </p>
                <p className="basket-order-characteristics">
                  <strong>Price:</strong> {order.price} ₴
                </p>
              </div>
              <div className="quantity-changes">
                <button
                  className="quantity-button"
                  onClick={() => decreaceQuantity(order.product_id)}
                >
                  <img className="quantity-button-img" src={minus} />
                </button>
                <p className="quantity-button-number">{order.quantity}</p>
                <button
                  className="quantity-button"
                  onClick={() => increaceQuantity(order.product_id)}
                >
                  <img className="quantity-button-img" src={plus} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="basket-empty-wrapper">
          <p className="basket-empty">Коризна порожня</p>
        </div>
      )}

      {orders.length > 0 && (
        <p className="total-price">{`Загальна сума: ${totalPrice}`} ₴</p>
      )}
      <button className="order-placement" onClick={() => navigate("/checkout")}>
        Перейти до оформлення
      </button>
    </div>
  );
}
