"use client";

import React, { useEffect, useState } from "react";
import styles from "./parceiroadm.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaEdit, FaTrash, FaRegEdit } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import Topo from "@/components/Topo";
import Rodape from "@/components/Rodape";
import { toast } from "react-toastify";

const readFileAsDataURL = (file) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onerror = () => rej(new Error("File read error"));
    reader.onload = () => res(reader.result);
    reader.readAsDataURL(file);
  });

export default function ParceiroAdm() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [numero, setNumero] = useState("");
  const [logo, setLogo] = useState("");
  const [cover, setCover] = useState("");
  const [estabelecimentoId, setEstabelecimentoId] = useState(null);
  const [destaques, setDestaques] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [newPrato, setNewPrato] = useState({
    id: null,
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    destaque: 0,
    imagem: "",
  });
  const [pratos, setPratos] = useState([]);
  const [pedidosCount, setPedidosCount] = useState(0);
  const pedidoSimulado = { valor: 50.0 };

  const id = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3333/api/parceiro/${id}`)
      .then((res) => res.json())
      .then((adm) => {
        fetch(`http://localhost:3333/api/estabelecimentos/me/${id}`)
          .then((res) => res.json())
          .then((est) => {
            const e = Array.isArray(est) ? est[0] : est;
            if (!e) return;
            setEstabelecimentoId(e.id);
            setNome(e.nome || "");
            setDescricao(e.decricao || "");
            setNumero(e.numero || "");
            setLogo(e.logo_url || "");
            setCover(e.cover_url || "");

            fetch(`http://localhost:3333/api/pratos?estabelecimentos_id=${e.id}`)
              .then((res) => res.json())
              .then((data) => {
                setPratos(data);
                setDestaques(data.filter((p) => p.destaque === 1));
              });
          });
      });
  }, [id]);

  const salvarDados = async () => {
    if (!estabelecimentoId) return;

    const payload = {
      nome,
      decricao: descricao,
      numero,
      logo_url: logo,
      cover_url: cover,
      adm_id_adm: parseInt(id),
    };

    await fetch(`http://localhost:3333/api/estabelecimentos/${estabelecimentoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await fetch(`http://localhost:3333/api/estabelecimentos/me/${id}`);
    const est = await res.json();
    const e = Array.isArray(est) ? est[0] : est;
    if (e) {
      setNome(e.nome || "");
      setDescricao(e.decricao || "");
      setNumero(e.numero || "");
      setLogo(e.logo_url || "");
      setCover(e.cover_url || "");
    }

    toast.success("Dados salvos com sucesso!");
  };

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

  const openAddPrato = () => setShowForm(true);
  const closeAddPrato = () => {
    setShowForm(false);
    setNewPrato({
      id: null,
      nome: "",
      descricao: "",
      preco: "",
      categoria: "",
      destaque: 0,
      imagem: "",
    });
  };

  const onPratoImageChange = async (file) => {
    if (!file) return;
    const data = await readFileAsDataURL(file);
    setNewPrato((p) => ({ ...p, imagem: data }));
  };

  const submitPrato = async (e) => {
    e.preventDefault();
    if (!estabelecimentoId) return;

    const pratoToSave = {
      nome: newPrato.nome,
      descricao: newPrato.descricao,
      preco: parseFloat(newPrato.preco.replace("R$", "").replace(",", ".")),
      categoria: newPrato.categoria,
      imagem: newPrato.imagem,
      destaque: newPrato.destaque,
      estabelecimentos_id: estabelecimentoId,
    };

    const method = newPrato.id ? "PUT" : "POST";
    const url = newPrato.id
      ? `http://localhost:3333/api/pratos/${newPrato.id}`
      : `http://localhost:3333/api/pratos`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pratoToSave),
    });

    const res = await fetch(`http://localhost:3333/api/pratos?estabelecimentos_id=${estabelecimentoId}`);
    const data = await res.json();
    setPratos(data);
    setDestaques(data.filter((p) => p.destaque === 1));

    toast.success("Prato salvo com sucesso.");
    closeAddPrato();
  };

  const editPrato = (prato) => {
    setNewPrato(prato);
    setShowForm(true);
  };

  const deletePrato = async (idPrato) => {
    const confirm = window.confirm("Tem certeza que deseja excluir este prato?");
    if (!confirm) return;

    await fetch(`http://localhost:3333/api/pratos/${idPrato}`, {
      method: "DELETE",
    });

    const res = await fetch(`http://localhost:3333/api/pratos?estabelecimentos_id=${estabelecimentoId}`);
    const data = await res.json();
    setPratos(data);
    setDestaques(data.filter((p) => p.destaque === 1));
  };

  const simularPedido = () => {
    setPedidosCount((p) => p + 1);
  };


  return (
    <div className={styles.pageWrap}>
  <Topo />
  <main className={styles.container}>
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

      {/* HEADER */}
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
          <button className={styles.saveBtn} onClick={salvarDados}>
            <FaRegEdit /> Salvar dados
          </button>
        </div>
      </div>

      {/* Destaques */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.titledestaques}>Destaques</h3>
        </div>
        <div className={styles.carouselWrap}>
          <button className={styles.arrowBtn} onClick={handlePrev}>
            <IoIosArrowBack size={20} />
          </button>
          <div className={styles.carousel}>
            {visibleDestaques().map((d, index) => (
              <div key={`${d.id}-${index}`} className={styles.destaqueCard}>
                <div className={styles.destaqueImgWrap}>
                  {d.imagem ? (
                    <img src={d.imagem} alt="destaque" className={styles.destaqueImg} />
                  ) : (
                    <div className={styles.uploadPlaceholder}>Sem imagem</div>
                  )}
                </div>
                <input className={styles.inputSmall} value={d.nome} disabled />
                <textarea className={styles.textSmall} value={d.descricao} disabled />
                <input
                  className={styles.inputSmall}
                  value={`R$ ${parseFloat(d.preco).toFixed(2)}`}
                  disabled
                />
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
        <h3 className={styles.titleinsight}>Veja o insight da sua loja</h3>
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
      </div>

      {/* Lista de pratos */}
      <div className={styles.section}>
        <h3 className={styles.titlecadpratos}>Pratos cadastrados</h3>
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
                <p><strong>R$ {parseFloat(prato.preco).toFixed(2)}</strong></p>
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
        <h3 className={styles.titleprato}>{newPrato.id ? "Editar prato" : "Crie aqui o seu delicioso prato:"}</h3>
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
              Destaque
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={newPrato.destaque === 1}
                onChange={(e) =>
                  setNewPrato((p) => ({ ...p, destaque: e.target.checked ? 1 : 0 }))
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


    {/* Botões de ações finais */}
    <div className={styles.footerActions}>

      <button
        className={styles.logoutBtn}
        onClick={() => {
          localStorage.removeItem("userId");
          window.location.href = "/login";
        }}
      >
        Encerrar sessão
      </button>

      <button
        className={styles.deleteBtn}
        onClick={async () => {
          const confirm = window.confirm(
            "Tem certeza que deseja excluir este estabelecimento e todos os pratos?"
          );
          if (!confirm) return;

          try {
            await fetch(`http://localhost:3333/api/estabelecimentos/${estabelecimentoId}`, {
              method: "DELETE",
            });

            toast.success("Estabelecimento e pratos excluídos com sucesso!");
            localStorage.removeItem("userId");
            window.location.href = "/login";
          } catch (error) {
            console.error("Erro ao excluir:", error);
            toast.error("Erro ao excluir estabelecimento.");
          }
        }}
      >
        Excluir estabelecimento
      </button>
    </div>

  
  <Rodape />
</div>
  );
}
