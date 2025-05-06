import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import CatalogPage from "./pages/CatalogPage";
import ProfilePage from "./pages/ProfilePage";
import PaymentPage from "./pages/PaymentPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import SearchPage from "./pages/SearchPage";

import UserPanel from "./components/UserPanel";
import SavedWindow from "./components/SavedWindow";
import Basket from "./components/Basket";
import Menu from "./components/Menu";

import ProtectedAuthRoute from "./Routes/ProtectedAuthRoute";
import { useModal } from "./contexts/modalContext";
import "./App.css";

function AppContent() {
  const { isUserPanelOpen, isBasketOpen, isSavedWindowOpen, isMenuOpen } =
    useModal();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog/:category" element={<CatalogPage />} />
        <Route path="/catalog/:category/:name/*" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route
          path="/profile/*"
          element={
            <ProtectedAuthRoute>
              <ProfilePage />
            </ProtectedAuthRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isUserPanelOpen && <UserPanel />}
      {isBasketOpen && <Basket />}
      {isSavedWindowOpen && <SavedWindow />}
      {isMenuOpen && <Menu />}
    </Router>
  );
}

export default AppContent;
