import axios from "axios";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type LoginInputs } from "~/components/Forms/Login/LoginForm";
import { type RegisterInputs } from "~/pages/register";
import { useCookies } from "react-cookie";

export type AuthContextType = {
  user: UserType | null;
  handleLogin: (data: LoginInputs) => void;
  handleLogout: () => void;
  handleRegister: (data: RegisterInputs) => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const useAuthContext = () => useContext(AuthContext);

// const ACCESS_LEVEL = ["user", "admin"] as const;

// type AccessLevelType = (typeof ACCESS_LEVEL)[number];

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  jwt: string;
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // todo: add react query

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (data: LoginInputs) => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    const reqOptions = {
      url: "https://rac-backend.onrender.com/api/users/auth",
      method: "POST",
      headers: headersList,
      data,
      withCredentials: true,
    };

    setLoading(true);

    axios
      .request(reqOptions)
      .then((response) => {
        const userData = response.data as UserType;
        setUser(userData);

        const jwtCookie = userData.jwt;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7); // Set expiration to 7 days from now
        setCookie("jwt", jwtCookie, { expires: expirationDate });
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    setUser(null);
    removeCookie("jwt");
  };

  const handleRegister = (data: RegisterInputs) => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };
    const reqOptions = {
      url: "https://rac-backend.onrender.com/api/users/",
      method: "POST",
      headers: headersList,
      data,
    };

    setLoading(true);

    axios
      .request(reqOptions)
      .then((response) => {
        const userData = response.data as UserType;
        console.log(userData);
        setUser(userData);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  const redirectTo = (path: string) => {
    void router.replace(path).catch((e) => console.log(e));
  };

  useEffect(() => {
    if (!(user ?? loading)) redirectTo("/login");
    else redirectTo("/shop");
  }, [user]);

  useEffect(() => {
    // Check if JWT cookie exists
    const headersList = {
      Accept: "*/*",
    };

    const reqOptions = {
      url: "https://rac-backend.onrender.com/api/users/profile",
      method: "GET",
      headers: headersList,
      withCredentials: true,
    };

    axios
      .request(reqOptions)
      .then((response) => {
        console.log(response.data);
        setUser(response.data as UserType);
      })
      .catch((e) => console.error(e));
  }, [cookies.jwt, setCookie]);

  const value: AuthContextType = {
    user,
    handleLogin,
    handleLogout,
    handleRegister,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
