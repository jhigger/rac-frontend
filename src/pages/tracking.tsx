import dynamic from "next/dynamic";
import NeedHelpFAB from "~/components/Buttons/NeedHelpFAB";
import NoTabsContentLayout from "~/components/Layouts/NoTabsContentLayout";
import PageLayout from "~/components/Layouts/PageLayout";
import { LoadingSpinner } from "~/components/LoadingScreen";
import { useAuthContext } from "~/contexts/AuthContext";
import TrackingContextProvider from "~/contexts/TrackingContext";

const Search = dynamic(() => import("~/components/Tracking/Search"));
const TopAppBar = dynamic(() => import("~/components/TopAppBar"), {
  loading: () => (
    <div className="h-screen">
      <LoadingSpinner />
    </div>
  ),
});

const tracking = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TrackingContextProvider>
      <PageLayout>
        <TopAppBar hasTabs={false} />
        <NoTabsContentLayout>
          <Search />
          <NeedHelpFAB />
        </NoTabsContentLayout>
      </PageLayout>
    </TrackingContextProvider>
  );
};

export default tracking;
