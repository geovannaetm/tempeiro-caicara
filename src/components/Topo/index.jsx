// components/Topo.js
"use client";

import { useState } from "react";
import styles from "./Topo.module.css";
import Image from "next/image";
import { PiBasketFill } from "react-icons/pi";
import { IoPersonCircleOutline } from "react-icons/io5";
import Link from "next/link";
import Logo from "/public/logo.png";
import { IoMdArrowDropdown } from "react-icons/io";
import Carrinho from "../Carrinho";

export default function Topo() {
  const [abrirCarrinho, setAbrirCarrinho] = useState(false);
  const [abrirDropdown, setAbrirDropdown] = useState(false);


  return (
    <>
      <div className={styles.header}>
        <div className={styles.topo}>
          <Link href="/">
            <Image className={styles.img_logo} src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className={styles.icons}>
          <button
            className={styles.carrinho}
            onClick={() => setAbrirCarrinho(true)}
            aria-label="Abrir carrinho"
          >
            <PiBasketFill color="white" />
          </button>

          <Link href="/cadastro" className={styles.usuario}>
            <IoPersonCircleOutline color="white" />
          </Link>
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
          <Link href="#parceiros" className={styles.none}>
            PARCERIAS
          </Link>
          <Link href="#contato">SOBRE NÓS</Link>
          <Link href="#trabalheconosco" className={styles.none}>
            TRABALHE CONOSCO
          </Link>
          <Link href="#contato">CONTATO</Link>
        </div>
      </div>

      {/* Sidebar do Carrinho */}
      <Carrinho aberto={abrirCarrinho} fechar={() => setAbrirCarrinho(false)} />
    </>
  );
}
