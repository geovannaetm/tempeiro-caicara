import styles from './cadastro.module.css'
import Link from 'next/link'
import Topo from '@/components/Topo'

export default function Cadastro() {
    return(

        <div className={styles.page}>

        <Topo />

        
      <main className={styles.main}>
         {/* círculo amarelo no fundo */}
  <div className={styles.yellowCircle}></div>

        <div className={styles.formBox}>
          <h2>Cadastre-se</h2>
          <form>
            <label>Nome:</label>
            <input type="text" placeholder="Digite seu nome:" />

            <label>E-mail:</label>
            <input type="email" placeholder="Digite seu e-mail:" />

            <label>Senha:</label>
            <input type="password" placeholder="Digite sua senha:" />

            <Link href='/CadastroLocal'>
            <button type="submit">Continuar</button>
            </Link>
          </form>

          <hr className={styles.hr}></hr>
          <p className={styles.loginText}>
            Já possui uma conta? <a href='/Login'>Login</a>
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