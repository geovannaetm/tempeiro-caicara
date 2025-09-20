"use client"

import styles from './CadatroParceiro2.module.css'
import Topo from '@/components/Topo'
import { FaExclamationCircle } from "react-icons/fa";

export default function Cadastro() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Formulário enviado!")
  }

  return (
    <div className={styles.page}>
      <Topo />

      <main className={styles.main}>

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          {/* Coluna 1 - Local */}
          <div className={styles.formSection}>
            <h2>Insira o Local:</h2>

            <label>
              Praia*
              <select name="praia" required>
                <option value="">Selecione</option>
                <option value="indaiá">Indaiá</option>
                <option value="Martin">Martin de Sá</option>
                <option value="outra">Outra</option>
              </select>
            </label>

            <label>
              Nº do Quiosque*
              <input type="text" name="quiosque" placeholder="exemplo: número 34" required />
            </label>

            <label>
              Nome do negócio*
              <input type="text" name="negocio" placeholder="digite o nome do local" required />
            </label>

            <span className={styles.aviso}>
                <FaExclamationCircle />
                 Preencha os dados corretamente 
            </span>

          </div>

          {/* Divisor vertical */}
          <div className={styles.divider}></div>

          {/* Coluna 2 - Dados pessoais */}
          <div className={styles.formSection}>
            <h2>Insira os seus dados:</h2>

            <label>
              Nome*
              <input type="text" name="nome" placeholder="digite seu nome" required />
            </label>

            <label>
              CPF ou CNPJ*
              <input type="text" name="cpfCnpj" placeholder="digite seu CPF ou CNPJ" required />
            </label>

            <button type="submit" className={styles.btnPrincipal}>
              Clicar para finalizar
            </button>
          </div>
        </form>

      </main>
    </div>
  )
}
