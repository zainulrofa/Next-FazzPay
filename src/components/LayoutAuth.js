import Link from "next/link";
import styles from "styles/LayoutAuth.module.css";
export default function LayoutAuth({ children }) {
  return (
    <main className={styles["main"]}>
      <nav className={styles["navbar"]}>
        <Link href="/" passHref>
          FazzPay
        </Link>
      </nav>
      <section className={styles["left"]}>
        <div className={styles["image-container"]}>
          <div className={styles["img1"]}></div>
          <div className={styles["img2"]}></div>
        </div>
        <h1>App that Covering Banking Needs.</h1>
        <p>
          Zwallet is an application that focussing in banking needs for all
          users in the world. Always updated and always following world trends.
          5000+ users registered in Zwallet everyday with worldwide users
          coverage.
        </p>
      </section>
      <section className={styles["right"]}>
        <div className={styles["child"]}>{children}</div>
      </section>
    </main>
  );
}
