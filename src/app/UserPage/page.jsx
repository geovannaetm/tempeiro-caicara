"use client";
import React, { useState } from "react";
import styles from "./UserPage.module.css";
import Topo from "@/components/Topo";
import Rodape from "@/components/Rodape";

export default function UserPage() {
  // Simulação de dados (futuramente vem do back-end)
  const [user, setUser] = useState({
    nome: "User",
    email: "usuario@email.com",
    endereco: "Av. exemplo, 123",
    senha: "*******",
    pagamento: "Débito",
  });

  const [pedido] = useState({
    nome: "Nome do pedido",
    descricao: "descrição do pedido...",
    valor: 50.0,
    status: "Pedido a caminho",
    imagem: "/comida-exemplo.jpg", // substituir pela imagem real
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (

    <div style={styles.page}>
    <Topo />
    <div className={styles.container}>
        
      {/* Saudação */}
      <h2 className={styles.saudacao}>
        Olá, <span>{user.nome}</span> <i className={`fas fa-bell ${styles.icone}`}></i>
      </h2>

      {/* Meus Pedidos */}
      <div className={styles.pedidosBox}>
        <h3 className={styles.tituloSecao}>Meus Pedidos:</h3>
        <div className={styles.cardPedido}>
          <div className={styles.cardHeader}>
            <span className={styles.nomePedido}>{pedido.nome}</span>
            <span className={styles.valorPedido}>R${pedido.valor},00</span>
          </div>
          <div className={styles.cardBody}>
            <img src={pedido.imagem} alt="Pedido" className={styles.imagemPedido} />
            <div className={styles.descricao}>{pedido.descricao}</div>
          </div>
          <div className={styles.cardFooter}>
            <span className={styles.status}>{pedido.status}</span>
          </div>
        </div>
      </div>

      {/* Dados do Usuário */}
      <div className={styles.formBox}>
        <div className={styles.formGroup}>
          <label>Nome:</label>
          <input type="text" name="nome" value={user.nome} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Endereço:</label>
          <input type="text" name="endereco" value={user.endereco} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>E-mail:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <label>Pagamento:</label>
          <select name="pagamento" value={user.pagamento} onChange={handleChange}>
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
            <option value="Pix">Pix</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Senha:</label>
          <input type="password" name="senha" value={user.senha} onChange={handleChange} />
        </div>

        {/* Botões */}
        <div className={styles.botoes}>
          <button className={styles.sair}>Sair</button>
          <button className={styles.excluir}>Excluir</button>
          <button className={styles.salvar}>Salvar Alterações</button>
        </div>
      </div>
    </div>

    <Rodape/>

    </div>
  );
}
