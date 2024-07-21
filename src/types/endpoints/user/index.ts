export interface IUser {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthUser extends Omit<IUser, 'password'> {
  token: string;
}

export interface IUserDetail {
  id: number;
  fullName: string | null;
  phoneNumber: string | null;
  age: number | null;
  userId: number;
}
