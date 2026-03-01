import { serverFetchFriends } from '@/lib/api/serverApi';
import Title from '@/components/Title/Title';
import FriendsList from '@/components/FriendsList/FriendsList';
import css from './page.module.css';

export default async function FriendsPage() {
  const titleForPageFriends = "Our friends";

  const data = await serverFetchFriends();

  return (
    <div className={css.container}>
      <Title title={titleForPageFriends} />
      <FriendsList friends={data} />
    </div>
  )
}