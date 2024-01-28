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

const Home = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TabContextProvider>
      <TrackingContextProvider>
        <PageLayout>
          <TopAppBar hasTabs={false} hasBreadcrumbs={false} />
          <NoTabsContentLayout>
            <div className="grid h-full w-full flex-grow grid-cols-1 gap-[20px] overflow-auto md:grid-cols-3 md:grid-rows-4">
              <div className="col-span-full rounded-[20px] border border-gray-200 bg-white p-[20px] md:col-span-1 md:row-span-1"></div>
              <div className="col-span-full rounded-[20px] border border-gray-200 bg-white p-[20px] md:col-span-1 md:row-span-2"></div>
              <div className="col-span-full rounded-[20px] border border-gray-200 bg-white p-[20px] md:col-span-1 md:row-span-4"></div>
              <div className="col-span-full rounded-[20px] border border-gray-200 bg-white p-[20px] md:col-span-1 md:row-span-1"></div>
              <div className="col-span-full flex flex-col md:col-span-2 md:row-span-2">
                <div className="rounded-[20px] border border-gray-200 bg-white p-[20px]"></div>
                <div className="h-full rounded-[20px] border border-gray-200 bg-white p-[20px]"></div>
              </div>
            </div>
          </NoTabsContentLayout>
        </PageLayout>
      </TrackingContextProvider>
    </TabContextProvider>
  );
};

export default Home;
