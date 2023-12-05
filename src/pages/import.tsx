import { BottomNav, TopNav } from "~/components/Navigation";
import SlideSheet from "~/components/Navigation/SlideSheet";
import Welcome from "~/components/Navigation/Welcome";
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
        <div className="relative flex min-h-screen bg-neutral-50">
          <nav className="fixed hidden h-full min-h-screen w-[266px] flex-col overflow-y-auto bg-brand py-[40px] md:flex">
            <Welcome
              {...{
                id: "RAC45678",
                name: "Rex",
                src: "https://placehold.co/400x400/cac4d0/1d192b?text=R&font=roboto",
              }}
            />
            <TopNav />
            <BottomNav />
          </nav>
          <SlideSheet
            {...{
              id: "RAC45678",
              name: "Rex",
              src: "https://placehold.co/400x400/cac4d0/1d192b?text=R&font=roboto",
            }}
          />
          <main className="w-full md:ml-[266px]">
            <TopAppBar />
          </main>
        </div>
      </ImportContextProvider>
    </TabContextProvider>
  );
};

export default importPage;
