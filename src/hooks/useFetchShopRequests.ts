import axios from "axios";
import { type ShopRequestPackageType } from "~/contexts/ShopContext";

const useFetchShopRequests = async (token: string) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const reqOptions = {
    url: "https://rac-backend.onrender.com/api/sfmRequests/mine",
    method: "GET",
    headers: headersList,
  };

  const response = await axios.request(reqOptions);
  return response.data as ShopRequestPackageType;
};

export default useFetchShopRequests;
