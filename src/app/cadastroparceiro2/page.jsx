"use client";

import { useState, useEffect } from 'react';
import styles from './cadastroparceiro2.module.css';
import Topo from '@/components/Topo';
import { useRouter } from 'next/navigation';
import { FaExclamationCircle } from "react-icons/fa";

export default function Cadastro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    pass: '',
    cpf: '',
    email: '',
  });

  useEffect(() => {
    const email = localStorage.getItem("admEmail");
    if (!email) {
      alert("E-mail não encontrado. Volte e preencha novamente.");
      router.push("/trabalharconosco");
    } else {
      setFormData((prev) => ({ ...prev, email }));
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3333/api/parceiro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Erro ao cadastrar");

      alert("Cadastro de parceiro realizado com sucesso!");
      localStorage.removeItem("admEmail");
      router.push("/parceiroadm");
    } catch (error) {
      alert("Erro: " + error.message);
    }
  };

  return (
    <div className={styles.page}>
      <Topo />
      <main className={styles.main}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.formSection}>
            <h2>Insira os seus dados:</h2>

            <label>
              Nome*
              <input type="text" name="nome" placeholder="digite seu nome" required onChange={handleChange} />
            </label>

            <label>
              Senha*
              <input type="password" name="pass" placeholder="digite sua senha" required onChange={handleChange} />
            </label>

            <label>
              CPF ou CNPJ*
              <input type="text" name="cpf" placeholder="digite seu CPF ou CNPJ" required onChange={handleChange} />
            </label>

            <label>
              Praia*
              <select >
                <option value="">Selecione</option>
                <option value="indaiá">Indaiá</option>
                <option value="Martin">Martin de Sá</option>
                <option value="outra">Outra</option>
              </select>
            </label>

            <span className={styles.aviso}>
              <FaExclamationCircle size={20} color="#8F2929" />
              Preencha os dados corretamente
            </span>

            <button type="submit" className={styles.btnPrincipal}>
              Clicar para finalizar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
