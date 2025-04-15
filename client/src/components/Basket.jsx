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

      {orders.length > 0 ? (
        <div className="flex flex-col gap-[15px] max-h-[80vh] overflow-y-auto pr-[10px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center gap-[15px] border-2 border-black bg-gray-200 p-2 ml-2 rounded-md"
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
                <h4 className="text-[#9b181a] text-lg font-sans m-0">
                  {order.name}
                </h4>
                <p className="text-black text-base font-sans m-0 pt-1">
                  <strong>Caliber:</strong> {order.caliber}
                </p>
                <p className="text-black text-base font-sans m-0 pt-1">
                  <strong>Code:</strong> {order.code}
                </p>
                <p className="text-black text-base font-sans m-0 pt-1">
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
        <div className="flex flex-1 justify-center items-center">
          <div className="flex flex-col items-center gap-4 border-2 border-[#9b181a] rounded-md p-4 shadow-md">
            <img src={sponge} className="w-[200px] h-[300px]" alt="Порожньо" />
            <p className="text-[#9b181a] text-xl font-sans text-center">
              Коризна порожня
            </p>
          </div>
        </div>
      )}

      {orders.length > 0 && (
        <p className="font-sans text-2xl ml-2 mt-1">
          {`Загальна сума: ${totalPrice}`} ₴
        </p>
      )}
      <button
        className="bg-[#2c4a3e] text-white font-sans text-xl w-full rounded-t-md h-[45px] flex items-center justify-center mt-auto hover:bg-[#233b32] active:bg-[#1a2c25] hover:scale-[1.005] active:scale-[0.98]"
        onClick={() => navigate("/checkout")}
      >
        Перейти до оформлення
      </button>
    </div>
  );
}
