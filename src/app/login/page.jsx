"use client";

import styles from './login.module.css';
import Link from 'next/link';
import Topo from '@/components/Topo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    pass: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email || !formData.pass) {
      return alert('Preencha todos os campos antes de continuar!');
    }

    try {
      const response = await fetch('http://localhost:3333/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          pass: formData.pass,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Email ou senha inválidos');
      }

      // Salva o ID do usuário para uso na página de perfil
      localStorage.setItem("userId", data.user.id);
      alert('Login realizado com sucesso!');
      router.push('/userpage');
    } catch (error) {
      alert('Erro: ' + error.message);
    }
  }

  return (
    <div className={styles.page}>
      <Topo />
      <main className={styles.main}>
        <div className={styles.yellowCircle}></div>

        <div className={styles.formBox}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Entre com seu Email:</label>
            <input
              name="email"
              type="email"
              placeholder="Digite o seu e-mail:"
              onChange={handleChange}
            />

            <label>Senha:</label>
            <input
              name="pass"
              type="password"
              placeholder="Digite sua senha:"
              onChange={handleChange}
            />

            <button type="submit">Finalizar</button>
          </form>

          <hr className={styles.hr}></hr>
          <p className={styles.loginText}>
            Não possui uma conta? <a href="cadastro">Cadastre-Se</a>
          </p>
        </div>

        <div className={styles.textBox}>
          <h1>O TEMPERO DO MAR ESTÁ<br /> TE ESPERANDO...</h1>
          <p>só falta logar!</p>
        </div>
      </main>
    </div>
  );
}
