"use client";

import styles from './login.module.css';
import Link from 'next/link';
import Topo from '@/components/Topo';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from "react-toastify";


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
    return toast.info('Preencha todos os campos antes de continuar!');
  }

  try {
    const response = await fetch('http://localhost:3333/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        pass: formData.pass,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Email ou senha inválidos');
    }

    // Salva token e tipo de usuário
    localStorage.setItem('token', data.token);
    localStorage.setItem('tipoUser', data.tipoUser);
    localStorage.setItem('userId', data.profile.id);

    toast.success('Login realizado com sucesso!');

    // Redireciona com base no tipo de usuário
    if (data.tipoUser === 'user') {
      router.push('/userpage');
    } else if (data.tipoUser === 'parceiro') {
      router.push('/parceiroadm'); 
    }
  } catch (error) {
    toast.error('Erro: ' + error.message);
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
