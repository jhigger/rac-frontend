import { type AppType } from "next/dist/shared/lib/utils";
import { useEffect } from "react";
import tailmater from "~/js/tailmater";
import { Roboto } from "next/font/google";

import "~/styles/globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    tailmater();
  }, []);

  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
