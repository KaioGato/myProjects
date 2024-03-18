import styles from './Post.module.css'

import { ChatCircle } from 'phosphor-react'

export function Post(props){
    return (

     <main className={styles.post}>
       <img className={styles.avatar} src={props.icon}/> 

       <div className={styles.perfil}>   
         <strong>{props.author}</strong>
         <span>{props.title}</span>
       </div>

       <p className={styles.textAuthor}>
        {props.content}</p>

       <footer>
         <p>
          <ChatCircle/>
          Comentários
         </p>
        
         <input type="text" placeholder='Deixe seu comentário!' />
         <button>Publicar</button>

       </footer>

     </main>
    )
}


