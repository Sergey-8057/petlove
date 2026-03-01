import Image from 'next/image';
import Link from 'next/link';

import { Friends } from '@/types/friends';
import css from './FriendsList.module.css';
import { log } from 'console';

type Props = {
  friends: Friends[];
};

function getWorkingHours(workDays: Friends['workDays']) {
  if (!workDays || workDays.length === 0) return 'Day and night';

  const openDays = workDays.filter(day => day.isOpen && day.from && day.to);

  const times = openDays.map(day => ({
    from: day.from!,
    to: day.to!,
  }));

  const minFrom = times.reduce((min, curr) => (curr.from < min ? curr.from : min), times[0].from);

  const maxTo = times.reduce((max, curr) => (curr.to > max ? curr.to : max), times[0].to);

  return `${minFrom} - ${maxTo}`;
}

function renderEmail(email: string | null) {
  if (!email) return 'no mail';

  return (
    <Link className={css.linkEmail} href={`mailto:${email}`}>
      {email}
    </Link>
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

    let newAddress: string;

    if (splitAddress[1]) {
      newAddress = splitAddress[1] + ', ' + splitAddress[0];
    } else {
      newAddress = splitAddress[0];
    }

    return (
      <Link className={css.linkAddress} href={addressUrl} target="_blank" rel="noopener noreferrer">
        {newAddress}
      </Link>
    );
  }

  return (
    <Link className={css.linkText} href={websiteUrl} target="_blank" rel="noopener noreferrer">
      website only
    </Link>
  );
}

function renderPhone(phone: string | null, email: string | null) {
  if (phone) {
    return (
      <Link className={css.linkPhone} href={`tel:${phone}`}>
        {phone}
      </Link>
    );
  }

  if (email) return 'email only';

  return 'no phone';
}

export default function FriendsList({ friends }: Props) {
  return (
    <ul className={css.listFriends}>
      {friends.map(item => (
        <li key={item._id}>
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
            <p className={css.WorkDay}>{getWorkingHours(item.workDays)}</p>
            <h2>{item.title}</h2>

            {renderEmail(item.email)}

            {renderAddressOrWebsite(item.address, item.addressUrl, item.url)}

            {renderPhone(item.phone, item.email)}
          </div>
        </li>
      ))}
    </ul>
  );
}
