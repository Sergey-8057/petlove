import css from './PetBlock.module.css';

interface PetBlockProps {
  imageName: string;
  alt?: string;
}

export default function PetBlock({ imageName, alt }: PetBlockProps) {
  return (
    <section className={css.imageWrapper}>
      <picture>
        <source
          media="(min-width: 1280px)"
          srcSet={`${imageName}-desk.jpg 1x, ${imageName}-desk-2x.jpg 2x`}
        />
        <source
          media="(min-width: 768px)"
          srcSet={`${imageName}-tabl.jpg 1x, ${imageName}-tabl-2x.jpg 2x`}
        />
        <source
          media="(max-width: 767px)"
          srcSet={`${imageName}-mob.jpg 1x, ${imageName}-mob-2x.jpg 2x`}
        />
        <img
          className={css.imageRegister}
          src={`${imageName}-desk.jpg`}
          alt={alt}
          width="592"
          height="654"
        />
      </picture>
    </section>
  );
}
