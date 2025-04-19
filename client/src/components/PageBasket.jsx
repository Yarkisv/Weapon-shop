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
    <div className="ml-5 mt-5 w-[1015px] relative">
      <h1 className="text-2xl mb-[15px] font-bold text-gray-800">Корзина</h1>

      <div className="min-h-[400px] border border-[#585858] p-4 pt-6 bg-white rounded">
        <div className="flex justify-end mb-4">
          <button onClick={clearCart}>
            <img
              className="w-[24px] h-[24px] hover:scale-110 active:scale-95 transition-transform"
              src={trash}
              alt="Clear basket"
            />
          </button>
        </div>

        {orders.length > 0 ? (
          <>
            {/* Список заказов */}
            <div className="flex flex-col gap-3 max-h-[460px] overflow-y-auto pr-2">
              {orders.map((order) => (
                <div
                  key={order.product_id}
                  className="flex items-center gap-3 border bg-gray-100 border-black/30 p-2 rounded-md"
                >
                  <img
                    src={`data:image/jpg;base64,${order.image}`}
                    alt={order.name}
                    className="w-[120px] h-[90px] rounded object-contain"
                  />

                  <button
                    className="bg-transparent border-none"
                    onClick={() => removeItem(order.product_id)}
                  >
                    <img
                      className="w-[20px] h-[20px] hover:scale-110 active:scale-95 transition-transform"
                      src={trash}
                      alt="Remove item"
                    />
                  </button>

                  <div className="flex-1">
                    <h4 className="text-[14px] font-['M_PLUS_2'] text-[#9b181a] m-0">
                      {order.name}
                    </h4>
                    <p className="text-[13px] font-['M_PLUS_2'] text-black m-0 pt-1">
                      <span className="font-semibold">Code:</span>{" "}
                      {order.article}
                    </p>
                    <p className="text-[13px] font-['M_PLUS_2'] text-black m-0 pt-1">
                      <span className="font-semibold">Price:</span>{" "}
                      {order.price} $
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-1">
                    <button
                      className="w-4 h-4 flex items-center justify-center"
                      onClick={() => decreaceQuantity(order.product_id)}
                    >
                      <img
                        className="w-full h-full object-contain cursor-pointer"
                        src={minus}
                        alt="Decrease"
                      />
                    </button>
                    <p className="text-base font-sans m-0">{order.quantity}</p>
                    <button
                      className="w-4 h-4 flex items-center justify-center"
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
            </div>

            {/* Общая сумма */}
            <div className="sticky bottom-0 left-0 w-full bg-white border-t border-gray-300 pt-3 mt-4">
              <p className="text-lg font-sans ml-1">
                Загальна сума: {totalPrice} ₴
              </p>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-[400px]">
            <div className="w-[300px] flex flex-col items-center gap-4 border-2 border-black rounded-md p-4 shadow-md">
              <p className="text-black text-xl font-sans text-center">
                Корзина порожня
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
