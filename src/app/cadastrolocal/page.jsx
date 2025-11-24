"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './cadastrolocal.module.css';
import Topo from '@/components/Topo';
import { CiLocationOn } from "react-icons/ci";
import { toast } from "react-toastify";


export default function CadastroLocal() {
  const router = useRouter();
  const [location, setLocation] = useState({
    bairro: '',
    rua: '',
    numero: '',
  });

  function handleChange(e) {
    setLocation({ ...location, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validação: não permitir campos vazios
    if (!location.bairro || !location.rua || !location.numero) {
      return toast.info('Preencha todos os campos antes de finalizar!');
    }

    const tempUser = JSON.parse(localStorage.getItem('tempUser'));
    if (!tempUser) {
      toast.error('Erro: dados básicos não encontrados. Refaça o cadastro.');
      return router.push('/cadastro');
    }

    // Agora já está no formato certo para o backend
    const userData = { ...tempUser, ...location };

    try {
      const response = await fetch('http://localhost:3333/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar');
      }

      toast.success('Cadastro finalizado com sucesso!');
      localStorage.removeItem('tempUser');
      router.push('/login');
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
          <h2>Localização<CiLocationOn style={{ marginLeft: '8px',}} /></h2>
          <form onSubmit={handleSubmit}>
            <label>Digite seu Bairro:</label>
            <input name="bairro" type="text" placeholder="Digite o seu bairro:" onChange={handleChange} />

            <label>Digite sua Rua:</label>
            <input name="rua" type="text" placeholder="Digite o seu endereço:" onChange={handleChange} />

            <label>Número:</label>
            <input name="numero" type="text" placeholder="Digite o número de sua casa:" onChange={handleChange} />

            <button type="submit">Finalizar</button>
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
