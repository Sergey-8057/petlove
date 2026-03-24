export interface User {
  name: string;
  email: string;
}

export interface AuthResponse extends User {
  token: string;
}

export interface UserInfo {
  _id: string;
  email: string;
  name: string;
  token: string;
  noticesFavorites: Favorites[];
}

interface Favorites {
  _id: string;
  species: string;
  category: string;
  price?: number;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  createdAt: string;
  user: string;
  popularity: number;
  updatedAt?: string;
}
