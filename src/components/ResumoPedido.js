import React from "react";
import styles from "../styles/resumo.module.css";

export default function ResumoPedido({ itens, taxa_entrega = 0.00 }) {
    const total = (parseFloat(itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0).toFixed(2)) + taxa_entrega).toFixed(2);

    return (
        <div className={styles.container}>
            <h2>Resumo do Pedido</h2>
            {itens.length === 0 ? (
                <p className={styles.vazio}>Seu carrinho está vazio 😢</p>
            ) : (
                <div className={styles.lista}>
                    {itens.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.info}>
                                <h3>{item.nome}</h3>
                                <span>
                                    {item.quantidade} x R$ {item.preco.toFixed(2)}
                                </span>
                            </div>
                            <span className={styles.subtotal}>
                                R$ {(item.quantidade * item.preco).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            <div>
                <span>Taxa de entrega: </span>
                <strong>R$ {taxa_entrega.toFixed(2)}</strong>
            </div>

            {itens.length > 0 && (
                <div className={styles.total}>
                    <span>Total:</span>
                    <strong>R$ {total}</strong>
                </div>
            )}
        </div>
    );
}
