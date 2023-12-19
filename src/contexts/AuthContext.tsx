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
import useFetchUser from "~/hooks/useFetchUser";
import useLoginUser from "~/hooks/useLoginUser";
import useRegisterUser from "~/hooks/useRegisterUser";

export type AuthContextType = {
  user: UserType | null;
  isAuthenticating: boolean;
  isFetchingUser: boolean;
  isRegistering: boolean;
  loginError: AxiosError | null;
  registerError: string | null;
  handleLogin: (data: LoginInputs) => void;
  handleLogout: () => void;
  handleRegister: (data: RegisterType) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const useAuthContext = () => useContext(AuthContext);

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  jwt: string;
  racId: string;
};

export type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactAddress: {
    country: string;
    state: string;
    city: string;
    streetAddress: string;
    countryCode: string;
    phoneNumber: string;
    postalCode: string;
  }[];
};

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [loginInputs, setLoginInputs] = useState<LoginInputs | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const {
    data: user,
    isLoading: isAuthenticating,
    isFetching: isFetchingUser,
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
          setIsRegistering(false);
          handleJWTCookie(userData.jwt);
          console.log("redirecting to shop...");
          redirectTo("/shop");
          return userData;
        });
      } else if (cookies.jwt) {
        console.log("token found, fetching user info...");
        const token = cookies.jwt as string;
        return await useFetchUser(token).then(async (userData) => {
          console.log("user found");
          console.log(`redirecting to ${router.asPath}...`);
          redirectTo(router.asPath);
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
    expirationDate.setDate(expirationDate.getDate() + 1); // Set expiration to 1 day from now
    setCookie("jwt", jwtCookie, { expires: expirationDate });
  };

  const handleLogin = (inputs: LoginInputs) => {
    setLoginInputs(inputs);
  };

  const handleLogout = () => {
    removeCookie("jwt");
  };

  const handleRegister = async (inputs: RegisterType) => {
    setRegisterError(null);
    setIsRegistering(true);
    console.log("registering...");
    await useRegisterUser(inputs)
      .then(() => {
        setLoginInputs(inputs);
      })
      .catch((e: AxiosError) => {
        const res = e.response as { data: { message: string } };
        setRegisterError(res.data.message);
        setIsRegistering(false);
        console.log("register failed");
      });
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
    isAuthenticating,
    isFetchingUser,
    isRegistering,
    loginError,
    registerError,
    handleLogin,
    handleLogout,
    handleRegister,
  };

  if (router.asPath !== "/login" && isRefetching) return <LoadingScreen />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
