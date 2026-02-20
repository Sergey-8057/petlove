'use client';

// import { useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import css from './Header.module.css';

const Header = () => {
  const pathname = usePathname();

  return (
    <section className={css.container}>
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
        <nav className={css.navigation}>
          <ul className={css.listNavigation}>
            <li>
              <Link
                href="/news"
                className={clsx(css.navLink, {
                  [css.isActive]: pathname === '/news',
                })}
              >
                News
              </Link>
            </li>
            <li>
              <Link
                href="/notices"
                className={clsx(css.navLink, {
                  [css.isActive]: pathname === '/notices',
                })}
              >
                Find pet
              </Link>
            </li>
            <li>
              <Link
                href="/friends"
                className={clsx(css.navLink, {
                  [css.isActive]: pathname === '/friends',
                })}
              >
                Our friends
              </Link>
            </li>

            {/* Auth */}
          </ul>
          <div className={css.listAuth}>
            <Link href="/login" className={css.linkLogin}>
              Log In
            </Link>
            <Link href="/registr" className={css.linkRegistr}>
              Registration
            </Link>
          </div>
        </nav>
      </header>
    </section>
  );
};

export default Header;
