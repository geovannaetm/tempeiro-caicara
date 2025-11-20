import React from "react";
import styles from "./ModalProduto.module.css";
import { AiFillStar } from "react-icons/ai";
import { IoStorefrontOutline } from "react-icons/io5";

export default function ModalProduto({ produto, quiosque, onClose }) {
  if (!produto || !quiosque) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>×</button>

        {/* Nome do prato */}
        <div className={styles.header}>{produto.nome}</div>

        <div className={styles.content}>
          {/* Imagem do prato */}
          {produto.imagem ? (
            <img src={produto.imagem} alt={produto.nome} className={styles.image} />
          ) : (
            <img src="/bannerpadrao.png" alt="Imagem padrão" className={styles.image} />
          )}

          <div className={styles.details}>
            <div className={styles.infoBox}>
              <p>
                <IoStorefrontOutline size={20} color="#8F2929" style={{ marginRight: "8px" }} />
                <strong>{quiosque.nome}</strong>
              </p>
              <p>1,6 KM • {quiosque.tempo || "45-55 MIN"}</p>
              <p>Taxa de envio: <span>{quiosque.entrega || "Grátis"}</span></p>
              <div className={styles.rating}>
                <AiFillStar color="orange" /> <p>{quiosque.avaliacao || "4.5"}</p>
              </div>
            </div>

            {/* Descrição do prato */}
            <p className={styles.descricao}>
              {produto.descricao || "Sem descrição disponível"}
            </p>

            {/* Botão de adicionar ao carrinho */}
            <button className={styles.addButton}>Adicionar ao carrinho</button>

            {/* Preço formatado */}
            <p className={styles.total}>
              Total:{" "}
              {Number(produto.preco).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
