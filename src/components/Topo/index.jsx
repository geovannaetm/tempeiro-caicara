import styles from './Topo.module.css'
import Image from 'next/image'
import { PiBasketFill } from "react-icons/pi";
import { IoPersonCircleOutline } from "react-icons/io5";
import Link from 'next/link'
import Logo from '/public/logo.png'
import { IoMdArrowDropdown } from "react-icons/io";

export default function Topo() {
    return (
        <div className={styles.header}>
            <div className={styles.topo}>
                <Image className={styles.img_logo} src={Logo} alt="Logo" />

            </div>
            <div className={styles.icons}>
                <Link href="#" className={styles.carrinho}>
                    <PiBasketFill color="white"  />
                </Link>
                <Link href="#" className={styles.usuario}>
                    <IoPersonCircleOutline color="white"  />
                </Link>
            </div>


            <div className={styles.subtopo}>

                <Link href="#">Home</Link>
                <div className={styles.icon_dropdown}>
                <Link href="#">Cardápio <IoMdArrowDropdown /></Link>
                </div>
                <Link href="#" className={styles.none}>Parcerias</Link>
                <Link href="#">Sobre Nós</Link>
                <Link href="#" className={styles.none}>Trabalhe Conosco</Link>
                <Link href="#">Contato</Link>

            </div>

        </div>

    )
}