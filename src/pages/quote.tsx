import PageLayout from "~/components/Layouts/PageLayout";
import WelcomeChamp from "~/components/Quote/WelcomeChamp";
import TopAppBar from "~/components/TopAppBar";
import { useAuthContext } from "~/contexts/AuthContext";
import TabContextProvider from "~/contexts/TabContext";

const quote = () => {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <TabContextProvider>
      <PageLayout>
        <div className="w-full md:w-max">
          <TopAppBar tabs={false} />
        </div>
        <div className="relative flex min-h-[calc(100vh-152px)] w-full flex-col overflow-y-auto bg-neutral-50 p-[20px] md:min-h-[calc(100vh-140px)] md:max-w-[calc(100vw-286px)] md:px-[40px] md:py-[30px]">
          <WelcomeChamp />
        </div>
      </PageLayout>
    </TabContextProvider>
  );
};

export default quote;
