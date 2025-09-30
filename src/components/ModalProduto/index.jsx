import React from "react";
import styles from "./ModalProduto.module.css";
import { AiFillStar } from "react-icons/ai";

export default function ModalProduto({ produto, quiosque, onClose }) {
  if (!produto || !quiosque) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>×</button>

        <div className={styles.header}>CAMARÃO</div>

        <div className={styles.content}>
          <img src={produto.img} alt={produto.title} className={styles.image} />

          <div className={styles.details}>
            <div className={styles.infoBox}>
              <p><strong>{quiosque.nome}</strong></p>
              <p>1,6 KM • {quiosque.tempo}</p>
              <p>Taxa de envio: {quiosque.entrega}</p>
              <div className={styles.rating}>
                <AiFillStar color="orange" /> <span>{quiosque.avaliacao}</span>
              </div>
            </div>

            <p className={styles.descricao}>Descrição.................................</p>

            <button className={styles.addButton}>Adicionar ao carrinho</button>
            <p className={styles.total}>Total: R$ 0,00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
