"use client";

import React, { useState, useEffect } from "react";
import styles from "./userpage.module.css";
import Topo from "@/components/Topo";
import Rodape from "@/components/Rodape";
import { useRouter } from "next/navigation";
import {
  FaBell,
  FaRegEdit,
} from "react-icons/fa";
import {
  IoTicket,
  IoCheckmarkCircle,
  IoExitOutline,
  IoTrash,
  IoRefreshCircleOutline,
} from "react-icons/io5";

export default function UserPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    rua: "",
    numero: "",
    bairro: "",
    pass: "",
    pagamento: "Débito",
  });

  const [pedido] = useState({
    nome: "Nome do pedido",
    descricao: "descrição do pedido...",
    valor: 50.0,
    status: "Pedido a caminho",
    imagem: "/pedidocarrinho.png",
  });

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (!userId) {
      alert("Você precisa estar logado.");
      router.push("/login");
      return;
    }

    async function fetchUser() {
      try {
        const response = await fetch(`http://localhost:3333/user/${userId}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Erro ao buscar dados");
        setUser({
          name: data.name,
          email: data.email,
          rua: data.rua || "",
          numero: data.numero || "",
          bairro: data.bairro || "",
          pass: "", // senha em branco
          pagamento: "Débito",
        });
      } catch (error) {
        alert("Erro: " + error.message);
      }
    }

    fetchUser();
  }, [userId, router]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const updatedUser = {
      name: user.name,
      email: user.email,
      rua: user.rua,
      numero: user.numero,
      bairro: user.bairro,
      pagamento: user.pagamento,
    };

    if (user.pass) {
      updatedUser.pass = user.pass;
    }

    try {
      const response = await fetch(`http://localhost:3333/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao atualizar");
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      alert("Erro: " + error.message);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Tem certeza que deseja excluir sua conta?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:3333/user/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir conta");
      alert("Conta excluída com sucesso!");
      localStorage.removeItem("userId");
      router.push("/cadastro");
    } catch (error) {
      alert("Erro: " + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <div style={styles.page}>
      <Topo />
      <div className={styles.container}>
        <h2 className={styles.saudacao}>
          Olá, <span>{user.name}<FaBell className={styles.icone} /></span>
        </h2>

        <div className={styles.pedidosBox}>
          <h3 className={styles.tituloSecao}>Meus Pedidos:</h3>
          <div className={styles.cardPedido}>
            <div className={styles.cardHeader}>
              <span className={styles.nomePedido}>
                <IoTicket style={{ marginRight: "8px", color: "#B49721" }} />
                {pedido.nome}
              </span>
              <span className={styles.valorPedido}>
                <span className={styles.totalpedido}>Valor do Pedido:</span>R${pedido.valor},00
              </span>
            </div>
            <div className={styles.cardBody}>
              <img src={pedido.imagem} alt="Pedido" className={styles.imagemPedido} />
              <div className={styles.descricao}>{pedido.descricao}</div>
            </div>
            <div className={styles.cardFooter}>
              <hr />
              <span className={styles.status}>
                <IoCheckmarkCircle style={{ marginRight: "8px" }} />
                {pedido.status}
              </span>
            </div>
          </div>
        </div>

        <h3 className={styles.tituloSecao}>Alterações:</h3>

        <div className={styles.formBox}>
          <div className={styles.formGroup}>
            <label>Nome:<FaRegEdit style={{ marginLeft: "5px", color: "#48742C" }} /></label>
            <input type="text" name="name" value={user.name} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Rua:<FaRegEdit style={{ marginLeft: "5px", color: "#48742C" }} /></label>
            <input type="text" name="rua" value={user.rua} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Número:<FaRegEdit style={{ marginLeft: "5px", color: "#48742C" }} /></label>
            <input type="text" name="numero" value={user.numero} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Bairro:<FaRegEdit style={{ marginLeft: "5px", color: "#48742C" }} /></label>
            <input type="text" name="bairro" value={user.bairro} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>E-mail:<FaRegEdit style={{ marginLeft: "5px", color: "#48742C" }} /></label>
            <input type="email" name="email" value={user.email} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Pagamento:<FaRegEdit style={{ marginLeft: "5px", color: "#48742C" }} /></label>
            <select name="pagamento" value={user.pagamento} onChange={handleChange}>
              <option value="Débito">Débito</option>
              <option value="Crédito">Crédito</option>
              <option value="Pix">Pix</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Nova Senha:<FaRegEdit style={{ marginLeft: "5px", color: "#48742C" }} /></label>
            <input
              type="password"
              name="pass"
              value={user.pass}
              onChange={handleChange}
              placeholder="Digite nova senha..."
            />
          </div>

          <div className={styles.botoes}>
            <button className={styles.sair} onClick={handleLogout}>
              Sair<IoExitOutline fontSize={"20px"} />
            </button>
            <button className={styles.excluir} onClick={handleDelete}>
              Excluir<IoTrash fontSize={"20px"} />
            </button>
            <button className={styles.salvar} onClick={handleUpdate}>
              Salvar Alterações<IoRefreshCircleOutline fontSize={"20px"} />
            </button>
          </div>
        </div>
      </div>
      <Rodape />
    </div>
  );
}
