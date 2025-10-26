"use client";

import React, { useEffect, useState } from "react";
import styles from "./parceiroadm.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import Topo from "@/components/Topo";
import Rodape from "@/components/Rodape";
import { FaRegEdit } from "react-icons/fa";
/** Helpers */
const readFileAsDataURL = (file) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onerror = () => rej(new Error("File read error"));
    reader.onload = () => res(reader.result);
    reader.readAsDataURL(file);
  });

export default function ParceiroAdm() {
  // Dados do estabelecimento
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [numero, setNumero] = useState("");
  const [logo, setLogo] = useState("");
  const [cover, setCover] = useState("");

  // Destaques
  const [destaques, setDestaques] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Modal prato
  const [showForm, setShowForm] = useState(false);
  const [newPrato, setNewPrato] = useState({
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    destaques: 0,
    imagem: "",
  });

  // Lista de pratos
  const [pratos, setPratos] = useState([]);

  // Pedidos
  const [pedidosCount, setPedidosCount] = useState(0);
  const pedidoSimulado = {
    nome: "Nome do pedido",
    descricao: "descrição do pedido...",
    valor: 50.0,
    status: "Pedido a caminho",
    imagem: "/pedidocarrinho.png",
  };

  // Carregar dados
  useEffect(() => {
    const sNome = localStorage.getItem("adm_nome");
    const sDesc = localStorage.getItem("adm_desc");
    const sNumero = localStorage.getItem("adm_numero");
    const sLogo = localStorage.getItem("adm_logo");
    const sCover = localStorage.getItem("adm_cover");
    const sDestaques = localStorage.getItem("adm_destaques");
    const sPratos = localStorage.getItem("user_pratos");
    const sPedidos = localStorage.getItem("adm_pedidos");

    if (sNome) setNome(sNome);
    if (sDesc) setDescricao(sDesc);
    if (sNumero) setNumero(sNumero);
    if (sLogo) setLogo(sLogo);
    if (sCover) setCover(sCover);
    if (sDestaques) setDestaques(JSON.parse(sDestaques));
    if (sPedidos) setPedidosCount(Number(sPedidos));
    if (sPratos) setPratos(JSON.parse(sPratos));

    if (!sDestaques) {
      setDestaques([
        { id: Date.now(), img: "", title: "Seu destaque aqui", desc: "", price: "R$ 0,00" },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adm_nome", nome);
    localStorage.setItem("adm_desc", descricao);
    localStorage.setItem("adm_numero", numero);
    localStorage.setItem("adm_logo", logo);
    localStorage.setItem("adm_cover", cover);
    localStorage.setItem("adm_destaques", JSON.stringify(destaques));
    localStorage.setItem("adm_pedidos", String(pedidosCount));
  }, [nome, descricao, numero, logo, cover, destaques, pedidosCount]);

  // Uploads
  const onLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await readFileAsDataURL(file);
    setLogo(data);
  };

  const onCoverChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = await readFileAsDataURL(file);
    setCover(data);
  };

  // Destaques
  const addDestaque = () => {
    setDestaques((prev) => [
      ...prev,
      { id: Date.now(), img: "", title: "", desc: "", price: "R$ 0,00" },
    ]);
    setTimeout(() => setCurrentIndex(destaques.length), 50);
  };

  const removeDestaque = (id) => {
    setDestaques((prev) => prev.filter((d) => d.id !== id));
    setCurrentIndex(0);
  };

  const updateDestaqueField = (id, field, value) => {
    setDestaques((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const onDestaqueImageChange = async (id, file) => {
    if (!file) return;
    const data = await readFileAsDataURL(file);
    updateDestaqueField(id, "img", data);
  };

  const saveDestaque = (destaque) => {
    const payload = {
      id: destaque.id,
      title: destaque.title,
      desc: destaque.desc,
      price: destaque.price,
      img: !!destaque.img ? "base64-image-or-dataURL" : null,
    };
    console.log("POST /api/destaques ->", JSON.stringify(payload, null, 2));
    alert("Destaque salvo (veja console).");
  };

  const handlePrev = () => {
    if (destaques.length === 0) return;
    setCurrentIndex((i) => (i === 0 ? destaques.length - 1 : i - 1));
  };

  const handleNext = () => {
    if (destaques.length === 0) return;
    setCurrentIndex((i) => (i === destaques.length - 1 ? 0 : i + 1));
  };

  const visibleDestaques = () => {
    if (destaques.length === 0) return [];
    const out = [];
    for (let i = 0; i < 3; i++) {
      out.push(destaques[(currentIndex + i) % destaques.length]);
    }
    return out;
  };

  // Modal prato
  const openAddPrato = () => setShowForm(true);

  const closeAddPrato = () => {
    setShowForm(false);
    setNewPrato({
      nome: "",
      descricao: "",
      preco: "",
      categoria: "",
      destaques: 0,
      imagem: "",
    });
  };

  const onPratoImageChange = async (file) => {
    if (!file) return;
    const data = await readFileAsDataURL(file);
    setNewPrato((p) => ({ ...p, imagem: data }));
  };

  const submitPrato = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("user_pratos") || "[]");

    let updatedList;
    if (newPrato.id) {
      updatedList = existing.map((p) => (p.id === newPrato.id ? newPrato : p));
    } else {
      const pratoToSave = { ...newPrato, id: Date.now() };
      updatedList = [...existing, pratoToSave];
    }

    localStorage.setItem("user_pratos", JSON.stringify(updatedList));
    setPratos(updatedList);
    
    alert("Prato salvo com sucesso.");
    closeAddPrato();
  };

  const editPrato = (prato) => {
    setNewPrato(prato);
    setShowForm(true);
  };

  const deletePrato = (id) => {
    const updated = pratos.filter((p) => p.id !== id);
    setPratos(updated);
    localStorage.setItem("user_pratos", JSON.stringify(updated));
  };

  const simularPedido = () => {
    setPedidosCount((p) => p + 1);
    console.log("Simulação pedido finalizado ->", JSON.stringify(pedidoSimulado, null, 2));
  };

  return (
    <div className={styles.pageWrap}>
      <Topo />

      <main className={styles.container}>
        {/* Card principal */}
        <section className={styles.card}>
          {/* COVER */}
          <div className={styles.coverArea}>
            {cover ? (
              <img src={cover} alt="Capa" className={styles.coverImg} />
            ) : (
              <div className={styles.coverPlaceholder}>
                <label className={styles.fileLabel}>
                  + Inserir foto de capa
                  <input type="file" accept="image/*" onChange={onCoverChange} />
                </label>
              </div>
            )}
          </div>

          {/* HEADER INFO: logo / nome / descrição */}
          <div className={styles.headerInfo}>
            <div className={styles.logoBox}>
              {logo ? (
                <img src={logo} alt="logo" className={styles.logoImg} />
              ) : (
                <div className={styles.logoPlaceholder}>
                  <label className={styles.fileLabelSmall}>
                    Inserir logo
                    <input type="file" accept="image/*" onChange={onLogoChange} />
                  </label>
                </div>
              )}
            </div>

            <div className={styles.textInfo}>
              <input
                className={styles.nameInput}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome do estabelecimento"
              />
              <input
                className={styles.nameInput}
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="Número do estabelecimento"
              />
              <textarea
                className={styles.descInput}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descrição do estabelecimento"
              />
            </div>

            <div className={styles.actions}>
              <button
                className={styles.saveBtn}
                onClick={() => {
                  localStorage.setItem("adm_nome", nome);
                  localStorage.setItem("adm_desc", descricao);
                  localStorage.setItem("adm_numero", numero);
                  localStorage.setItem("adm_logo", logo);
                  localStorage.setItem("adm_cover", cover);
                  alert("Dados do estabelecimento salvos .");
                  console.log("POST /api/estabelecimento ->", JSON.stringify({ nome, descricao, numero, logo: !!logo ? "dataURL" : null, cover: !!cover ? "dataURL" : null }, null, 2));
                }}
              >
                <FaRegEdit />
                Salvar dados
              </button>
            </div>
          </div>

          {/* Destaques (carrossel editável) */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3>Destaques</h3>
              <div>
                <button className={styles.smallBtn} onClick={addDestaque}>
                  + Novo destaque
                </button>
              </div>
            </div>

            <div className={styles.carouselWrap}>
              <button className={styles.arrowBtn} onClick={handlePrev}>
                <IoIosArrowBack size={20} />
              </button>

              <div className={styles.carousel}>
                {visibleDestaques().map((d) => (
                  <div key={d.id} className={styles.destaqueCard}>
                    <div className={styles.destaqueImgWrap}>
                      {d.img ? (
                        <img src={d.img} alt="destaque" className={styles.destaqueImg} />
                      ) : (
                        <label className={styles.uploadLabel}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => onDestaqueImageChange(d.id, e.target.files?.[0])}
                          />
                          + Imagem
                        </label>
                      )}
                    </div>

                    <input
                      className={styles.inputSmall}
                      placeholder="Título do destaque"
                      value={d.title}
                      onChange={(e) => updateDestaqueField(d.id, "title", e.target.value)}
                    />
                    <textarea
                      className={styles.textSmall}
                      placeholder="Descrição do destaque"
                      value={d.desc}
                      onChange={(e) => updateDestaqueField(d.id, "desc", e.target.value)}
                    />
                    <input
                      className={styles.inputSmall}
                      placeholder="R$ 0,00"
                      value={d.price}
                      onChange={(e) => updateDestaqueField(d.id, "price", e.target.value)}
                    />

                    <div className={styles.cardActions}>
                      <button
                        className={styles.saveMini}
                        onClick={() => saveDestaque(d)}
                      >
                        Salvar
                      </button>
                      <button
                        className={styles.removeMini}
                        onClick={() => removeDestaque(d.id)}
                        title="Remover destaque"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className={styles.arrowBtn} onClick={handleNext}>
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>

          {/* Insights */}
          <div className={styles.section}>
            <h3>Veja o insight da sua loja</h3>
            <div className={styles.insightsRow}>
              <div className={styles.insightCard}>
                <p>Pedidos</p>
                <strong>{pedidosCount}</strong>
              </div>
              <div className={styles.insightCard}>
                <p>Faturamento estimado</p>
                <strong>R$ {(pedidosCount * pedidoSimulado.valor).toFixed(2)}</strong>
              </div>
              <div className={styles.insightCard}>
                <p>Adicionar prato</p>
                <button className={styles.addPratoBtn} onClick={openAddPrato}>
                  <FiPlusCircle size={18} /> Novo prato
                </button>
              </div>
            </div>

            <div className={styles.simRow}>
              <button className={styles.simBtn} onClick={simularPedido}>
                + Simular pedido finalizado (aumenta contador)
              </button>
            </div>
          </div>

          
          {/* Lista de pratos adicionados */}
            <div className={styles.section}>
              <h3>Pratos cadastrados</h3>
              <div className={styles.pratosGrid}>
                {pratos.map((prato) => (
                  <div key={prato.id} className={styles.pratoCard}>
                    <div className={styles.pratoImgWrap}>
                      {prato.imagem ? (
                        <img src={prato.imagem} alt={prato.nome} className={styles.pratoImg} />
                      ) : (
                        <div className={styles.uploadPlaceholder}>Sem imagem</div>
                      )}
                    </div>
                    <div className={styles.pratoInfo}>
                      <strong>{prato.nome}</strong>
                      <p>{prato.descricao}</p>
                      <p><strong>{prato.preco}</strong></p>
                    </div>
                    <div className={styles.pratoActions}>
                      <button className={styles.saveMini} onClick={() => editPrato(prato)}>
                        Editar
                      </button>
                      <button className={styles.removeMini} onClick={() => deletePrato(prato.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

        </section>

       
      </main>

      {/* Modal de adicionar prato */}
      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3>Novo prato</h3>
            <form className={styles.formGrid} onSubmit={submitPrato}>
              <div className={styles.formLeft}>
                <label className={styles.uploadBox}>
                  {newPrato.imagem ? (
                    <img src={newPrato.imagem} alt="preview" className={styles.previewImg} />
                  ) : (
                    <div className={styles.uploadPlaceholder}>Clique para selecionar imagem</div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) await onPratoImageChange(f);
                    }}
                  />
                </label>
              </div>

              <div className={styles.formRight}>
                <label>Nome</label>
                <input
                  value={newPrato.nome}
                  onChange={(e) => setNewPrato((p) => ({ ...p, nome: e.target.value }))}
                  required
                />

                <label>Descrição</label>
                <textarea
                  value={newPrato.descricao}
                  onChange={(e) => setNewPrato((p) => ({ ...p, descricao: e.target.value }))}
                  required
                />

                <label>Preço</label>
                <input
                  value={newPrato.preco}
                  onChange={(e) => setNewPrato((p) => ({ ...p, preco: e.target.value }))}
                  placeholder="R$ 0,00"
                  required
                />

                <label>Categoria</label>
                  <select
                  className={styles.selectInput}
                    value={newPrato.categoria}
                    onChange={(e) => setNewPrato((p) => ({ ...p, categoria: e.target.value }))}
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Camarão">Camarão</option>
                    <option value="Açaí">Açaí</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Peixes">Peixes</option>
                    <option value="Porções">Porções</option>
                    <option value="Sorvetes">Sorvetes</option>
                    <option value="Pratos Feitos">Pratos Feitos</option>
                  </select>

               <label>
                  Destaques
                   <input
                    type="checkbox"
                    className={styles.checkboxInput}
                    checked={newPrato.destaques === 1}
                    onChange={(e) =>
                      setNewPrato((p) => ({ ...p, destaques: e.target.checked ? 1 : 0 }))
                    }
                  />
                </label>

                <div className={styles.modalActions}>
                  <button type="submit" className={styles.buttonPrimary}>
                    Salvar prato
                  </button>
                  <button type="button" className={styles.buttonGhost} onClick={closeAddPrato}>
                    Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
       <Rodape />
    </div>
  );
}
