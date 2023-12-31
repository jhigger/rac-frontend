import dynamic from "next/dynamic";
import { LoadingSpinner } from "~/components/LoadingScreen";
import { useAuthContext } from "~/contexts/AuthContext";
import ImportContextProvider from "~/contexts/ImportContext";
import TabContextProvider from "~/contexts/TabContext";

const TopAppBar = dynamic(() => import("~/components/TopAppBar"), {
  loading: () => (
    <div className="h-screen">
      <LoadingSpinner />
    </div>
  ),
});

const importPage = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TabContextProvider>
      <ImportContextProvider>
        <TopAppBar />
      </ImportContextProvider>
    </TabContextProvider>
  );
};

export default importPage;
