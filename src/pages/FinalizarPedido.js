import ResumoPedido from "../components/ResumoPedido";
import styles from "../styles/finalizar.module.css";
import { useState } from "react";
import { localidades } from "../static/localidades";

export default function FinalizarPedido() {

    const itens = JSON.parse(sessionStorage.getItem('cart')) || [];
    const [valor_entrega, setValorEntrega] = useState(0.00);

    const [form, setForm] = useState({
        nome: "",
        endereco: "",
        bairro: "",
        pagamento: "pix",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "bairro") {
            const bairro_info = localidades.find((b) => b.nome === value);
            setValorEntrega(bairro_info ? bairro_info.info : 0.00);
        }

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Pedido finalizado:", form);
        alert("Pedido finalizado com sucesso!");
        // Aqui você pode integrar com backend ou limpar carrinho
    };

    return (
        <div className={styles.container}>
            <h1>📝 Finalizar Pedido</h1>
            <p>Preencha os dados abaixo para concluir seu pedido</p>

            <ResumoPedido itens={itens} taxa_entrega={valor_entrega} />

            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Nome completo
                    <input
                        type="text"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        required
                        placeholder="Seu nome"
                    />
                </label>

                <label>
                    Endereço
                    <input
                        type="text"
                        name="endereco"
                        value={form.endereco}
                        onChange={handleChange}
                        required
                        placeholder="Rua, número, complemento"
                    />
                </label>

                <label>
                    Bairro
                    <select
                        name="bairro"
                        value={form.bairro}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Selecione seu bairro
                        </option>
                        {localidades.map((b, key) => (
                            <option key={key} value={b.nome}>
                                {b.nome}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Descrição do endereço (opcional)
                    <textarea
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                        placeholder="Ex: Casa amarela, portão preto, perto da padaria..."
                        rows="4"
                        required
                    />
                </label>

                <label>
                    Forma de pagamento
                    <select
                        name="pagamento"
                        value={form.pagamento}
                        onChange={handleChange}
                    >
                        <option value="pix">Pix</option>
                        <option value="cartao">Cartão</option>
                        <option value="dinheiro">Dinheiro</option>
                    </select>
                </label>

                <button type="submit">Finalizar Pedido</button>
            </form>
        </div>
    );
}
