import React, { createContext, useState, useContext } from "react";
import { useModal } from "./modalContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const { setBasketOpen } = useModal();

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

  const clearCart = () => {
    localStorage.removeItem("products");
    setOrders([]);
  };

  return (
    <CartContext.Provider value={{ orders, setOrders, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
