import styles from './CadastroLocal.module.css'
import Link from 'next/link'
import Topo from '@/components/Topo'
import { CiLocationOn } from "react-icons/ci";


export default function CadastroLocal() {
    return(

        <div className={styles.page}>

        <Topo />

        
      <main className={styles.main}>
         {/* círculo amarelo no fundo */}
  <div className={styles.yellowCircle}></div>

        <div className={styles.formBox}>
          <h2>Localização<CiLocationOn style={{ marginLeft: '8px',}} /></h2>
          <form>
            <label>Digite seu Bairro:</label>
            <input type="text" placeholder="Digite o sue bairro:" />

            <label>Digite sua Rua:</label>
            <input type="email" placeholder="Digite o seu endereço:" />

            <label>Digite N°:</label>
            <input type="password" placeholder="Digite o número da sua Rua:" />

            <button type="submit">Finalizar</button>
          </form>

          <hr className={styles.hr}></hr>
          <p className={styles.loginText}>
            Já possui uma conta? <a href="#">Login</a>
          </p>
        </div>

        <div className={styles.textBox}>
          <h1>O TEMPERO DO MAR ESTÁ<br/> TE ESPERANDO...</h1>
          <p>se cadastre já!</p>
        </div>
      </main>


        </div>
    )
}