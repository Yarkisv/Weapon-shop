import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/modalContext";
import axios from "axios";

import visited from "../images/ProfilePageImg/visited.svg";
import history from "../images/history.svg";
import chat from "../images/chat.svg";
import logoBlack from "../images/logoBlack.svg";
import profile from "../images/profile.svg";
import home from "../images/home.svg";
import liked from "../images/liked.svg";
import basket from "../images/basket.svg";
import { FiX } from "react-icons/fi";
import logout from "../images/ProfilePageImg/logout.svg";

export default function Menu() {
  const { setMenuOpen } = useModal();
  const [isValid, setIsValid] = useState(false);

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
          setIsValid(true);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("isAuth");
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    checkToken();
  }, []);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(false);
  };

  const handleLikedWindow = () => {
    navigate("/profile/wishlist");
    toggleMenu();
  };

  const handleBasketClicked = () => {
    navigate("/profile/basket");
    toggleMenu();
  };

  const handleProfileClick = () => {
    navigate("/profile");
    toggleMenu();
  };

  const handleChatBotClick = () => {
    navigate("/profile/chatbot");
    toggleMenu();
  };

  const handleOrderHistoryClick = () => {
    navigate("/profile/orderhistory");
    toggleMenu();
  };

  const handleViewedClick = () => {
    navigate("/profile/viewed");
    toggleMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    setIsValid(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
    toggleMenu();
  };

  return (
    <div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black/30 z-[9998]"
        onClick={toggleMenu}
      ></div>

      <div className="fixed top-0 left-0 w-[280px] h-screen bg-white z-[10000] shadow-lg transition-transform duration-300 ease-in-out rounded-tr-xl rounded-br-xl overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <img
            src={logoBlack}
            className="w-[140px] cursor-pointer"
            onClick={() => {
              navigate("/");
              toggleMenu();
            }}
          />
          <FiX
            size={24}
            className="cursor-pointer text-gray-700"
            onClick={toggleMenu}
          />
        </div>

        {isValid ? (
          <div
            className="px-4 py-3 flex items-center gap-3 border-b border-gray-200 cursor-pointer"
            onClick={handleProfileClick}
          >
            <img
              src={profile}
              alt="Профіль"
              className="w-[30px] h-[30px] filter contrast-0 brightness-0 transition-transform hover:scale-110"
            />
            <div>
              <p className="font-semibold text-[15px]">Ваш профіль</p>
              <p className="text-sm text-gray-500">Особистий кабінет</p>
            </div>
          </div>
        ) : (
          <div className="flex px-4 py-4">
            <button
              onClick={handleLoginClick}
              className="w-full max-w-[200px] py-2 px-4 bg-black text-white rounded-lg shadow hover:bg-neutral-800 transition duration-200"
            >
              Увійти
            </button>
          </div>
        )}

        <div className="px-4 py-2">
          <p className="text-xs text-gray-600 uppercase mb-2">Навігація</p>

          <div
            className="flex items-center gap-3 py-2 cursor-pointer"
            onClick={() => {
              navigate("/");
              toggleMenu();
            }}
          >
            <img
              src={home}
              alt="Головна"
              className="w-[24px] h-[24px] filter contrast-0 brightness-0 transition-transform hover:scale-110"
            />
            <p className="text-[15px]">Головна</p>
          </div>

          <div
            className="flex items-center gap-3 py-2 cursor-pointer"
            onClick={() => {
              handleLikedWindow();
              toggleMenu();
            }}
          >
            <img
              src={liked}
              alt="Обране"
              className="w-[24px] h-[24px] filter contrast-0 brightness-0 transition-transform hover:scale-110"
            />
            <p className="text-[15px]">Обране</p>
          </div>

          <div
            className="flex items-center gap-3 py-2 cursor-pointer"
            onClick={() => {
              handleBasketClicked();
              toggleMenu();
            }}
          >
            <img
              src={basket}
              alt="Корзина"
              className="w-[24px] h-[24px] filter contrast-0 brightness-0 transition-transform hover:scale-110"
            />
            <p className="text-[15px]">Корзина</p>
          </div>
        </div>

        <hr className="my-2" />

        <div className="px-4 py-2">
          <p className="text-xs text-gray-400 uppercase mb-2">Інше</p>

          <div
            className="flex items-center gap-3 py-2 cursor-pointer"
            onClick={handleViewedClick}
          >
            <img
              src={visited}
              alt="Переглянуте"
              className="w-[24px] h-[24px] filter contrast-0 brightness-0 transition-transform hover:scale-110"
            />
            <p className="text-[15px]">Переглянуте</p>
          </div>

          <div
            className="flex items-center gap-3 py-2 cursor-pointer"
            onClick={handleOrderHistoryClick}
          >
            <img
              src={history}
              alt="Історія"
              className="w-[24px] h-[24px] filter contrast-0 brightness-0 transition-transform hover:scale-110"
            />
            <p className="text-[15px]">Історія замовлень</p>
          </div>

          <div
            className="flex items-center gap-3 py-2 cursor-pointer"
            onClick={handleChatBotClick}
          >
            <img
              src={chat}
              alt="Чат-бот"
              className="w-[24px] h-[24px] filter contrast-0 brightness-0 transition-transform hover:scale-110"
            />
            <p className="text-[15px]">Чат-бот</p>
          </div>

          {isValid && (
            <div
              className="flex items-center gap-3 text-[15px] text-red-600 cursor-pointer hover:text-red-800 transition"
              onClick={handleLogout}
            >
              <img
                src={logout}
                className="w-[24px] h-[24px] filter contrast-0 brightness-0 transition-transform hover:scale-110"
              />
              Вийти
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
