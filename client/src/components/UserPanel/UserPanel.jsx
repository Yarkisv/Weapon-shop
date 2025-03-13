import React, { useContext } from "react";
import "./UserPanel.css";
import { useNavigate } from "react-router-dom";
import ModalWindowsContext from "../../contexts/modalContext";

export default function UserPanel() {
  const { isUserPanelOpen, setUserPanelOpen } = useContext(ModalWindowsContext);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
    setUserPanelOpen(!isUserPanelOpen);
  };

  return (
    <div className="user-panel">
      <button className="login-button" onClick={handleLoginClick}>
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
