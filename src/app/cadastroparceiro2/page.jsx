"use client"

import styles from './cadastroparceiro2.module.css'
import Topo from '@/components/Topo'
import Link from 'next/link';
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

          {/* Coluna 2 - Dados pessoais */}
          <div className={styles.formSection}>
            <h2>Insira os seus dados:</h2>

            <label>
              Nome*
              <input type="text" name="nome" placeholder="digite seu nome" required />
            </label>

            <label>
              Senha*
              <input type="password" name="Senha" placeholder="digite sua senha" required />
            </label>

            <label>
              CPF ou CNPJ*
              <input type="text" name="cpfCnpj" placeholder="digite seu CPF ou CNPJ" required />
            </label>

             <label>
              Praia*
              <select className="custom-select" name="praia" required>
                <option value="">Selecione</option>
                <option value="indaiá">Indaiá</option>
                <option value="Martin">Martin de Sá</option>
                <option value="outra">Outra</option>
              </select>
            </label>

            <span className={styles.aviso}>
                <FaExclamationCircle size={20} color="#8F2929"/>
                 Preencha os dados corretamente 
            </span>

            <Link href="/parceiroadm" passHref>
            <button type="submit" className={styles.btnPrincipal}>
              Clicar para finalizar
            </button>
            </Link>

            
          </div>
        </form>

      </main>
    </div>
  )
}
