export type UserDTO = {
  id?: string;
  // username: string;
  email: string;
  password: string;
  firstName: string;
  surname?: string;
  role?: string[];
  token?: string;
};
