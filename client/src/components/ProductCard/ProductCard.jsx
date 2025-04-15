import React from "react";
import "./ProductCard.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../contexts/cartContext";
import { useSaved } from "../../contexts/savedContext";
import Rating from "../../components/Rating";
import likeOrder from "../../images/likeOrder.svg";
import LikeOrderSaved from "../../images/LikeOrderSaved.svg";
import basketCard from "../../images/basketCard.svg";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { saved, addToSaved, removeFromSaved } = useSaved();

  const { category } = useParams();

  const navigate = useNavigate();

  const handleNavigateToProductPage = (name) => {
    navigate(`/catalog/${category}/${name}`);
  };

  const isSaved = saved.some((item) => item.product_id === product.product_id);

  const getReviewText = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${count} відгуків`;
    if (lastDigit === 1) return `${count} відгук`;
    if (lastDigit >= 2 && lastDigit <= 4) return `${count} відгуки`;
    return `${count} відгуків`;
  };

  return (
    <div className="product-card-wrapper">
      <div className="product-card-img">
        <img
          src={`data:image/jpg;base64,${product.image}`}
          onClick={() => handleNavigateToProductPage(product.name)}
        />
      </div>
      <div className="product-card-text-wrapper">
        <p
          className="product-name-card"
          onClick={() => handleNavigateToProductPage(product.name)}
        >
          {product.name}
        </p>
        <p className="product-characteristics-card">Код: {product.article}</p>
        <p className="product-characteristics-availability">в наявності</p>

        <Rating
          rating={product.rating}
          reviews={getReviewText(product.reviews_count)}
        />

        <p className="product-price-card">{product.price} ₴</p>
      </div>
      <div className="footer-buttons">
        <button className="to-basket" onClick={() => addToCart(product)}>
          <img className="to-basket-card" src={basketCard} />
          До корзини
        </button>
        {isSaved ? (
          <div>
            <button
              className="like-button-card-saved"
              onClick={() => removeFromSaved(product.product_id)}
            >
              <img src={LikeOrderSaved} />
            </button>
          </div>
        ) : (
          <button
            className="like-button-card"
            onClick={() => addToSaved(product)}
          >
            <img src={likeOrder} />
          </button>
        )}
      </div>
    </div>
  );
}
