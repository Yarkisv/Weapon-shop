import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/modalContext";
import SearchBar from "./SearchBar";

import logoFinal from "../images/logoFinal.svg";
import basket from "../images/basket.svg";
import liked from "../images/liked.svg";
import profile from "../images/profile.svg";
import home from "../images/home.svg";
import search from "../images/search.svg";

export default function Header() {
  const {
    setUserPanelOpen,
    isBasketOpen,
    setBasketOpen,
    isSavedWindowOpen,
    setSavedWindowOpen,
    isSearchBarOpen,
    setSearcBarOpen,
  } = useModal();

  const { isMenuOpen, setMenuOpen } = useModal();

  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const cleanedText = encodeURIComponent(query.trim());
    if (cleanedText) {
      navigate(`/search/${cleanedText}`);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleProfileWindowClick = () => {
    setUserPanelOpen(true);
  };

  const handleBasketClickedOpen = () => {
    setBasketOpen(!isBasketOpen);
  };

  const handleLikedWindowOpen = () => {
    setSavedWindowOpen(!isSavedWindowOpen);
  };

  const handleSearchBarClicked = () => {
    setSearcBarOpen(!isSearchBarOpen);
  };

  return (
    <>
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

          <form
            ref={searchInputRef}
            className="z-[9999] flex flex-1 max-w-[1000px] mx-4 border-2 border-gray-300 bg-white rounded-md pl-2 h-[40px] overflow-hidden"
            onSubmit={onSearchSubmit}
          >
            <input
              type="text"
              className="flex-1 h-full text-[14px] font-sans outline-none border-none"
              name="text"
              autoComplete="off"
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
              <p className="text-white text-[13px]">Кошик</p>
            </div>
            <div
              className="flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
              onClick={handleProfileWindowClick}
            >
              <img className="w-[24px] h-[24px]" src={profile} />
              <p className="text-white text-[13px]">Профіль</p>
            </div>
          </div>
        </div>
      </div>

      {isSearchBarOpen && (
        <SearchBar
          query={query}
          inputRef={searchInputRef}
          isOpen={isSearchBarOpen}
        />
      )}
    </>
  );
}
