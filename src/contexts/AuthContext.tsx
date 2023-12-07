import { useQuery } from "@tanstack/react-query";
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
import { navItems } from "./NavigationContext";
import useFetchShopRequests from "~/hooks/useFetchShopRequests";

export type AuthContextType = {
  user: UserType | null;
  error: globalThis.Error | null;
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
    error,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return {
        isAdmin: false,
        _id: "657143f8c2c0961185969950",
        firstName: "john",
        lastName: "doe",
        email: "asd@asd.asd",
        country: "AF",
        countryCode: "375",
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTcxNDNmOGMyYzA5NjExODU5Njk5NTAiLCJpYXQiOjE3MDE5MjE3ODUsImV4cCI6MTcwNDUxMzc4NX0.u8d6atI5n0Jf1florP3xzsmynsCAyhvZHkvZp6l5xks",
      };
      // if (loginInputs) {
      //   console.log("logging in...");
      //   return await useLoginUser(loginInputs).then(async (userData) => {
      //     console.log("user logged in");
      //     setLoginInputs(null);
      //     handleJWTCookie(userData.jwt);
      //     redirectTo("/shop");
      //     console.log("getting user requests");
      //     const requestItems = await useFetchShopRequests(userData._id);
      //     console.log("user requests:", requestItems);
      //     return userData;
      //   });
      // } else if (cookies.jwt) {
      //   return await useFetchUser().then(async (userData) => {
      //     const requestItems = await useFetchShopRequests(userData._id);
      //     console.log("user requests:", requestItems);
      //     return userData;
      //   });
      // }

      // return null;
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
    await useRegisterUser(inputs).catch((e) => console.error(e));
    handleNavigation;
  };

  const redirectTo = (path: string) => {
    void router.replace(path).catch((e) => console.log(e));
  };

  const handleNavigation = () => {
    if (router.asPath === "/register" || router.asPath === "/login") {
      redirectTo("/shop");
    } else {
      const matchedNavItem = navItems.find(
        (navItem) => router.asPath === navItem.href,
      );
      if (matchedNavItem) redirectTo(router.asPath);
    }
  };

  useEffect(() => {
    if (loginInputs) void refetch(); // fetch user after clicking login
  }, [loginInputs]);

  useEffect(() => {
    if (!cookies.jwt) void refetch(); // set user to null if there is no cookie
  }, [cookies.jwt]);

  useEffect(() => {
    if (!user && !isLoading) redirectTo("/login");
    else redirectTo("/shop");
  }, [user, isLoading]);

  const value: AuthContextType = {
    user,
    error,
    handleLogin,
    handleLogout,
    handleRegister,
  };

  if (isLoading || isFetching || isRefetching) return <LoadingScreen />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
