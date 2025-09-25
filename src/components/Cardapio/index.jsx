import styles from "./Cardapio.module.css";
import Image from "next/image";
import Link from "next/link";
import img1 from "/public/pratofeito_home.png";
import img2 from "/public/camarao_home.png";
import img3 from "/public/bebidas_home.png";
import img4 from "/public/peixes_home.png";
import img5 from "/public/porcoes1_home.png";
import img6 from "/public/porcoes2_home.png";
import img7 from "/public/sorvetes_home.png";
import img8 from "/public/acai_home.png";




export default function Cardapio() {

  return (

    <div className={styles.container}>

    <div className={styles.cardapio}>

      <div className={styles.linha}></div>
      <h1 className={styles.cardapio_text}>CARDÁPIO</h1>
      <div className={styles.linha}></div>

    </div>

    <div className={styles.imgs_cardapio}>
        
        <Link href="#"><Image className={styles.img_cardapio} src={img1} alt="Prato Feito" /></Link>

        <Link href="#"><Image className={styles.img_cardapio} src={img2} alt="Camarão" /></Link>

        <Link href="#"><Image className={styles.img_cardapio} src={img3} alt="Bebidas" /></Link>

        <Link href="#"><Image className={styles.img_cardapio} src={img4} alt="Peixes"  /></Link>

        <Link href="#"><Image className={styles.img_cardapio} src={img5} alt="Porções" /></Link>

        <Link href="#"><Image className={styles.img_cardapio} src={img6} alt="Porções" /></Link>

        <Link href="#"><Image className={styles.img_cardapio} src={img7} alt="Sorvetes" /></Link>

        <Link href="#"><Image className={styles.img_cardapio} src={img8} alt="Açaí" /></Link>



    </div>

    </div>
  );
}
