import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <h1>Página Inicial</h1>
          <p>Página principal de aplicação</p>
          <p>Página gerada automaticamente</p>
      </main>
    </div>
  );
}
