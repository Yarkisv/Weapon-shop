import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/modalContext";
import SearchBar from "./SearchBar";

import logoFinal from "../images/logoFinal.svg";
import logoBlack from "../images/logoBlack.svg";
import basket from "../images/basket.svg";
import liked from "../images/liked.svg";
import visited from "../images/ProfilePageImg/visited.svg";
import history from "../images/history.svg";
import chat from "../images/chat.svg";
import profile from "../images/profile.svg";
import home from "../images/home.svg";
import search from "../images/search.svg";
import { FiX } from "react-icons/fi";

export default function Header() {
  const {
    isUserPanelOpen,
    setUserPanelOpen,
    isBasketOpen,
    setBasketOpen,
    isSavedWindowOpen,
    setSavedWindowOpen,
    isSearchBarOpen,
    setSearcBarOpen,
  } = useModal();

  const [menuOpen, setMenuOpen] = useState(false);

  const [query, setQuery] = useState("");

  const onSearchSubmit = () => {
    const cleanedText = encodeURIComponent(query.trim());
    if (cleanedText) {
      navigate(`/search/${cleanedText}`);
    }
  };

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
    navigate("/profile");
  };

  const handleBasketClicked = () => {
    navigate("/profile/basket");
  };

  const handleBasketClickedOpen = () => {
    setBasketOpen(!isBasketOpen);
  };

  const handleLikedWindow = () => {
    navigate("/profile/wishlist");
  };

  const handleLikedWindowOpen = () => {
    setSavedWindowOpen(!isSavedWindowOpen);
  };

  const handleSearchBarClicked = () => {
    setSearcBarOpen(!isSearchBarOpen);
  };

  const handleChatBotClick = () => {
    navigate("/profile/chatbot");
  };

  const handleOrderHistoryClick = () => {
    navigate("/profile/orderhistory");
  };

  const handleViewedClick = () => {
    navigate("/profile/viewed");
  };

  const navigate = useNavigate();

  return (
    <div className="w-full h-[60px] z-[9999] bg-[#303030] flex items-center top-0 left-0">
      <div className="max-w-[1440px] w-full mx-auto flex items-center justify-between px-3 lg:px-0">
        <div className="hidden xl:flex items-center gap-3">
          <img
            className="w-[190px] h-[45px] cursor-pointer"
            src={logoFinal}
            onClick={() => navigate("/")}
          />
          <div
            className="flex flex-col items-center transition-transform hover:scale-110 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img className="w-[24px] h-[24px]" src={home} alt="home" />
            <p className="text-white text-[13px]">Головна</p>
          </div>
        </div>

        <div
          className="xl:hidden flex flex-col justify-around w-[24px] h-[24px] ml-3 cursor-pointer"
          onClick={toggleMenu}
        >
          <div className="w-full h-[2px] bg-white rounded-sm"></div>
          <div className="w-full h-[2px] bg-white rounded-sm"></div>
          <div className="w-full h-[2px] bg-white rounded-sm"></div>
        </div>

        {menuOpen && (
          <>
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

              <div className="px-4 py-2">
                <p className="text-xs text-gray-600 uppercase mb-2">
                  Навігація
                </p>

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
              </div>
            </div>
          </>
        )}

        <form
          className="flex  border-2 border-gray-300 bg-white rounded-md pl-2 w-[65%]  h-[40px] overflow-hidden"
          onSubmit={onSearchSubmit}
        >
          <input
            type="text"
            className="flex-1 h-full text-[14px] font-sans outline-none border-none"
            name="text"
            placeholder="пошук..."
            onClick={handleSearchBarClicked}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="pr-2">
            <img src={search} className="w-[18px] h-[18px] cursor-pointer" />
          </button>
        </form>

        <div className="hidden xl:flex items-center gap-6">
          <div
            className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
            onClick={handleLikedWindowOpen}
          >
            <img className="w-[24px] h-[24px]" src={liked} />
            <p className="text-white text-[13px]">Обране</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
            onClick={handleBasketClickedOpen}
          >
            <img className="w-[24px] h-[24px]" src={basket} />
            <p className="text-white text-[13px]">Корзина</p>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
            onClick={handleProfileClick}
          >
            <img className="w-[24px] h-[24px]" src={profile} />
            <p className="text-white text-[13px]">Профіль</p>
          </div>
        </div>
      </div>
      {isSearchBarOpen && <SearchBar query={query} />}
    </div>
  );
}
