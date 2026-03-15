export interface Notices {
  _id: string;
  species: string;
  category: string;
  price: number;
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
  updatedAt: string;
}

export interface NoticesResponse {
  results: Notices[];
  page: number;
  perPage: number;
  totalPages: number;
}

export interface NoticesQueryParams {
  keyword?: string;
  category?: string;
  species?: string;
  locationId?: string;
  sex?: string;
  byPopularity?: boolean;
  byPrice?: boolean;
  page?: number;
  limit?: number;
}
