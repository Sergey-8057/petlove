'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { LocationsResponse } from '@/types/locations';
import css from './SearchLocation.module.css';

interface LocationProps {
  location: LocationsResponse[];
}

export default function SearchLocation({ location }:LocationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locationIdFromUrl = searchParams.get('locationId') || '';
  const [value, setValue] = useState(locationIdFromUrl);
  const cities = location;

  useEffect(() => {
    setValue(locationIdFromUrl);
  }, [locationIdFromUrl]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    const trimmedValue = value.trim();

    if (trimmedValue) {
      params.set('locationId', trimmedValue);
    } else {
      params.delete('locationId');
    }

    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('locationId');
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
        placeholder="Location"
      />
      <button type="submit" className={css.iconButtonSearch} aria-label="Location">
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
