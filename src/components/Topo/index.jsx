"use client";

import { useState, useEffect } from "react";
import styles from "./Topo.module.css";
import Image from "next/image";
import { PiBasketFill } from "react-icons/pi";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import Link from "next/link";
import Logo from "/public/logo.png";
import { IoMdArrowDropdown } from "react-icons/io";
import Carrinho from "../Carrinho";

export default function Topo() {
  const [abrirCarrinho, setAbrirCarrinho] = useState(false);
  const [abrirDropdown, setAbrirDropdown] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    const tipo = localStorage.getItem("tipoUser");
    const token = localStorage.getItem("token");

    if (id && tipo && token) {
      const endpoint =
        tipo === "parceiro"
          ? `http://localhost:3333/api/parceiro/${id}`
          : `http://localhost:3333/user/${id}`;

      fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserName(data.nome || data.name);
          setUserType(tipo);
        })
        .catch(() => {
          setUserName(null);
          setUserType(null);
        });
    }
  }, []);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.topo}>
          <Link href="/">
            <Image className={styles.img_logo} src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className={styles.icons}>
          {userType !== "parceiro" && (
            <button
              className={styles.carrinho}
              onClick={() => setAbrirCarrinho(true)}
              aria-label="Abrir carrinho"
            >
              <PiBasketFill color="white" />
            </button>
          )}

          {userName ? (
            <Link
              href={userType === "parceiro" ? "/parceiroadm" : "/userpage"}
              className={styles.usuario}
              title={userType === "parceiro" ? "Parceiro ADM" : "Usuário"}
            >
              {userType === "parceiro" ? (
                <FaUserTie color="#fcfcfcff" size={20} />
              ) : (
                <IoPersonCircleOutline color="white" size={22} />
              )}
              <span className={styles.nomeUsuario}>
                {userName.split(" ")[0]}
              </span>
            </Link>
          ) : (
            <Link href="/cadastro" className={styles.usuario}>
              <IoPersonCircleOutline color="white" size={22} />
            </Link>
          )}
        </div>

        <div className={styles.subtopo}>
          <Link href="/">HOME</Link>
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownToggle}
              onClick={() => setAbrirDropdown(!abrirDropdown)}
            >
              CARDÁPIO <IoMdArrowDropdown />
            </button>

            {abrirDropdown && (
              <div className={styles.dropdownMenu}>
                <Link href="/cardapio/prato-feito">Prato Feito</Link>
                <Link href="/cardapio/camarao">Camarão</Link>
                <Link href="/cardapio/bebidas">Bebidas</Link>
                <Link href="/cardapio/peixes">Peixes</Link>
                <Link href="/cardapio/porcoes">Porções</Link>
                <Link href="/cardapio/sorvetes">Sorvetes</Link>
                <Link href="/cardapio/acai">Açaí</Link>
              </div>
            )}
          </div>
          <Link href="#parceiros" className={styles.none}>PARCERIAS</Link>
          <Link href="#contato">SOBRE NÓS</Link>
          <Link href="#trabalheconosco" className={styles.none}>TRABALHE CONOSCO</Link>
          <Link href="#contato">CONTATO</Link>
        </div>
      </div>

      {userType !== "parceiro" && (
        <Carrinho aberto={abrirCarrinho} fechar={() => setAbrirCarrinho(false)} />
      )}
    </>
  );
}
