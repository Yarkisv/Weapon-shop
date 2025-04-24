import React from "react";
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
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Корзина</h1>

      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md relative">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg text-gray-600">Ваші товари</p>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 transition cursor-pointer"
            title="Очистити корзину"
          >
            <img src={trash} alt="Clear basket" className="w-5 h-5" />
          </button>
        </div>

        {orders.length > 0 ? (
          <>
            <div className="relative h-auto overflow-y-auto pr-2 mb-24">
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.product_id}
                    className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <img
                      src={`data:image/jpg;base64,${order.image}`}
                      alt={order.name}
                      className="w-[100px] h-[80px] rounded object-contain"
                    />

                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-gray-800">
                        {order.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Код:</span>{" "}
                        {order.article}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Ціна:</span> {order.price}{" "}
                        ₴
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaceQuantity(order.product_id)}
                        className="w-6 h-6 bg-white border border-gray-300 cursor-pointer rounded hover:bg-gray-100 flex items-center justify-center"
                      >
                        <img src={minus} alt="-" className="w-3 h-3" />
                      </button>

                      <p className="text-base w-6 text-center">
                        {order.quantity}
                      </p>

                      <button
                        onClick={() => increaceQuantity(order.product_id)}
                        className="w-6 h-6 bg-white border border-gray-300 cursor-pointer rounded hover:bg-gray-100 flex items-center justify-center"
                      >
                        <img src={plus} alt="+" className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(order.product_id)}
                      className="ml-4 text-red-500 hover:text-red-700 cursor-pointer transition"
                      title="Видалити товар"
                    >
                      <img src={trash} alt="Remove" className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 pb-2 left-0 bg-white border-t pt-4 flex justify-between items-center px-6 shadow-md ">
              <p className="text-xl font-semibold text-gray-800">
                Загальна сума:
              </p>
              <p className="text-xl font-bold text-green-700">{totalPrice} ₴</p>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-[300px]">
            <div className="text-center text-gray-500 text-lg">
              Ваша корзина порожня
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
