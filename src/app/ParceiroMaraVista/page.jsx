"use client";

import React, { useState } from "react";
import styles from "./ParceiroMaraVista.module.css";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ParceiroMaraVista() {
  // Produtos em destaque
  const destaques = [
    {
      id: 1,
      img: "https://via.placeholder.com/250x150?text=Açaí+30",
      title: "Açaí no copo - 400ml (com adicionais de sua preferência)",
      price: "R$ 30,00",
    },
    {
      id: 2,
      img: "https://via.placeholder.com/250x150?text=Açaí+25",
      title: "Açaí no copo - 400ml (com adicionais de sua preferência)",
      price: "R$ 25,00",
    },
    {
      id: 3,
      img: "https://via.placeholder.com/250x150?text=Açaí+20",
      title: "Açaí no copo - 400ml (com adicionais de sua preferência)",
      price: "R$ 20,00",
    },
    {
      id: 4,
      img: "https://via.placeholder.com/250x150?text=Açaí+27",
      title: "Açaí no copo - 400ml (com adicionais de sua preferência)",
      price: "R$ 27,00",
    },
    {
      id: 5,
      img: "https://via.placeholder.com/250x150?text=Açaí+28",
      title: "Açaí no copo - 400ml (com adicionais de sua preferência)",
      price: "R$ 28,00",
    },
  ];

  // estado do carrossel
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? destaques.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === destaques.length - 1 ? 0 : prev + 1
    );
  };

  // retorna 3 itens visíveis
  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(destaques[(currentIndex + i) % destaques.length]);
    }
    return visible;
  };

  // lista de pratos feitos
  const pratos = [
    {
      id: 1,
      img: "https://via.placeholder.com/100x80?text=Feijoada",
      title: "Feijoada completa",
      desc: "A deliciosa combinação brasileira feita de porco, arroz, couve e laranja.",
      price: "R$ 25,00",
    },
    {
      id: 2,
      img: "https://via.placeholder.com/100x80?text=Feijoada+2",
      title: "Feijoada completa",
      desc: "A deliciosa combinação brasileira feita de porco, arroz, couve e laranja.",
      price: "R$ 25,00",
    },
    {
      id: 3,
      img: "https://via.placeholder.com/100x80?text=Feijoada+3",
      title: "Feijoada completa",
      desc: "A deliciosa combinação brasileira feita de porco, arroz, couve e laranja.",
      price: "R$ 25,00",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <img
          src="https://via.placeholder.com/80x80?text=Logo"
          alt="Logo"
          className={styles.logo}
        />
        <div>
          <h1>Quiosque Mar a Vista</h1>
          <p className={styles.status}>✅ Aberto</p>
          <span className={styles.rating}>⭐ 4.5 • 1.3km</span>
        </div>
      </header>

      {/* Carrossel */}
      <section className={styles.destaques}>
        <h2>Destaques</h2>
        <div className={styles.carousel}>
          <button className={styles.arrow} onClick={handlePrev}>
            <IoIosArrowBack size={24} />
          </button>

          <div className={styles.carouselWrapper}>
            {getVisibleItems().map((item) => (
              <div key={item.id} className={styles.carouselItem}>
                <img src={item.img} alt={item.title} />
                <p>{item.title}</p>
                <span className={styles.price}>{item.price}</span>
              </div>
            ))}
          </div>

          <button className={styles.arrow} onClick={handleNext}>
            <IoIosArrowForward size={24} />
          </button>
        </div>
      </section>

      {/* Pratos feitos */}
      <section className={styles.pratos}>
        <h2>Pratos feitos</h2>
        {pratos.map((prato) => (
          <div key={prato.id} className={styles.pratoCard}>
            <img src={prato.img} alt={prato.title} />
            <div className={styles.info}>
              <h3>{prato.title}</h3>
              <p>{prato.desc}</p>
              <span className={styles.price}>{prato.price}</span>
            </div>
            <button className={styles.addBtn}>
              <FiPlusCircle size={22} />
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
