export interface SigninData {
  identifier: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
}
export interface User {
  username: string;
  email: string;
  password: string;
  image: string;
}

export type UpdateTodoCompleted = {
  completed: boolean;
};
