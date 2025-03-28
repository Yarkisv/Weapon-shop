import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ weapon, addToCart }) {
  const navigate = useNavigate();

  const handleNavigateToProductPage = (name) => {
    navigate(`/product/${name}`);
  };

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
          className="product-name"
          onClick={() => handleNavigateToProductPage(weapon.name)}
        >
          {weapon.name}{" "}
        </p>
        <p className="product-characteristics">Caliber: {weapon.caliber}</p>
        <p className="product-characteristics">Code: {weapon.code}</p>
        <p className="product-price">{weapon.price}$</p>
      </div>

      <button
        className="to-basket"
        onClick={(event) => {
          addToCart(weapon);
          event.stopPropagation();
        }}
      >
        To basket
      </button>
    </div>
  );
}
