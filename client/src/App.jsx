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

function App() {
  const [isUserPanelOpen, setUserPanelOpen] = useState(false);

  const modalWindowsValues = { isUserPanelOpen, setUserPanelOpen };

  return (
    <ModalWindowsContext.Provider value={modalWindowsValues}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalog/:category" element={<CatalogPage />} />
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
      </Router>
    </ModalWindowsContext.Provider>
  );
}

export default App;
