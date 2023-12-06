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

export type AuthContextType = {
  user: UserType | null;
  handleUser: (data: LoginInputs) => void;
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
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  // todo: add react query

  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUser = (data: LoginInputs) => {
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
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleRegister = (data: RegisterInputs) => {
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
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  };

  const redirectTo = (path: string) => {
    void router.replace(path).catch((e) => console.log(e));
  };

  useEffect(() => {
    if (!(user ?? loading)) redirectTo("/login");
    else redirectTo("/import"); // todo: for testing
  }, [user]);

  const value: AuthContextType = {
    user,
    handleUser,
    handleLogout,
    handleRegister,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
