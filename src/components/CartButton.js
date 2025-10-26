import styles from '../styles/cartbutton.module.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function CartButton() {

    const navigate = useNavigate();

    return (
        <button className={styles.button} onClick={() => navigate('/cart')}>
            <Icon icon={faShoppingCart}/>
        </button>
    );
}