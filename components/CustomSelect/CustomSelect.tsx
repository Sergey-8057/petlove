'use client';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import css from './CustomSelect.module.css';

interface CustomSelectProps {
  options: string[];
  placeholder: string;
  onChange?: (value: string) => void;
}

export default function CustomSelect({ options, placeholder, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const ref = useRef<HTMLDivElement>(null);

  const toggleSelect = () => {
    setIsOpen(prev => !prev);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onChange?.(value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={css.select} ref={ref}>
      <button type="button" className={css.selectButton} onClick={toggleSelect}>
        {selected || placeholder}

        <svg
          className={clsx(css.iconChevronDown, { [css.iconOpen]: isOpen })}
          width="18"
          height="18"
        >
          <use href="/symbol-defs.svg#icon-chevron-down" />
        </svg>
      </button>

      <ul className={clsx(css.dropdown, { [css.dropdownOpen]: isOpen })}>
        <li className={css.option} onClick={() => handleSelect('')}>
          Show all
        </li>

        {options.map(option => (
          <li key={option} className={css.option} onClick={() => handleSelect(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
