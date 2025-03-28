import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalWindowsContext from "../../contexts/modalContext";

export default function AboutProductContainer({ product }) {
  const navigate = useNavigate();

  const { setBasketOpen } = useContext(ModalWindowsContext);

  const [orders, setOrders] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const addToLocalStorage = (product) => {
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    const updatedProducts = [...existingProducts, product];

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    console.log(updatedProducts);
  };

  const addToCart = (product) => {
    addToLocalStorage(product);
    setBasketOpen(true);
    setOrders((prevOrders) => [...prevOrders, product]);
  };

  return (
    <div className="product-info-container">
      <img src={`data:image/jpg;base64,${product.image}`} />

      <button className="buy-button" onClick={() => addToCart(product)}>
        До корзини
      </button>
    </div>
  );
}
