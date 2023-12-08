import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useCookies } from "react-cookie";
import { type LoginInputs } from "~/components/Forms/Login/LoginForm";
import LoadingScreen from "~/components/LoadingScreen";
import useFetchShopRequests from "~/hooks/useFetchShopRequests";
import useFetchUser from "~/hooks/useFetchUser";
import useLoginUser from "~/hooks/useLoginUser";
import useRegisterUser from "~/hooks/useRegisterUser";
import { type RegisterInputs } from "~/pages/register";

export type AuthContextType = {
  user: UserType | null;
  loginError: AxiosError | null;
  handleLogin: (data: LoginInputs) => void;
  handleLogout: () => Promise<void>;
  handleRegister: (data: RegisterInputs) => Promise<void>;
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
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [loginInputs, setLoginInputs] = useState<LoginInputs | null>(null);

  const {
    data: user,
    isLoading,
    isFetching,
    isRefetching,
    error: loginError,
    refetch,
  } = useQuery<UserType | null, AxiosError>({
    queryKey: ["user"],
    queryFn: async () => {
      if (loginInputs) {
        console.log("logging in...");
        return await useLoginUser(loginInputs).then(async (userData) => {
          console.log("user logged in");
          setLoginInputs(null);
          handleJWTCookie(userData.jwt);
          redirectTo("/shop");
          console.log("getting user requests...");
          const requestItems = await useFetchShopRequests(userData._id);
          console.log("user requests:", requestItems);
          return userData;
        });
      } else if (cookies.jwt) {
        console.log("token found, fetching user info...");
        return await useFetchUser().then(async (userData) => {
          console.log("user found");
          console.log("getting user requests...");
          const requestItems = await useFetchShopRequests(userData._id);
          console.log("user requests:", requestItems);
          return userData;
        });
      }

      console.log("user logged out, redirecting to login page...");
      redirectTo("/login");
      return null;
    },
    initialData: null,
  });

  const handleJWTCookie = (jwtCookie: string) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set expiration to 7 days from now
    setCookie("jwt", jwtCookie, { expires: expirationDate });
  };

  const handleLogin = (inputs: LoginInputs) => {
    setLoginInputs(inputs);
  };

  const handleLogout = async () => {
    removeCookie("jwt");
  };

  const handleRegister = async (inputs: RegisterInputs) => {
    await useRegisterUser(inputs)
      .then(() => setLoginInputs(inputs))
      .catch((e) => console.error(e));
  };

  const redirectTo = (path: string) => {
    void router.replace(path).catch((e) => console.log(e));
  };

  useEffect(() => {
    if (loginInputs) void refetch(); // fetch user after clicking login
  }, [loginInputs]);

  useEffect(() => {
    if (!cookies.jwt) void refetch(); // set user to null if there is no cookie
  }, [cookies.jwt]);

  const value: AuthContextType = {
    user,
    loginError,
    handleLogin,
    handleLogout,
    handleRegister,
  };

  if (isLoading || isFetching || isRefetching) return <LoadingScreen />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
