import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/modalContext";
import axios from "axios";

import basket from "../images/basket.svg";
import cancel from "../images/cancel.svg";
import bonuses from "../images/bonuses.svg";
import chat from "../images/chat.svg";
import history from "../images/history.svg";
import partners from "../images/partners.svg";
import reviews from "../images/reviews.svg";
import visited from "../images/ProfilePageImg/visited.svg";
import liked from "../images/ProfilePageImg/liked.svg";
import logout from "../images/ProfilePageImg/logout.svg";

export default function UserPanel() {
  const { isUserPanelOpen, setUserPanelOpen } = useModal();
  const [isValid, setIsValid] = useState(false);

  const API = import.meta.env.VITE_API;

  const navigate = useNavigate();

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
          setIsValid(true);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    checkToken();
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
    localStorage.removeItem("user");
    navigate("/");
    setIsValid(false);
  };

  const handleClosePanel = () => {
    setUserPanelOpen(false);
  };

  return (
    <>
      {isUserPanelOpen && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-[9998]"
          onClick={handleClosePanel}
        />
      )}

      <div
        className={`fixed right-0 top-0 bg-white rounded-l-md w-[440px] h-full flex flex-col justify-between z-[9999] transition-transform duration-300 ${
          isUserPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <img
            src={cancel}
            alt="Close saved"
            className="w-[30px] h-[30px] ml-3 pt-2 cursor-pointer filter contrast-0 brightness-0 hover:opacity-70"
            onClick={handleClosePanel}
          />
          {!isValid ? (
            <button
              className="w-[410px] h-[50px] bg-black text-white text-[20px] rounded ml-4 mt-4 transition-transform hover:bg-neutral-900 hover:scale-105 active:bg-neutral-950 active:scale-95"
              onClick={handleLoginClick}
            >
              Увійти
            </button>
          ) : (
            <button
              className="w-[410px] h-[50px] cursor-pointer bg-black text-white text-[20px] rounded ml-4 mt-3 transition-transform hover:bg-neutral-900 hover:scale-105 active:bg-neutral-950 active:scale-95"
              onClick={handdleProfile}
            >
              Профіль
            </button>
          )}
          <ul className="grid text-left gap-8 list-none pl-0 mt-8">
            <li
              className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all"
              onClick={handleBasketClicked}
            >
              <img
                src={basket}
                className="mr-3 filter contrast-0 brightness-0 w-7 h-7"
              />
              Корзина
            </li>
            <li className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all">
              <img
                src={liked}
                className="mr-3 filter contrast-0 brightness-0 w-7 h-7"
              />
              Обране
            </li>
            <li className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all">
              <img
                src={visited}
                className="mr-3 filter contrast-0 brightness-0 w-7 h-7"
              />
              Переглянуте
            </li>

            <li
              className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all"
              onClick={handleOrderHistoryClicked}
            >
              <img
                src={history}
                className="mr-3 filter contrast-0 brightness-0 w-7 h-7"
              />
              Історія замовлень
            </li>
            <li
              className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all"
              onClick={handdleProfile}
            >
              <img
                src={bonuses}
                className="mr-3 filter contrast-0 brightness-0 w-7 h-7"
              />
              Бонуси
            </li>
            <li
              className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all"
              onClick={handleChatBotClicked}
            >
              <img
                src={chat}
                className="mr-3 filter contrast-0 brightness-0 w-7 h-7"
              />
              Чат-бот
            </li>
            <li
              className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all"
              onClick={handdleProfile}
            >
              <img
                src={partners}
                className="mr-3 filter contrast-0 brightness-0 w-7 h-7"
              />
              Співпраця
            </li>

            <li
              className="flex items-center text-black text-[18px] font-sans ml-4 cursor-pointer animate-fadeIn hover:text-orange-600 hover:scale-105 transition-all"
              onClick={handleReviewsClicked}
            >
              <img
                src={reviews}
                className="mr-3 filter contrast-0 brightness-0 w-7 h-7"
              />
              Відгуки
            </li>
          </ul>
        </div>
        {isValid && (
          <p
            className="flex gap-0.5 cursor-pointer text-black ml-[12px] mb-2.5 text-[18px] font-sans transition-all duration-300 hover:text-red-600"
            onClick={handleLogoutClick}
          >
            <img
              className="filter contrast-0 brightness-0 w-7 h-7"
              src={logout}
            />
            Вийти
          </p>
        )}
      </div>
    </>
  );
}
