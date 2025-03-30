import React, { createContext, useState, useContext } from "react";
import { useModal } from "./modalContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    return savedProducts;
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = (orders) => {
    let sum = 0;
    orders.forEach((order) => {
      sum += Number(order.price) * order.quantity;
    });
    setTotalPrice(sum);
  };

  const { setBasketOpen } = useModal();

  const updateLocalStorage = (updatedOrders) => {
    localStorage.setItem("products", JSON.stringify(updatedOrders));
  };

  const addToCart = (product) => {
    setBasketOpen(true);

    setOrders((prevOrders) => {
      const existingProductIndex = prevOrders.findIndex(
        (item) => item.id === product.id
      );

      let updatedOrders;
      if (existingProductIndex !== -1) {
        updatedOrders = prevOrders.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedOrders = [...prevOrders, { ...product, quantity: 1 }];
      }

      updateLocalStorage(updatedOrders);
      calculateTotalPrice(updatedOrders);  
      return updatedOrders;
    });
  };

  const clearCart = () => {
    localStorage.removeItem("products");
    setTotalPrice(0);
    setOrders([]);
  };

  return (
    <CartContext.Provider value={{ orders, totalPrice, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
