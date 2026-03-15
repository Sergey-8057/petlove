'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import SearchField from '../SearchField/SearchField';
import CustomSelect from '../CustomSelect/CustomSelect';
import SearchLocation from '../SearchLocation/SearchLocation';
import SortButton, { SortValues } from '../SortButton/SortButton';

import { LocationsResponse } from '@/types/locations';
import css from './NoticesFilters.module.css';

interface NoticesFiltersProps {
  category: string[];
  gender: string[];
  type: string[];
  location: LocationsResponse[];
}

export default function NoticesFilters({ category, gender, type, location }: NoticesFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (key: string, value?: string | boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === undefined || value === '') {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }

    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  const handleCategoryChange = (value: string) => {
    updateParams('category', value);
  };

  const handleGenderChange = (value: string) => {
    updateParams('sex', value);
  };

  const handleTypeChange = (value: string) => {
    updateParams('species', value);
  };

  const handleLocationChange = (id?: string) => {
    updateParams('locationId', id);
  };

  const handleSortChange = (value: SortValues) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete('byPopularity');
    params.delete('byPrice');

    Object.entries(value).forEach(([key, val]) => {
      if (val !== undefined) {
        params.set(key, String(val));
      }
    });

    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    router.push('/notices?page=1');
  };

  return (
    <div className={css.containerSearchField}>
      <div className={css.searchFieldWrapper}>
        <SearchField />
      </div>

      <div className={css.categoryGenderWrapper}>
        <CustomSelect
          options={category}
          placeholder="Category"
          queryKey="category"
          onChange={handleCategoryChange}
        />

        <CustomSelect
          options={gender}
          placeholder="By gender"
          queryKey="sex"
          onChange={handleGenderChange}
        />
      </div>

      <div className={css.typeWrapper}>
        <CustomSelect
          options={type}
          placeholder="By type"
          queryKey="species"
          onChange={handleTypeChange}
        />
      </div>

      <div className={css.searchLocationWrapper}>
        <SearchLocation location={location} onChange={handleLocationChange} />
      </div>

      <div className={css.contSortButtonBtnReset}>
        <div className={css.sortButtonWrapper}>
          <SortButton onChange={handleSortChange} />
        </div>

        <button type="button" className={css.btnReset} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
