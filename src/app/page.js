import Topo from "@/components/Topo";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import Image_bemvindo from "/public/conteudoprincipal.png";
import Cardapio from "@/components/Cardapio";
import { VscVerifiedFilled } from "react-icons/vsc";
import ParceiroC from '/public/logo_quiosquecanoa.png'
import ParceiroM from '/public/logo_quiosquemaravista.png'
import ParceiroA from '/public/logo_quiosquedoadriano.png'
import ParceiroI from '/public/logo_quiosqueintermares.png'
import Trabalharconosco from "@/components/Trabalharconosco"
import FooterImg1 from "/public/footerimg1.png"
import FooterImg2 from "/public/footerimg2.png"
import FooterImg3 from "/public/footerimg3.png"
import FooterImg4 from "/public/footerimg4.png"




import Rodape from "@/components/Rodape";

export default function Home() {
  return (
    <div className={styles.page}>
      <Topo />

      <main className={styles.main}>
        <section>
          <div className={styles.conteudo}>

            <span className={`${styles.corner} ${styles.tr}`}></span>
            <span className={`${styles.corner} ${styles.bl}`}></span>

            <div className={styles.titulo_conteudo}>
              <h2>Seja bem-vindo ao</h2>
              <h1>Tempeiro Caiçara</h1>
              <p>
                O <strong>Tempero Caiçara</strong> é mais do que um delivery — somos uma rede que
                conecta você aos sabores autênticos do Litoral Norte.
                <br /> Oferecemos uma plataforma prática e rápida para pedir
                comida, mas com um diferencial que é a alma do nosso serviço:
                valorizamos e promovemos a culinária local caiçara. 
                <br /> Aqui,
                restaurantes, quiosques, lanchonetes e pequenas empresas da
                região se cadastram no nosso site e aplicativo para oferecer
                seus pratos únicos — do peixe fresco a pastel de camarão ao açaí
                na beira da praia. Tudo com aquele sabor de litoral que a gente
                ama.
                <br /><br />
                <span className={styles.frase_destaque}>Se é do Litoral Norte, tem que ter Tempero Caiçara!</span>
              </p>
            </div>

            <div className={styles.img_conteudo}>
              <Image
                className={styles.img_bemvindo}
                src={Image_bemvindo}
                alt="Logo"
              />
            </div>
          </div>
        </section>

        <section>
         
          <Cardapio />

        </section>


        <section>

          <div className={styles.parceiros}>
            <h1>CONHEÇA OS NOSSOS PARCEIROS</h1>

            <div className={styles.cadsparceiros}>

              {/*  QUIOSQUE CANOA */}


              <Link href="#" >
              <div className={styles.parceiro}>
                <span className={styles.verificado}>
                <VscVerifiedFilled  />
                </span>
                <div className={styles.parceirotext_img}>
                  <Image className={styles.img_quiosque} src={ParceiroC} alt="Quiosque Canoa"  />
                  <h2>Quiosque Canoa  
                    <span className={styles.span_parceiros}>lanches</span>
                  </h2>
                 
                </div>

              </div>

              </Link>

              {/*  QUIOSQUE MARAVISTA */}


                <Link href="#" >
                <div className={styles.parceiro}>
                <span className={styles.verificado}>
                <VscVerifiedFilled />
                </span>
                <div className={styles.parceirotext_img}>
                  <Image className={styles.img_quiosque} src={ParceiroM} alt="Quiosque Mar a Vista"  />
                  <h2>Quiosque Mar a Vista  
                    <span className={styles.span_parceiros}>lanches</span>
                  </h2>
                 
                </div>

              </div>
                </Link>


              {/*  QUIOSQUE DO ADRIANO */}



              <Link href="#" >
                <div className={styles.parceiro}>

                 <span className={styles.verificado}>
                <VscVerifiedFilled />
                </span>
                <div className={styles.parceirotext_img}>
                  <Image className={styles.img_quiosque} src={ParceiroA} alt="Quiosque do Adriano"  />
                  <h2>Quiosque do Adriano  
                    <span className={styles.span_parceiros}>lanches</span>
                  </h2>
                 
                </div>

              </div>
              </Link>

              {/*  QUIOSQUE INTERMARES */}



              <Link href="#" >
                <div className={styles.parceiro}>

                 <span className={styles.verificado}>
                <VscVerifiedFilled />
                </span>

                <div className={styles.parceirotext_img}>
                  <Image className={styles.img_quiosque} src={ParceiroI} alt="Quiosque Intermares"  />
                  <h2>Quiosque Intermares  
                    <span className={styles.span_parceiros}>lanches</span>
                  </h2>
                 
                </div>

              </div>
              </Link>

            </div>

          </div>


        </section>



        <section>

          <Trabalharconosco />

        </section>


        <section className={styles.subrodape}>

          <div className={styles.imgsfooter}>
            <Image
                className={styles.img_footer}
                src={FooterImg1}
                alt="Caraguatatuba"
                />

             <Image
                className={styles.img_footer}
                src={FooterImg2}
                alt="Caraguatatuba"
                />

              <Image
                className={styles.img_footer}
                src={FooterImg3}
                alt="Caraguatatuba"
                />

              <Image
                className={styles.img_footer}
                src={FooterImg4}
                alt="Caraguatatuba"
                />

            
          </div>




        </section>



      </main>

    <footer>

      <Rodape />

    </footer>

    </div>
  );
}
