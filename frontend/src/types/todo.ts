export type Todo = {
  _id?: string;
  name: string;
  slug?: string;
  description: string;
  completed?: boolean;
  priority: string;
  timeRelease: number | "";
};
