export interface News {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
}

export interface NewsResponse {
  results: News[];
  page: number;
  perPage: number;
  totalPages: number;
}
