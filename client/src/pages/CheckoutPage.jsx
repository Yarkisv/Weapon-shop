import { useState, useEffect } from "react";
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
  const [isValid, setIsValid] = useState(false);

  const [recipientName, setRecipientName] = useState("");
  const [recipienSurname, setRecipienSurname] = useState("");
  const [recipienPhone, setRecipienPhone] = useState("");

  const [deliveryType, setDeliveryType] = useState("pickup");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("  ");
  const [paymentMethod, setPaymentMethod] = useState("Карткою");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { orders, totalPrice, clearCart } = useCart();
  const { isBasketOpen, setBasketOpen } = useModal();
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API;

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await axios.get(`${API}/auth/validate`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          setIsValid(true);
          setUser(storedUser);
          setRecipientName(storedUser.firstname);
          setRecipienSurname(storedUser.lastname);
          setRecipienPhone(storedUser.phone);
          setEmail(storedUser.email || "");
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    checkToken();
  }, [isValid]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const user = response.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        setIsValid(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBasketClicked = () => {
    setBasketOpen(!isBasketOpen);
  };

  const goToPayment = async () => {
    console.log(orders);

    const minimalOrderItems = orders.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    await axios.post(`${API}/order`, {
      phone: recipienPhone,
      orderDate: new Date().toISOString().slice(0, 19).replace("T", " "),
      totalPrice,
      deliveryLocation,
      city: selectedCity,
      paymentMethod,
      orderItems: minimalOrderItems,
    });
    navigate("/payment");
    clearCart();
  };

  return (
    <div className="min-h-screen  mx-auto bg-white">
      <div className="w-full max-w-[1440px]  mx-auto">
        <img
          className="mt-[10px] cursor-pointer"
          onClick={() => navigate("/")}
          src={logoBlack}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 py-6 border-t">
        <p className="text-center text-3xl font-semibold mb-6">
          Оформлення замовлення
        </p>
        <div className=" w-full  flex flex-col lg:flex-row gap-10 lg:items-start ">
          <div className="w-full   lg:w-2/3 order-1 lg:order-2">
            {isValid ? (
              <div className="flex justify-center mb-6">
                <div className="border border-black/30 rounded-xl p-6 bg-gray-200 w-full max-w-[1050px] shadow-xl">
                  <p className="text-2xl font-bold mb-6 text-gray-800">
                    Дані отрумувача
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="w-full sm:w-1/2">
                      <label className="block text-gray-700 mb-1">
                        Прізвище
                      </label>
                      <input
                        type="text"
                        value={recipienSurname}
                        onChange={(e) => setRecipienSurname(e.target.value)}
                        className="w-full border border-gray-300 bg-white rounded-lg px-4 py-3"
                        placeholder="Введіть прізвище"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label className="block text-gray-700 mb-1">Ім’я</label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full border border-gray-300 bg-white rounded-lg px-4 py-3"
                        placeholder="Введіть ім’я"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="w-full sm:w-1/2">
                      <label className="block text-gray-700 mb-1">
                        Телефон
                      </label>
                      <input
                        type="text"
                        value={recipienPhone}
                        onChange={(e) => setRecipienPhone(e.target.value)}
                        className="w-full border border-gray-300 bg-white rounded-lg px-4 py-3"
                        placeholder="+380..."
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label className="block text-gray-700 mb-1">Пошта</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 bg-white rounded-lg px-4 py-3"
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
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="border border-black/30 rounded-xl p-6 bg-gray-200 w-full max-w-[1000px] shadow-xl">
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
                      className="bg-green-600 text-white w-full py-3 rounded-lg cursor-pointer font-semibold hover:bg-green-700 transition"
                    >
                      Увійти
                    </button>
                  </form>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-6 mt-8 w-full">
              {orders.length > 0 ? (
                <div className="flex flex-col gap-6 w-full">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                      <p className="text-2xl font-bold ml-2">Замовлення</p>
                      <p
                        className="flex items-center text-blue-900 cursor-pointer gap-2 hover:underline mt-2 sm:mt-0 mr-2"
                        onClick={handleBasketClicked}
                      >
                        Редагувати товари
                        <img src={editOrder} alt="Edit" className="w-5 h-5" />
                      </p>
                    </div>
                    {orders.map((order) => (
                      <div
                        key={order.name}
                        className="flex flex-col sm:flex-row items-center mb-5 bg-gray-100 border border-green-900/30 rounded-md p-4"
                      >
                        <img
                          className="w-20 h-20 object-contain mb-2 sm:mb-0"
                          src={`data:image/jpg;base64,${order.image}`}
                        />
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full sm:ml-4">
                          <p className="text-lg font-semibold text-center sm:text-left">
                            {order.name} x {order.quantity} од.
                          </p>
                          <p className="text-lg font-semibold text-center sm:text-right">
                            {order.price} ₴
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-100 border border-green-900/30 rounded-md p-4">
                    <p className="text-2xl font-bold mb-4">Доставка</p>
                    <div className="space-y-4 mb-6">
                      {[
                        { label: "Самовивіз", value: "pickup" },
                        { label: "Кур’єром", value: "courier" },
                        { label: "Поштою", value: "postal" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className="flex items-center gap-4 cursor-pointer p-2 rounded-md transition"
                        >
                          <input
                            type="radio"
                            name="deliveryType"
                            value={option.value}
                            checked={deliveryType === option.value}
                            onChange={() => setDeliveryType(option.value)}
                            className="hidden"
                          />
                          <span className="w-5 h-5 border-2 border-slate-950 rounded-full flex items-center justify-center">
                            <span
                              className={`w-3 h-3 bg-slate-950 rounded-full transition-transform ${
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

                    {deliveryType === "pickup" && (
                      <>
                        <p className="text-lg font-semibold mb-2">
                          Оберіть магазин
                        </p>
                        <div className="space-y-4">
                          {[
                            { label: "Майдан Конституції 9", value: "store1" },
                            {
                              label: "Проспект Незалежності 5",
                              value: "store2",
                            },
                          ].map((store) => (
                            <label
                              key={store.value}
                              className="flex items-center gap-4 cursor-pointer p-2 rounded-md transition"
                            >
                              <input
                                type="radio"
                                name="store"
                                value={store.value}
                                checked={selectedStore === store.value}
                                onChange={() => setSelectedStore(store.value)}
                                className="hidden"
                              />
                              <span className="w-5 h-5 border-2 border-slate-950 rounded-full flex items-center justify-center">
                                <span
                                  className={`w-3 h-3 bg-slate-950 rounded-full transition-transform ${
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

                    {(deliveryType === "courier" ||
                      deliveryType === "postal") && (
                      <>
                        <p className="text-lg font-semibold mt-4 mb-2">
                          Оберіть місто
                        </p>
                        <select
                          className="w-full border border-slate-950 rounded-lg px-4 py-3 mb-4"
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

                        {deliveryType === "courier" ? (
                          <>
                            <p className="text-lg font-semibold mb-2">
                              Адреса доставки
                            </p>
                            <input
                              type="text"
                              value={deliveryLocation}
                              onChange={(e) =>
                                setDeliveryLocation(e.target.value)
                              }
                              placeholder="Введіть адресу доставки"
                              className="w-full border border-slate-950 rounded-lg px-4 py-3"
                            />
                          </>
                        ) : (
                          <>
                            <p className="text-lg font-semibold mb-2">
                              Відділення Нової Пошти
                            </p>
                            <select
                              className="w-full border border-slate-950 rounded-lg px-4 py-3"
                              value={deliveryLocation}
                              onChange={(e) =>
                                setDeliveryLocation(e.target.value)
                              }
                            >
                              <option value="">Оберіть відділення</option>
                              <option value="np1">Відділення №1</option>
                              <option value="np2">Відділення №2</option>
                              <option value="np3">Відділення №3</option>
                              <option value="np4">Відділення №4</option>
                            </select>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  <div className="bg-gray-100 border border-green-900/30 rounded-md p-4">
                    <p className="text-2xl font-bold mb-4">Оплата</p>

                    <label className="flex items-center gap-4 cursor-pointer p-2 rounded-md transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        onChange={() => setPaymentMethod("Готівкою")}
                        className="hidden"
                      />
                      <span className="w-5 h-5 border-2 border-slate-950 rounded-full flex items-center justify-center">
                        <span
                          className={`w-3 h-3 bg-slate-950 rounded-full transition-transform ${
                            paymentMethod === "Готівкою"
                              ? "scale-100"
                              : "scale-0"
                          }`}
                        ></span>
                      </span>
                      Готівка
                    </label>

                    <label className="flex items-center gap-4 cursor-pointer p-2 rounded-md transition">
                      <input
                        type="radio"
                        name="paymentMethod"
                        onChange={() => setPaymentMethod("Карткою")}
                        className="hidden"
                      />
                      <span className="w-5 h-5 border-2 border-slate-950 rounded-full flex items-center justify-center">
                        <span
                          className={`w-3 h-3 bg-slate-950 rounded-full transition-transform ${
                            paymentMethod === "Карткою"
                              ? "scale-100"
                              : "scale-0"
                          }`}
                        ></span>
                      </span>
                      Картка
                    </label>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 border border-green-900/30 rounded-md p-4">
                  <p className="text-2xl font-bold mb-4">Оплата</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center gap-4 p-3 border border-slate-950 rounded-lg bg-white cursor-pointer hover:bg-green-100 transition">
                      <span className="w-5 h-5 border-2 border-slate-950 rounded-full flex items-center justify-center">
                        <span className="w-3 h-3 bg-slate-950 rounded-full"></span>
                      </span>
                      Готівка
                    </div>
                    <div className="flex items-center gap-4 p-3 border border-slate-950 rounded-lg bg-white cursor-pointer hover:bg-green-100 transition">
                      <span className="w-5 h-5 border-2 border-slate-950 rounded-full flex items-center justify-center">
                        <span className="w-3 h-3 bg-slate-950 rounded-full"></span>
                      </span>
                      Картка
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/3 order-1 lg:order-2">
            <div className="w-full min-h-dvw">
              <div className="bg-gray-200 w-full  rounded-xl p-5 sticky top-4 flex flex-col shadow-xl border border-black/30 h-fit">
                {!isValid ? (
                  <>
                    <div>
                      <p className="text-2xl font-bold mb-2 text-gray-800">
                        Разом
                      </p>
                      <p className="text-base text-gray-700 mb-1">
                        Товарів на суму:{" "}
                        <span className="font-semibold">{totalPrice} ₴</span>
                      </p>
                    </div>
                    <p className="text-base text-red-500 mb-1">
                      Ви не увійшли у свій обліковий запис
                    </p>
                    <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-md mt-4">
                      <p className="text-gray-500 text-sm">До сплати</p>
                      <p className="text-black text-2xl font-bold">
                        {totalPrice} ₴
                      </p>
                    </div>

                    <button
                      className="bg-green-600 text-white w-full cursor-pointer py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-md mt-4"
                      onClick={goToPayment}
                    >
                      💳 Перейти до оплати
                    </button>

                    <p className="text-[12px] text-gray-500 mt-2 leading-snug">
                      Отримання замовлення від <strong>5 000 ₴</strong> до{" "}
                      <strong>30 000 ₴</strong> — за наявності документів...
                    </p>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-2xl font-bold mb-2 text-gray-800">
                        Разом
                      </p>
                      <p className="text-base text-gray-700 mb-1">
                        Товарів на суму:{" "}
                        <span className="font-semibold">{totalPrice} ₴</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Ім’я:{" "}
                        <span className="font-medium">{user.firstname}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Прізвище:{" "}
                        <span className="font-medium">{user.lastname}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Телефон:{" "}
                        <span className="font-medium">{user.phone}</span>
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-xl flex justify-between items-center shadow-md mt-4">
                      <p className="text-gray-500 text-sm">До сплати</p>
                      <p className="text-black text-2xl font-bold">
                        {totalPrice} ₴
                      </p>
                    </div>

                    <button
                      className="bg-green-600 text-white w-full cursor-pointer py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-md mt-4"
                      onClick={goToPayment}
                    >
                      💳 Перейти до оплати
                    </button>

                    <p className="text-[12px] text-gray-500 mt-2 leading-snug">
                      Отримання замовлення від <strong>5 000 ₴</strong> до{" "}
                      <strong>30 000 ₴</strong> — за наявності документів...
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
