import styles from '../styles/cardapio.module.css'
import { useState } from "react";
import CartButton from "../components/CartButton";
import image_banner from '../static/images/banner.png'
import { categorias } from '../static/categorias';
import CategorySelector from '../components/SeletorCategorias';

const produtos = [
    {
        id: 1,
        nome: "Burger Clássico",
        descricao: "Pão, carne artesanal, queijo e molho da casa.",
        preco: 24.9,
        categoria: "Hambúrgueres",
        imagem:
            "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=60",
    },
    {
        id: 2,
        nome: "Cheddar Bacon",
        descricao: "Muito cheddar, bacon crocante e pão australiano.",
        preco: 29.9,
        categoria: "Hambúrgueres",
        imagem:
            "https://images.unsplash.com/photo-1606755962773-0c4a4bdf7b7c?auto=format&fit=crop&w=600&q=60",
    },
    {
        id: 3,
        nome: "Combo Smash",
        descricao: "Dois smash burgers + batata frita + refri.",
        preco: 39.9,
        categoria: "Combos",
        imagem:
            "https://images.unsplash.com/photo-1626136271756-98b6a2b383c7?auto=format&fit=crop&w=600&q=60",
    },
    {
        id: 4,
        nome: "Coca-Cola Lata",
        descricao: "350ml bem gelada.",
        preco: 6.9,
        categoria: "Bebidas",
        imagem:
            "https://images.unsplash.com/photo-1572449043416-55f4685c9bbf?auto=format&fit=crop&w=600&q=60",
    },
    {
        id: 5,
        nome: "Brownie com Sorvete",
        descricao: "Brownie quentinho com sorvete de creme.",
        preco: 14.9,
        categoria: "Sobremesas",
        imagem:
            "https://images.unsplash.com/photo-1606313564200-e75d5e6b13f8?auto=format&fit=crop&w=600&q=60",
    },
];

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

            <CategorySelector onSelect={(cat) => setCategoriaAtiva(cat.name)} />

            <div className={styles.grid}>
                {produtosFiltrados.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <img src={item.imagem} alt={item.nome} className={styles.image} />
                        <div className={styles.content}>
                            <h2>{item.nome}</h2>
                            <p>{item.descricao}</p>
                            <div className={styles.footer}>
                                <span>R$ {item.preco.toFixed(2)}</span>
                                <button onClick={() => adicionar_produto(item)} >Adicionar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginBottom : 40 }} ></div>


        </div>
    );
}