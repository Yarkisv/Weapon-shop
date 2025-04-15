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

      <div className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-4">Товар</h3>
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            {product.image ? (
              <img
                src={`data:image/jpg;base64,${product.image}`}
                className="w-[200px] h-[200px] object-contain border border-gray-200 rounded"
                alt="product"
              />
            ) : (
              <div>
                <p>Зобрежання не доступне</p>
              </div>
            )}

            <div className="flex flex-col justify-between h-full">
              <p className="text-lg font-sans mb-2">{product.name}</p>
              <p className="text-gray-500 mb-2">Код: {product.article}</p>
              <p className="text-2xl ordinal text-green-600">
                {product.price} ₴
              </p>
            </div>
          </div>
        </div>

        <div>
          <p>{product.desc}</p>
          <button className="bg-[#68e568] text-white text-[25px] font-sans w-full h-[44px] rounded flex items-center justify-center gap-[5px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md">
            В кошик
          </button>
          <div className="flex gap-[10px] mt-[10px]">
            <button className="w-full h-[44px] border border-black rounded flex items-center justify-center text-[20px] font-sans bg-white cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md">
              В 1 клік
            </button>
            <button className="w-[48px] h-[44px] border border-black rounded flex items-center justify-center bg-white cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md">
              <img src={likeOrder} alt="like" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
