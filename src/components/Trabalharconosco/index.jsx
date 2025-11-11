"use client";

import { useState } from 'react';
import styles from './Trabalharconosco.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoFishOutline } from "react-icons/io5";

export default function Trabalharconosco() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleClick = () => {
    if (!email) {
      alert("Por favor, insira um e-mail.");
      return;
    }
    localStorage.setItem("admEmail", email);
    router.push("/cadastroparceiro2");
  };

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
          <button className={styles.button} onClick={handleClick}>
            Clique aqui e cadastre-se!
          </button>
        </div>

        {/* Lado Direito */}
        <div className={styles.right}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>Cadastre-se</h3>
            <IoFishOutline className={styles.icon} />
          </div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.enter} onClick={handleClick}>
            Entrar
          </button>

          <p className={styles.login}>
            Já possui cadastro? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
