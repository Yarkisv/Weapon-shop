import React, { createContext, useState, useContext } from "react";
import { useModal } from "./modalContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    return savedProducts;
  });

  const [totalPrice, setTotalPrice] = useState(() => {
    const savedTotalPrice = JSON.parse(localStorage.getItem("totalPrice")) || 0;
    return savedTotalPrice;
  });

  const calculateTotalPrice = (orders) => {
    let sum = 0;
    orders.forEach((order) => {
      sum += Number(order.price) * order.quantity;
    });
    setTotalPrice(sum);
    localStorage.setItem("totalPrice", sum);
  };

  const increaceQuantity = (id) => {
    setOrders(
      orders.map((order) => {
        if (order.product_id === id) {
          order.quantity++;
        }
        calculateTotalPrice(orders);
        return order;
      })
    );
  };

  const decreaceQuantity = (id) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders
        .map((order) =>
          order.product_id === id
            ? { ...order, quantity: order.quantity - 1 }
            : order
        )
        .filter((order) => order.quantity > 0);

      calculateTotalPrice(updatedOrders);
      updateLocalStorage(updatedOrders);
      return updatedOrders;
    });
  };

  const { setBasketOpen } = useModal();

  const updateLocalStorage = (updatedOrders) => {
    localStorage.setItem("products", JSON.stringify(updatedOrders));
  };

  const addToCart = (product) => {
    setBasketOpen(true);
    console.log(product);

    setOrders((prevOrders) => {
      const existingProductIndex = prevOrders.findIndex(
        (item) => item.product_id === product.product_id
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

  const removeItem = (id) => {
    const updatedOrders = orders.filter((order) => order.product_id !== id);
    setOrders(updatedOrders);
    calculateTotalPrice(updatedOrders);
    updateLocalStorage(updatedOrders);
  };

  const clearCart = () => {
    localStorage.removeItem("products");
    setTotalPrice(0);
    setOrders([]);
  };

  return (
    <CartContext.Provider
      value={{
        orders,
        totalPrice,
        addToCart,
        clearCart,
        removeItem,
        decreaceQuantity,
        increaceQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
