"use client";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import styles from "./camaraopage.module.css";
import Topo from "@/components/Topo";
import Rodape from "@/components/Rodape";
import ModalProduto from "@/components/ModalProduto";

// Dados de exemplo
const quiosques = [
  {
    id: 1,
    nome: "Quiosque Intermares",
    logo: "/camaraopagelogo1.png",
    avaliacao: 4.5,
    tempo: "50-60 MIN",
    entrega: "Grátis",
    produtos: [
      { id: 1, img: "/destaquesparceiroM.png", title: "Açaí no copo - 400ml", price: "R$ 25,00" },
      { id: 2, img: "/destaquesparceiroM3.png", title: "Açaí no copo - 400ml", price: "R$ 25,00" },
      { id: 3, img: "/destaquesparceiroM.png", title: "Açaí no copo - 400ml", price: "R$ 25,00" },
      { id: 4, img: "/destaquesparceiroM3.png", title: "Açaí no copo - 400ml", price: "R$ 25,00" },
    ],
  },
  {
    id: 2,
    nome: "Quiosque do Sol",
    logo: "/camaraopagelogo2.png",
    avaliacao: 4.7,
    tempo: "40-50 MIN",
    entrega: "Grátis",
    produtos: [
      { id: 1, img: "/destaquesparceiroM.png", title: "Açaí no copo - 400ml", price: "R$ 25,00" },
      { id: 2, img: "/destaquesparceiroM3.png", title: "Açaí no copo - 400ml", price: "R$ 25,00" },
      { id: 3, img: "/destaquesparceiroM.png", title: "Açaí no copo - 400ml", price: "R$ 25,00" },
      { id: 4, img: "/destaquesparceiroM3.png", title: "Açaí no copo - 400ml", price: "R$ 25,00" },
    ],
  },
];

export default function PaginaQuiosques() {
  return (
    <div className={styles.container}>
      <Topo />

      <section className={styles.banner}>
        <img src="/bannercamarao.png" alt="Banner" className={styles.bannerImage} />
        <div className={styles.bannerText}>Camarão</div>
      </section>

      {quiosques.map((q) => (
        <CardQuiosque key={q.id} data={q} />
      ))}

      <Rodape />
    </div>
  );
}

function CardQuiosque({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalProduto, setModalProduto] = useState(null);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? data.produtos.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === data.produtos.length - 1 ? 0 : prev + 1
    );
  };

  const handleOpenModal = (produto) => {
    setModalProduto(produto);
  };

  const handleCloseModal = () => {
    setModalProduto(null);
  };

  const getVisibleItems = () => {
    const visible = [];
    const itemsToShow = Math.min(4, data.produtos.length);
    for (let i = 0; i < itemsToShow; i++) {
      visible.push(data.produtos[(currentIndex + i) % data.produtos.length]);
    }
    return visible;
  };

  return (
    <div className={styles.quiosque}>
      <div className={styles.header}>
        <div className={styles.info}>
          <img src={data.logo} alt={data.nome} className={styles.logo} />
          <div className={styles.infos}>
            <h2 className={styles.nomequiosque}>{data.nome}</h2>
            <div className={styles.details}>
              <AiFillStar color="orange" /> <span>{data.avaliacao}</span>
              <span> • {data.tempo}</span>
              <span> • {data.entrega}</span>
            </div>
          </div>
        </div>
        <FiHeart size={22} className={styles.heart} />
      </div>

      <div className={styles.carousel}>
        <button className={styles.arrow} onClick={handlePrev}>
          <IoIosArrowBack size={35} />
        </button>

        <div className={styles.carouselWrapper}>
          {getVisibleItems().map((item) => (
            <div
              key={item.id}
              className={styles.carouselItem}
              onClick={() => handleOpenModal(item)}
            >
              <img src={item.img} alt={item.title} className={styles.imgcarosel} />
              <p>{item.title}</p>
              <span className={styles.price}>{item.price}</span>
            </div>
          ))}
        </div>

        <button className={styles.arrow} onClick={handleNext}>
          <IoIosArrowForward size={35} />
        </button>
      </div>

      {modalProduto && (
        <ModalProduto
          produto={modalProduto}
          quiosque={data}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
