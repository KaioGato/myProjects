import styles from './Header.module.css'
import igniteLogo from '../assets/pokeballicon.png';


export function Header(){
    return (
    <header className={styles.header}>
     <img src={igniteLogo} alt="Logo do Ignite"/>
     <p>PokeMidia</p>
    </header>
    );
}