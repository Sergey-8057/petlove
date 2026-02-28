// import { cookies } from 'next/headers';
import { nextServer } from './api';
import { NewsResponse } from '@/types/news';

export const serverFetchNews = async (
  keyword: string,
  page: number,
  limit: number
) => {
  // const trimmedSearch = keyword.trim();
  // if (trimmedSearch) {
  //   params.search = trimmedSearch;
  // }

  const res = await nextServer.get<NewsResponse>('/news', {
    params: { keyword, page, limit },
    // headers: { cookie: await cookieHeader() },
  });
  console.log(res);

  return res.data;
};

// async function cookieHeader(): Promise<string> {
//   const cookieStore = await cookies();
//   return cookieStore
//     .getAll()
//     .map(cookie => `${cookie.name}=${cookie.value}`)
//     .join('; ');
// }

// export const checkServerSession = async () => {
//   const res = await nextServer.get('/auth/session', {
//     headers: { cookie: await cookieHeader() },
//   });
//   return res;
// };

// export const getServerMe = async (): Promise<User | null> => {
//   try {
//     const { data } = await nextServer.get<User>('/users/me', {
//       headers: { cookie: await cookieHeader() },
//     });
//     return data;
//   } catch {
//     return null;
//   }
// };

// export interface NotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// export const serverFetchNotes = async (
//   search: string,
//   page: number,
//   perPage: number,
//   tag: string
// ) => {
//   const params: Record<string, string | number> = {
//     page,
//     perPage,
//   };
//   const trimmedSearch = search.trim();
//   if (trimmedSearch) {
//     params.search = trimmedSearch;
//   }
//   if (tag !== 'All') {
//     params.tag = tag;
//   }

//   const res = await nextServer.get<NotesResponse>('/notes', {
//     params,
//     headers: { cookie: await cookieHeader() },
//   });
//   return res.data;
// };

// export const serverFetchNoteById = async (noteId: string) => {
//   const res = await nextServer.get<Note>(`/notes/${noteId}`, {
//     headers: { cookie: await cookieHeader() },
//   });
//   return res.data;
// };
