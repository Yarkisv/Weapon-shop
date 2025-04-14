import React from "react";
import Rating from "../../components/Rating";

export default function ProductCharacteristics({ product }) {
  const isTank = product.product_type === "Танк";
  const isAircraft = product.product_type === "Літак";
  const isGun = product.product_type === "Зброя";

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-5 w-full">
      {/* Характеристики товару */}
      <div className="w-full lg:w-2/3 p-5 border border-gray-300 rounded bg-white font-sans">
        <h2 className="text-2xl font-bold font-[Liberation_Sans] mb-5 text-center">
          Характеристики товару
        </h2>
        <ul className="grid grid-cols-[250px_1fr] gap-y-2 text-[22px] font-[Liberation_Sans]">
          <li className="contents">
            <span className="text-left font-semibold text-gray-800 border-b border-gray-200 py-2">
              Назва:
            </span>
            <span className="border-b border-gray-200 py-2">
              {product.name}
            </span>
          </li>

          {/* Aircraft */}
          {isAircraft && (
            <>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Максимальна швидкість:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.max_speed} км/год
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Розмах крил:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.wingspan} м
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Кількість двигунів:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.engine_count}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Дальність польоту:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.flight_range} км
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Екіпаж:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.crew_size}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Макс. висота:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.max_altitude} м
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Порожня вага:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.empty_weight} кг
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Макс. злітна вага:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.max_takeoff_weight} кг
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Тип двигуна:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.engine_type}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Ємність пального:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.fuel_capacity} л
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Швидкість набору висоти:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.climb_rate} м/с
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Діапазон радару:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.radar_range} км
                </span>
              </li>
            </>
          )}

          {/* Tank */}
          {isTank && (
            <>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Товщина броні:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.armor_thickness} мм
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Екіпаж:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.crew_size}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Потужність двигуна:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.engine_power} к.с.
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Вага:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.weight} т
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Калібр гармати:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.gun_caliber} мм
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Довжина корпусу:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.hull_length} м
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Швидкість обертання башти:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.turret_rotation_speed} град/с
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Експлуатаційний радіус:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.operational_range} км
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Тип броні:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.armor_type}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Ємність пального:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.fuel_capacity} л
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b py-2 border-gray-200">
                  Тип трансмісії:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.transmission_type}
                </span>
              </li>
            </>
          )}

          {/* Gun */}
          {isGun && (
            <>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b border-gray-200 py-2">
                  Калібр:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.caliber}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b border-gray-200 py-2">
                  Вага:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.weight} кг
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b border-gray-200 py-2">
                  Довжина:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.length} см
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b border-gray-200 py-2">
                  Колір:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.color}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-gray-800 border-b border-gray-200 py-2">
                  Тип прикладу:
                </span>
                <span className="border-b border-gray-200 py-2">
                  {product.stock_type}
                </span>
              </li>
            </>
          )}

          {/* Загальні поля */}
          <li className="contents">
            <span className="text-left font-semibold text-gray-800 border-b border-gray-200 py-2">
              Виготовник:
            </span>
            <span className="border-b border-gray-200 py-2">
              {product.manufacturer_name}
            </span>
          </li>
          <li className="contents">
            <span className="text-left font-semibold text-gray-800 border-b border-gray-200 py-2">
              Країна:
            </span>
            <span className="border-b border-gray-200 py-2">
              {product.country}
            </span>
          </li>
          <li className="contents">
            <span className="text-left font-semibold text-gray-800 border-b border-gray-200 py-2">
              У наявності:
            </span>
            <span className="border-b border-gray-200 py-2">
              {product.stock} шт.
            </span>
          </li>
          <li className="contents">
            <span className="text-left font-semibold text-gray-800 border-b border-gray-200 py-2">
              Ціна:
            </span>
            <span className="border-b border-gray-200 py-2">
              {product.price} $
            </span>
          </li>
        </ul>
      </div>

      {/* Картка товару */}
      <div className="w-full lg:w-1/3 p-5 border border-gray-300 rounded bg-white font-sans shadow-md flex flex-col items-center">
        <h3 className="text-xl font-bold mb-2 text-center">{product.name}</h3>
        <img
          src={`data:image/jpg;base64,${product.image}`}
          alt={product.name}
          className="w-full h-64 object-contain mb-4"
        />
        <p>Артикул: {product.article}</p>
        <Rating
          rating={product.rating}
          // reviews={getReviewText(product.reviews_count)}
        />
        <div className="flex flex-col w-[217px] ml-[15px] justify-end">
          <button className="bg-[#68e568] text-white text-[25px] font-sans w-[217px] h-[44px] rounded flex items-center justify-center gap-[5px] cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md">
            В кошик
          </button>

          <div className="flex gap-[10px] mt-[10px]">
            <button className="w-[159px] h-[44px] border border-black rounded flex items-center justify-center text-[20px] font-sans bg-white cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md">
              В 1 клік
            </button>
            <button className="w-[48px] h-[44px] border border-black rounded flex items-center justify-center bg-white cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md"></button>
          </div>
        </div>
      </div>
    </div>
  );
}
