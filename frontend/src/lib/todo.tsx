import { Todo } from "@/types/todo";
import axios from "axios";

export const getAllTodo = async (): Promise<Todo[]> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}todo`,
    {
      withCredentials: true,
    }
  );

  return response.data;
};
