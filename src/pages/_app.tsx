import { type AppType } from "next/dist/shared/lib/utils";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { useEffect } from "react";
import tailmater from "~/js/tailmater";
import { useRouter } from "next/router";

import "~/styles/globals.css";
import "material-icons/iconfont/material-icons.css";
import AuthContextProvider from "~/contexts/AuthContext";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
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
      <AuthContextProvider>
        <main className={roboto.className}>
          <Component {...pageProps} />
        </main>
      </AuthContextProvider>
    </>
  );
};

export default MyApp;
