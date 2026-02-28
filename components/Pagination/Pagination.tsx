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

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

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

  const generateDesktopPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = currentPage - 1;
    let end = currentPage + 1;

    if (currentPage <= 2) {
      start = 1;
      end = 3;
    }

    if (currentPage >= totalPages - 1) {
      start = totalPages - 2;
      end = totalPages;
    }

    if (start > 1) {
      pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

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
        <button
          className={clsx(css.arrow, css.oneIcon)}
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          <svg className={css.iconSlider} width="24" height="24" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-slider-left" />
          </svg>
        </button>
      </div>

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
        <button
          className={clsx(css.arrow, css.oneIcon)}
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          <svg className={css.iconSlider} width="24" height="24" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-slider-right" />
          </svg>
        </button>
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
