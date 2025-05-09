import Rating from "../components/Rating";
import buy from "../images/buy.svg";
import likeOrder from "../images/likeOrder.svg";

import { useSaved } from "../contexts/savedContext";
import { useCart } from "../contexts/cartContext";

export default function ProductCharacteristics({ product }) {
  const isTank = product.product_type === "Танк";
  const isAircraft = product.product_type === "Літак";
  const isGun = product.product_type === "Зброя";

  const { addToCart } = useCart();
  const { addToSaved } = useSaved();

  const getReviewText = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${count} відгуків`;
    if (lastDigit === 1) return `${count} відгук`;
    if (lastDigit >= 2 && lastDigit <= 4) return `${count} відгуки`;
    return `${count} відгуків`;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-5 w-full">
      <div className="w-full lg:w-2/3 p-5 border border-gray-300 rounded bg-white font-sans">
        <h2 className="text-2xl font-bold font-[Liberation_Sans] mb-5 text-center">
          Характеристики товару
        </h2>
        <ul className="grid grid-cols-[250px_1fr] gap-y-2 text-[22px] font-[Liberation_Sans]">
          <li className="contents">
            <span className="text-left font-semibold text-lg text-gray-800 border-b border-gray-200 py-2">
              Назва:
            </span>
            <span className="border-b text-lg border-gray-200 py-2">
              {product.name}
            </span>
          </li>

          {isAircraft && (
            <>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Максимальна швидкість:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.max_speed} км/год
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Розмах крил:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.wingspan} м
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Кількість двигунів:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.engine_count}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Дальність польоту:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.flight_range} км
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Екіпаж:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.crew_size}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Макс. висота:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.max_altitude} м
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Порожня вага:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.empty_weight} кг
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Макс. злітна вага:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.max_takeoff_weight} кг
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Тип двигуна:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.engine_type}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Ємність пального:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.fuel_capacity} л
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Швидкість набору висоти:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.climb_rate} м/с
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Діапазон радару:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.radar_range} км
                </span>
              </li>
            </>
          )}

          {isTank && (
            <>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Товщина броні:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.armor_thickness} мм
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Екіпаж:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.crew_size}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Потужність двигуна:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.engine_power} к.с.
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Вага:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.weight} т
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Калібр гармати:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.gun_caliber} мм
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Довжина корпусу:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.hull_length} м
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Швидкість обертання башти:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.turret_rotation_speed} град/с
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Експлуатаційний радіус:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.operational_range} км
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Тип броні:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.armor_type}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Ємність пального:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.fuel_capacity} л
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b py-2 border-gray-200">
                  Тип трансмісії:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.transmission_type}
                </span>
              </li>
            </>
          )}

          {isGun && (
            <>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b border-gray-200 py-2">
                  Калібр:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.caliber}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b border-gray-200 py-2">
                  Вага:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.weight} кг
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b border-gray-200 py-2">
                  Довжина:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.length} см
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b border-gray-200 py-2">
                  Колір:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.color}
                </span>
              </li>
              <li className="contents">
                <span className="text-left font-semibold text-lg text-gray-800 border-b border-gray-200 py-2">
                  Тип прикладу:
                </span>
                <span className="border-b text-lg border-gray-200 py-2">
                  {product.stock_type}
                </span>
              </li>
            </>
          )}

          <li className="contents">
            <span className="text-left font-semibold text-lg text-gray-800 border-b border-gray-200 py-2">
              Виготовник:
            </span>
            <span className="border-b text-lg border-gray-200 py-2">
              {product.manufacturer_name}
            </span>
          </li>
          <li className="contents">
            <span className="text-left font-semibold text-lg text-gray-800 border-b border-gray-200 py-2">
              Країна:
            </span>
            <span className="border-b text-lg border-gray-200 py-2">
              {product.country}
            </span>
          </li>
          <li className="contents">
            <span className="text-left font-semibold text-lg text-gray-800 border-b border-gray-200 py-2">
              У наявності:
            </span>
            <span className="border-b text-lg border-gray-200 py-2">
              {product.stock} шт.
            </span>
          </li>
          <li className="contents">
            <span className="text-left font-semibold text-lg text-gray-800 border-b border-gray-200 py-2">
              Ціна:
            </span>
            <span className="border-b text-lg border-gray-200 py-2">
              {product.price} ₴
            </span>
          </li>
        </ul>
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

        <Rating
          rating={product.rating}
          reviews={getReviewText(product.reviews_count)}
        />

        <div className="flex flex-col items-center w-full mt-4 space-y-3">
          <button
            onClick={() => addToCart(product)}
            className="cursor-pointer bg-green-500 text-white text-lg font-semibold w-full h-12 rounded-[5px] flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <img src={buy} /> В кошик
          </button>

          <div className="flex gap-3 w-full">
            <button className="cursor-pointer flex-1 h-12 border border-gray-300 rounded-[5px] flex items-center justify-center text-base font-medium bg-white hover:scale-105 hover:shadow-lg active:scale-95 transition-transform">
              В 1 клік
            </button>
            <button
              onClick={() => addToSaved(product)}
              className="cursor-pointer w-12 h-12 border border-gray-300 rounded-[5px] flex items-center justify-center bg-white hover:scale-105 hover:shadow-lg active:scale-95 transition-transform"
            >
              <img src={likeOrder} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
