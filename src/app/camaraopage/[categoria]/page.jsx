"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import Topo from "@/components/Topo";
import Rodape from "@/components/Rodape";
import ModalProduto from "@/components/ModalProduto";
import styles from "./camaraopage.module.css";

// Função para normalizar nomes -> slug
function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

// Mapa de categorias → nome + banner
const categorias = {
  camarao: { nome: "Camarão", banner: "/bannercamarao.png" },
  acai: { nome: "Açaí", banner: "/banneracai.png" },
  bebidas: { nome: "Bebidas", banner: "/bannerbebidas.png" },
  peixes: { nome: "Peixes", banner: "/bannerpeixes.png" },
  porcoes: { nome: "Porções", banner: "/bannerporcoes.png" },
  sorvetes: { nome: "Sorvetes", banner: "/bannersorvetes.png" },
 "pratos-feitos": { nome: "Pratos Feitos", banner: "/bannerpratofeito.png" },
};

export default function PaginaCategoria() {
  const { categoria: slug } = useParams();
  const categoria = categorias[slug] || { nome: slug, banner: "/bannerpratofeito.png" };

  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalProduto, setModalProduto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resEst = await fetch("http://localhost:3333/api/estabelecimentos");
        const estData = await resEst.json();

        const estComPratos = await Promise.all(
          estData.map(async (est) => {
            const resPratos = await fetch(
              `http://localhost:3333/api/pratos?estabelecimentos_id=${est.id}`
            );
            const pratos = await resPratos.json();

           
            const filtrados = pratos.filter((p) => {
              const cat = slugify(p.categoria);

              const normalizeSegments = (s) =>
                s
                  .split("-")
                  .map((seg) => (seg.endsWith("s") ? seg.slice(0, -1) : seg))
                  .join("-");

              return cat === slug || normalizeSegments(cat) === normalizeSegments(slug);
            });

            return { ...est, produtos: filtrados };
          })
        );

        setEstabelecimentos(estComPratos.filter((e) => e.produtos.length > 0));
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleOpenModal = (produto) => setModalProduto(produto);
  const handleCloseModal = () => setModalProduto(null);

  return (
    <div className={styles.container}>
      <Topo />

      <section className={styles.banner}>
        <img src={categoria.banner} alt={categoria.nome} className={styles.bannerImage} />
        <div className={styles.bannerText}>{categoria.nome}</div>
      </section>

      {loading ? (
        <p className={styles.carregando}>Carregando...</p>
      ) : estabelecimentos.length === 0 ? (
        <p className={styles.nenhumprato}>Nenhum prato de {categoria.nome.toLowerCase()} encontrado.</p>
      ) : (
        estabelecimentos.map((q) => (
          <CardQuiosque key={q.id} data={q} onOpenModal={handleOpenModal} />
        ))
      )}

      {modalProduto && (
        <ModalProduto
          produto={modalProduto}
          quiosque={modalProduto.estabelecimento}
          onClose={handleCloseModal}
        />
      )}

      <Rodape />
    </div>
  );
}

function CardQuiosque({ data, onOpenModal }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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
              onClick={() => onOpenModal({ ...item, estabelecimento: data })}
            >
              
              {item.imagem ? (
                <img src={item.imagem} alt={item.nome} className={styles.imgcarosel} />
              ) : (
                <img src="/bannercamarao.png" alt="Imagem padrão" className={styles.imgcarosel} />
              )}
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
    </div>
  );
}
