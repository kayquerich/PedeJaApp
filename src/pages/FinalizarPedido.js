import ResumoPedido from "../components/ResumoPedido";
import styles from "../styles/finalizar.module.css";
import { useState } from "react";
import { localidades } from "../static/localidades";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function FinalizarPedido() {

    const itens = JSON.parse(sessionStorage.getItem('cart')) || [];
    const [valor_entrega, setValorEntrega] = useState(0.00);
    const navigation = useNavigate();

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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aqui você pode integrar com backend ou limpar carrinho

        const stringPedido = `
            --- Pedido Realizado ---
            Nome: ${form.nome}
            Endereço: ${form.endereco}
            Bairro: ${form.bairro}
            Descrição: ${form.descricao}
            Forma de Pagamento: ${form.pagamento}
            Itens:
            ${itens.map(item => `- ${item.nome} (Quantidade: ${item.quantidade})`).join('\n')}
            Taxa de Entrega: R$ ${valor_entrega.toFixed(2)}
            Total: R$ ${(itens.reduce((total, item) => total + (item.preco * item.quantidade), 0) + valor_entrega).toFixed(2)}
        `;

        console.log(stringPedido);

        toast.success('Pedido finalizado com sucesso!');

        console.log("Esperando 3 segundos...");
        await sleep(3000);
        console.log("Pronto!");


        sessionStorage.removeItem('cart');
        // Redirecionar ou atualizar a página conforme necessário

        navigation("/deliverylanches");

    };

    return (
        <div className={styles.container}>

            <header className={styles.header}>
                <button className={styles.voltar} onClick={() => navigation(-1)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <h1 className={styles.titulo}>Finalizar Pedido</h1>

                <div className={styles.icone}>
                    <FontAwesomeIcon icon={faCheckCircle} />
                </div>
            </header>

            <div className={styles.page_content} >
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

            <Toaster position="top-center" reverseOrder={false} />

        </div>
    );
}