export interface TodoBody {
  name: string;
  slug: string;
  description?: string;
  completed?: boolean;
  priority?: "low" | "medium" | "high";
  timeRelease: number;
  dueDate?: Date;
}

export interface UserBody {
  username: string;
  email: string;
  password: string;
}
