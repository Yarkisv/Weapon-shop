import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/cartContext";

import trash from "../images/trash.svg";
import plus from "../images/plus.svg";
import minus from "../images/minus.svg";

export default function PageBasket() {
  const {
    orders,
    totalPrice,
    clearCart,
    removeItem,
    decreaceQuantity,
    increaceQuantity,
  } = useCart();

  return (
    <div className="Basket">
      <button className="ml-auto pr-2 pt-1 cursor-pointer" onClick={clearCart}>
        <img
          className="w-[30px] h-[30px] hover:scale-110 active:scale-95"
          src={trash}
          alt="Clear basket"
        />
      </button>
      {orders.length > 0 ? (
        <div className="basket-page-items">
          {orders.map((order) => (
            <div key={order.product_id} className="basket-page-item">
              <img
                src={`data:image/jpg;base64,${order.image}`}
                className="basket-page-item-image"
              />
              <button
                className="bg-transparent border-none cursor-pointer"
                onClick={() => removeItem(order.product_id)}
              >
                <img
                  className="w-[30px] h-[30px] hover:scale-110 active:scale-95"
                  src={trash}
                  alt="Remove item"
                />
              </button>
              <div className="basket-page-item-details">
                <h4 className="basket-page-order-name">{order.name}</h4>
                <p className="basket-page-order-characteristics">
                  <p>Code:</p> {order.article}
                </p>
                <p className="basket-page-order-characteristics">
                  <p>Price:</p> {order.price} $
                </p>
              </div>
              <div className="flex items-center justify-center gap-[10px]">
                <button
                  className="w-[20px] h-[20px] flex items-center justify-center"
                  onClick={() => decreaceQuantity(order.product_id)}
                >
                  <img
                    className="w-full h-full object-contain cursor-pointer"
                    src={minus}
                    alt="Decrease"
                  />
                </button>
                <p className="text-xl font-sans m-0">{order.quantity}</p>
                <button
                  className="w-[20px] h-[20px] flex items-center justify-center"
                  onClick={() => increaceQuantity(order.product_id)}
                >
                  <img
                    className="w-full h-full object-contain cursor-pointer"
                    src={plus}
                    alt="Increase"
                  />
                </button>
              </div>
            </div>
          ))}
          {orders.length > 0 && (
            <p className="font-sans text-2xl ml-2 mt-1">
              {`Загальна сума: ${totalPrice}`} ₴
            </p>
          )}
        </div>
      ) : (
        <p className="basket-page-empty">No orders yet</p>
      )}
    </div>
  );
}
