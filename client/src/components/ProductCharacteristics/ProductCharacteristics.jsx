import React from "react";
import "./ProductCharacteristics.css";

export default function ProductCharacteristics({ product }) {
  return (
    <div className="product-characteristics-container">
      <h2 className="product-title">Характеристики товару</h2>
      <ul className="characteristics-list">
        <li>
          <strong>Назва:</strong> {product.name}
        </li>
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
        <li>
          <strong>Виготовник (ID):</strong> {product.manufacturer_id}
        </li>
        <li>
          <strong>Категорія (ID):</strong> {product.category_id}
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
