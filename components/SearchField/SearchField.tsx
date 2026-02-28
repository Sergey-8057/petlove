'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import css from './SearchField.module.css';

export default function SearchField() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keywordFromUrl = searchParams.get('keyword') || '';
  const [value, setValue] = useState(keywordFromUrl);

  useEffect(() => {
    setValue(keywordFromUrl);
  }, [keywordFromUrl]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const trimmedValue = value.trim();

    if (trimmedValue) {
      params.set('keyword', trimmedValue);
    } else {
      params.delete('keyword');
    }

    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('keyword');
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <form className={css.searchContainer} onSubmit={handleSubmit}>
      <input
        className={css.input}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        type="text"
        placeholder="Search"
      />
      <button type="submit" className={css.iconButtonSearch} aria-label="Search">
        <svg className={css.iconSearch} width="18" height="18" aria-hidden="true">
          <use href="/symbol-defs.svg#icon-search" />
        </svg>
      </button>
      {value && (
        <button
          type="button"
          className={css.iconButtonClear}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg className={css.iconCross} width="18" height="18" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-cross" />
          </svg>
        </button>
      )}
    </form>
  );
}
