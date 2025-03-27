import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ weapon, addToCart }) {
  const navigate = useNavigate();

  const handleNavigateToProductPage = (name) => {
    navigate(`/product/${name}`);
  };

  return (
    <div
      className="product-card-wrapper"
      onClick={() => handleNavigateToProductPage(weapon.name)}
    >
      <div className="product-card-img">
        <img src={`data:image/jpg;base64,${weapon.image}`} alt="" />
      </div>
      <div className="product-card-text-wrapper">
        <p className="product-name">{weapon.name}</p>
        <p className="product-characteristics">Caliber: {weapon.caliber}</p>
        <p className="product-characteristics">Code: {weapon.code}</p>
        <p className="product-price">{weapon.price}$</p>
      </div>

      <button className="to-basket" onClick={() => addToCart(weapon)}>
        To basket
      </button>
    </div>
  );
}
