import css from './page.module.css';

export default function Home() {
  return (
    <section className={css.container}>
      <div className={css.hero}>
        <div className={css.contTitleText}>
          <h1 className={css.heroTitle}>
            Take good <span className={css.heroTitleCare}>care</span> of your small pets
          </h1>
          <p className={css.heroText}>
            Choosing a pet for your home is a choice that is meant to enrich your life with
            immeasurable joy and tenderness.
          </p>
        </div>
      </div>
      <div className={css.imageWrapper}>
        <picture>
          <source
            media="(min-width: 1280px)"
            srcSet="hero/image-hero-desk.jpg 1x, hero/image-hero-desk-2x.jpg 2x"
          />
          <source
            media="(min-width: 768px)"
            srcSet="hero/image-hero-tabl.jpg 1x, hero/image-hero-tabl-2x.jpg 2x"
          />
          <source
            media="(max-width: 767px)"
            srcSet="hero/image-hero-mob.jpg 1x, hero/image-hero-mob-2x.jpg 2x"
          />
          <img
            className={css.imageHero}
            src="hero/image-hero-desk.jpg"
            alt="girl with a dog"
            width="1216"
          />
        </picture>
      </div>
    </section>
  );
}
