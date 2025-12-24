import axios from "axios";

export async function getCurrentUser() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/user`,

    { withCredentials: true }
  );
  return res.data.user;
}
