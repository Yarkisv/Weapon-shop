import React, { createContext, useState, useContext } from "react";
import { useModal } from "./modalContext";

const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [saved, setSaved] = useState(() => {
    const savedLiked = JSON.parse(localStorage.getItem("saved")) || [];
    return savedLiked;
  });

  const { setSavedWindowOpen } = useModal();

  const updateLocalStorage = (updatedSavedProducts) => {
    localStorage.setItem("saved", JSON.stringify(updatedSavedProducts));
  };

  const removeFromSaved = (id) => {
    setSaved(saved.filter((order) => order.product_id !== id));
  };

  const clearSaved = () => {
    localStorage.removeItem("saved");
    setSaved([]);
  };

  const addToSaved = (product) => {
    setSavedWindowOpen(true);
    console.log(product);

    setSaved((prevSaved) => {
      const isProductLiked = prevSaved.findIndex(
        (item) => item.product_id === product.product_id
      );

      if (isProductLiked === -1) {
        const updatedSavedProducts = [...prevSaved, product];
        updateLocalStorage(updatedSavedProducts);
        return updatedSavedProducts;
      }

      return prevSaved;
    });
  };

  return (
    <SavedContext.Provider
      value={{
        saved,
        addToSaved,
        removeFromSaved,
        clearSaved,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => useContext(SavedContext);
