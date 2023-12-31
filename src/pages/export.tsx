import dynamic from "next/dynamic";
import PageLayout from "~/components/Layouts/PageLayout";
import { useAuthContext } from "~/contexts/AuthContext";
import ExportContextProvider from "~/contexts/ExportContext";
import TabContextProvider from "~/contexts/TabContext";

const TopAppBar = dynamic(() => import("~/components/TopAppBar"));

const exportPage = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TabContextProvider>
      <ExportContextProvider>
        <PageLayout>
          <TopAppBar />
        </PageLayout>
      </ExportContextProvider>
    </TabContextProvider>
  );
};

export default exportPage;
