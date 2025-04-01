import React, { useEffect } from "react";
import "./SavedWindow.css";
import cancel from "../../images/cancel.svg";
import trash from "../../images/trash.svg";
import { useModal } from "../../contexts/modalContext";
import { useSaved } from "../../contexts/savedContext";

export default function SavedWindow() {
  const { isSavedWindowOpen, setSavedWindowOpen } = useModal();
  const { saved, clearSaved } = useSaved();

  const handleCloseWindow = () => {
    setSavedWindowOpen(false);
  };

  useEffect(() => {
    console.log(localStorage.getItem("saved"));
  }, []);

  return (
    <div className="saved-window">
      <div className="close-clear-basket">
        <img
          src={cancel}
          alt="Close basket"
          className="basket-close"
          onClick={handleCloseWindow}
        />
        <button className="clear-basket" onClick={clearSaved}>
          <img className="clear-basket-img" src={trash} />
        </button>
      </div>

      {saved.length > 0 ? (
        <div className="saved-container">
          {saved.map((savedProduct) => (
            <div className="saved-item">
              <p className="saved-item-name">{savedProduct.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>Ви не додали жодного товару</p>
        </div>
      )}
    </div>
  );
}
