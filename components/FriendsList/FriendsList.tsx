import Image from 'next/image';
import Link from 'next/link';

import { Friends } from '@/types/friends';
import css from './FriendsList.module.css';

type Props = {
  friends: Friends[];
};

function getWorkingHours(workDays: Friends['workDays']) {
  if (!workDays || workDays.length === 0) return 'Day and night';

  const openDays = workDays.filter(day => day.isOpen && day.from && day.to);

  if (openDays.length === 0) return 'Closed';

  const times = openDays.map(day => ({
    from: day.from!,
    to: day.to!,
  }));

  const minFrom = times.reduce((min, curr) => (curr.from < min ? curr.from : min), times[0].from);

  const maxTo = times.reduce((max, curr) => (curr.to > max ? curr.to : max), times[0].to);

  return `${minFrom} - ${maxTo}`;
}

function renderEmail(email: string | null) {
  if (!email)
    return (
      <p className={css.nameContact}>
        Email: <span className={css.notContact}>no mail</span>
      </p>
    );

  return (
    <p className={css.nameContact}>
      <span>Email:</span>
      <Link className={css.linkContact} href={`mailto:${email}`}>
        {email}
      </Link>
    </p>
  );
}

function formatAddress(address: string | null) {
  if (!address) return null;

  return address.replace(/\s*\(.*?\)/g, '').trim();
}

function renderAddressOrWebsite(
  address: string | null,
  addressUrl: string | null,
  websiteUrl: string
) {
  const formattedAddress = formatAddress(address);

  if (formattedAddress && addressUrl) {
    const splitAddress = formattedAddress.split(', ');

    const newAddress =
      splitAddress.length > 1 ? `${splitAddress[1]}, ${splitAddress[0]}` : splitAddress[0];

    return (
      <p className={css.nameContact}>
        <span>Address:</span>
        <Link
          className={css.linkContact}
          href={addressUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {newAddress}
        </Link>
      </p>
    );
  }

  return (
    <p className={css.nameContact}>
      <span>Address:</span>
      <Link className={css.linkContact} href={websiteUrl} target="_blank" rel="noopener noreferrer">
        website only
      </Link>
    </p>
  );
}

function renderPhone(phone: string | null, email: string | null) {
  if (phone) {
    return (
      <p className={css.nameContact}>
        <span>Phone:</span>
        <Link className={css.linkContact} href={`tel:${phone}`}>
          {phone}
        </Link>
      </p>
    );
  }

  if (email)
    return (
      <p className={css.nameContact}>
        Phone: <span className={css.notContact}>email only</span>
      </p>
    );

  return (
    <p className={css.nameContact}>
      Phone: <span className={css.notContact}>no phone</span>
    </p>
  );
}

export default function FriendsList({ friends }: Props) {
  return (
    <ul className={css.listFriends}>
      {friends.map(item => (
        <li key={item._id} className={css.itemFriends}>
          <div className={css.imageWrapper}>
            <Image
              className={css.image}
              src={item.imageUrl}
              alt={item.title}
              width={90}
              height={90}
            />
          </div>
          <div className={css.contInfo}>
            <p className={css.workDay}>{getWorkingHours(item.workDays)}</p>
            <h2 className={css.nameFriends}>{item.title}</h2>
            <div className={css.contContacts}>
              {renderEmail(item.email)}

              {renderAddressOrWebsite(item.address, item.addressUrl, item.url)}

              {renderPhone(item.phone, item.email)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
