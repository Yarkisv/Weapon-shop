import React, { useEffect } from "react";
import "./SavedWindow.css";
import cancel from "../../images/cancel.svg";
import trash from "../../images/trash.svg";
import { useModal } from "../../contexts/modalContext";
import { useSaved } from "../../contexts/savedContext";

export default function SavedWindow() {
  const { isSavedWindowOpen, setSavedWindowOpen, removeFromSaved } = useModal();
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
            // <div className="saved-item">
            //   <p className="saved-item-name">{savedProduct.name}</p>
            // </div>
            <div key={savedProduct.id} className="basket-item">
              <img
                src={`data:image/jpg;base64,${savedProduct.image}`}
                alt={savedProduct.name}
                className="basket-item-image"
              />
              <button
                className="remove-item-button"
                onClick={() => removeFromSaved(savedProduct.product_id)}
              >
                <img className="clear-basket-img" src={trash} />
              </button>
              <div className="basket-item-details">
                <h4 className="basket-order-name">{savedProduct.name}</h4>
                <p className="basket-order-characteristics">
                  <strong>Caliber:</strong> {savedProduct.caliber}
                </p>
                <p className="basket-order-characteristics">
                  <strong>Code:</strong> {savedProduct.code}
                </p>
                <p className="basket-order-characteristics">
                  <strong>Price:</strong> {savedProduct.price} $
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="basket-empty-wrapper">
          <p className="basket-empty">Ви не додали жодного товару</p>
        </div>
      )}
    </div>
  );
}
