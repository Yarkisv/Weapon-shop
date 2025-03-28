import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import MainPage from "./pages/MainPage/MainPage";
import CatalogPage from "./pages/Catalog/CatalogPage";
import "./App.css";
import UserPanel from "./components/UserPanel/UserPanel";
import { useState } from "react";
import ModalWindowsContext from "./contexts/modalContext";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProtectedAuthRoute from "./Routes/ProtectedAuthRoute";
import Basket from "./components/Basket/Basket";
import ProductPage from "./pages/ProductPage/ProductPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import CartContext from "./contexts/cartContext";

function App() {
  const [isUserPanelOpen, setUserPanelOpen] = useState(false);
  const [isBasketOpen, setBasketOpen] = useState(false);

  const modalWindowsValues = {
    isUserPanelOpen,
    setUserPanelOpen,
    isBasketOpen,
    setBasketOpen,
  };

  const cartValues = {
    isBasketOpen,
    setBasketOpen,
  };

  return (
    <ModalWindowsContext.Provider value={modalWindowsValues}>
      <CartContext value={cartValues}>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/catalog/:category" element={<CatalogPage />} />
            <Route path="/product/:name" element={<ProductPage />} />
            <Route path="/product/:name/*" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/profile/*"
              element={
                <ProtectedAuthRoute>
                  <ProfilePage />
                </ProtectedAuthRoute>
              }
            />
          </Routes>
          {isUserPanelOpen && <UserPanel />}
          {isBasketOpen && <Basket />}
        </Router>
      </CartContext>
    </ModalWindowsContext.Provider>
  );
}

export default App;
