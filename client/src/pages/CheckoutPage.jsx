import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import { useModal } from "../contexts/modalContext";
import { useCart } from "../contexts/cartContext";
import { useNavigate } from "react-router-dom";
import editOrder from "../images/editOrder.svg";
import sponge from "../images/sponge.svg";
import geo from "../images/geo.svg";
import axios from "axios";

export default function CheckoutPage() {
  const { orders, totalPrice } = useCart();
  const { isBasketOpen, setBasketOpen } = useModal();

  const [selectedStore, setSelectedStore] = useState("");

  const navigate = useNavigate();

  const handleBasketClicked = () => {
    setBasketOpen(!isBasketOpen);
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const goToPayment = async () => {
    const response = await axios.post("http://localhost:3000/order", {
      phome: user.phone,
      orderDate: "",
      totalPrice: totalPrice,
      orderItems: orders,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-[1440px] mx-auto px-4 py-6">
        <p className="text-center text-3xl font-semibold mb-6">
          Оформлення замовлення
        </p>
        <div className="flex flex-wrap gap-6">
          {orders.length > 0 ? (
            <>
              <div className="flex flex-col gap-6 w-full lg:w-[1000px]">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-2xl font-bold ml-2">
                      Товари у замовленні
                    </p>
                    <p
                      className="flex items-center text-blue-900 cursor-pointer gap-2 hover:underline mr-2"
                      onClick={handleBasketClicked}
                    >
                      Редагувати товари
                      <img src={editOrder} alt="Edit" className="w-5 h-5" />
                    </p>
                  </div>
                  {orders.map((order) => (
                    <div
                      key={order.name}
                      className="flex items-center mb-[20px] bg-gray-100 border-2 border-green-900 rounded-md p-4 ml-2"
                    >
                      <img
                        className="w-20 h-20 object-contain"
                        src={`data:image/jpg;base64,${order.image}`}
                        alt={order.name}
                      />
                      <div className="flex justify-between w-full">
                        <p className="text-lg font-semibold ml-[10px]">
                          {order.name}
                        </p>
                        <p className="text-lg font-semibold">{order.price} ₴</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-100 border-2 border-green-900 rounded-md p-4 ml-2">
                  <p className="text-2xl font-bold mb-4">Доставка</p>
                  <p className="text-lg font-semibold mb-2">Самовивіз</p>
                  <p className="text-base text-gray-600 mb-4">
                    Оберіть зручний магазин:
                  </p>
                  <div className="space-y-4">
                    {[
                      { label: "Майдан Конституції 9", value: "option1" },
                      { label: "Проспект Незалежності 5", value: "option2" },
                    ].map((store) => (
                      <label
                        key={store.value}
                        className="flex items-center gap-4 cursor-pointer hover:bg-green-100 p-2 rounded-md transition"
                      >
                        <input
                          type="radio"
                          name="store"
                          value={store.value}
                          checked={selectedStore === store.value}
                          onChange={() => setSelectedStore(store.value)}
                          className="hidden"
                        />
                        <span className="w-5 h-5 border-2 border-green-500 rounded-full flex items-center justify-center">
                          <span
                            className={`w-3 h-3 bg-green-500 rounded-full transition-transform ${
                              selectedStore === store.value
                                ? "scale-100"
                                : "scale-0"
                            }`}
                          ></span>
                        </span>
                        {store.label}
                        <img src={geo} alt="geo" className="w-5 h-5 ml-auto" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-[300px] bg-gray-200 rounded-lg p-4 h-[350px] flex flex-col justify-between">
                <div>
                  <p className="text-2xl font-bold">Разом</p>
                  <p className="text-base mt-2">
                    товарів на суму: {totalPrice} ₴
                  </p>
                  <p>Ім'я: {user.firstname}</p>
                  <p>Прiзввище: {user.lastname}</p>
                  <p>Телефон: {user.phone}</p>
                </div>
                <button
                  className="bg-green-500 text-white w-full py-2 rounded-md text-lg font-semibold hover:bg-green-600 cursor-pointer transition"
                  onClick={goToPayment}
                >
                  Перейти до оплати
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-red-500 text-xl font-semibold w-full">
              <div className="flex flex-1 justify-center items-center">
                <div className="flex flex-col items-center gap-4 border-2 border-[#9b181a] rounded-md p-4 shadow-md">
                  <img
                    src={sponge}
                    className="w-[200px] h-[300px]"
                    alt="Порожньо"
                  />
                  <p className="text-[#9b181a] text-xl font-sans text-center">
                    Нема замовленнь
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p
                  onClick={() => navigate("/catalog/guns")}
                  className="inline-block bg-green-500 text-white py-2 px-4 rounded-md text-lg font-semibold hover:bg-green-600 transition cursor-pointer"
                >
                  Перейти до каталогу
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
