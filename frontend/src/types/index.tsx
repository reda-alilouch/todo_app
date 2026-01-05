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

export interface todo {
  name: string;
  slug: string;
  description: string;
  completed: boolean;
  priority: string;
  timeRelease: number | "";
}
