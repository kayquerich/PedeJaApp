import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import styles from '../styles/backbutton.module.css';
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton() {
    
    const navigation = useNavigate();

    const back_action = () => {
        navigation(-1);
    };
    
    return (
        <button onClick={back_action} className={styles.back_button} >
            <Icon icon={faChevronLeft}/>
        </button>
    );
}