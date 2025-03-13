import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import basket from "../../images/basket.svg";
import liked from "../../images/liked.svg";
import profile from "../../images/profile.svg";
import ModalWindowsContext from "../../contexts/modalContext";

export default function Header() {
  const { isUserPanelOpen, setUserPanelOpen } = useContext(ModalWindowsContext);

  const handleProfileClick = () => {
    setUserPanelOpen(!isUserPanelOpen);
  };

  return (
    <div className="header-wrapper">
      <div className="header">
        <img className="logo-img" src={logo} />
        <div className="header-icons">
          <div className="header-icon-item">
            <img className="header-img-like" src={liked} />
            <p className="header-icon-text">Liked</p>
          </div>
          <div className="header-icon-item">
            <img className="header-img-basket" src={basket} />
            <p className="header-icon-text">Basket</p>
          </div>
          <div className="header-icon-item">
            <img
              className="header-img-profile"
              src={profile}
              onClick={handleProfileClick}
            />
            <p className="header-icon-text">Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}
