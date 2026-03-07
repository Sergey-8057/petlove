'use client';

import SearchField from '../SearchField/SearchField';
import css from './NoticesFilters.module.css';

interface NoticesFiltersProps {
  category: string[];
  gender: string[];
  // onFilterChange: (filters: CarFilterParams) => void;
}

export default function NoticesFilters({ category, gender }: NoticesFiltersProps) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className={css.containerSearchField} onSubmit={handleSubmit}>
      <div className={css.searchFieldWrapper}>
        <SearchField />
      </div>
      <div className={css.contCategoryGender}>
        <select className={css.select}>
          <option value="">Category</option>
          {category.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select className={css.select}>
          <option value="">By gender</option>
          {gender.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
