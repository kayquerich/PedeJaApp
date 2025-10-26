import React, { use } from "react";
import { produtos } from "../static/produtos";
import { useLocation, useNavigate } from "react-router-dom";
import styles from '../styles/produto.module.css';
import BackButton from "../components/BackButton";
import toast, { Toaster } from 'react-hot-toast';

const sugestoes = produtos.slice(0, 4); // Pega os primeiros 4 produtos como sugestões

export default function DetalhesProduto() {

    const location = useLocation();
    const navigation = useNavigate();

    const produto = location.state?.produto;

    if (!produto) {
        return <div>Produto não encontrado.</div>;
    }

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

        toast.success('Produto adicionado ao carrinho!');

    };

    const navegar_produto = (produto) => {
        console.log(`Navegando para o produto: ${produto.nome}`);
        // Aqui você pode implementar a navegação para a página de detalhes do produto
    
        navigation(`/produto`, { state: { produto } });    

    }

    return (
        <div className={styles.container}>

            <BackButton />

            {/* Imagem principal */}
            <div className={styles.imageContainer}>
                <img src={produto.imagem} alt={produto.nome} className={styles.mainImage} />
            </div>

            {/* Informações do produto */}
            <div className={styles.info}>
                <h1 className={styles.name}>{produto.nome}</h1>
                <p className={styles.desc}>{produto.descricao}</p>
            </div>

            {/* Sugestões */}
            <div className={styles.sugestoes}>
                <h2>Você também pode gostar</h2>
                <div className={styles.sugestoesLista}>
                    {sugestoes.map((item) => (
                        <div key={item.id} className={styles.sugestaoCard} onClick={() => navegar_produto(item)} >
                            <img src={item.imagem} alt={item.nome} />
                            <span>{item.nome}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Área de adicionar */}
            <div className={styles.adicionarArea}>
                <div className={styles.preco}>
                    <span>R$ {produto.preco.toFixed(2).replace(".", ",")}</span>
                </div>
                <button
                    className={styles.addButton}
                    onClick={() => adicionar_produto && adicionar_produto(produto)}
                >
                    Adicionar ao carrinho
                </button>
            </div>

            <Toaster position="top-center" reverseOrder={false} />
            
        </div>
    );
}
