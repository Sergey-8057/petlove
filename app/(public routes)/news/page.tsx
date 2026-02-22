import { serverFetchNews } from '@/lib/api/serverApi';

export default async function NewsPage() {
  const data = await serverFetchNews(1, 6);

  return (
    <div>
      <h1>News</h1>
      {data.results.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
