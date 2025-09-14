import styles from './Rodape.module.css'
import Image from 'next/image'
import Logo from '/public/logo.png'
import { IoLogoWhatsapp } from "react-icons/io";// Ícone do WhatsApp : <IoLogoWhatsapp />
import { RiInstagramFill } from "react-icons/ri"; // <RiInstagramFill />
import { AiFillTikTok } from "react-icons/ai"; // <AiFillTikTok />


export default function Rodape() {
    return (
        <div className={styles.rodape}>
            <div className={styles.rodape_info}>
                <ul className={styles.lista}>
                    <li>Fale Conosco</li>
                    <li>Conta e Segurança</li>
                    <li>Cadastre o seu Restaurante</li>
                </ul>

                <ul className={styles.lista}>
                    <li>Política de Privacidade</li>
                    <li>Termos de Uso</li>
                </ul>

                <ul className={styles.lista}>
                    <li>Siga-nos nas redes sociais</li>
                    <li className={styles.redes}>
                    <IoLogoWhatsapp />
                    <RiInstagramFill />
                    <AiFillTikTok />
                    </li>
                </ul>

            </div>

            <div className={styles.rodape_logo}>
                <Image className={styles.img_logo} src={Logo} alt="Logo" />
                <p>©Copyright 2025 Tempeiro Caiçara - Todos os direitos reservados.</p>
            </div>

        </div>
    )
}