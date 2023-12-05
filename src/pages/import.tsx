import PageLayout from "~/components/Layouts/PageLayout";
import TopAppBar from "~/components/TopAppBar";
import { useAuthContext } from "~/contexts/AuthContext";
import ImportContextProvider from "~/contexts/ImportContext";
import TabContextProvider from "~/contexts/TabContext";

const importPage = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TabContextProvider>
      <ImportContextProvider>
        <PageLayout>
          <TopAppBar />
        </PageLayout>
      </ImportContextProvider>
    </TabContextProvider>
  );
};

export default importPage;
