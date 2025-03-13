import React from "react";
import "./Header.css";
import logo from "../../images/logo.svg"
import basket from "../../images/basket.svg"
import liked from "../../images/liked.svg"
import profile from "../../images/profile.svg"

export default function Header() {
  return (
    <div className="header-wrapper">
      <div className="header">
        <img className="logo-img" src={logo} alt="" />
        <div className="header-icons">
          <div className="header-icon-item">
            <img className="header-img-like" src={liked} alt="" />
            <p className="header-icon-text">Liked</p>
          </div>
          <div className="header-icon-item">
            <img className="header-img-basket" src={basket} alt="" />
            <p className="header-icon-text">Basket</p>
          </div>
          <div className="header-icon-item">
            <img className="header-img-profile" src={profile} alt="" />
            <p className="header-icon-text">Profile</p>
          </div>

        </div>
      </div>
    </div>
  )
}
