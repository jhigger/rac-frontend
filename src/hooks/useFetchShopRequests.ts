import axios from "axios";
import { type ShopRequestPackageType } from "~/contexts/ShopContext";

const useFetchShopRequests = async (userId: string) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const reqOptions = {
    url: "https://rac-backend.onrender.com/api/sfmRequests/mine",
    method: "GET",
    headers: headersList,
    params: { userRef: userId },
    withCredentials: true,
  };

  const response = await axios.request(reqOptions);
  return response.data as ShopRequestPackageType;
};

export default useFetchShopRequests;
