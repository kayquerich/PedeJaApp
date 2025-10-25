import styles from '../styles/cartbutton.module.css'
import { useNavigate } from 'react-router-dom';

export default function CartButton() {

    const navigate = useNavigate();

    return (
        <button className={styles.button} onClick={() => navigate('/cart')}>
            <span>🛒</span>
            <span>Ver seus produtos</span>
        </button>
    );
}