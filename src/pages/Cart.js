import { useState } from "react";
import styles from "../styles/cart.module.css";
import { useNavigate } from "react-router-dom";

export default function Carrinho() {

    const navigate = useNavigate();
    
    const [itens, setItens] = useState(
        JSON.parse(sessionStorage.getItem('cart')) || []
    );

    const aumentar = (id) => {

        setItens((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
            )
        );

        sessionStorage.setItem('cart', JSON.stringify(itens.map((item) =>
            item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
        )));
        
    };

    const diminuir = (id) => {
        setItens((prev) =>
            prev.map((item) =>
                item.id === id && item.quantidade > 1
                    ? { ...item, quantidade: item.quantidade - 1 }
                    : item
            )
        );

        sessionStorage.setItem('cart', JSON.stringify(itens.map((item) =>
            item.id === id && item.quantidade > 1
                ? { ...item, quantidade: item.quantidade - 1 }
                : item
        )));

        itens.map((item) => {
            if (item.id === id && item.quantidade <= 1) {
                remover(id);
            }
        });
    };

    const remover = (id) => {
        setItens((prev) => prev.filter((item) => item.id !== id));
        const updated_cart = itens.filter((item) => item.id !== id);
        sessionStorage.setItem('cart', JSON.stringify(updated_cart));
    };

    const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0).toFixed(2);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>🛒 Seu Carrinho</h1>
                <p>Confira os itens antes de finalizar o pedido</p>
            </header>

            <div className={styles.content}>
                <div className={styles.lista}>
                    {itens.length === 0 ? (
                        <p className={styles.vazio}>Seu carrinho está vazio 😢</p>
                    ) : (
                        itens.map((item) => (
                            <div key={item.id} className={styles.item}>
                                <img src={item.imagem} alt={item.nome} />
                                <div className={styles.info}>
                                    <h3>{item.nome}</h3>
                                    <span>R$ {item.preco.toFixed(2)}</span>

                                    <div className={styles.quantidade}>
                                        <button onClick={() => diminuir(item.id)}>-</button>
                                        <span>{item.quantidade}</span>
                                        <button onClick={() => aumentar(item.id)}>+</button>
                                    </div>
                                </div>

                                <div className={styles.totalItem}>
                                    <span>
                                        R$ {(item.preco * item.quantidade).toFixed(2)}
                                    </span>
                                    <button
                                        className={styles.remover}
                                        onClick={() => remover(item.id)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {itens.length > 0 && (
                    <aside className={styles.resumo}>
                        <h2>Resumo do Pedido</h2>
                        <div className={styles.linha}>
                            <span>Total:</span>
                            <strong>R$ {total}</strong>
                        </div>
                        <button className={styles.finalizar} onClick={() => navigate('/finalizarpedido')} >Finalizar Pedido</button>
                    </aside>
                )}
            </div>
        </div>
    );
}
