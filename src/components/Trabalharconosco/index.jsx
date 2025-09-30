import styles from './Trabalharconosco.module.css'
import Link from 'next/link'
import { IoFishOutline } from "react-icons/io5";

export default function Trabalharconosco() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Lado Esquerdo */}
                <div className={styles.left}>
                    <h2>Deseja trabalhar conosco?</h2>
                    <p className={styles.subtitle}>
                        Junte-se ao time de quem valoriza o tempero caiçara!
                    </p>
                    <p className={styles.small}>
                        Se é do Litoral Norte, tem que ter Tempero Caiçara!
                    </p>
                    <button className={styles.button}>Clique aqui e cadastre-se!</button>
                </div>
                 {/* Lado Direito */}
                <div className={styles.right}>
                    <div className={styles.titleWrapper}>
                        <h3 className={styles.title}>Cadastre-se</h3>
                        <IoFishOutline className={styles.icon} />
                    </div>
                    <label>Email:</label>
                    <input type="email" placeholder="Digite seu e-mail" />

                    <Link href="CadastroParceiro2">
                    <button className={styles.enter}>Entrar</button>
                    </Link>

                    <p className={styles.login}>
                        Já possui cadastro? <Link href="#">Login</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
