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

const sections = [
  { src: img1, alt: "Prato Feito", label: "Prato Feito" },
  { src: img2, alt: "Camarão", label: "Camarão" },
  { src: img3, alt: "Bebidas", label: "Bebidas" },
  { src: img4, alt: "Peixes", label: "Peixes" },
  { src: img5, alt: "Porções", label: "Porções" },
  { src: img6, alt: "Porções", label: "Porções" },
  { src: img7, alt: "Sorvetes", label: "Sorvetes" },
  { src: img8, alt: "Açaí", label: "Açaí" },
];

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export default function Cardapio() {
  return (
    <div className={styles.container}>
      <div className={styles.cardapio}>
        <div className={styles.linha}></div>
        <h1 className={styles.cardapio_text}>CARDÁPIO</h1>
        <div className={styles.linha}></div>
      </div>

      <div className={styles.imgs_cardapio}>
        {sections.map(({ src, alt, label }, index) => (
          <Link
            href={`/camaraopage/${slugify(label)}`}
            key={index}
            className={styles.card_item}
          >
            <div className={styles.img_wrapper}>
              <Image className={styles.img_cardapio} src={src} alt={alt} />
              <div className={styles.overlay}>
                <span className={styles.overlay_text}>{label}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
