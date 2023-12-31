import dynamic from "next/dynamic";
import PageLayout from "~/components/Layouts/PageLayout";
import { useAuthContext } from "~/contexts/AuthContext";
import ShopContextProvider from "~/contexts/ShopContext";
import TabContextProvider from "~/contexts/TabContext";

const TopAppBar = dynamic(() => import("~/components/TopAppBar"));

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
