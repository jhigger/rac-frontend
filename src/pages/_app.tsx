import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthContextProvider from "~/contexts/AuthContext";
import NavContextProvider from "~/contexts/NavigationContext";
import tailmater from "~/js/tailmater";

import "~/styles/globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
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
        <NavContextProvider>
          <AuthContextProvider>
            <main className={roboto.className}>
              <Component {...pageProps} />
            </main>
          </AuthContextProvider>
        </NavContextProvider>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
