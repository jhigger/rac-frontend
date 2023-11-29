/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { BottomNav, TopNav } from "~/components/Navigation";
import SlideSheet from "~/components/Navigation/SlideSheet";
import Welcome from "~/components/Navigation/Welcome";
import TopAppBar from "~/components/TopAppBar";
import TabsContextProvider from "~/contexts/TabsContext";

const shop = () => {
  const [active, setActive] = useState("Shop for me");

  const handleChangeActive = (title: string) => {
    setActive(title);
  };

  return (
    <TabsContextProvider>
      <div className="relative flex min-h-screen bg-neutral-50">
        <nav className="fixed hidden h-full min-h-screen w-[266px] flex-col overflow-y-auto bg-brand py-[40px] md:flex">
          <Welcome
            {...{
              id: "RAC45678",
              name: "Rex",
              src: "https://placehold.co/400x400/cac4d0/1d192b?text=R&font=roboto",
            }}
          />
          <TopNav {...{ active, onClick: handleChangeActive }} />
          <BottomNav {...{ active, onClick: handleChangeActive }} />
        </nav>
        <main className="w-full md:ml-[266px]">
          <SlideSheet
            {...{
              active,
              onClick: handleChangeActive,
              id: "RAC45678",
              name: "Rex",
              src: "https://placehold.co/400x400/cac4d0/1d192b?text=R&font=roboto",
            }}
          />
          <TopAppBar title={active} />
        </main>
      </div>
    </TabsContextProvider>
  );
};

export default shop;
