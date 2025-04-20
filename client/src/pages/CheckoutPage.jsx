import React, { useState, useEffect } from "react";
import { useModal } from "../contexts/modalContext";
import { useCart } from "../contexts/cartContext";
import { useNavigate } from "react-router-dom";
import editOrder from "../images/editOrder.svg";
import logoBlack from "../images/logoBlack.svg";
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

  const [deliveryType, setDeliveryType] = useState("pickup");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const { orders, totalPrice } = useCart();
  const { isBasketOpen, setBasketOpen } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setRecipientName(storedUser.firstname);
      setRecipienSurname(storedUser.lastname);
      setRecipienPhone(storedUser.phone);
      setEmail(storedUser.email || "");
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

  const handleBasketClicked = () => {
    setBasketOpen(!isBasketOpen);
  };

  const goToPayment = async () => {
    navigate("/payment");
    await axios.post("http://localhost:3000/order", {
      phone: user.phone,
      orderDate: new Date().toISOString(),
      totalPrice: totalPrice,
      orderItems: orders,
      store: deliveryType === "pickup" ? selectedStore : null,
      deliveryType,
      deliveryCity: deliveryType === "courier" ? selectedCity : null,
      deliveryAddress: deliveryType === "courier" ? deliveryAddress : null,
      customer: {
        firstname: recipientName,
        lastname: recipienSurname,
        phone: recipienPhone,
        email: email,
      },
    });
  };

  return (
    <div className="min-h-screen mx-auto bg-white">
      <div className="w-[1440px] mx-auto">
        <img className="mt-[10px]" src={logoBlack} alt="" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 py-6 border-t">
        <p className="text-center text-3xl font-semibold mb-6">
          Оформлення замовлення
        </p>

        {isAuth ? (
          <div className="flex   gap-6 mb-[10px]">
            <div className="border border-black/30 rounded-xl p-6 bg-gray-200 w-[1000px] ml-[8px] shadow-xl">
              <p className="text-2xl font-bold mb-6 text-gray-800">
                Особисті дані
              </p>
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-1">Прізвище</label>
                  <input
                    type="text"
                    value={recipienSurname}
                    onChange={(e) => setRecipienSurname(e.target.value)}
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-3"
                    placeholder="Введіть прізвище"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-1">Ім’я</label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full border border-gray-300 bg-white  rounded-lg px-4 py-3"
                    placeholder="Введіть ім’я"
                  />
                </div>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="w-1/2">
                  <label className="block text-gray-700  mb-1">Телефон</label>
                  <input
                    type="text"
                    value={recipienPhone}
                    onChange={(e) => setRecipienPhone(e.target.value)}
                    className="w-full border border-gray-300  bg-white rounded-lg px-4 py-3"
                    placeholder="+380..."
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-1">Пошта</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300  bg-white rounded-lg px-4 py-3"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <button className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                Підтвердити дані
              </button>

              <p className="text-sm text-gray-500 mt-4 text-center">
                Продовжуючи, ви підтверджуєте згоду з{" "}
                <a className="text-green-700 underline">умовами обробки</a>{" "}
                персональних даних.
              </p>
            </div>

            <div className="w-full  lg:w-[300px] bg-gray-200 rounded-xl p-5 sticky top-4 flex ml-auto flex-col  shadow-xl border border-black/30">
              <div>
                <p className="text-2xl font-bold mb-2 text-gray-800">Разом</p>
                <p className="text-base text-gray-700 mb-1">
                  Товарів на суму:{" "}
                  <span className="font-semibold">{totalPrice} ₴</span>
                </p>
                <p className="text-sm text-gray-600">
                  Ім’я: <span className="font-medium">{user.firstname}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Прізвище: <span className="font-medium">{user.lastname}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Телефон: <span className="font-medium">{user.phone}</span>
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-md mt-4">
                <p className="text-gray-500 text-sm">До сплати</p>
                <p className="text-black text-2xl font-bold">{totalPrice} ₴</p>
              </div>

              <button
                className="bg-green-600 text-white w-full py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-md mt-4"
                onClick={goToPayment}
              >
                💳 Перейти до оплати
              </button>

              <p className="text-[12px] text-gray-500 mt-2 leading-snug">
                Отримання замовлення від <strong>5 000 ₴</strong> до{" "}
                <strong>30 000 ₴</strong> — за наявності документів...
              </p>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="border border-black/30 rounded-xl p-6 bg-gray-200 w-[1000px] ml-[8px] shadow-xl">
              <p className="text-2xl font-bold mb-6 text-center text-gray-800">
                Вхід в акаунт
              </p>
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Пошта</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-3"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-1">Пароль</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 bg-white rounded-lg px-4 py-3"
                    placeholder="Пароль"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Увійти
                </button>
              </form>
            </div>
            <div className="w-full  lg:w-[300px] bg-gray-200 rounded-xl p-5 sticky top-4  flex ml-auto flex-col  shadow-xl border border-black/30">
              <div>
                <p className="text-2xl font-extrabold mb-2 text-gray-800">
                  Разом
                </p>
                <p className="text-base text-gray-700 mb-1">
                  Товарів на суму:{" "}
                  <span className="font-semibold">{totalPrice} ₴</span>
                </p>
                <p className="text-sm text-gray-600">
                  Ім’я: <span className="font-medium">{user.firstname}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Прізвище: <span className="font-medium">{user.lastname}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Телефон: <span className="font-medium">{user.phone}</span>
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-md mt-4">
                <p className="text-gray-500 text-sm">До сплати</p>
                <p className="text-black text-2xl font-bold">{totalPrice} ₴</p>
              </div>

              <button
                className="bg-green-600 text-white w-full py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-md mt-4"
                onClick={goToPayment}
              >
                💳 Перейти до оплати
              </button>

              <p className="text-[12px] text-gray-500 mt-2 leading-snug">
                Отримання замовлення від <strong>5 000 ₴</strong> до{" "}
                <strong>30 000 ₴</strong> — за наявності документів...
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-6 mt-8">
          {orders.length > 0 ? (
            <>
              <div className="flex flex-col gap-6 w-full ">
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
                      className="flex items-center mb-[20px] bg-gray-100 border border-green-900/30 rounded-md p-4 ml-2"
                    >
                      <img
                        className="w-20 h-20 object-contain"
                        src={`data:image/jpg;base64,${order.image}`}
                        alt={order.name}
                      />
                      <div className="flex justify-between w-full">
                        <p className="text-lg font-semibold ml-[10px]">
                          {order.name} x {order.quantity} од.
                        </p>
                        <p className="text-lg font-semibold">{order.price} ₴</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Доставка */}
                <div className="bg-gray-100 border border-green-900/30 rounded-md p-4 ml-2">
                  <p className="text-2xl font-bold mb-4">Доставка</p>

                  {/* Тип доставки */}
                  <div className="space-y-4 mb-6">
                    {[
                      { label: "Самовивіз", value: "pickup" },
                      { label: "Кур’єром", value: "courier" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-4 cursor-pointer hover:bg-green-100 p-2 rounded-md transition"
                      >
                        <input
                          type="radio"
                          name="deliveryType"
                          value={option.value}
                          checked={deliveryType === option.value}
                          onChange={() => setDeliveryType(option.value)}
                          className="hidden"
                        />
                        <span className="w-5 h-5 border-2 border-green-500 rounded-full flex items-center justify-center">
                          <span
                            className={`w-3 h-3 bg-green-500 rounded-full transition-transform ${
                              deliveryType === option.value
                                ? "scale-100"
                                : "scale-0"
                            }`}
                          ></span>
                        </span>
                        {option.label}
                      </label>
                    ))}
                  </div>

                  {/* Самовивіз */}
                  {deliveryType === "pickup" && (
                    <>
                      <p className="text-lg font-semibold mb-2">
                        Оберіть магазин
                      </p>
                      <div className="space-y-4">
                        {[
                          { label: "Майдан Конституції 9", value: "store1" },
                          { label: "Проспект Незалежності 5", value: "store2" },
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
                            <img
                              src={geo}
                              alt="geo"
                              className="w-5 h-5 ml-auto"
                            />
                          </label>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Кур'єром */}
                  {deliveryType === "courier" && (
                    <>
                      <p className="text-lg font-semibold mt-4 mb-2">
                        Обрати місто
                      </p>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                      >
                        <option value="">Оберіть місто</option>
                        <option value="kyiv">Київ</option>
                        <option value="lviv">Львів</option>
                        <option value="kharkiv">Харків</option>
                        <option value="dnipro">Дніпро</option>
                        <option value="odesa">Одеса</option>
                        <option value="zaporizhzhia">Запоріжжя</option>
                        <option value="vinnitsa">Вінниця</option>
                        <option value="chernivtsi">Чернівці</option>
                        <option value="rivne">Рівне</option>
                        <option value="poltava">Полтава</option>
                      </select>

                      <p className="text-lg font-semibold mb-2">
                        Адреса доставки
                      </p>
                      <input
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Введіть адресу доставки"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                      />
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-black text-xl font-semibold w-full">
              <div className="flex flex-1 mt-[20px] justify-center items-center">
                <div className="flex flex-col items-center gap-4 border-2 border-black rounded-md p-4 shadow-md">
                  <p className="text-black text-xl font-sans text-center">
                    Немає замовлень
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
