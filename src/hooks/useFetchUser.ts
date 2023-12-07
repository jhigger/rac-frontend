import axios from "axios";
import { type UserType } from "~/contexts/AuthContext";

const useFetchUser = async () => {
  const headersList = {
    Accept: "*/*",
  };

  const reqOptions = {
    url: "https://rac-backend.onrender.com/api/users/profile",
    method: "GET",
    headers: headersList,
    withCredentials: true,
  };

  const response = await axios.request(reqOptions);
  return response.data as UserType;
};

export default useFetchUser;
