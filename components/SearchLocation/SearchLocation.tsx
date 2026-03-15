'use client';

import Select, { components, OptionProps, SingleValue } from 'react-select';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';

import { LocationsResponse } from '@/types/locations';
import css from './SearchLocation.module.css';

interface LocationProps {
  location: LocationsResponse[];
  onChange?: (id?: string) => void;
}

interface OptionType {
  value: string;
  label: string;
}

const HighlightOption = (props: OptionProps<OptionType>) => {
  const { data, selectProps } = props;

  const inputValue = selectProps.inputValue.toLowerCase();
  const label = data.label;

  const index = label.toLowerCase().indexOf(inputValue);

  if (index === -1) {
    return <components.Option {...props}>{label}</components.Option>;
  }

  const before = label.slice(0, index);
  const match = label.slice(index, index + inputValue.length);
  const after = label.slice(index + inputValue.length);

  return (
    <components.Option {...props}>
      <span className={css.match}>{before + match}</span>
      <span className={css.rest}>{after}</span>
    </components.Option>
  );
};

export default function SearchLocation({ location, onChange }: LocationProps) {
  const searchParams = useSearchParams();
  const locationId = searchParams.get('locationId');

  const [inputValue, setInputValue] = useState('');

  const options: OptionType[] = useMemo(() => {
    return location.map(loc => ({
      value: loc._id,
      label: `${loc.stateEn}, ${loc.cityEn}`,
    }));
  }, [location]);

  const selected = useMemo(() => {
    return options.find(o => o.value === locationId) || null;
  }, [options, locationId]);

  const handleChange = (option: SingleValue<OptionType>) => {
    onChange?.(option?.value);
  };

  const handleClear = () => {
    onChange?.(undefined);
    setInputValue('');
  };

  return (
    <div className={css.searchContainer}>
      <Select<OptionType, false>
        instanceId="location-select"
        className={css.select}
        classNamePrefix="location"
        options={options}
        value={selected}
        onChange={handleChange}
        placeholder="Location"
        inputValue={inputValue}
        onInputChange={value => setInputValue(value)}
        menuIsOpen={inputValue.length > 0}
        noOptionsMessage={() => 'No locations'}
        components={{
          Option: HighlightOption,
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          ClearIndicator: () => null,
        }}
      />

      <button
        type="button"
        className={clsx(css.iconButtonSearch, {
          [css.iconButtonSearchActiv]: selected,
        })}
        aria-label="Search"
      >
        <svg className={css.iconSearch} width="18" height="18">
          <use href="/symbol-defs.svg#icon-search" />
        </svg>
      </button>

      {(inputValue || selected) && (
        <button
          type="button"
          className={css.iconButtonClear}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg className={css.iconCross} width="18" height="18">
            <use href="/symbol-defs.svg#icon-cross" />
          </svg>
        </button>
      )}
    </div>
  );
}
