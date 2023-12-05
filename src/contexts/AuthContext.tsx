import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type AuthContextType = {
  user: UserType | null;
  handleUser: (userData: UserType) => void;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const useAuthContext = () => useContext(AuthContext);

// const ACCESS_LEVEL = ["user", "admin"] as const;

// type AccessLevelType = (typeof ACCESS_LEVEL)[number];

export type UserType = {
  _id: string;
  country: string;
  countryCode: string;
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);

  const handleUser = (userData: UserType) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  useEffect(() => {
    const redirectTo = (path: string) => {
      router.replace(path).catch((e) => console.log(e));
    };

    if (user) {
      redirectTo("/shop");
    } else if (router.asPath === "/register") {
      return;
    } else {
      redirectTo("/login");
    }
  }, [user, router.asPath]);

  const value: AuthContextType = { user, handleUser, handleLogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
