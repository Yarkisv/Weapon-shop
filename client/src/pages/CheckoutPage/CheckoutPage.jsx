import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useModal } from "../../contexts/modalContext";
import "./CheckoutPage.css";
import { useCart } from "../../contexts/cartContext";
import editOrder from "../../images/editOrder.svg";
import geo from "../../images/geo.svg";

export default function CheckoutPage() {
  const { orders, totalPrice } = useCart();
  const { isBasketOpen, setBasketOpen } = useModal();

  const handleBasketClicked = () => {
    console.log("Basket");
    setBasketOpen(!isBasketOpen);
  };
  return (
    <div className="checkout-page-wrapper">
      <Header />
      <div className="checkout-page">
        <p className="checkout-order-main-text">Оформлення замовлення</p>
        <div className="checkout-orders">
          {orders.length > 0 ? (
            <div className="orders-wrapper">
              <div className="orders">
                <div className="ordering-checkout-in-order-edit">
                  <p className="ordering-checkout-in-order">
                    Товари у замовленні{" "}
                  </p>
                  <p
                    className="order-checkout-edit"
                    onClick={handleBasketClicked}
                  >
                    Редагувати товари
                    <img src={editOrder} />
                  </p>
                </div>

                {orders.map((order) => (
                  <div className="orders-item-checkout" key={order.name}>
                    <div className="orders-item-info-wrapper">
                      <img
                        className="order-image-checkout"
                        src={`data:image/jpg;base64,${order.image}`}
                      />
                      <div className="name-price-checkout">
                        <p className="order-name-checkout">{order.name}</p>
                        <p className="order-price-checkout">{order.price}₴</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-delivery">
                <p className="ordering-checkout-in-order">Доставка</p>
                <div className="radio-delivery">
                  <p className="self-delivery">Самовивіз</p>
                  <p className="choose-store">Оберіть зручний магазин:</p>

                  <label className="custom-radio">
                    <input type="radio" name="store" value="option1" />
                    <span className="radio-check"></span>
                    Майдан Конституції 9
                    <img src={geo} alt="geo icon" className="geo-icon" />
                  </label>

                  <label className="custom-radio">
                    <input type="radio" name="store" value="option2" />
                    <span className="radio-check"></span>
                    Проспект Незалежності 5
                    <img src={geo} alt="geo icon" className="geo-icon" />
                  </label>
                </div>
              </div>
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
                товарів на суму: {totalPrice} ₴
              </p>

              <button className="ordering-checkout-order"> Замовити </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
