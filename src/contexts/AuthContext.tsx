import { useQuery, type QueryObserverResult } from "@tanstack/react-query";
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
import { toast } from "sonner";
import { type LoginInputs } from "~/components/Forms/Login/LoginForm";
import LoadingScreen from "~/components/LoadingScreen";
import useFetchUser from "~/hooks/useFetchUser";
import useLoginUser from "~/hooks/useLoginUser";
import useRegisterUser from "~/hooks/useRegisterUser";
import useSubmitAuthCode from "~/hooks/useSubmitAuthCode";

export type AuthContextType = {
  authCodeError: Error | null;
  authType: TwoFactorAuthenticationType;
  user: UserType | null;
  isAuthenticating: boolean;
  isFetchingUser: boolean;
  isRegistering: boolean;
  loginError: AxiosError | null;
  registerError: string | null;
  restrictedPaths: string[];
  verifyingAuthCode: boolean;
  handleBackupCode: (backupCode: string) => void;
  handleCodeVerification: (sixDigitCode: string) => void;
  handleConfirmPasswordReset: (password: string) => Promise<void>;
  handleLogin: (data: LoginInputs) => void;
  handleLogout: () => void;
  handleRegister: (data: RegisterType) => Promise<void>;
  handleSendResetEmail: (email: string) => boolean;
  handleVerifyPasswordResetCode: (code: string) => boolean;
  refetch: () => Promise<QueryObserverResult>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const useAuthContext = () => useContext(AuthContext);

export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  jwt: string;
  racId: string;
  billingDetails: {
    countryCode: string;
    phoneNumber: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipPostalCode: string;
  };
  isEmailVerified: boolean;
  smsNotification: boolean;
  whatsAppNotification: boolean;
  emailNotification: boolean;
  appAuthentication: boolean;
  emailAuthentication: boolean;
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

export type TwoFactorAuthenticationType = "email" | "TOTP";

export const restrictedPaths = [
  "/",
  "/login",
  "/authentication",
  "/register",
  "/password-reset",
  "/recover",
];

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [loginInputs, setLoginInputs] = useState<LoginInputs | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [authType, setAuthType] =
    useState<TwoFactorAuthenticationType>("email"); // todo: get this data in user object from backend
  const {
    mutateAsync: submitAuthCode,
    error: authCodeError,
    isPending: verifyingAuthCode,
  } = useSubmitAuthCode();
  const [sixDigitCode, setSixDigitCode] = useState("");

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
        if (sixDigitCode && router.asPath === "/authentication") {
          console.log("verifying otp...");
          return await submitAuthCode({
            email: loginInputs.email,
            sixDigitCode,
          })
            .then((user) => {
              // reset states
              setSixDigitCode("");
              setLoginInputs(null);
              setIsRegistering(false);
              // set user
              handleJWTCookie(user.jwt);
              console.log("user logged in");

              return user;
            })
            .catch((err) => {
              console.log(err);
              return null;
            });
        }

        console.log("logging in...");
        return await useLoginUser(loginInputs).then(async () => {
          console.log("OTP sent to email");
          await redirectTo("/authentication");
          return null;
        });
      } else if (cookies.jwt) {
        console.log("token found, fetching user info...");
        const token = cookies.jwt as string;
        return await useFetchUser(token).then(async (userData) => {
          console.log("user found");
          return userData;
        });
      }

      return null;
    },
    initialData: null,
  });

  const handleBackupCode = (backupCode: string) => {
    console.log("recovering account using backup code: ", backupCode);
  };

  const handleCodeVerification = (sixDigitCode: string) => {
    setSixDigitCode(sixDigitCode);
  };

  const handleConfirmPasswordReset = async (password: string) => {
    // todo: handle backend api useChangePassword(token, code, password)
    console.log("changing password to: ", password);
    console.log("Redirecting to login...");
    await redirectTo("/login");
  };

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
        toast("Account creation successful");
        setLoginInputs(inputs);
      })
      .catch((e: AxiosError) => {
        const res = e.response as { data: { message: string } };
        setRegisterError(res.data.message);
        console.log("register failed");
      })
      .finally(() => setIsRegistering(false));
  };

  const handleRedirect = async () => {
    const pathWithoutQuery = router.asPath.split("?");
    if (!pathWithoutQuery[0]) return;
    // when going to restrictedPaths
    // redirect to /shop or callback route if token exist else redirect to /login
    if (!loginInputs && pathWithoutQuery[0] === "/authentication") {
      await redirectTo("/login");
    } else if (user) {
      if (restrictedPaths.includes(pathWithoutQuery[0])) {
        console.log("Redirecting to /shop...");
        await redirectTo("/shop");
      } else {
        // console.log(`Redirecting to ${pathWithoutQuery[0]}...`);
        // await redirectTo(pathWithoutQuery[0]);
      }
    } else if (!user && !isRefetching) {
      if (pathWithoutQuery[0] === "/password-reset" && pathWithoutQuery[1])
        return;

      if (!restrictedPaths.includes(pathWithoutQuery[0])) {
        console.log("User logged out or token expired");
        console.log("Redirecting to /login...");
        await redirectTo("/login");
      } else {
        console.log(`Redirecting to ${pathWithoutQuery[0]}...`);
        await redirectTo(pathWithoutQuery[0]);
      }
    } else if (!user && cookies.jwt === undefined && isRefetching) {
      if (restrictedPaths.includes(pathWithoutQuery[0])) {
        console.log("User logged out or token expired");
        console.log("Redirecting to /login...");
        await redirectTo("/login");
      }
    }
  };

  const handleSendResetEmail = (email: string) => {
    const result = true; // todo: handle backend api useVerifyResetCode(email)
    console.log("sending reset link to email: ", email);
    return result;
  };

  const handleVerifyPasswordResetCode = (code: string) => {
    const result = true; // todo: handle backend api useVerifyResetCode(token, code)
    console.log("verifying code: ", code);
    return result;
  };

  const redirectTo = async (path: string) => {
    await router.replace(path).catch((e) => console.log(e));
  };

  useEffect(() => {
    if (loginInputs) void refetch(); // fetch user after clicking login
  }, [loginInputs, sixDigitCode]);

  useEffect(() => {
    if (!cookies.jwt) void refetch(); // set user to null if there is no cookie
  }, [cookies.jwt]);

  useEffect(() => {
    void handleRedirect(); // redirect page when user value changes
  }, [user]);

  const value: AuthContextType = {
    authCodeError,
    authType,
    user,
    isAuthenticating,
    isFetchingUser,
    isRegistering,
    loginError,
    registerError,
    restrictedPaths,
    verifyingAuthCode,
    handleBackupCode,
    handleCodeVerification,
    handleConfirmPasswordReset,
    handleLogin,
    handleLogout,
    handleRegister,
    handleSendResetEmail,
    handleVerifyPasswordResetCode,
    refetch,
  };

  if (isRefetching && loginInputs === null) return <LoadingScreen />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
