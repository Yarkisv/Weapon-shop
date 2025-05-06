import { createContext, useContext, useState } from "react";

const ModalWindowsContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isUserPanelOpen, setUserPanelOpen] = useState(false);
  const [isBasketOpen, setBasketOpen] = useState(false);
  const [isSavedWindowOpen, setSavedWindowOpen] = useState(false);
  const [isSearchBarOpen, setSearcBarOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <ModalWindowsContext.Provider
      value={{
        isUserPanelOpen,
        setUserPanelOpen,
        isBasketOpen,
        setBasketOpen,
        isSavedWindowOpen,
        setSavedWindowOpen,
        isSearchBarOpen,
        setSearcBarOpen,
        isMenuOpen,
        setMenuOpen,
      }}
    >
      {children}
    </ModalWindowsContext.Provider>
  );
};

export const useModal = () => useContext(ModalWindowsContext);
