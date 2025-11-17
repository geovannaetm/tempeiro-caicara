"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import styles from "./camaraopage.module.css";
import Topo from "@/components/Topo";
import Rodape from "@/components/Rodape";
import ModalProduto from "@/components/ModalProduto";

export default function PaginaCamarao() {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Busca todos os estabelecimentos
        const resEst = await fetch("http://localhost:3333/api/estabelecimentos");
        const estData = await resEst.json();

        // Para cada estabelecimento, busca seus pratos
        const estComPratos = await Promise.all(
          estData.map(async (est) => {
            const resPratos = await fetch(
              `http://localhost:3333/api/pratos?estabelecimentos_id=${est.id}`
            );
            const pratos = await resPratos.json();

            // Filtra apenas os pratos da categoria "Camarão"
            const pratosCamarao = pratos.filter(
              (p) => p.categoria.toLowerCase() === "camarão"
            );

            return { ...est, produtos: pratosCamarao };
          })
        );

        // Só mantém estabelecimentos que têm pratos de camarão
        setEstabelecimentos(estComPratos.filter((e) => e.produtos.length > 0));
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Topo />

      <section className={styles.banner}>
        <img src="/bannercamarao.png" alt="Banner" className={styles.bannerImage} />
        <div className={styles.bannerText}>Camarão</div>
      </section>

      {loading ? (
        <p>Carregando...</p>
      ) : estabelecimentos.length === 0 ? (
        <p>Nenhum prato de camarão encontrado.</p>
      ) : (
        estabelecimentos.map((q) => <CardQuiosque key={q.id} data={q} />)
      )}

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

  const handleOpenModal = (produto) => setModalProduto(produto);
  const handleCloseModal = () => setModalProduto(null);

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
          <img src={data.logo_url} alt={data.nome} className={styles.logo} />
          <div className={styles.infos}>
            <h2 className={styles.nomequiosque}>{data.nome}</h2>
            <div className={styles.details}>
              <AiFillStar color="orange" /> <span>4.5</span>
              <span> • 45-55 MIN</span>
              <span> • Grátis</span>
            </div>
          </div>
        </div>
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
              <img src={item.imagem} alt={item.nome} className={styles.imgcarosel} />
              <p>{item.nome}</p>
              <span className={styles.price}>
                {Number(item.preco).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
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
