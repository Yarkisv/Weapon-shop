import React from "react";
import "./UserPanel.css";
import { useNavigate } from "react-router-dom";

export default function UserPanel() {
  const navigate = useNavigate();

  return (
    <div className="user-panel">
      <button className="login-button" onClick={() => navigate("/login")}>
        Увійти
      </button>
      <ul className="modal-list">
        <li className="modal-item">Кошик</li>
        <li className="modal-item">Історія замовлень</li>
        <li className="modal-item">Чат-бот</li>
        <li className="modal-item">Співпраця</li>
        <li className="modal-item">Бонуси</li>
        <li className="modal-item">Відгуки</li>
      </ul>
    </div>
  );
}
