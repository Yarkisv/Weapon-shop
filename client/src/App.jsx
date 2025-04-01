import { CartProvider } from "./contexts/cartContext";
import { ModalProvider } from "./contexts/modalContext";
import { SavedProvider } from "./contexts/savedContext";
import AppContent from "./AppContent";

function App() {
  return (
    <ModalProvider>
      <CartProvider>
        <SavedProvider>
          <AppContent />
        </SavedProvider>
      </CartProvider>
    </ModalProvider>
  );
}

export default App;
