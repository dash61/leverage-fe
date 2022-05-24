export interface IUser {
  userName: string;
  userEmail: string;
  password: string;
  // loggedIn: boolean;
  id?: number;
}

export interface IContact {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  id?: number;
}

export interface IAccessToken {
  access_token: string;
  user: IUser;
}
