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
  const { user } = response.data as Main;
  const userData: UserType = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
    jwt: token,
    racId: user.racId,
    billingDetails: {
      countryCode: user.contactAddress[0]?.countryCode ?? "",
      phoneNumber: String(user.contactAddress[0]?.phoneNumber ?? ""),
      address: user.contactAddress[0]?.streetAddress ?? "",
      country: user.contactAddress[0]?.country ?? "",
      state: user.contactAddress[0]?.state ?? "",
      city: user.contactAddress[0]?.city ?? "",
      zipPostalCode: user.contactAddress[0]?.postalCode ?? "",
    },
  };

  return userData;
};
export interface Main {
  user: User;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  isAdmin: boolean;
  isEmailVerified: boolean;
  countryCode: string;
  contactAddress: ContactAddress[];
  racId: string;
  __v: number;
  lastLogin: Date;
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
