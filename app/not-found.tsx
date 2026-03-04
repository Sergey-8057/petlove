import Link from 'next/link';

import css from './not-found.module.css';

export default function NotFound() {
  return (
    <section className={css.container}>
      <div className={css.containerNotFound}>
        <div className={css.contFourZeroFour}>
          <p className={css.numberFour}>4</p>
          <div className={css.imageZeroWrapper}>
            <picture>
              <source media="(min-width: 768px)" srcSet="image-404-tabl-desk.png" />
              <source media="(max-width: 767px)" srcSet="image-404-mob.png" />
              <img
                className={css.imageZero}
                src="image-404-tabl-desk.png"
                alt="zero"
                width="280"
                height="280"
              />
            </picture>
          </div>
          <p className={css.numberFour}>4</p>
        </div>
        <p className={css.textNotFound}>Ooops! This page not found :(</p>
        <Link className={css.linkToHome} href="/">
          To home page
        </Link>
      </div>
    </section>
  );
}
