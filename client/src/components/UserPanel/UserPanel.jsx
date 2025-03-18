import React, { useContext, useEffect, useState } from "react";
import "./UserPanel.css";
import { useNavigate } from "react-router-dom";
import ModalWindowsContext from "../../contexts/modalContext";
import basket from "../../images/basket.svg";
import bonuses from "../../images/bonuses.svg";
import chat from "../../images/chat.svg";
import history from "../../images/history.svg";
import partners from "../../images/partners.svg";
import reviews from "../../images/reviews.svg";

export default function UserPanel() {
  const { isUserPanelOpen, setUserPanelOpen } = useContext(ModalWindowsContext);
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("isAuth"));

  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("isAuth"));
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
    setUserPanelOpen(!isUserPanelOpen);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    navigate("/");
    console.log(
      `Logout successful, token - [${localStorage.getItem("token")}]]`
    );

    setIsAuth(!!localStorage.getItem("isAuth"));
  };

  const handdleProfile = () => {
    navigate("/profile");
    setUserPanelOpen(!isUserPanelOpen);
  };

  return (
    <div className="user-panel">
      {!isAuth ? (
        <button className="login-button" onClick={handleLoginClick}>
          Увійти
        </button>
      ) : (
        <button className="Profile" onClick={handdleProfile}>
          Profile
        </button>
      )}

      <ul className="modal-list">
        <li className="modal-item">
          {" "}
          <img src={basket} alt="" />
          Basket
        </li>
        <li className="modal-item">
          {" "}
          <img src={history} alt="" />
          Order history
        </li>
        <li className="modal-item">
          {" "}
          <img src={chat} alt="" />
          Chat-bot
        </li>
        <li className="modal-item">
          {" "}
          <img src={partners} alt="" />
          Partnership
        </li>
        <li className="modal-item">
          {" "}
          <img src={bonuses} alt="" />
          Bonuses
        </li>
        <li className="modal-item">
          {" "}
          <img src={reviews} alt="" />
          Reviews
        </li>
      </ul>
      <button className="logout-button" onClick={handleLogoutClick}>
        Logout
      </button>
    </div>
  );
}
