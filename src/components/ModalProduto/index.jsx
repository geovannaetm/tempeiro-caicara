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

        <div className={styles.header}>CAMARÃO</div>

        <div className={styles.content}>
          <img src={produto.img} alt={produto.title} className={styles.image} />

          <div className={styles.details}>
            <div className={styles.infoBox}>
               
              <p><IoStorefrontOutline size={20} color="#8F2929" style={{ marginRight: '8px',}}/><strong>{quiosque.nome}</strong></p>
              <p>1,6 KM • {quiosque.tempo}</p>
              <p>Taxa de envio: <span>{quiosque.entrega}</span></p>
              <div className={styles.rating}>
                <AiFillStar color="orange" /> <p>{quiosque.avaliacao}</p>
              </div>
            </div>

            <p className={styles.descricao}>Descrição....................................</p>

            <button className={styles.addButton}>Adicionar ao carrinho</button>
            <p className={styles.total}>Total: R$ {produto.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
