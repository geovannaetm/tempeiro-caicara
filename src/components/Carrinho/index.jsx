"use client";
import { useCarrinho } from "@/context/CarrinhoContext";
import styles from "./Carrinho.module.css";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

export default function CarrinhoSidebar({ aberto, onClose }) {
  const { itens, removerItem, atualizarQuantidade, cartId, limparCarrinho } = useCarrinho();
  const lista = Array.isArray(itens) ? itens : [];
  const subtotal = lista.reduce(
    (acc, item) => acc + Number(item.preco) * Number(item.quantidade),
    0
  );

  // finalizar o pedido
  async function handleFinalizar() {
    const token = localStorage.getItem("token");
    if (!token || !cartId) {
      toast.warning("Você precisa estar logado para finalizar.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3333/api/orders/from-cart/${cartId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao criar pedido");

      toast.success("Pedido criado com sucesso!");
      limparCarrinho(); 
      onClose();       
    } catch (err) {
      toast.error("Erro: " + err.message);
    }
  }

  return (
    <div className={`${styles.overlay} ${aberto ? styles.show : ""}`}>
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h2>Meu Carrinho</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <IoMdClose size={28} />
          </button>
        </div>

        {lista.length > 0 ? (
          <div className={styles.lista}>
            {lista.map((item) => (
              <div key={item.id} className={styles.item}>
                <Image
                  src={item.imagem || "/bannerpadrao.png"}
                  alt={item.nome}
                  width={70}
                  height={70}
                  className={styles.imagem}
                />
                <div className={styles.info}>
                  <p className={styles.nome}>{item.nome}</p>
                  <p className={styles.preco}>R$ {Number(item.preco).toFixed(2)}</p>
                  <div className={styles.acoes}>
                    <button
                      className={styles.iconBtn}
                      onClick={() => removerItem(item.id)}
                    >
                      <FaTrash size={14} color="#fff" />
                    </button>
                    <button
                      className={styles.qtdBtn}
                      onClick={() =>
                        atualizarQuantidade(item.id, item.quantidade - 1)
                      }
                    >
                      -
                    </button>
                    <span className={styles.qtd}>{item.quantidade}</span>
                    <button
                      className={styles.qtdBtn}
                      onClick={() =>
                        atualizarQuantidade(item.id, item.quantidade + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <strong>R$ {subtotal.toFixed(2)}</strong>
            </div>
            <button
      className={styles.finalizar}
      disabled={itens.length === 0}
      onClick={handleFinalizar}
    >
              Finalizar
            </button>
          </div>
        ) : (
          <p className={styles.empty}>Carrinho vazio</p>
        )}
      </div>
    </div>
  );
}
