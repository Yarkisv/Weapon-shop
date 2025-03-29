import { CartProvider } from "./contexts/cartContext";
import { ModalProvider, useModal } from "./contexts/modalContext";
import AppContent from "./AppContent";

function App() {
  return (
    <ModalProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ModalProvider>
  );
}

export default App;
