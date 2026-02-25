import { serverFetchNews } from '@/lib/api/serverApi';

import Title from '@/components/Title/Title';
import NewsList from '@/components/NewsList/NewsList';
import Pagination from '@/components/Pagination/Pagination';
import { limit } from '@/constants/constants';
import css from './page.module.css';

interface NewsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const titleForPageNews = 'News';
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const data = await serverFetchNews(currentPage, limit);

  return (
    <div className={css.container}>
      <Title title={titleForPageNews} />
      <NewsList news={data.results} />
      {data.totalPages > 1 && <Pagination currentPage={currentPage} totalPages={data.totalPages} />}
    </div>
  );
}
