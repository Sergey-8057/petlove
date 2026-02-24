import css from './Title.module.css';

type Props = {
  title: string;
};

export default function Title({ title }: Props) {
  return (
    <div className={css.titleWrapper}>
      <h1 className={css.title}>{title}</h1>
    </div>
  );
}
