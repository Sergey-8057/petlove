export interface User {
  name: string;
  email: string;
}

export interface AuthResponse extends User {
  token: string;
}
