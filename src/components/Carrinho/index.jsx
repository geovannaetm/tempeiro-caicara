"use client";
import { useState } from "react";
import styles from "./Carrinho.module.css";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { FaTrash } from "react-icons/fa";

export default function Carrinho({ aberto, fechar }) {
  const [quantidade, setQuantidade] = useState(1);
  const precoUnitario = 30.0;
  const subtotal = precoUnitario * quantidade;

  const aumentar = () => setQuantidade(quantidade + 1);
  const diminuir = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  const removerItem = () => {
    setQuantidade(0);
  };

  const finalizarPedido = () => {
    console.log("Pedido enviado:", {
      produto: "Açaí no copo - 400ml",
      quantidade,
      subtotal,
    });
  };

  return (
    <div className={`${styles.overlay} ${aberto ? styles.show : ""}`}>
      <div className={styles.sidebar}>
        {/* Header do Carrinho */}
        <div className={styles.header}>
          <h2>CARRINHO</h2>
          <button className={styles.closeBtn} onClick={fechar}>
            <IoMdClose size={28} />
          </button>
        </div>

        {/* Conteúdo */}
        {quantidade > 0 ? (
          <div className={styles.item}>
            <Image
              src="/pedidocarrinho.png"
              alt="Açaí"
              width={70}
              height={70}
              className={styles.imagem}
            />
            <div className={styles.info}>
              <p className={styles.nome}>Açaí no copo - 400ml</p>
              <p className={styles.preco}>R$ {precoUnitario.toFixed(2)}</p>

              <div className={styles.acoes}>
                <button className={styles.iconBtn} onClick={removerItem}>
                  <FaTrash size={14} color="#fff" />
                </button>

                <button className={styles.qtdBtn} onClick={diminuir}>-</button>
                <span className={styles.qtd}>{quantidade}</span>
                <button className={styles.qtdBtn} onClick={aumentar}>+</button>
              </div>
            </div>
          </div>
        ) : (
          <p className={styles.empty}>Carrinho vazio</p>
        )}

        {/* Subtotal */}
        <div className={styles.subtotal}>
          <span>Subtotal</span>
          <strong>R$ {subtotal.toFixed(2)}</strong>
        </div>

        {/* Botão Finalizar */}
        <button
          className={styles.finalizar}
          onClick={finalizarPedido}
          disabled={quantidade === 0}
        >
          Finalizar
        </button>
      </div>
    </div>
  );
}
