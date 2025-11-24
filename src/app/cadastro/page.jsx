"use client";

import { useState } from 'react';
import styles from './cadastro.module.css';
import Topo from '@/components/Topo';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

export default function Cadastro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validação: não permitir campos vazios
    if (!formData.name || !formData.email || !formData.pass) {
      return toast.info('Preencha todos os campos antes de continuar!');
    }

    // Salva dados básicos temporários
    localStorage.setItem('tempUser', JSON.stringify(formData));
    toast.success('Cadastro básico concluído!');
    router.push('/cadastrolocal');
  }

  return (
    <div className={styles.page}>
      <Topo />

      <main className={styles.main}>
        <div className={styles.yellowCircle}></div>

        <div className={styles.formBox}>
          <h2>Cadastre-se</h2>
          <form onSubmit={handleSubmit}>
            <label>Nome:</label>
            <input name="name" type="text" placeholder="Digite seu nome:" onChange={handleChange} />

            <label>E-mail:</label>
            <input name="email" type="email" placeholder="Digite seu e-mail:" onChange={handleChange} />

            <label>Senha:</label>
            <input name="pass" type="password" placeholder="Digite sua senha:" onChange={handleChange} />

            <button type="submit">Continuar</button>
          </form>

          <hr className={styles.hr} />
          <p className={styles.loginText}>
            Já possui uma conta? <a href='/login'>Login</a>
          </p>
        </div>

        <div className={styles.textBox}>
          <h1>O TEMPERO DO MAR ESTÁ<br /> TE ESPERANDO...</h1>
          <p>se cadastre já!</p>
        </div>
      </main>
    </div>
  );
}
