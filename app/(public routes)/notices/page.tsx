import { serverFetchNotices } from '@/lib/api/serverApi';
import { fetchAllNotiesCategories, fetchAllNotiesGender } from '@/lib/api/serverApi';
import Title from '@/components/Title/Title';
import NoticesFilters from '@/components/NoticesFilters/NoticesFilters';
import NoticesList from '@/components/NoticesList/NoticesList';
import Pagination from '@/components/Pagination/Pagination';
import css from './page.module.css';

interface NotiesPageProps {
  searchParams: Promise<{
    page?: string;
    keyword?: string;
  }>;
}

export default async function NotiesPage({ searchParams }: NotiesPageProps) {
  const limit = 6;
  const titleForPageNews = 'Find your favorite pet';
  const params = await searchParams;
  const keyword = params.keyword || '';
  const currentPage = Number(params.page) || 1;
  const data = await serverFetchNotices(keyword, currentPage, limit);
  const isEmptySearch = data.results.length === 0;
  const category = await fetchAllNotiesCategories();
  const gender = await fetchAllNotiesGender();

  return (
    <div className={css.container}>
      <div className={css.contTitleSearchField}>
        <Title title={titleForPageNews} />
        <NoticesFilters category={category} gender={gender} />
      </div>
      {isEmptySearch ? (
        <p className={css.emptyMessage}>
          Nothing found for &quot;<span>{keyword}</span>&quot;
        </p>
      ) : (
        <>
          <NoticesList notices={data.results} />
          {data.totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={data.totalPages} />
          )}
        </>
      )}
    </div>
  );
}
