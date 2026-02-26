'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';

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

  // Пагинация для Мобильных экранов
  const generateMobilePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages === 1) return [1];

    if (currentPage === 1) {
      pages.push(1, 2);
      if (totalPages > 2) pages.push('...');
      return pages;
    }

    if (currentPage === totalPages) {
      pages.push('...');
      pages.push(totalPages - 1, totalPages);
      return pages;
    }

    pages.push('...', currentPage, '...');
    return pages;
  };

  // ===== Генерация страниц с "..."
  const generateDesktopPages = () => {
    const pages: (number | string)[] = [];

    // Если страниц <= 3 — показываем все
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = currentPage - 1;
    let end = currentPage + 1;

    // Если мы в начале
    if (currentPage <= 2) {
      start = 1;
      end = 3;
    }

    // Если мы в конце
    if (currentPage >= totalPages - 1) {
      start = totalPages - 2;
      end = totalPages;
    }

    // Если есть страницы до диапазона — показываем ...
    if (start > 1) {
      pages.push('...');
    }

    // Основные страницы
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Если есть страницы после диапазона — показываем ...
    if (end < totalPages) {
      pages.push('...');
    }

    return pages;
  };

  const mobilePages = generateMobilePages();
  const desktopPages = generateDesktopPages();

  return (
    <div className={css.pagination}>
      <div className={css.containerArrow}>
        {/* << Первая */}
        <button className={css.arrow} disabled={currentPage === 1} onClick={() => goToPage(1)}>
          <div className={css.doubleIcon}>
            <svg className={css.iconSlider} width="24" height="24">
              <use href="/symbol-defs.svg#icon-slider-left" />
            </svg>
            <svg className={css.iconSlider} width="24" height="24">
              <use href="/symbol-defs.svg#icon-slider-left" />
            </svg>
          </div>
        </button>
        {/* < Предыдущая */}
        <button
          className={css.arrow}
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          <svg className={css.iconSlider} width="24" height="24" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-slider-left" />
          </svg>
        </button>
      </div>

      {/* Номера страниц */}
      <div className={css.containerNumber}>
        {/* Mobile */}
        <div className={css.mobileOnly}>
          {mobilePages.map((page, index) =>
            page === '...' ? (
              <span key={`m-ellipsis-${index}`} className={css.ellipsis}>
                ...
              </span>
            ) : (
              <button
                key={`m-page-${page}`}
                onClick={() => goToPage(Number(page))}
                className={clsx(css.paginationNumber, {
                  [css.active]: Number(page) === currentPage,
                })}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Desktop */}
        <div className={css.desktopOnly}>
          {desktopPages.map((page, index) =>
            page === '...' ? (
              <span key={`d-ellipsis-${index}`} className={css.ellipsis}>
                ...
              </span>
            ) : (
              <button
                key={`d-page-${page}`}
                onClick={() => goToPage(Number(page))}
                className={clsx(css.paginationNumber, {
                  [css.active]: Number(page) === currentPage,
                })}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>

      <div className={css.containerArrow}>
        {/* > Следующая */}
        <button
          className={css.arrow}
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          <svg className={css.iconSlider} width="24" height="24" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-slider-right" />
          </svg>
        </button>
        {/* >> Последняя */}
        <button
          className={css.arrow}
          disabled={currentPage === totalPages}
          onClick={() => goToPage(totalPages)}
        >
          <div className={css.doubleIcon}>
            <svg className={css.iconSlider} width="24" height="24">
              <use href="/symbol-defs.svg#icon-slider-right" />
            </svg>
            <svg className={css.iconSlider} width="24" height="24">
              <use href="/symbol-defs.svg#icon-slider-right" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
