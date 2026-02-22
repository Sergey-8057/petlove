import { nextServer } from './api';

export type RegisterRequest = {
  email: string;
  password: string;
};

// export const register = async (data: RegisterRequest) => {
//   const res = await nextServer.post<User>('/auth/register', data);
//   return res.data;
// };

// export type LoginRequest = {
//   email: string;
//   password: string;
// };

// export const login = async (data: LoginRequest) => {
//   const res = await nextServer.post<User>('/auth/login', data);
//   return res.data;
// };

// type CheckSessionRequest = {
//   success: boolean;
// };

// export const checkSession = async () => {
//   const res = await nextServer.get<CheckSessionRequest>('/auth/session');
//   return res.data.success;
// };

// export const getMe = async () => {
//   const { data } = await nextServer.get<User>('/users/me');
//   return data;
// };

// export const logout = async (): Promise<void> => {
//   await nextServer.post('/auth/logout');
// };

// export type UpdateUserRequest = {
//   username: string;
// };

// export const updateMe = async (payload: UpdateUserRequest) => {
//   const res = await nextServer.patch<User>('/users/me', payload);
//   return res.data;
// };

// export interface NotesResponse {
//   notes: Note[];
//   totalPages: number;
// }

// export const clientFetchNotes = async (
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

//   const res = await nextServer.get<NotesResponse>('/notes', { params });
//   return res.data;
// };

// export const clientFetchNoteById = async (noteId: string) => {
//   const res = await nextServer.get<Note>(`/notes/${noteId}`);
//   return res.data;
// };

// export const clientCreateNote = async (noteData: NewNoteData) => {
//   const res = await nextServer.post<Note>('/notes', noteData);
//   return res.data;
// };

// export const clientDeleteNote = async (noteId: string) => {
//   const res = await nextServer.delete<Note>(`/notes/${noteId}`);
//   return res.data;
// };
