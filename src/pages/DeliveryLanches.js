import styles from '../styles/cardapio.module.css'
import { useState } from "react";
import CartButton from "../components/CartButton";
import image_banner from '../static/images/banner.png'
import CategorySelector from '../components/SeletorCategorias';
import { produtos } from '../static/produtos';

export default function Cardapio() {

    const [categoriaAtiva, setCategoriaAtiva] = useState("Hambúrgueres");

    const produtosFiltrados = produtos.filter(
        (p) => p.categoria === categoriaAtiva
    );

    const adicionar_produto = (produto) => {
        console.log(`Produto adicionado: ${produto.nome}`);

        const saved_cart = JSON.parse(sessionStorage.getItem('cart')) || [];

        for (let item of saved_cart) {
            if (item.id === produto.id) {
                console.log('Produto já está no carrinho:', item);
                return; // Sai da função sem adicionar o produto novamente
            }
        }

        saved_cart.push(produto);

        saved_cart.forEach(item => {
            if (!item.quantidade) {
                item.quantidade = 1;
            }
        });

        sessionStorage.setItem('cart', JSON.stringify(saved_cart));

        console.log('Carrinho atualizado:', saved_cart);

    };

    return (
        <div className={styles.container}>

            <section className={styles.banner}>
                <img src={image_banner} alt="banner do restaurante" className={styles.banner_image} />
            </section>

            <div style={{ marginBottom : 20 }} ></div>

            <CategorySelector onSelect={(cat) => setCategoriaAtiva(cat.name)} />

            <div className={styles.grid}>
                {produtosFiltrados.map((item) => (
                    <div key={item.id} className={styles.card_horizontal}>
                        <img src={item.imagem} alt={item.nome} className={styles.image} />
                        <div className={styles.card_content}>
                            <h3>{item.nome}</h3>
                            <p>{item.descricao.length > 55 ? item.descricao.slice(0,55) + '...' : item.descricao}</p>
                            <p className={styles.preco}>R$ {`${item.preco.toFixed(2)}`.replace('.', ',')}</p>
                        </div>
                    </div>
                ))}
            </div>


            <div style={{ marginBottom: 40 }} ></div>


        </div>
    );
}