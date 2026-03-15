'use client';

import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import css from './SortButton.module.css';

export interface SortValues {
  byPopularity?: boolean;
  byPrice?: boolean;
}

interface SortButtonProps {
  onChange?: (value: SortValues) => void;
}

const parseBool = (value: string | null): boolean | undefined => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
};

const SORT_CONFIG = [
  { label: 'Popular', key: 'byPopularity', value: true },
  { label: 'Unpopular', key: 'byPopularity', value: false },
  { label: 'Cheap', key: 'byPrice', value: true },
  { label: 'Expensive', key: 'byPrice', value: false },
] as const;

export default function SortButton({ onChange }: SortButtonProps) {
  const searchParams = useSearchParams();

  const sort: SortValues = {
    byPopularity: parseBool(searchParams.get('byPopularity')),
    byPrice: parseBool(searchParams.get('byPrice')),
  };

  const handleToggle = (key: keyof SortValues, value: boolean) => {
    const newSort: SortValues = { ...sort };

    if (newSort[key] === value) {
      delete newSort[key];
    } else {
      newSort[key] = value;
    }

    onChange?.(newSort);
  };

  const clearSort = (key: keyof SortValues) => {
    const newSort: SortValues = { ...sort };
    delete newSort[key];
    onChange?.(newSort);
  };

  return (
    <div className={css.container}>
      {SORT_CONFIG.map(({ label, key, value }) => {
        const isActive = sort[key] === value;

        return (
          <button
            key={label}
            type="button"
            className={clsx(css.button, { [css.active]: isActive })}
            onClick={() => handleToggle(key, value)}
          >
            {label}

            {isActive && (
              <span
                className={css.clear}
                onClick={e => {
                  e.stopPropagation();
                  clearSort(key);
                }}
              >
                <svg className={css.iconCross} width="18" height="18">
                  <use href="/symbol-defs.svg#icon-cross" />
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
