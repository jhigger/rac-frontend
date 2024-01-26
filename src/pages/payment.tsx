import dynamic from "next/dynamic";
import NoTabsContentLayout from "~/components/Layouts/NoTabsContentLayout";
import PageLayout from "~/components/Layouts/PageLayout";
import { LoadingSpinner } from "~/components/LoadingScreen";
import { useAuthContext } from "~/contexts/AuthContext";
import TabContextProvider from "~/contexts/TabContext";
import TrackingContextProvider from "~/contexts/TrackingContext";

const TopAppBar = dynamic(() => import("~/components/TopAppBar"), {
  loading: () => (
    <div className="h-screen">
      <LoadingSpinner />
    </div>
  ),
});

const payment = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TabContextProvider>
      <TrackingContextProvider>
        <PageLayout>
          <TopAppBar hasTabs={false} />
          <NoTabsContentLayout>Payment History</NoTabsContentLayout>
        </PageLayout>
      </TrackingContextProvider>
    </TabContextProvider>
  );
};

export default payment;
