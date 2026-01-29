import axios from "axios";
import { User } from "@/types";

export const fetchProfile = async (): Promise<User> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}profile`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
