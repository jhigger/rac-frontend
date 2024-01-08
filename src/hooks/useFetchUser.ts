import axios from "axios";
import { type UserType } from "~/contexts/AuthContext";

const useFetchUser = async (token: string) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const reqOptions = {
    url: "https://rac-backend.onrender.com/api/users/profile",
    method: "GET",
    headers: headersList,
  };

  const response = await axios.request(reqOptions);
  const data = response.data as Main;
  const userData: UserType = {
    _id: data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    isAdmin: data.isAdmin,
    jwt: token,
    racId: data.racId,
  };

  return userData;
};

export interface Main {
  isAdmin: boolean;
  _id: string;
  racId: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  countryCode: string;
  isEmailVerified: boolean;
  contactAddress: ContactAddress[];
}

export interface ContactAddress {
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  countryCode: string;
  phoneNumber: number;
  postalCode: string;
  _id: string;
}

export default useFetchUser;
