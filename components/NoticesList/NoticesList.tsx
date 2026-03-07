import Image from 'next/image';
import Link from 'next/link';

import { Notices } from '@/types/notices';
import css from './NoticesList.module.css';

type Props = {
  notices: Notices[];
};

export default function NoticesList({ notices }: Props) {
  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className={css.containerNoticesList}>
      <ul className={css.listNotices}>
        {notices.map(item => (
          <li key={item._id} className={css.noticesItem}>
            <div className={css.imageWrapper}>
              <Image
                src={item.imgURL}
                alt={item.title}
                width={315}
                height={178}
                className={css.image}
              />
            </div>
            <div className={css.contTitlePopular}>
              <h2 className={css.title}>{item.title}</h2>
              <div className={css.rating}>
                <svg className={css.iconStar} width="16" height="16" aria-hidden="true">
                  <use href="/symbol-defs.svg#icon-star" />
                </svg>
                <p className={css.popularity}>{item.popularity}</p>
              </div>
            </div>
            <div className={css.contInfo}>
              <div className={css.contInfoItem}>
                <p className={css.contInfoName}>Name</p>
                <p className={css.contInfoValue}>{item.name}</p>
              </div>
              <div className={css.contInfoItem}>
                <p className={css.contInfoName}>Birthday</p>
                <p className={css.contInfoValue}>{formatDate(item.birthday)}</p>
              </div>
              <div className={css.contInfoItem}>
                <p className={css.contInfoName}>Sex</p>
                <p className={css.contInfoValue}>{item.sex}</p>
              </div>
              <div className={css.contInfoItem}>
                <p className={css.contInfoName}>Species</p>
                <p className={css.contInfoValue}>{item.species}</p>
              </div>
              <div className={css.contInfoItem}>
                <p className={css.contInfoName}>Category</p>
                <p className={css.contInfoValue}>{item.category}</p>
              </div>
            </div>
            <p className={css.comment}>{item.comment}</p>
            <p className={css.prise}>${item.price}</p>
            <div className={css.contBtns}>
              <Link className={css.linkLearnMore} href={`/notices/${item._id}`}>
                Learn more
              </Link>
              <button
                type="button"
                // onClick={() => handleFavoriteClick(teacher.id)}
                className={css.heartButton}
              >
                <svg className={css.iconHeart} width="18" height="18" aria-hidden="true">
                  <use
                    href={
                      '/symbol-defs.svg#icon-like'
                      // user?.favorites.includes(teacher.id)
                      //   ? '/symbol-defs.svg#icon-heart-active'
                      //   : '/symbol-defs.svg#icon-heart'
                    }
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
