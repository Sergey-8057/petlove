'use client';

import SearchField from '../SearchField/SearchField';
import CustomSelect from '../CustomSelect/CustomSelect';
import SearchLocation from '../SearchLocation/SearchLocation';
import { LocationsResponse } from '@/types/locations';
import css from './NoticesFilters.module.css';

interface NoticesFiltersProps {
  category: string[];
  gender: string[];
  type: string[];
  location: LocationsResponse[];
  // onFilterChange: (filters: CarFilterParams) => void;
}

export default function NoticesFilters({ category, gender, type, location }: NoticesFiltersProps) {
  const handleCategoryChange = (value: string) => {
    console.log('category:', value);
  };

  const handleGenderChange = (value: string) => {
    console.log('gender:', value);
  };
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className={css.containerSearchField} onSubmit={handleSubmit}>
      <div className={css.searchFieldWrapper}>
        <SearchField />
      </div>
      <div className={css.categoryGenderWrapper}>
        <CustomSelect options={category} placeholder="Category" onChange={handleCategoryChange} />
        <CustomSelect options={gender} placeholder="By gender" onChange={handleGenderChange} />
      </div>
      <div className={css.typeWrapper}>
        <CustomSelect options={type} placeholder="By type" onChange={handleCategoryChange} />
      </div>
      <div className={css.searchLocationWrapper}>
        <SearchLocation location={location} />
      </div>
    </form>
  );
}
