import { ChatCircle, PencilLine } from 'phosphor-react'
import styles from './sidebar.module.css';

export function Sidebar(){
    return (
        <aside className={styles.sidebar}>

        <img className={styles.cover}
         src="https://copag.com.br/uploads/wp-copag-pokemon/2014/12/deck-gengar-ex.png" alt="foto do gengar
        " />
        <div className={styles.profile}>
            <img className={styles.avatar} src="https://lh3.googleusercontent.com/a/ACg8ocLIr0K2SX14PKzIlclkXT-JT191zjKB4JkDcBjV9jPiXw=s288-c-no" />
            <strong>Kaio Pato</strong>
            <span>comediante</span>
        </div>

        <footer>
            <a href="#">
             <PencilLine/>
             Editar seu perfil
            </a>
        </footer>

        </aside>
    )
}