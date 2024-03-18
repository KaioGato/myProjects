import styles from './Coments.module.css'

import { Heart } from 'phosphor-react'

export function Coments(props){
    return(
        <main className={styles.coment}>
         <img className={styles.avatarComent} src={props.icon}/>

         <div>
          <aside>
             <strong>{props.author}</strong>
             <span>{props.title}</span>
             <strong
             className={styles.textComent}>
             {props.content}
             </strong>
          </aside>
             <Heart className={styles.heart}/>
             <p>Curtir</p>
         </div>
       </main> 
    )
  }
  