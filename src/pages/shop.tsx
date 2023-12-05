/* eslint-disable @next/next/no-img-element */
import PageLayout from "~/components/Layouts/PageLayout";
import TopAppBar from "~/components/TopAppBar";
import { useAuthContext } from "~/contexts/AuthContext";
import ShopContextProvider from "~/contexts/ShopContext";
import TabContextProvider from "~/contexts/TabContext";

const shop = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TabContextProvider>
      <ShopContextProvider>
        <PageLayout>
          <TopAppBar />
        </PageLayout>
      </ShopContextProvider>
    </TabContextProvider>
  );
};

export default shop;
