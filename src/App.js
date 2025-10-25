import { Routes, Route, BrowserRouter, HashRouter  } from "react-router-dom";
import Teste from "./pages/Teste";
import DeliveryLanches from "./pages/DeliveryLanches";
import Carrinho from "./pages/Cart"
import FinalizarPedido from "./pages/FinalizarPedido";

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
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
