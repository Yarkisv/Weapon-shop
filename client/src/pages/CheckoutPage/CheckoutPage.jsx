import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useModal } from "../../contexts/modalContext";
import "./CheckoutPage.css";
import { useCart } from "../../contexts/cartContext";

export default function CheckoutPage() {
  const { orders } = useCart();
  const { isBasketOpen, setBasketOpen } = useModal();

  const handleBasketClicked = () => {
    console.log("Basket");
    setBasketOpen(!isBasketOpen);
  };
  return (
    <div className="checkout-page-wrapper">
      <Header />
      <div className="checkout-page">
        <p className="checkout-order-main-text">ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</p>
        <div className="checkout-orders">
          {orders.length > 0 ? (
            <div className="orders">
              {orders.map((order) => (
                <div className="orders-item-checkout" key={order.name}>
                  <div className="orders-item-info-wrapper">
                    <img
                      className="order-image-checkout"
                      src={`data:image/jpg;base64,${order.image}`}
                    />
                    <div className="name-price-checkout">
                      <p className="order-name-checkout">{order.name}</p>
                      <p className="order-price-checkout">{order.price}</p>
                    </div>
                  </div>

                  <div className="order-checkout-edit">
                    <p onClick={handleBasketClicked}>Редагувати товари</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>Нема замовленнь</p>
            </div>
          )}
          <div className="ordering-checkout-wrapper">
            <div className="ordering-checkout">
              <p className="ordering-checkout-atOnce">Разом</p>
              <p className="ordering-checkout-price">
                ? товарів на сумму: ????
              </p>

              <button className="ordering-checkout-order"> Замовити </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
