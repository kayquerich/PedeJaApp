import { useEffect } from "react";

export default function Teste () {
    
    useEffect(() => {
        console.log("Teste page loaded");
        const clear_session = () => {
            sessionStorage.clear();
            console.log("Session storage 'cart' cleared");
        }
        clear_session();
    }, []);
    
    return (
        <div>
            <h1>Teste</h1>
        </div>
    );
}