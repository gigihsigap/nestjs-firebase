export interface IUserData {
  uid: string;
  email: string;
  // token: string;
  username: string;
}

export interface IUserRO {
  user: IUserData;
}
