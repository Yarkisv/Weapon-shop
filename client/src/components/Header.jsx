import React, { useState, useEffect } from "react";
import logoFinal from "../images/logoFinal.svg";
import basket from "../images/basket.svg";
import liked from "../images/liked.svg";
import visited from "../images/ProfilePageImg/visited.svg";
import history from "../images/history.svg";
import chat from "../images/chat.svg";
import profile from "../images/profile.svg";
import { useModal } from "../contexts/modalContext";
import home from "../images/home.svg";
import search from "../images/search.svg";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

export default function Header() {
  const {
    isUserPanelOpen,
    setUserPanelOpen,
    isBasketOpen,
    setBasketOpen,
    isSavedWindowOpen,
    setSavedWindowOpen,
  } = useModal();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const handleProfileClick = () => {
    setUserPanelOpen(!isUserPanelOpen);
  };

  const handleBasketClicked = () => {
    setBasketOpen(!isBasketOpen);
  };

  const handleLikedWindow = () => {
    setSavedWindowOpen(!isSavedWindowOpen);
  };

  const navigate = useNavigate();

  return (
    <div className="w-full h-[75px] z-[9999] bg-[#375c4d] flex items-center  top-0 left-0">
      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between px-4 lg:px-0">
        <div className="hidden xl:flex items-center gap-4">
          <img
            className="w-[242px] h-[55px] cursor-pointer"
            src={logoFinal}
            onClick={() => navigate("/")}
          />
          <div
            className="flex flex-col items-center transition-transform hover:scale-110 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img className="w-[30px] h-[30px]" src={home} alt="home" />
            <p className="text-white text-[15px]">Головна</p>
          </div>
        </div>

        <div
          className="xl:hidden flex flex-col justify-around w-[30px] h-[30px] ml-4  cursor-pointer"
          onClick={toggleMenu}
        >
          <div className="w-full h-1 bg-white rounded-sm"></div>
          <div className="w-full h-1 bg-white rounded-sm"></div>
          <div className="w-full h-1 bg-white rounded-sm"></div>
        </div>

        {menuOpen && (
          <>
            <div
              className="fixed top-0 left-0 w-full h-full bg-black/30 z-[9998]"
              onClick={toggleMenu}
            ></div>

            <div className="absolute top-[-2px] left-0 w-[240px] h-[calc(100vh-2px)] bg-white z-[10000] mt-1 border-r-2 border-gray-300 rounded-tr-md rounded-br-md p-4 flex flex-col gap-4 overflow-y-auto">
              <div className="flex justify-end">
                <FiX
                  size={24}
                  className="cursor-pointer text-gray-700"
                  onClick={toggleMenu}
                />
              </div>

              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img
                  className="w-[30px] h-[30px] filter contrast-0 brightness-0"
                  src={home}
                  alt="Головна"
                />
                <p className="text-black text-[15px]">Головна</p>
              </div>

              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={handleLikedWindow}
              >
                <img
                  className="w-[30px] h-[30px] filter contrast-0 brightness-0"
                  src={liked}
                  alt="Обране"
                />
                <p className="text-black text-[15px]">Обране</p>
              </div>

              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={handleBasketClicked}
              >
                <img
                  className="w-[30px] h-[30px] filter contrast-0 brightness-0"
                  src={basket}
                  alt="Корзина"
                />
                <p className="text-black text-[15px]">Корзина</p>
              </div>

              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={handleProfileClick}
              >
                <img
                  className="w-[30px] h-[30px] filter contrast-0 brightness-0"
                  src={profile}
                  alt="Профіль"
                />
                <p className="text-black text-[15px]">Профіль</p>
              </div>

              <div className="flex items-center gap-3 cursor-pointer">
                <img
                  className="w-[30px] h-[30px] filter contrast-0 brightness-0"
                  src={visited}
                  alt="Переглянуте"
                />
                <p className="text-black text-[15px]">Переглянуте</p>
              </div>

              <div className="flex items-center gap-3 cursor-pointer">
                <img
                  className="w-[30px] h-[30px] filter contrast-0 brightness-0"
                  src={history}
                  alt="Історія замовлень"
                />
                <p className="text-black text-[15px]">Історія замовлень</p>
              </div>

              <div className="flex items-center gap-3 cursor-pointer">
                <img
                  className="w-[30px] h-[30px] filter contrast-0 brightness-0"
                  src={chat}
                  alt="Чат-бот"
                />
                <p className="text-black text-[15px]">Чат-бот</p>
              </div>
            </div>
          </>
        )}

        <form className="flex items-center border-2 border-gray-300 bg-white rounded-md pl-2 w-[80%] xl:w-[790px] h-[48px] overflow-hidden">
          <input
            type="text"
            className="flex-1 h-full text-[16px] font-sans outline-none border-none"
            name="q"
            placeholder="пошук..."
          />
          <button type="submit" className="pr-2">
            <img src={search} alt="search" className="w-[20px] h-[20px]" />
          </button>
        </form>

        <div className="hidden xl:flex items-center gap-8">
          <div
            className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
            onClick={handleLikedWindow}
          >
            <img className="w-[30px] h-[30px]" src={liked} />
            <p className="text-white text-[15px]">Обране</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
            onClick={handleBasketClicked}
          >
            <img className="w-[30px] h-[30px]" src={basket} />
            <p className="text-white text-[15px]">Корзина</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
            onClick={handleProfileClick}
          >
            <img className="w-[30px] h-[30px]" src={profile} />
            <p className="text-white text-[15px]">Профіль</p>
          </div>
        </div>
      </div>
    </div>
  );
}
