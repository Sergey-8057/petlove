import { serverFetchNotices } from '@/lib/api/serverApi';
import {
  fetchAllNotiesCategories,
  fetchAllNotiesGender,
  fetchAllNotiesType,
  fetchAllNotiesLocations,
} from '@/lib/api/serverApi';
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
  const currentPage = Number(params.page) || 1;
  const query = {
    ...params,
    page: Number(params.page) || 1,
    limit,
  };
  const data = await serverFetchNotices(query);
  const isEmptySearch = data.results.length === 0;
  const category = await fetchAllNotiesCategories();
  const gender = await fetchAllNotiesGender();
  const type = await fetchAllNotiesType();
  const location = await fetchAllNotiesLocations();

  return (
    <div className={css.container}>
      <div className={css.contTitleSearchField}>
        <Title title={titleForPageNews} />
        <div className={css.filtersWrapper}>
          <NoticesFilters category={category} gender={gender} type={type} location={location} />
        </div>
      </div>
      {isEmptySearch ? (
        <p className={css.emptyMessage}>Nothing found</p>
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
