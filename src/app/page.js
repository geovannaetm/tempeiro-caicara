import Topo from "@/components/Topo";
import styles from "./page.module.css";
import Link from "next/link";
import Image from 'next/image';
import Image_bemvindo from '/public/conteudoprincipal.png';

export default function Home() {
  return (
    <div className={styles.page}>

      <Topo />
      
      <main className={styles.main}>
        

        <div className={styles.conteudo}>


    <span className={`${styles.corner} ${styles.tl}`}></span>
          <span className={`${styles.corner} ${styles.tr}`}></span>
          <span className={`${styles.corner} ${styles.bl}`}></span>
          <span className={`${styles.corner} ${styles.br}`}></span>
           


          <div className={styles.titulo_conteudo}>

        
    
       
            <h2>Seja bem-vindo ao</h2>
            <h1>Tempeiro Caiçara</h1>
            <p>O Tempero Caiçara é mais do que um delivery — somos uma rede que conecta você aos sabores autênticos do Litoral Norte.<br/> oferecemos uma plataforma prática e rápida para pedir comida, mas com um diferencial que é a alma do nosso serviço: valorizamos e promovemos a culinária local caiçara. <br/> Aqui, restaurantes, quiosques, lanchonetes e pequenas empresas da região se cadastram no nosso site e aplicativo para oferecer seus pratos únicos — do peixe fresco a pastel de camarão ao açaí na beira da praia. Tudo com aquele sabor de litoral que a gente ama. <br/> Se é do Litoral Norte, tem que ter Tempero Caiçara!</p>
          </div>

          <div className={styles.img_conteudo}>
            <Image className={styles.img_bemvindo} src={Image_bemvindo} alt="Logo" />
          </div>


        </div>


        <div className={styles.cardapio}>
          <div className={styles.linha}></div>
          <h1 className={styles.cardapio_text}>Cardápio</h1>
          <div className={styles.linha}></div>
        </div>



      </main>
    </div>
  );
}
