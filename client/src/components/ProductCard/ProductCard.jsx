import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/cartContext";
import { useSaved } from "../../contexts/savedContext";

import likeOrder from "../../images/likeOrder.svg";
import basketCard from "../../images/basketCard.svg";

export default function ProductCard({ weapon }) {
  const { addToCart } = useCart();
  const { saved, addToSaved, removeFromSaved } = useSaved();

  const navigate = useNavigate();

  const handleNavigateToProductPage = (name) => {
    navigate(`/product/${name}`);
  };

  const isSaved = saved.some((item) => item.product_id === weapon.product_id);

  return (
    <div className="product-card-wrapper">
      <div className="product-card-img">
        <img
          src={`data:image/jpg;base64,${weapon.image}`}
          onClick={() => handleNavigateToProductPage(weapon.name)}
        />
      </div>
      <div className="product-card-text-wrapper">
        <p
          className="product-name-card"
          onClick={() => handleNavigateToProductPage(weapon.name)}
        >
          {weapon.name}
        </p>
        <p className="product-characteristics-card">Калібр: {weapon.caliber}</p>
        <p className="product-characteristics-card">Артикул: {weapon.code}</p>
        <p className="product-characteristics-availability">в наявності</p>
        <p className="product-price-card">{weapon.price}$</p>
      </div>
      <div className="footer-buttons">
        <button className="to-basket" onClick={() => addToCart(weapon)}>
          <img className="to-basket-card" src={basketCard} />
          До корзини
        </button>
        {isSaved ? (
          <div>
            <button
              className="like-button"
              onClick={() => removeFromSaved(weapon.product_id)}
            >
              <img src={likeOrder} />
            </button>
          </div>
        ) : (
          <button className="like-button" onClick={() => addToSaved(weapon)}>
            <img src={likeOrder} />
          </button>
        )}
      </div>
    </div>
  );
}
