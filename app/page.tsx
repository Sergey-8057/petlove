// import Image from "next/image";
import css from './page.module.css';

export default function Home() {
  return (
    <section className={css.hero}>
      <div className={css.contTitle}>
        <h1>Take good care of your small pets</h1>
        <p>
          Choosing a pet for your home is a choice that is meant to enrich your life with
          immeasurable joy and tenderness.
        </p>
      </div>
      <div className={css.contImage}></div>
    </section>
  );
}
