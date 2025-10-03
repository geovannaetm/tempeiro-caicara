"use client";

import { IoFishOutline } from "react-icons/io5"
import styles from './CadastroParceiro.module.css'
import { useState } from 'react';
import Topo from '@/components/Topo'
import Link from 'next/link';


export default function CadastroParceiro() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    return (
        <div className={styles.page}>
            <Topo />
            <main className={styles.main}>

                <section className={styles.cadastroSection}>
                    <div className={styles.bolinha}>
                        <div className={styles.yellowCircle}></div>
                       
                        
                    </div>
                     <div className={styles.textoLateral}>
                            <p>O  litoral quer provar o seu tempero... <br /> Cadastre-se e sirva mais!</p>
                    </div>

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
                            Já possui cadastro? <Link href="/Login">Login</Link>
                        </p>
                    </div>
                </section>

                <section className={styles.funcionaSection}>
                    <h2>Como Funciona?</h2>
                    <div className={styles.funcionaCard}>
                        <h3>Por que se juntar a nós?</h3>
                        <p>
                            Estamos aqui para impulsionar os negócios locais e celebrar nossa cultura através da divulgação da gastronomia litorânea. Ao se unir a nós, você apoia a economia colaborativa da nossa terra e ajuda a manter vivas as tradições que nos tornam únicos.
                        </p>
                        <ul>
                            <li>
                                ✅ Primeira mensalidade gratuita
                            </li>
                            <li>
                                ✅ Cadastro rápido, simples e transparente
                            </li>
                        </ul>
                    </div>

                </section>
            </main>




        </div>
    )
}

