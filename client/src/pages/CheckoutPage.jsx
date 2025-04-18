import React, { useState, useEffect } from "react";
import { useModal } from "../contexts/modalContext";
import { useCart } from "../contexts/cartContext";
import { useNavigate } from "react-router-dom";
import editOrder from "../images/editOrder.svg";
import sponge from "../images/sponge.svg";
import geo from "../images/geo.svg";
import Footer from "../components/Footer";
import axios from "axios";

export default function CheckoutPage() {
  const [user, setUser] = useState({});
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("isAuth"));

  const [recipientName, setRecipientName] = useState("");
  const [recipienSurname, setRecipienSurname] = useState("");
  const [recipienPhone, setRecipienPhone] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setRecipientName(storedUser.firstname);
      setRecipienSurname(storedUser.lastname);
      setRecipienPhone(storedUser.phone);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const IsAuth = response.data.IsAuth;
        const user = response.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("isAuth", IsAuth);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        setIsAuth(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { orders, totalPrice } = useCart();
  const { isBasketOpen, setBasketOpen } = useModal();

  const [selectedStore, setSelectedStore] = useState("");

  const navigate = useNavigate();

  const handleBasketClicked = () => {
    setBasketOpen(!isBasketOpen);
  };

  const goToPayment = async () => {
    navigate("/payment");
    const response = await axios.post("http://localhost:3000/order", {
      phome: user.phone,
      orderDate: "",
      totalPrice: totalPrice,
      orderItems: orders,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1440px] mx-auto px-4 py-6">
        <p className="text-center text-3xl font-semibold mb-6">
          Оформлення замовлення
        </p>
        {isAuth ? (
          <div className="border rounded-xl p-6 bg-white max-w-md mx-auto">
            <p className="text-2xl font-bold mb-6 text-gray-800">
              Особисті дані
            </p>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Прізвище</label>
              <input
                type="text"
                value={recipienSurname}
                onChange={(e) => setRecipienSurname(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Введіть прізвище"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Ім’я</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Введіть ім’я"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Телефон</label>
              <input
                type="text"
                value={recipienPhone}
                onChange={(e) => setRecipienPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="+380..."
              />
            </div>

            <button className="bg-green-600 text-white w-full py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
              Підтвердити дані
            </button>

            <p className="text-sm text-gray-500 mt-4 leading-snug text-center">
              Продовжуючи, ви підтверджуєте, що згодні увійти до
              <a className="text-green-700 underline mx-1">облікового запису</a>
              та надаєте згоду на
              <a className="text-green-700 underline ml-1">
                обробку персональних даних
              </a>
            </p>
          </div>
        ) : (
          <div className="border rounded-xl p-6 bg-white max-w-md mx-auto">
            <p className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Вхід в акаунт
            </p>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Пошта</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Пошта"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-1">Пароль</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Введіть пароль"
                />
              </div>

              <button
                className="bg-green-600 text-white w-full py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
                type="submit"
              >
                Увійти
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4 leading-snug text-center">
              Натискаючи “Увійти”, ви погоджуєтеся з умовами обробки
              персональних даних.
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-6">
          {orders.length > 0 ? (
            <>
              <div className="flex flex-col gap-6 w-full lg:w-[1000px]">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-2xl font-bold ml-2">Замовлення</p>
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
                      className="flex items-center mb-[20px] bg-gray-100 border-1 border-green-900 rounded-md p-4 ml-2"
                    >
                      <img
                        className="w-20 h-20 object-contain"
                        src={`data:image/jpg;base64,${order.image}`}
                        alt={order.name}
                      />
                      <div className="flex justify-between w-full">
                        <p className="text-lg font-semibold ml-[10px]">
                          {order.name} x {order.quantity} {" од."}
                        </p>
                        <p className="text-lg font-semibold">{order.price} ₴</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-100 border-1 border-green-900 rounded-md p-4 ml-2">
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

              <div className="w-full lg:w-[300px] bg-gray-200 rounded-xl p-5 h-[500px] flex flex-col justify-between shadow-xl border border-gray-300">
                <div>
                  <p className="text-2xl font-extrabold mb-2 text-gray-800">
                    Разом
                  </p>
                  <p className="text-base text-gray-700 mb-1">
                    товарів на суму:{" "}
                    <span className="font-semibold">{totalPrice} ₴</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Ім'я:{" "}
                    <span className="font-medium text-gray-800">
                      {user.firstname}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Прiзвище:{" "}
                    <span className="font-medium text-gray-800">
                      {user.lastname}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Телефон:{" "}
                    <span className="font-medium text-gray-800">
                      {user.phone}
                    </span>
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-md mt-4">
                  <p className="text-gray-500 text-sm">До сплати</p>
                  <p className="text-black text-2xl font-bold">
                    {totalPrice} ₴
                  </p>
                </div>

                <button
                  className="bg-green-600 text-white cursor-pointer w-full py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-md mt-4"
                  onClick={goToPayment}
                >
                  💳 Перейти до оплати
                </button>

                <p className="text-[12px] text-gray-500 mt-2 leading-snug">
                  Отримання замовлення від <strong>5 000 ₴</strong> до{" "}
                  <strong>30 000 ₴</strong> — за наявності документів. При
                  оплаті готівкою понад <strong>30 000 ₴</strong> необхідно
                  надати документи для верифікації згідно з вимогами Закону
                  України від 06.12.2019 №361-IX.
                </p>
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
      <Footer />
    </div>
  );
}
