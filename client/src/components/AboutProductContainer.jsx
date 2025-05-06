import React from "react";
import shipment from "../images/shipment.svg";
import novaPost from "../images/novaPost.svg";
import buy from "../images/buy.svg";
import likeOrder from "../images/likeOrder.svg";
import { useCart } from "../contexts/cartContext";

export default function AboutProductContainer({ product }) {
  const { addToCart } = useCart();

  const isTank = product.product_type === "Танк";
  const isAircraft = product.product_type === "Літак";
  const isGun = product.product_type === "Зброя";

  return (
    <div className="relative w-full border-t border-black px-4">
      <div className="flex flex-col lg:flex-row gap-6 pt-4">
        {product.image ? (
          <img
            className="w-full max-w-[540px] h-auto object-contain border-2 border-gray-300"
            src={`data:image/jpg;base64,${product.image}`}
            alt="product"
          />
        ) : (
          <p>Зображення недоступне</p>
        )}

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between">
            <p className="text-[22px] sm:text-[25px] text-black font-sans">
              {product.name}
            </p>
            <p className="text-[18px] sm:text-[20px] text-right font-sans">
              Код: {product.article}
            </p>
          </div>

          <div className="border-t border-black pt-4 flex flex-col lg:flex-row gap-6">
            <div className="flex flex-col gap-4">
              <p className="bg-[#5ECB6B] text-white text-center text-[18px] py-1 rounded font-sans">
                В наявності
              </p>
              <p className="text-[30px] sm:text-[35px] text-left font-sans">
                {product.price}₴
              </p>
            </div>

            <div className="text-[18px] font-sans">
              <p className="m-0">Доставка</p>
              <div className="w-full max-w-[280px] border border-black rounded mt-1 p-2">
                <p className="flex items-center gap-2">
                  <img src={shipment} alt="Самовивіз" className="w-5 h-5" />
                  Самовивіз
                </p>
                <p className="flex items-center gap-2 mt-2">
                  <img src={novaPost} alt="Нова пошта" className="w-5 h-5" />
                  Нова пошта
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-end w-full max-w-[220px] gap-2">
              <button
                onClick={() => addToCart(product)}
                className="bg-[#68e568] text-white text-[20px] sm:text-[25px] font-sans w-full h-[44px] rounded flex items-center justify-center gap-2 transition hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md"
              >
                <img src={buy} alt="В кошик" className="w-5 h-5" />В кошик
              </button>

              <div className="flex gap-2">
                <button className="flex-1 h-[44px] border border-black rounded flex items-center justify-center text-[16px] sm:text-[20px] font-sans bg-white transition hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md">
                  В 1 клік
                </button>
                <button className="w-[44px] h-[44px] border border-black rounded flex items-center justify-center bg-white transition hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md">
                  <img src={likeOrder} alt="like" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[22px] sm:text-[26px] font-sans mb-2">
              Купують разом
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-300 rounded p-3 flex gap-3"
                >
                  <div className="w-[70px] h-[70px] bg-gray-100" />
                  <div className="flex flex-col justify-between flex-1">
                    <p className="text-[16px] font-sans">Назва товару</p>
                    <div className="flex items-center justify-between">
                      <p className="text-[18px]">100₴</p>
                      <button className="bg-[#68e568] text-white text-[14px] px-3 py-1 rounded transition hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md">
                        Купити
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-[24px] sm:text-[32px] font-sans mb-2">
          Опис товару
        </h2>
        <p className="text-[16px] font-sans mb-4">{product.desc}</p>

        <h3 className="text-[24px] sm:text-[32px] font-sans mb-2">
          Характеристики
        </h3>
        <ul className="list-disc list-inside text-[16px] font-sans space-y-2">
          {isGun && (
            <>
              <li>Калібр: {product.caliber}</li>
              <li>Вага: {product.weight} кг</li>
              <li>Довжина: {product.length} см</li>
            </>
          )}
          {isAircraft && (
            <>
              <li>Максимальна швидкість: {product.max_speed} км/год.</li>
              <li>Екіпаж: {product.crew_size}</li>
              <li>Дальність польоту: {product.max_speed} км.</li>
            </>
          )}
          {isTank && (
            <>
              <li>Максимальна швидкість: {product.max_speed} км/год.</li>
              <li>Екіпаж: {product.crew_size}</li>
              <li>Потужність двигуна: {product.engine_power} к/c.</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
