import { Routes, Route, BrowserRouter, HashRouter  } from "react-router-dom";
import Teste from "./pages/Teste";
import DeliveryLanches from "./pages/DeliveryLanches";
import Carrinho from "./pages/Cart"
import FinalizarPedido from "./pages/FinalizarPedido";
import Produto from "./pages/Produto";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/cart" element={<Carrinho/>} />
                <Route path="/deliverylanches" element={<DeliveryLanches/>} />
                <Route path="/finalizarpedido" element={<FinalizarPedido/>} />
                <Route path="/" element={<Teste/>} />
                <Route path="/produto" element={<Produto/>} />
            </Routes>
        </HashRouter>
    );
}

export default App;
