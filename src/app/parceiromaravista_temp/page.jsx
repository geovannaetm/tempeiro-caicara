"use client";

import React, { useState } from "react";
import styles from "./parceiromaravista.module.css";
import Image from 'next/image'
import imgHeader from '../../../public/headermaravista.png'
import Logo from '../../../public/logo_quiosquemaravista.png'
import { FiPlusCircle } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Topo from '@/components/Topo'
import Rodape from '@/components/Rodape'
import { IoStorefrontOutline } from "react-icons/io5";


export default function ParceiroMaraVista() {
  // Produtos em destaque
  const destaques = [
    {
      id: 1,
      img: "destaquesparceiroM.png",
      title: "Açaí no copo - 400ml (com adicionais de sua preferência)",
      price: "R$ 30,00",
    },
    {
      id: 2,
      img: "porcoes2_home.png",
      title: "Açaí no copo - 400ml (com adicionais de sua preferência)",
      price: "R$ 25,00",
    },
    {
      id: 3,
      img: "destaquesparceiroM3.png",
      title: "Açaí no copo - 400ml (com adicionais de sua preferência)",
      price: "R$ 20,00",
    },
    {
      id: 4,
      img: "destaquesparceiroM.png",
      title: "Açaí no copo - 400ml (com adicionais de sua preferência)",
      price: "R$ 27,00",
    },
    {
      id: 5,
      img: "porcoes2_home.png",
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
      img: "pratosmaravista.png",
      title: "Feijoada completa",
      desc: "A clássica combinação brasileira com feijão preto, carnes, arroz, couve, farofa, vinagrete, torresmo e laranja.",
      price: "R$ 25,00",
    },
    {
      id: 2,
      img: "pratosmaravista2.png",
      title: "Feijoada completa",
      desc: "A clássica combinação brasileira com feijão preto, carnes, arroz, couve, farofa, vinagrete, torresmo e laranja.",
      price: "R$ 25,00",
    },
    {
      id: 3,
      img: "pratosmaravista3.png",
      title: "Feijoada completa",
      desc: "A clássica combinação brasileira com feijão preto, carnes, arroz, couve, farofa, vinagrete, torresmo e laranja.",
      price: "R$ 25,00",
    },
  ];

  // estado do carrinho
  const [cart, setCart] = useState([]);

  // função para adicionar ao carrinho
  const addToCart = (prato) => {
    setCart((prevCart) => [...prevCart, prato]);
    console.log("Adicionado ao carrinho:", prato);
  };

  return (
    <div>
      <Topo/>
      <div className={styles.imgheader}>
        <Image className={styles.img_header} src={imgHeader} alt="header" />
      </div>
    <div className={styles.container}>
      

      {/* Header */}
      <header className={styles.header}>
        <Image className={styles.logo} src={Logo} alt="header" />
        <div className={styles.namequiosque}>
         
          <h1>Quiosque Mar a Vista</h1>
          <p className={styles.subname}>LANCHONETE DA PRAIA</p>
          <span className={styles.rating}>⭐ 4.5 • 1.3km</span>
        </div>

         <div className={styles.horario}>
      <p className={styles.open}>
         <IoStorefrontOutline size={20} color="#3B7798"/>° Aberto
      </p>
      <p className={styles.infohorario}>
        Abre às 09hrs e fecha às 21hrs – todos os dias
      </p>
    </div>
      </header>

      {/* Carrossel */}
      <section className={styles.destaques}>
        <h2>Destaques</h2>
        <div className={styles.carousel}>
          <button className={styles.arrow} onClick={handlePrev}>
            <IoIosArrowBack size={27} />
          </button>

          <div className={styles.carouselWrapper}>
            {getVisibleItems().map((item) => (
              <div key={item.id} className={styles.carouselItem}>
                <img src={item.img} className={styles.imgcarosel} alt={item.title} />
                <p>{item.title}</p>
                <span className={styles.price}>{item.price}</span>
              </div>
            ))}
          </div>

          <button className={styles.arrow} onClick={handleNext}>
            <IoIosArrowForward size={27} />
          </button>
        </div>
      </section>

      {/* Pratos feitos */}
      <section className={styles.pratos}>
        <h2>PRATOS FEITOS</h2>
        {pratos.map((prato) => (
          <div key={prato.id} className={styles.pratoCard}>
            <img src={prato.img} alt={prato.title} />
            <div className={styles.info}>
              <h3>{prato.title}</h3>
              <p>{prato.desc}</p>
              <span className={styles.price}>{prato.price}</span>
            </div>
            <button className={styles.addBtn} onClick={() => addToCart(prato)}>
              <FiPlusCircle size={22} />
            </button>
          </div>
        ))}
      </section>
    </div>

        <Rodape/>

    </div>
  );
}
