import { serverFetchNews } from '@/lib/api/serverApi';

import Title from '@/components/Title/Title';
import { titleForPageNews, page, limit } from '@/constants/constants'
import css from "./page.module.css"

export default async function NewsPage() {
  const title = titleForPageNews;
  const data = await serverFetchNews(page, limit);

  return (
    <div className={css.container}>
      <Title title={title} />
      {data.results.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
