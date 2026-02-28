import { serverFetchNews } from '@/lib/api/serverApi';
import Title from '@/components/Title/Title';
import SearchField from '@/components/SearchField/SearchField';
import NewsList from '@/components/NewsList/NewsList';
import Pagination from '@/components/Pagination/Pagination';
import css from './page.module.css';

interface NewsPageProps {
  searchParams: Promise<{
    page?: string;
    keyword?: string;
  }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const limit = 6;
  const titleForPageNews = 'News';
  const params = await searchParams;
  const keyword = params.keyword || '';
  const currentPage = Number(params.page) || 1;
  const data = await serverFetchNews(keyword, currentPage, limit);
  const isEmptySearch = keyword && data.results.length === 0;

  return (
    <div className={css.container}>
      <div className={css.contTitleSearchField}>
        <Title title={titleForPageNews} />
        <SearchField />
      </div>
      {isEmptySearch ? (
        <p className={css.emptyMessage}>
          Nothing found for &quot;<span>{keyword}</span>&quot;
        </p>
      ) : (
        <>
          <NewsList news={data.results} />
          {data.totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={data.totalPages} />
          )}
        </>
      )}
    </div>
  );
}
