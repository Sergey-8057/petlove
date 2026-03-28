'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import css from './ModalApproveAction.module.css';

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function ModalApproveAction({ onClose, onConfirm }: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdrop}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.iconClose} width="32" height="32">
            <use href="/symbol-defs.svg#icon-close" />
          </svg>
        </button>
        <div className={css.imageWrapper}>
          <Image
            src='/logout/image-logout.png'
            alt='image loguot'
            width='80'
            height='80'
            className={css.imageLogout}
          />
        </div>
        <p className={css.text}>Already leaving?</p>
        <div className={css.actions}>
          <button className={css.confirm} onClick={onConfirm}>
            Yes
          </button>
          <button className={css.cancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
