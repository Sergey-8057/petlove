'use client';

// import { useState } from 'react';
import Link from 'next/link';
// import clsx from 'clsx';
// import { usePathname } from 'next/navigation';

import css from './Header.module.css';

const Header = () => {
  // const pathname = usePathname();

  return (
    <header className={css.header}>
      {/* Logo */}
      <Link className={css.logo} href="/" aria-label="Home">
        petl
        <svg className={css.iconHeart} width="23" height="23" aria-hidden="true">
          <use href="/symbol-defs.svg#icon-heart" />
        </svg>
        ve
      </Link>

      {/* Navigation */}
      <nav>
        <ul className={css.navigation}>
          <li>
            {/* <Link
              href="/"
              className={clsx(css.navLink, {
                [css.isActive]: pathname === '/',
              })}
            >
              Home
            </Link> */}
          </li>

          <li>
            {/* <Link
              href="/teachers"
              className={clsx(css.navLink, {
                [css.isActive]: pathname === '/teachers',
              })}
            >
              Teachers
            </Link> */}
          </li>

          {/* ✅ Favorites — only for authorized users */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
