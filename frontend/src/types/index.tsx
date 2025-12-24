export interface SigninData {
  identifier: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
}
export interface user {
  username: string;
  email: string;
  password: string;
}
export type AuthContextType = {
  user: any;
  loading:boolean;
};
