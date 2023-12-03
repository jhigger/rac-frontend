import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type AuthContextType = { user: UserType | null; handleUser: () => void };

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
  const [user, setUser] = useState<UserType | null>(null);

  const handleUser = () => {
    const userData = {
      _id: "656bcb107c2bc6d6453efc71",
      country: "Country A",
      countryCode: "+1",
      email: "john@example.com",
      isAdmin: false,
      firstName: "john",
      lastName: "Doe",
    };

    setUser(userData);
  };

  useEffect(() => {
    return;
  }, []);

  const value: AuthContextType = { user, handleUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
