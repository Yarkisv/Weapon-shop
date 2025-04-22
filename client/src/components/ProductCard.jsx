import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../contexts/cartContext";
import { useSaved } from "../contexts/savedContext";
import Rating from "./Rating";
import likeOrder from "../images/likeOrder.svg";
import LikeOrderSaved from "../images/LikeOrderSaved.svg";
import basketCard from "../images/basketCard.svg";

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
    <div className="w-[240px] h-[400px] bg-white border border-black/30 rounded-md flex flex-col items-center justify-between overflow-hidden transition duration-300 ease-in-out transform hover:scale-[1.01] hover:-translate-y-1 hover:shadow-lg">
      <div className="w-full h-[180px] flex justify-center items-center overflow-hidden cursor-pointer">
        <img
          src={`data:image/jpg;base64,${product.image}`}
          onClick={() => handleNavigateToProductPage(product.name)}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="flex flex-col flex-grow w-full px-2 gap-1 text-left">
        <p
          className="text-[16px] font-medium leading-[1.2em] h-[2.4em] overflow-hidden cursor-pointer pl-2"
          onClick={() => handleNavigateToProductPage(product.name)}
        >
          {product.name}
        </p>
        <p className="text-sm font-medium text-black ml-2">
          Код: {product.article}
        </p>
        <p className="text-white bg-green-400 text-sm font-medium w-[120px] h-[22px] rounded-md text-center ml-2">
          в наявності
        </p>
        <Rating
          rating={product.rating}
          reviews={getReviewText(product.reviews_count)}
        />
        <p className="text-xl font-medium pl-2">{product.price} ₴</p>
      </div>
      <div className="flex gap-2 justify-between px-2 pb-2">
        <button
          className="flex items-center justify-center cursor-pointer gap-1 h-9 w-[160px] bg-[#6382a1] text-white text-[16px] font-sans rounded-md transition hover:bg-[#4f6881]"
          onClick={() => addToCart(product)}
        >
          <img className="w-4 h-4" src={basketCard} alt="До корзини" />
          До корзини
        </button>
        {isSaved ? (
          <button
            className="w-9 h-9 border border-black flex items-center justify-center rounded-md bg-[#940c0e] hover:bg-[#760a0b]"
            onClick={() => removeFromSaved(product.product_id)}
          >
            <img src={LikeOrderSaved} alt="Збережено" className="w-4 h-4" />
          </button>
        ) : (
          <button
            className="w-9 h-9 border cursor-pointer border-black flex items-center justify-center rounded-md bg-white hover:bg-gray-300"
            onClick={() => addToSaved(product)}
          >
            <img src={likeOrder} alt="Зберегти" className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
