import React, { createContext, useState, useEffect, useContext } from "react";
import ModalWindowsContext from "./modalContext";

const CartContext = createContext();

export default CartContext;

// export const CartProvider = ({ children }) => {
//   const [orders, setOrders] = useState(() => {
//     const savedProducts = localStorage.getItem("products");
//     return savedProducts ? JSON.parse(savedProducts) : [];
//   });

//   const { setBasketOpen } = useContext(ModalWindowsContext);

//   useEffect(() => {
//     localStorage.setItem("orders", JSON.stringify(orders));
//   }, [orders]);

//   const addToCart = (product) => {
//     addToLocalStorage(product);
//     setBasketOpen(true);
//     setOrders((prevOrders) => [...prevOrders, product]);
//   };

//   return (
//     <CartContext.Provider value={{ orders, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
