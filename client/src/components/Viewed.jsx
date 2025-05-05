import React from "react";
import Rating from "./Rating";
import likeOrder from "../images/likeOrder.svg";
import basketCard from "../images/basketCard.svg";

export default function Viewed() {
  const dummyViewed = [
    {
      product_id: 1,
      name: "Назва товару 1",
      article: "A12345",
      image: "",
      rating: 4,
      reviews_count: 12,
      price: 999,
    },
    {
      product_id: 2,
      name: "Назва товару 2",
      article: "B67890",
      image: "",
      rating: 5,
      reviews_count: 8,
      price: 799,
    },
  ];

  const getReviewText = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${count} відгуків`;
    if (lastDigit === 1) return `${count} відгук`;
    if (lastDigit >= 2 && lastDigit <= 4) return `${count} відгуки`;
    return `${count} відгуків`;
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Переглянуті товари
      </h1>

      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md relative">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg text-gray-600">Історія вашого перегляду</p>
        </div>

        {dummyViewed.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto">
            {dummyViewed.map((product) => (
              <div
                key={product.product_id}
                className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="w-[100px] h-[80px] bg-gray-200 flex items-center justify-center rounded">
                  {product.image ? (
                    <img
                      src={`data:image/jpg;base64,${product.image}`}
                      alt={product.name}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">Зображення</span>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="text-base font-semibold text-gray-800">
                    {product.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Код:</span> {product.article}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Ціна:</span> {product.price} ₴
                  </p>
                  <Rating
                    rating={product.rating}
                    reviews={getReviewText(product.reviews_count)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 bg-[#6382a1] text-white rounded hover:bg-[#4f6881] text-sm">
                    <img src={basketCard} className="w-4 h-4" alt="Купити" />
                    Купити
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center border border-black rounded hover:bg-gray-200">
                    <img src={likeOrder} className="w-4 h-4" alt="Зберегти" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[300px]">
            <div className="text-center text-gray-500 text-lg">
              Ви ще не переглядали жодного товару
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
