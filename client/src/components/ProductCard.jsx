import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../contexts/cartContext";
import { useSaved } from "../contexts/savedContext";
import { useModal } from "../contexts/modalContext";

import Rating from "./Rating";

import likeOrder from "../images/likeOrder.svg";
import LikeOrderSaved from "../images/LikeOrderSaved.svg";
import basketCard from "../images/basketCard.svg";

export default function ProductCard({ product }) {
  const { orders, addToCart } = useCart();
  const { saved, addToSaved, removeFromSaved } = useSaved();
  const { setBasketOpen } = useModal();

  const { category } = useParams();

  const isInCart = orders.some(
    (item) => item.product_id === product.product_id
  );

  const navigate = useNavigate();

  const openCart = () => {
    setBasketOpen(true);
  };

  const handleNavigateToProductPage = (name) => {
    let viewedProducts =
      JSON.parse(localStorage.getItem("viewedProducts")) || [];

    if (
      !viewedProducts.some((item) => item.product_id === product.product_id)
    ) {
      viewedProducts.push(product);
      localStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));
    }

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
    <div className="w-full max-w-[240px] aspect-[3/5] h-[400px] bg-white border border-black/30 rounded-md flex flex-col items-center justify-between overflow-hidden transition duration-300 ease-in-out transform hover:scale-[1.01] hover:-translate-y-1 hover:shadow-lg">
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
      <div className="flex justify-between items-center gap-2 px-2 pb-2 w-full">
        <div className="flex-shrink min-w-0 w-full">
          {isInCart ? (
            <button
              className="flex items-center justify-center gap-1 h-9 w-full bg-green-600 text-white text-[14px] font-sans rounded-md cursor-pointer hover:bg-green-700 overflow-hidden text-ellipsis whitespace-nowrap"
              onClick={openCart}
            >
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              В корзині
            </button>
          ) : (
            <button
              className="flex items-center justify-center gap-1 h-9 w-full bg-[#6382a1] text-white text-[14px] font-sans rounded-md transition hover:bg-[#4f6881] overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
              onClick={() => addToCart(product)}
            >
              <img className="w-4 h-4 flex-shrink-0" src={basketCard} />
              Купити
            </button>
          )}
        </div>

        <div className="flex-shrink-0 w-9 h-9">
          {isSaved ? (
            <button
              className="w-full h-full border border-black flex items-center justify-center rounded-md bg-[#940c0e] hover:bg-[#760a0b] cursor-pointer"
              onClick={() => removeFromSaved(product.product_id)}
            >
              <img src={LikeOrderSaved} alt="Збережено" className="w-4 h-4" />
            </button>
          ) : (
            <button
              className="w-full h-full border border-black flex items-center justify-center rounded-md bg-white hover:bg-gray-300 cursor-pointer"
              onClick={() => addToSaved(product)}
            >
              <img src={likeOrder} alt="Зберегти" className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
