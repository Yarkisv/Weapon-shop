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
    <div className="w-[300px] h-[450px] bg-white border border-black rounded-md flex flex-col items-center justify-between overflow-hidden transition duration-300 ease-in-out transform hover:scale-[1.01] hover:-translate-y-1 hover:shadow-lg">
      <div className="w-full h-[200px] flex justify-center items-center overflow-hidden cursor-pointer">
        <img
          src={`data:image/jpg;base64,${product.image}`}
          onClick={() => handleNavigateToProductPage(product.name)}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="flex flex-col flex-grow w-full px-2 gap-1 text-left">
        <p
          className="text-[22px] font-medium leading-[1.2em] h-[2.4em] overflow-hidden cursor-pointer pl-2"
          onClick={() => handleNavigateToProductPage(product.name)}
        >
          {product.name}
        </p>
        <p className="text-[16px] font-medium text-black ml-2">
          Код: {product.article}
        </p>
        <p className="text-white bg-green-400 text-[16px] font-medium w-[150px] h-[25px] rounded-md text-center ml-2">
          в наявності
        </p>
        <Rating
          rating={product.rating}
          reviews={getReviewText(product.reviews_count)}
        />
        <p className="text-[25px] font-medium ordinal pl-2">
          {product.price} ₴
        </p>
      </div>
      <div className="flex gap-4 justify-between px-2 pb-2">
        <button
          className="flex items-center justify-center gap-1 h-10 w-[220px] bg-[#6382a1] text-white text-[20px] font-sans rounded-md transition hover:bg-[#4f6881]"
          onClick={() => addToCart(product)}
        >
          <img className="w-5 h-5" src={basketCard} alt="До корзини" />
          До корзини
        </button>
        {isSaved ? (
          <button
            className="w-10 h-10 border border-black flex items-center justify-center rounded-md bg-[#940c0e] hover:bg-[#760a0b]"
            onClick={() => removeFromSaved(product.product_id)}
          >
            <img src={LikeOrderSaved} alt="Збережено" />
          </button>
        ) : (
          <button
            className="w-10 h-10 border border-black flex items-center justify-center rounded-md bg-white hover:bg-gray-300"
            onClick={() => addToSaved(product)}
          >
            <img src={likeOrder} alt="Зберегти" />
          </button>
        )}
      </div>
    </div>
  );
}
