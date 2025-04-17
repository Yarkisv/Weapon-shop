import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/modalContext";

import basket from "../images/basket.svg";
import cancel from "../images/cancel.svg";
import bonuses from "../images/bonuses.svg";
import chat from "../images/chat.svg";
import history from "../images/history.svg";
import partners from "../images/partners.svg";
import reviews from "../images/reviews.svg";
import visited from "../images/ProfilePageImg/visited.svg";
import liked from "../images/ProfilePageImg/liked.svg";

export default function UserPanel() {
  const { isUserPanelOpen, setUserPanelOpen } = useModal();
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("isAuth"));

  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("isAuth"));
  }, []);

  const handdleProfile = () => {
    navigate("/profile");
    setUserPanelOpen(!isUserPanelOpen);
  };

  const handleLoginClick = () => {
    navigate("/login");
    setUserPanelOpen(!isUserPanelOpen);
  };

  const handleBasketClicked = () => {
    navigate("/profile/basket");
    setUserPanelOpen(!isUserPanelOpen);
  };

  const handleOrderHistoryClicked = () => {
    navigate("/profile/orderhistory");
    setUserPanelOpen(!isUserPanelOpen);
  };

  const handleChatBotClicked = () => {
    navigate("/profile/chatbot");
    setUserPanelOpen(!isUserPanelOpen);
  };

  const handleReviewsClicked = () => {
    navigate("/profile/reviews");
    setUserPanelOpen(!isUserPanelOpen);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    navigate("/");
    console.log(
      `Logout successful, token - [${localStorage.getItem("token")}]`
    );
    setIsAuth(!!localStorage.getItem("isAuth"));
  };

  const handleClosePanel = () => {
    setUserPanelOpen(false);
  };

  return (
    <div
      className={`fixed right-0 top-0 bg-gray-300 rounded-l-md w-[440px] h-full flex flex-col justify-between z-[9999] transition-transform duration-300 ${
        isUserPanelOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div>
        <img
          className="filter contrast-0 brightness-0 w-5 h-5 mt-4 ml-4 cursor-pointer"
          src={cancel}
          onClick={handleClosePanel}
        />
        {!isAuth ? (
          <button
            className="w-[410px] h-[50px] bg-black text-white text-[20px] rounded ml-4 mt-4 transition-transform hover:bg-neutral-900 hover:scale-105 active:bg-neutral-950 active:scale-95"
            onClick={handleLoginClick}
          >
            Увійти
          </button>
        ) : (
          <button
            className="w-[410px] h-[50px] bg-black text-white text-[20px] rounded ml-4 mt-4 transition-transform hover:bg-neutral-900 hover:scale-105 active:bg-neutral-950 active:scale-95"
            onClick={handdleProfile}
          >
            Профіль
          </button>
        )}
        <ul className="grid text-left gap-8 list-none pl-0 mt-8">
          <li
            className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer opacity-0 animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all"
            onClick={handleBasketClicked}
          >
            <img
              src={basket}
              className="filter contrast-0 brightness-0 mr-3 w-7 h-7"
            />
            Корзина
          </li>
          <li className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer opacity-0 animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all">
            <img
              src={liked}
              className="filter contrast-0 brightness-0 mr-3 w-7 h-7"
            />
            Обране
          </li>
          <li className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer opacity-0 animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all">
            <img
              src={visited}
              className="filter contrast-0 brightness-0 mr-3 w-7 h-7"
            />
            Переглянуте
          </li>

          <li
            className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer opacity-0 animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all"
            onClick={handleOrderHistoryClicked}
          >
            <img
              src={history}
              className="filter contrast-0 brightness-0 mr-3 w-7 h-7"
            />
            Історія замовлень
          </li>
          <li
            className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer opacity-0 animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all"
            onClick={handdleProfile}
          >
            <img
              src={bonuses}
              className="filter contrast-0 brightness-0 mr-3 w-7 h-7"
            />
            Бонуси
          </li>
          <li
            className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer opacity-0 animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all"
            onClick={handleChatBotClicked}
          >
            <img
              src={chat}
              className="filter contrast-0 brightness-0 mr-3 w-7 h-7"
            />
            Чат-бот
          </li>
          <li
            className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer opacity-0 animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all"
            onClick={handdleProfile}
          >
            <img
              src={partners}
              className="filter contrast-0 brightness-0 mr-3 w-7 h-7"
            />
            Співпраця
          </li>

          <li
            className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer opacity-0 animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all"
            onClick={handleReviewsClicked}
          >
            <img
              src={reviews}
              className="filter contrast-0 brightness-0 mr-3 w-7 h-7"
            />
            Відгуки
          </li>
        </ul>
      </div>
      {isAuth && (
        <button
          className="w-full h-[50px] bg-red-700 text-white cursor-pointer text-[18px] font-medium rounded-none transition-transform hover:bg-red-700 active:bg-red-800"
          onClick={handleLogoutClick}
        >
          Вийти з профілю
        </button>
      )}
    </div>
  );
}
