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
import { type RegisterInputs } from "~/pages/register";

export type AuthContextType = {
  user: UserType | null;
  isAuthenticating: boolean;
  isFetchingUser: boolean;
  isRegistering: boolean;
  loginError: AxiosError | null | Error;
  registerError: string | null;
  handleLogin: (data: LoginInputs) => void;
  handleLogout: () => void;
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
  racId: string;
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
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      redirectTo("/shop");
      return {
        _id: "657143f8c2c0961185969950",
        firstName: "john",
        lastName: "doe",
        email: "asd@asd.asd",
        isAdmin: false,
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTcxNDNmOGMyYzA5NjExODU5Njk5NTAiLCJpYXQiOjE3MDIxODIzMzQsImV4cCI6MTcwNDc3NDMzNH0.yop_GH8syVzNN3osJrXcL65gdM-ai4tjtH1g3a01QRY",
        countryCode: "375",
        racId: "RAC362009",
      };
      // if (loginInputs) {
      //   console.log("logging in...");
      //   return await useLoginUser(loginInputs).then(async (userData) => {
      //     console.log("user logged in");
      //     setLoginInputs(null);
      //     setIsRegistering(false);
      //     handleJWTCookie(userData.jwt);
      //     console.log("redirecting to shop...");
      //     redirectTo("/shop");
      //     return userData;
      //   });
      // } else if (cookies.jwt) {
      //   console.log("token found, fetching user info...");
      //   return await useFetchUser().then(async (userData) => {
      //     console.log("user found");
      //     console.log("redirecting to shop...");
      //     redirectTo("/shop");
      //     return userData;
      //   });
      // }

      // console.log("user logged out, redirecting to login page...");
      // redirectTo("/login");
      // return null;
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

  const handleRegister = async (inputs: RegisterInputs) => {
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
