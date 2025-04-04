import React, { useContext } from "react";
import "./Header.css";
import logoFinal from "../../images/logoFinal.svg";
import basket from "../../images/basket.svg";
import liked from "../../images/liked.svg";
import profile from "../../images/profile.svg";
import { useModal } from "../../contexts/modalContext";
import home from "../../images/home.svg";
import search from "../../images/search.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const {
    isUserPanelOpen,
    setUserPanelOpen,
    isBasketOpen,
    setBasketOpen,
    isSavedWindowOpen,
    setSavedWindowOpen,
  } = useModal();

  const handleProfileClick = () => {
    console.log("Profile");
    setUserPanelOpen(!isUserPanelOpen);
  };

  const handleBasketClicked = () => {
    console.log("Basket");
    setBasketOpen(!isBasketOpen);
  };

  const handleLikedWindow = () => {
    console.log("Liked window");
    setSavedWindowOpen(!isSavedWindowOpen);
  };

  const navigate = useNavigate();

  return (
    <div className="header-wrapper">
      <div className="header">
        <div className="header-icon-item-home-wrapper">
          <img
            className="logo-img"
            src={logoFinal}
            onClick={() => navigate("/")}
          />
          <div className="header-icon-item-home">
            <img
              className="header-home"
              src={home}
              alt=""
              onClick={() => navigate("/")}
            />
            <p className="header-icon-text">Головна</p>
          </div>
        </div>
        <form className="search-box">
          <input
            type="text"
            className="search-input"
            name="q"
            placeholder="пошук..."
          />
          <button type="submit" className="search-button">
            <img src={search} alt="" />
          </button>
        </form>
        <div className="header-icons">
          <div className="header-icon-item" onClick={handleLikedWindow}>
            <img className="header-img-like" src={liked} />
            <p className="header-icon-text">Обране</p>
          </div>
          <div className="header-icon-item" onClick={handleBasketClicked}>
            <img className="header-img-basket" src={basket} />
            <p className="header-icon-text">Корзина</p>
          </div>
          <div className="header-icon-item" onClick={handleProfileClick}>
            <img className="header-img-profile" src={profile} />
            <p className="header-icon-text">Профіль</p>
          </div>
        </div>
      </div>
    </div>
  );
}
