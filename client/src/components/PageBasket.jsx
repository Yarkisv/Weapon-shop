import React from "react";
import { useCart } from "../contexts/cartContext";
import { useNavigate } from "react-router-dom";

import trash from "../images/trash.svg";
import plus from "../images/plus.svg";
import minus from "../images/minus.svg";

export default function PageBasket() {
  const navigate = useNavigate();
  const {
    orders,
    totalPrice,
    clearCart,
    removeItem,
    decreaceQuantity,
    increaceQuantity,
  } = useCart();

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left">
        Корзина
      </h1>

      <div className="bg-white border border-gray-300 rounded-xl p-4 md:p-6 shadow-md relative">
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
            <div className="relative h-auto overflow-y-auto pr-2 mb-[10px]">
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.product_id}
                    className="flex  sm:flex-row sm:items-center gap-4 border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <img
                      src={`data:image/jpg;base64,${order.image}`}
                      alt={order.name}
                      className="w-[120px] h-[90px] rounded object-contain"
                    />

                    <div className="flex-1 w-full my-auto">
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

                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:ml-auto">
                      <div className="flex sm:flex-row flex-col items-center gap-2">
                        <button
                          onClick={() => decreaceQuantity(order.product_id)}
                          className="w-7 h-7 bg-white border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center"
                        >
                          <img src={minus} alt="-" className="w-3 h-3" />
                        </button>

                        <p className="text-base text-center">
                          {order.quantity}
                        </p>

                        <button
                          onClick={() => increaceQuantity(order.product_id)}
                          className="w-7 h-7 bg-white border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center"
                        >
                          <img src={plus} alt="+" className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(order.product_id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Видалити товар"
                    >
                      <img src={trash} alt="Remove" className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="fixed md:sticky  bottom-0 left-0 w-full md:w-auto bg-white border-t  pt-4 pb-4 md:pb-0 md:pt-4 px-6 flex flex-col justify-between  shadow-inner md:shadow-none">
              <div className="flex ">
                <p className="text-xl font-semibold text-gray-800">
                  Загальна сума:
                </p>
                <p className="text-xl font-bold text-green-700">
                  {totalPrice} ₴
                </p>
              </div>

              <button
                className="cursor-pointer mt-[5px] bg-[#2c4a3e] text-white text-base w-full rounded-md h-11 flex items-center justify-center hover:bg-[#233b32] active:bg-[#1a2c25] hover:scale-[1.01] active:scale-[0.98] transition"
                onClick={() => navigate("/checkout")}
                disabled={orders.length === 0}
              >
                Перейти до оформлення
              </button>
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
