interface WorkDay {
  _id: string;
  isOpen: boolean;
  from?: string;
  to?: string;
}

export interface Friends {
  _id: string;
  title: string;
  url: string;
  addressUrl: string | null;
  address: string | null;
  imageUrl: string;
  workDays: WorkDay[] | null;
  phone: string | null;
  email: string | null;
}
