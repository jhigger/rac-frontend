import PageLayout from "~/components/Layouts/PageLayout";
import TopAppBar from "~/components/TopAppBar";
import { useAuthContext } from "~/contexts/AuthContext";
import AutoImportContextProvider from "~/contexts/AutoImportContext";
import TabContextProvider from "~/contexts/TabContext";

const autoImport = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TabContextProvider>
      <AutoImportContextProvider>
        <PageLayout>
          <TopAppBar />
        </PageLayout>
      </AutoImportContextProvider>
    </TabContextProvider>
  );
};

export default autoImport;
