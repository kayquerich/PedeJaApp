import { Routes, Route, BrowserRouter  } from "react-router-dom";
import Teste from "./pages/Teste";
import DeliveryLanches from "./pages/DeliveryLanches";
import Carrinho from "./pages/Cart"
import FinalizarPedido from "./pages/FinalizarPedido";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/cart" element={<Carrinho/>} />
                <Route path="/deliverylanches" element={<DeliveryLanches/>} />
                <Route path="/finalizarpedido" element={<FinalizarPedido/>} />
                <Route path="/" element={<Teste/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
