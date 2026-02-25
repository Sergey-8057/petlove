'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Функция перехода на страницу
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  // Если страниц 1 или меньше — не показываем пагинацию
  if (totalPages <= 1) return null;

  // ===== Генерация страниц с "..."
  const generatePages = () => {
    const pages: (number | string)[] = [];

    const delta = 2; // сколько страниц показывать вокруг текущей

    const left = currentPage - delta;
    const right = currentPage + delta;

    // Всегда показываем первую страницу
    pages.push(1);

    // Если есть разрыв слева — добавляем ...
    if (left > 2) {
      pages.push('...');
    }

    // Центральные страницы
    for (let i = Math.max(2, left); i <= Math.min(totalPages - 1, right); i++) {
      pages.push(i);
    }

    // Если есть разрыв справа — добавляем ...
    if (right < totalPages - 1) {
      pages.push('...');
    }

    // Всегда показываем последнюю страницу
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className={css.pagination}>
      {/* << Первая */}
      <button disabled={currentPage === 1} onClick={() => goToPage(1)}>
        {'<<'}
      </button>

      {/* < Предыдущая */}
      <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
        {'<'}
      </button>

      {/* Номера страниц */}
      {pages.map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className={css.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => goToPage(Number(page))}
            className={Number(page) === currentPage ? css.active : ''}
          >
            {page}
          </button>
        )
      )}

      {/* > Следующая */}
      <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>
        {'>'}
      </button>

      {/* >> Последняя */}
      <button disabled={currentPage === totalPages} onClick={() => goToPage(totalPages)}>
        {'>>'}
      </button>
    </div>
  );
}
