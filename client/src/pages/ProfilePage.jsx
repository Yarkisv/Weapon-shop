import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import UserInformation from "../components/UserInformation";
import PageBasket from "../components/PageBasket";
import WishList from "../components/WishList";
import Viewed from "../components/Viewed";
import OrderHistory from "../components/OrderHistory";
import ChatBot from "../components/ChatBot";
import ReviewsUser from "../components/ReviewsUser";

import profile from "../images/ProfilePageImg/profile.svg";
import basket from "../images/basket.svg";
import liked from "../images/ProfilePageImg/liked.svg";
import visited from "../images/ProfilePageImg/visited.svg";
import history from "../images/history.svg";
import chat from "../images/chat.svg";
import reviews from "../images/reviews.svg";
import logout from "../images/ProfilePageImg/logout.svg";
import bonuses from "../images/bonuses.svg";
import partners from "../images/partners.svg";

import { HiMenu } from "react-icons/hi";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.user);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Заголовок + бургер */}
        <div className="relative flex justify-center items-center mb-6 h-12">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="absolute left-0 md:hidden p-2 text-gray-700 z-10"
          >
            <HiMenu className="w-7 h-7" />
          </button>
          <h1 className={`text-3xl font-bold`}>Вітаємо, {user.firstname}!</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Сайдбар */}
          <aside
            className={`${
              menuOpen ? "block" : "hidden"
            } md:block bg-white md:w-[250px] w-full rounded-xl shadow-md p-4`}
          >
            <ul className="flex flex-col gap-4 text-gray-700">
              <li className="flex items-center gap-3 text-[18px] font-medium hover:text-black transition">
                <img
                  src={profile}
                  className="w-6 h-6 filter contrast-0 brightness-0"
                />
                <Link to="/profile" className="no-underline text-inherit">
                  Профіль
                </Link>
              </li>
              <li className="flex items-center gap-3 text-[18px] font-medium hover:text-black transition">
                <img
                  src={basket}
                  className="w-6 h-6 filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/basket"
                  className="no-underline text-inherit"
                >
                  Корзина
                </Link>
              </li>
              <li className="flex items-center gap-3 text-[18px] font-medium hover:text-black transition">
                <img
                  src={liked}
                  className="w-6 h-6 filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/wishlist"
                  className="no-underline text-inherit"
                >
                  Обране
                </Link>
              </li>
              <li className="flex items-center gap-3 text-[18px] font-medium hover:text-black transition">
                <img
                  src={visited}
                  className="w-6 h-6 filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/viewed"
                  className="no-underline text-inherit"
                >
                  Переглянуте
                </Link>
              </li>
              <li className="flex items-center gap-3 text-[18px] font-medium hover:text-black transition">
                <img
                  src={history}
                  className="w-6 h-6 filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/orderhistory"
                  className="no-underline text-inherit"
                >
                  Історія замовлень
                </Link>
              </li>
              <li className="flex items-center gap-3 text-[18px] font-medium hover:text-black transition">
                <img
                  src={bonuses}
                  className="w-6 h-6 filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/bonuses"
                  className="no-underline text-inherit"
                >
                  Бонуси
                </Link>
              </li>
              <li className="flex items-center gap-3 text-[18px] font-medium hover:text-black transition">
                <img
                  src={chat}
                  className="w-6 h-6 filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/chatbot"
                  className="no-underline text-inherit"
                >
                  Чат-бот
                </Link>
              </li>
              <li className="flex items-center gap-3 text-[18px] font-medium hover:text-black transition">
                <img
                  src={partners}
                  className="w-6 h-6 filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/partners"
                  className="no-underline text-inherit"
                >
                  Співпраця
                </Link>
              </li>
              <li className="flex items-center gap-3 text-[18px] font-medium hover:text-black transition">
                <img
                  src={reviews}
                  className="w-6 h-6 filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/reviews"
                  className="no-underline text-inherit"
                >
                  Відгуки
                </Link>
              </li>
              <li
                onClick={handleLogoutClick}
                className="flex items-center gap-3 text-[18px] font-medium text-red-600 cursor-pointer hover:text-red-800 transition"
              >
                <img
                  src={logout}
                  className="w-6 h-6 filter contrast-0 brightness-0"
                />
                Вийти
              </li>
            </ul>
          </aside>

          {/* Контент */}
          <div className="flex-grow w-full bg-white rounded-xl shadow-md p-6">
            <Routes>
              <Route path="/" element={<UserInformation user={user} />} />
              <Route path="basket" element={<PageBasket />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="viewed" element={<Viewed />} />
              <Route path="orderhistory" element={<OrderHistory />} />
              <Route path="chatbot" element={<ChatBot />} />
              <Route path="reviews" element={<ReviewsUser />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
