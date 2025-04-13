import React from "react";

export default function ProductCharacteristics({ product }) {
  const isTank = product.product_type === "Танк";
  const isAircraft = product.product_type === "Літак";
  const isGun = product.product_type === "Зброя";

  return (
    <div className="w-[1440px] mt-5 p-5 border border-gray-300 rounded bg-white font-sans">
      <h2 className="text-2xl font-bold font-[Liberation_Sans] mb-5">
        Характеристики товару
      </h2>
      <ul className="list-none font-[Liberation_Sans] text-[22px] mt-5 p-0">
        <li className="py-2.5 border-b border-gray-200">
          <strong className="text-gray-800">Назва:</strong> {product.name}
        </li>

        {isAircraft && (
          <>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Максимальна швидкість:</strong>{" "}
              {product.max_speed} км/год
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Розмах крил:</strong>{" "}
              {product.wingspan} м
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Кількість двигунів:</strong>{" "}
              {product.engine_count}
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Дальність польоту:</strong>{" "}
              {product.flight_range} км
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Екіпаж:</strong>{" "}
              {product.crew_size}
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Макс. висота:</strong>{" "}
              {product.max_altitude} м
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Порожня вага:</strong>{" "}
              {product.empty_weight} кг
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Макс. злітна вага:</strong>{" "}
              {product.max_takeoff_weight} кг
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Тип двигуна:</strong>{" "}
              {product.engine_type}
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Ємність пального:</strong>{" "}
              {product.fuel_capacity} л
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">
                Швидкість набору висоти:
              </strong>{" "}
              {product.climb_rate} м/с
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Діапазон радару:</strong>{" "}
              {product.radar_range} км
            </li>
          </>
        )}

        {isTank && (
          <>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Товщина броні:</strong>{" "}
              {product.armor_thickness} мм
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Екіпаж:</strong>{" "}
              {product.crew_size}
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Потужність двигуна:</strong>{" "}
              {product.engine_power} к.с.
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Вага:</strong> {product.weight}{" "}
              т
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Калібр гармати:</strong>{" "}
              {product.gun_caliber} мм
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Довжина корпусу:</strong>{" "}
              {product.hull_length} м
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">
                Швидкість обертання башти:
              </strong>{" "}
              {product.turret_rotation_speed} град/с
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Експлуатаційний радіус:</strong>{" "}
              {product.operational_range} км
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Тип броні:</strong>{" "}
              {product.armor_type}
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Ємність пального:</strong>{" "}
              {product.fuel_capacity} л
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Тип трансмісії:</strong>{" "}
              {product.transmission_type}
            </li>
          </>
        )}

        {isGun && (
          <>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Калібр:</strong>{" "}
              {product.caliber}
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Вага:</strong> {product.weight}{" "}
              кг
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Довжина:</strong>{" "}
              {product.length} см
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Колір:</strong> {product.color}
            </li>
            <li className="py-2.5 border-b border-gray-200">
              <strong className="text-gray-800">Тип прикладу:</strong>{" "}
              {product.stock_type}
            </li>
          </>
        )}

        <li className="py-2.5 border-b border-gray-200">
          <strong className="text-gray-800">Виготовник:</strong>{" "}
          {product.manufacturer_name}
        </li>
        <li className="py-2.5 border-b border-gray-200">
          <strong className="text-gray-800">Країна:</strong> {product.country}
        </li>
        <li className="py-2.5 border-b border-gray-200">
          <strong className="text-gray-800">У наявності:</strong>{" "}
          {product.stock} шт.
        </li>
        <li className="py-2.5 border-b border-gray-200">
          <strong className="text-gray-800">Ціна:</strong> {product.price} $
        </li>
      </ul>
    </div>
  );
}
