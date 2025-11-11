"use client";

import { IoFishOutline } from "react-icons/io5";
import styles from "./cadastroparceiro.module.css";
import { useState } from "react";
import Topo from "@/components/Topo";
import Link from "next/link";
import Rodape from "@/components/Rodape";

export default function CadastroParceiro() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.page}>
      <Topo />

      <main className={styles.main}>
        {/* ====== SEÇÃO DE CADASTRO ====== */}
        <section className={styles.cadastroSection}>
          {/* Círculo de fundo */}
          <div className={styles.bolinha}></div>

          {/* Texto lateral */}
          <div className={styles.textoLateral}>
            <p>
              O litoral quer provar o seu tempero... <br />
              Cadastre-se e sirva mais!
            </p>
          </div>

          {/* Card de cadastro */}
          <div className={styles.right}>
            <div className={styles.titleWrapper}>
              <h3 className={styles.title}>Cadastre-se</h3>
              <IoFishOutline className={styles.icon} />
            </div>

            <form onSubmit={handleSubmit}>
              <label>Email:</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Link href="cadastroparceiro2">
                <button type="button" >
                  Entrar
                </button>
              </Link>

              <p className={styles.login}>
                Já possui cadastro? <Link href="/login">Login</Link>
              </p>
            </form>
          </div>
        </section>

        {/* ====== SEÇÃO COMO FUNCIONA ====== */}
        <section className={styles.funcionaSection}>
          <h2>Como Funciona?</h2>

          <div className={styles.funcionaCard}>
            <h3>Por que se juntar a nós?</h3>
            <p>
              Estamos aqui para impulsionar os negócios locais e celebrar nossa
              cultura através da divulgação da gastronomia típica. Ao se unir a
              nós, você apoia empreendedores da nossa terra e ajuda a manter
              vivas as tradições que nos tornam únicos.
            </p>

            <div className={styles.infos}>
              <p>✅ Primeira mensalidade gratuita – comece sem custo!</p>
              <p>
                ✅ Comissão de apenas 10% sobre os pedidos realizados –
                simples, transparente e acessível.
              </p>
            </div>
          </div>
        </section>
      
      </main>
      <Rodape />
    </div>
  );

 
}

