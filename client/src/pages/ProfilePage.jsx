import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import UserInformation from "../components/UserInformation";
import PageBasket from "../components/PageBasket";
import WishList from "../components/WishList";
import Viewed from "../components/Viewed";
import OrderHistory from "../components/OrderHistory";
import ChatBot from "../components/ChatBot";
import ReviewsUser from "../components/ReviewsUser";

import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

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

export default function ProfilePage() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    navigate("/");
    console.log(
      `Logout successful, token - [${localStorage.getItem("token")}]`
    );
  };

  useEffect(() => {
    const fethcUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fethcUser();
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User data:", user);
    }
  }, [user]);

  return (
    <div className="w-full">
      <Header />
      <div className="flex flex-col mx-auto max-w-[1440px]">
        <p className="text-center mt-5 text-4xl font-[Konkhmer Sleokchher]">
          Вітаємо, {user.firstname}!
        </p>
        <div className="flex border-t border-gray-600 w-[1285px] mt-8 ml-6">
          <aside className="w-[250px] h-[600px]  border-r border-gray-600">
            <ul className="flex flex-col mt-5 gap-5 list-none text-gray-600 p-0 m-0">
              <li className="flex items-center gap-2 text-[22px] font-[Konkhmer Sleokchher] cursor-pointer">
                <img
                  src={profile}
                  className="w-[25px] h-[25px] filter contrast-0 brightness-0"
                />
                <Link to="/profile" className="no-underline text-inherit">
                  Профіль
                </Link>
              </li>
              <li className="flex items-center gap-2 text-[22px] font-[Konkhmer Sleokchher] cursor-pointer">
                <img
                  src={basket}
                  className="w-[25px] h-[25px] filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/basket"
                  className="no-underline text-inherit"
                >
                  Корзина
                </Link>
              </li>
              <li className="flex items-center gap-2 text-[22px] font-[Konkhmer Sleokchher] cursor-pointer">
                <img
                  src={liked}
                  className="w-[25px] h-[25px] filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/wishlist"
                  className="no-underline text-inherit"
                >
                  Обране
                </Link>
              </li>
              <li className="flex items-center gap-2 text-[22px] font-[Konkhmer Sleokchher] cursor-pointer">
                <img
                  src={visited}
                  className="w-[25px] h-[25px] filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/viewed"
                  className="no-underline text-inherit"
                >
                  Переглянуте
                </Link>
              </li>
              <li className="flex items-center gap-2 text-[22px] font-[Konkhmer Sleokchher] cursor-pointer">
                <img
                  src={history}
                  className="w-[25px] h-[25px] filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/orderhistory"
                  className="no-underline text-inherit"
                >
                  Історія замовлень
                </Link>
              </li>
              <li className="flex items-center gap-2 text-[22px] font-[Konkhmer Sleokchher] cursor-pointer">
                <img
                  src={bonuses}
                  className="w-[25px] h-[25px] filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/bonuses"
                  className="no-underline text-inherit"
                >
                  Бонуси
                </Link>
              </li>
              <li className="flex items-center gap-2 text-[22px] font-[Konkhmer Sleokchher] cursor-pointer">
                <img
                  src={chat}
                  className="w-[25px] h-[25px] filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/chatbot"
                  className="no-underline text-inherit"
                >
                  Чат-бот
                </Link>
              </li>
              <li className="flex items-center gap-2 text-[22px] font-[Konkhmer Sleokchher] cursor-pointer">
                <img
                  src={partners}
                  className="w-[25px] h-[25px] filter contrast-0 brightness-0"
                />
                <Link
                  to="/profile/partners"
                  className="no-underline text-inherit"
                >
                  Співпраця
                </Link>
              </li>
              <li className="flex items-center gap-2 text-[22px] font-[Konkhmer Sleokchher] cursor-pointer">
                <img
                  src={reviews}
                  className="w-[25px] h-[25px] filter contrast-0 brightness-0"
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
                className="flex items-center gap-2 text-[22px] font-[Konkhmer Sleokchher] cursor-pointer "
              >
                <img
                  src={logout}
                  className="w-[25px] h-[25px] filter contrast-0 brightness-0"
                />
                Вийти
              </li>
            </ul>
          </aside>
          <div className="flex-grow p-4">
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
