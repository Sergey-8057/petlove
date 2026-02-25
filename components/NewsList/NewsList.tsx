import Image from 'next/image';
import Link from 'next/link';

import { News } from '@/types/news';
import css from './NewsList.module.css';

type Props = {
  news: News[];
};

export default function NewsList({ news }: Props) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  return (
    <div className={css.container}>
      <ul className={css.listNews}>
        {news.map(item => (
          <li key={item._id} className={css.newsItem}>
            {item.imgUrl && (
              <div className={css.imageWrapper}>
                <Image
                  src={item.imgUrl}
                  alt={item.title}
                  width={361}
                  height={226}
                  className={css.image}
                />
              </div>
            )}
            <h2 className={css.title}>{item.title}</h2>
            <p className={css.text}>{item.text}</p>
            <div className={css.dateAndLink}>
              <p className={css.date}>{formatDate(item.date)}</p>
              <Link className={css.link} href={item.url} target="_blank" rel="noopener noreferrer">
                Read more
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
