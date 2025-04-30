import React from "react";
import { useModal } from "../contexts/modalContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cartContext";
import cancel from "../images/cancel.svg";
import plus from "../images/plus.svg";
import minus from "../images/minus.svg";
import trash from "../images/trash.svg";

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
    <>
      <div
        className="fixed inset-0 bg-black/40 z-[9998]"
        onClick={handleClosePanel}
      />

      <div className="fixed flex flex-col overflow-hidden z-[9999] right-0 top-0 bg-white text-black rounded-l-lg w-[380px] h-full shadow-lg border-l border-gray-300">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-300">
          <img
            src={cancel}
            alt="Close basket"
            className="w-[28px] h-[28px] cursor-pointer filter contrast-0 brightness-0 hover:opacity-70 text-black"
            onClick={handleClosePanel}
          />
          <button
            className=" text-sm text-red-600  font-medium hover:underline cursor-pointer"
            onClick={clearCart}
          >
            Очистити
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded">
          {orders.length > 0 ? (
            <div className="flex flex-col gap-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-start gap-3 border border-gray-200 bg-gray-50 p-2 rounded-lg shadow-sm"
                >
                  <img
                    src={`data:image/jpg;base64,${order.image}`}
                    alt={order.name}
                    className="w-[75px] h-[75px] rounded object-contain border border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-[#9b181a] text-base font-bold leading-4">
                        {order.name}
                      </h4>
                      <button
                        className="p-1"
                        onClick={() => removeItem(order.product_id)}
                      >
                        <img
                          className="w-5 h-5 hover:scale-110 cursor-pointer"
                          src={trash}
                          alt="Remove item"
                        />
                      </button>
                    </div>
                    <p className="text-sm mt-1 text-gray-700">
                      <strong>Калібр:</strong> {order.caliber}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Код:</strong> {order.code}
                    </p>
                    <p className="text-sm text-gray-800 font-semibold">
                      <strong>Ціна:</strong> {order.price} ₴
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded"
                        onClick={() => decreaceQuantity(order.product_id)}
                      >
                        <img className="w-4 h-4" src={minus} alt="Decrease" />
                      </button>
                      <span className="text-base font-medium">
                        {order.quantity}
                      </span>
                      <button
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded"
                        onClick={() => increaceQuantity(order.product_id)}
                      >
                        <img className="w-4 h-4" src={plus} alt="Increase" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full text-gray-500 text-base">
              Ви не додали жодного товару
            </div>
          )}
        </div>

        <div className="border-t border-gray-300 p-3 bg-white">
          <p className="font-semibold text-lg text-black mb-2">
            Загальна сума: {totalPrice} ₴
          </p>
          <button
            className="cursor-pointer bg-[#2c4a3e] text-white text-base w-full rounded-md h-11 flex items-center justify-center hover:bg-[#233b32] active:bg-[#1a2c25] hover:scale-[1.01] active:scale-[0.98] transition"
            onClick={() => navigate("/checkout")}
            disabled={orders.length === 0}
          >
            Перейти до оформлення
          </button>
        </div>
      </div>
    </>
  );
}
