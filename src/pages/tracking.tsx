import PageLayout from "~/components/Layouts/PageLayout";
import NeedHelpFAB from "~/components/NeedHelpFAB";
import TopAppBar from "~/components/TopAppBar";
import Search from "~/components/Tracking/Search";
import { useAuthContext } from "~/contexts/AuthContext";
import TabContextProvider from "~/contexts/TabContext";
import TrackingContextProvider from "~/contexts/TrackingContext";

const tracking = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TabContextProvider>
      <TrackingContextProvider>
        <PageLayout>
          <TopAppBar tabs={false} />
          <div className="relative flex min-h-[calc(100vh-152px)] w-full flex-col overflow-y-auto bg-neutral-50 p-[20px] md:min-h-[calc(100vh-140px)] md:max-w-[calc(100vw-286px)] md:px-[40px] md:py-[30px]">
            <Search />
            <NeedHelpFAB />
          </div>
        </PageLayout>
      </TrackingContextProvider>
    </TabContextProvider>
  );
};

export default tracking;
