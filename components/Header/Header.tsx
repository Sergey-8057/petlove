'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import css from './Header.module.css';

const Header = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
          </ul>

          {/* Auth */}
          <div className={css.listAuth}>
            <Link href="/login" className={css.linkLogin}>
              Log In
            </Link>
            <Link href="/registr" className={css.linkRegistr}>
              Registration
            </Link>
          </div>
        </nav>

        <button
          type="button"
          onClick={toggleMenu}
          className={css.menuButton}
          aria-label="Open menu"
        >
          <svg className={css.iconMenu} width="32" height="32">
            <use href="/symbol-defs.svg#icon-menu" />
          </svg>
        </button>
      </header>

      {/* Overlay */}
      <div
        className={clsx(css.overlay, {
          [css.overlayOpen]: isOpen,
        })}
        onClick={closeMenu}
      />

      {/* === Mobile/Tablet menu === */}
      <div
        className={clsx(css.mobileMenu, {
          [css.mobileMenuOpen]: isOpen,
        })}
      >
        <button type="button" onClick={toggleMenu} className={css.closeButton}>
          <svg className={css.iconClose} width="32" height="32">
            <use href="/symbol-defs.svg#icon-close" />
          </svg>
        </button>

        <div className={css.mobileList}>
          <ul className={css.mobileNav}>
            <li className={css.mobileNavItem}>
              <Link href="/news" onClick={toggleMenu}>
                News
              </Link>
            </li>
            <li className={css.mobileNavItem}>
              <Link href="/notices" onClick={toggleMenu}>
                Find pet
              </Link>
            </li>
            <li className={css.mobileNavItem}>
              <Link href="/friends" onClick={toggleMenu}>
                Our friends
              </Link>
            </li>
          </ul>
          <ul className={css.mobileAuth}>
            <li className={css.mobileAuthLogin}>
              <Link href="/login" onClick={toggleMenu}>
                Log In
              </Link>
            </li>
            <li className={css.mobileAuthRegistr}>
              <Link href="/registr" onClick={toggleMenu}>
                Registration
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Header;
