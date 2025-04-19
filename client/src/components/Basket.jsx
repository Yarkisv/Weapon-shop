import React from "react";
import { useModal } from "../contexts/modalContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/cartContext";
import sponge from "../images/sponge.svg";
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
    <div className="fixed flex flex-col overflow-hidden z-[9999] right-0 top-0 bg-gray-300 rounded-l-md w-[500px] h-full">
      {/* Header */}
      <div className="flex items-center justify-between mt-1 mb-2">
        <img
          src={cancel}
          alt="Close basket"
          className="w-[35px] h-[35px] pl-2 pt-1 cursor-pointer hover:opacity-70 invert"
          onClick={handleClosePanel}
        />
        <button
          className="ml-auto pr-2 pt-1 cursor-pointer"
          onClick={clearCart}
        >
          <img
            className="w-[30px] h-[30px] hover:scale-110 active:scale-95"
            src={trash}
            alt="Clear basket"
          />
        </button>
      </div>

      {/* Orders list */}
      <div className="flex-1 overflow-y-auto pr-[10px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded">
        {orders.length > 0 ? (
          <div className="flex flex-col gap-[15px]">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center gap-[15px] border-1 border-black/30 bg-gray-200 p-2 ml-2 rounded-md"
              >
                <img
                  src={`data:image/jpg;base64,${order.image}`}
                  alt={order.name}
                  className="w-[100px] h-[100px] rounded object-contain"
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
                <div className="flex-1">
                  <h4 className="text-[#9b181a] text-lg font-['M_PLUS_2'] m-0">
                    {order.name}
                  </h4>
                  <p className="text-black text-base font-['M_PLUS_2'] m-0 pt-1">
                    <strong>Caliber:</strong> {order.caliber}
                  </p>
                  <p className="text-black text-base font-['M_PLUS_2'] m-0 pt-1">
                    <strong>Code:</strong> {order.code}
                  </p>
                  <p className="text-black text-base font-['M_PLUS_2']  m-0 pt-1">
                    <strong>Price:</strong> {order.price} ₴
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
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-black text-xl font-sans text-center border border-black rounded-md p-4 shadow-md">
              Корзина порожня
            </div>
          </div>
        )}
      </div>

      {/* нижняя шляпа */}
      <div className="border-t border-gray-400 p-2 bg-gray-300">
        <p className="font-sans text-2xl text-left">
          {`Загальна сума: ${totalPrice}`} ₴
        </p>
        <button
          className="bg-[#2c4a3e] text-white cursor-pointer font-sans text-xl w-full rounded-md h-[45px] flex items-center justify-center mt-2 hover:bg-[#233b32] active:bg-[#1a2c25] hover:scale-[1.005] active:scale-[0.98]"
          onClick={() => navigate("/checkout")}
          disabled={orders.length === 0}
        >
          Перейти до оформлення
        </button>
      </div>
    </div>
  );
}
