import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import MainPage from "./pages/MainPage/MainPage";
import CatalogPage from "./pages/Catalog/CatalogPage";
import "./App.css";
import UserPanel from "./components/UserPanel/UserPanel";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProtectedAuthRoute from "./Routes/ProtectedAuthRoute";
import Basket from "./components/Basket/Basket";
import ProductPage from "./pages/ProductPage/ProductPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import { useModal } from "./contexts/modalContext";
import SavedWindow from "./components/SavedWindow/SavedWindow";

function AppContent() {
  const { isUserPanelOpen, isBasketOpen, isSavedWindowOpen } = useModal();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog/:category" element={<CatalogPage />} />
        <Route path="/catalog/:category/:name/*" element={<ProductPage />} />
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
      {isSavedWindowOpen && <SavedWindow />}
    </Router>
  );
}

export default AppContent;
