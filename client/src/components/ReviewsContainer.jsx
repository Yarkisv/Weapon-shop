import React, { useState } from "react";
import likeOrder from "../images/likeOrder.svg";
import { FaStar } from "react-icons/fa";

export default function ReviewFormStatic({ product }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  return (
    <div className="max-w-6xl mx-auto mt-10 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Залишити відгук
        </h2>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Ім’я</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            placeholder="Ваше ім’я"
          />
          <label className="text-gray-700 mb-1">Пошта</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            placeholder="Ваша пошта"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-2">Оцінка</label>
          <div className="flex gap-2">
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRating(currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                  className="focus:outline-none"
                >
                  <FaStar
                    size={30}
                    className={
                      currentRating <= (hover ?? rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 mb-1">Відгук</label>
          <textarea
            className="border border-gray-300 rounded-md p-2 h-28 resize-none"
            placeholder="Ваш коментар"
          ></textarea>
        </div>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-2 rounded-md">
          Надіслати
        </button>
      </div>

      <div className="w-full lg:w-1/3 p-6 border border-gray-200 rounded-2xl bg-white font-sans shadow-md flex flex-col items-center space-y-4 transition-all duration-300 hover:shadow-xl">
        <h3 className="text-2xl font-bold text-center text-gray-800">
          {product.name}
        </h3>
        <img
          src={`data:image/jpg;base64,${product.image}`}
          alt={product.name}
          className="w-full h-60 object-contain rounded-md shadow-sm"
        />

        <div className="text-sm text-gray-500">Артикул: {product.article}</div>

        <div className="flex flex-col items-center w-full mt-4 space-y-3">
          <button className="cursor-pointer bg-green-500 text-white text-lg font-semibold w-full h-12 rounded-[5px] flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95">
            В кошик
          </button>

          <div className="flex gap-3 w-full">
            <button className="cursor-pointer flex-1 h-12 border border-gray-300 rounded-[5px] flex items-center justify-center text-base font-medium bg-white hover:scale-105 hover:shadow-lg active:scale-95 transition-transform">
              В 1 клік
            </button>
            <button className="cursor-pointer w-12 h-12 border border-gray-300 rounded-[5px] flex items-center justify-center bg-white hover:scale-105 hover:shadow-lg active:scale-95 transition-transform">
              <img src={likeOrder} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
