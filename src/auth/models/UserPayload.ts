export interface UserPayload {
  sub: string;
  email: string;
  // username: string;
  fisrtName: string;
  surname?: string;
  role?: string[];
  iat?: number;
  exp?: number;
}
