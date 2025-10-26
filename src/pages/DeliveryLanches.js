import styles from '../styles/cardapio.module.css'
import { useState } from "react";
import CartButton from "../components/CartButton";
import image_banner from '../static/images/banner.png'
import CategorySelector from '../components/SeletorCategorias';
import { produtos } from '../static/produtos';
import { useNavigate } from 'react-router-dom';

export default function Cardapio() {

    const [categoriaAtiva, setCategoriaAtiva] = useState("Hambúrgueres");

    const produtosFiltrados = produtos.filter(
        (p) => p.categoria === categoriaAtiva
    );

    const navigation = useNavigate();
    const navegar_produto = (produto) => {
        console.log(`Navegando para o produto: ${produto.nome}`);
        // Aqui você pode implementar a navegação para a página de detalhes do produto
    
        navigation(`/produto`, { state: { produto } });    

    }

    return (
        <div className={styles.container}>

            <section className={styles.banner}>
                <img src={image_banner} alt="banner do restaurante" className={styles.banner_image} />
            </section>

            <div style={{ marginBottom : 20 }} ></div>

            <CategorySelector onSelect={(cat) => setCategoriaAtiva(cat.name)} />

            <div className={styles.grid}>
                {produtosFiltrados.map((item) => (
                    <div key={item.id} className={styles.card_horizontal} onClick={() => navegar_produto(item)} >
                        <img src={item.imagem} alt={item.nome} className={styles.image} />
                        <div className={styles.card_content}>
                            <h3>{item.nome}</h3>
                            <p>{item.descricao.length > 55 ? item.descricao.slice(0,55) + '...' : item.descricao}</p>
                            <p className={styles.preco}>R$ {`${item.preco.toFixed(2)}`.replace('.', ',')}</p>
                        </div>
                    </div>
                ))}
            </div>

            <CartButton/>

            <div style={{ marginBottom: 40 }} ></div>

        </div>
    );
}