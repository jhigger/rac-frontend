import dynamic from "next/dynamic";
import { LoadingSpinner } from "~/components/LoadingScreen";
import { useAuthContext } from "~/contexts/AuthContext";
import AutoImportContextProvider from "~/contexts/AutoImportContext";
import TabContextProvider from "~/contexts/TabContext";

const TopAppBar = dynamic(() => import("~/components/TopAppBar"), {
  loading: () => (
    <div className="h-screen">
      <LoadingSpinner />
    </div>
  ),
});

const autoImport = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TabContextProvider>
      <AutoImportContextProvider>
        <TopAppBar />
      </AutoImportContextProvider>
    </TabContextProvider>
  );
};

export default autoImport;
