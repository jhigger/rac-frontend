import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Toaster from "~/components/Toaster";
import AuthContextProvider from "~/contexts/AuthContext";
import NavContextProvider from "~/contexts/NavigationContext";
import NotificationContextProvider from "~/contexts/NotificationContext";
import tailmater from "~/js/tailmater";

import "~/styles/globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
      retry: false, // default: 3
    },
  },
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    tailmater();
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>RAC Logistics</title>
        <link rel="icon" href="/images/brand_icon.svg" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <NavContextProvider>
            <NotificationContextProvider>
              <div className={roboto.className}>
                <Toaster />
                <Component {...pageProps} />
              </div>
            </NotificationContextProvider>
          </NavContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
