import React from "react";
import "./ProductCharacteristics.css";

export default function ProductCharacteristics({ product }) {
  const isTank = product.product_type === "Танк" ? true : false;
  const isAircraft = product.product_type === "Літак" ? true : false;
  const isGun = product.product_type === "Зброя" ? true : false;

  return (
    <div className="product-characteristics-container">
      <h2 className="product-title">Характеристики товару</h2>
      <ul className="characteristics-list">
        <li>
          <strong>Назва:</strong> {product.name}
        </li>

        {isAircraft && (
          <>
            <li>
              <strong>Максимальна швидкість:</strong> {product.max_speed} км/год
            </li>
            <li>
              <strong>Розмах крил:</strong> {product.wingspan} м
            </li>
            <li>
              <strong>Кількість двигунів:</strong> {product.engine_count}
            </li>
            <li>
              <strong>Дальність польоту:</strong> {product.flight_range} км
            </li>
            <li>
              <strong>Екіпаж:</strong> {product.crew_size}
            </li>
            <li>
              <strong>Макс. висота:</strong> {product.max_altitude} м
            </li>
            <li>
              <strong>Порожня вага:</strong> {product.empty_weight} кг
            </li>
            <li>
              <strong>Макс. злітна вага:</strong> {product.max_takeoff_weight}{" "}
              кг
            </li>
            <li>
              <strong>Тип двигуна:</strong> {product.engine_type}
            </li>
            <li>
              <strong>Ємність пального:</strong> {product.fuel_capacity} л
            </li>
            <li>
              <strong>Швидкість набору висоти:</strong> {product.climb_rate} м/с
            </li>
            <li>
              <strong>Діапазон радару:</strong> {product.radar_range} км
            </li>
          </>
        )}

        {isTank && (
          <>
            <li>
              <strong>Товщина броні:</strong> {product.armor_thickness} мм
            </li>
            <li>
              <strong>Екіпаж:</strong> {product.crew_size}
            </li>
            <li>
              <strong>Потужність двигуна:</strong> {product.engine_power} к.с.
            </li>
            <li>
              <strong>Вага:</strong> {product.weight} т
            </li>
            <li>
              <strong>Калібр гармати:</strong> {product.gun_caliber} мм
            </li>
            <li>
              <strong>Довжина корпусу:</strong> {product.hull_length} м
            </li>
            <li>
              <strong>Швидкість обертання башти:</strong>{" "}
              {product.turret_rotation_speed} град/с
            </li>
            <li>
              <strong>Експлуатаційний радіус:</strong>{" "}
              {product.operational_range} км
            </li>
            <li>
              <strong>Тип броні:</strong> {product.armor_type}
            </li>
            <li>
              <strong>Ємність пального:</strong> {product.fuel_capacity} л
            </li>
            <li>
              <strong>Тип трансмісії:</strong> {product.transmission_type}
            </li>
          </>
        )}

        {isGun && (
          <>
            <li>
              <strong>Калібр:</strong> {product.caliber}
            </li>
            <li>
              <strong>Вага:</strong> {product.weight} кг
            </li>
            <li>
              <strong>Довжина:</strong> {product.length} см
            </li>
            <li>
              <strong>Колір:</strong> {product.color}
            </li>
            <li>
              <strong>Тип прикладу:</strong> {product.stock_type}
            </li>
          </>
        )}

        <li>
          <strong>Виготовник:</strong> {product.manufacturer_name}
        </li>
        <li>
          <strong>Країна:</strong> {product.country}
        </li>
        <li>
          <strong>У наявності:</strong> {product.stock} шт.
        </li>
        <li>
          <strong>Ціна:</strong> {product.price} $
        </li>
      </ul>
    </div>
  );
}
