import styles from './login.module.css'
import Link from 'next/link'
import Topo from '@/components/Topo'
import { CiLocationOn } from "react-icons/ci";


export default function Login() {
    return(

        <div className={styles.page}>

        <Topo />

        
      <main className={styles.main}>
         {/* círculo amarelo no fundo */}
  <div className={styles.yellowCircle}></div>

        <div className={styles.formBox}>
          <h2>Login</h2>
          <form>

            <label>Entre com seu Email:</label>
            <input type="email" placeholder="Digite o seu e-mail:" />

            <label>Senha:</label>
            <input type="password" placeholder="Digite sua senha:" />

            <Link href='userpage'>
            <button type="submit">Finalizar</button>
            </Link>
          </form>

          <hr className={styles.hr}></hr>
          <p className={styles.loginText}>
            Não possui uma conta? <a href="cadastro">Cadastre-Se</a>
          </p>
        </div>

        <div className={styles.textBox}>
          <h1>O TEMPERO DO MAR ESTÁ<br/> TE ESPERANDO...</h1>
          <p>só falta logar!</p>
        </div>
      </main>


        </div>
    )
}