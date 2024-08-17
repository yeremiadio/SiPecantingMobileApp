export interface IUser {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserWithDetail extends IUser {
  UserDetail: IUserDetail;
}
export interface IAuthUser extends Omit<IUser, 'password'> {
  token: string;
}
/***
 * "id": 1,
    "createdAt": "2024-08-16T08:07:58.352Z",
    "updatedAt": "2024-08-16T08:07:58.352Z",
    "fullName": "Si Pecanting",
    "shortName": "admin",
    "phoneNumber": "123456789",
    "age": 20,
    "userId": 1,
    "profileImage": null
 */

export interface IUserDetail {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser;
  fullName: string | null;
  phoneNumber: string | null;
  age: number | null;
  userId: number;
  shortName: string | null;
  profileImage: string | null;
}
