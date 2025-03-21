import React, { useContext } from "react";
import "./Header.css";
import logoFinal from "../../images/logoFinal.svg";
import basket from "../../images/basket.svg";
import liked from "../../images/liked.svg";
import profile from "../../images/profile.svg";
import ModalWindowsContext from "../../contexts/modalContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { isUserPanelOpen, setUserPanelOpen, isBasketOpen, setBasketOpen } =
    useContext(ModalWindowsContext);

  const handleProfileClick = () => {
    console.log("Profile");
    setUserPanelOpen(!isUserPanelOpen);
  };

  const handleBasketClicked = () => {
    console.log("Basket");
    setBasketOpen(!isBasketOpen);
  };

  const navigate = useNavigate();

  return (
    <div className="header-wrapper">
      <div className="header">
        <img
          className="logo-img"
          src={logoFinal}
          onClick={() => navigate("/")}
        />
        <div className="header-icons">
          <div className="header-icon-item">
            <img className="header-img-like" src={liked} />
            <p className="header-icon-text">Liked</p>
          </div>
          <div className="header-icon-item" onClick={handleBasketClicked}>
            <img className="header-img-basket" src={basket} />
            <p className="header-icon-text">Basket</p>
          </div>
          <div className="header-icon-item" onClick={handleProfileClick}>
            <img className="header-img-profile" src={profile} />
            <p className="header-icon-text">Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}
